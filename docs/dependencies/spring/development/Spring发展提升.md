# Spring发展提升

## 1. Spring1.x时代

### 1.功能

1.0 时代的Spring 把所有的功能都几种在一个项目中，包含了核心IoC、AOP 也包含了其他一些比如JDBC、Mail、ORM、事务、定时任务、Spring MVC等功能

### 2. 优点

1. 支持基于XML的配置
2. 支持依赖注入与声明式事务

### 3. 缺点

只支持基于XML的配置,而且通过xml文件来配置bean,当项目不断扩大的时候,需要将xml配置信息分放到不同的配置文件中,因此需要频繁的在java类和xml配置文件中切换.

## 2. Spring2.x时代

### 2.1 特点

同时支持注解与xml. 应用程序的基本配置用xml,比如数据源、资源文件等;业务代码的开发用注解,比如Service中注入bean等.

### 2.2 优点

随着JDK1.5开始支持注解，Spring 2.x也增加了对注解的支持。因此可以使用注解对Bean进行声明和注入,大大的减少了xml配置文件,同时也大大简化了项目的开发.

## 3. Spring3.x 时代

### 3.1 特点

从Spring3.x 开始提供了基于Java类的配置方式，如@Configuration和@Bean的出现,.@Configuration 作用于类上,相当于一个xml配置文件;@Bean 作用于方法上,相当于xml配置中的.至此注解慢慢的取代了xml配置.

### 3.2 优点

使用Java类的配置方式可以更好的理解你配置的Bean.现在一般都推荐使用Java类的配置的方式.

## 4. Spring4.x 时代

### 4.1 特点

Spring 4.x全面支持JDK8.0；
支持Lambda表达式；支持@Scheduled和@PropertySource重复注解；
提供了空指针终结者Optional；
对核心容器进行增加；
支持泛型的依赖注入、Map的依赖注入、Lazy延迟依赖的注入、List注入、Condition条件注解注入、对CGLib动态代理类进行了增强；
支持了基于Groovy DSL的配置,提高Bean配置的灵活性.

Spring 4.x开始，Spring MVC基于Servlet 3.0 开发,并且为了方便Restful开发,引入了新的RestController注解器注解,同时还增加了一个AsyncRestTemplate支持Rest客户端的异步无阻塞请求.

一张图概括:

![image-20200320221512611](./img/image-20200320221512611.png)

## 5. Spring5.x时代

### 5.1 新特性

![image-20200320221608325](./img/image-20200320221608325.png)

## 面试真题

Spring 一直发展，发展到4.几的时候，你觉得他的提升提升在哪？

>Spring 旨在提供开发效率，简化开发
>
>1. 在1.X 时代，提供核心的IoC和AOP 功能，基于xml配置
>2. 在2.x时代，支持注解，可以使用注解进行声明和注入，减少xml配置文件，简化项目开发
>3. 在3.0时代，提供java类的配置方式，如@Configuration和@Bean。java类的方式更好理解你配置的bean
>4. 在4.0时代，支持java8、增强性能
>5. 在5.0时代，最低支持java8，支持响应式编程，提升测试性能

## 参考文章

[SpringBoot系列教程02--史前文明之Spring发展史](https://zhuanlan.zhihu.com/p/112395904)