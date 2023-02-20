---
order: 210
category:
  - Minio
---

# Minio基础 - SpringBoot集成Minio

## 1. 前言

之前介绍了如何使用Minio提供的JAVA SDK进行上传和下载文件，在此基础上，我们可以使用spring boot集成Minio JAVA SDK，添加自动配置、装配、客户端管理等功能，简化开发。

## 2. Spring Boot集成Minio

### 2.1 环境搭建

首先我们搭建一个spring boot基础工程，引入以下依赖

```xml
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <!-- https://mvnrepository.com/artifact/io.minio/minio -->
        <dependency>
            <groupId>io.minio</groupId>
            <artifactId>minio</artifactId>
            <version>8.3.1</version>
        </dependency>
        <dependency>
            <groupId>me.tongfei</groupId>
            <artifactId>progressbar</artifactId>
            <version>0.9.2</version>
        </dependency>
        <dependency>
            <groupId>com.squareup.okhttp3</groupId>
            <artifactId>okhttp</artifactId>
            <version>4.9.2</version>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.7.13</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
        </dependency>
        <!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload -->
        <dependency>
            <groupId>commons-fileupload</groupId>
            <artifactId>commons-fileupload</artifactId>
            <version>1.4</version>
        </dependency>

```

### 2.2 操作模板类

在spring中，提供了很多集成第三方的操作模板类，比如RedisTemplate、RestTemplate等等，我们可以参照这些，提供一个minio SDK的集成模板类，这样在使用API时就比较方便了。

首先需要创建一个OSS文件对象，上传文件成功后，我们需要将文件信息返回给前端

```java
@Data
@AllArgsConstructor
public class OssFile {
    /**
     * OSS 存储时文件路径
     */
    String ossFilePath;
    /**
     * 原始文件名
     */
    String originalFileName;
}


```

接着创建了一个MinioTemplate，提供了系列对Minio API的集成。

```java
@Slf4j
@AllArgsConstructor
public class MinioTemplate {

    /**
     * MinIO 客户端
     */
    MinioClient minioClient;

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
        return minioClient.listBuckets();
    }

    /**
     * 桶是否存在
     *
     * @param bucketName 桶名
     * @return 是否存在
     */
    @SneakyThrows
    public boolean bucketExists(String bucketName) {
        return minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
    }

    /**
     * 创建存储桶
     *
     * @param bucketName 桶名
     */
    @SneakyThrows
    public void makeBucket(String bucketName) {
        if (!bucketExists(bucketName)) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());

        }
    }

    /**
     * 删除一个空桶 如果存储桶存在对象不为空时，删除会报错。
     *
     * @param bucketName 桶名
     */
    @SneakyThrows
    public void removeBucket(String bucketName) {
        minioClient.removeBucket(RemoveBucketArgs.builder().bucket(bucketName).build());
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
            minioClient.putObject(
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
    public String getPresignedObjectUrl(String bucketName, String ossFilePath) {
        return minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .method(Method.GET)
                        .bucket(bucketName)
                        .object(ossFilePath)
                        .expiry(60 * 60 * 24)
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
        return minioClient.getObject(
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
        return minioClient.listObjects(
                ListObjectsArgs.builder().bucket(bucketName).recursive(recursive).build());
    }

	/**
     * 生成随机文件名，防止重复
     *
     * @param originalFilename 原始文件名
     * @return 
     */
    public String generateOssUuidFileName(String originalFilename) {
        return "files" + StrUtil.SLASH + DateUtil.format(new Date(), "yyyy-MM-dd") + StrUtil.SLASH + UUID.randomUUID() + StrUtil.SLASH + originalFilename;
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
        PostPolicy policy = new PostPolicy(bucketName, ZonedDateTime.now().plusDays(7));
        // 设置一个参数key，值为上传对象的名称
        policy.addEqualsCondition("key", fileName);
        // 添加Content-Type以"image/"开头，表示只能上传照片
        policy.addStartsWithCondition("Content-Type", "image/");
        // 设置上传文件的大小 64kiB to 10MiB.
        policy.addContentLengthRangeCondition(64 * 1024, 10 * 1024 * 1024);
        return minioClient.getPresignedPostFormData(policy);
    }

    /**
     * 初始化默认存储桶
     */
    @PostConstruct
    public void initDefaultBucket() {
        String defaultBucketName = ossProperties.getDefaultBucketName();
        if (bucketExists(defaultBucketName)) {
            log.info("默认存储桶已存在");
        } else {
            log.info("创建默认存储桶");
            makeBucket(ossProperties.getDefaultBucketName());
        }
        ;
    }
}


```

