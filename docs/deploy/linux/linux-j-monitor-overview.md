---
order: 110

---

# Linux系统监控命令汇总

## 1. 简介

以下命令以Ubuntu 18.04 LTS 系统为准。

| 命令    | 功能                                                         | 实例                 |          |
| ------- | ------------------------------------------------------------ | -------------------- | -------- |
| free    | 查看内存使用情况，包括物理内存和虚拟内存                     | free -h 或 free -m   |          |
| vmstat  | 对系统的整体情况进行统计，包括内核进程、虚拟内存、磁盘、陷阱和 CPU 活动的统计信息 | vmstat 2 100         |          |
| top     | 实时显示系统中各个进程的资源占用状况及总体状况               | top                  |          |
| mpstat  | 实时系统监控工具，它会报告与CPU相关的统计信息                | mpstat               |          |
| sar     | 收集、报告和保存CPU、内存、输入输出端口使用情况              | sar -n DEV 3 100     |          |
| netstat | 检验本机各端口的网络连接情况，用于显示与IP、TCP、UDP和ICMP协议相关的统计数据 | netstat -a           |          |
| tcpdump | 用于捕捉或者过滤网络上指定接口上接收或者传输的TCP/IP包       | tcpdump -i eth0 -c 3 |          |
| iptraf  | 用来生成包括TCP信息、UDP计数、ICMP和OSPF信息、以太网负载信息、节点状态信息、IP校验和错误等等统计数据 | iptraf               |          |
| iostat  | 收集显示系统存储设备输入和输出状态统计                       | iostat -x -k 2 100   |          |
| lsof    | 查看进程打开的文件的工具，查看监听端口                       | lsof -i :3000        |          |
| atop    | 显示的是各种系统资源（CPU, memory, network, I/O, kernel）的综合，并且在高负载的情况下进行了彩色标注 | atop                 |          |
| htop    | 它和top命令十分相似，高级的交互式的实时linux进程监控工具     | htop                 |          |
| ps      | 最基本同时也是非常强大的进程查看命令                         | ps aux               | grep php |
| glances | 监视 CPU，平均负载，内存，网络流量，磁盘 I/O，其他处理器 和 文件系统 空间的利用情况 | glances              |          |
| dstat   | 全能系统信息统计工具，可用于替换vmstat、iostat、netstat、nfsstat和ifstat这些命令的工具 | dstat                |          |
| uptime  | 用于查看服务器运行了多长时间以及有多少个用户登录，快速获知服务器的负荷情况 | uptime               |          |
| dmesg   | 主要用来显示内核信息。使用dmesg可以有效诊断机器硬件故障或者添加硬件出现的问题 | dmesg                |          |
| mpstat  | 用于报告多路CPU主机的每颗CPU活动情况，以及整个主机的CPU情况  | mpstat 2 3           |          |
| nmon    | 监控CPU、内存、I/O、文件系统及网络资源。对于内存的使用，它可以实时的显示 总/剩余内存、交换空间等信息 | nmon                 |          |
| mytop   | 用于监控 mysql 的线程和性能。它能让你实时查看数据库以及正在处理哪些查询 | mytop                |          |
| iftop   | 用来监控网卡的实时流量（可以指定网段）、反向解析IP、显示端口信息等 | iftop                |          |
| jnettop | 以相同的方式来监测网络流量但比 iftop 更形象。它还支持自定义的文本输出，并能以友好的交互方式来深度分析日志 | jnettop              |          |
| ngrep   | 网络层的 grep。它使用 pcap ，允许通过指定扩展正则表达式或十六进制表达式来匹配数据包 | ngrep                |          |
| nmap    | 可以扫描你服务器开放的端口并且可以检测正在使用哪个操作系统   | nmap localhost       |          |
| du      | 查看Linux系统中某目录的大小                                  | du -sh *             |          |
| fdisk   | 查看硬盘及分区信息                                           | fdisk -l             |          |

## 2. 内存监控

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

```
free -t
```



![image-20220401141403556](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401141403556.png)

##### 2.1.3.4 周期性的查询内存使用信息

```
free -s 10 //每10s 执行一次命令
```

![image-20220401141645744](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401141645744.png)

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

## 3. CPU 监控

### 3.1 top

#### 3.1.1 简介

top命令 可以实时动态地查看系统的整体运行情况。

#### 3.1.2 语法：

```scss
top (选项)
```

选项：
`-b`：以批处理模式操作；
`-c`：显示完整的治命令；
`-d`：屏幕刷新间隔时间；
`-I`：忽略失效过程；
`-s`：保密模式；
`-S`：累积模式；
`-i<时间>`：设置间隔时间；
`-u<用户名>`：指定用户名；
`-p<进程号>`：指定进程；
`-n<次数>`：循环显示的次数

![image-20220401142646239](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401142646239.png)

#### 3.1.3 字段说明

- `top`：系统当前时间
- `up xxx days`：系统运行时间
- `1 users`：当前登录用户个数
- `load average`：系统负载。即任务队列的平均长度。三个数值分别为最近1分钟、最近5分钟、最近15分钟的平均负载。——超过N（CPU核数）说明系统满负荷运行。
- Tasks
  - `total`：总进程数
  - `running`：正在运行的进程数
  - `sleeping`：睡眠的进程数
  - `stopped`：停止的进程数
  - `zombie`：冻结的进程数
- %Cpu(s)
  - `us`：用户进程消耗的CPU百分比
  - `sy`：内核进程消耗的CPU百分比
  - `ni`：改变过优先级的进程占用CPU的百分比
  - `id`：空闲CPU的百分比
  - `wa`：IO等待消耗的CPU百分比
