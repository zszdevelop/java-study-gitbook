# MongoDB入门

## 1. 连接mongodb

```sh
// mongo 远程主机ip或DNS:MongoDB端口号/数据库名 -u user -p password
mongo 192.168.1.200:27017/test -u user -p password
```

若在安装mongo的服务器上访问本地mongo,可直接执行 mongo 

## 2. 数据库操作

- 创建数据库，使用`use`命令去创建数据库，当插入第一条数据时会创建数据库，例如创建一个`test`数据库；

  ```
  > use test
  switched to db test
  > db.article.insert({name:"测试 MongoDB"})
  WriteResult({ "nInserted" : 1 })
  > show dbs
  admin   0.000GB
  config  0.000GB
  local   0.000GB
  test    0.000GB
  ```

- 删除数据库，使用db对象中的`dropDatabase()`方法来删除；（只删除use 选择的，而非所有）

  ```
  > db.dropDatabase()
  { "dropped" : "test", "ok" : 1 }
  > show dbs
  admin   0.000GB
  config  0.000GB
  local   0.000GB
  ```

## 3. 集合操作

- 创建集合，使用db对象中的`createCollection()`方法来创建集合，例如创建一个`article`集合；

  ```
  > use test
  switched to db test
  > db.createCollection("myCollection")
  { "ok" : 1 }
  > show collections
  article
  myCollection
  ```

- 删除集合，使用collection对象的`drop()`方法来删除集合，例如删除一个`article`集合；

  ```
  > db.myCollection.drop()
  true
  > show collections
  article
  ```

## 4. 文档操作

### 4.1 插入文档

- MongoDB通过collection对象的`insert()`方法向集合中插入文档，**语法如下**；

```
db.collection.insert(document)
```

- 使用collection对象的`insert()`方法来插入文档，例如插入一个`article`文档；

```
db.myCollection.insert({title: '我是标题', 
    content: '我是内容'
})
```

- 使用collection对象的`find()`方法可以获取文档，例如获取所有的`article`文档；

```
db.myCollection.find({})
```

### 4.2 更新文档

- MongoDB通过collection对象的`update()`来更新集合中的文档，语法如下；

  ```
  db.collection.update(
     <query>,
     <update>,
     {
       multi: <boolean>
     }
  )
  # query：修改的查询条件，类似于SQL中的WHERE部分
  # update：更新属性的操作符，类似与SQL中的SET部分
  # multi：设置为true时会更新所有符合条件的文档，默认为false只更新找到的第一条
  
  ```

  

- 将title为`MongoDB 教程`的所有文档的title修改为`MongoDB`；

  ```
  db.article.update({'title':'我是标题'},{$set:{'title':'标题修改'}},{multi:true})
  ```

- 除了`update()`方法以外，`save()`方法可以用来替换已有文档，语法如下；

  ```
  db.collection.save(document)
  ```

  

- 这次我们将ObjectId为`5e9943661379a112845e4056`的文档的title改为`MongoDB 教程`；

```
db.article.save({
    "_id" : ObjectId("5e9943661379a112845e4056"),
    "title" : "MongoDB 教程",
    "description" : "MongoDB 是一个 Nosql 数据库",
    "by" : "Andy",
    "url" : "https://www.mongodb.com/",
    "tags" : [ 
        "mongodb", 
        "database", 
        "NoSQL"
    ],
    "likes" : 100.0
})
```

### 4.3 删除文档

- MongoDB通过collection对象的`remove()`方法来删除集合中的文档，语法如下；

```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>
   }
)
# query：删除的查询条件，类似于SQL中的WHERE部分
# justOne：设置为true只删除一条记录，默认为false删除所有记录
```

- 删除title为`MongoDB 教程`的所有文档；

```
db.article.remove({'title':'MongoDB 教程'})
```

### 4.4 查询文档

- MongoDB通过collection对象的`find()`方法来查询文档，语法如下；

```
db.collection.find(query, projection)
# query：查询条件，类似于SQL中的WHERE部分
# projection：可选，使用投影操作符指定返回的键

```

- 查询`article`集合中的所有文档；

```
db.article.find()

/* 1 */
{
    "_id" : ObjectId("5e994dcb1379a112845e4057"),
    "title" : "MongoDB 教程",
    "description" : "MongoDB 是一个 Nosql 数据库",
    "by" : "Andy",
    "url" : "https://www.mongodb.com/",
    "tags" : [ 
        "mongodb", 
        "database", 
        "NoSQL"
    ],
    "likes" : 50.0
}

/* 2 */
{
    "_id" : ObjectId("5e994df51379a112845e4058"),
    "title" : "Elasticsearch 教程",
    "description" : "Elasticsearch 是一个搜索引擎",
    "by" : "Ruby",
    "url" : "https://www.elastic.co/cn/",
    "tags" : [ 
        "elasticearch", 
        "database", 
        "NoSQL"
    ],
    "likes" : 100.0
}
/* 3 */
{
    "_id" : ObjectId("5e994e111379a112845e4059"),
    "title" : "Redis 教程",
    "description" : "Redis 是一个key-value数据库",
    "by" : "Andy",
    "url" : "https://redis.io/",
    "tags" : [ 
        "redis", 
        "database", 
        "NoSQL"
    ],
    "likes" : 150.0
}

```

