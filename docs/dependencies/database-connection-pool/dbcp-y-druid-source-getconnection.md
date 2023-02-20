# Druid源码学习（四）-DruidDataSource的getConnection过程

## 1. 简介

### 1.1 DruidDataSource 实现 javax.sql.DataSource

DruidDataSource连接池实现了javaX.sql包中，DataSource接口的全部方法。getConnection也来自于javax.sql.DataSource接口。

![image-20220522090249593](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220522090249593.png)

![image-20220522090308435](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220522090308435.png)

### 1.2 DruidPooledConnection实现接口java.sql.Connection。

而DruidPooledConnection也实现了接口java.sql.Connection。
这样就能在各种场景中通过这个接口来获取数据库连接。

![image-20220522090459058](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220522090459058.png)

![image-20220522090744812](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220522090744812.png)

这样就能在各种场景中通过这个接口来获取数据库连接。

## 2. fileter处理–责任链模式

### 2.1 getConnection方法 调用责任链

在执行getConnection方法的过程中，首先确认DataSource是否完成了初始化。由于 init方法采用了Double Check机制，如果初始化完成则不会再次执行，因此这里不会造成系统多次初始化。

```java
public DruidPooledConnection getConnection(long maxWaitMillis) throws SQLException {
    //调用初始化，以避免在获取连接的时候DruidDataSource的初始化工作还没完成。
    init();
	
	//这里有两个分支，判断filters是否存在过滤器，如果存在则先执行过滤器中的内容，这采用责任链模式实现。
    if (filters.size() > 0) {
        //责任链执行过程
        FilterChainImpl filterChain = new FilterChainImpl(this);
        return filterChain.dataSource_connect(this, maxWaitMillis);
    } else {
        //直接创建连接
        return getConnectionDirect(maxWaitMillis);
    }
}

```

这个filter的处理过程是一个经典的责任链模式。

### 2.2 FilterChainImpl 责任连之

#### 2.2.1 DataSourceProxy 

new了一个FilterChainImpl对象，而这个对象的构造函数 this 。

![image-20220522091641489](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220522091641489.png)

查看了一下，DruidDataSource的父类DruidAbstractDataSource正好实现了DataSourceProxy接口，也就是说，DruidDataSource本身就是一个DataSourceProxy。

![image-20220522091502064](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220522091502064.png)

 这样做的好处是，FilterChainImpl本身不用维护任何存放filters的数组，这个数组可以直接复用DruidDataSource中的数据结构。

#### 2.2.2 FilterChainImpl 实现

在FilterChainImpl中：

```java

public FilterChainImpl(DataSourceProxy dataSource){
    this.dataSource = dataSource;
    this.filterSize = getFilters().size();
}

public FilterChainImpl(DataSourceProxy dataSource, int pos){
    this.dataSource = dataSource;
    this.pos = pos;
    this.filterSize = getFilters().size();
}

public List<Filter> getFilters() {
    return dataSource.getProxyFilters();
}

private Filter nextFilter() {
    return getFilters()
            .get(pos++);
}

```

在DruidAbstractDataSource中，这个filters的数据结构：

```java
// com.alibaba.druid.pool.DruidAbstractDataSource#filters
protected List<Filter>  filters = new CopyOnWriteArrayList<Filter>();
```

这样所有的filters都将存放到责任list中。

#### 2.2.3 dataSource_connect 方法

再查看 FilterChainImpl的dataSource_connect方法：

```java
   @Override
    public DruidPooledConnection dataSource_connect(DruidDataSource dataSource, long maxWaitMillis) throws SQLException {
        //判断当前filter的指针是否小于filterSize的大小，如果小于，则执行filter的dataSource_getConnection
        if (this.pos < filterSize) {
            DruidPooledConnection conn = nextFilter().dataSource_getConnection(this, dataSource, maxWaitMillis);
            return conn;
        }
        //反之 调用getConnectionDirect 创建数据库连接。
        return dataSource.getConnectionDirect(maxWaitMillis);
    }
```

这样看上去将调用filter的dataSource_getConnection方法。
但是这个地方实际上涉及比较巧妙，采用了一个父类FilterAdapter，所有的Filter都集成这个父类FilterAdapter,而父类本身又实现了Filter接口，本身是一个Filter.
StartFilter等Filter的实现类，没有实现dataSource_getConnection方法。
因此这个方法实际上执行的逻辑就是FilterAdapter类的dataSource_getConnection方法。

