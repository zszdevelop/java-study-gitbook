# ReentrantLock之条件锁Condition源码分析

## 1. 简介

条件锁，指在获得锁之后，还需要达成某些条件后，才能继续执行的锁。且必须配合Lock一起使用，也就是说必须获得锁之后才可以调用condition.await()方法

## 2. 源码分析

ReentrantLock 的条件锁使用的 `AbstractQueuedSynchronizer` 中的`ConditionObject` 来实现的，所以其实标题说的ReentrantLock 源码分析，其实应该是AQS源码分析之条件锁`Condition`，但是这里为什么还是要说成ReentrantLock 源码分析呢？主要是AQS是一个抽象类，用户并不能直接使用，而ReentrantLock 提供了使用条件锁的入口，源码如下：：

```java
 // java.util.concurrent.locks.ReentrantLock.Sync#newCondition
 // 新生一个条件
        final ConditionObject newCondition() {
            return new ConditionObject();
        }
```

## 3. Condition 接口

Condition 是一个接口，定义了7个方法，分别是：

1. void await() throws InterruptedException;
   使当前线程等待，直到发出信号或中断
2. boolean await(long time, TimeUnit unit) throws InterruptedException;
   使当前线程等待，直到它被唤醒或中断，或指定的等待时间被终止。等价于：awaitNanos(unit.toNanos(time)) > 0
3. long awaitNanos(long nanosTimeout) throws InterruptedException;
   使当前线程等待，直到发出信号或中断，或过去指定的等待时间
4. void awaitUninterruptibly();
   使当前线程等待，直到发出信号为止
5. boolean awaitUntil(Date deadline) throws InterruptedException;
   使当前线程等待，直到发出信号或中断，或过去指定的截止时间
6. void signal();
   唤醒一个等待的线程
7. void signalAll();
   唤醒所有等待的线程

```
// java.util.concurrent.locks.Condition
```

总结下来，就是await、signal、signalAll，所以下面我们也主要分析这三个方法。

## 4. AQS.ConditionObject类

ConditionObject 是AQS是的一个内部类，实现了Condition 接口，并且实现它的全部方法，ConditionObject 也维护了一个队列，为了和AbstractQueuedSynchronizer内部类Node组成的队列区分开，这里的队列我们下面称为等待队列，Node组成的队列称为同步队列，等待队列源码如下

```java
// java.util.concurrent.locks.AbstractQueuedSynchronizer.ConditionObject
public class ConditionObject implements Condition, java.io.Serializable {
    /** First node of condition queue. */
    private transient Node firstWaiter;
    /** Last node of condition queue. */
    private transient Node lastWaiter;
}

```

### 4.1 Condition.await()方法

使当前线程等待，直到发出信号或中断，如果当前线程被中断，抛出InterruptedException

```java
public final void await() throws InterruptedException {
    if (Thread.interrupted())
        // 如果当前线程被中断，抛出InterruptedException
        throw new InterruptedException();
    // 以当前线程为节点添加到等待队列，并返回当前节点
    Node node = addConditionWaiter();
    // 完全释放当前线程获得锁，并返回释放前state的值
    int savedState = fullyRelease(node);
    // 中断标识
    int interruptMode = 0;
    // 检查当前节点的是否在同步队列，注意前面的感叹号，是节点不在同步队列中，才将当前线程park
    while (!isOnSyncQueue(node)) {
        // 调用Unsafa类底层阻塞线程，等待唤醒自己的条件信号
        LockSupport.park(this);
        // 当被唤醒以后，接着从下面开始执行
        // checkInterruptWhileWaiting 检查线程是否被中断
        // 发出信号之前被中断，返回-1，发出信号之后被中断，返回1，没有被中断，返回0
        if ((interruptMode = checkInterruptWhileWaiting(node)) != 0)
            break;
    }
    // 再次从同步队列获得锁，获取不到锁会再次阻塞线程
    if (acquireQueued(node, savedState) && interruptMode != THROW_IE)
        interruptMode = REINTERRUPT;
    if (node.nextWaiter != null) // clean up if cancelled
        // 判断条件等待队列中有没有线程被取消，如果有，则将它们清除
        unlinkCancelledWaiters();
    if (interruptMode != 0)
        // 发生了中断，抛出异常或者重新中断当前线程
        reportInterruptAfterWait(interruptMode);
}
```

await()方法过程总结：

