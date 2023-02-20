# AWS S3兼容性

>参考阿里云官方文档，两个都差不多

>之前一直疑惑什么是AWS S3,还是个Restful API. 但我从始至终压根没有感知。其实是因为我们都使用的是minio 客户端。他的minio 服务端提供的是S3 接口，minio client 封装了s3 的http 请求

## 1. OSS兼容的S3 API

OSS对S3 Bucket、Object以及Multipart操作兼容的API如下：

| 操作类型      | API                                                          |
| :------------ | :----------------------------------------------------------- |
| Bucket操作    | PutBucket <br /> DeleteBucket<br /> GetBucket <br /> GetBucketACL<br /> GetBucketLifecycle<br /> GetBucketLocation<br /> GetBucketLogging<br /> HeadBucket<br /> PutBucketACL<br /> PutBucketLifecycle<br /> PutBucketLogging |
| Object操作    | DeleteObject <br /> DeleteObjects<br /> GetObject<br /> GetObjectACL<br /> HeadObject<br /> PostObject<br /> PutObject<br /> PutObjectCopy<br /> PutObjectACL |
| Multipart操作 | InitiateMultipartUpload<br /> AbortMultipartUpload<br /> CompleteMultipartUpload<br /> ListParts<br /> UploadPart<br /> UploadPartCopy |

## OSS与S3的差异

这块minio 与S3区别待补充

## 参考文章

[AWS S3兼容性](https://help.aliyun.com/document_detail/389025.html)