# 在接口中使用线程池，处理数据

## 1. 实例步骤

1. 定义线程池

   ```java
   package com.zszdevelop.threadpooldemo.config;
   
   
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.scheduling.annotation.EnableAsync;
   import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
   
   import java.util.concurrent.ThreadPoolExecutor;
   
   @Configuration
   public class ThreadPoolConfigure {
   
       @Bean
       public ThreadPoolTaskExecutor asyncThreadPoolTaskExecutor() {
           ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
           executor.setCorePoolSize(5);
           executor.setMaxPoolSize(10);
           executor.setQueueCapacity(50);
           executor.setKeepAliveSeconds(30);
           executor.setThreadNamePrefix("MY-Thread");
           executor.setWaitForTasksToCompleteOnShutdown(true);
           executor.setAwaitTerminationSeconds(60);
           executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
           executor.initialize();
           return executor;
       }
   
   }
   
   ```

2. 定义接口

   ```java
   package com.zszdevelop.threadpooldemo.controller;
   
   import com.zszdevelop.threadpooldemo.service.AsyncService;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.web.bind.annotation.GetMapping;
   import org.springframework.web.bind.annotation.RestController;
   
   @RestController
   public class AsyncController {
   
       @Autowired
       AsyncService asyncService;
   
   
       @GetMapping("/testAsync")
       public String testAsync()
       {
           System.out.println(Thread.currentThread().getName());
           asyncService.useAsyncThreadWork();
           return "testAsync方法执行成功...";
       }
   }
   
   
   ```

3. 定义service

   ```java
   public interface AsyncService {
   
       /**
        * 测试使用异步线程池来执行工作
        */
       public void useAsyncThreadWork();
   
   }
   
   ```