1. 检查线程中断情况，如果当前线程被中断，抛出InterruptedException
2. 以当前线程为节点添加到等待队列，并返回当前节点
3. 完全释放当前线程获得锁，并返回释放前 `state` 的值
4. 检查当前节点的是否在同步队列
   - 不在同步队列，调用Unsafa类底层 park 阻塞线程，等待唤醒信号
5. 当被唤醒以后，再次从同步队列获得锁，获取不到锁会再次阻塞线程
6. 判断条件等待队列中有没有线程被取消，如果有，则将它们清除
7. 如果发生了中断，抛出异常或者重新中断当前线程

### 4.2 Condition.signal()方法

“唤醒”一个等待时间最长的线程，也就是等待队列的第一个线程——firstWaiter；

```java
public final void signal() {
    // 判断是否是当前线程持有锁，不是则抛出异常
    // 说明了调用这个方法之前也必须要持有锁
    if (!isHeldExclusively())
        throw new IllegalMonitorStateException();
    // 等待队列队头，理论上就是第一次调用await()时加入的节点线程
    Node first = firstWaiter;
    if (first != null)
        // 发信号
        doSignal(first);
}

private void doSignal(Node first) {
    do {
        // firstWaiter = first.nextWaiter   重新赋值等待队列头结点
        if ( (firstWaiter = first.nextWaiter) == null)
            // 等待队列 为空
            lastWaiter = null;
        // 断掉节点关系
        first.nextWaiter = null;
       // transferForSignal 将节点从等待队列转移到同步队列
    } while (!transferForSignal(first) && (first = firstWaiter) != null);
}
//  node节点是等待队列上的节点
final boolean transferForSignal(Node node) {
    // 改变节点的等待状态为0
    // 0表示：当前节点在sync队列中，等待着获取锁。-2表示当前节点在等待condition，也就是在condition队列中
    // 返回false,外层的循环继续执行
    if (!compareAndSetWaitStatus(node, Node.CONDITION, 0))
        return false;

    // 将节点加入到同步队列中，返回node节点的前驱结点，也就是老的尾节点
    Node p = enq(node);
    int ws = p.waitStatus;
    // 大于0的状态只有1，也就是取消
    // 如果老的尾节点被取消 或者 更新老的尾节点为SIGNAL失败，可以直接轮到当前节点，直接唤醒当前节点的线程
    if (ws > 0 || !compareAndSetWaitStatus(p, ws, Node.SIGNAL))
        LockSupport.unpark(node.thread);
    // 如果老的尾节点没有被取消 或者 更新老的尾节点为SIGNAL成功，则返回true
    // 返回true的话，外层的do循环会直接退出
    // 所以这个方法最核心的逻辑知识把等待队列的节点转移到同步队列中去
    // 转移到同步队列后，signal()方法调用完成后紧接着应该是unlock()方法，移动同步队列的新节点等待被唤醒
    return true;
}
```

signal()方法过程总结：

1. 判断是否是当前线程持有锁在调用signal方法，不是则抛出异常（调用signal()方法之前必须调用lock()方法）
2. 拿到等待队列队头节点 firstWaiter，理论上就是第一次调用await()时加入的节点，节点存在则继续调用dosignal()。
3. 先使用 CAS 方式修改节点的waitStatus的值为0，表示此节点在同步队列中
4. 将节点加入到同步队列中（`enq(node)`），返回node节点的前驱结点，也就是老的尾节点
5. 同步队列中，如果老的尾节点被取消 或者 更新老的尾节点为SIGNAL失败
   说明可以直接轮到当前节点，直接唤醒等待队列第一个节点的线程
6. 如果老的尾节点没有被取消 或者 更新老的尾节点为SIGNAL成功，则返回true，返回true的话，外层的do循环会直接退出，结束signal()方法。

最后如果直接返回true，第5步没有执行，那signal()方法就没有地方调用了unpark方法了，那线程是在什么时候被唤醒的呢？
signal()方法核心任务只是把等待队列中的节点转移到同步队列中，signal()方法执行完成后，理论上会执行后面的unlock()方法，tryRelease()解锁成功会调用unparkSuccessor(node)方法，执行LockSupport.unpark(thread)，同步队列中的(等待)节点线程被唤醒，继续执行await()方法之后的代码。

### 4.3 Condition.signalAll()方法

