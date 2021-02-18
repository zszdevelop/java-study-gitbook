# Spring IoC常见问题

## 1. 概述

Spring 框架的核心是Spring IoC 容器。容器创建 Bean 对象，将它们装配在一起，配置它们并管理它们的完整生命周期

- Spring 容器使用**依赖注入**来管理组成应用程序的 Bean 对象。
- 容器通过读取提供的**配置元数据** Bean Definition来接收对象进行实例化，配置和组装的指令
- 该配置元数据Bean Definition 可以**通过XML，Java 注解或Java Config代码提供**

## 2. 什么是依赖注入？

在依赖注入中，你不必主动，手动创建对象，但必须描述如何创建它们。

- 你不是直接在代码中将组件和服务连接在一起，而是描述配置文件中哪些组件需要哪些服务
- 然后，再由IoC容器将他们装配在一起

依赖注入的英文缩写是 Dependency Injection ，简称 DI 。

## 3. IoC 和 DI 有什么区别？

IoC 是个更宽泛的概念，DI 是更具体的。

## 4. 可以通过多少种方式完成依赖注入？

通常，依赖注入可以通过以下三种方式完成

- 接口注入
- 构造函数注入
- setter 注入

目前，在Spring Framework中，仅使用**构造函数和setter 注入**这两种方式

### 4.1 构造函数和setter 注入的优缺点

| 构造函数注入                 | setter注入                 |
| ---------------------------- | -------------------------- |
| 没有部分注入                 | 有部分注入                 |
| 不会覆盖setter 属性          | 会覆盖setter属性           |
| 任意修改都会创建一个新的实例 | 任意修改不会创建一个新实例 |
| 适用于设置很多属性           | 适用于设置少量属性         |

实际场景下，setter 注入使用的更多

## 5. Spring 中有多少种IoC 容器

Spring 提供了两种（不是”个“）IoC 容器，分别是BeanFactory、ApplicationContext

- BeanFactory

  >BeanFactory 在Spring-beans 项目提供

  BeanFactory，就像一个包含Bean 集合的工厂类。他会在客户端要求时实例化 Bean 对象。

- ApplicationContext

  >ApplicationContext 在 spring-context 项目提供

  ApplicationContext接口扩展了BeanFactory接口，他在BeanFactory基础上提供了一些额外的功能。内置如下功能：

  - MesssageSource：管理message，实现国际化等功能
  - ApplicationEventPublisher：事件发布。
  - ResourcePatternResolver：多资源加载
  - EnvironmentCapable：系统Environment（profile+Properties）相关
  - Lifecycle：管理生命周期
  - Closable：关闭，释放资源
  - initalizingBean：自定义初始化
  - BeanNameAware : 设置beanName的Aware接口

  另外，ApplicationContext 会自动初始化非懒加载的Bean 对象们

  ### 5.1 BeanFactory 与 ApplicationContext 的两种差异

  | BeanFactory                | ApplicationContext       |
  | -------------------------- | ----------------------|
  | 使用懒加载                 | 使用即时加载             |
  | 它使用语法显式提供资源对象 | 它自己创建和管理资源对象 |
  | 不支持国际化               | 支持国际化               |
  | 不支持基于依赖的注解       | 支持基于依赖的注解       |

  另外、BeanFactory 也被称为**低级**容器，而ApplicationContext 被称为**高级**容器

## 6. 请介绍下常用的BeanFactory 容器？

BeanFactory 最常用的是XmlBeanFactory，它可以根据XML文件中定义的内容，创建相应的Bean

## 7.请介绍下常用的 ApplicationContext 容器？

以下是三种较常见的ApplicationContext 实现方式

- ClassPathXmlApplicationContext：从ClassPath的XML 配置文件中读取上下文，并生成上下文定义。应用程序上下文从程序环境变量中取得

  ```java
  ApplicationContext context = new ClassPathXmlApplicationContext(“bean.xml”);
  ```

- FileSystemXmlApplicationContext: 由文件系统的XML配置文件读取上下文。

  ```java
  ApplicationContext context = new FileSytemXmlApplicationContext("bean.xml")
  ```

- XmlWebApplicationContext: 由Web 应用的XML文件读取上下文。例如我们在Spring MVC 使用情况

