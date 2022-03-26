# RabbitMQ消费端限流

## 1. 为什么要进行消费者端限流

假设有个场景，RabbitMQ服务器上堆积上万条未处理的消息，我们随便打开一个消费者客户端会出现下面情况：巨量的消息同时推送过来，但是我们单个消费者客户端无法同时处理这么多数据，服务器可能卡死

## 2. 什么是消费端限流

RabbitMQ提供了一种qos(服务质量保证)功能，即在非自动确认消息的情况下，如果一定数量的消息(通过基于consumer或者channel设置qos值)未被确认前，不消费新的消息

## 3. 消费端限流的实现思路

在消费端:

```java
// 单条消息的大小限制，一般设为0或不设置，不限制大小
int prefecthSize = 0;
// 告诉RabbitMQ不要同时给消费端推送n条消息，一旦有n个消息还没ack，则该consumer将block掉，直到有ack；注意在自动应答下不生效
int prefecthCount = 1;
// 表示是否应用于channel上，即是channel级别还是consumer级别
boolean global = false;
channel.basicQos(prefecthSize, prefecthCount, global);
```

## 4. 具体实现

producer

```java
package com.wyg.rabbitmq.javaclient.consumer_limit;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

/**
 * 消费端限流
 * 
 */
public class Producer {
    private static final String HOST = "localhost";
    private static final int PORT = 5672;
    private static final String USERNAME = "guset";
    private static final String PASSWORD = "guset";

    public static void main(String[] args) throws IOException, TimeoutException {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(HOST);
        factory.setVirtualHost("/");
        factory.setPort(PORT);
        factory.setUsername(USERNAME);
        factory.setPassword(PASSWORD);
        Connection connection = factory.newConnection();

        Channel channel = connection.createChannel();
        String exchangeName = "test_qos_exchange";
        String routingKey = "qos.abc";
        // 申明exchange
        channel.exchangeDeclare(exchangeName, "topic");

        // 发送十条消息
        for (int i = 0; i < 10; i++) {
            String msg = "这是一条 消费端限流消息," + i;
            channel.basicPublish(exchangeName, routingKey, false, null, msg.getBytes("UTF-8"));
        }
        channel.close();
        connection.close();
    }

}
```

consumer

```java
package com.wyg.rabbitmq.javaclient.consumer_limit;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.*;

/**
 * 消费端限流
 * 
 */
public class Consumer {

    private static final String HOST = "localhost";
    private static final int PORT = 5672;
    private static final String USERNAME = "guset";
    private static final String PASSWORD = "guset";

    public static void main(String[] args) throws IOException, TimeoutException {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(HOST);
        factory.setVirtualHost("/");
        factory.setPort(PORT);
        factory.setUsername(USERNAME);
        factory.setPassword(PASSWORD);
        Connection connection = factory.newConnection();

        Channel channel = connection.createChannel();

        String queueName = "test_qos_queue";
        String exchangeName = "test_qos_exchange";
        String routingKey = "qos.#";

        // 申明exchange
        channel.exchangeDeclare(exchangeName, "topic");
        // 申明队列
        channel.queueDeclare(queueName, true, false, false, null);
        // 队列绑定到exchange
        channel.queueBind(queueName, exchangeName, routingKey, null);

        // 单条消息的大小限制，一般设为0或不设置，不限制大小
        int prefecthSize = 0;
        // 告诉RabbitMQ不要同时给消费端推送n条消息，一旦有n个消息还没ack，则该consumer将block掉，直到有ack；注意在自动应答下不生效
        int prefecthCount = 1;
        // 表示是否应用于channel上，即是channel级别还是consumer级别
        boolean global = false;

        channel.basicQos(prefecthSize, prefecthCount, global);
        DeliverCallback deliverCallback = new DeliverCallback() {
            @Override
            public void handle(String consumerTag, Delivery message) throws IOException {
                try {
                    System.out.println("---消费者---");
                    System.out.println(new String(message.getBody(), "UTF-8"));
                } finally {
                    // consumer手动 ack 给broker
                    channel.basicAck(message.getEnvelope().getDeliveryTag(), false);
                }
            }
        };
        CancelCallback cancelCallback = new CancelCallback() {
            @Override
            public void handle(String consumerTag) throws IOException {
                System.out.println("---消费者：cancelCallback");
            }
        };

        // 消费消息,autoAck一定要设置为false
        channel.basicConsume(queueName, false, deliverCallback, cancelCallback);
    }
}
```

## 5. 测试

1. 第一次我们注释掉 手动 ack给RabbitMQ应答

   ![image-20210519164040329](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210519164040329.png)

   运行结果：

   > 发现一直卡在第一条消息，因为未给RabbitMQ手动应答，所以RabbitMQ认为消费端还未消费完，不推送新的消息

   ![image-20210519164133230](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210519164133230.png)

2. 第二次开启手动应答

   ![image-20210519164152556](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210519164152556.png)

   运行结果：

   > 所有消息依次消费

   ![image-20210519164211391](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210519164211391.png)

## 参考文章

[RabbitMQ高级特性-消费端限流](https://juejin.cn/post/6844904002996404237)

