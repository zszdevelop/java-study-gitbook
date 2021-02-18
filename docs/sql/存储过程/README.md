# 存储过程

## 1. 背景

我们大多数SQL语句都是针对一个或多个表的单条语句，但是并非所有表都这么简单。

经常**会有一些复杂的操作需要多条语句才能完成**

- 执行这个处理需要针对许多表的多条sql语句

- 需要执行的具体sql语句及其次序也不是固定的(例如;可能会根据物品的库存而变化)

### 1.1 解决方案

单独编写每条SQL语句，并根据结果又条件得执行其他语句

## 2. 是什么

存储过程就是为以后使用而保存的一条或多条SQL,可以将他视为批文件，虽然作用不仅仅是批文件

>MySQL 5 之后才支持存储过程
>
>SQLite不支持存储过程

## 3. 为什么使用存储过程

- 通过把处理封装在一个易用的单元中，可以简化复杂操作
- 由于不要求反复建立一系列的处理不走，因而保证了数据的一致性。如果所有开发人员和应用程序都使用同一存储过后才能，则所使用的**代码都是相同**的，这一点的延伸就是**防止错误**。需要执行的步骤越多，出错的可能性就越大
- 简化对变动的管理
- 因为存储过程通常以编译过的形式存储，所以工作量少，提高了**性能**

简化来说：简单，安全、高性能

### 3.1 缺点

- 不同DBMS 中存储过程语法不同
- 编写存储过程比编写基本SQL语句复杂，需要更高的技能，更丰富的经验

## 4. 创建存储过程

对邮件发送清单中具有邮件地址的顾客进行计算

### 4.1 ORACLE 

```
CREATE PROCEDURE MailinglistCount(
	ListCount OUT INTEGER)
IS
v_rows INTEGER
BEGIN 
	SELECT COUNT(*) INTO v_rows
	FROM CUSTOMERS
	wHERE NOT cust_email IS NOLL
	ListCount := v_rows;
END;
```

- 这个存储过程有一个ListCount 的参数。

  此参数从存储过程返回一个值，而不是传递一个值给存储过程

- 关键字OUT用来表示行为

  - IN 传递值给存储过程

  - OUT 从存储过程返回值
  - INOUT 既传值给存储过程，也从存储过程返回值

- 存储过程的代码在BEGIN 和END 语句中

####  4.1.1 调用方式

```
var ReturnValue NUMBER 
EXEC MaillingListCount(:ReturnValue);
SELECT returnValue;
```

这段代码声明一个变量来保存存储过程返回的任何值，然后执行存储过程，在使用SELECT 语句显示返回的值

## 5.执行存储过程

执行存储过程，既EXECUTE 

EXECUTE 接受存储过程名和需要传递给他的任何参数

```
EXECUTE AddNewProduct('jts01',
					  'stuffed eiffel',
					  6.49);
```

这里执行一个名为AddNewProduct的存储过程，将一个新产品添加到Product表中