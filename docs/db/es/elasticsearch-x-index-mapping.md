---
order: 60
category:
	- ElasticSearch
---

# ES详解 - 索引：索引管理详解

>了解基本使用后，我们从索引操作的角度看看如何对索引进行管理。

## 1. 索引管理的引入

我们在前文中增加文档时，如下的语句会动态创建一个customer的index：

```bash
PUT /customer/_doc/1
{
  "name": "John Doe"
}
```

而这个index实际上已经自动创建了它里面的字段（name）的类型。我们不妨看下它自动创建的mapping：

```json
{
  "mappings": {
    "_doc": {
      "properties": {
        "name": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        }
      }
    }
  }
}
```

那么如果我们需要对这个建立索引的过程做更多的控制：比如想要确保这个索引有数量适中的主分片，并且在我们索引任何数据之前，分析器和映射已经被建立好。那么就会引入两点：第一个**禁止自动创建索引**，第二个是**手动创建索引**。

- 禁止自动创建索引

可以通过在 config/elasticsearch.yml 的每个节点下添加下面的配置：

```bash
action.auto_create_index: false
```

手动创建索引就是接下来文章的内容。

## 2. 索引的格式

在请求体里面传入设置或类型映射，如下所示：

```bash
PUT /my_index
{
    "settings": { ... any settings ... },
    "mappings": {
        "properties": { ... any properties ... }
    }
}
```

- **settings**: 用来设置分片,副本等配置信息
- **mappings**:  字段映射，类型等
  - **properties**: 由于type在后续版本中会被Deprecated, 所以无需被type嵌套

## 3. 索引管理操作

> 我们通过kibana的devtool来学习索引的管理操作。

### 3.1 创建索引

我们创建一个user 索引`test-index-users`，其中包含三个属性：name，age, remarks; 存储在一个分片一个副本上。

```bash
PUT /test-index-users
{
  "settings": {
		"number_of_shards": 1,
		"number_of_replicas": 1
	},
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "age": {
        "type": "long"
      },
      "remarks": {
        "type": "text"
      }
    }
  }
}
```

执行结果

![image-20220804220348876](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804220348876.png)

- **插入测试数据**

```bash
post /test-index-users/_doc
{
  "name":"zhangsan",
  "age":18,
  "remarks":"hello world"
  
}
```

![image-20220804220620567](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804220620567.png)

- 查看数据

```bash
GET /test-index-users/_search
{
  "query": {"match_all": {}}
}
```

![image-20220804220806547](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804220806547.png)

- 我们再**测试下不匹配的数据类型**(age)：

```bash
POST /test-index-users/_doc
{
  "name": "test user",
  "age": "error_age",
  "remarks": "hello eeee"
}
```

你可以看到无法类型不匹配的错误：

![image-20220804220942671](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804220942671.png)

### 3.2 修改索引

查看刚才的索引,`curl 'localhost:9200/_cat/indices?v' | grep users`

```bash
yellow open test-index-users                          LSaIB57XSC6uVtGQHoPYxQ 1 1     1    0   4.4kb   4.4kb

```

我们注意到刚创建的索引的状态是yellow的，因为我测试的环境是单点环境，无法创建副本，但是在上述`number_of_replicas`配置中设置了副本数是1； 所以在这个时候我们需要修改索引的配置。

修改副本数量为0

```bash
PUT /test-index-users/_settings
{
  "settings": {
    "number_of_replicas": 0
  }
}
```

![image-20220804221203156](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804221203156.png)

再次查看状态：

```bash
green open test-index-users                          LSaIB57XSC6uVtGQHoPYxQ 1 1     1    0   4.4kb   4.4kb

```

### 3.3 打开/关闭索引

- **关闭索引**

  ```bash
  POST /test-index-users/_close
  ```

一旦索引被关闭，那么这个索引只能显示元数据信息，**不能够进行读写操作**。

![image-20220804221359572](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804221359572.png)

当关闭以后，再插入数据时：

![image-20220804221616801](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804221616801.png)

- **打开索引**

![image-20220804221707621](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804221707621.png)

打开后又可以重新写数据了

![image-20220804221723173](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804221723173.png)

### 3.4 删除索引

最后我们将创建的test-index-users删除。

```bash
DELETE /test-index-users
```

![image-20220804221813596](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804221813596.png)

### 3.5 查看索引

由于test-index-users被删除，所以我们看下之前bank的索引的信息

- **mapping**

```bash
GET /bank/_mapping
```

![image-20220804222117904](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804222117904.png)

- **settings**

```bash
GET /bank/_settings
```

![image-20220804222140597](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804222140597.png)

## 4. Kibana管理索引

在Kibana如下路径，我们可以查看和管理索引

![image-20220804222249667](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804222249667.png)

## 参考文章

[**ES详解 - 索引：索引管理详解**](https://pdai.tech/md/db/nosql-es/elasticsearch-x-index-mapping.html)