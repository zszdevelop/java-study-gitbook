---
order: 110
category:
  - RabbitMQ  
  - MQ
---

# RabbitMQ进阶 - 消费端要点介绍

## 1. 简介

消费者客户端可以通过 **推模式** 和 **拉模式** 来获取并消费消息，RabbitMQ 把消息推送后（或客户端主动 ACK）后，RabbitMQ 把当前消息从队列中标记清除。如果由于某些原因无法处理当前接受到的信息，可以通过 `channel.basicNack` 或则 `channel.basicReject` 来拒绝掉。

对于消费者来说，还有几点需要注意：

- 消息分发
- 消息顺序性
- 弃用 QueueingConsumer

## 2. 消息分发

当 RabbitMQ **队列有多个消费者** 时，队列收到的消息将以 **轮询（round-robin）** 方式分发给消费者，每条消息只会发送给订阅列表里的 **一个消费者**。这种方式是专门为并发程序设计的，如果程序处理不过来，只要增加更多的消费者来处理消息即可。

很多时候轮询的分发机制也有问题。默认情况下，如果有 n 个消费者，RabbitMQ 会将第 m 条消息分发给第 `m%n` (取余) 个消费者。RabbitMQ **不管消费者是否消费并已经确认**（Basic.Ack）消息。就可能会导致：某些消费者来不及处理消息，有些处理得很快的情况。

这种情况，需要 **限制信道上** 的消费者所能 **保持的最大未确认消息的数量**，通过 `channel.basicQos(int prefetchCount)` 方法。

举例说明：在订阅队列之前，消费者设置 `channel.basicQos(5)`，再订阅队列。 RabbitMQ 会保存一个消费者的列表，每发送一条消息都会为对应的消费者计数，如果到达了设置上限，就不会向这个消费者再发送任何消息。直到消费者确认了某条消费者之后，RabbitMQ 把对应的计数器 -1，继续分发消息。

注意要点：`Basic.Qos` 对拉模式无效

```java
void basicQos(int prefetchSize, int prefetchCount, boolean global) throws IOException;
```

- prefetchSize：消费者所能接受未确认消息的总体大小的上限（单位为 B），设置为 0 时，表示无上限

- prefetchCount：消费者所能接受最大未确认消息的数量

- global：

  一个信道可以消费多个队列

  当该值大于 0 时，这个信道需要和各个队列协调，确保发送的消息都没有超过所限定的 prefetchCount。这会让 RabbitMQ 的性能降低，尤其当这些队列分散在集群中的多个 Broker 节点之中。为了解决这个性能问题，定义了 global 参数

  | global 参数 | AMQP 0-9-1                                                   | RabbitMQ                                                     |
  | :---------: | ------------------------------------------------------------ | ------------------------------------------------------------ |
  |    false    | 信道上所有的消费者都要遵从 prefetchCount 的限制              | 信道上所有的消费者都要遵从 prefetchCount 的限制              |
  |    true     | 当前通信链路（Connection）上所有的消费者需要遵循从 prefetchCount 的限制 | 信道上所有的消费者都要遵从 prefetchCount 的限制（这里不知道书上是不是写错了？） |

  channel.basicQos 只针对单个消费者的。对于同一个信道上的多个消费者而言，如果设置了 prefetchCount ，则都会生效。

  如下代码，各自的能接收到的未确认消息上限都是 10

  ```java
  channel.basicQos(10);
  channel.basicConsume("queue1",false,consumerl1)
  channel.basicConsume("queue2",false,consumerl2)
  ```

  如果同时设置了 global 为 false 和 true 呢？他们两个的限制都有效果：如下面这段代码

  ```java
  channel.basicQos(3, false);
  channel.basicQos(5, true);
  channel.basicConsume("queue1", false, consumerl1);
  channel.basicConsume("queue2", false, consumerl2);
  ```

  那么生效情况如下：

  - 每个消费者最多可收到 3 个未确认的消息
  - 两个消费者最多可收到 5 个未确认的消息

  这种设置方式，会增加 RabbitMQ 的负载，会使用更多的资源来协调完成这些限制。建议用默认值的 false。

## 3. 消息顺序性

指：消费者 **消费到的消息** 和发送者 **发布的消息** 顺序是一致的。

如：发布 `1,2,3` 那么消费的顺序也是 `1,2,3`

在 **单个生产者和单个消费者的情况下，消息的有序性是能保证的**，也是可验证的。在多消费者和多生产者的情况下，无法确定消息到达 Broker 的前后顺序，也无法确定客户端消费的顺序，这个其实是正常现象。分布式中本来就存在这样的现象。

有如下几种情况，消息的顺序性会被打破：但都是正常现象：

- 使用事物机制时，发送失败，使用另一个线程补发此消息。此时消息就不能保证按照 `1,2,3,4` 的顺序到达 Broker 了
- 使用不同的消息过期时间，先过期的先被消费
- 使用优先级消息，优先级高的先被消费
- 客户端使用 `Basic.Nack/.Reject` 将消息拒绝时，同时 requeue= true， 消息重入队列后，也无法保证消息顺序还和发送的时候是一致的

从以上点可以看到，在很多场景下，并不能保证消息的顺序性。

如果想要实现消息的有序性，则可以通过在消息体内增加全部有序标识，程序端自己实现逻辑判定

## 4. 启用 QueuingConsumer

```java
   ...
    queueingConsumer = new QueueingConsumer(channel);
    channel.basicConsume(replyQueue, true, queueingConsumer);
}

public String call(String message) throws IOException, InterruptedException {
    final String corrid = UUID.randomUUID().toString();
    final AMQP.BasicProperties properties = new AMQP.BasicProperties()
            .builder()
            .correlationId(corrid)
            .replyTo(replyQueue)
            .build();
    channel.basicPublish("", requestQueue, properties, "message".getBytes());

    // 想服务端发送后，轮询，知道回去到服务端的响应为止
    while (true) {
        final QueueingConsumer.Delivery delivery = queueingConsumer.nextDelivery();
        if (delivery.getProperties().getCorrelationId().equals(corrid)) {
            return new String(delivery.getBody());
        }
    }
}
    
```

前面讲解 [RPC 实现](https://zq99299.github.io/mq-tutorial/rabbitmq-ac/04/06.html) 中用到过这个类，如上的代码片段。在 RabbitMQ 4.x 中被标记为 `@Deprecated` 了。

是因为该类有几个大缺陷：比如内存溢出问题，由于某些原因，队列中堆积了比较多的消息，可能导致消费者客户端内存溢出假死，于是发生恶性循环，队列消息不断堆积而得不到消费。

导致内存溢出的原因是：QueuingConsumer 内部使用 LinkedBlockingQueue 来缓存消息，当设置的 `Basic.Qos` 数量太大的时候，消息体也很大（如一个消息 200M），那么就会导致内存溢出。可通过限制 qos 的数量来解决这个问题，但是一定 **要在订阅之前设置**

QueuingConsumer 还包括以下缺陷（包括但不限于）：

- 会拖累同一个 Connection 下的所有通道，使其性能降低
- 同步递归调用 QueuingConsumer 会产生死锁
- RabbitMQ 的自动连接恢复机制（automatic Connection recovery） 不支持 QueuingConsumer 的这种形式
- QueuingConsumer 不是事件驱动的

所以还是使用 `DefaultConsumer` 之类的来订阅队列。

## 参考文章

[消费端要点介绍](https://zq99299.github.io/mq-tutorial/rabbitmq-ac/04/09.html)