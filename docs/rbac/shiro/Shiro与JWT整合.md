# Shiro与JWT整合

## 1. 添加依赖

```
<dependency>
   <groupId>org.apache.shiro</groupId>
   <artifactId>shiro-spring-boot-web-starter</artifactId>
   <version>1.4.0</version>
</dependency>

<!-- jwt -->
<dependency>
   <groupId>com.auth0</groupId>
   <artifactId>java-jwt</artifactId>
   <version>3.4.1</version>
</dependency>
```

## 2. JWTUtil工具类

该工具类主要负责

- 生成JWT token
- 验证 token
- 从token 中获取用户名

```java
public class JWTUtil {

    /**
     * 默认超时 一天
     */
    private static final long EXPIRE_TIME = 86400 * 1000;


    /**
     * 从token 中获取用户名
     * @param token
     * @return
     */
    public static String getUsername(String token) {
        try {
            DecodedJWT jwt = JWT.decode(token);
           return jwt.getClaim("username").asString();
        } catch (JWTDecodeException e) {
            e.printStackTrace();
            return null;
        }

    }

    /**
     *  生成JWT token
     * @param username
     * @param secret
     * @return
     */
    public static String sign(String username, String secret) {
        try {
            username = username.toLowerCase();
            Date date = new Date(System.currentTimeMillis() + EXPIRE_TIME);
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withClaim("username", username)
                    .withExpiresAt(date)
                    .sign(algorithm);
        } catch (Exception e) {
            log.error("error：{}", e);
            return null;
        }
    }

    /**
     * 验证token
     * @param token
     * @param username
     * @param secret
     * @return
     */
    public static boolean verify(String token, String username, String secret) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withClaim("username", username)
                    .build();
            verifier.verify(token);
            log.info("token is valid");
            return true;
        }  catch (Exception e) {
            e.printStackTrace();
            log.info("token is invalid{}", e.getMessage());
            return false;
        }

    }
}
```

### 2.1 JWTUtil 执行的时机

- 生成token时机（JWTUtil.sign()）

  在登录成功后，并将生成的token 再进行一次加密，保存在redis 中。并返回给前端页面

- 从token 中获取用户名（JWTUtil.getUsername(token)）

  在ShiroRealm 中的两个方法中都能获取到token

  - 授权模块 doGetAuthorizationInfo
  - 用户认证  doGetAuthenticationInfo

- 验证token 时机（JWTUtil.verify()）

  在用户认证模块，通过token 获取到用户名，再将用户名获取用户信息。在调用验证接口

## 3. 配置ShiroRealm

```java
@Slf4j
public class ShiroRealm extends AuthorizingRealm{

    @Autowired
    private UserManager userManager;

    @Autowired
    private RedisService redisService;

    /**
     * 授权模块，获取用户角色和权限
     * @param token
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection token) {
       String username =  JWTUtil.getUsername(token.toString());
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();

        // 获取用户角色集
        Set<String> roleSet = userManager.getUserRoles(username);
        simpleAuthorizationInfo.setRoles(roleSet);

        // 获取用户权限集
        Set<String> permissionSet = userManager.getUserPermissions(username);
        simpleAuthorizationInfo.setStringPermissions(permissionSet);
        return simpleAuthorizationInfo;
    }

    /**
     * 用户认证
     * @param authenticationToken 身份认证token
     * @return AuthenticationInfo 身份认证信息
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        // 这里的 token 是从 JWTFilter 的 executeLogin 方法传递过来的，已经经过了解密
        String token = (String) authenticationToken.getCredentials();

        // 从 redis 里获取这个token
        String encryptToken = FebsUtil.encryptToken(token);
        String encryptTokenInRedis = null;
        try {
            encryptTokenInRedis = redisService.get(TOKEN_CACHE_PREFIX + encryptToken );
        } catch (Exception ignore) {
            log.error("token 保存失败");
            ignore.printStackTrace();
        }
        // 如果找不到，说明已经失效
        if (StringUtils.isBlank(encryptTokenInRedis))
            throw new AuthenticationException("token已经过期");
        String username = JWTUtil.getUsername(token);
        if (StringUtils.isBlank(username))
            throw new AuthenticationException("token校验不通过");

        // 通过用户名查询用户信息
        User user = userManager.getUser(username);
        if (user == null)
            throw new AuthenticationException("用户名或密码错误");
        if (!JWTUtil.verify(token, username, user.getPassword()))
            throw new AuthenticationException("token校验不通过");

         return new SimpleAuthenticationInfo(token, token, "febs_shiro_realm");
    }
}
```

