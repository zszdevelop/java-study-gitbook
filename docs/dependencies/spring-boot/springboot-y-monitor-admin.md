---
order: 420
category:
  - Spring
  - SpringBoot
---
# SpringBoot监控 - 集成springboot admin监控工具

>上文中展示了SpringBoot提供了Actuator对应用进行监控和管理， 而Spring Boot Admin能够将 Actuator 中的信息进行界面化的展示，也可以监控所有 Spring Boot 应用的健康状况，提供实时警报功能。 本文主要介绍springboot admin以及SpringBoot和springboot admin的集成。

## 1. 知识准备

> 需要了解Spring Boot Admin和actuartor之间的关系等。

### 1.1 什么是Spring Boot Admin？和actuartor是什么关系？

> Spring Boot Admin能够将 Actuator 中的信息进行界面化的展示，也可以监控所有 Spring Boot 应用的健康状况，提供实时警报功能。

- **Spring Boot Admin提供的主要功能**

1. 显示健康状况
2. 显示详细信息，例如
   1. JVM和内存指标
   2. micrometer.io指标
   3. 数据源指标
   4. 缓存指标
3. 显示构建信息编号
4. 关注并下载日志文件
5. 查看jvm系统和环境属性
6. 查看Spring Boot配置属性
7. 支持Spring Cloud的postable / env-和/ refresh-endpoint
8. 轻松的日志级管理
9. 与JMX-beans交互
10. 查看线程转储
11. 查看http跟踪
12. 查看auditevents
13. 查看http-endpoints
14. 查看计划任务
15. 查看和删除活动会话（使用spring-session）
16. 查看Flyway / Liquibase数据库迁移
17. 下载heapdump
18. 状态变更通知（通过电子邮件，Slack，Hipchat，…）
19. 状态更改的事件日志（非持久性）

更多的可以[参考](https://github.com/codecentric/spring-boot-admin)

- **Spring Boot Admin不是Spring团队提供的模块**？

它是由Codecentric公司创建的，代码在[Github： spring-boot-admin](https://github.com/codecentric/spring-boot-admin)上。

- **Spring Boot Admin和actuartor是什么关系？**

从如下POM的依赖关系可以看出Spring Boot Admin本质上集成了actuartor，将实时警报，此外添加一些实时警报功能等。

![image-20220720204640820](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220720204640820.png)

### 1.2 SpringBoot Admin的Client和Server？

> Spring Boot Admin（简称SBA）由两部分组成：**SBA Server**和**SBA Client**。

**SBA Server**： 包括Admin用户界面并独立运行于被监控应用

**SBA Client**： 提供一种方式将被监控应用注册到 SBA Server

#### 1.2.1 **为什么Spring Boot Admin设计上会分为Server和Client两个部分**？

1. 首先，Spring Boot Admin做的是集中化的监控（比如应用的集群，多个服务或者微服务等），而不是每个应用都需要有一个UI。
2. 其次，被监控的应用应该是和监控平台是分离的，比如Client应用会挂掉，这时候Server监控依然正常运行并发现和报警Client的异常状态。
3. 再者，还要考虑和其它语言应用，其它平台等的集成等。

#### 1.2.2 **只能通过SBA Client注册到SBA Server吗**？

并不是， 除了SBA Client， SBA 还支持:

1. Spring Cloud Discovery: 为了支持一些微服务框架如SpringCloud等（因为微服务框架中已经包含了服务发现和注册模块）
2. Python Applications Using Pyctuator: 为了支持其它语言开发的应用，比如Python

## 2. 简单示例

> 本例子主要展示SBA Server + SBA Client注册的方式。

### 2.1 启用SBA Server

pom引入包

```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-server</artifactId>
    <version>2.5.3</version>
</dependency>
```

通过@EnableAdminServer注解启用SBA Server

```java
/**
 * @author pdai
 */
@Configuration
@EnableAdminServer
@SpringBootApplication
public class SpringBootHelloWorldApplication {

    /**
     * main interface.
     *
     * @param args args
     */
    public static void main(String[] args) {
        SpringApplication.run(SpringBootHelloWorldApplication.class, args);
    }

}
```

这样你便可以打开如下网址查看Server UI，很显然目前没有客户端注册上来。

![image-20220720205007867](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220720205007867.png)

### 2.2 注册Client

这里采用Spring Boot Admin Client注册的方式。

引入SBA Client的pom依赖

```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-client</artifactId>
    <version>2.5.3</version>
</dependency>
```

添加配置

```yml
spring:
  boot:
    admin:
      client:
        url: 'http://localhost:8080'
management:
  endpoints:
    enabled-by-default: true
    web:
      base-path: /manage
      exposure:
        include: '*'
  
```

### 2.3 演示效果

打开 http://localhost:8080/wallboard

![image-20220720205101689](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220720205101689.png)

左侧是主要功能：

Insight - Details

![image-20220720205624005](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220720205624005.png)

Insight - Metrics

![image-20220720205743086](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220720205743086.png)

Insight - Configurations

![image-20220720205832953](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220720205832953.png)

Loggers

![image-20220720205910150](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220720205910150.png)

JVM

![image-20220720210025579](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220720210025579.png)

Mappings

![image-20220720210045166](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220720210045166.png)

## 3. 进一步理解

> 我们再通过一些问题来帮助你更深入理解SBA， 更详细的内容可以参考[官网文档  ](https://codecentric.github.io/spring-boot-admin/current)。

### 3.1 如何启用JMX管理？

默认下SBA没有启用JMX，需要通过如下配置启用。

首先需要引入POM依赖（PS：需要SpringBoot2.2+ 版本）

```xml
<dependency>
    <groupId>org.jolokia</groupId>
    <artifactId>jolokia-core</artifactId>
</dependency>
```

启用JMX

```yml
spring:
  jmx:
    enabled: true
```

刷新SBA UI就可以看到增加了JMX相关的连接

![image-20220720210348392](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220720210348392.png)

### 3.2 如何显示日志内容？

默认下没有显示Log File的内容，如果需要显示SpringBoot应用日志需要进行如下配置（配置logging.file.path 或者logging.file.name）。

```yml
logging:
  file:
    name: 'pdai-spring-boot-application.log'
  pattern:
    file: '%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint} %clr(%5p) %clr(${PID}){magenta} %clr(---){faint} %clr([%15.15t]){faint} %clr(%-40.40logger{39}){cyan} %clr(:){faint} %m%n%wEx'
```

刷新SBA UI就可以看到增加了日志文件相关的连接

![image-20220720210606935](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220720210606935.png)

### 3.3 如何继承Spring Security？

可以通过如下继承spring-boot-starter-security

添加pom依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

添加HttpSecurity配置

```java
@Configuration
public static class SecurityPermitAllConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().anyRequest().permitAll()  
            .and().csrf().disable();
    }
}
```

其它安全相关配置可以参考[官网文档](https://codecentric.github.io/spring-boot-admin/current/#securing-spring-boot-admin)

### 3.4 如何通知告警信息？

可以通过集成 spring-boot-starter-mail 配置JavaMailSender 来用邮件通知信息。

添加pom依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

添加配置信息

```yml
spring.mail.host=smtp.example.com
spring.boot.admin.notify.mail.to=admin@example.com
```

除了邮件通知这种，内置还支持很多其他方式以及支持自定义notification，比如钉钉，微信通知等

![image-20220720210755484](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220720210755484.png)

## 参考文章

[**SpringBoot监控 - 集成springboot admin监控工具**](https://pdai.tech/md/spring/springboot/springboot-x-monitor-boot-admin.html)