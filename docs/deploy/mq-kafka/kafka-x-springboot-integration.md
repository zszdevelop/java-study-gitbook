---
order: 200
category:
  - kafka  
  - MQ


---

# SpringBoot整合kafka

## 1.前提已经安装好kafka

## 2.新建springboot项目

**添加项目依赖**

```xml
<dependency>
            <groupId>org.springframework.kafka</groupId>
            <artifactId>spring-kafka</artifactId>
        </dependency>
```

**添加配置文件application.properties**

```properties
###########【Kafka集群】###########
spring.kafka.bootstrap-servers=192.168.2.243:9092,192.168.2.244:9092,192.168.2.245:9092
###########【初始化生产者配置】###########
# 重试次数
spring.kafka.producer.retries=0
# 应答级别:多少个分区副本备份完成时向生产者发送ack确认(可选0、1、all/-1)
spring.kafka.producer.acks=1
#16384=16KB
#5120=5KB
spring.kafka.producer.batch-size=5120
# 提交延时
spring.kafka.producer.properties.linger.ms=0
# 当生产端积累的消息达到batch-size或接收到消息linger.ms后,生产者就会将消息提交给kafka
# linger.ms为0表示每接收到一条消息就提交给kafka,这时候batch-size其实就没用了

# 生产端缓冲区大小
#33554432B=32M
#5242880=5M
spring.kafka.producer.buffer-memory = 5242880
# Kafka提供的序列化和反序列化类
spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
spring.kafka.producer.value-serializer=org.apache.kafka.common.serialization.StringSerializer
# 自定义分区器
# spring.kafka.producer.properties.partitioner.class=com.felix.kafka.producer.CustomizePartitioner

###########【初始化消费者配置】###########
# 默认的消费组ID
spring.kafka.consumer.properties.group.id=defaultConsumerGroup
# 是否自动提交offset
spring.kafka.consumer.enable-auto-commit=true
# 提交offset延时(接收到消息后多久提交offset)
spring.kafka.consumer.auto.commit.interval.ms=1000
# 当kafka中没有初始offset或offset超出范围时将自动重置offset
# earliest:重置为分区中最小的offset;
# latest:重置为分区中最新的offset(消费分区中新产生的数据);
# none:只要有一个分区不存在已提交的offset,就抛出异常;
spring.kafka.consumer.auto-offset-reset=latest
# 消费会话超时时间(超过这个时间consumer没有发送心跳,就会触发rebalance操作)
spring.kafka.consumer.properties.session.timeout.ms=120000
# 消费请求超时时间
spring.kafka.consumer.properties.request.timeout.ms=180000
# Kafka提供的序列化和反序列化类
spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
spring.kafka.consumer.value-deserializer=org.apache.kafka.common.serialization.StringDeserializer
# 消费端监听的topic不存在时，项目启动会报错(关掉)
spring.kafka.listener.missing-topics-fatal=false
# 设置批量消费
# spring.kafka.listener.type=batch
# 批量消费每次最多消费多少条消息
# spring.kafka.consumer.max-poll-records=50
```

**添加配置文件（可选）**

```java
package com.example.kafka.config;


import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaInitialConfiguration {

    // 创建一个名为testtopic的Topic并设置分区数为8，分区副本数为2
    @Bean
    public NewTopic initialTopic() {
        return new NewTopic("topic-test-llc",3, (short) 2 );
    }
    
    // 如果要修改分区数，只需修改配置值重启项目即可
    // 修改分区数并不会导致数据的丢失，但是分区数只能增大不能减小
    @Bean
    public NewTopic updateTopic() {
        return new NewTopic("testtopic",10, (short) 2 );
    }

}
```

**kafka的生产者,不带回调函数**

```java
package com.example.kafka.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.kafka.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.kafka.core.KafkaTemplate;

@RestController
public class KafkaProducer {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    // 发送消息
    @GetMapping("/kafka/normal/{message}")
    public String sendMessage1(@PathVariable("message") String normalMessage) {
            kafkaTemplate.send("topic-test-llc", normalMessage);
        return "ok";
    }
}
```

**kafka的消费者**

```java
package com.example.kafka.consumer;


import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

//@Component
public class KafkaConsumer {

    // 消费监听
    @KafkaListener(topics = {"topic-test-llc"})
    public void onMessage1(ConsumerRecord<?, ?> record){
        // 消费的哪个topic、partition的消息,打印出消息内容
        System.out.println("简单消费Topic："+record.topic()+"**分区"+record.partition()+"**值内容"+record.value());
    }
}
```

