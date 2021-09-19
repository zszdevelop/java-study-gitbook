# SpringSecurity支持多种登录方式

## 1. 背景

SpringSecurity 我们项目一般是只支持账号密码登录，但我们实际业务可能存在需要多种登录方式共存的情况。如

- 同时支持微信登录
- 同时支持短讯验证码登录
- 同时支持第三方授权登录

## 2. 代码实现

### 2.1 自定义token

```java

/**
 * 短信认证的token
 */
public class SmsAuthenticationToken extends UsernamePasswordAuthenticationToken {

    private static final long serialVersionUID = -6231962326068951783L;


    public SmsAuthenticationToken(Object principal) {
        super(principal, "");
    }

}

```

### 2.2 自定义 AuthenticationProvider

```java
package com.fardu.framework.security.provider;

import com.fardu.common.core.domain.entity.SysUser;
import com.fardu.common.core.domain.model.LoginUser;
import com.fardu.common.exception.CustomException;
import com.fardu.framework.entity.SmsLoginInfo;
import com.fardu.framework.security.token.SmsAuthenticationToken;
import com.fardu.framework.web.service.SysPermissionService;
import com.fardu.system.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

/**
 * 短信验证码认证AuthenticationProvider
 */
public class SmsAuthenticationProvider extends DaoAuthenticationProvider {


    @Autowired
    ISysUserService sysUserService;

    @Autowired
    SysPermissionService permissionService;

    public SmsAuthenticationProvider(UserDetailsService userDetailsService) {
        super();
        setUserDetailsService(userDetailsService);
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        if (authentication.isAuthenticated()) {
            return authentication;
        }
        //获取过滤器封装的token信息
        SmsAuthenticationToken authenticationToken = (SmsAuthenticationToken) authentication;
        SmsLoginInfo zcLoginInfo = (SmsLoginInfo) authenticationToken.getPrincipal();
        SysUser user;

        // TODO 验证短信验证码是否正确


        SysUser queryUser = new SysUser();
        queryUser.setPhonenumber(zcLoginInfo.getPhone());
        List<SysUser> userList = sysUserService.selectUserList(queryUser);

        if (userList != null) {
            if (userList.size() == 1) {
                user = userList.get(0);
            } else {
                throw new CustomException("存在多个手机号数据，请联系管理员");
            }
        } else {
            throw new CustomException("请先注册账户");
        }


        UserDetails loginUser = createLoginUser(user);
        SmsAuthenticationToken authenticationResult = new SmsAuthenticationToken(loginUser);

        return authenticationResult;
    }


    @Override
    public boolean supports(Class<?> authentication) {
        return SmsAuthenticationToken.class.isAssignableFrom(authentication);
    }


    public UserDetails createLoginUser(SysUser user) {
        return new LoginUser(user, permissionService.getMenuPermission(user));
    }
}

```

### 2.3 短信验证码登录实体类SmsLoginInfo

```java

@Data
public class SmsLoginInfo {

    String phone;
    String code;
}

```

### 2.4 SecurityConfig 添加认证方式

void configure(AuthenticationManagerBuilder auth) 方法上新增认证方式

```java
 /**
     * 身份认证接口
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        //用户名和密码登陆
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
        
        // 短信验证码登录方式(新增)
        auth.authenticationProvider(smsAuthenticationProvider(userDetailsService));
    }
    
    
    @Bean
    public SmsAuthenticationProvider smsAuthenticationProvider(UserDetailsService userDetailsService) {
        return new SmsAuthenticationProvider(userDetailsService);
    }
```

## 3. 登录请求

### 3.1 登录接口

```

    @GetMapping("smsLogin")
    @ApiOperation("短信验证码登录")
    public AjaxResult smsLogin(SmsLoginInfo smsLoginInfo) {

        AjaxResult ajax = AjaxResult.success();
        // 生成令牌
        String token = loginService.loginBySms(smsLoginInfo);
        ajax.put(Constants.TOKEN, token);
        return ajax;
    }
```

### 3.2 登录方法

```java
  /**
     * 短信验证码登录验证
     */
    public String loginBySms(SmsLoginInfo smsLoginInfo) {

        // 用户验证
        Authentication authentication = null;
        try {
            // 该方法会去调用UserDetailsServiceImpl.loadUserByUsername
            authentication = authenticationManager
                    .authenticate(new SmsAuthenticationToken(smsLoginInfo));
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException(e.getMessage());
        }
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        // 生成token
        return tokenService.createToken(loginUser);
    }
```

### 3.3 登录测试

![image-20210916160725393](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210916160725393.png)

## 参考文章

[Springboot + Spring Security多种登录方式：账号用户名登录+微信网页授权登录](https://blog.csdn.net/xue317378914/article/details/115250414)

[若依开源框架登录扩展Springboot+security，密码、验证码多种登录](https://blog.csdn.net/github_39698303/article/details/107941213)