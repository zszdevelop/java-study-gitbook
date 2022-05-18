# Druid源码学习2DruidDataSource的init过程

## 1. 简介

DruidDataSource的使用都是创建DruidDataSource对象，set配置参数之后，调用init方法。

通过mock测试实例化DruidDataSource：

```
DruidDataSource ds = new DruidDataSource();
ds.setUrl("jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&characterEncoding=utf-8&serverTimezone=UTC");
ds.setUsername("test");
ds.setPassword("123456");
ds.setFilters("stat");
ds.init();
```

init方法是使用 DruidDataSource的入口。

## 2. init 过程

### 2.1 double check

1. 判断inited状态，这样确保init方法在同一个DataSource对象中只会被执行一次。（后面有加锁）。
2. 之后内部开启要给ReentrantLock。这个lock调用lockInterruptibly。 如果获取不到lock,则会将当前的线程休眠。
3. 再次检测inited状态。如果为true,则返回。这里做了一个DoubleCheck。
4. 定义initStackTrace ，为后续需要getInitStackTrace方法使用。

5. 生成DruidDataSource的id。这是一个AtomicInteger，从1开始递增，每个DataSource都会加1。

```java
   /**
     * init方法是使用 DruidDataSource的入口。
     * @throws SQLException
     */
    public void init() throws SQLException {

        // 1. 双层校验
        // 1.1 判断inited状态，这样确保init方法在同一个DataSource对象中只会被执行一次。（后面有加锁）。
        if (inited) {
            return;
        }

        // bug fixed for dead lock, for issue #2980
        DruidDriver.getInstance();

        //1.2  之后内部开启要给ReentrantLock。这个lock调用lockInterruptibly。 如果获取不到lock,则会将当前的线程休眠
        final ReentrantLock lock = this.lock;
        try {
            lock.lockInterruptibly();
        } catch (InterruptedException e) {
            throw new SQLException("interrupt", e);
        }

        //1.3 再次检测inited状态。如果为true,则返回。这里做了一个DoubleCheck。
        boolean init = false;
        try {
            if (inited) {
                return;
            }

            // 1.4 定义initStackTrace ，为后续需要getInitStackTrace方法使用。
            initStackTrace = Utils.toString(Thread.currentThread().getStackTrace());

            // 1.5 生成DruidDataSource的id。这是一个AtomicInteger，从1开始递增，每个DataSource都会加1。
            this.id = DruidDriver.createDataSourceId();
            
            ....
         }
```

### 2.2 初始化 

#### 2.2.1 初始化1

1. 初始化jdbcUrl。trim处理。
2. 初始化的Filter处理，默认会增加要给StatFilter。
3. 根据dbType,进行cacheServerConfiguration的特殊处理。部分数据库需要将这个参数设置为false。

4. 对maxActive、minIdle、timeBetweenLogStatsMillis、maxEvictableIdleTimeMillis、keepAlive、keepAliveBetweenTimeMillis等参数进行校验。

```java
 // 2. 初始化
            // 2.1 初始化jdbcUrl。trim处理。
            if (this.jdbcUrl != null) {
                this.jdbcUrl = this.jdbcUrl.trim();
                initFromWrapDriverUrl();
            }

            // 2.2 初始化的Filter处理，默认会增加要给StatFilter。
            for (Filter filter : filters) {
                filter.init(this);
            }

            // 2.3 根据dbType,进行cacheServerConfiguration的特殊处理。部分数据库需要将这个参数设置为false。
            if (this.dbTypeName == null || this.dbTypeName.length() == 0) {
                this.dbTypeName = JdbcUtils.getDbType(jdbcUrl, null);
            }

            DbType dbType = DbType.of(this.dbTypeName);
            if (dbType == DbType.mysql
                    || dbType == DbType.mariadb
                    || dbType == DbType.oceanbase
                    || dbType == DbType.ads) {
                boolean cacheServerConfigurationSet = false;
                if (this.connectProperties.containsKey("cacheServerConfiguration")) {
                    cacheServerConfigurationSet = true;
                } else if (this.jdbcUrl.indexOf("cacheServerConfiguration") != -1) {
                    cacheServerConfigurationSet = true;
                }
                if (cacheServerConfigurationSet) {
                    this.connectProperties.put("cacheServerConfiguration", "true");
                }
            }

            // 2.4 对maxActive、minIdle、timeBetweenLogStatsMillis、maxEvictableIdleTimeMillis、keepAlive、keepAliveBetweenTimeMillis等参数进行校验。
            if (maxActive <= 0) {
                throw new IllegalArgumentException("illegal maxActive " + maxActive);
            }

            if (maxActive < minIdle) {
                throw new IllegalArgumentException("illegal maxActive " + maxActive);
            }
```

