# Spring 装配Bean的3种方式

## 1. 简介

在Spring 中，依赖注入是Spring 最重要的特性之一，我们所使用的Bean 都是通过依赖注入完成的，如今的Spring中，提供了3种装配Bean的方式

1. 在XML中显示装配
2. 在Java中显示配置
3. 隐式的neam发现机制和自动装配

## 2. 装配方式

```java
public interface Login {
    void login();
}
@Component
public class UserLogin implements Login {
    public void login() {
        System.out.println("login success!");
    }
}
```

### 2.1 在XML中显示装配

```xml
//XML方式配置
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context" xsi:schemaLocation="
http://www.springframework.org/schema/beans 
http://www.springframework.org/schema/beans/spring-beans.xsd 
http://www.springframework.org/schema/context 
http://www.springframework.org/schema/context/spring-context.xsd">
    <!-- 自动扫描包(自动注入) -->
    <context:component-scan base-package="com.ls.springModel" />
</beans>

//XML方式装配bean
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context" xsi:schemaLocation="
http://www.springframework.org/schema/beans 
http://www.springframework.org/schema/beans/spring-beans.xsd 
http://www.springframework.org/schema/context 
http://www.springframework.org/schema/context/spring-context.xsd">
class="com.ls.springModel.UserLogin"/>
    <bean id="loginController" class="com.ls.springModel.Logintroller">
        <constructor-arg ref="login"></constructor-arg> <!--构造注入 对应构造函数 -->
        <property name="login" ref="login"></property><!--属性注入 对应setter方法  -->
    </bean>
</beans>
```

### 2.2 在Java中显示配置

```java
//Java显示配置
@Configuration
@ComponentScan
(basePackages{"com.ls.loginModel"})
//扫描bean所在的包，可以配置多个包参数
public class LoginConfig {//Java方式配置类
    @Bean
    public Login userLogin() {
        return new UserLogin();
    }
    @Bean
    public LoginController loginController(Login login) {
        LoginController controller = new LoginController();
        controller.setLogin(login);
        return controller;
    }
}

```

### 2.3 隐式的neam发现机制和自动装配

```java
//隐式的Bean发现机制和自动注解
@Component
public class LoginController {
  
    @Autowired //在属性上添加注解
    @Resource //在属性上添加注解
    private Login login;
    public Login getLogin() {
        return login;
    }
    /**
     * 常用的注解有两种:@Autowired,@Resource
     * @autowired 是通过类的类型装配Bean
     * @Resource 是通过类的名称装配bean,名称默认为字段名称或setter方法
     */
    @Autowired  //按照类型装配,可以在构造方法中添加改注解
    @Resource("userLogin") //注入名称为"userLogin"的Bean
    public LoginController(Login login) {
        this.login = login;
    }
    @Autowired  //在setter方法上添加改注解
    @Resource("userLogin") //注入名称为"userLogin"的Bean
    public void setLogin(Login login) {
        this.login = login;
    }
    public void login() {
        login.login();
    }
}
```

- @autowired 是通过类的类型装配Bean     
-  @Resource 是通过类的名称装配bean,名称默认为字段名称或setter方法