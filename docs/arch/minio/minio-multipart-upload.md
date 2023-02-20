---
order: 220
category:
  - Minio
---

# Minio进阶 - Minio分片上传文件putObject接口流程源码分析

## 1. 前言

为了更好的理解和优化Minio文件上传，本篇文档对MInio中上传文件putObject接口源码分析以下。

基于Java 客户端 API

Controller层上传文件接口：

```java
@PostMapping("/upload")
@ResponseBody
public Object upload(MultipartFile file, String bucketName) throws IOException {
    return minioTemplate.putObject(file.getInputStream(), bucketName, file.getOriginalFilename());
}
```
MinioTemplate接口：

```java
        minioClient.putObject(
                PutObjectArgs.builder().bucket(bucketName).object(uuidFileName).stream(
                        inputStream, inputStream.available(), -1)
                        .build());
```
## 2. 源码分析

### 2.1 进入Controller层接口

首先我在页面上上传了一个9M左右的文件：

![image-20220724200722531](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724200722531.png)

文件上传，经过Tomcat服务器进行处理，然后到达我们的Controller层上传文件接口，我们使用的是MultipartFile 对象来接受文件，可以看到当前MultipartFile 对象存放了文件相关信息，而此时实际的文件是由Tomcat存放在硬盘临时目录的。

MultipartFile实际的对象是StandardMultipartHttpServletRequest的实例，他包含了ApplicationPart对象，ApplicationPart包含了图片中的文件信息。
![image-20220724200830484](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724200830484.png)

接收到对象后，调用的就是MinioTemplate，这里传入了各种参数：

```java
minioTemplate.putObject(file.getInputStream(), bucketName, file.getOriginalFilename());
```

最重要的是传入了一个InputStream，调用的是MultipartFile 对象的getInputStream()方法。

getInputStream获取输入流，是调用ApplicationPart中的DiskFileItem对象的getInputStream()方法。这个方法会将临时文件，直接转为FileInputStream并返回。

```java
 public InputStream getInputStream() throws IOException {
        if (!this.isInMemory()) {
        	// 直接将临时文件转为输入流
            return new FileInputStream(this.dfos.getFile());
        } else {
            if (this.cachedContent == null) {
                this.cachedContent = this.dfos.getData();
            }

            return new ByteArrayInputStream(this.cachedContent);
        }
    }
```

### 2.2 构建参数对象PutObjectArgs（参数校验，分片）

InputStream获取到了以后，接着就是调用MinioTemplate中的putObject方法了。

```java
     minioClient.putObject(
             PutObjectArgs.builder().bucket(bucketName).object(uuidFileName).stream(
                     inputStream, inputStream.available(), -1)
                     .build());
```

putObject方法实际调用的就是 MinioClient的putObject，调用之前会创建PutObjectArgs参数对象，使用的是建造者模式。

PutObjectArgs首先会对存储桶名称进行校验，所以创建存储桶名称时，要格外注意。

```java
    protected void validateBucketName(String name) {
    	// 非空校验
        this.validateNotNull(name, "bucket name");
        // 1. 校验长度，3-63之间
        if (name.length() >= 3 && name.length() <= 63) {
            String msg;
            // 2. 不能包含“..”
            if (name.contains("..")) {
                msg = "bucket name cannot contain successive periods. For more information refer http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html";
                throw new IllegalArgumentException(name + " : " + msg);
                // 3. 正则校验
            } else if (!name.matches("^[a-z0-9][a-z0-9\\.\\-]+[a-z0-9]$")) {
                msg = "bucket name does not follow Amazon S3 standards. For more information refer http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html";
                throw new IllegalArgumentException(name + " : " + msg);
            }
        } else {
            throw new IllegalArgumentException(name + " : bucket name must be at least 3 and no more than 63 characters long");
        }
    }
```
然后对对象名称进行校验：

```java
    protected void validateObjectName(String name) {
    	// 1. 非空和Null校验
        this.validateNotEmptyString(name, "object name");
        String[] var2 = name.split("/"); // 按照反斜杠分割为字符串数组
        int var3 = var2.length;
		//  2. 循环字符串数组，校验每个斜杠分割的字段不能是“.”或者“..”
        for(int var4 = 0; var4 < var3; ++var4) {
            String token = var2[var4];
            if (token.equals(".") || token.equals("..")) {
                throw new IllegalArgumentException("object name with '.' or '..' path segment is not supported");
            }
        }
    }
```
最后对InputStream进行构建。

