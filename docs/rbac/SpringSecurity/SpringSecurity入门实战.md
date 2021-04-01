# SpringSecurity入门实战

## 1. 背景

在web应用开发中，安全无疑是十分重要的，选择Spring Security来保护web应用是一个非常好的选择。Spring Security 是spring项目之中的一个安全模块，可以非常方便与spring项目无缝集成。

## 2. Spring Security例子

### 2.1 创建不受保护的应用

包含以下一个controller

```java
@Controller
public class AppController {
 
    @RequestMapping("/hello")
    @ResponseBody
    String home() {
        return "Hello ,spring security!";
    }
}  
```

我们启动应用，假设端口是8080，那么当我们在浏览器访问`http://localhost:8080/hello`的时候可以在浏览器看到`Hello ,spring security!`。

### 2.2 加入spring security 保护应用

此时，/hello是可以自由访问。假设，我们需要具有某个角色的用户才能访问的时候，我们可以引入spring security来进行保护。加入如下依赖，并重启应用：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

再次访问`/hello`，我们可以得到一个页面，如下：

![image-20210401150919739](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20210401150919739.png)

说明spring security 已经起作用了，我们需要登陆才能访问。我们可以查看下这个页面的源代码，是这样：

```html
<html><head><title>Login Page</title></head><body onload='document.f.username.focus();'>
<h3>Login with Username and Password</h3><form name='f' action='/login' method='POST'>
<table>
	<tr><td>User:</td><td><input type='text' name='username' value=''></td></tr>
	<tr><td>Password:</td><td><input type='password' name='password'/></td></tr>
	<tr><td colspan='2'><input name="submit" type="submit" value="Login"/></td></tr>
	<input name="_csrf" type="hidden" value="635780a5-6853-4fcd-ba14-77db85dbd8bd" />
</table>
</form></body></html>
```

上面的html中有个form ，其中`action="/login"`，这个`/login`依然是`spring security`提供的。form表单提交了三个数据：

- username 用户名
- password 密码
- _csrf CSRF保护方面的内容，暂时先不展开解释

为了登录系统，我们需要知道用户名密码，spring security 默认的用户名是user，spring security启动的时候会生成默认密码（在启动日志中可以看到）。本例，我们指定一个用户名密码，在配置文件中加入如下内容：

默认的登陆用户是`user`默认的登陆密码我们可以去控制台看下日志。会看到如下信息：

```
2021-04-01 15:08:49.640  INFO 15528 --- [           main] .s.s.UserDetailsServiceAutoConfiguration : 

Using generated security password: 1d296a39-6494-45ff-bfed-f222e768aab4

```

我们在登陆框输入`user`和密码`1d296a39-6494-45ff-bfed-f222e768aab4`。可以登录成功，并能访问/hello的内容。

### 2.3 自定义security配置

上面我们看到默认情况下，spring为我们提供了一个「httpBasic」模式的简单登陆页面，并在控制台输出了密码（这个密码每次启动都是不一样的）。如果我们想用自己的定义的账号密码，则需要改配置。如下：

我们新建一个类`SecurityConfiguration`,并加入一些代码，如下所示：

```java
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
 
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.authorizeRequests()
				.anyRequest().authenticated()
				.and()
				.formLogin().and()
				.httpBasic();
	}
  
   @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
      auth.
        inMemoryAuthentication()
        .withUser("spring")
        .password("{noop}123456").roles("USER");
 
    }
}
```

上面的配置其实和默认情况的配置几乎一样，只是这里定义了一个用户`spring`，和密码`123456` 。（说明：密码前面的{noop}表示的是指定的PasswordEncoder）此时我们启动项目，便可以使用spring这个用户及123456密码登录了。

### 2.4 角色-资源 访问控制

通常情况下，我们需要实现“特定资源只能由特定角色访问”的功能。假设我们的系统有如下两个角色：

- ADMIN 可以访问所有资源
- USER 只能访问特定资源

现在我们给系统增加“/product” 代表商品信息方面的资源（USER可以访问）；增加"/admin"代码管理员方面的资源（USER不能访问）。代码如下：

