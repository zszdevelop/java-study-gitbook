# SQL到MongoDB的映射图表

## 1. 术语和概念

下表介绍了各种SQL术语和概念以及相应的MongoDB术语和概念。

| SQL术语/概念                                       | MongoDB术语/概念                                             |
| -------------------------------------------------- | ------------------------------------------------------------ |
| database                                           | [database](https://docs.mongodb.com/manual/reference/glossary/#term-database) |
| table                                              | [collection](https://docs.mongodb.com/manual/reference/glossary/#term-collection) |
| row                                                | [document](https://docs.mongodb.com/manual/reference/glossary/#term-document) or [BSON](https://docs.mongodb.com/manual/reference/glossary/#term-bson) document |
| column                                             | [field](https://docs.mongodb.com/manual/reference/glossary/#term-field) |
| index                                              | [index](https://docs.mongodb.com/manual/reference/glossary/#term-index) |
| table joins                                        | [$lookup](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#pipe._S_lookup), 嵌入文档 |
| primary key （指定任何唯一的列或列组合作为主键。） | [primary key](https://docs.mongodb.com/manual/reference/glossary/#term-primary-key) （在MongoDB中，主键自动设置为_id字段。） |
| aggregation (e.g. group by)                        | aggregation pipeline See the [SQL to Aggregation Mapping Chart](https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/). |
| SELECT INTO NEW_TABLE                              | [$out](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out) See the [SQL to Aggregation Mapping Chart](https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/). |
| MERGE INTO TABLE                                   | [$merge](https://docs.mongodb.com/manual/reference/operator/aggregation/merge/#pipe._S_merge) (Available starting in MongoDB 4.2) See the [SQL to Aggregation Mapping Chart](https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/). |
| Transactions                                       | [transactions](https://docs.mongodb.com/manual/core/transactions/) 在许多情况下，非规范化数据模型（嵌入式文档和数组） 将继续是您数据和用例的最佳选择，而不是多文档事务。 也就是说，在许多情况下，对数据进行适当的建模将最 大程度地减少对多文档交易的需求。 |

## 2. 可执行文件

下表展示了一些数据库可执行文件和相应的MongoDB可执行文件。这个表格并不是详尽无遗的。

|                 | MongoDB                                                      | MySQL  | Oracle  | Informix  | DB2        |
| --------------- | ------------------------------------------------------------ | ------ | ------- | --------- | ---------- |
| Database Server | [mongod](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) | mysqld | oracle  | IDS       | DB2 Server |
| Database Client | [mongo](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) | mysql  | sqlplus | DB-Access | DB2 Client |

## 3. 例子

下表展示了各种SQL语句和相应的MongoDB语句。表中的例子假设以下条件:

- SQL示例假设有一个名为**people**的表。
- MongoDB示例假设一个名为**people**的集合，它包含以下原型的文档:



```
 { 
       _id: ObjectId("509a8fb2f3f4948bd2f983a0"),
       user_id: "abc123",
       age: 55,
       status: 'A'
 }
```

### 3.1 创建和修改

下表展示了与表级操作相关的各种SQL语句以及相应的MongoDB语句。

| SQL Schema语句                                               | MongoDB Schema语句                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **CREATE** **TABLE** people (    id MEDIUMINT **NOT** **NULL**        AUTO_INCREMENT,    user_id Varchar(30),    age Number,    status char(1),    **PRIMARY** **KEY** (id) ) | 隐式创建的第一个[`insertOne()`](https://docs.mongodb.com/master/reference/method/db.collection.insertOne/#db.collection.insertOne)或[`insertMany()`](https://docs.mongodb.com/master/reference/method/db.collection.insertMany/#db.collection.insertMany)操作。如果没有指定**_id**字段，则会自动添加主键_id。 db.people.insertOne( {    user_id: "abc123",    age: 55,    status: "A" } ) 但是，您也可以显式地创建一个集合: db.createCollection("people") |
| **ALTER** **TABLE** people **ADD** join_date DATETIME        | 集合不描述或不强制其文件结构； 即在集合级别没有结构上的更改。 但是，在文档级别，[updateMany()](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/#db.collection.updateMany)操作可以使用[$set](https://docs.mongodb.com/manual/reference/operator/update/set/#up._S_set)运算符将字段添加到现有文档中。 db.people.updateMany(    { },    { $set: { join_date: **new** Date() } } ) |
| **ALTER** **TABLE** people **DROP** **COLUMN** join_date     | 集合不描述或不强制其文件结构； 即在集合级别没有结构上的更改。 但是，在文档级别，[updateMany()](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/#db.collection.updateMany)操作可以使用[$unset](https://docs.mongodb.com/manual/reference/operator/update/unset/#up._S_unset)运算符将字段添加到现有文档中。 db.people.updateMany(    { },    { $unset: { "join_date": "" } } ) |
| **CREATE** **INDEX** idx_user_id_asc **ON** people(user_id)  | db.people.createIndex( { user_id: 1 } )                      |
| **CREATE** **INDEX**       idx_user_id_asc_age_desc **ON** people(user_id, age **DESC**) | db.people.createIndex( { user_id: 1, age: -1 } )             |
| **DROP** **TABLE** people                                    | db.people.drop()                                             |

下表显示了与将记录插入表和相应的MongoDB语句有关的各种SQL语句。

| SQL INSERT语句                                               | **MongoDB insertOne() Statements**                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **INSERT** **INTO** people(user_id,                  age,                  status) **VALUES** ("bcd001",        45,        "A") | db.people.insertOne(   { user_id: "bcd001", age: 45, status: "A" } ) |

### 3.3 选择

下表展示了与从表中读取记录相关的各种SQL语句以及相应的MongoDB语句。

> **注意**
>
> 除非通过投影明确排除，否则[[`find()`](https://docs.mongodb.com/master/reference/method/db.collection.find/#db.collection.find)方法始终在返回的文档中包含**_id**字段。 下面的某些SQL查询可能包含一个**_id**字段来反映这一点，即使该字段未包含在相应的[`find()`](https://docs.mongodb.com/master/reference/method/db.collection.find/#db.collection.find)查询中也是如此。

| SQL SELECT 语句                                              | MongoDB find() 语句                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **SELECT**  **FROM* people                                   | db.people.find()                                             |
| **SELECT** id,       user_id,       status **FROM** people   | db.people.find(     { },     { user_id: 1, status: 1 } )     |
| **SELECT** user_id, status **FROM** people                   | db.people.find(     { },     { user_id: 1, status: 1, _id: 0 } ) |
| **SELECT**  ***FROM\*** *people* **WHERE* status = "A"       | db.people.find(     { status: "A" } )                        |
| **SELECT** user_id, status **FROM** people **WHERE** status = "A" | db.people.find(     { status: "A" },     { user_id: 1, status: 1, _id: 0 } ) |
| **SELECT**  ***FROM\*** *people* **WHERE* status != "A"      | db.people.find(     { status: { $ne: "A" } } )               |
| **SELECT**  ***FROM\*** *people* ***WHERE\*** *status = "A"* **AND* age = 50 | db.people.find(     { status: "A",       age: 50 } )         |
| **SELECT**  ***FROM\*** *people* ***WHERE\*** *status = "A"* **OR* age = 50 | db.people.find(     { $or: [ { status: "A" } , { age: 50 } ] } ) |
| **SELECT**  ***FROM\*** *people* **WHERE* age > 25           | db.people.find(     { age: { $gt: 25 } } )                   |
| **SELECT**  ***FROM\*** *people* **WHERE* age < 25           | db.people.find(    { age: { $lt: 25 } } )                    |
| **SELECT**  ***FROM\*** *people* ***WHERE\*** *age > 25* **AND*   age <= 50 | db.people.find(    { age: { $gt: 25, $lte: 50 } } )          |
| **SELECT**  ***FROM\*** *people* ***WHERE\*** *user_id \*like* "%bc%" | db.people.find( { user*id: /bc/ } )* *_or* db.people.find( { user_id: { $regex: /bc/ } } ) |
| **SELECT**  ***FROM\*** *people* ***WHERE\*** *user_id \*like* "bc%" | db.people.find( { user*id: /^bc/ } )* *_or* db.people.find( { user_id: { $regex: /^bc/ } } ) |
| **SELECT**  ***FROM\*** *people* ***WHERE\*** *status = "A"* ***ORDER\*** ***BY\*** *user_id \*ASC* | db.people.find( { status: "A" } ).sort( { user_id: 1 } )     |
| **SELECT**  ***FROM\*** *people* ***WHERE\*** *status = "A"* ***ORDER\*** ***BY\*** *user_id \*DESC* | db.people.find( { status: "A" } ).sort( { user_id: -1 } )    |
| **SELECT** **COUNT**(*)* **FROM* people                      | db.people.count() *or* db.people.find().count()              |
| **SELECT** **COUNT**(user_id) **FROM** people                | db.people.count( { user*id: { $exists:* ***true\*** *} } )* *_or* db.people.find( { user_id: { $exists: **true** } } ).count() |
| **SELECT** **COUNT**(*)* ***FROM\*** *people* **WHERE* age > 30 | db.people.count( { age: { $gt: 30 } } ) *or* db.people.find( { age: { $gt: 30 } } ).count() |
| **SELECT** **DISTINCT**(status) **FROM** people              | db.people.aggregate( [ { $group : { _id : "$status" } } ] ) or, for distinct value sets that do not exceed the [BSON size limit](https://docs.mongodb.com/manual/reference/limits/#limit-bson-document-size) db.people.distinct( "status" ) |
| **SELECT**  ***FROM\*** *people* **LIMIT* 1                  | db.people.findOne() *or* db.people.find().limit(1)           |
| **SELECT**  ***FROM\*** *people* **LIMIT* 5 SKIP 10          | db.people.find().limit(5).skip(10)                           |
| **EXPLAIN** **SELECT**  ***FROM\*** *people* **WHERE* status = "A" | db.people.find( { status: "A" } ).explain()                  |

### 3.4 更新记录

下表显示了与更新表中的现有记录和相应的MongoDB语句有关的各种SQL语句。

| **SQL Update Statements**                                    | **MongoDB updateMany() Statements**                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **UPDATE** people **SET** status = "C" **WHERE** age > 25    | db.people.updateMany(   { age: { $gt: 25 } },   { $set: { status: "C" } } ) |
| **UPDATE** people **SET** age = age + 3 **WHERE** status = "A" | db.people.updateMany(       { status: "A" } ,       { $inc: { age: 3 } } ) |

有关示例中使用的方法和运算符的更多信息，请参见：

### 3.5 删除记录

下表显示了与从表中删除记录和相应的MongoDB语句有关的各种SQL语句。

| **SQL Delete Statements**                         | **MongoDB deleteMany() Statements**     |
| ------------------------------------------------- | --------------------------------------- |
| **DELETE** **FROM** people **WHERE** status = "D" | db.people.deleteMany( { status: "D" } ) |
| **DELETE** **FROM** people                        | db.people.deleteMany({})                |

## 参考文章

[SQL到MongoDB的映射图表](https://docs.mongoing.com/mongodb-crud-operations/sql-to-mongodb-mapping-chart)