---
order: 270
category: 
  - Java
  - JVM
---

# 调试排错 - Java 问题排查之JVM可视化工具

>这些工具只是你排查问题的产生数据，帮助你更好的分析问题的工具，而真正分析还是需要你自己的经验总结。如OOM 和死锁,什么情况会导致OOM/死锁，OOM/死锁的原理是什么?

> 本文主要梳理常见的JVM可视化的分析工具，主要包括JConsole, Visual VM, Vusial GC, JProfile 和 MAT等。

## 1. JConsole

> Jconsole （Java Monitoring and Management Console），JDK自带的基于JMX的可视化监视、管理工具。 官方文档可以参考[这里](https://docs.oracle.com/javase/8/docs/technotes/guides/management/jconsole.html)

- **找到jconsole工具**

```bash
pdai@MacBook-Pro bin % ls
jaotc		jcmd		jinfo		jshell		rmid
jar		jconsole(这里)	jjs		jstack		rmiregistry
jarsigner	jdb		jlink		jstat		serialver
java		jdeprscan	jmap		jstatd		unpack200
javac		jdeps		jmod		keytool
javadoc		jhsdb		jps		pack200
javap		jimage		jrunscript	rmic
```

- **打开jconsole**

选择

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826211042545.png" alt="image-20220826211042545"  />

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826211105054.png" alt="image-20220826211105054"  />

- **查看概述、内存、线程、类、VM概要、MBean**

概述

![image-20220826211138575](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826211138575.png)

内存

![image-20220826211158645](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826211158645.png)

线程

![image-20220826211221102](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826211221102.png)

类

![image-20220826211238946](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826211238946.png)

VM概要

![image-20220826211302951](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826211302951.png)

## 2. Visual VM

> VisualVM 是一款免费的，集成了多个 JDK 命令行工具的可视化工具，它能为您提供强大的分析能力，对 Java 应用程序做性能分析和调优。这些功能包括生成和分析海量数据、跟踪内存泄漏、监控垃圾回收器、执行内存和 CPU 分析，同时它还支持在 MBeans 上进行浏览和操作。

Overview

![image-20220826211421295](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826211421295.png)

Monitor

![image-20220826211450960](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826211450960.png)

线程

![image-20220826211511264](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826211511264.png)

Sampler

![image-20220826211556683](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826211556683.png)

## 3. Visual GC

> visual gc 是 visualvm 中的图形化查看 gc 状况的插件。官方文档可以参考[这里 ](https://www.oracle.com/java/technologies/visual-garbage-collection-monitoring-tool.html)

比如我在IDEA中使用visual GC 插件来看GC状况。

![image-20220826211647985](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826211647985.png)

## 4. JProfiler

> Profiler 是一个商业的主要用于检查和跟踪系统（限于Java开发的）的性能的工具。JProfiler可以通过时时的监控系统的内存使用情况，随时监视垃圾回收，线程运行状况等手段，从而很好的监视JVM运行情况及其性能。

JProfiler 是一个全功能的Java剖析工具（profiler），专用于分析J2SE和J2EE应用程序。它把CPU、执行绪和内存的剖析组合在一个强大的应用中。 JProfiler可提供许多IDE整合和应用服务器整合用途。JProfiler直觉式的GUI让你可以找到效能瓶颈、抓出内存漏失(memory leaks)、并解决执行绪的问题。它让你得以对heap walker作资源回收器的root analysis，可以轻易找出内存漏失；heap快照（snapshot）模式让未被参照（reference）的对象、稍微被参照的对象、或在终结（finalization）队列的对象都会被移除；整合精灵以便剖析浏览器的Java外挂功能。

### 4.1 核心组件

JProfiler 包含用于采集目标 JVM 分析数据的 JProfiler agent、用于可视化分析数据的 JProfiler UI、提供各种功能的命令行工具，它们之间的关系如下图所示。

![image-20220826212237379](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826212237379.png)

- **JProfiler agent**

JProfiler agent 是一个本地库，它可以在 JVM 启动时通过参数`-agentpath:<path to native library>`进行加载或者在程序运行时通过[JVM Attach 机制  (opens new window)](http://lovestblog.cn/blog/2014/06/18/jvm-attach/)进行加载。Agent 被成功加载后，会设置 JVMTI 环境，监听虚拟机产生的事件，如类加载、线程创建等。例如，当它监听到类加载事件后，会给这些类注入用于执行度量操作的字节码。

- **JProfiler UI**

JProfiler UI 是一个可独立部署的组件，它通过 socket 和 agent 建立连接。这意味着不论目标 JVM 运行在本地还是远端，JProfiler UI 和 agent 间的通信机制都是一样的。

JProfiler UI 的主要功能是展示通过 agent 采集上来的分析数据，此外还可以通过它控制 agent 的采集行为，将快照保存至磁盘，展示保存的快照。

- **命令行工具**

JProfiler 提供了一系列命令行工具以实现不同的功能。

1. jpcontroller - 用于控制 agent 的采集行为。它通过 agent 注册的 JProfiler MBean 向 agent 传递命令。
2. jpenable - 用于将 agent 加载到一个正在运行的 JVM 上。
3. jpdump - 用于获取正在运行的 JVM 的堆快照。
4. jpexport & jpcompare - 用于从保存的快照中提取数据并创建 HTML 报告。

### 4.2 运行测试

**我们运行一个SpringBoot测试工程，选择attach到JVM**

![image-20220826212442277](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826212442277.png)

选择指定的进程

![image-20220826212509327](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826212509327.png)

**设置数据采集模式**

JProfier 提供两种数据采集模式 Sampling 和 Instrumentation。

- Sampling - 适合于不要求数据完全精确的场景。优点是对系统性能的影响较小，缺点是某些特性不支持（如方法级别的统计信息）。
- Instrumentation - 完整功能模式，统计信息也是精确的。缺点是如果需要分析的类比较多，对应用性能影响较大。为了降低影响，往往需要和 Filter 一起使用。

由于我们需要获取方法级别的统计信息，这里选择了 Instrumentation 模式。

![image-20220826212729645](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826212729645.png)

概览

![image-20220826212745879](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826212745879.png)

内存

![image-20220826212806029](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826212806029.png)

实时内存分布（类对象）

![image-20220826212834350](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826212834350.png)

dump 堆内存

![image-20220826212851940](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826212851940.png)

dump完会直接打开显示

![image-20220826212912268](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826212912268.png)

线程存储

![image-20220826212929892](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826212929892.png)

导出HTML报告

![image-20220826212945966](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826212945966.png)

CPU 调用树

![image-20220826213003289](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826213003289.png)

线程历史

![image-20220826213020235](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826213020235.png)

JEE & 探针

![image-20220826213038472](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826213038472.png)

MBeans

![image-20220826213101053](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826213101053.png)

## 5. Eclipse Memory Analyzer (MAT)

> MAT 是一种快速且功能丰富的 Java 堆分析器，可帮助你发现内存泄漏并减少内存消耗。 MAT在的堆内存分析问题使用极为广泛，需要重点掌握。

可以在[这里](https://www.eclipse.org/mat/)下载， 官方文档可以看[这里 ](http://help.eclipse.org/latest/index.jsp?topic=/org.eclipse.mat.ui.help/welcome.html)

- **Overview**

包含内存分布，以及潜在的问题推测

![image-20220826213253381](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826213253381.png)

- **Histogram**

可以列出内存中的对象，对象的个数以及大小。

![image-20220826213315424](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826213315424.png)

具体需要重点理解如下两个概念，可参考[官网文档 ](http://help.eclipse.org/latest/index.jsp?topic=/org.eclipse.mat.ui.help/welcome.html)的解释

1. Shallow Heap ：一个对象内存的消耗大小，不包含对其他对象的引用
2. Retained Heap ：是shallow Heap的总和，也就是该对象被GC之后所能回收到内存的总和

- **Dominator Tree**

可以列出那个线程，以及线程下面的那些对象占用的空间。

![image-20220826213354422](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826213354422.png)

- **Top consumers**

通过图形列出最大的object。

![image-20220826213415340](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826213415340.png)

- **Leak Suspects**

自动分析潜在可能的泄漏。

![image-20220826213433274](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220826213433274.png)

## 参考文章

[**调试排错 - Java 问题排查之JVM可视化工具**](https://pdai.tech/md/java/jvm/java-jvm-oom-tool.html)