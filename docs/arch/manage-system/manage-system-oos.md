---
order: 1010
category:
  - 后台管理
---



# 后台管理 - OSS对象存储适配

## 1. 流程

### 1.1 通过ApplicationRunner 在项目启动的时候、初始化

1. 从数据库中取出中存储状态正常的oos配置、并设置到redis中
2. 通过redis 的发布订阅、通知其他服务器刷新配置
3. 初始化OSS工厂、实例化OssClient

```java
@Slf4j
@RequiredArgsConstructor
@Component
public class ResourceApplicationRunner implements ApplicationRunner {

    private final ISysOssConfigService ossConfigService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        ossConfigService.init();
        log.info("初始化OSS配置成功");
    }

}
```

```java
 /**
     * 项目启动时，初始化参数到缓存，加载配置类
     */
    @Override
    public void init() {
        List<SysOssConfig> list = baseMapper.selectList();
        // 加载OSS初始化配置
        for (SysOssConfig config : list) {
            String configKey = config.getConfigKey();
            if ("0".equals(config.getStatus())) {
                RedisUtils.setCacheObject(OssConstant.DEFAULT_CONFIG_KEY, configKey);
            }
            setConfigCache(true, config);
        }
        // 初始化OSS工厂
        OssFactory.init();
    }

 /**
     * 如果操作成功 则更新缓存
     *
     * @param flag   操作状态
     * @param config 配置
     * @return 返回操作状态
     */
    private boolean setConfigCache(boolean flag, SysOssConfig config) {
        if (flag) {
            CacheUtils.put(CacheNames.SYS_OSS_CONFIG, config.getConfigKey(), JsonUtils.toJsonString(config));
            RedisUtils.publish(OssConstant.DEFAULT_CONFIG_KEY, config.getConfigKey(), msg -> {
                log.info("发布刷新OSS配置 => " + msg);
            });
        }
        return flag;
    }
```

```java
@Slf4j
public class OssFactory {

    private static final Map<String, OssClient> CLIENT_CACHE = new ConcurrentHashMap<>();

    /**
     * 初始化工厂
     */
    public static void init() {
        log.info("初始化OSS工厂");
        RedisUtils.subscribe(OssConstant.DEFAULT_CONFIG_KEY, String.class, configKey -> {
            OssClient client = getClient(configKey);
            // 未初始化不处理
            if (client != null) {
                refresh(configKey);
                log.info("订阅刷新OSS配置 => " + configKey);
            }
        });
    }
  
    private static void refresh(String configKey) {
        String json = CacheUtils.get(CacheNames.SYS_OSS_CONFIG, configKey);
        if (json == null) {
            throw new OssException("系统异常, '" + configKey + "'配置信息不存在!");
        }
        OssProperties properties = JsonUtils.parseObject(json, OssProperties.class);
        CLIENT_CACHE.put(configKey, new OssClient(configKey, properties));
    }
}

```

创建OssClient,创建桶与响应的协议

```java
public OssClient(String configKey, OssProperties ossProperties) {
    this.configKey = configKey;
    this.properties = ossProperties;
    try {
        AwsClientBuilder.EndpointConfiguration endpointConfig =
            new AwsClientBuilder.EndpointConfiguration(properties.getEndpoint(), properties.getRegion());

        AWSCredentials credentials = new BasicAWSCredentials(properties.getAccessKey(), properties.getSecretKey());
        AWSCredentialsProvider credentialsProvider = new AWSStaticCredentialsProvider(credentials);
        ClientConfiguration clientConfig = new ClientConfiguration();
        if (OssConstant.IS_HTTPS.equals(properties.getIsHttps())) {
            clientConfig.setProtocol(Protocol.HTTPS);
        } else {
            clientConfig.setProtocol(Protocol.HTTP);
        }
        AmazonS3ClientBuilder build = AmazonS3Client.builder()
            .withEndpointConfiguration(endpointConfig)
            .withClientConfiguration(clientConfig)
            .withCredentials(credentialsProvider)
            .disableChunkedEncoding();
        if (!StringUtils.containsAny(properties.getEndpoint(), OssConstant.CLOUD_SERVICE)){
            // minio 使用https限制使用域名访问 需要此配置 站点填域名
            build.enablePathStyleAccess();
        }
        this.client = build.build();

        createBucket();
    } catch (Exception e) {
        if (e instanceof OssException) {
            throw e;
        }
        throw new OssException("配置错误! 请检查系统配置:[" + e.getMessage() + "]");
    }
}

public void createBucket() {
    try {
        String bucketName = properties.getBucketName();
        if (client.doesBucketExistV2(bucketName)) {
            return;
        }
        CreateBucketRequest createBucketRequest = new CreateBucketRequest(bucketName);
        AccessPolicyType accessPolicy = getAccessPolicy();
        createBucketRequest.setCannedAcl(accessPolicy.getAcl());
        client.createBucket(createBucketRequest);
        client.setBucketPolicy(bucketName, getPolicy(bucketName, accessPolicy.getPolicyType()));
    } catch (Exception e) {
        throw new OssException("创建Bucket失败, 请核对配置信息:[" + e.getMessage() + "]");
    }
}


    /**
     * 获取当前桶权限类型
     *
     * @return 当前桶权限类型code
     */
    public AccessPolicyType getAccessPolicy() {
        return AccessPolicyType.getByType(properties.getAccessPolicy());
    }


    private static String getPolicy(String bucketName, PolicyType policyType) {
        StringBuilder builder = new StringBuilder();
        builder.append("{\n\"Statement\": [\n{\n\"Action\": [\n");
        if (policyType == PolicyType.WRITE) {
            builder.append("\"s3:GetBucketLocation\",\n\"s3:ListBucketMultipartUploads\"\n");
        } else if (policyType == PolicyType.READ_WRITE) {
            builder.append("\"s3:GetBucketLocation\",\n\"s3:ListBucket\",\n\"s3:ListBucketMultipartUploads\"\n");
        } else {
            builder.append("\"s3:GetBucketLocation\"\n");
        }
        builder.append("],\n\"Effect\": \"Allow\",\n\"Principal\": \"*\",\n\"Resource\": \"arn:aws:s3:::");
        builder.append(bucketName);
        builder.append("\"\n},\n");
        if (policyType == PolicyType.READ) {
            builder.append("{\n\"Action\": [\n\"s3:ListBucket\"\n],\n\"Effect\": \"Deny\",\n\"Principal\": \"*\",\n\"Resource\": \"arn:aws:s3:::");
            builder.append(bucketName);
            builder.append("\"\n},\n");
        }
        builder.append("{\n\"Action\": ");
        switch (policyType) {
            case WRITE:
                builder.append("[\n\"s3:AbortMultipartUpload\",\n\"s3:DeleteObject\",\n\"s3:ListMultipartUploadParts\",\n\"s3:PutObject\"\n],\n");
                break;
            case READ_WRITE:
                builder.append("[\n\"s3:AbortMultipartUpload\",\n\"s3:DeleteObject\",\n\"s3:GetObject\",\n\"s3:ListMultipartUploadParts\",\n\"s3:PutObject\"\n],\n");
                break;
            default:
                builder.append("\"s3:GetObject\",\n");
                break;
        }
        builder.append("\"Effect\": \"Allow\",\n\"Principal\": \"*\",\n\"Resource\": \"arn:aws:s3:::");
        builder.append(bucketName);
        builder.append("/*\"\n}\n],\n\"Version\": \"2012-10-17\"\n}\n");
        return builder.toString();
    }
```