```java
    public PutObjectArgs.Builder stream(InputStream stream, long objectSize, long partSize) {			
        // 1. 非空
        this.validateNotNull(stream, "stream");
        // 2. 获取分片数，5M分割
        long[] partinfo = this.getPartInfo(objectSize, partSize);
        long pSize = partinfo[0]; // 分片大小 5M=5242880字节
        int pCount = (int)partinfo[1]; // 分片数，这里上传的9m文件，所以有两片
        // 3. 将FileInputStream=》BufferedInputStream
        BufferedInputStream bis = stream instanceof BufferedInputStream ? (BufferedInputStream)stream : new BufferedInputStream(stream);
        // 4. 将这些参数添加到PutObjectArgs对象中
        return this.setStream(bis, objectSize, pSize, pCount);
    }
```
在构建InputStream时，会进行分片操作，我们可以了解到上传文件大小的一些限制：

- 分片大小不能小于5MB，大于5GB
- 对象大小不能超过5TiB
- partSize传入-1，默认按照5MB进行分割
- 分片数量不能超过10000

分片规则如下：

```java
	// 参数为 文件大小objectSize、分片大小partSize，分片数我们传入的是-1，表示使用默认配置
    protected long[] getPartInfo(long objectSize, long partSize) {
    	// 1. 校验大小，如果设置的分片大小 小于5M或者大于5GB，报错不支持
    	//  对象大小超过5TiB，报错不支持
        this.validateSizes(objectSize, partSize);
        if (objectSize < 0L) {
            return new long[]{partSize, -1L};
        } else {
        	// 2. 没有设置分片数据大小，怎按照默认的5M进行分割
            if (partSize <= 0L) {
                double dPartSize = Math.ceil((double)objectSize / 10000.0D);
                dPartSize = Math.ceil(dPartSize / 5242880.0D) * 5242880.0D;
                partSize = (long)dPartSize;
            }
            if (partSize > objectSize) {
                partSize = objectSize;
            }

            long partCount = partSize > 0L ? (long)Math.ceil((double)objectSize / (double)partSize) : 1L;
            // 3. 分片数量不能超过10000
            if (partCount > 10000L) {
                throw new IllegalArgumentException("object size " + objectSize + " and part size " + partSize + " make more than " + 10000 + "parts for upload");
            } else {
            	// 4. 返回一个数组，第一个值为分片数据大小，第二个为分片数量
                return new long[]{partSize, partCount};
            }
        }
    }
```
最终构建的PutObjectArgs对象如下：

![image-20220724201355357](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724201355357.png)

该对象包含了文件流、对象名、分片信息等重要数据。

### 2.3 进入MinioClient（上传分片、合并）

接着进入到MinioClient的putObject方法：

```java
 public ObjectWriteResponse putObject(PutObjectArgs args) throws ErrorResponseException, InsufficientDataException, InternalException, InvalidKeyException, InvalidResponseException, IOException, NoSuchAlgorithmException, ServerException, XmlParserException {
 	// 1. 检查参数是否为Null
     this.checkArgs(args);
     // 2. 校验是否开启了SSE加密，如果开启了SSE，而不是Https请求则报错
     args.validateSse(this.baseUrl);
     // 3. 执行上传文件
     return this.putObject(args, args.stream(), args.objectSize(), args.partSize(), args.partCount(), args.contentType());
 }
```

接着调用重载的putObject方法，会进行分块创建=》分块上传=》合并文件流程操作。