signalAll 和 signal 方法很相似，signal方法在doSignal的时候只是把等到队列的第一个节点转移到同步队列，而signalAll是遍历等待队列，把队列中所有节点都转移到同步队列中去

```java
private void doSignalAll(Node first) {
    lastWaiter = firstWaiter = null;
    // 遍历所有的等待队列
    do {
        Node next = first.nextWaiter;
        first.nextWaiter = null;
        // 等待队列转移到同步队列，signal方法也是同样转移的
        transferForSignal(first);
        first = next;
    } while (first != null);
}
```

## 5. **经典用例 阻塞队列  ArrayBlockingQueue：**

比如最典型的阻塞队列 ArrayBlockingQueue，当队列中没有元素的时候，他无法take出一个元素，需要等待其他线程入队一个元素后唤醒它，才能继续弹出元素。

它有三个重要的属性，一个锁和两个条件，源码如下：

```java
final ReentrantLock lock;
private final Condition notEmpty;
private final Condition notFull;
```

在构造方法中初始化：

```java
public ArrayBlockingQueue(int capacity, boolean fair) {
    if (capacity <= 0)
        throw new IllegalArgumentException();
    this.items = new Object[capacity];
    lock = new ReentrantLock(fair);
    notEmpty = lock.newCondition();
    notFull =  lock.newCondition();
}
```

take() 方法：

```java
public E take() throws InterruptedException {
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        while (count == 0)
            notEmpty.await();
        return dequeue();
    } finally {
        lock.unlock();
    }
}
```

enqueue(E)方法：

```java
private void enqueue(E x) {
    // assert lock.getHoldCount() == 1;
    // assert items[putIndex] == null;
    final Object[] items = this.items;
    items[putIndex] = x;
    if (++putIndex == items.length)
        putIndex = 0;
    count++;
    notEmpty.signal();
}
```

从上面take方法可以看出，当队列为空时，线程要等待入队发生，而不是直接出队返回；

当入队方法enqueue调用时，队列不为空，notEmpty.signal() 唤醒等待的线程。

put(E)方法：

```java
public void put(E e) throws InterruptedException {
    checkNotNull(e);
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        while (count == items.length)
            notFull.await();
        enqueue(e);
    } finally {
        lock.unlock();
    }
}
```

插入元素的时候，如果队列已经满了，线程要等待，等待队列不是满的状态时才可以执行后面的入队操作；

出队或remove等操作之后，会触发唤醒等待的线程：

```java
private E dequeue() {
    // assert lock.getHoldCount() == 1;
    // assert items[takeIndex] != null;
    final Object[] items = this.items;
    @SuppressWarnings("unchecked")
    E x = (E) items[takeIndex];
    items[takeIndex] = null;
    if (++takeIndex == items.length)
        takeIndex = 0;
    count--;
    if (itrs != null)
        itrs.elementDequeued();
    	notFull.signal();
    return x;
}
```

注意，signal 和 await 要成对调用，不然只调用 await 动作，线程则会一直等待，除非线程被中断。

## 6. Condition 总结

1. Reentranlock 的条件锁是基于AQS框架中的ConditionObject来实现的，自己一句代码都没有写，都是用的它爸爸的代码。
2. 从源码也可以看出，使用条件锁的当前线程必须持有锁，代码上表示也就是使用Condition.await()时必须要lock.lock()
3. await() 方法首先会完全释放当前线程获得的锁，然后再把当前线程的节点加入到等待队列中，然后调用Unsafa类底层 park 阻塞线程，等待被唤醒
4. signal() 方法核心是就是把等待队列中的一个节点转移到同步队列中，不一定会马上唤醒线程
5. signalAll() 方法核心是就是把等待队列中的所有节点转移到同步队列中，不一定会马上唤醒线程

## 7. 条件锁使用的简单流程总结

1. A线程 获得锁 lock
2. A线程 await
   1. A线程释放锁
   2. A线程加入到等待队列
   3. A线程阻塞 park
3. B线程 获得锁 lock
4. B线程 signal
   1. B线程 把等待队列中的A线程转移到同步队列
5. B线程 释放锁 unlock
6. A线程被唤醒 unpark
7. A线程 继续执行await方法后面的代码
8. A线程释放锁 unlock

## 参考文章

[源码分析：②ReentrantLock之条件锁Condition](https://jinglingwang.cn/archives/reentrantlock-condition)