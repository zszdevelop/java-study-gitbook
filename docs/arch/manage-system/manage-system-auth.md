---
order: 1030
category:
  - 后台管理

---



# 后台管理 - 用户认证SaToken

## 1. 具体实现

### 1.1 用户登录

项目采用前后端分离架构（无 Cookie 模式）

>所谓 Cookie ，本质上就是一个特殊的`header`参数而已， 而既然它只是一个 header 参数，我们就能手动模拟实现它，从而完成鉴权操作。

- 后端将 token 返回到前端

  1. 首先调用 `StpUtil.login(id)` 进行登录。

  1. 调用 `StpUtil.getTokenInfo()` 返回当前会话的 token 详细参数。

- 前端将 token 提交到后端

  1. 将 token 塞到请求`header`里 ，格式为：`{tokenName: tokenValue}`。

```java
 /**
     * 登录
     */
    public String login(String username, String password) {
        LoginUser userInfo = remoteUserService.getUserInfo(username);

        checkLogin(LoginType.PASSWORD, username, () -> !BCrypt.checkpw(password, userInfo.getPassword()));
        // 获取登录token
        LoginHelper.loginByDevice(userInfo, DeviceType.PC);

        recordLogininfor(username, Constants.LOGIN_SUCCESS, MessageUtils.message("user.login.success"));
        return StpUtil.getTokenValue();
    }
```

- SaHolder：Sa-Token上下文持有类，通过此类快速获取当前环境的相关对象
  - SaHolder.getStorage(); // 获取当前请求的 [Storage] 对象
  
  
-  StpUtil.login()
  - 检查此账号是否之前已有登录
  - 为账号生成 `Token` 凭证与 `Session` 会话
  - 通知全局侦听器，xx 账号登录成功
  - 将 `Token` 注入到请求上下文
  - 注：**保存数据到SaTokenDao()**，可以自己将数据改到redis 中保存
  - 等等其它工作……
- 存到本地ConcurrentHashMap： StpUtil.getTokenSession().set(LOGIN_USER_KEY, loginUser) 

```java
  /**
     * 登录系统 基于 设备类型
     * 针对相同用户体系不同设备
     *
     * @param loginUser 登录用户信息
     */
    public static void loginByDevice(LoginUser loginUser, DeviceType deviceType) {
        SaHolder.getStorage().set(LOGIN_USER_KEY, loginUser);
        StpUtil.login(loginUser.getLoginId(), deviceType.getDevice());
        setLoginUser(loginUser);
    }
    
    /**
     * 设置用户数据(多级缓存)
     */
    public static void setLoginUser(LoginUser loginUser) {
        StpUtil.getTokenSession().set(LOGIN_USER_KEY, loginUser);
    }
```

### 1.2 权限认证

权限认证问题的核心就是：

1. 如何获取一个账号所拥有的的权限码集合？
2. 本次操作需要验证的权限码是哪个？

>因为每个项目的需求不同，其权限设计也千变万化，因此 [ 获取当前账号权限码集合 ] 这一操作不可能内置到框架中， 所以 Sa-Token 将此操作以接口的方式暴露给你，以方便你根据自己的业务逻辑进行重写。

```java
/**
 * sa-token 权限管理实现类
 *
 */
public class SaPermissionImpl implements StpInterface {

    /**
     * 获取菜单权限列表
     */
    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        LoginUser loginUser = LoginHelper.getLoginUser();
        UserType userType = UserType.getUserType(loginUser.getUserType());
        if (userType == UserType.SYS_USER) {
            return new ArrayList<>(loginUser.getMenuPermission());
        } else if (userType == UserType.APP_USER) {
            // 其他端 自行根据业务编写
        }
        return new ArrayList<>();
    }

    /**
     * 获取角色权限列表
     */
    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        LoginUser loginUser = LoginHelper.getLoginUser();
        UserType userType = UserType.getUserType(loginUser.getUserType());
        if (userType == UserType.SYS_USER) {
            return new ArrayList<>(loginUser.getRolePermission());
        } else if (userType == UserType.APP_USER) {
            // 其他端 自行根据业务编写
        }
        return new ArrayList<>();
    }
}
```

