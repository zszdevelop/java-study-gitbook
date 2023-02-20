---
order: 110
category:
  - Minio
---

# Minio基础 - JAVA集成Minio之对象操作API使用详解

## 1. 上传对象

### 1.1 PutObject

调用PutObject接口上传文件（Object）。

```java
public ObjectWriteResponse putObject(PutObjectArgs args)
```

注意事项：

- 添加的Object大小不能超过5 GB。
- 默认情况下，如果已存在同名Object且对该Object有访问权限，则新添加的Object将覆盖原有的Object，并返回200 OK。

- OSS没有文件夹的概念，所有资源都是以文件来存储，但您可以通过创建一个以正斜线（/）结尾，大小为0的Object来创建模拟文件夹。

- 单个对象的最大大小限制在5TB。**putObject在对象大于5MiB时，自动使用multiple parts方式上传**。这样，当上传失败时，客户端只需要上传未成功的部分即可（类似断点上传）。上传的对象使用MD5SUM签名进行完整性验证。

  ![image-20220724170305247](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724170305247.png)

#### 1.1.1 示例1，InputStream上传：

```java
        // 1. 创建InputStream上传
        File file = new File("D:\\deploy\\nacos-server-2.0.3.tar.gz");
        InputStream bais = new FileInputStream(file);
        long start = System.currentTimeMillis();
        minioClient.putObject(
                PutObjectArgs.builder().bucket("my-bucketname").object(file.getName()).stream(
                        bais, bais.available(), -1)
                        .build());
        bais.close();
        System.out.println("my-objectname is uploaded successfully 耗时：" + (System.currentTimeMillis() - start));
```
#### 1.1.2 示例2，InputStream使用SSE-C加密上传（在使用KMS时再介绍）：

```java
        minioClient.putObject(
                PutObjectArgs.builder().bucket("my-bucketname").object(file.getName()).stream(
                        bais, bais.available(), -1)
                        .sse(ssec)
                        .build());
        bais.close();
```
#### 1.1.3 示例3，InputStream上传文件，添加自定义元数据及消息头：

```java
        File file = new File("D:\\deploy\\nacos-server-2.0.3.tar.gz");
        InputStream bais = new FileInputStream(file);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/octet-stream");
        headers.put("X-Amz-Storage-Class", "REDUCED_REDUNDANCY");
        Map<String, String> userMetadata = new HashMap<>();
        minioClient.putObject(
                PutObjectArgs.builder().bucket("my-bucketname").object(file.name).stream(
                        bais, bais.available(), -1)
                        .headers(headers)
                        .userMetadata(userMetadata)
                        .build());
        bais.close();
        System.out.println("my-objectname is uploaded successfully");
```
### 1.2 uploadObject

将文件中的内容作为存储桶中的对象上传。

```java
public void uploadObject(UploadObjectArgs args)
```

示例：

```java
// 3. 将本地文件上传到minio 
            minioClient.uploadObject(
                    UploadObjectArgs.builder()
                            .bucket("my-bucketname")
                            .object("start.sh")
                            .filename("D:\\deploy\\service\\general-task\\start.sh")
                            .build());
            System.out.println("my-filename is uploaded to my-objectname successfully");

```

## 2. 获取对象

### 2.1 getObject

GetObject接口用于获取某个文件（Object）。此操作需要对此Object具有读权限。

获取对象的数据。InputStream使用后返回必须关闭以释放网络资源。

```java
public InputStream getObject(GetObjectArgs args)
```

```java
  // 2. 获取对象的InputStream,并保存为文件
            InputStream stream =
                    minioClient.getObject(
                            GetObjectArgs.builder().bucket("my-bucketname").object("my-objectname").build());
            // 读流
            File targetFile = new File("D:\\deploy\\targetFile.tmp");
            FileUtils.copyInputStreamToFile(stream, targetFile);
            stream.close();
```

### 2.2 downloadObject

将对象的数据下载到文件。

```java
public void downloadObject(DownloadObjectArgs args) 
```

示例：

```java
// 4. 下载对象到本地文件
            minioClient.downloadObject(
                    DownloadObjectArgs.builder()
                            .bucket("my-bucketname")
                            .object("my-objectname")
                            .filename("D:\\deploy\\service\\general-task\\aaa.tmp")
                            .build());
            System.out.println("my-objectname is successfully downloaded to my-filename");

```

### 2.3 getPresignedObjectUrl

