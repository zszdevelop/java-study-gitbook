---
order: 810
category:
  - RabbitMQ  
  - MQ

---

# RabbitMQ实战 - Exchange的四种类型以及用法

## 0. 前言

**消息发送到RabbitMQ后首先要经过Exchange路由才能找到对应的Queue**。实际上Exchange类型有四种，根据不同的类型工作的方式也有所不同

- Direct Exchange(直连)
- Fanout exchange(发布订阅)
- Topic Exchange(通配符)
- Headers Exchange(请求头匹配，不推荐)

## 1. Direct Exchange(直连)

见文知意，直连交换机意思是此交换机需要绑定一个队列，要求**该消息与一个特定的路由键完全匹配**。简单点说就是一对一的，点对点的发送。

![image-20220922203746317](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922203746317.png)

### 1.1 代码实现

因为我用的是SpringBoot，所以在**生产者这边**加入对应的starter依赖即可：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

一般需要创建一个公共项目common，共享一些配置，比如队列主题，交换机名称，路由匹配键名称等等。


![image-20220923134359709](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923134359709.png)

首先在application.yml文件加上RabbitMQ的配置信息：

```yml
spring:
    rabbitmq:
        host: 127.0.0.1
        port: 5672
        username: guest
        password: guest
```

然后在生产者这边，加上common包的maven依赖，然后创建一个Direct交换机以及队列的配置类：

```java
@Configuration
public class DirectRabbitConfig {
    @Bean
    public Queue rabbitmqDemoDirectQueue() {
        /**
         * 1、name:    队列名称
         * 2、durable: 是否持久化
         * 3、exclusive: 是否独享、排外的。如果设置为true，定义为排他队列。则只有创建者可以使用此队列。也就是private私有的。
         * 4、autoDelete: 是否自动删除。也就是临时队列。当最后一个消费者断开连接后，会自动删除。
         * */
        return new Queue(RabbitMQConfig.RABBITMQ_DEMO_TOPIC, true, false, false);
    }
    
    @Bean
    public DirectExchange rabbitmqDemoDirectExchange() {
        //Direct交换机
        return new DirectExchange(RabbitMQConfig.RABBITMQ_DEMO_DIRECT_EXCHANGE, true, false);
    }

    @Bean
    public Binding bindDirect() {
        //链式写法，绑定交换机和队列，并设置匹配键
        return BindingBuilder
                //绑定队列
                .bind(rabbitmqDemoDirectQueue())
                //到交换机
                .to(rabbitmqDemoDirectExchange())
                //并设置匹配键
                .with(RabbitMQConfig.RABBITMQ_DEMO_DIRECT_ROUTING);
    }
}
```

然后再创建一个发送消息的Service类：

```java
@Service
public class RabbitMQServiceImpl implements RabbitMQService {
    //日期格式化
    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Resource
    private RabbitTemplate rabbitTemplate;

    @Override
    public String sendMsg(String msg) throws Exception {
        try {
            String msgId = UUID.randomUUID().toString().replace("-", "").substring(0, 32);
            String sendTime = sdf.format(new Date());
            Map<String, Object> map = new HashMap<>();
            map.put("msgId", msgId);
            map.put("sendTime", sendTime);
            map.put("msg", msg);
            rabbitTemplate.convertAndSend(RabbitMQConfig.RABBITMQ_DEMO_DIRECT_EXCHANGE, RabbitMQConfig.RABBITMQ_DEMO_DIRECT_ROUTING, map);
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
}
```

然后根据业务放在需要用的地方，比如定时任务，或者接口。我这里就简单一点使用Controller层进行发送：

```java
@RestController
@RequestMapping("/mall/rabbitmq")
public class RabbitMQController {
    @Resource
    private RabbitMQService rabbitMQService;
    /**
     * 发送消息
     * @author java技术爱好者
     */
    @PostMapping("/sendMsg")
    public String sendMsg(@RequestParam(name = "msg") String msg) throws Exception {
        return rabbitMQService.sendMsg(msg);
    }
}
```

生产者写完之后，就写消费者端的代码，消费者很简单。maven依赖，yml文件配置和生产者一样。只需要创建一个类，@RabbitListener注解写上监听队列的名称，如图所示：

