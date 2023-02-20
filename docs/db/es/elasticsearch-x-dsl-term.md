---
order: 100
category:
	- ElasticSearch
---

# ES详解 - 查询：DSL查询之Term详解

>DSL查询另一种极为常用的是对词项进行搜索，官方文档中叫”term level“查询，本文主要对term level搜索进行详解。

## 1. Term查询引入

如前文所述，查询分基于文本查询和基于词项的查询:

![image-20220805222938003](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805222938003.png)

本文主要讲基于词项的查询。

![image-20220805223752733](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805223752733.png)

## 2. Term查询

> 很多比较常用，也不难，就是需要结合实例理解。这里综合官方文档的内容，我设计一个测试场景的数据，以覆盖所有例子。

准备数据

```bash
PUT /test-dsl-term-level
{
  "mappings": {
    "properties": {
      "name": {
        "type": "keyword"
      },
      "programming_languages": {
        "type": "keyword"
      },
      "required_matches": {
        "type": "long"
      }
    }
  }
}

POST /test-dsl-term-level/_bulk
{ "index": { "_id": 1 }}
{"name": "Jane Smith", "programming_languages": [ "c++", "java" ], "required_matches": 2}
{ "index": { "_id": 2 }}
{"name": "Jason Response", "programming_languages": [ "java", "php" ], "required_matches": 2}
{ "index": { "_id": 3 }}
{"name": "Dave Pdai", "programming_languages": [ "java", "c++", "php" ], "required_matches": 3, "remarks": "hello world"}

  
```

### 2.1 字段是否存在:exist

由于多种原因，文档字段的索引值可能不存在：

- 源JSON中的字段是null或[]
- 该字段已"index" : false在映射中设置
- 字段值的长度超出ignore_above了映射中的设置
- 字段值格式错误，并且ignore_malformed已在映射中定义

所以exist表示查找是否存在字段。

![image-20220805224415435](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805224415435.png)

### 2.2 id查询:ids

ids 即对id查找

```bash
GET /test-dsl-term-level/_search
{
  "query": {
    "ids": {
      "values": [3, 1]
    }
  }
}
```

![image-20220805224652643](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805224652643.png)

### 2.3 前缀:prefix

通过前缀查找某个字段

```bash
GET /test-dsl-term-level/_search
{
  "query": {
    "prefix": {
      "name": {
        "value": "Jan"
      }
    }
  }
}
```

![image-20220805224755113](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805224755113.png)

### 2.4 分词匹配:term

前文最常见的根据分词查询

```bash
GET /test-dsl-term-level/_search
{
  "query": {
    "term": {
      "programming_languages": "php"
    }
  }
}

```

![image-20220805224847374](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805224847374.png)

### 2.5 多个分词匹配:terms

按照读个分词term匹配，它们是or的关系

```bash
GET /test-dsl-term-level/_search
{
  "query": {
    "terms": {
      "programming_languages": ["php","c++"]
    }
  }
}
```

![image-20220805224923467](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805224923467.png)

### 2.6 按某个数字字段分词匹配:term set

设计这种方式查询的初衷是用文档中的数字字段动态匹配查询满足term的个数

```bash
GET /test-dsl-term-level/_search
{
  "query": {
    "terms_set": {
      "programming_languages": {
        "terms": [ "java", "php" ],
        "minimum_should_match_field": "required_matches"
      }
    }
  }
}
```

![image-20220805225032650](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805225032650.png)

### 2.7 通配符:wildcard

通配符匹配，比如`*`

```bash
GET /test-dsl-term-level/_search
{
  "query": {
    "wildcard": {
      "name": {
        "value": "D*ai",
        "boost": 1.0,
        "rewrite": "constant_score"
      }
    }
  }
}
```

![image-20220805225153592](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805225153592.png)

### 2.8 范围:range

常常被用在数字或者日期范围的查询

```bash
GET /test-dsl-term-level/_search
{
  "query": {
    "range": {
      "required_matches": {
        "gte": 3,
        "lte": 4
      }
    }
  }
}
```

![image-20220805225640451](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805225640451.png)

### 2.9 正则:regexp

通过[正则表达式](https://pdai.tech/md/develop/regex/dev-regex-all.html)查询

以"Jan"开头的name字段

```bash
GET /test-dsl-term-level/_search
{
  "query": {
    "regexp": {
      "name": {
        "value": "Ja.*",
        "case_insensitive": true
      }
    }
  }
}

  
```

![image-20220805225727650](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805225727650.png)

### 2.10 模糊匹配:fuzzy

官方文档对模糊匹配：编辑距离是将一个术语转换为另一个术语所需的一个字符更改的次数。这些更改可以包括：

- 更改字符（box→ fox）
- 删除字符（black→ lack）
- 插入字符（sic→ sick）
- 转置两个相邻字符（act→ cat）

```bash
GET /test-dsl-term-level/_search
{
  "query": {
    "fuzzy": {
      "remarks": {
        "value": "hell"
      }
    }
  }
}

```

![image-20220805225807567](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805225807567.png)

## 参考文章

[**ES详解 - 查询：DSL查询之Term详解**](https://pdai.tech/md/db/nosql-es/elasticsearch-x-dsl-term.html)