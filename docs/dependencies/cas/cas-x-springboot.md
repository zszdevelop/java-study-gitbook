---
order: 30
category:
  - CAS
---

# CAS单点登录 - SpringBoot自动/手动配置方式集成CAS单点登录

## 1. 本文目标

基于SpringBoot + Maven 分别使用自动配置与手动配置过滤器方式集成CAS客户端。

> - 需要提前搭建 CAS 服务端，参考 https://www.cnblogs.com/hellxz/p/15740935.html
> - 代码已上传本人 GitHub https://github.com/hellxz/cas-integration-demo

## 2. 代码目录结构

![image-20230215221249631](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215221249631.png)



## 3. 代码实现

### 3.1 父工程 cas-integration-demo

#### 3.1.1 pom.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.hellxz</groupId>
    <artifactId>cas-integration-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>pom</packaging>
 
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.0</version>
        <relativePath /> <!-- lookup parent from repository -->
    </parent>
 
 
    <modules>
        <!-- 自动配置demo A -->
        <module>demo-a-auto-config</module>
        <!-- 手动配置demo B -->
        <module>demo-b-manual-config</module>
    </modules>
 
    <properties>
        <java.version>1.8</java.version>
        <!-- 指定cas客户端版本 -->
        <cas.client.version>3.6.3</cas.client.version>
    </properties>
 
    <dependencies>
        <!-- 引入web starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
 
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### 3.2 自动配置工程 demo-a-auto-config

> 下文简称此工程为 `服务A`

#### 3.2.1 pom.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.hellxz</groupId>
        <artifactId>cas-integration-demo</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </parent>
    <artifactId>demo-a-auto-config</artifactId>
 
    <dependencies>
        <dependency>
            <groupId>org.jasig.cas.client</groupId>
            <artifactId>cas-client-support-springboot</artifactId>
            <version>${cas.client.version}</version>
        </dependency>
    </dependencies>
</project>
```

#### 3.2.2 com.hellxz.cas.CasAutoConfigApp.java

```java
package com.hellxz.cas;
 
import javax.servlet.http.HttpServletRequest;
 
import org.jasig.cas.client.boot.configuration.EnableCasClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
 
@SpringBootApplication
@RestController
@EnableCasClient //<--自动配置只需要启用此注解
public class CasAutoConfigApp {
 
    public static void main(String[] args) {
        SpringApplication.run(CasAutoConfigApp.class, args);
    }
 
    @GetMapping("/test")
    public String test(HttpServletRequest request) {
        return "服务A测试通过";
    }
 
}
 
```

#### 3.2.3 application.properties

```properties
server.port=8081

#CAS配置，更多参数见https://github.com/apereo/java-cas-client#spring-boot-autoconfiguration
#cas服务端地址
cas.server-url-prefix=http://192.168.56.104:8080/cas
#cas服务端登录地址
cas.server-login-url=http://192.168.56.104:8080/cas/login
#当前服务地址
cas.client-host-url=http://10.2.6.63:8081
#校验ticket使用的协议，可选： CAS（代表CAS2）、CAS3、SAML
cas.validation-type=CAS3
```

> 注意替换 CAS 服务端地址 及 客户端 IP

### 3.3 手动配置工程 demo-b-manual-config

> 下文简称此工程为 `服务B`

#### 3.3.1 pom.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.hellxz</groupId>
        <artifactId>cas-integration-demo</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </parent>
    <artifactId>demo-b-manual-config</artifactId>
 
    <dependencies>
        <dependency>
            <groupId>org.jasig.cas.client</groupId>
            <artifactId>cas-client-core</artifactId>
            <version>${cas.client.version}</version>
        </dependency>
    </dependencies>
</project>
```

#### 3.3.2 com.hellxz.cas.CasManualConfigApp.java

```java
package com.hellxz.cas;
 
import javax.servlet.http.HttpServletRequest;
 
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
 
@RestController
@SpringBootApplication
public class CasManualConfigApp {
 
    public static void main(String[] args) {
        SpringApplication.run(CasManualConfigApp.class, args);
    }
 
    @GetMapping("/test")
    public String test(HttpServletRequest request) {
        return "服务B测试通过";
    }
 
}
```

