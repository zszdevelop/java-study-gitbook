# Docker安装MongoDB

## 1. 安装

### 1.1 查看可用的mongoDB版本

访问 MongoDB 镜像库地址： https://hub.docker.com/_/mongo?tab=tags&page=1。

可以通过 Sort by 查看其他版本的 MongoDB，默认是最新版本 **mongo:latest**。

![image-20200802220904622](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20200802220904622.png)

## 1.2 下载mongoDB

```
docker pull mongo
```

![image-20200802221102680](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20200802221102680.png)

### 1.3 查看本地镜像

使用以下命令来查看是否已经安装mongo

![image-20200802221215062](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20200802221215062.png)

在上图中可以看到我们已经安装了最新版本（latest）的 mongo 镜像。

### 1.4 运行容器

安装完成后，我们可以使用以下命令来运行mongo容器

```
// --auth 需要认证，如不需要可去除
docker run -itd --name mongo -p 27017:27017 mongo --auth
```



![image-20200802221327304](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20200802221327304.png)

参数说明

- -p 27017:27017** ：映射容器服务的 27017 端口到宿主机的 27017 端口。外部可以直接通过 宿主机 ip:27017 访问到 mongo 的服务。
- **--auth**：需要密码才能访问容器服务。

### 1.5 安装成功

最后我们可以通过 **docker ps** 命令查看容器的运行信息：

![image-20200802221448015](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20200802221448015.png)

## 2. 相关设置

### 2.1 添加用户和设置密码。并且尝试连接

```
$ docker exec -it mongo mongo admin
# 创建一个名为 admin，密码为 123456 的用户。
>  db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'}]});
# 尝试使用上面创建的用户信息进行连接。
> db.auth('admin', '123456')
```

![image-20200802221707076](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20200802221707076.png)