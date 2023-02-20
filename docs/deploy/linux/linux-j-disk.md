---
order: 150
---

# Linux磁盘监控

## 1. 简介

linux磁盘监控命令主要有，df，iostat,iotop

## 2. 监控命令

### 2.1 df

#### 2.1.1 简介

df命令 用于显示磁盘分区上的可使用的磁盘空间。如果没有文件名被指定，则显示当前所有被挂载的文件系统，默认以 KB 为单位。

#### 2.1.2 语法：

```erlang
df (选项) (参数)
```

选项：
`-a` 全部文件系统列表
`-h` 以方便阅读的方式显示
`-i` 显示inode信息
`-T` 显示文件系统类型
`-l` 只显示本地文件系统
`-k` 以KB为单位
`-m` 以MB为单位

参数：

- 文件：指定文件系统上的文件。

#### 2.1.3 示例

![image-20220401145602336](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401145602336.png)

#### 2.1.4 tldr 中的介绍

```bash
 df

  Gives an overview of the filesystem disk space usage.
  概述了文件系统磁盘空间的使用情况。
  More information: https://www.gnu.org/software/coreutils/df.

  - Display all filesystems and their disk usage:
  	显示所有文件系统及其磁盘使用情况:
    df

  - Display all filesystems and their disk usage in human readable form:
  	以人类可读的形式显示所有文件系统及其磁盘使用情况:
    df -h

  - Display the filesystem and its disk usage containing the given file or directory:
  	显示包含指定文件或目录的文件系统及其磁盘使用情况:
    df path/to/file_or_directory

  - Display statistics on the number of free inodes:
    df -i

  - Display filesystems but exclude the specified types:
    df -x squashfs -x tmpfs
```



### 2.2 iostat

#### 2.2.1 简介

iostat命令 被用于监视系统输入输出设备和CPU的使用情况。

#### 2.2.2 语法：

```erlang
iostat (选项) (参数)
```

选项：
`-c`：仅显示CPU使用情况；
`-d`：仅显示设备利用率；
`-k`：显示状态以千字节每秒为单位，而不使用块每秒；
`-m`：显示状态以兆字节每秒为单位；
`-p`：仅显示块设备和所有被使用的其他分区的状态；
`-t`：显示每个报告产生时的时间；
`-V`：显示版号并退出；
`-x`：显示扩展状态。

参数：

- 间隔时间：每次报告的间隔时间（秒）；
- 次数：显示报告的次数。

#### 2.2.3 字段说明：

- `r/s`: 每秒完成的读 I/O 设备次数。
- `w/s`: 每秒完成的写 I/O 设备次数。
- `rkB/s`: 每秒读K字节数.是 rsect/s 的一半,因为每扇区大小为512字节。
- `wkB/s`: 每秒写K字节数.是 wsect/s 的一半。
- `avgrq-sz`: 平均每次设备I/O操作的数据大小 (扇区)。
- `avgqu-sz`: 平均I/O队列长度。
- `await`: 平均每次设备I/O操作的等待时间 (毫秒)。
- `svctm`: 平均每次设备I/O操作的服务时间 (毫秒)。
- `%util`: 一秒中有百分之多少的时间用于 I/O 操作,或者说一秒中有多少时间 I/O 队列是非空的。

#### 2.2.4 示例

![image-20220401145950590](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401145950590.png)

### 2.3 . iotop

> centos没有该命名

#### 2.3.1 简介

iotop命令 是一个用来监视磁盘I/O使用状况的top类工具。

iotop具有与top相似的UI，其中包括PID、用户、I/O、进程等相关信息。Linux下的IO统计工具如iostat，nmon等大多数是只能统计到per设备的读写情况，如果你想知道每个进程是如何使用IO的就比较麻烦，使用iotop命令可以很方便的查看。

#### 2.3.2 语法：

```erlang
iotop (选项)
```

选项：
`-o`：只显示有io操作的进程
`-b`：批量显示，无交互，主要用作记录到文件。
`-n`： NUM：显示NUM次，主要用于非交互式模式。
`-d SEC`：间隔SEC秒显示一次。
`-p PID`：监控的进程pid。
`-u USER`：监控的进程用户。

#### 2.3.3 iotop常用快捷键：

- 左右箭头：改变排序方式，默认是按IO排序。
- r：改变排序顺序。
- o：只显示有IO输出的进程。
- p：进程/线程的显示方式的切换。
- a：显示累积使用量。
- q：退出。

![image-20220401150415728](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401150415728.png)

