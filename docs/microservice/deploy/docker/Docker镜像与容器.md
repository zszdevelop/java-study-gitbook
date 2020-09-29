# Docker 镜像与容器

## 1. 简介

Docker Image 俗称Docker镜像，它是由一系列图层（Layer）构成的，每个图层代表Dockerfile（通过Dockerfile我们可以创建镜像）中的一行指令，镜像是只读的

## 2. 什么是Dockerfile

我们举个简单的例子

```
FROM centos
RUN yum install -y vim
```

上面Dockerfile包含两行命令（所以它对应两个图层），第一行表示从centos这个镜像中创建一个图层，然后第二行表示接着运行`yum install -y vim`来安装vim。通过这个Dockerfile我们可以构建一个镜像，通过镜像我们可以创建一个容器（Container）

## 3. 什么是Docker容器

容器是通过镜像构建的一个隔离的应用平台，它包含了运行应用程序所需要的一切。和镜像相比，他在顶部多了一个可读写的图层，如下图所示

![image-20191204232009862](/Users/zhangshengzhong/Library/Application Support/typora-user-images/image-20191204232009862.png)

镜像和容器的关系就像是Java的类和对象的关系那样，竟然是构建容器的模板，容器是镜像构建出来的实例