```java
protected ObjectWriteResponse putObject(PutObjectBaseArgs args, Object data, long objectSize, long partSize, int partCount, String contentType) throws ErrorResponseException, InsufficientDataException, InternalException, InvalidKeyException, InvalidResponseException, IOException, NoSuchAlgorithmException, ServerException, XmlParserException {
	// 1.设置消息头
    Multimap<String, String> headers = this.newMultimap(args.extraHeaders());
    headers.putAll(args.genHeaders());
    // 2. 设置 Content-Type
    if (!headers.containsKey("Content-Type")) {
        headers.put("Content-Type", contentType);
    }
    String uploadId = null;
    Part[] parts = null;
    // 3. 创建块读取对象
    PartReader partReader = this.newPartReader(data, objectSize, partSize, partCount);
    if (partReader == null) {
        throw new IllegalArgumentException("data must be RandomAccessFile or InputStream");
    } else {
        try {
            while(true) {
            	// 4. 分块操作，并返回块对象
                PartSource partSource = partReader.getPart(!this.baseUrl.isHttps());
                if (partSource == null) {
                	// 没有分片时，表示分片全部上传成功，执行合并文件操作。
                    return this.completeMultipartUpload(args.bucket(), args.region(), args.object(), uploadId, parts, (Multimap)null, (Multimap)null);
                }
				// 5. 如果对象只有一块，也就是5MB之内，执行上传
                if (partReader.partCount() == 1) {
                    return this.putObject(args.bucket(), args.region(), args.object(), partSource, headers, args.extraQueryParams());
                }
				
                if (uploadId == null) {
                	// 6. 执行分块上传请求，返回uploadId
                    CreateMultipartUploadResponse response = this.createMultipartUpload(args.bucket(), args.region(), args.object(), headers, args.extraQueryParams());
                    uploadId = response.result().uploadId();
                    parts = new Part[10000];
                }

                Map<String, String> ssecHeaders = null;
                if (args.sse() != null && args.sse() instanceof ServerSideEncryptionCustomerKey) {
                    ssecHeaders = args.sse().headers();
                }
				// 7. 根据创建的请求，正式执行上传分片的操作
                int partNumber = partSource.partNumber();
                UploadPartResponse response = this.uploadPart(args.bucket(), args.region(), args.object(), partSource, partNumber, uploadId, ssecHeaders != null ? Multimaps.forMap(ssecHeaders) : null, (Multimap)null);
                String etag = response.etag();
                parts[partNumber - 1] = new Part(partNumber, etag);
            }
        } catch (RuntimeException var18) {
            if (uploadId != null) {
                this.abortMultipartUpload(args.bucket(), args.region(), args.object(), uploadId, (Multimap)null, (Multimap)null);
            }

            throw var18;
        } catch (Exception var19) {
            if (uploadId != null) {
                this.abortMultipartUpload(args.bucket(), args.region(), args.object(), uploadId, (Multimap)null, (Multimap)null);
            }

            throw var19;
        }
    }
}
```
### 2.4 创建分片

putObject方法首先会创建PartReader 块读取对象：

```java
 private PartReader newPartReader(Object data, long objectSize, long partSize, int partCount) {		
 	// 1. 如果是RandomAccessFile（RandomAccessFile允许自由定义文件记录指针，
 	// RandomAccessFile可以不从开始的地方开始输出，因此RandomAccessFile可以向已存在的文件后追加内容。）
 	// 创建RandomAccessFile类型的PartReader 
     if (data instanceof RandomAccessFile) {
         return new PartReader((RandomAccessFile)data, objectSize, partSize, partCount);
     } else {
     	// 2. 创建不同输入流的PartReader 对象
         return data instanceof InputStream ? new PartReader((InputStream)data, objectSize, partSize, partCount) : null;
     }
 }
```

PartReader 包含了文件数据流及分片信息。

![image-20220724201815010](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724201815010.png)

接着进入一个死循环，PartReader 会获取PartSource块对象：

```java
    public PartSource getPart(boolean computeSha256) throws NoSuchAlgorithmException, IOException {
        if (this.partNumber == this.partCount) {
            return null;
        } else {
        	// 1. 获取分片，从第一个开始获取
            ++this.partNumber;
            MessageDigest md5 = MessageDigest.getInstance("MD5"); // MD5 加密对象
            MessageDigest sha256 = computeSha256 ? MessageDigest.getInstance("SHA-256") : null; // SHA-256加密对象
            long partSize = this.partSize; // 分片大小 5MB
            if (this.partNumber == this.partCount) { // 判断当前分片是不是最后一个分片
                partSize = this.objectSize - this.totalDataRead;
            }
			// 2. 使用算法读取分块数据
            long bytesRead = this.read(partSize, md5, sha256);
            this.totalDataRead += bytesRead;
            if (this.objectSize < 0L && this.eof) {
                this.partCount = this.partNumber;
            }
			// 3. 加密
            String md5Hash = Base64.getEncoder().encodeToString(md5.digest());
            String sha256Hash = null;
            if (computeSha256) {
                sha256Hash = BaseEncoding.base16().encode(sha256.digest()).toLowerCase(Locale.US);
            }
			// 4. 返回PartSource对象
            return this.file != null ? new PartSource(this.partNumber, this.file, bytesRead, md5Hash, sha256Hash) : new PartSource(this.partNumber, this.buffers, bytesRead, md5Hash, sha256Hash);
        }
    }

```

