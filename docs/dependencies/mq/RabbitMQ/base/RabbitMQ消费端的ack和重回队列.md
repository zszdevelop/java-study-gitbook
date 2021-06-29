# RabbitMQ消费端的ack和重回队列

## 1. 消费端的签收方式：

分为自动签收和手动签收。

- 自动签收：channel.basicConsume方法的第二个参数(autoAck)设置为true即可;

- 手动签收：将第二个参数设置为false即可。

手动签收又分为两种方式：

- 手动Ack

  Ack表示手工签收后消息处理成功；

- Nack

  Nack表示手动签合后消息处理失败。这个时候broker会自动重新发送消息

## 2. 使用场景

1. 消费端进行消费的时候，由于业务异常，我们可以进行日志记录，后续做补偿操作。
2. 消费端由于服务器宕机等严重问题，比如消息消费一半时宕机，`RabbitMQ`既收不到`ack`也收不到`nack`，此时消费端采用手工`ack`，等消费端服务重启好后，`RabbitMQ`回重发此未能消费成功的消息，保障消息消费成功

## 3. 消费端的重回队列

消费端重回队列是为了对没有处理成功的消息，把消息重新递给Broker

一般我们在实际应用中，都会关闭重回队列

## 4. 代码实现

### 4.1 Producer

```java
package com.wyg.rabbitmq.javaclient.consumer_ack;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

/**
 * 消费者手工ack和nack
 * 
 * @author wyg0405@gmail.com
 * @date 2019-11-22 13:25
 * @since JDK1.8
 * @version V1.0
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
        String exchangeName = "test_ack_exchange";
        String routingKey = "ack.abc";
        // 申明exchange
        channel.exchangeDeclare(exchangeName, "topic");
        for (int i = 0; i < 6; i++) {
            Map<String, Object> map = new HashMap<>();
            map.put("num", i);
            AMQP.BasicProperties props =
                new AMQP.BasicProperties.Builder().deliveryMode(2).contentEncoding("UTF-8").headers(map).build();

            String msg = "这是第" + i + "条ack消息";
            channel.basicPublish(exchangeName, routingKey, false, props, msg.getBytes("UTF-8"));
        }

        channel.close();
        connection.close();
    }

}
```

### 4.2 Consumer

```java
package com.wyg.rabbitmq.javaclient.consumer_ack;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.*;

/**
 * 消费者手工ack和nack
 * 
 * @author wyg0405@gmail.com
 * @date 2019-11-22 14:07
 * @since JDK1.8
 * @version V1.0
 */

public class Consumer {

    private static final String HOST = "localhost";
    private static final int PORT = 5672;
    private static final String USERNAME = "guset";
    private static final String PASSWORD = "guset";

    public static void main(String[] args) throws IOException, TimeoutException {
        ConnectionFactory factory = new ConnectionFactory();
```

## 5. 运行结果

发现前3条消息成功消费，手工发`ack`给Broker

最后3条消息，发`nack`给`Broker`，并不断重回队列尾端，broker再将其推给消费端，一直循环消费失败

![image-20210519170938194](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210519170938194.png)

## 参考文章

[RabbitMQ 高级篇八 消费端ACK与重回队列](https://cloud.tencent.com/developer/article/1478662)

[RabbitMQ高级特性-消费端的ack和重回队列](https://segmentfault.com/a/1190000021092149)