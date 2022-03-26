# Redis集群原理

## 1. 为什么需要redis集群

### 1.1 redis 单实例架构演变

Redis单实例的架构，从最开始的一主N从，到读写分离，再到Sentinel哨兵机制

单实例的Redis缓存足以应对大多数的使用场景，也能实现主从故障迁移。

![image-20210411214759101](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411214759101.png)

### 1.2 单实例存Redis缓存存在的问题

1. 写并发：

   Redis单实例读写分离可以解决读操作的负载均衡，但对于写操作，仍然是全部落在了master节点上面，在海量数据高并发场景，一个节点写数据容易出现瓶颈，造成master节点的压力上升。

2. 海量数据的存储压力：

   单实例Redis本质上只有一台Master作为存储，如果面对海量数据的存储，一台Redis的服务器就应付不过来了，而且数据量太大意味着持久化成本高，严重时可能会阻塞服务器，造成服务请求成功率下降，降低服务的稳定性。

针对以上的问题，Redis集群提供了较为完善的方案，解决了存储能力受到单机限制，写操作无法负载均衡的问题。

## 2. 如何从海量数据里快速找到所需

- 分片：按照某种规则去划分数据，分散存储在多个节点上
- 常规的按照哈希划分无法实现节点的动态增减

### 2.1 分片方式1：hash

我们获取key 的hash值，然后根据节点数来求模。

弊端：动态增加或减少的时候。会造成大量的key无法被命中

### 2.2 分片方式2：hash环

将数据key 使用相同函数hash计算出哈希值

![image-20210411215650367](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411215650367.png)

增加或减少只需要定位环中的一小部分数据，有比较好的容错性和扩展性

#### 2.2.1 数据倾斜问题

如果节点数量少，那么就有可能都落在某一节点上

![image-20210411215952708](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411215952708.png)

### 2.3 分片方式3：hash环引入虚拟节点

![image-20210411220038505](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210411220038505.png)

添加虚拟节点；将数量少的节点划分成多个虚拟节点。让数据均匀分布

>实际业务中会将虚拟节点设置成32，甚至更大



