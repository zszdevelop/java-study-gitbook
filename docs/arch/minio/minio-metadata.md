---
order: 30
category:
  - Minio
---

# Minio基础 - 对象存储的元数据

## 1. 文件存储VS块存储VS对象存储

**文件、块和对象是三种以不同的方式来保存、整理和呈现数据的存储格式**。这些格式各有各的功能和限制。

- 文件存储：

  会以**文件和文件夹**的层次结构来整理和呈现数据；

- 块存储会：

  **将数据拆分到任意划分且大小相同**的卷中；

- 对象存储：

  会管理数据并将其链接至**关联的元数据**。

  元数据包括 account（用户）， bucket， bucket index， Object 的 tag等信息

## 2. 对象存储的元数据

在对象存储里，元数据包括 account（用户）， bucket， bucket index等信息。Minio没有独立的元数据服务器，这个和GlusterFs的架构设计很类似，在minio里都保存在底层的本地文件系统里。

在本地文件系统里，一个bucket对应本地文件系统中的一个目录。一个对象对应bucket目录下的一个目录（在EC的情况下对应多个part文件）。目录下保存者对象相关的数据和元数据。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220721225001273.png" alt="image-20220721225001273"  />

如上图所示：在Erasure Set中有4个磁盘：Disk1，Disk2，Disk3，Disk4，四个磁盘组成一个Erasure Set。每个bucket对应一个相应桶名称的目录，每个对象对应bucket的一个目录：目录里保存着对应的数据和元数据文件。

创建bucket的元数据操作：对于Erasure Set(2+2)为例：创建一个bucket，对应底层文件系统的4次目录创建。创建一个文件，需要对应底层4次目录创建，8次文件创建操作。对于小文件，数据和元数据都保存在meta文件中，也需要4次文件创建操作。**由此可知，minio对应大量小文件的性能非常差。**

## 3. 实例

对于小文件，**数据和元数据都同时保存在对应的xl.meta的文件中**。对应大文件的写入，会创建相应的目录，该目录下是对应的part的数据文件和元数据。

![image-20220721225520501](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220721225520501.png)

![image-20220721225531228](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220721225531228.png)

由图3可知：当前集群中有2个bucket：test1和test2。 test1中有3个对象：分别是x，y，wget-log三个对象。x是30M的大文件，通过multipart上传到集群中，有2个part，分别为part.1和part.2文件。wget-log文件是一个小文件，大小为357.9KB.

通过图4：可以清晰的看到，每个bucket对应一个同名本地目录，每个对象也对应一个同名的目录，下面存数据和元数据。对应小文件，数据和元数据都保存在 xl.meta的元数据文件中。

## 参考文章

[MinIO对象存储介绍](https://zhuanlan.zhihu.com/p/374939519)

