# Redis如何实现异步队列

## 1. 使用过redis 做异步队列吗？你是怎么用的

使用List作为队列，RPUSH生产消息，LPOP消费消息

>当 lpop 没有消息的时候，要适当 sleep 一会再重试。不但客户端的 CPU 能降下来，Redis 的 QPS 也降下来了。

### 1.1 操作实例

![image-20210410232817945](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210410232817945.png)

缺点：没有等待队列里有值就直接消费

弥补：可以通过应用层引入Sleep机制去调用LPOP重试

## 2 可不可以不用sleep？BLPOP

用 blpop/brpop 替代前面的 lpop/rpop，list 还有个指令叫 blpop阻塞读在队列没有数据的时候，会立即进入休眠状态，一旦数据到来，则立刻醒过来。消息的延迟几乎为零。

- 语法：
  - BLPOP key [key ...] timeout :阻塞知道队列有消息或者超时
- 缺点：
  - 只能提供一个消费者消费

## 3. 能不能生产一次，消费多次

使用 pub/sub 主题订阅者模式，可以实现1:N 的消息队列。

## 4. pub/sub: 主题订阅者模式

- 发送者(pub) 发送消息，订阅者（sub）接收消息
- 订阅者可以订阅任何数量的频道

![image-20210410233222497](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210410233222497.png)

### 4.1 面临问题：

- 在消费者下线的情况下，生产的消息会丢失

  消息的发布是无状态的，无法保证可达,若订阅者在发送者发布消息期间下线，之后我们再上线将无法接受到刚才发送的消息，

- 解决办法
  - 得使用专业的消息队列如 RabbitMQ等
  - Redis5.0 新增了 Stream 数据结构，这个功能给 Redis 带来了持久化消息队列。

## 参考文章

[面试题：使用过 Redis 做异步队列么，你是怎么用的？](https://www.cnblogs.com/dalianpai/p/14333404.html)