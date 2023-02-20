---
order: 520
category:
  - RabbitMQ  
  - MQ
---

# RabbitMQ实战 - 延迟消息-商城下单，超时取消订单

## 1. 业务场景

>用于解决用户下单以后，订单超时如何取消订单的问题。

>为什么需要使用延迟队列？适用于什么场景？  
>
>订单下单之后30分钟后，如果用户没有付钱，则系统自动取消订单。  这样类似的需求是我们经常会遇见的问题。最常用的方法是定期轮训数据库，设置状态。在数据量小的时候并没有什么大的问题，但是数据量一大轮训数据库的方式就会变得特别耗资源。当面对千万级、上亿级数据量时，本身写入的IO就比较高，导致长时间查询或者根本就查不出来。通过使用延迟队列来解决这种问题

- 用户进行下单操作（会有锁定商品库存、使用优惠券、积分一系列的操作）；
- 生成订单，获取订单的id；
- 获取到设置的订单超时时间（假设设置的为60分钟不支付取消订单）；
- 按订单超时时间发送一个延迟消息给RabbitMQ，让它在订单超时后触发取消订单的操作；
- 如果用户没有支付，进行取消订单操作（释放锁定商品库存、返还优惠券、返回积分一系列操作）。

## 2. 整合RabbitMQ实现延迟消息(上)

### 2.1 在pom.xml中添加相关依赖

```xml
<!--消息队列相关依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
<!--lombok依赖-->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

### 2.2 修改SpringBoot配置文件

> 修改application.yml文件，在spring节点下添加RabbitMQ相关配置。

```yml
  rabbitmq:
    host: localhost # rabbitmq的连接地址
    port: 5672 # rabbitmq的连接端口号
    username: root # rabbitmq的用户名
    password: root # rabbitmq的密码
    publisher-confirms: true #如果对异步消息需要回调必须设置为true
```

### 2.3 添加消息队列的枚举配置类QueueEnum

> 用于延迟消息队列及处理取消订单消息队列的常量定义，包括交换机名称、队列名称、路由键名称。

```java
package com.zszdevelop.rabbitmqdemo.enums;


import lombok.Getter;

/**
 * 消息队列枚举配置
 */
@Getter
public enum QueueEnum {
    /**
     * 消息通知队列
     */
    QUEUE_ORDER_CANCEL("himall.order.direct", "himall.order.cancel", "himall.order.cancel"),
    /**
     * 消息通知ttl队列
     */
    QUEUE_TTL_ORDER_CANCEL("himall.order.direct.ttl", "himall.order.cancel.ttl", "himall.order.cancel.ttl");

    /**
     * 交换名称
     */
    private String exchange;
    /**
     * 队列名称
     */
    private String name;
    /**
     * 路由键
     */
    private String routeKey;

    QueueEnum(String exchange, String name, String routeKey) {
        this.exchange = exchange;
        this.name = name;
        this.routeKey = routeKey;
    }
}
```

### 2.4 添加RabbitMQ的配置

> 用于配置交换机、队列及队列与交换机的绑定关系。

```java
package com.zszdevelop.rabbitmqdemo.config;

import com.zszdevelop.rabbitmqdemo.enums.QueueEnum;
import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 消息队列配置
 */
@Configuration
public class RabbitMqConfig {

    /**
     * 订单消息实际消费队列所绑定的交换机
     */
    @Bean
    DirectExchange orderDirect() {
        return (DirectExchange) ExchangeBuilder
                .directExchange(QueueEnum.QUEUE_ORDER_CANCEL.getExchange())
                .durable(true)
                .build();
    }

    /**
     * 订单延迟队列队列所绑定的交换机
     */
    @Bean
    DirectExchange orderTtlDirect() {
        return (DirectExchange) ExchangeBuilder
                .directExchange(QueueEnum.QUEUE_TTL_ORDER_CANCEL.getExchange())
                .durable(true)
                .build();
    }

    /**
     * 订单实际消费队列
     */
    @Bean
    public Queue orderQueue() {
        return new Queue(QueueEnum.QUEUE_ORDER_CANCEL.getName());
    }

    /**
     * 订单延迟队列（死信队列）
     */
    @Bean
    public Queue orderTtlQueue() {
        return QueueBuilder
                .durable(QueueEnum.QUEUE_TTL_ORDER_CANCEL.getName())
                .withArgument("x-dead-letter-exchange", QueueEnum.QUEUE_ORDER_CANCEL.getExchange())//到期后转发的交换机
                .withArgument("x-dead-letter-routing-key", QueueEnum.QUEUE_ORDER_CANCEL.getRouteKey())//到期后转发的路由键
                .build();
    }

    /**
     * 将订单队列绑定到交换机
     */
    @Bean
    Binding orderBinding(DirectExchange orderDirect,Queue orderQueue){
        return BindingBuilder
                .bind(orderQueue)
                .to(orderDirect)
                .with(QueueEnum.QUEUE_ORDER_CANCEL.getRouteKey());
    }