```java
@Override
public DruidPooledConnection dataSource_getConnection(FilterChain chain, DruidDataSource dataSource,
                                                      long maxWaitMillis) throws SQLException {
    return chain.dataSource_connect(dataSource, maxWaitMillis);
}

```

此时调用dataSource_connect之后，又回到了FilterChainImpl的dataSource_connect方法中。
不过此时pos会增加，if判断中的逻辑不会执行。那么就会执行 dataSource.getConnectionDirect(maxWaitMillis);直接创建一个连接之后返回。
这就是getConnection过程中处理filter的责任链模式，这也是我们在编码的过程中值得借鉴的地方。
在getConnection中，无论是否存在filter,那么最终将通过getConnectionDirect来创建连接。getConnectionDirect才是连接被创建的最终方法。

### 2.3 getConnectionDirect

getConnectionDirect方法也不是最终创建数据库连接的方法。
这个方法会通过一个for循环自旋，确保连接的创建。
在GetConnectionTimeoutException异常处理中，这个地方有一个重试次数notFullTimeoutRetryCount，每次重试的时间为maxWaitMillis。

```java
// com.alibaba.druid.pool.DruidDataSource#getConnectionDirect
int notFullTimeoutRetryCnt = 0;
//自旋
for (;;) {
    // handle notFullTimeoutRetry
    DruidPooledConnection poolableConnection;
    try {
    //调用getConnectionInternal 获取连接
        poolableConnection = getConnectionInternal(maxWaitMillis);
    } catch (GetConnectionTimeoutException ex) {
    //超时异常处理，判断是否达到最大重试次数 且连接池是否已满
        if (notFullTimeoutRetryCnt <= this.notFullTimeoutRetryCount && !isFull()) {
            notFullTimeoutRetryCnt++;
            //日志打印
            if (LOG.isWarnEnabled()) {
                LOG.warn("get connection timeout retry : " + notFullTimeoutRetryCnt);
            }
            continue;
        }
        throw ex;
    }
    //后续代码略
    ... ...
}

```

通过自旋的方式确保获取到连接。之后对获取到的连接进行检测，主要的检测参数有：

| 参数            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| testOnBorrow    | 默认值通常为false,用在获取连接的时候执行validationQuery检测连接是否有效。这个配置会降低性能。 |
| testOnReturn    | 默认值通常为false,用在归还连接的时候执行validationQuery检测连接是否有效，这个配置会降低性能。 |
| testWhileIdle   | 这个值通常建议为true,连接空闲时间大于timeBetweenEvictionRunsMillis指定的毫秒，就会执行参数validationQuery指定的SQL来检测连接是否有效。这个参数会定期执行。 |
| validationQuery | 用来检测连接是否有效的sql，如果validationQuery为空，那么testOnBorrow、testOnReturn、testWhileIdle这三个参数都不会起作用，配置参考：validationQuery=SELECT 1 |

在getConnection中，将会发生的检测过程伪代码：

```java
if (testOnBorrow){
  //获取连接时检测
}else {
    if (poolableConnection.conn.isClosed()) {
      //检测连接是否关闭
    }
    
     if (testWhileIdle) {
       //空闲检测 
     }

}


```

上述检测过程都会调用testConnectionInternal(poolableConnection.holder, poolableConnection.conn);进行检测。

此外还有一个很重要的参数removeAbandoned。这个参数相关的配置参数有:

| 参数                         | 说明                                                 |
| ---------------------------- | ---------------------------------------------------- |
| removeAbandoned              | 如果连接泄露，是否需要回收泄露的连接，默认false；    |
| logAbandoned                 | 如果回收了泄露的连接，是否要打印一条log，默认false； |
| removeAbandonedTimeoutMillis | 连接回收的超时时间，默认5分钟；                      |

参数removeAbandoned的作用在于，如果有线程从Druid中获取到了连接并没有及时归还，那么Druid就会定期检测该连接是否会处于运行状态，如果不处于运行状态，则被获取时间超过removeAbandonedTimeoutMillis就会强制回收该连接。
这个检测的过程是在回收线程中完成的，在getConnection的过程中，只是判断该参数是否被设置，然后加上对应的标识。

```java
if (removeAbandoned) {
    StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
    //设置 stackTrace
    poolableConnection.connectStackTrace = stackTrace;
    //设置setConnectedTimeNano
    poolableConnection.setConnectedTimeNano();
    //打开traceEnable
    poolableConnection.traceEnable = true;

    activeConnectionLock.lock();
    try {
        activeConnections.put(poolableConnection, PRESENT);
    } finally {
        activeConnectionLock.unlock();
    }
}

```

