---
order: 310
category:
  - Spring
  - SpringBoot
---
# SpringBoot集成文件 - 基础的文件上传和下载

>项目中常见的功能是需要将数据文件（比如Excel,csv)上传到服务器端进行处理，亦或是将服务器端的数据以某种文件形式（比如excel,pdf,csv,word)下载到客户端。本文主要介绍基于SpringBoot的对常规文件的上传和下载，以及常见的问题等。

## 1. 知识准备

> 需要理解文件上传和下载的常见场景和技术手段。

### 1.1 哪些场景需要文件上传和下载

项目中常见的功能是需要将数据文件（比如Excel,csv)上传到服务器端进行处理，亦或是将服务器端的数据以某种文件形式（比如excel,pdf,csv,word)下载到客户端。

## 2. 实现案例

> 本例子主要展示文件的上传和文件的下载。

### 2.1 Pom依赖

引入spring-boot-starter-web即可

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

### 2.2 文件上传

上传一个文件，并保存到本地文件夹中

```java
@PostMapping("/upload")
public ResponseResult<String> upload(@RequestParam(value = "file", required = true) MultipartFile file) {
    try {
        // 本地文件保存位置
        String uploadPath = "/Users/pdai/uploadFile"; // 改这里
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }
        log.info(uploadDir.getAbsolutePath());

        // 本地文件
        File localFile = new File(uploadPath + File.separator + file.getOriginalFilename());

        // transfer to local
        file.transferTo(localFile);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseResult.fail(e.getMessage());
    }
    return ResponseResult.success();
}
```

通过postman，模拟上传的请求

![image-20220719221741423](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719221741423.png)

### 2.3 文件下载

从本地文件夹中读取文件，并通过http下载

```java
@GetMapping("/download")
public void download(HttpServletResponse response) {
    response.reset();
    response.setContentType("application/octet-stream");
    response.setHeader("Content-disposition",
            "attachment;filename=file_" + System.currentTimeMillis() + ".hprof");

    // 从文件读到servlet response输出流中
    File file = new File("/Users/pdai/pdai_heap_dump_test.hprof"); // 改这里
    try (FileInputStream inputStream = new FileInputStream(file);) { // try-with-resources
        byte[] b = new byte[1024];
        int len;
        while ((len = inputStream.read(b)) > 0) {
            response.getOutputStream().write(b, 0, len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}

  
```

下载文件

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719221833046.png" alt="image-20220719221833046"  />

注：

如果使用postman下载文件，默认的response大小是50MB，下载大于50MB的文件需要在这里自行设置。

![image-20220719221858304](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719221858304.png)

## 3. 进一步理解

> 通过如下几个问题进一步理解。

### 3.1 SpringBoot文件上传大小参数？

SpringBoot对上传的文件大小有限制，默认的最大每个文件配置最大为1MB，默认多个文件上传（上传目标文件夹）总大小是10MB。

```yml
spring:
  servlet:
    multipart:
      max-file-size: 1024MB # 单个文件大小
      max-request-size: 10240MB # 总文件大小（允许存储文件的文件夹大小）
```

更多其它的参数可以参看MultipartProperties类

```java
@ConfigurationProperties(prefix = "spring.servlet.multipart", ignoreUnknownFields = false)
public class MultipartProperties {

	/**
	 * Whether to enable support of multipart uploads.
	 */
	private boolean enabled = true;

	/**
	 * Intermediate location of uploaded files.
	 */
	private String location;

	/**
	 * Max file size.
	 */
	private DataSize maxFileSize = DataSize.ofMegabytes(1);

	/**
	 * Max request size.
	 */
	private DataSize maxRequestSize = DataSize.ofMegabytes(10);

	/**
	 * Threshold after which files are written to disk.
	 */
	private DataSize fileSizeThreshold = DataSize.ofBytes(0);

	/**
	 * Whether to resolve the multipart request lazily at the time of file or parameter
	 * access.
	 */
	private boolean resolveLazily = false;

}
```

### 3.2 多个文件上传？

Spring支持接收多个文件的，只需要用MultipartFile接收即可

```java
@PostMapping("/upload")
public ResponseResult<String> upload(MultipartFile[] files) {

}
```

## 参考文章

[**SpringBoot集成文件 - 基础的文件上传和下载**](https://pdai.tech/md/spring/springboot/springboot-x-file-upload-download.html)