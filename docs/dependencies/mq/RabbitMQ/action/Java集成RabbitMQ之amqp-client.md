# Java集成RabbitMQ(amqp-client)

## 1. 基础使用

1. pom 依赖

   ```xml
    <dependency>
     <groupId>com.rabbitmq</groupId>
     <artifactId>amqp-client</artifactId>
     <version>5.2.0</version>
   </dependency>
   ```

2. **Rabbit的连接，两种方式：**

   方式一：

   ```java
   public static Connection GetRabbitConnection() {
   	ConnectionFactory factory = new ConnectionFactory();
   	factory.setUsername(Config.UserName);
   	factory.setPassword(Config.Password);
   	factory.setVirtualHost(Config.VHost);
   	factory.setHost(Config.Host);
   	factory.setPort(Config.Port);
   	Connection conn = null;
   	try {
   		conn = factory.newConnection();
   	} catch (Exception e) {
   		e.printStackTrace();
   	}
   	return conn;
   }
   ```

   方式二：

   ```java
   public static Connection GetRabbitConnection2() {
   	ConnectionFactory factory = new ConnectionFactory();
   	// 连接格式：amqp://userName:password@hostName:portNumber/virtualHost
   	String uri = String.format("amqp://%s:%s@%s:%d%s", Config.UserName, Config.Password, Config.Host, Config.Port,
   			Config.VHost);
   	Connection conn = null;
   	try {
   		factory.setUri(uri);
   		factory.setVirtualHost(Config.VHost);
   		conn = factory.newConnection();
   	} catch (Exception e) {
   		e.printStackTrace();
   	}
   	return conn;
   }
   ```

3. **第二部分：应用类，使用最简单的方式发布和消费消息**

   ```java
   public static void main(String[] args) {
   	Publisher(); // 推送消息
   
   	Consumer(); // 消费消息
   }
   
   /**
    * 推送消息
    */
   public static void Publisher() {
   	// 创建一个连接
   	Connection conn = ConnectionFactoryUtil.GetRabbitConnection();
   	if (conn != null) {
   		try {
   			// 创建通道
   			Channel channel = conn.createChannel();
   			// 声明队列【参数说明：参数一：队列名称，参数二：是否持久化；参数三：是否独占模式；参数四：消费者断开连接时是否删除队列；参数五：消息其他参数】
   			channel.queueDeclare(Config.QueueName, false, false, false, null);
   			String content = String.format("当前时间：%s", new Date().getTime());
   			// 发送内容【参数说明：参数一：交换机名称；参数二：队列名称，参数三：消息的其他属性-routing headers，此属性为MessageProperties.PERSISTENT_TEXT_PLAIN用于设置纯文本消息存储到硬盘；参数四：消息主体】
   			channel.basicPublish("", Config.QueueName, null, content.getBytes("UTF-8"));
   			System.out.println("已发送消息：" + content);
   			// 关闭连接
   			channel.close();
   			conn.close();
   		} catch (Exception e) {
   			e.printStackTrace();
   		}
   	}
   }
   
   /**
    * 消费消息
    */
   public static void Consumer() {
   	// 创建一个连接
   	Connection conn = ConnectionFactoryUtil.GetRabbitConnection();
   	if (conn != null) {
   		try {
   			// 创建通道
   			Channel channel = conn.createChannel();
   			// 声明队列【参数说明：参数一：队列名称，参数二：是否持久化；参数三：是否独占模式；参数四：消费者断开连接时是否删除队列；参数五：消息其他参数】
   			channel.queueDeclare(Config.QueueName, false, false, false, null);
   
   			// 创建订阅器，并接受消息
   			channel.basicConsume(Config.QueueName, false, "", new DefaultConsumer(channel) {
   				@Override
   				public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties,
   						byte[] body) throws IOException {
   					String routingKey = envelope.getRoutingKey(); // 队列名称
   					String contentType = properties.getContentType(); // 内容类型
   					String content = new String(body, "utf-8"); // 消息正文
   					System.out.println("消息正文：" + content);
   					channel.basicAck(envelope.getDeliveryTag(), false); // 手动确认消息【参数说明：参数一：该消息的index；参数二：是否批量应答，true批量确认小于index的消息】
   				}
   			});
   
   		} catch (Exception e) {
   			e.printStackTrace();
   		}
   	}
   }
   ```



## 参考文章

[RabbitMQ系列（二）深入了解RabbitMQ工作原理及简单使用](https://www.cnblogs.com/vipstone/p/9275256.html)