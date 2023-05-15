---
order: 920
category:
  - 数据库
  - Mysql

---

# MySQL - 慢日志

## 1. 简介

慢日志全称为慢查询日志（Slow Query Log），主要用来记录在 MySQL 中执行时间超过指定时间的 SQL 语句。通过慢查询日志，可以查找出哪些语句的执行效率低，以便进行优化。

>开启慢查询日志是有代价的（跟 bin log、optimizer-trace 一样），所以它默认是关闭的

### 1.1 获取慢日志开启状态

```
show variables like 'slow_query%';
```

![image-20230515094425495](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230515094425495.png)



### 1.2 查询慢日志超时配置

 SQL 才记录到慢日志，默认是 10 秒

```
show variables like '%long_query%';
```

## 2. 慢日志配置

### 2.1 修改方案1：动态修改（重启后失效）

动态修改参数（重启后失效）

```
set @@global.slow_query_log=1; -- 1 开启，0 关闭，重启后失效 
set @@global.long_query_time=3; -- mysql 默认的慢查询时间是 10 秒，另开一个窗口后才会查到最新值 

show variables like '%long_query%'; 
show variables like '%slow_query%';
```

### 2.2 修改 配置文件my.cnf（重启不失效）

默认情况下，MySQL 并没有开启慢日志，可以通过修改 slow_query_log 参数来打开慢日志。与慢日志相关的参数介绍如下：

- **slow_query_log**：是否启用慢查询日志，默认为0，可设置为0、1，1表示开启。
- **slow_query_log_file**：指定慢查询日志位置及名称，默认值为host_name-slow.log，可指定绝对路径。
- **long_query_time**：慢查询执行时间阈值，超过此时间会记录，默认为10，单位为s。
- **log_output**：慢查询日志输出目标，默认为file，即输出到文件。
- **log_timestamps**：主要是控制 error log、slow log、genera log 日志文件中的显示时区，默认使用UTC时区，建议改为 SYSTEM 系统时区。
- **log_queries_not_using_indexes**：是否记录所有未使用索引的查询语句，默认为off。
- **min_examined_row_limit**：对于查询扫描行数小于此参数的SQL，将不会记录到慢查询日志中，默认为0。
- **log_slow_admin_statements**：慢速管理语句是否写入慢日志中，管理语句包含 alter table、create index 等，默认为 off 即不写入。

#### 2.2.1  常用配置

在配置文件中，我们可以设置以下几个慢日志相关参数：

```text
# 慢查询日志相关配置，可根据实际情况修改
vim /etc/my.cnf 
[mysqld] 
slow_query_log = 1
slow_query_log_file = /var/log/mysql/mysql-slow.log
long_query_time = 2
log_timestamps = SYSTEM
log_output = FILE
```

## 3. 具体案例

```sql
# 该条SQL执行时间超过阈值

# Time: 2023-05-15T01:30:09.796188Z
# User@Host: root[root] @  [117.30.56.143]  Id:   205
# Query_time: 2.922847  Lock_time: 0.000003 Rows_sent: 10  Rows_examined: 6009
SET timestamp=1684114206;
/* ApplicationName=IntelliJ IDEA 2022.3.2 */ SELECT * FROM test_table t
                  left join test_table tt on 1=1

         WHERE t.name LIKE '%test%' AND t.id > 1 ORDER BY t.id DESC LIMIT 10;
```

如果启用了慢速查询日志，并且选择了 FILE 作为输出目标，则写入日志的每个语句都以 # 字符开头。对于每一组慢SQL，第一行记录的是该条 SQL 执行的时刻（如果 log_timestamps 参数为 UTC ，则改时间会显示 UTC 时区时间），第二行记录的是执行该语句的用户和 IP 以及链接 id ，第三行的几个字段解释如下：

- **Query_time**: duration 语句执行时间，以秒为单位。
- **Lock_time**: duration 获取锁的时间(以秒为单位)。
- **Rows_sent**: N 发送给 Client 端的行数。
- **Rows_examined**: N 服务器层检查的行数(不计算存储引擎内部的任何处理)。

下面两行分别是此语句执行时候的时间戳和具体慢 SQL 。

>在实际环境下，不建议开启 log_queries_not_using_indexes 参数，此参数打开后可能导致慢日志迅速增长。对于慢日志的筛选与分析，我们可以借助 mysqldumpslow、pt-query-digest 等工具来分析。对于慢日志文件，要定期进行归档处理，比如可以暂时关闭慢日志，然后将旧文件重命名，之后再开启慢日志，这样就会写入新的日志文件中，有效减小日志体积。

## 4. **mysqldumpslow**

>mysql8.0 没有找到mysqldumpslow，还未实际操作

[官方分析](https://link.juejin.cn?target=https%3A%2F%2Fdev.mysql.com%2Fdoc%2Frefman%2F5.7%2Fen%2Fmysqldumpslow.html)

MySQL 提供了 mysqldumpslow 的工具，在 MySQL 的 bin 目录下。

```sql
mysqldumpslow --help
```

例如：查询用时最多的 10 条慢 SQL：

```sql
mysqldumpslow -s t -t 10 -g 'select' /var/lib/mysql/localhost-slow.log
```

![image-20230515095146035](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230515095146035.png)

Count 代表这个 SQL 执行了多少次；

Time 代表执行的时间，括号里面是累计时间；

Lock 表示锁定的时间，括号是累计；

Rows 表示返回的记录数，括号是累计。

除了慢查询日志之外，还有一个 SHOW PROFILE 工具可以使用

## 参考文章

[Mysql-如何进行慢SQL查询](https://juejin.cn/post/7092722546306449438)

[MySQL慢日志全解析！](https://zhuanlan.zhihu.com/p/373155073)

[mysql测试数据生成](http://www.datamaker.online/)
