---
order: 500
category:
  - Minio
---

# Minio部署 - MinIO安装

## 1. 简介

> MinIO 是一个基于Apache License v2.0开源协议的对象存储服务。它兼容亚马逊S3云存储服务接口，非 常适合于存储大容量非结构化的数据，例如图片、视频、日志文件、备份数据和容器/虚拟机镜像等，而 一个对象文件可以是任意大小，从几kb到最大5T不等。 MinIO是一个非常轻量的服务,可以很简单的和其他应用的结合，类似 NodeJS, Redis 或者 MySQL。

一个对象存储服务，适合存储非结构化数据。如图片、视频、日志文件等

### 1.1 优点

-  部署简单: 一个single二进制文件即是一切，还可支持各种平台。
- minio支持海量存储，可按zone扩展(原zone不受任何影响)，支持单个对象最大5TB; 
- 兼容Amazon S3接口，充分考虑开发人员的需求和体验;
- 低冗余且磁盘损坏高容忍，标准且最高的数据冗余系数为2(即存储一个1M的数据对象，实际占用 磁盘空间为2M)。但在任意n/2块disk损坏的情况下依然可以读出数据(n为一个纠删码集合(Erasure Coding Set)中的disk数量)。并且这种损坏恢复是基于单个对象的，而不是基于整个存储卷的。
-  读写性能优异

## 2. 安装

### 2.1 Centos7 单机部署

```sh
wget -q http://dl.minio.org.cn/server/minio/release/linux-amd64/minio
chmod +x minio
#启动minio server服务，指定数据存储目录/mnt/data
./minio server /mnt/data
```

![image-20210925212033260](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210925212033260.png)

默认用户名密码minioadmin:minioadmin，修改默认用户名密码可以使用：

```sh
export MINIO_ROOT_USER=admin
export MINIO_ROOT_PASSWORD=12345678
```

默认的配置目录是${HOME}/.minio，可以通过--config-dir命令自定义配置目录：

```sh
./minio server --config-dir /mnt/config /mnt/data
```

控制台监听端口是动态生成的，可以通过--console-address ":port"指定静态端口

```sh
./minio server --console-address ":9001" /mnt/data
```

![image-20210925212415270](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210925212415270.png)

### 2.2 docker安装

注：跟中文官网有巨大不同。中文官网没有指定console端口

```sh
docker run -p 9000:9000 -p 9001:50000 --name minio \
-v /mnt/data:/data \
-v /mnt/config:/root/.minio \
minio/minio server --console-address ":9001" /data
```

MinIO自定义用户名密码

```sh
docker run -d -p 9000:9000 -p 9001:50000 --name minio \
-e "MINIO_ROOT_USER=admin" \
-e "MINIO_ROOT_PASSWORD=12345678" \
-v /mnt/data:/data \
-v /mnt/config:/root/.minio \
minio/minio server --console-address ":9001" /data
```

### 2.3 docker-compose 单实例安装

```yml
version: '3'

services:
  minio:
    image: minio/minio:RELEASE.2021-10-27T16-29-42Z
    container_name: minio
    ports:
      # api 端口
      - "9000:9000"
      # 控制台端口
      - "9001:9001"
    environment:
      # 时区上海
      TZ: Asia/Shanghai
      # 管理后台用户名
      MINIO_ACCESS_KEY: admin
      # 管理后台密码，最小8个字符
      MINIO_SECRET_KEY: zsz123456
      # https需要指定域名
      MINIO_SERVER_URL: ""
      # 开启压缩 on 开启 off 关闭
      MINIO_COMPRESS: "off"
      # 扩展名 .pdf,.doc 为空 所有类型均压缩
      MINIO_COMPRESS_EXTENSIONS: ""
      # mime 类型 application/pdf 为空 所有类型均压缩
      MINIO_COMPRESS_MIME_TYPES: ""
    volumes:
      # 映射当前目录下的data目录至容器内/data目录
      - ./data:/data
      # 映射配置目录
      - ./config:/root/.minio/
    command: server --address ':9000' --console-address ':9001' /data  # 指定容器中的目录 /data
    privileged: true
    # restart: always
```

### 2.4 docker-compose 单实例支持https

