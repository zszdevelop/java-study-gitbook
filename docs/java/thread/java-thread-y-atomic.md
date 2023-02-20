# Atomic原子类

## 1. 简介

Java从JDK1.5开始提供了java.util.concurrent.atomic包，**atomic包中的类用于在多线程环境下实现单个变量多个独立操作（比如读-写）的连续原子性。**

并且都比较高效，因为它们都是由基于偏移量（类似于指针）的**非阻塞CAS算法实现，用于替代锁的使用。**

>无锁的进行原子操作，用于替代锁的使用
>
>原理：**volatile字段修饰符+CAS算法（Unsafe提供）**

## 2. JUC包中的4类原子类

并发包 `java.util.concurrent` 的原子类都存放在`java.util.concurrent.atomic`下,如下图所示。

![image-20190917225827634](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20190917225827634.png)

### **2.1 基本类型**

使用原子的方式更新基本类型

- AtomicInteger：整形原子类
- AtomicLong：长整型原子类
- AtomicBoolean：布尔型原子类

### **2.2 数组类型**

使用原子的方式更新数组里的某个元素

- AtomicIntegerArray：整形数组原子类
- AtomicLongArray：长整形数组原子类
- AtomicReferenceArray：引用类型数组原子类

### 2.3 **引用类型**

- AtomicReference：引用类型原子类
- AtomicStampedReference：原子更新引用类型里的字段原子类
- AtomicMarkableReference ：原子更新带有标记位的引用类型

### **2.4 对象的属性修改类型**

- AtomicIntegerFieldUpdater：原子更新整形字段的更新器
- AtomicLongFieldUpdater：原子更新长整形字段的更新器
- AtomicStampedReference：原子更新带有版本号的引用类型。该类将整数值与引用关联起来，可用于解决原子的更新数据和数据的版本号，可以解决使用 CAS 进行原子更新时可能出现的 ABA 问题。

## 3. 带版本号的原子类

通过原子的方式更新单个变量的原子类的升级版，Atomic包提供了以下2个类：

```
1. AtomicMarkableReference< V >：维护带有标记位的对象引用，可以原子方式对其进行更新。
2. AtomicStampedReference< V >：维护带有整数标志的对象引用，可用原子方式对其进行更新。
```

上面两个原子类的方法以及原理几乎一致，属于带有版本号的原子类。

### 3.1 为什么需要带版本号？（ABA问题）

我们知道CAS操作的三大问题之一就是“ABA”问题：**CAS在操作值的时候，需要检查预期值有没有发生变化，如果没有发生变化则更新。但是，如果一个线程t1首先获取了预期值A，此时另一个线程t2则将值从A变成了B，随后又变成了A，随后t1再使用CAS进行比较交换的时候，会发现它的预期值“没有变化”，但实际上是变化过的。这就是ABA问题的由来**。

### 3.2 如何解决ABA问题

ABA问题的解决思路就是使用版本号，1A->2B->3A，在Atomic包中，提供了一个现成的AtomicStampedReference类来解决ABA问题，使用的就是添加版本号的方法。还有一个AtomicMarkableReference实现类，它比AtomicStampedReference更加简单，AtomicStampedReference中每更新一次数据版本号也会更新一次，这样可以使用版本号统计到底更新了多少次，而AtomicMarkableReference仅仅使用了一个boolean值来表示值是否改变过，因此使用的比较少。

## 4. AtomicInteger 的使用

**AtomicInteger 类常用方法**

```java
public final int get() //获取当前的值
public final int getAndSet(int newValue)//获取当前的值，并设置新的值
public final int getAndIncrement()//获取当前的值，并自增
public final int getAndDecrement() //获取当前的值，并自减
public final int getAndAdd(int delta) //获取当前的值，并加上预期的值
boolean compareAndSet(int expect, int update) //如果输入的数值等于预期值，则以原子方式将该值设置为输入值（update）
public final void lazySet(int newValue)//最终设置为newValue,使用 lazySet 设置之后可能导致其他线程在之后的一小段时间内还是可以读到旧的值。
```

