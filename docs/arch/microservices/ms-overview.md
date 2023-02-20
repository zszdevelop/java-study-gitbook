---
order: 10
category:
  - 架构
  - 微服务
---



# 微服务 - 概述

- nacos（服务发现和配置中心、元数据中心）
  - [官方文档：https://nacos.io/zh-cn/docs/what-is-nacos.html](https://nacos.io/zh-cn/docs/what-is-nacos.html)
  - [好文：Nacos注册中心的部署与用法详细介绍](https://blog.csdn.net/a745233700/article/details/122915663)
  - [好文：Nacos配置中心用法详细介绍](https://blog.csdn.net/a745233700/article/details/122916208)
  
- spring-cloud-loadbalancer（负载均衡）

- Dubbo: RPC通信 与 微服务治理 
  - [官方文档：https://dubbo.apache.org/zh/overview/what/overview/](https://dubbo.apache.org/zh/overview/what/overview/)
  
- sentinel 服务容错（流控、降级、服务负载）
  - [官方文档：https://sentinelguard.io/zh-cn/docs/introduction.html](https://sentinelguard.io/zh-cn/docs/introduction.html)
  - [官方文档：Sentinel 与 Hystrix 的对比](https://sentinelguard.io/zh-cn/blog/sentinel-vs-hystrix.html)
  
- spring-cloud-stream（mq封装）
  - [官方文档：https://spring.io/projects/spring-cloud-stream](https://spring.io/projects/spring-cloud-stream)
  - [好文：干货｜Spring Cloud Stream 体系及原理介绍](https://fangjian0423.github.io/2019/04/03/spring-cloud-stream-intro/)
  
- SpringCloud Gateway (服务网关)
  - [官方文档：https://spring.io/projects/spring-cloud-gateway](https://spring.io/projects/spring-cloud-gateway)
  - [好文：Spring Cloud Gateway 服务网关的部署与使用详细介绍](https://blog.csdn.net/a745233700/article/details/122917167)

- 认证中心
  - [Sa-Token官网：微服务 - 分布式Session会话](https://sa-token.dev33.cn/doc.html#/micro/dcs-session)
  
- Skywalking （链路追踪）
  - [中文官网](https://skyapm.github.io/document-cn-translation-of-skywalking/zh/8.0.0/concepts-and-designs/)
  - [好文：Skywalking全链路追踪使用说明](https://blog.csdn.net/a745233700/article/details/124456810)

- seata（分布式事务）
  
  > 核心原理：Seata把一个分布式事务理解成一个包含了若干分支事务的全局事务，而一个分支事务是一个满足 ACID 的本地事务，因此我们可以操作分布式事务像操作本地事务一样。
  >
  > Seata 内部定义了 3个模块来处理全局事务和分支事务的关系和处理过程，这三个组件分别是：
  >
  > - Transaction Coordinator (TC)： 事务协调器，维护全局事务的运行状态，负责协调并驱动全局事务的提交或回滚。
  > - Transaction Manager (TM)： 控制全局事务的边界，负责开启一个全局事务，并最终发起全局提交或全局回滚的决议。
  > - Resource Manager (RM)： 控制分支事务，负责分支注册、状态汇报，并接收事务协调器的指令，驱动分支（本地）事务的提交和回滚。
  >
  > 简要说说整个全局事务的执行步骤：
  >
  > 1. TM 向 TC 申请开启一个全局事务，TC 创建全局事务后返回全局唯一的 XID，XID 会在全局事务的上下文中传播；
  > 2. RM 向 TC 注册分支事务，该分支事务归属于拥有相同 XID 的全局事务；
  > 3. TM 向 TC 发起全局提交或回滚；
  > 4. TC 调度 XID 下的分支事务完成提交或者回滚。
  >
  > ### 分支事务如何提交和回滚？
  >
  > 下面详细说说分支事务是如何提交和回滚的：
  >
  > - 第一阶段：
  >
  > 分支事务利用 RM 模块中对 JDBC 数据源代理，加入了若干流程，对业务 SQL 进行解释，把业务数据在更新前后的数据镜像组织成回滚日志，并生成 undo log 日志，对全局事务锁的检查以及分支事务的注册等，利用本地事务 ACID 特性，将业务 SQL 和 undo log 写入同一个事物中一同提交到数据库中，保证业务 SQL 必定存在相应的回滚日志，最后对分支事务状态向 TC 进行上报。
  >
  > ![image-20221215234622450](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221215234622450.png)
  >
  > - 第二阶段：
  >
  > TM决议全局提交：
  >
  > 当 TM 决议提交时，就不需要同步协调处理了，TC 会异步调度各个 RM 分支事务删除对应的 undo log 日志即可，这个步骤非常快速地可以完成。这个机制对于性能提升非常关键，我们知道正常的业务运行过程中，事务执行的成功率是非常高的，因此可以直接在本地事务中提交，这步对于提升性能非常显著。
  >
  > ![image-20221215234611409](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221215234611409.png)
  >
  > TM决议全局回滚：
  >
  > 当 TM 决议回滚时，RM 收到 TC 发送的回滚请求，RM 通过 XID 找到对应的 undo log 回滚日志，然后利用本地事务 ACID 特性，执行回滚日志完成回滚操作并删除 undo log 日志，最后向 TC 进行回滚结果上报。
  >
  > ![image-20221215234558952](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221215234558952.png)
  >
  > 业务对以上所有的流程都无感知，业务完全不关心全局事务的具体提交和回滚，而且最重要的一点是 Seata 将两段式提交的同步协调分解到各个分支事务中了，分支事务与普通的本地事务无任何差异，这意味着我们使用 Seata 后，分布式事务就像使用本地事务一样，完全将数据库层的事务协调机制交给了中间件层 Seata 去做了，这样虽然事务协调搬到应用层了，但是依然可以做到对业务的零侵入，从而剥离了分布式事务方案对数据库在协议支持上的要求，且 Seata 在分支事务完成之后直接释放资源，极大减少了分支事务对资源的锁定时间，完美避免了 XA 协议需要同步协调导致资源锁定时间过长的问题。
  >
  > 
  >
  > Q:`Seata`作为分布式事务时，有些时候我们的分布式时候并不是每次都可以成功的，而对于这些失败的分布式事务就需要进行通知
  >
  > A：实现FailureHandler，来监听失败处理
  
  
  
  
  
  - [官网](http://seata.io/zh-cn/)
  - [官网：分布式事务中间件Seata 的设计原理](https://seata.io/zh-cn/blog/seata-at-mode-design.html)
  - [好文：分布式事务(Seata) 四大模式详解](https://juejin.cn/post/7116023320989925389#heading-1)
  - [好文：Seata分布式事务失败后的处理](https://blog.csdn.net/fu_huo_1993/article/details/120655233)
  
- elk
  - [好文：ELK学习总结（2）——ELK 原理介绍及实践详解](https://blog.csdn.net/u012562943/article/details/101060053)
  - [好文：干货 | Logstash Grok数据结构化ETL实战](https://developer.aliyun.com/article/801870)

- Prometheus/grafana(服务监控)（补充、可不看）
  - [Prometheus 监控方案简述](https://www.hellopz.com/2020/09/18/Prometheus-%E7%9B%91%E6%8E%A7%E6%96%B9%E6%A1%88%E7%AE%80%E8%BF%B0/)
