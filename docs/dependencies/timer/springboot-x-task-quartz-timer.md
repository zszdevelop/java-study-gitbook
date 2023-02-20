---
order: 50
category:
  - 定时任务
---

# 定时任务 - 基础quartz实现方式

>除了SpringTask，最为常用的Quartz，并且Spring也集成了Quartz的框架。本文主要介绍Quartz和基础的Quartz的集成案例。

## 1. 准备知识点

> 需要了解常用的Quartz框架。

### 1.1 什么是Quartz

> 来源[百度百科](https://baike.baidu.com/item/quartz/3643055), 官网地址：http://www.quartz-scheduler.org/

Quartz是OpenSymphony开源组织在Job scheduling领域又一个开源项目，它可以与J2EE与J2SE应用程序相结合也可以单独使用。Quartz可以用来创建简单或为运行十个，百个，甚至是好几万个Jobs这样复杂的程序。Jobs可以做成标准的Java组件或 EJBs。

**它的特点如下**

- 纯java实现，可以作为独立的应用程序，也可以嵌入在另一个独立式应用程序运行
- 强大的调度功能，Spring默认的调度框架，灵活可配置；
- 作业持久化，调度环境持久化机制，可以保存并恢复调度现场。系统关闭数据不会丢失；灵活的应用方式，可以任意定义触发器的调度时间表，支持任务和调度各种组合，组件式监听器、各种插件、线程池等功能，多种存储方式等；
- 分布式和集群能力，可以被实例化，一个Quartz集群中的每个节点作为一个独立的Quartz使用，通过相同的数据库表来感知到另一个Quartz应用

### 1.2 Quartz的体系结构

![image-20220718211623319](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718211623319.png)

- **Job** 表示一个工作，要执行的具体内容。
- **JobDetail** 表示一个具体的可执行的调度程序，Job 是这个可执行程调度程序所要执行的内容，另外 JobDetail 还包含了这个任务调度的方案和策略。
- **Trigger** 代表一个调度参数的配置，什么时候去调。
- **Scheduler** 代表一个调度容器，一个调度容器中可以注册多个 JobDetail 和 Trigger。当 Trigger 与 JobDetail 组合，就可以被 Scheduler 容器调度了。

注： 上图来源于https://www.cnblogs.com/jijm123/p/14240320.html

## 2. 实现案例

- 引入POM依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-quartz</artifactId>
</dependency>
```

- 定义Job

只需要继承QuartzJobBean，并重载executeInternal方法即可定义你自己的Job执行逻辑。

```java
@Slf4j
public class HelloJob extends QuartzJobBean {

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        // get parameters
        context.getJobDetail().getJobDataMap().forEach(
                (k, v) -> log.info("param, key:{}, value:{}", k, v)
        );
        // your logics
        log.info("Hello Job执行时间: " + new Date());
    }
}
```

- 配置Job

JobDetail, Trigger, Schedule(这里采用CronScheduleBuilder)

```java
/**
 * @author pdai
 */
@Configuration
public class QuartzConfig {

    @Bean("helloJob")
    public JobDetail helloJobDetail() {
        return JobBuilder.newJob(HelloJob.class)
                .withIdentity("DateTimeJob")
                .usingJobData("msg", "Hello Quartz")
                .storeDurably()//即使没有Trigger关联时，也不需要删除该JobDetail
                .build();
    }

