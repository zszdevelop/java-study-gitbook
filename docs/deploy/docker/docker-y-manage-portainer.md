---
order: 2010
category:
  - 部署
  - Docker

---

# docker管理 - 可视化工具Portainer

## 1. 简介

https://github.com/portainer/portainer
Portainer是一个轻量级的管理UI，可让您轻松管理不同的Docker环境（Docker主机或Swarm集群）。 Portainer的意图是易于部署和使用。它由一个可以在任何Docker引擎上运行的容器组成（可以部署为Linux容器或Windows本机容器，也支持其他平台）。 Portainer允许您管理所有Docker资源（容器，映像，卷，网络等）！它与独立的Docker引擎和 Docker Swarm模式兼容。

### 1.1 优点

1. 支持容器管理、镜像管理(导入、导出)

2. 轻量级，消耗资源少

3. 基于docker api，安全性高，可指定docker api端口，支持TLS证书认证

4. 支持权限分配

5. 支持集群

6. github上目前持续维护更新

## 2. 下载Portainer镜像

```powershell
docker search portainer   #搜索当前有哪些Portainer的镜像
docker pull portainer/portainer   #pull 标星最多的镜像（STARS数最多的）
```

## 3. 运行Portainer镜像

运行方式有两种：单机运行 和 集群运行

### 3.1 单机运行

```bash
docker run -d -p 9000:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data --name prtainer portainer/portainer
```

参数说明：
-d：容器在后台运行；
-p 9000:9000 ：宿主机9000端口映射容器中的9000端口（前面的是宿主机端口，后面的是容器端口）；
–restart 标志会检查容器的退出代码，并据此来决定是否要重启容器，默认不会重启；
–restart=always：自动重启该容器；
-v /var/run/docker.sock:/var/run/docker.sock ：把宿主机的Docker守护进程(Docker daemon)默认监听的Unix域套接字挂载到容器中；
-v portainer_data:/data ：把宿主机portainer_data数据卷挂载到容器/data目录；
–name prtainer-test ： 给容器起名为portainer-libai；

### 3.2 汉化安装：

默认安装的是英文版的，有需要中文汉化的可以上传汉化包进行汉化。（[汉化版点击下载](https://pan.baidu.com/s/1ksUzbf9jkoWiCOSKBH6kEQ)）提取码：6chp

将解压后的public文件夹上传到centos系统的根目录下，请注意，是centos系统的根目录。

然后执行以下命令：

```bash
docker run -d -p 9000:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data -v /public:/public --name prtainer-test portainer/portainer（如果已部署，需要将已部署的容器删除）
```

docker ps   #查看下进程

## 3.3 使用Portainer

地址：http://ip:9000，首次访问需要先创建管理员账号和密码，设置下

![image-20221118133933435](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221118133933435.png)

## 参考文章

[docker可视化管理——Portainer安装教程](https://blog.csdn.net/qq_34528463/article/details/106687234)