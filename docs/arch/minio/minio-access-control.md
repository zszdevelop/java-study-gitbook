---
order: 70
category:
  - Minio
---

# Minio基础 - Minio之权限控制策略

## 1. 前言

>华为云OBS 和其他产商的OSS 都是一个东西，对象存储

>ACL(Access Control List ): 访问控制列表（ACL）

本段文章来源于华为云OBS，因为都是S3标准的对象存储，所以很多概念和Minio是相通的。

### 1.1 为什么要进行访问权限控制（华为OBS）

为保证存储在SSO中数据的安全性，SSO资源（桶和对象）默认为私有，只有资源拥有者可以访问。

![image-20220723215329125](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723215329125.png)

如果要允许他人访问和使用自己的SSO资源，可以设置访问权限控制策略，向他人授予指定资源的特定权限。

### 1.2 访问权限控制的典型场景（华为OBS）

![image-20220723215427075](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723215427075.png)

![image-20220723215435149](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723215435149.png)

![image-20220723215448794](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723215448794.png)

### 1.3 OBS如何进行访问权限控制（华为OBS）

OBS提供丰富灵活的访问权限控制手段，满足不同场景下的授权需求。

![image-20220723215518369](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723215518369.png)

## 2. IAM用户权限控制

>IAM是 Identity and Access Management 的缩写，即身份与访问管理，或称为身份管理与访问控制。

相对比阿里云SSO、华为云OBS，Minio权限及安全管理，没有提供特别多的功能，毕竟是开源的，但是对于一般应用程序，也够用了。

### 2.1 用户管理

#### 2.1.1 添加用户及权限

用户是权限最直接的体现，Minio提供了用户管理功能，可以在控制台直接添加用户密码（密码最少八位），及相关权限。

![image-20220723215838647](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723215838647.png)

#### 2.1.2 用户分组管理

如果每个用户都去绑定一个权限比较麻烦，minio提供了分组管理，也可以理解为角色，分组添加多个权限，然后用户添加到分组中，都可以具有多个权限了。

直接在下面菜单创建分组：

![image-20220723215919268](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723215919268.png)

添加分组时，可以绑定用户：

![image-20220723215939690](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723215939690.png)

点击操作，可以对当前分组添加多个角色：

![image-20220723220008424](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723220008424.png)

![image-20220723220020227](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723220020227.png)

### 2.2 IAM权限

默认情况下，管理员创建的IAM用户没有任何权限，需要将其加入用户组，并给用户组授予策略和角色，才能使得用户组中的用户获得策略定义的权限，这一过程称为授权。授权后，用户就可以基于被授予的权限对服务进行操作。

IAM权限作用于SSO所有的桶和对象。如果要授予IAM用户操作SSO资源的权限，则需要向IAM用户所属的用户组授予一个或多个SSO权限。

一般SSO根据授权精细程度分为角色和策略。

- 角色（Minio中貌似没有角色）：IAM最初提供的一种根据用户的工作职能定义权限的粗粒度授权机制。该机制以服务为粒度，提供有限的服务相关角色用于授权。由于华为云各服务之间存在业务依赖关系，因此给用户授予角色时，可能需要一并授予依赖的其他角色，才能正确完成业务。角色并不能满足用户对精细化授权的要求，无法完全达到企业对权限最小化的安全管控要求。
- 策略（minio中有）：IAM最新提供的一种细粒度授权的能力，可以精确到具体服务的操作、资源以及请求条件等。基于策略的授权是一种更加灵活的授权方式，能够满足企业对权限最小化的安全管控要求。例如：针对SSO服务，管理员能够控制IAM用户仅能对某一个桶资源进行指定的管理操作。多数细粒度策略以API接口为粒度进行权限拆分。

#### 2.2.1 策略结构&语法

策略结构包括：Version（策略版本号）和Statement（策略权限语句），其中Statement可以有多个，表示不同的授权项。

![image-20220723220938897](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723220938897.png)

S3标准策略语法（阿里华为SSO有点小改动，结构类似），示例：

```java
{
    "Sid": "DenyPublicReadACL",
    "Effect": "Deny",
    "Principal": {
        "AWS": "*"
    },
    "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl"
    ],
    "Resource": "arn:aws:s3:::examplebucket/*",
    "Condition": {
        "StringEquals": {
            "s3:x-amz-acl": [
                "public-read",
                "public-read-write",
                "authenticated-read"
            ]
        }
    }
}

```