kafka的消费者的启动速度有点慢可能要稍等一短时间才会收到kafka发来的消息

**访问：**

访问路径：

```bash
localhost:8080/kafka/normal/aaa
```

上面示例创建了一个生产者，发送消息到topic1，消费者监听topic1消费消息。监听器用@KafkaListener注解，topics表示监听的topic，支持同时监听多个，用英文逗号分隔。启动项目，postman调接口触发生产者发送消息，

![image-20230920155141704](https://zszblog.oss-cn-beijing.aliyuncs.com/image-20230920155141704.png)

## 3.带回调函数的生产者

kafkaTemplate提供了一个回调方法addCallback，我们可以在回调方法中监控消息是否发送成功 或 失败时做补偿处理，有两种写法。

第一种：

```java
@GetMapping("/kafka/callbackOne/{message}")
public void sendMessage2(@PathVariable("message") String callbackMessage) {
    kafkaTemplate.send("topic1", callbackMessage).addCallback(success -> {
        // 消息发送到的topic
        String topic = success.getRecordMetadata().topic();
        // 消息发送到的分区
        int partition = success.getRecordMetadata().partition();
        // 消息在分区内的offset
        long offset = success.getRecordMetadata().offset();
        System.out.println("发送消息成功:" + topic + "-" + partition + "-" + offset);
    }, failure -> {
        System.out.println("发送消息失败:" + failure.getMessage());
    });
}
```

第二种：

```java
@GetMapping("/kafka/callbackTwo/{message}")
public void sendMessage3(@PathVariable("message") String callbackMessage) {
    kafkaTemplate.send("topic1", callbackMessage).addCallback(new ListenableFutureCallback<SendResult<String, Object>>() {
        @Override
        public void onFailure(Throwable ex) {
            System.out.println("发送消息失败："+ex.getMessage());
        }
 
        @Override
        public void onSuccess(SendResult<String, Object> result) {
            System.out.println("发送消息成功：" + result.getRecordMetadata().topic() + "-"
                    + result.getRecordMetadata().partition() + "-" + result.getRecordMetadata().offset());
        }
    });
}
```

## 4.自定义分区器

kafka中每个topic被划分为多个分区，那么生产者将消息发送到topic时，具体要追加到哪个分区？这就是分区策略，Kafka 为我们提供了默认的分区策略，同时它也支持自定义分区策略。其路由机制为：

① 若发送消息时指定了分区（即自定义分区策略），则直接将消息append到指定分区；

② 若发送消息时未指定 patition，但指定了 key（kafka允许为每条消息设置一个key），则对key值进行hash计算，根据计算结果路由到指定分区，这种情况下可以保证同一个 Key 的所有消息都进入到相同的分区；

③  patition 和 key 都未指定，则使用kafka默认的分区策略，轮询选出一个 patition；

我们自定义一个分区策略，将消息发送到我们指定的partition，首先新建一个分区器类实现Partitioner接口，重写方法，其中partition方法的返回值就表示将消息发送到几号分区，

```java
package com.example.kafka.config;

import org.apache.kafka.clients.producer.Partitioner;
import org.apache.kafka.common.Cluster;

import java.util.Map;

public class CustomizePartitioner implements Partitioner {
    @Override
    public int partition(String s, Object o, byte[] bytes, Object o1, byte[] bytes1, Cluster cluster) {
        //自定义分区规则（这里假设全部发到0号分区）

        return 0;
    }

    @Override
    public void close() {

    }

    @Override
    public void configure(Map<String, ?> map) {

    }
}
```

在application.propertise中配置自定义分区器，配置的值就是分区器类的全路径名，

```properties
# 自定义分区器
spring.kafka.producer.properties.partitioner.class=com.felix.kafka.producer.CustomizePartitioner
```

## 5.kafka事务提交

如果在发送消息时需要创建事务，可以使用 KafkaTemplate 的 executeInTransaction 方法来声明事务，

```java
@GetMapping("/kafka/transaction")
    public void sendMessageTransaction(){
        //生命事务，后面报错消息不会发出去
        kafkaTemplate.executeInTransaction(operations ->{
           operations.send("topic","test executeInTransaction");
           throw new RuntimeException("fail");
        });

        //不声明事务，后面保存但前端消息已经发送成功了
        kafkaTemplate.send("topic","test executeInTransaction");
        throw new RuntimeException("fail");
    }
```

## 6.消费者

指定topic、partition、offset消费

前面我们在监听消费topic1的时候，监听的是topic1上所有的消息，如果我们想指定topic、指定partition、指定offset来消费呢？也很简单，@KafkaListener注解已全部为我们提供。

```java
		/**
     * @Title 指定topic、partition、offset消费
     * @Description 同时监听topic1和topic2，监听topic1的0号分区、
     * topic2的 "0号和1号" 分区，指向1号分区的offset初始值为8
     * @param record
     */
    @KafkaListener(id="consumer1",groupId = "felix-group",topicPartitions = {
            @TopicPartition(topic = "topic1",partitions = {"0"}),
            @TopicPartition(topic = "topic2",partitions = "0",
                    partitionOffsets = @PartitionOffset(partition = "1",initialOffset = "8"))
    })
    public void onMessage2(ConsumerRecord<?,?> record){
        System.out.println("topic:"+record.topic()+"partition:"+record.partition()+"offset:"+record.offset()+"value:"+record.value());
    }
```

属性解释：

① id：消费者ID；

② groupId：消费组ID；

③ topics：监听的topic，可监听多个；

④ topicPartitions：可配置更加详细的监听信息，可指定topic、parition、offset监听。

上面onMessage2监听的含义：监听topic1的0号分区，同时监听topic2的0号分区和topic2的1号分区里面offset从8开始的消息。

注意：topics和topicPartitions不能同时使用；

## 7.批量消费

设置application.prpertise开启批量消费即可，

```properties
# 设置批量消费
spring.kafka.listener.type=batch
# 批量消费每次最多消费多少条消息
spring.kafka.consumer.max-poll-records=50
```

接收消息时用List来接收，监听代码如下，

```java
    @KafkaListener(id="consumer2",groupId = "felix-group",topics = "topic1" )
    public void onMesssage(List<ConsumerRecord<?,?>> records){
        System.out.println(">>>批量消费一次，records.size()="+records.size());
        for(ConsumerRecord<?,?> record:records){
            System.out.println(record.value());
        }
    }
```

## 8.ConsumerAwareListenerErrorHandler异常处理器

通过异常处理器，我们可以处理consumer在消费时发生的异常。

新建一个 ConsumerAwareListenerErrorHandler 类型的异常处理方法，用@Bean注入，BeanName默认就是方法名，然后我们将这个异常处理器的BeanName放到@KafkaListener注解的errorHandler属性里面，当监听抛出异常的时候，则会自动调用异常处理器，

```java
    //异常处理
    // 新建一个异常处理器，用@Bean注入
    @Bean
    public ConsumerAwareListenerErrorHandler consumerAwareErrorHandler(){
        return (message,exception,consumer)->{
            System.out.println("消费异常："+message.getPayload());
            return null;
        };
    }

    //将这个异常处理器的BeanName放到@KafkaListener注解的errorHandler属性里面
    @KafkaListener(topics = {"topic1"},errorHandler = "consumerAwareErrorHandler")
    public void onMessage4(ConsumerRecord<?,?> record) throws Exception{
        throw new Exception("简单消费-模拟异常");
    }

    // 批量消费也一样，异常处理器的message.getPayload()也可以拿到各条消息的信息
    @KafkaListener(topics = "topic1",errorHandler="consumerAwareErrorHandler")
    public void onMessage5(List<ConsumerRecord<?,?>> records) throws Exception{
        System.out.println("批量消费一次...");
        throw new Exception("批量消费-模拟异常");
    }
```

## 9.消息过滤器

消息过滤器可以在消息抵达consumer之前被拦截，在实际应用中，我们可以根据自己的业务逻辑，筛选出需要的信息再交由KafkaListener处理，不需要的消息则过滤掉。

配置消息过滤只需要为 监听器工厂 配置一个RecordFilterStrategy（消息过滤策略），返回true的时候消息将会被抛弃，返回false时，消息能正常抵达监听容器。 @Component public class KafkaConsumer { @Autowired ConsumerFactory consumerFactory;

```java
package com.example.kafka.consumer;


import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.PartitionOffset;
import org.springframework.kafka.annotation.TopicPartition;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.listener.ConsumerAwareListenerErrorHandler;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class KafkaConsumer {

    @Autowired
    ConsumerFactory consumerFactory;

    //消息过滤器
    @Bean
    public ConcurrentKafkaListenerContainerFactory filterContainerFactory(){
        ConcurrentKafkaListenerContainerFactory factory=new ConcurrentKafkaListenerContainerFactory();
        factory.setConsumerFactory(consumerFactory);
        //被过滤器的消息将被丢弃
        factory.setAckDiscarded(true);
        //消息过滤策略
        factory.setRecordFilterStrategy(consumerRecord -> {
            if(Integer.parseInt(consumerRecord.value().toString())%2==0){
                return false;
            }
            //返回true消息则被过滤
            return true;
        });
        return factory;
    }

    //消息过滤监听
    @KafkaListener(topics = {"topic1"},containerFactory = "filterContainerFactory")
    public void onMessage6(ConsumerRecord<?,?> record){
        System.out.println(record.value());
    }
}
```

上面实现了一个"过滤奇数、接收偶数"的过滤策略，我们向topic1发送0-99总共100条消息，看一下监听器的消费情况，可以看到监听器只消费了偶数，

## 10.消息转发

在实际开发中，我们可能有这样的需求，应用A从TopicA获取到消息，经过处理后转发到TopicB，再由应用B监听处理消息，即一个应用处理完成后将该消息转发至其他应用，完成消息的转发。

在SpringBoot集成Kafka实现消息的转发也很简单，只需要通过一个@SendTo注解，被注解方法的return值即转发的消息内容，如下

```java
   /**
     * @Title 消息转发
     * @Description 从topic1接收到的消息经过处理后转发到topic2
     * @param record
     * @return
     */
    @KafkaListener(topics = {"topic"})
    @SendTo("topic2")
    public String onMessage7(ConsumerRecord<?,?> record){
        return record.value()+"-forward message";
    }
```

## 11.定时启动，停止监听器

默认情况下，当消费者项目启动的时候，监听器就开始工作，监听消费发送到指定topic的消息，那如果我们不想让监听器立即工作，想让它在我们指定的时间点开始工作，或者在我们指定的时间点停止工作，该怎么处理呢——使用KafkaListenerEndpointRegistry，下面我们就来实现：

① 禁止监听器自启动；

② 创建两个定时任务，一个用来在指定时间点启动定时器，另一个在指定时间点停止定时器；

新建一个定时任务类，用注解@EnableScheduling声明，KafkaListenerEndpointRegistry 在SpringIO中已经被注册为Bean，直接注入，设置禁止KafkaListener自启动，

```java
@EnableScheduling
@Component
public class CronTimer {
    /**
     * @KafkaListener注解所标注的方法并不会在IOC容器中被注册为Bean，
     * 而是会被注册在KafkaListenerEndpointRegistry中，
     * 而KafkaListenerEndpointRegistry在SpringIOC中已经被注册为Bean
     **/
    @Autowired
    private KafkaListenerEndpointRegistry registry;
    
    @Autowired
    private ConsumerFactory consumerFactory;

    // 监听器容器工厂(设置禁止KafkaListener自启动)
    @Bean
    public ConcurrentKafkaListenerContainerFactory delayContainerFactory() {
        ConcurrentKafkaListenerContainerFactory container = new ConcurrentKafkaListenerContainerFactory();
        container.setConsumerFactory(consumerFactory);
        //禁止KafkaListener自启动
        container.setAutoStartup(false);
        return container;
    }

    // 监听器
    @KafkaListener(id="timingConsumer",topics = "topic1",containerFactory = "delayContainerFactory")
    public void onMessage1(ConsumerRecord<?, ?> record){
        System.out.println("消费成功："+record.topic()+"-"+record.partition()+"-"+record.value());
    }

    // 定时启动监听器
    @Scheduled(cron = "0 42 11 * * ? ")
    public void startListener() {
        System.out.println("启动监听器...");
        // "timingConsumer"是@KafkaListener注解后面设置的监听器ID,标识这个监听器
        if (!registry.getListenerContainer("timingConsumer").isRunning()) {
            registry.getListenerContainer("timingConsumer").start();
        }
        //registry.getListenerContainer("timingConsumer").resume();
    }

    // 定时停止监听器
    @Scheduled(cron = "0 45 11 * * ? ")
    public void shutDownListener() {
        System.out.println("关闭监听器...");
        registry.getListenerContainer("timingConsumer").pause();
    }
}
```

启动项目，触发生产者向topic1发送消息，可以看到consumer没有消费，因为这时监听器还没有开始工作，

## 参考文章

[SpringBoot整合kafka](https://juejin.cn/post/7028149679976251422)