### 1.3 微服务 - 网关统一鉴权

1. 引入redis

2. 实现鉴权接口

```java
/**
 * sa-token 权限管理实现类
 *
 * @author Lion Li
 */
public class SaPermissionImpl implements StpInterface {

    /**
     * 获取菜单权限列表
     */
    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        LoginUser loginUser = LoginHelper.getLoginUser();
        UserType userType = UserType.getUserType(loginUser.getUserType());
        if (userType == UserType.SYS_USER) {
            return new ArrayList<>(loginUser.getMenuPermission());
        } else if (userType == UserType.APP_USER) {
            // 其他端 自行根据业务编写
        }
        return new ArrayList<>();
    }

    /**
     * 获取角色权限列表
     */
    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        LoginUser loginUser = LoginHelper.getLoginUser();
        UserType userType = UserType.getUserType(loginUser.getUserType());
        if (userType == UserType.SYS_USER) {
            return new ArrayList<>(loginUser.getRolePermission());
        } else if (userType == UserType.APP_USER) {
            // 其他端 自行根据业务编写
        }
        return new ArrayList<>();
    }
}
```

```java
/**
 * 获取用户(多级缓存)
 */
public static LoginUser getLoginUser() {
    LoginUser loginUser = (LoginUser) SaHolder.getStorage().get(LOGIN_USER_KEY);
    if (loginUser != null) {
        return loginUser;
    }
    loginUser = (LoginUser) StpUtil.getTokenSession().get(LOGIN_USER_KEY);
    SaHolder.getStorage().set(LOGIN_USER_KEY, loginUser);
    return loginUser;
}
```

3.注册全局过滤器

```java
/**
 * [Sa-Token 权限认证] 拦截器
 *
 * @author Lion Li
 */
@Configuration
public class AuthFilter {

    /**
     * 注册 Sa-Token 全局过滤器
     */
    @Bean
    public SaReactorFilter getSaReactorFilter(IgnoreWhiteProperties ignoreWhite) {
        return new SaReactorFilter()
            // 拦截地址
            .addInclude("/**")
            .setExcludeList(ignoreWhite.getWhites())
            .addExclude("/favicon.ico", "/actuator/**")
            // 鉴权方法：每次访问进入
            .setAuth(obj -> {
                // 登录校验 -- 拦截所有路由
                SaRouter.match("/**")
                    .check(r -> {
                        // 检查是否登录 是否有token
                        StpUtil.checkLogin();

                        // 有效率影响 用于临时测试
                        // if (log.isDebugEnabled()) {
                        //     log.debug("剩余有效时间: {}", StpUtil.getTokenTimeout());
                        //     log.debug("临时有效时间: {}", StpUtil.getTokenActivityTimeout());
                        // }
                    });
            }).setError(e -> SaResult.error("认证失败，无法访问系统资源").setCode(HttpStatus.UNAUTHORIZED));
    }
}
```

### 1.4 微服务 - 内部服务外网隔离（网关转发鉴权)

#### 1.4.1 需求场景

我们的子服务一般不能通过外网直接访问，必须通过网关转发才是一个合法的请求，这种子服务与外网的隔离一般分为两种：

1. 物理隔离：子服务部署在指定的内网环境中，只有网关对外网开放
2. 逻辑隔离：子服务与网关同时暴露在外网，但是子服务会有一个权限拦截层保证只接受网关发送来的请求，绕过网关直接访问子服务会被提示：无效请求

这种鉴权需求牵扯到两个环节：**`网关转发鉴权`**、**`服务内部调用鉴权`**

Sa-Token提供两种解决方案：

