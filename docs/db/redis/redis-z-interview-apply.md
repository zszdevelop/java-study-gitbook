---
order: 1100
category:
  - 数据库
  - Redis
---


# Redis面试 - 应用场景

## 1 Redis 客户端有哪些？

Redisson、Jedis、lettuce等等，官方推荐使用Redisson。

Redisson是一个高级的分布式协调Redis客服端，能帮助用户在分布式环境中轻松实现一些Java的对象 (Bloom filter, BitSet, Set, SetMultimap, ScoredSortedSet, SortedSet, Map, ConcurrentMap, List, ListMultimap, Queue, BlockingQueue, Deque, BlockingDeque, Semaphore, Lock, ReadWriteLock, AtomicLong, CountDownLatch, Publish / Subscribe, HyperLogLog)。

## 2 Redis如何做大量数据插入？

Redis2.6开始redis-cli支持一种新的被称之为pipe mode的新模式用于执行大量数据插入工作。

## 3 Redis实现分布式锁实现? 什么是 RedLock?

- **常规**

加锁： SET NX PX + 校验唯一随机值

解锁： Lua脚本

- **RedLock**

搞多个Redis master部署，以保证它们不会同时宕掉。并且这些master节点是完全相互独立的，相互之间不存在数据同步。同时，需要确保在这多个master实例上，是与在Redis单实例，使用相同方法来获取和释放锁。

- **Redisson框架**

Redisson watchdog或者它实现了RedLock方式

具体可以看后文分布式锁中实现方式。

## 4 Redis缓存有哪些问题，如何解决？

当缓存库出现时，必须要考虑如下问题：

- **缓存穿透**
  - **问题来源**: 缓存穿透是指**缓存和数据库中都没有的数据**，而用户不断发起请求。由于缓存是不命中时被动写的，并且出于容错考虑，如果从存储层查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到存储层去查询，失去了缓存的意义。
  - 解决方案
    - 接口层增加校验，如用户鉴权校验，id做基础校验，id<=0的直接拦截；
    - 从缓存取不到的数据，在数据库中也没有取到，这时也可以将key-value对写为key-null，缓存有效时间可以设置短点，如30秒（设置太长会导致正常情况也没法使用）。这样可以防止攻击用户反复用同一个id暴力攻击
    - 布隆过滤器。bloomfilter就类似于一个hash set，用于快速判某个元素是否存在于集合中，其典型的应用场景就是快速判断一个key是否存在于某容器，不存在就直接返回。布隆过滤器的关键就在于hash算法和容器大小
- **缓存穿击**
  - **问题来源**: 缓存击穿是指**缓存中没有但数据库中有的数据**（一般是缓存时间到期），这时由于并发用户特别多，同时读缓存没读到数据，又同时去数据库去取数据，引起数据库压力瞬间增大，造成过大压力。
  - 解决方案
    - 设置热点数据永远不过期。
    - 接口限流与熔断，降级。重要的接口一定要做好限流策略，防止用户恶意刷接口，同时要降级准备，当接口中的某些 服务  不可用时候，进行熔断，失败快速返回机制。
    - 加互斥锁
- **缓存雪崩**
  - **问题来源**: 缓存雪崩是指缓存中**数据大批量到过期时间，而查询数据量巨大，引起数据库压力过大甚至down机**。和缓存击穿不同的是，缓存击穿指并发查同一条数据，缓存雪崩是不同数据都过期了，很多数据都查不到从而查数据库。
  - 解决方案
    - 缓存数据的过期时间设置随机，防止同一时间大量数据过期现象发生。
    - 如果缓存数据库是分布式部署，将热点数据均匀分布在不同的缓存数据库中。
    - 设置热点数据永远不过期。
- **缓存污染**（或者满了）

缓存污染问题说的是缓存中一些只会被访问一次或者几次的的数据，被访问完后，再也不会被访问到，但这部分数据依然留存在缓存中，消耗缓存空间。

缓存污染会随着数据的持续增加而逐渐显露，随着服务的不断运行，缓存中会存在大量的永远不会再次被访问的数据。缓存空间是有限的，如果缓存空间满了，再往缓存里写数据时就会有额外开销，影响Redis性能。这部分额外开销主要是指写的时候判断淘汰策略，根据淘汰策略去选择要淘汰的数据，然后进行删除操作。

## 5 Redis性能问题有哪些，如何分析定位解决?

举几个例子

- **看延迟** 60 秒内的最大响应延迟：

```bash
$ redis-cli -h 127.0.0.1 -p 6379 --intrinsic-latency 60
Max latency so far: 1 microseconds.
Max latency so far: 15 microseconds.
Max latency so far: 17 microseconds.
Max latency so far: 18 microseconds.
Max latency so far: 31 microseconds.
Max latency so far: 32 microseconds.
Max latency so far: 59 microseconds.
Max latency so far: 72 microseconds.
 
1428669267 total runs (avg latency: 0.0420 microseconds / 42.00 nanoseconds per run).
Worst run took 1429x longer than the average latency.
   
```

- **慢日志**（slowlog）

慢查询，就会导致后面的请求发生排队，对于客户端来说，响应延迟也会变长。

![image-20220628231317888](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220628231317888.png)

- **bigkey**

大对象

- **集中过期**

一般有两种方案来规避这个问题：

1. 集中过期 key 增加一个随机过期时间，把集中过期的时间打散，降低 Redis 清理过期 key 的压力
2. 如果你使用的 Redis 是 4.0 以上版本，可以开启 lazy-free 机制，当删除过期 key 时，把释放内存的操作放到后台线程中执行，避免阻塞主线程

- **fork耗时严重**

主进程创建子进程，会调用操作系统提供的 fork 函数

- **使用Swap**

当内存中的数据被换到磁盘上后，Redis 再访问这些数据时，就需要从磁盘上读取，访问磁盘的速度要比访问内存慢几百倍！

- **内存碎片**

Redis 4.0 版本，它正好提供了自动碎片整理的功能，可以通过配置开启碎片自动整理

