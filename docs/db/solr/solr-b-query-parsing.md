# Solr查询解析器

## 1. 简介

查询解析器用于将查询语句（q参数）解析成搜索语法。

## 2. 常用的三种解析器

### 2.1 默认解析器：lucene

Solr在查询的时候，用到了QueryParser对用户输入做解析，solr默认使用的解析器是lucene，被称之为Standard Query Parser。Standard Query Parser支持原生的查询语法，使你可以方便地构造结构化查询语句。当然，它还有不好的，就是容错比较差，总是把错误抛出来，而不是像dismax一样消化掉。

### 2.2 DisMax解析器

#### 2.2.1 简介

Dismax查询只是由子查询生成的文档的并集，并对由子查询生成的每个文档打分。 一般来说，DisMax查询解析器的接口更像是Google的接口，而不是标准的Solr请求处理程序的接口。 这种相似性使得DisMax成为许多消费者应用程序的适当的查询解析器。

说人话区别

1. 方便为每个域添加权重，影响评分
2. 接口更想是google 的接口，而不是solr/lucene
3. 很少抛出异常给用户

#### 2.2.2 DisMax 参数

除了通用的查询参数，DisMax还有一些自有的查询参数，你可以在solrconfig.xml中配置这些参数，或者在查询的时候指定，这样会覆盖之前配置的值。

| 参数   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| q      | 查询参数q                                                    |
| q.alt  | 如果参数q没有指定，就使用standard query parser并代替参数q    |
| **qf** | **Query Fields：在哪些字段上去检索数据。如果不指定的话，使用df** |
| **mm** | **Minimum Match：指定最小匹配因子**                          |
| **pf** | **Phrase Fields：增加文档的得分如果q参数值离的很近**         |
| ps     | Phrase Slop：指定q参数中两个词可以距离多远                   |
| qs     | Query Phrase Slop：指定q参数中两个词可以距离多远，与qf搭配使用 |
| tie    | Tie Breaker：使用一个0到1之间的浮点数                        |
| **bq** | **Boost Query：指定一个额外因素来增加匹配到的文档的得分**    |
| **bf** | **Boost Functions:指定boosts使用的函数**                     |

#### 2.2.3 DisMax Query Parser使用举例

- 使用StandardRequestHandler查询"video" 
  http://localhost:8983/solr/select?q=video&fl=name+score

- 已经配置了查询字段：text、features、name、id、manu、cat。而且匹配上name和cat会有更高的得分 
  http://localhost:8983/solr/select?defType=dismax&q=video

- 可以将score显示出来，看一下各个文档的得分 
  http://localhost:8983/solr/select?defType=dismax&q=video&fl=*,score

- 现在想设置features有更高的得分，而text有较低的得分 
  http://localhost:8983/solr/select?defType=dismax&q=video&qf=features^20.0+text^0.3

- 现在希望某一字段在满足某一情况下有更高的得分 
  http://localhost:8983/solr/select?defType=dismax&q=video&bq=cat:electronics^5.0

- 现在想使用有另外一个为instock的handler，它配置了一个过滤器：inStock:true 
  http://localhost:8983/solr/select?defType=dismax&q=video&qt=instock&fl=name,score,inStock

- 如果查询短语的单词是一个或者两个，原则上返回的结果中必须包含全部单词，但是你的查询短语很长，solr允许有单词不匹配。你可以通过mm参数设置最多有多少单词不匹配。 
  http://localhost:8983/solr/select?defType=dismax&q=belkin+ipod+gibberish

- 可以通过调试功能验证你的想法。 
  http://localhost:8983/solr/select?defType=dismax&q=belkin+ipod+gibberish&debugQuery=true

### 2.3 eDisMax

Extended DisMax

| 参数               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| mm.autoRelax       | 如果设置为true,可以使mm参数暂时失效：比如stopwords和fq可能会使查询结果为空 |
| boost              | 对于匹配的文档，越多的字符串匹配将会取得更高的得分           |
| lowercaseOperators | 这个参数可以用来指示是否把or和and当做OR和AND处理             |
| ps                 | 短语查询时，默认的溢出量amount of slop，用来影响boosting     |
| pf2                | 指定多值的字段可选的权重                                     |
| ps2                | 与pf2搭配使用，没有指定的话，使用ps                          |
| pf3                | 指定多值的字段可选的权重                                     |
| ps3                | 与pf3搭配使用，没有指定的话，使用ps                          |
| stopwords          | 布尔值，设置是否StopFilterFactory生效，设为false，则stopwords停词不起作用 |
| uf                 | 设置用户可以使用那些字段检索，默认是所有字段，也就是uf=*；设置为uf=title,就是只让查询title字段；设置为uf=*-title，就是禁止查询title字段；设置为uf=-*屏蔽所有字段的检索 |

## 参考文章

[solr 查询解析器](https://codeantenna.com/a/liB2jbkEqX)

[Solr Dismax示例](https://blog.csdn.net/boonya/article/details/55000047)

[Solr查询：DisMax查询解析器](https://www.w3cschool.cn/solr_doc/solr_doc-vpyf2gn1.html)