---
order: 20
category:
  - 开发
  - 安全
---

# 开发安全 - CSRF详解

> CSRF(Cross-site request forgery跨站请求伪造，也被称成为“one click attack”或者session riding，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用。

>前置知识：
>
>如果客户端发送的http请求是同域的，**浏览器**会**自动**帮我们把**同域**下的cookie添加到请求的**request header**中**Cookie字段**中，服务端就会从接收到的request header中提取cookie中的token

>我参与的项目中大部分都使用token 传递用户信息，不使用session，所以可以直接禁止CSRF。

## 1. CSRF 简介

攻击者盗用你的身份，以你的名义发送恶意请求。

> CSRF（Cross Site Request Forgery, 跨站域请求伪造）是一种网络的攻击方式，它在 2007 年曾被列为互联网 20 大安全隐患之一。其他安全隐患，比如 SQL 脚本注入，跨站域脚本攻击等在近年来已经逐渐为众人熟知，很多网站也都针对他们进行了防御。然而，对于大多数人来说，CSRF 却依然是一个陌生的概念。即便是大名鼎鼎的 Gmail, 在 2007 年底也存在着 CSRF 漏洞，从而被黑客攻击而使 Gmail 的用户造成巨大的损失。

## 2. CSRF 如何攻击

**先看图**：

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220705223234175.png" alt="image-20220705223234175"  />



从上图可以看出，A网站通过cookie来识别用户（C），当用户成功进行身份验证之后浏览器就会得到一个标识其身份的cookie，只要不关闭浏览器或者退出登录，以后访问A网站会一直带上这个cookie。如果这期间浏览器被人控制着向A网站发起请求去执行一些用户不想做的功能（比如添加账号），这就是会话劫持了。因为这个不是用户真正想发出的请求，这就是所谓的“请求伪造”。此外，**由于请求可以从第三方网站提交，所以前缀跨站二字，即从B网站发起。**

### 2.1 **具体到银行转账为例**：

> CSRF 攻击可以在受害者毫不知情的情况下以受害者名义伪造请求发送给受攻击站点，从而在并未授权的情况下执行在权限保护之下的操作。

- 比如说，受害者 Bob 在银行有一笔存款，通过对银行的网站发送请求 http://bank.example/withdraw?account=bob&amount=1000000&for=bob2 可以使 Bob 把 1000000 的存款转到 bob2 的账号下。

- 通常情况下，该请求发送到网站后，服务器会先验证该请求是否来自一个合法的 session，并且该 session 的用户 Bob 已经成功登陆。

- 黑客 Mallory 自己在该银行也有账户，他知道上文中的 URL 可以把钱进行转帐操作。Mallory 可以自己发送一个请求给银行：http://bank.example/withdraw?account=bob&amount=1000000&for=Mallory。

  >这时候黑客修改url 参数，将转账的收款账户改成自己

- 但是这个请求来自 Mallory 而非 Bob，他不能通过安全认证，因此该请求不会起作用。这时，Mallory 想到使用 CSRF 的攻击方式，他先自己做一个网站，在网站中放入如下代码： src=”http://bank.example/withdraw?account=bob&amount=1000000&for=Mallory ”，**并且通过广告等诱使 Bob 来访问他的网站**。

  >用户打开了黑客的网站B

- 当 Bob 访问该网站时，上述 url 就会从 Bob 的浏览器发向银行，而这个请求会附带 Bob 浏览器中的 cookie 一起发向银行服务器。大多数情况下，该请求会失败，因为他要求 Bob 的认证信息。

- 但是，如果 Bob 当时恰巧刚访问他的银行后不久，他的浏览器与银行网站之间的 session 尚未过期，浏览器的 cookie 之中含有 Bob 的认证信息。这时，悲剧发生了，这个 url 请求就会得到响应，钱将从 Bob 的账号转移到 Mallory 的账号，而 Bob 当时毫不知情。等以后 Bob 发现账户钱少了，即使他去银行查询日志，他也只能发现确实有一个来自于他本人的合法请求转移了资金，没有任何被攻击的痕迹。而 Mallory 则可以拿到钱后逍遥法外。

  >大部分情况cookie 认证信息是失效的，但如果最近访问过，在有效期内就会转账成功

## 3. CSRF 理解的注意点

> 要理解CSRF，我认为你需要理解如下几个问题：

### 3.1 黑客能拿到Cookie吗?

> CSRF 攻击是黑客借助受害者的 cookie 骗取服务器的信任，但是黑客并不能拿到 cookie，也看不到 cookie 的内容。

对于服务器返回的结果，由于浏览器同源策略的限制，黑客也无法进行解析。因此，**黑客无法从返回的结果中得到任何东西，他所能做的就是给服务器发送请求**，以执行请求中所描述的命令，在服务器端直接改变数据的值，而非窃取服务器中的数据。

### 3.2 什么样的请求是要CSRF保护的?

> 为什么有些框架（比如Spring Security)里防护CSRF的filter限定的Method是POST/PUT/DELETE等，而没有限定GET Method?

