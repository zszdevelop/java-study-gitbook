# Hutool的IO包之IoUtil 源码阅读

## 1. 背景

在项目中需要频繁使用IO库，java 的io 包还是比较繁琐的，往往一个读写操作就需要一大串的try_catch操作，用过Apache的Commons-IO ，用起来也不错，但hutool的代码会更符合国人一些，注释也更加完善。

以下文章内容主要是官网内容和查看hutool 源码的一些学习总结

## 2. 概述

>IO的操作包括**读**和**写**，应用场景包括网络操作和文件操作。IO操作在Java中是一个较为复杂的过程，我们在面对不同的场景时，要选择不同的`InputStream`和`OutputStream`实现来完成这些操作。而如果想读写字节流，还需要`Reader`和`Writer`的各种实现类。这些繁杂的实现类，一方面给我我们提供了更多的灵活性，另一方面也增加了复杂性。

io包的封装主要针对流、文件的读写封装，主要以工具类为主，提供常用功能的封装，这包括：

- `IoUtil` 流操作工具类
- `FileUtil` 文件读写和操作的工具类。
- `FileTypeUtil` 文件类型判断工具类
- `WatchMonitor` 目录、文件监听，封装了JDK1.7中的WatchService
- `ClassPathResource`针对ClassPath中资源的访问封装
- `FileReader` 封装文件读取
- `FileWriter` 封装文件写入

## 3. IO工具类-IoUtil

>IO工具类的存在主要针对InputStream、OutputStream、Reader、Writer封装简化，并对NIO相关操作做封装简化。总体来说，Hutool对IO的封装，主要是工具层面，我们努力做到在便捷、性能和灵活之间找到最好的平衡点。

### 3.1 拷贝

流的读写可以总结为从输入流读取，从输出流写出，这个过程我们定义为**拷贝**。这个是一个基本过程，也是文件、流操作的基础。

以文件流拷贝为例：

```java
BufferedInputStream in = FileUtil.getInputStream("d:/test.txt");
BufferedOutputStream out = FileUtil.getOutputStream("d:/test2.txt");
long copySize = IoUtil.copy(in, out, IoUtil.DEFAULT_BUFFER_SIZE);Copy to clipboardErrorCopied
```

copy方法同样针对Reader、Writer、Channel等对象有一些重载方法，并提供可选的缓存大小。默认的，缓存大小为`1024`个字节，如果拷贝大文件或流数据较大，可以适当调整这个参数。

针对NIO，提供了`copyByNIO`方法

#### 3.1.1 源码操作

![image-20211016202407321](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211016202407321.png)

可以看出底层还是还是一个标准的io读取操作

### 3.2 读取流中的内容

读取流中的内容总结下来，可以分为read方法和readXXX方法。

1. `read`方法有诸多的重载方法，根据参数不同，可以读取不同对象中的内容，这包括：

- `InputStream`
- `Reader`
- `FileChannel`

这三个重载大部分返回String字符串，为字符流读取提供极大便利。

1. `readXXX`方法主要针对返回值做一些处理，例如：

- `readBytes` 返回byte数组（读取图片等）
- `readHex` 读取16进制字符串
- `readObj` 读取序列化对象（反序列化）
- `readLines` 按行读取

1. `toStream`方法则是将某些对象转换为流对象，便于在某些情况下操作：

- `String` 转换为`ByteArrayInputStream`
- `File` 转换为`FileInputStream`

#### 3.2.1 源码

![image-20211016203320813](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211016203320813.png)

![image-20211016203429377](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211016203429377.png)

- 封装 try-catch
- 直接关闭io流
- FastByteArrayOutputStream 
  - 基于快速缓冲FastByteBuffer的OutputStream，随着数据的增长自动扩充缓冲区
  - 这种设计避免重新分配内存块而是分配新增的缓冲区，缓冲区不会被GC，数据也不会被拷贝到其他缓冲区。

### 3.3 写入到流

- `IoUtil.write`方法有两个重载方法，一个直接调用`OutputStream.write`方法，另一个用于将对象转换为字符串（调用toString方法），然后写入到流中。
- `IoUtil.writeObjects` 用于将可序列化对象序列化后写入到流中。

`write`方法并没有提供writeXXX，需要自己转换为String或byte[]。

#### 3.3.1 源码

![image-20211016203711351](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211016203711351.png)

![image-20211016203749635](/Users/zsz/Library/Application Support/typora-user-images/image-20211016203749635.png)

- 主要就是帮我们做了try-catch 操作,实际上还是java的write

### 3.4 关闭

对于IO操作来说，使用频率最高（也是最容易被遗忘）的就是`close`操作，好在Java规范使用了优雅的`Closeable`接口，这样我们只需简单封装调用此接口的方法即可。

关闭操作会面临两个问题：

1. 被关闭对象为空
2. 对象关闭失败（或对象已关闭）

在JDK1.7中，提供了`AutoCloseable`接口，在`IoUtil`中同样提供相应的重载方法，在使用中并不能感觉到有哪些不同。

#### 3.4.1 源码

![image-20211016204613353](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211016204613353.png)

![image-20211016204645360](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211016204645360.png)

正如文档所说，做的事情

1. 被关闭对象为空
2. 对象关闭失败（或对象已关闭）