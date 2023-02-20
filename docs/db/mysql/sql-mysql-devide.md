---
order: 310
category:
  - Mysql
  - 数据库
---

# MySQL - 分表分库

## 1. 水平切分

水平切分又称为 Sharding，它是将同一个表中的记录拆分到多个结构相同的表中。

当一个表的数据不断增多时，Sharding 是必然的选择，它可以将数据分布到集群的不同节点上，从而缓解单个数据库的压力。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630203012598.png" alt="image-20220630203012598"  />

## 2. 垂直切分

垂直切分是将一张表按列切分成多个表，通常是按照列的关系密集程度进行切分，也可以利用垂直切分将经常被使用的列和不经常被使用的列切分到不同的表中。

在数据库的层面使用垂直切分将按数据库中表的密集程度部署到不同的库中，例如将原来的电商数据库垂直切分成商品数据库、用户数据库等。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630203247107.png" alt="image-20220630203247107"  />

## 3. Sharding 策略

- 哈希取模: hash(key) % NUM_DB
- 范围: 可以是 ID 范围也可以是时间范围
- 映射表: 使用单独的一个数据库来存储映射关系

## 4. Sharding 存在的问题及解决方案

### 4.1 事务问题

使用分布式事务来解决，比如 XA 接口。

### 4.2 链接

可以将原来的 JOIN 分解成多个单表查询，然后在用户程序中进行 JOIN。

### 4.3 ID 唯一性

- 使用全局唯一 ID: GUID
- 为每个分片指定一个 ID 范围
- 分布式 ID 生成器 (如 Twitter 的 Snowflake 算法)

## 5. 数据库分片两种方案

### 5.1 客户端代理

**分片逻辑在应用端，封装在jar包中，通过修改或者封装JDBC层来实现**

- 当当网的Sharding-JDBC
- 阿里的TDDL是两种比较常用的实现

### 5.2 中间件代理

**在应用和数据中间加了一层代理层，分片逻辑统一维护在中间件服务中**。

- Mycat
- 360的Atlas
- 网易的DDB

## 参考文章

[MySQL - 分表分库](https://pdai.tech/md/db/sql-mysql/sql-mysql-devide.html)