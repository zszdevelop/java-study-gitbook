---
order: 51
category:
  - 定时任务
---

# 定时任务 - quartz定时器入门

## 0. Cron表达式

[在线生成Cron表达式的工具](http://cron.qqe2.com/ )

## 1. Qaurtz简介

Quartz是一个完全由java编写的任务调度框架。
那么什么是任务调度呢？很多时候你可能会收到某个需求，要求程序 “ 隔某个特定的时间段 在某个特定的时间 做某个特定的事情 ”，比如：

- 每个月的9号自动还款蚂蚁花呗
- 每年12月1日0点发送生日祝福给你的朋友
- 在某些视频网站中，购买会员后，每月会给会员送一些优惠券。
- 定时生成报表、邮件
- 一些需要定时清理数据的任务
- 在保证最终一致性的场景中，往往利用定时任务调度进行一些对比工作

这些都是定时任务。而**Quartz就是可以方便你创建各种任务定时执行的一个框架**，而且触发这些任务的时间点可以设计的非常复杂，几乎都能完美匹配你的要求。

## 2. 核心概念

### 2.1 任务Job

Qaurtz 提供的定时任务的接口，我们需要实现该接口做具体的操作。如定时发送邮件Job，重启机器Job

![image-20211027203631278](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027203631278.png)

### 2.2 触发器Trigger

有了任务之后，还需要一个能够实现触发任务去执行的触发器，触发器Trigger最基本的功能是指定Job的执行时间，执行间隔，运行次数等。

![image-20211027203739489](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027203739489.png)

### 2.3 调度器 Schedule

有了Job和Trigger后，怎么样将两者结合起来呢？即怎样指定Trigger去执行指定的Job呢？这时需要一个Schedule，来负责这个功能的实现。

![image-20211027203820564](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027203820564.png)

上面三个部分就是Quartz的基本组成部分：

- 调度器：Scheduler
- 任务：JobDetail
- 触发器：Trigger，包括SimpleTrigger和CronTrigger

## 3. 主要API

- Scheduler - 与调度器交互的主要API。
- Job - 需要被调度器调度的任务必须实现的接口。
- JobDetail - 用于定义任务的实例。
- Trigger - 用于定义调度器何时调度任务执行的组件。
- JobBuilder - 用于定义或创建JobDetail的实例 。
- TriggerBuilder - 用于定义或创建触发器实例。

## 4. 实例介绍

### 4.1 实现job接口

实现Job接口，接口中的execute()，这里写你要定时执行的代码

```java
public class MyJob implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        System.out.println("当前时间："+new Date() + ": 定时器工作...");
    }
}
```

### 4.2 创建Schedule，执行任务：

```java
public class MyScheduler {

    public static void main(String[] args) throws SchedulerException, InterruptedException {
        // 1、创建调度器Scheduler
        SchedulerFactory schedulerFactory = new StdSchedulerFactory();
        Scheduler scheduler = schedulerFactory.getScheduler();
        // 2、创建JobDetail实例，并与PrintWordsJob类绑定(Job执行内容)
        JobDetail jobDetail = JobBuilder.newJob(MyJob.class)
                .withIdentity("job1", "group1").build();
        // 3、构建Trigger实例,每隔1s执行一次
        Trigger trigger = TriggerBuilder.newTrigger().withIdentity("trigger1", "triggerGroup1")
                .startNow()//立即生效
                .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                        .withIntervalInSeconds(1)//每隔1s执行一次
                        .repeatForever()).build();//一直执行

        //4、执行
        scheduler.scheduleJob(jobDetail, trigger);
        System.out.println("--------scheduler start ! ------------");
        scheduler.start();

        //睡眠
        TimeUnit.MINUTES.sleep(1);
        scheduler.shutdown();
        System.out.println("--------scheduler shutdown ! ------------");
    }
}
```

### 4.3 运行测试

运行程序，可以看到程序每隔1s会打印出内容，且在一分钟后结束：

![image-20211027203158947](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027203158947.png)

## 5. Job 详解

### 5.1 Job

Job是Quartz中的一个接口，接口下只有execute方法，在这个方法中编写业务逻辑。
接口中的源码：

![image-20211027204136389](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027204136389.png)

### 5.2 JobDetail

JobDetail用来绑定Job，为Job实例提供许多属性：

- name

- group

- jobClass

- jobDataMap

JobDetail绑定指定的Job，每次Scheduler调度执行一个Job的时候，首先会拿到对应的Job，然后创建该Job实例，再去执行Job中的execute()的内容，任务执行结束后，关联的Job对象实例会被释放，且会被JVM GC清除。

#### 5.2.1 为什么设计成JobDetail + Job，不直接使用Job

JobDetail定义的是任务数据，而真正的执行逻辑是在Job中。
这是因为任务是有可能并发执行，如果Scheduler直接使用Job，就会存在对同一个Job实例并发访问的问题。而JobDetail & Job 方式，Sheduler每次执行，都会根据JobDetail创建一个新的Job实例，这样就可以规避并发访问的问题。

### 5.3 JobExecutionContext

JobExecutionContext中包含了Quartz运行时的环境以及Job本身的详细数据信息。
当Schedule调度执行一个Job的时候，就会将JobExecutionContext传递给该Job的execute()中，Job就可以通过JobExecutionContext对象获取信息。
主要信息有：
![image-20211027204531035](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027204531035.png)

### 5.4 JobDataMap

JobDataMap实现了JDK的Map接口，可以以Key-Value的形式存储数据。
JobDetail、Trigger都可以使用JobDataMap来设置一些参数或信息，
Job执行execute()方法的时候，JobExecutionContext可以获取到JobExecutionContext中的信息：
如：

```java
JobDetail jobDetail = JobBuilder.newJob(PrintWordsJob.class)                        .usingJobData("jobDetail1", "这个Job用来测试的")
                  .withIdentity("job1", "group1").build();

 Trigger trigger = TriggerBuilder.newTrigger().withIdentity("trigger1", "triggerGroup1")
      .usingJobData("trigger1", "这是jobDetail1的trigger")
      .startNow()//立即生效
      .withSchedule(SimpleScheduleBuilder.simpleSchedule()
      .withIntervalInSeconds(1)//每隔1s执行一次
      .repeatForever()).build();//一直执行

```

Job执行的时候，可以获取到这些参数信息：

```java
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {

        System.out.println(jobExecutionContext.getJobDetail().getJobDataMap().get("jobDetail1"));
        System.out.println(jobExecutionContext.getTrigger().getJobDataMap().get("trigger1"));
        String printTime = new SimpleDateFormat("yy-MM-dd HH-mm-ss").format(new Date());
        System.out.println("PrintWordsJob start at:" + printTime + ", prints: Hello Job-" + new Random().nextInt(100));


    }
```

## 6. Trigger 详解

Trigger、SimpleTrigger、CronTrigger

### 6.1 Trigger

Trigger是Quartz的触发器，会去通知Scheduler何时去执行对应Job。

```java
new Trigger().startAt():表示触发器首次被触发的时间;
new Trigger().endAt():表示触发器结束触发的时间;
```

### 6.2 **SimpleTrigger**

SimpleTrigger可以实现在一个指定时间段内执行一次作业任务或一个时间段内多次执行作业任务。
下面的程序就实现了程序运行5s后开始执行Job，执行Job 5s后结束执行：

```java
Date startDate = new Date();
startDate.setTime(startDate.getTime() + 5000);

 Date endDate = new Date();
 endDate.setTime(startDate.getTime() + 5000);

        Trigger trigger = TriggerBuilder.newTrigger().withIdentity("trigger1", "triggerGroup1")
                .usingJobData("trigger1", "这是jobDetail1的trigger")
                .startNow()//立即生效
                .startAt(startDate)
                .endAt(endDate)
                .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                .withIntervalInSeconds(1)//每隔1s执行一次
                .repeatForever()).build();//一直执行
```

### 6.3 CronTrigger

CronTrigger功能非常强大，是基于日历的作业调度，而SimpleTrigger是精准指定间隔，所以相比SimpleTrigger，CroTrigger更加常用。CroTrigger是基于Cron表达式的，先了解下Cron表达式：
由7个子表达式组成字符串的，格式如下：

[秒] [分] [小时] [日] [月] [周] [年]

Cron表达式的语法比较复杂，
如：* 30 10 ? * 1/5 *
表示（从后往前看）
[指定年份] 的[ 周一到周五][指定月][不指定日][上午10时][30分][指定秒]

又如：00 00 00 ？ * 10,11,12 1#5 2018
表示2018年10、11、12月的第一周的星期五这一天的0时0分0秒去执行任务。

下面是给的一个例子：


![image-20211027205941975](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027205941975.png)

可通过在线生成Cron表达式的工具：http://cron.qqe2.com/ 来生成自己想要的表达式。

![image-20211027210001186](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027210001186.png)

下面的代码就实现了每周一到周五上午10:30执行定时任务

```java
public class MyScheduler2 {
    public static void main(String[] args) throws SchedulerException, InterruptedException {
        // 1、创建调度器Scheduler
        SchedulerFactory schedulerFactory = new StdSchedulerFactory();
        Scheduler scheduler = schedulerFactory.getScheduler();
        // 2、创建JobDetail实例，并与PrintWordsJob类绑定(Job执行内容)
        JobDetail jobDetail = JobBuilder.newJob(PrintWordsJob.class)
                .usingJobData("jobDetail1", "这个Job用来测试的")
                .withIdentity("job1", "group1").build();
        // 3、构建Trigger实例,每隔1s执行一次
        Date startDate = new Date();
        startDate.setTime(startDate.getTime() + 5000);

        Date endDate = new Date();
        endDate.setTime(startDate.getTime() + 5000);

        CronTrigger cronTrigger = TriggerBuilder.newTrigger().withIdentity("trigger1", "triggerGroup1")
                .usingJobData("trigger1", "这是jobDetail1的trigger")
                .startNow()//立即生效
                .startAt(startDate)
                .endAt(endDate)
                .withSchedule(CronScheduleBuilder.cronSchedule("* 30 10 ? * 1/5 2018"))
                .build();

        //4、执行
        scheduler.scheduleJob(jobDetail, cronTrigger);
        System.out.println("--------scheduler start ! ------------");
        scheduler.start();
        System.out.println("--------scheduler shutdown ! ------------");

    }
}
```



## 参考文章

[定时任务框架Quartz-(一)Quartz入门与Demo搭建](https://blog.csdn.net/noaman_wgs/article/details/80984873)

[Quartz使用介紹](https://segmentfault.com/a/1190000015885177)
