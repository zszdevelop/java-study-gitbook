# SpringBoot实战 - exe4j打包成exe，并注册win服务

## 1. 简介

> 本文介绍的是 springboot打包成jar后用exe4j打包成exe，并注册成windows服务，无需安装java环境就能直接运行，以前用bat放入启动文件夹，时不时文件被系统或者杀毒删除，导致业主方没有启动项目，今天我们注册成wins服务，杀毒软件再也不会删除了，结合网上的方法实现开机自启亲测有效，下面跟着我一起操作起来。

## 2. 准备工作

### 2.1 下载

- 官网下载：[https://exe4j.apponic.com/download/](https://exe4j.apponic.com/download/)

- 博主版本的：链接:https://pan.baidu.com/s/18JvfPU5GDi4ErwNd9E4jJw  密码:ip81
  - 包含了exe4j 和 服务注册工具

### 2.2 安装完成，输入破解秘钥

破解密钥：L-g782dn2d-1f1yqxx1rv1sqd（网上找的）

![image-20220921091805609](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921091805609.png)

### 2.3 确保jar包正常运行（使用本地jre）

因为我们exe打包给用户，用户可能并没有java环境，所以我们需要使用本地jre

![image-20220921093857650](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921093857650.png)

此博文 以ruoyi-vue 版本为例

![image-20220921092743600](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921092743600.png)

## 3. 打exe包

### 3.1 步骤一

open 可以导入 已经配置好的 XXX.exe4j 配置脚本

新配置 直接next即可

![image-20220921094014148](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921094014148.png)

### 3.2 步骤二

![image-20220919144257442](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220919144257442.png)

### 3.3 步骤三

![image-20220921094253925](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921094253925.png)

### 3.4 步骤四

![image-20220921094856778](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921094856778.png)

这个高级选项64位是一定要选的

![image-20220919144924352](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220919144924352.png)

### 3.5 步骤五

选择要打包的jar包

![image-20220921095131884](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921095131884.png)

选择启动类 这里要注意 要选择 springboot的jar包启动类

![image-20220921095247307](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921095247307.png)

### 3.6 步骤六

配置 JER 版本

![image-20220919145154975](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220919145154975.png)

在目标系统上，生成的可执行文件按以下可配置顺序搜索JRE或JDK。

所以这里最好配成相对exe的路径（比如同级目录，之后将exe和JRE一起打包给用户）

![image-20220921095504298](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921095504298.png)

### 3.7 步骤七

如果选择 GUI启动 这里是选择启动图片 

这里我们是控制台启动 所以不配置

![image-20220921095622448](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921095622448.png)

### 3.8 步骤八

这里是一些 输出信息配置 这里我们默认就好

![image-20220919145354944](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220919145354944.png)

### 3.9 步骤九

编译生成exe (路径在步骤三填写的地址) 编译成功后会跳转到 步骤十

![image-20220919145450324](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220919145450324.png)

### 3.10 步骤十

打包完成测试

![image-20220919145501107](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220919145501107.png)

![image-20220919151139541](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220919151139541.png)

导出配置

![image-20220921100004983](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921100004983.png)

## 4. 启动与测试

双击就能启动我们exe，可以看到控制台已经启动了

![image-20220921100358747](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921100358747.png)

输入我们的8080端口，可以看到项目已经跑起来了

![image-20220921100435788](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921100435788.png)

## 5. 注册成windows服务

### 5.1 注册服务

将下载好的instsrv.exe和srvany.exe放进我们的 F:\fadu\02_ruoyi\exe 文件夹
在PowerShell中输入(win-运行中搜索PowerShell)

```bash

F:\fadu\02_ruoyi\exe\instsrv.exe ruoyi-server  F:\fadu\02_ruoyi\exe\srvany.exe 

```

![image-20220921101055841](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921101055841.png)

### 5.2 注册表

win+R 输入regedit 打开注册表
找到HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\ruoyi-server
右键添加项Parameters
在项里添加字符串值 AppDirectory 数据 F:\fadu\02_ruoyi\exe
Application 数据 F:\fadu\02_ruoyi\exe\ruoyi.exe
![image-20220921101829291](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921101829291.png)

### 5.3 查看服务

计算机—>管理----->服务找到我们的ruoyi-server服务

![image-20220921102058809](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921102058809.png)

启动服务

![image-20220921102239384](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921102239384.png)

### 5.4 测试

![image-20220921102311268](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921102311268.png)

直接打开浏览器可以看到我们的项目启动成功了，然后大家可以测试关机，再开机访问

![image-20220921102325148](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921102325148.png)

### 5.5 移除服务

最后移除服务可以cmd输入，但是要先停止这个服务才能移除

```bash
F:\fadu\02_ruoyi\exe\instsrv.exe ruoyi-server remove
```

### 5.6 （懒人法）使用bat脚本完成5.1-5.4 步

智慧的我知道你们懒得收到配置所以提供了一个懒人方法建立一个bat文件，输入

```bash
@echo off
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
F:\fadu\02_ruoyi\exe\instsrv.exe ruoyi-server  F:\fadu\02_ruoyi\exe\srvany.exe
reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\ruoyi-server\Parameters
reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\ruoyi-server\Parameters /v AppDirectory /d "F:\fadu\02_ruoyi\exe" /t reg_sz /f
reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\ruoyi-server\Parameters /v Application /d "F:\fadu\02_ruoyi\exe\ruoyi.exe" /t reg_sz /f
net start ruoyi-server


```



注意修改路径和名称

![image-20220921105705692](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220921105705692.png)

注意：

win中可以用%~dp0 替代当前目录

## 参考文章

[springboot打包成jar后用exe4j打包成exe，并注册成windows服务](https://blog.csdn.net/qq_34867069/article/details/126072254)

[SpringBoot 2.x 使用 exe4j 打包成 exe 可执行文件(附带启动传参)](https://blog.csdn.net/weixin_40461281/article/details/105771843)