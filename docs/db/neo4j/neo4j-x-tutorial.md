---
order: 10
category:
  - neo4j
---

# Neo4j  - 基础教程

## 1. 前言

今天，我们来聊一聊知识图谱中的Neo4J。首先，什么是知识图谱？先摘一段百度百科：

> 知识图谱（Knowledge Graph），在图书情报界称为知识域可视化或知识领域映射地图，是显示知识发展进程与结构关系的一系列各种不同的图形，用 可视化技术描述知识资源及其载体，挖掘、分析、 构建、绘制和显示知识及它们之间的相互联系。 知识图谱是通过将应用数学、 图形学、信息可视化技术、 信息科学等学科的理论与方法与计量学引文分析、共现分析等方法结合，并利用可视化的图谱形象地展示学科的核心结构、发展历史、 前沿领域以及整体知识架构达到多学科融合目的的现代理论。它能为学科研究提供切实的、有价值的参考。

简单说来，知识图谱就是通过不同知识的关联性形成一个网状的知识结构，而这个知识结构，恰好就是人工智能AI的基石。当前AI领域热门的计算机图像、语音识别甚至是NLP，其实都是AI的`感知`能力，真正AI的`认知`能力，就要靠知识图谱。

知识图谱目前的应用主要在搜索、智能问答、推荐系统等方面。知识图谱的建设，一般包括数据获取、实体识别和关系抽取、数据存储、图谱应用都几个方面。本文着眼于数据存储这块，给大家一个Neo4J的快速教程。

## 2. Neo4J简介

