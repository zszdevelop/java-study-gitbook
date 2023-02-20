---
order: 110
category:
  - OOM
---

# 线上OOM-线程池线程无法及时消费内存堆积照成OOM

## 1. 背景

我们有个业务需求，需要将爬取到的网页做数据清理放到搜索引擎solr中。

1. 将mongodb 中的数据分页读取
2. 并通过一定的业务规则做数据转换成 搜索引擎solr 中所需的对象
3. 向solr中批量添加数据建索引

但出现以下几个问题

- 清理过程中GC特别频繁，最终导致OOM
- 线程继续打印，前后都没有日志。但是不继续运行了

## 2. demo代码

我们有100w条数据，我们需要将这些数据每100条分为一组放在子线程中做清理操作。

模拟主线程生产大于消费速度：50ms 生产1组，1000ms 消费一组。通过核心线程为10的子线程来执行

```java
public class ThreadTest {

    private static final int PAGE_SIZE = 100;

    @Test
    public void test() throws InterruptedException {

        // 构建一个10核心线程，20最大线程，最大队列为1000
        ThreadPoolExecutor executor = new ThreadPoolExecutor(10, 20, 200, TimeUnit.MILLISECONDS,
                new ArrayBlockingQueue<Runnable>(1000));

        // 总共100w的数据
        int totalCount = 1_000_000;
        int totalPageCount = (Integer.parseInt("" + totalCount) - 1) / PAGE_SIZE + 1;
        CountDownLatch cdl = new CountDownLatch(totalPageCount);

        // 生产数据，并立即添加到子线程
        int page = 1;
        long startTime = System.currentTimeMillis();
        List<MyBean> list = new ArrayList<>();
        for (int i = 0; i < totalCount; i++) {
            String content = getContent(i);
            MyBean myBean = new MyBean(content);
            list.add(myBean);
            if (list.size() == PAGE_SIZE) {

                // 生产的速度为50ms 一组
                Thread.sleep(50);


                // 开启子线程操作
                MyTask myTask = new MyTask(list,page,cdl);
                executor.submit(myTask);
                list = new ArrayList<>();
                System.out.println("主线程生产第："+page+"页数据,生产耗时："+(System.currentTimeMillis()-startTime)+"ms");
                startTime = System.currentTimeMillis();
                page++;
            }
        }

        try {
            cdl.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private String getContent(int i) {
        String s = "=== "+i +" ========将进酒=========\n" +
                "君不见黄河之水天上来，奔流到海不复回。\n" +
                "君不见高堂明镜悲白发，朝如青丝暮成雪。\n" +
                "人生得意须尽欢，莫使金樽空对月。\n" +
                "天生我材必有用，千金散尽还复来。\n" +
                "烹羊宰牛且为乐，会须一饮三百杯。\n" +
                "岑夫子，丹丘生，将进酒，杯莫停。\n" +
                "与君歌一曲，请君为我倾耳听。\n" +
                "钟鼓馔玉不足贵，但愿长醉不愿醒。\n" +
                "古来圣贤皆寂寞，惟有饮者留其名。\n" +
                "陈王昔时宴平乐，斗酒十千恣欢谑。\n" +
                "主人何为言少钱，径须沽取对君酌。\n" +
                "五花马、千金裘，呼儿将出换美酒，与尔同销万古愁。";
        return s;
    }


    /**
     * 消费任务
     */
    public class MyTask implements Callable<Boolean> {

        List<MyBean> list;
        int page;
        CountDownLatch countDownLatch;

        public MyTask(List<MyBean> list, int page, CountDownLatch countDownLatch) {
            this.list = list;
            this.page = page;
            this.countDownLatch = countDownLatch;
        }

        @Override
        public Boolean call() throws Exception {
            long t1 = System.currentTimeMillis();
            // 模拟业务处理，增加了标识（实际情况复杂得多）
            for (MyBean bean : list) {
                String content = bean.getContent();
                bean.setContent("线程中设置" + content);

            }
            // 消费1000ms
            Thread.sleep(1000);

            list.clear();

            countDownLatch.countDown();
            System.out.println("子线程："+Thread.currentThread().getName()+"消费第"+page+"页数据，消费耗时："+(System.currentTimeMillis()-t1)+"ms，剩余"+countDownLatch.getCount()+"次循环");
            return true;
        }
    }

    public class MyBean {
        String content;

        public MyBean(String content) {
            this.content = content;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }
}

```

