---
order: 211
category:
  - Mysql
  - 数据库

---

# MySQL - 慢查询的12个原因

## 0. 前言

日常开发中，我们经常会遇到**数据库慢查询**。那么导致数据慢查询都有哪些常见的原因呢？今天田螺哥就跟大家聊聊导致MySQL慢查询的12个常见原因，以及对应的解决方法。

![image-20221204221904146](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204221904146.png)

## 1. SQL没加索引

很多时候，我们的慢查询，都是因为**没有加索引**。如果没有加索引的话，会导致全表扫描的。因此，应考虑在`where`的条件列，**建立索引**，尽量避免全表扫描。

**反例：**

```sql
select * from user_info where name ='捡田螺的小男孩公众号' ;
```

![image-20221204222110021](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204222110021.png)

**正例：**

```sql
//添加索引
alter table user_info add index idx_name (name);
```

![image-20221204222139505](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204222139505.png)

你也可以通过命令`show create table`，整张表的索引情况。

```sql
show create table user_info;
```

## 2. SQL 索引不生效

有时候我们明明加了索引了，但是索引却不生效。在哪些场景，索引会不生效呢？主要有以下十大经典场景：

![image-20221204222211038](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204222211038.png)

### 2.1 隐式的类型转换，索引失效

我们创建一个用户user表

