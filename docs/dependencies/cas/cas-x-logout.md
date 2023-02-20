---
order: 50
category:
  - CAS
---

# CAS单点登录 - SpringBoot自动/手动配置方式集成CAS单点登出

## 1. 本文目标

基于SpringBoot + Maven 分别使用自动配置与手动配置过滤器方式实现CAS客户端登出及单点登出。

> 本文基于《[CAS学习笔记三：SpringBoot自动/手动配置方式集成CAS单点登录](https://www.cnblogs.com/hellxz/p/15768700.html)》的代码扩充而来，完整代码见 https://github.com/hellxz/cas-integration-demo

## 2. CAS服务端配置

单点登出跟随 `service` 给出的跳转地址重定向功能 在 CAS 服务端默认是关闭的，所以需要先开启它。

```bash
vim webapps/cas/WEB-INF/classes/application.properties
```

在最下方追加配置项 `cas.logout.followServiceRedirects=true`，保存重启CAS服务端。

## 3. 代码目录结构

![image-20230216205639273](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216205639273.png)

> 以上红字仅对本文修改的部分进行说明，其余请参考之前单点登录的实现文章。

## 4. 代码实现

> 仅增量介绍关键类

### 4.1 SpringBoot自动配置登出实现

CasClientConfigurerImpl.java

```java
package com.hellxz.cas;
 
import java.util.Map;
 
import org.jasig.cas.client.boot.configuration.CasClientConfigurer;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.stereotype.Component;
 
/**
 * cas-client-support-springboot 依赖提供了CAS客户端的自动配置，
 * 当自动配置不满足需要时，可通过实现{@link CasClientConfigurer}接口来重写需要自定义的逻辑
 */
@Component
public class CasClientConfigurerImpl implements CasClientConfigurer {
 
    /**
     * 配置认证过滤器，添加忽略参数，使/logoutPage登出提示页免登录
     */
    @Override
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public void configureAuthenticationFilter(final FilterRegistrationBean authenticationFilter) {
        Map initParameters = authenticationFilter.getInitParameters();
        initParameters.put("ignorePattern", "/logoutPage");
    }
 
}
```

> 上边这个配置类的作用是自定义认证过滤器，将 `/logoutPage` 排除不走认证逻辑，此页面用于显示登出提示。

CasAutoConfigApp.java

```java
package com.hellxz.cas;
 
import java.io.IOException;
 
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
 
import org.jasig.cas.client.boot.configuration.EnableCasClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
 
@SpringBootApplication
@RestController
@EnableCasClient
public class CasAutoConfigApp {
    @Value("${custom.cas.single-logout-url:}")
    public String casSingleLogoutUrl;
 
    public static void main(String[] args) {
        SpringApplication.run(CasAutoConfigApp.class, args);
    }
 
    @GetMapping("/test")
    public String test(HttpServletRequest request) {
        return "服务A测试通过";
    }
    
    /**
     * 首页，需要登录
     */
    @GetMapping("/index")
    public String index(HttpServletRequest request) {
      //@formatter:off
        return "<h1>登录成功</h1><br><br>"
                + "<a href=\"/logout\">退出登录</a><br><br>"
                + "<a href=\"" + casSingleLogoutUrl + "\">全局退出登录</a>";
      //@formatter:on
    }
 
    /**
     * 登出提示页，免登录
     */
    @GetMapping("/logoutPage")
    public String logoutPage(HttpServletResponse response) {
        //@formatter:off
        return "<h1>您已退出登录成功。</h1><br><br>"
                + "<a href=\"/index\">去登录</a><br><br>"
                + "<a href=\"" + casSingleLogoutUrl + "\">全局退出登录</a>";
        //@formatter:on
    }
 
    /**
     * 退出登录，跳转登出提示页
     */
    @GetMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 过期会话
            session.invalidate();
        }
        // 跳转登出提示页
        response.sendRedirect("/logoutPage");
    }
 
}
 
```

> 较上一迭代新增了 `/index`（主页）、`/logoutPage`（登出提示页）、`/logout` （客户端退出登录）这三个接口。其中只有 `/logout` 接口是免登录的，为了防止出现重定向回来自动登录的情况。

application.properties

![image-20230216210134009](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216210134009.png)

> 这里启用了单点登出配置项，`CasClientConfiguration` 中的 `casSingleSignOutFilter()` 与 `casSingleSignOutListener()` 这两个方法激活，注册Bean到MVC容器中。
>
> 自定义单点登出地址相当于拼接 CAS服务端登出地址与回调重定向地址，这里配置成免登录的客户端地址 `/logoutPage`。

### 4.2 手动配置登出实现

CasConfig.java，是上一迭代的Config.java重命名而来。

```java
package com.hellxz.cas;
 
import java.util.EventListener;
import java.util.HashMap;
import java.util.Map;
 
import org.jasig.cas.client.authentication.AuthenticationFilter;
import org.jasig.cas.client.session.SingleSignOutFilter;
import org.jasig.cas.client.session.SingleSignOutHttpSessionListener;
import org.jasig.cas.client.util.HttpServletRequestWrapperFilter;
import org.jasig.cas.client.validation.Cas30ProxyReceivingTicketValidationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
 
@Configuration
public class CasConfig {
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
     * 监听登出事件，清除session与token之间的映射关系及CAS会话记录
     */
    @Bean
    public ServletListenerRegistrationBean<EventListener> casSingleSignOutListener() {
        ServletListenerRegistrationBean<EventListener> singleSignOutListener = new ServletListenerRegistrationBean<>();
        singleSignOutListener.setListener(new SingleSignOutHttpSessionListener());
        return singleSignOutListener;
    }
 
    @Bean
    @Order(0)
    public FilterRegistrationBean<SingleSignOutFilter> casSingleSignOutFilter() {
        FilterRegistrationBean<SingleSignOutFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new SingleSignOutFilter());
        registration.setName("CAS Single Sign Out Filter");
        Map<String, String> initParams = new HashMap<>();
        initParams.put("casServerUrlPrefix", casServerUrlPrefix); // CAS服务端地址，会拼接为登录地址
        initParams.put("serverName", serverName); // 服务地址
        registration.setInitParameters(initParams);
        registration.addUrlPatterns("/*");
        return registration;
    }
 
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
 
        // 自定义忽略认证的路径或表达式，这里用来免登录访问【退出登录提示】页面
        initParams.put("ignorePattern", "/logoutPage");
 
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

> 新增了 `casSingleSignOutListener()` （配置单点登出监听器）、`casSingleSignOutFilter()`（单点登出过滤器）以及 将登出提示页从认证过滤器处放行。
>
> ```java
> // 自定义忽略认证的路径或表达式，这里用来免登录访问【退出登录提示】页面
> initParams.put("ignorePattern", "/logoutPage");
> ```
>
> 需注意单点登出过滤器的排序要早于认证过滤器、校验票据过滤器。

CasManualConfigApp.java

```java
package com.hellxz.cas;
 
import java.io.IOException;
 
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
 
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
 
@RestController
@SpringBootApplication
public class CasManualConfigApp {
 
    /**
     * 自定义全局单点登出地址，由cas服务端地址/logout?service=当前serviceName/logoutPage组成<br>
     * 当cas全局登出（带TGC访问cas的/logout接口）成功后，会重定向service参数地址<br>
     * 
     * <pre>
     * 需注意：service参数必须含登录时注册给CAS的serviceName，否则只废弃CAS会话而不会重定向
     * </pre>
     */
    @Value("${custom.cas.casSingleLogoutUrl:}")
    private String casSingleLogoutUrl;
 
    public static void main(String[] args) {
        SpringApplication.run(CasManualConfigApp.class, args);
    }
 
    @GetMapping("/test")
    public String test(HttpServletRequest request) {
        return "服务B测试通过";
    }
 
    /**
     * 首页，需要登录
     */
    @GetMapping("/index")
    public String index(HttpServletRequest request) {
      //@formatter:off
        return "<h1>登录成功</h1><br><br>"
                + "<a href=\"/logout\">退出登录</a><br><br>"
                + "<a href=\"" + casSingleLogoutUrl + "\">全局退出登录</a>";
      //@formatter:on
    }
 
    /**
     * 登出提示页，免登录
     */
    @GetMapping("/logoutPage")
    public String logoutPage(HttpServletResponse response) {
        //@formatter:off
        return "<h1>您已退出登录成功。</h1><br><br>"
                + "<a href=\"/index\">去登录</a><br><br>"
                + "<a href=\"" + casSingleLogoutUrl + "\">全局退出登录</a>";
        //@formatter:on
    }
 
    /**
     * 退出登录，跳转登出提示页
     */
    @GetMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 过期会话
            session.invalidate();
        }
        // 跳转登出提示页
        response.sendRedirect("/logoutPage");
    }
}
```

> 与 自动配置实现基本一致，添加几个接口供测试

application.properties

![image-20230216210236234](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216210236234.png)

## 5. 验证实现

> 以本地IP为 10.2.6.63，自动配置端口8081，手动配置端口 8082，CAS服务端192.168.56.104:8088/cas 为例

### 5.1 单点登录

启动自动配置服务，访问本地端口号8081，我这里是 http://10.2.6.63:8081/index ，访问首页立即跳转CAS登录页面

![image-20230216210331574](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216210331574.png)

输入用户名与密码，casuser/Mellon，登录。如下图单点登录成功

![image-20230216210404288](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216210404288.png)

### 5.2 客户端登出

先验证退出客户端登出，点 `退出登录`。如图进入登出成功提示页面

![image-20230216210441988](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216210441988.png)

检察下 /logout 接口的 cookie值，此处是 `95E21E8D67C363A7432C342EDACB4DE8`

![image-20230216210536528](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216210536528.png)

再点击 `去登录`，这是访问 /index，可以看到又登录成功了，而且这次没有手输账号密码，查看了cookie中的会话id为 `6157E88046280B3E90A502016F98549A`，与退出之前不是同一会话

![image-20230216210613247](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216210613247.png)

### 5.3 单点登出

接下来验证CAS单点登出，点击 `全局退出登录`。如下图，可见访问CAS服务端 /logout接口，并传递了回调地址为登出提示页面，最终回到了提示页面。

![image-20230216210654135](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216210654135.png)

我们再试验一下 `去登录`，验证是否需要手输账号密码登录。

![image-20230216210723870](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216210723870.png)

如上图，的确需要手输账号才能登录，说明单点登出功能正常。

### 5.4 CAS客户端单点登出日志

由于自动配置项目我没配置单点登出 `trace` 等级日志，我们用 手动配置服务登录再全局退出下，看看日志。

启动手动配置服务，访问 http://10.2.6.63:8082/index，登录后再全局退出。日志如下：

```bash
2022-01-18 23:22:38.237 TRACE 24016 --- [nio-8082-exec-1] o.j.c.c.session.SingleSignOutHandler     : Ignoring URI for logout: /index
2022-01-18 23:22:40.401 TRACE 24016 --- [nio-8082-exec-4] o.j.c.c.session.SingleSignOutHandler     : Received a token request
2022-01-18 23:22:40.406 DEBUG 24016 --- [nio-8082-exec-4] o.j.c.c.session.SingleSignOutHandler     : Recording session for token ST-61-aJ6BwiVkekqtkqlIXmmyWAYq6sMlocalhost
2022-01-18 23:22:40.535 TRACE 24016 --- [nio-8082-exec-3] o.j.c.c.session.SingleSignOutHandler     : Ignoring URI for logout: /index
2022-01-18 23:22:43.698 TRACE 24016 --- [nio-8082-exec-5] o.j.c.c.session.SingleSignOutHandler     : Received a logout request
2022-01-18 23:22:43.699 TRACE 24016 --- [nio-8082-exec-5] o.j.c.c.session.SingleSignOutHandler     : Logout request:
<samlp:LogoutRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" ID="LR-37-W7V-UYdTLhGkwl7P2w2somtR" Version="2.0" IssueInstant="2022-01-18T10:22:43Z"><saml:NameID xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">@NOT_USED@</saml:NameID><samlp:SessionIndex>ST-61-aJ6BwiVkekqtkqlIXmmyWAYq6sMlocalhost</samlp:SessionIndex></samlp:LogoutRequest>
2022-01-18 23:22:43.702 DEBUG 24016 --- [nio-8082-exec-5] o.j.c.c.session.SingleSignOutHandler     : Invalidating session [DB43DC21DCC1663D64968E8DBD48B247] for token [ST-61-aJ6BwiVkekqtkqlIXmmyWAYq6sMlocalhost]
2022-01-18 23:22:43.712 TRACE 24016 --- [nio-8082-exec-2] o.j.c.c.session.SingleSignOutHandler     : Ignoring URI for logout: /logoutPage
```

可以看到：

- 登录成功的日志 `Recording session for token ST-61-aJ6BwiVkekqtkqlIXmmyWAYq6sMlocalhost`
- 单点登出的日志： `Received a logout request` 和 `Logout request: <samlp:LogoutRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" ID="LR-37-W7V-UYdTLhGkwl7P2w2somtR" Version="2.0" IssueInstant="2022-01-18T10:22:43Z"><saml:NameID xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">@NOT_USED@</saml:NameID><samlp:SessionIndex>ST-61-aJ6BwiVkekqtkqlIXmmyWAYq6sMlocalhost</samlp:SessionIndex></samlp:LogoutRequest>`
- 过期当前客户端会话的 `Invalidating session [DB43DC21DCC1663D64968E8DBD48B247] for token [ST-61-aJ6BwiVkekqtkqlIXmmyWAYq6sMlocalhost]`

至此验证客户端登出及单点登出功能一切正常。

> 自动配置和手动配置这两个工程的效果是一样的，笔者已经亲身测试OK，就不在此重复表述了。

## 6. 总结

本次编写的 demo 恰如其分地验证了CAS客户端登出与单点登出的流程，即客户端登出（过期自己）及单点登出（过期自己以及所有相关客户端）。

## 参考文章

[CAS学习笔记五：SpringBoot自动/手动配置方式集成CAS单点登出](https://www.cnblogs.com/hellxz/p/15820465.html)