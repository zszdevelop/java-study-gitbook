---
order: 1120
category:
  - es
---



# ELK实战 - Filebeat收集Nginx日志



## 1. 简介

![image-20230518173244820](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230518173244820.png)

### 1.1 Filebeat和Beats的关系

首先Filebeat是Beats中的一员。

Beats在是一个轻量级日志采集器，其实Beats家族有6个成员，早期的ELK架构中使用Logstash收集、解析日志，但是Logstash对内存、CPU、io等资源消耗比较高。相比Logstash，Beats所占系统的CPU和内存几乎可以忽略不计。

目前Beats包含六种工具：

- Packetbeat：网络数据（收集网络流量数据）
- Metricbeat：指标（收集系统、进程和文件系统级别的CPU和内存使用情况等数据）
- Filebeat：日志文件（收集文件数据）
- Winlogbeat：Windows事件日志（收集Windows事件日志数据）
- Auditbeat：审计数据（收集审计日志）
- Heartbeat：运行时间监控（收集系统运行时的数据）

### 1.2 Filebeat 是什么

Filebeat是用于转发和集中日志数据的轻量级传送工具。Filebeat监视您指定的日志文件或位置，收集日志事件，并将它们转发到Elasticsearch或 Logstash进行索引。

### 1.3 Filebeat 工作方式

Filebeat的工作方式如下：启动Filebeat时，它将启动一个或多个输入，这些输入将在为日志数据指定的位置中查找。对于Filebeat所找到的每个日志，Filebeat都会启动收集器。每个收集器都读取单个日志以获取新内容，并将新日志数据发送到Filebeat，Filebeat将聚集事件，并将聚集的数据发送到为Filebeat配置的输出。

![image-20230518173604822](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230518173604822.png)

## 2. Filebeat 原理介绍

### 2.1 Filebeat 的构成

Filebeat结构：由两个组件构成，分别是inputs（输入）和harvesters（收集器），这些组件一起工作来跟踪文件并将事件数据发送到您指定的输出，harvester负责读取单个文件的内容。harvester逐行读取每个文件，并将内容发送到输出。为每个文件启动一个harvester。harvester负责打开和关闭文件，这意味着文件描述符在harvester运行时保持打开状态。如果在收集文件时删除或重命名文件，Filebeat将继续读取该文件。这样做的副作用是，磁盘上的空间一直保留到harvester关闭。默认情况下，Filebeat保持文件打开，直到达到close_inactive。

关闭harvester可以会产生的结果：

- 文件处理程序关闭，如果harvester仍在读取文件时被删除，则释放底层资源。
- 只有在scan_frequency结束之后，才会再次启动文件的收集。
- 如果该文件在harvester关闭时被移动或删除，该文件的收集将不会继续。

**一个input负责管理harvesters和寻找所有来源读取**。如果input类型是log，则input将查找驱动器上与定义的路径匹配的所有文件，并为每个文件启动一个harvester。每个input在它自己的Go进程中运行，Filebeat当前支持多种输入类型。每个输入类型可以定义多次。日志输入检查每个文件，以查看是否需要启动harvester、是否已经在运行harvester或是否可以忽略该文件。

### 2.2 Filebeat如何保存文件的状态

Filebeat保留每个文件的状态，并经常将状态刷新到磁盘中的注册表文件中。该状态用于记住harvester读取的最后一个偏移量，并确保发送所有日志行。如果无法访问输出（如Elasticsearch或Logstash），Filebeat将跟踪最后发送的行，并在输出再次可用时继续读取文件。当Filebeat运行时，每个输入的状态信息也保存在内存中。当Filebeat重新启动时，来自注册表文件的数据用于重建状态，Filebeat在最后一个已知位置继续每个harvester。对于每个输入，Filebeat都会保留它找到的每个文件的状态。由于文件可以重命名或移动，文件名和路径不足以标识文件。对于每个文件，Filebeat存储唯一的标识符，以检测文件是否以前被捕获。

### 2.3 Filebeat何如保证至少一次数据消费

Filebeat保证事件将至少传递到配置的输出一次，并且不会丢失数据。是因为它将每个事件的传递状态存储在注册表文件中。在已定义的输出被阻止且未确认所有事件的情况下，Filebeat将继续尝试发送事件，直到输出确认已接收到事件为止。如果Filebeat在发送事件的过程中关闭，它不会等待输出确认所有事件后再关闭。当Filebeat重新启动时，将再次将Filebeat关闭前未确认的所有事件发送到输出。这样可以确保每个事件至少发送一次，但最终可能会有重复的事件发送到输出。通过设置shutdown_timeout选项，可以将Filebeat配置为在关机前等待特定时间。

## 3. 安装Filebeat

>切记：和ELK版本一定要对应,否则没办法正确收集

[官方文档安装](https://www.elastic.co/guide/en/beats/filebeat/7.17/setup-repositories.html#_yum)

## 4. 配置

```yml
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/nginx/access.log
  encoding: utf-8
output.elasticsearch:
  # Array of hosts to connect to.
  hosts: ["121.204.147.24:9200"]
  indices:
    - index: "nginx-log-%{+yyyy.MM.dd}"
```

## 5. 相关命令

- 启动 Filebeat

  ```
  systemctl start filebeat
  ```

- 停止

  ```
  systemctl stop filebeat
  ```

- 查看状态

  ```bash
  systemctl status filebeat -l
  ```

## 6. 实现效果

![image-20230518175846366](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230518175846366.png)

![image-20230518175824649](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230518175824649.png)

## 参考文章

[搞懂日志采集利器 Filebeat 并不难！](https://segmentfault.com/a/1190000039410506)

[官方文档安装](https://www.elastic.co/guide/en/beats/filebeat/7.17/setup-repositories.html#_yum)

