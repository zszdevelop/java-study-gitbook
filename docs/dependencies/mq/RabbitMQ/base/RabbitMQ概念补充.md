# RabbitMQ概念补充

## 1. 消息持久化

**Rabbit队列和交换器默认情况下重启服务器会导致消息丢失**，那么怎么保证Rabbit在重启的时候不丢失呢？答案就是消息持久化。

### 1.1 持久化条件

当你把消息发送到Rabbit服务器的时候，你需要选择你是否要进行持久化，但这并不能保证Rabbit能从崩溃中恢复，想要Rabbit消息能恢复必须满足3个条件：

1. 投递消息的时候durable设置为true，消息持久化，代码：channel.queueDeclare(x, true, false, false, null)，参数2设置为true持久化；
2. 设置投递模式deliveryMode设置为2（持久），代码：channel.basicPublish(x, x, MessageProperties.PERSISTENT_TEXT_PLAIN,x)，参数3设置为存储纯文本到磁盘；
3. 消息已经到达持久化交换器上；
4. 消息已经到达持久化的队列；

### 1.2 持久化工作原理

Rabbit会将你的持久化消息写入磁盘上的持久化日志文件，等消息被消费之后，Rabbit会把这条消息标识为等待垃圾回收。

### 1.3 持久化的缺点

消息持久化的优点显而易见，但缺点也很明显，那就是性能，因为要写入硬盘要比写入内存性能较低很多，从而降低了服务器的吞吐量，尽管使用SSD硬盘可以使事情得到缓解，但他仍然吸干了Rabbit的性能，当消息成千上万条要写入磁盘的时候，性能是很低的。

所以使用者要根据自己的情况，选择适合自己的方式。

## 2. 虚拟主机

每个Rabbit都能创建很多vhost，我们称之为虚拟主机，**每个虚拟主机其实都是mini版的RabbitMQ，拥有自己的队列，交换器和绑定，拥有自己的权限机制**。

### 2.1 vhost特性

1. RabbitMQ默认的vhost是“/”开箱即用；
2. 多个vhost是隔离的，多个vhost无法通讯，并且不用担心命名冲突（队列和交换器和绑定），实现了多层分离；
3. 创建用户的时候必须指定vhost；

### 2.2 vhost操作

可以通过rabbitmqctl工具命令创建：

> rabbitmqctl add_vhost[vhost_name]

删除vhost：

> rabbitmqctl delete_vhost[vhost_name]

查看所有的vhost：

> rabbitmqctl list_vhosts

## 参考文章

[RabbitMQ系列（二）深入了解RabbitMQ工作原理及简单使用](https://www.cnblogs.com/vipstone/p/9275256.html)

