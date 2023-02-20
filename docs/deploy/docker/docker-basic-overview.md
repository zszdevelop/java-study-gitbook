---
order: 10
category:
  - 部署
  - Docker
---

# Docker基础 - 仓库，镜像，容器详解

## 1. 仓库，镜像，容器的关系

> 我们再回顾下仓库，镜像，容器的关系（这是官网的图）

通过下图可以得知，`Docker`在运行时分为`Docker引擎（服务端守护进程）`和`客户端工具`，我们日常使用各种`docker命令`，其实就是在使用`客户端工具`与`Docker`引擎进行交互。

![image-20220613201437616](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220613201437616.png)

## 2. Docker 镜像

当运行容器时，使用的镜像如果在本地中不存在，docker 就会自动从 docker 镜像仓库中下载，默认是从 Docker Hub 公共镜像源下载。

下面我们来学 1、管理和使用本地 Docker 主机镜像 2、创建镜像

### 2.1 镜像列表

我们可以使用 docker images 来列出本地主机上的镜像

```bash
[root@iZwz914d1peizv4h7laju4Z ~]# docker images
REPOSITORY        TAG            IMAGE ID       CREATED        SIZE
minio/minio       latest         1afc478341fd   8 months ago   254MB
rabbitmq          3-management   3e83da0dc938   9 months ago   253MB
mongo             latest         0bcbeb494bed   9 months ago   684MB

```

| 属性       | 说明               |
| :--------- | :----------------- |
| REPOSITORY | 镜像在仓库中的名称 |
| TAG        | 镜像标签           |
| IMAGE ID   | 镜像 ID            |
| CREATED    | 镜像的创建日期     |
| SIZE       | 镜像大小           |

这些镜像都是存储在`Docker`宿主机的`/var/lib/docker`目录下

### 2.2 查找镜像

> 以查找MySQL的镜像为例：

