# RESTful

## 1. REST 是什么

REST（REpresentational State Transfer） 直译就是：抽象状态转移。

他通过 **URL定位资源，用HTTP动词（GET,POST,DELETE,DETC）描述操作**。

- 看Url就知道要什么
- 看http method就知道干什么
- 看http status code就知道结果如何

## 2. 资源是什么

资源是指数据在 REST 架构中如何显示的。将实体作为资源公开，他允许客户端通过HTTP 方法如：GET、POST、PUT、DELETE 等读、写、修改和创建资源

## 3. 什么是安全的 REST 操作

REST 接口是通过 HTTP 方法完成操作

- 一些HTTP操作是安全的，如GET 和 HEAD, 他不能在服务端修改资源
- PUT、POST、和 DELETE 是不安全的，因为他们能修改服务端的资源

所以，是否安全的界限，在于**是否修改服务端的资源**

## 4. 什么是幂等操作？为什么幂等操作如此重要？

有一些HTTP方法，如：GET,不管你使用多少次他都能产生相同的结果，在没有任何一边影响的情况下，发送多个GET 请求到相同的 URI 将会**产生相同的响应结果**。因此。这就是所谓幂等操作

换句话说，**POST 方法不是幂等操作**，因为如果发送多个 POST 请求，他将在服务端创建不同资源。但是，假如你用PUT 更新资源，它将是幂等操作

## 5. REST 是可扩展的或说是协同的吗？

是的，REST 是可扩展的和可协作的，他既不托管一种特定的技术选择，也不定在客户端或者服务端。你可以用JAVA,C++、Python 来创建 RESTful WEB 服务，也可以在客户端使用他们

## 6. REST 用哪种 HTTP 方法呢？

REST 能用任何的 HTTP 方法，但是比较受欢迎的是

- 用 GET 来检索服务端资源
- 用 POST 来创建服务端资源
- 用 PUT 来更新服务端资源
- 用 DELETE 来删除服务端资源

以上四个操作，分别对应日常的 CRUD 操作

## 7. 删除的 HTTP 状态返回码是什么？

在删除成功之后，您的 REST API 应该返回什么状态代码，并没有严格的规则，他可以返回200 或204 没有内容

- 一般来说，如果删除操作成功，响应主体为空，返回204
- 如果删除请求成功且响应体不是空的，则返回 200。

## 8. REST API 是无状态的吗?

是的， REST API  应该是无状态的，因为他是基于 HTTP 的，他也是无状态的

## 9. REST 安全码？你能做什么来保护他

安全是一个宽泛的术语，他可能意味着消息的安全性，这是通过**认证和授权提供的加密和访问限制提供**的

>REST 通常不是安全的，但是您可以通过使用 Spring Security 或者Shiro 来保护它

## 10. RestTemplate 的优势是什么？

在Spring Framework 中，RestTemplate 类是 模板方法模式 的实现。跟其他主流的模板类相似，如 JdbcTemplate 或 JmsTempalte ，它将在客户端简化跟 RESTful Web 服务的集成。正如在 RestTemplate 例子中显示的一样，**你能非常容易地用它来调用 RESTful Web 服务**。

## 11. HttpMessageConverter 在 Spring REST 中代表什么？

HttpMessageConverter 是一种 **策略接口**，他指定了一个转换器，他可以转换 HTTP 请求和响应。Spring REST 用这个接口转换 HTTP 响应到多种格式，例如：JSON 或 XML。

每个 HttpMessageconverter 实现都有一种或几种相关联的 MIME 协议。Spring 使用 ”Accept“的标头来确定客户端所期待的内容类型

然后，他将尝试找到一个注册的 HTTPMessageConverter，他能够处理特定的内容类型，并使用它将响应转换成这种格式，然后再将其发送给客户端

## 12. 如何创建 HttpMessageConverter 的自定义实现来支持一种新的请求/响应？

我们仅需要创建自定义的 AbstractHttpMessageConverter 的实现、并使用 WebMvcConfigurerAdaper 的 `#extendMessageConverters(List> converters)` 方法注中册它，该方法可以生成一种新的请求/ 响应类型

## 13. @PathVariable 注解，在Spring MVC 做了什么？为什么 REST 在 Spring 中如此有用？

@PathVariable 注解，是Spring MVC 中常用的注解之一，它允许您从 URI 读取值，比如查询参数。它使用 Spring 创建 RESTful Web 服务时特别有用，因为在 REST 中，资源标识符是URI 的一部分

## 参考文章

[排名前20的REST和Spring MVC面试题](http://www.spring4all.com/article/1445)