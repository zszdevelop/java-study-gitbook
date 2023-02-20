---
order: 10
category:
  - Minio
---

# Minio基础 - Minio基础概念

>**文件、块和对象是三种以不同的方式来保存、整理和呈现数据的存储格式**。这些格式各有各的功能和限制。
>
>- 文件存储会以**文件和文件夹**的层次结构来整理和呈现数据；
>
>- 块存储会**将数据拆分到任意划分且大小相同**的卷中；
>
>- 对象存储会管理数据并将其链接至**关联的元数据**。
>
>  元数据包括 account（用户）， bucket， bucket index等信息

## 1. 简介

Minio 是个基于 Golang 编写的开源对象存储套件，虽然轻量，却拥有着不错的性能。

官网地址：[MinIO | High Performance, Kubernetes Native Object Storage](https://min.io/)

### 1.1 何为对象存储？

对象存储服务（Object Storage Service，OSS）是一种海量、安全、低成本、高可靠的云存储服务，适合存放任意类型的文件。容量和处理能力弹性扩展，多种存储类型供选择，全面优化存储成本。

### 1.2 特点

- MinIO 是一个基于Apache License v2.0开源协议的对象存储服务。

- 它兼容亚马逊S3云存储服务接口，非常适合于存储大容量非结构化的数据，例如图片、视频、日志文件、备份数据和容器/虚拟机镜像等，而一个对象文件可以是任意大小，从几kb到最大5T不等。

- MinIO是一个非常轻量的服务,可以很简单的和其他应用的结合，类似 NodeJS, Redis 或者 MySQL。

- 对于中小型企业，如果不选择存储上云，那么 Minio 是个不错的选择，麻雀虽小，五脏俱全。

- 当然 Minio 除了直接作为对象存储使用，还可以作为云上对象存储服务的网关层，无缝对接到 Amazon S3、MicroSoft Azure。

>亚马逊云的 S3 API（接口协议） 是在全球范围内达到共识的对象存储的协议，是全世界内大家都认可的标准。MinIO 在很早的时候就采用了 S3 兼容协议，并且MinIO 是第一个支持 S3 Select 的产品.

## 2. MINIO 基础概念

MINIO 有几个概念比较重要:

- Object：存储到 Minio 的基本对象，如文件、字节流，Anything…

- Bucket：用来存储 Object 的逻辑空间。每个 Bucket 之间的数据是相互隔离的。对于客户端而言，就相当于一个存放文件的顶层文件夹。

- Drive：即存储数据的磁盘，在 MinIO 启动时，以参数的方式传入。Minio 中所有的对象数据都会存储在 Drive 里。

- Set

  即一组 Drive 的集合，分布式部署根据集群规模自动划分一个或多个 Set ，每个 Set 中的 Drive 分布在不同位置。一个对象存储在一个 Set 上。（For example: {1…64} is divided into 4 sets each of size 16.）

  - 一个对象存储在一个Set上

  - 一个集群划分为多个Set

  - 一个Set包含的Drive数量是固定的，默认由系统根据集群规模自动计算得出

  - 一个SET中的Drive尽可能分布在不同的节点上

  >一个对象存储在一个 Set 上。
  >
  >**如果有3个set，那么我们存入一个对象。可能在某些drive 磁盘上没有存**

### 2.1 Set /Drive 的关系

Set /Drive 这两个概念是 MINIO 里面最重要的两个概念，一个对象最终是存储在 Set 上面的。

我们来看下边 MINIO 集群存储示意图，每一行是一个节点机器，这有 32 个节点，每个节点里有一个小方块我们称之 Drive，Drive 可以简单地理解为一个硬盘。

图中，一个节点有 32 个 Drive，相当于 32 块硬盘。

Set 是另外一个概念，Set 是一组 Drive 的集合，图中，所有蓝色、橙色背景的Drive（硬盘）的就组成了一个 Set.

![image-20220721211109769](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220721211109769.png)

### 2.2 MIINO如何写入对象？

MINIO 是通过数据编码，将原来的数据编码成 N 份，N 就是一个 Set 上面 Drive 的数量，后面多次提到的 N 都是指这个意思。

> 上图中，一个 Set 上面 Drive 的数量，是3.

对象被编码成N份之后，把每一份，写到对应的 Drive 上面，这就是把一个对象存储在整个 Set 上。

![image-20220721211712213](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220721211712213.png)

一个集群包含多个 Set，每个对象最终存储在哪个 Set 上是根据对象的名称进行哈希，然后影射到唯一的 Set 上面，这个方式从理论上保证数据可以均匀的分布到所有的 Set 上。

根据的观测，数据分布的也非常均匀，一个 Set 上包含多少个 Drive 是由系统自动根据集群规模算出来的，当然，也可以自己去配置。

一个 Set 的 Drive 系统会考虑尽可能把它放在多的节点上面，保证它的可靠性。

## 3. Minio存储架构

Minio针对不同应用场景也设置了对应的存储架构：

### 3.1 单主机，单硬盘模式

![image-20220721212134078](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220721212134078.png)

该模式下，Minio只在一台服务器上搭建服务，且数据都存在单块磁盘上，该模式存在单点风险，主要用作开发、测试等使用

#### 3.1.1 启动的命令为：

```bash
minio --config-dir ~/tenant1 server --address :9001 /disk1/data/tenant1
```

### 3.2 单主机，多硬盘模式

![image-20220721212316800](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220721212316800.png)

该模式下，Minio在一台服务器上搭建服务，但数据分散在多块（大于4块）磁盘上，提供了数据上的安全保障

```bash
minio --config-dir ~/tenant1 server --address :9001 /disk1/data/tenant1 /disk2/data/tenant1 /disk3/data/tenant1 /disk4/data/enant1
```

### 3.3 多主机、多硬盘模式（分布式）

![image-20220721212406208](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220721212406208.png)



该模式是Minio服务最常用的架构，通过共享一个access_key和secret_key,在多台（2-32）服务器上搭建服务，且数据分散在多块（大于4块，无上限）磁盘上，提供了较为强大的数据冗余机制（Reed-Solomon纠删码）。

```bash
export MINIO_ACCESS_KEY=<TENANT1_ACCESS_KEY>
export MINIO_SECRET_KEY=<TENANT1_SECRET_KEY>
minio --config-dir ~/tenant1 server --address :9001 http://192.168.10.11/data/tenant1 http://192.168.10.12/data/tenant1 http://192.168.10.13/data/tenant1 http://192.168.10.14/data/tenant1
```

## 4. 分布式Minio有什么好处?

在大数据领域，通常的设计理念都是无中心和分布式。Minio分布式模式可以帮助你搭建一个高可用的对象存储服务，你可以使用这些存储设备，而不用考虑其真实物理位置。

### 4.1 数据保护

分布式Minio采用 纠删码来防范多个节点宕机和位衰减bit rot。

分布式Minio至少需要4个硬盘，使用分布式Minio自动引入了纠删码功能。

### 4.2 高可用

单机Minio服务存在单点故障，相反，如果是一个有N块硬盘的分布式Minio, 只要有N/2硬盘在线，你的数据就是安全的。

不过你需要至少有N/2+1个硬盘来创建新的对象。

例如，一个16节点的Minio集群，每个节点16块硬盘，就算8台服務器宕机，这个集群仍然是可读的，不过你需要9台服務器才能写数据。

注意，只要遵守分布式Minio的限制，你可以组合不同的节点和每个节点几块硬盘。

比如，你可以使用2个节点，每个节点4块硬盘，也可以使用4个节点，每个节点两块硬盘，诸如此类。

### 4.3 一致性

Minio在分布式和单机模式下，所有读写操作都严格遵守**read-after-write**一致性模型。

## 5. MinIO的数据高可靠

Minio使用了**Erasure Code 纠删码**和 **Bit Rot Protection 数据腐化保护**这两个特性，所以MinIO的数据可靠性做的高。

### 5.1 Erasure Code纠删码

**纠删码（Erasure Code）简称EC，是一种数据保护方法，它将数据分割成片段，把冗余数据块扩展、编码，并将其存储在不同的位置，比如磁盘、存储节点或者其它地理位置**。

从数据函数角度来说，纠删码提供的保护可以用下面这个简单的公式来表示：n = k + m。

- 变量“k”代表原始数据或符号的值
- 变量“m”代表故障后添加的提供保护的额外或冗余符号的值。
- 变量“n”代表纠删码过程后创建的符号的总值。

举个例子，假设n=16，代表有16块磁盘，另外，有10份原始文件一模一样，称为k，16 = 10 +m，这个m就是可以恢复的校验块个数，所以m是6，任意6个不可用，原始文件都可以恢复，极端情况，10个原始文件坏掉6个，靠4个原始的加上6个校验块，可以把坏掉的6个原始文件恢复，这个用到数学行列式矩阵知识，不做展开。

> MinIO的编码方式，将一个对象编码成若干个数据块和校验块，我们简称为Erasure Code码，这个是编码的类型，这种编码的类型，还需要算法来实现，minio 采用的是 Reed-Solomon算法。

MinIO使用Reed-Solomon算法，该算法把对象编码成若干个数据块和校验块。

Reed-Solomon算法的特点：

- 低冗余

- 高可靠

为了表述方便，把数据块和校验块统称为编码块，之后我们可以通过编码块的一部分就能还原出整个对象。

### 5.2 Reed-Solomon code

Reed-Solomon 是纠删码的实现算法的一种，当然，也是一种恢复丢失和损坏数据的数学算法，

**Minio默认采用Reed-Solomon code将数据拆分成N/2个数据块和N/2个奇偶校验块。**

这就意味着如果是16块盘，一个对象会被分成8个数据块、8个奇偶校验块，你可以丢失任意8块盘（不管其是存放的数据块还是校验块），你仍可以从剩下的盘中的数据进行恢复。

![image-20220721213946979](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220721213946979.png)

如上图，如我们所知，一个对象存储在一个Set上面，这个Set包含16个Drive，其中灰色的一半是数据块，橙色的一半是校验块，这种方式最多能忍受一半的编码丢失或损坏。

**所有编码块的大小是原对象的2倍，跟传统多副本存储方案相比，他只冗余存了一份，但可靠性更高。**

#### 5.2.1 可靠性体现

- 纠删码的工作原理和RAID或者副本不同，像RAID6只能在损失两块盘，或者以下的情况下不丢数据，而**Minio纠删码可以在丢失一半的盘的情况下，仍可以保证数据安全**。

- 而且**Minio纠删码是作用在对象级别，可以一次恢复一个对象**，而RAID是作用在卷级别，数据恢复时间很长。

- Minio对每个对象单独编码，存储服务一经部署，通常情况下是不需要更换硬盘或者修复。

- 此外，针对不同应用所需的数据安全级别不同，Minio还提供了存储级别（Storage Class）的配置，调整数据块和校验块的比例，做到对空间的最佳使用。

#### 5.2.2 存储空间计算

>校验块的数量决定可损坏的磁盘数，可以损坏更多的磁盘，那么意味着要更多的存储空间。
>
>最多一半的校验码，用2倍存储

![image-20220721214657092](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220721214657092.png)

比如在将比例调整为14:2后，存储100M的数据占用的空间仅为114M。

### 5.3 Bit Rot Protection：

接下来讲Bit Rot Protection，直译就是腐烂。

它只是物理设备上的一些文件细微的损坏，还没有被操作系统所硬件所察觉，但是他已经损坏了。

Bit Rot 位衰减又被称为**数据腐化Data Rot**、**无声数据损坏Silent Data Corruption**,

> 位衰减可以理解为无形中的数据丢失——或者称为“Bit rot”, 是指物理存储介质的衰减所带来的隐患将凸显出来。

位衰减是目前硬盘数据的一种严重数据丢失问题。

硬盘上的数据可能会神不知鬼不觉就损坏了，也没有什么错误日志。

一项对150万块硬盘的研究表明，每90块硬盘就有1块有这种“软错误”，这个错误不但会导致数据丢失，还会导致RAID错误。

针对这一问题，最新的Minio采用了HighwayHash算法计算校验和来防范位衰减，根据测试结果，其可以实现10GB/s的处理速度。

**大致的做法是：**

> MinIO把之前的编码块进行 HighwayHash 编码，最后要校验这个编码，以确保每个编码是正确的。

### 5.4 文件的修复

另外，MinIO提供了一个管理工具，可以对所有编码块进行校验，如果发现编码块有问题，再去修复它。

得益于Reed-Solomon纠删码，Minio可以更加灵活的对文件进行修复。

目前，Minio提供了全量、bucket、文件夹、文件等各个粒度的修复操作：

递归修复

```bash
$ mc admin heal -r myminio
```


指定桶修复

```bash
$ mc admin heal -r myminio/dev

```

下面是几个例子：

![image-20220721215704818](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220721215704818.png)

![image-20220721215724700](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220721215724700.png)

![image-20220721215753800](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220721215753800.png)

相比一般的RAID方式，Minio可以在非常小的粒度下对文件进行修复操作，灵活性有了很大提高。

修复后，可以JSON格式列出指定路径（文件、大小）

```bash
$ mc ls -r --json myminio/dev

{
 "status": "success",
 "type": "file",
 "lastModified": "2019-05-30T09:43:07.763-04:00",
 "size": 44996289,
 "key": "myFile",
 "etag": "bae58dc18zzzzz54c14e233b520e0a"
}
```


## 参考文章

[minio 高可用 （原理+秒懂+史上最全）](https://blog.csdn.net/crazymakercircle/article/details/120855464)