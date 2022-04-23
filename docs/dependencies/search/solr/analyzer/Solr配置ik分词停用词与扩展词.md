# Solr配置ik分词停用词与扩展词

## 1. 简介

### 1.1 停用词

停用词(Stop Words) ，词典译为“电脑检索中的虚字、非检索用字”。在SEO中，为节省存储空间和提高搜索效率，搜索引擎在索引页面或处理**搜索请求时会自动忽略某些字或词**，这些字或词即被称为Stop Words(停用词)。

停用词一定程度上相当于过滤词(Filter Words)，不过过滤词的范围更大一些，包含黄色、政治等敏感信息的关键词都会被视做过滤词加以处理，停用词本身则没有这个限制。通常意义上，停用词(Stop Words)大致可分为如下两类：

- **使用十分广泛，甚至是过于频繁的一些单词。**

  比如英文的“i”、“is”、“what”，中文的“我”、“就”之类词几乎在每个文档上均会出现，查询这样的词搜索引擎就无法保证能够给出真正相关的搜索结果，难于缩小搜索范围提高搜索结果的准确性，同时还会降低搜索的效率。因此，在真正的工作中，Google和百度等搜索引擎会忽略掉特定的常用词，在搜索的时候，如果我们使用了太多的停用词，也同样有可能无法得到非常精确的结果，甚至是可能大量毫不相关的搜索结果。

- **文本中出现频率很高，但实际意义又不大的词。**

  这一类主要包括了语气助词、副词、介词、连词等，通常自身并无明确意义，只有将其放入一个完整的句子中才有一定作用的词语。如常见的“的”、“在”、“和”、“接着”之类，比如“SEO研究院是原创的SEO博客”这句话中的“是”、“的”就是两个停用词

### 1.2 扩展词

基于自己项目进行扩展的一些特定词语

## 2. 配置

### 2.1 复制文件

将ext.dic 与 IKAnalyzer.cfg.xml 和 stopword.dic 复制到 webapps\solr\WEB-INF\classes 文件夹下

![image-20220412154252936](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412154252936.png)

### 2.2 IKAnalyzer.cfg.xml 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">  
<properties>  
	<comment>IK Analyzer 扩展配置</comment>
	<!--用户可以在这里配置自己的扩展字典 -->
	<entry key="ext_dict">ik_ext.dic;</entry> 
	
	<!--用户可以在这里配置自己的扩展停止词字典-->
	<entry key="ext_stopwords">stopword.dic;</entry> 
	
</properties>
```

### 2.3 配置扩展词

![image-20220412154445335](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412154445335.png)

### 2.4 配置停用词

![image-20220412154516180](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412154516180.png)

## 3. 扩展词验证

### 3.1 未配置前

未配置前网红分词，分为网和红。但是我们也希望他们是一体的

![image-20220412155122059](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412155122059.png)

#### 3.2 配置后的效果



## 参考文章

[Solr 7.2.1 配置中文分词器 IK Analyzer](https://blog.csdn.net/Appleyk/article/details/79270363)