我们要保护的对象是那些可以直接产生数据改变的服务，而对于读取数据的服务，则不需要进行 CSRF 的保护。通常而言GET请作为请求数据，不作为修改数据，所以这些框架没有拦截Get等方式请求。比如银行系统中转账的请求会直接改变账户的金额，会遭到 CSRF 攻击，需要保护。而查询余额是对金额的读取操作，不会改变数据，CSRF 攻击无法解析服务器返回的结果，无需保护。

### 3.3 为什么对请求做了CSRF拦截，但还是会报CRSF漏洞?

> 为什么我在前端已经采用POST+CSRF Token请求，后端也对POST请求做了CSRF Filter，但是渗透测试中还有CSRF漏洞?

直接看下面代码。

```java
// 这里没有限制POST Method，导致用户可以不通过POST请求提交数据。
@RequestMapping("/url")
public ReponseData saveSomething(XXParam param){
    // 数据保存操作...
}
```

> PS：这一点是很容易被忽视的，在笔者经历过的几个项目的渗透测试中，多次出现

## 4. CSRF 防御常规思路

> 一定要注意，下面只是给你提供常规思路而已（以下文字摘自[CSRF 攻击的应对之道](https://www.ibm.com/developerworks/cn/web/1102_niugang_csrf/index.html)，具体实现请看下一个章节。

### 4.1 验证 HTTP Referer 字段

根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。在通常情况下，访问一个安全受限页面的请求来自于同一个网站，比如需要访问 http://bank.example/withdraw?account=bob&amount=1000000&for=Mallory，用户必须先登陆 bank.example，然后通过点击页面上的按钮来触发转账事件。这时，该转帐请求的 Referer 值就会是转账按钮所在的页面的 URL，通常是以 bank.example 域名开头的地址。而如果黑客要对银行网站实施 CSRF 攻击，他只能在他自己的网站构造请求，当用户通过黑客的网站发送请求到银行时，该请求的 Referer 是指向黑客自己的网站。因此，要防御 CSRF 攻击，银行网站只需要对于每一个转账请求验证其 Referer 值，如果是以 bank.example 开头的域名，则说明该请求是来自银行网站自己的请求，是合法的。如果 Referer 是其他网站的话，则有可能是黑客的 CSRF 攻击，拒绝该请求。


### 4.2 在请求地址中添加 token 并验证

CSRF 攻击之所以能够成功，是因为黑客可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 cookie 中，因此黑客可以在不知道这些验证信息的情况下直接利用用户自己的 cookie 来通过安全验证。要抵御 CSRF，关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。

这种方法要比检查 Referer 要安全一些，token 可以在用户登陆后产生并放于 session 之中，然后在每次请求时把 token 从 session 中拿出，与请求中的 token 进行比对，但这种方法的难点在于如何把 token 以参数的形式加入请求。对于 GET 请求，token 将附在请求地址之后，这样 URL 就变成 http://url?csrftoken=tokenvalue。 而对于 POST 请求来说，要在 form 的最后加上 `<input type=”hidden” name=”csrftoken” value=”tokenvalue”/>`，这样就把 token 以参数的形式加入请求了。但是，在一个网站中，可以接受请求的地方非常多，要对于每一个请求都加上 token 是很麻烦的，并且很容易漏掉，通常使用的方法就是在每次页面加载时，使用 javascript 遍历整个 dom 树，对于 dom 中所有的 a 和 form 标签后加入 token。这样可以解决大部分的请求，但是对于在页面加载之后动态生成的 html 代码，这种方法就没有作用，还需要程序员在编码时手动添加 token。

该方法还有一个缺点是难以保证 token 本身的安全。特别是在一些论坛之类支持用户自己发表内容的网站，黑客可以在上面发布自己个人网站的地址。由于系统也会在这个地址后面加上 token，黑客可以在自己的网站上得到这个 token，并马上就可以发动 CSRF 攻击。为了避免这一点，系统可以在添加 token 的时候增加一个判断，如果这个链接是链到自己本站的，就在后面添加 token，如果是通向外网则不加。不过，即使这个 csrftoken 不以参数的形式附加在请求之中，黑客的网站也同样可以通过 Referer 来得到这个 token 值以发动 CSRF 攻击。这也是一些用户喜欢手动关闭浏览器 Referer 功能的原因。

### 4.3 在 HTTP 头中自定义属性并验证

这种方法也是使用 token 并进行验证，和上一种方法不同的是，这里并不是把 token 以参数的形式置于 HTTP 请求之中，而是把它放到 HTTP 头中自定义的属性里。通过 XMLHttpRequest 这个类，可以**一次性给所有该类请求加上 csrftoken 这个 HTTP 头属性，并把 token 值放入其中。这样解决了上种方法在请求中加入 token 的不便，同时，通过 XMLHttpRequest 请求的地址不会被记录到浏览器的地址栏，也不用担心 token 会透过 Referer 泄露到其他网站中去。**

然而这种方法的局限性非常大。XMLHttpRequest 请求通常用于 Ajax 方法中对于页面局部的异步刷新，并非所有的请求都适合用这个类来发起，而且通过该类请求得到的页面不能被浏览器所记录下，从而进行前进，后退，刷新，收藏等操作，给用户带来不便。另外，对于没有进行 CSRF 防护的遗留系统来说，要采用这种方法来进行防护，要把所有请求都改为 XMLHttpRequest 请求，这样几乎是要重写整个网站，这代价无疑是不能接受的。

## 5. CSRF 防御实战

> 主流的框架一般都包含了CSRF的拦截。

### 5.1 非框架型 - 自定义XXXCsrfFilter

可以通过自定义xxxCsrfFilter去拦截实现， 这里建议你参考 Spring Security - org.springframework.security.web.csrf.CsrfFilter.java。

### 5.2 Spring Security - 什么时候禁用CSRF

> 你开发的应用在何时，会考虑禁用CSRF呢? 这时候需要考虑CSRF本质是盗用cookie, 无cookie方案就可以禁用。

- 如果你只是创建一个非浏览器客户端使用的服务,你可能会想要禁用CSRF保护

**Spring Security中禁用CSRF**

```java
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
 
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();// 默认是启用的，需要禁用CSRF保护
    }
}
```

### 5.3 Spring Security - CookieCsrfTokenRepository.withHttpOnlyFalse()

> 存Cookie，比如前后端分离方案：Spring Security CookieCsrfTokenRepository + 前端路由统一设置

**Spring Security依赖包**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

**Spring Security - CookieCsrfTokenRepository.withHttpOnlyFalse()**

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    // 本例子给个范例而已，对于xxx的部分，自己根据业务定义
    http
        .authorizeRequests()
            /* allow */
            .antMatchers("/plugins/**", "/api-docs/**") .permitAll()
            .antMatchers("/login", "/logout").permitAll()
            
            /* auth control */
            .antMatchers("/xxx/user", "/xxx/user/**").access("hasAuthority('xxx:user')")
            .antMatchers("/xxx/role", "/xxx/role/**").access("hasAuthority('xxx:role')")

            /* others */
            .anyRequest().authenticated()
           
        /* other Filters */
        .and()
            .addFilterBefore(xxxFilter(), UsernamePasswordAuthenticationFilter.class)
        
        /* iframe */
        .headers()
            .frameOptions()
            .sameOrigin()
        
        /* form login & logout */
        .and().formLogin()
            .loginPage("/login")
            .usernameParameter("username")
            .passwordParameter("password")
            .defaultSuccessUrl("/admin/", true)
        .and().rememberMe()
            .rememberMeParameter("remember")
            .rememberMeCookieName("remember")
        .and().logout()
            .deleteCookies("JSESSIONID")
            .invalidateHttpSession(true)
            .logoutSuccessHandler(new XXXLogoutSuccessHandler(localeResolver()))
            .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
            .permitAll()
        
        /* csrf */
        .and().csrf()
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
//		.and().cors()
    
}
```

**后端thymeleaf登录页面"/login"**：

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>登录页面</title>
</head>
<body>
<form id="form" method="post">
    <label>用户名：</label><input name="username" type="text" value="" />
    <label>密码：</label><input name="password" type="text" value="" />
    <!--csrf验证需要-->
    <input type="hidden" th:name="${_csrf.parameterName}" th:value="${_csrf.token}"/>
    <br/>
    <input type="submit" value="登录">
</form>
</body>
</html>

```

