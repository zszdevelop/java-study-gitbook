# INSERT插入数据

INSERT 用来将行插入（或添加）到数据库表

## 2. 插入的几种方式

### 2.1 插入完整的行

要求指定表名和插入到新行中的值

```
INSERT INTO Customers
VALUES ('1000006',
		'tom',
		'1234',
		'NYU',
		NULL
)
```

- 存储到表中每一列的数据在VALUES子句中给出，必须给每一列提供一个值，

- 如果列没有值，应该使用NULL值（假定表允许控制）

- 各列必须以表定义中**出现的次序填充**

这种方式面临的问题

虽然语法简单，但并不安全，应该尽量避免使用·

#### 2.1.1 更安全的写法

```
INSERT INTO Customers(cust_id,
					  cust_name,
					  cust_address,
					  cust_city)
VALUES('1000006',
		'TOM',
		'123 ADY',
		'SHANG HAI'
)
```

因为提供了列名，VALUES 必须以其指定的次序匹配指定的列名，不一定按各列出现在表中实际次序

优点：即使表结构改变，这条INSERT 语句仍然能正常工作

### 2.2 插入某些查询的结果

INSERT SELECT: 利用SELECT 的结果插入表中，他是由INSERT 和一条SELECT语句组成

```
# 把顾客列合并到Customers中
INSERT INTO Customers(cust_id,
					  cust_contact,
					  cust_email,
					  cust_name)
SELECT cust_id,
	   cust_contact,
	   cust_email,
	   cust_name
FROM CustNew;

```

#### 2.2.1 插入多行

INSERT 通常只插入一行，要插入多行，必须执行多个INSERT 语句，

但是INSERT SELECT 是个例外，他可由用一条INSERT 插入多行，不管select 返回多少行，都将被insert 插入

## 3.从一个表复制到另一个表

有一种数据插入不使用 INSERT 语句。要将一个表的内容复制到一个新的表（运行中创建的表），可以使用**SELECT INTO 语句**

```
SELECT *
INTO CustCopy
FROM Customers;
```

在MYSQL,ORACLE,SQLITE 中的语法稍有不同

```
CREATE TABLE CustCopy AS
SELECT * FROM Customersl
```

### 3.1 SELECT INTO 与 INSERT SELECT区别

- INSET SELECT

  将数据添加到一个已经存在的表（插入数据）

- SELECT INTO

  将数据复制到一个新表（导出数据）