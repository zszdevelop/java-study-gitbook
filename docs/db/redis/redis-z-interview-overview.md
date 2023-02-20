---
order: 1010
category:
  - 数据库
  - Redis
---

# Redis面试 - redis问题总结

>Redis 面试会有哪些问题呢？或者学完整个体系，如何去用问题测试自己的理解呢？

## 1. 常规问题

- 什么是redis，为什么要使用它
- redis一般有哪些使用场景
- redis为什么快

## 2. 数据类型和数据结构

- redis有哪些数据类型
- redis数据类型有哪些命令
- 谈谈redis的对象机制（redisObject)
- redis数据类型有哪些底层数据结构
- 为什么要设计sds？
- 一个字符串类型的值能存储最大容量是多少？512M
- 为什么会设计Stream
- Stream用在什么样场景
- 消息ID的设计是否考虑了时间回拨的问题

## 3. 持久化和内存

- Redis 的持久化机制是什么？各自的优缺点？一般怎么用？

- Redis 过期键的删除策略有哪些

- Redis 内存淘汰算法有哪些

- Redis的内存用完了会发生什么？ 如果达到设置的上限，Redis的写命令会返回错误信息（但是读命令还可以正常返回。）或者你可以配置内存淘汰机制，当Redis达到内存上限时会冲刷掉旧的内容。

- Redis如何做内存优化？

- Redis key 的过期时间和永久有效分别怎么设置？

  EXPIRE 和 PERSIST 命令

- Redis 中的管道有什么用？

  一次请求/响应服务器能实现处理新的请求即使旧的请求还未被响应，这样就可以将多个命令发送到服务器，而不用等待回复，最后在一个步骤中读取该答复。

  这就是管道（pipelining），是一种几十年来广泛使用的技术。例如许多 POP3 协议已经实现支持这个功能，大大加快了从服务器下载新邮件的过程。

## 4. 事务

- 什么是redis事务
- Redis事务相关命令
- Redis事务的三个阶段
- watch是如何监视实现的呢
- 为什么 Redis 不支持回滚
- redis 对 ACID的支持性理解
- Redis事务其他实现

基于Lua脚本，Redis可以保证脚本内的命令一次性、按顺序地执行，其同时也不提供事务运行错误的回滚，执行过程中如果部分命令运行错误，剩下的命令还是会继续运行完

基于中间标记变量，通过另外的标记变量来标识事务是否执行完成，读取数据时先读取该标记变量判断是否事务执行完成。但这样会需要额外写代码实现，比较繁琐

## 5. 集群

### 5.1 主从复制

- Redis集群的主从复制模型是怎样的？
- 全量复制的三个阶段？
- 为什么会设计增量复制？
- 增量复制的流程？ 如果在网络断开期间，repl_backlog_size环形缓冲区写满之后，从库是会丢失掉那部分被覆盖掉的数据，还是直接进行全量复制呢？
- 为什么不持久化的主服务器自动重启非常危险呢?
- 为什么主从全量复制使用RDB而不使用AOF？
- 为什么还有无磁盘复制模式？
- 为什么还会有从库的从库的设计？

### 5.2 哨兵机制

- Redis哨兵机制？哨兵实现了什么功能呢
- 哨兵集群是通过什么方式组建的？
- 哨兵是如何监控Redis集群的？
- 哨兵如何判断主库已经下线了呢？
- 哨兵的选举机制是什么样的？
- Redis 1主4从，5个哨兵，哨兵配置quorum为2，如果3个哨兵故障，当主库宕机时，哨兵能否判断主库“客观下线”？能否自动切换？
- 主库判定客观下线了，那么如何从剩余的从库中选择一个新的主库呢？
- 新的主库选择出来后，如何进行故障的转移？

### 5.3 Redis集群

- 说说Redis哈希槽的概念？为什么是16384个？
- Redis集群会有写操作丢失吗？为什么？

Redis并不能保证数据的强一致性，这意味这在实际中集群在特定的条件下可能会丢失写操作。

## 6. 应用场景

- redis 客户端有哪些

  Redisson、Jedis、lettuce等等，官方推荐使用Redisson。

  Redisson是一个高级的分布式协调Redis客户端，能帮助用户在分布式环境中轻松实现一些Java的对象 (Bloom filter, BitSet, Set, SetMultimap, ScoredSortedSet, SortedSet, Map, ConcurrentMap, List, ListMultimap, Queue, BlockingQueue, Deque, BlockingDeque, Semaphore, Lock, ReadWriteLock, AtomicLong, CountDownLatch, Publish / Subscribe, HyperLogLog)。

- Redis如何做大量数据插入？ Redis2.6开始redis-cli支持一种新的被称之为pipe mode的新模式用于执行大量数据插入工作。
- redis实现分布式锁实现? 什么是 RedLock?
- redis缓存有哪些问题，如何解决
- redis和其它数据库一致性问题如何解决
- redis性能问题有哪些，如何分析定位解决

## 7. 新版本

- Redis单线程模型？ 在6.0之前如何提高多核CPU的利用率？

  可以在同一个服务器部署多个Redis的实例，并把他们当作不同的服务器来使用，在某些时候，无论如何一个服务器是不够的， 所以，如果你想使用多个CPU，你可以考虑一下分片（shard）。

- 6.0版本中多线程

## 参考文章

[**Redis面试 - redis问题总结**](https://pdai.tech/md/db/nosql-redis/db-redis-z-mianshi.html)