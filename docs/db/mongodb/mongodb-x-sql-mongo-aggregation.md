# 从SQL到MongoDB之聚合篇

## 1. 简介

聚合管道 （ [aggregation pipeline ](https://docs.mongodb.com/manual/core/aggregation-pipeline/)） 让 MongoDB 提供与 SQL 中的许多常见数据聚合操作相对应的，原生的聚合功能。

### 1.1 术语

下表概述了常见的 SQL 聚合术语、函数和概念以及相应的 MongoDB 聚合操作符（ [aggregation operators ](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/#aggregation-pipeline-operator-reference)）：

| SQL 术语、函数和概念  | MongoDB 聚合操作符                                           |
| --------------------- | ------------------------------------------------------------ |
| WHERE                 | [$match](https://docs.mongodb.com/manual/reference/operator/aggregation/match/#pipe._S_match) |
| GROUP BY              | [$group](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group) |
| HAVING                | [$match](https://docs.mongodb.com/manual/reference/operator/aggregation/match/#pipe._S_match) |
| SELECT                | [$project](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project) |
| ORDER BY              | [$sort](https://docs.mongodb.com/manual/reference/operator/aggregation/sort/#pipe._S_sort) |
| LIMIT                 | [$limit](https://docs.mongodb.com/manual/reference/operator/aggregation/limit/#pipe._S_limit) |
| SUM()                 | [$sum](https://docs.mongodb.com/manual/reference/operator/aggregation/sum/#grp._S_sum) |
| COUNT()               | [$sum ](https://docs.mongodb.com/manual/reference/operator/aggregation/sum/#grp._S_sum)[$sortByCount](https://docs.mongodb.com/manual/reference/operator/aggregation/sortByCount/#pipe._S_sortByCount) |
| join                  | [$lookup](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#pipe._S_lookup) |
| SELECT INTO NEW_TABLE | [$out](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out) |
| MERGE INTO TABLE      | [$merge ](https://docs.mongodb.com/manual/reference/operator/aggregation/merge/#pipe._S_merge)MongoDB 4.2 可用 |

有关所有聚合管道和表达式操作符的列表，请参见： [Aggregation Pipeline Quick Reference ](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/)。

## 2. 语法示例

下面提供了 SQL 聚合语句和相应的 MongoDB 语句，表中的例子假定以下条件：

- SQL 示例假定有两个表：`orders` 和 `order_lineitem`，然后通过 `order_lineitem.order_id` 和 `orders.id` 进行 `join` 操作。
- MongoDB 示例假设其中一个集合（collection） `orders` 包含以下原型的文档（documents）：

```json
{
  cust_id: "abc123",
  ord_date: ISODate("2012-11-02T17:04:11.102Z"),
  status: 'A',
  price: 50,
  items: [ { sku: "xxx", qty: 25, price: 1 },
           { sku: "yyy", qty: 25, price: 1 } ]
}
```

### 2.1 COUNT vs count

计算所有 `orders` 记录数量：

- SQL 示例

```
SELECT COUNT(*) AS count
FROM orders
```

- MongoDB 示例

```
db.orders.aggregate( [
   {
     $group: {
        _id: null,
        count: { $sum: 1 }
     }
   }
] )
```

### 2.2 SUM vs `$sum`

计算 `orders` 中 `price` 的总和：

- SQL 示例

```
SELECT SUM(price) AS total
FROM orders
```

- MongoDB 示例

``` 
db.orders.aggregate( [
   {
     $group: {
        _id: null,
        total: { $sum: "$price" }
     }
   }
] )
```

### 2.3 GROUP BY vs `$group`

对于每一个独特的 `cust_id`，计算 `price` 字段总和：

- SQL 示例

```
SELECT cust_id,
       SUM(price) AS total
FROM orders
GROUP BY cust_id
```

- MongoDB 示例

```
db.orders.aggregate( [
   {
     $group: {
        _id: "$cust_id",
        total: { $sum: "$price" }
     }
   }
] )
```

### 2.4 ORDER BY vs `$sort`

对于每一个独特的 `cust_id`，计算 `price` 字段总和，且结果按总和排序：

- SQL 示例

```
SELECT cust_id,
       SUM(price) AS total
FROM orders
GROUP BY cust_id
ORDER BY total
```

- MongoDB 示例

```
db.orders.aggregate( [
   {
     $group: {
        _id: "$cust_id",
        total: { $sum: "$price" }
     }
   },
   { $sort: { total: 1 } }
] )
```

### 2.5 GROUP BY Multi

对于每一个独特的 `cust_id`，按照 `ord_date` 进行分组，且不包含日期的时间部分，计算 `price` 字段总和。

- SQL 示例

```
SELECT cust_id,
       ord_date,
       SUM(price) AS total
FROM orders
GROUP BY cust_id,
         ord_date
```

- MongoDB 示例

```
db.orders.aggregate( [
   {
     $group: {
        _id: {
           cust_id: "$cust_id",
           ord_date: { $dateToString: {
              format: "%Y-%m-%d",
              date: "$ord_date"
           }}
        },
        total: { $sum: "$price" }
     }
   }
] )
```

### 2.6 HAVING vs `$match`

对于 `cust_id` 如果有多个记录，就返回 `cust_id` 以及相应的记录数量：

- SQL 示例

```
SELECT cust_id,
       count(*)
FROM orders
GROUP BY cust_id
HAVING count(*) > 1
```

- MongoDB 示例

```
db.orders.aggregate( [
   {
     $group: {
        _id: "$cust_id",
        count: { $sum: 1 }
     }
   },
   { $match: { count: { $gt: 1 } } }
] )
```

### 2.7 WHERE vs `$match`

对于每一个独特的 `cust_id`，且 `status = ‘A’`，计算 `price` 字段总和，只有在总和大于 250 的情况下，才可以返回。

- SQL 示例

```
SELECT cust_id,
       SUM(price) as total
FROM orders
WHERE status = 'A'
GROUP BY cust_id
HAVING total > 250
```

- MongoDB 示例

```
db.orders.aggregate( [
   { $match: { status: 'A' } },
   {
     $group: {
        _id: "$cust_id",
        total: { $sum: "$price" }
     }
   },
   { $match: { total: { $gt: 250 } } }
] )
```

### 2.8 `$unwind`

对于每一个独特的 `cust_id`，对相应的行的 item 项求和得到 `qty`：

- SQL 示例

```
SELECT cust_id,
       SUM(li.qty) as qty
FROM orders o,
     order_lineitem li
WHERE li.order_id = o.id
GROUP BY cust_id
```

- MongoDB 示例

```
db.orders.aggregate( [
   { $unwind: "$items" },
   {
     $group: {
        _id: "$cust_id",
        qty: { $sum: "$items.qty" }
     }
   }
] )
```

### 2.9 Multi aggregate

将 `cust_id`, `ord_date` 分组并计算数量 ，不包括日期的时间部分。

```
SELECT COUNT(*)
FROM (SELECT cust_id,
             ord_date
      FROM orders
      GROUP BY cust_id,
               ord_date)
      as DerivedTable
db.orders.aggregate( [
   {
     $group: {
        _id: {
           cust_id: "$cust_id",
           ord_date: { $dateToString: {
              format: "%Y-%m-%d",
              date: "$ord_date"
           }}
        }
     }
   },
   {
     $group: {
        _id: null,
        count: { $sum: 1 }
     }
   }
] )
```

## 参考文章

[**从 SQL 到 MongoDB 之聚合篇**](https://jelly.jd.com/article/5edf43da70bb2b0168e022b2)