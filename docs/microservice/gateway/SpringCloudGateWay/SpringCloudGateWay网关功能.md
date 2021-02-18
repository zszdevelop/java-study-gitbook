# Spring Cloud GateWay网关功能

微服务网关最重要的几个功能分别是路由, 负载均衡,认证授权, 跨域配置, 日志, 失败重试, 下来一一来配置.

## 动态路由

通常微服务都是注册中心, 服务都是自动发现的,spring cloud gateway可以基于注册小心动态配置路由, 转发的规则是:
 /service_id/path->转发到service_id对应的服务
 只需要添加配置:

```java
spring.cloud.gateway.discovery.locator.enabled=true
spring.cloud.gateway.discovery.locator.lowerCaseServiceId=true
```

就能动态路由.

## 负载均衡

```cpp
  以lb://开头的请求, 会被全局过滤器RetryLoadBalancerClientFilter拦截并进行负载均衡处理, 所有的动态路由都会自动负载均衡.
```

## 认证授权

有一个专门用来做认证授权的服务, 网关需要做的就是自定义一个全局过滤器, 将每一个请求发到授权服务进行认证授权.

```java
@Component
public class AuthFilter implements GlobalFilter, Ordered {
    @Override
    public int getOrder() {
        return Constants.PRE_FILTER_ORDER_AUTH;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        try {
            //TODO 调用授权服务进行认证和授权
            return chain.filter(exchange.mutate().request(request).build());
        } catch (Exception e) {
            log.error("auth failed: " + e.getMessage());
            return exchange.getResponse()
                    .writeWith(Flux.just(exchange.getResponse().bufferFactory().wrap("授权失败".getBytes())));
        }
    }
```

## 跨域设置

有时候前端需要支持跨域访问, 这里简单配置允许所有域名访问.

```java
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowed-origins=*
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowed-methods=*
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowed-headers=*
spring.cloud.gateway.globalcors.cors-configurations.[/**].allow-credentials=true
```

## 日志

日志功能同样是自定义全局过滤器实现, 在请求进入时打印输入日志,返回时打印输出日志, 唯一的问题是在打印请求或返回的body时要处理下,一般情况下请求和响应的body都不能多次读, 需要自定义装饰器封装实现多次读的功能.

## 失败重试

这个没有全局过滤器, 需要自己实现.

## 参考文章

[微服务网关spring cloud gateway](https://www.jianshu.com/p/4e48673115dd)