# 持久化

## 1.简介

redis 提供了两种不同的持久化方法来将数据存储到硬盘

- 快照（snapshotting）

  他可以将存在于某一时刻的所有数据都写入硬盘里面

- 只追加文件（append-only file,AOF）

  他会在执行写命令时，将被执行的写命令复制到硬盘里面

这两种方案既可以同时使用，也可以单独使用

## 2.为什么需要持久化

为什么需要将内存中的数据存储到硬盘的一个主要原因

- 重用数据
- 防止系统故障而将数据备份到远程位置

## 3. redis 持久化配置选项

### 3.1 快照持久化选项

```
save 60 1000
stop-writes-on-bgsave-error no
rdbcompression yes
dbfilename dump.rdb
dir ./
```

### 3.2 AOF 持久化选项

```
appendonly no
appendfsync everysec
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size  64mb
dir ./
```

