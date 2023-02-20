---
order: 40
category:
  - 部署
  - Docker
---

# Docker基础 - Dockerfile详解

## 1. 简介

Dokcerfile 是一个用来构建镜像的文本文件，文本内容包含了一条条构建镜像所需的指令和说明

## 2. 命令组成

| 部分               | 命令                                                     |
| ------------------ | -------------------------------------------------------- |
| 基础镜像信息       | FROM                                                     |
| 维护者信息         | MAINTAINER、LABEL                                        |
| 镜像操作指令       | RUN、COPY、ADD、EXPOSE、WORKDIR、ONBUILD、USER、VOLUME等 |
| 容器启动时执行指令 | CMD、ENTRYPOINT                                          |

## 3.基础镜像信息 命令

### 3.1 FROM

指定哪种镜像作为新镜像的基础镜像，如：

```bash
FROM ubuntu:14.04
```

## 4.维护者信息

### 4.1 MAINTAINER

指明该镜像的作者和其电子邮件，如：

```bash
MAINTAINER zsz "xxxxxxx@qq.com"
```

### 4.2 LABEL

功能是为镜像指定标签。也可以使用`LABEL`来指定镜像作者

## 5. 镜像操作指令

### 5.1 RUN(重点)

在新镜像内部执行的命令，比如安装一些软件、配置一些基础环境，可使用\来换行，如：

```bash
RUN echo 'hello docker!' \
    > /usr/local/file.txt
```

也可以使用exec格式`RUN ["executable", "param1", "param2"]`的命令，如：

```bash
RUN ["apt-get","install","-y","nginx"]
```

要注意的是，**`executable`是命令，后面的param是参数**

#### 5.1.1 减少不必要层级

**注意**：Dockerfile 的指令每执行一次都会在 docker 上新建一层。所以过多无意义的层，会造成镜像膨胀过大。例如：

```bash
FROM centos
RUN yum -y install wget
RUN wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz"
RUN tar -xvf redis.tar.gz
```

以上执行会创建 3 层镜像。可简化为以下格式：

```bash
FROM centos
RUN yum -y install wget \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && tar -xvf redis.tar.gz
```

如上，以 **&&** 符号连接命令，这样执行后，只会创建 1 层镜像。

### 5.2 COPY

将主机的文件复制到镜像内，如果目的位置不存在，Docker会自动创建所有需要的目录结构，但是它只是单纯的复制，并不会去做文件提取和解压工作。如：

```bash
COPY application.yml /etc/springboot/hello-service/src/resources
```

**注意：需要复制的目录一定要放在Dockerfile文件的同级目录下**

原因：

> 因为构建环境将会上传到Docker守护进程，而复制是在Docker守护进程中进行的。任何位于构建环境之外的东西都是不可用的。COPY指令的目的的位置则必须是容器内部的一个绝对路径。
>  ---《THE DOCKER BOOK》

### 5.3 ADD

```
	ADD <src>... <dest>
```

将主机的文件复制到镜像中，跟COPY一样，限制条件和使用方式都一样，如：

```bash
ADD application.yml /etc/springboot/hello-service/src/resources
```

但是ADD会对压缩文件（tar, gzip, bzip2, etc）做提取和解压操作。

src 可以是一个本地文件，还可以是一个`url`。然后自动下载和解压

### 5.4 EXPOSE

暴露镜像的端口供主机做映射，启动镜像时，使用-P参数来讲镜像端口与宿主机的随机端口做映射。使用方式（可指定多个）：

```bash
EXPOSE 8080 
EXPOSE 8081
...
```

### 5.5 WORKDIR

在构建镜像时，指定镜像的工作目录，之后的命令都是基于此工作目录，如果不存在，则会创建目录。如

```bash
WORKDIR /usr/local
WORKDIR webservice
RUN echo 'hello docker' > text.txt
...
```

最终会在`/usr/local/webservice/`目录下生成text.txt文件

### 5.6 ENV

```
ENV <key>=<value> ...
```

设置容器内环境变量

### 5.7 VOLUME

用来向基于镜像创建的容器添加卷。比如你可以将mongodb镜像中存储数据的data文件指定为主机的某个文件。(容器内部建议不要存储任何数据)
 如：

```bash
VOLUME /data/db /data/configdb
```

注意:`VOLUME 主机目录 容器目录`

### 5.8 ONBUILD

当一个包含ONBUILD命令的镜像被用作其他镜像的基础镜像时(比如用户的镜像需要从某为准备好的位置添加源代码，或者用户需要执行特定于构建镜像的环境的构建脚本)，该命令就会执行。
 如创建镜像image-A

```bash
FROM ubuntu
...
ONBUILD ADD . /var/www
...
```

然后创建镜像image-B，指定image-A为基础镜像，如

```bash
FROM image-A
...
```

然后在构建image-B的时候，日志上显示如下:

```log
Step 0 : FROM image-A
# Execting 1 build triggers
Step onbuild-0 : ADD . /var/www
...
```

### 5.9 USER