```sql
CREATE TABLE user (
  id int(11) NOT NULL AUTO_INCREMENT,
  userId varchar(32) NOT NULL,
  age  varchar(16) NOT NULL,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_userid (userId) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

`userId`字段为**字串类型**，是B+树的普通索引，如果查询条件传了一个**数字**过去，会导致索引失效。如下：

![image-20221204222253710](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204222253710.png)

如果给数字加上`''`,也就是说，传的是一个字符串呢，**当然是走索引**，如下图：

![image-20221204222316243](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204222316243.png)

> 为什么第一条语句**未加单引号就不走索引**了呢？这是因为不加单引号时，是字符串跟数字的比较，它们类型不匹配，MySQL会做**隐式的类型转换**，把它们转换为浮点数再做比较。隐式的类型转换，索引会失效。

### 2.2 查询条件包含or，可能导致索引失效

我们还是用这个表结构：

```sql
CREATE TABLE user (
  id int(11) NOT NULL AUTO_INCREMENT,
  userId varchar(32) NOT NULL,
  age  varchar(16) NOT NULL,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_userid (userId) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

其中`userId`加了索引，但是`age`没有加索引的。我们使用了`or`，以下SQL是不走索引的，如下：

![image-20221204222439531](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204222439531.png)

对于`or`+没有索引的`age`这种情况，假设它走了`userId`的索引，但是走到`age`查询条件时，它还得全表扫描，也就是需要三步过程：**全表扫描+索引扫描+合并**。如果它一开始就走**全表扫描**，直接一遍扫描就完事。Mysql优化器出于效率与成本考虑，遇到`or`条件，让索引失效，看起来也合情合理嘛。

**注意**：如果`or`条件的列都加了索引，**索引可能会走也可能不走**，大家可以自己试一试哈。但是平时大家使用的时候，还是要注意一下这个`or`，学会用`explain`分析。遇到不走索引的时候，考虑拆开两条SQL。

### 2.3. like通配符可能导致索引失效。

并不是用了`like`通配符，索引一定会失效，而是like查询是以`%`开头，才会导致索引失效。

like查询以`%`开头，索引失效

```sql
explain select * from user where userId like '%123';
```

![image-20221204222633501](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204222633501.png)

把`%`放后面，发现索引还是正常走的，如下：

```sql
explain select * from user where userId like '123%';
```

![image-20221204222658398](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204222658398.png)

既然`like`查询以`%`开头，会导致索引失效。我们如何优化呢？

- 使用覆盖索引
- 把`%`放后面

### 2.4 查询条件不满足联合索引的最左匹配原则

MySQl建立联合索引时，会遵循最左前缀匹配的原则，即最左优先。如果你建立一个`（a,b,c）`的联合索引，相当于建立了`(a)、(a,b)、(a,b,c)`三个索引。

假设有以下表结构：

```sql
CREATE TABLE user (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_id varchar(32) NOT NULL,
  age  varchar(16) NOT NULL,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_userid_name (user_id,name) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

有一个联合索引`idx_userid_name`，我们执行这个SQL，查询条件是`name`，索引是无效：

```
explain select * from user where name ='捡田螺的小男孩';
```

因为查询条件列`name`不是联合索引`idx_userid_name`中的第一个列，索引不生效

![image-20221204222843874](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204222843874.png)

在联合索引中，查询条件满足**最左匹配原则**时，索引才正常生效。

![image-20221204222934626](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204222934626.png)

### 2.5 在索引列上使用mysql的内置函数

表结构：

```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(32) NOT NULL,
  `login_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_userId` (`userId`) USING BTREE,
  KEY `idx_login_time` (`login_Time`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
```

虽然`login_time`加了索引，但是因为使用了`mysql`的内置函数`Date_ADD()`，索引直接GG，如图：

![image-20221204223030874](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204223030874.png)

一般这种情况怎么优化呢？可以把**内置函数的逻辑转移到右边**，如下：

```sql
explain  select * from user where login_time = DATE_ADD('2022-05-22 00:00:00',INTERVAL -1 DAY);
```

### 2.6 对索引进行列运算（如，+、-、*、/）,索引不生效

表结构：

```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(32) NOT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_age` (`age`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
```

虽然`age`加了索引，但是因为它进行运算，索引直接迷路了。。。如图：

![image-20221204223124501](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204223124501.png)

所以**不可以对索引列进行运算，可以在代码处理好，再传参进去**。

### 2.7 索引字段上使用（！= 或者 < >），索引可能失效

表结构：

```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_age` (`age`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
```

虽然`age`加了索引，但是使用了`！= `或者`< >，not in`这些时，索引如同虚设。如下：

![image-20221204223223570](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204223223570.png)

![image-20221204223235494](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204223235494.png)

其实这个也是跟`mySQL优化器`有关，如果优化器觉得即使走了索引，还是需要扫描很多很多行的哈，它觉得不划算，**不如直接不走索引**。平时我们用`！= `或者`< >，not in`的时候，留点心眼哈。

### 2.8 索引字段上使用is null， is not null，索引可能失效

表结构:

```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `card` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`) USING BTREE,
  KEY `idx_card` (`card`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
```

单个`name`字段加上索引，并查询`name`为非空的语句，其实会走索引的，如下:

![image-20221204223314545](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204223314545.png)

单个`card`字段加上索引，并查询name为非空的语句，其实会走索引的，如下:

![image-20221204223334347](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204223334347.png)

但是它两用or连接起来，索引就失效了，如下：

![image-20221204223409620](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204223409620.png)

很多时候，也是因为数据量问题，导致了MySQL优化器放弃走索引。同时，平时我们用explain分析SQL的时候，如果`type=range`,要注意一下哈，因为这个可能因为数据量问题，导致索引无效。

### 2.9 左右连接，关联的字段编码格式不一样

新建两个表，一个`user`，一个`user_job`

```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `age` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `user_job` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `job` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

`user`表的`name`字段编码是`utf8mb4`，而`user_job`表的`name`字段编码为`utf8`。

![image-20221204223521748](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204223521748.png)

![image-20221204223533548](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204223533548.png)

执行左外连接查询,`user_job`表还是走全表扫描，如下：

![image-20221204223549208](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204223549208.png)

如果把它们的`name`字段改为编码一致，相同的SQL，还是会走索引。

![image-20221204223613432](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204223613432.png)

所以大家在做表关联时，注意一下**关联字段的编码问题**哈。

### 2.10 优化器选错了索引

MySQL 中一张表是可以支持多个索引的。你写`SQL`语句的时候，没有主动指定使用哪个索引的话，用哪个索引是由`MySQL`来确定的。

我们日常开发中，不断地删除历史数据和新增数据的场景，有可能会导致MySQL选错索引。那么有哪些解决方案呢？

- 使用`force index` 强行选择某个索引
- 修改你的SQl，引导它使用我们期望的索引
- 优化你的业务逻辑
- 优化你的索引，新建一个更合适的索引，或者删除误用的索引。

## 3. limit深分页问题

limit深分页问题，会导致慢查询，应该大家都司空见惯了吧。

### 3.1 limit深分页为什么会变慢

limit深分页为什么会导致**SQL变慢**呢？假设我们有表结构如下：

```sql
CREATE TABLE account (
  id int(11) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  name varchar(255) DEFAULT NULL COMMENT '账户名',
  balance int(11) DEFAULT NULL COMMENT '余额',
  create_time datetime NOT NULL COMMENT '创建时间',
  update_time datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (id),
  KEY idx_name (name),
  KEY idx_create_time (create_time) //索引
) ENGINE=InnoDB AUTO_INCREMENT=1570068 DEFAULT CHARSET=utf8 ROW_FORMAT=REDUNDANT COMMENT='账户表';
```

你知道以下`SQL`，执行过程是怎样的嘛？

```sql
select id,name,balance from account where create_time> '2020-09-19' limit 100000,10;
```

这个SQL的执行流程：

1. 通过普通二级索引树`idx_create_time`，过滤`create_time`条件，找到满足条件的主键`id`。
2. 通过`主键id`，回到`id主键索引树`，找到满足记录的行，然后取出需要展示的列（回表过程）
3. 扫描满足条件的`100010`行，然后扔掉前`100000`行，返回。

![image-20221204224433513](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204224433513.png)

`limit`深分页，导致`SQL`变慢原因有两个：

- `limit`语句会先扫描`offset+n`行，然后再丢弃掉前`offset`行，返回后`n`行数据。也就是说`limit 100000,10`，就会扫描`100010`行，而limit `0,10`，只扫描`10`行。
- `limit 100000,10` 扫描更多的行数，也意味着**回表更多的次数**。

### 3.2 如何优化深分页问题

我们可以通过减少回表次数来优化。一般有**标签记录法和延迟关联法**。

#### 3.2.1 **标签记录法**

> 就是标记一下上次查询到哪一条了，下次再来查的时候，从该条开始往下扫描。就好像看书一样，上次看到哪里了，你就折叠一下或者夹个书签，下次来看的时候，直接就翻到啦。

假设上一次记录到`100000`，则SQL可以修改为：

```
select  id,name,balance FROM account where id > 100000 limit 10;
```

这样的话，后面无论翻多少页，性能都会不错的，因为命中了`id索引`。但是这种方式有局限性：需要一种类似连续自增的字段。

#### 3.2.2 **延迟关联法**

延迟关联法，就是把条件转移到**主键索引树**，然后减少回表。如下：

```
select  acct1.id,acct1.name,acct1.balance FROM account acct1 INNER JOIN (SELECT a.id FROM account a WHERE a.create_time > '2020-09-19' limit 100000, 10) AS acct2 on acct1.id= acct2.id;
```

**优化思路**就是，先通过`idx_create_time`二级索引树查询到满足条件的`主键ID`，再与原表通过`主键ID`内连接，这样后面直接走了主键索引了，同时也减少了回表。

## 4. 单表数据量太大

### 4.1 单表数据量太大为什么会变慢？

一个表的数据量达到好几千万或者上亿时，加索引的效果没那么明显啦。性能之所以会变差，是因为维护索引的`B+`树结构层级变得更高了，查询一条数据时，需要经历的磁盘IO变多，因此查询性能变慢。

### 4.2 一棵B+树可以存多少数据量

**大家是否还记得，一个B+树大概可以存放多少数据量呢？**

InnoDB存储引擎最小储存单元是页，一页大小就是`16k`。

B+树叶子存的是数据，内部节点存的是键值+指针。索引组织表通过非叶子节点的二分查找法以及指针确定数据在哪个页中，进而再去数据页中找到需要的数据；

![image-20221204224710967](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204224710967.png)

假设B+树的高度为`2`的话，即有一个根结点和若干个叶子结点。这棵B+树的存放总记录数为=根结点指针数*单个叶子节点记录行数。

- 如果一行记录的数据大小为1k，那么单个叶子节点可以存的记录数 =16k/1k =16.
- 非叶子节点内存放多少指针呢？我们假设主键ID为**bigint类型，长度为8字节**(**面试官问你int类型，一个int就是32位，4字节**)，而指针大小在InnoDB源码中设置为6字节，所以就是8+6=14字节，16k/14B =16*1024B/14B = 1170

因此，一棵高度为2的B+树，能存放`1170 * 16=18720`条这样的数据记录。同理一棵高度为3的B+树，能存放`1170 *1170 *16 =21902400`，也就是说，可以存放两千万左右的记录。B+树高度一般为1-3层，已经满足千万级别的数据存储。

如果B+树想存储更多的数据，那树结构层级就会更高，查询一条数据时，需要经历的磁盘IO变多，因此查询性能变慢。

### 4.3 如何解决单表数据量太大，查询变慢的问题

一般超过千万级别，我们可以考虑**分库分表**了。

分库分表可能导致的问题：

- 事务问题
- 跨库问题
- 排序问题
- 分页问题
- 分布式ID

因此，大家在评估是否分库分表前，先考虑下，是否可以把部分历史数据归档先，如果可以的话，先不要急着**分库分表**。如果真的要分库分表，综合考虑和评估方案。比如可以考虑垂直、水平分库分表。水平分库分表策略的话，**range范围、hash取模、range+hash取模混合**等等。

## 5. join 或者子查询过多

一般来说，不建议使用子查询，可以把子查询改成`join`来优化。而数据库有个规范约定就是：**尽量不要有超过3个以上的表连接**。为什么要这么建议呢? 我们来聊聊，`join`哪些方面可能导致慢查询吧。

MySQL中，join的执行算法，分别是：`Index Nested-Loop Join`和`Block Nested-Loop Join`。

- `Index Nested-Loop Join`：这个join算法，跟我们写程序时的嵌套查询类似，并且可以用上**被驱动表的索引**。
- `Block Nested-Loop Join`：这种join算法，**被驱动表上没有可用的索引**,它会先把驱动表的数据读入线程内存`join_buffer`中，再扫描被驱动表，把被驱动表的每一行取出来，跟`join_buffer`中的数据做对比，满足join条件的，作为结果集的一部分返回。

`join`过多的问题：

> 一方面，过多的表连接，会大大增加SQL复杂度。另外一方面，如果可以使用被驱动表的**索引**那还好，并且使用**小表来做驱动表**，**查询效率更佳**。如果被驱动表**没有可用的索引**，join是在`join_buffer`内存做的，如果匹配的数据量比较小或者`join_buffer`设置的比较大，速度也不会太慢。但是，如果`join`的数据量比较大时，mysql会采用在硬盘上创建临时表的方式进行多张表的关联匹配，这种显然效率就极低，本来磁盘的 IO 就不快，还要关联。

一般情况下，如果业务需要的话，关联`2~3`个表是可以接受的，但是**关联的字段需要加索引**哈。如果需要关联更多的表，建议从代码层面进行拆分，在业务层先查询一张表的数据，然后以关联字段作为条件查询关联表形成`map`，然后在业务层进行数据的拼装。

## 6. in元素过多

如果使用了`in`，即使后面的条件加了索引，还是要注意`in`后面的元素不要过多哈。`in`元素一般建议不要超过`500`个，如果超过了，建议分组，每次`500`一组进行哈。

**反例：**

```sql
select user_id,name from user where user_id in (1,2,3...1000000); 
```

如果我们对`in的条件`不做任何限制的话，该查询语句一次性可能会查询出非常多的数据，很容易导致接口超时。尤其有时候，我们是用的子查询，in后面的子查询，你都不知道数量有多少那种，更容易采坑（**所以我把in元素过多抽出来作为一个小节**）。如下这种子查询：

```sql
select * from user where user_id in (select author_id from artilce where type = 1);
```

正例是，**分批进行**，每批500个：

```sql
select user_id,name from user where user_id in (1,2,3...500);
```

如果传参的ids太多，还可以做个参数校验什么的

```java
if (userIds.size() > 500) {
    throw new Exception("单次查询的用户Id不能超过500");
}
```

## 7. 数据库在刷脏页

### 7.1 什么是脏页

当内存数据页跟磁盘数据页内容不一致的时候，我们称这个内存页为“**脏页**”。内存数据写入到磁盘后，内存和磁盘上的数据页的内容就一致了，称为“**干净页**”。一般有更新SQL才可能会导致脏页，我们回忆一下：一条更新语句是如何执行的

### 7.2 一条更新语句是如何执行的？

以下的这个更新SQL，如何执行的呢？

```sql
update t set c=c+1 where id=666;
```

1. 对于这条更新SQL，执行器会先找引擎取`id=666`这一行。如果这行所在的数据页本来就在内存中的话，就直接返回给执行器。如果不在内存，就去磁盘读入内存，再返回。
2. 执行器拿到引擎给的行数据后，给这一行`C`的值加一，得到新的一行数据，再调用引擎接口写入这行新数据。
3. 引擎将这行新数据更新到内存中，同时将这个更新操作记录到`redo log`里面，但是此时`redo log `是处于`prepare`状态的哈。
4. 执行器生成这个操作的`binlog`，并把`binlog`写入磁盘。
5. 执行器调用引擎的提交事务接口，引擎把刚刚写入的`redo log`改成提交（commit）状态，更新完成。

![image-20221204225312611](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204225312611.png)

InnoDB 在处理更新语句的时候，只做了写日志这一个磁盘操作。这个日志叫作`redo log`（重做日志）。平时更新SQL执行得很快，其实是因为它只是在写内存和`redo log`日志，等到空闲的时候，才把`redo log`日志里的数据同步到磁盘中。

> 有些小伙伴可能有疑惑，`redo log`日志不是在磁盘嘛？那为什么不慢？其实是因为写`redo log`的过程是顺序写磁盘的。**磁盘顺序写**会减少寻道等待时间，速度比随机写要快很多的。

### 7.3 为什么会出现脏页呢？

更新SQL只是在写内存和`redo log`日志，等到空闲的时候，才把`redo log`日志里的数据同步到磁盘中。这时内存数据页跟磁盘数据页内容不一致,就出现脏页。

### 7.4 什么时候会刷脏页（flush）？

InnoDB存储引擎的`redo log`大小是固定，且是环型写入的，如下图（图片来源于MySQL 实战 45 讲）：

![image-20221204225419282](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204225419282.png)

那什么时候会刷脏页？有几种场景：

1. `redo log`写满了，要刷脏页。这种情况要尽量避免的。因为出现这种情况时，整个系统就不能再接受更新啦，即所有的更新都必须堵住。
2. 内存不够了，需要新的内存页，就要淘汰一些数据页，这时候会刷脏页

> InnoDB 用缓冲池（buffer pool）管理内存,而当要读入的数据页没有在内存的时候，就必须到缓冲池中申请一个数据页。这时候只能把最久不使用的数据页从内存中淘汰掉：如果要淘汰的是一个干净页，就直接释放出来复用；但如果是脏页呢，就必须**将脏页先刷到磁盘**，变成干净页后才能复用。

1. MySQL 认为**系统空闲**的时候，也会刷一些脏页
2. MySQL 正常关闭时，会把内存的脏页都 flush 到磁盘上

### 7.5 为什么刷脏页会导致SQL变慢呢？

1. `redo log`写满了，要刷脏页，这时候会导致系统所有的更新堵住，写性能都跌为0了，肯定慢呀。一般要杜绝出现这个情况。
2. 一个查询要淘汰的脏页个数太多，一样会导致查询的响应时间明显变长。

## 8. order by 文件排序

`order by`就一定会导致慢查询吗？**不是这样的哈**，因为`order by`平时用得多，并且数据量一上来，还是走**文件排序**的话，很容易有慢SQL的。听我娓娓道来，`order by`哪些时候可能会导致慢SQL哈。

### 8.1 order by 的 Using filesort文件排序

我们平时经常需要用到`order by` ，主要就是用来给某些字段排序的。比如以下SQL:

```
select name,age,city from staff where city = '深圳' order by age limit 10;
```

它表示的意思就是：**查询前10个，来自深圳员工的姓名、年龄、城市，并且按照年龄小到大排序。**

![image-20221204225551385](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204225551385.png)

查看`explain`执行计划的时候，可以看到`Extra`这一列，有一个`Using filesort`，它表示用到**文件排序**。

### 8.2 order by文件排序效率为什么较低

`order by`用到文件排序时，为什么查询效率会相对低呢？

![image-20221204225626742](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204225626742.png)

`order by`排序，分为全字段排序和rowid排序。它是拿`max_length_for_sort_data`和结果行数据长度对比，如果结果行数据长度超过`max_length_for_sort_data`这个值，就会走**rowid排序**，相反，则走**全字段排序**。

#### 8.2.1 rowid排序

rowid排序，一般需要**回表去找满足条件的数据，所以效率会慢一点**。以下这个SQL，使用`rowid`排序，执行过程是这样：

```
select name,age,city from staff where city = '深圳' order by age limit 10;
```

1. MySQL 为对应的线程初始化`sort_buffer`，放入需要排序的`age`字段，以及`主键id`；
2. 从索引树`idx_city`， 找到第一个满足 `city='深圳’`条件的`主键id`，也就是图中的`id=9`；
3. 到`主键id索引树`拿到`id=9`的这一行数据， 取`age和主键id`的值，存到`sort_buffer`；
4. 从索引树`idx_city`拿到下一个记录的`主键id`，即图中的`id=13`；
5. 重复步骤 3、4 直到`city`的值不等于深圳为止；
6. 前面5步已经查找到了所有`city`为深圳的数据，在`sort_buffer`中，将所有数据根据age进行排序；
7. 遍历排序结果，取前10行，并按照`id`的值回到原表中，取出`city、name 和 age`三个字段返回给客户端。

![image-20221204225732688](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204225732688.png)

#### 8.2.2 全字段排序

同样的SQL，如果是走全字段排序是这样的：

```
select name,age,city from staff where city = '深圳' order by age limit 10;
```

1. MySQL 为对应的线程初始化`sort_buffer`，放入需要查询的`name、age、city`字段；
2. 从索引树`idx_city`， 找到第一个满足 `city='深圳’`条件的主键 id，也就是图中的`id=9`；
3. 到主键`id索引树`拿到`id=9`的这一行数据， 取`name、age、city`三个字段的值，存到`sort_buffer`；
4. 从索引树`idx_city `拿到下一个记录的主键`id`，即图中的`id=13`；
5. 重复步骤 3、4 直到`city`的值不等于深圳为止；
6. 前面5步已经查找到了所有`city`为深圳的数据，在`sort_buffer`中，将所有数据根据`age`进行排序；
7. 按照排序结果取前10行返回给客户端。

![image-20221204225800181](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204225800181.png)

`sort_buffer`的大小是由一个参数控制的：`sort_buffer_size`。

- 如果要排序的数据小于`sort_buffer_size`，排序在`sort_buffer`内存中完成
- 如果要排序的数据大于`sort_buffer_size`，则借助磁盘文件来进行排序。

> 借助磁盘文件排序的话，**效率就更慢一点**。因为先把数据放入`sort_buffer`，当快要满时。会排一下序，然后把`sort_buffer`中的数据，放到临时磁盘文件，等到所有满足条件数据都查完排完，再用归并算法把磁盘的临时排好序的小文件，合并成一个有序的大文件。

### 8.3 如何优化order by的文件排序

`order by`使用**文件排序**，效率会低一点。我们怎么优化呢？

- 因为数据是无序的，所以就需要排序。如果数据本身是有序的，那就不会再用到文件排序啦。而索引数据本身是有序的，我们通过建立索引来优化`order by`语句。
- 我们还可以通过调整`max_length_for_sort_data`、`sort_buffer_size`等参数优化；

## 9. 拿不到锁

有时候，我们查询一条很简单的SQL，但是却等待很长的时间，不见结果返回。一般这种时候就是表被锁住了，或者要查询的某一行或者几行被锁住了。我们只能慢慢等待锁被释放。

> 举一个生活的例子哈，你和别人合租了一间房子，这个房子只有一个卫生间的话。假设某一时刻，你们都想去卫生间，但是对方比你早了一点点。那么此时你只能等对方出来后才能进去。

这时候，我们可以用`show processlist`命令，看看当前语句处于什么状态哈。

## 10. delete + in子查询不走索引！

之前见到过一个生产慢SQL问题，当`delete`遇到`in`子查询时，即使有索引，也是不走索引的。而对应的`select + in`子查询，却可以走索引。

MySQL版本是5.7，假设当前有两张表account和old_account,表结构如下：

```sql
CREATE TABLE `old_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `name` varchar(255) DEFAULT NULL COMMENT '账户名',
  `balance` int(11) DEFAULT NULL COMMENT '余额',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1570068 DEFAULT CHARSET=utf8 ROW_FORMAT=REDUNDANT COMMENT='老的账户表';

CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `name` varchar(255) DEFAULT NULL COMMENT '账户名',
  `balance` int(11) DEFAULT NULL COMMENT '余额',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1570068 DEFAULT CHARSET=utf8 ROW_FORMAT=REDUNDANT COMMENT='账户表';
```

执行的SQL如下：

```sql
delete from account where name in (select name from old_account);
```

查看执行计划，发现不走索引：

![image-20221204230004584](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204230004584.png)

但是如果把`delete`换成`select`，就会走索引。如下：

![image-20221204230022294](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204230022294.png)

为什么`select + in`子查询会走索引，`delete + in`子查询却不会走索引呢？

我们执行以下SQL看看：

```sql
explain select * from account where name in (select name from old_account);
show WARNINGS; //可以查看优化后,最终执行的sql
```

结果如下：

```sql
select `test2`.`account`.`id` AS `id`,`test2`.`account`.`name` AS `name`,`test2`.`account`.`balance` AS `balance`,`test2`.`account`.`create_time` AS `create_time`,`test2`.`account`.`update_time` AS `update_time` from `test2`.`account` 
semi join (`test2`.`old_account`)
where (`test2`.`account`.`name` = `test2`.`old_account`.`name`)
```

可以发现，实际执行的时候，MySQL对`select in`子查询做了优化，把子查询改成`join`的方式，所以可以走索引。但是很遗憾，对于`delete in`子查询，MySQL却没有对它做这个优化。

日常开发中，大家注意一下这个场景哈，大家有兴趣可以看下这篇文章哈：[生产问题分析！delete in子查询不走索引？！](https://mp.weixin.qq.com/s?__biz=Mzg3NzU5NTIwNg==&mid=2247495170&idx=1&sn=ce914de3abdb0d887e286b680b25111f&chksm=cf22312bf855b83d31a00da110626747df8e69fca1bc310642c56e39d663b006a8105f9fb1e1&token=1495321435&lang=zh_CN&scene=21#wechat_redirect)

## 11、group by使用临时表

`group by`一般用于分组统计，它表达的逻辑就是根据**一定的规则，进行分组**。日常开发中，我们使用得比较频繁。如果不注意，很容易产生慢SQL。

### 11.1 group by的执行流程

假设有表结构：

```sql
CREATE TABLE `staff` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `id_card` varchar(20) NOT NULL COMMENT '身份证号码',
  `name` varchar(64) NOT NULL COMMENT '姓名',
  `age` int(4) NOT NULL COMMENT '年龄',
  `city` varchar(64) NOT NULL COMMENT '城市',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='员工表';
```

我们查看一下这个SQL的执行计划：

```sql
explain select city ,count(*) as num from staff group by city;
```

![image-20230109210157321](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230109210157321.png)

- Extra 这个字段的`Using temporary`表示在执行分组的时候使用了**临时表**
- Extra 这个字段的`Using filesort`表示使用了**文件排序**

`group by`是怎么使用到临时表和排序了呢？我们来看下这个SQL的执行流程

```
select city ,count(*) as num from staff group by city;
```

1. 创建内存临时表，表里有两个字段`city和num`；
2. 全表扫描`staff`的记录，依次取出`city = 'X'`的记录。

- 判断临时表中是否有为 `city='X'`的行，没有就插入一个记录` (X,1)`;
- 如果临时表中有`city='X'`的行，就将X这一行的num值加 1；

3. 遍历完成后，再根据字段`city`做排序，得到结果集返回给客户端。这个流程的执行图如下：

![image-20221204230153215](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221204230153215.png)

**临时表的排序是怎样的呢？**

就是把需要排序的字段，放到sort buffer，排完就返回。在这里注意一点哈，排序分**全字段排序和rowid排序**

- 如果是全字段排序，需要查询返回的字段，都放入sort buffer，根据排序字段排完，直接返回
- 如果是rowid排序，只是需要排序的字段放入sort buffer，然后多一次回表操作，再返回。

### 11.2  group by可能会慢在哪里？

`group by`使用不当，很容易就会产生慢SQL 问题。因为它既用到临时表，又默认用到排序。有时候还可能用到磁盘临时表。

- 如果执行过程中，会发现`内存临时表`大小到达了上限（控制这个上限的参数就是tmp_table_size），会把内存临时表转成磁盘临时表。
- 如果数据量很大，很可能这个查询需要的磁盘临时表，就会占用大量的磁盘空间。

### 11.3 如何优化group by呢？

从哪些方向去优化呢？

- 方向1：既然它默认会排序，我们不给它排是不是就行啦。
- 方向2：既然临时表是影响`group by`性能的X因素，我们是不是可以不用临时表？

我们一起来想下，执行`group by`语句为什么需要临时表呢？`group by`的语义逻辑，就是统计不同的值出现的个数。如果这个这些值一开始就是有序的，我们是不是直接往下扫描统计就好了，就不用临时表来记录并统计结果啦?

可以有这些优化方案：

- group by 后面的字段加索引
- order by null 不用排序
- 尽量只使用内存临时表
- 使用SQL_BIG_RESULT

## 12. 系统硬件或网络资源

- 如果数据库服务器内存、硬件资源，或者网络资源配置不是很好，就会慢一些哈。这时候可以升级配置。这就好比你的计算机有时候很卡，你可以加个内存条什么的一个道理。
- 如果数据库压力本身很大，比如高并发场景下，大量请求到数据库来，数据库服务器`CPU`占用很高或者`IO利用率`很高，这种情况下所有语句的执行都有可能变慢的哈。

## 最后

如果测试环境数据库的一些参数配置，和生产环境参数配置不一致的话，也容易产生慢SQL哈。之前见过一个慢SQL的生产案例，就是测试环境用了`index merge`，所以查看explain执行计划时，是可以走索引的，但是到了生产，却全表扫描，最后排查发现是生产环境配置把`index merge`关闭了。大家是否还遇到其他场景的慢SQL呢？如果有的话，欢迎评论区留言交流哈



## 参考文章

[盘点MySQL慢查询的12个原因](https://mp.weixin.qq.com/s?__biz=Mzg3NzU5NTIwNg==&mid=2247499624&idx=1&sn=561b9cb7fe831ca7cb2d9fd65691e85e&chksm=cf222041f855a957ac50c0a53baaec6d26be32427259b2974450620f33a8c834419fe535e83d&token=1921274367&lang=zh_CN&scene=21#wechat_redirect)

[从11s到170ms！看看人家的接口优化技巧，那叫一个优雅](https://mp.weixin.qq.com/s/ARMelvGnqxeWs8wCeV2r7A)