# @Conditional注解根据条件注入Bean到容器

## 1. 简介

`@Conditional`是Spring4新提供的注解，它的作用是按照一定条件进行判断，满足条件就将bean注册到容器。

### 1.1 @Conditional源码

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Conditional {

	/**
	 * All {@link Condition Conditions} that must {@linkplain Condition#matches match}
	 * in order for the component to be registered.
	 */
	Class<? extends Condition>[] value();

}
```

从代码中可以看到，需要传入一个class数组，并且继承`Condition`接口：

```java
@FunctionalInterface
public interface Condition {

	boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata);

}
```

**`Condition`是个接口，需要实现matches方法，返回true则注入bean，false则不注入。**

## 2. 为什么使用@Condition

我们想实现，根据不同操作系统，加载不同的实例

### 2.1 不使用`@Conditional`注解的情况

#### 2.1.1 `System`

```java
public class System {

    private String name;

    public System(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "System{" +
                "name='" + name + '\'' +
                '}';
    }

}
```

#### 2.1.2 `BeanConfig`

创建`BeanConfig`类，用于配置2个System实例，并注入Windows、Linux。

```java
@Configuration
public class BeanConfig {

    @Bean(name = "windows")
    public System system1() {
        return new System("Windows");
    }

    @Bean(name = "linux")
    public System system2() {
        return new System("Linux");
    }
}
```

#### 2.1.3 `ConditionalTest`

接着写一个测试类，验证两个Bean是否注入成功。

```java
public class ConditionalTest {
    AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(BeanConfig.class);

    @Test
    public void test1() {
        Map<String, System> beans = applicationContext.getBeansOfType(System.class);
        java.lang.System.out.println(beans);
    }

}

```

运行，输出结果：两个Bean实例都被注入进容器。

![image-20220510105819119](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220510105819119.png)

现在问题来了，如果我想根据当前操作系统来注入`System`实例，window下注入Windows实例，Linux下注入Linux实例，怎么实现呢？

这就需要用到`@Conditional`注解了，前言中提到，需要实现`Condition`接口，并重写方法来自定义match规则

### 2.2 `@Conditional`作用在方法上

#### 2.2.1 `WindowsCondition`

首先，创建一个`WindowsCondition`类：

```java
public class WindowsCondition implements Condition {
    @Override
    public boolean matches(ConditionContext conditionContext, AnnotatedTypeMetadata annotatedTypeMetadata) {
        //获得当前系统名
        String property = conditionContext.getEnvironment().getProperty("os.name");
        //包含Windows则说明是windows系统，返回true
        return property != null && property.contains("Windows");
    }
}
```

#### 2.2.2 `LinuxCondition`

接着，创建`LinuxCondition`类：

```java
public class LinuxCondition implements Condition {
    @Override
    public boolean matches(ConditionContext conditionContext, AnnotatedTypeMetadata annotatedTypeMetadata) {
        String property = conditionContext.getEnvironment().getProperty("os.name");
        return property != null && property.contains("Linux");
    }
}
```

#### 2.2.3 修改`BeanConfig`

```java
@Configuration
public class BeanConfig {

    @Conditional(WindowsCondition.class)
    @Bean(name = "windows")
    public System system1() {
        return new System("Windows");
    }

    @Conditional(LinuxCondition.class)
    @Bean(name = "linux")
    public System system2() {
        return new System("Linux");
    }
}
```

#### 2.2.4 `ConditionalTest`

修改测试方法，使其可以打印当前系统名：

```JAVA
public class ConditionalTest {
    AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(BeanConfig.class);

    @Test
    public void test1() {
        String osName = applicationContext.getEnvironment().getProperty("os.name");
        java.lang.System.out.println(osName);
        Map<String, System> beans = applicationContext.getBeansOfType(System.class);
        java.lang.System.out.println(beans);
    }

}
```



![image-20220510110444045](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220510110444045.png)

**一个方法只能注入一个bean实例，所以@Conditional标注在方法上只能控制一个bean实例是否注入。**

### 2.3 `@Conditional`作用在类上

**一个类中可以注入很多实例，@Conditional标注在类上就决定了一批bean是否注入。**

#### 2.3.1 修改BeanConfig类：

```JAVA
@Configuration
@Conditional(WindowsCondition.class)
public class BeanConfig {

    @Bean(name = "windows")
    public System system1() {
        return new System("Windows");
    }

    @Bean(name = "linux")
    public System system2() {
        return new System("Linux");
    }
}
```

测试结果：

![image-20220510110852635](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220510110852635.png)

结果表明，当condition条件成立，`BeanConfig`类中存在`@Bean`注解的实例都注入到容器。

### 2.4 多个条件

前言中说，@Conditional注解传入的是一个Class数组，存在多种条件类的情况。

#### 2.4.1`TestCondition`

新增新的测试条件类

```java
public class TestCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        return false;
    }
}
```

#### 2.4.2 `BeanConfig`修改一下：

```java
@Configuration
@Conditional({WindowsCondition.class, TestCondition.class})
public class BeanConfig {

    @Bean(name = "windows")
    @Conditional({WindowsCondition.class})
    public System system1() {
        return new System("Windows");
    }

    @Bean(name = "linux")
    public System system2() {
        return new System("Linux");
    }
}
```

#### 2.4.3 结果：

![image-20220510111135640](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220510111135640.png)

结论：

当存在多个条件时，所有`Condition`实现类`match`方法均返回true，才会将`Bean`注入到容器。

## 3. springboot对`@Conditional`的扩展

### 

- @Conditional是springboot实现自动配置的关键基础能力。在此基础上，springboot又创建了多个适用于不同场景的组合条件注解。
- @ConditionalOnBean：当上下文中有指定Bean的条件下进行实例化。
- @ConditionalOnMissingBean：当上下文没有指定Bean的条件下进行实例化。
- @ConditionalOnClass：当classpath类路径下有指定类的条件下进行实例化。
- @ConditionalOnMissingClass：当类路径下没有指定类的条件下进行实例化。
- @ConditionalOnWebApplication：当项目本身是一个Web项目时进行实例化。
- @ConditionalOnNotWebApplication：当项目本身不是一个Web项目时进行实例化。
- @ConditionalOnProperty：当指定的属性有指定的值时进行实例化。
- @ConditionalOnExpression：基于SpEL表达式的条件判断。
- @ConditionalOnJava：当JVM版本为指定的版本范围时进行实例化。
- @ConditionalOnResource：当类路径下有指定的资源时进行实例化。
- @ConditionalOnJndi：在JNDI存在时触发实例化。
- @ConditionalOnSingleCandidate：当指定的Bean在容器中只有一个，或者有多个但是指定了首选的Bean时触发实例化。

## 参考文章

[详解Spring @Conditional 注解](https://juejin.cn/post/6844904200401321997)