## 3. 排查过程

### 3.1 打印gc和内存溢出的日志

因为测试demo不方便写太长的数据，只是临时用一个小短文代替（爬取的网页内容大概几K-几M不等），所以java 堆内存都设置小一些，方便模拟

```
-ea -XX:+HeapDumpOnOutOfMemoryError  -Xms64m -Xmx64m -XX:MetaspaceSize=32m -XX:MaxMetaspaceSize=32m -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:+PrintGCDateStamps -Xloggc:./gc.log 
```

### 3.2 分析-gc日志

![image-20220729133633739](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220729133633739.png)

通过上图我们可以看到前期GC 还不是特别频繁，但是后期的GC 就变得非常密集，且gc并不能很好的释放内存

### 3.3 分析-hprof

#### 3.3.1 概述信息

![image-20220729134546279](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220729134546279.png)

通过基本信息我们可以看出存在着大量的GC Root ，并且他们关联了大量对象实例导致无法释放

>我们的测试代码只有一个类，并且设了最大内存64m 的情况。这些指标非常高了。

#### 3.3.2 对象信息

![image-20220729134300050](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220729134300050.png)

我们可以看出主要就是前三个占用过多

我们先看char[]

![image-20220729135053149](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220729135053149.png)

![image-20220729140808416](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220729140808416.png)

可以看出这里面关联的是我们线程中的文本对象。

首先我们想到的是，线程中的对象是否存在没有释放的情况。检查代码后并没有发现全局引用无法释放的情况。

但我们可以优化一下，主动清理掉线程中的list引用。不用等GC

```java
list.clear();
```

> ps: 我们不主动clear。gc 也会帮我们清理。应该不至于gc后内存并没有明显下降的情况

我们继续往下看还有几万个实例

![image-20220729135857281](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220729135857281.png)

这些实例并没有进入到线程中，却已经存在了我们的实例中了

![image-20220729140914156](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220729140914156.png)

我们点开可以看到大量的对象都堆积在线程池中的阻塞队列中。无法消化。最终导致内存堆积。即使GC也无济于事

#### 3.3.3 线程信息

![image-20220729141319536](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220729141319536.png)

我们可以看到我们启动了10个子线程，2个正在运行中

![image-20220729141533043](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220729141533043.png)

我们可以看到最终OOM 的线程是thread-9 

![image-20220729141757158](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220729141757158.png)

其中关联了我们list和对象。

这些是我们也业务所需的数据。并没有什么问题

## 4. 解决方案

使用阻塞队列来实现

我们生产者一次最多生产20组数据，消费者消费了再生产，否则阻塞数据

