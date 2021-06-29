## RabbitMQ的TTL队列与消息

## 1. TTL 简介

TTL: time to live,即生存时间

- **消息的过期时间**

  RabbitMQ 支持消息的过期时间，可以在发消息是指定

  ```java
   // expiration("10000") 设置消息8s过期,消息的ttl
              AMQP.BasicProperties props = new AMQP.BasicProperties.Builder().deliveryMode(2).contentEncoding("UTF-8")
                  .expiration("8000").build();
  ```

- **队列的过期时间**:

  RabbitMQ 支持队列的过期时间，从消息入队开始计算，只要超过了队列的超时时间配置，那么消息会自动清除

  ```java
    Map<String, Object> arguments = new HashMap<>();
          // 队列ttl，设置为8s
          arguments.put("message-ttl", 8000);
          channel.queueBind(queueName, exchangeName, routingKey, arguments);
  ```

## 2. 代码实现

```java
package com.wyg.rabbitmq.javaclient.ttl;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

/**
 * ttl队列/消息
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
        String exchangeName = "test_ttl_exchange";
        String routingKey = "ttl.abc";
        String queueName = "test_ttl_queue";

        // 申明exchange
        channel.exchangeDeclare(exchangeName, "topic");
        // 申明 queue
        channel.queueDeclare(queueName, true, false, false, null);

        Map<String, Object> arguments = new HashMap<>();
        // 队列ttl，设置为8s
        arguments.put("message-ttl", 8000);
        channel.queueBind(queueName, exchangeName, routingKey, arguments);

        for (int i = 0; i < 3; i++) {
            // expiration("10000") 设置消息8s过期,消息的ttl
            AMQP.BasicProperties props = new AMQP.BasicProperties.Builder().deliveryMode(2).contentEncoding("UTF-8")
                .expiration("8000").build();

            String msg = "这是第" + i + "条ack消息";
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            channel.basicPublish(exchangeName, routingKey, false, props, msg.getBytes("UTF-8"));
        }

        channel.close();
        connection.close();
    }

}


```

## 3. 实现效果

![16e93a814f8c1962](https://gitee.com/zszdevelop/blogimage/raw/master/16e93a814f8c1962.gif)

## 参考文章

[RabbitMQ高级特性-TTL队列/消息](https://juejin.cn/post/6844904002996404231)

