# ReentrantLock源码分析(一)-整体流程

## 1. 类的继承关系

**ReentrantLock** 实现了 **Lock**接口，**Lock**接口中定义了 **lock**与 **unlock**相关操作，并且还存在 **newCondition**方法，表示生成一个条件。

```
public class ReentrantLock implements Lock, java.io.Serializable {
```

![image-20220520160834560](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520160834560.png)

## 2. 类的内部类

**ReentrantLock** 总共有三个内部类，并且三个内部类是紧密相关的，下面先看三个类的关系。

![image-20220520161909794](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520161909794.png)

![image-20220520161943656](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520161943656.png)

>**说明：ReentrantLock** 类内部总共存在**Sync**、**NonfairSync**、**FairSync**三个类，**NonfairSync**与 **FairSync**类继承自 **Sync**类，**Sync**类继承自 **AbstractQueuedSynchronizer**抽象类。下面逐个进行分析。

## 3. AQS自定义同步器

### 3.1 AbstractQueuedSynchronizer 抽象类核心方法

AQS提供了大量用于自定义同步器实现的 Protected方法。自定义同步器实现的相关方法也只是为了通过修改 State字段来实现多线程的独占模式或者共享模式。自定义同步器需要实现以下方法（ReentrantLock需要实现的方法如下，并不是全部）：

| 方法名                                      | 描述                                                         |
| ------------------------------------------- | ------------------------------------------------------------ |
| protected boolean isHeldExclusively()       | 该线程是否正在独占资源。只有用到Condition才需要去实现它。    |
| protected boolean tryAcquire(int arg)       | 独占方式。arg为获取锁的次数，尝试获取资源，成功则返回True，失败则返回False。 |
| protected boolean tryRelease(int arg)       | 独占方式。arg为释放锁的次数，尝试释放资源，成功则返回True，失败则返回False。 |
| protected int tryAcquireShared(int arg)     | 共享方式。arg为获取锁的次数，尝试获取资源。负数表示失败；0表示成功，但没有剩余可用资源；正数表示成功，且有剩余资源。 |
| protected boolean tryReleaseShared(int arg) | 共享方式。arg为释放锁的次数，尝试释放资源，如果释放后允许唤醒后续等待结点返回True，否则返回False。 |

一般来说，自定义同步器要么是独占方式，要么是共享方式，它们也只需实现tryAcquire-tryRelease、tryAcquireShared-tryReleaseShared中的一种即可。AQS也支持自定义同步器同时实现独占和共享两种方式，如ReentrantReadWriteLock。ReentrantLock是独占锁，所以实现了tryAcquire-tryRelease。以非公平锁为例，这里主要阐述一下非公平锁与AQS之间方法的关联之处，具体每一处核心方法的作用会在文章后面详细进行阐述。
![image-20220520162627423](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520162627423.png)

### 3.2 **Sync 类的源码**

```JAVA
 abstract static class Sync extends AbstractQueuedSynchronizer {
     // 序列号
     private static final long serialVersionUID = -5179523762034025860L;
     
     // 获取锁
     abstract void lock();
     
     // 非公平方式获取
     final boolean nonfairTryAcquire(int acquires) {
         // 当前线程
         final Thread current = Thread.currentThread();
         // 获取状态
         int c = getState();
         if (c == 0) { // 表示没有线程正在竞争该锁
             if (compareAndSetState(0, acquires)) { // 比较并设置状态成功，状态0表示锁没有被占用
                 // 设置当前线程独占
                 setExclusiveOwnerThread(current); 
                 return true; // 成功
             }
         }
         else if (current == getExclusiveOwnerThread()) { // 当前线程拥有该锁
             int nextc = c + acquires; // 增加重入次数
             if (nextc < 0) // overflow
                 throw new Error("Maximum lock count exceeded");
             // 设置状态
             setState(nextc); 
             // 成功
             return true; 
         }
         // 失败
         return false;
     }
     
     // 试图在共享模式下获取对象状态，此方法应该查询是否允许它在共享模式下获取对象状态，如果允许，则获取它
     protected final boolean tryRelease(int releases) {
         int c = getState() - releases;
         if (Thread.currentThread() != getExclusiveOwnerThread()) // 当前线程不为独占线程
             throw new IllegalMonitorStateException(); // 抛出异常
         // 释放标识
         boolean free = false; 
         if (c == 0) {
             free = true;
             // 已经释放，清空独占
             setExclusiveOwnerThread(null); 
         }
         // 设置标识
         setState(c); 
         return free; 
     }
     
     // 判断资源是否被当前线程占有
     protected final boolean isHeldExclusively() {
         return getExclusiveOwnerThread() == Thread.currentThread();
     }
 
     // 新生一个条件
     final ConditionObject newCondition() {
         return new ConditionObject();
     }
 
     // 返回资源的占用线程
     final Thread getOwner() {        
         return getState() == 0 ? null : getExclusiveOwnerThread();
     }
     // 返回状态
     final int getHoldCount() {            
         return isHeldExclusively() ? getState() : 0;
     }
 
     // 资源是否被占用
     final boolean isLocked() {        
         return getState() != 0;
     }
 
     // 自定义反序列化逻辑
     private void readObject(java.io.ObjectInputStream s)
         throws java.io.IOException, ClassNotFoundException {
         s.defaultReadObject();
         setState(0); // reset to unlocked state
     }
 }

```

