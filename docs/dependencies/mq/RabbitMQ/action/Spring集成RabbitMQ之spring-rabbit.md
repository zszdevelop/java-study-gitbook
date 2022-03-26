# Spring集成RabbitMQ(spring-rabbit)

# 1. 简介

Spring AMQP 是基于 Spring 框架的AMQP消息解决方案，提供模板化的发送和接收消息的抽象层，提供基于消息驱动的 POJO的消息监听等，

- 使用`RabbitAdmin`去自动声明队列（`queues`），交换机（`exchanges`），绑定（`bindings`）
- 使用`RabbitTemplate`类的实例来发送和接收消息。
- 异步处理消费消息的一个监听容器（`Listener container`）

## 2. 概念

`spring-amqp`模块是对AMQP协议的一个抽象和封装。所以说对所有的AMQP的实现都进行的抽象和封装，比如

- `org.springframework.amqp.core.Binding`：绑定的封装，类型有`QUEUE`和`EXCHANGE`。

-  `org.springframework.amqp.core.Exchange`：其有基本的四种实现

  ![image-20210527162649214](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210527162649214.png)

- `org.springframework.amqp.core.Message`：消息是由属性和body构成，将属性也封装成一个对象MessageProperties。
-  `org.springframework.amqp.core.MessageProperties`：对消息属性进行了抽象。
-  `org.springframework.amqp.core.Queue`：队列的封装。

## 3. 入门实战Demo

1. 加入spring-amqp依赖：

   ```xml
    <dependencies>
           <dependency>
               <groupId>org.springframework.amqp</groupId>
               <artifactId>spring-rabbit</artifactId>
               <version>1.7.3.RELEASE</version>
           </dependency>
       </dependencies>
   ```

2. 容器中纳入ConnectionFactory和RabbitAdmin管理

   ```java
   @Configuration
   public class MQConfig {
   
       @Bean
       public ConnectionFactory connectionFactory(){
           CachingConnectionFactory factory = new CachingConnectionFactory();
           factory.setUri("amqp://zhihao.miao:123456@192.168.1.131:5672");
           return factory;
       }
   
       @Bean
       public RabbitAdmin rabbitAdmin(ConnectionFactory connectionFactory){
           return new RabbitAdmin(connectionFactory);
       }
   }
   ```

3. 使用RabbitAdmin进行Exchange，Queue，Binding操作

   ```java
   import org.springframework.amqp.core.*;
   import org.springframework.amqp.rabbit.core.RabbitAdmin;
   import org.springframework.context.annotation.AnnotationConfigApplicationContext;
   import org.springframework.context.annotation.ComponentScan;
   
   import java.util.HashMap;
   import java.util.Map;
   
   @ComponentScan
   public class Application {
       public static void main(String[] args) {
           AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(Application.class);
   
           RabbitAdmin rabbitAdmin = context.getBean(RabbitAdmin.class);
           System.out.println(rabbitAdmin);
   
           //创建四种类型的Exchange，可重复执行
           rabbitAdmin.declareExchange(new DirectExchange("zhihao.direct.exchange",true,false));
           rabbitAdmin.declareExchange(new TopicExchange("zhihao.topic.exchange",true,false));
           rabbitAdmin.declareExchange(new FanoutExchange("zhihao.fanout.exchange",true,false));
           rabbitAdmin.declareExchange(new HeadersExchange("zhihao.header.exchange",true,false));
   
           //删除Exchange
           //rabbitAdmin.deleteExchange("zhihao.header.exchange");
   
           //定义队列
           rabbitAdmin.declareQueue(new Queue("zhihao.debug",true));
           rabbitAdmin.declareQueue(new Queue("zhihao.info",true));
           rabbitAdmin.declareQueue(new Queue("zhihao.error",true));
   
           //删除队列
           //rabbitAdmin.deleteQueue("zhihao.debug");
   
           //将队列中的消息全消费掉
           rabbitAdmin.purgeQueue("zhihao.info",false);
   
           //绑定,指定要绑定的Exchange和Route key
           rabbitAdmin.declareBinding(new Binding("zhihao.debug",Binding.DestinationType.QUEUE,
                   "zhihao.direct.exchange","zhihao.hehe",new HashMap()));
   
           rabbitAdmin.declareBinding(new Binding("zhihao.info",Binding.DestinationType.QUEUE,
                   "zhihao.direct.exchange","zhihao.haha",new HashMap()));
   
           rabbitAdmin.declareBinding(new Binding("zhihao.error",Binding.DestinationType.QUEUE,
                   "zhihao.direct.exchange","zhihao.welcome",new HashMap()));
   
   
           //绑定header exchange
           Map<String,Object> headerValues = new HashMap<>();
           headerValues.put("type",1);
           headerValues.put("size",10);
   
           //whereAll指定了x-match:   all参数
           rabbitAdmin.declareBinding(BindingBuilder.bind(new Queue("zhihao.debug")).
                   to(new HeadersExchange("zhihao.header.exchange")).whereAll(headerValues).match());
   
           //whereAll指定了x-match:   any参数
           rabbitAdmin.declareBinding(BindingBuilder.bind(new Queue("zhihao.info")).
                   to(new HeadersExchange("zhihao.header.exchange")).whereAny(headerValues).match());
   
   
           //进行解绑
           rabbitAdmin.removeBinding(BindingBuilder.bind(new Queue("zhihao.info")).
                 to(new TopicExchange("zhihao.direct.exchange")).with("zhihao.info"));
   
           //声明topic类型的exchange
           rabbitAdmin.declareExchange(new TopicExchange("zhihao.hehe.exchange",true,false));
           rabbitAdmin.declareExchange(new TopicExchange("zhihao.miao.exchange",true,false));
   
           //exchange与exchange绑定
           rabbitAdmin.declareBinding(new Binding("zhihao.hehe.exchange",Binding.DestinationType.EXCHANGE,
                   "zhihao.miao.exchange","zhihao",new HashMap()));
   
           //使用BindingBuilder进行绑定
           rabbitAdmin.declareBinding(BindingBuilder.bind(new Queue("zhihao.debug")).
                   to(new TopicExchange("zhihao.topic.exchange")).with("zhihao.miao"));
   
           //rabbitAdmin.declareBinding(new Binding("amq.rabbitmq.trace",Binding.DestinationType.EXCHANGE,
                   //"amq.rabbitmq.log","zhihao",new HashMap()));
   
           context.close();
   
       }
   
   }
   
   ```



## 参考文章

[RabbitMQ笔记六：Spring AMQP简介与quick start](https://www.jianshu.com/p/e8de480e3598)

