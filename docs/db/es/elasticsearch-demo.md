# Es - 测试demo

## 1. 索引管理

### 1.1 查看索引

```json
GET /case/_mapping
```

### 1.2 删除索引

```json
DELETE case
```

## 2. DSL查询之复合查询

### 2.1 bool query(布尔查询)

>bool查询可以灵活的筛选和过滤出自己想要的数据

Bool查询语法有以下特点

- 子查询可以任意顺序出现
- 可以嵌套多个查询，包括bool查询
- 如果bool查询中没有must条件，should中必须至少满足一条才会返回结果。

bool查询包含四种操作符，分别是must,should,must_not,filter。他们均是一种数组，数组里面是对应的判断条件。

- `must`： 必须匹配。贡献算分
- `must_not`：过滤子句，必须不能匹配，但不贡献算分
- `should`： 选择性匹配，至少满足一条。贡献算分
- `filter`： 过滤子句，必须匹配，但不贡献算分

```json
GET case/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "ajmc": {
              "value": "诈骗"
            }
          }
        },
        {
          "term": {
            "ajmc": {
              "value": "二审"
            }
          }
        }
      ],
      "must_not": [
        {"term": {
          "fymc": {
            "value": "辽宁省"
          }
        }}
      ],
      "should": [
        {"term": {
          "cjjg": {
            "value": "驳回上诉"
          }
        }}
      ]
    }
  }
}
```

### 2.2 boosting query(提高查询)

> 不同于bool查询，bool查询中只要一个子查询条件不匹配那么搜索的数据就不会出现。而boosting query则是降低显示的权重/优先级（即score)。

案件名称中包含诈骗的、提高查询权重。包含一审的降低权重

```sql
GET case/_search
{
  "query": {
    "boosting": {
      "positive": {
        "term": {
          "ajmc": {
            "value": "诈骗"
          }
        }
      },
      "negative": {
        "term": {
          "ajmc": {
            "value": "一审"
          }
        }
      },
      "negative_boost": 0.2
    }
  }
}


```

### 2.3 constant_score（固定分数查询）

> 查询某个条件时，固定的返回指定的score；显然当不需要计算score时，只需要filter条件即可，因为filter context忽略score。

```json
GET case/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "terms": {
          "ajmc": [
            "集资",
            "诈骗"
          ]
        }
      },
      "boost": 1.2
    }
  }
} 
```

### 2.4 dis_max(最佳匹配查询）

分离最大化查询（Disjunction Max Query）指的是： **将任何与任一查询匹配的文档作为结果返回，但只将最佳匹配的评分作为查询的评分结果返回 。**

>案件名称 和 全文中。无论哪个包含诈骗 盗窃 的权重高。就排在前面

```json
GET case/_search
{
  "query": {
    "dis_max": {
      "tie_breaker": 0.7,
      "boost": 1.2,
      "queries": [
        {
          "match": {
            "ajmc": "诈骗 盗窃"
          }
        },
        {
          "match": {
            "qw": "诈骗 盗窃"
          }
        }
      ]
    }
  }
}
```

## 3. DSL查询之全文搜索

### 3.1 match 查询

```json
GET case/_search
{
  "query": {
    "match": {
      "ajmc": "集资"
    }
  }
}
```

### 3.2 多词match，默认or

```json
GET case/_search
{
  "query": {
    "match": {
      "ajmc": "集资 诈骗 赌博"
    }
  }
}
```

### 3.3 多词match，指定为and

```sql
GET case/_search
{
  "query": {
    "match": {
      "ajmc": {
        "query": "集资 诈骗", 
        "operator": "and"
      }
    }
  }
}
```

### 3.4 控制match的匹配精度

至少要满足这4个词中的3个

```json
GET case/_search
{
  "query": {
    "match": {
      "ajmc": {
        "query": "集资 诈骗  赌博 ",
        "minimum_should_match": "75%"
      }
    }
  }
}
```

### 3.5 match_phrase 搜索词组

```json
GET case/_search
{
  "query": {
    "match_phrase": {
      "ajmc": "集资 诈骗"
    }
  }
}
```

### 3.6 match_phrase_prefix 查最后一个词项是前缀

```json
GET case/_search
{
  "query": {
    "match_phrase_prefix": {
      "ajmc": "集资 诈"
    }
  }
}
```

### 3.7 multi_match 一次对多个字段查询

```json
GET case/_search
{
  "query": {
    "multi_match": {
      "query": "盗窃",
      "fields": ["ajmc","qw"]
    }
  }
}
```

### 3.8 query_string（根据运算符来解析和拆分查询字符串）
使用语法根据运算符（例如AND或）来解析和拆分提供的查询字符串

需要理解本质上查询这四个分词（term）or的结果而已

```json
GET case/_search
{
  "query": {
    "query_string": {
      "default_field": "ajmc",
      "query": "（放火 杀人） OR (集资 诈骗)"
    }
  }
  }
}
```

### 3.9 simple_query_string 无效语法不会返回错误
```json
GET case/_search
{
  "query": {
    "simple_query_string": {
      "query": "\"over the\" + (诈骗 | 集资) + 放火",
      "fields": ["ajmc"]
    }
  }
}
```

## 4. DSL查询之Term

### 4.1 字段存在:exist
```json
GET case/_search
{
  "track_total_hits": true, 
  "query": {
    "exists": {
      "field": "ay_list"
    }
  }
}
```

### 4.2 字段不存在:bool+must_not+exist

