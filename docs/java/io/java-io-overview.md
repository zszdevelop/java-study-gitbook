---
order: 10
category:
  - Java
  - IO
---

# Java IO知识体系详解

## 1. 知识体系

![java-io-overview](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/java-io-overview.jpeg)

## 2. 相关文章

> **A. Java进阶 - IO框架之知识体系**：首先了解下Java IO框架包含什么，同时推荐下如何学习IO框架。

- [Java IO/NIO/AIO - Overview](https://pdai.tech/md/java/io/java-io-overview.html)
  - 本文主要梳理Java IO/NIO/AIO的知识体系

> **B. Java进阶 - IO框架之基础IO**：其次对Java基础IO框架进行梳理，包括其分类，使用和源码详解。

- [Java IO - 分类(传输，操作)](https://pdai.tech/md/java/io/java-io-basic-category.html)
  - 本文主要从`传输方式`和`数据操作`两个方面分析Java IO的分类
- [Java IO - 设计模式(装饰者模式)](https://pdai.tech/md/java/io/java-io-basic-design-pattern.html)
  - Java I/O 使用了装饰者模式来实现
- [Java IO - 源码: InputStream](https://pdai.tech/md/java/io/java-io-basic-code-inputstream.html)
  - 本文主要从JDK源码角度分析InputStream
- [Java IO - 源码: OutputStream](https://pdai.tech/md/java/io/java-io-basic-code-outputstream.html)
  - 本文主要从JDK源码角度分析 OutputStream
- [Java IO - 常见类使用](https://pdai.tech/md/java/io/java-io-basic-usage.html)
  - 本文主要介绍Java IO常见类的使用，包括：磁盘操作，字节操作，字符操作，对象操作和网络操作

> **C. Java进阶 - IO框架之NIO/AIO等**：然后再对Unix IO模型学习，引入到Java BIO/NIO/AIO相关知识详解。

- [IO 模型 - Unix IO 模型](https://pdai.tech/md/java/io/java-io-model.html)
  - 本文主要简要介绍 Unix I/O 5种模型，并对5大模型比较，并重点为后续章节解释IO多路复用做铺垫
- [Java IO - BIO 详解](https://pdai.tech/md/java/io/java-io-bio.html)
  - BIO就是: blocking IO。最容易理解、最容易实现的IO工作方式，应用程序向操作系统请求网络IO操作，这时应用程序会一直等待；另一方面，操作系统收到请求后，也会等待，直到网络上有数据传到监听端口；操作系统在收集数据后，会把数据发送给应用程序；最后应用程序受到数据，并解除等待状态
- [Java NIO - 基础详解](https://pdai.tech/md/java/io/java-io-nio.html)
  - 新的输入/输出 (NIO) 库是在 JDK 1.4 中引入的，弥补了原来的 I/O 的不足，提供了高速的、面向块的 I/O
- [Java NIO - IO多路复用详解](https://pdai.tech/md/java/io/java-io-nio-select-epoll.html)
  - 本文主要对IO多路复用，Ractor模型以及Java NIO对其的支持
- [Java AIO - 异步IO详解](https://pdai.tech/md/java/io/java-io-aio.html)
  - 本文主要对异步IO和Java中对AIO的支持详解。

> **D. Java进阶 - IO框架之开源框架**：最后再对常用的开源框架进行分析和详解。

- [Java NIO - 零拷贝实现](https://pdai.tech/md/java/io/java-io-nio-zerocopy.html)

  这里转一篇Java NIO 零拷贝的实现文章，在此之前建议先理解什么是Linux中零拷贝，可以先看这篇文章。本文从源码着手分析了 Java NIO 对零拷贝的实现，主要包括基于内存映射（mmap）方式的 MappedByteBuffer 以及基于 sendfile 方式的 FileChannel。最后在篇末简单的阐述了一下 Netty 中的零拷贝机制，以及 RocketMQ 和 Kafka 两种消息队列在零拷贝实现方式上的区别。

- [Java N(A)IO - 框架: Netty](https://pdai.tech/md/java/io/java-io-nio-netty.html)

  Netty是一个高性能、异步事件驱动的NIO框架，提供了对TCP、UDP和文件传输的支持。作为当前最流行的NIO框架，Netty在互联网领域、大数据分布式计算领域、游戏行业、通信行业等获得了广泛的应用，一些业界著名的开源组件也基于Netty构建，比如RPC框架、zookeeper等

## 参考文章

[Java IO知识体系详解](https://pdai.tech/md/java/io/java-io-overview.html)