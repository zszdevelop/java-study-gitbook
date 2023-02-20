---
order: 100
category:
  - RabbitMQ  
  - MQ

---

# RabbitMQ进阶 - 消息确认机制（事务+Confirm）

## 1. 背景

生产者将消息发送出去之后，消息到底有没有正确到达服务器？如果不进行特殊配置，默认情况下发送消息的操作是不会返回任何信息给生产者的。也就是说默认情况下，生产者不知道消息是否正确到达服务器。

RabbitMQ 针对这个问题，提供了两种解决方式：

- 事物机制
- 发送方确认（publisher confirm）机制

## 2. 事物机制

RabbitMQ 客户端中与事物机制相关的方法有三个：

- `channel.txSelect`：将当前的信道设置为 **事物模式**
- `channel.txCommit`：提交事物
- `channel.txRollback`：回滚事物

开启事物（设置为事物模式）后，可以发送消息，然后提交事物，如果在提交事物前 RabbitMQ 异常崩溃或则其他原因抛出异常，可以将其捕获，然后再执行回滚事物。

这里事物与数据库中的事物概念并不同。

```java
// 开启事物
channel.txSelect();
// 发送消息
channel.basicPublish("", reqestQueue, properties, "message".getBytes());
// 提交事物
channel.txCommit();
```

AMQP 协议流转过程如下图所示

![image-20210514144523551](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210514144523551.png)

1. 客户端发送 Tx.Select 开启事物
2. Broker 回复 Tx.Select-Ok，确认事物开启
3. 发送消息后，客户端 Tx.Commit 提交事物
4. Broker 回复 Tx.Commit-Ok ，确认事物提交

事物回滚的代码则如下所示

```java
try {

        channel.txSelect();
        channel.basicPublish("", reqestQueue, properties, "message".getBytes());
        // 故意制造异常
        int result = 1 / 0;
        channel.txCommit();

    } catch (Exception e) {
    	// 回滚事物1
        channel.txRollback();
    }
}
```

交互流程如下

![image-20210514144758771](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210514144758771.png)

如果要发送多条消息，则如下做

```java
channel.txSelect();

for (int i = 0; i < 10; i++) {
    try {
        channel.basicPublish("", reqestQueue, properties, "message".getBytes());
        channel.txCommit();
    } catch (Exception e) {
        channel.txRollback();
    }
}
```

事物机制解决了 **消息发送方** 和 RabbitMQ 之间消息确认的问题，只有消息成功被 RabbitMQ 接收，事物才能提交成功。但是事物机制对 RabbitMQ 的性能影响很大。所以提供了一个改进机制：发送方确认机制

## 3. Confirm 发送方确认机制

在 AMQP 协议层面提供了事物机制解决消息是否有正确到达 RabbitMQ 这个问题，但是事物机制会严重降低 RabbitMQ 的消息吞吐量。

发送方确认机制（publisher confirm）是一种轻量级的方式。

**生产者将信道设置为 confirm（确认）模式**，所有再该信道上 **发布的消息** 都会被 **指派一个唯一的 ID**（从 1 开始），当消息被匹配到队列后，RabbitMQ 会 **发送一个确认（Basic.ack）给生产者**（包含消息的唯一 ID），这就使得生产者知道消息已经正确到达了目的地了。如果消息和队列是 **可持久化**的，那么确认消息会在 **消息写入磁盘**后 发出。

RabbitMQ 回传给生产者的确认消息中的 deliveryTag 包含了确认消息的序号，此外还可以设置 `channel.basicAck 方法中的 multple 参数`，表示在这个序号之前的所有消息都已经得到了处理。

![image-20210514145114090](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210514145114090.png)

如上图所示：生产者发送了 3 条消息，开启了 mutilple，那么 RabbitMQ 回调确认时，deliveryTag = 3，表示前面的 2 条消息，包含自己都已经正确到达 RabbitMQ 了。

- 事物机制：发送方是同步的

  发送一条消息后，发送端阻塞，等待 RabbitMQ 回应后，才能继续下一条消息的发送

- 发送方确认机制：可以是异步的

发送方确认有两种方式：

- 同步方式：发送消息后，调用 channel.waitForConfirms 方法，等待服务器的确认返回
- 异步方式：提供一个回调方法，服务端确认了一条或多条消息后客户端会收到回调事件

### 3.1 同步方式

与事物机制使用类似，不过可以发布多条消息，再等待确认

```java
// 将信道设置为生产者确认模式
channel.confirmSelect();

for (int i = 0; i < 10; i++) {
    // 发布消息
    channel.basicPublish("", reqestQueue, properties, "message".getBytes());
    channel.basicPublish("", reqestQueue, properties, "message".getBytes());
    channel.basicPublish("", reqestQueue, properties, "message".getBytes());
    channel.basicPublish("", reqestQueue, properties, "message".getBytes());
    channel.basicPublish("", reqestQueue, properties, "message".getBytes());

    try {
        if (channel.waitForConfirms()) {
            // 发送的 5 条消息成功
        } else {
            // 发送失败，这一批消息都需要重发？
            // 不清楚他的机制，全部失败？
        }
    } catch (InterruptedException e) {
        e.printStackTrace();
        // 发送失败，这一批消息都需要重发？
    }
}
```

可以看到如上的代码，批量发送后再等待并确认发送成功。但是有一个问题，当失败时（Basic.Nack 或 超时）时，就需要将这一批消息重新发送；这种情况过多的时候，性能不升返降

### 3.2 异步方式

通过添加 ConfirmListener 的方式，来知晓是否成功还是失败

```java
final Channel channel = connection.createChannel();

// 将信道设置为生产者确认模式
channel.confirmSelect();
channel.addConfirmListener(new ConfirmListener() {
    /**
             * 处理 RabbitMQ 的 Basic.Ack 指令
             * @param deliveryTag 那一条消息
             * @param multiple
             * @throws IOException
             */
    @Override
    public void handleAck(long deliveryTag, boolean multiple) throws IOException {
        System.out.println("发送成功");
    }

    /**
             * 处理 RabbitMQ 的 Basic.Nack 指令
             * @param deliveryTag
             * @param multiple
             * @throws IOException
             */
    @Override
    public void handleNack(long deliveryTag, boolean multiple) throws IOException {
        System.out.println("发送失败");
        // 可进行消息的重发处理
    }
});

for (int i = 0; i < 10; i++) {
    // 发布消息
    channel.basicPublish("", reqestQueue, properties, "message".getBytes());
    channel.basicPublish("", reqestQueue, properties, "message".getBytes());
    channel.basicPublish("", reqestQueue, properties, "message".getBytes());
    channel.basicPublish("", reqestQueue, properties, "message".getBytes());
    channel.basicPublish("", reqestQueue, properties, "message".getBytes());
}
```

## 4. 性能对比

在性能方面，QPS 对比如下

![image-20210514145538216](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210514145538216.png)

普通 confirm 就是发送一条就 waitForConfirms 一次。可见异步方式效率是最高的

## 参考文章

[生产者确认](https://zq99299.github.io/mq-tutorial/rabbitmq-ac/04/08.html#%E4%BA%8B%E7%89%A9%E6%9C%BA%E5%88%B6)

