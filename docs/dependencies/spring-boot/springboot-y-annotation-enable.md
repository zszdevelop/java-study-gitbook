# @EnableConfigurationProperties注解

## 1. 作用

**@EnableConfigurationProperties 注解的作用是:让使用了 @ConfigurationProperties 注解的类生效,并且将该类注入到 IOC 容器中,交由 IOC 容器进行管理**

>@ConfigurationProperties是在第三方包中，那么@component是不能注入到容器的。只有@EnableConfigurationProperties才可以注入到容器

## 2. 如何使@ConfigurationProperties生效

### 2.1 方式1：**使用 @ConfigurationProperties + @Component 注解**

如果一个类只配置了 @ConfigurationProperties 注解，而没有使用 @Component  注解将该类加入到 IOC 容器中，那么它就不能完成 xxx.properties 配置文件和 Java Bean 的数据绑定

1. application.properties

   ```properties
   mytest.name=zszdevelop
   mytest.age=27
   ```

2. MyConfigurationProperties 这个实体类中必须要加上 @Component ,使这个类注入到 IOC容器中,否则就无法从容器中获取到这个类的对象实例

   ```java
   @Component
   @ConfigurationProperties(prefix = "mytest")
   public class MyConfigurationProperties {
   
       // 省略 get、set、toString 方法
   
       private String name;
   
       private Integer age;
   
       private String gender;
   
   }
   ```
   
3. HelloController

   ```java
   @RestController
   public class HelloController {
   
       @Autowired
   
       private MyConfigurationProperties config;
   
       @GetMapping("/config")
   
       private String testConfigurationProperties(){
   
           System.out.println(config);
   
           return "SUCCESS!!!";
   
       }
   
   }
   ```
   
4. 测试结果

   ```
   MyConfigurationProperties{name='zszdevelop', age=27, gender='null'}
   ```

### 2.2 方式2：**使用 @EnableConfigurationProperties 注解**

1. 添加一个 HelloService 类

   ```java
   // 注入到 IOC 容器中,交由 Spring 进行管理
   
   @Service
   // 该注解的作用是使 MyConfigurationProperties 这个类上标注的 @ConfigurationProperties 注解生效,并且会自动将这个类注入到 IOC 容器中
   @EnableConfigurationProperties(MyConfigurationProperties.class)
   public class HelloServiceImpl implements HelloService {
   
   }
   ```

2. MyConfigurationProperties 有了 @EnableConfigurationProperties 注解之后该实体类就不需要加上 @Component 注解了

   ```java
   @ConfigurationProperties(prefix = "mytest")
   public class MyConfigurationProperties {
   
       // 省略 get、set、toString 方法
   
       private String name;
   
       private Integer age;
   
       private String gender;
   
   }
   ```
   
3. HelloController.java

   ```java
   @RestController
   public class HelloController {
   
       @Autowired
   
       private MyConfigurationProperties config;
   
       @GetMapping("/config")
   
       private String testConfigurationProperties(){
   
           System.out.println(config);
   
           return "SUCCESS!!!";
   
       }
   
   }
   ```
   
4. 测试结果

   ```
   MyConfigurationProperties{name='xiaomaomao', age=27, gender='null'}
   ```

   

## 3. **结论**　

- 如果要使 xxx.properties 配置文件与 Java Bean 动态绑定,那么就必须将这个 Java Bean 加入到容器中,并且需要在该类上使用 @ConfigurationProperties 注解

- @EnableConfigurationProperties(A.class)的作用就是如果 A 这个类上使用了 @ConfigurationProperties 注解,那么 A 这个类会与 xxx.properties 进行动态绑定,并且会将 A 这个类加入 IOC 容器中,并交由 IOC 容器进行管理

- 如果@ConfigurationProperties是在第三方包中，那么@component是不能注入到容器的。只有@EnableConfigurationProperties才可以注入到容器

## 参考文章

[@EnableConfigurationProperties 注解](https://blog.csdn.net/Cloud_July/article/details/122720164)

[关与 @EnableConfigurationProperties 注解](https://www.jianshu.com/p/7f54da1cb2eb)