每个PartSource对象，就对应一个块对象，其中包含了块数据和加密返回的签名。

![image-20220724201918590](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724201918590.png)

### 2.5. 创建分片请求（获取uploadId）

createMultipartUpload方法会创建分块请求，根据对象名和存储桶名去Minio获取上传当前对象的uploadId。

```java
    protected CreateMultipartUploadResponse createMultipartUpload(String bucketName, String region, String objectName, Multimap<String, String> headers, Multimap<String, String> extraQueryParams) throws NoSuchAlgorithmException, InsufficientDataException, IOException, InvalidKeyException, ServerException, XmlParserException, ErrorResponseException, InternalException, InvalidResponseException {
    	// 构建请求参数
        Multimap<String, String> queryParams = this.newMultimap(extraQueryParams);
        queryParams.put("uploads", "");
        Multimap<String, String> headersCopy = this.newMultimap(headers);
        if (!headersCopy.containsKey("Content-Type")) {
            headersCopy.put("Content-Type", "application/octet-stream");
        }
		// 执行HTTP请求
        Response response = this.execute(Method.POST, bucketName, objectName, this.getRegion(bucketName, region), this.httpHeaders(headersCopy), queryParams, (Object)null, 0);
        Throwable var9 = null;

        CreateMultipartUploadResponse var11;
        try {
        	// 解析返回结果
            InitiateMultipartUploadResult result = (InitiateMultipartUploadResult)Xml.unmarshal(InitiateMultipartUploadResult.class, response.body().charStream());
            var11 = new CreateMultipartUploadResponse(response.headers(), bucketName, region, objectName, result);
        }

```

uploadId在循环中使用的都是同一个，说明分片上传的时候都会使用同一个uploadId，最后合并同一个uploadId的文件。

![image-20220724202032288](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724202032288.png)

### 2.6 上传分片

获取到了uploadId以后，就会执行上传操作，调用uploadPart方法，uploadPart最终也是调用execute，可以看到该方法，是调用的OkHttpClient 去执行的。

```java
    protected Response execute(Method method, String bucketName, String objectName, String region, Headers headers, Multimap<String, String> queryParamMap, Object body, int length) throws XmlParserException {
    	//......
        // 构建URL ：http://127.0.0.1:9000/pearl-buckent/files/2021-10-26/d9e9d6fc-73fc-4323-b317-b8b26b6b6fe0_apache-maven-3.6.2-bin.zip?uploadId=70174335-85ec-47c6-acaf-afa12c8add48&partNumber=2
        HttpUrl url = this.buildUrl(method, bucketName, objectName, region, queryParamMap);
        // 省略构建其他对象
        // 调用 httpClient执行上传文件
        Response response = httpClient.newCall(request).execute();
        // 处理响应，异常处理等。
        ResponseBody responseBody;
        if (response.isSuccessful()) {
           
 					// 省略大量代码.....
            }
        }
    }

```

### 2.7 合并文件

分片的数据都上传后，进入到completeMultipartUpload方法，在这个方法执行之前，在Minio控制台是看不到上传对象的。

![image-20220724202212381](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724202212381.png)

这个方法传入了文件对象名，uploadID等，

![image-20220724202251788](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724202251788.png)

该方法最终也是执行的execute，使用httpclient去调用的Minio服务器合并分片，最后完成了分片上传操作。之后Tomcat回调，完成清理临时文件等操作，最后返回信息给前端，也对应了整个Servlet请求响应的整个流程。

![image-20220724202351886](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724202351886.png)

## 3. 简单流程图

![image-20220724202421408](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220724202421408.png)