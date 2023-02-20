# Druid源码学习（七）-DruidDataSource的recycle过程

## 1. 简介

Druid 中的Connection在使用之后，要进行回收，而回收连接的方法就是recycle方法。
回收的主要目的是将连接的状态清空/重置之后，放置到连接池的connections数组的尾部，然后发送连接池lock的notEmpty条件变量 通知消息，让等待的消费者线程来获取连接。

## 2.回收过程

回收方法首先要做的是，判断回收线程是否为同一个线程。如果不是，则打印日志输出。

```java
 /**
     * 回收连接
     */
    protected void recycle(DruidPooledConnection pooledConnection) throws SQLException {
        ...

        if (logDifferentThread //
                && (!isAsyncCloseConnectionEnable()) //
                && pooledConnection.ownerThread != Thread.currentThread()//
        ) {
            LOG.warn("get/close not same thread");
        }
    }
```

这个日志级别是warn,这是我们在使用连接池的过程中特别要注意的地方，一般来说，只有连接池发生了连接泄露，使用连接的线程长期持有连接而不执行具体操作，连接泄漏监测的线程才会来关闭连接。这种情况需要特别注意。
此外，连接泄露监测机制的removeAbandoned机制也会调用recycle方法来进行回收。

pooledConnection.traceEnable与activeConnections都是与removeAbandoned机制相关的参数，这将在后续关于removeAbandoned机制的时候详细分析。

```java
if (pooledConnection.traceEnable) {
    Object oldInfo = null;
    activeConnectionLock.lock();
    try {
        if (pooledConnection.traceEnable) {
            //将连接从activeConnections中移除 考虑到多线程场景，要加锁
            oldInfo = activeConnections.remove(pooledConnection);
            pooledConnection.traceEnable = false;
        }
    } finally {
        activeConnectionLock.unlock();
    }
    if (oldInfo == null) {
        if (LOG.isWarnEnabled()) {
            LOG.warn("remove abandonded failed. activeConnections.size " + activeConnections.size());
        }
    }
}

```

rollback处理：如果不是自动commit切不是只读的连接，在回收的时候，先进行回滚操作。

```java
// check need to rollback?
if ((!isAutoCommit) && (!isReadOnly)) {
    pooledConnection.rollback();
}

```

reset处理：此处需要判断是否为多线程场景，如果不是同一个线程，因为连接本身的线程有可能调用完毕之后释放的时候也会调用recycle,因此这个地方需要考虑到多线程。

```java
// reset holder, restore default settings, clear warnings
boolean isSameThread = pooledConnection.ownerThread == Thread.currentThread();
if (!isSameThread) {
    final ReentrantLock lock = pooledConnection.lock;
    lock.lock();
    try {
        holder.reset();
    } finally {
        lock.unlock();
    }
} else {
    holder.reset();
}

```

最关键的部分是reset方法：

```java
//清空Listeners
connectionEventListeners.clear();
statementEventListeners.clear();

lock.lock();
try {
    for (Object item : statementTrace.toArray()) {
        Statement stmt = (Statement) item;
        //关闭statement
        JdbcUtils.close(stmt);
    }
    //清空statementTrace
    statementTrace.clear();
} finally {
    lock.unlock();
}
//清空warning信息
conn.clearWarnings();

```

reset方法将connection中的statement都关闭，并将相关的报警灯内容清空。

关闭连接处理：

```java
//如果状态为discard 则直接退出
if (holder.discard) {
    return;
}
//如果超过连接最大的使用次数，那么也将关闭连接
if (phyMaxUseCount > 0 && holder.useCount >= phyMaxUseCount) {
    discardConnection(holder);
    return;
}

```

这个地方如果状态为udiscard,则直接退出recycle方法。会在后续的方法中被discard。
如果达到最大调用次数，也会关闭连接。

关闭清理:
如果连接已经关闭，则加锁，减去计数器即可。

```java
if (physicalConnection.isClosed()) {
        lock.lock();
        try {
            if (holder.active) {
                activeCount--;
                holder.active = false;
            }
            closeCount++;
        } finally {
            lock.unlock();
        }
        return;
    }

```

testOnReturn处理：
如果开启了testOnReturn,则发送测试数据，如果测试失败，则关闭连接。

```java
if (testOnReturn) {
    boolean validate = testConnectionInternal(holder, physicalConnection);
    if (!validate) {
        JdbcUtils.close(physicalConnection);

        destroyCountUpdater.incrementAndGet(this);

        lock.lock();
        try {
            if (holder.active) {
                activeCount--;
                holder.active = false;
            }
            closeCount++;
        } finally {
            lock.unlock();
        }
        return;
    }
}

```

如果配置了druid.phyTimeoutMillis，那么回收的时候需要对连接进行超时检测：

````java
if (phyTimeoutMillis > 0) {
    long phyConnectTimeMillis = currentTimeMillis - holder.connectTimeMillis;
    if (phyConnectTimeMillis > phyTimeoutMillis) {
        discardConnection(holder);
        return;
    }
}

````

最关键的代码：

```java
lock.lock();
try {
    //修改active状态和activeCount计数器
    if (holder.active) {
        activeCount--;
        holder.active = false;
    }
    //增加closeCount计数器
    closeCount++;
    //将连接放置到数组的末尾
    result = putLast(holder, currentTimeMillis);
    recycleCount++;
} finally {
    lock.unlock();
}

```

这是连接回收的核心代码，就是将连接放置到数组的末尾。
在putLast方法中会调用 notEmpty.signal();这样消费者线程就会产生调用。

## 3. recycle的调用时机

recycle方法将在连接的close方法中被调用。在需要关闭连接的时候，调用recycle,将符合规则的连接添加到连接池的末尾。
调用recycle的方法：

```java
  public void close() throws SQLException ;
  
  public void syncClose() throws SQLException ;

```

close和syncClose方法都会调用recycle。
在关闭连接之前，跟获取连接一样，都要进行责任链模式的filter处理。

```java
if (filters.size() > 0) {
    FilterChainImpl filterChain = new FilterChainImpl(dataSource);
    filterChain.dataSource_recycle(this);
} else {
    recycle();
}

```

## 参考文章

[Druid源码阅读7-DruidDataSource的recycle过程](https://blog.csdn.net/dhaibo1986/article/details/121363454?spm=1001.2014.3001.5502)