com.hellxz.cas.Config.java

```java
package com.hellxz.cas;
 
import java.util.HashMap;
import java.util.Map;
 
import org.jasig.cas.client.authentication.AuthenticationFilter;
import org.jasig.cas.client.util.HttpServletRequestWrapperFilter;
import org.jasig.cas.client.validation.Cas30ProxyReceivingTicketValidationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
 
@Configuration
public class Config {
    /**
     * 自定义cas服务地址
     */
    @Value("${custom.cas.casServerUrlPrefix:}")
    private String casServerUrlPrefix;
 
    /**
     * 自定义服务标识，格式为{protocol}:{hostName}:{port}
     */
    @Value("${custom.cas.serverName:}")
    private String serverName;
 
    /**
     * 拦截所有请求，将未携带票据与会话中无票据的请求都重定向到CAS登录地址
     */
    @Bean
    @Order(1)
    public FilterRegistrationBean<AuthenticationFilter> casAuthenticationFilter() {
        FilterRegistrationBean<AuthenticationFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new AuthenticationFilter());
        registration.setName("CAS Authentication Filter");
        Map<String, String> initParams = new HashMap<>();
        initParams.put("casServerUrlPrefix", casServerUrlPrefix); // CAS服务端地址，会拼接为登录地址
        initParams.put("serverName", serverName); // 服务地址
        registration.setInitParameters(initParams);
        registration.addUrlPatterns("/*");
        return registration;
    }
 
    /**
     * 拦截所有请求，使用获取的票据向CAS服务端发起校验票据请求
     */
    @Bean
    @Order(2)
    public FilterRegistrationBean<Cas30ProxyReceivingTicketValidationFilter> cas30TicketValidationFilter() {
        FilterRegistrationBean<Cas30ProxyReceivingTicketValidationFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new Cas30ProxyReceivingTicketValidationFilter());
        registration.setName("CAS30 Ticket Validation Filter");
        Map<String, String> initParams = new HashMap<>();
        initParams.put("casServerUrlPrefix", casServerUrlPrefix); // CAS服务端地址，会拼接为服务校验地址
        initParams.put("serverName", serverName);
        registration.setInitParameters(initParams);
        registration.addUrlPatterns("/*");
        return registration;
    }
 
    /**
     * 包装HttpServletRequest，使CAS登录成功的用户名等信息存入请求中<br>
     * <br>
     * 登录成功后以下两个方法将不再返回null: <br>
     * 
     * <pre>
     * HttpServletRequest#getUserPrincipal()
     * HttpServletRequest#getRemoteUser()
     * </pre>
     */
    @Bean
    @Order(3)
    public FilterRegistrationBean<HttpServletRequestWrapperFilter> httpServletRequestWrapperFilter() {
        FilterRegistrationBean<HttpServletRequestWrapperFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new HttpServletRequestWrapperFilter());
        registration.setName("HttpServletRequest Wrapper Filter");
        registration.addUrlPatterns("/*");
        return registration;
    }
 
}
```

#### 3.3.3 application.properties

```properties
server.port=8082
#cas服务端地址
custom.cas.casServerUrlPrefix=http://192.168.56.104:8080/cas
#当前服务地址
custom.cas.serverName=http://10.2.6.63:8082
```

> 注意替换 CAS 服务端地址 及 客户端 IP

## 4. 验证单点登录流程

1、分别启动 `demo-a-auto-config` 与 `demo-b-manual-config`

2、打开浏览器输入 `demo部署的IP:8081/test`，访问服务A，访问后立即跳转CAS登录

![image-20230215221810208](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215221810208.png)

![image-20230215221835463](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215221835463.png)

3、输入默认用户名/密码 `casuser/Mellon`，登录成功返回服务A的字样，让我们看看登录请求后发生了什么：

登录成功后，响应头Set-Cookie回写了名为 TGC 的Cookie，并且还有 Location 重定向，URL上传了 ST (服务票据)

![image-20230215222035227](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215222035227.png)

