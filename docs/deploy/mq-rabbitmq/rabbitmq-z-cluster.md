---
order: 500
category:
  - RabbitMQ  
  - MQ


---

# RabbitMQ集群 - 集群搭建

## 1. 简介

单机问题就是不能高可用，吞吐量有瓶颈、存储有瓶颈。搭建集群才能解决这些

但是 RabbitMQ 集群不能保证消息的万无一失，当集群中一个 RabbitMQ 节点崩溃时，该节点上的所有队列中的消息也会丢失。RabbitMQ 集群中的所有节点都会备份所有的元数据信息，包括以下内容：

- 队列元数据：队列名称和属性
- 交换器元数据：交换器名称和属性
- 绑定关系元数据：交换器与队列或交换器与交换器之间的绑定关系
- vhost 元数据：为 vhost 内的队列、交换器和绑定提供命名空间及安全属性

但是不会备份消息（可以通过特殊的镜像队列解决这个问题）。

基于存储空间和性能的考虑， 在 RabbitMQ 集群中 **创建队列**，集群只会在 **单个节点** 上创建队列的进程并包含完整的队列信息（元数据、状态、内容），这样只有 **队列的宿主节点 **知道队列的所有信息，**其他节点只知道队列的元数据** 和 **指向该队列存在的那个节点的指针**。因此当集群节点崩溃时，该节点的队列进程和关联的绑定都会消失。订阅这个队列的上的消费者也会丢失所订阅的信息，并且任何匹配该队列绑定信息的新消息也会消失。

**交换器** 其实只是一个名称和绑定列表，当消息发布到交换器时，实际上是由 **所连接的信道** 将 **消息上的路由键同交换器的绑定列表进行比较**，然后再路由消息。当创建一个新的交换器时，RabbitMQ 要做的是 **将绑定列表添加到集群中的所有节点上**，这样，每个节点的每条信道都可以访问到新的交换器了

## 2. 多机多节点配置

每台机器上部署一个 RabbitMQ，组成的 RabbitMQ 集群。

由于 RabbitMQ 集群对延迟非常敏感，需要在局域网中组成集群，广域网集群可以使用 Federation 或则 Shovel 来代替。

### 2.1 部署节规划：

| 名称  | ip          |
| ----- | ----------- |
| node1 | 192.168.0.2 |
| node2 | 192.168.0.3 |
| node3 | 192.168.0.4 |

在三台机器上安装好 RabbitMQ。然后修改各个节点的 `/etc/hosts` 文件

```bash
# 让机器之间通过 hostname 访问
vim /etc/hosts

192.168.110.10 node1
192.168.110.12 node2
192.168.110.13 node3

# 设置每台机器的 hostname，用 hostname 命令
hostnamectl  set-hostname node1

# 配置每个节点上的 nodename，内容配置为上面设置的 hostname
/opt/rabbitmq/etc/rabbitmq/rabbitmq-env.conf
# 内容为对应的 hostname
NODENAME=rabbit@node1

# 修改完成之后，重启机器让 hostname 生效

```

编辑 RabbitMQ 的 cookie 文件，**确保各个节点的 cookie 文件使用的是同一个值**。

```bash
# cookie 文件默认路径在：/var/lib/rabbitmq/.erlang.cookie
# 或则在： $HOME/.erlang.cookie
[root@study ~]# vim /root/.erlang.cookie
TGPVCOQIXBHWWDHUCJGP
# 可以用其中的一台上面的 cookie 复制到其他节点上
```

cookie 相当于密匙令牌，所以要一致。

### 2.2 配置集群

可以通过：

- rabbitmqctl ：常用，本节讲解这种
- rabbitmq.config 配置文件

```bash
# 先启动三个节点的 RabbitMQ 服务
rabbitmq-server -detached

# 目前这三个节点都是独立的单节点集群
# 可以查看他们的集群状态信息
[root@study rabbitmq]# rabbitmqctl cluster_status
Cluster status of node node1@node1
[{nodes,[{disc,[node1@node1]}]},
 {running_nodes,[node1@node1]},
 {cluster_name,<<"node1@node1">>},
 {partitions,[]},
 {alarms,[{node1@node1,[]}]}]


# 然后以 node1 为基准，将其他两个节点加入到 node1 节点的集群中
# 加入要执行以下命令，在其他两个节点上执行
# 0. 要先打开每台机器上的 4369 端口，加入集群需要访问这个端口
firewall-cmd --zone=public --add-port=4369/tcp --permanent
firewall-cmd --zone=public --add-port=25672/tcp --permanent
firewall-cmd --reload

# 1. 停止 rabbitmq 应用
rabbitmqctl stop_app
# 2. 重置
rabbitmqctl reset
# 3. 加入集群
[root@node2 ~]# rabbitmqctl join_cluster rabbit@node1
Clustering node rabbit@node2 with rabbit@node1
# 3. 启动 rabbitmq 应用
rabbitmqctl start_app

# 再次查看集群状态
[root@node1 ~]# rabbitmqctl cluster_status
Cluster status of node rabbit@node1
[{nodes,[{disc,[rabbit@node1,rabbit@node2,rabbit@node3]}]},
 {running_nodes,[rabbit@node2,rabbit@node3,rabbit@node1]},
 {cluster_name,<<"rabbit@node1">>},
 {partitions,[]},
 {alarms,[{rabbit@node2,[]},{rabbit@node3,[]},{rabbit@node1,[]}]}]
 # 发现已经加入进来了
```

### 2.3 闭集群