以上表示，当所述请求包括以下访问控制列表（ACL）中的一个：public-read，public-read-write或authenticated-read，拒绝任何亚马逊S3在桶examplebucket中PutObject或PutObjectAcl请求。

策略语法参数：

| 参数      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| Version   | 标识策略的版本号，Minio中一般为"2012-10-17"                  |
| Statement | 策略授权语句，描述策略的详细信息，包含Effect（效果）、Action（动作）、Principal（用户）、Resource（资源）和Condition（条件）。其中Condition为可选 |
| Effect    | Effect（效果）作用包含两种：Allow（允许）和Deny（拒绝），系统预置策略仅包含允许的授权语句，自定义策略中可以同时包含允许和拒绝的授权语句，当策略中既有允许又有拒绝的授权语句时，遵循Deny优先的原则。 |
| Action    | Action（动作）对资源的具体操作权限，格式为：服务名:资源类型:操作，支持单个或多个操作权限，支持通配符号*，通配符号表示所有。例如 s3:GetObject ，表示获取对象 |
| Resource  | Resource（资源）策略所作用的资源，支持通配符号*，通配符号表示所有。在JSON视图中，不带Resource表示对所有资源生效。Resource支持以下字符：-_0-9a-zA-Z*./\，如果Resource中包含不支持的字符，请采用通配符号*。例如：arn:aws:s3:::my-bucketname/myobject*\，表示minio中my-bucketname/myobject目录下所有对象文件。 |
| Condition | Condition（条件）您可以在创建自定义策略时，通过Condition元素来控制策略何时生效。Condition包括条件键和运算符，条件键表示策略语句的Condition元素，分为全局级条件键和服务级条件键。全局级条件键（前缀为g:）适用于所有操作，服务级条件键（前缀为服务缩写，如obs:）仅适用于对应服务的操作。运算符与条件键一起使用，构成完整的条件判断语句。 |

#### 2.2.2 系统默认策略

AWS Identity and Access Management (IAM) 是一种 Web 服务，可以帮助您安全地控制对 AWS 资源的访问。您可以使用 IAM 控制对哪个用户进行身份验证 (登录) 和授权 (具有权限) 以使用资源。

默认存在5种IAM策略：

| 权限         | 解释         |
| ------------ | ------------ |
| consoleAdmin | 控制台管理员 |
| diagnostics  | 诊断         |
| readonly     | 只读         |
| readwrite    | 读写         |
| writeonly    | 只写         |

#### 2.2.3 自定义策略

我们可以通过控制台或者mc客户端添加策略，实际就是一个Json文件。

首先在控制台点击IAM策略，然后点击创建策略。

![image-20220723221412178](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723221412178.png)

填写策略名称，输入策略Json。

![image-20220723221434656](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723221434656.png)

策略Json文件内容如下：

