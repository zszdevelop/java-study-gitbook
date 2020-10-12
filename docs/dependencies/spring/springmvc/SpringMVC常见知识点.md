# SpringMVC常见知识点

## 1. Spring MVC 简介

Spring MVC 提供”模型-视图-控制器“（Model - View - Controller） 架构和随时可用的组件，用于开发灵活且松散耦合的Web应用程序。

MVC 模式有助于分离应用程序的不同方面，如输入逻辑，业务逻辑和UI逻辑，同时在所有这些元素之间提供松散耦合

## 2. 介绍下 Spring MVC 的核心组件？

Spring MVC 一共有九大核心组件，分别是：

- MultipartResolver
- LocaleResolver
- ThemeResolver
- **HandlerMapping**
- **HandlerAdapter**
- **HandlerExceptionResolver**
- RequestToViewNameTransalator
- ViewResolver
- FlashMapManager

虽然很多，但是最关键的只有HandlerMapping+HandlerAdapter+HandlerExceptionResolver

## 3. 描述一下 DispatcherServlet的工作流程？

DiapatcherServlet 的工作流程可以用一副图来说明

![image-20191101235522013](./img/image-20191101235522013.png)

1. 发送请求

   用户向服务器发送HTTP请求，请求被 Spring MVC 的调度器 DispatherServlet 捕获

2. 映射处理器（HandlerMapping）

   **DispatcherServlet 根据请求 URL,调用 HandlerMapping 获取该 Handler 配置的所有相关的对象**（包括 Handler 对象以及 Handler 对象对应的拦截器），**最后以 HandlerExecutionChain 对象的形式返回。**

   - 既 HandlerExecutionChain 中，包含对应的Handler 对象和拦截器门

   ```java
   HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception;
   ```

3. 处理器适配（HandlerAdapter）

   **DispatcherServlet 根据获得的 Handler，选择一个合适的HandlerAdapter**（注：如果成功获得HandlerAdapter后，此时将开始执行拦截器的#preHandler(...)方法）

   提取请求 Request 中的模型数据，填充 Handler 入参，开始执行Handler（Controller）。在填充Handler的入参过程中，根据你的配置，Spring 将帮你做一些额外的操作

   - HttpMessageConverter：会将请求消息（如 JSON,XML 等数据）转换成一个对象
   - 数据转换：对请求消息进行数据转换。如String 转换成Integer，Double等
   - 数据格式化：对请求消息进行数据格式化。如将字符串转换成格式化数字或格式化日期等
   - 数据验证： 验证数据的有效性（长度、格式等），验证结果存储到 BindingResult 或 Error 中。

   **Handler(Controller) 执行完成后，向 DispatcherServlet 返回一个 ModelAndView 对象**。

   ```java
   ModelAndView handle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception;
   ```

4. 调用处理器方法

5. 解析视图

   根据返回的ModelAndView，选择一个合适的ViewResolver（必须是已经注册到Spring容器中的ViewResolver），解析出View 对象，然后返回给DispatcherServlet

   ```java
   View resolveViewName(String viewName, Locale locale) throws Exception;
   ```

6. 7渲染视图+响应请求

   ViewResolver 结合Model 和View，来渲染视图，并写回给用户（浏览器）

   ```java
    void render(@Nullable Map<String, ?> model, HttpServletRequest request, HttpServletResponse response) throws Exception;
   ```

### 3.1 前后端分离的Spring MVC 流程

对于前后端分离的架构，Spring MVC 只负责 Model 和 Controller 两块，而将View 移交给了前端，所以，上图中的步骤5，6 两步，就不需要了

**那么会变成什么样？**

步骤3中，如果Handler（Controller）执行完后，如果判断方法有@ResponseBody 注解，则直接将结果写回给浏览器

**返回的是Java POJO  对象，HTTP是不支持的，怎么办？**

需要将结果使用HttpMessageConverter 进行转换后，才能返回。例如说，大家锁熟悉的 FastJsonHttpMessage，将POJO 转换成JSON 字符串返回

## 4. @Controller 注解有什么用？

@Controller 注解，他将一个类标记为Spring MVC 控制器Controller

## 5. RestController 和 @Controller 有什么区别？

@RestController 注解，在@Controller 基础上，增加了@ResponseBody 注解，更加适合目前前后端分离的架构下，提供Restful API，返回例如JSON 数据格式。当然，**返回什么样的格式**，根据**客户端的”Accept“请求头来决定**

## 6. @ReuqestMapping 注解有什么用？

@RequestMapping 注解，用于将特定 HTTP 请求方法映射到将处理相应请求的控制器中的特定类/方法。此注解可应用于两个级别：

- 类级别：映射请求的URL
- 方法级别：映射 URL 以及HTTP 请求方法

## 7. @RequestMapping 和@GetMapping 注解的不同之处在哪里

- @RequestMapping 可注解在类和方法上，@GetMapping 仅可注册在方法上

- @RequestMapping 可进行 GET、POST、PUT、DELETE 等请求方法;

  @GetMapping 是 @RequestMapping 的GET 请求与方法的特例，目的是为了提高清晰度

## 8. 返回JSON 格式使用什么注解？

可以使用@Response 注解，或者使用包含@ResponseBody 注解的@RestController 注解。

当然，还是需要配合相应的支持JSON格式化的HttpMessageConverter 实现类。例如，Spring MVC 默认使用MappingJackson2HttpMessageConverter

## 9. 介绍一下WebApplicationContext？

WebApplicationContext 是实现ApplicationContext 接口的子类，专门为Web应用准备的

- 他允许从相对于Web 根目录的路径中**加载配置文件，完成初始化Spring MVC 组件的工作**
- 从WebApplicationContext中，可以获取ServletContext 引用，整个Web 应用上下文对象将作为属性放置在SerletContext中，一遍Web 应用环境可以访问Spring 上下文

## 10.Spirng MVC 的异常处理？

Spring MVC 提供了异常解析器 HandlerExceptionResolver 接口，将处理器（handler）执行时发生的异常，解析（转换）成对应的ModelAndView 结果，代码如下

```java
public interface HandlerExceptionResolver {

    /**
     * 解析异常，转换成对应的 ModelAndView 结果
     */
    @Nullable
    ModelAndView resolveException(
            HttpServletRequest request, HttpServletResponse response, @Nullable Object handler, Exception ex);

}
```

## 11. Spring MVC 有什么优点？

1. 使用非常**方便**，无论是添加HTTP请求方法映射的方法，还是不同数据格式的响应
2. 提供**拦截器机制**，可以方便的对请求进行拦截处理
3. 提供**异常机制**，可以方便的对异常做统一的处理
4. 可以任意使用各种**视图**技术，而不仅仅局限于JSP，例如Freemarker、Thymeleaf等等
5. 不依赖于Servlet API(目标虽是如此，但是在实现的时候确实是依赖于 Servlet 的，当然仅仅依赖 Servlet ，而不依赖 Filter、Listener )。

## 12. Spring MVC怎样设定重定向和转发？

- 结果转发：在返回值的前面加 `"forward:/"` 。
- 重定向：在返回值的前面加上 `"redirect:/"` 。

当然，目前前后端分离之后，我们作为后端开发，已经很少有机会用上这个功能了。

## 13. Spring MVC 的 Controller 是不是单例？

绝大多数情况下,Controller **是单例**。

那么，Controller 里一般**不建议存在共享的变量**

