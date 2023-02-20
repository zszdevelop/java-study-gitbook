---
order: 10
category:
  - CAS
---

# CAS单点登录 - 服务搭建

## 1. 什么是CAS

CAS是Central Authentication Service的缩写，中央认证服务，一种独立开放指令协议。CAS 是 耶鲁大学（Yale University）发起的一个开源项目，旨在为 Web 应用系统提供一种可靠的单点登录方法，CAS 在 2004 年 12 月正式成为 JA-SIG 的一个项目。

简单来说，就是开源的企业级单点登录（SSO）服务。

## 2. CAS Server 搭建思路

CAS 官方提供了一种使用 Apereo CAS WAR Overlay Template 的方式（开发人员通过 克隆模板仓库https://github.com/apereo/cas-overlay-template ，修改Maven/Gradle配置引入官方发布War包依赖，构建时将变更的文件更新到新的War中）简化了开发人员二次开发复杂性，提高了开发效率。

对于简单部署一个CAS 服务端，就可以直接下载 Maven 仓库中的War包进行部署，本文亦使用此方法部署 `5.3.16` 版本的CAS 服务端。如需定制开发，请使用官方模板仓库进行开发。

> CAS 服务端 5.x 使用 JDK 1.8，6.x 开始使用 JDK 11，由于公司项目在用1.8，就用 CAS 5.x 最新版本 5.3.16 了

## 3. 方案1：官网war包部署

### 3.1 下载Maven仓库War包

https://repo1.maven.org/maven2/org/apereo/cas/cas-server-webapp-tomcat/5.3.16/

![image-20230214222622428](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230214222622428.png)

### 3.2 使用tomcat 部署

>这里手动将war包改成zip、并手动解压后改名为cas了

![image-20230214222859311](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230214222859311.png)

### 3.3 启动服务

```
#启动tomcat
cd apache-tomcat-9.0.56/bin
./startup.sh
#查看日志
cd ..
tail -f logs/catalina.out

```

![image-20230214223125899](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230214223125899.png)

### 3.4 查看服务是否正常

出现Ready后，Ctrl+C停止日志输出控制台，访问服务器IP:8080/cas，查看cas是否启动成功

![image-20230214223316372](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230214223316372.png)

默认用户名与密码在配置文件application.properties中(CAS 服务端是用SpringBoot实现的)

```bash
#打开配置文件
vim /opt/apache-tomcat-9.0.56/webapps/cas/WEB-INF/classes/application.properties
#Shift + G 跳转到最后，能看到casuser是用户名，Mellon是密码
```

输入用户名与密码，登录

![image-20230214223409995](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230214223409995.png)

![image-20230214223420862](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230214223420862.png)

提示登录成功，到此一个最基础的CAS服务端搭建完成了，接下来将开启 http 协议支持，这是用来应用服务授权时使用的。

## 4. 调整 CAS 服务端配置

默认CAS 服务端将 http 协议的客户端都认为是不合法的，需要修改配置文件 `HTTPSandIMAPS-10000001.json` 添加 http协议支持。

```bash
cd /opt/apache-tomcat-9.0.56/webapps/cas/WEB-INF/classes/services
vim HTTPSandIMAPS-10000001.json
```

添加绿框部分文字 `|http`，添加 http 协议支持。

![image-20230214223553143](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230214223553143.png)

修改完成保存退出，还需要编辑 application.properties

```properties
vim /opt/apache-tomcat-9.0.56/webapps/cas/WEB-INF/classes/application.properties
#在配置文件最后添加如下两行
cas.tgc.secure=false #取消票根对应的Cookie的Secure配置，否则非https无法完成单点登录（但是能达到每个应用都需要登录的目的）
cas.serviceRegistry.initFromJson=true #使用services目录下的json配置初始化serviceRegistry

```

![image-20230214223646403](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230214223646403.png)

重启 tomcat 就可以使用应用服务进行单点登录测试了。

## 参考文章

[CAS学习笔记一：CAS 授权服务器简易搭建](https://www.cnblogs.com/hellxz/p/15740935.html)