- 方式一：**通过Docker Hub 进行查找**, 比如[https://hub.docker.com/search?q=mysql&type=image  (opens new window)](https://hub.docker.com/search?q=mysql&type=image)

![image-20220613202907992](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220613202907992.png)

- 方式二：**使用 docker search 命令来搜索镜像**

  ```bash
  [root@pdai ~]# docker ps
  CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
  [root@pdai ~]# docker search mysql
  NAME                              DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
  mysql                             MySQL is a widely used, open-source relation…   9132                [OK]
  mariadb                           MariaDB is a community-developed fork of MyS…   3233                [OK]
  mysql/mysql-server                Optimized MySQL Server Docker images. Create…   676                                     [OK]
  centos/mysql-57-centos7           MySQL 5.7 SQL database server                   68
  mysql/mysql-cluster               Experimental MySQL Cluster Docker images. Cr…   62
  centurylink/mysql                 Image containing mysql. Optimized to be link…   61                                      [OK]
  deitch/mysql-backup               REPLACED! Please use http://hub.docker.com/r…   41                                      [OK]
  bitnami/mysql                     Bitnami MySQL Docker Image                      35                                      [OK]
  tutum/mysql                       Base docker image to run a MySQL database se…   34
  schickling/mysql-backup-s3        Backup MySQL to S3 (supports periodic backup…   29                                      [OK]
  prom/mysqld-exporter                                                              26                                      [OK]
  linuxserver/mysql                 A Mysql container, brought to you by LinuxSe…   24
  centos/mysql-56-centos7           MySQL 5.6 SQL database server                   19
  circleci/mysql                    MySQL is a widely used, open-source relation…   18
  mysql/mysql-router                MySQL Router provides transparent routing be…   14
  arey/mysql-client                 Run a MySQL client from a docker container      13                                      [OK]
  databack/mysql-backup             Back up mysql databases to... anywhere!         10
  openshift/mysql-55-centos7        DEPRECATED: A Centos7 based MySQL v5.5 image…   6
  fradelg/mysql-cron-backup         MySQL/MariaDB database backup using cron tas…   5                                       [OK]
  genschsa/mysql-employees          MySQL Employee Sample Database                  4                                       [OK]
  devilbox/mysql                    Retagged MySQL, MariaDB and PerconaDB offici…   2
  ansibleplaybookbundle/mysql-apb   An APB which deploys RHSCL MySQL                2                                       [OK]
  jelastic/mysql                    An image of the MySQL database server mainta…   1
  monasca/mysql-init                A minimal decoupled init container for mysql    0
  widdpim/mysql-client              Dockerized MySQL Client (5.7) including Curl…   0                                       [OK]
  
  
  ```


| 属性        | 说明                |
| ----------- | :------------------ |
| NAME        | 镜像名称            |
| DESCRIPTION | 镜像描述            |
| STARS       | 用户评价            |
| OFFICIAL    | 是否为官方构建      |
| AUTOMATED   | Docker Hub 自动构建 |

### 2.3 拉取镜像

拉取镜像就是从中央仓库下载镜像到本地。

执行命令：`docker pull 镜像名称`

如果不声明`tag`镜像标签信息则默认拉取`latest`版本。

> 现在拉取搜索出的MySQL

```

[root@ ~]# docker pull mysql
Using default tag: latest
latest: Pulling from library/mysql
619014d83c02: Pull complete
9ced578c3a5f: Pull complete
731f6e13d8ea: Pull complete
3c183de42679: Pull complete
6de69b5c2f3c: Pull complete
00f0a4086406: Pull complete
84d93aea836d: Pull complete
f18efbfd8d76: Pull complete
012b302865d1: Pull complete
fe16fd240f59: Pull complete
ca3e793e545e: Pull complete
51d0f2cb2610: Pull complete
Digest: sha256:6d0741319b6a2ae22c384a97f4bbee411b01e75f6284af0cce339fee83d7e314
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest
[root@pdai ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mysql               latest              791b6e40940c        2 weeks ago         465MB
ubuntu              latest              ccc6e87d482b        4 weeks ago         64.2MB
hello-world         latest              fce289e99eb9        13 months ago       1.84kB
  
```

### 2.4 删除镜像

按镜像`ID`删除单个镜像。

执行命令：`docker rmi 镜像ID`

按镜像`ID`删除多个镜像。

执行命令：`docker rmi 镜像ID 镜像ID 镜像ID`



```bash
[root@pdai ~]# docker rmi hello-world
Error response from daemon: conflict: unable to remove repository reference "hello-world" (must force) - container c91b90b18884 is using its referenced image fce289e99eb9
```

`docker images -q`可以查询到所有镜像的`ID`，通过组合命令可以实现删除所有镜像的操作。

执行命令：`docker rmi docker images -q`

发现报错了，这时候主要看两点：

- 要么就是container实例存在
- 要么存在镜像依赖；

### 2.5 更新镜像

> 针对上述ubuntu的镜像，我们能否在里面安装一些软件，然后重新生成一个镜像呢？这就是更新重新commit出一个新的镜像。

我们先跑一个ubuntu容器实例，同时在里面进行`apt-get update`更新

```bash
[root@pdai ~]# docker run -it ubuntu:latest
root@0a1556ca3c27:/# apt-get update
Get:1 http://security.ubuntu.com/ubuntu bionic-security InRelease [88.7 kB]
Get:2 http://archive.ubuntu.com/ubuntu bionic InRelease [242 kB]
Get:3 http://archive.ubuntu.com/ubuntu bionic-updates InRelease [88.7 kB]
Get:4 http://archive.ubuntu.com/ubuntu bionic-backports InRelease [74.6 kB]
Get:5 http://security.ubuntu.com/ubuntu bionic-security/main amd64 Packages [817 kB]
Get:6 http://archive.ubuntu.com/ubuntu bionic/main amd64 Packages [1344 kB]
Get:7 http://archive.ubuntu.com/ubuntu bionic/multiverse amd64 Packages [186 kB]
Get:8 http://archive.ubuntu.com/ubuntu bionic/restricted amd64 Packages [13.5 kB]
Get:9 http://archive.ubuntu.com/ubuntu bionic/universe amd64 Packages [11.3 MB]
Get:10 http://security.ubuntu.com/ubuntu bionic-security/restricted amd64 Packages [27.5 kB]
Get:11 http://security.ubuntu.com/ubuntu bionic-security/multiverse amd64 Packages [7064 B]
Get:12 http://security.ubuntu.com/ubuntu bionic-security/universe amd64 Packages [818 kB]
Get:13 http://archive.ubuntu.com/ubuntu bionic-updates/multiverse amd64 Packages [11.1 kB]
Get:14 http://archive.ubuntu.com/ubuntu bionic-updates/universe amd64 Packages [1345 kB]
Get:15 http://archive.ubuntu.com/ubuntu bionic-updates/restricted amd64 Packages [41.2 kB]
Get:16 http://archive.ubuntu.com/ubuntu bionic-updates/main amd64 Packages [1104 kB]
Get:17 http://archive.ubuntu.com/ubuntu bionic-backports/universe amd64 Packages [4252 B]
Get:18 http://archive.ubuntu.com/ubuntu bionic-backports/main amd64 Packages [2496 B]
Fetched 17.6 MB in 10s (1759 kB/s)
Reading package lists... Done
root@0a1556ca3c27:/# exit
exit

```

此时 ID 为 0a1556ca3c27 的容器，是按我们的需求更改的容器。我们可以通过命令 docker commit 来提交容器副本：

```bash
[root@pdai ~]# docker commit -m="update test" -a="pdai" 0a1556ca3c27  pdai/ubuntu:v1.0.1
sha256:b51e9f5f98cdb5b95c34181148ed7029f0150618aa8cd0e916b10b6aea1bd4c9
```

可以看到已经生成成功, 且镜像的大小不一样了：

```bash
[root@pdai ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
pdai/ubuntu         v1.0.1              b51e9f5f98cd        5 seconds ago       92.1MB
mysql               latest              791b6e40940c        2 weeks ago         465MB
ubuntu              latest              ccc6e87d482b        4 weeks ago         64.2MB
```

### 2.6 生成镜像

> 那如果是生成一个全新的镜像呢？我们使用命令 docker build ，通过创建一个 Dockerfile 文件，其中包含一组指令来告诉 Docker 如何构建我们的镜像。

这里特意指定的Base镜像为上一步修改生成的`pdai/ubuntu:v1.0.1`

```bash
FROM    pdai/ubuntu:v1.0.1
MAINTAINER      pdai "pdai.tech"

RUN     /bin/echo 'root:123456' |chpasswd
RUN     useradd pdai
RUN     /bin/echo 'pdai:123456' |chpasswd
RUN     /bin/echo -e "LANG=\"en_US.UTF-8\"" >/etc/default/local
EXPOSE  22
EXPOSE  80
CMD     /usr/sbin/sshd -D
```

**稍微解释下**：这一部分在开发中会用到比较多，所以单独一个章节详解：

- 每一个指令都会在镜像上创建一个新的层，每一个指令的前缀都必须是大写的。
- 第一条FROM，指定使用哪个镜像源
- RUN 指令告诉docker 在镜像内执行命令，安装了什么。。。
- 我们使用 Dockerfile 文件，通过 docker build 命令来构建一个镜像。

接下来生成镜像：

```bash
[root@pdai docker-test]# docker build -t pdai/ubuntu:v2.0.1 .
Sending build context to Docker daemon  2.048kB
Step 1/9 : FROM    pdai/ubuntu:v1.0.1
 ---> b51e9f5f98cd
Step 2/9 : MAINTAINER      pdai "pdai.tech"
 ---> Running in af026ee229ea
Removing intermediate container af026ee229ea
 ---> 0e961cb557c9
Step 3/9 : RUN     /bin/echo 'root:123456' |chpasswd
 ---> Running in 96bd9c40c55e
Removing intermediate container 96bd9c40c55e
 ---> 9e8549720043
Step 4/9 : RUN     useradd pdai
 ---> Running in 0117278f243c
Removing intermediate container 0117278f243c
 ---> 87c478df56da
Step 5/9 : RUN     /bin/echo 'pdai:123456' |chpasswd
 ---> Running in e0381eabe71a
Removing intermediate container e0381eabe71a
 ---> 84fd07f978ae
Step 6/9 : RUN     /bin/echo -e "LANG=\"en_US.UTF-8\"" >/etc/default/local
 ---> Running in 8d0052d9921f
Removing intermediate container 8d0052d9921f
 ---> 3ed0b248224c
Step 7/9 : EXPOSE  22
 ---> Running in 4b5d540567cd
Removing intermediate container 4b5d540567cd
 ---> c0a72ad140dd
Step 8/9 : EXPOSE  80
 ---> Running in c9620707d038
Removing intermediate container c9620707d038
 ---> df42b714ecc1
Step 9/9 : CMD     /usr/sbin/sshd -D
 ---> Running in e178826b43fe
Removing intermediate container e178826b43fe
 ---> a733d5a264b5
Successfully built a733d5a264b5
Successfully tagged pdai/ubuntu:v2.0.1

```

参数说明：

- `-t` ：指定要创建的目标镜像名
- `.` ：Dockerfile 文件所在目录，可以指定Dockerfile 的绝对路径

使用docker images 查看创建的镜像已经在列表中存在,镜像ID为a733d5a264b5

```bash
[root@pdai docker-test]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
pdai/ubuntu         v2.0.1              a733d5a264b5        5 minutes ago       92.5MB
pdai/ubuntu         v1.0.1              b51e9f5f98cd        15 hours ago        92.1MB
mysql               latest              791b6e40940c        2 weeks ago         465MB
ubuntu              latest              ccc6e87d482b        4 weeks ago         64.2MB

```

我们可以使用新的镜像来创建容器

```bash
[root@pdai docker-test]# docker run -it pdai/ubuntu:v2.0.1 /bin/bash
root@f5332ebce695:/# id pdai
uid=1000(pdai) gid=1000(pdai) groups=1000(pdai)
root@f5332ebce695:/# exit
exit
```

从上面看到新镜像已经包含我们创建的用户 pdai。

### 2.7 镜像标签

> 设置镜像的Tag，类似于Git中tag？我们可以使用 docker tag 命令，为镜像添加一个新的标签

```bash
[root@pdai ~]# docker tag a733d5a264b5 pdai/ubuntu:v3.0.1
[root@pdai ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
pdai/ubuntu         v2.0.1              a733d5a264b5        9 minutes ago       92.5MB
pdai/ubuntu         v3.0.1              a733d5a264b5        9 minutes ago       92.5MB
pdai/ubuntu         v1.0.1              b51e9f5f98cd        15 hours ago        92.1MB
mysql               latest              791b6e40940c        2 weeks ago         465MB
ubuntu              latest              ccc6e87d482b        4 weeks ago         64.2MB
```

注意：

- docker tag 镜像ID，这里是 a733d5a264b5 ,用户名称、镜像源名(repository name)和新的标签名(tag)。
- 使用 docker images 命令可以看到，ID为a733d5a264b5的镜像多一个v3.0.1标签。

### 2.8 镜像导出和导入

> 区别于容器的导出和导入

- 镜像导出

  ```
  docker save -o elasticsearch-7.17.6.tar elasticsearch:7.17.6
  ```

  需指定版本，否则加载的镜像名为none

- 镜像导入

```bash
docker load -i  elasticsearch-7.17.6.tar
```

其中`-i`或者`<`表示从文件输入。会成功导入镜像及相关元数据，包括tag信息

> 可以依据具体使用场景来选择命令

- 若是只想备份images，使用save、load即可
- 若是在启动容器后，容器内容有变化，需要备份，则使用export、import

### 2.9 清理所有悬挂（`<none>`）镜像：

```sh
docker image prune
# or
docker rmi $(docker images -qf "dangling=true")
```

## 3. Docker 容器

> 上面已经展示了部分容器的使用命令了，这里会在此基础上进行拓展

### 3.1 创建与启动容器

```
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

首先我们是可以这样启动容器的：

```bash
[root@pdai docker-test]# docker run -it pdai/ubuntu:v2.0.1 /bin/bash
root@f5332ebce695:/# id pdai
uid=1000(pdai) gid=1000(pdai) groups=1000(pdai)
root@f5332ebce695:/# exit
exit
```

- `-it` 可以连写的，表示 `-i -t`
- `-t`: 在新容器内指定一个伪终端或终端。
- `-i`: 允许你对容器内的标准输入 (STDIN) 进行交互

#### 3.1.1 参数

-  `-it` 可以连写的，表示 `-i -t`
-  `-t`: 在新容器内指定一个伪终端或终端。
-  `-i`: 允许你对容器内的标准输入 (STDIN) 进行交互
-  --name：为创建的容器命名；
-  -v：表示目录映射关系（前者是宿主机目录，后者是映射到宿主机上的目录），可以使用多个 -v 做多个目录或文件映射。注意：最好做目录映射，在宿主机上做修改，然后共享到容器上；
-  -d：在 run 后面加上 -d 参数，则会创建一个守护式容器在后台运行（这样创建容器后不会自动登录容器，如果只加 -i -t 两个参数，创建容器后就会自动进容器里）；
-  -p：表示端口映射，前者是宿主机端口，后者是容器内的映射端口。可以使用多个 -p 做多个端口映射。
-  -P：随机使用宿主机的可用端口与容器内暴露的端口映射。
-  --restart=always ：创建容器时添加参数 --restart=always 后，当docker重启时，容器自动启动。

#### 3.1.2 创建并进入容器

下面这行命令的意思就是通过镜像 AA 创建一个容器 BB，运行容器并进入容器的`/bin/bash`。

```
docker run -it --name 容器名称 镜像名称:标签 /bin/bash
```

注意：`Docker`容器运行必须有一个前台进程，如果没有前台进程执行，容器认为是空闲状态，就会自动退出。

#### 3.1.3 退出当前容器

```
exit
```

### 3.2 容器查看

查看正在运行的容器。

执行命令：`docker ps`

| 属性         | 说明                 |
| ------------ | :------------------- |
| CONTAINER ID | 容器 ID              |
| IMAGE        | 所属镜像             |
| COMMAND      | 启动容器时运行的命令 |
| CREATED      | 创建时间             |
| STATUS       | 容器状态             |
| PORTS        | 端口                 |
| NAMES        | 容器名称             |

- 查看所有容器（包括运行和停止）。

  执行命令：`docker ps -a`

- 查看停止的容器。

  执行命令：`docker ps -f status=exited`

- 查看最后一次运行的容器。

  执行命令：`docker ps -l`

- 列出最近创建的 n 个容器。

  执行命令：`docker ps -n 5`

```bash
[root@pdai ~]# docker ps -a
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS                      PORTS               NAMES
f5332ebce695        pdai/ubuntu:v2.0.1   "/bin/bash"              20 minutes ago      Exited (0) 20 minutes ago                       jolly_kepler
0a1556ca3c27        ubuntu:latest        "/bin/bash"              16 hours ago        Exited (0) 16 hours ago                         stoic_hodgkin
1a51d2f023c9        ubuntu:latest        "/bin/sh -c 'while t…"   18 hours ago        Exited (137) 18 hours ago                       gifted_brown
414bf796cbe4        ubuntu:latest        "/bin/bash"              18 hours ago        Exited (0) 18 hours ago                         pedantic_galileo
512061ebfa4c        ubuntu:latest        "/bin/bash"              18 hours ago        Exited (0) 18 hours ago                         wizardly_brown
aa5e9ae5e5db        ubuntu:latest        "/bin/echo 'Hello wo…"   18 hours ago        Exited (0) 18 hours ago                         affectionate_knuth
```

### 3.3 容器再启动

> 我们看到，刚才`pdai/ubuntu:v2.0.1`的实例`f5332ebce695`已经停止了`Exited (0) 20 minutes ago`，我们能否再启这个实例？

```bash
[root@pdai ~]# docker start f5332ebce695
f5332ebce695
[root@pdai ~]# docker ps
CONTAINER ID        IMAGE                COMMAND             CREATED             STATUS              PORTS               NAMES
f5332ebce695        pdai/ubuntu:v2.0.1   "/bin/bash"         32 minutes ago      Up 4 seconds        22/tcp, 80/tcp      jolly_kepler
```

### 3.4 容器停止和重启

> 我们将上述容器停止，再重启

```bash
[root@pdai ~]# docker stop f5332ebce695
f5332ebce695
[root@pdai ~]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
[root@pdai ~]# docker restart f5332ebce695
f5332ebce695
[root@pdai ~]# docker ps -a
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS                      PORTS               NAMES
f5332ebce695        pdai/ubuntu:v2.0.1   "/bin/bash"              33 minutes ago      Up 2 seconds                22/tcp, 80/tcp      jolly_kepler
0a1556ca3c27        ubuntu:latest        "/bin/bash"              16 hours ago        Exited (0) 16 hours ago                         stoic_hodgkin
1a51d2f023c9        ubuntu:latest        "/bin/sh -c 'while t…"   18 hours ago        Exited (137) 18 hours ago                       gifted_brown
414bf796cbe4        ubuntu:latest        "/bin/bash"              18 hours ago        Exited (0) 18 hours ago                         pedantic_galileo
512061ebfa4c        ubuntu:latest        "/bin/bash"              18 hours ago        Exited (0) 18 hours ago                         wizardly_brown
aa5e9ae5e5db        ubuntu:latest        "/bin/echo 'Hello wo…"   19 hours ago        Exited (0) 19 hours ago                         affectionate_knuth
```

### 3.5 后台模式与进入

> 在使用 -d 参数时，容器启动后会进入后台, 如何进入容器呢？

- 第一种：`docker attach`

```bash
[root@pdai ~]# docker ps
CONTAINER ID        IMAGE                COMMAND             CREATED             STATUS              PORTS               NAMES
f5332ebce695        pdai/ubuntu:v2.0.1   "/bin/bash"         38 minutes ago      Up 2 seconds        22/tcp, 80/tcp      jolly_kepler
[root@pdai ~]# docker attach f5332ebce695
root@f5332ebce695:/# echo 'pdai'
pdai
root@f5332ebce695:/# exit
exit
[root@pdai ~]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES

```

看到没，使用`docker attach`进入后，exit便容器也停止了。

- 第二种：`docker exec`

```bash
[root@pdai ~]# docker exec -it f5332ebce695 /bin/bash
Error response from daemon: Container f5332ebce69520fba353f035ccddd4bd42055fbd1e595f916ba7233e26476464 is not running
[root@pdai ~]# docker restart f5332ebce695
f5332ebce695
[root@pdai ~]# docker exec -it f5332ebce695 /bin/bash
root@f5332ebce695:/# exit
exit
[root@pdai ~]# docker ps
CONTAINER ID        IMAGE                COMMAND             CREATED             STATUS              PORTS               NAMES
f5332ebce695        pdai/ubuntu:v2.0.1   "/bin/bash"         42 minutes ago      Up 8 seconds        22/tcp, 80/tcp      jolly_kepler

  
```

注意：

- 我特意在容器停止状态下执行了`docker exec`，是让你看到`docker exec`是在容器启动状态下用的，且注意下错误信息；
- **推荐大家使用 `docker exec` 命令，因为此退出容器终端，不会导致容器的停止。**

### 3.6 容器导出和导入

> 在生产环境中，很多时候是无法连接外网的，所以有时候需要用到容器的导入和导出。

- 容器的导出

```bash
[root@pdai ~]# docker ps
CONTAINER ID        IMAGE                COMMAND             CREATED             STATUS              PORTS               NAMES
f5332ebce695        pdai/ubuntu:v2.0.1   "/bin/bash"         42 minutes ago      Up 8 seconds        22/tcp, 80/tcp      jolly_kepler
[root@pdai ~]# docker export f5332ebce695 > ubuntu-pdai-v2.tar
[root@pdai ~]# ll
-rw-rw-r-- 1 root root 93891072 Feb 18 09:42 ubuntu-pdai-v2.tar

```

同时你可以发现，导出容器的时候，容器无需关闭。

- 容器导入

```
[root@pdai ~]# docker import ubuntu-pdai-v2.tar pdai/ubuntu:v2.0.2
sha256:57544a04cd1ad330371ca9142184ff031dc2b6df70df177994477c08fe547b25
[root@pdai ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
pdai/ubuntu         v2.0.2              57544a04cd1a        7 seconds ago       91.5MB
pdai/ubuntu         v2.0.1              a733d5a264b5        About an hour ago   92.5MB
pdai/ubuntu         v3.0.1              a733d5a264b5        About an hour ago   92.5MB
pdai/ubuntu         v1.0.1              b51e9f5f98cd        16 hours ago        92.1MB
mysql               latest              791b6e40940c        2 weeks ago         465MB
ubuntu              latest              ccc6e87d482b        4 weeks ago         64.2MB

```

注意看，SIZE可能是不一样的。

### 3.7 强制停止容器

> 能否强制删除一个正在运行的容器呢？

显然，加上`-f`之后是允许的。

```bash
[root@pdai ~]# docker ps
CONTAINER ID        IMAGE                COMMAND             CREATED             STATUS              PORTS               NAMES
f5332ebce695        pdai/ubuntu:v2.0.1   "/bin/bash"         About an hour ago   Up 24 minutes       22/tcp, 80/tcp      jolly_kepler
[root@pdai ~]# docker rm -f f5332ebce695
f5332ebce695
[root@pdai ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS               NAMES
0a1556ca3c27        ubuntu:latest       "/bin/bash"              17 hours ago        Exited (0) 17 hours ago                         stoic_hodgkin
1a51d2f023c9        ubuntu:latest       "/bin/sh -c 'while t…"   19 hours ago        Exited (137) 19 hours ago                       gifted_brown
414bf796cbe4        ubuntu:latest       "/bin/bash"              19 hours ago        Exited (0) 19 hours ago                         pedantic_galileo
512061ebfa4c        ubuntu:latest       "/bin/bash"              19 hours ago        Exited (0) 19 hours ago                         wizardly_brown
aa5e9ae5e5db        ubuntu:latest       "/bin/echo 'Hello wo…"   19 hours ago        Exited (0) 19 hours ago                         affectionate_knuth

```

### 3.8 清理停止的容器

> 我们看到上面还有好几个容器出于停止状态，能不能删除它们呢？

```bash
[root@pdai ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS               NAMES
0a1556ca3c27        ubuntu:latest       "/bin/bash"              17 hours ago        Exited (0) 17 hours ago                         stoic_hodgkin
1a51d2f023c9        ubuntu:latest       "/bin/sh -c 'while t…"   19 hours ago        Exited (137) 19 hours ago                       gifted_brown
414bf796cbe4        ubuntu:latest       "/bin/bash"              19 hours ago        Exited (0) 19 hours ago                         pedantic_galileo
512061ebfa4c        ubuntu:latest       "/bin/bash"              19 hours ago        Exited (0) 19 hours ago                         wizardly_brown
aa5e9ae5e5db        ubuntu:latest       "/bin/echo 'Hello wo…"   19 hours ago        Exited (0) 19 hours ago                         affectionate_knuth
```

清理停止的容器: `docker container prune`

```bash
[root@pdai ~]# docker container prune
WARNING! This will remove all stopped containers.
Are you sure you want to continue? [y/N] y
Deleted Containers:
0a1556ca3c275cc692ecd6d19caed4c5be42578f81b3dfea52b24208790d160a
1a51d2f023c947f2be2d9a78eb863e854ca302c89bf354654c409e23e7dd25d7
414bf796cbe403e01b5414f2b6232c6a037af78deee4581f4935c94859b5164e
512061ebfa4c340eb03833e54d77052e33fb62cd42ab7dd7e09bf0b02a761552
aa5e9ae5e5db1760bdb8c7ddb92e4293cd7b4736be7e97314f3ef44a71bf8930

Total reclaimed space: 27.93MB
[root@pdai ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES

  
```

### 3.9 容器别名及操作

> 我们上述对容器的操作都是针对容器ID，这个ID是随机的，能否添加一个name对我们自己设置的name操作呢？

```bash
[root@pdai ~]# docker run -itd --name pdai-ubuntu-202 pdai/ubuntu:v2.0.2 /bin/bash
11de9755a08402d963d263a559a7daf48f4a2188398f258641240b5eb50fbc89
[root@pdai ~]# docker ps
CONTAINER ID        IMAGE                COMMAND             CREATED             STATUS              PORTS               NAMES
11de9755a084        pdai/ubuntu:v2.0.2   "/bin/bash"         5 seconds ago       Up 4 seconds                            pdai-ubuntu-202
[root@pdai ~]# docker stop pdai-ubuntu-202
pdai-ubuntu-202
[root@pdai ~]# docker ps -a
CONTAINER ID        IMAGE                COMMAND              CREATED              STATUS                     PORTS               NAMES
11de9755a084        pdai/ubuntu:v2.0.2   "/bin/bash"          26 seconds ago       Exited (0) 4 seconds ago                       pdai-ubuntu-202   

  
```

### 3.10 容器错误日志

```bash
例：实时查看docker容器名为user-uat的最后10行日志
docker logs -f -t --tail 10 user-uat

例：查看指定时间后的日志，只显示最后100行：
docker logs -f -t --since="2018-02-08" --tail=100 user-uat

例：查看最近30分钟的日志:
docker logs --since 30m user-uat

例：查看某时间之后的日志：
docker logs -t --since="2018-02-08T13:23:37" user-uat

例：查看某时间段日志：
docker logs -t --since="2018-02-08T13:23:37" --until "2018-02-09T12:23:37" user-uat

例：将错误日志写入文件：
docker logs -f -t --since="2018-02-18" user-uat | grep error >> logs_error.txt

  
```

## 4. Docker 仓库

仓库（Repository）是集中存放镜像的地方，它和我们的Maven仓库是一样的。以下介绍一下 Docker Hub。当然不止 docker hub，只是远程的服务商不一样，操作都是一样的。

- 可以采用共有的仓库，也可以自己搭建Docker Registry;
- 如果之前有自己的Artifactory或者Nexus，它们同样可以支持Docker Registry功能;
- 带界面的也可以使用Harbor等;

## 参考文章

[**Docker基础 - 仓库，镜像，容器详解**](https://pdai.tech/md/devops/docker/docker-03-basic2.html)