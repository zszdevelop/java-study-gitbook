# 自定义SpringBoot Starter实现自动化配置

自动化配置需满足两个条件

1. 能够生成Bean，并注册到Bean容器中
2. 能够自动配置项目所需要的配置

## 1. 自定义步骤

### 1.1  引入SpringBoot 自动化配置依赖：

引入 SpringBoot 自动化配置依赖：

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-autoconfigure</artifactId>
    <version>1.5.9.RELEASE</version>
  </dependency>
</dependencies>
```

### 1.2 创建 Service

spring-boot-starter-helloworld 只是作为例子演示自定义 starter 的过程，实现的功能很简单就是创建一个 HelloworldService 的，并配置 sayHello() 方法打印的语句。

```java
public class HelloworldService {

  private String words;

  private String getWords() {
    return words;
  }

  public void setWords(String words) {
    this.words = words;
  }

  public String sayHello() {
     return "hello, " + words;
  }
}
```

### 1.3 创建属性类

创建属性类，prefix = “helloworld”代表该项目在属性文件中配置的前缀，即可以在属性文件中通过 helloworld.words=springboot，就可以改变属性类字段 words 的值了。

```java
@ConfigurationProperties(prefix = "helloworld")
public class HelloworldProperties {
  public static final String DEFAULT_WORDS = "world";

  private String words = DEFAULT_WORDS;

  public String getWords() {
    return words;
  }

  public void setWords(String words) {
    this.words = words;
  }
}
```

### 1.4 创建自动配置类

创建自动化配置类，这个相当于就是一个普通的 Java 配置类，可以在这里创建 Bean，并可获得与 application.properties 属性文件相对应的属性类的 Bean。

```java
// 相当于一个普通的 java 配置类
@Configuration
// 当 HelloworldService 在类路径的条件下
@ConditionalOnClass({HelloworldService.class})
// 将 application.properties 的相关的属性字段与该类一一对应，并生成 Bean
@EnableConfigurationProperties(HelloworldProperties.class)
public class HelloworldAutoConfiguration {

  // 注入属性类
  @Autowired
  private HelloworldProperties hellowordProperties;

  @Bean
  // 当容器没有这个 Bean 的时候才创建这个 Bean
  @ConditionalOnMissingBean(HelloworldService.class)
  public HelloworldService helloworldService() {
    HelloworldService helloworldService = new HelloworldService();
    helloworldService.setWords(hellowordProperties.getWords());
    return helloworldService;
  }
}
```

### 1.5 META-INF 目录下创建 spring.factories

在 META-INF 目录下创建 spring.factories，这个属性文件可重要啦，因为 SpringBoot 自动化配置最终就是要扫描 META-INF/spring.factories 来加载项目的自动化配置类。

```java
# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=com.objcoding.starters.helloworld.HelloworldAutoConfiguration
```

## 2. 引用Starter

为了引入 starter，我在这里再创建一个 spring-boot-starter-helloworld-sample 项目。

添加 spring-boot-starter-helloworld 起步依赖：

```pom
<dependency>
  <groupId>com.objcoding</groupId>
  <artifactId>spring-boot-starter-helloworld</artifactId>
  <version>1.0-SNAPSHOT</version>
</dependency>
```

在 application.properties 中添加属性：

```
helloworld.words=springboot
```

在 SpringBoot 主程序中 注入 helloworldService

```java
@RestController
@SpringBootApplication
public class HelloworldApplication {

  @Autowired
  private HelloworldService helloworldService;

  @RequestMapping("/")
  public String sayHello() {
    return helloworldService.sayHello();
  }

  public static void main(String[] args) {
    SpringApplication.run(HelloworldApplication.class, args);
  }
}
```

访问 http://localhost:8080/，打印以下结果：

![image-20200321000541904](./img/image-20200321000541904.png)

## 面试真题

你自己有定义过一些（Springboot）自动化配置吗？

>我之前做过xxx使用到了，他的创建步骤
>
>1. 使用 @ConfigurationProperties 创建属性类
>2. 主要通过@Configuration 和 @Bean 实现 Java显示配置，并注入属性
>3. 创建 META-INF/spring.factories 文件，添加这个允许自动配置的类

## 参考文章

[实战|如何自定义SpringBoot Starter？](https://objcoding.com/2018/02/02/Costom-SpringBoot-Starter/)