# SpringSecurity工作原理

## 1. spring security 在web应用中是基于filter的

在spring security的官方文档中，我们可以看到这么一句话：

> Spring Security’s web infrastructure is based entirely on standard servlet filters.

我们可以得知，**spring security 在web应用中是基于filter的**。filter我们就很熟了，在没有struts,没有spring mvc之前，我们就是通过一个个servlet,一个个filter来实现业务功能的，通常我们会有多个filter，他们按序执行，一个执行完之后，调用filterChain中的下一个doFilter。Spring Security 在 Filter 中创建 Authentication 对象，并调用 AuthenticationManager 进行校验

spring security 维护了一个filter chain，chain中的每一个filter都具有特定的责任，并根据所需的服务在配置总添加。filter的顺序很重要，因为他们之间存在依赖关系。spring security中有如下filter(按顺序的):

- ChannelProcessingFilter,因为它可能需要重定向到不同的协议
- SecurityContextPersistenceFilter，可以在web请求开头的`SecurityContextHolder`中设置`SecurityContext`，并且`SecurityContext`的任何更改都可以复制到`HttpSession`当web请求结束时（准备好与下一个web请求一起使用）
- ConcurrentSessionFilter，
- 身份验证处理-UsernamePasswordAuthenticationFilter,CasAuthenticationFilter,BasicAuthenticationFilter等。以便`SecurityContextHolder`可以修改为包含有效的`Authentication`请求令牌
- SecurityContextHolderAwareRequestFilter
- JaasApiIntegrationFilter
- RememberMeAuthenticationFilter，记住我服务处理
- AnonymousAuthenticationFilter，匿名身份处理，更新`SecurityContextHolder`
- ExceptionTranslationFilter，获任何Spring Security异常，以便可以返回HTTP错误响应或启动适当的`AuthenticationEntryPoint`
- FilterSecurityInterceptor，用于保护web URI并在访问被拒绝时引发异常

这里我们列举了几乎所有的spring security filter。正是这些filter完成了spring security的各种功能。目前我们只是知道了有这些filter，并不清楚他们是怎么集成到应用中的。在继续深入了解之前，我们需要了解一下`DelegatingFilterProxy`。

## 2. DelegatingFilterProxy

`DelegatingFilterProxy`是一个特殊的filter，存在于spring-web模块中。`DelegatingFilterProxy`通过继承`GenericFilterBean`使得自己变为了一个Filter（因为GenericFilterBean implements Filter）。它是一个Filter，其命名却以`proxy`结尾。非常有意思，为了了解其功能，我们看一下它的使用配置：