### 1.2 上传文件

1. 上传oss
2. 保存文件信息到数据库
3. 返回文件简单VO

```java
/**
 * 文件服务
 *
 */
public interface RemoteFileService {

    /**
     * 上传文件
     *
     * @param file 文件信息
     * @return 结果
     */
    SysFile upload(String name, String originalFilename, String contentType, byte[] file) throws ServiceException;
}
```

```java
@Slf4j
@Service
@DubboService
public class RemoteFileServiceImpl implements RemoteFileService {

    @Autowired
    private SysOssMapper sysOssMapper;

    /**
     * 文件上传请求
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public SysFile upload(String name, String originalFilename, String contentType, byte[] file) throws ServiceException {
        try {
            String suffix = StringUtils.substring(originalFilename, originalFilename.lastIndexOf("."), originalFilename.length());
            OssClient storage = OssFactory.instance();
            UploadResult uploadResult = storage.uploadSuffix(file, suffix, contentType);
            // 保存文件信息
            SysOss oss = new SysOss();
            oss.setUrl(uploadResult.getUrl());
            oss.setFileSuffix(suffix);
            oss.setFileName(uploadResult.getFilename());
            oss.setOriginalName(originalFilename);
            oss.setService(storage.getConfigKey());
            sysOssMapper.insert(oss);
            SysFile sysFile = new SysFile();
            sysFile.setOssId(oss.getOssId());
            sysFile.setName(uploadResult.getFilename());
            sysFile.setUrl(uploadResult.getUrl());
            return sysFile;
        } catch (Exception e) {
            log.error("上传文件失败", e);
            throw new ServiceException("上传文件失败");
        }
    }

}

```

### 1.3 查询资源

如果是私有资源、需要对资源设置临时访问权限

```java
@Override
public TableDataInfo<SysOssVo> queryPageList(SysOssBo bo, PageQuery pageQuery) {
    LambdaQueryWrapper<SysOss> lqw = buildQueryWrapper(bo);
    Page<SysOssVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
    List<SysOssVo> filterResult = result.getRecords().stream().map(this::matchingUrl).collect(Collectors.toList());
    result.setRecords(filterResult);
    return TableDataInfo.build(result);
}
```

```java
/**
 * 匹配Url
 *
 * @param oss OSS对象
 * @return oss 匹配Url的OSS对象
 */
private SysOssVo matchingUrl(SysOssVo oss) {
    OssClient storage = OssFactory.instance(oss.getService());
    // 仅修改桶类型为 private 的URL，临时URL时长为120s
    if (AccessPolicyType.PRIVATE == storage.getAccessPolicy()) {
        oss.setUrl(storage.getPrivateUrl(oss.getFileName(), 120));
    }
    return oss;
}
```

```java
public String getPrivateUrl(String objectKey, Integer second) {
    GeneratePresignedUrlRequest generatePresignedUrlRequest =
        new GeneratePresignedUrlRequest(properties.getBucketName(), objectKey)
            .withMethod(HttpMethod.GET)
            .withExpiration(new Date(System.currentTimeMillis() + 1000L * second));
    URL url = client.generatePresignedUrl(generatePresignedUrlRequest);
    return url.toString();
}
```