1. 使用 OAuth2.0 模式的凭证式，将 Client-Token 用作各个服务的身份凭证进行权限校验
2. 使用 Same-Token 模块提供的身份校验能力，完成服务间的权限认证

#### 1.4.2 具体实现

1. 引入依赖

2. ##### 网关处添加Same-Token

   为网关添加全局过滤器：

   ```java
   /**
    * 全局过滤器，为请求添加 Same-Token 
    */
   @Component
   public class ForwardAuthFilter implements GlobalFilter {
       @Override
       public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
           ServerHttpRequest newRequest = exchange
                   .getRequest()
                   .mutate()
                   // 为请求追加 Same-Token 参数 
                   .header(SaSameUtil.SAME_TOKEN, SaSameUtil.getToken())
                   .build();
           ServerWebExchange newExchange = exchange.mutate().request(newRequest).build();
           return chain.filter(newExchange);
       }
   }
   
   ```

   此过滤器会为 Request 请求头追加 `Same-Token` 参数，这个参数会被转发到子服务

3. 在子服务里校验参数

在子服务添加过滤器校验参数

```java
/**
 * Sa-Token 权限认证 配置类 
 */
@Configuration
public class SaTokenConfigure implements WebMvcConfigurer {
    // 注册 Sa-Token 全局过滤器 
    @Bean
    public SaServletFilter getSaServletFilter() {
        return new SaServletFilter()
                .addInclude("/**")
                .addExclude("/favicon.ico")
                .setAuth(obj -> {
                    // 校验 Same-Token 身份凭证     —— 以下两句代码可简化为：SaSameUtil.checkCurrentRequestToken(); 
                    String token = SaHolder.getRequest().getHeader(SaSameUtil.SAME_TOKEN);
                    SaSameUtil.checkToken(token);
                })
                .setError(e -> {
                    return SaResult.error(e.getMessage());
                })
                ;
    }
}
```

4. Same-Token 模块详解

Same-Token —— 专门解决同源系统互相调用时的身份认证校验，它的作用不仅局限于微服务调用场景

基本使用流程为：服务调用方获取Token，提交到请求中，被调用方取出Token进行校验：Token一致则校验通过，否则拒绝服务

### 1.5 单点登录模块

凡是稍微上点规模的系统，统一认证中心都是绕不过去的槛。而单点登录——便是我们搭建统一认证中心的关键。

#### 1.5.1 什么是单点登录

**`在多个互相信任的系统中，用户只需登录一次，就可以访问所有系统。`**

#### 1.5.2 架构选型

Sa-Token-SSO 由简入难划分为三种模式，解决不同架构下的 SSO 接入问题：

