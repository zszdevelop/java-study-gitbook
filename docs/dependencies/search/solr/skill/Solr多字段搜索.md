# Solr多字段搜索

## 1. 简介

有些场景我们需要搜索多字段，

比如，现在有一个需求，想要输入关键字搜索标题（title）和内容（content）等多个字段

## 2. 解决方案

### 2.1 方案一：采用copyField（复制字段）（推荐）

应定义如下几个名字为title、content以及text的域。

![image-20220417211216815](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220417211216815.png)

然后，将title域和content域中的内容复制到text域中，如下图所示。

![image-20220417211240887](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220417211240887.png)

这样就定义好了一个复制字段。现在根据关键字只搜索text域中的内容就相当于搜索title域和content域了。

### 2.2 方案2：OR

循环字段

```
(title:张三) OR (content:张三) OR (author:张三) 
```

如果只有四五个字段，我们可以用or 来查询。但如果字段多的话，用or效率就很低了