![image-20220923134450795](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923134450795.png)

**这里有个小坑**，一开始RabbitMQ服务器里还没有创建队列：

![image-20220923134505923](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923134505923.png)

这时如果启动消费者，会报错：

![image-20220923134519919](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923134519919.png)

要先启动生产者，发送一条消息：

![image-20220923134533831](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923134533831.png)

![image-20220923134541713](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923134541713.png)

最后再启动消费者，进行消费：

![image-20220923134553618](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923134553618.png)

这时候就会持续监听队列的消息，只要生产者发送一条消息到MQ，消费者就消费一条。我这里尝试发送4条：

![image-20220923134609175](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923134609175.png)

由于队列不存在，启动消费者报错的这个问题。最好的方法是生产者和消费者都尝试创建队列，怎么写呢，有很多方式，我这里用一个相对简单一点的：

生产者的配置类加点东西：

```java
//实现BeanPostProcessor类，使用Bean的生命周期函数
@Component
public class DirectRabbitConfig implements BeanPostProcessor {
    //这是创建交换机和队列用的rabbitAdmin对象
    @Resource
    private RabbitAdmin rabbitAdmin;
    
    //初始化rabbitAdmin对象
    @Bean
    public RabbitAdmin rabbitAdmin(ConnectionFactory connectionFactory) {
        RabbitAdmin rabbitAdmin = new RabbitAdmin(connectionFactory);
        // 只有设置为 true，spring 才会加载 RabbitAdmin 这个类
        rabbitAdmin.setAutoStartup(true);
        return rabbitAdmin;
    }
    
    //实例化bean后，也就是Bean的后置处理器
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        //创建交换机
        rabbitAdmin.declareExchange(rabbitmqDemoDirectExchange());
        //创建队列
        rabbitAdmin.declareQueue(rabbitmqDemoDirectQueue());
        return null;
    }
}
```

这样启动生产者就会自动创建交换机和队列，不用等到发送消息才创建。

消费者需要加一点代码：

```java
@Component
//使用queuesToDeclare属性，如果不存在则会创建队列
@RabbitListener(queuesToDeclare = @Queue(RabbitMQConfig.RABBITMQ_DEMO_TOPIC))
public class RabbitDemoConsumer {
    //...省略
}
```

这样，无论生产者还是消费者先启动都不会出现问题了~

## 2. Fanout exchange(发布订阅)

这种类型的交换机需要将队列绑定到交换机上。**一个发送到交换机的消息都会被转发到与该交换机绑定的所有队列上**。很像子网广播，每台子网内的主机都获得了一份复制的消息。简单点说就是发布订阅。

![image-20220922204506785](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922204506785.png)

### 2.2 代码实现

首先要先配置交换机和队列的名称：

```java
public class RabbitMQConfig {
    /**
     * RabbitMQ的FANOUT_EXCHANG交换机类型的队列 A 的名称
     */
    public static final String FANOUT_EXCHANGE_QUEUE_TOPIC_A = "fanout.A";

    /**
     * RabbitMQ的FANOUT_EXCHANG交换机类型的队列 B 的名称
     */
    public static final String FANOUT_EXCHANGE_QUEUE_TOPIC_B = "fanout.B";

    /**
     * RabbitMQ的FANOUT_EXCHANG交换机类型的名称
     */
    public static final String FANOUT_EXCHANGE_DEMO_NAME = "fanout.exchange.demo.name";

}
```

再配置FanoutExchange类型的交换机和A、B两个队列，并且绑定。这种类型不需要配置routing key：

