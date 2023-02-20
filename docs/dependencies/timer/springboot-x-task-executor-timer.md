---
order: 20
category:
  - 定时任务
---

# 定时任务 - ScheduledExecutorService实现方式

>上文介绍的Timer在实际开发中很少被使用， 因为Timer底层是使用一个单线程来实现多个Timer任务处理的，所有任务都是由同一个线程来调度，所有任务都是串行执行。而ScheduledExecutorService是基于线程池的，可以开启多个线程进行执行多个任务，每个任务开启一个线程； 这样任务的延迟和未处理异常就不会影响其它任务的执行了。

## 1. 知识准备

> 需要对ScheduledExecutorService 代替 Timer的原因以及ScheduledExecutorService所在的知识体系有了解。

### 1.1 为什么用ScheduledExecutorService 代替 Timer？

上文我们说到Timer底层是使用一个单线程来实现多个Timer任务处理的，所有任务都是由同一个线程来调度，所有任务都是串行执行，意味着同一时间只能有一个任务得到执行，而前一个任务的延迟或者异常会影响到之后的任务。

如果有一个定时任务在运行时，产生未处理的异常，那么当前这个线程就会停止，那么所有的定时任务都会停止，受到影响。

而ScheduledExecutorService是基于线程池的，可以开启多个线程进行执行多个任务，每个任务开启一个线程； 这样任务的延迟和未处理异常就不会影响其它任务的执行了。

### 1.2 ScheduledExecutorService所在的线程池的知识体系？

属于Java并发中JUC，具体可以看[JUC - 类汇总和学习指南](https://pdai.tech/md/java/thread/java-thread-x-juc-overview.html)

![image-20220719041508424](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719041508424.png)

## 2. ScheduledExecutorService实现案例

> ScheduledExecutorService使用例子如下。

### 2.1 schedule

延迟1秒执行一个进程任务。

```java
@SneakyThrows
public static void schedule() {
    ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
    executor.schedule(
            new Runnable() {
                @Override
                @SneakyThrows
                public void run() {
                    log.info("run schedule @ {}", LocalDateTime.now());
                }
            },
            1000,
            TimeUnit.MILLISECONDS);
    // waiting to process(sleep to mock)
    Thread.sleep(10000);

    // stop
    executor.shutdown();
}
```

输出

```java
21:07:02.047 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run schedule @ 2022-03-10T21:07:02.046
```

### 2.2 scheduleAtFixedRate

延迟0.5秒开始执行，每秒执行一次， 10秒后停止。

同时测试某次任务执行时间大于周期时间的变化。

```java
/**
    * 每秒执行一次，延迟0.5秒执行。
    */
@SneakyThrows
public static void scheduleAtFixedRate() {
    AtomicInteger count = new AtomicInteger(0);
    ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
    executor.scheduleAtFixedRate(
            new Runnable() {
                @Override
                @SneakyThrows
                public void run() {
                    if (count.getAndIncrement()==2) {
                        Thread.sleep(5000); // 执行时间超过执行周期
                    }
                    log.info("run scheduleAtFixedRate @ {}", LocalDateTime.now());
                }
            },
            500,
            1000, // 每隔多久执行
            TimeUnit.MILLISECONDS);
    // waiting to process(sleep to mock)
    Thread.sleep(10000);

    // stop
    executor.shutdown();
}

```

输出

```java
20:51:47.626 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleAtFixedRate @ 2022-03-10T20:51:47.624
20:51:48.575 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleAtFixedRate @ 2022-03-10T20:51:48.575
20:51:54.579 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleAtFixedRate @ 2022-03-10T20:51:54.579
20:51:54.579 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleAtFixedRate @ 2022-03-10T20:51:54.579
20:51:54.579 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleAtFixedRate @ 2022-03-10T20:51:54.579
20:51:54.580 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleAtFixedRate @ 2022-03-10T20:51:54.580
20:51:54.580 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleAtFixedRate @ 2022-03-10T20:51:54.580
20:51:54.580 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleAtFixedRate @ 2022-03-10T20:51:54.580
20:51:55.574 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleAtFixedRate @ 2022-03-10T20:51:55.574
20:51:56.578 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleAtFixedRate @ 2022-03-10T20:51:56.578
```

（你会发现周期执行1秒中执行一次，但是某次执行了5秒，这时候，后续的任务会加快执行进度，一次性就执行了，执行的时间都是20:51:54，所以scheduleAtFixedRate最大的特点是**保证了总时间段内的执行次数**）

### 2.3 scheduleWithFixedDelay

延迟0.5秒开始执行，每秒执行一次， 10秒后停止。

同时测试某次任务执行时间大于周期时间的变化。

```java
/**
    * 每秒执行一次，延迟0.5秒执行。
    */
@SneakyThrows
public static void scheduleWithFixedDelay() {
    AtomicInteger count = new AtomicInteger(0);
    ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
    executor.scheduleWithFixedDelay(
            new Runnable() {
                @Override
                @SneakyThrows
                public void run() {
                    if (count.getAndIncrement()==2) {
                        Thread.sleep(5000); // 执行时间超过执行周期
                    }
                    log.info("run scheduleWithFixedDelay @ {}", LocalDateTime.now());
                }
            },
            500,
            1000, // 上次执行完成后，延迟多久执行
            TimeUnit.MILLISECONDS);

    // waiting to process(sleep to mock)
    Thread.sleep(10000);

    // stop
    executor.shutdown();
}
```

输出

```java
20:50:03.559 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleWithFixedDelay @ 2022-03-10T20:50:03.557
20:50:04.564 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleWithFixedDelay @ 2022-03-10T20:50:04.564
20:50:10.568 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleWithFixedDelay @ 2022-03-10T20:50:10.568
20:50:11.569 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleWithFixedDelay @ 2022-03-10T20:50:11.569
20:50:12.571 [pool-1-thread-1] INFO tech.pdai.springboot.schedule.executorservice.ScheduleExecutorServiceDemo - run scheduleWithFixedDelay @ 2022-03-10T20:50:12.571
```

## 3. 进一步理解

> 我们再通过一些问题来帮助你更深入理解ScheduleExecutorService实现方式。

### 3.1 schedule 和 scheduleAtFixedRate和 scheduleWithFixedDelay有何区别？

- **schedule**：延迟执行一个任务。
- **scheduleAtFixedRate**：每次执行时间为上一次任务开始起向后推一个period间隔，也就是说下次执行时间相对于上一次任务开始的时间点；按照上述的例子，它**保证了总时间段内的任务的执行次数**
- **scheduleAtFixedDelay**：每次执行完当前任务后，然后间隔一个period的时间再执行下一个任务； 当某个任务执行周期大于时间间隔时，依然按照间隔时间执行下个任务，即它**保证了任务之间执行的间隔**。

（PS：和timer对比下，timer中没有scheduleAtFixedDelay，它的schedule等同于scheduleAtFixedDelay）

## 参考文章

[**SpringBoot定时任务 - ScheduleExecutorService实现方式**](https://pdai.tech/md/spring/springboot/springboot-x-task-executor-timer.html)