### 2.3 自动配置

在了解了BAT公司提供的对象存储OSS后，发现其API接口标准都是差不多的，从扩展性的角度出发，我们当前服务应当支持各种类型的OSS，比如阿里、华为、腾讯等。所以这里先定义一个枚举类，提供除了Minio还适配其他厂商的支持。

```java
@Getter
@AllArgsConstructor
public enum OssType {
    /**
     * Minio 对象存储
     */
    MINIO("minio", 1),

    /**
     * 华为 OBS
     */
    OBS("obs", 2),

    /**
     * 腾讯 COS
     */
    COS("tencent", 3),

    /**
     * 阿里巴巴 SSO
     */
    ALIBABA("alibaba", 4),
    ;

    /**
     * 名称
     */
    final String name;
    /**
     * 类型
     */
    final int type;

}

```

创建OSS配置类，可以选择不同类型的OSS集成，以及集成需要的访问地址、用户密码等信息配置。

```java
@Data
@ConfigurationProperties(prefix = "oss")
public class OssProperties {

    /**
     * 是否开启
     */
    Boolean enabled;

    /**
     * 存储对象服务器类型
     */
    OssType type;

    /**
     * OSS 访问端点，集群时需提供统一入口
     */
    String endpoint;

    /**
     * 用户名
     */
    String accessKey;

    /**
     * 密码
     */
    String secretKey;

    /**
     * 默认存储桶名，没有指定时，会放在默认的存储桶
     */
    String defaultBucketName;
}


```

然后编译一下项目，将配置类转为spring-configuration-metadata.json文件，这样这些配置在yml中就有提示功能了。

![image-20220723232931077](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723232931077.png)

最后在根据我们配置的OSS类型，创建不同的自动配置类，这里创建的MinioConfiguration，主要是根据配置注入MinioClient及MinioTemplate模板类，将其交给Spring容器管理。

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass({MinioClient.class})
@EnableConfigurationProperties(OssProperties.class)
@ConditionalOnExpression("${oss.enabled}")
@ConditionalOnProperty(value = "oss.type", havingValue = "minio")
public class MinioConfiguration {


    @Bean
    @SneakyThrows
    @ConditionalOnMissingBean(MinioClient.class)
    public MinioClient minioClient(OssProperties ossProperties) {
        return MinioClient.builder()
                .endpoint(ossProperties.getEndpoint())
                .credentials(ossProperties.getAccessKey(), ossProperties.getSecretKey())
                .build();
    }

    @Bean
    @ConditionalOnBean({MinioClient.class})
    @ConditionalOnMissingBean(MinioTemplate.class)
    public MinioTemplate minioTemplate(MinioClient minioClient, OssProperties ossProperties) {
        return new MinioTemplate(minioClient, ossProperties);
    }
}

```

### 2.4 测试

首先，在yml中添加Minio的配置：

```
oss:
  enabled: true
  type: MINIO
  endpoint: http://127.0.0.1:9000
  access-key: admin
  secret-key: admin123
  default-bucket-name: pearl-buckent
```

然后创建一个访问接口，直接调用minioTemplate进行文件操作，这样就十分便利，达到了简化开发的目的。

```java
@Autowired
MinioTemplate minioTemplate;
@PostMapping("/upload")
@ResponseBody
public Object upload(MultipartFile file, String bucketName) throws IOException {
    return minioTemplate.putObject(file.getInputStream(), bucketName, file.getOriginalFilename());
}
```
## 参考文章

[Minio入门系列【12】Spring Boot集成Minio](https://yunyanchengyu.blog.csdn.net/article/details/120920171)