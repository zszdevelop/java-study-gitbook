---
order: 140
---

# Linux网络监控

## 1. 简介

linux中网络监控命令主要是netstat 和sar

## 2. 监控命令

### 2.1 netstat

#### 2.1.1 简介

netstat命令一般用于检验本机各端口的网络连接情况，用于显示与IP、TCP、UDP和ICMP协议相关的统计数据。

#### 2.1.2 常用实例：

```sh
netstat -aup      # 输出所有UDP连接状况
netstat -atp      # 输出所有TCP连接状况
netstat -s        # 显示各个协议的网络统计信息
netstat -i        # 显示网卡列表
netstat -r        # 显示路由表信息
netstat -l        # 只显示监听端口
netstat -lt       # 只列出所有监听 tcp 端口
netstat -lu       # 只列出所有监听 udp 端口
netstat -lx       # 只列出所有监听 UNIX 端口
netstat -p或--programs # 显示正在使用Socket的程序识别码和程序名称；
```

#### 2.1.3 tldr 中的介绍

```bash
 netstat

  显示与网络相关的信息，如打开的连接、打开的套接字端口等.
  更多信息: https://www.unix.com/man-page/osx/1/netstat.

  - 列出所有端口:
    netstat -a

  - 列出所有被侦听端口:
    netstat -l

  - 列出侦听的 TCP 端口:
    netstat -t

  - 显示监听给定协议监听的 PID 和程序名:
    netstat -p 协议

  - 打印路由表:
    netstat -nr
```

#### 2.1.4 示例

##### 2.1.4.1 **列出所有端口(包含TCP和UDP)**

```
netstat -a
```



![image-20220408145537683](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220408145537683.png)

##### 2.1.4.2 **列出所有TCP端口**

```text
> netstat -at
```

![image-20220408145637391](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220408145637391.png)

##### 2.1.4.3 **列出所有UDP端口**

```bash
netstat -au
```

![image-20220408145728045](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220408145728045.png)

##### 2.1.4.4 **找出程序运行的端口**

```
 netstat -tunlp | grep redis
```

![image-20220408150002077](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220408150002077.png)

##### 2.1.4.5 **找出运行在指定端口的进程**

```bash
netstat -tunlp | grep 6379
```

![image-20220408150517112](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220408150517112.png)

##### 2.1.4.6 通过端口找进程ID

```bash
netstat -tunlp | grep 6379 | awk '{print $7}' | cut -d/ -f1
```

![image-20220408150717292](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220408150717292.png)

### 2.2 sar

#### 2.2.1 简介

sar命令 是Linux下系统运行状态统计工具，它将指定的操作系统状态计数器显示到标准输出设备。

#### 2.2.2 字段说明

- `IFACE`：网络设备的名称
- `rxpck/s`：每秒钟接收到的包数目
- `txpck/s`：每秒钟发送出去的包数目
- `rxkB/s`：每秒钟接收到的字节数
- `txkB/s`：每秒钟发送出去的字节数

#### 2.2.3 示例

![image-20220401145225177](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401145225177.png)

## 参考文章

[Linux之netstat命令](https://zhuanlan.zhihu.com/p/398839850)
