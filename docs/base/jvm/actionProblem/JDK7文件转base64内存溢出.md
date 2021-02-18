# JDK1.7文件转base64内存溢出（OutOfMemoryError:PermGen space）

## 1. 背景

我们有个业务需求是需要将文件转成Base64 返回给前端使用（某些原因限制不能下载流文件）。我们在JDK1.8下能正常运行，而在JDK1.7时，转换的时候报错：

```
Caused by: java.lang.OutOfMemoryError: PermGen space
```

![image-20201215152554194](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20201215152554194.png)

## 2. 错误原因

通过观察上面的错误描述，我们可以知道错误原因：

> java.lang.OutOfMemoryError: PermGen space

此错误，为**内存溢出错误**。更具体的说，是指**方法区（永久代）内存溢出**！

## 3. 解决方法

### 3.1 方法一：修改虚拟机内存

由于 JDK 自带的虚拟机为 HotSpot，且其支持内存区域的动态扩展，因此可以通过设置虚拟机参数来扩展方法区的内存大小。

。例如，进入`Run/Debug Configuration`页面，修改虚拟机参数为：

```
-Xms1024M -Xmx2048M -XX:PermSize=128M -XX:MaxPermSize=256M
```

具体如何配置，如下图所示：

![image-20201215153207907](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20201215153207907.png)

其中，各个参数的含义为：

- `-Xms`，表示程序启动时，JVM 堆的初始化最小尺寸参数；
- `-Xmx`，表示程序启动时，JVM 堆的初始化最大尺寸参数；
- `-XX:PermSize`，表示程序启动时，JVM 方法区的初始化最小尺寸参数；
- `-XX:MaxPermSize`，表示程序启动时，JVM 方法区的初始化最大尺寸参数。

对于本例中的错误，实际上，只需要扩展方法区的虚拟机参数即可。

### 3.2 升级到JDK1.8

 JDK8 之后不会再报这个错误了，因为**永久代被替换为元空间**了。

## 参考文章

[出现 java.lang.OutOfMemoryError: PermGen space 错误的原因及解决方法](https://blog.csdn.net/qq_35246620/article/details/69568205)