```bash
# 关闭 node2 节点的应用
[root@node2 ~]# rabbitmqctl stop_app
Stopping rabbit application on node rabbit@node2

# 然后查看集群状态
# 会看到 running_nodes 中的确少了一个
[root@node1 ~]# rabbitmqctl cluster_status
Cluster status of node rabbit@node1
[{nodes,[{disc,[rabbit@node1,rabbit@node2,rabbit@node3]}]},
 {running_nodes,[rabbit@node3,rabbit@node1]},
 {cluster_name,<<"rabbit@node1">>},
 {partitions,[]},
 {alarms,[{rabbit@node3,[]},{rabbit@node1,[]}]}]
```

如果关闭了集群中的所有节点，则需要确保 **最后关闭的那个节点是第一个启动** 的，如果不是最后关闭的节点被第一个启动，该节点会默认等待 30 秒（新版有重试机制，时间另算），等待最后一个节点的启动，等待不到，则自己启动失败。

如果因为最后一个节点启动不了，可以参考前一章节的集群管理命令，将这个节点踢出去，选择其他的节点启动。（也可以本章下一小节的内容）

## 3. 集群节点类型

查看集群状态信息时，会看到 `{nodes,[{disc,[rabbit@node1,rabbit@node2,rabbit@node3]}` 的信息。其中 **disc** 就是 RabbitMQ 节点的类型。有两种类型：

- disc：磁盘节点

  元数据保存在磁盘上

- ram：内存节点

  将所有的 队列、交换器、绑定关系、用户、权限和 vhost 的 **元数据** 都存储在内存中。

单节点的集群中，只能有磁盘类型的节点，否则重启 RabbitMQ 后，所有系统配置信息都会丢失。在集群节点中，可以选择配置部分节点为内存节点，可以获得更好的信息。

比如将 node2 加入节点时指定为内存节点

```bash
# 加入节点时指定 --ram 参数
[root@node2 ~]# rabbitmqctl join_cluster rabbit@node1 --ram
Clustering node rabbit@node2 with rabbit@node1

# 如果已经加入了集群，则可以更改节点类型
rabbitmqctl change_cluster_node_type {disc,ram}

[root@node1 ~]# rabbitmqctl cluster_status
Cluster status of node rabbit@node1
[{nodes,[{disc,[rabbit@node1,rabbit@node3]},{ram,[rabbit@node2]}]},
 {running_nodes,[rabbit@node3,rabbit@node1]},
 {cluster_name,<<"rabbit@node1">>},
 {partitions,[]},
 {alarms,[{rabbit@node3,[]},{rabbit@node1,[]}]}]
```

在集群中创建队列、交换器或则绑定关系时，这些操作直到 **所有集群节点都成功提交元数据变更后才会返回**，这就意味着磁盘节点会耗费更多的时间，而内存节点将耗费更少的时间。

- 内存节点：提供出色的性能
- 磁盘节点：能保证集群配置信息的高可靠性

RabbitMQ· 只要求在 **集群中至少有一个磁盘节点**，当节点加入或则离开集群时，他们必须将变更通知到至少一个磁盘节点。如果 **只有一个磁盘节点**，该节点 **崩溃** 的话，那么 **将不能执行创建队列、交换器、绑定关系、用户、更改权限、添加或删除集群节点的操作了**，但是可以继续收发信息。

内存节点重启后，会连接到预先配置的磁盘节点，下载当前集群元数据的副本。当在集群中添加内存节点时，确保告知其所有的磁盘节点（**内存节点唯一存储到磁盘的元数据信息是集群中磁盘节点的地址**），只要内存节点可以找到至少一个磁盘节点，那么它在重启后，就能重新加入集群

### 3.1 如何选择磁盘节点类型？

如上所述，再看场景：只有在使用 RPC 功能时，创建队列、交换器绑定关系等的操作会很频繁，其他的场景都不频繁，所以建议都使用磁盘节点类型

## 4. 剔除单个节点

剔除单个节点有两种方式

### 4.1 适合不再运行 RabbitMQ 应用

当一个节点不再运行 RabbitMQ 应用时，可以使用如下命令。比如将 node2 剔除

```bash
# 关闭 node2  
[root@node2 ~]# rabbitmqctl stop_app

# 在其他节点上将 node2 踢出去
[root@node1 ~]# rabbitmqctl forget_cluster_node rabbit@node2
Removing node rabbit@node2 from cluster
```

这种操作方式之后， node2 节点就无法运行起来了。

这本书讲的太乱了。完全才堆砌功能，也不说场景？感觉特别乱

下面的由于无法前面强制剔除了 node2， node2 无法启动了，下面的实验也无法做下去了，只记录

前面提到过，当关闭集群最后一个节点，该节点无法启动时，可以通过 forget_cluster_node 命令将此节点剔除当前集群。比如，集群按照 node3、node2、node1 的顺序关闭，如果要启动集群，就要先启动 node1 节点。

```bash
# 按顺序关闭节点
[root@node3 ~]# rabbitmqctl stop
[root@node2 ~]# rabbitmqctl stop
[root@node3 ~]# rabbitmqctl stop

# 如果由于 node1 节点启动不起来了。
# 可以在 node2 上剔除 node1 节点
# 这里使用  -offline 是离线模式，由于 node2 启动不起来
[root@node2 ~]# rabbitmqctl forget_cluster_node rabbit@node1 -offline
# 然后启动
[root@node2 ~]# rabbitmq-server -detached
```

### 4.2 第二种方式

就是在能启动的情况下，哪个节点要退出，就使用 reset 命令

```bash
[root@node2 ~]# rabbitmqctl stop_app
[root@node2 ~]# rabbitmqctl reset
[root@node2 ~]# rabbitmqctl start_app
```

## 参考文章

[集群搭建](https://zq99299.github.io/mq-tutorial/rabbitmq-ac/07/01.html)