# 线程池执行完所有任务后再执行主线程方案

## 1. 背景

之前有个业务需要将多份pdf转成图片，最早我们是将pdf按顺序一张张转换。但是转换时间实在太长。

- 改进流程一：

  将pdf转图片做成异步处理，速度是快了，但是并不知道什么时候结束。查看图片时图片都为空

- 改进流程二：

  使用CountDownLatch监听线程池是否全部执行完成，执行完成后才返回

## 2.解决方案

```java
public class Test1 {

    public static ExecutorService executorService = Executors.newCachedThreadPool();
    private static CountDownLatch cdl = new CountDownLatch(10);
    private static final Random random = new Random();

    public void test() {
        for (int i = 0; i < 10; i++) executorService.execute(new ThreadTest());
    }

    public static void main(String[] args) {
        new Test1().test();

        //插入数据完成后  执行修改操作
        try {
            cdl.await();
        } catch (InterruptedException e) {
        }
        System.out.println("它们已经插完啦..............................");
        executorService.shutdown();

    }

    class ThreadTest implements Runnable {

        public void run() {
            //执行插入数据操作  每次插入一条
            // 模拟耗时
            int time = random.nextInt(10000);
            try {
                Thread.sleep(time);
            } catch (InterruptedException e) {
            }
            System.out.println(Thread.currentThread().getName() + "执行完了，耗时：" + time / 1000 + "秒");
            cdl.countDown();
        }
    }
}
```

![image-20210901205113806](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210901205113806.png)

## 参考文章

[Java等线程池执行完所有任务后再执行主线程?](https://www.zhihu.com/question/52580874)

[CountDownLatch详解](https://www.jianshu.com/p/128476015902)