- MongoDB中的条件操作符，通过与SQL语句的对比来了解下；

| 操作       | 格式         | SQL中的类似语句                |
| :--------- | :----------- | :----------------------------- |
| 等于       | `{:}`        | `where title = 'MongoDB 教程'` |
| 小于       | `{:{$lt:}}`  | `where likes < 50`             |
| 小于或等于 | `{:{$lte:}}` | `where likes <= 50`            |
| 大于       | `{:{$gt:}}`  | `where likes > 50`             |
| 大于或等于 | `{:{$gte:}}` | `where likes >= 50`            |
| 不等于     | `{:{$ne:}}`  | `where likes != 50`            |

- 条件查询，查询title为`MongoDB 教程`的所有文档；

```
db.article.find({'title':'MongoDB 教程'})
```

- 条件查询，查询likes大于50的所有文档；

```
db.article.find({'likes':{$gt:50}})
```

- AND条件可以通过在`find()`方法传入多个键，以逗号隔开来实现，例如查询title为`MongoDB 教程`并且by为`Andy`的所有文档；

```
db.article.find({'title':'MongoDB 教程','by':'Andy'})
```

- OR条件可以通过使用`$or`操作符实现，例如查询title为`Redis 教程`或`MongoDB 教程`的所有文档；

```
db.article.find({$or:[{"title":"Redis 教程"},{"title": "MongoDB 教程"}]})
```

- AND 和 OR条件的联合使用，例如查询likes大于50，并且title为`Redis 教程`或者`"MongoDB 教程`的所有文档。

```
db.article.find({"likes": {$gt:50}, $or: [{"title": "Redis 教程"},{"title": "MongoDB 教程"}]})
```

## 5.其他操作

### 5.1 Limit与Skip操作

- 读取指定数量的文档，可以使用`limit()`方法，语法如下；

```
db.collection.find().limit(NUMBER)
```

- 只查询article集合中的2条数据；

```
db.article.find().limit(2)
```

- 跳过指定数量的文档来读取，可以使用`skip()`方法，语法如下；

```
db.collection.find().limit(NUMBER).skip(NUMBER)
```

- 从第二条开始，查询article集合中的2条数据；

```
db.article.find().limit(2).skip(1)
```

### 5.2 排序

- 在MongoDB中使用`sort()`方法对数据进行排序，`sort()`方法通过参数来指定排序的字段，并使用1和-1来指定排序方式，1为升序，-1为降序；

```
db.collection.find().sort({KEY:1})
```

- 按article集合中文档的likes字段降序排列；

```
db.article.find().sort({likes:-1})
```

### 5.3 索引

- 索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。
- MongoDB使用`createIndex()`方法来创建索引，语法如下；

```
db.collection.createIndex(keys, options)
# background：建索引过程会阻塞其它数据库操作，设置为true表示后台创建，默认为false
# unique：设置为true表示创建唯一索引
# name：指定索引名称，如果没有指定会自动生成
```

- 给title和description字段创建索引，1表示升序索引，-1表示降序索引，指定以后台方式创建；

```
db.article.createIndex({"title":1,"description":-1}, {background: true})
```

- 查看article集合中已经创建的索引；

```
db.article.getIndexes()
```

```

/* 1 */
[
    {
        "v" : 2,
        "key" : {
            "_id" : 1
        },
        "name" : "_id_",
        "ns" : "test.article"
    },
    {
        "v" : 2,
        "key" : {
            "title" : 1.0,
            "description" : -1.0
        },
        "name" : "title_1_description_-1",
        "ns" : "test.article",
        "background" : true
    }
]
```

### 5.4 聚合

- MongoDB中的聚合使用`aggregate()`方法，类似于SQL中的group by语句，语法如下；

```
db.collection.aggregate(AGGREGATE_OPERATION)
```

- 聚合中常用操作符如下；

| 操作符 | 描述       |
| :----- | :--------- |
| $sum   | 计算总和   |
| $avg   | 计算平均值 |
| $min   | 计算最小值 |
| $max   | 计算最大值 |

- 根据by字段聚合文档并计算文档数量，类似与SQL中的count()函数；

```
db.article.aggregate([{$group : {_id : "$by", sum_count : {$sum : 1}}}])

/* 1 */
{
    "_id" : "Andy",
    "sum_count" : 2.0
}

/* 2 */
{
    "_id" : "Ruby",
    "sum_count" : 1.0
}
```

- 根据by字段聚合文档并计算likes字段的平局值，类似与SQL中的avg()语句；

```
db.article.aggregate([{$group : {_id : "$by", avg_likes : {$avg : "$likes"}}}])


/* 1 */
{
    "_id" : "Andy",
    "avg_likes" : 100.0
}

/* 2 */
{
    "_id" : "Ruby",
    "avg_likes" : 100.0
}
```

### 5.5 正则表达式

- MongoDB使用`$regex`操作符来设置匹配字符串的正则表达式，可以用来模糊查询，类似于SQL中的like操作；
- 例如查询title中包含`教程`的文档；

```
db.article.find({title:{$regex:"教程"}})
```

- 不区分大小写的模糊查询，使用`$options`操作符；

```
db.article.find({title:{$regex:"elasticsearch",$options:"$i"}})
```

## 参考文章

[MongoDB快速入门，掌握这些刚刚好](https://juejin.im/post/6844904150635921422)