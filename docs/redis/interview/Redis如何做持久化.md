# Redis持久化

## 1. 简介

redis将数据存在内存中，我们要怎么保证redis挂掉之后再重启数据可以进行恢复呢？

这时候就需要数据持久化。redis支持以下两种持久化

- RDB(快照)持久化：保存某个时间点的全量数据快照
- AOF(Append-Only-File)持久化：保存写状态

## 2. RDB(快照)持久化

保存某个时间点的全量数据快照

- 优点：
  - 全量数据快照，文件小，恢复快
- 缺点
  - 内存数据的全量同步，数据量大会由于I/O 而严重影响性能
  - 可能会因为Redis挂掉而丢失从当前至最近一次快照期间的数据

### 2.1 RDB配置

#### 2.1.1 save配置

![image-20210411114052591](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411114052591.png)

- save 900 1          

   #在900秒(15分钟)之后，如果至少有1个key发生变化，Redis就会自动触发BGSAVE命令创建快照。

- save 300 10        

   #在300秒(5分钟)之后，如果至少有10个key发生变化，Redis就会自动触发BGSAVE命令创建快照。

- save 60 10000       

  #在60秒(1分钟)之后，如果至少有10000个key发生变化，Redis就会自动触发BGSAVE命令创建快照。

#### 2.1.2 stop-writes-ob-bgsave-error 配置

![image-20210411114416349](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411114416349.png)

设置为yes：当备份进程出错的时候，就不新写入数据了

#### 2.1.3 rbd压缩配置

![image-20210411114539673](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411114539673.png)

设置成yes：压缩

建议设置成no。redis本来就属于cpu密集操作，压缩会带来更大的cpu消耗，相比硬盘成本cpu更值钱

#### 2.1.4 如何禁用rdb配置

![image-20210411114757555](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411114757555.png)

给save设置空值

### 2.2 RDB文件

redis 会定期生成dump.rdb文件

![image-20210411115003197](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411115003197.png)

我们打开可以发现是一堆看不懂的乱码

![image-20210411115123958](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411115123958.png)

也就表明dump.rdb 是二进制文件

### 2.3 RDB 持久化方式

- SAVE: 阻塞Redis的服务进程，知道RDB文件被创建完成
- **BGSAVE: Fork 出一个子进程来创建RDB文件，不阻塞服务器进程**

#### 2.3.1 SAVE(很少用)

 SAVE 因为会阻塞主线程，很少被操作，

##### 2.3.1.1 示例

- 备份

  ![image-20210411120115269](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411120115269.png)

  执行save后会卡着一段时间，直到备份完成

- lastsave：查看最后备份时间

![image-20210411120242935](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411120242935.png)

- 定时备份：

  我们可以用java定时器来定时备份，并将dump文件改名

  ![image-20210411120407537](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411120407537.png)

#### 2.3.2 BGSAVE(常用)

该方法会fork出子进程，真正的持久化过程是在子进程中执行的，主进程会继续提供服务；

##### 2.3.2.1 原理

![image-20210411121020117](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411121020117.png)

### 2.4 自动触发RDB持久化的方式

- 根据redis.conf 配置里的SAVE m n 定时触发（用的是BGSAVE）
- 主从复制时，主节点自动触发
- 执行Debug Reload
- 执行Shutdown且没有开启AOF持久化

## 3.AOF(Append-Only-File)持久化：保存写状态

- 记录下除了查询以外的所有变更数据状态的指令
- 以append的形式追加保存到AOF文件中（增量）

优点：

- 可读性高，适合保存增量数据，数据不易丢失

缺点：

- 文件体积大，恢复时间长

### 3.1 AOF 配置

#### 3.1.1 AOF 启动状态

AOF 默认是关闭的

![image-20210411150040293](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411150040293.png)

#### 3.1.2 AOF 生成的文件名

![image-20210411150146946](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411150146946.png)

#### 3.1.3 aof的写入方式

![image-20210411150239597](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411150239597.png)

- always：表示缓存区方式变化，总是及时将内容写入aof中

- everyses： 每隔一秒去写入

- No: 交给操作系统来决定

### 3.2 AOF 开启

1. 开启

   ```
   appendonly yes
   ```

2. 开启后需要重新启动redis 服务器

   在客户端执行shutdown 的时候，服务端可以看到发送了shutdown指令和发送save指令

   ![image-20210411152635369](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411152635369.png)


3. 配置

   ```
   config set appendonly yes
   ```

4. 添加测试数据

   ```
   set aoftest "hahah"
   exit
   ```

5. 添加后可以看到appendonly.aof文件

   ![image-20210411153459664](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411153459664.png)

### 3.3 日志重写：解决AOF 文件大小不断增大问题

- 调用fork（），创建一个子进程
- 子进程把新的AOF写到一个临时文件里，不依赖原来的AOF文件
- 主进程持续将新的变动同时写到内存和原来的AOF里
- 主进程获取子进程重写AOF的完成信号，往新AOF同步增量变动
- 使用新的AOF文件替换掉旧的AOF文件

## 4. RDB和AOF文件共存的情况下回复流程

![image-20210411154143065](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411154143065.png)

- 存在AOF 文件，则执行AOF
- 不存在AOF则恢复RDB

## 5. RDB对比

| 方式 | 优点                                     | 缺点                           |
| ---- | ---------------------------------------- | ------------------------------ |
| RDB  | 全量数据快照，文件小，恢复快             | 无法保存最近一次快照之后的数据 |
| AOF  | 可读性高，适合保存增量数据，数据不易丢失 | 文件体积大，恢复时间长         |

有没有一种结合两种优点的模式呢？既使用rdb全量备份，aof来增量备份。这就是混合模式，现在已经作为redis 的默认配置

## 6. RDB-AOF混合持久化方式

![image-20210411154937324](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411154937324.png)

- BGSAVE 做镜像全量持久化
- AOF 做增量持久化
