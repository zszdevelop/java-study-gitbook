# JVM垃圾回收

## 1. 垃圾回收常见面试题

- 如何判断对象是否死亡（两种方法）
- 简单的介绍一下强引用、软引用、弱引用、虚引用（虚引用与软引用和弱引用的区别、使用软引用能带来的好处）
- 如何判断一个常量是废弃常量
- 如何判断一个类是无用类
- 垃圾收集有哪些算法，各自的特点
- HotSpot 为什么要分为新生代和老年代
- 常见的垃圾回收器有哪些
- 介绍一下CMS,G1收集器
- Minor GC 和 Full GC 有什么区别

## 2. 导火索

![image-20190924233828114](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20190924233828114.png)

当需要排查各种内存溢出问题、当垃圾收集成为系统达到更高并发的瓶颈时，我们就需要对这些“自动化”的技术实施必要的监控和调节。

## 
