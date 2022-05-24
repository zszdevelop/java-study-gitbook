# 版本号原子类AtomicStampedReference源码解析

## 1. 简介

通过原子的方式更新单个变量的原子类的升级版，Atomic包提供了以下2个类：

- AtomicMarkableReference< V >：维护带有标记位的对象引用，可以原子方式对其进行更新。
- AtomicStampedReference< V >：维护带有整数标志的对象引用，可用原子方式对其进行更新。

上面两个原子类的方法以及原理几乎一致，属于带有版本号的原子类

### 1.1 为什么需要带版本号？（ABA问题）

我们知道CAS操作的三大问题之一就是“ABA”问题：**CAS在操作值的时候，需要检查预期值有没有发生变化，如果没有发生变化则更新。但是，如果一个线程t1首先获取了预期值A，此时另一个线程t2则将值从A变成了B，随后又变成了A，随后t1再使用CAS进行比较交换的时候，会发现它的预期值“没有变化”，但实际上是变化过的。这就是ABA问题的由来**。

### 1.2 如何解决ABA问题

ABA问题的解决思路就是使用版本号，1A->2B->3A，在Atomic包中，提供了一个现成的AtomicStampedReference类来解决ABA问题，使用的就是添加版本号的方法。还有一个AtomicMarkableReference实现类，它比AtomicStampedReference更加简单，AtomicStampedReference中每更新一次数据版本号也会更新一次，这样可以使用版本号统计到底更新了多少次，而AtomicMarkableReference仅仅使用了一个boolean值来表示值是否改变过，因此使用的比较少。

## 2. 重要属性

AtomicStampedReference内部不仅维护了我们的传递的对象reference，**还维护了一个int类型的版本号stamp，它们都被存放到一个Pair类型的内部类实例中**。当AtomicStampedReference 对应的数据被修改时，除了更新数据本身外，还必须要更新版本号，**这个版本号一般都是自增的。当AtomicStampedReference 设置对象值时，对象值及版本号都必须满足期望值，才会更新成功**。

```java
/**
 * Pair内部类，用于维护reference和stamp
 *
 * @param <T>
 */
private static class Pair<T> {
    /**
     * 真正的数据
     */
    final T reference;
    /**
     * 版本号
     */
    final int stamp;

    private Pair(T reference, int stamp) {
        this.reference = reference;
        this.stamp = stamp;
    }

    /**
     * 返回Pair实例
     */
    static <T> Pair<T> of(T reference, int stamp) {
        return new Pair<T>(reference, stamp);
    }
}

/**
 * 由于要维护两个属性，因此干脆使用一个内部类对象来维护这两个属性
 */
private volatile Pair<V> pair;

/**
 * 创建具有给定初始值的新 AtomicStampedReference。
 *
 * @param initialRef   初始值
 * @param initialStamp 初始版本号
 */
public AtomicStampedReference(V initialRef, int initialStamp) {
    //初始化一个Pair对象，并初始化属性值
    pair = Pair.of(initialRef, initialStamp);
}

```

## 3. 重要方法

最重要的就是compareAndSet方法，它需要传递：期望值、新值、期望版本号、新版本号，当期望值和期望版本号都与此时内部的真实值和真实版本号相等的时候，就会调用compareAndSwapObject使用一个新的Pair对象替换旧的Pair对象，同时完成reference和stamp的更新。

```java
/**
 * 如果当前引用 == 预期引用，并且当前版本号等于预期版本号，则以原子方式将该引用和该标志的值设置为给定的更新值。
 *
 * @param expectedReference 预期引用
 * @param newReference      新引用
 * @param expectedStamp     预期版本号
 * @param newStamp          新版本号
 * @return 如果成功，则返回 true
 */
public boolean compareAndSet(V expectedReference,
                             V newReference,
                             int expectedStamp,
                             int newStamp) {
    Pair<V> current = pair;
    //一系列的判断，如果两个预期值都相等，那么尝试调用compareAndSwapObject使用新的Pair对象替代旧的Pair对象
    //这样就同时完成了reference和stamp的更新
    return
            expectedReference == current.reference &&
                    expectedStamp == current.stamp &&
                    ((newReference == current.reference &&
                            newStamp == current.stamp) ||
                            casPair(current, Pair.of(newReference, newStamp)));
}

/**
 * CAS替换内部的Pair对象的方法
 *
 * @param cmp 预期pair对象
 * @param val 新pair对象
 * @return 如果成功，则返回 true
 */
private boolean casPair(Pair<V> cmp, Pair<V> val) {
    return UNSAFE.compareAndSwapObject(this, pairOffset, cmp, val);
}


/**
 * @return 获得当前保存的对象引用
 */
public V getReference() {
    return pair.reference;
}

/**
 * @return 获得当前保存的版本号
 */
public int getStamp() {
    return pair.stamp;
}


/**
 * 设置新对象引用和版本号
 *
 * @param newReference 新对象引用
 * @param newStamp     新版本号
 */
public void set(V newReference, int newStamp) {
    Pair<V> current = pair;
    //如果新对象引用以及新版本号和之前的都一样那就不设置
    //否则就是新建一个Pair对象并设置相应的属性，替代原来的Pair对象
    if (newReference != current.reference || newStamp != current.stamp)
        this.pair = Pair.of(newReference, newStamp);
}

```