```json
GET case/_search
{
  "track_total_hits": true, 
  "query": {
    "bool": {
      "must_not": [
        {"exists": {
          "field": "ay_list"
        }}
      ]
    }
    
  }
}
```

### 4.3 id查询:ids

```json
GET case/_search
{
  "query": {
    "ids": {
      "values": ["5eecf0967ad6ac3706739386","5eed7da2a541f81ae5eceeb8"]
      }
  }
}
```


### 4.4 前缀:prefix
```json
GET case/_search
{
  "query": {
    "prefix": {
      "ajmc": {
        "value": "张三"
      }
    }
  }
}
```

### 4.5 分词匹配:term

前文最常见的根据分词查询

```json

GET case/_search
{
  "query": {
    "match": {
      "ay_list": "重婚"
    }
  }
}
```

### 4.6 多个分词匹配:terms

按照读个分词term匹配，它们是or的关系分词匹配:term
```json
GET case/_search
{
  "from": 8000,
  "size": 20,
  "query": {
    "terms": {
      "ay_list": [
        "抢劫",
        "重婚"
      ]
    }
  }
}
```

### 4.7 通配符:wildcard

```json
GET case/_search
{
  "query": {
    "wildcard": {
      "ajmc": {
        "value": "张*伟"
      }
    }
  }
}
```

### 4.8 范围:range

常常被用在数字或者日期范围的查询

```json
GET case/_search
{
  "query": {
    "range": {
      "cprq": {
        "gte": "2020-06-01",
        "lte": "2020-07-01"
      }
    }
  }
}
```

### 4.9 正则:regexp

通过正则表达式查询

以"赌"开头的name字段

```bash
GET /case/_search
{
  "query": {
    "regexp": {
      "ajmc": {
        "value": "赌.*",
        "case_insensitive": true
      }
    }
  }
}
```

### 4.10 模糊匹配:fuzzy

```json
GET case/_search
{
  "query": {
    "fuzzy": {
      "ajmc": {"value": "危"}
    }
  }
}
```

## 5. 聚合查询之Bucket聚合

### 5.1 标准的聚合

按法院聚合

```json
GET case/_search
{
  "size": 0,
  "aggs": {
    "agg_fymc": {
      "terms": {
        "field": "fymc.keyword"
      }
    }
  }
}
```

### 5.2 多个聚合

按法院和年份聚合

```json
GET case/_search
{
  "size": 0,
  "aggs": {
    "agg_fymc": {
      "terms": {
        "field": "fymc.keyword"
      }
    },
    "agg_ny": {
      "terms": {
        "field": "ny"
      }
    }
  }
}


```

### 5.3 嵌套分组

每个月、各法院的案件

```json
GET case/_search
{
  "size": 0,
  "aggs": {
    "group_by_ny": {
      "terms": {
        "field": "ny"
      },
      "aggs": {
        "group_by_fymc": {
          "terms": {
            "field": "fymc.keyword"
          }
        }
      }
    }
  }
}
```

### 5.4 前置条件的过滤：filter
```json
GET case/_search
{
  "size": 0,
  "aggs": {
    "group_by_202005-fymc": {
      "filter": {"term": {
        "ny": "202005"
      }}, 
      "aggs": {
        "group_by_fymc": {
          "terms": {
            "field": "fymc.keyword"
          }
        }
      }
    }
  }
}
```

### 5.5 对filter进行分组聚合：filters
```json
GET case/_search
{
  "size": 0,
  "aggs": {
    "agg-ny-data": {
      "filters": {
        "other_bucket_key": "other", 
        "filters": {
          "202001": {"match":{"ny":"202001"}},
          "202002": {"match":{"ny":"202002"}},
          "202005": {"match":{"ny":"202002"}}
        }
      }
    }
  }
}
```

### 5.6 对number类型聚合：Range
```json
GET case/_search
{
  "size": 0,
  "aggs": {
    "ny_ranges": {
      "range": {
        "field": "ny",
        "ranges": [
          {"to":202003},
          {
            "from": 202003,
            "to": 202005
          }
        ]
      }
    }
  }
}
```

### 5.7 对日期类型聚合：Date Range
```json
GET case/_search
{
  "size": 0,
  "aggs": {
    "range": {
      "date_range": {
        "field": "cprq",
        "format": "yyyy-MM-dd", 
        "ranges": [
          {
            "from": "2020-03-01",
            "to": "2020-06-01"
          }
        ]
      }
    }
  }
}
```

### 5.8 对柱状图功能：Histrogram
```json
GET /case/_search
{
  "size": 0,
  "aggs": {
    "aggs-ny": {
      "histogram": {
        "field": "ny",
        "interval": 1
      },
      "aggs": {
        "aggs-fymc": {
          "terms": {
            "field": "fymc.keyword"
          }
        }
      }
    }
  }
}
```

## 6.其他操作

### 6.1 查找全部

```json
GET case/_search
{
  "track_total_hits": true, 
 "query": {
   "match_all": {}
 }  
}
```

### 6.2 高亮搜索

```json
GET case/_search
{
  "size": 2, 
  "query": {
    "match": {
      "ajmc": "诈骗"
    }
  },
  "highlight": {
    "fields": {
      "ajmc": {
        "pre_tags": [
          "<em>"
        ],
        "post_tags": [
          "</em>"
        ]
      }
    }
  }
}
```

### 6.3 分词分析

```json
# 分词分析
GET case/_analyze
{
  "field": "ay_list" ,
  "text": "饺子真好吃"
}
```

![image-20221223142857600](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221223142857600.png)

