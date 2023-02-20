---
order: 410
category:
  - linux
---

# Linux命令行学习-tldr

## 1. 背景

对于很多使用终端的Linux和Mac用户，使用Terminal最难的就是要记住众多的Linux命令了。比如：`ssh`，`curl`，`grep`等，经常会记不住参数的顺序。这个时候通常在使用的时候通过man阅读长长的文档，从中对比一个个参数，这样费时又费力。

今天要介绍的一个好用的工具叫`tldr`，tldr全称Too long, Don’t read，翻译成中文就是[太长不读]。`tldr`根据二八原则将命令的常用场景给出示例，让人一看就懂。

## 2. 安装

```ssh
yum -y install npm
npm install -g tldr（有可能报错，报错则再执行一次）
tldr ssh // 查询ssh命令

```

### 2.1 tldr 运行报错

![image-20210402112659028](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210402112659028.png)

如果你第一次安装node 版本可能只有6.* ，则执行时会报错，可以参考升级[在centos7安装nodejs并升级nodejs到最新版本](https://segmentfault.com/a/1190000015302680)

## 3. 使用

使用tldr 查看tar命令

```
tldr tar
```

![image-20210402113016559](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210402113016559.png)

使用man查看tar命令(又臭又长)

```
man tar
```



![image-20210402113051584](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210402113051584.png)

## 参考文章

[Linux命令行学习神器 TLDR](https://www.hi-linux.com/posts/16098.html)
