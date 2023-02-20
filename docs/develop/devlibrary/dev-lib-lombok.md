---
order: 10
category:
  - Lib
---

# 常用开发库-Lombok工具库详解

>Lombok是一款非常实用Java工具，可用来帮助开发人员消除Java的冗长代码，尤其是对于简单的Java对象（POJO）。实际上我并不推荐使用Lombok（不主动使用它）, 但是因为它有着很大的使用量，我们仍然有必要掌握它，不仅知道如何使用和它解决的问题，还要知道它的坑。

## 1. Lombok的引入

我们通常需要编写大量代码才能使类变得有用。如以下内容：

- `toString()`方法
- `hashCode()` and `equals()`方法
- `Getter` and `Setter` 方法
- 构造函数

对于这种简单的类，这些方法通常是无聊的、重复的，而且是可以很容易地机械地生成的那种东西(ide通常提供这种功能)。

### 1.1 在引入Lombok之前我们是怎么做的

IDE中添加`getter/setter`, `toString`等代码

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220726210844622.png" alt="image-20220726210844622"  />

## 2. Lombok的安装和使用

> 下面总结下如何使用。

### 2.1 Lombok官网

- [Lombok官网](https://projectlombok.org/)

### 2.2 Lombok安装

IDEA搜索Lombok插件

![image-20220726211113328](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220726211113328.png)

另外需要注意的是，在使用lombok注解的时候记得要导入lombok.jar包到工程，如果使用的是Maven的工程项目的话，要在其pom.xml中添加依赖如下

```xml
<!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.12</version>
    <scope>provided</scope>
</dependency>
```

### 2.3 Lombok注解说明

看[官网这里](https://projectlombok.org/features/all)

- `val`：用在局部变量前面，相当于将变量声明为final
- `@NonNull`：给方法参数增加这个注解会自动在方法内对该参数进行是否为空的校验，如果为空，则抛出`NPE`（NullPointerException）
- `@Cleanup`：自动管理资源，用在局部变量之前，在当前变量范围内即将执行完毕退出之前会自动清理资源，自动生成`try-finally`这样的代码来关闭流
- `@Getter/@Setter`：用在属性上，再也不用自己手写`setter`和`getter`方法了，还可以指定访问范围
- `@ToString`：用在类上，可以自动覆写`toString`方法，当然还可以加其他参数，例如`@ToString(exclude=”id”)`排除id属性，或者`@ToString(callSuper=true, includeFieldNames=true)`调用父类的`toString`方法，包含所有属性
- `@EqualsAndHashCode`：用在类上，自动生成`equals`方法和`hashCode`方法
- `@NoArgsConstructor`, `@RequiredArgsConstructor` and `@AllArgsConstructor`：用在类上，自动生成无参构造和使用所有参数的构造函数以及把所有+ `@NonNull属性作为参数的构造函数，如果指定`staticName = “of”`参数，同时还会生成一个返回类对象的静态工厂方法，比使用构造函数方便很多
- `@Data`：注解在类上，相当于同时使用了`@ToString`、`@EqualsAndHashCode`、`@Getter`、`@Setter`和`@RequiredArgsConstrutor`这些注解，对于POJO类十分有用
- `@Value`：用在类上，是`@Data`的不可变形式，相当于为属性添加final声明，只提供getter方法，而不提供setter方法
- `@Builder`：用在类、构造器、方法上，为你提供复杂的builder APIs，让你可以像如下方式一样调用`Person.builder().name("Adam Savage").city("San Francisco").job("Mythbusters").job("Unchained Reaction").build()`;更多说明参考Builder
- `@SneakyThrows`：自动抛受检异常，而无需显式在方法上使用throws语句
- `@Synchronized`：用在方法上，将方法声明为同步的，并自动加锁，而锁对象是一个私有的属性`$lock`或`$LOCK`，而java中的synchronized关键字锁对象是this，锁在this或者自己的类对象上存在副作用，就是你不能阻止非受控代码去锁this或者类对象，这可能会导致竞争条件或者其它线程错误
- `@Getter(lazy=true)`：可以替代经典的Double Check Lock样板代码
- `@Log`：根据不同的注解生成不同类型的log对象，但是实例名称都是log，有六种可选实现类
- `@CommonsLog` Creates log = org.apache.commons.logging.LogFactory.getLog(LogExample.class);
- `@Log` Creates log = java.util.logging.Logger.getLogger(LogExample.class.getName());
- `@Log4j` Creates log = org.apache.log4j.Logger.getLogger(LogExample.class);
- `@Log4j2` Creates log = org.apache.logging.log4j.LogManager.getLogger(LogExample.class);
- `@Slf4j` Creates log = org.slf4j.LoggerFactory.getLogger(LogExample.class);
- `@XSlf4j` Creates log = org.slf4j.ext.XLoggerFactory.getXLogger(LogExample.class);

## 3. Lombok代码示例

### 3.1 val示例

```java
public static void main(String[] args) {
    val sets = new HashSet<String>();
    val lists = new ArrayList<String>();
    val maps = new HashMap<String, String>();
    //=>相当于如下
    final Set<String> sets2 = new HashSet<>();
    final List<String> lists2 = new ArrayList<>();
    final Map<String, String> maps2 = new HashMap<>();
}
```

### 3.2 `@NonNull`示例

```java
public void notNullExample(@NonNull String string) {
    string.length();
}
//=>相当于
public void notNullExample(String string) {
    if (string != null) {
        string.length();
    } else {
        throw new NullPointerException("null");
    }
} 
```

### 3.3 `@Cleanup`示例

```java
public static void main(String[] args) {
    try {
        @Cleanup InputStream inputStream = new FileInputStream(args[0]);
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    }
    //=>相当于
    InputStream inputStream = null;
    try {
        inputStream = new FileInputStream(args[0]);
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } finally {
        if (inputStream != null) {
            try {
                inputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 3.4 `@Getter/@Setter`示例

```java
@Setter(AccessLevel.PUBLIC)
@Getter(AccessLevel.PROTECTED)
private int id;
private String shape;

  
```

### 3.5 `@ToString`示例

```java
@ToString(exclude = "id", callSuper = true, includeFieldNames = true)
public class LombokDemo {
    private int id;
    private String name;
    private int age;
    public static void main(String[] args) {
        //输出LombokDemo(super=LombokDemo@48524010, name=null, age=0)
        System.out.println(new LombokDemo());
    }
}
```

### 3.6 `@EqualsAndHashCode`示例

```java
@EqualsAndHashCode(exclude = {"id", "shape"}, callSuper = false)
public class LombokDemo {
    private int id;
    private String shape;
}
```

### 3.7 `@NoArgsConstructor`, `@RequiredArgsConstructor` and `@AllArgsConstructor`示例

```java
@NoArgsConstructor
@RequiredArgsConstructor(staticName = "of")
@AllArgsConstructor
public class LombokDemo {
    @NonNull
    private int id;
    @NonNull
    private String shape;
    private int age;
    public static void main(String[] args) {
        new LombokDemo(1, "circle");
        //使用静态工厂方法
        LombokDemo.of(2, "circle");
        //无参构造
        new LombokDemo();
        //包含所有参数
        new LombokDemo(1, "circle", 2);
    }
}
```

### 3.8 `@Data`示例

```java
import lombok.Data;
@Data
public class Menu {
    private String shopId;
    private String skuMenuId;
    private String skuName;
    private String normalizeSkuName;
    private String dishMenuId;
    private String dishName;
    private String dishNum;
    //默认阈值
    private float thresHold = 0;
    //新阈值
    private float newThresHold = 0;
    //总得分
    private float totalScore = 0;
}  
```

### 3.9 `@Value`示例

```java
@Value
public class LombokDemo {
    @NonNull
    private int id;
    @NonNull
    private String shap;
    private int age;
    //相当于
    private final int id;
    public int getId() {
        return this.id;
    }
    ...
}
```

### 3.10 `@Builder`示例

```java
@Builder
public class BuilderExample {
    private String name;
    private int age;
    @Singular
    private Set<String> occupations;
    public static void main(String[] args) {
        LombokDemo3 test = LombokDemo3.builder().age(11).name("test")
                .occupation("1")
                .occupation("2")
                .build();
    }
}

  
```

@Singular可以为集合类型的参数或字段生成一种特殊的方法, 它采用修改列表中一个元素而不是整个列表的方式，可以是增加一个元素，也可以是删除一个元素。

在使用@Singular注释注释一个集合字段（使用@Builder注释类），lombok会将该构建器节点视为一个集合，并生成两个adder方法而不是setter方法。

生成代码如下：

```java
public LombokDemo3.LombokDemo3Builder occupation(String occupation) {
    if (this.occupations == null) {
        this.occupations = new ArrayList();
    }

    this.occupations.add(occupation);
    return this;
}

public LombokDemo3.LombokDemo3Builder occupations(Collection<? extends String> occupations) {
    if (occupations == null) {
        throw new NullPointerException("occupations cannot be null");
    } else {
        if (this.occupations == null) {
            this.occupations = new ArrayList();
        }

        this.occupations.addAll(occupations);
        return this;
    }
}

public LombokDemo3.LombokDemo3Builder clearOccupations() {
    if (this.occupations != null) {
        this.occupations.clear();
    }

    return this;
}
```

- Builder.Default

```java
@Builder
@ToString
public class BuilderDefaultExample {

    @Builder.Default
    private final String id = UUID.randomUUID().toString();
    
    private String username;

    @Builder.Default
    private long insertTime = System.currentTimeMillis();

}
```

### 3.11 `@SneakyThrows`示例

```java
import lombok.SneakyThrows;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
public class Test {
    @SneakyThrows()
    public void read() {
        InputStream inputStream = new FileInputStream("");
    }
    @SneakyThrows
    public void write() {
        throw new UnsupportedEncodingException();
    }
    //相当于
    public void read() throws FileNotFoundException {
        InputStream inputStream = new FileInputStream("");
    }
    public void write() throws UnsupportedEncodingException {
        throw new UnsupportedEncodingException();
    }
}
```

### 3.12 `@Synchronized`示例

```java
public class SynchronizedDemo {
    @Synchronized
    public static void hello() {
        System.out.println("world");
    }
    //相当于
    private static final Object $LOCK = new Object[0];
    public static void hello() {
        synchronized ($LOCK) {
            System.out.println("world");
        }
    }
}
```

### 3.12 `@Getter(lazy = true)`示例

```java
public class GetterLazyExample {
    @Getter(lazy = true)
    private final double[] cached = expensive();
    private double[] expensive() {
        double[] result = new double[1000000];
        for (int i = 0; i < result.length; i++) {
            result[i] = Math.asin(i);
        }
        return result;
    }
}

// 相当于如下所示: 

import java.util.concurrent.atomic.AtomicReference;
public class GetterLazyExample {
    private final AtomicReference<java.lang.Object> cached = new AtomicReference<>();
    public double[] getCached() {
        java.lang.Object value = this.cached.get();
        if (value == null) {
            synchronized (this.cached) {
                value = this.cached.get();
                if (value == null) {
                    final double[] actualValue = expensive();
                    value = actualValue == null ? this.cached : actualValue;
                    this.cached.set(value);
                }
            }
        }
        return (double[]) (value == this.cached ? null : value);
    }
    private double[] expensive() {
        double[] result = new double[1000000];
        for (int i = 0; i < result.length; i++) {
            result[i] = Math.asin(i);
        }
        return result;
    }
}
```

## 4. Lombok深入理解

> 接下来我们深入理解下Lombok：

### 4.1 Lombok解决了什么问题

这个简单，就是简化代码。

### 4.2 Lombok的原理

> 会发现在Lombok使用的过程中，只需要添加相应的注解，无需再为此写任何代码。自动生成的代码到底是如何产生的呢？

核心之处就是对于注解的解析上。JDK5引入了注解的同时，也提供了两种解析方式。

- **运行时解析**

运行时能够解析的注解，必须将@Retention设置为RUNTIME, 比如`@Retention(RetentionPolicy.RUNTIME)`，这样就可以通过反射拿到该注解。java.lang,reflect反射包中提供了一个接口AnnotatedElement，该接口定义了获取注解信息的几个方法，Class、Constructor、Field、Method、Package等都实现了该接口，对反射熟悉的朋友应该都会很熟悉这种解析方式。

- **编译时解析**

编译时解析有两种机制，分别简单描述下：

1）Annotation Processing Tool

apt自JDK5产生，JDK7已标记为过期，不推荐使用，JDK8中已彻底删除，自JDK6开始，可以使用Pluggable Annotation Processing API来替换它，apt被替换主要有2点原因：

- api都在com.sun.mirror非标准包下
- 没有集成到javac中，需要额外运行

2）Pluggable Annotation Processing API

[JSR 269: Pluggable Annotation Processing API](https://www.jcp.org/en/jsr/proposalDetails?id=269)自JDK6加入，作为apt的替代方案，它解决了apt的两个问题，javac在执行的时候会调用实现了该API的程序，这样我们就可以对编译器做一些增强，这时javac执行的过程如下

![image-20220726213510502](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220726213510502.png)



Lombok本质上就是一个实现了“JSR 269 API”的程序。在使用javac的过程中，它产生作用的具体流程如下：

- javac对源代码进行分析，生成了一棵抽象语法树（AST）
- 运行过程中调用实现了“JSR 269 API”的Lombok程序
- 此时Lombok就对第一步骤得到的AST进行处理，找到@Data注解所在类对应的语法树（AST），然后修改该语法树（AST），增加getter和setter方法定义的相应树节点
- javac使用修改后的抽象语法树（AST）生成字节码文件，即给class增加新的节点（代码块）

![image-20220726213815931](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220726213815931.png)

从上面的Lombok执行的流程图中可以看出，在Javac 解析成AST抽象语法树之后, Lombok 根据自己编写的注解处理器，动态地修改 AST，增加新的节点（即Lombok自定义注解所需要生成的代码），最终通过分析生成JVM可执行的字节码Class文件。使用Annotation Processing自定义注解是在编译阶段进行修改，而JDK的反射技术是在运行时动态修改，两者相比，反射虽然更加灵活一些但是带来的性能损耗更加大。

### 4.3 Lombok类似原理工具有什么

> 换言之，我们可以通过Lombok同样的思路解决什么问题？ 

- 第一个问题，我可以通过上述原理，自己实现一个类似Lombok 吗？

可以的，给你找了[一篇文章](https://www.jianshu.com/p/fc06578e805a)

- 还有一些其它类库使用这种方式实现，比如:
  - [Google Auto](https://github.com/google/auto)
  - Dagger
  - ...

### 4.4 Lombok没有未来 - Java14 Record了解下

> Lombok是没有未来的，因为Java完全可以对于这种纯数据载体通过另外一种方式表示, 所以有了[JEP 359: Records](https://openjdk.java.net/jeps/359), 简单而言就是通过一个语法糖来解决。

![image-20220726214107051](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220726214107051.png)

- 从前

```java
public class Range {
 
    private final int min;
    private final int max;
 
    public Range(int min, int max) {
        this.min = min;
        this.max = max;
    }
 
    public int getMin() {
        return min;
    }
 
    public int getMax() {
        return max;
    }
 
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Range range = (Range) o;
        return min == range.min && max == range.max;
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(min, max);
    }
 
    @Override
    public String toString() {
        return "Range{" +
          "min=" + min +
          ", max=" + max +
          '}';
    }
}
```

- Java14 record

```java
public record Range(int min, int max) {}
```

没错就是这个简单！这个语法糖是不是有 “卧槽” 的感觉？我们声明这种类使用record 标识（目前不知道 record 会不会上升到关键字的高度）。当你用record 声明一个类时，该类将自动拥有以下功能：

- 获取成员变量的简单方法，以上面代码为例 min() 和 max() 。注意区别于我们平常getter的写法。
- 一个 equals 方法的实现，执行比较时会比较该类的所有成员属性
- 重写 equals 当然要重写 hashCode
- 一个可以打印该类所有成员属性的 toString 方法。
- 请注意只会有一个构造方法。

因为这个特性是 preview feature，默认情况下是无法编译和执行的。同样以上面为例我们需要执行：

```bash
 $ javac -d classes --enable-preview --release 14 Range.java
 $ java -classpath classes --enable-preview Range
```

在 Jshell 中运行

```bash
jshell> Range r = new Range(10, 20);
r ==> Range[min=10, max=20]
jshell> r.min()
$5 ==> 10
jshell> r.toString()
$6 ==> "Range[min=10, max=20]"
jshell> r
r ==> Range[min=10, max=20]
```

虽然 record 声明的类没有 final 关键字，实际上它是一个不可变类。除了一些限制外，它依旧是一个普通的Java 类。因此，我们可以像添加普通类一样添加逻辑。我们可以在构造实例时强制执行前提条件：

```java
public record Range(int min, int max) {
    public Range {
        if (min >= max)
            throw new IllegalArgumentException("min should be less than max");
    }
}
```

另外我们也可以给 Records 类增加普通方法、静态属性、静态方法，这里不再举例；

**为了简化语法糖的推理，不能在类内声明成员属性**。以下是错误的示范：

```java
public record Range(int min, int max) {
    // 错误的示范
    private String name;
}
```

## 5. Lombok有什么坑

> 谈谈Lombok容易被忽视的坑, 看似代码简洁背后的代价。

### 5.1 `@Data`的坑

在使用Lombok过程中，如果对于各种注解的底层原理不理解的话，很容易产生意想不到的结果。

举一个简单的例子，我们知道，当我们使用`@Data`定义一个类的时候，会自动帮我们生成`equals()`方法 。

但是如果只使用了`@Data`，而不使用`@EqualsAndHashCode(callSuper=true)`的话，会默认是`@EqualsAndHashCode(callSuper=false)`,这时候生成的`equals()`方法只会比较子类的属性，不会考虑从父类继承的属性，无论父类属性访问权限是否开放。

这就可能得到意想不到的结果。

### 5.2 代码可读性，可调试性低

在代码中使用了Lombok，确实可以帮忙减少很多代码，因为Lombok会帮忙自动生成很多代码。但是**这些代码是要在编译阶段才会生成的**，所以在开发的过程中，其实很多代码其实是缺失的。

在代码中大量使用Lombok，就导致代码的可读性会低很多，而且也会给代码调试带来一定的问题。 比如，我们想要知道某个类中的某个属性的getter方法都被哪些类引用的话，就没那么简单了。

### 5.3 Lombok有很强的侵入性

- **强J队友**

因为Lombok的使用要求开发者一定要在IDE中安装对应的插件。如果未安装插件的话，使用IDE打开一个基于Lombok的项目的话会提示找不到方法等错误。导致项目编译失败。也就是说，如果项目组中有一个人使用了Lombok，那么其他人就必须也要安装IDE插件。否则就没办法协同开发。

更重要的是，如果我们定义的一个jar包中使用了Lombok，那么就要求所有依赖这个jar包的所有应用都必须安装插件，这种侵入性是很高的。

- **影响升级**

因为Lombok对于代码有很强的侵入性，就可能带来一个比较大的问题，那就是会影响我们对JDK的升级。按照如今JDK的升级频率，每半年都会推出一个新的版本，但是Lombok作为一个第三方工具，并且是由开源团队维护的，那么他的迭代速度是无法保证的。

所以，如果我们需要升级到某个新版本的JDK的时候，若其中的特性在Lombok中不支持的话就会受到影响。

还有一个可能带来的问题，就是Lombok自身的升级也会受到限制。因为一个应用可能依赖了多个jar包，而每个jar包可能又要依赖不同版本的Lombok，这就导致在应用中需要做版本仲裁，而我们知道，jar包版本仲裁是没那么容易的，而且发生问题的概率也很高。

### 5.4 Lombok破坏了封装性

以上几个问题，我认为都是有办法可以避免的。但是有些人排斥使用Lombok还有一个重要的原因，那就是他会破坏封装性。

众所周知，Java的三大特性包括`封装性`、`继承性`和`多态性`。

如果我们在代码中直接使用Lombok，那么他会自动帮我们生成getter、setter 等方法，这就意味着，一个类中的所有参数都自动提供了设置和读取方法。

举个简单的例子，我们定义一个购物车类：

```java
@Data
public class ShoppingCart { 

    //商品数目
    private int itemsCount; 

    //总价格
    private double totalPrice; 

    //商品明细
    private List items = new ArrayList<>();

}
```

我们知道，购物车中商品数目、商品明细以及总价格三者之前其实是有关联关系的，如果需要修改的话是要一起修改的。

但是，我们使用了Lombok的`@Data`注解，对于itemsCount 和 totalPrice这两个属性。虽然我们将它们定义成 `private` 类型，但是提供了 `public` 的 `getter`、`setter` 方法。

外部可以通过 `setter` 方法随意地修改这两个属性的值。我们可以随意调用 `setter` 方法，来重新设置 itemsCount、totalPrice 属性的值，这也会导致其跟 items 属性的值不一致。

而面向对象封装的定义是：通过访问权限控制，隐藏内部数据，外部仅能通过类提供的有限的接口访问、修改内部数据。所以，暴露不应该暴露的 setter 方法，明显违反了面向对象的封装特性。

好的做法应该是不提供`getter/setter`，而是只提供一个public的addItem方法，同时去修改itemsCount、totalPrice以及items三个属性。

> 以上问题其实也是可以解决的，但这提醒了我们需要理解Lombok，而不是一股脑的用`@Data`注解。 

## 6. 总结

- 优缺点
  - 优点：大大减少了代码量，使代码非常简洁
  - 缺点：可能存在对队友不友好、对代码不友好、对调试不友好、对升级不友好等问题。Lombok还会导致破坏封装性的问题。`@Data`中覆盖`equals`和`hashCode`的坑等。
- 什么样的情况使用Lombok
  - 团队整体的共识，IDE规范，相关代码规范等
  - 对Lombok足够了解，比如知道其中的坑等
- 不推荐使用Lombok的理由
  - 其实我们不缺时间写Getter和Setter的，这些代码通常是由IDE生成的。简化也是有代价的。
  - 对Lombok认知不够，导致带来的坑。
  - Java14中Record了解下

## 参考文章

[常用开发库](https://pdai.tech/md/develop/package/dev-package-x-lombok.html#lombok%E7%9A%84%E5%AE%89%E8%A3%85%E5%92%8C%E4%BD%BF%E7%94%A8)