# MySql分页查询

## 1. 分页需求

客户端通过传递start(页码)，limit(每页显示的条数) 两个参数去分页查询数据表中的数据

那我们知道MySQL的数据库提供了分页的函数

```
limit m,n
```

但是该函数的用法和我们的需求不一样，所以就需要我们根据实际情况去改写合适我们自己的分页语句

## 2. 实例

- 查询第一条到第10条的数据的sql 是：select * from table limit 0,10; 

  对应我们的需求就是查询第一页的数据：**select * from table limit (1-1)*10,10;**

- 查询第10条到第20条的数据的sql是：select * from table limit 10,20; 

  对应我们的需求就是查询第二页的数据：selct * from table limit(2-1)*10,10;

- 查询第20条到第30条的数据的sql是：select * from table limit 20,30; 

  对应我们的需求就是查询第三页的数据：select * from table limit (3-1)*10,10;

## 3. 符合我们需求的sql格式

```
select * from table limit (pageNum-1)*pageSize,pageSize;
```

其中start是页码，limit是每页显示的条数。

