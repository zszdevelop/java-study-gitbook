# SpringBoot整合Eureka

微服务注册中心的作用就是用于统一管理微服务实例，微服务间的调用只需要知道对方的服务名，而无需关注具体的IP 和端口，便于微服务架构的拓展和维护。

## 1. 创建一个SpringBoot 项目

![image-20191114002801896](/Users/zhangshengzhong/Library/Application Support/typora-user-images/image-20191114002801896.png)

## 2. 添加POM 依赖

```XML
<dependency>
   <groupId>org.springframework.cloud</groupId>
   <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

## 3. 在启动类上使用@EnableEurekaServer 注解

在启动类上使用@EnableEurekaServer 注解，用以开启Eureka服务端功能：

```java
@EnableEurekaServer
@SpringBootApplication
public class RegisterApplication {

    public static void main(String[] args) {
        SpringApplication.run(FebsRegisterApplication.class, args);
    }
}
```

## 4. 编写配置文件

```yml
server:
  port: 8001
  servlet:
    context-path: /register

spring:
  application:
    name: Register

eureka:
  instance:
    hostname: localhost
  client:
    register-with-eureka: false
    fetch-registry: false
    instance-info-replication-interval-seconds: 30
    serviceUrl:
      defaultZone: http://${eureka.instance.hostname}:${server.port}${server.servlet.context-path}/eureka/

```

- `spring.application.name`，定义服务名称为Register;
- `eureka.instance.hostname`，指定了Eureka服务端的地址，因为我们是在本地搭建的，所以填写为`localhost`即可；
- `eureka.client.register-with-eureka`，表示是否将服务注册到Eureka服务端，由于我们这里是单节点的Eureka服务端，所以这里指定false；
- `eureka.client.fetch-registry`，表示是否从Eureka服务端获取服务信息，因为这里是单节点的Eureka服务端，并不需要从别的Eureka服务端同步服务信息，所以这里设置为false；
- `eureka.client.instance-info-replication-interval-seconds`，微服务更新实例信息的变化到Eureka服务端的间隔时间，单位为秒，这里指定为30秒（这就是微服务启动后，要过一会才能注册到Eureka服务端的原因）。
- `eureka.client.serviceUrl.defaultZone`，指定Eureka服务端的地址，这里为当前项目地址，即 http://localhost:8001/register/eureka/