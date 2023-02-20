# 从SQL到MongoDB之概念篇

## 1. 概念对应关系

SQL 术语和概念以及相应的 MongoDB 术语和概念.

下表介绍了各种 SQL 术语和概念以及相应的 MongoDB 术语和概念.

| SQL术语/概念                                   | MongoDB 术语/概念                                            |
| ---------------------------------------------- | ------------------------------------------------------------ |
| database                                       | [database](https://docs.mongodb.com/manual/reference/glossary/#term-database) |
| table                                          | [collection](https://docs.mongodb.com/manual/reference/glossary/#term-collection) |
| row                                            | [document ](https://docs.mongodb.com/manual/reference/glossary/#term-document)或 [BSON ](https://docs.mongodb.com/manual/reference/glossary/#term-bson)document |
| column                                         | [field](https://docs.mongodb.com/manual/reference/glossary/#term-field) |
| index                                          | [index](https://docs.mongodb.com/manual/reference/glossary/#term-index) |
| table joins （表联接）                         | [$lookup ](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#pipe._S_lookup), `embedded documents （嵌入式文档）` |
| primary key 指定任何唯一的列或者列组合作为主键 | [primary key ](https://docs.mongodb.com/manual/reference/glossary/#term-primary-key)在 MongoDB 中, 主键自动设置为 [_id ](https://docs.mongodb.com/manual/reference/glossary/#term-id)字段 |
| aggregation (如：group by)                     | `aggregation pipeline （聚合管道）`参考： [SQL to Aggregation Mapping Chart](https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/) |
| SELECT INTO NEW_TABLE                          | [$out ](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out)参考： [SQL to Aggregation Mapping Chart](https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/) |
| MERGE INTO TABLE                               | [$merge ](https://docs.mongodb.com/manual/reference/operator/aggregation/merge/#pipe._S_merge)（从MongoDB 4.2开始可用） 参考： [SQL to Aggregation Mapping Chart](https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/) |
| transactions                                   | [transactions](https://docs.mongodb.com/manual/core/transactions/) |

> TIP
>
> *在许多情况下，* `非规范化数据模型（嵌入式文档和数组） denormalized data model (embedded documents and arrays)` *将继续是您数据和用例的最佳选择，而不是多文档事务. 也就是说，对于许多场景，对数据进行适当的建模将最大限度地减少对* `多文档事务（multi-document transactions）`*的需求。*

## 2. 可执行文件

下表显示了一些数据库可执行文件和相应的 MongoDB 可执行文件。 这张表并不是详尽无遗的。

|                 | MongoDB | MySQL  | Oracle  | Informix  | DB2        |
| --------------- | ------- | ------ | ------- | --------- | ---------- |
| Database Server | mongod  | mysqld | oracle  | IDS       | DB2 Server |
| Database Client | mongo   | mysql  | sqlplus | DB-Access | DB2 Client |

## 3. 示例

下表显示了各种 SQL 语句和相应的 MongoDB 语句。 表中的例子假定以下条件:

- Sql 示例假设一个名为 people 的表。
- MongoDB 的示例假定一个名为 people 的集合包含以下原型的文档：

```javascript
{
  _id: ObjectId("509a8fb2f3f4948bd2f983a0"),
  user_id: "abc123",
  age: 55,
  status: 'A'
}
```

### 3.1 Create and Alter

#### 3.1.1 CREATE TABLE

- SQL 模式语句：

```
CREATE TABLE people (
    id MEDIUMINT NOT NULL
        AUTO_INCREMENT,
    user_id Varchar(30),
    age Number,
    status char(1),
    PRIMARY KEY (id)
)
```

- MongoDB 模式语句：

```
db.people.insertOne( {
    user_id: "abc123",
    age: 55,
    status: "A"
 } )
```

#### 3.1.2 ALTER TABLE / ADD

- SQL模式语句：

```
ALTER TABLE people
ADD join_date DATETIME
```

- MongoDB 模式语句：

```
db.people.updateMany(
    { },
    { $set: { join_date: new Date() } }
)
```

集合不描述或强制执行其文档的结构；也就是说，在集合级别上没有结构上的改变。

但是，在文档级别， [updateMany() ](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/#db.collection.updateMany)操作可以使用 [$set ](https://docs.mongodb.com/manual/reference/operator/update/set/#up._S_set)操作符向现有文档添加字段。

#### 3.1.3 ALTER TABLE / DROP COLUMN

- SQL模式语句：

```
ALTER TABLE people
DROP COLUMN join_date
```

- MongoDB 模式语句：

```
db.people.updateMany(
    { },
    { $unset: { "join_date": "" } }
)
```

集合不描述或强制执行其文档的结构；也就是说，在集合级别上没有结构上的改变。

但是，在文档级别， [updateMany() ](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/#db.collection.updateMany)操作可以使用 [$unset ](https://docs.mongodb.com/manual/reference/operator/update/unset/#up._S_unset)操作符从文档中删除字段。

#### 3.1.4 CREATE INDEX

- SQL 模式语句：

```
CREATE INDEX idx_user_id_asc
ON people(user_id)
```

- MongoDB 模式语句：

```
db.people.createIndex( { user_id: 1 } )
```

#### 3.1.5 CREATE INDEX / Multi

- SQL模式语句：

```
CREATE INDEX
       idx_user_id_asc_age_desc
ON people(user_id, age DESC)
```

- MongoDB 模式语句：

```
db.people.createIndex( { user_id: 1, age: -1 } )
```

#### 3.1.6 DROP TABLE

- SQL模式语句：

```
DROP TABLE people
```

- MongoDB 模式语句：

```
db.people.drop()
```

### 3.2 Insert

下表显示了与向表中插入记录相关的各种 SQL 语句以及相应的 MongoDB 语句。

- SQL INSERT 语句

```
INSERT INTO people(user_id,
                  age,
                  status)
VALUES ("bcd001",
        45,
        "A")
```

- Mongodb insertOne() 语句

```
db.people.insertOne(
   { user_id: "bcd001", age: 45, status: "A" }
)
```

### 3.3 Select

下表显示了与从表中读取记录相关的各种 SQL 语句以及相应的 MongoDB 语句。

> NOTE：
>
> [find() ](https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find)方法总是包含返回文档中的 `_id` 字段，除非通过 [projection ](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/#projection)特别排除。 下面的一些 SQL 查询可能包含一个 `_id` 字段来反映这一点，即使该字段没有包含在相应的 [find() ](https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find)查询中。

#### 3.3.1 SELECT ... WHERE

- SQL 语句

```
SELECT user_id, status
FROM people
WHERE status = "A"
```

- Mongodb 语句

```
db.people.find(
    { status: "A" },
    { user_id: 1, status: 1, _id: 0 }
)
```

#### 3.3.2 SELECT ... AND

- SQL 语句

```
SELECT *
FROM people
WHERE age > 25
AND   age <= 50
```

- Mongodb 语句

```
db.people.find(
   { age: { $gt: 25, $lte: 50 } }
)
```

#### 3.3.3 SELECT ... OR

- SQL 语句

```
SELECT *
FROM people
WHERE status = "A"
OR age = 50
```

- Mongodb 语句

```
db.people.find(
    { $or: [ { status: "A" } , { age: 50 } ] }
)
```

#### 3.3.4 SELECT ... LIKE

- SQL 语句

```
FROM people
WHERE user_id like "%bc%"
```

- Mongodb 语句

```
db.people.find( { user_id: /bc/ } )

-or-

db.people.find( { user_id: { $regex: /bc/ } } )
```

#### 3.3.5 SELECT ... OEDER BY

- SQL 语句

```
SELECT *
FROM people
WHERE status = "A"
ORDER BY user_id ASC
```

- Mongodb 语句

```
db.people.find( { status: "A" } ).sort( { user_id: 1 } )
```

#### 3.3.6 SELECT ... COUNT

- SQL 语句

```
SELECT COUNT(user_id)
FROM people
```

- Mongodb 语句

```
db.people.count( { user_id: { $exists: true } } )

or

db.people.find( { user_id: { $exists: true } } ).count()
```

#### 3.3.7 SELECT DISTINCT

- SQL 语句

```
SELECT DISTINCT(status)
FROM people
```

- Mongodb 语句

```
db.people.aggregate( [ { $group : { _id : "$status" } } ] )

或者，对于不同的不超过 [BSON 大小限制](https://docs.mongodb.com/manual/reference/limits/#limit-bson-document-size) 的值集

db.people.distinct( "status" )
```

#### 3.3.8 SELECT ... LIMIT SKIP

- SQL 语句

```
SELECT *
FROM people
LIMIT 5
SKIP 10
```

- Mongodb 语句

```
db.people.find().limit(5).skip(10)
```

#### 3.3.9 EXPLAIN SELECT

- SQL 语句

```
EXPLAIN SELECT *
FROM people
WHERE status = "A"
```

- Mongodb 语句

```
db.people.find( { status: "A" } ).explain()
```

### 3.4 Update Records

下面显示了与更新表中现有记录相关的各种 SQL 语句以及相应的 MongoDB 语句。

#### 3.4.1 UPDATE ... SET

- SQL 语句

```
UPDATE people
SET status = "C"
WHERE age > 25
```

- Mongodb 语句

```
db.people.updateMany(
   { age: { $gt: 25 } },
   { $set: { status: "C" } }
)
```

#### 3.4.2 UPDATE ... INC

- SQL 语句

```
UPDATE people
SET age = age + 3
WHERE status = "A"
```

- Mongodb 语句

```
db.people.updateMany(
   { status: "A" } ,
   { $inc: { age: 3 } }
)
```

### 3.5 Delete Records

下面显示了与从表中删除记录相关的各种 SQL 语句以及相应的 MongoDB 语句。

#### 3.5.1 DELETE WHERE

- SQL 语句

```
DELETE FROM people
WHERE status = "D"
```

- Mongodb 语句

```
db.people.deleteMany( { status: "D" } )
```

#### 3.5.2 DELETE

- SQL 语句

```
DELETE FROM people
```

- Mongodb 语句

```
db.people.deleteMany({})
```

## 参考文章

[**从 SQL 到 MongoDB 之概念篇**](https://jelly.jd.com/exp/detail?id=5edf432cc27b86015c50187a)