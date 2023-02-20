# MinioServer启动模式

## 1. 简介

minio支持多种server启动模式：

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220715171521129.png" alt="image-20220715171521129"  />

- standalone模式

  即要管理的磁盘都在host本地。该启动模式一般仅用于实验环境、测试环境的验证和学习使用。在standalone模式下，还可以分为

  - **non-erasure code mode**
  - **erasure code mode**。

### 1.1 standalone 之 non-erasure code 模式

所谓**non-erasure code mode**，即minio server启动时仅传入一个本地磁盘目录参数：比如：

```bash
$minio server data

Endpoint:  http://10.10.126.88:9000  http://127.0.0.1:9000
AccessKey: minioadmin
SecretKey: minioadmin

Browser Access:
   http://10.10.126.88:9000  http://127.0.0.1:9000           

Command-line Access: https://docs.min.io/docs/minio-client-quickstart-guide
   $ mc config host add myminio http://10.10.126.88:9000 minioadmin minioadmin

... ...

```

在这样的启动模式下，对于每一份对象数据，minio直接在data下面存储这份数据，不会建立副本，也不会启用纠删码机制。因此，**这种模式无论是服务实例还是磁盘都是“单点”，无任何高可用保障，磁盘损坏就表示数据丢失。**

### 1.2 standalone 之 non-erasure code 模式

erasure code mode即为minio server**实例传入多个本地磁盘参数**。一旦遇到多于一个磁盘参数，minio server会自动启用**erasure code mode**。**erasure code**对磁盘的个数是有要求的（最少4个），如不满足要求，实例启动将失败：

```bash
$minio server data1 data2
ERROR Invalid command line arguments: Incorrect number of endpoints provided [data1 data2]
      > Please provide an even number of endpoints greater or equal to 4
      HINT:
        For more information, please refer to https://docs.min.io/docs/minio-erasure-code-quickstart-guide
```

