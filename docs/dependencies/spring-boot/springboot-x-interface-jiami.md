---
order: 230
category:
  - Spring
  - SpringBoot
---
# SpringBoot接口 - 如何对接口进行签名

>在以SpringBoot开发后台API接口时，会存在哪些接口不安全的因素呢？通常如何去解决的呢？本文主要介绍API**接口有不安全的因素**以及**常见的保证接口安全的方式**，重点**实践如何对接口进行签名**。

## 1. 准备知识点

> 建议从接口整体的安全体系角度来理解，比如存在哪些不安全的因素，加密解密等知识点。

### 1.1 API接口有哪些不安全的因素？

> 这里从体系角度，简单列举一些不安全的因素：

- 开发者访问开放接口
  - 是不是一个合法的开发者？
- 多客户端访问接口
  - 是不是一个合法的客户端？
- 用户访问接口
  - 是不是一个合法的用户?
  - 有没有权限访问接口？
- 接口传输
  - http明文传输数据？
- 其它方面
  - 接口重放，上文介绍的[接口幂等]()
  - 接口超时，加timestamp控制？
  - ...

## 2. 常见的保证接口安全的方式？

> 针对上述接口存在的不安全因素，这里向你展示一些典型的保障接口安全的方式。

### 2.1 AccessKey&SecretKey

> 这种设计一般用在开发接口的安全，以确保是一个**合法的开发者**。

- AccessKey： 开发者唯一标识
- SecretKey: 开发者密钥

以阿里云相关产品为例

![image-20220716220503018](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220716220503018.png)

### 2.2 认证和授权

> 从两个视角去看
>
> - 第一: **认证和授权**，认证是访问者的合法性，授权是访问者的权限分级；
> - 第二: 其中认证包括**对客户端的认证**以及**对用户的认证**；

- **对于客户端的认证**

典型的是AppKey&AppSecret，或者ClientId&ClientSecret等

比如oauth2协议的`client_credentials`模式

```bash
https://api.xxxx.com/token?grant_type=client_credentials&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
```

grant_type参数等于client_credentials表示client credentials方式，client_id是客户端id，client_secret是客户端密钥。

返回token后，通过token访问其它接口。

- **对于用户的认证和授权**

比如oauth2协议的授权码模式(authorization code)和密码模式(resource owner password credentials)

```bash
https://api.xxxx.com/token?grant_type=password&username=USERNAME&password=PASSWORD&client_id=CLIENT_ID&scope=read
```

grant_type参数等于password表示密码方式，client_id是客户端id，username是用户名，password是密码。

(PS：password模式只有在授权码模式(authorization code)不可用时才会采用，这里只是举个例子而已)

