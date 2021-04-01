## SpringSecurity核心组件

spring security核心组件有：SecurityContext、SecurityContextHolder、Authentication、Userdetails 和 AuthenticationManager

## 1. SecurityContext

安全上下文，用户通过Spring Security 的校验之后，验证信息存储在SecurityContext中，SecurityContext的接口定义如下：

```java
public interface SecurityContext extends Serializable {
	/**
	 * Obtains the currently authenticated principal, or an authentication request token.
	 *
	 * @return the <code>Authentication</code> or <code>null</code> if no authentication
	 * information is available
	 */
	Authentication getAuthentication();
 
	/**
	 * Changes the currently authenticated principal, or removes the authentication
	 * information.
	 *
	 * @param authentication the new <code>Authentication</code> token, or
	 * <code>null</code> if no further authentication information should be stored
	 */
	void setAuthentication(Authentication authentication);
}

```

可以看到`SecurityContext`接口只定义了两个方法，实际上其主要作用就是获取`Authentication`对象。

## 2. SecurityContextHolder

SecurityContextHolder看名知义，是一个holder,用来hold住SecurityContext实例的。在典型的web应用程序中，用户登录一次，然后由其会话ID标识。服务器缓存持续时间会话的主体信息。在Spring Security中，在请求之间存储`SecurityContext`的责任落在`SecurityContextPersistenceFilter`上，默认情况下，该上下文将上下文存储为HTTP请求之间的`HttpSession`属性。它会为每个请求恢复上下文`SecurityContextHolder`，并且最重要的是，在请求完成时清除`SecurityContextHolder`。SecurityContextHolder是一个类，他的功能方法都是静态的（static）。

SecurityContextHolder可以设置指定JVM策略（SecurityContext的存储策略），这个策略有三种：

- MODE_THREADLOCAL：SecurityContext 存储在线程中。
- MODE_INHERITABLETHREADLOCAL：SecurityContext 存储在线程中，但子线程可以获取到父线程中的 SecurityContext。
- MODE_GLOBAL：SecurityContext 在所有线程中都相同。

SecurityContextHolder默认使用MODE_THREADLOCAL模式，即存储在当前线程中。在spring security应用中，我们通常能看到类似如下的代码：

```java
 SecurityContextHolder.getContext().setAuthentication(token);
```

**其作用就是存储当前认证信息。**

## 3. Authentication

authentication 直译过来是“认证”的意思，在Spring Security 中Authentication用来表示当前用户是谁，一般来讲你可以理解为authentication就是一组用户名密码信息。Authentication也是一个接口，其定义如下：

```java
public interface Authentication extends Principal, Serializable {
 
	Collection<? extends GrantedAuthority> getAuthorities();
	Object getCredentials();
	Object getDetails();
	Object getPrincipal();
	boolean isAuthenticated();
	void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException;
}
```

接口有4个get方法，分别获取

- `Authorities`, 填充的是用户角色信息。
- `Credentials`，直译，证书。填充的是密码。
- `Details` ，用户信息。
- ,`Principal` 直译，形容词是“主要的，最重要的”，名词是“负责人，资本，本金”。感觉很别扭，所以，还是不翻译了，直接用原词principal来表示这个概念，其填充的是用户名。

因此可以推断其实现类有这4个属性。这几个方法作用如下：

- `getAuthorities`: 获取用户权限，一般情况下获取到的是用户的角色信息。
- `getCredentials`: 获取证明用户认证的信息，通常情况下获取到的是密码等信息。
- `getDetails`: 获取用户的额外信息，（这部分信息可以是我们的用户表中的信息）
- `getPrincipal`: 获取用户身份信息，在未认证的情况下获取到的是用户名，在已认证的情况下获取到的是 UserDetails (UserDetails也是一个接口，里边的方法有getUsername,getPassword等)。
- `isAuthenticated`: 获取当前 Authentication 是否已认证。
- `setAuthenticated`: 设置当前 Authentication 是否已认证（true or false）。

## 4. UserDetails

UserDetails，看命知义，是用户信息的意思。其存储的就是用户信息，其定义如下：

```java
public interface UserDetails extends Serializable {
 
	Collection<? extends GrantedAuthority> getAuthorities();
	String getPassword();
	String getUsername();
	boolean isAccountNonExpired();
	boolean isAccountNonLocked();
	boolean isCredentialsNonExpired();
	boolean isEnabled();
}
```

方法含义如下：

- `getAuthorites`：获取用户权限，本质上是用户的角色信息。
- `getPassword`: 获取密码。
- `getUserName`: 获取用户名。
- `isAccountNonExpired`: 账户是否过期。
- `isAccountNonLocked`: 账户是否被锁定。
- `isCredentialsNonExpired`: 密码是否过期。
- `isEnabled`: 账户是否可用。

## 5. UserDetailsService

提到了`UserDetails`就必须得提到`UserDetailsService`, UserDetailsService也是一个接口，且只有一个方法`loadUserByUsername`，他可以用来获取UserDetails。

通常在spring security应用中，我们会自定义一个CustomUserDetailsService来实现UserDetailsService接口，并实现其`public UserDetails loadUserByUsername(final String login);`方法。我们在**实现`loadUserByUsername`方法的时候，就可以通过查询数据库（或者是缓存、或者是其他的存储形式）来获取用户信息，然后组装成一个`UserDetails`,(通常是一个`org.springframework.security.core.userdetails.User`，它继承自UserDetails) 并返回。**

在实现`loadUserByUsername`方法的时候，如果我们通过查库没有查到相关记录，需要抛出一个异常来告诉spring security来“善后”。这个异常是`org.springframework.security.core.userdetails.UsernameNotFoundException`。

## 6. AuthenticationManager

AuthenticationManager 是一个接口，它只有一个方法，接收参数为`Authentication`，其定义如下：

```java
public interface AuthenticationManager {
    Authentication authenticate(Authentication authentication)
			throws AuthenticationException;
}
```

AuthenticationManager 的作用就是校验`Authentication`,如果验证失败会抛出`AuthenticationException`异常。`AuthenticationException`是一个抽象类，因此代码逻辑并不能实例化一个AuthenticationException异常并抛出，实际上抛出的异常通常是其实现类，如`DisabledException`,`LockedException`,`BadCredentialsException`等。`BadCredentialsException`可能会比较常见，即密码错误的时候。

## 参考文章

[Spring Security 入门原理及实战](https://www.cnblogs.com/demingblog/p/10874753.html)