ProductTestController类

```java
@Controller
@RequestMapping("/product")
public class ProductTestController {
 
	@RequestMapping("/info")
	@ResponseBody
	public String productInfo(){
		return " some product info ";
	}
}
```



AdminTestController 类

```java
@Controller
@RequestMapping("/admin")
public class AdminTestController {

    @RequestMapping("/home")
    @ResponseBody
    public String productInfo(){
        return " admin home page ";
    }
}
```

现在我们希望实现：admin可以访问所有页面，而普通用户只能方法/product页面。配置如下：

```java
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
 
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers("/product/**").hasRole("USER")
                    .antMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .formLogin().and()
                .httpBasic();
     }
 
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .inMemoryAuthentication()
            .withUser("admin").password("{noop}adminpass").roles("ADMIN", "USER") 
            .and()
            .withUser("spring").password("{noop}123456").roles("USER");
 
     }
 
}
```

这里，我们增加了 管理员（admin，密码adminpass），以及普通用户（spring,密码123456）

同时，我们增加了链接对应的角色配置。上面的配置，我们可以知道：

- 使用 USER角色的用户登录，只能访问/product/**
- 使用 ADMIN角色的用户登录，可以访问所有。

下面来验证一下普通用户登录，重启项目，在浏览器中输入：http://localhost:8080/admin/home。同样，我们会到达登录页面，我们输入用户名`spring`,密码也为`123456` 结果错误页面了，拒绝访问了，信息为：

```
There was an unexpected error (type=Forbidden, status=403).
```

![image-20210401152411860](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20210401152411860.png)

我们把浏览器中的uri修改成：`/product/info`，结果访问成功。可以看到`some product info`。说明 spring这个USER角色只能访问 product/** ,这个结果与我们预期一致。

再来验证一下管理员用户登录，重启浏览器之后，输入http://localhost:8080/admin/home。在登录页面中输入用户名admin，密码adminpass，提交之后，可以看到`admin home page`,说明访问管理员资源了。我们再将浏览器uri修改成`/product/info`,刷新之后，也能看到`some product info`,说明 ADMIN角色的用户可以访问所有资源，这个也和我们的预期一致。

### 2.5 获取当前登录用户信息

上面我们实现了“资源 - 角色”的访问控制，效果和我们预期的一致，但是并不直观，我们不妨尝试在控制器中获取“当前登录用户”的信息，直接输出，看看效果。以/product/info为例，我们修改其代码，如下：

```java
@RequestMapping("/info")
	@ResponseBody
	public String productInfo(){
		String currentUser = "";
		Object principl = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if(principl instanceof UserDetails) {
			currentUser = ((UserDetails)principl).getUsername();
		}else {
			currentUser = principl.toString();
		}
		return " some product info,currentUser is: "+currentUser;
	}
```

这里，我们通过`SecurityContextHolder`来获取了用户信息，并拼接成字符串输出。重启项目，在浏览器访问http://localhost:8080/product/info. 使用 admin的身份登录，可以看到浏览器显示`some product info,currentUser is: admin`。

## 3.实战

### 3.1 通过数据库查询,存储用户和角色实现安全认证

开篇的例子中，我们使用了内存用户角色来演示登录认证。但是实际项目我们肯定是通过数据库完成的。实际项目中，我们可能会有3张表：用户表，角色表，用户角色关联表。当然，不同的系统会有不同的设计，不一定非得是这样的三张表。本例演示的意义在于：如果我们想在已有项目中增加spring security的话，就需要调整登录了。主要是自定义`UserDetailsService`,此外，可能还需要处理密码的问题，因为spring并不知道我们怎么加密用户登录密码的。这时，我们可能需要自定义`PasswordEncoder`，下面也会提到。

#### 3.1.1 添加spring-data-jpa , 创建数据表，并添加数据

继续完善开篇的项目，现在给项目添加`spring-data-jpa`，并使用MySQL数据库。因此在POM文件中加入如下配置：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

在application.properties文件中加入数据库连接信息：

```xml
spring.datasource.url=jdbc:mysql://localhost:3306/yourDB?useUnicode=true&characterEncoding=UTF-8
spring.datasource.username=dbuser
spring.datasource.password=******
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```

这里，为了简单方便演示，我们只创建一张表，字段如下：

```java
@Entity
public class User implements java.io.Serializable{
 
	@Id
	@Column
	private Long id;
	@Column
	private String login;
	@Column
	private String password;
	@Column
	private String role;
    // 省略get set 等
}
```

然后我们添加2条数据，如下：

| id   | login  | password  | role       |
| ---- | ------ | --------- | ---------- |
| 1    | spring | 123456    | USER       |
| 2    | admin  | adminpass | ADMIN,USER |

密码这里都是使用了`NoOpPasswordEncoder` 需在`SecurityConfiguration`中加入配置，后面会贴。

#### 3.1.2 自定义UserDetailsService

前面我们提到过，UserDetailsService，spring security在认证过程中需要查找用户，会调用UserDetailsService的loadUserByUsername方法得到一个UserDetails，下面我们来实现他。代码如下：

```java
 
@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
 
    @Autowired
    UserRepository userRepository;
 
    private GrantedAuthority DEFAULT_ROLE = new SimpleGrantedAuthority("USER");
 
    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        // 1. 查询用户
        User userFromDatabase = userRepository.findOneByLogin(login);
        if (userFromDatabase == null) {
            //log.warn("User: {} not found", login);
            throw new UsernameNotFoundException("User " + login + " was not found in db");
        }
        // 2. 设置角色
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        String dbRole = userFromDatabase.getRole();
        if(StringUtils.isNullOrEmpty(dbRole)){
             grantedAuthorities.add(DEFAULT_ROLE);
        }else{
            String [] roles = dbRole.split(",");
            for (String r : roles){
                GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(r);
                grantedAuthorities.add(grantedAuthority);
            }
        }
 
        return new org.springframework.security.core.userdetails.User(login,
                userFromDatabase.getPassword(), grantedAuthorities);
    }
}
```

这个方法做了2件事情，查询用户以及设置角色。现在我们来修改之前的`SecurityConfiguration`配置, 加入`CustomUserDetailsService`bean配置，如下：

```java
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
 
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/product/**").hasAuthority("USER")
                .antMatchers("/admin/**").hasAuthority("ADMIN")
                .anyRequest().authenticated()
                .and()
                .formLogin().and()
                .httpBasic();
     }
 
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
 
        auth.userDetailsService(userDetailsService)// 设置自定义的userDetailsService
                .passwordEncoder(passwordEncoder());
 
     }
 
     @Autowired
     private UserDetailsService userDetailsService;
 
    @Bean
    public PasswordEncoder passwordEncoder() {
        //为了演示方便，我们使用NoOpPasswordEncoder（这个就是不加密）
        return NoOpPasswordEncoder.getInstance();
    }
 
}
```

#### 3.1.3 验证效果

上面我们自定义了`userDetailsService`,此时，spring security 在其作用流程中会调用，不出意外的话，重启系统，我们使用spring登录可以看到/product/info，但是不能看/admin/home。下面我们来重启项目验证一下。

先输入spring，以及错误密码，可以看到页面报错：`Bad credentials`。再输入spring ，以及正确密码123456，结果：`some product info,currentUser is: spring`

再将浏览器链接修改为/admin/home，结果显示：

```
There was an unexpected error (type=Forbidden, status=403).
Forbidden
```

这与我们的预期完全一致，至此，我们已经在项目中加入了spring security，并且能够通过查询数据库用户，角色信息交给spring security完成认证授权。（当然了，这里密码使用了明文，只是为了演示方便）

### 3.2 spring security session 无状态

还记得我们开篇所举的例子吗？我们使用管理员账号密码登录之后，就可以访问/admin/home了，此时修改浏览器地址栏为/product/info之后刷新页面，仍然可以访问，说明认证状态被保持了；如果关闭浏览器重新输入/admin/home就会提示我们重新登录，这有点session的感觉。如果此时，我们将浏览器cookie禁用掉，你会发现登录之后自动跳转只会得到403，403是拒绝访问的意思，是没有权限的意思，说明这种情况下授权状态和session是挂钩的。即这时spring security使用了session。但是不是所有的系统都需要session，我们能让spring security不适用session吗？答案是可以！

使用spring security 我们可以准确控制session何时创建以及Spring Security如何与之交互：

- ***always*** – a session will always be created if one doesn’t already exist，没有session就创建。
- ***ifRequired*** – a session will be created only if required (**default**)，如果需要就创建（默认）。
- ***never*** – the framework will never create a session itself but it will use one if it already exists
- ***stateless*** – no session will be created or used by Spring Security 不创建不使用session

这里，我们要关注的是 stateless，通常称为**无状态**的。为啥要关注这个stateless无状态的情况的呢？因为目前，我们的应用基本都是前后端分离的应用。比方说，你的一套java api是给react前端、安卓端、IOS端 调用的。这个时候你还提什么session啊，这时候我们需要的是无状态，通常以一种token的方式来交互。

spring security 配置stateless 的方式如下，依然是修改我们之前定义的`SecurityConfiguration`:

```java
http
    .sessionManagement()
    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
```

### 3.3 前后端分离应用中自定义token整合spring security

上面我们提到了stateless，实际中我们的前后端分离项目都是无状态的，并没有登录状态保持，服务器通过客户端调用传递的token来识别调用者是谁。

通常我们的系统流程是这样的：

1. 客户端（react前端，IOS，安卓）调用“**登录接口**”获得一个包含token的响应（通常是个JSON，如 {"token":"abcd","expires":1234567890}）
2. 客户端获取数据，并携带 token参数。
3. 服务端根据token发现token过期/错误，返回"请登录"状态码
4. 服务器发现token正常，并解析出来是A，返回A的数据。
5. ……

如果我们想在spring security项目中使用自定义的token，那么我们需要思考下面的问题：

1. 怎么发token（即怎么登录？）
2. 发token怎么和spring security整合。
3. spring security怎么根据token得到授权认证信息。

下面从登录发token开始，这里需要使用到`UsernamePasswordAuthenticationToken`,以及`SecurityContextHolder`,代码如下：

```java
    @RequestMapping(value = "/authenticate",method = RequestMethod.POST)
    public Token authorize(@RequestParam String username, @RequestParam String password) {
        // 1 创建UsernamePasswordAuthenticationToken
        UsernamePasswordAuthenticationToken token 
                           = new UsernamePasswordAuthenticationToken(username, password);
        // 2 认证
        Authentication authentication = this.authenticationManager.authenticate(token);
        // 3 保存认证信息
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // 4 加载UserDetails
        UserDetails details = this.userDetailsService.loadUserByUsername(username);
        // 5 生成自定义token
        return tokenProvider.createToken(details);
    }
    @Inject
    private AuthenticationManager authenticationManager;
```

上面代码中1,2,3,4步骤都是和spring security交互的。只有第5步是我们自己定义的，这里`tokenProvider`就是我们系统中token的生成方式（这个完全是个性化的，通常是个加密串，通常可能会包含用户信息，过期时间等）。其中的`Token`也是我们自定义的返回对象，其中包含token信息类似`{"token":"abcd","expires":1234567890}`.

我们的`tokenProvider`通常至少具有两个方法，即：生成token，验证token。大致如下：

```java
public class TokenProvider {
 
    private final String secretKey;
    private final int tokenValidity;
 
    public TokenProvider(String secretKey, int tokenValidity) {
        this.secretKey = secretKey;
        this.tokenValidity = tokenValidity;
    }
   // 生成token
    public Token createToken(UserDetails userDetails) {
        long expires = System.currentTimeMillis() + 1000L * tokenValidity;
        String token =  computeSignature(userDetails, expires);
        return new Token(token, expires);
    }
    // 验证token
   public boolean validateToken(String authToken, UserDetails userDetails) {
        check token
        return true or false;
    }
     // 从token中识别用户
    public String getUserNameFromToken(String authToken) {
        // ……
        return login;
    }
    public String computeSignature(UserDetails userDetails, long expires) {
        // 一些特有的信息组装 ,并结合某种加密活摘要算法
        return 例如 something+"|"+something2+MD5(s);
    }
 
}
```

至此，我们客户端可以通过调用`http://host/context/authenticate`来获得一个token了，类似这样的：`{"token":"abcd","expires":1234567890}`。那么下次请求的时候，我们带上 `token=abcd`这个参数（或者也可以是自定义的请求头中）如何在spring security中复原“session”呢。我们**需要一个filter**：

```java
public class MyTokenFilter extends GenericFilterBean {
 
    private final Logger log = LoggerFactory.getLogger(XAuthTokenFilter.class);
 
    private final static String XAUTH_TOKEN_HEADER_NAME = "my-auth-token";
 
    private UserDetailsService detailsService;
 
    private TokenProvider tokenProvider;
    public XAuthTokenFilter(UserDetailsService detailsService, TokenProvider tokenProvider) {
        this.detailsService = detailsService;
        this.tokenProvider = tokenProvider;
    }
 
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        try {
            HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
            String authToken = httpServletRequest.getHeader(XAUTH_TOKEN_HEADER_NAME);
            if (StringUtils.hasText(authToken)) {
               // 从自定义tokenProvider中解析用户
                String username = this.tokenProvider.getUserNameFromToken(authToken);
                // 这里仍然是调用我们自定义的UserDetailsService，查库，检查用户名是否存在，
                // 如果是伪造的token,可能DB中就找不到username这个人了，抛出异常，认证失败
                UserDetails details = this.detailsService.loadUserByUsername(username);
                if (this.tokenProvider.validateToken(authToken, details)) {
                    log.debug(" validateToken ok...");
                    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(details, details.getPassword(), details.getAuthorities());
                    // 这里还是上面见过的，存放认证信息，如果没有走这一步，下面的doFilter就会提示登录了
                    SecurityContextHolder.getContext().setAuthentication(token);
                }
            }
            // 调用后续的Filter,如果上面的代码逻辑未能复原“session”，SecurityContext中没有想过信息，后面的流程会检测出"需要登录"
            filterChain.doFilter(servletRequest, servletResponse);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
}
```

目前为止，我们实现了自定义的token生成类，以及通过一个filter来拦截客户端请求，解析其中的token，复原无状态下的"session"，让当前请求处理线程中具有认证授权数据，后面的业务逻辑才能执行。下面，我们需要将自定义的内容整合到spring security中。

首先编写一个类，继承`SecurityConfigurerAdapter`:

```java
public class MyAuthTokenConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
 
    private TokenProvider tokenProvider;  // 我们之前自定义的 token功能类
    private UserDetailsService detailsService;// 也是我实现的UserDetailsService
    
    public MyAuthTokenConfigurer(UserDetailsService detailsService, TokenProvider tokenProvider) {
        this.detailsService = detailsService;
        this.tokenProvider = tokenProvider;
    }
 
    @Override
    public void configure(HttpSecurity http) throws Exception {
        MyAuthTokenFilter customFilter = new MyAuthTokenFilter(detailsService, tokenProvider);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
```

在 `SecurityConfiguration`配置类中加入如下内容：

```java
    // 增加方法
    private MyAuthTokenConfigurer securityConfigurerAdapter() {
      return new MyAuthTokenConfigurer(userDetailsService, tokenProvider);
    }
    // 依赖注入
    @Inject
    private UserDetailsService userDetailsService;
 
    @Inject
    private TokenProvider tokenProvider;
 
     //方法修改 ， 增加securityConfigurerAdapter
     @Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.authorizeRequests()
				.anyRequest().authenticated()
                  // .... 其他配置
				.and()
                 .apply(securityConfigurerAdapter());// 这里增加securityConfigurerAdapter
				
	}
 
```

至此我们就完成了无状态应用中token认证结合spring security。

## 参考文章

[Spring Security 入门原理及实战](https://www.cnblogs.com/demingblog/p/10874753.html)