### 3.3 NonfairSync 类的源码

NonfairSync 类继承了 Sync类，表示采用非公平策略获取锁，其实现了 Sync类中抽象的 lock方法，源码如下：从 lock方法的源码可知，每一次都尝试获取锁，而并不会按照公平等待的原则进行等待，让等待时间最久的线程获得锁。Acquire方法是 FairSync和 UnfairSync的父类 AQS中的核心方法。

```java
 // 非公平锁
 static final class NonfairSync extends Sync {
     // 版本号
     private static final long serialVersionUID = 7316153563782823691L;
 
     // 获得锁
     final void lock() {
         /**
          * 若通过CAS设置变量State（同步状态）成功，也就是获取锁成功，则将当前线程设置为独占线程。
          * 若通过CAS设置变量State（同步状态）失败，也就是获取锁失败，则进入Acquire方法进行后续处理。
          */
         if (compareAndSetState(0, 1)) // 比较并设置状态成功，状态0表示锁没有被占用
             // 把当前线程设置独占了锁
             setExclusiveOwnerThread(Thread.currentThread());
         else // 锁已经被占用，或者set失败
             // 以独占模式获取对象，忽略中断
             acquire(1); //Acquire方法是FairSync和UnfairSync的父类AQS中的核心方法。
     }
 
     protected final boolean tryAcquire(int acquires) {
         return nonfairTryAcquire(acquires);
     }
 }

```

### 3.4 **FairSync** 类源码

**FairSync** 类也继承了 **Sync**类，表示采用公平策略获取锁，其实现了 **Sync**类中的抽象 **lock**方法，源码如下：

```java
 // 公平锁
 static final class FairSync extends Sync {
     // 版本序列化
     private static final long serialVersionUID = -3000897897090466540L;
 
     final void lock() {
         // 以独占模式获取对象，忽略中断
         acquire(1);
     }
 
     // 尝试公平获取锁
     protected final boolean tryAcquire(int acquires) {
         // 获取当前线程
         final Thread current = Thread.currentThread();
         // 获取状态
         int c = getState();
         if (c == 0) { // 状态为0
             if (!hasQueuedPredecessors() &&
                 compareAndSetState(0, acquires)) { // 不存在已经等待更久的线程并且比较并且设置状态成功
                 // 设置当前线程独占
                 setExclusiveOwnerThread(current);
                 return true;
             }
         }
         else if (current == getExclusiveOwnerThread()) { // 状态不为0，即资源已经被线程占据
             // 下一个状态
             int nextc = c + acquires;
             if (nextc < 0) // 超过了int的表示范围
                 throw new Error("Maximum lock count exceeded");
             // 设置状态
             setState(nextc);
             return true;
         }
         return false;
     }
 }

```

跟踪 lock方法的源码可知，当资源空闲时，它总是会先判断 sync队列(AbstractQueuedSynchronizer中的数据结构)是否有等待时间更长的线程，如果存在，则将该线程加入到等待队列的尾部，实现了公平获取原则。其中，FairSync 类的 lock的方法调用如下，只给出了主要的方法。
![image-20220520164554009](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520164554009.png)

>可以看出只要资源被其他线程占用，该线程就会添加到 **sync queue**中的尾部，而不会先尝试获取资源。这也是和 Nonfair最大的区别，Nonfair每一次都会尝试去获取资源，如果此时该资源恰好被释放，则会被当前线程获取，这就造成了不公平的现象，当获取不成功，再加入队列尾部。