```java
public class ThreadTest {

    private static final int TOTAL_COUNT = 50_000;
    private static final int PAGE_SIZE = 100;

    @Test
    public void test() throws InterruptedException {

        // 构建一个10核心线程，20最大线程，最大队列为1000
        ThreadPoolExecutor executor = new ThreadPoolExecutor(10, 20, 200, TimeUnit.MILLISECONDS,
                new ArrayBlockingQueue<Runnable>(1000));


        // 构建阻塞队列
        BlockingQueue<List<MyBean>> queue = new ArrayBlockingQueue(20);

        CountDownLatch countDownLatch = new CountDownLatch(1);

        Producer producer = new Producer(queue,countDownLatch);

        new Thread(producer).start();


        for (int i = 0;i<10;i++){
            Consumer myTask = new Consumer(queue);
            executor.submit(myTask);
        }
        countDownLatch.await();

    }

    private String getContent(int i) {
        String s = "=== " + i + " ========将进酒=========\n" +
                "君不见黄河之水天上来，奔流到海不复回。\n" +
                "君不见高堂明镜悲白发，朝如青丝暮成雪。\n" +
                "人生得意须尽欢，莫使金樽空对月。\n" +
                "天生我材必有用，千金散尽还复来。\n" +
                "烹羊宰牛且为乐，会须一饮三百杯。\n" +
                "岑夫子，丹丘生，将进酒，杯莫停。\n" +
                "与君歌一曲，请君为我倾耳听。\n" +
                "钟鼓馔玉不足贵，但愿长醉不愿醒。\n" +
                "古来圣贤皆寂寞，惟有饮者留其名。\n" +
                "陈王昔时宴平乐，斗酒十千恣欢谑。\n" +
                "主人何为言少钱，径须沽取对君酌。\n" +
                "五花马、千金裘，呼儿将出换美酒，与尔同销万古愁。";
        return s;
    }



    public class MyBean {
        String content;

        public MyBean(String content) {
            this.content = content;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }

    /**
     * 生产者
     */
    public class Producer implements Runnable {
        BlockingQueue queue;CountDownLatch countDownLatch;

        public Producer(BlockingQueue queue, CountDownLatch countDownLatch) {
            this.queue = queue;
            this.countDownLatch = countDownLatch;
        }

        @Override
        public void run() {
            try {
                // 总共100w的数据


                int page = 1;
                long startTime = System.currentTimeMillis();
                List<MyBean> list = new ArrayList<>();
                for (int i = 0; i < TOTAL_COUNT; i++) {
                    String content = getContent(i);
                    MyBean myBean = new MyBean(content);
                    list.add(myBean);
                    if (list.size() == PAGE_SIZE) {

                        // 生产的速度为50ms 一组
                        Thread.sleep(50);

                        queue.put(list);
                        list = new ArrayList<>();
                        System.out.println("生产第：" + page + "页数据,生产耗时：" + (System.currentTimeMillis() - startTime) + "ms");
                        startTime = System.currentTimeMillis();
                        page++;
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            countDownLatch.countDown();
        }
    }

    /**
     * 消费者
     */
    public class Consumer implements Runnable {

        BlockingQueue<List<MyBean>> queue;

        public Consumer(BlockingQueue<List<MyBean>> queue) {
            this.queue = queue;
        }

        @Override
        public void run() {
            try {
                while (true) {
                    List<MyBean> take = queue.take();
                    process(take);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }

        }

        private void process(List<MyBean> list) throws InterruptedException {
            long t1 = System.currentTimeMillis();
            // 模拟业务处理，增加了标识（实际情况复杂得多）
            for (MyBean bean : list) {
                String content = bean.getContent();
                bean.setContent("线程中设置" + content);

            }
            // 消费1000ms
            Thread.sleep(1000);

            list.clear();

            System.out.println("消费:子线程：" + Thread.currentThread().getName() + "第"  + "页数据，消费耗时：" + (System.currentTimeMillis() - t1) + "ms");

        }
    }
}

```

## 5. 推翻原有

8.10 日网上与狮子大佬争论这个问题，最终颠覆之前认知。

总结如下

1. 狮子的代码在我电脑上OOM 是因为阻塞队列太大了10000 在我电脑上OOM（可能跟个人电脑有关）

   > ps: 只要阻塞队列能发挥作用，这个队列大小设置小一点也没事

2. 狮子在我原有线程池上还加上了拒绝策略,**ThreadPoolExecutor.CallerRunsPolicy：由调用线程处理该任务 。**

   > ps: **加了CallerRunsPolicy 阻塞队列才能发挥阻塞作用**。

3. 默认的拒绝策略是ThreadPoolExecutor.AbortPolicy:丢弃任务并抛出RejectedExecutionException异常

   >ps: 之前看到异常的时候，并没有往拒绝策略上想。而是加大了阻塞队列大小。

## 6. 总结

- 阻塞队列的大小，如果设置过大，那么线程无休止的增加，且无法释放，就会导致OOM

  >最早版本觉得1000的最大队列数，肯定不够放。改成了100000反而造成了线程的更大堆积问题

- 主线程挂了，线程池（子线程）依然可以正常运行。

  > 这也是为什么有时候明明OOM 了，子线程还能继续运行一段时间