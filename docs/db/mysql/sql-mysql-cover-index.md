---
order: 110
category:
  - 数据库
  - Mysql

---

# MySQL - 覆盖索引

## 1. 覆盖索引

覆盖索引：**SQL只需要通过索引就可以返回查询所需要的数据，而不必通过二级索引查到主键之后再去查询数据。**

> 首先要了解覆盖索引之前，你必须要了解
>
> - 什么是聚簇索引和非聚簇索引，
>
> - 回表，覆盖索引其实就是跟到底需不需要回表有直接的关系的。

### 1.1 什么是回表?

什么是回表呢? 通俗的讲就是，如果索引的列在 select 所需获得的列中 或者根据一次索引查询就能获得记录就不需要回表，**如果 select 所需获得列中有大量的非索引列，索引就需要到表中找到相应的列的信息，这就叫回表**。只有非聚簇索引是需要回表的，所以如果你懂得非聚簇索引的存储的结构，你自然就知道为啥需要回表了。

> 注意：不是所有类型的索引都可以成为覆盖索引。覆盖索引必须要存储索引的列，而哈希索引、空间索引和全文索引等都不存储索引列的值，所以MySQL只能使用B-Tree索引做覆盖索引

## 2. 举例

我这里举一个例子你就可以很快明白了。

```sql
create table t1
(
    a int primary key ,
    b int,
    c int,
    d int,
    e varchar(20)
)engine=InnoDB;

insert into t1 value (4, 3, 1, 1, 'd');
insert into t1 value (1, 1, 1, 1, 'a');
insert into t1 value (8, 8, 8, 8, 'h');
insert into t1 value (2, 2, 2, 2, 'b');
insert into t1 value (5, 2, 3, 5, 'e');
insert into t1 value (3, 3, 2, 2, 'c');
insert into t1 value (7, 4, 5, 5, 'g');
insert into t1 value (6, 6, 4, 4, 'f');

create index idx_t1_bcd on t1(b,c,d); -- 创建复合索引
```

接下来我们来看这些SQL，看看哪些SQL满足了覆盖索引。

```sql
explain select * from t1 where b = 1; -- 回表
explain select e from t1 where b = 1; -- 回表
explain select b from t1 where b = 1; -- 不用回表 Using index  覆盖索引
explain select b,c from t1 where b = 1; -- 不用回表 Using index  覆盖索引
explain select b,d from t1 where b = 1; -- 不用回表 Using index  覆盖索引
explain select b,c,d from t1 where b = 1; -- 不用回表 Using index  覆盖索引
explain select a,b,c,d from t1 where b = 1; -- 不用回表 Using index  覆盖索引

```

其实上面已经给出答案了。

我们通过执行计划就可以知道是不是满足了覆盖索引的条件了。

![image-20221204214426240](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204214426240.png)

如果Extra使用了**Using index**，就说明了他是满足了覆盖索引了，这个就是覆盖索引的标志了。

而下面这种很明显就是不满足索引覆盖了。

![image-20221204214458013](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204214458013.png)

因为我们建立的是复合索引，所以就是非聚簇索引，非聚簇索引的叶子节点上会存放键的值，也就是我们的(b,c,d) 这三个字段，还会存放主键a字段用于回表操作。

所以只要查询的列是你建立的索引字段再加上主键字段，都是满足索引覆盖的，这个时候我们在非聚簇索引的叶子节点就能给够获取到这些数据，不需要回表操作。

## 3. 总结

如果要使用覆盖索引，一定要注意SELECT 列表值取出需要的列(并且这些列是有索引的)，不可以是SELECT *，但有的人说可以全部列都加索引，但如果将所有字段一起做索引会导致索引文件过大，查询性能下降，不能为了利用覆盖索引而这么做。

## 参考文章

[五分钟告诉你什么是MySQL的覆盖索引](https://blog.csdn.net/cckevincyh/article/details/119655516)