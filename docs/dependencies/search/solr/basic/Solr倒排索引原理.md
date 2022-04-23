# Solr倒排索引原理

## 1. 简介

solr是基于Lucence开发的企业级搜索引擎技术，而lucence的原理是倒排索引。那么什么是倒排索引呢？

### 1.1 正排索引

我们传统的方式（正排索引）是从关键点出发，然后再通过关键点找到关键点代表的信息中能够满足搜索条件的特定信息，既通过**KEY寻找VALUE**。

例如我们sql 语句，他是通过key ,来找值

```
where name like '%张三%'
```

**正排索引从文档编号找词：**

![image-20220417133453806](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220417133453806.png)

### 1.2 倒排索引

而Lucene的搜索则是采用了倒排索引的方式，即通过**VALUE找KEY**。而在中文全文搜索中VALUE就是我们要搜索的单词，存放所有单词的地方叫词典。KEY是文档标号列表（通过文档标号列表我们可以找到出现过要搜索单词VALUE的文档）

**倒排索引是从词找文档编号：**

![image-20220417133516596](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220417133516596.png)

## 2. 索引的创建过程

索引的创建过程可以分为：**1.分词组件，2.语言处理组件，2.索引组件**

### 2.1 分词组件（Tokenizer）

- 将原文档交给分词组件（Tokenizer）

此过程叫做Tokenize，得到的结果称为Token。

分词组件的作用

1. 将数据分成一个个词汇

2. 去除标点符号

3. 去除停词(比如中文的“的”，“和”，“啦”等等)

#### 2.1.1 示例

比如存入“Students should be allowed to go out！”

1. 分词组件会先将句子分成多个单词“Students”，“should”，“be” ，“allowed”，“to”，“go”，“out”,“！”。
2. 随后会进行第二部将标点符号“！”去掉，
3. 最后第三步会将“to”,“be”去掉。

最后留下的结果为：“Students”，“should”，“allowed”，“go”，“out”。

### 2.2 语言处理组件（LinguisticProcessor）：

将得到的Token交给语言处理组件（LinguisticProcessor）

此过程处理的结果是Term

 语言处理组件的作用如下：

1. 变为小写(Lowercase)。 
2. 将单词缩减为词根形式，如”cars”到”car”等。这种操作称为：stemming。
3. 将单词转变为词根形式，如”drove”到”drive”等。这种操作称为：lemmatization。

> 注意：至此索引创建完成，搜索”drive”时，”driving”，”drove”，”driven”也能够被搜到。因为在索引中，”driving”，”drove”，”driven”都会经过语言处理而变成”drive”，在搜索时，如果您输入”driving”，输入的查询语句同样经过分词组件和语言处理组件处理的步骤，变为查询”drive”，从而可以搜索到想要的文档。Lowercase，stemming同理

### 2.4 **索引组件（Indexer）**

将得到的Term交给索引组件（Indexer）

1. 将得到的Term创建字典
2. 对字典按字母排序
3. 合并相同的Term为倒排索引表

 假设现在有两个文档：

- 文档一：Students should be allowed to go out with their friends, but not allowed to drink beer. 
- 文档二：My friend Jerry went to school to see his students but found them drunk which is not allowed

经过前两个组件的处理后得到如下索引：

#### 2.4.1 初始索引

```
Term Document ID
student 1
allow 1
go 1
their 1
friend 1
allow 1
drink 1
beer 1
my 2
friend 2
jerry 2
go 2
school 2
see 2
his 2
student 2
find 2
them 2
drink 2
allow 2
```

#### 2.4.2 对字典按字母顺序排序：

```
Term Document ID
allow 1
allow 1
allow 2
beer 1
drink 1
drink 2
find 2
friend 1
friend 2
go 1
go 2
his 2
jerry 2
my 2
school 2
see 2
student 1
student 2
their 1
them 2
```

#### 2.4.3 合并相同的词(Term)成为文档倒排(Posting List)链表

合并相同的词(Term)成为文档倒排(Posting List)链表

- Document Frequency：文档频次，表示多少文档出现过此词(Term)

- Frequency：词频，表示某个文档中该词(Term)出现过几次

![image-20220417131709282](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220417131709282.png)



## 3. **索引的检索**

通过前几步索引的创建，现在就可以对创建的索引进行检索了。

1. 当用户的检索关键词进入solr后，solr会对传入的关键词进行处理，具体处理过程类似创建索引时语言处理组件对文档词汇的处理过程。
2. 将处理后的词在词典中搜索得到一个文档集。
3. 将文档集根据词频将文档集进行相关性排序。
4. 将结果集返回给用户。

## 参考文章

[solr索引基本原理](https://cloud.tencent.com/developer/article/1675434)

[Solr倒排索引原理](https://blog.nowcoder.net/n/7806530b1e9343848024ec20e87ff8cf)