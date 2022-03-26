# 进程优雅退出功能&实现思路

## 1. 背景

我们在linux 环境经常使用 kill -9 PID 来关闭进程。但是kill -9 pid 的方式是强制将某个进程杀掉。但是这种方式非常暴力，相当于突然断电，可能会导致

- 缓存中的数据尚未持久化到磁盘中，导致数据丢失
- 正在进行文件的write操作，没有更新完成，突然退出，导致文件损坏；
- 线程的消息队列中尚有接收到的请求消息还没来得及处理，导致请求消息丢失；

## 2. JAVA优雅退出（理论）

Java的优雅停机通常通过注册JDK的ShutdownHook来实现，当系统接收到退出指令后，首先标记系统处于退出状态，不再接收新的消息，然后将积压的消息处理完，最后调用资源回收接口将资源销毁，最后各线程退出执行。

通常优雅退出需要有超时控制机制，例如30S，如果到达超时时间仍然没有完成退出前的资源回收等操作，则由停机脚本直接调用kill-9 pid，强制退出。

## 3. 项目优雅退出实战

### 3.1 使用kill PID 关闭进程

项目关闭时使用kill PID 关闭进程，而不是kill -9 pid

> - `kill pid`的作用是向进程号为pid的进程发送`SIGTERM`（这是kill默认发送的信号），该信号是一个结束进程的信号且**可以被应用程序捕获**
> - `kill -9 pid`则是向进程号为pid的进程发送`SIGKILL`（该信号的编号为9），从本文上面的说明可知，SIGKILL既不能被应用程序捕获，也不能被阻塞或忽略，其动作是立即结束指定进程。通俗地说，应用程序根本无法“感知”SIGKILL信号，它在完全无准备的情况下，就被收到SIGKILL信号的操作系统给干掉了，显然，在这种“暴力”情况下，应用程序完全没有释放当前占用资源的机会。事实上，SIGKILL信号是直接发给init进程的，它收到该信号后，负责终止pid指定的进程。在某些情况下（如进程已经hang死，无法响应正常信号），就可以使用kill -9来结束进程。

### 3.2 监听退出

我们spring项目，可以采用spring 的 @PreDestroy 注解来监听退出。

```java

/**
 * 确保应用退出时能关闭后台线程
 *
 * @author fardu
 */
@Component
public class ShutdownManager
{
    private static final Logger logger = LoggerFactory.getLogger("sys-user");

    @PreDestroy
    public void destroy()
    {
        shutdownAsyncManager();
    }

    /**
     * 停止异步执行任务
     */
    private void shutdownAsyncManager()
    {
        try
        {
            logger.info("====关闭后台任务任务线程池====");
            AsyncManager.me().shutdown();
        }
        catch (Exception e)
        {
            logger.error(e.getMessage(), e);
        }
    }
}

```

### 3.3 停止线程池

```java
 /**
     * 停止线程池
     * 先使用shutdown, 停止接收新任务并尝试完成所有已存在任务.
     * 如果超时, 则调用shutdownNow, 取消在workQueue中Pending的任务,并中断所有阻塞函数.
     * 如果仍人超時，則強制退出.
     * 另对在shutdown时线程本身被调用中断做了处理.
     */
    public static void shutdownAndAwaitTermination(ExecutorService pool)
    {
        if (pool != null && !pool.isShutdown())
        {
            pool.shutdown();
            try
            {
                if (!pool.awaitTermination(120, TimeUnit.SECONDS))
                {
                    pool.shutdownNow();
                    if (!pool.awaitTermination(120, TimeUnit.SECONDS))
                    {
                        logger.info("Pool did not terminate");
                    }
                }
            }
            catch (InterruptedException ie)
            {
                logger.info("停止线程池异常,{}",ie.getMessage(),ie);
                pool.shutdownNow();
                Thread.currentThread().interrupt();
            }
        }
    }
```

## 参考文章

(java 优雅退出_Netty优雅退出机制和原理)[https://blog.csdn.net/weixin_33196106/article/details/114217150]

[进程如何优雅退出？](https://juejin.cn/post/6844904121057673223)