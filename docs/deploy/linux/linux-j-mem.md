---
order: 120
---

# Linux内存监控

## 1. 简介

内存监控主要有free 和 vmstat

## 2. 监控命令

### 2.1 free

Linux free命令用于显示内存状态。

free指令会显示内存的使用情况，包括实体内存，虚拟的交换文件内存，共享内存区段，以及系统核心使用的缓冲区等。

#### 2.1.1 语法

```bash
free [-bkmotV][-s <间隔秒数>]
```

常用选项：
`-b`：以Byte为单位显示内存使用情况；
`-k`：以KB为单位显示内存使用情况；
`-m`：以MB为单位显示内存使用情况；
`-g`：以GB为单位显示内存使用情况;

**`-h`:  以合适的单位显示内存使用情况，最大为三位数，自动计算对应的单位值。单位有：**

```
B = bytes
K = kilos
M = megas
G = gigas
T = teras
```

`-o`：不显示缓冲区调节列；
`-t`：显示内存总和列；
`-V`：显示版本信息。****

**`-s`: <间隔秒数> 持续观察内存使用状况。** 

![image-20220401101834998](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401101834998.png)

#### 2.1.2 字段说明：

- total：内存总数；
- used：已经使用的内存数，包括 cached 和应用程序实际使用的内存；
- free：空闲的内存数；
- shared：当前已经废弃不用；
- buffers：缓存内存数；
- cached：缓存内存数。

关系：total = used +available

#### 2.1.3 实例

##### 2.1.3.1 显示内存使用情况

```
free
```

![image-20220401141256030](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401141256030.png)

##### 2.1.3.2 以合适的单位显示内存使用情况

![image-20220401141510962](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401141510962.png)

##### 2.1.3.3 以总和的形式显示内存的使用信息

```bash
free -t
```



![image-20220401141403556](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401141403556.png)

##### 2.1.3.4 周期性的查询内存使用信息

```bash
free -s 10 //每10s 执行一次命令
```

![image-20220401141645744](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401141645744.png)

#### 2.1.4 tldr 中的介绍

```bash
(base) ➜  ~ tldr free

  free

  Display amount of free and used memory in the system.
  显示系统中可用和已使用的内存量。

  - Display system memory:
  	显示系统内存:
    free

  - Display memory in Bytes/KB/MB/GB:
  	以字节/KB/MB/GB为单位显示内存:
    free -b|k|m|g

  - Display memory in human readable units:
  	以人类可读单位显示内存:
    free -h

  - Refresh the output every 2 seconds:
  	每2秒刷新一次输出:
    free -s 2
```



### 2.2 vmstat

#### 2.2.1 简介

mstat命令 的含义为显示虚拟内存状态（“Viryual Memor Statics”），但是它可以报告关于进程、内存、I/O等系统整体运行状态。

#### 2.2.2 语法

```erlang
vmstat (选项) (参数)
```

选项
`-a`：显示活动内页；
`-f`：显示启动后创建的进程总数；
`-m`：显示slab信息；
`-n`：头信息仅显示一次；
`-s`：以表格方式显示事件计数器和内存状态；
`-d`：报告磁盘状态；
`-p`：显示指定的硬盘分区状态；
`-S`：输出信息的单位。

参数

- 事件间隔：状态信息刷新的时间间隔；
- 次数：显示报告的次数

![image-20220401141913473](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401141913473.png)

#### 2.2.3 字段说明

Procs（进程）

- r: 运行和等待CPU时间片的进程数，这个值如果长期大于系统CPU个数，就说明CPU资源不足，可以考虑增加CPU
- b: 等待资源的进程数，比如正在等待I/O或者内存交换等

Memory（内存）

- swpd: 使用虚拟内存大小，如果swpd的值不为0，但是SI，SO的值长期为0，这种情况不会影响系统性能。
- free: 空闲物理内存大小（以KB为单位）。
- buff: 用作缓冲的内存大小。
- cache: 用作缓存的内存大小，如果cache的值大的时候，说明cache处的文件数多。如果此时IO中的bi比较小，就说明文件系统效率比较好。

Swap

- si: 每秒从交换区写到内存的大小，由磁盘调入内存。
- so: 每秒写入交换区的内存大小，由内存调入磁盘。

注意：内存够用的时候，这2个值都是0，如果这2个值长期大于0时，系统性能会受到影响，磁盘IO和CPU资源都会被消耗。有些朋友看到空闲内存（free）很少的或接近于0时，就认为内存不够用了，不能光看这一点，还要结合si和so，如果free很少，但是si和so也很少（大多时候是0），那么不用担心，系统性能这时不会受到影响的。

IO（现在的Linux版本块的大小为1kb）

- bi: 每秒读取的块数
- bo: 每秒写入的块数

注意：随机磁盘读写的时候，这2个值较大（如超出1024k)，而且wa值比较大，则表示系统磁盘IO性能瓶颈。

system（系统）

- in: 每秒中断数，包括时钟中断。
- cs: 每秒上下文切换数。

注意：上面2个值越大，会看到由内核消耗的CPU时间会越大。

CPU（以百分比表示）
us: 用户进程执行时间百分比(user time)
us的值比较高时，说明用户进程消耗的CPU时间多，但是如果长期超50%的使用，那么我们就该考虑优化程序算法或者进行加速。

- sy: 内核系统进程执行时间百分比(system time)

sy的值高时，说明系统内核消耗的CPU资源多，这并不是良性表现，我们应该检查原因。

- id: 空闲时间百分比
- wa: IO等待时间百分比

wa的值高时，说明IO等待比较严重，这可能由于磁盘大量作随机访问造成，也有可能磁盘出现瓶颈（块操作）。

- st：一般不关注，虚拟机占用的时间百分比。

#### 2.2.4 实例

每2s显示一次

![image-20220401141913473](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401141913473.png)

