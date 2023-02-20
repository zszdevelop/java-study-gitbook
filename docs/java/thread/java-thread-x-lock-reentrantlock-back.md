# ReentrantLock重入锁

## 1. 简介

`ReentrantLock`是可重入的互斥锁，虽然具有与`synchronized`相同功能，但是会比`synchronized`更加灵活（**具有更多的方法**）。

## 2. **ReentrantLock** 和 **Synchronized**的对比

|            | ReentrantLock                      | Synchronized     |
| ---------- | ---------------------------------- | ---------------- |
| 锁实现机制 | 依赖AQS                            | 监视器模式       |
| 灵活性     | **支特响应中断、超时、尝试获取锁** | 不灵活           |
| 释放形式   | 必须显示调用unlock释放锁           | 自动释放监视器   |
| 锁类型     | **公平锁&非公平锁**                | 非公平锁         |
| 条件队列   | 可关联多个条件队列                 | 关联一个条件队列 |
| 可重入性   | **可重入**                         | 可重入           |

## 3. 基础使用

```java
import java.util.concurrent.locks.ReentrantLock;

public class ReentrantLockTest extends Thread {

    public static ReentrantLock lock = new ReentrantLock();
    public static int i = 0;

    public ReentrantLockTest(String name) {
        super.setName(name);
    }

    @Override
    public void run() {
        for (int j = 0; j < 10000000; j++) {
            lock.lock();
            try {
                System.out.println(this.getName() + " " + i);
                i++;
            } finally {
                lock.unlock();
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        ReentrantLockTest test1 = new ReentrantLockTest("thread1");
        ReentrantLockTest test2 = new ReentrantLockTest("thread2");

        test1.start();
        test2.start();
        test1.join();
        test2.join();
        System.out.println(i);
    }
}
```

最后的结果是 `20000000`；如果去掉锁，那么输出结果是一个小于`20000000`的不确定的数

## 4. ReentrantLock的优点

- java中已经有了内置锁：`synchronized`,`synchronized`的特点是使用简单，一切交给JVM去处理,不需要显示释放
- 从用法上可以看出，与`synchronized`相比， `ReentrantLock`就稍微复杂一点。因为必须在finally中进行解锁操作，如果不在 finally解锁，有可能代码出现异常锁没被释放，

> 那么为什么要引入ReentrantLock呢？

- 在jdk1.5里面，`ReentrantLock`的性能是明显优于`synchronized`的，但是在jdk1.6里面，`synchronized`做了优化，他们之间的性能差别已经不明显了。

![image-20220521212704737](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220521212704737.png)

- `ReentrantLock`并不是一种替代内置加锁的方法，而是作为一种可选择的高级功能。
- 相比于`synchronized`，`ReentrantLock`在功能上更加丰富，它具有**可重入、可中断、可限时、公平锁**等特点。

### 4.1 可重入（其实synchronized 也是可重入的）

```java
lock.lock();
lock.lock();
try
{
    i++;
            
}           
finally
{
    lock.unlock();
    lock.unlock();
}
```

由于`ReentrantLock`是重入锁，所以可以反复得到相同的一把锁，它有一个与锁相关的获取计数器，如果拥有锁的某个线程再次得到锁，那么获取计数器就加1，然后锁需要被释放两次才能获得真正释放(重入锁)。

### 4.2 可中断

- 与`synchronized`不同的是，`ReentrantLock`对中断是有响应的.`synchronized`一旦尝试获取锁就会一直等待直到获取到锁。

构造一个死锁的例子，然后用中断来处理死锁

