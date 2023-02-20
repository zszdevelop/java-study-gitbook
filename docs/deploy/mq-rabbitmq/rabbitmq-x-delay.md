---
order: 60
category:
  - RabbitMQ  
  - MQ

---

# RabbitMQ进阶 - 延迟队列

## 1. 简介

在 AMQP 协议或 RabbitMQ 中，本身没有直接支持延迟队列的功能。可以 **通过 DLX 和 TTL **模拟出延迟队列的功能。

![image-20220923203315852](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220923203315852.png)

上图是死信队列的用法，也是延迟队列的用法。唯一不同的是，消费者订阅的是 **死信队列**，没有消费者订阅普通队列的话，当消息过期时间到了，就会被路由到死信队列，这就达成了，消息被延迟消费的目的。



## 参考文章

[延迟队列](https://zq99299.github.io/mq-tutorial/rabbitmq-ac/04/04.html)