获取一个指定了 HTTP 方法、到期时间和自定义请求参数的对象URL地址，也就是返回带签名的URL，这个地址可以提供给没有登录的第三方共享访问或者上传对象。

```java
public String getPresignedObjectUrl(GetPresignedObjectUrlArgs args) 
```


示例：

```java
// 指定一个GET请求，返回获取文件对象的URL，此URL过期时间为一天
String url =
                    minioClient.getPresignedObjectUrl(
                            GetPresignedObjectUrlArgs.builder()
                                    .method(Method.GET)
                                    .bucket("my-bucketname")
                                    .object("start.sh")
                                    .expiry(60 * 60 * 24)
                                    .build());
            System.out.println(url);
```

### 2.4 selectObjectContent

通过 SQL 表达式选择对象的内容。

```
public SelectResponseStream selectObjectContent(SelectObjectContentArgs args)
```

示例：

```java
        // 1. 上传一个文件
        byte[] data =
                ("Year,Make,Model,Description,Price\n"
                        + "1997,Ford,E350,\"ac, abs, moon\",3000.00\n"
                        + "1999,Chevy,\"Venture \"\"Extended Edition\"\"\",\"\",4900.00\n"
                        + "1999,Chevy,\"Venture \"\"Extended Edition, Very Large\"\"\",,5000.00\n"
                        + "1996,Jeep,Grand Cherokee,\"MUST SELL!\n"
                        + "air, moon roof, loaded\",4799.00\n")
                        .getBytes(StandardCharsets.UTF_8);
        ByteArrayInputStream bais = new ByteArrayInputStream(data);
        minioClient.putObject(
                PutObjectArgs.builder().bucket("my-bucketname").object("my-objectname").stream(
                        bais, data.length, -1)
                        .build());
        // 调用SQL表达式获取对象
        String sqlExpression = "select * from S3Object";
        InputSerialization is =
                new InputSerialization(null, false, null, null, FileHeaderInfo.USE, null, null, null);
        OutputSerialization os =
                new OutputSerialization(null, null, null, QuoteFields.ASNEEDED, null);

        SelectResponseStream stream =
                minioClient.selectObjectContent(
                        SelectObjectContentArgs.builder()
                                .bucket("my-bucketname")
                                .object("my-objectName")
                                .sqlExpression(sqlExpression)
                                .inputSerialization(is)
                                .outputSerialization(os)
                                .requestProgress(true)
                                .build());

        byte[] buf = new byte[512];
        int bytesRead = stream.read(buf, 0, buf.length);
        System.out.println(new String(buf, 0, bytesRead, StandardCharsets.UTF_8));
        Stats stats = stream.stats();
        System.out.println("bytes scanned: " + stats.bytesScanned());
        System.out.println("bytes processed: " + stats.bytesProcessed());
        System.out.println("bytes returned: " + stats.bytesReturned());
        stream.close();
```
### 2.5 getPresignedPostFormData

使用此方法，获取对象的上传策略（包含签名、文件信息、路径等），然后使用这些信息采用POST 方法的表单数据上传数据。也就是可以生成一个临时上传的信息对象，第三方可以使用这些信息，就可以上传文件。

一般可用于，前端请求一个上传策略，后端返回给前端，前端使用Post请求+访问策略去上传文件，这可以用于JS+SDK的混合方式集成Minio。


![image-20220723204551259](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723204551259.png)

```java
public Map<String,String> getPresignedPostFormData(PostPolicy policy)
```

示例，首先我们创建一个Post 策略：


```java
        // 为存储桶创建一个上传策略，过期时间为7天
        PostPolicy policy = new PostPolicy("my-bucketname", ZonedDateTime.now().plusDays(7));
        // 设置一个参数key，值为上传对象的名称
        policy.addEqualsCondition("key", "my-objectname");
        // 添加Content-Type以"image/"开头，表示只能上传照片
        policy.addStartsWithCondition("Content-Type", "image/");
        // 设置上传文件的大小 64kiB to 10MiB.
        policy.addContentLengthRangeCondition(64 * 1024, 10 * 1024 * 1024);
        Map<String, String> formData = minioClient.getPresignedPostFormData(policy);
```
可以看到返回了认证令牌、签名等信息。
![image-20220723204729442](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723204729442.png)

然后，第三方就可以使用这些策略，直接使用POST上传对象。