```java
@Component
public class DirectRabbitConfig implements BeanPostProcessor {
    @Resource
    private RabbitAdmin rabbitAdmin;
    
    @Bean
    public Queue fanoutExchangeQueueA() {
        //队列A
        return new Queue(RabbitMQConfig.FANOUT_EXCHANGE_QUEUE_TOPIC_A, true, false, false);
    }

    @Bean
    public Queue fanoutExchangeQueueB() {
        //队列B
        return new Queue(RabbitMQConfig.FANOUT_EXCHANGE_QUEUE_TOPIC_B, true, false, false);
    }

    @Bean
    public FanoutExchange rabbitmqDemoFanoutExchange() {
        //创建FanoutExchange类型交换机
        return new FanoutExchange(RabbitMQConfig.FANOUT_EXCHANGE_DEMO_NAME, true, false);
    }

    @Bean
    public Binding bindFanoutA() {
        //队列A绑定到FanoutExchange交换机
        return BindingBuilder.bind(fanoutExchangeQueueA()).to(rabbitmqDemoFanoutExchange());
    }

    @Bean
    public Binding bindFanoutB() {
        //队列B绑定到FanoutExchange交换机
        return BindingBuilder.bind(fanoutExchangeQueueB()).to(rabbitmqDemoFanoutExchange());
    }
    
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        //启动项目即创建交换机和队列
        rabbitAdmin.declareExchange(rabbitmqDemoFanoutExchange());
        rabbitAdmin.declareQueue(fanoutExchangeQueueB());
        rabbitAdmin.declareQueue(fanoutExchangeQueueA());
        return null;
    }
}
```

创建service发布消息的方法：

```java
@Service
public class RabbitMQServiceImpl implements RabbitMQService {
    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Resource
    private RabbitTemplate rabbitTemplate;
    
    //发布消息
    @Override
    public String sendMsgByFanoutExchange(String msg) throws Exception {
        Map<String, Object> message = getMessage(msg);
        try {
            rabbitTemplate.convertAndSend(RabbitMQConfig.FANOUT_EXCHANGE_DEMO_NAME, "", message);
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
    //组装消息体
    private Map<String, Object> getMessage(String msg) {
        String msgId = UUID.randomUUID().toString().replace("-", "").substring(0, 32);
        String sendTime = sdf.format(new Date());
        Map<String, Object> map = new HashMap<>();
        map.put("msgId", msgId);
        map.put("sendTime", sendTime);
        map.put("msg", msg);
        return map;
    }
}
```

Controller接口：

```java
@RestController
@RequestMapping("/mall/rabbitmq")
public class RabbitMQController {
    /**
     * 发布消息
     *
     * @author java技术爱好者
     */
    @PostMapping("/publish")
    public String publish(@RequestParam(name = "msg") String msg) throws Exception {
        return rabbitMQService.sendMsgByFanoutExchange(msg);
    }
}
```

接着在消费者项目这边，创建两个队列的监听类，监听队列进行消费：

```java
@Component
@RabbitListener(queuesToDeclare = @Queue(RabbitMQConfig.FANOUT_EXCHANGE_QUEUE_TOPIC_A))
public class FanoutExchangeConsumerA {

    @RabbitHandler
    public void process(Map<String, Object> map) {
        System.out.println("队列A收到消息：" + map.toString());
    }

}

@Component
@RabbitListener(queuesToDeclare = @Queue(RabbitMQConfig.FANOUT_EXCHANGE_QUEUE_TOPIC_B))
public class FanoutExchangeConsumerB {

    @RabbitHandler
    public void process(Map<String, Object> map) {
        System.out.println("队列B收到消息：" + map.toString());
    }
}
```

然后启动生产者和消费者两个项目，可以看到管理界面创建了一个FanoutExchange交换机和两个队列，并且绑定了：

![image-20220923135120900](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923135120900.png)

使用POSTMAN进行发送消息，测试：

![image-20220923135135310](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923135135310.png)

然后可以看到控制台，两个队列同时都收到了相同的消息，形成了发布订阅的效果：

![image-20220923135156170](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923135156170.png)

## 3. Topic Exchange(通配符)

直接翻译的话叫做主题交换机，如果从用法上面翻译可能叫通配符交换机会更加贴切。这种交换机是使用通配符去匹配，路由到对应的队列。通配符有两种："*" 、 "#"。需要注意的是通配符前面必须要加上"."符号。

`*` 符号：有且只匹配一个词。比如 `a.*`可以匹配到"a.b"、"a.c"，但是匹配不了"a.b.c"。

`#` 符号：匹配一个或多个词。比如"rabbit.#"既可以匹配到"rabbit.a.b"、"rabbit.a"，也可以匹配到"rabbit.a.b.c"。

![image-20220922204704979](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922204704979.png)