#### 2.2.2 初始化2

5. 初始化SPI
6. 解决驱动相关的配置
7. 初始化校验
8. 初始化异常存储
9. 初始化validConnectionChecker 不同的数据库的对象不同
10. 校验连接查询的sql
11. 初始化holder的数组：
12. 之后，dataSourceStat是否采用了Global。对dataSourceStat进行set。

```java
// 2.5 初始化SPI
initFromSPIServiceLoader();

// 2.6 解决驱动相关的配置
resolveDriver();

// 2.7 初始化校验
initCheck();

// 2.8 初始化异常存储
initExceptionSorter();
// 2.9 初始化validConnectionChecker 不同的数据库的对象不同
initValidConnectionChecker();
// 2.10 校验连接查询的sql
validationQueryCheck();

// 2.11 之后，dataSourceStat是否采用了Global。对dataSourceStat进行set。
//
if (isUseGlobalDataSourceStat()) {
    dataSourceStat = JdbcDataSourceStat.getGlobal();
    if (dataSourceStat == null) {
        dataSourceStat = new JdbcDataSourceStat("Global", "Global", this.dbTypeName);
        JdbcDataSourceStat.setGlobal(dataSourceStat);
    }
    if (dataSourceStat.getDbType() == null) {
        dataSourceStat.setDbType(this.dbTypeName);
    }
} else {
    dataSourceStat = new JdbcDataSourceStat(this.name, this.jdbcUrl, this.dbTypeName, this.connectProperties);
}
dataSourceStat.setResetStatEnable(this.resetStatEnable);

// 2.12 初始化holder的数组：
connections = new DruidConnectionHolder[maxActive];
evictConnections = new DruidConnectionHolder[maxActive];
keepAliveConnections = new DruidConnectionHolder[maxActive];
```

### 2.3 创建连接

1. 判断是否进行异步初始化： if (createScheduler != null && asyncInit) 。
2. 如果异步初始化，调用通过submitCreateTask进行。
3. 如果poolingCount < initialSize，则创建物理连接。
   1. 如果initialSize不配置为0，在初始化过程中，这个条件不会被触发，这样只有真正需要Connection的时候，才会去创建物理的连接。
   2. 如果指定了initialSize，则在初始化的过程中，初始化线程就创建了initialSize的连接的holder并放置到connections中。

```java
  // 3. 创建连接
            // 3.1 判断是否进行异步初始化
            if (createScheduler != null && asyncInit) {
                // 3.2 如果异步初始化，调用通过submitCreateTask进行。
                for (int i = 0; i < initialSize; ++i) {
                    submitCreateTask(true);
                }
            } else if (!asyncInit) {
                // init connections
                // 3.3 如果poolingCount < initialSize，则创建物理连接。
                // 3.3.1 如果initialSize不配置为0，在初始化过程中，这个条件不会被触发，这样只有真正需要Connection的时候，才会去创建物理的连接。
                //  3.3.2 如果指定了initialSize，则在初始化的过程中，初始化线程就创建了initialSize的连接的holder并放置到connections中。
                while (poolingCount < initialSize) {
                    try {
//                        在同步初始化的条件下，初始化操作将通过init线程进行。而后续由于连接池使用过程中动态的收缩和扩展，则是由其他单独的线程来完成。
//                        反之，如果需要进行异步初始化，则会调用submitCreateTask方法来异步进行。
                        PhysicalConnectionInfo pyConnectInfo = createPhysicalConnection();
                        DruidConnectionHolder holder = new DruidConnectionHolder(this, pyConnectInfo);
                        connections[poolingCount++] = holder;
                    } catch (SQLException ex) {
                       ...
                }

               
            }
```

