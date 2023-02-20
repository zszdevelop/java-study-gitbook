---
order: 100
category:
  - Minio
---

# Minio基础 - Java集成Minio之存储桶操作API使用详解

## 1. 前言

### 1.1 多种SDK

[官方文档](https://docs.min.io/)
[minio-java](https://github.com/minio/minio-java)
Minio提供了多种语言的SDK，比如java、go、python等。JAVA开发平台可以选择JS和java SDK，也就是**前端和后端都可以直接集成minio**。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723133217901.png" alt="image-20220723133217901"  />

### 1.2 技术方案

每个OSS的用户都会用到上传服务。Web端常见的上传方法是用户在浏览器或App端上传文件到**应用服务器**，**应用服务器**再把文件上传到OSS。具体流程如下图所示。

![image-20220723133304095](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723133304095.png)

和数据直传到OSS相比，以上方法有三个缺点：

- 上传慢：用户数据需先上传到应用服务器，之后再上传到OSS。网络传输时间比直传到OSS多一倍。如果用户数据不通过应用服务器中转，而是直传到OSS，速度将大大提升。而且OSS采用BGP带宽，能保证各地各运营商之间的传输速度。
- 扩展性差：如果后续用户多了，应用服务器会成为瓶颈。
- 费用高：需要准备多台应用服务器。由于OSS上传流量是免费的，如果数据直传到OSS，不通过应用服务器，那么将能省下几台应用服务器。

目前通过Web前端技术上传文件到OSS，有三种技术方案：

- 利用OSS js SDK将文件上传到OSS，也就是前端直连OSS，但是容易暴露认证信息，安全性不太高。

- 使用表单上传方式，将文件上传到OSS。利用OSS提供的接口临时接口，使用表单上传方式将文件上传到OSS。然后请求后端，告知上传完成，进行后续处理。

- 先上传到应用服务器，再请求OSS上传，这种安全性较高，可以对数据和认证进行管控，但是性能最差。

## 2. 集成 JAVA SDK

因为一般的非互联网项目，对性能要求不高，所以采用JAVA SDK集成MInio，然后提供接口给Web端调用就行了。

### 2.1 环境搭建

首先搭建一个Maven基础工程，引入相关依赖，这里引入的是最新的8.3.1版本。还引入了okhttp的最新包，不然某些API会提示版本太低。
```xml
<dependency>
  			<groupId>io.minio</groupId>
  			<artifactId>minio</artifactId>
  			<version>8.3.1</version>
		</dependency>
        <dependency>
            <groupId>com.squareup.okhttp3</groupId>
            <artifactId>okhttp</artifactId>
            <version>4.9.2</version>
        </dependency>

```

### 2.2 初始化客户端

可以看到现在minio都是采用Builder构建者模式来构造对象，和之前有很大的区别，所以需要注意。
```java
        // 初始化客户端
        MinioClient minioClient =
                MinioClient.builder()
                        // minio服务端地址URL
                        .endpoint("http://localhost:9000")
                        // 用户名及密码（访问密钥/密钥）
                        .credentials("admin", "admin123")
                        .build();
```

### 2.3 存储桶基础操作

#### 2.3.1 存储桶是否存在

检查存储桶是否存在。

```java
public boolean bucketExists(BucketExistsArgs args)
```


示例代码：


```java
	// 1.存储桶是否存在
    boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket("my-bucketname").build());
    if (found) {
        System.out.println("my-bucketname exists");
    } else {
        System.out.println("my-bucketname does not exist");
    }
```

#### 2.3.2 创建存储桶

创建一个启用给定区域和对象锁定功能的存储桶。

```java
public void makeBucket(MakeBucketArgs args)
```

示例代码：

```java
    // 2.1 my-bucketname 存储桶不存在则创建
    if (!found) {
        minioClient.makeBucket(MakeBucketArgs.builder().bucket("my-bucketname").build());
        System.out.println("my-bucketname is created successfully");
    }

    // 2.2 创建存储桶my-bucketname-in-eu 并指定区域为eu-west-1
    if (!minioClient.bucketExists(
            BucketExistsArgs.builder().bucket("my-bucketname-in-eu").build())) {
        minioClient.makeBucket(
                MakeBucketArgs.builder().bucket("my-bucketname-in-eu").region("eu-west-1").build());
        System.out.println("my-bucketname-in-eu is created successfully");
    }

    // 2.3 创建存储桶 'my-bucketname-in-eu-with-object-lock' 区域为 'eu-west-1' ，
    // 并且锁定对象，功能不可用
    if (!minioClient.bucketExists(
            BucketExistsArgs.builder().bucket("my-bucketname-in-eu-with-object-lock").build())) {
        minioClient.makeBucket(
                MakeBucketArgs.builder()
                        .bucket("my-bucketname-in-eu-with-object-lock")
                        .region("eu-west-1")
                        .objectLock(true)
                        .build());
        System.out.println("my-bucketname-in-eu-with-object-lock is created successfully");
    }
```
创建后，就可以在控制台看到这些存储桶了，最后那个被锁定的存储桶，上传文件及删除后，发现还是会显示存在这些对象，实际磁盘上的文件并没有删除

![image-20220723134100336](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723134100336.png)

#### 2.3.3 查询存储桶信息列表

列出所有桶的桶信息。

```java
public List<Bucket> listBuckets()
```


示例代码：

```java
// 3.  存储桶信息列表。
        List<Bucket> bucketList = minioClient.listBuckets();
        for (Bucket bucket : bucketList) {
            System.out.println(bucket.creationDate() + ", " + bucket.name());
        }
```

打印信息如下，返回的创建时间是美国时间，需要注意。
![image-20220723134451441](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723134451441.png)

#### 2.3.4 删除存储桶

删除一个空桶。

```java
public void removeBucket(RemoveBucketArgs args) 
```

示例代码：

```java
// 4. 删除存储桶
    if (found) {
        minioClient.removeBucket(RemoveBucketArgs.builder().bucket("my-bucketname").build());
        System.out.println("my-bucketname is removed successfully");
    } else {
        System.out.println("my-bucketname does not exist");
    }
```
如果存储桶存在对象不为空时，删除会报错。
![image-20220723134556833](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723134556833.png)

### 2.4 设置存储桶操作

#### 2.4.1 加密配置

设置桶的加密配置，以允许在该桶中上传对象时，采用对应加密配置对数据进行加密。当前支持配置的服务端加密方式为KMS托管密钥的服务端加密(SSE-KMS)，及AES256加密。

```java
public enum SseAlgorithm {
    AES256("AES256"),
    AWS_KMS("aws:kms");
}
```

设置桶的加密配置：

```java
public void setBucketEncryption(SetBucketEncryptionArgs args)
```

获取桶的加密配置:

```java
public SseConfiguration getBucketEncryption(GetBucketEncryptionArgs args)
```

案例需要配置KMS，后续后出详细文档。

#### 2.4.2 生命周期

生命周期管理可适用于以下典型场景：

- 周期性上传的日志文件，可能只需要保留一个星期或一个月。到期后要删除它们。
- 某些文档在一段时间内经常访问，但是超过一定时间后便可能不再访问了。这些文档需要在一定时间后转化为低频访问存储，归档存储或者删除。

存储桶生命周期配置：

```java
public void setBucketLifecycle(SetBucketLifecycleArgs args)
```

获取桶的生命周期配置：

```java
public LifecycleConfiguration getBucketLifecycle(GetBucketLifecycleArgs args) 
```

示例代码：

```java
    // 5. 生命周期
    List<LifecycleRule> rules = new LinkedList<>();
    // 配置生命周期规则
    rules.add(
            new LifecycleRule(
                    Status.ENABLED, // 开启状态
                    null,
                    new Expiration((ZonedDateTime) null, 365, null), // 保存365天
                    new RuleFilter("logs/"), // 目录配置
                    "rule2",
                    null,
                    null,
                    null));
    LifecycleConfiguration lifecycleConfiguration = new LifecycleConfiguration(rules);
    // 添加生命周期配置
    minioClient.setBucketLifecycle(
            SetBucketLifecycleArgs.builder().bucket("my-bucketname").config(lifecycleConfiguration).build());
    // 获取配置
    LifecycleConfiguration lifecycleConfiguration1111 =
            minioClient.getBucketLifecycle(
                    GetBucketLifecycleArgs.builder().bucket("my-bucketname").build());
    List<LifecycleRule> rules1 = lifecycleConfiguration1111.rules();
    for (int i = 0; i < rules1.size(); i++) {
        System.out.println("Lifecycle status is " + rules1.get(i).status());
        System.out.println("Lifecycle prefix is " + rules1.get(i).filter().prefix());
        System.out.println("Lifecycle expiration days is " + rules1.get(i).expiration().days());
    }
```

打印结果如下：

![image-20220723135014971](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723135014971.png)

#### 2.4.3 通知配置

可以使用存储桶事件通知来监控存储桶中对象上发生的事件。

MinIO 服务器支持的各种事件类型有：

![image-20220723135138733](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723135138733.png)

![image-20220723135150879](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723135150879.png)

![image-20220723135214401](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723135214401.png)

![image-20220723135233435](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723135233435.png)

存储桶配置通知：

```java
public void setBucketPolicy(SetBucketPolicyArgs args)
```

获取桶的通知配置：

```java
public NotificationConfiguration getBucketNotification(GetBucketNotificationArgs args)
```

代码示例：

```java
 // 6. 通知配置 
        // Add a new SQS configuration.
        NotificationConfiguration notificationConfiguration = new NotificationConfiguration();
        List<QueueConfiguration> queueConfigurationList = notificationConfiguration.queueConfigurationList();
        QueueConfiguration queueConfiguration = new QueueConfiguration();
        queueConfiguration.setQueue("arn:minio:sqs::1:webhook");

        List<EventType> eventList = new LinkedList<>();
        eventList.add(EventType.OBJECT_CREATED_PUT);
        eventList.add(EventType.OBJECT_CREATED_COPY);
        queueConfiguration.setEvents(eventList);
        queueConfiguration.setPrefixRule("images");
        queueConfiguration.setSuffixRule("pg");

        queueConfigurationList.add(queueConfiguration);
        notificationConfiguration.setQueueConfigurationList(queueConfigurationList);

        // Set updated notification configuration.
        minioClient.setBucketNotification(
                SetBucketNotificationArgs.builder().bucket("my-bucketname").config(notificationConfiguration).build());
        System.out.println("Bucket notification is set successfully");

        NotificationConfiguration minioClientBucketNotification =
                minioClient.getBucketNotification(
                        GetBucketNotificationArgs.builder().bucket("my-bucketname").build());
        System.out.println(minioClientBucketNotification);

```

#### 2.4.4 策略配置

添加存储桶策略配置。

```
public void setBucketPolicy(SetBucketPolicyArgs args) 
```

获取桶的桶策略配置。

```
public String getBucketPolicy(GetBucketPolicyArgs args)
```

内容较多，后续后出详细文档。

#### 2.4.5 复制配置

存储桶复制旨在将存储桶中的选定对象复制到目标存储桶，内容较多，后续补上

添加存储桶的复制配置

```java
public void setBucketReplication(SetBucketReplicationArgs args)
```

获取桶的桶复制配置：

```java
public ReplicationConfiguration getBucketReplication(GetBucketReplicationArgs args)
```

#### 2.4.6 存储桶标签

当为桶添加标签时，该桶上所有请求产生的计费话单里都会带上这些标签，从而可以针对话单报表做分类筛选，进行更详细的成本分析。例如：某个应用程序在运行过程会往桶里上传数据，我们可以用应用名称作为标签，设置到被使用的桶上。在分析话单时，就可以通过应用名称的标签来分析此应用的成本。

setBucketTags可以为存储桶设置标签。

```java
public void setBucketTags(SetBucketTagsArgs args)
```

getBucketTags获取桶的标签。

```java
public Tags getBucketTags(GetBucketTagsArgs args)
```


示例代码：

```java
    // 1. 存储桶标签
    Map<String, String> map = new HashMap<>();
    map.put("Project", "Project One");
    map.put("User", "jsmith");
    // 设置标签
    minioClient.setBucketTags(SetBucketTagsArgs.builder().bucket("my-bucketname").tags(map).build());
    // 查询标签
    Tags bucketTags = minioClient.getBucketTags(GetBucketTagsArgs.builder().bucket("my-bucketname").build());
    System.out.println(bucketTags.get().toString());
```
返回结果：
![image-20220723135753042](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723135753042.png)

#### 2.4.7 多版本设置

若开启了多版本控制，上传对象时，OBS自动为每个对象创建唯一的版本号。上传同名的对象将以不同的版本号同时保存在OBS中。

若未开启多版本控制，向同一个文件夹中上传同名的对象时，新上传的对象将覆盖原有的对象。

某些功能（例如版本控制、对象锁定和存储桶复制）需要使用擦除编码分布式部署 MinIO。开启了版本控制后，允许在同一密钥下保留同一对象的多个版本。

设置存储桶的版本控制配置。

```java
public void setBucketVersioning(SetBucketVersioningArgs args)
```

获取存储桶的版本控制配置。

```java
public VersioningConfiguration getBucketVersioning(GetBucketVersioningArgs args)
```

示例代码：

```java
    // 2. 版本配置
    // 'my-bucketname'启用版本控制
    minioClient.setBucketVersioning(
            SetBucketVersioningArgs.builder()
                    .bucket("my-bucketname")
                    .config(new VersioningConfiguration(VersioningConfiguration.Status.ENABLED, null))
                    .build());
    System.out.println("Bucket versioning is enabled successfully");

    //  'my-bucketname'暂停版本控制
    minioClient.setBucketVersioning(
            SetBucketVersioningArgs.builder()
                    .bucket("my-bucketname")
                    .config(new VersioningConfiguration(VersioningConfiguration.Status.SUSPENDED, null))
                    .build());
    System.out.println("Bucket versioning is suspended successfully");
```
在控制台可以查看是否开启版本控制。
![image-20220723140041004](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723140041004.png)

#### 2.4.8 对象锁定配置

对象锁定设置后，删除对象后，会仍然存在磁盘中。

在存储桶中设置对象锁定配置。

```java
public void setObjectLockConfiguration(SetObjectLockConfigurationArgs args) 
```

获取存储桶中的对象锁配置。

```java
public ObjectLockConfiguration getObjectLockConfiguration(GetObjectLockConfigurationArgs args)
```

需要先设置存储桶为对象锁定模式，示例代码：

```java
    // 3. 将保留模式设置为Compliance，且持续时间为100天
    // 设置锁定对象的保留模式及时限
    ObjectLockConfiguration config =
            new ObjectLockConfiguration(RetentionMode.COMPLIANCE, new RetentionDurationDays(100));
    minioClient.setObjectLockConfiguration(
            SetObjectLockConfigurationArgs.builder()
                    .bucket("my-bucketname-in-eu-with-object-lock")
                    .config(config)
                    .build());
    System.out.println("object-lock configuration is set successfully");
    // 获取锁定配置
    ObjectLockConfiguration objectLockConfiguration =
            minioClient.getObjectLockConfiguration(
                    GetObjectLockConfigurationArgs.builder()
                            .bucket("my-lock-enabled-bucketname")
                            .build());

    System.out.println("Object-lock configuration of bucket");
    System.out.println("Mode: " + objectLockConfiguration.mode());
    System.out.println("Duration: " + objectLockConfiguration.duration());
```
可以在控制台查看是否开启对象锁定，及保留模式设置的策略及保留天数。
![image-20220723140224863](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723140224863.png)

#### 2.4.9 删除配置

minio提供了一些列的delete方法用于删除配置，比较简单，就不距离说明了。

1. 删除桶的加密配置
  ```java
  private void deleteBucketEncryption(DeleteBucketEncryptionArgs args)
  ```
2. 删除存储桶的生命周期配置
  ```java
  private void deleteBucketLifecycle(DeleteBucketLifecycleArgs args)
  ```
3. 删除桶的标签
  ```java
  private void deleteBucketTags(DeleteBucketTagsArgs args)
  ```
4. 删除桶的桶策略配置
  ```java
  private void deleteBucketPolicy(DeleteBucketPolicyArgs args)
  ```
5. 删除存储桶的存储桶复制配置
  ```java
  private void deleteBucketReplication(DeleteBucketReplicationArgs args)
  ```
6. 删除桶的通知配置
  ```java
  public void deleteBucketNotification(DeleteBucketNotificationArgs args)
  ```
7. 删除存储桶中的对象锁定配置
  ```java
  public void deleteObjectLockConfiguration(DeleteObjectLockConfigurationArgs args)
  ```

## 参考文章

[JAVA集成Minio之存储桶操作API使用详解](https://yunyanchengyu.blog.csdn.net/article/details/120841843)