# ThreadPoolTaskExecutor和ThreadPoolExecutor有何区别?

## 1. 区别

1. 所属包不同：
   - ThreadPoolTaskExecutor 在 spring core包中
   - ThreadPoolExecutor 是JDK中的JUC
2. **ThreadPoolTaskExecutor 是对ThreadPoolExecutor进行了封装处理**
3. 相比 ThreadPoolExecutor，ThreadPoolTaskExecutor 增加了 submitListenable 方法，该方法返回 ListenableFuture 接口对象。
   - ListenableFuture 接口对象，增加了线程执行完毕后成功和失败的回调方法。从而避免了 Future 需要以阻塞的方式调用 get，然后再执行成功和失败的方法。

## 2. ThreadPoolTaskExecutor 源码

1. 成员变量与构造函数

```java
public class ThreadPoolTaskExecutor extends ExecutorConfigurationSupport implements AsyncListenableTaskExecutor, SchedulingTaskExecutor {
    private final Object poolSizeMonitor = new Object();
    private int corePoolSize = 1;
    private int maxPoolSize = 2147483647;
    private int keepAliveSeconds = 60;
    private int queueCapacity = 2147483647;
    private boolean allowCoreThreadTimeOut = false;
    @Nullable
    private TaskDecorator taskDecorator; 
    @Nullable
    private ThreadPoolExecutor threadPoolExecutor;//这里就用到了ThreadPoolExecutor
    private final Map<Runnable, Object> decoratedTaskMap;

    public ThreadPoolTaskExecutor() {
        this.decoratedTaskMap = new ConcurrentReferenceHashMap(16, ReferenceType.WEAK);
    }
```

2. 设置完配置需要调用initialize方法初始化。最终实例化了ThreadPoolExecutor

   ```java
       protected ExecutorService initializeExecutor(ThreadFactory threadFactory, RejectedExecutionHandler rejectedExecutionHandler) {
           BlockingQueue<Runnable> queue = this.createQueue(this.queueCapacity);
           ThreadPoolExecutor executor;
           if (this.taskDecorator != null) {
               executor = new ThreadPoolExecutor(this.corePoolSize, this.maxPoolSize, (long)this.keepAliveSeconds, TimeUnit.SECONDS, queue, threadFactory, rejectedExecutionHandler) {
                   public void execute(Runnable command) {
                       Runnable decorated = ThreadPoolTaskExecutor.this.taskDecorator.decorate(command);
                       if (decorated != command) {
                           ThreadPoolTaskExecutor.this.decoratedTaskMap.put(decorated, command);
                       }
   
                       super.execute(decorated);
                   }
               };
           } else {
               executor = new ThreadPoolExecutor(this.corePoolSize, this.maxPoolSize, (long)this.keepAliveSeconds, TimeUnit.SECONDS, queue, threadFactory, rejectedExecutionHandler);
           }
   
           if (this.allowCoreThreadTimeOut) {
               executor.allowCoreThreadTimeOut(true);
           }
   
           this.threadPoolExecutor = executor;
           return executor;
       }
   ```

   ## 3. 推荐

   推荐直接使用spring封装好的 ThreadPoolTaskExecutor ，更加简洁方便一些

