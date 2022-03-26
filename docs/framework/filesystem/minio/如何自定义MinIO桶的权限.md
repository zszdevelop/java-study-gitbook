# 如何自定义MinIO桶的权限

## 1. 前言

我们在使用`MinIO`作为文件存储组件的时候，遇到了这样一个业务问题：

首先，`MinIO`的桶只有`public`和`private`两种权限：

- **public**：所有人都可以访问该桶的资源，包括桶内的文件内容和文件目录
- **private**：所有人都无法直接访问该桶的资源，如果外部需要访问，只能通过外链（最长有效期7天）

而我们的业务需求是要把用户头像放入`MinIO`的桶中，如果设置桶为`public`，那么所有人都可以遍历平台上注册用户的头像信息，这会造成隐私泄露；如果桶设置为`private`，那么只能以外链的形式给到给到前端，7天后，该外链i失效，导致前端页面无法展示用户头像。

那么，是否可以**既不暴露桶中所有的用户头像信息，又能永久访问（不通过外链形式）指定的用户头像文件**呢？

## 2. 解决方案

通过`mc`工具，对指定桶的`policy`进行定制化配置

### 2.1. 创建一个名为`test`的桶

默认`policy`是`private`，演示起见，可以先设为`public`。

### 2.2. 上传一个文件到test桶中

在浏览器中访问该桶的目录，可以发现列出了该桶下的文件目录：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa7a7e11aebc49219b1d945a23f4588f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

### 2.3. 设置该桶具有下载权限：

```
mc policy download minio/test
复制代码
```

### 2.4. 查看当前桶策略json文件：

```
mc get-json minio/test
复制代码
```

`Policy`文件 (`test_policy.json`) 如下：

```json
{
	"Statement": [{
			"Action": [
				"s3:GetBucketLocation",
				"s3:ListBucket"
			],
			"Effect": "Allow",
			"Principal": {
				"AWS": [
					"*"
				]
			},
			"Resource": [
				"arn:aws:s3:::test"
			]
		},
		{
			"Action": [
				"s3:GetObject"
			],
			"Effect": "Allow",
			"Principal": {
				"AWS": [
					"*"
				]
			},
			"Resource": [
				"arn:aws:s3:::test/*"
			]
		}
	],
	"Version": "2012-10-17"
}
复制代码
```

可以看到，在`action`中有`s3:ListBucket`这一项是allow的，所以我们可以在浏览器中遍历目录，删除即可

### 2.5.  修改test_policy.json如下：

```json
{
	"Statement": [{
			"Action": [
				"s3:GetBucketLocation"
			],
			"Effect": "Allow",
			"Principal": {
				"AWS": [
					"*"
				]
			},
			"Resource": [
				"arn:aws:s3:::test"
			]
		},
		{
			"Action": [
				"s3:GetObject"
			],
			"Effect": "Allow",
			"Principal": {
				"AWS": [
					"*"
				]
			},
			"Resource": [
				"arn:aws:s3:::test/*"
			]
		}
	],
	"Version": "2012-10-17"
}
复制代码
```

### 2.6.  重新应用该policy

```
mc policy set-json test_policy.json minio/test
复制代码
```

### 2.7.  验证：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1af857d0b8b42b6903d214220c98afd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

可以看到，无法再遍历桶目录了。

## 参考文章

[如何自定义MinIO桶的权限](https://juejin.cn/post/7003281659902574628)