4. 定义接口实现类

   ```java
   package com.zszdevelop.threadpooldemo.service.impl;
   
   import com.zszdevelop.threadpooldemo.service.AsyncService;
   import org.slf4j.Logger;
   import org.slf4j.LoggerFactory;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
   import org.springframework.stereotype.Service;
   import org.springframework.util.concurrent.FailureCallback;
   import org.springframework.util.concurrent.ListenableFuture;
   import org.springframework.util.concurrent.SuccessCallback;
   
   import java.util.concurrent.Callable;
   import java.util.concurrent.ExecutionException;
   import java.util.concurrent.Future;
   import java.util.concurrent.TimeUnit;
   
   /**
    * @author 作者: zhangshengzhong
    * @文件名: AsyncServiceImpl
    * @版本号:1.0
    * @创建日期: 2020/12/8 16:28
    * @描述:
    */
   @Service
   public class AsyncServiceImpl implements AsyncService {
       Logger logger = LoggerFactory.getLogger(this.getClass());
   
       @Autowired
       ThreadPoolTaskExecutor threadPoolTaskExecutor;
   
       @Override
       public void useAsyncThreadWork() {
   
   
   //            方式一：通过 Runnable 使用线程池
           testRunnable();
           // 方式二： 使用Callable 可以监听到回调。会阻塞。后面的语句要等直接完成后
   //            testCallable();
   
           // 方式三： threadPoolTaskExecutor.submitListenable 返回ListenableFuture 无阻塞的形式 参数：Runnable
   //           testSubmitListenableRunnable();
   
           // 方式四： threadPoolTaskExecutor.submitListenable 返回ListenableFuture 无阻塞的形式 参数：Callable
   //           testSubmitListenableCallable();
   
       }
   
   
       /**
        * 方式一：通过 Runnable 使用线程池
        * 无阻塞表现在：线程还没有执行完，就打印了 “总结耗时：”
        */
       private void testRunnable() {
           long start = System.currentTimeMillis();
           for (int i = 0; i < 1000; i++) {
               MyRunnable myRunnable = new MyRunnable();
               threadPoolTaskExecutor.submit(myRunnable);
           }
           logger.info(String.format("总结耗时：%s", System.currentTimeMillis() - start));
       }
   
       /**
        * 方式二： 使用Callable 可以监听到回调。
        * 阻塞表现在：总在最后打印 “总结耗时：”
        * Callable的Future 能接受到具体结果，也就是线程的生成的随机数
        */
       private void testCallable() {
           long start = System.currentTimeMillis();
           for (int i = 0; i < 1000; i++) {
               MyCallable myCallable = new MyCallable();
               Future<Double> future = threadPoolTaskExecutor.submit(myCallable);
               try {
                   Double result = future.get();
                   logger.error("Callable返回的结果为：" + result);
               } catch (Exception e) {
                   e.printStackTrace();
               }
           }
           logger.info(String.format("总结耗时：%s", System.currentTimeMillis() - start));
       }
   
   
       /**
        * 方式三： threadPoolTaskExecutor.submitListenable 返回ListenableFuture 参数：Runnable
        * 无阻塞表现在：线程还没有执行完，就打印了 “总结耗时：”
        * Runnable监听ListenableFuture 只能知道线程是否执行完毕，线程生成的结果（随机数无法得知）
        */
       private void testSubmitListenableRunnable() {
           long start = System.currentTimeMillis();
           for (int i = 0; i < 1000; i++) {
               MyRunnable myRunnable = new MyRunnable();
               ListenableFuture listenableFuture = threadPoolTaskExecutor.submitListenable(myRunnable);
               listenableFuture.addCallback(new SuccessCallback() {
                   @Override
                   public void onSuccess(Object o) {
                       logger.info("请求成功：" + Thread.currentThread().getName() + "返回的object:" + o);
                   }
               }, new FailureCallback() {
                   @Override
                   public void onFailure(Throwable throwable) {
                       logger.info("请求失败：" + throwable.getMessage());
                   }
               });
           }
           logger.info(String.format("总结耗时：%s", System.currentTimeMillis() - start));
       }
   
       /**
        * 方式四： threadPoolTaskExecutor.submitListenable 返回ListenableFuture 参数：Callable
        * 无阻塞表现在：线程还没有执行完，就打印了 “总结耗时：”
        * Callable监听ListenableFuture 能接受到具体结果，也就是线程的生成的随机数
        */
       private void testSubmitListenableCallable() {
           long start = System.currentTimeMillis();
           for (int i = 0; i < 1000; i++) {
   
               MyCallable myCallable = new MyCallable();
               ListenableFuture<Double> listenableFuture = threadPoolTaskExecutor.submitListenable(myCallable);
               listenableFuture.addCallback(new SuccessCallback<Double>() {
                   @Override
                   public void onSuccess(Double result) {
                       logger.info("请求成功：" + Thread.currentThread().getName() + "具体的执行结果:" + result);
                   }
               }, new FailureCallback() {
                   @Override
                   public void onFailure(Throwable throwable) {
                       logger.info("请求失败：" + throwable.getMessage());
                   }
               });
           }
           logger.info(String.format("总结耗时：%s", System.currentTimeMillis() - start));
       }
   
   
       class MyRunnable implements Runnable {
   
   
           MyRunnable() {
   
           }
   
           @Override
           public void run() {
               double random = Math.random();
               // 执行你要的操作
               logger.info("当前线程：" + Thread.currentThread().getName() + "  生成的随机数：" + random);
   
           }
   
       }
   
       class MyCallable implements Callable<Double> {
   
   
           MyCallable() {
   
           }
   
           @Override
           public Double call() throws Exception {
               double random = Math.random();
               // 执行你要的操作
               logger.info("当前线程：" + Thread.currentThread().getName() + "  生成的随机数：" + random);
               return random;
           }
       }
   }
   
   
   ```

## 2. 测试

访问：http://localhost:8080/testAsync

![image-20201111163433543](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201111163433543.png)

## 3. 线程池四种创建线程的方法

### 3.1  方式一：通过 Runnable 使用线程池

最基础的使用方式：无法知道执行结果

