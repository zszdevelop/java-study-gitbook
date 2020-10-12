# SpringMVC拦截器

## 1. 详细介绍下 Spring MVC 拦截器？

`org.springframework.web.servlet.HandlerInterceptor` ，拦截器接口。代码如下：

```java
// HandlerInterceptor.java

/**
 * 拦截处理器，在 {@link HandlerAdapter#handle(HttpServletRequest, HttpServletResponse, Object)} 执行之前
 */
default boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
		throws Exception {
	return true;
}

/**
 * 拦截处理器，在 {@link HandlerAdapter#handle(HttpServletRequest, HttpServletResponse, Object)} 执行成功之后
 */
default void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
		@Nullable ModelAndView modelAndView) throws Exception {
}

/**
 * 拦截处理器，在 {@link HandlerAdapter#handle(HttpServletRequest, HttpServletResponse, Object)} 执行完之后，无论成功还是失败
 *
 * 并且，只有该处理器 {@link #preHandle(HttpServletRequest, HttpServletResponse, Object)} 执行成功之后，才会被执行
 */
default void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
		@Nullable Exception ex) throws Exception {
}
```

- 一共有三个方法，分别为：
  - preHandle（...）方法，调用Controller方法之**前**执行
  - postHandle（...）方法，调用Controller方法之**后**执行
  - afterCompletion(...)方法，处理完Controller 方法返回结果之后执行
    - 例如：页面渲染后
    - 注意：**无论调用Controller方法是否成功，都会执行**

- 举个例子：
  - 当两个拦截器都实现放行操作是，执行顺序`preHandle[1] => preHandle[2] => postHandle[2] => postHandle[1] => afterCompletion[2] => afterCompletion[1]` 。
  - 当第一个拦截器preHandle(...)返回false 的时候，也就是对其进行拦截时，第二个拦截器是完全不执行的，第一个拦截器只执行 `#preHandle(...)` 部分。
  - 当第一个拦截器 `#preHandle(...)` 方法返回 `true` ，第二个拦截器 `#preHandle(...)` 返回 `false` ，执行顺序为 `preHandle[1] => preHandle[2] => afterCompletion[1]` 。
- 总结：
  - preHandle(...)方法，按拦截器定义**顺序**调用，若任一拦截器返回false，则Controller方法不再调用
  - `#postHandle(...)` 和 `#afterCompletion(...)` 方法，按拦截器定义**逆序**调用。
  - `#postHandler(...)` 方法，在调用 Controller 方法之**后**执行。
  - `#afterCompletion(...)` 方法，只有该拦截器在 `#preHandle(...)` 方法返回 `true` 时，才能够被调用，且一定会被调用。为什么“且一定会被调用”呢？即使 `#afterCompletion(...)` 方法，按拦截器定义**逆序**调用时，前面的拦截器发生异常，后面的拦截器还能够调用，**即无视异常**。

## 2. Spring MVC 的拦截器可以做哪些事情？

拦截器能做的事情非常非常多，例如：

- 记录访问日志
- 记录异常日志
- 需要登录的请求操作，拦截未登录的用户
- ...

## 3. Spring MVC 的拦截器和Filter 过滤器有什么差别

- **功能相同**：拦截器和Filter 都能实现相应的功能，谁都不比谁强
- **容器不同**：拦截器构建在Spring MVC 体系中，Filter 构建在 Servlet 容器之上
- **使用便利性不同**：拦截器提供了三个方法，分别在不同的时机执行；过滤器仅提供一个方法，当然也能现实拦截器的执行时机的效果，就是麻烦一些

## 参考文章

[过滤器(Filter)和拦截器(Interceptor)的区别](http://svip.iocoder.cn/Spring-MVC/Interview/)