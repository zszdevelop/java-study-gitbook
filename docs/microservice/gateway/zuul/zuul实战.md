# zuul实战

## 1.  简单集成使用

### 1.1 添加依赖

​	引入zuul

```
<dependency>
   <groupId>org.springframework.cloud</groupId>
   <artifactId>spring-cloud-starter-netflix-zuul</artifactId>
</dependency>
```

### 1.2. 配置文件

```
 spring.application.name=gateway-service-zuul
 server.port=8888
 
 #这里的配置表示，访问/it/** 直接重定向到http://java.isture.com/
 zuul.routes.baidu.path=/it/**
 zuul.routes.baidu.url=http://java.isture.com/
```

### 1.3 启动类

启动类添加`@EnableZuulProxy`，支持网关路由。

```
@EnableZuulProxy
@SpringBootApplication
public class ZuuldemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZuuldemoApplication.class, args);
	}

}
```

### 1.4 测试

1. 启动项目，在浏览器中访问http://localhost:8888/it/spring-cloud，看到页面返回http://java.isture.com/

## 2. zuul配置

```yml
zuul:
  routes:
    auth:
      path: /auth/**
      serviceId: ylzap-Auth
      sensitiveHeaders: "*"
  retryable: true
  ignored-services: "*"
  ribbon:
    eager-load:
      enabled: true

ribbon:
  ReadTimeout: 3000
```

其中

```yml
...
  auth:
    path: /auth/**
    serviceId: ylzap-Auth
    sensitiveHeaders: "*"
```

这一段的意思是所有以/auth 开头的请求都会被转发到名称为ylzap-auth 的服务器，由于我们需要在请求头中携带令牌，所以`sensitiveHeaders`设置为`*`，表示不过滤请求头信息，既请求的请求头信息将原封不动的转发出去，此外，因为zuul已经包含了ribbon和hystrix依赖，所以我们在使用zuul 的同时，可以添加ribbon和hystrix相关配置

上述配置剩下的含义如下：

- zuul.retryable: 设置true，表示开启重试机制
- zuul.ignored-services: zull 配合Eureka 后会有一套默认的配置规则，这里我们只想请求根据我们显示配置的路由规则走，所以设置为*，表示关闭所有默认路由配置规则
- `zuul.ribbon.eager-load.enabled`，Zuul内部通过Ribbon按照一定的负载均衡算法来获取服务，Ribbon进行客户端负载均衡的Client并不是在服务启动的时候就初始化好的，而是在调用的时候才会去创建相应的Client，所以第一次调用的耗时不仅仅包含发送HTTP请求的时间，还包含了创建RibbonClient的时间，这样一来如果创建时间速度较慢，同时设置的超时时间又比较短的话，第一次请求很容易出现超时的情况。设置为true的时候表示开启Ribbon的饥饿加载模式，即在应用启动的时候就去获取相应的Client备用。
- `ribbon.ReadTimeout`，设置请求超时时间，单位为毫秒；

