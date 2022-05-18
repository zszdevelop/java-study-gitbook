# Druid源码学习（一）-DruidDataSource数据结构

## 1. 简介

DruidDataSource是DruidCP最关键的类之一，承载了连接池的启动、关闭、以及连接的获取和管理等功能。

## 2. DruidDataSource的数据结构

DruidDataSource 其内部关键的的数据结构如下表:

| name                 | type                             | 说明                                                         |
| -------------------- | -------------------------------- | ------------------------------------------------------------ |
| connections          | volatile DruidConnectionHolder[] | pool的关键数组，存放连接，实际上是DruidConnectionHolder的数组。Connection由DruidConnectionHolder持有 |
| evictConnections     | DruidConnectionHolder[]          | 被驱逐的Connection的pool,调用收缩方法shrink之后，被收缩的连接都会进入这个数组。 |
| keepAliveConnections | DruidConnectionHolder[]          | 收缩方法shrink中，满足keepalive状态的连接都进入这个数组。    |
| autoFilters          | static List                      | 这个list存全部的filter                                       |
| enable               | volatile boolean                 | 默认值为true,标识连接池是否可用，调用close方法设置该值为false,当为false的时候，连接的error次数增加1,get连接或者其他操作会失败。 |
| inited               | volatile boolean                 | 默认值为false,初始化完成的标识。                             |
| closing              | volatile boolean                 | 关闭过程中的状态。正在close                                  |

**连接池最关键的数据结构是内部持有DruidConnectionHolder的数组，connections。**

## 3. DruidConnectionHolder的数据结构

| name                     | type                          | 说明                                                         |
| ------------------------ | ----------------------------- | ------------------------------------------------------------ |
| dataSource               | final DruidAbstractDataSource | 指向DataSource的指针。                                       |
| conn                     | final Connection              | 指向真正的数据库连接，由数据库驱动实现。                     |
| connectionId             | final long                    | 连接编号。                                                   |
| connectionEventListeners | final List                    | 连接事件监听器。                                             |
| statementEventListeners  | final List                    | statement事件监听器。                                        |
| statementPool            | PreparedStatementPool         | 其内部是一个LRUCache，对Statement做缓存。                    |
| statementTrace           | final List                    | 一个对Statement进行追踪的list,这个statementTrace的作用后面需要详细看看。 |

DruidConnectionHolder是连接池中物理连接的载体，在DruidDataSource中，获取连接的getConnection方法，拿到的是DruidPooledConnection。

## 4. 获取连接 getConnection

```java

    @Override
    public DruidPooledConnection getConnection() throws SQLException {
        return getConnection(maxWait);
    }

    public DruidPooledConnection getConnection(long maxWaitMillis) throws SQLException {
        //执行初始化
        init();

        //如果filter存在 则执行filter,通过filter的代理类来得到连接。
        if (filters.size() > 0) {
            //filter的chain
            FilterChainImpl filterChain = new FilterChainImpl(this);
            return filterChain.dataSource_connect(this, maxWaitMillis);
        } else {
            //如果filter不存在，则直接获取连接。
            return getConnectionDirect(maxWaitMillis);
        }
    }
```

最终得到connection的方法：

```java
poolableConnection = getConnectionInternal(maxWaitMillis);
```

这个方法中，也是根据DruidConnectionHolder产生连接池：

```java
 DruidPooledConnection poolalbeConnection = new DruidPooledConnection(holder);
 return poolalbeConnection;
```

查看这个构造函数：

```java
 public DruidPooledConnection(DruidConnectionHolder holder){
        super(holder.getConnection());

        this.conn = holder.getConnection();
        this.holder = holder;
        this.lock = holder.lock;
        dupCloseLogEnable = holder.getDataSource().isDupCloseLogEnable();
        ownerThread = Thread.currentThread();
        connectedTimeMillis = System.currentTimeMillis();
    }
```

实际上DruidPooledConnection内部持有了一个DruidConnectionHolder。
DruidPooledConnection的数据结构如下表：

| name            | type                           | 说明                        |
| --------------- | ------------------------------ | --------------------------- |
| conn            | Connection                     | 指向真实的数据库连接。      |
| holder          | volatile DruidConnectionHolder | 指向DruidConnectionHolder。 |
| transactionInfo | TransactionInfo                | 事务相关的信息              |

## 5. 类关系图

![image-20220517224826098](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220517224826098.png)

DruidConnectionHolder与DruidPooledConnection，实际上是对连接进行了分层。将频繁变更的内容抽象到了DruidConnectionHolder类。
而DruidPooledConnection则存放了Statement的的缓存pool。

## 6. 相关知识点

### 6.1 volatile

`volatile` 在druid 中也非常常用

```java
 // store
    private volatile DruidConnectionHolder[] connections;
    private volatile boolean                 closing                   = false;
    private volatile boolean                 closed                    = false;
```

#### 6.1.1 `volatile` 简介与作用

`volatile`通常被比喻成"轻量级的`synchronized`，`synchronized`可以保证原子性、有序性和可见性。而`volatile`却只能保证有序性和可见性（不保证原子性）。

- 保证了不同线程对这个变量进行操作时的可见性，即一个线程修改了某个变量的值，这新值对其他线程来说是立即可见的。

- 禁止进行指令重排序。

#### 6.1.2 什么场景下使用`volatile`

在以下两个场景中可以使用`volatile`来代替`synchronized`：

> 1、运算结果并不依赖变量的当前值，或者能够确保只有单一的线程会修改变量的值。
>
> 2、变量不需要与其他状态变量共同参与不变约束。

## 参考文章

[Druid源码阅读1-DruidDataSource数据结构](https://blog.csdn.net/dhaibo1986/article/details/121215459?spm=1001.2014.3001.5501)