```java
        // 创建MultipartBody对象
        MultipartBody.Builder multipartBuilder = new MultipartBody.Builder();
        multipartBuilder.setType(MultipartBody.FORM);
        for (Map.Entry<String, String> entry : formData.entrySet()) {
            multipartBuilder.addFormDataPart(entry.getKey(), entry.getValue());
        }
        multipartBuilder.addFormDataPart("key", "my-objectname");
        multipartBuilder.addFormDataPart("Content-Type", "image/png");
        multipartBuilder.addFormDataPart(
                "file", "my-objectname", RequestBody.create(new File("D:\\deploy\\service\\general-task\\logs\\aa.png"), null));
        // 模拟第三方，使用OkHttp调用Post上传对象
        Request request =
                new Request.Builder()
                        .url("http://localhost:9000/my-bucketname")
                        .post(multipartBuilder.build())
                        .build();
        OkHttpClient httpClient = new OkHttpClient().newBuilder().build();
        Response response = httpClient.newCall(request).execute();
        if (response.isSuccessful()) {
            System.out.println("Pictures/avatar.png is uploaded successfully using POST object");
        } else {
            System.out.println("Failed to upload Pictures/avatar.png");
        }
```
## 3. 复制对象

### 3.1 copyObject

通过服务器端从另一个对象复制数据来创建一个对象。

```java
public ObjectWriteResponse copyObject(CopyObjectArgs args)
```

示例：

```java
        // 5. 将my-bucketname中的aa.tmp文件，复制到aaaaa桶下的bb.tmp对象
        minioClient.copyObject(
                CopyObjectArgs.builder()
                        .bucket("aaaaa")
                        .object("bb.tmp")
                        .source(
                                CopySource.builder()
                                        .bucket("my-bucketname")
                                        .object("aa.tmp")
                                        .build())
                        .build());
        System.out.println("successfully");
```
## 4 删除对象

### 4.1 removeObject

移除一个对象。

```
public void removeObject(RemoveObjectArgs args) 
```

示例：

```java
		// 6. 删除单个对象
        minioClient.removeObject(
                RemoveObjectArgs.builder().bucket("my-bucketname").object("my-objectname").build());
        // 删除指定版本号的对象
        minioClient.removeObject(
                RemoveObjectArgs.builder()
                        .bucket("my-bucketname")
                        .object("my-versioned-objectname")
                        .versionId("my-versionid")
                        .build());
```
### 4.2 removeObjects

懒惰地删除多个对象。它需要迭代返回的 Iterable 以执行删除。

```java
public Iterable<Result<DeleteError>> removeObjects(RemoveObjectsArgs args) 
```

示例：

```java
 // 7. 删除多个文件
            List<DeleteObject> objects = new LinkedList<>();
            objects.add(new DeleteObject("aa.tmp"));
            objects.add(new DeleteObject("my-objectname"));
            objects.add(new DeleteObject("nacos-server-2.0.3.tar.gz"));
            Iterable<Result<DeleteError>> results =
                    minioClient.removeObjects(
                            RemoveObjectsArgs.builder().bucket("my-bucketname").objects(objects).build());
            for (Result<DeleteError> result : results) {
                DeleteError error = result.get();
                System.out.println(
                        "Error in deleting object " + error.objectName() + "; " + error.message());
            }
```

## 5. 对象信息查询及设置

### 5.1 桶的对象信息列表

listObjects列出桶的对象信息。

```java
public Iterable<Result<Item>> listObjects(ListObjectsArgs args)
```

示例1，查询存储桶下文件信息：

```java
        // 8. 查询存储桶下文件信息
        Iterable<Result<Item>> results =
                minioClient.listObjects(ListObjectsArgs.builder().bucket("my-bucketname").build());
        for (Result<Item> result : results) {
            Item item = result.get();
            System.out.println(item.lastModified() + "\t" + item.size() + "\t" + item.objectName());
        }
```
示例2，递归查询存储桶下文件信息：

```java
// 条件查询，指定前缀、后缀、最大数量
            Iterable<Result<Item>> results =
                    minioClient.listObjects(
                            ListObjectsArgs.builder()
                                    .bucket("my-bucketname")
                                    .startAfter("ExampleGuide.pdf")
                                    .prefix("E")
                                    .maxKeys(100)
                                    .build());

            for (Result<Item> result : results) {
                Item item = result.get();
                System.out.println(item.lastModified() + "\t" + item.size() + "\t" + item.objectName());
            }
```

### 5.2 保留配置

获取对象的保留配置。

```java
public Retention getObjectRetention(GetObjectRetentionArgs args) 
```

示例：

