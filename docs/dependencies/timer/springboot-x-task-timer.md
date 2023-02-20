---
order: 10
category:
  - 定时任务
---

# 定时任务 - Timer实现方式

>定时任务在实际开发中有着广泛的用途，本文主要帮助你构建定时任务的知识体系，同时展示Timer 的schedule和scheduleAtFixedRate例子；后续的文章中我们将逐一介绍其它常见的与SpringBoot的集成。

## 1. 知识准备

> 需要对定时任务的使用场景和常见的实现方式。

### 1.1 什么样的场景会使用定时任务？

比如每天/每周/每月生成日志汇总，定时发送推送信息，定时生成数据表格等

### 1.2 定时任务有哪些实现方式？

> 首先你需要构建如下实现定时任务的知识体系。在后续的文章中我们将逐一介绍在SpringBoot下的集成。

- 定时任务基础
  - Cron表达式
  - Linux定时任务工具crontb
- JDK内置
  - Timer
  - ScheduleExecutorService
- Netty
  - HashedWheelTimer
- Spring
  - Spring自带Schedule
  - Spring集成Quartz
- 分布式集群
  - Quartz持久化JDBC方式
  - Elastic-job
  - xxl-job

## 2. Timer实现案例

> Timer 的schedule和scheduleAtFixedRate例子如下。

### 2.1 schedule延迟任务

执行定时任务，延迟1秒开始执行。

```java
@SneakyThrows
public static void timer() {
    // start timer
    Timer timer = new Timer();
    timer.schedule(new TimerTask() {
        public void run() {
            log.info("timer-task @{}", LocalDateTime.now());
        }
    }, 1000);

    // waiting to process(sleep to mock)
    Thread.sleep(3000);

    // stop timer
    timer.cancel();
}
```

输出

```java
10:05:47.440 [Timer-0] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-task @2021-10-01T20:05:47.436
```

### 2.2 schedule周期任务

延迟0.5秒开始执行，每秒执行一次， 10秒后停止。

```java
@SneakyThrows
public static void timerPeriod() {
    // start timer
    Timer timer = new Timer();
    timer.schedule(new TimerTask() {
        @SneakyThrows
        public void run() {
            log.info("timer-period-task @{}", LocalDateTime.now());
            Thread.sleep(100); // 可以设置的执行时间, 来测试当执行时间大于执行周期时任务执行的变化 
        }
    }, 500, 1000);

    // waiting to process(sleep to mock)
    Thread.sleep(10000);

    // stop timer
    timer.cancel();
}
```

输出

```java
10:05:49.781 [Timer-1] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-period-task @2021-10-01T10:05:49.781
10:05:50.781 [Timer-1] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-period-task @2021-10-01T10:05:50.781
10:05:51.781 [Timer-1] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-period-task @2021-10-01T10:05:51.781
10:05:52.781 [Timer-1] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-period-task @2021-10-01T10:05:52.781
10:05:53.782 [Timer-1] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-period-task @2021-10-01T10:05:53.782
10:05:54.783 [Timer-1] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-period-task @2021-10-01T10:05:54.783
10:05:55.783 [Timer-1] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-period-task @2021-10-01T10:05:55.783
10:05:56.784 [Timer-1] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-period-task @2021-10-01T10:05:56.784
10:05:57.785 [Timer-1] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-period-task @2021-10-01T10:05:57.785
10:05:58.786 [Timer-1] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-period-task @2021-10-01T10:05:58.786
```

### 2.3 scheduleAtFixedRate

延迟0.5秒开始执行，每秒执行一次， 10秒后停止。

同时测试某次任务执行时间大于周期时间的变化。

```java
@SneakyThrows
public static void timerFixedRate() {
    // start timer
    Timer timer = new Timer();
    timer.scheduleAtFixedRate(new TimerTask() {
        int count = 0;

        @SneakyThrows
        public void run() {
            if (count++==2) {
                Thread.sleep(5000); // 某一次执行时间超过了period(执行周期）
            }
            log.info("timer-fixedRate-task @{}", LocalDateTime.now());

        }
    }, 500, 1000);

    // waiting to process(sleep to mock)
    Thread.sleep(10000);

    // stop timer
    timer.cancel();
}
```

输出

```java
10:05:59.781 [Timer-2] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-fixedRate-task @2021-10-01T10:05:59.781
10:06:00.782 [Timer-2] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-fixedRate-task @2021-10-01T10:06:00.782
10:06:06.783 [Timer-2] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-fixedRate-task @2021-10-01T10:06:06.783
10:06:06.783 [Timer-2] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-fixedRate-task @2021-10-01T10:06:06.783
10:06:06.783 [Timer-2] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-fixedRate-task @2021-10-01T10:06:06.783
10:06:06.783 [Timer-2] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-fixedRate-task @2021-10-01T10:06:06.783
10:06:06.783 [Timer-2] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-fixedRate-task @2021-10-01T10:06:06.783
10:06:06.783 [Timer-2] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-fixedRate-task @2021-10-01T10:06:06.783
10:06:07.781 [Timer-2] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-fixedRate-task @2021-10-01T10:06:07.781
10:06:08.781 [Timer-2] INFO tech.pdai.springboot.schedule.timer.timertest.TimerTester - timer-fixedRate-task @2021-10-01T10:06:08.781
```

（你会发现周期执行1秒中执行一次，但是某次执行了5秒，这时候，后续的任务会加快执行进度，一次性就执行了，执行的时间都是10:06:06.783， 所以scheduleAtFixedRate最大的特点是**保证了总时间段内的执行次数**）

## 3.进一步理解

> 我们再通过一些问题来帮助你更深入理解Timer实现方式。

### 3.1 schedule 和 scheduleAtFixedRate 有何区别？

- **schedule**：每次执行完当前任务后，然后间隔一个period的时间再执行下一个任务； 当某个任务执行周期大于时间间隔时，依然按照间隔时间执行下个任务，即它**保证了任务之间执行的间隔**。
- **scheduleAtFixedRate**：每次执行时间为上一次任务开始起向后推一个period间隔，也就是说下次执行时间相对于上一次任务开始的时间点；按照上述的例子，它**保证了总时间段内的任务的执行次数**

### 3.2 为什么几乎很少使用Timer这种方式？

Timer底层是使用一个单线程来实现多个Timer任务处理的，所有任务都是由同一个线程来调度，所有任务都是串行执行，意味着同一时间只能有一个任务得到执行，而前一个任务的延迟或者异常会影响到之后的任务。

如果有一个定时任务在运行时，产生未处理的异常，那么当前这个线程就会停止，那么所有的定时任务都会停止，受到影响。

PS：在这点上你可以看到，定时任务Job中**异常**和**超时**等一般都是要自行处理的，以防止对其它任务的影响。

## 参考文章

[**SpringBoot定时任务 - Timer实现方式**](https://pdai.tech/md/spring/springboot/springboot-x-task-timer.html)