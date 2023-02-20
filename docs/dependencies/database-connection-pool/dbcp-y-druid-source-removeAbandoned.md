# Druid源码学习（八）-DruidDataSource的removeAbandoned机制

## 1. 简介

有关于 Druid 的removeAbandoned机制，在getConnection源码中介绍过。removeAbandoned实际上就是Druid的泄露检测机制。主要的参数有：

| 参数                         | 说明                                                 |
| ---------------------------- | ---------------------------------------------------- |
| removeAbandoned              | 如果连接泄露，是否需要回收泄露的连接，默认false；    |
| logAbandoned                 | 如果回收了泄露的连接，是否要打印一条log，默认false； |
| removeAbandonedTimeoutMillis | 连接回收的超时时间，默认5分钟；                      |

removeAbandoned作为开启连接泄露检测机制的开关，默认为false,当为true的时候，在随着DestroyTask的调用频率定期检测。
在DestroyTask的run方法中：

```java
@Override
public void run() {
    shrink(true, keepAlive);
    if (isRemoveAbandoned()) {
        removeAbandoned();
    }
}

```

当开启连接泄露检测机制之后，会定期检测连接是否触发超时时间，如果触发则关闭连接。凡是get之后被使用的连接都放置在activeConnections中。
之后遍历activeConnections，对连接进行判断，如果触发超时时间，则close。

## 2. removeAbandoned 源码

```java
//定义一个abandonedList来存放符合超时时间的连接。
List<DruidPooledConnection> abandonedList = new ArrayList<DruidPooledConnection>();
//加锁
activeConnectionLock.lock();
try {
     //通过迭代器遍历activeConnections
    Iterator<DruidPooledConnection> iter = activeConnections.keySet().iterator();
	
    for (; iter.hasNext();) {
        //获取到连接
        DruidPooledConnection pooledConnection = iter.next();
		//如果连级为Running状态，说明sql语句正在执行，则跳过当前连接
        if (pooledConnection.isRunning()) {
            continue;
        }
        //计算超时时间 默认值为5分钟
        long timeMillis = (currrentNanos - pooledConnection.getConnectedTimeNano()) / (1000 * 1000);
        //如果触发超时：
        if (timeMillis >= removeAbandonedTimeoutMillis) {
			//从iter删除该连接
            iter.remove();
			//关闭setTraceEnable
            pooledConnection.setTraceEnable(false);
            //添加到abandonedList
            abandonedList.add(pooledConnection);
        }
    }
} finally {
//解锁
    activeConnectionLock.unlock();
}

```

将满足超时条件的连接放置到abandonedList中。
如果abandonedList不为空，则要对abandonedList进行遍历，然后关闭这些连接：

```java
//定义锁
final ReentrantLock lock = pooledConnection.lock;
lock.lock();
try {
    //如果连接为disiable状态 说明已经不可用 直接跳过
    if (pooledConnection.isDisable()) {
        continue;
    }
} finally {
    //解锁
    lock.unlock();
}
//关闭连接
JdbcUtils.close(pooledConnection);
//设置abandond状态
pooledConnection.abandond();
//增加计数器
removeAbandonedCount++;
removeCount++;
```

之后进行日志处理。
打印出warn的日志之后，方法执行完毕。

## 参考文章

[Druid源码阅读8-DruidDataSource的removeAbandoned机制](https://blog.csdn.net/dhaibo1986/article/details/121384904?spm=1001.2014.3001.5502)