**前端调用后端API: 方式一 （前后端分离的）**：

```js
//  将Cookie转换为JS Object
function initCookies() {
    var cookie = document.cookie,
        items = cookie.split(";"),
        keys = {};
    items.forEach(function(item) {
        var kv = item.split('=');
        keys[$.trim(kv[0])] = $.trim(kv[1]);
    });
    return keys;
}
//  提交数据
$.post(url, {
    userId : code,
    _csrf : initCookies()['X-XSRF-TOKEN'];
}, function(datas) {
    //  TODO something
})

```

**前端调用后端API: 方式二 （后端写前端，用的后端模板）**：

```html
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>
 
<script>
 
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $.ajaxSetup({
        beforeSend: function (xhr) {
            if(header && token ){
                xhr.setRequestHeader(header, token);
            }
        }}
    );
</script>

  
```

### 5.4 Spring Security - new CookieCsrfTokenRepository()

可以通过`new CookieCsrfTokenRepository()`自定义拦截的逻辑，大概意思：

```java
@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().csrfTokenRepository(new CookieCsrfTokenRepository())
                .requireCsrfProtectionMatcher(
                        /**
                         * 拦截“/login”开头的访问路径，不让访问
                         * 拦截所有“POST”请求，不让访问
                         */
//                        httpServletRequest -> httpServletRequest.getRequestURI().startsWith("/login")
//                                && httpServletRequest.getMethod().equals("POST")
                        httpServletRequest -> httpServletRequest.getMethod().equals("POST")
                );
    }
}
```