## 4. 案例

实际上，如果更新的数据是无状态的数据，那么使用基本的原子类也可以完成目的，即如果线程A将值从1->2->1，而线程B仅仅是使用了值，这是没什么问题的，但是如果和业务相关联，比较的对象是有状态的，那么可能会出现严重问题。

**比如还是线程A将值从1->2->1，而线程B的业务逻辑是如果发现数据改变过，那么就不能操作，这样的话就不能单纯的比较值了，这就需要用到版本号了。**

```java
package com.zszdevelop.asposedemo;


import java.util.concurrent.atomic.AtomicStampedReference;
import java.util.concurrent.locks.LockSupport;

public class AtomicStampedReferenceDemo {

    public static void main(String args[]) {
        //初始值为0，版本号为0
        AtomicStampedReference<Integer> atomicStampedReference = new AtomicStampedReference<Integer>(0, 0);

        Thread thread = new Thread(() -> {
            //先获取标志位
            int timestamp = atomicStampedReference.getStamp();
            //获取原值
            int reference = atomicStampedReference.getReference();
            System.out.println("原值reference: " + reference);
            //阻塞，等待被唤醒
            LockSupport.park();
            if (atomicStampedReference.compareAndSet(reference, reference + 1, timestamp, timestamp + 1)) {
                System.out.println("更新成功，新值reference: " + atomicStampedReference.getReference());
            } else {
                System.out.println("更新失败，新值reference: " + atomicStampedReference.getReference());
                System.out.println("虽然原值和新值相等，但是是在线程阻塞过程中值发生了变化，变化了" + atomicStampedReference.getStamp() + "次");
            }
        });
        thread.start();


        Thread thread1 = new Thread(() -> {
            //对数据先加一再减一，反复4次，最终reference的值是不变的
            for (int i = 0; i < 4; i++) {
                int timestamp = atomicStampedReference.getStamp();
                int reference = atomicStampedReference.getReference();
                if (i % 2 == 0) {
                    atomicStampedReference.compareAndSet(reference, reference + 1, timestamp, timestamp + 1);
                } else {
                    atomicStampedReference.compareAndSet(reference, reference - 1, timestamp, timestamp + 1);
                }
            }
            //唤醒阻塞的thread线程
            LockSupport.unpark(thread);
        });
        thread1.start();
    }
}


```

**同样的逻辑，使用普通原子类就能更新成功：**

```java
package com.zszdevelop.asposedemo;

import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.locks.LockSupport;

public class AtomicRefrenceDemo {

    public static void main(String args[]) {
        //初始值为0
        AtomicReference<Integer> atomicReference = new AtomicReference<Integer>(0);

        Thread thread = new Thread(() -> {
            int reference = atomicReference.get();
            System.out.println("原值reference: " + reference);
            //阻塞，等待被唤醒
            LockSupport.park();
            if (atomicReference.compareAndSet(reference, reference + 1)) {
                System.out.println("更新成功，新值reference: " + atomicReference.get());
            } else {
                System.out.println("更新失败，新值reference: " + atomicReference.get());
            }
        });
        thread.start();


        Thread thread1 = new Thread(() -> {
            //对数据先加一再减一，反复4次，最终的值是不变的
            for (int i = 0; i < 4; i++) {
                int reference = atomicReference.get();
                if (i % 2 == 0) {
                    atomicReference.compareAndSet(reference, reference + 1);
                } else {
                    atomicReference.compareAndSet(reference, reference - 1);
                }
            }
            //唤醒阻塞的thread线程
            LockSupport.unpark(thread);
        });
        thread1.start();
    }
}

```

## 参考文章

[Java AtomicInteger和AtomicStampedReference源码深度解析](https://blog.csdn.net/weixin_43767015/article/details/124447418)