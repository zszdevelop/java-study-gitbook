# Solr搜索大小写问题

## 1. 简介

在ik分词中默认是区分大小写的。也就是无论原始字符是大写还是小写。你搜索时跟大小写也无关

![image-20220414100303196](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220414100303196.png)

但有些场景我们不希望使用ik分词，希望是一个完整的字符串。例如我们这里指定类型为string

那么因为大小写的关系就会导致搜索不出结果

![image-20220414100339862](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220414100339862.png)

## 2. 问题分析

我们在schema.xml 可以看到如下配置

### 2.1 ik分词的配置

ik分词默认将搜索结果都转为了小写

```xml
<fieldType name="text_ik" class="solr.TextField">
    <analyzer type="index">
        <tokenizer class="org.wltea.analyzer.lucene.IKTokenizerFactory"  useSmart="false"/>
        <filter class="solr.LowerCaseFilterFactory"/>
    </analyzer>
    <analyzer type="query">
        <tokenizer class="org.wltea.analyzer.lucene.IKTokenizerFactory"  useSmart="true" />
		       <filter class="solr.SynonymFilterFactory" synonyms="synonyms.txt" ignoreCase="true" expand="true"/>
        <filter class="solr.LowerCaseFilterFactory"/>
    </analyzer>
</fieldType>
```

### 2.2 string 类型配置

```xml
<fieldType name="string" class="solr.StrField" sortMissingLast="true" />
```

我们强制给string加上过滤器

```xml
 <filter class="solr.LowerCaseFilterFactory"/>
```

会导致项目无法正常启动

## 3. 解决方案

寻找合适的数据类型: lowercase

```xml
 <!-- lowercases the entire field value, keeping it as a single token.  -->
    <fieldType name="lowercase" class="solr.TextField" positionIncrementGap="100">
      <analyzer>
        <tokenizer class="solr.KeywordTokenizerFactory"/>
        <filter class="solr.LowerCaseFilterFactory" />
      </analyzer>
    </fieldType>

```

既不分词，同时不分区大小写

![image-20220414100839262](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220414100839262.png)