```java
        // 获取对象保留配置
        Retention retention =
                minioClient.getObjectRetention(
                        GetObjectRetentionArgs.builder()
                                .bucket("my-bucketname-in-eu-with-object-lock")
                                .object("k3s-arm64")
                                .build());

        System.out.println("Mode: " + retention.mode());
        System.out.println("Retainuntil Date: " + retention.retainUntilDate());
```
添加对象的保留配置，存储桶需要设置为对象锁定模式，并且没有开启版本控制，否则会报错收蠕虫保护。

```java
public void setObjectLockRetention(SetObjectRetentionArgs)
```

```java
  // 对象保留配置，保留至当前日期后3天。
            ZonedDateTime retentionUntil = ZonedDateTime.now(Time.UTC).plusDays(3).withNano(0);
            Retention retention1 = new Retention(RetentionMode.COMPLIANCE, retentionUntil);
            minioClient.setObjectRetention(
                    SetObjectRetentionArgs.builder()
                            .bucket("my-bucketname-in-eu-with-object-lock")
                            .object("k3s-arm64")
                            .config(retention1)
                            .bypassGovernanceMode(true)
                            .build());
```

### 5.3 标签

为对象设置标签。

```java
public void setObjectTags(SetObjectTagsArgs args)
```

示例：

```java
Map<String, String> map = new HashMap<>();
            map.put("Project", "Project One");
            map.put("User", "jsmith");
            minioClient.setObjectTags(
                    SetObjectTagsArgs.builder()
                            .bucket("my-bucketname")
                            .object("my-objectname")
                            .tags(map)
                            .build());
```

获取对象的标签。

```java
public Tags getObjectTags(GetObjectTagsArgs args) 
```

示例：

```java
Tags tags = minioClient.getObjectTags(
                            GetObjectTagsArgs.builder().bucket("my-bucketname").object("my-objectname").build());
System.out.println("Object tags: " + tags.get());
```


删除对象的标签。

```java
private void deleteObjectTags(DeleteObjectTagsArgs args)
```

示例：

```java
 minioClient.deleteObjectTags(
          DeleteObjectTagsArgs.builder().bucket("my-bucketname").object("my-objectname").build());
      System.out.println("Object tags deleted successfully");

```

### 5.4 合法保留对象

启用对对象的合法保留。

```java
public void enableObjectLegalHold(EnableObjectLegalHoldArgs args) 
```

案例：

```java
minioClient.enableObjectLegalHold(
          EnableObjectLegalHoldArgs.builder()
              .bucket("my-bucketname")
              .object("my-objectname")
              .versionId("object-versionId")
              .build());

      System.out.println("Legal hold enabled on object successfully ");
```

禁用对对象的合法保留

```java
public void disableObjectLegalHold(DisableObjectLegalHoldArgs args)
```

示例：

```java
minioClient.disableObjectLegalHold(
          DisableObjectLegalHoldArgs.builder()
              .bucket("my-bucketname")
              .object("my-objectname")
              .build());
      System.out.println("Legal hold disabled on object successfully ");

```

### 5.5 组合对象

通过使用服务器端副本组合来自不同源对象的数据来创建对象，比如可以将文件分片上传，然后将他们合并为一个文件。

```java
public ObjectWriteResponse composeObject(ComposeObjectArgs args)
```

示例：

```java
List<ComposeSource> sources = new ArrayList<ComposeSource>();
        sources.add(
            ComposeSource.builder()
                .bucket("my-bucketname-one")
                .object("my-objectname-one")
                .build());
        sources.add(
            ComposeSource.builder()
                .bucket("my-bucketname-two")
                .object("my-objectname-two")
                .build());

        minioClient.composeObject(
            ComposeObjectArgs.builder()
                .bucket("my-destination-bucket")
                .object("my-destination-object")
                .sources(sources)
                .build());
        System.out.println("Object Composed successfully");

```

### 5.6 元数据

获取对象的对象信息和元数据。

```java
public ObjectStat statObject(StatObjectArgs args)
```

示例：

```java
        StatObjectResponse stat =
                minioClient.statObject(
                        StatObjectArgs.builder()
                                .bucket("my-bucketname")
                                .object("start.sh")
                                .build());
        System.out.println(stat.toString());
```

返回信息：

```java
ObjectStat{bucket=my-bucketname, object=start.sh, last-modified=2021-10-19T09:20:19Z, size=1030}
```

## 参考文章

[Minio入门系列【9】JAVA集成Minio之对象操作API使用详解](https://yunyanchengyu.blog.csdn.net/article/details/120849494)