    @Bean
    public Trigger printTimeJobTrigger() {
        // 每秒执行一次
        CronScheduleBuilder cronScheduleBuilder = CronScheduleBuilder.cronSchedule("0/1 * * * * ?");
        return TriggerBuilder.newTrigger()
                .forJob(helloJobDetail())
                .withIdentity("quartzTaskService")
                .withSchedule(cronScheduleBuilder)
                .build();
    }
}
```

- 执行测试

```java
2021-10-01 13:09:00.380  INFO 38484 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2021-10-01 13:09:00.391  INFO 38484 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2021-10-01 13:09:00.392  INFO 38484 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.50]
2021-10-01 13:09:00.526  INFO 38484 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2021-10-01 13:09:00.526  INFO 38484 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 1424 ms
2021-10-01 13:09:00.866  INFO 38484 --- [           main] org.quartz.impl.StdSchedulerFactory      : Using default implementation for ThreadExecutor
2021-10-01 13:09:00.877  INFO 38484 --- [           main] org.quartz.core.SchedulerSignalerImpl    : Initialized Scheduler Signaller of type: class org.quartz.core.SchedulerSignalerImpl
2021-10-01 13:09:00.877  INFO 38484 --- [           main] org.quartz.core.QuartzScheduler          : Quartz Scheduler v.2.3.2 created.
2021-10-01 13:09:00.878  INFO 38484 --- [           main] org.quartz.simpl.RAMJobStore             : RAMJobStore initialized.
2021-10-01 13:09:00.878  INFO 38484 --- [           main] org.quartz.core.QuartzScheduler          : Scheduler meta-data: Quartz Scheduler (v2.3.2) 'quartzScheduler' with instanceId 'NON_CLUSTERED'
  Scheduler class: 'org.quartz.core.QuartzScheduler' - running locally.
  NOT STARTED.
  Currently in standby mode.
  Number of jobs executed: 0
  Using thread pool 'org.quartz.simpl.SimpleThreadPool' - with 10 threads.
  Using job-store 'org.quartz.simpl.RAMJobStore' - which does not support persistence. and is not clustered.

