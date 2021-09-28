# SpringBoot整合minio

## 1. 集成使用

### 1.1 添加依赖

```xml
<dependency>
<groupId>io.minio</groupId>
<artifactId>minio</artifactId>
<version>8.3.0</version>
</dependency>
<dependency>
<groupId>me.tongfei</groupId>
<artifactId>progressbar</artifactId>
<version>0.5.3</version>
</dependency>
<dependency>
<groupId>com.squareup.okhttp3</groupId>
<artifactId>okhttp</artifactId>
<version>4.8.1</version>
</dependency>
```

### 1.2 构建MinioClient对象，并交给spring管理

构建MinioClient对象，并交给spring管理

MinioProperties 类

```java
@Data
@Component
@ConfigurationProperties(prefix = "minio")
public class MinioProperties {
    
    private String endpoint;
    private String accessKey;
    private String secretKey;
}
```

yml 配置
```yml
minio:
	endpoint: http://localhost:9000
	accesskey: admin
	secretKey: 12345678
	bucketName: test
```

### 1.3 实现文件上传，下载，删除操作
