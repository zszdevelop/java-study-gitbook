# Java堆设置多大合适

## 1. 简介

针对堆空间的优化是Java性能调优的重点之一。如果没有设置JVM堆空间大小，JVM会根据服务器物理内存大小设置默认堆大小的值。例如，在64位的服务器端，

- 当物理内存小于192MB时，JVM堆大小默认选为物理内存的一半；
- **当物理内存大192MB且小于128GB时，JVM堆大小默认选为物理内存的四分之一**；
- 当物理内存大于等于128GB时，都为32GB。

通常情况下，Java应用程序的会通过参数指定堆大小，具体方法下文会有说明。

## 2. 推荐配置原则：

1. 应用程序运行时，计算**老年代存活对象的占用空间大小X**。
   1. 程序整个堆大小（Xmx和Xms）设置为X的3~4倍；
   2. 永久代PermSize和MaxPermSize设置为X的1.2~1.5倍。
   3. 年轻代Xmn的设置为X的1~1.5倍。老年代内存大小设置为X的2~3倍。
2. JDK官方建议年轻代占整个堆大小空间的3/8左右。
3. 完成一次Full GC后，应该释放出70%的堆空间（30%的空间仍然占用）。
4. 设置JVM 初始堆内存-Xms和最大堆内-Xmx相同，**以避免每次垃圾回收完成后JVM重新分配内存。**

## 3. 暴力设置

若依和IBM等堆大小都设置为512M, 如有额外需求，才根据上面原则进行调整

>对于大多数环境而言，最大 Java 堆大小为 512 兆字节（如上图所示）已足够。
>
>---[IBM 文档](https://www.ibm.com/docs/zh/itcam-app-mgr/7.2.1?topic=spa-setting-maximum-java-heap-size-1)

## 参考文章

[华为鲲鹏-设置JVM堆空间大小](https://support.huaweicloud.com/tuningtip-kunpenggrf/kunpengtuning_12_0063.html)

[IBM 文档](https://www.ibm.com/docs/zh/itcam-app-mgr/7.2.1?topic=spa-setting-maximum-java-heap-size-1)

[java堆设置成多少合适_jvm~xmx设置多少合适](https://blog.csdn.net/weixin_28782251/article/details/114547003)