### 3.5 ReentrantLock和 AQS之间方法的交互过程

为了帮助大家理解 ReentrantLock和 AQS之间方法的交互过程，以非公平锁为例，我们将加锁和解锁的交互流程单独拎出来强调一下，以便于对后续内容的理解。

![image-20220520164654656](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520164654656.png)

#### 3.5.1 加锁：

- 通过ReentrantLock的加锁方法Lock进行加锁操作。
- 会调用到内部类Sync的Lock方法，由于Sync#lock是抽象方法，根据ReentrantLock初始化选择的公平锁和非公平锁，执行相关内部类的Lock方法，本质上都会执行AQS的Acquire方法。
- AQS的Acquire方法会执行tryAcquire方法，但是由于tryAcquire需要自定义同步器实现，因此执行了ReentrantLock中的tryAcquire方法，由于ReentrantLock是通过公平锁和非公平锁内部类实现的tryAcquire方法，因此会根据锁类型不同，执行不同的tryAcquire。
- tryAcquire是获取锁逻辑，获取失败后，会执行框架 AQS的后续逻辑，跟ReentrantLock自定义同步器无关。
  

#### 3.5.2 解锁：

- 通过 ReentrantLock的解锁方法 Unlock进行解锁。
- Unlock会调用内部类 Sync的 Release方法，该方法继承于AQS。
- Release中会调用 tryRelease方法，tryRelease需要自定义同步器实现，tryRelease只在ReentrantLock中的Sync实现，因此可以看出，释放锁的过程，并不区分是否为公平锁。
- 释放成功后，所有处理由AQS框架完成，与自定义同步器无关。

#### 3.5.3 核心映射关系

通过上面的描述，大概可以总结出 ReentrantLock加锁解锁时 API层核心方法的映射关系。

![image-20220520164936659](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520164936659.png)

## 4. 类的属性

**ReentrantLock** 类的 **sync**非常重要，对**ReentrantLock** 类的操作大部分都直接转化为对 **sync**和 **AQS**类的操作。

> ReentrantLock->sync->FairSync/NonfairSync ->AQS

```java
public class ReentrantLock implements Lock, java.io.Serializable {
    // 序列号
    private static final long serialVersionUID = 7373984872572414699L;    
    // 同步队列
    private final Sync sync;
    
    public void lock() {
        sync.lock();
    }
    
    abstract static class Sync extends AbstractQueuedSynchronizer {
       
        /**
         * 获取锁
         */
        abstract void lock();
    }
  
  	/**
     * 公平锁
     */
    static final class FairSync extends Sync {
        private static final long serialVersionUID = -3000897897090466540L;

        final void lock() {
            // 以独占模式获取对象，忽略中断
          	// aqs 的 acquire 方法
            acquire(1);
        }
    }
  
   /**
     * 非公平锁
     */
    static final class NonfairSync extends Sync {

        /**
         * 获得锁
         */
        final void lock() {
          
            if (compareAndSetState(0, 1))
                // 把当前线程设置独占了锁（aqs 方法）
                setExclusiveOwnerThread(Thread.currentThread());
            else// 锁已经被占用，或者set失败
                // 以独占模式获取对象，忽略中断（aqs 方法）
                acquire(1);
        }
}
```

## 5. 类的构造函数

### 5.1 默认构造函数

**ReentrantLock 构造函数：**默认是采用的**非公平**策略获取锁

```java
public ReentrantLock() {
    // 默认非公平策略
    sync = new NonfairSync();
}
```

### 5.2 指定锁构造函数

可以传递参数确定采用公平策略或者是非公平策略，参数为 true表示公平策略，否则，采用非公平策略。

```java
public ReentrantLock(boolean fair) {
        sync = fair ? new FairSync() : new NonfairSync();
    }
```

## 6. 核心函数分析

通过分析 ReentrantLock的源码，可知对其**操作都转化为对 Sync对象的操作，由于 Sync继承了 AQS，所以基本上都可以转化为对 AQS的操作**。如将 ReentrantLock的 lock函数转化为对 Sync的 lock函数的调用，而具体会根据采用的策略(如公平策略或者非公平策略)的不同而调用到 Sync的不同子类。所以可知，在 ReentrantLock的背后，是 AQS对其服务提供了支持。

## 参考文章

[ReentrantLock 锁详解](https://blog.csdn.net/zhengzhaoyang122/article/details/110847701)