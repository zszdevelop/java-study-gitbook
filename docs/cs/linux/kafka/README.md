# kafka

## 1.下载安装步骤

### 1.1 下载

[官网](<https://kafka.apache.org/downloads>)上下载最新版

### 1.2 解压安装

```
tar -zvxf kafka-2.3.0-src.tgz -C /usr/local/
```

### 1.3 修改配置文件

```
vim config/server.properties
```

修改其中的

```
broker.id=1
log.dirs=data/kafka-logs
```

## 2. 启动服务

```
bin/kafka-server-start.sh config/server.properties
```



…….

还要和zookeeper 合在一起用，放弃



### 参考文章

[CentOS7下Kafka的安装介绍](https://segmentfault.com/a/1190000012990954)