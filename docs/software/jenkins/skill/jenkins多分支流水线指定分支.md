# jenkins多分支流水线指定分支

## 1. 简介

随着项目的发展，建的分支越来越多。在多分支流水线上的分支也变得异常凌乱，很多老版本的分支已经不用了。也存在着。我们希望能过滤掉一些无用的分支

## 2. 多分支流水线过滤

进入流水线的配置界面，在`Branch Sources`里找到了`Behaviours`选项，可以添加很多行为，这里面有两个我们需要的：

- Filter by name(with regular expression)
- Fliter by name(with wildcards)

### 2.1 使用正则表达式或通配符来过滤

![image-20220323094256012](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220323094256012.png)

### 2.2 根据分支名来过滤

Fliter by name(with wildcards)

![image-20220323094604488](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220323094604488.png)

## 参考文章

[**Jenkins 多分支项目过滤及 when 的高级用法**](https://jerrymei.cn/jenkins-multibranch-filter/)