**AtomicInteger 类的使用示例**

使用 AtomicInteger 之后，不用对 increment() 方法加锁也可以保证线程安全。

```java
class AtomicIntegerTest {
        private AtomicInteger count = new AtomicInteger();
      //使用AtomicInteger之后，不需要对该方法加锁，也可以实现线程安全。
        public void increment() {
                  count.incrementAndGet();
        }
     
       public int getCount() {
                return count.get();
        }
}
```

## 5. AtomicInteger 类的原理

AtomicInteger 类的部分源码：

```java
 // setup to use Unsafe.compareAndSwapInt for updates（更新操作时提供“比较并替换”的作用）
    private static final Unsafe unsafe = Unsafe.getUnsafe();
    private static final long valueOffset;

    static {
        try {
            valueOffset = unsafe.objectFieldOffset
                (AtomicInteger.class.getDeclaredField("value"));
        } catch (Exception ex) { throw new Error(ex); }
    }

    private volatile int value;
```

AtomicInteger 类主要利用 CAS (compare and swap) + volatile 和 native 方法来保证原子操作，从而避免 synchronized 的高开销，执行效率大为提升。

CAS的原理是拿期望的值和原本的一个值作比较，如果相同则更新成新的值。UnSafe 类的 objectFieldOffset() 方法是一个本地方法，这个方法是用来拿到“原来的值”的内存地址，返回值是 valueOffset。另外 value 是一个volatile变量，在内存中可见，因此 JVM 可以保证任何时刻任何线程总能拿到该变量的最新值。

## 6. JDK1.8中新增的原子加强类

### 6.1 jdk1.8 新增的原子加强类

```
1. LongAdder：long类型的数值累加器，从0开始累加，累加规则为加法运算。
2. LongAccumulator：long类型的数值累加器，可从指定值开始累加，可指定累加规则。
3. DoubleAdder：double类型的数值累加器，从0开始累加，累加规则为加法运算。
4. DoubleAccumulator：double类型的数值累加器，可从指定值开始累加，可指定累加规则。
```

### 6.2 为什么需要加强

自从原子类问世之后，**多线程环境下如果用于统计计数操作，一般可以使用AtomicLong来代替锁作为计数器**，AtomicLong 通过CAS 提供了非阻塞的原子性操作，相比使用阻塞算法的同步器来说它的性能己经很好了，那么，它们有什么缺点吗？

实际上，AtomicLong等其他传统的atomic原子类对于数值的更改，通常都是**在一个无限循环（自旋）中不断尝试CAS 的修改操作，一旦CAS失败则循环重试，这样来保证最终CAS操作成功**。如果竞争不激烈，那么修改成功的概率就很高，但是如果**在高并发下大量线程频繁的竞争修改计数器，会造成一次CAS修改失败的概率就很高**。在大量修改失败时，这些原子操作就会进行多次循环尝试**，白白浪费CPU 资源，因此性能还是会受到影响**。

**JDK1.8新增这些类，正是为了解决高并发环境下由于频繁读写AtomicLong等计数器而可能造成某些线程持续的空转（循环）进而浪费CPU的情况，它们也被称为“累加器”！**

## 7. atomic 合适场景

**单个变量的复合操作（比如读-写）中可以代替锁的来保证操作的原子性和安全性，并且由于没有使用锁而有不错的性能**

>对于多个变量的复合操作以及一批代码的原子性和安全性却无能为力，此时只能使用锁。

## 8. 总结

实际上volatile关键字以及Unsafe类提供的CAS的方法就是构成原子类的基石，原子类的方法实际上就是对于Unsafe中的CAS方法的二次包装，方便开发人员使用而已。Unsafe中的CAS方法作为native方法，本身并不是Java语言实现的，它们的源码位于JVM虚拟机的源码中，HotSpot虚拟机的源码中就有这些native方法的具体实现，它们都是采用C++的代码实现的，方便与底层系统交互，在openjdk中可以找到。

## 参考文章

[Java atomic原子操作类的介绍](https://blog.csdn.net/weixin_43767015/article/details/107895944)