```xml
<filter>
    <filter-name>myFilter</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
</filter>
<filter-mapping>
    <filter-name>myFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

这个配置是我们使用web.xml配置Filter时做法。但是与普通的Filter不同的是`DelegatingFilterProxy`并没有实际的过滤逻辑，他会尝试寻找`filter-name`节点所配置的`myFilter`，并将过滤行为委托给`myFilter`来处理。这种方式能够利用Spring丰富的依赖注入工具和生命周期接口，因此`DelegatingFilterProxy`提供了`web.xml`与应用程序上下文之间的链接。非常有意思，可以慢慢体会。

## 3. spring security入口——springSecurityFilterChain

spring security的入口filter就是springSecurityFilterChain。在没有spring boot之前，我们要使用spring security的话，通常在web.xml中添加如下配置：

```xml
   <filter>
       <filter-name>springSecurityFilterChain</filter-name>
       <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
   </filter>
 
   <filter-mapping>
       <filter-name>springSecurityFilterChain</filter-name>
       <url-pattern>/*</url-pattern>
   </filter-mapping>
```

看到没，这里配置的是`DelegatingFilterProxy`。有了上面的介绍之后，我们就知道，它实际上会去找到filter-name节点中的Filter——**springSecurityFilterChain**，并将实际的过滤工作交给`springSecurityFilterChain`处理。

在使用spring boot之后，这一xml配置被Java类配置给代替了。我们前面在代码种使用过`@EnableWebSecurity` 注解，通过跟踪源码可以发现`@EnableWebSecurity`会加载`WebSecurityConfiguration`类,而`WebSecurityConfiguration`类中就有创建`springSecurityFilterChain`这个Filter的代码：

```java
 @Bean(name = {"springSecurityFilterChain"})
    public Filter springSecurityFilterChain() throws Exception {
        boolean hasConfigurers = this.webSecurityConfigurers != null && !this.webSecurityConfigurers.isEmpty();
        if (!hasConfigurers) {
            WebSecurityConfigurerAdapter adapter = (WebSecurityConfigurerAdapter)this.objectObjectPostProcessor.postProcess(new WebSecurityConfigurerAdapter() {
            });
            this.webSecurity.apply(adapter);
        }
 
        return (Filter)this.webSecurity.build();
    }
```

这里，我们介绍了spring security的入口——springSecurityFilterChain，也介绍了它的两种配置形式。但是，springSecurityFilterChain是谁，怎么起作用的，我们还不清楚，下面继续看。

## 4. FilterChainProxy 和SecurityFilterChain

在spring的官方文档中，我们可以发现这么一句话：

> Spring Security’s web infrastructure should only be used by delegating to an instance of `FilterChainProxy`. The security filters should not be used by themselves.
>
> spring security 的web基础设施（上面介绍的那一堆filter）只能通过委托给`FilterChainProxy`实例的方式来使用。而不能直接使用那些安全filter。

这句话似乎透漏了一个信号，上面说的入口`springSecurityFilterChain`其实就是`FilterChainProxy`,如果不信，调试一下 代码也能发现，确实就是`FilterChainProxy`。它的全路径名称是`org.springframework.security.web.FilterChainProxy`。打开其源码，第一行注释是这样：

> Delegates {@code Filter} requests to a list of Spring-managed filter beans.

所以，没错了。它就是`DelegatingFilterProxy`要找的人，它就是`DelegatingFilterProxy`要委托过滤任务的人。下面贴出其部分代码：

```java
public class FilterChainProxy extends GenericFilterBean {
   
   private List<SecurityFilterChain> filterChains;// 
 
   public FilterChainProxy(SecurityFilterChain chain) {
      this(Arrays.asList(chain));
   }
 
   public FilterChainProxy(List<SecurityFilterChain> filterChains) {
      this.filterChains = filterChains;
   }
 
   public void doFilter(ServletRequest request, ServletResponse response,
         FilterChain chain) throws IOException, ServletException {
         doFilterInternal(request, response, chain);
   }
 
   private void doFilterInternal(ServletRequest request, ServletResponse response,
         FilterChain chain) throws IOException, ServletException {
 
      FirewalledRequest fwRequest = firewall
            .getFirewalledRequest((HttpServletRequest) request);
      HttpServletResponse fwResponse = firewall
            .getFirewalledResponse((HttpServletResponse) response);
		
      List<Filter> filters = getFilters(fwRequest);
 
      if (filters == null || filters.size() == 0) {
         fwRequest.reset();
         chain.doFilter(fwRequest, fwResponse);
         return;
      }
 
      VirtualFilterChain vfc = new VirtualFilterChain(fwRequest, chain, filters);
      vfc.doFilter(fwRequest, fwResponse);
   }
 
   private List<Filter> getFilters(HttpServletRequest request) {
      for (SecurityFilterChain chain : filterChains) {
         if (chain.matches(request)) {
            return chain.getFilters();
         }
      }
      return null;
   }
 
}
```

可以看到，里边有个`SecurityFilterChain`的集合。这个才是众多security filter藏身之处，doFilter的时候会从SecurityFilterChain取出第一个匹配的Filter集合并返回。

## 5. 再说SecurityFilterChain

前面我们介绍了springSecurityFilterChain，它是由xml配置的，或者是由`@EnableWebSecurity`注解的作用下初始化的（@Import({WebSecurityConfiguration.class））。具体是在WebSecurityConfiguration类中。上面我们贴过代码，你可以返回看，这里再次贴出删减版：

```java
   @Bean( name = {"springSecurityFilterChain"})
    public Filter springSecurityFilterChain() throws Exception {
        // 删除部分代码
        return (Filter)this.webSecurity.build();
    }
```

最后一行，发现`webSecurity.build()` 产生了`FilterChainProxy`。因此，推断SecurityFilterChain就是webSecurity里边弄的。贴出源码：

```java
public final class WebSecurity extends
      AbstractConfiguredSecurityBuilder<Filter, WebSecurity> implements
      SecurityBuilder<Filter>, ApplicationContextAware {
    
    @Override
	protected Filter performBuild() throws Exception {
		int chainSize = ignoredRequests.size() + securityFilterChainBuilders.size();
        // 我们要找的 securityFilterChains
		List<SecurityFilterChain> securityFilterChains = new ArrayList<SecurityFilterChain>(
				chainSize);
		for (RequestMatcher ignoredRequest : ignoredRequests) {
			securityFilterChains.add(new DefaultSecurityFilterChain(ignoredRequest));
		}
		for (SecurityBuilder<? extends SecurityFilterChain> securityFilterChainBuilder : securityFilterChainBuilders) {
			securityFilterChains.add(securityFilterChainBuilder.build());
		}
        // 创建 FilterChainProxy  ，传入securityFilterChains
		FilterChainProxy filterChainProxy = new FilterChainProxy(securityFilterChains);
		if (httpFirewall != null) {
			filterChainProxy.setFirewall(httpFirewall);
		}
		filterChainProxy.afterPropertiesSet();
 
		Filter result = filterChainProxy;
		postBuildAction.run();
		return result;
	}
}
```

至此，我们清楚了，spring security 是怎么在spring web应用中工作的了。具体的细节就是执行filter里的代码了，这里不再继续深入了。我们的目的是摸清楚他是怎么工作的，大致的脉路是怎样，目前整理的内容已经达到这个目的了。

## 6. 小结

- spring security 的核心是基于filter
- 入口filter是springSecurityFilterChain(它会被DelegatingFilterProxy委托来执行过滤任务)
- springSecurityFilterChain实际上是`FilterChainProxy` （一个filter）
- `FilterChainProxy`里边有一个`SecurityFilterChain`集合，doFIlter的时候会从其中取。

## 参考文章

[Spring Security 入门原理及实战](https://www.cnblogs.com/demingblog/p/10874753.html)