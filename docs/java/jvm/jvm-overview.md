---
order: 10
category:
  - Java
  - JVM
---

# JVM相关知识体系详解

![jvm-overview](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/jvm-overview.png)

## 1. 学习要点

> 不同的虚拟机实现方式上也有差别，如果没有特别指出，这里的JVM指的是sun的HotSpot；不同的JDK版本略有差别，这里主要以1.8为主，具体差异请看各个章节中详解。下图主要表示的逻辑关系，用来将所有知识点放到一张图里，帮助你理解。

![java-jvm-overview](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/java-jvm-overview.png)

> **A. Java进阶 - JVM相关 知识体系**： 首先按照上述`学习思路`，理解总体知识点在全局上与知识体系之间的对应关系。

- [JVM 相关知识体系](https://pdai.tech/md/java/jvm/java-jvm-x-overview.html)

> **B. Java进阶 - JVM相关 类加载**： 然后理解类字节码和类的加载机制。

- [JVM基础 - 类字节码详解](https://pdai.tech/md/java/jvm/java-jvm-class.html)
  - 源代码通过编译器编译为字节码，再通过类加载子系统进行加载到JVM中运行
- [JVM基础 - 字节码的增强技术](https://pdai.tech/md/java/jvm/java-jvm-class-enhancer.html)
  - 在上文中，着重介绍了字节码的结构，这为我们了解字节码增强技术的实现打下了基础。字节码增强技术就是一类对现有字节码进行修改或者动态生成全新字节码文件的技术。接下来，我们将从最直接操纵字节码的实现方式开始深入进行剖析。
- [JVM基础 - Java 类加载机制](https://pdai.tech/md/java/jvm/java-jvm-classload.html)
  - 这篇文章将带你深入理解Java 类加载机制

> **C. Java进阶 - JVM相关 内存结构**： 因为类字节码是加载到JVM内存结构中的，所以紧接着理解JVM内存结构。

- [JVM基础 - JVM内存结构](https://pdai.tech/md/java/jvm/java-jvm-struct.html)
  - 本文主要对JVM 内存结构进行讲解，注意不要和Java内存模型混淆了

> **D. Java进阶 - JVM相关 JMM**： 然后通过理解JVM与硬件之间的联系，理解Java 通过其内存模型保证数据线程安全等，这是JVM在并发上底层的支持。

- [JVM基础 - Java 内存模型引入](https://pdai.tech/md/java/jvm/java-jvm-x-introduce.html)
  - 很多人都Java内存模型和JVM内存结构，以及Java内存模型与物理内存之间的关系。本文从堆栈角度引入JMM，然后介绍JMM和物理内存之间的关系, 为后面`JMM详解`, `JVM 内存结构详解`, `Java 对象模型详解`等铺垫。
- [JVM基础 - Java 内存模型详解](https://pdai.tech/md/java/jvm/java-jvm-jmm.html)
  - 本文主要转载自 Info 上[深入理解Java内存模型](https://www.infoq.cn/article/java_memory_model/), 作者程晓明。这篇文章对JMM讲的很清楚了，大致分三部分：重排序与顺序一致性；三个同步原语（lock，volatile，final）的内存语义，重排序规则及在处理器中的实现；java 内存模型的设计，及其与处理器内存模型和顺序一致性内存模型的关系

> **E. Java进阶 - JVM相关 GC**： 再者理解下Java GC机制，如何回收内存等。

- [GC - Java 垃圾回收基础知识](https://pdai.tech/md/java/jvm/java-jvm-gc.html)
  - 垃圾收集主要是针对堆和方法区进行；程序计数器、虚拟机栈和本地方法栈这三个区域属于线程私有的，只存在于线程的生命周期内，线程结束之后也会消失，因此不需要对这三个区域进行垃圾回收。
- [GC - Java 垃圾回收器之G1详解](https://pdai.tech/md/java/jvm/java-jvm-gc-g1.html)
  - G1垃圾回收器是在Java7 update 4之后引入的一个新的垃圾回收器。同优秀的CMS垃圾回收器一样，G1也是关注最小时延的垃圾回收器，也同样适合大尺寸堆内存的垃圾收集，官方在ZGC还没有出现时也推荐使用G1来代替选择CMS。G1最大的特点是引入分区的思路，弱化了分代的概念，合理利用垃圾收集各个周期的资源，解决了其他收集器甚至CMS的众多缺陷。
- [GC - Java 垃圾回收器之ZGC详解]()
  - ZGC（The Z Garbage Collector）是JDK 11中推出的一款低延迟垃圾回收器, 是JDK 11+ 最为重要的更新之一，适用于**大内存低延迟**服务的内存管理和回收。在梳理相关知识点时，发现美团技术团队分享的文章[新一代垃圾回收器ZGC的探索与实践  (opens new window)](https://tech.meituan.com/2020/08/06/new-zgc-practice-in-meituan.html)比较完善（包含G1收集器停顿时间瓶颈，原理，优化等）, 这里分享给你，帮你构建ZGC相关的知识体系
- [GC - Java 垃圾回收器之CMS GC问题分析与解决](https://pdai.tech/md/java/jvm/java-jvm-gc-zgc.html)
  - 本文整理自[美团技术团队](https://tech.meituan.com/2020/11/12/java-9-cms-gc.html), 这篇文章将可以帮助你构建CMS GC相关问题解决的知识体系，分享给你。

> **F. Java进阶 - JVM相关 排错调优**： 最后围绕着调试和排错，分析理解JVM调优参数，动态字节码技术及动态在线调试的原理；学会使用常用的调工具和在线动态调试工具等。

![image-20220819213534570](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220819213534570.png)

- [调试排错 - JVM 调优参数](https://pdai.tech/md/java/jvm/java-jvm-param.html)
  - 本文对JVM涉及的常见的调优参数和垃圾回收参数进行阐述
- [调试排错 - Java 内存分析之堆内存和MetaSpace内存](https://pdai.tech/md/java/jvm/java-jvm-oom.html)
  - 本文以两个简单的例子(`堆内存溢出`和`MetaSpace (元数据) 内存溢出`）解释Java 内存溢出的分析过程
- [调试排错 - Java 内存分析之堆外内存](https://pdai.tech/md/java/jvm/java-jvm-oom-offheap.html)
  - Java 堆外内存分析相对来说是复杂的，美团技术团队的[Spring Boot引起的“堆外内存泄漏”排查及经验总结](https://tech.meituan.com/2019/01/03/spring-boot-native-memory-leak.html)可以为很多Native Code内存泄漏/占用提供方向性指引。
- [调试排错 - Java 线程分析之线程Dump分析](https://pdai.tech/md/java/jvm/java-jvm-thread-dump.html)
  - Thread Dump是非常有用的诊断Java应用问题的工具。
- [调试排错 - Java 问题排查之Linux命令](https://pdai.tech/md/java/jvm/java-jvm-debug-tools-linux.html)
  - Java 在线问题排查之通过linux常用命令排查。
- [调试排错 - Java 问题排查之工具单](https://pdai.tech/md/java/jvm/java-jvm-debug-tools-list.html)
  - Java 在线问题排查之通过java调试/排查工具进行问题定位。
- [调试排错 - Java 问题排查之JVM可视化工具](https://pdai.tech/md/java/jvm/java-jvm-oom-tool.html)
  - 本文主要梳理常见的JVM可视化的分析工具，主要包括JConsole, Visual VM, Vusial GC, JProfile 和 MAT等。
- [调试排错 - Java 问题排查之应用在线调试Arthas](https://pdai.tech/md/java/jvm/java-jvm-agent-arthas.html)
  - 本文主要介绍Alibaba开源的Java诊断工具，开源到现在已经1.7万个点赞了，深受开发者喜爱。具体解决在线问题，比如：
  - 这个类从哪个 jar 包加载的? 为什么会报各种类相关的 Exception?
  - 我改的代码为什么没有执行到? 难道是我没 commit? 分支搞错了?
  - 遇到问题无法在线上 debug，难道只能通过加日志再重新发布吗?
  - 线上遇到某个用户的数据处理有问题，但线上同样无法 debug，线下无法重现！
  - 是否有一个全局视角来查看系统的运行状况?
  - 有什么办法可以监控到JVM的实时运行状态?
- [调试排错 - Java 问题排查之使用IDEA本地调试和远程调试](https://pdai.tech/md/java/jvm/java-jvm-debug-idea.html)
  - Debug用来追踪代码的运行流程，通常在程序运行过程中出现异常，启用Debug模式可以分析定位异常发生的位置，以及在运行过程中参数的变化；并且在实际的排错过程中，还会用到Remote Debug。IDEA 相比 Eclipse/STS效率更高，本文主要介绍基于IDEA的Debug和Remote Debug的技巧。
- [调试排错 - Java动态调试技术原理](https://pdai.tech/md/java/jvm/java-jvm-agent-usage.html)
  - 本文转载自 美团技术团队胡健的[Java 动态调试技术原理及实践](https://tech.meituan.com/2019/11/07/java-dynamic-debugging-technology.html), 通过学习java agent方式进行动态调试了解目前很多大厂开源的一些基于此的调试工具。

## 参考文章

[**♥JVM相关知识体系详解♥**](https://pdai.tech/md/java/jvm/java-jvm-x-overview.html)