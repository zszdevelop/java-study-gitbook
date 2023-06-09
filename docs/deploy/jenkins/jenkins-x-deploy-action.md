---
order: 20
category:
  - kenkins

---

# Jenkins部署与实战

## 1. 安装Jenkins

### 1.1 docker 中安装Jenkins

```
docker run -p 18080:8080 -p 50000:5000 --name jenkins \
-u root \
-v /home/jenkins/jenkins_home:/var/jenkins_home \
-d jenkins/jenkins:2.357
```

>这里选择2.357 版本、而不是lts 版本、主要是因为最新版本在lts 中底层依赖linux环境变成最简化了。不能使用apt-get等来安装软件、导致无法正常安装 maven、npm等

### 1.2 登录jenkins

- 运行成功后访问该地址登录Jenkins，第一次登录需要输入管理员密码：

  访问：http://localhost:18080/

  ![image-20220718162800163](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718162800163.png)

- 查看登录默认密码

  1. /var/jenkins_home/secrets/initialAdminPassword 文件查看

  2. Jenkins 的启动日志中查看

     ```bash
     docker logs jenkins
     ```

     ![image-20220718164259903](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718164259903.png)

### 1.3 安装插件

选择安装插件方式，这里我们直接安装推荐的插件：

![image-20220718163403228](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718163403228.png)

- 进入插件安装界面，联网等待插件安装：

  ![image-20220718163528739](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718163528739.png)

### 1.4 创建管理员账号

  

  ![image-20220718164407366](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718164407366.png)

### 1.5 进行实例配置，配置Jenkins的URL

![image-20220718164430212](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718164430212.png)

### 1.6 配置时间（可选）

默认时间并不是北京时间、需要手动更改

管理员-设置-User Defined Time Zone

![image-20230609111144604](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609111144604.png)

## 2. 凭据管理

### 2.1 凭据的作用

凭据主要用来全局设置各种需要认证的数据。如

- git 的账号密码
- 服务器的账号密码等

### 2.2 添加全局凭据入口

系统管理-> Manage Credentials -> 凭据

![image-20230609103552034](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609103552034.png)

从这个入口添加全局jenkins的凭据

![image-20230609103621742](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609103621742.png)

![image-20230609103635053](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609103635053.png)

![image-20230609103649476](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609103649476.png)

### 2.3 全局凭据的添加

![image-20230609103924945](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609103924945.png)

此处的id 不设置也可以，会自动生成UUID。但是设置了可以在界面中展示，更好的选择

## 3. 安装maven

### 3.1 方案1：通过全局配置的自动安装（不推荐）

#### 3.1.1  Step1：添加全局配置

>设置了自动安装并不会立马安装maven，是需要触发条件的！！！
>
>1. 配置自动安装
>2. 添加 Maven Integration 插件
>3. 构建一个maven项目（一定要用他界面的）

![image-20230609105328446](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609105328446.png)

设置为自动安装

![image-20230609105344306](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609105344306.png)

#### 3.1.2 Step2：添加 Maven Integration 插件 

![image-20230609105900221](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609105900221.png)

#### 3.1.3 Step3：构建一个maven项目

一定要选择构建一个maven项目、运行后他才会去自动下载安装

![image-20230609105705294](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609105705294.png)

可以看到控制台已经帮我们安装了maven

![image-20230609110052063](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609110052063.png)

### 3.2 方案2：在jenkins服务器中安装maven

```
apt-get update
apt-get install -y maven
```

## 4.  安装指定版本 Node和npm

### 4.1 安装node 插件

![image-20230609155457132](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609155457132.png)

### 4.2 配置node环境

在全局配置工具中配置node环境

![image-20230609160051407](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609160051407.png)

>注意此处的自动安装是需要有触发时机的

### 4.3 触发自动安装

新建job的时候，选自由项目，但是在写job的时候，一定要勾选如下复选框，才会触发node安装。

Provide Node & npm bin/ folder to PATH

![image-20230609160307858](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609160307858.png)

部署后

![image-20230609160005063](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609160005063.png)

## 5. Docker部署

### 5.1 插件管理中安装docker

![image-20230609151733203](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609151733203.png)

### 5.2 docker 开启端口供外部程序访问

docker服务文件位置 /usr/lib/systemd/system/docker.service

编辑 docker.service

找到Service标签下的ExecStart属性

注释掉原来的 , 添加如下内容

```
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock --containerd=/run/containerd/containerd.sock
```

![image-20230609152113946](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609152113946.png)

重新加载配置并重启docker服务

```undefined
systemctl daemon-reload
systemctl restart docker.service
```

### 5.3 配置docker集群

节点管理->configureClouds->配置集群

![image-20230609153540277](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609153540277.png)

### 5.4 项目中添加docker构建步骤

![image-20230609153939147](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609153939147.png)

### 5.5 部署日志

![image-20230609154845541](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609154845541.png)

## 6. SSH上传文件到服务器

### 6.1 安装插件 Publish Over SSH

![image-20230609160732882](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609160732882.png)

### 6.2 配置SSH服务器信息

SSH Servers

系统管理->系统配置->SSH Servers

![image-20230609163032628](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609163032628.png)

### 6.3 项目部署配置

![image-20230609163121649](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230609163121649.png)

## 参考文章

[jenkins自动安装的坑【避坑】](https://blog.51cto.com/u_14866376/5966900)
