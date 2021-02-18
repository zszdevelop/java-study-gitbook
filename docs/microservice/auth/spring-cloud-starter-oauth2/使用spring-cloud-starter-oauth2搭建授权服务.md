# 使用spring-cloud-starter-oauth2搭建授权服务

spring-cloud-starter-oauth2 是 Spring 对OAuth 的开源实现，可以无缝和Spirng cloud 集成。

## 1.添加pom依赖

授权服务是基于Spring Security的，因此需要在项目引入两个依赖

```xml
<dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-security</artifactId>
</dependency>

<dependency>
         <groupId>org.springframework.cloud</groupId>
         <artifactId>spring-cloud-starter-oauth2</artifactId>
 </dependency>
```

前者为 Security，后者为Security的OAuth2扩展。

## 2. 添加注解和配置

在启动类中添加在**启动类或配置类**中添加`@EnableAuthorizationServer`注解：

```java
@SpringBootApplication
@EnableAuthorizationServer
public class AlanOAuthApplication {
    public static void main(String[] args) {
        SpringApplication.run(AlanOAuthApplication.class, args);
    }
}
```

完成这些我们的授权服务最基本的骨架就已经搭建完成了，但是要想跑通整个流程，我们必须分配`client_id`, `client_secret`才行。Spring Security Oauth2 的配置方法是编写`@Configuration`类继承`AuthorizationServerConfigurerAdapter`，然后重写`void configure(ClientDetailsServiceConfigurer clients)`方法，如：

```java
@Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory() // 使用in-memory存储
                .withClient("client") // client_id
                .secret("secret") // client_secret
                .authorizedGrantTypes("authorization_code") // 该client允许的授权类型
                .scopes("app"); // 允许的授权范围
    }
```

当然这里除了使用内存，还能使用数据库存储之类的，演示方便使用了内存

## 3. 授权流程

访问授权页面：

```
localhost:8080/oauth/authorize?client_id=client&response_type=code&redirect_uri=http://www.baidu.com
```

此时浏览器会让你输入用户名密码，这是因为 Spring Security 在默认情况下会对所有URL添加Basic Auth认证。默认的用户名为`user`, 密码是随机生成的，在控制台日志中可以看到。