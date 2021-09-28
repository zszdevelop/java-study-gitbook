# MinIO安装

## 1. 简介

> MinIO 是一个基于Apache License v2.0开源协议的对象存储服务。它兼容亚马逊S3云存储服务接口，非 常适合于存储大容量非结构化的数据，例如图片、视频、日志文件、备份数据和容器/虚拟机镜像等，而 一个对象文件可以是任意大小，从几kb到最大5T不等。 MinIO是一个非常轻量的服务,可以很简单的和其他应用的结合，类似 NodeJS, Redis 或者 MySQL。

一个对象存储服务，适合存储非结构化数据。如图片、视频、日志文件等

### 1.1 优点

-  部署简单: 一个single二进制文件即是一切，还可支持各种平台。
- minio支持海量存储，可按zone扩展(原zone不受任何影响)，支持单个对象最大5TB; 
- 兼容Amazon S3接口，充分考虑开发人员的需求和体验;
- 低冗余且磁盘损坏高容忍，标准且最高的数据冗余系数为2(即存储一个1M的数据对象，实际占用 磁盘空间为2M)。但在任意n/2块disk损坏的情况下依然可以读出数据(n为一个纠删码集合(Erasure Coding Set)中的disk数量)。并且这种损坏恢复是基于单个对象的，而不是基于整个存储卷的。
-  读写性能优异

## 2. 安装

### 2.1 Centos7 单机部署

```sh
wget -q http://dl.minio.org.cn/server/minio/release/linux-amd64/minio
chmod +x minio
#启动minio server服务，指定数据存储目录/mnt/data
./minio server /mnt/data
```

![image-20210925212033260](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210925212033260.png)

默认用户名密码minioadmin:minioadmin，修改默认用户名密码可以使用：

```sh
export MINIO_ROOT_USER=admin
export MINIO_ROOT_PASSWORD=12345678
```

默认的配置目录是${HOME}/.minio，可以通过--config-dir命令自定义配置目录：

```sh
./minio server --config-dir /mnt/config /mnt/data
```

控制台监听端口是动态生成的，可以通过--console-address ":port"指定静态端口

```sh
./minio server --console-address ":9001" /mnt/data
```

![image-20210925212415270](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210925212415270.png)

### 2.2 docker安装

注：跟中文官网有巨大不同。中文官网没有指定console端口

```sh
docker run -p 9000:9000 -p 9001:50000 --name minio \
-v /mnt/data:/data \
-v /mnt/config:/root/.minio \
minio/minio server --console-address ":9001" /data
```

MinIO自定义用户名密码

```sh
docker run -d -p 9000:9000 -p 9001:50000 --name minio \
-e "MINIO_ROOT_USER=admin" \
-e "MINIO_ROOT_PASSWORD=12345678" \
-v /mnt/data:/data \
-v /mnt/config:/root/.minio \
minio/minio server --console-address ":9001" /data
```

## 参考文章

[**【2021最新版】分布式文件系统MinIO教学视频，通俗易懂！**](https://www.bilibili.com/s/video/BV1Pq4y1U7ha)