可选参数scope表示申请的权限范围。（相关开发框架可以参考spring security, Apache Shiro，[SA-Token](https://sa-token.dev33.cn/doc/index.html)等）

### 2.3 https

> 从接口传输安全的角度，防止接口数据明文传输， 具体可以看[这里](https://pdai.tech/md/develop/protocol/dev-protocol-http.html#%E8%AE%A4%E8%AF%81)

HTTP 有以下安全性问题:

- 使用明文进行通信，内容可能会被窃听；
- 不验证通信方的身份，通信方的身份有可能遭遇伪装；
- 无法证明报文的完整性，报文有可能遭篡改。

HTTPs 并不是新协议，而是让 HTTP 先和 SSL(Secure Sockets Layer)通信，再由 SSL 和 TCP 通信，也就是说 HTTPs 使用了隧道进行通信。

通过使用 SSL，HTTPs 具有了加密(防窃听)、认证(防伪装)和完整性保护(防篡改)。

![image-20220716221336226](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220716221336226.png)

### 2.4 接口签名（加密）

> 接口签名（加密），主要防止请求参数被篡改。特别是安全要求比较高的接口，比如支付领域的接口。

#### 2.4.1 **签名的主要流程**

首先我们需要分配给客户端一个私钥用于URL签名加密，一般的签名算法如下：

1、首先对请求参数按key进行字母排序放入有序集合中（其它参数请参看后续补充部分）；

2、对排序完的数组键值对用&进行连接，形成用于加密的参数字符串；

3、在加密的参数字符串前面或者后面加上私钥，然后用加密算法进行加密，得到sign，然后随着请求接口一起传给服务器。

例如： https://api.xxxx.com/token?key=value&timetamp=xxxx&sign=xxxx-xxx-xxx-xxxx

服务器端接收到请求后，用同样的算法获得服务器的sign，对比客户端的sign是否一致，如果一致请求有效；如果不一致返回指定的错误信息。

#### 2.4.2 对什么签名？

1. 主要包括请求参数，这是最主要的部分，**签名的目的要防止参数被篡改，就要对可能被篡改的参数签名**；
2. 同时考虑到请求参数的来源可能是请求路径path中，请求header中，请求body中。
3. 如果对客户端分配了AppKey&AppSecret，也可加入签名计算；
4. 考虑到其它幂等，token失效等，也会将涉及的参数一并加入签名，比如timestamp，流水号nonce等（这些参数可能来源于header）

#### 2.4.3 **签名算法？**

一般涉及这块，主要包含三点：密钥，签名算法，签名规则

1. **密钥secret**： 前后端约定的secret，这里要注意前端可能无法妥善保存好secret，比如SPA单页应用；
2. **签名算法**：也不一定要是对称加密算法，对称是反过来解析sign，这里是用同样的算法和规则计算出sign，并对比前端传过来的sign是否一致。
3. **签名规则**：比如多次加盐加密等；

> PS：有读者会问，我们是可能从有些客户端获取密钥，算法和规则的（比如前端SPA单页应用生成的js中获取密钥，算法和规则），那么签名的意义在哪里？我认为签名是手段而不是目的，签名是加大攻击者攻击难度的一种手段，至少是可以抵挡大部分简单的攻击的，再加上其它防范方式（流水号，时间戳，token等)进一步提升攻击的难度而已。

#### 2.4.4 签名和加密是不是一回事？

严格来说不是一回事：

1. **签名**是通过对参数按照指定的算法、规则计算出sign，最后前后端通过同样的算法计算出sign是否一致来防止参数篡改的，所以你可以看到参数是明文的，只是多加了一个计算出的sign。
2. **加密**是对请求的参数加密，后端进行解密；同时有些情况下，也会对返回的response进行加密，前端进行解密；这里存在加密和解密的过程，所以思路上必然是对称加密的形式+时间戳接口时效性等。

#### 2.4.5 **签名放在哪里？**

签名可以放在请求参数中（path中，body中等），更为优雅的可以放在HEADER中，比如X-Sign（通常第三方的header参数以X-开头）

#### 2.4.6 大厂开放平台是怎么做的呢？哪些可以借鉴？

以腾讯开放平台为例，请参考[腾讯开放平台第三方应用签名参数sig的说明 ](https://wiki.open.qq.com/wiki/腾讯开放平台第三方应用签名参数sig的说明)

## 3. 实现案例

> 本例子采用AOP拦截自定义注解方式实现，主要看实现的思路而已(签名的目的要防止参数被篡改，就要对可能被篡改的参数签名)。

### 3.1 定义注解

```java
package tech.pdai.springboot.api.sign.config.sign;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author pdai
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Signature {
}
```

### 3.2 AOP拦截

这里可以看到需要对所有用户可能修改的参数点进行按规则签名

```java
package tech.pdai.springboot.api.sign.config.sign;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;

import cn.hutool.core.text.CharSequenceUtil;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.util.ContentCachingRequestWrapper;
import tech.pdai.springboot.api.sign.config.exception.BusinessException;
import tech.pdai.springboot.api.sign.util.SignUtil;

/**
 * @author pdai
 */
@Aspect
@Component
public class SignAspect {

    /**
     * SIGN_HEADER.
     */
    private static final String SIGN_HEADER = "X-SIGN";

    /**
     * pointcut.
     */
    @Pointcut("execution(@tech.pdai.springboot.api.sign.config.sign.Signature * *(..))")
    private void verifySignPointCut() {
        // nothing
    }

    /**
     * verify sign.
     */
    @Before("verifySignPointCut()")
    public void verify() {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String sign = request.getHeader(SIGN_HEADER);

        // must have sign in header
        if (CharSequenceUtil.isBlank(sign)) {
            throw new BusinessException("no signature in header: " + SIGN_HEADER);
        }

        // check signature
        try {
            String generatedSign = generatedSignature(request);
            if (!sign.equals(generatedSign)) {
                throw new BusinessException("invalid signature");
            }
        } catch (Throwable throwable) {
            throw new BusinessException("invalid signature");
        }
    }

    private String generatedSignature(HttpServletRequest request) throws IOException {
        // @RequestBody
        String bodyParam = null;
        if (request instanceof ContentCachingRequestWrapper) {
            bodyParam = new String(((ContentCachingRequestWrapper) request).getContentAsByteArray(), StandardCharsets.UTF_8);
        }

        // @RequestParam
        Map<String, String[]> requestParameterMap = request.getParameterMap();

        // @PathVariable
        String[] paths = null;
        ServletWebRequest webRequest = new ServletWebRequest(request, null);
        Map<String, String> uriTemplateVars = (Map<String, String>) webRequest.getAttribute(
                HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE, RequestAttributes.SCOPE_REQUEST);
        if (!CollectionUtils.isEmpty(uriTemplateVars)) {
            paths = uriTemplateVars.values().toArray(new String[0]);
        }

        return SignUtil.sign(bodyParam, requestParameterMap, paths);
    }

}
```

### 3.3 Request封装

```java
package tech.pdai.springboot.api.sign.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;

@Slf4j
public class RequestCachingFilter extends OncePerRequestFilter {

    /**
     * This {@code doFilter} implementation stores a request attribute for
     * "already filtered", proceeding without filtering again if the
     * attribute is already there.
     *
     * @param request     request
     * @param response    response
     * @param filterChain filterChain
     * @throws ServletException ServletException
     * @throws IOException      IOException
     * @see #getAlreadyFilteredAttributeName
     * @see #shouldNotFilter
     * @see #doFilterInternal
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        boolean isFirstRequest = !isAsyncDispatch(request);
        HttpServletRequest requestWrapper = request;
        if (isFirstRequest && !(request instanceof ContentCachingRequestWrapper)) {
            requestWrapper = new ContentCachingRequestWrapper(request);
        }
        try {
            filterChain.doFilter(requestWrapper, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

注册

```java
package tech.pdai.springboot.api.sign.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    @Bean
    public RequestCachingFilter requestCachingFilter() {
        return new RequestCachingFilter();
    }

    @Bean
    public FilterRegistrationBean requestCachingFilterRegistration(
            RequestCachingFilter requestCachingFilter) {
        FilterRegistrationBean bean = new FilterRegistrationBean(requestCachingFilter);
        bean.setOrder(1);
        return bean;
    }
}
```

### 3.4 实现接口

```java
package tech.pdai.springboot.api.sign.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tech.pdai.springboot.api.sign.config.response.ResponseResult;
import tech.pdai.springboot.api.sign.config.sign.Signature;
import tech.pdai.springboot.api.sign.entity.User;

/**
 * @author pdai
 */
@RestController
@RequestMapping("user")
public class SignTestController {

    @Signature
    @PostMapping("test/{id}")
    public ResponseResult<String> myController(@PathVariable String id
            , @RequestParam String client
            , @RequestBody User user) {
        return ResponseResult.success(String.join(",", id, client, user.toString()));
    }

}
```

### 3.5 接口测试

body参数

![image-20220716225515949](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220716225515949.png)

如果不带X-SIGN

![image-20220716225534900](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220716225534900.png)

如果X-SIGN错误

![image-20220716225553472](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220716225553472.png)

如果X-SIGN正确

![image-20220716225610038](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220716225610038.png)

## 参考文章

[**SpringBoot接口 - 如何对接口进行签名**](https://pdai.tech/md/spring/springboot/springboot-x-interface-jiami.html)