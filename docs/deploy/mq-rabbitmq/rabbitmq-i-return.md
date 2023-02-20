# RabbitMQ的Return消息机制

## 1. Return机制简介

- `Return Listener` 用于处理一些不可路由的消息！
- 我们的消息生产者，通过指定一个Exchange 和Routingkey，把消息送达到某一个队列中去， 然后我们的消费者监听队列，进行消费处理操作！
- 但是在某些情况下，如果我们在发送消息的时候，当前的exchange不存在或者指定的路由key路由不到，这个时候如果我们需要监听这种不可达的消息，就要使用`Return Listener`

![image-20210518193741448](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210518193741448.png)

## 2. Return机制实现

1. 添加return监听：`addReturnListener`，生产端去监听这些不可达的消息，做一些后续处理，比如说，记录下消息日志，或者及时去跟踪记录，有可能重新设置一下就好了
2. 发送消息时，设置`Mandatory`：如果为true，则监听器会接收到路由不可达的消息，然后进行后续处理，如果为false，那么broker端自动删除该消息！

## 3. Return机制演示

### 3.1 生产端



```tsx
public class ReturnProducer {

    public static void main(String[] args) throws Exception {
        //1 创建ConnectionFactory
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost("192.168.43.157");
        connectionFactory.setPort(5672);
        connectionFactory.setVirtualHost("/");
        //2 获取Connection
        Connection connection = connectionFactory.newConnection();
        //3 通过Connection创建一个新的Channel
        Channel channel = connection.createChannel();
        
        String exchange = "test_return_exchange";
        //String routingKey = "return.save";
        String routingKeyError = "abc.save";
        
        String msg = "Hello RabbitMQ Return Message";
        //添加return监听
        channel.addReturnListener(new ReturnListener() {
            @Override
            public void handleReturn(int replyCode, String replyText, String exchange,
                    String routingKey, AMQP.BasicProperties properties, byte[] body) throws IOException {
                //replyCode：响应码    replyText：响应信息
                System.err.println("---------handle  return----------");
                System.err.println("replyCode: " + replyCode);
                System.err.println("replyText: " + replyText);
                System.err.println("exchange: " + exchange);
                System.err.println("routingKey: " + routingKey);
                //System.err.println("properties: " + properties);
                System.err.println("body: " + new String(body));
            }
        });
        //5 发送一条消息，第三个参数mandatory：必须设置为true
        channel.basicPublish(exchange, routingKeyError, true, null, msg.getBytes());
    }
}
```

### 3.2 消费端

```tsx
public class ReturnConsumer {
    
    public static void main(String[] args) throws Exception {
        //1 创建ConnectionFactory
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost("192.168.1.1");
        connectionFactory.setPort(5672);
        connectionFactory.setVirtualHost("/");
        //2 获取Connection
        Connection connection = connectionFactory.newConnection();
        //3 通过Connection创建一个新的Channel
        Channel channel = connection.createChannel();
        
        String exchangeName = "test_return_exchange";
        String routingKey = "return.#";
        String queueName = "test_return_queue";
        //4 声明交换机和队列，然后进行绑定设置路由Key
        channel.exchangeDeclare(exchangeName, "topic", true, false, null);
        channel.queueDeclare(queueName, true, false, false, null);
        channel.queueBind(queueName, exchangeName, routingKey);
        
        //5 创建消费者 
        QueueingConsumer queueingConsumer = new QueueingConsumer(channel);
        channel.basicConsume(queueName, true, queueingConsumer);
        
        while(true){
            Delivery delivery = queueingConsumer.nextDelivery();
            String msg = new String(delivery.getBody());
            System.err.println("消费者: " + msg);
        }
    }
}
```

## 4. 运行说明

先启动消费端，访问管控台：http://192.168.1.1:15672，检查Exchange和Queue是否设置OK，然后启动生产端。
 由于生产端设置的是一个错误的路由key，所以消费端没有任何打印，而生产端打印了如下内容



```kotlin
---------handle  return----------
replyCode: 312
replyText: NO_ROUTE
exchange: test_return_exchange
routingKey: abc.save
body: Hello RabbitMQ Return Message
```

如果我们将 `Mandatory` 属性设置为false，对于不可达的消息会被Broker直接删除，那么生产端就不会进行任何打印了。如果我们的路由key设置为正确的，那么消费端能够正确消费，生产端也不会进行任何打印。

## 参考文章

[RabbitMQ的Return消息机制](https://www.jianshu.com/p/f23c784e163d)

