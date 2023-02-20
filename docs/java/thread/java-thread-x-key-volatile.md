---
order: 120
category:
  - Java
  - 并发
---

# 关键字: volatile

>Java语言为了解决并发编程中存在的原子性、可见性和有序性问题，提供了一系列和并发处理相关的关键字，比如`synchronized`、`volatile`、`final`、`concurren包`等

## 1. 简介

`volatile`通常被比喻成"轻量级的`synchronized`"，也是Java并发编程中比较重要的一个关键字。和`synchronized`不同，`volatile`是一个变量修饰符，只能用来修饰变量。无法修饰方法及代码块等。

>`synchronized`可以保证原子性、有序性和可见性。而`volatile`却只能保证有序性和可见性

### 1.1 作用

1. 保证了不同线程对这个变量进行操作时的可见性，即一个线程修改了某个变量的值，这新值对其他线程来说是立即可见的。（**保证可见性**）

2. 禁止进行指令重排序。（**保证有序性**）

## 2. 用法

`volatile`的用法比较简单，只需要在声明一个**可能被多线程同时访问的变量时，使用`volatile`修饰**就可以了。

```java
public class Singleton {  
    private volatile static Singleton singleton;  
    private Singleton (){}  
    public static Singleton getSingleton() {  
    if (singleton == null) {  
        synchronized (Singleton.class) {  
        if (singleton == null) {  
            singleton = new Singleton();  
        }  
        }  
    }  
    return singleton;  
    }  
}  

```

>单例模式的实例，可能在多线程中被子线程同时访问

如以上代码，是一个比较典型的使用双重锁校验的形式实现单例的，**其中使用`volatile`关键字修饰可能被多个线程同时访问到的singleton**。

## 3. volatile的原理

为了提高处理器的执行速度，**在处理器和内存之间增加了多级缓存来提升**。但是由于引入了多级缓存，就**存在缓存数据不一致问题**。

但是，对于`volatile`变量，**当对`volatile`变量进行写操作的时候**，**JVM会向处理器发送一条lock前缀的指令，将这个缓存中的变量回写到系统主存中。**

但是就算写回到内存，如果其他处理器缓存的值还是旧的，再执行计算操作就会有问题，所以在多处理器下，为了保证各个处理器的缓存是一致的，就会实现**缓存一致性协议**

### 3.1 缓存一致性协议

**缓存一致性协议**：每个处理器通过嗅探在总线上传播的数据来检查自己缓存的值是不是过期了，当处理器发现自己缓存行对应的内存地址被修改，就会将当前处理器的缓存行设置成无效状态，当处理器要对这个数据进行修改操作的时候，会强制重新从系统内存里把数据读到处理器缓存里。

### 3.2 原理总结

如果**一个变量被`volatile`所修饰的话，在每次数据变化之后，其值都会被强制刷入主存。而其他处理器的缓存由于遵守了缓存一致性协议，也会把这个变量的值从主存加载到自己的缓存中。这就保证了一个`volatile`在并发编程中，其值在多个缓存中是可见的**。

## 4. volatile 与并发问题

### 4.1 volatile与可见性

#### 4.1.1 定义

可见性是指当多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即看得到修改的值。

#### 4.1.2 背景

Java内存模型规定了**所有的变量都存储在主内存**中，**每条线程还有自己的工作内存**，线程的**工作内存中保存了该线程中是用到的变量的主内存副本拷贝**，线程对变量的所有操作都必须在工作内存中进行，而不能直接读写主内存。不同的线程之间也无法直接访问对方工作内存中的变量，**线程间变量的传递均需要自己的工作内存和主存之间进行数据同步进行**。所以，就**可能出现线程1改了某个变量的值，但是线程2不可见的情况**。

#### 4.1.3 结论（保证可见性）

前面的关于`volatile`的原理中介绍过了，Java中的`volatile`关键字提供了一个功能，那就是**被其修饰的变量在被修改后可以立即同步到主内存**，被其修饰的变量在每次是用之前都从主内存刷新。因此，可以使用**`volatile`来保证多线程操作时变量的可见性**。

### 4.2 volatile与有序性

#### 4.2.1 定义

有序性即程序执行的顺序按照代码的先后顺序执行。

#### 4.2.2 背景