- Allow表示允许操作
- Action表示对资源的具体操作权限，对对象操作，首先要操作存储桶，所以首先这里给了存储桶查询权限，然后给了上传和下载对象的权限
- Resource表示对test存储桶下的所有资源有限

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListAllMyBuckets",
                "s3:ListBucket",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:GetBucketLocation"
            ],
            "Resource": [
                "arn:aws:s3:::test/*"
            ]
        }
    ]
}
```

添加之后，可以查看到当前决策的内容信息，也可以修改Json文件。

![image-20220723221535166](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723221535166.png)

然后进入用户管理，选择用户后，再添加我们自定义的权限策略。

![image-20220723221901440](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723221901440.png)

**测试**：
使用当前用户账号创建客户端，然后直接读写操作，发现是正常具有权限的。

![image-20220723221920534](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723221920534.png)

然后去掉s3:PutObject，也就是上传文件的权限。

![image-20220723221941094](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723221941094.png)

在执行putObject时，返回403访问被拒绝，而getObject时则正常执行

![image-20220723221959046](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723221959046.png)

## 3. 桶策略

桶策略是作用于所配置的桶及桶内对象的。桶拥有者通过桶策略可为IAM用户或其他帐号授权桶及桶内对象的操作权限。

### 3.1 页面管理桶策略

#### 3.1.1 访问策略管理

存储桶的访问策略管理，是最大粒度的权限，可以设置私有或者公开。

点击存储桶的管理按钮，进入管理页面。

![image-20220723222415091](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723222415091.png)

然后可以在Summary中，看到当前桶的访问策略为私有Private。

![image-20220723222505048](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723222505048.png)

可以点击Private，弹出设置权限，可选的只有Private和Public。

![image-20220723222524252](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723222524252.png)

当选择私有时，未登录或者未授权访问文件，会出现以下未授权页面：

![image-20220723222551161](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723222551161.png)

当选择公开时，无需登录和授权可以直接访问文件：

![image-20220723222613339](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723222613339.png)

#### 3.1.2 访问规则管理

除了对存储桶大粒度的进行访问控制，页面上还支持对前缀粒度的访问控制。

比如我们主要只公开当前桶一部分共有访问，需要对另一部分进行访问控制，我们可以设置桶的策略为Plubic，然后设置某一目录下的文件只读或者只写。

首先点击添加访问规则按钮。

![image-20220723222714145](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723222714145.png)

然后添加访问前缀，访问规则。

![image-20220723222802171](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723222802171.png)

访问规则支持一下三种：

![image-20220723222822997](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723222822997.png)

### 3.2 后台管理桶策略

Minio也提供了API来管理桶策略，也是需要定义策略Json，然后调用API。

#### 3.2.1. 设置桶策略

API如下：

```java
public void setBucketPolicy(SetBucketPolicyArgs args)
```

示例：

```java
StringBuilder builder = new StringBuilder();
      builder.append("{\n");
      builder.append("    \"Statement\": [\n");
      builder.append("        {\n");
      builder.append("            \"Action\": [\n");
      builder.append("                \"s3:GetBucketLocation\",\n");
      builder.append("                \"s3:ListBucket\"\n");
      builder.append("            ],\n");
      builder.append("            \"Effect\": \"Allow\",\n");
      builder.append("            \"Principal\": \"*\",\n");
      builder.append("            \"Resource\": \"arn:aws:s3:::my-bucketname\"\n");
      builder.append("        },\n");
      builder.append("        {\n");
      builder.append("            \"Action\": \"s3:GetObject\",\n");
      builder.append("            \"Effect\": \"Allow\",\n");
      builder.append("            \"Principal\": \"*\",\n");
      builder.append("            \"Resource\": \"arn:aws:s3:::my-bucketname/myobject*\"\n");
      builder.append("        }\n");
      builder.append("    ],\n");
      builder.append("    \"Version\": \"2012-10-17\"\n");
      builder.append("}\n");
      minioClient.setBucketPolicy(
          SetBucketPolicyArgs.builder().bucket("my-bucketname").config(builder.toString()).build());
```

#### 3.2.2 查询桶策略

API如下：

```java
public String getBucketPolicy(GetBucketPolicyArgs args)
```

示例：

```java
String policy =
          minioClient.getBucketPolicy(
              GetBucketPolicyArgs.builder().bucket("aaaaa").build());
      System.out.println("Current policy: " + policy);

```

查询结果如下所示：

```java
{
    "Version":"2012-10-17",
    "Statement":[
        {
            "Effect":"Allow",
            "Principal":{
                "AWS":[
                    "*"
                ]
            },
            "Action":[
                "s3:GetBucketLocation",
                "s3:ListBucketMultipartUploads"
            ],
            "Resource":[
                "arn:aws:s3:::aaaaa"
            ]
        },
        {
            "Effect":"Allow",
            "Principal":{
                "AWS":[
                    "*"
                ]
            },
            "Action":[
                "s3:DeleteObject",
                "s3:ListMultipartUploadParts",
                "s3:PutObject",
                "s3:AbortMultipartUpload"
            ],
            "Resource":[
                "arn:aws:s3:::aaaaa/bb*"
            ]
        }
    ]
}
```

### 3.3 对象策略

Minio貌似没有具体对象文件的访问策略管理。那么在WEB端，需要加载图片，下载视频，如何去访问文件呢？

1. SDK直接访问

   如果是JS集成，可以使用使用客户端直连Minio，此方式简单效率高，但是安全性不高。

   如果是后台应用JAVA集成，Web请求访问，文件服务再去访问Minio获取资源，然后再响应给Web端，此方式安全性高，但是链路较长，效率低了一半。。。

2. 公开访问权限
可以设置桶的访问策略为Public，这样就能直接访问到文件，但是各种针对于用户不需要登录就能访问的照片，文件等，因为安全性最低。

2. **临时访问URL**

WEB端可以请求后台服务，后台服务调用getPresignedObjectUrl方法，返回一个临时访问路径，WEB端使用此链接直接去访问对象，此方式安全可靠，效率也高，但是多了一步请求临时URL的访问。

## 参考文章

[Minio入门系列【10】Minio之权限控制策略](https://yunyanchengyu.blog.csdn.net/article/details/120855875)