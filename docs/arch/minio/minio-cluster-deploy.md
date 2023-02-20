---
order: 510
category:
  - Minio

---

# Minio部署 -  Minio分布式集群搭建部署

## 1. 简介

分布式 Minio 可以让你将多块硬盘或者多台服务器组成一个对象存储服务。由于硬盘分布在不同的节点上，分布式 Minio 避免了单点故障。MinioMinio分布式模式可以帮助你搭建一个高可用的对象存储服务，你可以使用这些存储设备，而不用考虑其真实物理位置。

## 2. Minio分布式部署的优势

### 2.1 数据保护

- 分布式 Minio 采用纠删码来防范多个节点宕机和位衰减。
- 分布式 Minio 至少需要 4 个节点（4台服务器），使用分布式 Minio 就 自动引入了纠删码功能。
- 纠删码是一种恢复丢失和损坏数据的数学算法， Minio 采用 Reed-Solomon code 将对象拆分成 N/2 数据和 N/2 奇偶校验块。 这就意味着如果是 12 块盘，一个对象会被分成 6 个数据块、6 个奇偶校验块，你可以丢失任意 6 块盘（不管其是存放的数据块还是奇偶校验块），你仍可以从剩下的盘中的数据进行恢复。
- 纠删码的工作原理和 RAID 或者复制不同，像 RAID6 可以在损失两块盘的情况下不丢数据，而 Minio 纠删码可以在丢失一半的盘的情况下，仍可以保证数据安全。 而且 Minio 纠删码是作用在对象级别，可以一次恢复一个对象，而RAID 是作用在卷级别，数据恢复时间很长。 Minio 对每个对象单独编码，存储服务一经部署，通常情况下是不需要更换硬盘或者修复。Minio 纠删码的设计目标是为了性能和尽可能的使用硬件加速。
- 位衰减又被称为数据腐化 Data Rot、无声数据损坏 Silent Data Corruption ，是目前硬盘数据的一种严重数据丢失问题。硬盘上的数据可能会神不知鬼不觉就损坏了，也没有什么错误日志。正所谓明枪易躲，暗箭难防，这种背地里犯的错比硬盘直接故障还危险。 所以 Minio 纠删码采用了高速 HighwayHash 基于哈希的校验和来防范位衰减。

### 2.2 高可用

- 单机 Minio 服务存在单点故障，相反，如果是一个 N 节点的分布式 Minio ,只要有 N/2 节点在线，你的数据就是安全的。不过你需要至少有 N/2+1 个节点来创建新的对象。
- 例如，一个 8 节点的 Minio 集群，每个节点一块盘，就算 4 个节点宕机，这个集群仍然是可读的，不过你需要 5 个节点才能写数据。

### 2.3 限制

- 分布式 Minio 单租户存在最少 4 个盘最多 16 个盘的限制（受限于纠删码）。这种限制确保了 Minio 的简洁，同时仍拥有伸缩性。如果你需要搭建一个多租户环境，你可以轻松的使用编排工具（Kubernetes）来管理多个Minio实例。
- 注意，只要遵守分布式 Minio 的限制，你可以组合不同的节点和每个节点几块盘。比如，你可以使用 2 个节点，每个节点 4 块盘，也可以使用 4 个节点，每个节点两块盘，诸如此类。

### 2.4 一致性

- Minio 在分布式和单机模式下，所有读写操作都严格遵守 read-after-write 一致性模型。

## Minio分布式集群搭建

### 3.1 环境准备

| 节点        | 目录             |
| ----------- | ---------------- |
| 192.168.1.1 | /data/minio/data |
| 192.168.1.2 | /data/minio/data |
| 192.168.1.3 | /data/minio/data |
| 192.168.1.4 | /data/minio/data |

从[官网](https://dl.min.io/server/minio/release/linux-amd64/minio)获取Minio！

### 3.2 目录创建

```shell
$ mkdir -p /data/minio/{run,data} && mkdir -p /etc/minio
```

run：启动脚本及二进制文件目录；
data：数据存储目录；
/etc/minio：配置文件目录；

### 3.3 集群启动文件

```shell
$ vim /data/minio/run/run.sh
#!/bin/bash
export MINIO_ACCESS_KEY=Minio
export MINIO_SECRET_KEY=Test1234!
 
/data/minio/run/minio server --config-dir /etc/minio \
http://192.168.99.1/data/minio/data \
http://192.168.99.2/data/minio/data \
http://192.168.99.3/data/minio/data \
http://192.168.99.4/data/minio/data \
```

- `MINIO_ACCESS_KEY`：用户名，长度最小是5个字符；
- `MINIO_SECRET_KEY`：密码，密码不能设置过于简单，不然minio会启动失败，长度最小是8个字符；
- `–config-dir`：指定集群配置文件目录；

### 3.4 配置为系统服务

```shell
$ vim /usr/lib/systemd/system/minio.service
[Unit]
Description=Minio service
Documentation=https://docs.minio.io/
 
[Service]
WorkingDirectory=/data/minio/run/
ExecStart=/data/minio/run/run.sh
 
Restart=on-failure
RestartSec=5
 
[Install]
WantedBy=multi-user.target
```

**注意：**

- **将minio二进制文件上传到`/data/minio/run`目录！**
- **给所有涉及到的文件或目录添加权限！**

```shell
$ chmod +x /data/minio/run/minio && chmod +x /data/minio/run/run.sh
```

### 3.5 启动集群

```shell
$ systemctl daemon-reload
$ systemctl enable minio && systemctl start minio
```

### 3.6 代理集群（nginx负载均衡）

生产环境需要使用Nginx将集群地址进行代理，对外统一入口！

```nginx
upstream minio{
        server 192.168.99.1:9000;
        server 192.168.99.2:9000;
        server 192.168.99.3:9000;
        server 192.168.99.4:9000;
}
server {
        listen 9000;
        server_name minio;
        location / {
                proxy_pass http://minio;
                proxy_set_header Host $http_host;
                client_max_body_size 1000m;
        }
}
 
```

### 3.7 访问测试

浏览器访问minio集群代理地址+9000端口，用户名密码为上文中启动文件run.sh中我们设置的！

## 参考文章

[Minio分布式集群搭建部署](https://www.cnblogs.com/lvzhenjiang/p/14943939.html)