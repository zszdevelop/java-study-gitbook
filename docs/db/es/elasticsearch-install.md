---
order: 30
category:
	- ElasticSearch
---

# ES详解 - Docker安装Elk

![image-20220803230055166](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220803230055166.png)

## 1. 简介

ELK是Elasticsearch+Logstash+Kibana简称

- Elasticsearch 是一个分布式的搜索和分析引擎，可以用于全文检索、结构化检索和分析，并能将这三者结合起来。Elasticsearch 基于 Lucene 开发，现在是使用最广的开源搜索引擎之一。
- Logstash 简单来说就是一根具备实时数据传输能力的管道，负责将数据信息从管道的输入端传输到管道的输出端，与此同时这根管道还可以让你根据自己的需求在中间加上滤网，Logstash提供了很多功能强大的滤网以满足你的各种应用场景。
- Kibana 是一个开源的分析与可视化平台，设计出来用于和Elasticsearch一起使用的。你可以用kibana搜索、查看、交互存放在Elasticsearch索引里的数据，使用各种不同的图标、表格、地图等，kibana能够很轻易的展示高级数据分析与可视化。

## 2. 安装

### 2.1 编写docker-compose.yml

```yml
version: '3'
services:
  elasticsearch:
    image: elasticsearch:7.17.6
    container_name: elasticsearch
    ports:
      - "9200:9200"
      - "9300:9300"
    environment:
      # 设置集群名称
      cluster.name: elasticsearch
      # 以单一节点模式启动
      discovery.type: single-node
      # 开启x-pack(需要加密时配置)
      xpack.security.enabled: "true"
      # 密码(需要加密时配置)
      ELASTIC_PASSWORD: abc@123
      # 设置内存大小
      ES_JAVA_OPTS: "-Xms2048m -Xmx2048m"
    volumes:
      - /home/dataexa/aia/elk/elasticsearch/plugins:/usr/share/elasticsearch/plugins
      - /home/dataexa/aia/elk/elasticsearch/data:/usr/share/elasticsearch/data
      - /home/dataexa/aia/elk/elasticsearch/logs:/usr/share/elasticsearch/logs
    network_mode: "host"

  kibana:
    image: kibana:7.17.6
    container_name: kibana
    ports:
      - "5601:5601"
    depends_on:
      # kibana在elasticsearch启动之后再启动
      - elasticsearch
    environment:
      #设置系统语言文中文
      I18N_LOCALE: zh-CN
      # 访问域名
      # SERVER_PUBLICBASEURL: https://kibana.cloud.com
    volumes:
      - /home/dataexa/aia/elk/kibana/config/kibana.yml:/usr/share/kibana/config/kibana.yml
    network_mode: "host"

  logstash:
    image: logstash:7.17.6
    container_name: logstash
    ports:
      - "4560:4560"
    volumes:
      - /home/dataexa/aia/elk/logstash/pipeline/logstash.conf:/usr/share/logstash/pipeline/logstash.conf
      - /home/dataexa/aia/elk/logstash/config/logstash.yml:/usr/share/logstash/config/logstash.yml
    depends_on:
      - elasticsearch
    network_mode: "host"
```

### 2.2 新建logstash/logstash-springboot.conf文件

```js
input {
  tcp {
    mode => "server"
    host => "0.0.0.0"
    port => 4560
    codec => json_lines
  }
}
output {
  elasticsearch {
    hosts => "192.168.0.1:9200"
    index => "%{[spring.application.name]}-%{+YYYY.MM.dd}"
    user => "elastic"
    password => "abc@123"
  }
}

```

### 2.3 新建 kibana/config/kibana.yml

```
server.host: "0.0.0.0"
server.shutdownTimeout: "5s"
elasticsearch.username: "elastic"
elasticsearch.password: "dataexa@123"
elasticsearch.hosts: [ "http://127.0.0.1:9200" ]
monitoring.ui.container.elasticsearch.enabled: true
```



## 3. 安装，运行ELK

```php
docker-compose up -d
```

## 4. 访问Kibana

![image-20220803230538798](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220803230538798.png)

## 参考文章

[docker-compose安装ELK](https://www.jianshu.com/p/2d78ce6bc504)