# Sentinel限流

[Sentinel限流官方文档]([https://github.com/alibaba/Sentinel/wiki/%E7%BD%91%E5%85%B3%E9%99%90%E6%B5%81](https://github.com/alibaba/Sentinel/wiki/网关限流))

## 实战

例如我们图片验证码是免认证的，所以只要知道了地址就可以频繁的去获取验证码，这无形之中给服务器增加了很大的压力。甚至可能导致服务器宕机。

### 1.1 引入依赖

```xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-zuul-adapter</artifactId>
    <version>1.6.3</version>
</dependency>
```

### 1.2 新建过滤器

```java
@Slf4j
@Configuration
public class GatewaySentinelFilter {

    @Bean
    public ZuulFilter sentinelZuulPreFilter() {
        return new SentinelZuulPreFilter();
    }

    @Bean
    public ZuulFilter sentinelZuulPostFilter() {
        return new SentinelZuulPostFilter();
    }

    @Bean
    public ZuulFilter sentinelZuulErrorFilter() {
        return new SentinelZuulErrorFilter();
    }

    @PostConstruct
    public void doInit() {
        initGatewayRules();
    }

    /**
     * 定义验证码请求限流，限流规则：
     *  60秒内同一个IP，同一个 key最多访问 10次
     */
    private void initGatewayRules() {
        Set<ApiDefinition> definitions = new HashSet<>();
        Set<ApiPredicateItem> predicateItems = new HashSet<>();

        predicateItems.add(new ApiPathPredicateItem().setPattern("/auth/captcha"));
        ApiDefinition definition = new ApiDefinition("captcha")
                .setPredicateItems(predicateItems);
        definitions.add(definition);
        GatewayApiDefinitionManager.loadApiDefinitions(definitions);

        Set<GatewayFlowRule> rules = new HashSet<>();

        rules.add(new GatewayFlowRule("captcha")
                .setResourceMode(SentinelGatewayConstants.RESOURCE_MODE_CUSTOM_API_NAME)
                .setParamItem(
                        new GatewayParamFlowItem()
                                .setParseStrategy(SentinelGatewayConstants.PARAM_PARSE_STRATEGY_URL_PARAM)
                                .setFieldName("key")
                                .setMatchStrategy(SentinelGatewayConstants.PARAM_MATCH_STRATEGY_EXACT)
                                .setParseStrategy(SentinelGatewayConstants.PARAM_PARSE_STRATEGY_CLIENT_IP)
                )
                .setCount(10)
                .setIntervalSec(60)
        );
        GatewayRuleManager.loadRules(rules);
    }
}
```

在`initGatewayRules`方法中，我们定义了具体的限流逻辑。

### 1.3 自定义限流异常

默认情况下，当接口超出流量限制后，Sentinel返回如下格式的JSON报文：

```
{"code":429, "message":"Sentinel block exception", "route":"captcha"}
```

我们也可以自定义异常响应。

```java
public class sGatewayBlockFallbackProvider implements ZuulBlockFallbackProvider {
    @Override
    public String getRoute() {
        return "*";
    }

    @Override
    public BlockResponse fallbackResponse(String route, Throwable throwable) {
        if (throwable instanceof BlockException) {
            return new BlockResponse(HttpStatus.TOO_MANY_REQUESTS.value(),
                    "访问频率超限", route);
        } else {
            return new BlockResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "系统异常", route);
        }
    }
}
```

要让其生效，还需在上面定义的`FebsGatewaySentinelFilter`过滤器的`doInit`方法里通过`ZuulBlockFallbackManager.registerProvider`设置它：

```java
@Slf4j
@Configuration
public class GatewaySentinelFilter {
    ......

    @PostConstruct
    public void doInit() {
        ZuulBlockFallbackManager.registerProvider(new FebsGatewayBlockFallbackProvider());
        initGatewayRules();
    }
    
    ......
}
```

