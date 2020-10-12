# 拦截器和过滤器

拦截器和过滤器都是AOP编程思想的体现

## 1. 拦截器和过滤器区别

1. `Filter` 是基于 **函数回调**的，而 `Interceptor` 则是基于 `Java`**反射** 和 **动态代理**。
2. `Filter` 依赖于 `Servlet` 容器，而 `Interceptor` 不依赖于 `Servlet` 容器。
3. `Filter` 对几乎 **所有的请求** 起作用，而 `Interceptor` 只对 `Controller` 对请求起作用。

## 2. 执行顺序

对于自定义 `Servlet` 对请求分发流程：

1. `Filter` 过滤请求处理；
2. `Servlet` 处理请求；
3. `Filter` 过滤响应处理。

对于自定义 `Controller` 的请求分发流程：

1. `Filter` 过滤请求处理；
2. `Interceptor` 拦截请求处理；
3. 对应的 `HandlerAdapter` 处理请求；
4. `Interceptor` 拦截响应处理；
5. `Interceptor` 的最终处理；
6. `Filter` 过滤响应处理。



## 3. Spring boot 使用过滤器

两种方式：
1、使用spring boot提供的FilterRegistrationBean注册Filter
2、使用原生servlet注解定义Filter
两种方式的本质都是一样的，都是去FilterRegistrationBean注册自定义Filter

### 3.1 方式一 (FilterRegistrationBean注册Filter)

1. 第一步：先定义Filter

   ```java
   public class MyFilter implements Filter {
       @Override
       public void init(FilterConfig filterConfig) throws ServletException {
   
       }
       @Override
       public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
           // do something 处理request 或response
           System.out.println("filter1");
           // 调用filter链中的下一个filter
           filterChain.doFilter(servletRequest,servletResponse);
       }
       @Override
       public void destroy() {
   
       }
   }
   ```


2. 第二步：

   ```java
   @Configuration
   public class FilterConfig {
   
       @Bean
       public FilterRegistrationBean registrationBean() {
           FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(new MyFilter());
           filterRegistrationBean.addUrlPatterns("/*");
           return filterRegistrationBean;
       }
   }
   ```


### 3.2 方式二 @WebFilter

```java
// 注入spring容器
@Component
// 定义filterName 和过滤的url
@WebFilter(filterName = "my2Filter" ,urlPatterns = "/*")
public class My2Filter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("filter2");
    }
    @Override
    public void destroy() {

    }
}
```

## 4. Spring boot 拦截器的使用

1. 定义拦截器

   ```java
   public class MyInterceptor implements HandlerInterceptor {
   
       @Override
       public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
           System.out.println("preHandle");
           return true;
       }
   
       @Override
       public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
           System.out.println("postHandle");
       }
   
       @Override
       public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
           System.out.println("afterCompletion");
       }
   }
   ```

2. 配置拦截器：

   ```java
   @Configuration
   public class InterceptorConfig implements WebMvcConfigurer {
   
       @Override
       public void addInterceptors(InterceptorRegistry registry) {
           registry.addInterceptor(new MyInterceptor());
       }
   }
   ```

3. Controller演示：

   ```java
   @RestController
   public class UController {
   
       @GetMapping("/home")
       public String home(){
           System.out.println("home");
           return "myhome";
       }
   }
   ```

4. 输出

   ```
   preHandle
   home
   postHandle
   afterCompletion
   ```

   

## 参考文章

[spring boot 过滤器、拦截器的区别与使用](https://blog.csdn.net/heweimingming/article/details/79993591)