当然也可以这么写，可以看后续对默认的`DefaultRequiresCsrfMatcher`的源码

```java
public class CsrfSecurityRequestMatcher implements RequestMatcher {
    private Pattern allowedMethods = Pattern.compile("^(GET|HEAD|TRACE|OPTIONS)$");
    private RegexRequestMatcher unprotectedMatcher = new RegexRequestMatcher("^/rest/.*", null);
 
    @Override
    public boolean matches(HttpServletRequest request) {
        if(allowedMethods.matcher(request.getMethod()).matches()){
            return false;
        }
 
        return !unprotectedMatcher.matches(request);
    }
}
```


### 5.5 Spring Security - CookieCsrfTokenRepository如何工作的呢?

```java
CookieCsrfTokenRepository.withHttpOnlyFalse()` 本质就是`new CookieCsrfTokenRepository()
public static CookieCsrfTokenRepository withHttpOnlyFalse() {
    CookieCsrfTokenRepository result = new CookieCsrfTokenRepository();
    result.setCookieHttpOnly(false);
    return result;
}
```

**为何默认的存放CSRFToken的cookie是httpOnly呢？**

如果cookie中设置了HttpOnly属性，那么通过js脚本将无法读取到cookie信息，这样能有效的防止XSS攻击，窃取cookie内容，这样就增加了cookie的安全性，即便是这样，也不要将重要信息存入cookie。XSS全称Cross SiteScript，跨站脚本攻击，是Web程序中常见的漏洞，XSS属于被动式且用于客户端的攻击方式，所以容易被忽略其危害性。其原理是攻击者向有XSS漏洞的网站中输入(传入)恶意的HTML代码，当其它用户浏览该网站时，这段HTML代码会自动执行，从而达到攻击的目的。如，盗取用户Cookie、破坏页面结构、重定向到其它网站等。这里请看[开发安全 - XSS 详解]()

