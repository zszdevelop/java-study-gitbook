---
order: 230
category:
  - Minio
---

# Minio进阶 - Minio+vue-uploader 分片上传方案及案例详解

## 1. 前言

我们之前分析过Minio 的上传接口源码，其是进行了分块，再上传分块到Minio 服务器，最后再对块进行合并。

针对大文件的上传，如果采用上传到文件服务，再上传到Minio，其效率是非常低的，首先上传到文件服务（会存放在Tomcat 临时目录）就已经比较慢了。

针对大文件的上传，我们需要一个优化方案。

### 1.1 优化方案

![image-20220724203557314](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724203557314.png)

1. 前端服务进行大文件分片处理，将分片信息传递给文件服务，文件服务返回所有分片的上传链接及uploadId。
2. 前端服务直接请求Minio 服务器，并发上传分片
3. 所有分片上传完成后，使用uploadId 调用文件服务进行文件合并

## 2. 案例

本案例基于[Spring Boot集成Minio](https://blog.csdn.net/qq_43437874/article/details/120920171)

### 2.1 后端获取分片上传URL

在Minio 的上传接口源码中，创建分片请求的方法是`protected` 关键字修饰的，无法通过创建`MinioClient`对象来访问，那么只能通过子类继承来访问了。

![image-20220724203729888](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724203729888.png)

首先自定义一个Minio 客户端类，继承MinioClient类，其作用主要是将以下几个方法暴露出来，以便调用：

- createMultipartUpload：创建分片请求，返回uploadId
- listMultipart：查询分片信息
- completeMultipartUpload：根据uploadId 合并已上传的分片

```java
public class PearlMinioClient extends MinioClient {

    protected PearlMinioClient(MinioClient client) {
        super(client);
    }

    /**
     * 创建分片上传请求
     *
     * @param bucketName       存储桶
     * @param region           区域
     * @param objectName       对象名
     * @param headers          消息头
     * @param extraQueryParams 额外查询参数
     */
    @Override
    public CreateMultipartUploadResponse createMultipartUpload(String bucketName, String region, String objectName, Multimap<String, String> headers, Multimap<String, String> extraQueryParams) throws NoSuchAlgorithmException, InsufficientDataException, IOException, InvalidKeyException, ServerException, XmlParserException, ErrorResponseException, InternalException, InvalidResponseException {
        return super.createMultipartUpload(bucketName, region, objectName, headers, extraQueryParams);
    }

    /**
     * 完成分片上传，执行合并文件
     *
     * @param bucketName       存储桶
     * @param region           区域
     * @param objectName       对象名
     * @param uploadId         上传ID
     * @param parts            分片
     * @param extraHeaders     额外消息头
     * @param extraQueryParams 额外查询参数
     */
    @Override
    public ObjectWriteResponse completeMultipartUpload(String bucketName, String region, String objectName, String uploadId, Part[] parts, Multimap<String, String> extraHeaders, Multimap<String, String> extraQueryParams) throws NoSuchAlgorithmException, InsufficientDataException, IOException, InvalidKeyException, ServerException, XmlParserException, ErrorResponseException, InternalException, InvalidResponseException {
        return super.completeMultipartUpload(bucketName, region, objectName, uploadId, parts, extraHeaders, extraQueryParams);
    }
    
    /**
     * 查询分片数据
     *
     * @param bucketName       存储桶
     * @param region           区域
     * @param objectName       对象名
     * @param uploadId         上传ID
     * @param extraHeaders     额外消息头
     * @param extraQueryParams 额外查询参数
     */
    public ListPartsResponse listMultipart(String bucketName, String region, String objectName, Integer maxParts, Integer partNumberMarker, String uploadId, Multimap<String, String> extraHeaders, Multimap<String, String> extraQueryParams) throws NoSuchAlgorithmException, InsufficientDataException, IOException, InvalidKeyException, ServerException, XmlParserException, ErrorResponseException, InternalException, InvalidResponseException {
        return super.listParts(bucketName, region, objectName, maxParts, partNumberMarker, uploadId, extraHeaders, extraQueryParams);
    }
}

```

在配置类中注入我们的自定义客户端：

```java
@Bean
@SneakyThrows
@ConditionalOnMissingBean(PearlMinioClient.class)
public PearlMinioClient minioClient(OssProperties ossProperties) {
    MinioClient minioClient = MinioClient.builder()
            .endpoint(ossProperties.getEndpoint())
            .credentials(ossProperties.getAccessKey(), ossProperties.getSecretKey())
            .build();
    return new PearlMinioClient(minioClient);
}
```
在模板类MinioTemplate中，将之前的MinIO 客户端换成PearlMinioClient。并将上面关于分片的几个操作方法集成进来。

```java
@Slf4j
@AllArgsConstructor
public class MinioTemplate {

    /**
     * MinIO 客户端
     */
    PearlMinioClient pearlMinioClient;

    /**
     * MinIO 配置类
     */
    OssProperties ossProperties;

    /**
     * 查询所有存储桶
     *
     * @return Bucket 集合
     */
    @SneakyThrows
    public List<Bucket> listBuckets() {
        return pearlMinioClient.listBuckets();
    }

    /**
     * 桶是否存在
     *
     * @param bucketName 桶名
     * @return 是否存在
     */
    @SneakyThrows
    public boolean bucketExists(String bucketName) {
        return pearlMinioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
    }

    /**
     * 创建存储桶
     *
     * @param bucketName 桶名
     */
    @SneakyThrows
    public void makeBucket(String bucketName) {
        if (!bucketExists(bucketName)) {
            pearlMinioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());

        }
    }

    /**
     * 删除一个空桶 如果存储桶存在对象不为空时，删除会报错。
     *
     * @param bucketName 桶名
     */
    @SneakyThrows
    public void removeBucket(String bucketName) {
        pearlMinioClient.removeBucket(RemoveBucketArgs.builder().bucket(bucketName).build());
    }

    /**
     * 上传文件
     *
     * @param inputStream      流
     * @param originalFileName 原始文件名
     * @param bucketName       桶名
     * @return OssFile
     */
    @SneakyThrows
    public OssFile putObject(InputStream inputStream, String bucketName, String originalFileName) {
        String uuidFileName = generateOssUuidFileName(originalFileName);
        try {
            if (StrUtil.isEmpty(bucketName)) {
                bucketName = ossProperties.getDefaultBucketName();
            }
            pearlMinioClient.putObject(
                    PutObjectArgs.builder().bucket(bucketName).object(uuidFileName).stream(
                            inputStream, inputStream.available(), -1)
                            .build());
            return new OssFile(uuidFileName, originalFileName);
        } finally {
            if (inputStream != null) {
                inputStream.close();
            }
        }
    }

    /**
     * 返回临时带签名、过期时间一天、Get请求方式的访问URL
     *
     * @param bucketName  桶名
     * @param ossFilePath Oss文件路径
     * @return
     */
    @SneakyThrows
    public String getPresignedObjectUrl(String bucketName, String ossFilePath,Map<String, String> queryParams) {
        return pearlMinioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .method(Method.PUT)
                        .bucket(bucketName)
                        .object(ossFilePath)
                        .expiry(60 * 60 * 24)
                        .extraQueryParams(queryParams)
                        .build());
    }



    /**
     * GetObject接口用于获取某个文件（Object）。此操作需要对此Object具有读权限。
     *
     * @param bucketName  桶名
     * @param ossFilePath Oss文件路径
     */
    @SneakyThrows
    public InputStream getObject(String bucketName, String ossFilePath) {
        return pearlMinioClient.getObject(
                GetObjectArgs.builder().bucket(bucketName).object(ossFilePath).build());
    }

    /**
     * 查询桶的对象信息
     *
     * @param bucketName 桶名
     * @param recursive  是否递归查询
     * @return
     */
    @SneakyThrows
    public Iterable<Result<Item>> listObjects(String bucketName, boolean recursive) {
        return pearlMinioClient.listObjects(
                ListObjectsArgs.builder().bucket("my-bucketname").recursive(recursive).build());
    }
    /**
     * 获取带签名的临时上传元数据对象，前端可获取后，直接上传到Minio
     *
     * @param bucketName
     * @param fileName
     * @return
     */
    @SneakyThrows
    public Map<String, String> getPresignedPostFormData(String bucketName, String fileName) {
        // 为存储桶创建一个上传策略，过期时间为7天
        PostPolicy policy = new PostPolicy(bucketName, ZonedDateTime.now().plusDays(1));
        // 设置一个参数key，值为上传对象的名称
        policy.addEqualsCondition("key", fileName);
        // 添加Content-Type，例如以"image/"开头，表示只能上传照片，这里吃吃所有
        policy.addStartsWithCondition("Content-Type", MediaType.ALL_VALUE);
        // 设置上传文件的大小 64kiB to 10MiB.
        //policy.addContentLengthRangeCondition(64 * 1024, 10 * 1024 * 1024);
        return pearlMinioClient.getPresignedPostFormData(policy);
    }

    /**
     *  上传分片上传请求，返回uploadId
     */
    public CreateMultipartUploadResponse uploadId(String bucketName, String region, String objectName, Multimap<String, String> headers, Multimap<String, String> extraQueryParams) throws NoSuchAlgorithmException, InsufficientDataException, IOException, InvalidKeyException, ServerException, XmlParserException, ErrorResponseException, InternalException, InvalidResponseException {
        return pearlMinioClient.createMultipartUpload(bucketName, region, objectName, headers, extraQueryParams);
    }

    /**
     * 完成分片上传，执行合并文件
     *
     * @param bucketName       存储桶
     * @param region           区域
     * @param objectName       对象名
     * @param uploadId         上传ID
     * @param parts            分片
     * @param extraHeaders     额外消息头
     * @param extraQueryParams 额外查询参数
     */
    public ObjectWriteResponse completeMultipartUpload(String bucketName, String region, String objectName, String uploadId, Part[] parts, Multimap<String, String> extraHeaders, Multimap<String, String> extraQueryParams) throws NoSuchAlgorithmException, InsufficientDataException, IOException, InvalidKeyException, ServerException, XmlParserException, ErrorResponseException, InternalException, InvalidResponseException {
        return pearlMinioClient.completeMultipartUpload(bucketName, region, objectName, uploadId, parts, extraHeaders, extraQueryParams);
    }

    public String generateOssUuidFileName(String originalFilename) {
        return "files" + StrUtil.SLASH + DateUtil.format(new Date(), "yyyy-MM-dd") + StrUtil.SLASH + UUID.randomUUID() + StrUtil.UNDERLINE + originalFilename;
    }

    /**
     * 初始化默认存储桶
     */
    @PostConstruct
    public void initDefaultBucket() {
        String defaultBucketName = ossProperties.getDefaultBucketName();
        if (bucketExists(defaultBucketName)) {
            log.info("默认存储桶：defaultBucketName已存在");
        } else {
            log.info("创建默认存储桶：defaultBucketName");
            makeBucket(ossProperties.getDefaultBucketName());
        }
        ;
    }

    /**
     * 查询分片数据
     *
     * @param bucketName       存储桶
     * @param region           区域
     * @param objectName       对象名
     * @param uploadId         上传ID
     * @param extraHeaders     额外消息头
     * @param extraQueryParams 额外查询参数
     */
    public ListPartsResponse listMultipart(String bucketName, String region, String objectName, Integer maxParts, Integer partNumberMarker, String uploadId, Multimap<String, String> extraHeaders, Multimap<String, String> extraQueryParams) throws NoSuchAlgorithmException, InsufficientDataException, IOException, InvalidKeyException, ServerException, XmlParserException, ErrorResponseException, InternalException, InvalidResponseException {
        return pearlMinioClient.listMultipart(bucketName, region, objectName, maxParts, partNumberMarker, uploadId, extraHeaders, extraQueryParams);
    }
}

```

接下来就是创建请求了，返回一个Map 集合，实际开发应该封装为响应对象。这里主要是接受分片数量，然后为每一个分块，创建一个带签名的上传URL。

```java
    /**
     * 返回分片上传需要的签名数据URL及 uploadId
     *
     * @param bucketName
     * @param fileName
     * @return
     */
    @GetMapping("/createMultipartUpload")
    @SneakyThrows
    @ResponseBody
    public Map<String, Object> createMultipartUpload(String bucketName, String fileName, Integer chunkSize) {
        // 1. 根据文件名创建签名
        Map<String, Object> result = new HashMap<>();
        // 2. 获取uploadId
        CreateMultipartUploadResponse response = minioTemplate.uploadId(bucketName, null, fileName, null, null);
        String uploadId = response.result().uploadId();
        result.put("uploadId", uploadId);
        // 3. 请求Minio 服务，获取每个分块带签名的上传URL
        Map<String, String> reqParams = new HashMap<>();
        reqParams.put("uploadId", uploadId);
        List<String> partList = new ArrayList<>();
        // 4. 循环分块数 从1开始
        for (int i = 1; i <= chunkSize; i++) {
            reqParams.put("partNumber", String.valueOf(i));
            String uploadUrl = minioTemplate.getPresignedObjectUrl(bucketName, fileName, reqParams);// 获取URL
            result.put("chunk_" + (i - 1), uploadUrl); // 添加到集合
        }
        return result;
    }


```

### 2.2. 前端执行分片上传

前端依然是采用`vue-uploader`，首先在文件添加的事件中，后台请求创建分片URL 上传接口，并将`uploadId`、每个分块的上传链接设置到`file.chunkUrlData`属性中：

```java
    onFileAdded(file) {
      console.log('文件被添加：' + file.name);
      this.panelShow = true;
      // 计算MD5
      // this.computeMD5(file, this.options.chunkSize);
      // 获取分块上传链接
      // eslint-disable-next-line no-unused-vars
      var res = this.getChunkUploadUrl(file);
      console.log('文件被添加查看是否获取到分块URL');
      console.log(file.chunkUrlData);
    },
    async getChunkUploadUrl(file) {
      // 向具有指定ID的用户发出请求
      console.log(file);
      console.log('获取分块上传链接');
      const fileName = file.name; // 文件名
      const chunkSize = file.chunks.length; // 分片数
      // 请求后台返回每个分块的上传链接
      // eslint-disable-next-line no-unused-vars
      const res = await this.$http.get('/file/createMultipartUpload', {
        params: {
          fileName: fileName,
          chunkSize: chunkSize,
          bucketName: 'pearl-buckent'
        }
      })
        .then(function (response) {
          console.log('获取到的uploadId:' + response.data.uploadId);
          console.log('获取到的分片上传集合URL:');
          console.log(response.data);
          file.chunkUrlData = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

```

在options中，我们首先要设置以下几个重要选项：

动态的target，因为每个分块的上传路径都是不一样的，所以要从file.chunkUrlData取出当前分块的URL
分块大小chunkSize，Minio 默认是5MB，我们这里也是用这个大小
查询参数query，因为每个分块上传时都需要一个partNumber参数，可以通过这个query函数来进行传递
其他兼容Minio分片上传配置，详情见注释

```js
      options: {

        // 目标上传 URL，可以是字符串也可以是函数，如果是函数的话，则会传入 Uploader.File 实例、
        // 当前块 Uploader.Chunk 以及是否是测试模式，默认值为 '/'
        target: function (file, chunkFile, mode) {
          // 分块上传前每次都会进入到该方法
          console.log('进入到target');
          console.log('文件名：' + file.name);
          console.log('当前分块序号' + chunkFile.offset);
          console.log('获取到分块上传URL：');
          console.log(file.chunkUrlData);
          const key = 'chunk_' + chunkFile.offset;// 键值 用于获取分块链接URL
          return file.chunkUrlData[key];
        },
        // 为每个块向服务器发出 GET 请求，以查看它是否已经存在。如果在服务器端实现，
        // 这将允许在浏览器崩溃甚至计算机重新启动后继续上传。(默认: true)
        testChunks: false,
        // 分块时按照该值来分。最后一个上传块的大小是可能是大于等于1倍的这个值但是小于两倍的这个值大小，
        // 可见这个 Issue #51，默认 1*1024*1024。
        chunkSize: 5 * 1024 * 1024,
        // 强制所有块小于或等于 chunkSize。否则，最后一个块将大于或等于chunkSize。(默认: false)
        forceChunkSize: true,
        // 包含在带有数据的多部分 POST 中的额外参数。这可以是一个对象或一个函数。如果是一个函数，
        // 它将被传递一个 Uploader.File、一个 Uploader.Chunk 对象和一个 isTest 布尔值（默认值{}：）
        query: function (file, chunkFile, mode) {
          const data = {'partNumber': chunkFile.offset + 1};
          return data;
        },
        uploadMethod: 'PUT',
        //  当上传的时候所使用的是方式，可选 multipart、octet，默认 multipart，参考 multipart vs octet。
        // MiniO 的分片不能使用表单
        method: 'octet',
        //  处理请求参数，默认 function (params) {return params}，一般用于修改参数名字或者删除参数。0.5.2版本后，
        // Minio的连接后面不能拼接参数，所以设置为空
        processParams: function (params) { return {}; }
        // headers: {
        //  'Content-Type': 'binary/octet-stream'
        // }
      },

```

### 2.3. 合并文件

后台提供一个文件合并的接口，根据`uploadId`去查询分块信息，然后进行合并操作：

```java
    /**
     * 分片上传完后合并
     *
     * @param objectName 文件全路径名称
     * @param uploadId   返回的uploadId
     * @return /
     */
    @GetMapping("/completeMultipartUpload")
    @SneakyThrows
    @ResponseBody
    public boolean completeMultipartUpload(String bucketName,String objectName, String uploadId) {
        try {
            Part[] parts = new Part[10000];
            ListPartsResponse partResult = minioTemplate.listMultipart("pearl-buckent", null, objectName, 1000, 0, uploadId, null, null);
            int partNumber = 1;
            System.err.println(partResult.result().partList().size() + "========================");
            for (Part part : partResult.result().partList()) {
                parts[partNumber - 1] = new Part(partNumber, part.etag());
                partNumber++;
            }
            minioTemplate.completeMultipartUpload("pearl-buckent", null, objectName, uploadId, parts, null, null);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

```

前端代码中，我们在文件上传成功事件中调用后台合并接口：

```js
// 单个文件上传成功
onFileSuccess(rootFile, file, message) {
  console.log('单个文件上传成功', arguments);
  // 调用后台合并文件
  const fileName = file.name; // 文件名
  const uploadId = file.chunkUrlData.uploadId; // 分片数
  console.log();
  this.$http.get('/file/completeMultipartUpload', {
    params: {
      objectName: fileName,
      uploadId: uploadId,
      bucketName: 'pearl-buckent'
    }
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log('合并完成');
}
```

### 2.4. 测试

首先添加一个文件，可以看到打印了`uploadId`和每个分块上传的URL：

![image-20220724204550517](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724204550517.png)

点击开始按钮，可以看到多个分片的[并发](https://so.csdn.net/so/search?q=并发&spm=1001.2101.3001.7020)请求，最后调用了合并文件接口，并返回了true。

![image-20220724204612100](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724204612100.png)

查看Minio 控制台，可以看到文件大小都一致。

![image-20220724204641755](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724204641755.png)

下载上传的文件，进行播放，发现一切正常，说明基本上就实现该功能了，可能还会有其他小问题，就需要开发时进行严格的测试并修改了。

## 参考文章

[Minio入门系列【18】Minio+vue-uploader 分片上传方案及案例详解（源码文尾附上）](https://yunyanchengyu.blog.csdn.net/article/details/123429986)