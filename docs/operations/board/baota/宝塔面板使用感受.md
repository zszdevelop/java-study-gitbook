# 宝塔面板使用感受

## 1. 背景

之前新服务器新项目需要部署，都是从一个个软件安装搭建开始的，各种配置（时间久了配置文件都找不到了），再部署项目，还需要监控项目情况

1. 安装软件

   mysql，nginx,redis，mongo等

2. 配置

   针对安装的软件的各种配置，还有定时任务等

3. 部署项目

   传包，部署配置等

4. 监控项目

   服务是否正常运行，内存，cpu使用情况

往往把这一系列弄好就花费了一天时间，虽然docker 的诞生已经解决了一大部分问题

## 2. 宝塔面板

### 2.1 首页

在首页中我们能看到服务器的一个基本情况

- 负载状态
- cpu使用率
- 内存使用率
- 磁盘使用率
- 网站域名
- 数据库

![image-20220405172433096](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220405172433096.png)

### 2.2 网站

网站主要负责域名管理和一些初始化配置

#### 2.2.1 php项目

![image-20220405173334010](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220405173334010.png)

新建网站

![image-20220405173436414](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220405173436414.png)

#### 2.2.2 java项目

可以配置启动端口和启动命令，以后就在这管理

还可以设置开机自动启动功能（还挺方便，不需要自己写任务了）

![image-20220405173526821](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220405173526821.png)

### 2.3 数据库

只需要简单的设置，一个数据库就配置好了

![image-20220405174011895](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220405174011895.png)

### 2.4 监控

可以监控负载，内存，cpu等性能信息

![image-20220405182751236](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220405182751236.png)

### 2.5 文件

文件可以当做ftp来使用，做一些上传下载的工作

![image-20220405183112784](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220405183112784.png)

### 2.6 计划任务

非常方便的添加定时任务，如备份数据库和https证书续订等

![image-20220405183258796](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220405183258796.png)

### 2.7 软件商店

非常方便的安装软件和配置

![image-20220405183449140](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220405183449140.png)

## 3.待优化项目

- 网站服务模块
  - 不能监控服务状态，当前是停用还是启动，我好自己启动