比较常用的就是以上三种：直连(DirectExchange)，发布订阅(FanoutExchange)，通配符(TopicExchange)。熟练运用这三种交换机类型，基本上可以解决大部分的业务场景。

实际上稍微思考一下，可以发现通配符(TopicExchange)这种模式其实是可以达到直连(DirectExchange)和发布订阅(FanoutExchange)这两种的效果的。

FanoutExchange不需要绑定routingKey，所以性能相对TopicExchange会好一点。

### 3.1 代码实现

依然是配置TopicExchange名称和三个队列的名称：

```java
    /**
     * RabbitMQ的TOPIC_EXCHANGE交换机名称
     */
    public static final String TOPIC_EXCHANGE_DEMO_NAME = "topic.exchange.demo.name";

    /**
     * RabbitMQ的TOPIC_EXCHANGE交换机的队列A的名称
     */
    public static final String TOPIC_EXCHANGE_QUEUE_A = "topic.queue.a";

    /**
     * RabbitMQ的TOPIC_EXCHANGE交换机的队列B的名称
     */
    public static final String TOPIC_EXCHANGE_QUEUE_B = "topic.queue.b";

    /**
     * RabbitMQ的TOPIC_EXCHANGE交换机的队列C的名称
     */
    public static final String TOPIC_EXCHANGE_QUEUE_C = "topic.queue.c";
```

然后还是老配方，配置交换机和队列，然后绑定，创建：

```java
@Component
public class DirectRabbitConfig implements BeanPostProcessor {
    //省略...
    
    @Bean
    public TopicExchange rabbitmqDemoTopicExchange() {
        //配置TopicExchange交换机
        return new TopicExchange(RabbitMQConfig.TOPIC_EXCHANGE_DEMO_NAME, true, false);
    }

    @Bean
    public Queue topicExchangeQueueA() {
        //创建队列1
        return new Queue(RabbitMQConfig.TOPIC_EXCHANGE_QUEUE_A, true, false, false);
    }

    @Bean
    public Queue topicExchangeQueueB() {
        //创建队列2
        return new Queue(RabbitMQConfig.TOPIC_EXCHANGE_QUEUE_B, true, false, false);
    }

    @Bean
    public Queue topicExchangeQueueC() {
        //创建队列3
        return new Queue(RabbitMQConfig.TOPIC_EXCHANGE_QUEUE_C, true, false, false);
    }

    @Bean
    public Binding bindTopicA() {
        //队列A绑定到FanoutExchange交换机
        return BindingBuilder.bind(topicExchangeQueueB())
                .to(rabbitmqDemoTopicExchange())
                .with("a.*");
    }

    @Bean
    public Binding bindTopicB() {
        //队列A绑定到FanoutExchange交换机
        return BindingBuilder.bind(topicExchangeQueueC())
                .to(rabbitmqDemoTopicExchange())
                .with("a.*");
    }

    @Bean
    public Binding bindTopicC() {
        //队列A绑定到FanoutExchange交换机
        return BindingBuilder.bind(topicExchangeQueueA())
                .to(rabbitmqDemoTopicExchange())
                .with("rabbit.#");
    }
    
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        rabbitAdmin.declareExchange(rabbitmqDemoTopicExchange());
        rabbitAdmin.declareQueue(topicExchangeQueueA());
        rabbitAdmin.declareQueue(topicExchangeQueueB());
        rabbitAdmin.declareQueue(topicExchangeQueueC());
        return null;
    }
}
```

然后写一个发送消息的service方法：

```java
@Service
public class RabbitMQServiceImpl implements RabbitMQService {
    @Override
    public String sendMsgByTopicExchange(String msg, String routingKey) throws Exception {
        Map<String, Object> message = getMessage(msg);
        try {
            //发送消息
            rabbitTemplate.convertAndSend(RabbitMQConfig.TOPIC_EXCHANGE_DEMO_NAME, routingKey, message);
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
}
```

写一个Controller接口：

```java
@RestController
@RequestMapping("/mall/rabbitmq")
public class RabbitMQController {
    @Resource
    private RabbitMQService rabbitMQService;
    
    /**
     * 通配符交换机发送消息
     *
     * @author java技术爱好者
     */
    @PostMapping("/topicSend")
    public String topicSend(@RequestParam(name = "msg") String msg, @RequestParam(name = "routingKey") String routingKey) throws Exception {
        return rabbitMQService.sendMsgByTopicExchange(msg, routingKey);
    }
}
```

