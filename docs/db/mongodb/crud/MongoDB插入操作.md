# MongoDB插入操作

## 1. 简介

**MongoDB 提供了以下方法将文件插入集合**：

可以使用 MongoDB 的 insert() 方法，同时 MongoDB 针对插入一条还是多条数据，提供了更可靠的 insertOne() 和 insertMany() 方法。

| 方法                       | 作用                               | 备注                      |
| -------------------------- | ---------------------------------- | ------------------------- |
| db.collection.insert()     | 将单个文档或多个文档插入到集合中。 | 官方不推荐，但是好用呀T_T |
| db.collection.insertOne()  | 将单个文档插入到集合中             | 3.2版本后新增             |
| db.collection.insertMany() | 将多个文档插入集合中。             | 3.2版本后新增             |
| db.collection.save()       | 插入                               | 更早的语法，不推荐        |

### 1.1 插入特性

1. MongoDB 向集合里插入记录时，无须事先对数据存储结构进行定义。如果待插入的集合不存在，则插入操作会默认创建集合。
2. 在 MongoDB 中，插入操作以单个集合为目标，MongoDB 中的所有写入操作都是单个文档级别的原子操作。

## 2. 插入方法

### 2.1 insert() 

插入单个或多个

```
db.collection.insert(
   <document or array of documents>,
   {
     writeConcern: <document>,
     ordered: <boolean>
   }
)
```

参数说明：

- document：要写入的文档或文档数组。

- writeConcern：写入策略，默认为 1，即要求确认写操作，0 是不要求。

- ordered（可选，默认为true）：

  - 如果为true，则对数组中的文档执行有序插入，如果其中一个文档发生错误，则MongoDB将返回，而不处理数组中的其余文档。

  - 如果为false，则执行无序插入，如果其中一个文档发生错误，则继续处理数组中的其余文档。

#### 2.2.1 示例

插入不指定 _id 字段的文档的代码如下：

```
db.products.insert( { item: "card", qty: 15 } )
```

在插入过程中，mongod将创建 _id字段并为其分配一个唯一的ObjectId() 值，由插入的文档验证:

```
{ "_id" : ObjectId("5063114bd386d8fadbd6b004"), "item" : "card", "qty" : 15 }
```

也可以指定id

```
db.products.insert( { _id: 10, item: "box", qty: 20 } )
```

### 2.2 insertOne() 

插入单个文档

`db.collection.insertOne()`将单个 `文档` 插入集合中。

```
db.collection.insertOne(
   <document>,
   {
      writeConcern: <document>
   }
)
```

参数说明：

- document：要写入的文档。
- writeConcern：写入策略，默认为 1，即要求确认写操作，0 是不要求。

#### 2.2.1 示例

```js
db.inventory.insertOne(  
        { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
)
```

`insertOne()`返回一个**文档，其中包含新插入的文档的_id字段值**

>注：没指定_id字段，则MongoDB将具有ObjectId值的_id字段添加到新文档中

### 2.3 insertMany() 

插入多个文件

`db.collection.insertMany()`可以将多个文档插入一个集合中。 将文档数组传递给该方法。

```
db.collection.insertMany(
   [ <document 1> , <document 2>, ... ],
   {
      writeConcern: <document>,
      ordered: <boolean>
   }
)
```

参数说明：

- document：要写入的文档。
- writeConcern：写入策略，默认为 1，即要求确认写操作，0 是不要求。
- ordered：指定是否按顺序写入，默认 true，按顺序写入。

#### 2.3.1示例

下面的示例将三个新文档插入库存集合。

```js
db.inventory.insertMany([
        { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } }, 
        { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
        { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
    ])
```

返回包含新插入的文档**_id**字段值的文档。



## 参考文章

[**插入文档**](https://docs.mongoing.com/mongodb-crud-operations/insert-documents)