# MySQL-主从复制与读写分离

## 1. 主从复制

主要涉及三个线程: binlog 线程、I/O 线程和 SQL 线程。

- **binlog 线程** : 负责将主服务器上的数据更改写入二进制日志中。
- **I/O 线程** : 负责从主服务器上读取二进制日志，并写入从服务器的中继日志中。
- **SQL 线程** : 负责读取中继日志并重放其中的 SQL 语句。

![image-20220630205020937](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630205020937.png)

## 2. 读写分离

主服务器处理写操作以及实时性要求比较高的读操作，而从服务器处理读操作。

读写分离能提高性能的原因在于:

- 主从服务器负责各自的读和写，极大程度缓解了锁的争用；
- **从服务器可以使用 MyISAM，提升查询性能以及节约系统开销；**
- 增加冗余，提高可用性。

读写分离常用代理方式来实现，代理服务器接收应用层传来的读写请求，然后决定转发到哪个服务器。

![image-20220630205134688](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630205134688.png)

## 参考文章

[MySQL - 主从复制与读写分离](https://pdai.tech/md/db/sql-mysql/sql-mysql-slave.html)