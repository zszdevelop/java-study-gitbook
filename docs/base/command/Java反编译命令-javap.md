# Java反编译命令-javap

## 1. 简介

javap是jdk自带的一个工具，可以对代码 反编译 ，也可以查看java编译器生成的字节码。

**javap命令分解一个class文件**，它根据options来决定到底输出什么。如果没有使用options,那么javap将会输出包，类里的protected和public域以及类里的所有方法。`javap`将会把它们输出在标准输出上。

>一般情况下，很少有人使用javap对class文件进行反编译，因为有很多成熟的反编译工具可以使用，比如jad。但是，javap还可以查看java编译器为我们生成的字节码。通过它，可以对照源代码和字节码，从而了解很多编译器内部的工作。

## 2. 实例

来看这个例子，先编译(`javac`)下面这个类。

```java
public class SynchronizedTest {

    public synchronized void doSth(){
        System.out.println("Hello World");
    }

    public void doSth1(){
        synchronized (SynchronizedTest.class){
            System.out.println("Hello World");
        }
    }
}
```

### 2.1 编译 javac

```
javac SynchronizedTest.java
```

我们可以看到编译出来的class 代码我们是无法直接阅读的二进制文件

![image-20220519170413379](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220519170413379.png)

### 2.2 反编译javap

我们先来使用 Javap 来反编译以上代码

#### 2.2.1 不加参数情况

```
javap SynchronizedTest
```

编译结果

```
Compiled from "SynchronizedTest.java"
public class SynchronizedTest {
  public SynchronizedTest();
  public synchronized void doSth();
  public void doSth1();
}
```

#### 2.2.2 -c 参数

```
javap -c SynchronizedTest
```

编译出的结果

```java
Compiled from "SynchronizedTest.java"
public class SynchronizedTest {
  public SynchronizedTest();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public synchronized void doSth();
    Code:
       0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
       3: ldc           #3                  // String Hello World
       5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
       8: return

  public void doSth1();
    Code:
       0: ldc           #5                  // class SynchronizedTest
       2: dup
       3: astore_1
       4: monitorenter
       5: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
       8: ldc           #3                  // String Hello World
      10: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
      13: aload_1
      14: monitorexit
      15: goto          23
      18: astore_2
      19: aload_1
      20: monitorexit
      21: aload_2
      22: athrow
      23: return
    Exception table:
       from    to  target type
           5    15    18   any
          18    21    18   any
}
```

## 3. 用法摘要

```bash
-help 帮助
-l 输出行和变量的表
-public 只输出public方法和域
-protected 只输出public和protected类和成员
-package 只输出包，public和protected类和成员，这是默认的
-p -private 输出所有类和成员
-s 输出内部类型签名
-c 输出分解后的代码，例如，类中每一个方法内，包含java字节码的指令，
-verbose 输出栈大小，方法参数的个数
-constants 输出静态final常量
```

## 4. 总结

javap可以用于反编译和查看编译器编译后的字节码。平时一般用`javap -c`比较多，该命令用于列出每个方法所执行的JVM指令，并显示每个方法的字节码的实际作用。可以通过字节码和源代码的对比，深入分析java的编译原理，了解和解决各种Java原理级别的问题。

## 参考文章

[Java命令学习系列（七）——javap](https://www.hollischuang.com/archives/1107)