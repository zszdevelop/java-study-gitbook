# Redis的主从同步

## 1. 主从同步

和MySQL主从复制的原因一样，Redis虽然读取写入的速度都特别快，但是也会产生读压力特别大的情况。为了分担读压力，Redis支持主从复制，Redis的主从结构可以采用一主多从或者级联结构，下图为级联结构。

![image-20210411205126388](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210411205126388.png)



## 2. 同步机制

Redis主从复制可以根据是否是全量分为全量同步和增量同步。

- 全量同步：Redis全量复制一般发生在Slave初始化阶段，这时Slave需要将Master上的所有数据都复制一份
- 增量同步：redis运行过程中的修改同步

### 2.1 全量同步过程

1. salve 发送sync命令到master
2. master收到这条指令后，会执行BGSAVE命令启动一个备份进程，将所有数据写到rdb文件中去
3. master将保存数据快照期间接收到的写命令缓存起来
4. master完成写文件操作后，将该文件发送给salve
5. 使用新的AOF文件替换掉旧的AOF文件
6. Master将这期间收集的增量写命令发送到salve端

### 2.2 增量同步过程

1. Master接收到用户的操作命令，判断是否需要传播到Slave
2. 如果需要同步，则将操作记录到AOF文件
3. 遍历所有的slave，将操作的指令和参数写入到slave的缓存中
4. 将缓存中的数据发送给Slave

## 3. 主从模式弊端（哨兵模式）

master挂掉之后，就不能进行写操作

Redis 主从复制有一个很大的缺点就是没有办法对 master 进行动态选举（当 master 挂掉后，会通过一定的机制，从 slave 中选举出一个新的 master），需要使用 Sentinel 机制完成动态选举

#### 2.2.1 哨兵进程的作用

- 监控：检查主从服务器是否运行正常
- 提醒：通过API向管理员或者其他应用程序发送故障通知
- 自动故障迁移：主从切换

## 参考文章

[Redis主从同步原理-SYNC](https://blog.csdn.net/sk199048/article/details/50725369)