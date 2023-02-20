---
#order: 70
category:
  - Java
  - JVM

---

# gc日志分析

## 1. 什么时候会发生垃圾收集

首先我们来看一个问题，那就是什么时候会发生垃圾回收？
在Java中，GC是由JVM自动完成的，根据JVM系统环境而定，所以时机是不确定的。 当然，我们可以手动进行垃圾回收， 比如调用System.gc()方法通知JVM进行一次垃圾回收，但是具体什么时刻运行也无法控制。也就是说System.gc()只是通知要回收，什么时候回收由JVM决定。
一般以下几种情况会发生垃圾回收：

1. 当Eden区或者S区不够用时
2. 老年代空间不够用了时
3. 方法区空间不够用时
4. System.gc() 时

>注意：**可能有些人会以为方法区是不会发生垃圾回收的，其实方法区也是会发生垃圾回收的，只不过大部分情况下，方法区发生垃圾回收之后效率不是很高，大部分内存都回收不掉，所以我们一般讨论垃圾回收的时候也只讨论堆内的回收**

## 2. 怎么拿到GC日志

发生GC之后，我们要分析GC日志，当然就首先要拿到GC日志，JVM参数分类及常用参数分析时有提到，打印GC日志可以通过如下命令：

```bash
-XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:+PrintGCDateStamps -Xloggc:./gc.log 
```

![image-20220429154545836](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429154545836.png)

找到gc.log文件，注意，刚开始如果一次GC都没发生日志是空的，可以等到发生GC之后再打开：

![image-20220429154804961](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429154804961.png)

从日志上可以看出来，jdk1.8中默认使用的是Parallel Scavenge+Parallel Old收集器，当然我们也可以通过参数：

```
-XX:+PrintCommandLineFlags
```

进行打印：

![image-20220429154946996](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429154946996.png)

```
-XX:-BytecodeVerificationLocal -XX:-BytecodeVerificationRemote -XX:InitialHeapSize=268435456 -XX:+ManagementServer -XX:MaxHeapSize=4294967296 -XX:+PrintCommandLineFlags -XX:+PrintGC -XX:+PrintGCDateStamps -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:TieredStopAtLevel=1 -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:+UseParallelGC 
```

## 3. gc日志分析

![image-20220429160003832](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429160003832.png)

### 3.1 环境信息

```bash
# 当前所使用的的HotSpot虚拟机及其对应版本号；
Java HotSpot(TM) 64-Bit Server VM (25.231-b11) for bsd-amd64 JRE (1.8.0_231-b11), built on Oct  5 2019 03:15:25 by "java_re" with gcc 4.2.1 (Based on Apple Inc. build 5658) (LLVM build 2336.11.00)
# 操作系统相关的内存信息；
Memory: 4k page, physical 16777216k(2322260k free)

```

### 3.2 配置的参数信息

- 初始堆大小：268435456B=>256M
- 最大堆大小：4294967296B=>4096M=>4G

```bash
# 当前Java服务启动后配置的参数信息：
CommandLine flags: -XX:-BytecodeVerificationLocal -XX:-BytecodeVerificationRemote -XX:InitialHeapSize=268435456 -XX:+ManagementServer -XX:MaxHeapSize=4294967296 -XX:+PrintCommandLineFlags -XX:+PrintGC -XX:+PrintGCDateStamps -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:TieredStopAtLevel=1 -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:+UseParallelGC 
```

包括了堆空间打印，以及使用的垃圾收集器及我们自己配置的打印GC日志相关参数等一些信息。

### 3.3 真正的GC日志

我们把第7行还有第11行复制出来分析一下：

```bash
# 第7行
2022-04-29T15:49:04.317-0800: 6.159: [GC (Allocation Failure) [PSYoungGen: 65536K->4671K(76288K)] 65536K->4743K(251392K), 0.0045293 secs] [Times: user=0.01 sys=0.00, real=0.01 secs] 
# 第11行
2022-04-29T15:49:15.162-0800: 17.005: [Full GC (Metadata GC Threshold) [PSYoungGen: 8154K->0K(141824K)] [ParOldGen: 541K->7884K(79360K)] 8696K->7884K(221184K), [Metaspace: 20482K->20482K(1067008K)], 0.0263932 secs] [Times: user=0.09 sys=0.01, real=0.02 secs] 

```

