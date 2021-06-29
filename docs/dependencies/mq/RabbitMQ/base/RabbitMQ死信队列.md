# RabbitMQ死信队列

## 1. 为什么需要死信队列

为了保证订单业务的消息数据不丢失，需要使用到RabbitMQ的死信队列机制，当消息消费发生异常时，将消息投入死信队列中。

## 2. 简介

死信，在官网中对应的单词为“Dead Letter”，可以看出翻译确实非常的简单粗暴。

“死信”是RabbitMQ中的一种消息机制，当你在消费消息时，如果队列里的消息出现以下情况：

1. 消息被否定确认，使用 `channel.basicNack` 或 `channel.basicReject` ，并且此时`requeue` 属性被设置为`false`。
2. 消息在队列的存活时间超过设置的TTL时间。
3. 消息队列的消息数量已经超过最大队列长度。

那么该消息将成为“死信”。

“死信”消息会被RabbitMQ进行特殊处理**，如果配置了死信队列信息，那么该消息将会被丢进死信队列中，如果没有配置，则该消息将会被丢弃**。

## 3. 如何配置死信队列

1. 配置业务队列，绑定到业务交换机上
2. 为业务队列配置死信交换机和路由key
3. 为死信交换机配置死信队列

>并不是直接声明一个公共的死信队列，然后所以死信消息就自己跑到死信队列里去了。而是为每个需要使用死信的业务队列配置一个死信交换机，这里同一个项目的死信交换机可以共用一个，然后为每个业务队列分配一个单独的路由key。

有了死信交换机和路由key后，接下来，就像配置业务队列一样，配置死信队列，然后绑定在死信交换机上。也就是说，死信队列并不是什么特殊的队列，只不过是绑定在死信交换机上的队列。死信交换机也不是什么特殊的交换机，只不过是用来接受死信的交换机，所以可以为任何类型【Direct、Fanout、Topic】。一般来说，会为每个业务队列分配一个独有的路由key，并对应的配置一个死信队列进行监听，也就是说，一般会为每个重要的业务队列配置一个死信队列。

## 4. 代码实现

1. Springboot项目

2. 在pom文件中添加 `spring-boot-starter-amqp` 和 `spring-boot-starter-web` 的依赖