```java
 /**
     * 方式一：通过 Runnable 使用线程池
     * 无阻塞表现在：线程还没有执行完，就打印了 “总结耗时：”
     */
    private void testRunnable() {
        long start = System.currentTimeMillis();
        for (int i = 0; i < 1000; i++) {
            MyRunnable myRunnable = new MyRunnable();
            threadPoolTaskExecutor.submit(myRunnable);
        }
        logger.info(String.format("总结耗时：%s", System.currentTimeMillis() - start));
    }
```

### 3.2  方式二： 通过 Callable 使用线程池

使用Callable 可以监听到回调。会阻塞。后面的语句要等直接完成后

```java

    /**
     * 方式二： 使用Callable 可以监听到回调。
     * 阻塞表现在：总在最后打印 “总结耗时：”
     * Callable的Future 能接受到具体结果，也就是线程的生成的随机数
     */
    private void testCallable() {
        long start = System.currentTimeMillis();
        for (int i = 0; i < 1000; i++) {
            MyCallable myCallable = new MyCallable();
            Future<Double> future = threadPoolTaskExecutor.submit(myCallable);
            try {
                Double result = future.get();
                logger.error("Callable返回的结果为：" + result);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        logger.info(String.format("总结耗时：%s", System.currentTimeMillis() - start));
    }
```

### 3.3 方式三：threadPoolTaskExecutor.submitListenable 返回ListenableFuture 参数：Runnable

- 无阻塞表现在：线程还没有执行完，就打印了 “总结耗时：”
-  Runnable监听ListenableFuture 只能知道线程是否执行完毕，线程生成的结果（随机数无法得知）

```java
/**
     * 方式三： threadPoolTaskExecutor.submitListenable 返回ListenableFuture 参数：Runnable
     * 无阻塞表现在：线程还没有执行完，就打印了 “总结耗时：”
     * Runnable监听ListenableFuture 只能知道线程是否执行完毕，线程生成的结果（随机数无法得知）
     */
    private void testSubmitListenableRunnable() {
        long start = System.currentTimeMillis();
        for (int i = 0; i < 1000; i++) {
            MyRunnable myRunnable = new MyRunnable();
            ListenableFuture listenableFuture = threadPoolTaskExecutor.submitListenable(myRunnable);
            listenableFuture.addCallback(new SuccessCallback() {
                @Override
                public void onSuccess(Object o) {
                    logger.info("请求成功：" + Thread.currentThread().getName() + "返回的object:" + o);
                }
            }, new FailureCallback() {
                @Override
                public void onFailure(Throwable throwable) {
                    logger.info("请求失败：" + throwable.getMessage());
                }
            });
        }
        logger.info(String.format("总结耗时：%s", System.currentTimeMillis() - start));
    }
```

### 方式四： threadPoolTaskExecutor.submitListenable 返回ListenableFuture 参数：Callable

```java
/**
 * 方式四： threadPoolTaskExecutor.submitListenable 返回ListenableFuture 参数：Callable
 * 无阻塞表现在：线程还没有执行完，就打印了 “总结耗时：”
 * Callable监听ListenableFuture 能接受到具体结果，也就是线程的生成的随机数
 */
private void testSubmitListenableCallable() {
    long start = System.currentTimeMillis();
    for (int i = 0; i < 1000; i++) {

        MyCallable myCallable = new MyCallable();
        ListenableFuture<Double> listenableFuture = threadPoolTaskExecutor.submitListenable(myCallable);
        listenableFuture.addCallback(new SuccessCallback<Double>() {
            @Override
            public void onSuccess(Double result) {
                logger.info("请求成功：" + Thread.currentThread().getName() + "具体的执行结果:" + result);
            }
        }, new FailureCallback() {
            @Override
            public void onFailure(Throwable throwable) {
                logger.info("请求失败：" + throwable.getMessage());
            }
        });
    }
    logger.info(String.format("总结耗时：%s", System.currentTimeMillis() - start));
}
```

## 参考文章

[深入理解 Spring 中的 ThreadPoolTaskExecutor 与 ListenableFuture 对象](http://ckjava.com/2019/08/22/understand-Spring-ThreadPoolTaskExecutor-ListenableFuture/)