1. 最前面一个时间2022-04-29T15:49:04.317-0800 代表的是垃圾回收发生的时间。

2. 紧接着下面的一个数字：6.159 表示的是从Java虚拟机启动以来经过的秒数。

3. 再往下一个GC (Allocation Failure)表示发生GC的原因，这里是表示分配空间失败而发生了GC。

4. PSYoungGen，PS表示的是Parallel Scavenge收集器，YoungGen表示的是当前发生GC的地方是年轻代，注意，这里不同收集器会有不同的名字，如ParNew收集器就会显示为ParNew等。

5. 中括号之内的一个数字65536K->4671K(76288K)这个表示的是：GC前当前内存区域使用空间64MB->GC后当前内存区域使用的内存空间4.56M(当前区域的总内存空间74.5M)。从这里可以看到，一次GC之后，大部分空间都被回收掉了。

6. 中括号之外的数字65536K->4743K(251392K)这个表示的是：GC前Java堆已使用容量64MB->GC后Java堆已使用容量4.6MB(Java堆使用的总容量245M)
   这里需要注意的是5和6中的这两组数字相减得到的值一般是不相等的，这是因为总空间下面还包括了老年代发生回收后释放的空间大小，可能有人会觉得奇怪，这里明明只有新生代发生了GC，为什么老年代会有空间释放？
   不知道大家还记不记得我在前两篇文章中提到了，**S区如果空间不够的话会利用担保机制向老年代借用空间，所以借来的空间时可能被释放的**，如果想详细了解的S区的担保机制的话可以[点击这里](https://blog.csdn.net/zwx900102/article/details/108108555)。
   
   >简单点说就是：GC回收前年轻代和老年代大小，回收后大小，（年轻代和老年代总大小）；
   >
   >**注意：Minor GC堆内存总容量 = 9/10年轻代 + 老年代。原因是Survivor区只计算from部分，而JVM默认年轻代中Eden区和Survivor区的比例关系，Eden:S0:S1=8:1:1。**
   
7. 0.0045293 secs这个表示的是GC所花费时间，secs表示单位是秒。

8. [Times: user=0.01 sys=0.00, real=0.01 secs] 这一部分并不是所有的垃圾收集器都会打印，user=0.01表示用户态消耗的CPU时间，sys=0.00表示内核态消耗的CPU时间和操作从开始到结束所经过的墙钟时间。

9. 最后再看看其他行ParOldGen表示Parallel Old收集器在回收老年代，Metaspace表示的是方法区(jdk1.7是永久代)

10. 我们看到第11行Full GC表示发生了Full GC，FullGC=Minor GC+Major GC+Metaspace GC，所以后面可以看到PSYoungGen，ParOldGen，Metaspace三个区域的回收信息，而且第11行对比非常明显，新生代全部回收掉了，老年代回收了一小部分，而方法区一点都没有回收掉，这也体现了三个区域内所存对象的区别。

#### 3.3.1 gc日志情况

##### 3.2.1.1 默认情况

由该gc日志可知：初始堆256M，最大堆4G 的情况下

> 以下值并不是固定的，在初始值不够时还会向jvm申请

- 年轻代：76288K=74.5M
- 老年代：221184K = 216M
- 元空间：1067008K=1042M

##### 3.2.1.2 堆设置为512,新生代与老年代比值设为1

```bash
2022-05-05T15:45:14.545-0800: 52.326: [Full GC (Metadata GC Threshold) [PSYoungGen: 25963K->0K(207872K)] [ParOldGen: 83587K->105673K(262144K)] 109551K->105673K(470016K), [Metaspace: 94852K->94852K(1136640K)], 0.4118760 secs] [Times: user=2.08 sys=0.03, real=0.41 secs] 
```

- 新生代：207872K=203M
- 老年代：262144K= 256M= 正好是总堆的一半
- 元空间：1136640K=1110M

>**注意：Minor GC堆内存总容量 = 9/10年轻代 + 老年代。原因是Survivor区只计算from部分，而JVM默认年轻代中Eden区和Survivor区的比例关系，Eden:S0:S1=8:1:1。**

![image-20220505155043126](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220505155043126.png)

## 4. 墙钟时间和cpu时间

墙钟时间(Wall Clock Time)包括各种非运算的等待耗时，例如等待磁盘I/O、等待线程阻塞，而CPU时间不包括这些不需要消耗CPU的时间。

## 5. CMS日志分析

我们垃圾收集器切换为CMS

```java
-XX:+UseConcMarkSweepGC
```

注意，CMS也是一款老年代收集器，使用这个参数后新生代默认会使用ParNew收集器
然后重启服务，等候垃圾回收之后，打开gc.log文件。

![image-20220429161025196](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429161025196.png)

前面两行和上面一样，我们把第6行复制出来看看垃圾收集器是否切换成功：

```
CommandLine flags: -XX:-BytecodeVerificationLocal -XX:-BytecodeVerificationRemote -XX:InitialHeapSize=268435456 -XX:+ManagementServer -XX:MaxHeapSize=4294967296 -XX:MaxNewSize=697933824 -XX:MaxTenuringThreshold=6 -XX:OldPLABSize=16 -XX:+PrintCommandLineFlags -XX:+PrintGC -XX:+PrintGCDateStamps -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:TieredStopAtLevel=1 -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:+UseConcMarkSweepGC -XX:+UseParNewGC 

```

可以看到，CMS和ParNew两个收集器都启用了。打开第7行日志：

```
2022-04-29T16:09:11.428-0800: 5.777: [GC (Allocation Failure) 2022-04-29T16:09:11.433-0800: 5.782: [ParNew: 69952K->4668K(78656K), 0.0045270 secs] 69952K->4668K(253440K), 0.0093551 secs] [Times: user=0.02 sys=0.00, real=0.01 secs] 

```

这里的回收信息和上面一样，也就是新生代名字不一样，这里叫ParNew。我们主要看看老年代CMS的GC日志，我们把一个完成的老年代回收日志复制出来：

```
2020-08-23T17:00:47.650+0800: 18.182: [GC (CMS Initial Mark) [1 CMS-initial-mark: 30298K(86016K)] 34587K(124736K), 0.0014342 secs] [Times: user=0.00 sys=0.00, real=0.00 secs] 
2020-08-23T17:00:47.651+0800: 18.183: [CMS-concurrent-mark-start]
2020-08-23T17:00:47.712+0800: 18.244: [CMS-concurrent-mark: 0.061/0.061 secs] [Times: user=0.13 sys=0.00, real=0.06 secs] 
2020-08-23T17:00:47.712+0800: 18.244: [CMS-concurrent-preclean-start]
2020-08-23T17:00:47.714+0800: 18.245: [CMS-concurrent-preclean: 0.001/0.001 secs] [Times: user=0.00 sys=0.00, real=0.00 secs] 
2020-08-23T17:00:47.714+0800: 18.246: [CMS-concurrent-abortable-preclean-start]
2020-08-23T17:00:48.143+0800: 18.674: [GC (Allocation Failure) 2020-08-23T17:00:48.143+0800: 18.674: [ParNew: 38720K->4111K(38720K), 0.0101415 secs] 69018K->38573K(124736K), 0.0102502 secs] [Times: user=0.06 sys=0.00, real=0.01 secs] 
2020-08-23T17:00:48.451+0800: 18.983: [CMS-concurrent-abortable-preclean: 0.274/0.737 secs] [Times: user=0.94 sys=0.13, real=0.74 secs] 
2020-08-23T17:00:48.451+0800: 18.983: [GC (CMS Final Remark) [YG occupancy: 23345 K (38720 K)]2020-08-23T17:00:48.451+0800: 18.983: [Rescan (parallel) , 0.0046112 secs]2020-08-23T17:00:48.456+0800: 18.987: [weak refs processing, 0.0006259 secs]2020-08-23T17:00:48.457+0800: 18.988: [class unloading, 0.0062187 secs]2020-08-23T17:00:48.463+0800: 18.994: [scrub symbol table, 0.0092387 secs]2020-08-23T17:00:48.472+0800: 19.004: [scrub string table, 0.0006408 secs][1 CMS-remark: 34461K(86016K)] 57806K(124736K), 0.0219024 secs] [Times: user=0.05 sys=0.01, real=0.02 secs] 
2020-08-23T17:00:48.473+0800: 19.005: [CMS-concurrent-sweep-start]
2020-08-23T17:00:48.489+0800: 19.020: [CMS-concurrent-sweep: 0.015/0.015 secs] [Times: user=0.01 sys=0.00, real=0.02 secs] 
2020-08-23T17:00:48.489+0800: 19.020: [CMS-concurrent-reset-start]
2020-08-23T17:00:48.492+0800: 19.023: [CMS-concurrent-reset: 0.003/0.003 secs] [Times: user=0.00 sys=0.00, real=0.00 secs] 

```

1. CMS Initial Mark对应的是CMS工作机制的第一步**初始标记**，主要是寻找GCRoot对象

2. 中括号内10443K(86016K)表示的是当前区域已经使用大小和总空间大小

3. 中括号外13477K(124736K)表示的是堆内已使用空间大小和堆内总空间大小

4. CMS-concurrent-mark-start这里对应了CMS工作机制中的第二步**并发标记**。这个阶段主要是根据GCRoot对象遍历整个引用链

5. 再往后面一行CMS-concurrent-mark: 0.052/0.052 secs，这里的两个时间，第一个表示该阶段持续的cpu时间和墙钟时间

6. 后面的CMS-concurrent-preclean和CMS-concurrent-abortable-preclean对应了预清理和可中断预清理阶段

7. CMS-concurrent-sweep-start对应最终标记，此阶段需要STW，可以看到，在此阶段前发生了一次Young GC,这是为了减少STW时间。

8. CMS-concurrent-sweep并发清除垃圾，CMS-concurrent-reset重置线程

## 6. G1日志分析

切换到G1垃圾收集器：

```java
-XX:+UseG1GC 
```

然后重启服务，等待发生垃圾回收之后打开gc.log文件：

![image-20220429161709649](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429161709649.png)

可以看到，这个文件相比较于其他垃圾收集器要复杂的多。我们还是先看下第6行，确认是否使用了G1收集器：

```bash
CommandLine flags: -XX:-BytecodeVerificationLocal -XX:-BytecodeVerificationRemote -XX:InitialHeapSize=268435456 -XX:+ManagementServer -XX:MaxHeapSize=4294967296 -XX:+PrintCommandLineFlags -XX:+PrintGC -XX:+PrintGCDateStamps -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:TieredStopAtLevel=1 -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:+UseG1GC 

```

可以看到确实使用了G1收集器。我们找到一次完整的G1日志，复制出来：

```bash
2020-08-23T18:44:39.787+0800: 2.808: [GC pause (G1 Evacuation Pause) (young), 0.0029103 secs]
   [Parallel Time: 1.9 ms, GC Workers: 4]
      [GC Worker Start (ms): Min: 2807.7, Avg: 2807.8, Max: 2807.8, Diff: 0.1]
      [Ext Root Scanning (ms): Min: 0.3, Avg: 0.6, Max: 0.8, Diff: 0.5, Sum: 2.2]
      [Update RS (ms): Min: 0.0, Avg: 0.0, Max: 0.0, Diff: 0.0, Sum: 0.0]
         [Processed Buffers: Min: 0, Avg: 0.0, Max: 0, Diff: 0, Sum: 0]
      [Scan RS (ms): Min: 0.0, Avg: 0.0, Max: 0.0, Diff: 0.0, Sum: 0.0]
      [Code Root Scanning (ms): Min: 0.0, Avg: 0.0, Max: 0.0, Diff: 0.0, Sum: 0.0]
      [Object Copy (ms): Min: 0.9, Avg: 1.2, Max: 1.4, Diff: 0.5, Sum: 4.6]
      [Termination (ms): Min: 0.0, Avg: 0.0, Max: 0.0, Diff: 0.0, Sum: 0.0]
         [Termination Attempts: Min: 1, Avg: 2.5, Max: 4, Diff: 3, Sum: 10]
      [GC Worker Other (ms): Min: 0.0, Avg: 0.0, Max: 0.0, Diff: 0.0, Sum: 0.2]
      [GC Worker Total (ms): Min: 1.7, Avg: 1.8, Max: 1.8, Diff: 0.1, Sum: 7.1]
      [GC Worker End (ms): Min: 2809.5, Avg: 2809.5, Max: 2809.5, Diff: 0.0]
   [Code Root Fixup: 0.0 ms]
   [Code Root Purge: 0.0 ms]
   [Clear CT: 0.1 ms]
   [Other: 1.0 ms]
      [Choose CSet: 0.0 ms]
      [Ref Proc: 0.8 ms]
      [Ref Enq: 0.0 ms]
      [Redirty Cards: 0.1 ms]
      [Humongous Register: 0.0 ms]
      [Humongous Reclaim: 0.0 ms]
      [Free CSet: 0.0 ms]
   [Eden: 6144.0K(6144.0K)->0.0B(12.0M) Survivors: 0.0B->1024.0K Heap: 6144.0K(126.0M)->1520.0K(126.0M)]
 [Times: user=0.00 sys=0.00, real=0.00 secs] 
```

- [GC pause (G1 Evacuation Pause) (young), 0.0029103 secs]这里表示发生GC的区域是Young区，后面就是总共耗费的时间。
  注意：**G1虽然在物理上取消了区域的划分，但是逻辑上依然保留了，所以日志中还是会显示young，Full GC会用mixed来表示。**
- [Parallel Time: 1.9 ms, GC Workers: 4] 这句表示线程的并行时间和并行的线程数
- [GC Worker Start (ms): Min: 2807.7, Avg: 2807.8, Max: 2807.8, Diff: 0.1]这个表示并行的每个线程的开始时间最小值，平均值和最大值以及时间差(Max-Min)。

[详细日志介绍](https://dzone.com/articles/understanding-g1-gc-log-format)

![image-20220429170801285](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429170801285.png)

## 7. 利用工具分析GC日志

虽然说我们从日志上能看懂GC日志，但是如果需要进行调优，我们最关注的是2个点：

- 1、吞吐量(Throughput)
  吞吐量=运行用户代码时间/(运行用户代码时间+GC时间)
- 2、GC暂停时间(Pause Time)
  Stop The World时间

那么我们直接从GC日志上很难看出来这两个指标，如果要靠自己计算去确认问题，我觉得这会是一个噩梦。所以同样的，我们需要有工具来帮助我们分析，下面就介绍2款常用的工具。

### 7.1 gceasy

- 1、打开官网地址：https://gceasy.io/
- 2、上传gc日志

![image-20220429162028875](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429162028875.png)

然后可以进入主页面：

![image-20220429162344093](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429162344093.png)

这里已经帮我们把吞吐量和GC暂停时间统计出来了，当然还有其他指标也有统计，有了工具我们就可以对比指标来确认哪种收集器适合自己的系统了。

### 7.2 GCViewer

- 1、下载gcviewer的jar包
- 2、执行命令java -jar gcviewer-1.36-SNAPSHOT.jar

![image-20220429162437651](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429162437651.png)

打开主界面：

![image-20220429162453125](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429162453125.png)

点击File–>Open File

![image-20220429162516855](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429162516855.png)

在右边的第一个Summary概要里面可以看到吞吐量的统计。
切换到第三个标签Pause：

![image-20220429162529885](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429162529885.png)

可以查看到各种停顿时间的统计。

## 8. 各GC收集器对比报告

该对比是我比较复杂的一个项目，启动初始化环节的简单对比

| 对比项目   | 新生代Parallel Scavenge+老年代Parallel Old | 新生代ParNew 老年代 CMS | G1收集器 | 总结                    |
| ---------- | ------------------------------------------ | ----------------------- | -------- | ----------------------- |
| 吞吐量     | 98.444%                                    | 98.758%                 | 98.713%  | 吞吐量都为98%，差别不大 |
| 平均GC时间 | 51.1ms                                     | 10.1ms                  | 12.4ms   | Parallel 平均时间慢不少 |
| 最长gc时间 | 360ms                                      | 110ms                   | 30ms     | G1 还是挺强的           |



### 8.1 新生代Parallel Scavenge+老年代Parallel Old

![image-20220429163708425](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429163708425.png)

### 8.2 新生代ParNew 老年代 CMS

![image-20220429164043614](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429164043614.png)

### 8.3 G1收集器（独立完成）

![image-20220429164317116](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220429164317116.png)

## 9. GC原因

- Allocation Failure：表明本次引起GC的原因是因为新生代中没有足够的区域存放需要分配的数据；
- Metadata GC Threshold：Metaspace区不够用了；
- FErgonomics：JVM自适应调整导致的GC；
- System：调用了System.gc()方法；
  

## 总结

本文主要介绍了常用的垃圾收集器的GC日志应该如何进行分析，并且介绍了两款常用的工具来帮助我们更好更直观的分析GC日志。

## 参考文章

[【JVM系列7】GC日志都不会看，还怎么进行JVM调优?](http://blog.sikacode.com/article/32)