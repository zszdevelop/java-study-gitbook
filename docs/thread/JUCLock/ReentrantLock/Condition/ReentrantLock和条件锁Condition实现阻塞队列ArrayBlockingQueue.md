# ReentrantLock和条件锁Condition实现阻塞队列ArrayBlockingQueue

## 1. 简介

比如最典型的阻塞队列 ArrayBlockingQueue，当队列中没有元素的时候，他无法take出一个元素，需要等待其他线程入队一个元素后唤醒它，才能继续弹出元素。

### 1.1 特点

阻塞队列是一种特殊的先进先出队列,它有以下几个特点
1.入队和出队线程安全
2.当队列满时,入队线程会被阻塞;当队列为空时,出队线程会被阻塞。

## 2. 实现

### 2.1 三个重要的属性

它有三个重要的属性，一个锁和两个条件，源码如下：

```java
final ReentrantLock lock;
private final Condition notEmpty;
private final Condition notFull;
```

### 2.2 在构造方法中初始化：

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

### 2.3 take() 方法：

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

### 2.4 enqueue(E)方法：

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

### 2.5 put(E)方法：

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

### 2.6 出队或remove等操作之后，会触发唤醒等待的线程：

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

## 参考文章

[源码分析：②ReentrantLock之条件锁Condition](https://jinglingwang.cn/archives/reentrantlock-condition)