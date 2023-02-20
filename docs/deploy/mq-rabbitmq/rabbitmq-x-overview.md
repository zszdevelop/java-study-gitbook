---
order: 10
category:
  - RabbitMQ  
  - MQ
---

# RabbitMQ入门 - 开篇

## 1. 什么是消息队列

**消息**指的是两个应用间传递的数据。数据的类型有很多种形式，可能只包含文本字符串，也可能包含嵌入对象。

**“消息队列(Message Queue)”是在消息的传输过程中保存消息的容器**。在消息队列中，通常有生产者和消费者两个角色。生产者只负责发送数据到消息队列，谁从消息队列中取出数据处理，他不管。消费者只负责从消息队列中取出数据处理，他不管这是谁发送的数据。

![image-20220922195726878](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922195726878.png)

## 2. 为什么使用消息队列

主要有三个作用：

- **解耦**。如图所示。假设有系统B、C、D都需要系统A的数据，于是系统A调用三个方法发送数据到B、C、D。这时，系统D不需要了，那就需要在系统A把相关的代码删掉。假设这时有个新的系统E需要数据，这时系统A又要增加调用系统E的代码。为了降低这种强耦合，就可以使用MQ，**系统A只需要把数据发送到MQ，其他系统如果需要数据，则从MQ中获取即可**。

![image-20220922195842827](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922195842827.png)

- 异步。如图所示。一个客户端请求发送进来，系统A会调用系统B、C、D三个系统，同步请求的话，响应时间就是系统A、B、C、D的总和，也就是800ms。**如果使用MQ，系统A发送数据到MQ，然后就可以返回响应给客户端，不需要再等待系统B、C、D的响应，可以大大地提高性能**。对于一些非必要的业务，比如发送短信，发送邮件等等，就可以采用MQ。

![image-20220922200103149](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922200103149.png)

- 削峰。如图所示。这其实是MQ一个很重要的应用。假设系统A在某一段时间请求数暴增，有5000个请求发送过来，系统A这时就会发送5000条SQL进入MySQL进行执行，MySQL对于如此庞大的请求当然处理不过来，MySQL就会崩溃，导致系统瘫痪。**如果使用MQ，系统A不再是直接发送SQL到数据库，而是把数据发送到MQ，MQ短时间积压数据是可以接受的，然后由消费者每次拉取2000条进行处理，防止在请求峰值时期大量的请求直接发送到MySQL导致系统崩溃**。

![image-20220922200337872](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922200337872.png)

## 3. RabbitMQ 简介

RabbitMQ是一款使用Erlang语言开发的，实现AMQP(Advanced Message Queuing Protocol，高级消息队列协议)的开源消息中间件，最初起源于金融系统，用于在分布式系统中存储转发消息。

### 3.1 特点

- **可靠性**：支持持久化，传输确认，发布确认等保证了MQ的可靠性。
- **灵活的分发消息策略(路由)**：这应该是RabbitMQ的一大特点。在消息进入MQ前由Exchange(交换机)进行路由消息。分发消息策略有：简单模式、工作队列模式、发布订阅模式、路由模式、通配符模式。
- **支持集群**：多台RabbitMQ服务器可以组成一个集群，形成一个逻辑Broker。
- **多种协议**：RabbitMQ支持多种消息队列协议，比如 STOMP、MQTT 等等。
- **支持多种语言客户端**：RabbitMQ几乎支持所有常用编程语言，包括 Java、.NET、Ruby 等等。
- **可视化管理界面**：RabbitMQ提供了一个易用的用户界面，使得用户可以监控和管理消息 Broker。
- **插件机制**：RabbitMQ提供了许多插件，可以通过插件进行扩展，也可以编写自己的插件。

## 4. RabbitMQ中的组成部分 

- Broker：消息队列服务进程。此进程包括两个部分：Exchange和Queue。
- Exchange：消息队列交换机。**按一定的规则将消息路由转发到某个队列**。
- Queue：消息队列，存储消息的队列。
- Producer：消息生产者。生产方客户端将消息同交换机路由发送到队列中。
- Consumer：消息消费者。消费队列中存储的消息。

