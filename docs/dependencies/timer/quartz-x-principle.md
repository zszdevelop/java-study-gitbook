---
order: 53
category:
  - 定时任务
---

# 定时任务 - Quartz原理分析

## 1. Quartz概念

Quartz是一个优秀的任务调度框架， 具有以下特点：

- 强大的调度功能，例如支持丰富多样的调度方法，可以满足各种常规及特殊需求；
- 负载均衡
- 高可用

### 1.1 调度器：scheduler

任务调度的控制器，负责定时任务的调度，并且提供任务和触发器的增删改查等api方法。

### 1.2 任务：job

job是实际被调度的任务，每个任务必须指定具体执行任务的实现类，实现类需要继承QuartzJobBean或者实现org.quartz.Job接口，具体的业务逻辑写在execute方法里面。
 是否支持并发的注解：@DisallowConcurrentExecution

### 1.3 触发器：trigger

trigger用来定义调度时间的概念，即按什么样时间规则去触发任务。主要几种类型：

- **SimpleTrigger**：简单触发器，从某个时间开始，每隔多少时间触发，重复多少次。
- **CronTrigger**：使用cron表达式定义触发的时间规则，如"0 0 0,2,4 1/1 * ? *" 表示每天的0，2，4点触发。
- **DailyTimeIntervalTrigger**：每天中的一个时间段，每N个时间单元触发，时间单元可以是毫秒，秒，分，小时
- **CalendarIntervalTrigger**：每N个时间单元触发，时间单元可以是毫秒，秒，分，小时，日，月，年。

#### 1.3.1 trigger状态：

- WAITING

- ACQUIRED，
- EXECUTING，
- COMPLETE，
- BLOCKED，
- ERROR，
- PAUSED，
- PAUSED_BLOCKED，
- DELETED

### 1.4 核心元素关系

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719211631532.png" alt="image-20220719211631532"  />

## 2. Scheduler 调度线程

Scheduler 调度线程主要有两个： 

- 执行常规调度的线程

  常规调度线程轮询存储的所有 trigger，如果有需要触发的 trigger，即到达了下一次触发的时间，则从任务执行线程池获取一个空闲线程，执行与该 trigger 关联的任务

- 执行 misfired trigger 的线程。

  Misfire 线程是扫描所有的 trigger，查看是否有 misfired trigger，如果有的话根据 misfire 的策略分别处理。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719212131722.png" alt="image-20220719212131722"  />

### 2.1 Quartz 调度线程流程图

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719212254193.png" alt="image-20220719212254193" />

## 3. 未正常触发的任务：misfire job

没有在正常触发时间点触发的任务。主要由以下几种情况导致：

- 触发时间在应用不可用的时间内，比如重启
- 上次的执行时间过长，超过了下次触发的时间
- 任务被暂停一段时间后，重新被调度的时间在下次触发时间之后

处理misfire job的策略，需要在创建trigger的时候配置，每种trigger对应的枚举值都不同，具体在接口里面有定义。CronTrigger有2种处理misfire的策略：

| 处理策略                          | 描述                       |
| --------------------------------- | -------------------------- |
| MISFIRE_INSTRUCTION_FIRE_ONCE_NOW | 立即触发一次               |
| MISFIRE_INSTRUCTION_DO_NOTHING    | 忽略，不处理，等待下次触发 |

之间的关系：

scheduler由工厂类SchedulerFactory创建，主要负责job和trigger的持久化管理，包括新增、删除、修改、触发、暂停、恢复调度、停止调度等；

一个job可以关联多个trigger，但是一个trigger只能关联一个job。

## 4. Quzrtz单机模式 原理分析

1. scheduler是一个计划调度器容器（总部），容器里面可以盛放众多的JobDetail和trigger，当容器启动后，里面的每个JobDetail都会根据trigger按部就班自动去执行。
2. JobDetail是一个可执行的工作，它本身可能是有状态的。
3. Trigger代表一个调度参数的配置，什么时候去调。
4. 当JobDetail和Trigger在scheduler容器上注册后，形成了装配好的作业（JobDetail和Trigger所组成的一对儿），就可以伴随容器启动而调度执行了。
5. scheduler是个容器，容器中有一个线程池，用来并行调度执行每个作业，这样可以提高容器效率。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719212814763.png" alt="image-20220719212814763" />

## 5. 集群模式

Quartz的集群模式指的是**一个集群下多个节点管理同一批任务的调度**，**通过共享数据库的方式实现**，保证同一个任务到达触发时间的时候，**只有一台机器去执行该任务**。**每个节点部署一个单独的quartz实例，相互之间没有直接数据通信。**

### 5.1 Quartz集群模式部署图

![image-20220719213026199](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719213026199.png)

### 5.2 集群模式原理分析

quartz集群是通过数据库表来感知其他的应用的，各个节点之间并没有直接的通信。**只有使用持久的JobStore才能完成Quartz集群**。
 数据库表：以前有12张表，现在只有11张表，现在没有存储listener相关的表，多了QRTZ_SIMPROP_TRIGGERS表：

| Table name               | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| QRTZ_CALENDARS           | 存储Quartz的Calendar信息                                   |
| QRTZ_CRON_TRIGGERS       | 存储CronTrigger，包括Cron表达式和时区信息                  |
| QRTZ_FIRED_TRIGGERS      | 存储与已触发的Trigger相关的状态信息，以及相联Job的执行信息 |
| QRTZ_PAUSED_TRIGGER_GRPS | 存储已暂停的Trigger组的信息                                |
| QRTZ_SCHEDULER_STATE     | 存储少量的有关Scheduler的状态信息，和别的Scheduler实例     |
| **QRTZ_LOCKS**           | **存储程序的悲观锁的信息**                                 |
| QRTZ_JOB_DETAILS         | 存储每一个已配置的Job的详细信息                            |
| QRTZ_SIMPLE_TRIGGERS     | 存储简单的Trigger，包括重复次数、间隔、以及已触的次数      |
| QRTZ_BLOG_TRIGGERS       | Trigger作为Blob类型存储                                    |
| QRTZ_TRIGGERS            | 存储已配置的Trigger的信息                                  |
| QRTZ_SIMPROP_TRIGGERS    |                                                            |

#### 5.2.1 QRTZ_LOCKS行锁表

QRTZ_LOCKS就是Quartz集群实现同步机制的行锁表,包括以下几个锁：

- CALENDAR_ACCESS
- JOB_ACCESS
- MISFIRE_ACCESS
- STATE_ACCESS
- TRIGGER_ACCESS

#### 5.2.2 负责任务调度的几个线程

负责任务调度的几个线程：

1. 任务执行线程：通常使用一个线程池(SimpleThreadPool)维护一组线程，负责实际每个job的执行。
2. Scheduler调度线程QuartzSchedulerThread ：轮询存储的所有 trigger，如果有需要触发的 trigger，即到达了下一次触发的时间，则从任务执行线程池获取一个空闲线程，执行与该 trigger 关联的任务。
3. 处理misfire job的线程MisfireHandler：轮训所有misfire的trigger，原理就是从数据库中查询所有下次触发时间小于当前时间的trigger，按照每个trigger设定的misfire策略处理这些trigger。

## 参考文章

[Quartz原理分析](https://www.jianshu.com/p/e95d6764b4d9)