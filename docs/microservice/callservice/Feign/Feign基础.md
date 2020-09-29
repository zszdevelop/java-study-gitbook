# Feign基础

微服务之间服务的调用可以借助Spring Cloud Feign 来完成，Spring Cloud Feign 内部整合了Spring Cloud Ribbon 和 Spring Cloud Hystrix,所以它具有**客户端负载均衡和服务容错的功能。**

## 1. 集成使用

### 1.1 依赖 feign

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

### 1.2 服务端

#### 1.2.1在服务提供方提供接口

```java
@RestController
public class TestController {

    @GetMapping("hello")
    public String hello(String name) {
        return "hello" + name;
    }
    ......
}
```

### 1.3 客户端

#### 1.3.1 开启Feign Client

```java
@EnableFeignClients
@EnableDiscoveryClient
@SpringBootApplication
public class YlzapApplication {

   public static void main(String[] args) {
      SpringApplication.run(YlzapServerTestApplication.class, args);
   }

}
```

#### 1.3.2 在客户端定义Feign Client接口

```
@FeignClient(value = ServerConstant.FEBS_SERVER_SYSTEM, contextId = "helloServiceClient", fallbackFactory = HelloServiceFallback .class)
public interface IHelloService {

    @GetMapping("hello")
    String hello(@RequestParam String name);
}
```

#### 1.3.3 定义回退方法Fallback

```java
@Slf4j
@Component
public class HelloServiceFallback implements FallbackFactory<IHelloService> {
    @Override
    public IHelloService create(Throwable throwable) {
        return new IHelloService() {
            @Override
            public String hello(String name) {
                log.error("调用febs-server-system服务出错", throwable);
                return "调用出错";
            }
        };
    }
}
```

#### 1.3.4 修改application.yml让配置生效

```yml
feign:
  hystrix:
    enabled: true
```

因为Feign的回退功能是基于Hystrix实现的，所以需要开启它。

#### 1.3.5 调用服务端方法

```java
@RestController
public class TestController {
    
    @Autowired
    private IHelloService helloService;
    
    @GetMapping("hello")
    public String hello(String name){
        return this.helloService.hello(name);
    }
    ......   
}
```

