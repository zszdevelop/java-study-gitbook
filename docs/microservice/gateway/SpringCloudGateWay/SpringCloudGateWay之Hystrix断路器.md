# Spring Cloud GateWay之Hystrix断路器

Hystrix 是Netflix实现的断路器模式工具包，The Hystrix GatewayFilter就是将断路器使用在gateway的路由上，目的是保护你的服务避免级联故障，以及在下游失败时可以降级返回。

## 1. POM依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
```

## 2. application.yml 配置

```yml
spring:
  application:
    name: Chinahrss-Gateway
    gateway:
      routes:
        - id: Chinahrss-Auth
          uri: lb://Chinahrss-Auth
          predicates:
            - Path=/auth/**
          filters:
            - name: Hystrix
              args:
                name: authfallback
                fallbackUri: forward:/fallback/Chinahrss-Auth
        - id: Chinahrss-Server-System
          uri: lb://Chinahrss-Server-System
          predicates:
            - Path=/system/**
          filters:
            - name: Hystrix
              args:
                name: systemfallback
                fallbackUri: forward:/fallback/FEBS-Server-System
```

服务降级后，请求会跳转fallbackUri配置的路径，目前只支持`forward:`的URI协议。

## 3. 服务降级处理

此时服务降级后会跳转我们制定的页面

```java
@RestController
public class FallbackController {

    @RequestMapping("fallback/{name}")
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Mono<Response> systemFallback(@PathVariable String name) {
        String response = String.format("访问%s超时或者服务不可用", name);
        return Mono.just(new FebsResponse().message(response));
    }

}
```

