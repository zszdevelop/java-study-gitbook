---
order: 40
category:
  - kafka  
  - MQ
---

# Kafka - 安装

## 1. 安装

### 1.1 docker-compose 安装

#### 1.1.1 docker-compose.yml 编写

```yml
version: '3'

services:
  zookeeper:
    image: 'bitnami/zookeeper:3.8.0'
    container_name: zookeeper
    ports:
      - "2181:2181"
    environment:
      TZ: Asia/Shanghai
      ALLOW_ANONYMOUS_LOGIN: "yes"
      ZOO_SERVER_ID: 1
      ZOO_PORT_NUMBER: 2181
    # network_mode: "host"

  kafka:
    image: 'bitnami/kafka:3.2.0'
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      TZ: Asia/Shanghai
      # 更多变量 查看文档 https://github.com/bitnami/bitnami-docker-kafka/blob/master/README.md
      KAFKA_BROKER_ID: 1
      # 监听端口
      KAFKA_CFG_LISTENERS: PLAINTEXT://:9092
      # 实际访问ip 本地用 127 内网用 192 外网用 外网ip
      KAFKA_CFG_ADVERTISED_LISTENERS: PLAINTEXT://192.168.31.165:9092
      KAFKA_CFG_ZOOKEEPER_CONNECT: 127.0.0.1:2181
      ALLOW_PLAINTEXT_LISTENER: "yes"
    volumes:
      - ./data:/bitnami/kafka/data
    depends_on:
      - zookeeper
    #network_mode: "host"

  kafka-manager:
    image: sheepkiller/kafka-manager:latest
    container_name: kafka-manager
    ports:
      - "19092:19092"
    environment:
      ZK_HOSTS: 127.0.0.1:2181
      APPLICATION_SECRET: letmein
      KAFKA_MANAGER_USERNAME: ruoyi
      KAFKA_MANAGER_PASSWORD: ruoyi123
      KM_ARGS: -Dhttp.port=19092
    depends_on:
      - kafka
    #network_mode: "host"

```

#### 1.1.2 启动

```sh
docker-compose up -d
```

## 2. 控制台管理

### 2.1 进入控制台

[http://localhost:19092/](http://localhost:19092/)

![image-20220922133836608](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922133836608.png)

### 2.2 创建集群链接

![image-20220922133941643](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922133941643.png)

![image-20220922134027419](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922134027419.png)

### 2.3 添加List

![image-20220922134525592](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922134525592.png)

### 2.4 查看

![image-20220922134557163](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922134557163.png)

## 参考文章

[docker-compose 安装 Kafka 3.X 附带可视化界面](https://lionli.blog.csdn.net/article/details/125855550)