3. 创建一个Config类

   ```java
   @Configuration
   public class RabbitMQConfig {
   
       public static final String BUSINESS_EXCHANGE_NAME = "dead.letter.demo.simple.business.exchange";
       public static final String BUSINESS_QUEUEA_NAME = "dead.letter.demo.simple.business.queuea";
       public static final String BUSINESS_QUEUEB_NAME = "dead.letter.demo.simple.business.queueb";
       public static final String DEAD_LETTER_EXCHANGE = "dead.letter.demo.simple.deadletter.exchange";
       public static final String DEAD_LETTER_QUEUEA_ROUTING_KEY = "dead.letter.demo.simple.deadletter.queuea.routingkey";
       public static final String DEAD_LETTER_QUEUEB_ROUTING_KEY = "dead.letter.demo.simple.deadletter.queueb.routingkey";
       public static final String DEAD_LETTER_QUEUEA_NAME = "dead.letter.demo.simple.deadletter.queuea";
       public static final String DEAD_LETTER_QUEUEB_NAME = "dead.letter.demo.simple.deadletter.queueb";
   
       // 声明业务Exchange
       @Bean("businessExchange")
       public FanoutExchange businessExchange(){
           return new FanoutExchange(BUSINESS_EXCHANGE_NAME);
       }
   
       // 声明死信Exchange
       @Bean("deadLetterExchange")
       public DirectExchange deadLetterExchange(){
           return new DirectExchange(DEAD_LETTER_EXCHANGE);
       }
   
       // 声明业务队列A
       @Bean("businessQueueA")
       public Queue businessQueueA(){
           Map<String, Object> args = new HashMap<>(2);
   //       x-dead-letter-exchange    这里声明当前队列绑定的死信交换机
           args.put("x-dead-letter-exchange", DEAD_LETTER_EXCHANGE);
   //       x-dead-letter-routing-key  这里声明当前队列的死信路由key
           args.put("x-dead-letter-routing-key", DEAD_LETTER_QUEUEA_ROUTING_KEY);
           return QueueBuilder.durable(BUSINESS_QUEUEA_NAME).withArguments(args).build();
       }
   
       // 声明业务队列B
       @Bean("businessQueueB")
       public Queue businessQueueB(){
           Map<String, Object> args = new HashMap<>(2);
   //       x-dead-letter-exchange    这里声明当前队列绑定的死信交换机
           args.put("x-dead-letter-exchange", DEAD_LETTER_EXCHANGE);
   //       x-dead-letter-routing-key  这里声明当前队列的死信路由key
           args.put("x-dead-letter-routing-key", DEAD_LETTER_QUEUEB_ROUTING_KEY);
           return QueueBuilder.durable(BUSINESS_QUEUEB_NAME).withArguments(args).build();
       }
   
       // 声明死信队列A
       @Bean("deadLetterQueueA")
       public Queue deadLetterQueueA(){
           return new Queue(DEAD_LETTER_QUEUEA_NAME);
       }
   
       // 声明死信队列B
       @Bean("deadLetterQueueB")
       public Queue deadLetterQueueB(){
           return new Queue(DEAD_LETTER_QUEUEB_NAME);
       }
   
       // 声明业务队列A绑定关系
       @Bean
       public Binding businessBindingA(@Qualifier("businessQueueA") Queue queue,
                                       @Qualifier("businessExchange") FanoutExchange exchange){
           return BindingBuilder.bind(queue).to(exchange);
       }
   
       // 声明业务队列B绑定关系
       @Bean
       public Binding businessBindingB(@Qualifier("businessQueueB") Queue queue,
                                       @Qualifier("businessExchange") FanoutExchange exchange){
           return BindingBuilder.bind(queue).to(exchange);
       }
   
       // 声明死信队列A绑定关系
       @Bean
       public Binding deadLetterBindingA(@Qualifier("deadLetterQueueA") Queue queue,
                                       @Qualifier("deadLetterExchange") DirectExchange exchange){
           return BindingBuilder.bind(queue).to(exchange).with(DEAD_LETTER_QUEUEA_ROUTING_KEY);
       }
   
       // 声明死信队列B绑定关系
       @Bean
       public Binding deadLetterBindingB(@Qualifier("deadLetterQueueB") Queue queue,
                                         @Qualifier("deadLetterExchange") DirectExchange exchange){
           return BindingBuilder.bind(queue).to(exchange).with(DEAD_LETTER_QUEUEB_ROUTING_KEY);
       }
   }
   ```

   这里声明了两个Exchange，一个是业务Exchange，另一个是死信Exchange，业务Exchange下绑定了两个业务队列，业务队列都配置了同一个死信Exchange，并分别配置了路由key，在死信Exchange下绑定了两个死信队列，设置的路由key分别为业务队列里配置的路由key。

4. 配置文件application.yml

   ```yml
   spring:
     rabbitmq:
       host: localhost
       password: guest
       username: guest
       listener:
         type: simple
         simple:
             default-requeue-rejected: false
             acknowledge-mode: manual
   ```

   这里记得将`default-requeue-rejected`属性设置为false。

