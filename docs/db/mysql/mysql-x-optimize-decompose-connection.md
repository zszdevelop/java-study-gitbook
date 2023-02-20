# 分解大连接查询

## 1. 大连接查询分解好处

将一个大连接查询分解成对每一个表进行一次单表查询，然后将结果在应用程序中进行关联，这样做的好处有:

- **让缓存更高效**。对于连接查询，如果其中一个表发生变化，那么整个查询缓存就无法使用。而分解后的多个查询，即使其中一个表发生变化，对其它表的查询缓存依然可以使用。
- 分解成多个单表查询，这些**单表查询的缓存结果更可能被其它查询使用到**，从而减少冗余记录的查询。
- **减少锁竞争**；
- 在应用层进行连接，可以更容易对数据库进行拆分，从而**更容易做到高性能和可伸缩**。
- 查询本身效率也可能会有所提升。例如下面的例子中，使用 IN() 代替连接查询，可以让 MySQL 按照 ID 顺序进行查询，这可能比随机的连接要更高效。

## 2. 示例

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

[MySQL - 性能优化](https://pdai.tech/md/db/sql-mysql/sql-mysql-performance.html)