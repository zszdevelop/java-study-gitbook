---
order: 40
category:
  - RabbitMQ  
  - MQ
---

# RabbitMQ进阶 - 过期时间TTL

Time to Live 简称 TTL，即过期时间。RabbitMQ 可以对 **消息** 和 **队列** 设置 TTL。

## 1. 设置消息的 TTL

- 通过队列设置：队列中的消息都有相同的过期时间
- 对消息本身设置：每条消息的 TTL 可以不同

如果两种一起设置，则以最小的 TTL 生效。

消息在队列中生存时间一旦超过 TTL，就会变成「死信（Dead Message）」，消费者将无法收到该消息。（具体细节后续章节讲解）

### 1.1 在队列上设置

定义队列时，通过参数 `x-message-ttl` 设置，单位是 **毫秒**

```java
final HashMap<String, Object> arguments = new HashMap<>();
arguments.put("x-message-ttl", 6000);
channel.queueDeclare(QUEUE_NAME, true, false, false, arguments);
```

TTL 值得几种情况：

- 值为 0 ：表示，除非此时可以直接将消息投递到消费者，否则该消息被立即丢弃
- 大于 0：将在该时间内过期，

### 1.2 在消息设置

通过 BasicProperties 来设置 expiration 属性：

```java
final AMQP.BasicProperties.Builder builder = new AMQP.BasicProperties().builder();
builder.deliveryMode(2); // 持久化消息
builder.expiration("60000");  //设置消息的 ttl
channel.basicPublish(EXCHANGE_NAME,
                     "",
                     true,
                     builder.build(),
                     "mandatory test".getBytes()
                    );
```

此种方式当超过 TTL 时，并不会立即从队列中抹去，而是在投递消费者时判定的。而在队列上一旦过期，则立即从队列中抹去。

这是因为内部实现的原因导致的：

- 队列中已过期的消息肯定在队列头部，只要定期从队头开始扫描是否有过期的消息即可
- 在消息中设置的过期，需要扫描整个队列。

>因为第一种方法里，队列中已过期的消息肯定在队列头部，RabbitMQ只要定期从队头开始扫描是否有过期消息即可，而第二种方法里，每条消息的过期时间不同，如果要删除所有过期消息，势必要扫描整个队列，所以不如等到此消息即将被消费时再判定是否过期，如果过期，再进行删除。

## 2. 设置队列的 TTL

>注意这是队列TTL，上面两个都是消息TTL,只是1.1 的是在队列中设置消息ttl

定义队列时间，通过参数 `x-expires` 参数，单位为毫秒

```java
final HashMap<String, Object> arguments = new HashMap<>();
// 该参数必须大于 0，要么就不设置
arguments.put("x-expires", 6000);
channel.queueDeclare(QUEUE_NAME, true, false, false, arguments);
channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
```

队列的 TTL 其实就是在声明：当队列空闲多久时，被自动删除。

**空闲多久指的是**：队列上没有任何消费者、也没有被重新声明、并且在过期时间内也未调用过 Basic.Get 命令

适合使用的场景：可以应用在类似 RPC 方式的回复队列，在 RPC 中，许多队列会被创建出来，但是未被使用。

## 参考文章

[过期时间 TTL](https://zq99299.github.io/mq-tutorial/rabbitmq-ac/04/02.html)

[RabbitMQ之TTL（Time-To-Live 过期时间）](https://hiddenpps.blog.csdn.net/article/details/54916011)

[RabbitMQ高级特性-TTL队列/消息](https://juejin.cn/post/6844904002996404231)

