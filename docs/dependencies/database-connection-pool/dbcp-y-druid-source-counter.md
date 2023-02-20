# Druid源码学习（十）-DruidDataSource中的一些计数器

在 Druid 连接池的工作过程中，会用到一些计数器对Druid的情况进行判断。然后根据计数器的数据采取一系列操作，整理如下:

## 1. 统计类的计数器

| 变量名               | 类型          | 说明                                                         |
| -------------------- | ------------- | ------------------------------------------------------------ |
| connectCount         | long          | getConnectionInternal被调用之后就会增加，意味着连接被get的次数。 |
| closeCount           | long          | 连接调用recycle中，包括回收、关闭等情况，成功之后会增加，标识连接关闭的次数。 |
| recycleCount         | long          | 连接调用recycle成功之后才会增加，不包括在回收过程中关闭的情况。标识连接真正回收的次数。 |
| removeAbandonedCount | long          | 连接调用removeAbandoned成功之后才会增加，标识连接跟踪泄露机制的执行次数。 |
| notEmptyWaitCount    | long          | 连接调用pollLast或者tackLast之后就会增加，实际上是触发notEmpty.await的的次数. |
| notEmptySignalCount  | long          | 连接触发notEmpty的signal的次数。                             |
| discardCount         | volatile long | 调用discard成功之后的次数。                                  |

上述long类型的计数器，全部只会增加，不会减少，在Druid工作的过程中进行统计和监控作用。

## 2.状态相关的计数器

| 变量名                  | 类型 | 说明                                                         |
| ----------------------- | ---- | ------------------------------------------------------------ |
| poolingCount            | int  | DruidConnectionHolder[] connections数组中连接的数量。        |
| activeCount             | int  | Map<DruidPooledConnection, Object> activeConnections 中的连接数量。 |
| notEmptyWaitThreadCount | int  | 连接被取出之后，触发notEmpty进行wait线程的数量。             |
| activePeak              | int  | activeCount出现的峰值。                                      |
| poolingPeak             | int  | poolingCount出现的峰值。                                     |
| createTaskCount         | int  | 创建连接线程数的计数器。                                     |

## 3. 相关的判断逻辑：

poolingCount < initialSize 时，创建连接以达到初始化连接数。
poolingCount >= maxActive 时，回收的连接会被拒绝放入connections中。

activeCount + poolingCount >= maxActive时， empty.await()，创建连接的线程会被取消。
activeCount + poolingCount <= minIdle 时，通知emptySignal(),通知继续创建连接。
keepAlive && poolingCount + activeCount < minIdle 时，再shrink方法中needFill为true,会触发通知emptySignal(),继续创建连接。
activeCount + poolingCount + createTaskCount >= maxActive 时，开启了createScheduler，则会取消createScheduler的创建任务。
activeCount <= minIdle 时，触发emptySignal()，创建连接。

## 4. 存储Connection的容器

| 变量名               | 类型                               | 说明                                                         |
| -------------------- | ---------------------------------- | ------------------------------------------------------------ |
| connections          | DruidConnectionHolder[]            | 连接存放的数组。                                             |
| keepAliveConnections | DruidConnectionHolder[]            | keepAlive连接存放的数组。只会在shrink中开启了keepalive才会使用。 |
| evictConnections     | DruidConnectionHolder[]            | 需要关闭的连接存放的数组。shrink中该数组中的连接都会被关闭掉。 |
| activeConnections    | Map<DruidPooledConnection, Object> | getConnection之后，存放的容器。                              |

![image-20220525230547564](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220525230547564.png)

## 参考文章

[Druid源码阅读10-DruidDataSource中的一些计数器](https://blog.csdn.net/dhaibo1986/article/details/121430733?spm=1001.2014.3001.5502)