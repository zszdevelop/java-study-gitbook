# mongodb大数据量查询慢问题

## 1. 背景

我单个collection 有100多万数据，单单一个count查询就要1分多钟，其他分页查数据也是慢成狗了。甚至有时候服务器直接挂掉

但是这个数据量在robo 3t 很快，但在我的代码和idea 的datagrid 中就特别慢。

经过一系列的排查大致可以从几个方面入手

## 2. 解决

### 2.1 降低mongodb 版本

原本spring-boot版本为2.5.x 关联的mongo版本为4.x

>4.x版本改动比较大，查询的优化可能没做好导致

![image-20220126164949424](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220126164949424.png)

降低spring-boot版本为2.2.x 关联的mongo版本为3.x

![image-20220126164746396](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220126164746396.png)

速度快了好多

### 2.2 MongoRepository 替换为MongoTemplate.cursor 形式

使用MongoTemplate.cursor形式会快很多

```java
     FindIterable<Document> findIterable = mongoTemplate.getCollection("test").find();
        findIterable.limit(pageable.getPageSize()).skip((int) pageable.getOffset());
        MongoCursor<Document> cursor = findIterable.cursor();
```

