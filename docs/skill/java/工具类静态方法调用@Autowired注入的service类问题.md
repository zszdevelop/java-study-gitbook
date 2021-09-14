# 工具类静态方法调用@Autowired注入的service类问题

## 1. 背景

我们工具类中的方法，经常还需要额外依赖其他类。

- 如果不设置成静态方法，那么每次还需要引入。
- 设置静态方法，但是内部的依赖又有问题

## 2. 解决

```java

// 此处注解不能省却（0）
@Component
public class MyUtils {


    private static MyUtils myUtils;


    /**
     * 此处是要使用的service需要spring注入（1）
     */
    @Autowired
    private MyService myService;


    /**
     * 注意此处注解（2）
     */
    @PostConstruct
    public void init() {
        myUtils = this;
        myUtils.myService = this.myService;
    }

    /**
     * 主要使用场景（3）
     */
    public static void insertParam(int id) {

        /**
         * 注意此处的调用方法（4）
         */
        if (myService.myService.deleteNotifyTime(id)) {
        }
    }
}


```

- （0）处作用是将（2）myUtils = this;this进行赋值（注：如果无注解myUtils 将null）

- （1）处为spring自动注入，使用spring框架的很常用，但是如果在静态方法中调用此注入类的方法，发现注入为'null'；原因不是spring未注入，而是被static方法给'清空'了，在无法先于static方法初始化之前想了一个办法

- （2）通过@PostConstruct修饰的的方法public void init()先给该类赋值，然后通过（1）出注入进来。这样不影响dao等service下面调用的注入！

  >注：@PostConstruct修饰的方法会在服务器加载Servle的时候运行，并且只会被服务器执行一次。PostConstruct在构造函数之后执行,init()方法之前执行。PreDestroy（）方法在destroy()方法执行执行之后执行

- （3）处要处理的特殊方法static（经典是 main（）方法，自己想想基础，它里面可以使用的方法调用的模式）

- （4）处是使用这样模式的调用方式deleteNotifyTime现在是作为myUtils的属性

需要在工具类中注入Service，由于工具类中方法一般都是静态的，所以要求该属性也要是静态的（Service）。但是由于Spring/SpringBoot正常情况下不能支持注入静态属性（会报空指针异常）。主要原因在于：Spring的依赖注入实际上是依赖于Set方法进行注入值的，Spring是基于对象层面的依赖注入，而静态属性/静态变量实际上是属于类的。

## 参考文章

[关于工具类静态方法调用@Autowired注入的service类问题](https://www.cnblogs.com/jpfss/p/11271473.html)
