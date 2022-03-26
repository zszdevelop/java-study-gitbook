# 导入SpringBoot源码

## 1. 导入源码

>我们项目中的springboot 版本为2.1.0.RELEASE，所以我们就以2.1.0.RELEASE为学习标准

1. 源码地址

   https://github.com/spring-projects/spring-boot/tree/v2.1.0.RELEASE

2. fork到自己github仓库

   fork 到自己仓库，可以方便的写一些注释帮助我们阅读理解源码

3. 建个分支来学习

   分支的基础版本为：2.1.0.RELEASE

   ![image-20220308192302601](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220308192302601.png)

## 2. 将SpringBoot源码项目导入到IDEA中

导入后的结果

![image-20220308190307742](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220308190307742.png)

## 3. 编译构建SpringBoot源码项目

### 3.1 前置配置

此时导入项目后，我们进行编译构建SpringBoot源码项目了，在构建之前做两个配置：

1. 我们要禁用maven的代码检查，在根pom.xml中增加一下配置即可，如下图：

   ```<!--设置disable.checks为true-->		<disable.checks>true</disable.checks>
   <!--设置disable.checks为true-->
   <disable.checks>true</disable.checks>
   ```

​	![image-20220308190609199](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220308190609199.png)

2. 可能有的小伙伴们的pom.xml文件的project标签上显示`java.lang.OutOfMemoryError`错误，这是因为IDEA里的Maven的importer设置的JVM最大堆内存过小而导致的，如下图,此时可参考[Maven依赖包导入错误（IntelliJ IDEA）](https://blog.csdn.net/w605283073/article/details/85107497)解决即可。

​	![image-20220308190638212](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220308190638212.png)

### 3.2 命令编译

进行了上面的两点配置后，此时我们就可以直接执行以下maven命令来编译构建源码项目了。

```js
mvn clean install -DskipTests -Pfast
```

![image-20220308190825164](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220308190825164.png)

此时又是漫长的等待构建成功了，如下图：

![image-20220308195059235](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220308195059235.png)

## 4. 运行SpringBoot自带的sample

因为SpringBoot源码中的spring-boot-samples模块自带了很多DEMO样例，我们可以利用其中的一个sample来测试运行刚刚构建的springboot源码项目即可。但此时发现spring-boot-samples模块是灰色的，如下图

![image-20220308195141434](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220308195141434.png)

这是因为spring-boot-samples模块没有被添加到根pom.xml中，此时将其添加到根pom.xml中即可，增加如下配置，如下图：

![image-20220308195320473](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220308195320473.png)

此时我们挑选spring-boot-samples模块下的spring-boot-sample-tomcat样例项目来测试好了，此时启动`SampleTomcatApplication`的`main`函数，启动成功界面如下：

![image-20220308202332052](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220308202332052.png)

然后我们再在浏览器发送一个HTTP请求，此时可以看到服务端成功返回响应，说明此时SpringBoot源码环境就已经构建成功了，接下来我们就可以进行调试了，如下图：

![image-20220308202423116](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220308202423116.png)

## 参考文章

[如何搭建自己的SpringBoot源码调试环境？--SpringBoot源码（一）](https://cloud.tencent.com/developer/article/1595465)

[搭建SpringBoot源码环境的正确姿势（避坑必备）](https://blog.csdn.net/w605283073/article/details/85106902)