```java
// 比如，设置https的cookie
response.addHeader("Set-Cookie", "uid=112; Path=/; Secure; HttpOnly");

```

**Cookie CsrfToken 默认的封装**

```java
static final String DEFAULT_CSRF_COOKIE_NAME = "XSRF-TOKEN";

static final String DEFAULT_CSRF_PARAMETER_NAME = "_csrf";

static final String DEFAULT_CSRF_HEADER_NAME = "X-XSRF-TOKEN";

private String parameterName = DEFAULT_CSRF_PARAMETER_NAME;

private String headerName = DEFAULT_CSRF_HEADER_NAME;

private String cookieName = DEFAULT_CSRF_COOKIE_NAME;

@Override
public CsrfToken generateToken(HttpServletRequest request) {
    return new DefaultCsrfToken(this.headerName, this.parameterName,
            createNewToken());
}
```

**CsrfToken的保存**

```java
@Override
public void saveToken(CsrfToken token, HttpServletRequest request,
        HttpServletResponse response) {
    String tokenValue = token == null ? "" : token.getToken();
    Cookie cookie = new Cookie(this.cookieName, tokenValue);
    cookie.setSecure(request.isSecure());
    if (this.cookiePath != null && !this.cookiePath.isEmpty()) {
            cookie.setPath(this.cookiePath);
    } else {
            cookie.setPath(this.getRequestContext(request));
    }
    if (token == null) {
        cookie.setMaxAge(0);
    }
    else {
        cookie.setMaxAge(-1);
    }
    if (cookieHttpOnly && setHttpOnlyMethod != null) {
        ReflectionUtils.invokeMethod(setHttpOnlyMethod, cookie, Boolean.TRUE);
    }

    response.addCookie(cookie);
}
```

**CsrfToken的加载**

```java
@Override
public CsrfToken loadToken(HttpServletRequest request) {
    Cookie cookie = WebUtils.getCookie(request, this.cookieName);
    if (cookie == null) {
        return null;
    }
    String token = cookie.getValue();
    if (!StringUtils.hasLength(token)) {
        return null;
    }
    return new DefaultCsrfToken(this.headerName, this.parameterName, token);
}

  
```

### 5.6 Spring Security - CsrfFilter是如何完成拦截和校验的呢?

```java
public final class CsrfFilter extends OncePerRequestFilter {
    // 负责CsrfToken生成，加载等
    private final CsrfTokenRepository tokenRepository;
    
    // 负责拦截Csrf的匹配
    private RequestMatcher requireCsrfProtectionMatcher = DEFAULT_CSRF_MATCHER;
    
    // 被拦截后的拒绝策略
	private AccessDeniedHandler accessDeniedHandler = new AccessDeniedHandlerImpl();

    // CsrfFilter的过滤逻辑
	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
					throws ServletException, IOException {
		request.setAttribute(HttpServletResponse.class.getName(), response);

        // 加载token,没有的自动生成一个
		CsrfToken csrfToken = this.tokenRepository.loadToken(request);
		final boolean missingToken = csrfToken == null;
		if (missingToken) {
			csrfToken = this.tokenRepository.generateToken(request);
			this.tokenRepository.saveToken(csrfToken, request, response);
		}
		request.setAttribute(CsrfToken.class.getName(), csrfToken);
		request.setAttribute(csrfToken.getParameterName(), csrfToken);

        // 拦截请求
		if (!this.requireCsrfProtectionMatcher.matches(request)) {
			filterChain.doFilter(request, response);
			return;
		}

        // 校验token
		String actualToken = request.getHeader(csrfToken.getHeaderName());
		if (actualToken == null) {
			actualToken = request.getParameter(csrfToken.getParameterName());
		}
		if (!csrfToken.getToken().equals(actualToken)) {
			if (this.logger.isDebugEnabled()) {
				this.logger.debug("Invalid CSRF token found for "
						+ UrlUtils.buildFullRequestUrl(request));
			}
			if (missingToken) {
				this.accessDeniedHandler.handle(request, response,
						new MissingCsrfTokenException(actualToken));
			}
			else {
				this.accessDeniedHandler.handle(request, response,
						new InvalidCsrfTokenException(csrfToken, actualToken));
			}
			return;
		}

		filterChain.doFilter(request, response);
    }
}

  
```

