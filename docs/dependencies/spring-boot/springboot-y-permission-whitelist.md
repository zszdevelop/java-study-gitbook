# SpringBoot-Starter - 权限白名单自动化配置

## 1. 自定义步骤

### 1.1 引入SpringBoot 自动化配置依赖

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

### 1.2 创建属性类

创建属性类，prefix = “ywt.cloud.security”代表该项目在属性文件中配置的前缀，即可以在属性文件中通过 ywt.cloud.security.anonUris=/login，就可以改变属性类字段 anonUris 的值了。

- 配置 anonUris: 配置免认证资源路径

```java
@ConfigurationProperties(prefix = "ywt.cloud.security")
public class YwtCloudSecurityProperties {


    /**
     * 是否开启安全配置
     */
    private Boolean enable;
    /**
     * 配置需要认证的uri，默认为所有/**
     */
    private String authUri = EndpointConstant.ALL;
    /**
     * 免认证资源路径，支持通配符
     * 多个值时使用逗号分隔
     */
    private String anonUris;
    /**
     * 是否只能通过网关获取资源
     */
    private Boolean onlyFetchByGateway = Boolean.TRUE;

    public Boolean getEnable() {
        return enable;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }

    public String getAuthUri() {
        return authUri;
    }

    public void setAuthUri(String authUri) {
        this.authUri = authUri;
    }

    public String getAnonUris() {
        return anonUris;
    }

    public void setAnonUris(String anonUris) {
        this.anonUris = anonUris;
    }

    public Boolean getOnlyFetchByGateway() {
        return onlyFetchByGateway;
    }

    public void setOnlyFetchByGateway(Boolean onlyFetchByGateway) {
        this.onlyFetchByGateway = onlyFetchByGateway;
    }

    @Override
    public String toString() {
        return "FebsCloudSecurityProperties{" +
                "enable=" + enable +
                ", authUri='" + authUri + '\'' +
                ", anonUris='" + anonUris + '\'' +
                ", onlyFetchByGateway=" + onlyFetchByGateway +
                '}';
    }
}
```

### 1.3 创建自动配置类

```java
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableConfigurationProperties(YwtCloudSecurityProperties.class)
@ConditionalOnProperty(value = "ywt.cloud.security.enable", havingValue = "true", matchIfMissing = true)
public class YwtCloudSecurityAutoconfigure {

    @Bean
    @ConditionalOnMissingBean(name = "accessDeniedHandler")
    public YwtAccessDeniedHandler accessDeniedHandler() {
        return new YwtAccessDeniedHandler();
    }

    @Bean
    @ConditionalOnMissingBean(name = "authenticationEntryPoint")
    public YwtAuthExceptionEntryPoint authenticationEntryPoint() {
        return new YwtAuthExceptionEntryPoint();
    }

    @Bean
    @ConditionalOnMissingBean(value = PasswordEncoder.class)
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public YwtCloudSecurityInteceptorConfigure febsCloudSecurityInteceptorConfigure() {
        return new YwtCloudSecurityInteceptorConfigure();
    }

    @Bean
    public RequestInterceptor oauth2FeignRequestInterceptor() {
        return requestTemplate -> {
            String gatewayToken = new String(Base64Utils.encode(XfConstant.GATEWAY_TOKEN_VALUE.getBytes()));
            requestTemplate.header(XfConstant.GATEWAY_TOKEN_HEADER, gatewayToken);
            String authorizationToken = FebsUtil.getCurrentTokenValue();
            if (StringUtils.isNotBlank(authorizationToken)) {
                requestTemplate.header(HttpHeaders.AUTHORIZATION, XfConstant.OAUTH2_TOKEN_TYPE + authorizationToken);
            }
        };
    }
}
```

### 1.4 META-INF 目录下创建 spring.factories

在 META-INF 目录下创建 spring.factories，因为 SpringBoot 自动化配置最终就是要扫描 META-INF/spring.factories 来加载项目的自动化配置类。

```
# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.ywt.common.security.starter.configure.YwtCloudSecurityAutoconfigure
```

## 2. 引用Starter

### 2.1 另一个项目引入 starter

```
<dependency>
   <groupId>com.ywt</groupId>
   <artifactId>ywt-common-security-starter</artifactId>
   <version>${ywt-cloud.version}</version>
</dependency>
```

在 application.properties 中添加属性：

### 2.2 这样就配置了免登陆的地址

```
ywt:
  cloud:
    security:
      enable: true
      anon-uris: /actuator/**,/v2/api-docs,/v2/api-docs-ext,/wx/**
```

### 2.3 在 SpringBoot 主程序中 使用 @EnableYwtCloudResourceServer

```
@SpringBootApplication
@EnableYwtCloudResourceServer
public class YwtServerWeixinApplication {

	public static void main(String[] args) {
		SpringApplication.run(YwtServerWeixinApplication.class, args);
	}

}
```

## 3. 注解@EnableYwtCloudResourceServer 的来龙去脉

### 3.1 创建注解类

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(YwtCloudResourceServerConfigure.class)
public @interface EnableYwtCloudResourceServer {
}
```

**@Import 注解的最主要功能就是导入额外的配置信息**

### 3.2 直接导入配置类（@Configuration 类）

```java
@EnableResourceServer
@EnableAutoConfiguration(exclude = UserDetailsServiceAutoConfiguration.class)
public class YwtCloudResourceServerConfigure extends ResourceServerConfigurerAdapter {

    private YwtCloudSecurityProperties properties;
    private YwtAccessDeniedHandler accessDeniedHandler;
    private YwtAuthExceptionEntryPoint exceptionEntryPoint;

    @Autowired
    public void setProperties(YwtCloudSecurityProperties properties) {
        this.properties = properties;
    }

    @Autowired
    public void setAccessDeniedHandler(YwtAccessDeniedHandler accessDeniedHandler) {
        this.accessDeniedHandler = accessDeniedHandler;
    }

    @Autowired
    public void setExceptionEntryPoint(YwtAuthExceptionEntryPoint exceptionEntryPoint) {
        this.exceptionEntryPoint = exceptionEntryPoint;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        String[] anonUrls = StringUtils.splitByWholeSeparatorPreserveAllTokens(properties.getAnonUris(), ",");
        if (ArrayUtils.isEmpty(anonUrls)) {
            anonUrls = new String[]{};
        }

        http.csrf().disable()
                .requestMatchers().antMatchers(properties.getAuthUri())
                .and()
                .authorizeRequests()
                .antMatchers(anonUrls).permitAll()
                .antMatchers(properties.getAuthUri()).authenticated()
                .and()
                .httpBasic();
    }

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources.authenticationEntryPoint(exceptionEntryPoint)
                .accessDeniedHandler(accessDeniedHandler);
    }
}
```

