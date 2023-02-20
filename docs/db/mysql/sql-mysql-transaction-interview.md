---
order: 41
category:
  - 数据库
  - Mysql

---

# MySQL - 事务（面试场景切入）

![image-20221015100314961](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221015100314961.png)

## 1. 事务的特性

**面试官：** 看你简历上面写着精通MySQL，我先问你事务的特性是什么？

> 老生常谈，这个还有谁不会背的吗？

**我：** 这个我知道，事务有四大特性，分别是原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability），简称ACID。

- **原子性**是指事务中所有操作要么全部成功，要么全部失败。
- **一致性**是指事务执行前后，数据始终处于一致性状态，不会出现数据丢失。
- **隔离性**是指事务提交前的中间状态对其他事务不可见，即相互隔离。
- **持久性**是指事务提交后，数据的修改永久保存在数据库中。

## 2. Mysql怎么实现事务？

**面试官：** 嗯，回答得不错。那你知道MySQL底层是怎么实现事务的四大特性？

> 这道题有点深了，需要背会redo log、undo log、mvcc。
> 千万别说不知道这几个东西是干嘛用的。
> 不但要知道，还要跟事务扯上关系。

**我：** 原子性是undo log实现的，一致性是由代码逻辑层面保证的，隔离性是由mvcc实现的，持久性是基于redo log实现的。

### 2.1 **Redo Log（重做日志）**

Redo Log记录的是物理日志，也就是磁盘数据的修改。 用来保证服务崩溃后，仍能把事务中变更的数据持久化到磁盘上。

如果没有Redo Log的话，会发生什么？

修改数据的过程就变成这样了：

1. 从磁盘加载数据到内存
2. 在内存中修改数据
3. 把新数据持久化到磁盘

![image-20221015094002165](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221015094002165.png)

这样做，会有严重的性能问题。

1. InnoDB在磁盘中存储的基本单元是页，可能本次修改只变更一页中几个字节，但是需要刷新整页的数据，就很浪费资源。
2. 一个事务可能修改了多页中的数据，页之间又是不连续的，就会产生随机IO，性能更差。

所以为了提高写入性能，于是就引入了Redo Log。

看一下引入Redo Log后修改流程：

1. 从磁盘加载数据到内存
2. 在内存中修改数据
3. 把新数据写到**Redo Log Buffer**中
4. 把**Redo Log Buffer**中数据持久化到**Redo Log**文件中
5. 把**Redo Log**文件中数据持久化到数据库磁盘中

![image-20221015094221790](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221015094221790.png)

### 2.2 **Undo Log（回滚日志）：**

Undo Log记录的是逻辑日志，用来回滚事务时，恢复到修改前的数据。

比如：当我们执行一条insert语句时，Undo Log就记录一条相反的delete语句。

加入Undo Log之后的修改流程就是这样的：

![image-20221015094600542](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221015094600542.png)

### 2.3 **MVCC（多版本并发控制，Multi-Version Concurrency Control）：**

记录的是某个时间点上的数据快照，用来实现不同事务之间数据的隔离性。

提到隔离性，一定要说一下事务的隔离级别。

说事务隔离级别之前，必须要先说一下并发事务产生的问题：

- **脏读：** 一个事务读到其他事务未提交的数据。
- **不可重复读：** 多次读取相同的数据，得到的结果集不一致，即读到其他事务提交后的数据。
- **幻读：** 相同的查询条件，多次读取的结果不一致，即读到其他事务提交后的数据。
- **不可重复读与幻读的区别是：** 不可重复读是读到了其他事务执行update、delete后的数据，而幻读是读到其他事务执行insert后的数据。

**隔离级别**

- **Read UnCommitted（读未提交）：** 读到其他事务未提交的数据，会出现脏读、不可重复读、幻读。
- **Read Committed（读已提交）：** 读到其他事务已提交的数据，解决了脏读，会出现不可重复读、幻读。
- **Repeatable Read（可重复读）：** 相同的数据，多次读取到的结果集一致。解决了不可重复读，还是会出现幻读。
- **Serializable（串行化）：** 所有事务串行执行，解决了幻读。

**再谈MVCC：**

MVCC解决了读写冲突，实现了读写并行，提升了事务的性能。

由于Read UnCommitted隔离级别下，每次都读取最新的数据。而Serializable隔离级别下，对所有读取数据都加锁。这两种隔离级不需要MVCC，所以MVCC只在Read Committed和Repeatable Read两种隔离级别下起作用。

MVCC的实现方式通过两个隐藏列trx_id（最近一次提交事务的ID）和roll_pointer（上个版本的地址），建立一个版本链。并在事务中读取的时候生成一个ReadView（读视图），在Read Committed隔离级别下，每次读取都会生成一个读视图，而在Repeatable Read隔离级别下，只会在第一次读取时生成一个读视图。

![image-20221015100152621](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221015100152621.png)

**InnoDB如何解决幻读的？**

先普及一下快照读和当前读。

- **当前读：** 读取数据的最新版本，并对数据进行加锁。
  例如：insert、update、delete、select for update
- **快照读：** 读取数据的历史版本，不对数据加锁。
  例如：select

在当前读的情况下，是通过加锁来解决幻读。

在快照读的情况下，是通过MVCC来解决幻读。

## 3. 总结

![image-20221015100314961](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221015100314961.png)

## 参考文章

[面试官竟然问我MySQL事务的底层原理？幸亏我总结了全套八股文](https://zhuanlan.zhihu.com/p/515386351)