# SpringBoot整合RabbitMQ

## 1. 简介

**主要作用**：解耦

**最标准的用法**：

- 生产者生产消息队列
- 消费者从队列中拿取消息并处理

生产者不用关系是谁来消费，消费者不用关心谁在生产消息，从而达到解耦的目的

**分布式系统中的应用：**分布式事务的支持，RPC的调用等等

## 2. Spring Boot 集成 RabbitMQ

Spring Boot 集成 RabbitMQ 非常简单，如果只是简单的使用配置非常少，Spring Boot 提供了`spring-boot-starter-amqp` 项目对消息各种支持。

### 2.1 简单使用

1、配置 Pom 包，主要是添加 `spring-boot-starter-amqp` 的支持

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

2、配置文件

配置 RabbitMQ 的安装地址、端口以及账户信息

```
spring.application.name=Spring-boot-rabbitmq
spring.rabbitmq.host=120.79.200.111
spring.rabbitmq.port=5672
spring.rabbitmq.username=febs
spring.rabbitmq.password=123456
```

3、队列配置

```java
@Configuration
public class RabbitConfig {

    @Bean
    public Queue Queue() {
        return new Queue("hello");
    }

}
```

4、发送者

rabbitTemplate 是 Spring Boot 提供的默认实现

```java
@component
public class HelloSender {

	@Autowired
	private AmqpTemplate rabbitTemplate;

	public void send() {
		String context = "hello " + new Date();
		System.out.println("Sender : " + context);
		this.rabbitTemplate.convertAndSend("hello", context);
	}

}
```

5、接收者

```java
@Component
@RabbitListener(queues = "hello")
public class HelloReceiver {

    @RabbitHandler
    public void process(String hello) {
        System.out.println("Receiver  : " + hello);
    }

}
```

6、测试

```
@RunWith(SpringRunner.class)
@SpringBootTest
public class RabbitMqHelloTest {

	@Autowired
	private HelloSender helloSender;

	@Test
	public void hello() throws Exception {
		helloSender.send();
	}

}
```

> 注意，发送者和接收者的 queue name 必须一致，不然不能接收



多对多参考以下文章

## 参考文章

[Spring Boot(八)：RabbitMQ 详解](http://www.ityouknow.com/springboot/2016/11/30/spring-boot-rabbitMQ.html)