---
order: 1000
category:
  - 部署
  - Docker
---

# 集成docker实现一键部署

## 1. 简介

这里的一键部署 主要以若依前后端分离项目为例，仅提供一个思路，项目实际使用中可根据自己项目情况调整

## 2. 环境搭建

`Docker`是一个虚拟环境容器，可以将你的开发环境、代码、配置文件等一并打包到这个容器中，最终只需要一个命令即可打包发布应用到任意平台中。

1、安装docker

```sh
yum install https://download.docker.com/linux/fedora/30/x86_64/stable/Packages/containerd.io-1.2.6-3.3.fc30.x86_64.rpm
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install -y docker-ce
curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

2、检查`docker`和`docker-compose`是否安装成功

```sh
docker version
docker-compose --version
```

3、文件授权

```sh
chmod +x /usr/local/bin/docker-compose
```

## 3. docker 脚本下载

链接:https://pan.baidu.com/s/1yse7-5G5wsghnz4MqUQmvQ  密码:ru81

- 其中`db目录`存放`ruoyi数据库脚本`
- 其中`jar目录`存放打包好的`jar应用文件`
- 数据库`mysql`地址需要修改成`ruoyi-mysql`
- 数据库脚本头部需要添加`SET NAMES 'utf8';`（防止乱码）
- redis地址也需要修改

![image-20220616205125631](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220616205125631.png)

## 4. 启动docker

> 启动docker

```sh
systemctl start docker
```

> 构建docker服务

```sh
docker-compose build
```

> 启动docker容器

```sh
docker-compose up -d
```

> 访问应用地址

打开浏览器，输入：[http://localhost:80](http://localhost/)，若能正确展示页面，则表明环境搭建成功。

> 提示
>
> 启动服务的容器`docker-compose up ruoyi-mysql ruoyi-server`
>
> 停止服务的容器`docker-compose stop ruoyi-mysql ruoyi-server`

## 5. 脚本介绍

### 5.1 mysql-dockerfile

```dockerfile
# 基础镜像
FROM mysql:5.7
# author
MAINTAINER ruoyi

# 执行sql脚本
ADD ./db/*.sql /docker-entrypoint-initdb.d/
```

### 5.2 mysql-dockerfile

```dockerfile
# 基础镜像
FROM redis
# author
MAINTAINER ruoyi

# 挂载目录
VOLUME /zsz/ruoyi/redis
# 创建目录
RUN mkdir -p /zsz/ruoyi/redis
# 指定路径
WORKDIR /zsz/ruoyi/redis
# 复制conf文件到路径
COPY ./conf/redis.conf /zsz/ruoyi/redis/redis.conf
```

### 5.3 ruoyi-dockerfile

````
# 基础镜像
FROM java:8
# author
MAINTAINER ruoyi

# 挂载目录
VOLUME /zsz/ruoyi
# 创建目录
RUN mkdir -p /zsz/ruoyi
# 指定路径
WORKDIR /zsz/ruoyi
# 复制jar文件到路径de
COPY ./jar/*.jar /zsz/ruoyi/ruoyi.jar
# 启动应用
ENTRYPOINT ["java","-jar","ruoyi.jar"]
````

### 5.4 docker-compose.yml

```yml
version : '3'
services:
  ruoyi-mysql:
    container_name: ruoyi-mysql
    image: mysql:5.7
    build:
      context: .
      dockerfile: mysql-dockerfile
    ports:
      - "8306:3306"
    volumes:
      - ./mysql/conf:/zsz/ruoyi/mysql/conf.d
      - ./mysql/logs:/zsz/ruoyi/mysql/logs
      - ./mysql/data:/zsz/ruoyi/mysql/mysqldata
    command: [
          'mysqld',
          '--innodb-buffer-pool-size=80M',
          '--character-set-server=utf8mb4',
          '--collation-server=utf8mb4_unicode_ci',
          '--default-time-zone=+8:00',
          '--lower-case-table-names=1'
        ]
    environment:
      MYSQL_DATABASE: ry-vue
      MYSQL_ROOT_PASSWORD: 123456
  ruoyi-redis:
    container_name: ruoyi-redis
    image: redis
    build:
      context: .
      dockerfile: redis-dockerfile
    ports:
      - "8379:6379"
    volumes:
      - ./conf/redis.conf:/zsz/ruoyi/redis/redis.conf
      - ./redis/data:/data
    command: redis-server /zsz/ruoyi/redis/redis.conf
  ruoyi-server:
    container_name: ruoyi-server
    build:
      context: .
      dockerfile: ruoyi-dockerfile
    ports:
      - "8080:8080"
    volumes:
      - ./ruoyi/logs:/zsz/ruoyi/logs
      - ./ruoyi/uploadPath:/zsz/ruoyi/uploadPath
    depends_on:
      - ruoyi-mysql
      - ruoyi-redis
    links:
      - ruoyi-mysql
      - ruoyi-redis
```

## 参考文章

[集成docker实现一键部署](http://doc.ruoyi.vip/ruoyi/document/cjjc.html#%E9%9B%86%E6%88%90docker%E5%AE%9E%E7%8E%B0%E4%B8%80%E9%94%AE%E9%83%A8%E7%BD%B2)