生产者这边写完，就写消费端，消费端比较简单，写三个监听类：

```java
@Component
@RabbitListener(queuesToDeclare = @Queue(RabbitMQConfig.TOPIC_EXCHANGE_QUEUE_A))
public class TopicExchangeConsumerA {

    @RabbitHandler
    public void process(Map<String, Object> map) {
        System.out.println("队列[" + RabbitMQConfig.TOPIC_EXCHANGE_QUEUE_A + "]收到消息：" + map.toString());
    }
}

@Component
@RabbitListener(queuesToDeclare = @Queue(RabbitMQConfig.TOPIC_EXCHANGE_QUEUE_B))
public class TopicExchangeConsumerB {

    @RabbitHandler
    public void process(Map<String, Object> map) {
        System.out.println("队列[" + RabbitMQConfig.TOPIC_EXCHANGE_QUEUE_B+ "]收到消息：" + map.toString());
    }
}

@Component
@RabbitListener(queuesToDeclare = @Queue(RabbitMQConfig.TOPIC_EXCHANGE_QUEUE_C))
public class TopicExchangeConsumerC {

    @RabbitHandler
    public void process(Map<String, Object> map) {
        System.out.println("队列[" + RabbitMQConfig.TOPIC_EXCHANGE_QUEUE_C + "]收到消息：" + map.toString());
    }
}
```

大功告成，然后启动项目开始调试。启动成功后可以看到队列和路由键绑定的关系：


![image-20220923135517317](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923135517317.png)

通过POSTMAN进行测试，测试一下 rabbit.# 的路由键是否能够匹配成功：

![image-20220923135534580](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923135534580.png)

测试成功，队列A消费到消息：

![image-20220923135605396](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923135605396.png)

接着测试 a.* 路由键，发送 routingKey = a.b ：

![image-20220923135627488](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923135627488.png)

![image-20220923135634279](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923135634279.png)

比较常用的就是以上三种：直连(DirectExchange)，发布订阅(FanoutExchange)，通配符(TopicExchange)。熟练运用这三种交换机类型，基本上可以解决大部分的业务场景。

实际上稍微思考一下，可以发现通配符(TopicExchange)这种模式其实是可以达到直连(DirectExchange)和发布订阅(FanoutExchange)这两种的效果的。

FanoutExchange不需要绑定routingKey，所以性能相对TopicExchange会好一点。

## 4. Headers Exchange(请求头匹配，不推荐)

这种交换机用的相对没这么多。**它跟上面三种有点区别，它的路由不是用routingKey进行路由匹配，而是在匹配请求头中所带的键值进行路由**。如图所示：

![image-20220922204955736](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922204955736.png)

创建队列需要设置绑定的头部信息，有两种模式：**全部匹配和部分匹配**。如上图所示，交换机会根据生产者发送过来的头部信息携带的键值去匹配队列绑定的键值，路由到对应的队列。

### 4.1 代码实现

首先还是需要定义交换机名称，队列名称：

```
    /**
     * HEADERS_EXCHANGE交换机名称
     */
    public static final String HEADERS_EXCHANGE_DEMO_NAME = "headers.exchange.demo.name";

    /**
     * RabbitMQ的HEADERS_EXCHANGE交换机的队列A的名称
     */
    public static final String HEADERS_EXCHANGE_QUEUE_A = "headers.queue.a";

    /**
     * RabbitMQ的HEADERS_EXCHANGE交换机的队列B的名称
     */
    public static final String HEADERS_EXCHANGE_QUEUE_B = "headers.queue.b";
```

然后设置交换机，队列，进行绑定：