- 在同步初始化的条件下，初始化操作将通过init线程进行。而后续由于连接池使用过程中动态的收缩和扩展，则是由其他单独的线程来完成。
- 反之，如果需要进行异步初始化，则会调用submitCreateTask方法来异步进行。

### 2.4 创建线程

创建如下线程：

```java
// 4. 创建线程
// 4.1 创建日志线程  但是这个线程的条件timeBetweenLogStatsMillis大于0，如果这个参数没有配置，日志线程不会创建。
createAndLogThread();
// 4.2 创建一个CreateConnectionThread对象，并启动。初始化变量createConnectionThread。
createAndStartCreatorThread();
// 4.3 创建 DestroyTask对象。同时创建DestroyConnectionThread线程，并start,初始化destroyConnectionThread。
createAndStartDestroyThread();
```

之后，在initedLatch处等待线程任务全部完成。

initedLatch会在createAndStartCreatorThread与createAndStartDestroyThread都执行完之后，countdown结束。
这个地方是用来确保上述两个方法都执行完毕，再进行后续的操作。

```java
// 4.4 在initedLatch处等待。
// initedLatch会在createAndStartCreatorThread与createAndStartDestroyThread都执行完之后，countdown结束。
//这个地方是用来确保上述两个方法都执行完毕，再进行后续的操作。
initedLatch.await();
```

initedLatch会在createAndStartCreatorThread与createAndStartDestroyThread都执行完之后，countdown结束。
这个地方是用来确保上述两个方法都执行完毕，再进行后续的操作。

```java
 // 4.5 之后 init 状态为true,并初始化initedTime时间为当前的Date时间。注册registerMbean。
init = true;

initedTime = new Date();
registerMbean();
```



之后 init 状态为true,并初始化initedTime时间为当前的Date时间。注册registerMbean。
如果keepAlive为true,还需调用submitCreateTask方法，将连接填充到minIdle。确保空闲的连接可用。

```java

// 4.6 如果keepAlive为true,还需调用submitCreateTask方法，将连接填充到minIdle。确保空闲的连接可用。
if (keepAlive) {
// async fill to minIdle
   if (createScheduler != null) {
         for (int i = 0; i < minIdle; ++i) {
               submitCreateTask(true);
         }
   } else {
          this.emptySignal();
   }
}
```

### 2.5 finally处理

finally处理逻辑：
修改inited为true,并解锁。

```java
 finally {
            // 5 finally处理
            // 5.1 修改inited为true,并解锁。
            inited = true;
            lock.unlock();

            // 5.2 判断init和日志的INFO状态，打印一条init完成的日志。
            if (init && LOG.isInfoEnabled()) {
                String msg = "{dataSource-" + this.getID();

                if (this.name != null && !this.name.isEmpty()) {
                    msg += ",";
                    msg += this.name;
                }

                msg += "} inited";

                LOG.info(msg);
            }
        }
```



判断init和日志的INFO状态，打印一条init完成的日志。
格式如下：

```java
2022-05-18 16:14:00.690 [restartedMain] INFO  c.a.d.p.DruidDataSource - [init,998] - {dataSource-1} inited
```

## 3. 总结


init过程，对DruidDataSource进行了初始化操作，为了防止多线程并发场景下进行init操作，采用了Double Check的方式，配合ReentrentLock两次判断来实现。
对于真实连接的创建，如果需要同步创建，则init线程会逐个创建连接的holder,反之，如果需要异步创建，则提交到异步执行的线程池submitCreateTask。
详细流程如下图：
![56f612af420ddc34f1c0811a5a08f451](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/56f612af420ddc34f1c0811a5a08f451.png)

## 参考文章

[Druid源码阅读2-DruidDataSource的init过程](https://blog.csdn.net/dhaibo1986/article/details/121233998?spm=1001.2014.3001.5502)