- Mem
  - `total`：物理内存总量
  - `free`：空闲物理内存总量
  - `used`：已用物理内存总量
  - `buff`：用作内核缓存内存总量
- Swap
  - `total`：虚拟内存总量
  - `free`：空闲虚拟内存总量
  - `used`：已用虚拟内存总量

#### 3.1.4 实例

#### 3.1.4.1 默认top

![image-20220401142646239](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401142646239.png)

### 3.2 mpstat

#### 3.2.1 简介

mpstat命令 指令主要用于多CPU环境下，它显示各个可用CPU的状态系你想。

#### 3.2.2 语法：

```erlang
mpstat (选项) (参数)
```

选项：

```css
-P：指定CPU编号。
```

参数：

- 间隔时间：每次报告的间隔时间（秒）；
- 次数：显示报告的次数。

#### 2.2.3 示例

ALL表示显示所有CPUs，也可以指定某个CPU；2表示刷新间隔。

![image-20220401143304219](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401143304219.png)

## 4. 网络监控

### 4.1 netstat

#### 4.1.1 简介

netstat命令一般用于检验本机各端口的网络连接情况，用于显示与IP、TCP、UDP和ICMP协议相关的统计数据。

#### 4.1.2 常用实例：

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
```

### 4.2 sar

#### 4.2.1 简介

sar命令 是Linux下系统运行状态统计工具，它将指定的操作系统状态计数器显示到标准输出设备。

#### 4.2.2 字段说明

- `IFACE`：网络设备的名称
- `rxpck/s`：每秒钟接收到的包数目
- `txpck/s`：每秒钟发送出去的包数目
- `rxkB/s`：每秒钟接收到的字节数
- `txkB/s`：每秒钟发送出去的字节数

#### 4.2.3 示例

![image-20220401145225177](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401145225177.png)

## 5. 磁盘监控

### 5.1 df

#### 5.1.1 简介

df命令 用于显示磁盘分区上的可使用的磁盘空间。如果没有文件名被指定，则显示当前所有被挂载的文件系统，默认以 KB 为单位。

#### 5.1.2 语法：

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

#### 5.1.3 示例

![image-20220401145602336](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401145602336.png)

### 5.2 iostat

#### 5.2.1 简介

iostat命令 被用于监视系统输入输出设备和CPU的使用情况。

#### 5.2.2 语法：

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

#### 5.2.3 字段说明：

- `r/s`: 每秒完成的读 I/O 设备次数。
- `w/s`: 每秒完成的写 I/O 设备次数。
- `rkB/s`: 每秒读K字节数.是 rsect/s 的一半,因为每扇区大小为512字节。
- `wkB/s`: 每秒写K字节数.是 wsect/s 的一半。
- `avgrq-sz`: 平均每次设备I/O操作的数据大小 (扇区)。
- `avgqu-sz`: 平均I/O队列长度。
- `await`: 平均每次设备I/O操作的等待时间 (毫秒)。
- `svctm`: 平均每次设备I/O操作的服务时间 (毫秒)。
- `%util`: 一秒中有百分之多少的时间用于 I/O 操作,或者说一秒中有多少时间 I/O 队列是非空的。

#### 5.2.4 示例

![image-20220401145950590](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401145950590.png)

### 5.3 . iotop

> centos没有该命名

#### 5.3.1 简介

iotop命令 是一个用来监视磁盘I/O使用状况的top类工具。

iotop具有与top相似的UI，其中包括PID、用户、I/O、进程等相关信息。Linux下的IO统计工具如iostat，nmon等大多数是只能统计到per设备的读写情况，如果你想知道每个进程是如何使用IO的就比较麻烦，使用iotop命令可以很方便的查看。

#### 5.3.2 语法：

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

#### 5.3.3 iotop常用快捷键：

- 左右箭头：改变排序方式，默认是按IO排序。
- r：改变排序顺序。
- o：只显示有IO输出的进程。
- p：进程/线程的显示方式的切换。
- a：显示累积使用量。
- q：退出。

![image-20220401150415728](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401150415728.png)

## 6. 进程

### 6.1 ps

ps（Process Status，进程状态）命令 用于报告当前系统的进程状态。

ps 的用法非常多，这里仅列举一些常用的：

```powershell
ps -aux | grep <name>      # 查看name 进程详细信息
ps -p <pid> -L             # 显示进程<pid> 的所有线程
ps -o lstart <pid>         # 显示进程的启动时间
ps -f --forest -C <name>   # 用树的风格显示进程的层次关系
ps -e -o pid,uname,pcpu,pmem,comm,etime  # 定制显示的列
ps -o lstart <pid>         # 显示进程的启动时间
```

## 7. 系统监控全能工具

### 7.1 glances

glances 是一个用来监视 GNU/Linux 和 FreeBSD 操作系统的 GPL 授权的全能工具。

Glances 会用一下几种颜色来代表状态：

- 绿色：OK（一切正常）
- 蓝色：CAREFUL（需要注意）
- 紫色：WARNING（警告）
- 红色：CRITICAL（严重）。

阀值可以在配置文件中设置，一般阀值被默认设置为（careful=50、warning=70、critical=90）

### 7.2 dstat

dstat命令 是一个用来替换vmstat、iostat、netstat、nfsstat和ifstat这些命令的工具。

直接使用dstat，默认使用的是-cdngy参数，分别显示cpu、disk、net、page、system信息，默认是1s显示一条信息。

## 参考文章

[Linux 系统监控命令整理汇总](https://segmentfault.com/a/1190000038231309)