### 5.7 Spring Security - 默认对哪些Method拦截呢?

"GET", "HEAD", "TRACE", "OPTIONS" 不会拦截：

```java
private static final class DefaultRequiresCsrfMatcher implements RequestMatcher {
    private final HashSet<String> allowedMethods = new HashSet<String>(
            Arrays.asList("GET", "HEAD", "TRACE", "OPTIONS"));

    /*
        * (non-Javadoc)
        *
        * @see
        * org.springframework.security.web.util.matcher.RequestMatcher#matches(javax.
        * servlet.http.HttpServletRequest)
        */
    @Override
    public boolean matches(HttpServletRequest request) {
        return !this.allowedMethods.contains(request.getMethod());
    }
}

  
```

### 5.8 Spring Security - HttpSessionCsrfTokenRepository

> 经过上面的分析，你再看Session的，是不是很简单? 我这边贴个代码，你眼睛扫一下即可。

```java
public final class HttpSessionCsrfTokenRepository implements CsrfTokenRepository {
	private static final String DEFAULT_CSRF_PARAMETER_NAME = "_csrf";

	private static final String DEFAULT_CSRF_HEADER_NAME = "X-CSRF-TOKEN";

	private static final String DEFAULT_CSRF_TOKEN_ATTR_NAME = HttpSessionCsrfTokenRepository.class
			.getName().concat(".CSRF_TOKEN");

	private String parameterName = DEFAULT_CSRF_PARAMETER_NAME;

	private String headerName = DEFAULT_CSRF_HEADER_NAME;

	private String sessionAttributeName = DEFAULT_CSRF_TOKEN_ATTR_NAME;

	/*
	 * (non-Javadoc)
	 *
	 * @see org.springframework.security.web.csrf.CsrfTokenRepository#saveToken(org.
	 * springframework .security.web.csrf.CsrfToken,
	 * javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public void saveToken(CsrfToken token, HttpServletRequest request,
			HttpServletResponse response) {
		if (token == null) {
			HttpSession session = request.getSession(false);
			if (session != null) {
				session.removeAttribute(this.sessionAttributeName);
			}
		}
		else {
			HttpSession session = request.getSession();
			session.setAttribute(this.sessionAttributeName, token);
		}
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.springframework.security.web.csrf.CsrfTokenRepository#loadToken(javax.servlet
	 * .http.HttpServletRequest)
	 */
	public CsrfToken loadToken(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session == null) {
			return null;
		}
		return (CsrfToken) session.getAttribute(this.sessionAttributeName);
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.springframework.security.web.csrf.CsrfTokenRepository#generateToken(javax.
	 * servlet .http.HttpServletRequest)
	 */
	public CsrfToken generateToken(HttpServletRequest request) {
		return new DefaultCsrfToken(this.headerName, this.parameterName,
				createNewToken());
	}
}
```

### 5.9 Spring Security - 设置Csrf不对会造成哪些错误呢?

- 403 - 用CSRF作为控制权限，引发权限问题

```java
There was an unexpected error (type=Forbidden, status=403).
Invalid CSRF Token 'null' was found on the request parameter '_csrf' or header 'X-XSRF-TOKEN'.

```

- 405 - 前置的参数绑定问题

```java
POST method not supported。// 本质上还是参数绑定时，Csrf没有设置或者不正确。
  
```

## 6. 总结与展望

可见，CSRF 是一种危害非常大的攻击，又很难以防范。目前几种防御策略虽然可以很大程度上抵御 CSRF 的攻击，但并没有一种完美的解决方案。一些新的方案正在研究之中，比如对于每次请求都使用不同的动态口令，把 Referer 和 token 方案结合起来，甚至尝试修改 HTTP 规范，但是这些新的方案尚不成熟，要正式投入使用并被业界广为接受还需时日。在这之前，我们只有充分重视 CSRF，根据系统的实际情况选择最合适的策略，这样才能把 CSRF 的危害降到最低。

## 参考文章

[开发安全 - CSRF 详解](https://pdai.tech/md/develop/security/dev-security-x-csrf.html)