最后还需要对defaultAutoCommit参数进行处理：

```java
if (!this.defaultAutoCommit) {
    poolableConnection.setAutoCommit(false);
}
```

至此，一个getConnetion方法创建完毕。

### 2.4 getConnectionInternal

getConnectionInternal方法中创建连接：
首先判断连接池状态 closed 和enable状态是否正确，如果不正确则抛出异常退出。

之后的逻辑:

```java
 /**
     * 获取内部连接
     * @param maxWait
     * @return
     * @throws SQLException
     */
    private DruidPooledConnection getConnectionInternal(long maxWait) throws SQLException {
        // 首先判断连接池状态 closed 和enable状态是否正确，如果不正确则抛出异常退出。
        if (closed) {
            connectErrorCountUpdater.incrementAndGet(this);
            throw new DataSourceClosedException("dataSource already closed at " + new Date(closeTimeMillis));
        }

        if (!enable) {
            connectErrorCountUpdater.incrementAndGet(this);

            if (disableException != null) {
                throw disableException;
            }

            throw new DataSourceDisableException();
        }
```

之后的逻辑:

```java
 for (boolean createDirect = false;;){
    if(createDirect){
        //直接创建连接的逻辑
    }
    
    if (maxWaitThreadCount > 0
        && notEmptyWaitThreadCount >= maxWaitThreadCount) {
        // 判断最大等待线程数如果大于0且notEmpty上的等待线程超过了这个值 那么抛出异常
        
        }

    //其他相关参数检测 抛出异常
    
    //判断如果createScheduler存在，且executor.getQueue().size()大于0 那么将启用createDirect逻辑，退出本持循环
    if (createScheduler != null
        && poolingCount == 0
        && activeCount < maxActive
        && creatingCountUpdater.get(this) == 0
        && createScheduler instanceof ScheduledThreadPoolExecutor) {
    ScheduledThreadPoolExecutor executor = (ScheduledThreadPoolExecutor) createScheduler;
    if (executor.getQueue().size() > 0) {
        createDirect = true;
        continue;
    }
    }
	
    //如果maxWait大于0，调用 pollLast(nanos)，反之则调用takeLast()
    //获取连接的核心逻辑
    if (maxWait > 0) {
        holder = pollLast(nanos);
    } else {
        holder = takeLast();
    }

}

```

getConnectionInternal 方法内部存在一大堆参数检测功能，根据一系列参数判断，是否需要直接创建一个连接。
反之，则调用pollLast 或 takeLast 方法。这两个方法如果获取不到连接，将会wait,之后通知生产者线程创建连接。
这个地方有一个风险就是，如果仅仅采用单线程的方式创建连接，一旦生产者线程由于其他原因阻塞，那么getConnection将会产被长时间阻塞。

之后获得holder之后，通过holder产生连接。

```
holder.incrementUseCount();
DruidPooledConnection poolalbeConnection = new DruidPooledConnection(holder);
```

### 2.5 pollLast 与 takeLast

#### 2.5.1 pollLast(如果maxWait大于0)

polllast的方法核心逻辑是自旋，判断是否有可用连接，然后发送empty消息，通知生产者线程可以创建连接。之后阻塞wait。只不过这个方法需要设置超时时间。

```java
// com.alibaba.druid.pool.DruidDataSource#pollLast
for (;;) {
        //如果没有可用的连接
        if (poolingCount == 0) {
         emptySignal(); // send signal to CreateThread create connection

           estimate = notEmpty.awaitNanos(estimate); // signal by
           
         }
         //之后获取最后一个连接
           DruidConnectionHolder last = connections[poolingCount];
}       

```

#### 2.5.2 takeLast(如果maxWait等于0)

而takeLast方法与pollLast方法类似，只是等待的过程中，不增加超时时间，一直等到生产者的通知为止。

```java
//com.alibaba.druid.pool.DruidDataSource#takeLast

 while (poolingCount == 0) {
 
    emptySignal(); // send signal to CreateThread create connection
     
    try {
        notEmpty.await(); // signal by recycle or creator
    } finally {
        notEmptyWaitThreadCount--;
    }
    
 }
decrementPoolingCount();
//最后获取数组中的最后一个连接。
DruidConnectionHolder last = connections[poolingCount];
connections[poolingCount] = null;

```

## 参考文章

[Druid源码阅读4-DruidDataSource的getConnection过程](https://blog.csdn.net/dhaibo1986/article/details/121267489?spm=1001.2014.3001.5502)