## 4. ShiroConfig 配置类

```java
@Configuration
public class ShiroConfig {

    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(SecurityManager securityManager){
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        // 设置 securityManager
        shiroFilterFactoryBean.setSecurityManager(securityManager);

        // 在 Shiro 过滤器链上加入 JWTFilter
        LinkedHashMap<String,Filter> filters = new LinkedHashMap<>();
        filters.put("jwt",new JWTFilter());
        shiroFilterFactoryBean.setFilters(filters);

        LinkedHashMap<String, String> filterChainDefinitionMap = new LinkedHashMap<>();
        // 所有请求都要经过 jwt过滤器
        filterChainDefinitionMap.put("/**", "jwt");

        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
        return shiroFilterFactoryBean;
    }

    @Bean
    public SecurityManager securityManager(){
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        // 配置 SecurityManager，并注入 shiroRealm
        securityManager.setRealm(shiroRealm());
        return securityManager;
    }

    @Bean
    private Realm shiroRealm() {
        // 配置 Realm
        return new ShiroRealm();
    }
}
```

## 5. JWTFilter 配置过滤器

所有的页面都走过滤器，然后自己设置哪些页面不需要过滤

```java
@Slf4j
public class JWTFilter extends BasicHttpAuthenticationFilter {

    private static final String TOKEN = "Authentication";

    private AntPathMatcher pathMatcher = new AntPathMatcher();

    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) throws UnauthorizedException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        FebsProperties febsProperties = SpringContextUtil.getBean(FebsProperties.class);
        String[] anonUrl = StringUtils.splitByWholeSeparatorPreserveAllTokens(febsProperties.getShiro().getAnonUrl(), ",");

        boolean match = false;
        for (String u : anonUrl) {
            String requestURI = httpServletRequest.getRequestURI();
            if (pathMatcher.match(u,requestURI ))
                match = true;
        }
        if (match) return true;
        if (isLoginAttempt(request, response)) {
            return executeLogin(request, response);
        }
        return false;
    }

    @Override
    protected boolean isLoginAttempt(ServletRequest request, ServletResponse response) {
        HttpServletRequest req = (HttpServletRequest) request;
        String token = req.getHeader(TOKEN);
        return token != null;
    }

    @Override
    protected boolean executeLogin(ServletRequest request, ServletResponse response) {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String token = httpServletRequest.getHeader(TOKEN);
        JWTToken jwtToken = new JWTToken(FebsUtil.decryptToken(token));
        try {
            getSubject(request, response).login(jwtToken);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    /**
     * 对跨域提供支持
     */
    @Override
    protected boolean preHandle(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        httpServletResponse.setHeader("Access-control-Allow-Origin", httpServletRequest.getHeader("Origin"));
        httpServletResponse.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
        httpServletResponse.setHeader("Access-Control-Allow-Headers", httpServletRequest.getHeader("Access-Control-Request-Headers"));
        // 跨域时会首先发送一个 option请求，这里我们给 option请求直接返回正常状态
        if (httpServletRequest.getMethod().equals(RequestMethod.OPTIONS.name())) {
            httpServletResponse.setStatus(HttpStatus.OK.value());
            return false;
        }
        return super.preHandle(request, response);
    }
}
```

### 5.1 token是怎么获取并设置进来的？

在过滤器中从Header中获取，并封装成JWTToken，并执行

getSubject(request, response).login(jwtToken);

```
@Override
protected boolean executeLogin(ServletRequest request, ServletResponse response) {
    HttpServletRequest httpServletRequest = (HttpServletRequest) request;
    String token = httpServletRequest.getHeader(TOKEN);
    JWTToken jwtToken = new JWTToken(FebsUtil.decryptToken(token));
    try {
        getSubject(request, response).login(jwtToken);
        return true;
    } catch (Exception e) {
        log.error(e.getMessage());
        return false;
    }
}
```

## 6. JWTToken

```java
/**
 * JSON Web Token
 */
@Data
public class JWTToken implements AuthenticationToken {

    private static final long serialVersionUID = 1282057025599826155L;

    private String token;

    private String exipreAt;

    public JWTToken(String token) {
        this.token = token;
    }

    public JWTToken(String token, String exipreAt) {
        this.token = token;
        this.exipreAt = exipreAt;
    }

    @Override
    public Object getPrincipal() {
        return token;
    }

    @Override
    public Object getCredentials() {
        return token;
    }

}
```