这些组成部分是如何协同工作的呢，大概的流程如下，请看下图：

![image-20220922203245154](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922203245154.png)

- 消息生产者连接到RabbitMQ Broker，创建connection，开启channel。
- 生产者声明交换机类型、名称、是否持久化等。
- 生产者发送消息，并指定消息是否持久化等属性和routing key。
- exchange收到消息之后，**根据routing key路由到跟当前交换机绑定的相匹配的队列**里面。
- 消费者监听接收到消息之后开始业务处理。

## 5. Exchange的四种类型以及用法

从上面的工作流程可以看出，实际上有个关键的组件Exchange，因为**消息发送到RabbitMQ后首先要经过Exchange路由才能找到对应的Queue**。

实际上Exchange类型有四种，根据不同的类型工作的方式也有所不同。在HelloWord例子中，我们就使用了比较简单的**Direct Exchange**，翻译就是直连交换机。其余三种分别是：**Fanout exchange、Topic exchange、Headers exchange**。

### 5.1 Direct Exchange(直连)

见文知意，直连交换机意思是此交换机需要绑定一个队列，要求**该消息与一个特定的路由键完全匹配**。简单点说就是一对一的，点对点的发送。

![image-20220922203746317](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922203746317.png)

### 5.2 Fanout exchange(发布订阅)

这种类型的交换机需要将队列绑定到交换机上。**一个发送到交换机的消息都会被转发到与该交换机绑定的所有队列上**。很像子网广播，每台子网内的主机都获得了一份复制的消息。简单点说就是发布订阅。

![image-20220922204506785](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922204506785.png)

### 5.3 Topic Exchange(通配符)

直接翻译的话叫做主题交换机，如果从用法上面翻译可能叫通配符交换机会更加贴切。这种交换机是使用通配符去匹配，路由到对应的队列。通配符有两种："*" 、 "#"。需要注意的是通配符前面必须要加上"."符号。

`*` 符号：有且只匹配一个词。比如 `a.*`可以匹配到"a.b"、"a.c"，但是匹配不了"a.b.c"。

`#` 符号：匹配一个或多个词。比如"rabbit.#"既可以匹配到"rabbit.a.b"、"rabbit.a"，也可以匹配到"rabbit.a.b.c"。

![image-20220922204704979](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922204704979.png)

比较常用的就是以上三种：直连(DirectExchange)，发布订阅(FanoutExchange)，通配符(TopicExchange)。熟练运用这三种交换机类型，基本上可以解决大部分的业务场景。

实际上稍微思考一下，可以发现通配符(TopicExchange)这种模式其实是可以达到直连(DirectExchange)和发布订阅(FanoutExchange)这两种的效果的。

FanoutExchange不需要绑定routingKey，所以性能相对TopicExchange会好一点。

### 5.4 Headers Exchange(请求头匹配，不推荐)

这种交换机用的相对没这么多。**它跟上面三种有点区别，它的路由不是用routingKey进行路由匹配，而是在匹配请求头中所带的键值进行路由**。如图所示：

![image-20220922204955736](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922204955736.png)

创建队列需要设置绑定的头部信息，有两种模式：**全部匹配和部分匹配**。如上图所示，交换机会根据生产者发送过来的头部信息携带的键值去匹配队列绑定的键值，路由到对应的队列。

## 6. 交换器无法根据自身类型和路由键找到符合条件队列时，有哪些处理？

mandatory ：true 返回消息给生产者。

mandatory: false 直接丢弃。

## 参考文章

[超详细的RabbitMQ入门，看这篇就够了！](https://developer.aliyun.com/article/769883)

[【RabbitMQ】五分鐘輕鬆了解 RabbitMQ 運作](https://medium.com/@zamhuang/rabbitmq-%E4%BA%94%E5%88%86%E9%90%98%E8%BC%95%E9%AC%86%E4%BA%86%E8%A7%A3-rabbitmq-%E9%81%8B%E4%BD%9C-fcaecbaa69d4)

[RabbitMQ系列（二）深入了解RabbitMQ工作原理及简单使用](https://www.cnblogs.com/vipstone/p/9275256.html)