2021-10-01 13:09:00.878  INFO 38484 --- [           main] org.quartz.impl.StdSchedulerFactory      : Quartz scheduler 'quartzScheduler' initialized from an externally provided properties instance.
2021-10-01 13:09:00.879  INFO 38484 --- [           main] org.quartz.impl.StdSchedulerFactory      : Quartz scheduler version: 2.3.2
2021-10-01 13:09:00.879  INFO 38484 --- [           main] org.quartz.core.QuartzScheduler          : JobFactory set to: org.springframework.scheduling.quartz.SpringBeanJobFactory@6075b2d3
2021-10-01 13:09:00.922  INFO 38484 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2021-10-01 13:09:00.923  INFO 38484 --- [           main] o.s.s.quartz.SchedulerFactoryBean        : Starting Quartz Scheduler now
2021-10-01 13:09:00.923  INFO 38484 --- [           main] org.quartz.core.QuartzScheduler          : Scheduler quartzScheduler_$_NON_CLUSTERED started.
2021-10-01 13:09:00.933  INFO 38484 --- [           main] tech.pdai.springboot.quartz.App          : Started App in 2.64 seconds (JVM running for 3.621)
2021-10-01 13:09:00.931  INFO 38484 --- [eduler_Worker-1] t.pdai.springboot.quartz.job.HelloJob    : param, key:msg, value:Hello Quartz
2021-10-01 13:09:00.933  INFO 38484 --- [eduler_Worker-1] t.pdai.springboot.quartz.job.HelloJob    : Hello Job执行时间: Wed Oct 27 13:09:00 CST 2021
2021-10-01 13:09:01.001  INFO 38484 --- [eduler_Worker-2] t.pdai.springboot.quartz.job.HelloJob    : param, key:msg, value:Hello Quartz
2021-10-01 13:09:01.001  INFO 38484 --- [eduler_Worker-2] t.pdai.springboot.quartz.job.HelloJob    : Hello Job执行时间: Wed Oct 27 13:09:01 CST 2021
2021-10-01 13:09:02.000  INFO 38484 --- [eduler_Worker-3] t.pdai.springboot.quartz.job.HelloJob    : param, key:msg, value:Hello Quartz
2021-10-01 13:09:02.000  INFO 38484 --- [eduler_Worker-3] t.pdai.springboot.quartz.job.HelloJob    : Hello Job执行时间: Wed Oct 27 13:09:02 CST 2021
2021-10-01 13:09:03.000  INFO 38484 --- [eduler_Worker-4] t.pdai.springboot.quartz.job.HelloJob    : param, key:msg, value:Hello Quartz
2021-10-01 13:09:03.001  INFO 38484 --- [eduler_Worker-4] t.pdai.springboot.quartz.job.HelloJob    : Hello Job执行时间: Wed Oct 27 13:09:03 CST 2021
2021-10-01 13:09:04.001  INFO 38484 --- [eduler_Worker-5] t.pdai.springboot.quartz.job.HelloJob    : param, key:msg, value:Hello Quartz
2021-10-01 13:09:04.001  INFO 38484 --- [eduler_Worker-5] t.pdai.springboot.quartz.job.HelloJob    : Hello Job执行时间: Wed Oct 27 13:09:04 CST 2021
2021-10-01 13:09:05.002  INFO 38484 --- [eduler_Worker-6] t.pdai.springboot.quartz.job.HelloJob    : param, key:msg, value:Hello Quartz
2021-10-01 13:09:05.003  INFO 38484 --- [eduler_Worker-6] t.pdai.springboot.quartz.job.HelloJob    : Hello Job执行时间: Wed Oct 27 13:09:05 CST 2021
2021-10-01 13:09:06.000  INFO 38484 --- [eduler_Worker-7] t.pdai.springboot.quartz.job.HelloJob    : param, key:msg, value:Hello Quartz
2021-10-01 13:09:06.001  INFO 38484 --- [eduler_Worker-7] t.pdai.springboot.quartz.job.HelloJob    : Hello Job执行时间: Wed Oct 27 13:09:06 CST 2021
2021-10-01 13:09:07.002  INFO 38484 --- [eduler_Worker-8] t.pdai.springboot.quartz.job.HelloJob    : param, key:msg, value:Hello Quartz
2021-10-01 13:09:07.002  INFO 38484 --- [eduler_Worker-8] t.pdai.springboot.quartz.job.HelloJob    : Hello Job执行时间: Wed Oct 27 13:09:07 CST 2021
2021-10-01 13:09:08.002  INFO 38484 --- [eduler_Worker-9] t.pdai.springboot.quartz.job.HelloJob    : param, key:msg, value:Hello Quartz
2021-10-01 13:09:08.003  INFO 38484 --- [eduler_Worker-9] t.pdai.springboot.quartz.job.HelloJob    : Hello Job执行时间: Wed Oct 27 13:09:08 CST 2021
2021-10-01 13:09:09.000  INFO 38484 --- [duler_Worker-10] t.pdai.springboot.quartz.job.HelloJob    : param, key:msg, value:Hello Quartz
2021-10-01 13:09:09.000  INFO 38484 --- [duler_Worker-10] t.pdai.springboot.quartz.job.HelloJob    : Hello Job执行时间: Wed Oct 27 13:09:09 CST 2021
2021-10-01 13:09:10.001  INFO 38484 --- [eduler_Worker-1] t.pdai.springboot.quartz.job.HelloJob    : param, key:msg, value:Hello Quartz
2021-10-01 13:09:10.002  INFO 38484 --- [eduler_Worker-1] t.pdai.springboot.quartz.job.HelloJob    : Hello Job执行时间: Wed Oct 27 13:09:10 CST 2021
2021-10-01 13:09:11.014  INFO 38484 --- [eduler_Worker-2] t.pdai.springboot.quartz.job.HelloJob    : param, key:msg, value:Hello Quartz
2021-10-01 13:09:11.014  INFO 38484 --- [eduler_Worker-2] t.pdai.springboot.quartz.job.HelloJob    : Hello Job执行时间: Wed Oct 27 13:09:11 CST 2021

  
```

## 参考文章

[**SpringBoot定时任务 - 基础quartz实现方式**](https://pdai.tech/md/spring/springboot/springboot-x-task-quartz-timer.html)