知识图谱由于其数据包含实体、属性、关系等，常见的关系型数据库诸如MySQL之类不能很好的体现数据的这些特点，因此知识图谱数据的存储一般是采用图数据库（Graph Databases）。而[Neo4j](https://link.zhihu.com/?target=https%3A//neo4j.com/)是其中最为常见的图数据库。

## 3. Neo4J使用

Neo4J提供了一个用户友好的web界面，可以进行各项配置、写入、查询等操作，并且提供了可视化功能。类似ElasticSearch一样

![image-20230621150606240](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621150606240.png)

## 3. Cypher查询语言

Cypher是Neo4J的声明式图形查询语言，允许用户不必编写图形结构的遍历代码，就可以对图形数据进行高效的查询。Cypher的设计目的类似SQL，适合于开发者以及在数据库上做点对点模式（ad-hoc）查询的专业操作人员。其具备的能力包括： - 创建、更新、删除节点和关系 - 通过模式匹配来查询和修改节点和关系 - 管理索引和约束等

## 4. Neo4J实战教程

直接讲解Cypher的语法会非常枯燥，本文通过一个实际的案例来一步一步教你使用Cypher来操作Neo4J。

这个案例的节点主要包括人物和城市两类，人物和人物之间有朋友、夫妻等关系，人物和城市之间有出生地的关系。

### 4.1删除数据库中以往的图

首先，我们删除数据库中以往的图，确保一个空白的环境进行操作：

```text
MATCH (n) DETACH DELETE n
```

这里，`MATCH`是**匹配**操作，而小括号()代表一个**节点**node（可理解为括号类似一个圆形），括号里面的n为**标识符**。

### 4.2 创建一个节点

接着，我们创建一个人物节点：

```text
CREATE (n:Person {name:'John'}) RETURN n
```

`CREATE`是**创建**操作，`Person`是**标签**，代表节点的类型。花括号{}代表节点的**属性**，属性类似Python的字典。这条语句的含义就是创建一个标签为Person的节点，该节点具有一个name属性，属性值是John。

如图所示，在Neo4J的界面上可以看到创建成功的节点。

![image-20230621151606432](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621151606432.png)

### 4.3 创建多个接地那

我们继续来创建更多的人物节点，并分别命名：

```text
CREATE (n:Person {name:'Sally'}) RETURN n;
CREATE (n:Person {name:'Steve'}) RETURN n;
CREATE (n:Person {name:'Mike'}) RETURN n;
CREATE (n:Person {name:'Liz'}) RETURN n;
CREATE (n:Person {name:'Shawn'}) RETURN n;
```

如图所示，6个人物节点创建成功

![image-20230621151720546](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621151720546.png)

![image-20230621151829058](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621151829058.png)

### 4.4 创建地区节点

接下来创建地区节点

```text
CREATE (n:Location {city:'Miami', state:'FL'});
CREATE (n:Location {city:'Boston', state:'MA'});
CREATE (n:Location {city:'Lynn', state:'MA'});
CREATE (n:Location {city:'Portland', state:'ME'});
CREATE (n:Location {city:'San Francisco', state:'CA'});
```

可以看到，节点类型为Location，属性包括city和state。

如图所示，共有6个人物节点、5个地区节点，Neo4J贴心地使用不用的颜色来表示不同类型的节点。

![image-20230621152028490](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621152028490.png)

### 4.5 创建关系

接下来创建关系

```text
MATCH (a:Person {name:'Liz'}), 
      (b:Person {name:'Mike'}) 
MERGE (a)-[:FRIENDS]->(b)
```

这里的方括号`[]`即为关系，`FRIENDS`为关系的类型。注意这里的箭头`-->`是有方向的，表示是从a到b的关系。 如图，Liz和Mike之间建立了`FRIENDS`关系，通过Neo4J的可视化很明显的可以看出：

![image-20230621152223584](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621152223584.png)

### 4.6 关系增加属性

关系也可以增加属性

```text
MATCH (a:Person {name:'Shawn'}), 
      (b:Person {name:'Sally'}) 
MERGE (a)-[:FRIENDS {since:2001}]->(b)
```

在关系中，同样的使用花括号{}来增加关系的属性，也是类似Python的字典，这里给FRIENDS关系增加了since属性，属性值为2001，表示他们建立朋友关系的时间。

### 4.7 接下来增加更多的关系

```text
MATCH (a:Person {name:'Shawn'}), (b:Person {name:'John'}) MERGE (a)-[:FRIENDS {since:2012}]->(b);
MATCH (a:Person {name:'Mike'}), (b:Person {name:'Shawn'}) MERGE (a)-[:FRIENDS {since:2006}]->(b);
MATCH (a:Person {name:'Sally'}), (b:Person {name:'Steve'}) MERGE (a)-[:FRIENDS {since:2006}]->(b);
MATCH (a:Person {name:'Liz'}), (b:Person {name:'John'}) MERGE (a)-[:MARRIED {since:1998}]->(b);
```

如图，人物关系图已建立好，有点图谱的意思了吧？

![image-20230621152426789](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621152426789.png)

### 4.8 建立不同类型节点之间的关系-人物和地点的关系

然后，我们需要建立不同类型节点之间的关系-人物和地点的关系

```text
MATCH (a:Person {name:'John'}), (b:Location {city:'Boston'}) MERGE (a)-[:BORN_IN {year:1978}]->(b)
```

这里的关系是BORN_IN，表示出生地，同样有一个属性，表示出生年份。

如图，在人物节点和地区节点之间，人物出生地关系已建立好。

![image-20230621152539657](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621152539657.png)

### 4.9 同样建立更多人的出生地

```text
MATCH (a:Person {name:'Liz'}), (b:Location {city:'Boston'}) MERGE (a)-[:BORN_IN {year:1981}]->(b)
MATCH (a:Person {name:'Mike'}), (b:Location {city:'San Francisco'}) MERGE (a)-[:BORN_IN {year:1960}]->(b)
MATCH (a:Person {name:'Shawn'}), (b:Location {city:'Miami'}) MERGE (a)-[:BORN_IN {year:1960}]->(b)
MATCH (a:Person {name:'Steve'}), (b:Location {city:'Lynn'}) MERGE (a)-[:BORN_IN {year:1970}]->(b)
```

建好以后，整个图如下

![image-20230621152630799](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621152630799.png)

### 4.10 查询所有在Boston出生的人物

 至此，知识图谱的数据已经插入完毕，可以开始做查询了。我们查询下所有在Boston出生的人物

```text
MATCH (a:Person)-[:BORN_IN]->(b:Location {city:'Boston'}) RETURN a,b
```

结果如图

![image-20230621152744476](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621152744476.png)

### 4.11 查询所有对外有关系的节点

```text
MATCH (a)-->() RETURN a
```

注意这里箭头的方向，返回结果不含任何地区节点，因为地区并没有指向其他节点（只是被指向）

![image-20230621152836164](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621152836164.png)

### 4.12 查询所有有关系的节点

```text
MATCH (a)--() RETURN a
```

结果如图

![image-20230621152905580](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621152905580.png)

### 4.13 查询所有对外有关系的节点，以及关系类型

```text
MATCH (a)-[r]->() RETURN a.name, type(r)
```

结果如图

![image-20230621153113972](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621153113972.png)

### 4.14 查询所有有结婚关系的节点

```text
MATCH (n)-[:MARRIED]-() RETURN n
```

结果如图

![image-20230621153140425](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621153140425.png)

### 4.15 创建节点的时候就建好关系

```text
CREATE (a:Person {name:'Todd'})-[r:FRIENDS]->(b:Person {name:'Carlos'})
```

结果如图

![image-20230621153214614](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621153214614.png)

### 4.16 查找某人的朋友的朋友

```text
MATCH (a:Person {name:'Mike'})-[r1:FRIENDS]-()-[r2:FRIENDS]-(friend_of_a_friend) RETURN friend_of_a_friend.name AS fofName
```

返回Mike的朋友的朋友：

![image-20230621153317839](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621153317839.png)

从图上也可以看出，Mike的朋友是Shawn，Shawn的朋友是John和Sally

![image-20230621153331316](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621153331316.png)

### 4. 17 增加/修改节点的属性

```text
MATCH (a:Person {name:'Liz'}) SET a.age=34
MATCH (a:Person {name:'Shawn'}) SET a.age=32
MATCH (a:Person {name:'John'}) SET a.age=44
MATCH (a:Person {name:'Mike'}) SET a.age=25
```

这里，SET表示`修改`操作

### 4.18 删除节点的属性

```text
MATCH (a:Person {name:'Mike'}) SET a.test='test'
MATCH (a:Person {name:'Mike'}) REMOVE a.test
```

删除属性操作主要通过`REMOVE`

### 4.19 删除节点

```text
MATCH (a:Location {city:'Portland'}) DELETE a
```

删除节点操作是`DELETE`

### 4.20 删除有关系的节点

```text
MATCH (a:Person {name:'Todd'})-[rel]-(b:Person) DELETE a,b,rel
```

## 总结

本文重点针对常见的知识图谱图数据库Neo4J进行了介绍，并且采用一个实际的案例来说明Neo4J的查询语言Cypher的使用方法。

当然，类似MySQL一样，在实际的生产应用中，除了简单的查询操作会在Neo4J的web页面进行外，一般还是使用Python、Java等的driver来在程序中实现。后续会继续介绍编程语言如何操作Neo4J。

## 参考文章

[手把手教你快速入门知识图谱 - Neo4J教程](https://zhuanlan.zhihu.com/p/88745411)