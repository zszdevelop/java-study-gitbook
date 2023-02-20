---
order: 530
category:
  - Minio
---

# Minio部署 - minio配置HTTPS

## 1. 简介

MinIO部署默认以HTTP方式对外提供服务，如果我们需要支持https 应该怎么做呢？

主要思路就是

- 万能大法，通过nginx反向代理，将https配置在nginx侧，内部的MinIO还是使用HTTP；
- MinIO服务端直接配置成HTTPS；

>如何生成https证书：[使用acme.sh生成免费的SSL证书](https://java.isture.com/problem&solve/https/%E4%BD%BF%E7%94%A8acme.sh%E7%94%9F%E6%88%90%E5%85%8D%E8%B4%B9%E7%9A%84SSL%E8%AF%81%E4%B9%A6.html)

## 2. nginx 方案

1. 修改nginx配置文件

```nginx
 server {
        listen          80;
        server_name     minio.aaa.com;
        listen  443 ssl;
        ssl_certificate /home/wwwroot/minio.aaa.com/cret/cert.pem;
        ssl_certificate_key /home/wwwroot/minio.aaa.com/cret/key.pem;
        location / {
            proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_set_header Host $http_host;

           proxy_connect_timeout  300;
           # Default is HTTP/1, keepalive is only enabled in HTTP/1.1
           proxy_http_version 1.1;
           proxy_set_header Connection "";

            proxy_pass http://47.119.1.1:9000;
        }
    }
```

2. java 连接也改成https

### 3.1 遇到的问题

#### 3.1.1 提示签名不对

```
io.minio.errors.ErrorResponseException: The request signature we calculated does not match the signature you provided. Check your key and signing method.
	at io.minio.S3Base.execute(S3Base.java:670)
	at io.minio.S3Base.getRegion(S3Base.java:694)
	at io.minio.S3Base.execute(S3Base.java:470)
	at io.minio.S3Base.executeHead(S3Base.java:728)
	at io.minio.S3Base.statObject(S3Base.java:1447)
	at io.minio.MinioClient.statObject(MinioClient.java:217)
	at com.fardu.file.service.impl.MinioFileServiceImpl.getStatInfo(MinioFileServiceImpl.java:283)
	at com.fardu.file.service.impl.MinioFileServiceImpl.exists(MinioFileServiceImpl.java:201)
```

解决

nginx 添加如下配置

```ngx
 proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_set_header Host $http_host;

           proxy_connect_timeout  300;
           # Default is HTTP/1, keepalive is only enabled in HTTP/1.1
           proxy_http_version 1.1;
           proxy_set_header Connection "";
```



## 3. MinIO服务端配置成HTTPS

### 3.1 证书存放

首先，根据官网描述（[How to secure access to MinIO server with TLS](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.min.io%2Fdocs%2Fhow-to-secure-access-to-minio-server-with-tls.html)），将TLS的公私钥放到：`{{HOME}}/.minio/certs` 里

**注意：**

- 私钥需要命名为：private.key
- 公钥需要命名为：public.crt (如果公钥是以pem格式结尾，可直接改为crt格式)

>如果是下面的docker-compose 则放在对应的映射目录下

### 3.2  docker-compose 配置

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

### 3.3 docker启动

```bash
 docker-compose up -d
```

查看日志

```bash
docker-compose logs -f
```

![image-20220725233426822](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220725233426822.png)

## 4. 总结

相对来说nginx 会更灵活一点，以后集群啥的都可以通过nginx来做，而minio服务改造成https 就只能是minio服务单台实例https了

## 参考文章

[踩坑记录之MinIO添加HTTPS访问](https://juejin.cn/post/7021057486404714532)