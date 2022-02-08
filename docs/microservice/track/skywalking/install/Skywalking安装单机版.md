# Skywalking安装(单机版)

## 1. 下载

[官网下载](http://skywalking.apache.org/downloads/)

Skywalking 主要包含

- APM 监控服务端
- Agent: 各语言模块的Agent代理

- Docker 镜像等

![image-20211127220454981](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211127220454981.png)

### 1.1 下载Apm

Apm有好几个版本的存储引擎，我们使用默认的就可以了

![image-20211127220854387](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211127220854387.png)

### 1.2 下载Agent代理

![image-20211127220958409](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211127220958409.png)

## 2. 确认端口

Skywalking 需要的端口如下

- 11800：和Skywalking通信的gRPC端口
- 12800：和Skywalking通信的HTTP端口
- 8080：UI所占用的端口

首先要确保端口没有被占用

```sh
# Linux/macOS
netstat -an|grep 8080

# 对于使用windows的同学，则可以使用
netstat -ano|findstr 8080
```

如果没有结果，就说明8080端口没有被占用。其他端口也是一样，以此类推。

## 3. APM安装&启动

安装Skywalking比较简单，解压，然后根据操作系统的不同，执行对应命令即可。

下载解压后界面如下：

![image-20211127222204919](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211127222204919.png)

### 3.1 启动

#### 3.1.1 Linux或macOS

```sh
cd apache-skywalking-apm-bin/bin
sh startup.sh
```

![image-20211127221921163](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211127221921163.png)

#### 3.1.2 Windows

```sh
cd apache-skywalking-apm-bin/bin
startup.bat
```

### 3.2 测试

访问首页

访问 [http://localhost:8080](http://localhost:8080) ，即可看到类似如下的界面

![image-20211127222015183](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211127222015183.png)

### 3.3 停止

![image-20211127221803108](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211127221803108.png)

## 4. Agent代理

我们有了APM后，Skywalking监控应用呢？目前最流行(也是最强大)的使用方式是基于Java agent的

下载解压后界面如下：

![image-20211127222457230](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211127222457230.png)

### 4.1 核心目录

- config：配置文件路径
- skywalking-agent.jar 代理jar包

### 4.2 配置 `config/agent.config` 

>简单查看，后期只有长期不变的配置才放在agent.config。否则都是跟着项目动态配置

- 将 `agent.service_name` 修改成你的微服务名称；
- 如果Skywalking和微服务部署在不同的服务器，还需修改 `collector.backend_service` 的值，该配置用来指定微服务和Skywalking通信的地址，默认是 `127.0.0.1:11800` ，按需修改即可。当然 `agent.config` 文件里面有很多的配置，本文下面的表格有详细讲解。

### 4.3 应用配置agent

#### 4.3.1 IDE中启动测试

在环境的 vm options中添加

```
-javaagent:/Users/zsz/Project/software/skywalking/skywalking-agent/skywalking-agent.jar
```

![image-20211127223142443](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211127223142443.png)

#### 4.3.2  `java -jar` 启动的应用

```sh
# 注意-javaagent得在-jar之前哦
java -javaagent:/opt/agent/skywalking-agent.jar -jar somr-spring-boot.jar
```

#### 4.3.2 传统Tomcat应用

##### 4.3.2.1 Linux Tomcat 7-9

修改 `tomcat/bin/catalina.sh` 的第一行：

```sh
CATALINA_OPTS="$CATALINA_OPTS -javaagent:/opt/agent/skywalking-agent.jar"; export CATALINA_OPTS
```

##### 4.3.2.2 Windows Tomcat 7-9

修改 `tomcat/bin/catalina.bat` 的第一行：

```sh
set "CATALINA_OPTS=-javaagent:/opt/agent/skywalking-agent.jar"
```

## 5. 效果演示

使用Skywalking监控应用后，当应用API被访问时，就会展示类似如下的图表。

### 5.1 首页

![image-20211127223940093](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211127223940093.png)

### 5.2 网络拓扑

可以分析请求的网络去向。例如下图，表示请求首先打到了ygn这个微服务，然后又请求了`localhost:3306` 这个MySQL数据库。

![image-20211127223953352](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211127223953352.png)

### 5.3 追踪

这个导航栏是我们定位问题时最常用的，可以搜索查询的具体细节。定位性能瓶颈出在了哪个阶段。

![image-20211127224158117](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211127224158117.png)

#### 5.4 告警：

顾名思义。Skywalking可配置告警规则，当超出配置的阈值时，就推送告警信息。

暂未添加的情况

![image-20211127224230064](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211127224230064.png)

## 参考文章

[Skywalking系列博客1-安装单机版 Skywalking](https://www.itmuch.com/skywalking/skywalking-install/)