    /**
     * 将订单延迟队列绑定到交换机
     */
    @Bean
    Binding orderTtlBinding(DirectExchange orderTtlDirect,Queue orderTtlQueue){
        return BindingBuilder
                .bind(orderTtlQueue)
                .to(orderTtlDirect)
                .with(QueueEnum.QUEUE_TTL_ORDER_CANCEL.getRouteKey());
    }

}
```

### 2.5 在RabbitMQ管理页面可以看到以下交换机和队列

![image-20201012165633067](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201012165633067.png)

![image-20201012165651267](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201012165651267.png)

#### 交换机及队列说明

- himall.order.direct（取消订单消息队列所绑定的交换机）:绑定的队列为himall.order.cancel，一旦有消息以himall.order.cancel为路由键发过来，会发送到此队列。
- himall.order.direct.ttl（订单延迟消息队列所绑定的交换机）:绑定的队列为himall.order.cancel.ttl，一旦有消息以himall.order.cancel.ttl为路由键发送过来，会转发到此队列，并在此队列保存一定时间，等到超时后会自动将消息发送到himall.order.cancel（取消订单消息消费队列）。

## 3. 整合RabbitMQ实现延迟消息(下)

### 3.1 添加延迟消息的发送者CancelOrderSender

> 用于向订单延迟消息队列（himall.order.cancel.ttl）里发送消息。

```java
package com.zszdevelop.rabbitmqdemo.component;

import com.zszdevelop.rabbitmqdemo.enums.QueueEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessagePostProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 取消订单消息的发出者
 */
@Component
public class CancelOrderSender {
    private static Logger LOGGER =LoggerFactory.getLogger(CancelOrderSender.class);
    @Autowired
    private AmqpTemplate amqpTemplate;

    public void sendMessage(Long orderId,final long delayTimes){
        //给延迟队列发送消息
        amqpTemplate.convertAndSend(QueueEnum.QUEUE_TTL_ORDER_CANCEL.getExchange(), QueueEnum.QUEUE_TTL_ORDER_CANCEL.getRouteKey(), orderId, new MessagePostProcessor() {
            @Override
            public Message postProcessMessage(Message message) throws AmqpException {
                //给消息设置延迟毫秒值
                message.getMessageProperties().setExpiration(String.valueOf(delayTimes));
                return message;
            }
        });
        LOGGER.info("send delay message orderId:{}",orderId);
    }
}
```

### 3.2 添加取消订单消息的接收者CancelOrderReceiver

> 用于从取消订单的消息队列（himall.order.cancel）里接收消息。

```java
package com.zszdevelop.rabbitmqdemo.component;

import com.zszdevelop.rabbitmqdemo.service.OmsPortalOrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 取消订单消息的处理者
 */
@Component
@RabbitListener(queues = "himall.order.cancel")
public class CancelOrderReceiver {
    private static Logger LOGGER =LoggerFactory.getLogger(CancelOrderReceiver.class);
    @Autowired
    private OmsPortalOrderService portalOrderService;
    @RabbitHandler
    public void handle(Long orderId){
        LOGGER.info("receive delay message orderId:{}",orderId);
        portalOrderService.cancelOrder(orderId);
    }
}
```

### 3.3 添加OmsPortalOrderService接口

```java
package com.zszdevelop.rabbitmqdemo.service;


import com.zszdevelop.rabbitmqdemo.dto.CommonResult;
import com.zszdevelop.rabbitmqdemo.dto.OrderParam;
import org.springframework.transaction.annotation.Transactional;

/**
 * 前台订单管理Service
 */
public interface OmsPortalOrderService {

    /**
     * 根据提交信息生成订单
     */
    @Transactional
    CommonResult generateOrder();

    /**
     * 取消单个超时订单
     */
    @Transactional
    void cancelOrder(Long orderId);
}
```

### 3.4 添加OmsPortalOrderService的实现类OmsPortalOrderServiceImpl

```java
package com.zszdevelop.rabbitmqdemo.service.impl;

import com.zszdevelop.rabbitmqdemo.component.CancelOrderSender;
import com.zszdevelop.rabbitmqdemo.dto.CommonResult;
import com.zszdevelop.rabbitmqdemo.dto.OrderParam;
import com.zszdevelop.rabbitmqdemo.service.OmsPortalOrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 前台订单管理Service
 */
@Service
public class OmsPortalOrderServiceImpl implements OmsPortalOrderService {
    private static Logger LOGGER = LoggerFactory.getLogger(OmsPortalOrderServiceImpl.class);
    @Autowired
    private CancelOrderSender cancelOrderSender;

    @Override
    public CommonResult generateOrder() {
        //todo 执行一系类下单操作，具体参考mall项目
        LOGGER.info("process generateOrder");
        //下单完成后开启一个延迟消息，用于当用户没有付款时取消订单（orderId应该在下单后生成）
        sendDelayMessageCancelOrder(11L);
        return CommonResult.success(null, "下单成功");
    }

    @Override
    public void cancelOrder(Long orderId) {
        //todo 执行一系类取消订单操作，具体参考mall项目
        LOGGER.info("process cancelOrder orderId:{}",orderId);
    }

    private void sendDelayMessageCancelOrder(Long orderId) {
        //获取订单超时时间，假设为60分钟
        long delayTimes = 30 * 1000;
        //发送延迟消息
        cancelOrderSender.sendMessage(orderId, delayTimes);
    }

}
```

### 3.5 添加OmsPortalOrderController

```java
/**
 * 订单管理Controller
 */
@Controller
@RequestMapping("/order")
public class OmsPortalOrderController {
    @Autowired
    private OmsPortalOrderService portalOrderService;


    //    根据购物车信息生成订单
    @RequestMapping(value = "/generateOrder", method = RequestMethod.GET)
    @ResponseBody
    public Object generateOrder() {
        return portalOrderService.generateOrder();
    }
}
```

## 4. 下单测试

1. 浏览器访问controller 生成下单的接口

   http://localhost:8080/order/generateOrder

2. 可以看到控制台

   ![image-20201012170924827](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201012170924827.png)

3. 当执行到对应延迟的时间后收到消息

   ![image-20201012171004900](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201012171004900.png)