指定该镜像以什么样的用户去执行，如：

```bash
USER mongo
```



## 6. 容器启动时执行指令

### 6.1 CMD

容器启动时需要执行的命令，如：

```bash
CMD /bin/bash
```

同样可以使用exec语法，如

```bash
CMD ["/bin/bash"]
```

当有多个CMD的时候，只有最后一个生效。

### 6.2 ENTRYPOINT

作用和用法和CMD一模一样

### 6.3 CMD和ENTRYPOINT的区别

敲黑板！！！非常重要
**一定要注意！**

**一定要注意！**

**一定要注意！**

CMD和ENTRYPOINT同样作为容器启动时执行的命令，区别有以下几点：

#### 6.3.1 CMD的命令会被 docker run 的命令覆盖而ENTRYPOINT不会

如使用`CMD ["/bin/bash"]`或`ENTRYPOINT ["/bin/bash"]`后，再使用`docker run -ti image`启动容器，它会自动进入容器内部的交互终端，如同使用
 `docker run -ti image /bin/bash`。

但是如果启动镜像的命令为`docker run -ti image /bin/ps`，使用CMD后面的命令就会被覆盖转而执行`bin/ps`命令，而*ENTRYPOINT的则不会，而是会把docker run 后面的命令当做ENTRYPOINT执行命令的参数*。
 以下例子比较容易理解
 Dockerfile中为

```bash
ENTRYPOINT ["/user/sbin/nginx"]
```

然后通过启动build之后的容器

```bash
docker run -ti image -g "daemon off"
```

此时`-g "daemon off"`会被当成参数传递给ENTRYPOINT，最终的命令变成了

```bash
/user/sbin/nginx -g "daemon off"
```

#### 6.3.2 CMD和ENTRYPOINT都存在时

CMD和ENTRYPOINT都存在时，CMD的指令变成了ENTRYPOINT的参数，并且此CMD提供的参数会被 docker run 后面的命令覆盖，如：

```bash
...
ENTRYPOINT ["echo","hello","i am"]
CMD ["docker"]
```

之后启动构建之后的容器

- 使用`docker run -ti image`

  输出“hello i am docker”

- 使用`docker run -ti image world`

  输出“hello i am world”

指令比较多，可以通过分类(如开头的表格)的办法去记忆

## 7. 构建镜像

`Dockerfile`文件编写好以后，真正构建镜像时需要通过`docker build`命令。

`docker build`命令用于使用`Dockerfile`创建镜像。

```sh
# 使用当前目录的 Dockerfile 创建镜像
docker build -t mycentos:7 .

# 通过 -f Dockerfile 文件的位置创建镜像
docker build -f /home/ruoyi/docker/Dockerfile -t mycentos:7 .
```

- -f：指定要使用的 Dockerfile 路径；
- --tag, -t：镜像的名字及标签，可以在一次构建中为一个镜像设置多个标签。

## 8. 示例

接下来我们通过基础镜像`centos:7`，在该镜像中安装`jdk`和`tomcat`以后将其制作为一个新的镜像`mycentos:7`

创建目录，编写`Dockerfile`文件

```sh
mkdir -p /usr/local/`dockerfile`
```

执行命令：`vi Dockerfile`，写入信息。

```sh
# 指明构建的新镜像是来自于`centos:7`基础镜像
FROM centos:7
# 通过镜像标签声明了作者信息
LABEL maintainer="ruoyi.vip"

# 设置工作目录
WORKDIR /usr/local
# 新镜像构建成功以后创建指定目录
RUN mkdir -p /usr/local/java && mkdir -p /usr/local/tomcat
# 拷贝文件到镜像中并解压
ADD jdk-8u111-linux-x64.tar.gz /usr/local/java
ADD apache-tomcat-8.5.27.tar.gz /usr/local/tomcat
# 暴露容器运行时的 8080 监听端口给外部
EXPOSE 8080
# 设置容器内 JAVA_HOME 环境变量
ENV JAVA_HOME /usr/local/java/jdk1.8.0_111
ENV PATH $PATH:$JAVA_HOME/bin
# 启动容器时启动 tomcat
CMD ["/usr/local/tomcat/apache-tomcat-8.5.27/bin/catalina.sh", "run"]
```

构建镜像

```sh
docker build -f /home/ruoyi/docker/Dockerfile -t mycentos:test .
```

启动镜像

```sh
docker run -di --name mycentos -p 8080:8080 mycentos:test
```

进入容器

```sh
docker exec -it mycentos7 /bin/bash
```

## 9. 镜像构建历史

```
docker history 镜像名称:标签|ID
docker history mycentos:7
```

## 参考文章

[学习Docker之Dockerfile的命令](https://www.jianshu.com/p/10ed530766af)

[使用Dockerfile构建Docker镜像](https://www.jianshu.com/p/cbce69c7a52f)

[若依文档-Dockerfile](http://doc.ruoyi.vip/ruoyi-cloud/cloud/dokcer.html#%E6%9E%84%E5%BB%BA%E9%95%9C%E5%83%8F)