重定向到服务A，服务A验证ST（忽略此流程，它不在浏览器端体现），校验通过回写Cookie，重定向回服务A的 `/test`接口

![image-20230215222213032](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215222213032.png)

接着访问服务A接口，完成响应，此时服务A单点登录已经成功了。

![image-20230215222313275](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215222313275.png)

4、清网络记录，再访问服务B的接口 `服务B地址:8081/test`，可以看到立即跳转成功了，查看下请求，主要是 /cas/login 请求

![image-20230215222404364](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215222404364.png)

![image-20230215222445408](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215222445408.png)

后边校验ST重定向与访问服务A时过程一致，不再赘述。CAS单点登录验证通过。

## 5. 代码解释

### 5.1 自动配置demo（服务A）

SpringBoot集成CAS客户端比较简单，此处用的是官方方式。首先引入自动配置依赖，并启用 `@EnableCasClient` 注解

```xml
        <dependency>
            <groupId>org.jasig.cas.client</groupId>
            <artifactId>cas-client-support-springboot</artifactId>
            <version>${cas.client.version}</version>
        </dependency>
```

此依赖引用了 `cas-client-core.jar` （核心包）与 `cas-client-support-saml.jar` （saml验签协议支持），另外 `cas-client-support-springboot.jar` 中还有配置类

![image-20230215222617263](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215222617263.png)



其中：

1、`EnableCasClient` 注解类引入了配置类 `CasClientConfiguration`

![image-20230215222702239](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215222702239.png)

2、`CasClientConfiguration` 配置类中使用 `CasClientConfigurationProperties` 读取配置文件，根据配置内容注册 Spring Bean

![image-20230215222723972](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215222723972.png)

3、`CasClientConfiguration` 配置类中做了以下几件事：

- `casAuthenticationFilter()` 创建了 认证过滤器
- `casValidationFilter()` 创建了 验证票据过滤器
- `casHttpServletRequestWrapperFilter()` 创建了请求对象的包装类
- `casAssertionThreadLocalFilter()` 创建了将 `Assertion` 放到 `ThreadLocal` 的过滤器，对于获取不到`HttpRequest` 请求对象的情况这很有用
- `casSingleSignOutFilter()` 创建了单点登出的过滤器
- `casSingleSignOutListener()` 创建单点登出的Listener，用于监听登出事件，清理内存中单点登录会话缓存
- `SpringSecurityAssertionAutoConfiguration` 兼容Spring Security的配置类

其中对于单点登录最重要的是 `casAuthenticationFilter()`、`casValidationFilter()` 这两个方法，另外以上几个方法创建的对象类都在 `cas-client-core.jar` ，也就是说可以只引这一个包，然后自行配置。

有了自动配置我们再来看手动配置就比较简单了。

### 5.2 手动配置demo （服务B）

刚才也说了 `cas-client-core.jar` 是CAS客户端的核心依赖，必须引用！

```xml
        <dependency>
            <groupId>org.jasig.cas.client</groupId>
            <artifactId>cas-client-core</artifactId>
            <version>${cas.client.version}</version>
        </dependency>
```

然后就是编写配置类 `com.hellxz.cas.Config.java`，使用 `@Value` 读取配置文件，生成最关键的2个过滤器 `AuthenticationFilter` 与 `Cas30ProxyReceivingTicketValidationFilter`，为便于获取用户名配置了 `HttpServletRequestWrapperFilter` 过滤器，相当于自动配置demo的配置类简化版，如此而已。

> 至于为什么用 `Cas30ProxyReceivingTicketValidationFilter`，`AbstractTicketValidationFilter` 是个抽象类，具体用哪个实现根据协议需要选择就可以了，更多配置参考官方客户端源码仓库 https://github.com/apereo/java-cas-client

## 6. 总结

根据本次 集成 CAS 单点登录代码的编写与求证，验证了上篇文章 CAS 单点登录的流程，相信大家对CAS更加了解了。

## 参考文章

[CAS学习笔记三：SpringBoot自动/手动配置方式集成CAS单点登录](https://www.cnblogs.com/hellxz/p/15768700.html)