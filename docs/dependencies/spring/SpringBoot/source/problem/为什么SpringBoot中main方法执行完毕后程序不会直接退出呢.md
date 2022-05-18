# 为什么SpringBoot中main方法执行完毕后程序不会直接退出呢

## 1. 简介

正常情况下我们main方法执行结束后，该进程就结束了。那为什么springboot main函数执行完不会退出呢？

![image-20220515222654390](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220515222654390.png)

针对这个问题我们可以转化一下思路：一个JVM进程，在什么情况下会正常退出？

## 2. 什么情况JVM进程，在什么情况下会正常退出？

### 2.1 方式1：System.exit()`或`Runtime.exit()

使用`System.exit()`或`Runtime.exit()`可以直接导致当前JVM进程退出，

但是仔细想想这个好像跟SpringBoot没啥关系哈

### 2.2 方式2：**非daemon进程完全终止**

另外一个可能会导致进程退出的是所有的**非daemon进程完全终止**，那么根据这个条件反推的话是不是说只要保证SpringBoot进程中包含1个以上的daemon进程就可以保证程序不会退出

## 3. SpringBoot是如何实现

我们以SpringBoot默认使用的Tomcat容器为例，在我之前SpringBoot源码分析的文章中也提到过，在启动Tomcat的时候，会调用`TomcatWebServer`的`initialize`方法，在这个方法中会调用一个`startDaemonAwaitThread`方法

```java
private void startDaemonAwaitThread() {
        Thread awaitThread = new Thread("container-" + containerCounter.get()) {
            public void run() {
                TomcatWebServer.this.tomcat.getServer().await();
            }
        };
        awaitThread.setContextClassLoader(this.getClass().getClassLoader());
        awaitThread.setDaemon(false);
        awaitThread.start();
    }
```

下面我们在深挖一下，在Tomcat的`this.tomcat.getServer().await()`这个方法中，线程是如何实现不退出的。这里为了阅读方便，去掉了不相关的代码。

```java
public void await() {
        // ...
        if( port==-1 ) {
            try {
                awaitThread = Thread.currentThread();
                while(!stopAwait) {
                    try {
                        Thread.sleep( 10000 );
                    } catch( InterruptedException ex ) {
                        // continue and check the flag
                    }
                }
            } finally {
                awaitThread = null;
            }
            return;
        }
        // ...
    }
```

在await方法中，实际上当前线程在一个while循环中每10秒检查一次 stopAwait这个变量，它是一个volatile类型变量，用于确保被另一个线程修改后，当前线程能够立即看到这个变化。如果没有变化，就会一直处于while循环中。这就是该线程不退出的原因，也就是整个spring-boot应用不退出的原因。

## 参考文章

[科普：为什么SpringBoot中main方法执行完毕后程序不会直接退出呢](https://mp.weixin.qq.com/s?__biz=MzU5MDgzOTYzMw==&mid=2247484897&idx=1&sn=abe1f147fc9e574393523ee0930aba9b&chksm=fe396fdfc94ee6c95a8e428f012e8922a7b8719bea48ea8086680b74265358a2ffb7acde53a4&scene=178&cur_album_id=1344428721251598337#rd)