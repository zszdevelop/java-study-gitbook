# CAS（比较并替换）

## 1. 简介

CAS（compare and Swap），既比较并替换，实现并发算法时常用到的一种技术

>在java同步器中大量使用了CAS技术，鬼斧神工的实现了多线程执行的安全性

CAS的思想很简单: 三个参数，一个当前内存值V、旧的预期值A、即将更新的值B、**当且仅当`预期值A`和`内存值V`相同时**，将内存值修改为B并返回true，否则什么都不做，并返回false

## 2. 问题

一个`n++`的问题

```
public class Case {

    public volatile int n;

    public void add() {
        n++;
    }
}
```

通过`javac Case.java` 将java文件先编译成class

再通过`javap -verbose Case`看看add方法的字节码指令

```
public void add();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=3, locals=1, args_size=1
         0: aload_0
         1: dup
         2: getfield      #2                  // Field n:I
         5: iconst_1
         6: iadd
         7: putfield      #2                  // Field n:I
        10: return
      LineNumberTable:
        line 12: 0
        line 13: 10
}
SourceFile: "Case.java"
```

n++ 被拆分成了几个指令

1. 执行`getfield`拿到原始n；
2. 执行`iadd`进行加1操作
3. 执行`putfield`写把累加后的值写回n；

通过volatile修饰的变量可以保证线程之间的可见性，但并不能保证这3个指令的原子执行，在多线程并发执行下，无法做到线程安全，得到正确的结果，那么如何解决呢？

## 3. 如何解决

### 3.1 方案1：在add 方法加上synchrnized修饰

```
public class Case {

    public volatile int n;

    public synchronized void add() {
        n++;
    }
}
```

这个方案当然可行，但是性能上差了点



我们再来看一段代码

```
public int a = 1;
public boolean compareAndSwapInt(int b) {
    if (a == 1) {
        a = b;
        return true;
    }
    return false;
}
```

如果这段代码在并发下执行，会发生什么？

假设线程1和线程2 都过了`a==1`的检查。都准备执行a进行赋值，结果就是两个线程同时修改了变量a。显然这种结果是无法符合预期的，无法确定a的最终值。

解决方案也同样暴力在compareAndSwapInt方法加锁同步，变成一个原子操作，同一时刻只有一个线程才能修改变量a。

### 3.2 方案2：CAS方案

除了地行政的加锁方案，我们还可以使用JDK自带的CAS方案，在CAS中，比较和替换是一组原子操作，不会被外部打断，且在性能上更占优势

下面是`AtomicInteger`的实现为例，分析一下CAS是如何实现的

```
public class AtomicInteger extends Number implements java.io.Serializable {
    // setup to use Unsafe.compareAndSwapInt for updates
    private static final Unsafe unsafe = Unsafe.getUnsafe();
    private static final long valueOffset;

    static {
        try {
            valueOffset = unsafe.objectFieldOffset
                (AtomicInteger.class.getDeclaredField("value"));
        } catch (Exception ex) { throw new Error(ex); }
    }

    private volatile int value;
    public final int get() {return value;}
}
```

1. Unsafe,是CAS的核心类，由于Java方法无法直接访问底层系统，需要通过本地（native）方法来访问，Unsafe相当于一个后门，基于该类可以直接操作特定内存数据
2. 变量valueOffset，表示该变量值在内存中的偏移地址，因为Unsafe就是根据内存偏移地址获取数据的
3. 变量value和volatile修饰，保证了多线程之间内存的可见性

看看`AtomicInteger`如何实现并发下的累加操作：

```
public final int getAndAdd(int delta) {    
    return unsafe.getAndAddInt(this, valueOffset, delta);
}

//unsafe.getAndAddInt
public final int getAndAddInt(Object var1, long var2, int var4) {
    int var5;
    do {
        var5 = this.getIntVolatile(var1, var2);
    } while(!this.compareAndSwapInt(var1, var2, var5, var5 + var4));
    return var5;
}
```

假设线程A和线程B同时执行getAndAdd操作（分别跑在不同的CPU上）

1. AtomicInteger里面的value原始值为3，既**主内存中AtomicInteger的value为3**，根据java内存模型，**线程A和线程B各自持有一份value的副本，值为3**

2. 线程A通过`getIntVolatile(var1, var2)`拿到value值3，这时线程A被挂起。
3. 线程B也通过`getIntVolatile(var1, var2)`方法获取到value值3，运气好，线程B没有被挂起，并执行`compareAndSwapInt`方法比较内存值也为3，成功修改内存值为2。
4. 这时线程A恢复，执行`compareAndSwapInt`方法比较，发现自己手里的值(3)和内存的值(2)不一致，说明该值已经被其它线程提前修改过了，那只能重新来一遍了。
5. 重新获取value值，因为变量value被volatile修饰，所以其它线程对它的修改，线程A总是能够看到，线程A继续执行`compareAndSwapInt`进行比较替换，直到成功

整个过程中，利用CAS保证了对于value的修改的并发安全，继续深入看看Unsafe类中的compareAndSwapInt方法实现。

```
public final native boolean compareAndSwapInt(Object paramObject, lo
```

Unsafe类中的compareAndSwapInt，是一个本地方法，该方法的实现位于`unsafe.cpp`中

```
UNSAFE_ENTRY(jboolean, Unsafe_CompareAndSwapInt(JNIEnv *env, jobject unsafe, jobject obj, jlong offset, jint e, jint x))
  UnsafeWrapper("Unsafe_CompareAndSwapInt");
  oop p = JNIHandles::resolve(obj);
  jint* addr = (jint *) index_oop_from_field_offset_long(p, offset);
  return (jint)(Atomic::cmpxchg(x, addr, e)) == e;
UNSAFE_END
```

1. 先想办法拿到变量value在内存中的地址
2. 通过Atomic::cmpxchg实现替换，其中参数x是即将更新的值，参数e是原内存的值

## 4. CAS缺点

CAS存在一个很明显的问题，既ABA问题

问题：如果变量V初次读取的时候是A，并且在准备赋值的时候检查到他的仍然是A，那能说明他的值没有被其他线程修改了吗？

如果在这段期间层级被改成B,然后又改回A，那么CAS操作就会误认为他从来没有被修改过。针对这种情况，java并发包中提供了一个带有标记的原子引用类`AtomicStampedReference`,它可以**通过控制变量值的版本来保证CAS的正确性**

### 参考文章

[深入浅出CAS](<https://www.jianshu.com/p/fb6e91b013cc>)