5. 业务队列的消费代码

   ```java
   @Slf4j
   @Component
   public class BusinessMessageReceiver {
   
       @RabbitListener(queues = BUSINESS_QUEUEA_NAME)
       public void receiveA(Message message, Channel channel) throws IOException {
           String msg = new String(message.getBody());
           log.info("收到业务消息A：{}", msg);
           boolean ack = true;
           Exception exception = null;
           try {
               if (msg.contains("deadletter")){
                   throw new RuntimeException("dead letter exception");
               }
           } catch (Exception e){
               ack = false;
               exception = e;
           }
           if (!ack){
               log.error("消息消费发生异常，error msg:{}", exception.getMessage(), exception);
               channel.basicNack(message.getMessageProperties().getDeliveryTag(), false, false);
           } else {
               channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
           }
       }
   
       @RabbitListener(queues = BUSINESS_QUEUEB_NAME)
       public void receiveB(Message message, Channel channel) throws IOException {
           System.out.println("收到业务消息B：" + new String(message.getBody()));
           channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
       }
   }
   ```

6. 配置死信队列的消费者

   ```java
   @Component
   public class DeadLetterMessageReceiver {
   
   
       @RabbitListener(queues = DEAD_LETTER_QUEUEA_NAME)
       public void receiveA(Message message, Channel channel) throws IOException {
           System.out.println("收到死信消息A：" + new String(message.getBody()));
           channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
       }
   
       @RabbitListener(queues = DEAD_LETTER_QUEUEB_NAME)
       public void receiveB(Message message, Channel channel) throws IOException {
           System.out.println("收到死信消息B：" + new String(message.getBody()));
           channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
       }
   }
   ```

7. 为了方便测试，写一个简单的消息生产者，并通过controller层来生产消息。

   ```java
   @Component
   public class BusinessMessageSender {
   
       @Autowired
       private RabbitTemplate rabbitTemplate;
   
       public void sendMsg(String msg){
           rabbitTemplate.convertSendAndReceive(BUSINESS_EXCHANGE_NAME, "", msg);
       }
   }
   ```

   ```java
   @RequestMapping("rabbitmq")
   @RestController
   public class RabbitMQMsgController {
   
       @Autowired
       private BusinessMessageSender sender;
   
       @RequestMapping("sendmsg")
       public void sendMsg(String msg){
           sender.sendMsg(msg);
       }
   }
   ```

## 5. 代码测试

RabbitMQ的管理后台中看到一共有四个队列，除默认的Exchange外还有声明的两个Exchange。

![image-20210521222525261](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210521222525261.png)

![image-20210521222542576](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210521222542576.png)

访问一下url，来测试一下：

```
http://localhost:8080/rabbitmq/sendmsg?msg=msg
```

日志：

```
收到业务消息A：msg
收到业务消息B：msg
```

表示两个Consumer都正常收到了消息。这代表正常消费的消息，ack后正常返回。然后我们再来测试nck的消息。

```
http://localhost:8080/rabbitmq/sendmsg?msg=deadletter
```

这将会触发业务队列A的NCK，按照预期，消息被NCK后，会抛到死信队列中，因此死信队列将会出现这个消息，日志如下：

```
收到业务消息A：deadletter
消息消费发生异常，error msg:dead letter exception
java.lang.RuntimeException: dead letter exception
...

收到死信消息A：deadletter
```

可以看到，死信队列的Consumer接受到了这个消息，所以流程到此为止就打通了。

## 6. 死信消息的变化

那么“死信”被丢到死信队列中后，会发生什么变化呢？

如果队列配置了参数 `x-dead-letter-routing-key` 的话，“死信”的路由key将会被替换成该参数对应的值。如果没有设置，则保留该消息原有的路由key。

举个栗子：

如果原有消息的路由key是`testA`，被发送到业务Exchage中，然后被投递到业务队列QueueA中，如果该队列没有配置参数`x-dead-letter-routing-key`，则该消息成为死信后，将保留原有的路由key`testA`，如果配置了该参数，并且值设置为`testB`，那么该消息成为死信后，路由key将会被替换为`testB`，然后被抛到死信交换机中。

另外，由于被抛到了死信交换机，所以消息的Exchange Name也会被替换为死信交换机的名称。

消息的Header中，也会添加很多奇奇怪怪的字段，修改一下上面的代码，在死信队列的消费者中添加一行日志输出：