**erasure code**启用后，要求传给minio server的endpoint(standalone模式下，即本地磁盘上的目录)[至少为4个](https://docs.minio.io/docs/minio-erasure-code-quickstart-guide.html)。minio server启用纠删码机制后，会自动将传入的disk drive划分为多个**erasure coding set**，每个**erasure coding set**中的disk drive的数量可以是：4, 6, 8, 10, 12, 14 和16。minio server会根据传入disk drive的数量自动计算set个数和每个set中的disk drive数量。比如下面例子中，我们传入四个endpoint(disk drive)给minio server：

```bash
$minio server data1 data2 data3 data4

Formatting 1 zone, 1 set(s), 4 drives per set.
WARNING: Host local has more than 2 drives of set. A host failure will result in data becoming unavailable.
Status:         4 Online, 0 Offline.
Endpoint:  http://10.10.126.88:9000  http://127.0.0.1:9000
AccessKey: minioadmin
SecretKey: minioadmin

Browser Access:
   http://10.10.126.88:9000  http://127.0.0.1:9000           

Command-line Access: https://docs.min.io/docs/minio-client-quickstart-guide
   $ mc config host add myminio http://10.10.126.88:9000 minioadmin minioadmin

... ...

```

从minio server的输出日志来看，minio server将这些drive放入了一个**erasure coding set**了。在输出日志中，我们还看到一行WARNING: **Host local has more than 2 drives of set. A host failure will result in data becoming unavailable.**，即minio server警告我们：这个**erasure coding set**中有多于两个的drive都在local host上，这样一旦host宕机，那么数据将无法获取。(每个set 有4个drive，根据纠删码的机制，这个set的最大允许失效的disk数量为4/2=2)。

#### 1.2.1 语法糖-省略号

```bash
$minio server data{1...18}

Formatting 1 zone, 3 set(s), 6 drives per set.
WARNING: Host local has more than 3 drives of set. A host failure will result in data becoming unavailable.
WARNING: Host local has more than 3 drives of set. A host failure will result in data becoming unavailable.
WARNING: Host local has more than 3 drives of set. A host failure will result in data becoming unavailable.
Status:         18 Online, 0 Offline.
Endpoint:  http://10.10.126.88:9000  http://127.0.0.1:9000
AccessKey: minioadmin
SecretKey: minioadmin

Browser Access:
   http://10.10.126.88:9000  http://127.0.0.1:9000           

Command-line Access: https://docs.min.io/docs/minio-client-quickstart-guide
   $ mc config host add myminio http://10.10.126.88:9000 minioadmin minioadmin
... ...
```



```
minio server data{1...18}
```

等价于

```
minio server data1 data2 data3 data4 data5 data6 data7 data8 data9 data10 data11 data 12 data13 data14 data15 data16 data17 data18
```

minio server会自行扩展省略号代表的内容。我们看到：当我们传入18个disk drive后，minio server创建了3个**erasure coding set**，每个set中有6个disk drive。同样，minio server还针对每个set输出了一行WARNING：每个Set中有三个以上的disk drive都位于同一台host上。

这些WARNING我们可以通过distributed mode来解决。顾名思义，distributed mode下，minio server实例和其管理的disk drive分布在多台host上，这种模式可以避免minio server实例单点，数据也将分布在不同host上的不同disk中，实现了高可用，提升了整体的容灾能力。由于处理多个host上的disk，distribute mode默认就会启动**erasure coding set**机制。

### 1.3 distributed mode

在distributed mode下，minio server后面的远程的endpoint采用http url编码格式：

```bash
export MINIO_ACCESS_KEY=<ACCESS_KEY>
export MINIO_SECRET_KEY=<SECRET_KEY>
$minio server http://host{1...4}:9000/minio/data{1...4}
```

上面例子中的minio server命令相当于4个host，每个host上启动一个minio server实例，每个实例都管理16的disk drive(包括本地和远程的)。上述命令等价于：

```bash
$minio server http://host1:9000/minio/data1 http://host1:9000/minio/data2 http://host1:9000/minio/data3 http://host1:9000/minio/data4 http://host2:9000/minio/data1 http://host2:9000/minio/data2 http://host2:9000/minio/data3 http://host2:9000/minio/data4 http://host3:9000/minio/data1 http://host3:9000/minio/data2 http://host3:9000/minio/data3 http://host3:9000/minio/data4 http://host4:9000/minio/data1 http://host4:9000/minio/data2 http://host4:9000/minio/data3 http://host4:9000/minio/data4
```

minio同样会自动将这些disk drive划分为若干个**erasure coding set**。每个endpoint用`http://address/disk-drive-path`的形式编码。注意：`这条命令在host1、host2、host3和host4上都要执行`

## 2. `zone`的概念

比如下面这个例子：

```
$minio server data{1...8} data{9...16}

Formatting 1 zone, 1 set(s), 8 drives per set.
WARNING: Host local has more than 4 drives of set. A host failure will result in data becoming unavailable.
Formatting 2 zone, 1 set(s), 8 drives per set.
WARNING: Host local has more than 4 drives of set. A host failure will result in data becoming unavailable.
Status:         16 Online, 0 Offline.
Endpoint:  http://10.10.126.88:9000  http://127.0.0.1:9000
AccessKey: minioadmin
SecretKey: minioadmin

Browser Access:
   http://10.10.126.88:9000  http://127.0.0.1:9000           

Command-line Access: https://docs.min.io/docs/minio-client-quickstart-guide
   $ mc config host add myminio http://10.10.126.88:9000 minioadmin minioadmin

... ...
```

我们在命令行中给minio server传入两组采用“省略号”语法的参数，minio认为**每组**就是一个**“zone”**，这里有两组，因此minio创建了两个**zone**。在每个zone内，minio创建了一个**erasure coding set**，每个set中有8个disk drive。对于外部的写数据请求，minio server会首先查找可用空间多的zone，然后再在zone内选择set和disk drive。

如果不用“省略号”语法，那么minio server会将后面传入的所有disk drive放入一个zone中

## 3. 部署distributed minio集群

### 3. 1. 单机上部署distributed minio集群

我们的验证环境采用最小的distributed minio模式：单机、one zone, one erasure coding set, 4 disk drive。下面是部署的示意图：

![image-20220715200417201](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220715200417201.png)

我们没有使用“省略号”语法，在单机上不是很好模拟。我们通过下面脚本来启动该minio集群：

```bash
# cat startup_minio.sh
#!/bin/bash

export MINIO_ACCESS_KEY="minio"
export MINIO_SECRET_KEY="minio123"

for i in {01..04}; do
    nohup minio server --address ":90${i}" http://127.0.0.1:9001/root/minio-install/data1 http://127.0.0.1:9002/root/minio-install/data2  http://127.0.0.1:9003/root/minio-install/data3 http://127.0.0.1:9004/root/minio-install/data4 > "/root/minio-install/90${i}.log"& 2>&1
done
```

启动该minio集群，并查看启动状态：

```bash
# bash startup_minio.sh

# ps -ef|grep minio

root      1218     1 11 21:58 pts/5    00:00:01 minio server --address :9001 http://127.0.0.1:9001/root/minio-install/data1 http://127.0.0.1:9002/root/minio-install/data2 http://127.0.0.1:9003/root/minio-install/data3 http://127.0.0.1:9004/root/minio-install/data4
root      1219     1 11 21:58 pts/5    00:00:01 minio server --address :9002 http://127.0.0.1:9001/root/minio-install/data1 http://127.0.0.1:9002/root/minio-install/data2 http://127.0.0.1:9003/root/minio-install/data3 http://127.0.0.1:9004/root/minio-install/data4
root      1220     1  3 21:58 pts/5    00:00:00 minio server --address :9003 http://127.0.0.1:9001/root/minio-install/data1 http://127.0.0.1:9002/root/minio-install/data2 http://127.0.0.1:9003/root/minio-install/data3 http://127.0.0.1:9004/root/minio-install/data4
root      1221     1 11 21:58 pts/5    00:00:01 minio server --address :9004 http://127.0.0.1:9001/root/minio-install/data1 http://127.0.0.1:9002/root/minio-install/data2 http://127.0.0.1:9003/root/minio-install/data3 http://127.0.0.1:9004/root/minio-install/data4

root@instance-cspzrq3u:~/minio-install# ls
9001.log  9002.log  9003.log  9004.log  data1  data2  data3  data4  startup_minio.sh
root@instance-cspzrq3u:~/minio-install# tail -100f 9001.log

Formatting 1 zone, 1 set(s), 4 drives per set.
Attempting encryption of all config, IAM users and policies on MinIO backend
Status:         4 Online, 0 Offline.
Endpoint:  http://192.168.16.4:9001  http://172.17.0.1:9001  http://172.18.0.1:9001  http://127.0.0.1:9001       

Browser Access:
   http://192.168.16.4:9001  http://172.17.0.1:9001  http://172.18.0.1:9001  http://127.0.0.1:9001       

.... ...
```

### 3.2 mc配置与管理

minio官方提供了mc命令行工具，用于对minio server进行管理。我们首先要为mc创建一个管理本地minio server(:9001)的配置：

```
# mc config host add myminio 
```

这里我们使用mc添加了一个所谓”host”，指向上面创建的minio server(:9001)。上面的命令实质上是在~/.mc/config.json中写入了如下配置：

```json
# cat ~/.mc/config.json
{
    "version": "9",
    "hosts": {
        "myminio": {
            "url": "http://localhost:9001",
            "accessKey": "minio",
            "secretKey": "minio123",
            "api": "s3v4",
            "lookup": "auto"
        }
    }
}
```

接下来，我们通过mc命令在minio集群中添加三个bucket：

```bash
root@instance-cspzrq3u:~# mc mb myminio/image
Bucket created successfully `myminio/image`.
root@instance-cspzrq3u:~# mc mb myminio/video
Bucket created successfully `myminio/video`.
root@instance-cspzrq3u:~# mc mb myminio/audio
Bucket created successfully `myminio/audio`.
root@instance-cspzrq3u:~# mc ls myminio
[2020-03-16 15:19:55 CST]      0B audio/
[2020-03-16 15:19:48 CST]      0B image/
[2020-03-16 15:19:52 CST]      0B video/
```

新创建的bucket默认的访问policy是none，即外部无访问权限：

```bash
root@instance-cspzrq3u:~# mc policy get myminio/image
Access permission for `myminio/image` is `none`
```

根据我们的设计，我们需要给这三个bucket添加外部可读取权限，以image这个bucket为例：

```bash
root@instance-cspzrq3u:~# mc policy set download myminio/image
Access permission for `myminio/image` is set to `download`
root@instance-cspzrq3u:~# mc policy get myminio/image
Access permission for `myminio/image` is `download`
```

### 3.3. load balancer设置

这里我们使用一个nginx前置在minio集群外部，下面是为minio创建的nginx配置文件(/etc/nginx/conf.d/minio.conf)：

```nginx
// /etc/nginx/conf.d/minio.conf

 upstream minio_cluster {
    server localhost:9001;
    server localhost:9002;
    server localhost:9003;
    server localhost:9004;
 }

server {
 listen 9000;
 server_name myminio.tonybai.com;

 # To allow special characters in headers
 ignore_invalid_headers off;
 # Allow any size file to be uploaded.
 # Set to a value such as 1000m; to restrict file size to a specific value
 client_max_body_size 0;
 # To disable buffering
 proxy_buffering off;

location / {

   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header X-Forwarded-Proto $scheme;
   proxy_set_header Host $http_host;

   proxy_connect_timeout 300;
   # Default is HTTP/1, keepalive is only enabled in HTTP/1.1
   proxy_http_version 1.1;
   proxy_set_header Connection "";
   chunked_transfer_encoding off;

   proxy_pass http://minio_cluster;
}

location /image/ {
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header X-Forwarded-Proto $scheme;
   proxy_set_header Host $http_host;

   proxy_connect_timeout 300;
   # Default is HTTP/1, keepalive is only enabled in HTTP/1.1
   proxy_http_version 1.1;
   proxy_set_header Connection "";
   chunked_transfer_encoding off;
   client_max_body_size 1000m;
   proxy_buffering off;

   proxy_pass http://minio_cluster;
 }
}
```

重启nginx（nginx -s reload)。