| 系统架构                    | 采用模式 | 简介                 | 文档链接                                                     |
| --------------------------- | -------- | -------------------- | ------------------------------------------------------------ |
| 前端同域 + 后端同 Redis     | 模式一   | 共享 Cookie 同步会话 | [文档](https://sa-token.dev33.cn/doc.html#/sso/sso-type1)、[示例](https://gitee.com/dromara/sa-token/blob/master/sa-token-demo/sa-token-demo-sso1-client) |
| 前端不同域 + 后端同 Redis   | 模式二   | URL重定向传播会话    | [文档](https://sa-token.dev33.cn/doc.html#/sso/sso-type2)、[示例](https://gitee.com/dromara/sa-token/blob/master/sa-token-demo/sa-token-demo-sso2-client) |
| 前端不同域 + 后端不同 Redis | 模式三   | Http请求获取会话     | [文档](https://sa-token.dev33.cn/doc.html#/sso/sso-type3)、[示例](https://gitee.com/dromara/sa-token/blob/master/sa-token-demo/sa-token-demo-sso3-client) |

1. 前端同域：就是指多个系统可以部署在同一个主域名之下，比如：`c1.domain.com`、`c2.domain.com`、`c3.domain.com`。
2. 后端同Redis：就是指多个系统可以连接同一个Redis。PS：这里并不需要把所有项目的数据都放在同一个Redis中，Sa-Token提供了 **`[权限缓存与业务缓存分离]`** 的解决方案，详情戳： [Alone独立Redis插件](https://sa-token.dev33.cn/doc.html#/plugin/alone-redis)。
3. 如果既无法做到前端同域，也无法做到后端同Redis，那么只能走模式三，Http请求获取会话（Sa-Token对SSO提供了完整的封装，你只需要按照示例从文档上复制几段代码便可以轻松集成）。

#### 1.5.3 SSO模式二 URL重定向传播会话

如果我们的多个系统：部署在不同的域名之下，但是后端可以连接同一个Redis，那么便可以使用 **`[URL重定向传播会话]`** 的方式做到单点登录。

##### 1.5.3.1、解题思路

首先我们再次复习一下，多个系统之间为什么无法同步登录状态？

1. 前端的`Token`无法在多个系统下共享。
2. 后端的`Session`无法在多个系统间共享。

##### 1.5.3.2 具体流程

1. 用户在 子系统 点击 `[登录]` 按钮。

2. 用户跳转到子系统登录接口 /sso/login，并携带back参数记录初始页面URL。

   - 形如：`http://{sso-client}/sso/login?back=xxx`

3. 子系统检测到此用户尚未登录，再次将其重定向至SSO认证中心，并携带`redirect参数`记录子系统的登录页URL。

   - 形如：`http://{sso-server}/sso/auth?redirect=xxx?back=xxx`
   
4. 用户进入了 SSO认证中心 的登录页面，开始登录。

5. 用户 输入账号密码 并 登录成功，SSO认证中心再次将用户重定向至子系统的登录接口/sso/login，并携带ticket码参数。

   - 形如：`http://{sso-client}/sso/login?back=xxx&ticket=xxxxxxxxx`

6. 子系统根据 `ticket码` 从 `SSO-Redis` 中获取账号id，并在子系统登录此账号会话。

7. 子系统将用户再次重定向至最初始的 `back` 页面。

整个过程，除了第四步用户在SSO认证中心登录时会被打断，其余过程均是自动化的，当用户在另一个子系统再次点击`[登录]`按钮，由于此用户在SSO认证中心已有会话存在， 所以第四步也将自动化，也就是单点登录的最终目的 —— 一次登录，处处通行。

## 2. redis 存储的数据

### 2.1 根据token 取用户id

```
Authorization:login:token:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxIiwicm5TdHIiOiJxb3h4Q2o0UTdIdU1oZUc4SnY3WFA5dlJ2TFZmUDUwUSJ9.Zo9sjXHd5cnntaMuyGsiqr2CTJWa4kH1tGwXAriKJ5U
```

![image-20221123192547984](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221123192547984.png)

### 2.2 根据token 取用户信息

```
Authorization:login:token-session:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxIiwicm5TdHIiOiJxb3h4Q2o0UTdIdU1oZUc4SnY3WFA5dlJ2TFZmUDUwUSJ9.Zo9sjXHd5cnntaMuyGsiqr2CTJWa4kH1tGwXAriKJ5U
```

![image-20221123192803530](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221123192803530.png)

### 2.3 根据用户id、取token信息

```
Authorization:login:session:sys_user:1
```

![image-20221123192908298](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221123192908298.png)

### 2.4 最后登陆时间 last-activity

且设置了过期时间、决定token 什么时候过期

```
Authorization:login:last-activity:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxIiwicm5TdHIiOiJxb3h4Q2o0UTdIdU1oZUc4SnY3WFA5dlJ2TFZmUDUwUSJ9.Zo9sjXHd5cnntaMuyGsiqr2CTJWa4kH1tGwXAriKJ5U
```

![image-20221123192921116](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221123192921116.png)

## 参考文章

[sa-token官网](https://sa-token.dev33.cn/doc.html#/use/login-auth)

[sa-token使用（源码解析 + 万字）](https://blog.csdn.net/weixin_39570751/article/details/121291274)