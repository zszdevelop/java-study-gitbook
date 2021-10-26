# Flyway常见问题

## 1. 初始化数据过程会发生错误回滚？

- 每一个sql 文件会有 一个单独的事物

- 如果单个文件中发 生错误，单个文件的操作会回滚
  -  比如有1、2、3个 文件，第 二个文件发生错误，第二个文件所有操作将会回滚，第三个文件不会执行。
  - 但： Unfortunately, today only DB2, PostgreSQL, Derby, EnterpriseDB and to a certain extent SQL Server support DDL statements inside a transaction。 
  - 所以，建议不要把ddl 文件和dml语句句放到同 一个文件 里，避免不必要的麻烦。

## 2. 多个节点能够并行执行migration吗？

Flyway使用数据库锁机制（locking technology of your database）来协调多个节点，从而保证多套应用程序可同时执行migration，而且集群控制也可做配置。

## 参考文章

[flyway使用简介](https://www.cnblogs.com/liuyupen/p/11101594.html)