```yml
version: '3'

services:
  minio:
    image: minio/minio:RELEASE.2021-10-27T16-29-42Z
    container_name: minio
    ports:
      # api 端口
      - "9000:9000"
      # 控制台端口
      - "9001:9001"
    environment:
      # 时区上海
      TZ: Asia/Shanghai
      # 管理后台用户名
      MINIO_ROOT_USER: admin
      # 管理后台密码，最小8个字符
      MINIO_ROOT_PASSWORD: zsz123456
      # https需要指定域名
      MINIO_SERVER_URL: "https://minio.xxx.com:9000"
      MINIO_BROWSER_REDIRECT_URL: "https://minio.xxx.com:9001"
      # 开启压缩 on 开启 off 关闭
      MINIO_COMPRESS: "off"
      # 扩展名 .pdf,.doc 为空 所有类型均压缩
      MINIO_COMPRESS_EXTENSIONS: ""
      # mime 类型 application/pdf 为空 所有类型均压缩
      MINIO_COMPRESS_MIME_TYPES: ""
    volumes:
      # 映射当前目录下的data目录至容器内/data目录
      - ./data:/data
      # 映射配置目录
      - ./config:/root/.minio
    command: server --address ':9000' --console-address ':9001' /data  # 指定容器中的目录 /data
    privileged: true
    # restart: always
```

### 2.5 docker-compose 集群安装

主要有两文件，docker-compose.yaml 和 nginx.conf

#### 2.5.1 docker-compose.yaml 

```java
version: '3.7'

# Settings and configurations that are common for all containers
x-minio-common: &minio-common
  image: quay.io/minio/minio:RELEASE.2022-07-17T15-43-14Z
  command: server --console-address ":9001" http://minio{1...4}/data{1...2}
  expose:
    - "9000"
    - "9001"
  environment:
    MINIO_ROOT_USER: minioadmin
    MINIO_ROOT_PASSWORD: minioadmin
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
    interval: 30s
    timeout: 20s
    retries: 3

# starts 4 docker containers running minio server instances.
# using nginx reverse proxy, load balancing, you can access
# it through port 9000.
services:
  minio1:
    <<: *minio-common
    hostname: minio1
    volumes:
      - ./data/data1-1:/data1
      - ./data/data1-2:/data2

  minio2:
    <<: *minio-common
    hostname: minio2
    volumes:
      - ./data/data2-1:/data1
      - ./data/data2-2:/data2

  minio3:
    <<: *minio-common
    hostname: minio3
    volumes:
      - ./data/data3-1:/data1
      - ./data/data3-2:/data2

  minio4:
    <<: *minio-common
    hostname: minio4
    volumes:
      - ./data/data4-1:/data1
      - ./data/data4-2:/data2

  nginx:
    image: nginx:1.19.2-alpine
    hostname: nginx
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    ports:
      - "9000:9000"
      - "9001:9001"  
    depends_on:
      - minio1
      - minio2
      - minio3
      - minio4

## By default this config uses default local driver,
## For custom volumes replace with volume driver configuration.
volumes:
  data1-1:
  data1-2:
  data2-1:
  data2-2:
  data3-1:
  data3-2:
  data4-1:
  data4-2:
```

#### 2.5.2  nginx.conf

```nginx
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  4096;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;
    sendfile        on;
    keepalive_timeout  65;

    # include /etc/nginx/conf.d/*.conf;

    upstream minio {
        server minio1:9000;
        server minio2:9000;
        server minio3:9000;
        server minio4:9000;
    }

    upstream console {
        ip_hash;
        server minio1:9001;
        server minio2:9001;
        server minio3:9001;
        server minio4:9001;
    }

    server {
        listen       9000;
        listen  [::]:9000;
        server_name  localhost;

        # To allow special characters in headers
        ignore_invalid_headers off;
        # Allow any size file to be uploaded.
        # Set to a value such as 1000m; to restrict file size to a specific value
        client_max_body_size 0;
        # To disable buffering
        proxy_buffering off;
        proxy_request_buffering off;

        location / {
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_connect_timeout 300;
            # Default is HTTP/1, keepalive is only enabled in HTTP/1.1
            proxy_http_version 1.1;
            proxy_set_header Connection "";
            chunked_transfer_encoding off;

            proxy_pass http://minio;
        }
    }

    server {
        listen       9001;
        listen  [::]:9001;
        server_name  localhost;

        # To allow special characters in headers
        ignore_invalid_headers off;
        # Allow any size file to be uploaded.
        # Set to a value such as 1000m; to restrict file size to a specific value
        client_max_body_size 0;
        # To disable buffering
        proxy_buffering off;
        proxy_request_buffering off;

        location / {
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-NginX-Proxy true;

            # This is necessary to pass the correct IP to be hashed
            real_ip_header X-Real-IP;

            proxy_connect_timeout 300;
            
            # To support websocket
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            
            chunked_transfer_encoding off;

            proxy_pass http://console;
        }
    }
}
```



## 参考文章

[**【2021最新版】分布式文件系统MinIO教学视频，通俗易懂！**](https://www.bilibili.com/s/video/BV1Pq4y1U7ha)