我们使用浏览器访问一下`http://myminio.tonybai.com:9000/`，登录后，你将看到如下页面：

![image-20220715200904574](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220715200904574.png)

选择左侧的”image” bucket，点击右下角的”+”号，我们可以上传一张图片：gopher-daily-logo.png，上传后，我们退出登录。然后通过地址`http://myminio.tonybai.com:9000/image/gopher-daily-logo.png`访问该图片。你也可以通过wget命令下载该图片：

```bash
$wget -c http://myminio.tonybai.com:9000/image/gopher-daily-logo.png
--2020-03-16 15:40:20--  http://myminio.tonybai.com:9000/image/gopher-daily-logo.png
正在解析主机 myminio.tonybai.com (myminio.tonybai.com)... 106.12.69.83
正在连接 myminio.tonybai.com (myminio.tonybai.com)|106.12.69.83|:9000... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：59736 (58K) [image/png]
正在保存至: “gopher-daily-logo.png”

gopher-daily-logo.png        100%[============================================>]  58.34K   253KB/s  用时 0.2s   

2020-03-16 15:40:20 (253 KB/s) - 已保存 “gopher-daily-logo.png” [59736/59736])
```

## 4 开启多版本控制

要开启多版本控制，必须开启纠删码模式

![image-20220715165955626](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220715165955626.png)

开启纠删码模式后，我们上传的文件可以看到历史版本

![image-20220715170326538](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220715170326538.png)

我们再存储可以看到他的多版本文件

![image-20220715170931323](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220715170931323.png)

## 参考文章

[使用minio搭建高性能对象存储-第一部分：原型](https://tonybai.com/2020/03/16/build-high-performance-object-storage-with-minio-part1-prototype/)