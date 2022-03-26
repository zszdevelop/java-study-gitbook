# Minio客户端mc使用

## 1. 简介

MinIO Client (mc)为ls，cat，cp，mirror，diff，find等UNIX命令提供了一种替代方案。它支持文件系统和兼容Amazon S3的云存储服务（AWS Signature v2和v4）。

```sh
ls 列出文件和文件夹。
mb 创建一个存储桶或一个文件夹。
cat 显示文件和对象内容。
pipe 将一个STDIN重定向到一个对象或者文件或者STDOUT。
share 生成用于共享的URL。
cp 拷贝文件和对象。
mirror 给存储桶和文件夹做镜像。
find 基于参数查找文件。
diff 对两个文件夹或者存储桶比较差异。
rm 删除文件和对象。
events 管理对象通知。
watch 监视文件和对象的事件。
policy 管理访问策略。
config 管理mc配置文件。
update 检查软件更新。
version 输出版本信息。
```

## 2. 客户端下载

### 2.1 Mac安装

```sh
brew install minio/stable/mc
mc --help
```

### 2.2 window下载

[下载地址](http://dl.minio.org.cn/client/mc/release/windows-amd64/mc.exe[)

## 3. 配置mc

mc 将所有的配置信息都存储在~/.mc/config.json 文件中

```sh
# 查询mc host配置
mc config host ls
# 添加minio服务
mc config host add minio-server http://192.168.0.1:9000 admin 12345678
# 删除host
mc config host remove minio-server
```

## 4. mc命令使用

| ls - 列出存储桶和 对象 | mb - 创建存储桶                     | cat - 合并对象          |
| ---------------------- | ----------------------------------- | ----------------------- |
| cp - 拷贝对象          | rm - 删除对象                       | pipe - Pipe到一个对象   |
| share - 共享           | mirror - 存储桶镜像                 | find - 查找文件和对象   |
| diff - 比较存储桶差异  | policy - 给存储桶或前缀设置访问策略 |                         |
| config - 管理配置文件  | watch - 事件监听                    | events - 管理存储桶事件 |
| update - 管理软件更新  | version - 显示版本信息              |                         |

### 4.1 上传下载

```sh
# 查询minio服务上的所有buckets(文件和文件夹)
mc ls minio-server

# 下载文件
mc cp minio-server/test/dog.png /Users/zsz/Desktop/temp/

#删除文件
mc rm minio-server/test/dog.png

#上传文件
mc cp /Users/zsz/Desktop/temp/dog.png  minio-server/test/
```

![image-20210930140312806](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930140312806.png)

### 4.2 Bucket管理

```sh
# 创建bucket
mc mb minio-server/bucket01
# 删除bucket
mc rb minio-server/bucket01
# bucket不为空，可以强制删除 慎用
mc rb --force minio-server/bucket01

```

![image-20210930143222201](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930143222201.png)

```sh
#查询bucket03磁盘使用情况
mc du minio-server/bucket03
```

![image-20210930145523482](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930145523482.png)

## 5 mc admin使用

MinIO Client（mc）提供了“ admin”子命令来对您的MinIO部署执行管理任务。

```sh
service 服务重启并停止所有MinIO服务器
update 更新更新所有MinIO服务器
info 信息显示MinIO服务器信息
user 用户管理用户
group 小组管理小组
policy MinIO服务器中定义的策略管理策略
config 配置管理MinIO服务器配置
heal 修复MinIO服务器上的磁盘，存储桶和对象
profile 概要文件生成概要文件数据以进行调试
top 顶部提供MinIO的顶部统计信息
trace 跟踪显示MinIO服务器的http跟踪
console 控制台显示MinIO服务器的控制台日志
prometheus Prometheus管理Prometheus配置
kms kms执行KMS管理操作
```

### 5.1 用户管理

```sh
mc admin user --help

#新建用户
mc admin user add minio-server fox
mc admin user add minio-server fox02 12345678

#查看用户
mc admin user list minio-server

#禁用用户
mc admin user disable minio-server fox02

#启用用户
mc admin user disable minio-server fox02

#查看用户信息
mc admin user info minio-server fox

#删除用户
mc admin user remove minio-server fox02
```

![image-20210930145919383](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930145919383.png)

### 5.2 策略管理

policy命令，用于添加，删除，列出策略，获取有关策略的信息并为MinIO服务器上的用户设置策略。

```sh
mc admin policy --help

#列出MinIO上的所有固定策略
mc admin policy list minio-server

# 查看plicy信息
mc admin policy info minio-server readwrite
```

![image-20210930150314231](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930150314231.png)

#### 5.2.1 添加新的策略

编写策略文件：mall.json

```js
{
	"Version": "2012-10-17",
	"Statement": [{
		"Effect": "Allow",
		"Action": [
			"s3:GetBucketLocation",
			"s3:GetObject"
		],
		"Resource": [
			"arn:aws:s3:::mall"
		]
	}, {
		"Effect": "Allow",
		"Action": [
			"s3:*"
		],
		"Resource": [
			"arn:aws:s3:::mall/*"
		]
	}]
}
```

注：策略文件的 **Version** 固定设置为 2012-10-17。

action 可选

```
"Action": [
"s3:GetBucketLocation",
"s3:ListBucket",
"s3:GetObject",
"s3:PutObject",
"s3:DeleteObject"
]
```

将mall.json添加到策略数据库

```
#添加新的策略
mc admin policy add minio-server mall /Users/zsz/Desktop/miniotest/mall.json

mc admin policy list minio-server
```

![image-20210930151708195](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930151708195.png)

#### 5.2.2 设置用户访问策略

```sh
mc admin user add minio-server fox03 12345678
# 设置用户的访问策略
mc admin policy set minio-server mall user=fox03
```

![image-20210930152101436](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930152101436.png)

测试：fox03/12345678 登录minio控制台http://192.168.3.14:50000/，只能操作tulingmall的bucket

## 参考文章

[MinIO客户端快速入门指南](http://docs.minio.org.cn/docs/master/minio-client-quickstart-guide)
