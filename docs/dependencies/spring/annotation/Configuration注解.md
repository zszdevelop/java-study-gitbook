# @Configuration注解

## 1. 简介

@Conﬁguration注释类，**表明类其主要目的是作为bean定义的源**；

一个类声明一个或多个 @Bean方法，并且可以由Spring容器进行处理，以在运行时为这些bean生成bean定义和服务请求，例如：

```java
@Configuration
public class AppConfig {

    @Bean
    public MyBean myBean() {
        // instantiate, configure and return bean ...
    }
}
```

## 2. @Configuration 内部实现

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Configuration {
   String value() default "";
}
```

可以看到这个 `@Component` 注解, 意味也将会注册为bean, 其内部也可以依赖注入。 (换个方式说,一般Bean能用的东西,它也能用) 例如: @Autowired、@Inject、@Scope等

## 参考文章

[Spring @Configuration 注解介绍](https://www.jianshu.com/p/721c76c1529c)

