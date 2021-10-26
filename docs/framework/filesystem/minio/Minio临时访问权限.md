# Minio临时访问权限

## 1. 背景

我们为了数据的安全，例如我们前端的图片，其实只要用户拿到url 就可以访问了。我们需要做权限校验或生成一个临时权限

在minio 中使用share 共享来实现

## 2.  MC 客户端 share 命令-共享

share    生成用于共享的URL。

>`share`命令安全地授予上传或下载的权限。**此访问只是临时的，与远程用户和应用程序共享也是安全的**。如果你想授予永久访问权限，你可以看看`mc policy`命令。
>
>生成的网址中含有编码后的访问认证信息，任何企图篡改URL的行为都会使访问无效。想了解这种机制是如何工作的，请参考[Pre-Signed URL](http://docs.aws.amazon.com/AmazonS3/latest/dev/ShareObjectPreSignedURL.html)技术。

```
用法：
   mc share [FLAGS] COMMAND

FLAGS:
  --help, -h                       显示帮助。

COMMANDS:
   download   生成有下载权限的URL。
   upload     生成有上传权限的URL。
   list       列出先前共享的对象和文件夹。
```

### 2.1`share download` -  共享下载

`share download`命令生成不需要access key和secret key即可下载的URL，过期参数设置成最大有效期（不大于7天），过期之后权限自动回收。

```
Copy用法：
   mc share download [FLAGS] TARGET [TARGET...]

FLAGS:
  --help, -h                       显示帮助。
  --recursive, -r          递归共享所有对象。
  --expire, -E "168h"          设置过期时限，NN[h|m|s]。
```

*示例： 生成一个对一个对象有4小时访问权限的URL。*

```
mc share download --expire 4h play/mybucket/myobject.txt
URL: https://play.min.io/mybucket/myobject.txt
Expire: 0 days 4 hours 0 minutes 0 seconds
Share: https://play.min.io/mybucket/myobject.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Q3AM3UQ867SPQQA43P2F%2F20160408%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20160408T182008Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=1527fc8f21a3a7e39ce3c456907a10b389125047adc552bcd86630b9d459b634
```

### 2.2 `share upload` - 共享上传

`share upload`命令生成不需要access key和secret key即可上传的URL。过期参数设置成最大有效期（不大于7天），过期之后权限自动回收。 Content-type参数限制只允许上传指定类型的文件。

```
用法：
   mc share upload [FLAGS] TARGET [TARGET...]

FLAGS:
  --help, -h                       显示帮助。
  --recursive, -r              递归共享所有对象。
  --expire, -E "168h"          设置过期时限，NN[h|m|s].
```

*示例： 生成一个`curl`命令，赋予上传到`play/mybucket/myotherobject.txt`的权限。*

```
mc share upload play/mybucket/myotherobject.txt
URL: https://play.min.io/mybucket/myotherobject.txt
Expire: 7 days 0 hours 0 minutes 0 seconds
Share: curl https://play.min.io/mybucket -F x-amz-date=20160408T182356Z -F x-amz-signature=de343934bd0ba38bda0903813b5738f23dde67b4065ea2ec2e4e52f6389e51e1 -F bucket=mybucket -F policy=eyJleHBpcmF0aW9uIjoiMjAxNi0wNC0xNVQxODoyMzo1NS4wMDdaIiwiY29uZGl0aW9ucyI6W1siZXEiLCIkYnVja2V0IiwibXlidWNrZXQiXSxbImVxIiwiJGtleSIsIm15b3RoZXJvYmplY3QudHh0Il0sWyJlcSIsIiR4LWFtei1kYXRlIiwiMjAxNjA0MDhUMTgyMzU2WiJdLFsiZXEiLCIkeC1hbXotYWxnb3JpdGhtIiwiQVdTNC1ITUFDLVNIQTI1NiJdLFsiZXEiLCIkeC1hbXotY3JlZGVudGlhbCIsIlEzQU0zVVE4NjdTUFFRQTQzUDJGLzIwMTYwNDA4L3VzLWVhc3QtMS9zMy9hd3M0X3JlcXVlc3QiXV19 -F x-amz-algorithm=AWS4-HMAC-SHA256 -F x-amz-credential=Q3AM3UQ867SPQQA43P2F/20160408/us-east-1/s3/aws4_request -F key=myotherobject.txt -F file=@<FILE>
```

### 2.3 share list` - 列出之前的共享

`share list`列出没未过期的共享URL。

```
Copy用法：
   mc share list COMMAND

COMMAND:
   upload:   列出先前共享的有上传权限的URL。
   download: 列出先前共享的有下载权限的URL。
```

## 3. JavaSdk 方法getPresignedObjectUrl

获取对象的HTTP方法，到期时间和自定义请求参数的预签名URL。

```java
// Get presigned URL of an object for HTTP method, expiry time and custom request parameters.
String url =
    minioClient.getPresignedObjectUrl(
        GetPresignedObjectUrlArgs.builder()
            .method(Method.DELETE)
            .bucket("my-bucketname")
            .object("my-objectname")
            .expiry(24 * 60 * 60)
            .build());
System.out.println(url);

// Get presigned URL string to upload 'my-objectname' in 'my-bucketname' 
// with response-content-type as application/json and life time as one day.
Map<String, String> reqParams = new HashMap<String, String>();
reqParams.put("response-content-type", "application/json");

String url =
    minioClient.getPresignedObjectUrl(
        GetPresignedObjectUrlArgs.builder()
            .method(Method.PUT)
            .bucket("my-bucketname")
            .object("my-objectname")
            .expiry(1, TimeUnit.DAYS)
            .extraQueryParams(reqParams)
            .build());
System.out.println(url);

// Get presigned URL string to download 'my-objectname' in 'my-bucketname' and its life time
// is 2 hours.
String url =
    minioClient.getPresignedObjectUrl(
        GetPresignedObjectUrlArgs.builder()
            .method(Method.GET)
            .bucket("my-bucketname")
            .object("my-objectname")
            .expiry(2, TimeUnit.HOURS)
            .build());
System.out.println(url);
```

## 参考文章

[官网](https://docs.min.io/docs/java-client-api-reference.html)