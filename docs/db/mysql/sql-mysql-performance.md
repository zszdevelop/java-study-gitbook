---
order: 210
category:
  - Mysql
  - 数据库
---

# MySQL - 性能优化

## 1. 使用 Explain 进行分析

Explain 用来分析 SELECT 查询语句，开发人员可以通过分析 Explain 结果来优化查询语句。

比较重要的字段有:

- select_type : 查询类型，有简单查询、联合查询、子查询等

- key : 使用的索引

- rows : 扫描的行数

  rows扫描的行数，越小越好

- type：使用索引的类型

  通过type的值判断查询是否高效，判断此次是全表扫描还是索引扫描

  - ALL < index < range ~ index_merge < ref < eq_ref < const < system

## 2. 优化数据访问

### 2.1. 减少请求的数据量

- 只返回必要的列: 最好不要使用 SELECT * 语句。
- 只返回必要的行: 使用 LIMIT 语句来限制返回的数据。
- 缓存重复查询的数据: 使用缓存可以避免在数据库中进行查询，特别在要查询的数据经常被重复查询时，缓存带来的查询性能提升将会是非常明显的。

### 2.2. 减少服务器端扫描的行数

最有效的方式是使用索引来覆盖查询。

## 3. 重构查询方式

### 3.1. 切分大查询

一个大查询如果一次性执行的话，可能一次锁住很多数据、占满整个事务日志、耗尽系统资源、阻塞很多小的但重要的查询。

```sql
DELEFT FROM messages WHERE create < DATE_SUB(NOW(), INTERVAL 3 MONTH);
```

```sql
rows_affected = 0
do {
    rows_affected = do_query(
    "DELETE FROM messages WHERE create  < DATE_SUB(NOW(), INTERVAL 3 MONTH) LIMIT 10000")
} while rows_affected > 0

  
```

### 3.2 分解大连接查询

#### 3.2.1 大连接查询分解好处

将一个大连接查询分解成对每一个表进行一次单表查询，然后将结果在应用程序中进行关联，这样做的好处有:

- **让缓存更高效**。对于连接查询，如果其中一个表发生变化，那么整个查询缓存就无法使用。而分解后的多个查询，即使其中一个表发生变化，对其它表的查询缓存依然可以使用。
- 分解成多个单表查询，这些**单表查询的缓存结果更可能被其它查询使用到**，从而减少冗余记录的查询。
- **减少锁竞争**；
- 在应用层进行连接，可以更容易对数据库进行拆分，从而**更容易做到高性能和可伸缩**。（分库分表做准备）
- 查询本身效率也可能会有所提升。例如下面的例子中，使用 IN() 代替连接查询，可以让 MySQL 按照 ID 顺序进行查询，这可能比随机的连接要更高效。

#### 3.2.2 示例

```sql
SELECT * FROM tab
JOIN tag_post ON tag_post.tag_id=tag.id
JOIN post ON tag_post.post_id=post.id
WHERE tag.tag='mysql';
```

```sql
SELECT * FROM tag WHERE tag='mysql';
SELECT * FROM tag_post WHERE tag_id=1234;
SELECT * FROM post WHERE post.id IN (123,456,567,9098,8904);
```

## 参考文章

[**MySQL - 性能优化**](https://pdai.tech/md/db/sql-mysql/sql-mysql-performance.html)