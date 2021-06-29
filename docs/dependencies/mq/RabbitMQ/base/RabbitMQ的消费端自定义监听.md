# RabbitMQ的消费端自定义监听

## 1. 背景

我们一般在代码中编写while循环，进行consumer.nextDelivery方法进行获取下一条消息，然后进行消费处理。

```java
 // 接收消息
        while (true){
            QueueingConsumer.Delivery delivery = consumer.nextDelivery();
            String msg = new String(delivery.getBody());
            System.out.println(msg);
        }
```

我们使用自定义的Consumer更加的方便，解耦性更强，也在实际工作中最常用。

## 2. 代码演示

### **2.1 生产端**

```java
package com.kaven.rabbitmq.api.consumer;

import com.rabbitmq.client.*;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class Producer {
    // 自己服务器的IP
    private static String ip = "IP";
    // RabbitMQ启动的默认端口，也是应用程序进行连接RabbitMQ的端口
    private static int port = 5672;
    // RabbitMQ有一个 "/" 的虚拟主机
    private static String virtualHost = "/";

    // default exchange
    private static String exchange = "";
    // default exchange 的路由规则： routingKey（test） 将匹配同名的 queue(test)
    private static String routingKey = "test";

    public static void main(String[] args) throws IOException, TimeoutException {
        // 1 创建ConnectionFactory
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost(ip);
        connectionFactory.setPort(port);
        connectionFactory.setVirtualHost(virtualHost);

        // 2 创建Connection
        Connection connection = connectionFactory.newConnection();

        // 3 创建Channel
        Channel channel = connection.createChannel();


        // 4 发送消息
        for (int i = 0; i < 5; i++) {
            String msg = "RabbitMQ: consumer message" + i;
            channel.basicPublish(exchange , routingKey , null , msg.getBytes());
        }

        // 5 关闭连接
        channel.close();
        connection.close();
    }
}
```

### **2.2 消费端**

重点是`MyConsumer`类，它来继承`DefaultConsumer`类，实现消费端自定义监听的逻辑。

```java
package com.kaven.rabbitmq.api.consumer;


import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DefaultConsumer;
import com.rabbitmq.client.Envelope;

import java.io.IOException;

public class MyConsumer extends DefaultConsumer {

    public MyConsumer(Channel channel) {
        super(channel);
    }

    @Override
    public void handleDelivery(String consumerTag, Envelope envelope,
                               AMQP.BasicProperties properties, byte[] body) throws IOException {
        System.out.println("------------ consumer message -----------");
        System.out.println("consumerTag：" + consumerTag);
        System.out.println("envelope：" + envelope);
        System.out.println("properties：" + properties);
        System.out.println("body：" + new String(body));
    }
}
package com.kaven.rabbitmq.api.consumer;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.QueueingConsumer;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class Consumer {
    // 自己服务器的IP
    private static String ip = "IP";
    // RabbitMQ启动的默认端口，也是应用程序进行连接RabbitMQ的端口
    private static int port = 5672;
    // RabbitMQ有一个 "/" 的虚拟主机
    private static String virtualHost = "/";

    // default exchange
    private static String exchange = "";
    // 队列名
    private static String queueName = "test";

    public static void main(String[] args) throws IOException, TimeoutException, InterruptedException {
        // 1 创建ConnectionFactory
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost(ip);
        connectionFactory.setPort(port);
        connectionFactory.setVirtualHost(virtualHost);

        // 2 创建Connection
        Connection connection = connectionFactory.newConnection();

        // 3 创建Channel
        Channel channel = connection.createChannel();

        // 4 创建Queue
        channel.queueDeclare(queueName , true , false , false , null);

        // 5 消费端开始消费信息
        channel.basicConsume(queueName , true , new MyConsumer(channel));
    }
}
```

### **2.3 测试**

启动生产端和消费端，消费端可以接收到消息，消息在`body`属性里面，如下所示：

```
------------ consumer message -----------
consumerTag：amq.ctag-CebIvWwveIxajYqFBqoZmA
envelope：Envelope(deliveryTag=1, redeliver=false, exchange=, routingKey=test)
properties：#contentHeader<basic>(content-type=null, content-encoding=null, headers=null, delivery-mode=null, priority=null, correlation-id=null, reply-to=null, expiration=null, message-id=null, timestamp=null, type=null, user-id=null, app-id=null, cluster-id=null)
body：RabbitMQ: consumer message0
------------ consumer message -----------
consumerTag：amq.ctag-CebIvWwveIxajYqFBqoZmA
envelope：Envelope(deliveryTag=2, redeliver=false, exchange=, routingKey=test)
properties：#contentHeader<basic>(content-type=null, content-encoding=null, headers=null, delivery-mode=null, priority=null, correlation-id=null, reply-to=null, expiration=null, message-id=null, timestamp=null, type=null, user-id=null, app-id=null, cluster-id=null)
body：RabbitMQ: consumer message1
------------ consumer message -----------
consumerTag：amq.ctag-CebIvWwveIxajYqFBqoZmA
envelope：Envelope(deliveryTag=3, redeliver=false, exchange=, routingKey=test)
properties：#contentHeader<basic>(content-type=null, content-encoding=null, headers=null, delivery-mode=null, priority=null, correlation-id=null, reply-to=null, expiration=null, message-id=null, timestamp=null, type=null, user-id=null, app-id=null, cluster-id=null)
body：RabbitMQ: consumer message2
------------ consumer message -----------
consumerTag：amq.ctag-CebIvWwveIxajYqFBqoZmA
envelope：Envelope(deliveryTag=4, redeliver=false, exchange=, routingKey=test)
properties：#contentHeader<basic>(content-type=null, content-encoding=null, headers=null, delivery-mode=null, priority=null, correlation-id=null, reply-to=null, expiration=null, message-id=null, timestamp=null, type=null, user-id=null, app-id=null, cluster-id=null)
body：RabbitMQ: consumer message3
------------ consumer message -----------
consumerTag：amq.ctag-CebIvWwveIxajYqFBqoZmA
envelope：Envelope(deliveryTag=5, redeliver=false, exchange=, routingKey=test)
properties：#contentHeader<basic>(content-type=null, content-encoding=null, headers=null, delivery-mode=null, priority=null, correlation-id=null, reply-to=null, expiration=null, message-id=null, timestamp=null, type=null, user-id=null, app-id=null, cluster-id=null)
body：RabbitMQ: consumer message4
```

`RabbitMQ Management`也有反应。
![Java初识RabbitMQ一消费端自定义监听](http://img.voycn.com/images/2020/02/31f33511e86c629b0297932f38b20a06.png)

## 参考文章

[Java初识RabbitMQ一消费端自定义监听](http://www.voycn.com/article/javachushirabbitmqyixiaofeiduanzidingyijianting)