```
log.info("死信消息properties：{}", message.getMessageProperties());
```

然后重新运行一次，即可得到死信消息Header中被添加的信息：

```
死信消息properties：MessageProperties [headers={x-first-death-exchange=dead.letter.demo.simple.business.exchange, x-death=[{reason=rejected, count=1, exchange=dead.letter.demo.simple.business.exchange, time=Sun Jul 14 16:48:16 CST 2019, routing-keys=[], queue=dead.letter.demo.simple.business.queuea}], x-first-death-reason=rejected, x-first-death-queue=dead.letter.demo.simple.business.queuea}, correlationId=1, replyTo=amq.rabbitmq.reply-to.g2dkABZyYWJiaXRAREVTS1RPUC1DUlZGUzBOAAAPQAAAAAAB.bLbsdR1DnuRSwiKKmtdOGw==, contentType=text/plain, contentEncoding=UTF-8, contentLength=0, receivedDeliveryMode=PERSISTENT, priority=0, redelivered=false, receivedExchange=dead.letter.demo.simple.deadletter.exchange, receivedRoutingKey=dead.letter.demo.simple.deadletter.queuea.routingkey, deliveryTag=1, consumerTag=amq.ctag-NSp18SUPoCNvQcoYoS2lPg, consumerQueue=dead.letter.demo.simple.deadletter.queuea]
```

Header中看起来有很多信息，实际上并不多，只是值比较长而已。下面就简单说明一下Header中的值：

| 字段名                 | 含义                                                         |
| :--------------------- | :----------------------------------------------------------- |
| x-first-death-exchange | 第一次被抛入的死信交换机的名称                               |
| x-first-death-reason   | 第一次成为死信的原因，`rejected`：消息在重新进入队列时被队列拒绝，由于`default-requeue-rejected` 参数被设置为`false`。`expired` ：消息过期。`maxlen` ： 队列内消息数量超过队列最大容量 |
| x-first-death-queue    | 第一次成为死信前所在队列名称                                 |
| x-death                | 历次被投入死信交换机的信息列表，同一个消息每次进入一个死信交换机，这个数组的信息就会被更新 |

## 7. 死信队列应用场景

一般用在较为重要的业务队列中，确保未被正确消费的消息不被丢弃，一般发生消费异常可能原因主要有由于消息信息本身存在错误导致处理异常，处理过程中参数校验异常，或者因网络波动导致的查询异常等等，当发生异常时，当然不能每次通过日志来获取原消息，然后让运维帮忙重新投递消息。通过配置死信队列，可以让未正确处理的消息暂存到另一个队列中，待后续排查清楚问题后，编写相应的处理代码来处理死信消息，这样比手工恢复数据要好太多了。

## 8. 总结

死信队列其实并没有什么神秘的地方，不过是绑定在死信交换机上的普通队列，而死信交换机也只是一个普通的交换机，不过是用来专门处理死信的交换机。

总结一下死信消息的生命周期：

1. 业务消息被投入业务队列
2. 消费者消费业务队列的消息，由于处理过程中发生异常，于是进行了nck或者reject操作
3. 被nck或reject的消息由RabbitMQ投递到死信交换机中
4. 死信交换机将消息投入相应的死信队列
5. 死信队列的消费者消费死信消息

死信消息是RabbitMQ为我们做的一层保证，其实我们也可以不使用死信队列，而是在消息消费异常时，将消息主动投递到另一个交换机中，当你明白了这些之后，这些Exchange和Queue想怎样配合就能怎么配合。比如从死信队列拉取消息，然后发送邮件、短信、钉钉通知来通知开发人员关注。或者将消息重新投递到一个队列然后设置过期时间，来进行延时消费。

## 参考文章

[一文带你搞定RabbitMQ死信队列](https://www.cnblogs.com/mfrank/p/11184929.html)

