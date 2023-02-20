---
order: 250
category:
  - Minio
---


# Minio基础 - 多版本功能使用详解

## 1. 前言

### 1.1 使用场景

利用多版本控制，您可以在一个桶中保留多个版本的对象，使您更方便地检索和还原各个版本，在意外操作或应用程序故障时快速恢复数据。

默认情况下，新创建的桶不会开启多版本功能，向同一个桶上传同名的对象时，新上传的对象将覆盖原有的对象。

### 1.2 多版本控制

版本说明：

| 版本     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| 最新版本 | 多版本控制开启后，同名对象多次操作，每次操作都会对应一个版本号进行保存。最后一次操作保存的版本号，为最新版本。 |
| 历史版本 | 多版本控制开启后，同名对象多次操作，每次操作都会对应一个版本号进行保存。除最后一次外的，其他保存的版本号为历史版本。 |

只有 MinIO 本身才能生成版本 ID，并且不能被编辑。版本 ID 很简单，使用DCE 1.1 v4 UUID 4（基于随机数据）算法，UUID 是 128 位数字，旨在在空间和时间上具有很高的唯一性，并且在计算上难以猜测。它们是全球唯一标识符，无需联系全球注册机构即可在本地生成。UUID 旨在作为具有极短生命周期的大量标记对象的唯一标识符，并可靠地识别网络中非常持久的对象。

当您将对象放入启用版本控制的存储桶中时，不会覆盖非当前版本。下图显示当一个新版本的PUT 到一个已经包含同名对象的桶中时，原来的对象（ID =fae684ddsd ）留在桶中，MinIO 生成一个新版本（ID = fae684da），并添加存储桶的较新版本。


![image-20220723230540366](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723230540366.png)

当你 DELETE 一个对象时，所有版本都保留在存储桶中，MinIO 会添加一个删除标记，如下所示：

![image-20220723230624512](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723230624512.png)

现在删除标记成为对象的当前版本。默认情况下，GET 请求总是检索最新存储的版本。因此，当当前版本是删除标记时执行简单的 GET 对象请求将返回404。

![image-20220723230714062](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723230714062.png)

通过指定如下所示的版本 ID GET 请求，您可以检索特定对象版本。

![image-20220723230748189](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723230748189.png)

永久删除对象需要指定要删除的版本，只有拥有相应权限的用户才能永久删除版本。如下所示，使用特定版本 ID 调用的 DELETE 请求会从存储桶中永久删除对象。不会为具有版本 ID 的 DELETE 请求添加删除标记。

![image-20220723230825011](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723230825011.png)

注意事项

- 列出桶内对象列表时默认列出最新对象列表。
- 可以指定版本号下载对象，不指定版本号默认下载最新的对象。
- MinIO 上的所有 Bucket 始终处于以下状态之一：未版本控制（默认）和所有其他现有部署、启用版本控制或暂停版本控制。
- 版本控制状态适用于启用版本控制的存储桶中的所有对象。首次为存储桶启用版本控制时，存储桶中的对象此后始终进行版本控制并被赋予唯一的版本 ID。
- 可以在启用版本控制的情况下创建现有或更新的存储桶，最终也可以暂停。对象的现有版本保持原样，仍然可以使用版本 ID 访问。
- 在删除存储桶之前，应删除所有版本，包括删除标记。
- 版本控制功能仅在纠删码和分布式纠删码设置中可用。

## 2. 开启多版本

必须在存储桶上显式启用版本控制，默认情况下不启用版本控制。启用对象锁定的存储桶会自动启用版本控制。启用和暂停版本控制是在存储桶级别完成的。

要控制数据保留和存储使用，请将对象版本控制与对象生命周期管理结合使用。如果您的非版本控制存储桶中有对象过期生命周期策略，并且您希望在启用版本控制的存储桶上保持相同的永久删除行为，则必须添加非当前过期策略。非当前到期生命周期策略将管理启用版本控制的存储桶中非当前对象版本的删除。（启用版本的存储桶维护一个当前和零个或多个非当前对象版本。）

### 2.1 页面开启

直接在桶管理页面，可以查看版本控制信息，点击切换开启或者关闭。

![image-20220723231033642](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723231033642.png)

### 2.2 SDK 开启

通过以下API可以开启或者关闭版本控制：

```java
// Enable versioning on 'my-bucketname'.
      minioClient.setBucketVersioning(
          SetBucketVersioningArgs.builder()
              .bucket("my-bucketname")
              .config(new VersioningConfiguration(VersioningConfiguration.Status.ENABLED, null))
              .build());
      System.out.println("Bucket versioning is enabled successfully");

      // Suspend versioning on 'my-bucketname'.
      minioClient.setBucketVersioning(
          SetBucketVersioningArgs.builder()
              .bucket("my-bucketname")
              .config(new VersioningConfiguration(VersioningConfiguration.Status.SUSPENDED, null))
              .build());
      System.out.println("Bucket versioning is suspended successfully");

```

## 3. 测试

同一个存储桶，上传多个同名对象，可以看到添加了多个版本号。

![image-20220723231144106](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723231144106.png)

可以在获取对象时，指定版本号：

            InputStream stream =
                    minioClient.getObject(
                            GetObjectArgs.builder().bucket("aaaaa").object("my-objectname").versionId("aadsadsafsa").build());
## 参考文章

[Minio入门系列【11】多版本功能使用详解](https://yunyanchengyu.blog.csdn.net/article/details/120867981)