**ConfigServletWebServerApplicationContext**（Spring Boot）：

目前我们更多使用的是Spring Boot 为主，所以使用的是第四种ApplicationContext容器。ConfigServletWebServerApplicationContext。

## 8. 列举一些 IoC 的一些好处？

- 它将最小化应用程序中的代码
- 它以最小的影响和最少的侵入机制促进松耦合
- 它支持即时的实例化和延迟加载Bean对象
- 它将使您的应用程序易于测试，因为他不需要单元测试用例中的任何单例或JNDI查找机制

## 9. 简述Spring IoC 的实现机制？

简单来说，Spring 中的IoC的实现原理，就是**工厂模式**加**反射机制**

```java
interface Fruit {

     public abstract void eat();
     
}
class Apple implements Fruit {

    public void eat(){
        System.out.println("Apple");
    }
    
}
class Orange implements Fruit {
    public void eat(){
        System.out.println("Orange");
    }
}

class Factory {

    public static Fruit getInstance(String className) {
        Fruit f = null;
        try {
            f = (Fruit) Class.forName(className).newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return f;
    }
    
}

class Client {

    public static void main(String[] args) {
        Fruit f = Factory.getInstance("io.github.dunwu.spring.Apple");
        if(f != null){
            f.eat();
        }
    }
    
}
```

- Fruit接口，有Apple 和Orange两个实现类
- Factory工厂，通过反射机制，创建className 对应的Fruit 对象
- Client 通过Factory 工厂，获得对应的Fruit 对象
- 实际情况下，Spring IoC 比这个复杂很多很多，例如单例Bean 对象，Bean 的属性注入，相互依赖的Bean 的处理

## 10. Spring 框架中有哪些不同类型的事件？

Spring 的ApplicationContext 提供了支持事件和代码中监听器的功能。

我们可以创建 Bean 用来监听在 ApplicationContext 中发布的事件。如果一个 Bean 实现了 ApplicationListener 接口，当一个ApplicationEvent 被发布以后，Bean 会自动被通知。示例代码如下

```java
public class AllApplicationEventListener implements ApplicationListener<ApplicationEvent> {  
    
    @Override  
    public void onApplicationEvent(ApplicationEvent applicationEvent) {  
        // process event  
    }
    
}
```

**Spring 提供了以下五种标准的事件**

1. 上下文更新事件（ContextRefreshedEvent）：该事件会在ApplicationContext 被初始化或者更新时发布。也可以在调用ConfigurableApplicationContext 接口中的`#refresh（）`方法时被触发
2. 上下文开始事件（ContextStartedEvent）：当容器调用ConfigurableApplicationContext的`#start（）`方法开始/重新开始容器时触发该事件。
3. 上下文停止事件（ContextStoppedEvent）：当容器调用ConfigurableApplicationContext 的`#stop()`方法停止容器时触发该事件
4. 上下文关闭事件（ContextCloseEvent）：当ApplicationContext 被关闭时触发该事件。容器被关闭时，其管理的所有单例 Bean 都被销毁
5. 请求处理事件（RequestHandledEvent）：在Web应用中，当一个Http 请求（request）结束触发该事件

### 10.1 自定义扩展事件

除了以上事件，还可以通过扩展 ApplicationEvent 类来开发**自定义**的事件

1. 实例自定义的事件的类

   ```java
   public class CustomApplicationEvent extends ApplicationEvent{  
   
       public CustomApplicationEvent(Object source, final String msg) {  
           super(source);
       }  
   
   }
   ```

2. 为了监听这个事件，还需要创建一个监听器

   ```java
   public class CustomEventListener implements ApplicationListener<CustomApplicationEvent> {
   
       @Override  
       public void onApplicationEvent(CustomApplicationEvent applicationEvent) {  
           // handle event  
       }
       
   }
   ```

3. 之后通过ApplicationContext 接口的`#publishEvent(Object event)`方法，来发布自定义事件

   ```
   // 创建 CustomApplicationEvent 事件
   CustomApplicationEvent customEvent = new CustomApplicationEvent(applicationContext, "Test message");
   // 发布事件
   applicationContext.publishEvent(customEvent);
   ```

   

