# 事务

事务处理（transaction processing）：通过确保成批的SQL 操作**要么完全执行，要么完全不执行，来维护数据库的完整性**

### 1.1 术语

- 事务(transaction)：

  指一组SQL语句

- 回退（rollback）

  撤销指定SQL语句的过程

- 提交（commit）

  将未存储的SQL语句结果写入数据库表

- 保留点（savepoint）

  事务处理中设置的临时占位符（placeholder），可以对他发布回退（与回退整个事务不同）

## 2. 事务操作实例

### 2.1 SQL Server

```
BEGIN TRANSATION
...
COMMIT TRANSACTION
```

BEGIN TRANSATION 和 COMMIT TRANSACTION 语句之间的SQL 必须完全执行或者完全不执行

### 2.2 MySQL

```
START TRANSACTION 
...
```

### 2.3 ORACLE

```
SET TRANSACTION
...
```

## 3. 事务结束

多数实现没有明确表示事务处理在何时结束，事务一直存在，知道被中断。

通常COMMIT 用于保存更改，ROLLBACK用于撤销

### 3.1 ROLLBACK

SQL 的 ROLLBACK 命令用例回退（撤销）SQL 语句

```
DELETE FROM ORDER；
ROLLBACK;
```

### 3.2 COMMIT

一般的SQL语句都是针对数据库表直接执行和编写的，这就是隐式提交（implicit commit）,既提交操作是自动进行的

#### 3.2.1 ORDER

```
SET TRANSCTION
DELETE OrderItems WHERE order_num =12345;
DELETE Orders WHERE order_num = 1234;
COMMIT;
```

## 4.保留点

使用简单的ROLLBACK 和 COMMIT 语句，可以写入或者撤销整个事务。

但是，复杂的事务可能需要**部分提交或者回退**

### 4.1 是什么

要支持回退部分事务，必须在事务处理快中的合适位置**放置占位符**，这样如果需要回退，可以**回退到某个占位符**。这些占位符就是保留点

### 4.2 MySQL,ORACLE

创建占位符

```
SAVEPOINT delete1；
```

回退到占位符

```
ROLLBACK TO delete1;
```