```
@Component
public class DirectRabbitConfig implements BeanPostProcessor {
    @Bean
    public Queue headersQueueA() {
        return new Queue(RabbitMQConfig.HEADERS_EXCHANGE_QUEUE_A, true, false, false);
    }

    @Bean
    public Queue headersQueueB() {
        return new Queue(RabbitMQConfig.HEADERS_EXCHANGE_QUEUE_B, true, false, false);
    }

    @Bean
    public HeadersExchange rabbitmqDemoHeadersExchange() {
        return new HeadersExchange(RabbitMQConfig.HEADERS_EXCHANGE_DEMO_NAME, true, false);
    }

    @Bean
    public Binding bindHeadersA() {
        Map<String, Object> map = new HashMap<>();
        map.put("key_one", "java");
        map.put("key_two", "rabbit");
        //全匹配
        return BindingBuilder.bind(headersQueueA())
                .to(rabbitmqDemoHeadersExchange())
                .whereAll(map).match();
    }

    @Bean
    public Binding bindHeadersB() {
        Map<String, Object> map = new HashMap<>();
        map.put("headers_A", "coke");
        map.put("headers_B", "sky");
        //部分匹配
        return BindingBuilder.bind(headersQueueB())
                .to(rabbitmqDemoHeadersExchange())
                .whereAny(map).match();
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        rabbitAdmin.declareExchange(rabbitmqDemoHeadersExchange());
        rabbitAdmin.declareQueue(headersQueueA());
        rabbitAdmin.declareQueue(headersQueueB());
        return null;
    }
}
```

再写一个Service方法发送消息:

```
@Service
public class RabbitMQServiceImpl implements RabbitMQService {
    @Resource
    private RabbitTemplate rabbitTemplate;
    
    @Override
    public String sendMsgByHeadersExchange(String msg, Map<String, Object> map) throws Exception {
        try {
            MessageProperties messageProperties = new MessageProperties();
            //消息持久化
            messageProperties.setDeliveryMode(MessageDeliveryMode.PERSISTENT);
            messageProperties.setContentType("UTF-8");
            //添加消息
            messageProperties.getHeaders().putAll(map);
            Message message = new Message(msg.getBytes(), messageProperties);
            rabbitTemplate.convertAndSend(RabbitMQConfig.HEADERS_EXCHANGE_DEMO_NAME, null, message);
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
}
```

再写一个Controller接口：

```
@RestController
@RequestMapping("/mall/rabbitmq")
public class RabbitMQController {
    @Resource
    private RabbitMQService rabbitMQService;
    
    @PostMapping("/headersSend")
    @SuppressWarnings("unchecked")
    public String headersSend(@RequestParam(name = "msg") String msg,
                              @RequestParam(name = "json") String json) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map = mapper.readValue(json, Map.class);
        return rabbitMQService.sendMsgByHeadersExchange(msg, map);
    }
}
```

生产者这边写完了，再写两个队列的监听类进行消费：

```
@Component
public class HeadersExchangeConsumerA {
    @RabbitListener(queuesToDeclare = @Queue(RabbitMQConfig.HEADERS_EXCHANGE_QUEUE_A))
    public void process(Message message) throws Exception {
        MessageProperties messageProperties = message.getMessageProperties();
        String contentType = messageProperties.getContentType();
        System.out.println("队列[" + RabbitMQConfig.HEADERS_EXCHANGE_QUEUE_A + "]收到消息：" + new String(message.getBody(), contentType));
    }
}

@Component
public class HeadersExchangeConsumerB {
    @RabbitListener(queuesToDeclare = @Queue(RabbitMQConfig.HEADERS_EXCHANGE_QUEUE_B))
    public void process(Message message) throws Exception {
        MessageProperties messageProperties = message.getMessageProperties();
        String contentType = messageProperties.getContentType();
        System.out.println("队列[" + RabbitMQConfig.HEADERS_EXCHANGE_QUEUE_B + "]收到消息：" + new String(message.getBody(), contentType));
    }
}
```

大功告成~启动项目，打开管理界面，我们可以看到交换机绑定队列的信息：

![image-20220923135747132](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923135747132.png)

跟上面示意图一样~证明没有问题，一切尽在掌握之中。使用POSTMAN发送，测试全匹配的队列A：

![image-20220923135802788](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923135802788.png)

![image-20220923135808988](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923135808988.png)

再测试部分匹配的队列B：

![image-20220923135820620](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923135820620.png)

![image-20220923135827372](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923135827372.png)

## 参考文章

[超详细的RabbitMQ入门，看这篇就够了！](https://juejin.cn/post/6854573219253485575#heading-10)