除了引入了时间片以外，由于处理器优化和指令重排等，CPU还可能对输入代码进行乱序执行，比如`load->add->save` 有可能被优化成`load->save->add` 。这就是可能存在有序性问题。

#### 4.2.3 结论（保证有序性）

而`volatile`除了可以保证数据的可见性之外，还有一个强大的功能，那就是他可以**禁止指令重排优化**等。

普通的变量仅仅会保证在该方法的执行过程中所依赖的赋值结果的地方都能获得正确的结果，而不能保证变量的赋值操作的顺序与程序代码中的执行顺序一致。

volatile可以禁止指令重排，这就保证了代码的程序会严格按照代码的先后顺序执行。这就保证了有序性。**被`volatile`修饰的变量的操作，会严格按照代码顺序执行，`load->add->save` 的执行顺序就是：load、add、save。**

### 4.3 volatile与原子性

#### 4.3.1 定义

原子性是指一个操作是不可中断的，要全部执行完成，要不就都不执行。

#### 4.3.2 背景

线程是CPU调度的基本单位。CPU有时间片的概念，会根据不同的调度算法进行线程调度。当一个线程获得时间片之后开始执行，在时间片耗尽之后，就会失去CPU使用权。所以在多线程场景下，由于时间片在线程间轮换，就会发生原子性问题。

#### 4.3.3 结论（不保证原子性）

我们介绍`synchronized`的时候，提到过，为了保证原子性，需要通过字节码指令`monitorenter`和`monitorexit`，但是`volatile`和这两个指令之间是没有任何关系的。

**所以，`volatile`是不能保证原子性的。**

## 5. volatile的原理和实现机制

下面这段话摘自《深入理解Java虚拟机》：

“观察加入volatile关键字和没有加入volatile关键字时所生成的汇编代码发现，加入volatile关键字时，会多出一个lock前缀指令”

lock前缀指令实际上相当于一个内存屏障（也成内存栅栏），内存屏障会提供3个功能：

1. 它确保指令重排序时不会把其后面的指令排到内存屏障之前的位置，也不会把前面的指令排到内存屏障的后面；即在执行到内存屏障这句指令时，在它前面的操作已经全部完成；

2. 它会强制将对缓存的修改操作立即写入主存；

3. 如果是写操作，它会导致其他CPU中对应的缓存行无效。

## 6. volatile 使用场景

在以下两个场景中可以使用`volatile`来代替`synchronized`：

1. **对变量的写操作不依赖于当前值**

2. 变量不需要与其他状态变量共同参与不变约束。

除以上场景外，都需要使用其他方式来保证原子性，如`synchronized`或者`concurrent包`。

### 6.1 场景实例1：状态标记

```java
volatile boolean flag = false;
 
while(!flag){
    doSomething();
}
 
public void setFlag() {
    flag = true;
}
```

```java
volatile boolean inited = false;
//线程1:
context = loadContext();  
inited = true;            
 
//线程2:
while(!inited ){
sleep()
}
doSomethingwithconfig(context);
```

### 6.2 单例模式双层校验锁

```java
class Singleton{
    private volatile static Singleton instance = null;
     
    private Singleton() {
         
    }
     
    public static Singleton getInstance() {
        if(instance==null) {
            synchronized (Singleton.class) {
                if(instance==null)
                    instance = new Singleton();
            }
        }
        return instance;
    }
}

```



## 7. volatile和原子性的例子

```java
public class Test {
    public volatile int inc = 0;

    public void increase() {
        inc++;
    }

    public static void main(String[] args) {
        final Test test = new Test();
        for(int i=0;i<10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j<1000;j++)
                        test.increase();
                };
            }.start();
        }

        while(Thread.activeCount()>1)  //保证前面的线程都执行完
            Thread.yield();
        System.out.println(test.inc);
    }
}

```

以上代码比较简单，就是创建10个线程，然后分别执行1000次`i++`操作。正常情况下，程序的输出结果应该是10000，但是，多次执行的结果都小于10000。这其实就是`volatile`无法满足原子性的原因。

为什么会出现这种情况呢，那就是**因为虽然volatile可以保证`inc`在多个线程之间的可见性。但是无法`inc++`的原子性**。

## 8. 总结

`synchronized`可以保证原子性、有序性和可见性。而`volatile`却只能保证有序性和可见性

## 参考文章

[深入理解Java中的volatile关键字](https://juejin.cn/post/6844903656274264078)