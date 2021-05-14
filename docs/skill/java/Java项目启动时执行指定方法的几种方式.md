# Java项目启动时执行指定方法的几种方式

## 1.使用 @PostConstruct,作用于方法上面。

```java
@Component
public class PostConstruct {

    @PostConstruct
    public void test() {
        System.out.println("PostConstruct:开始运行...");
    }
}
```

## 2.使用 ApplicationRunner。

```java
@Component
public class Start implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        System.out.println("CommandLineRunner:开始运行...");
    }
}
```

## 3.使用 CommandLineRunner 接口

```java
@Component
public class Start1 implements ApplicationRunner {
    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("ApplicationRunner:开始运行...");
    }
}
```

## 4. 总结

以上三种方式都是在项目启动的时候加载指定的方法，第一种使用的是 注解的方式，第二种、第三种使用的是实现接口的方式。

它们的执行顺序为 `@PostConstruct`--->`ApplicationRunner`--->`CommandLineRunner`

## 参考文章

[Java项目启动时执行指定方法的几种方式](https://www.cnblogs.com/mmzs/p/14567264.html)