```java
package concurrency.in.practice;

import java.lang.management.ManagementFactory;
import java.lang.management.ThreadInfo;
import java.lang.management.ThreadMXBean;
import java.util.concurrent.locks.ReentrantLock;


public class LockInterrupt extends Thread {

    public static ReentrantLock lock1 = new ReentrantLock();
    public static ReentrantLock lock2 = new ReentrantLock();

    int lock;

    public LockInterrupt(int lock, String name) {

        super(name);
        this.lock = lock;
    }

    @Override
    public void run() {
        try {
            if (lock == 1) {
                lock1.lockInterruptibly();
                try {
                    Thread.sleep(500);
                } catch (Exception e) {
                    // TODO: handle exception
                }
                lock2.lockInterruptibly();
            } else {
                lock2.lockInterruptibly();
                try {
                    Thread.sleep(500);
                } catch (Exception e) {
                    // TODO: handle exception
                }
                lock1.lockInterruptibly();
            }
        } catch (Exception e) {
            // TODO: handle exception
        } finally {
            if (lock1.isHeldByCurrentThread()) {
                lock1.unlock();
            }
            if (lock2.isHeldByCurrentThread()) {
                lock2.unlock();
            }
            System.out.println(Thread.currentThread().getId() + ":线程退出");
        }
    }

    public static void main(String[] args) throws InterruptedException {
        LockInterrupt t1 = new LockInterrupt(1, "LockInterrupt1");
        LockInterrupt t2 = new LockInterrupt(2, "LockInterrupt2");
        t1.start();
        t2.start();
        Thread.sleep(1000);

        //DeadlockChecker.check();
    }

    static class DeadlockChecker {

        private final static ThreadMXBean mbean = ManagementFactory
            .getThreadMXBean();

        public static void check() {

            Thread tt = new Thread(() -> {
                {
                    // TODO Auto-generated method stub
                    while (true) {
                        long[] deadlockedThreadIds = mbean.findDeadlockedThreads();
                        if (deadlockedThreadIds != null) {
                            ThreadInfo[] threadInfos = mbean.getThreadInfo(deadlockedThreadIds);
                            for (Thread t : Thread.getAllStackTraces().keySet()) {
                                for (int i = 0; i < threadInfos.length; i++) {
                                    if (t.getId() == threadInfos[i].getThreadId()) {
                                        System.out.println(t.getName());
                                        t.interrupt();
                                    }
                                }
                            }
                        }
                        try {
                            Thread.sleep(5000);
                        } catch (Exception e) {
                            // TODO: handle exception
                        }
                    }

                }
            });
            tt.setDaemon(true);
            tt.start();
        }

    }

}
```

执行后，确实出现了死锁，使用jstack可以看到如下结果：

![image-20220521212950477](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220521212950477.png)

通过中断来停止线程，结果如下：

![image-20220521213011570](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220521213011570.png)

### 4.3 可限时

- 超时不能获得锁，就返回false，不会永久等待构成死锁
- 使用`lock.tryLock(long timeout, TimeUnit unit)`来实现可限时锁，参数为时间和单位。

```java
package concurrency.in.practice;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;


public class TryLockTest extends Thread {

    public static ReentrantLock lock = new ReentrantLock();

    public TryLockTest(String name){
        super(name);
    }

    @Override
    public void run() {
        try {
            if (lock.tryLock(5, TimeUnit.SECONDS)) {
                Thread.sleep(6000);
            } else {
                System.out.println(this.getName() + " get lock failed");
            }
        } catch (Exception e) {
        } finally {
            if (lock.isHeldByCurrentThread()) {
                System.out.println("lock.isHeldByCurrentThread: " + this.getName());
                lock.unlock();
            }
        }
    }

    public static void main(String[] args) {
        TryLockTest t1 = new TryLockTest("TryLockTest1");
        TryLockTest t2 = new TryLockTest("TryLockTest2");

        t1.start();
        t2.start();
    }

}

```

## 4.4 公平锁

- 一般意义上的锁是不公平的，不一定先来的线程能先得到锁，后来的线程就后得到锁。不公平的锁可能会产生饥饿现象。
- 公平锁的意思就是，这个锁能保证线程是先来的先得到锁。虽然公平锁不会产生饥饿现象，但是公平锁的性能会比非公平锁差很多。

```java
public ReentrantLock(boolean fair) 

public static ReentrantLock fairLock = new ReentrantLock(true);

```



## 参考文章

[ReentrantLock(重入锁)功能详解和应用演示](https://www.cnblogs.com/takumicx/p/9338983.html)

[ReentrantLock 锁详解](https://blog.csdn.net/zhengzhaoyang122/article/details/110847701)
