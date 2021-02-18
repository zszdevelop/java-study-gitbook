# VIEW视图

## 1. 是什么

视图是虚拟的表，与包含数据的表不一样，视图值包含使用时动态检索数据的查询

>MySQL 从5版本开始支持视图
>
>SQLite 只支持读视图，不支持更改

视图提供了一种封装SELECT 语句的层次，可以用来简化数据处理，重新格式化或保护基础数据

### 1.1 使用背景

我们先看一个SQL

```
SELECT cust_name,cust_contact
FROM Customers,Orders,OrderItems
WHERE Customers.cust_id = Orders.cust_id
AND OrderItem.order_num = Orders.order_num
AND prod_id = 'RANG01'；
```

这里查看用来检索订购了某种商品的顾客。

**任何需要这个数据的人都必须理解相关的表结构，知道如何创建查询和对表进行联结**检索其他产品的相同数据，必须修改最后的where子句

### 1.2 使用视图包装成虚拟表

我们可以吧整个查询包装成一个名为ProductCustomers 的虚拟表，则可以轻松的检索出相同的数据

```
SELECT cust_name,cust_contact
FROM ProductCustomers
WHERE prod_id = 'RANG01';
```

ProductCustomers 是一个视图，他不包含任何列或数据，包含的是一个查询

## 2. 为什么使用视图

- 重用SQL语句
- 简化复杂的SQL操作，在编写查询后，可以方便得重用他而不必知道其基本查询细节
- 使用表的一部分而不是整个表
- 保护数据。可以授予用户访问表的特定部分权限，而不是整个表的访问权限
- 更改数据格式和表示。视图可以返回与底层表的表示和格式不同的数据

创建视图之后，可以用与表的基本相同的方式使用他们。可以对视图执行SELECT 操作，过滤，排序数据。将视图联结到其他视图或表，甚至天天加班和更新数据

**视图本身不包含数据，返回的数据来自其他表**

### 2.1 性能问题

因为视图不包含数据，所以每次使用视图时，都必须处理查询执行时需要的所有检索。

如果你用多个联结和过滤创建了复杂的视图或者嵌套了视图，性能可能就会下降的厉害。

PS:部署前要进行测试

## 3. 创建视图

视图用CREATE VIEW 来创建

>删除视图：DROP VIEW viewname;
>
>重命名视图：必须先删除在重新创建

### 3.1 利用视图简化复杂的联结

一个最常见的视图应用是隐藏复杂的SQL,这通常涉及联结

```
CREATE VIEW ProductCustomers AS
SELECT cust_name,cust_contact,prod_id
FROM Customer,Orders,OrderItems
WHERE Customer.cust-id= Orders.cust_id
AND OrderItems.order_num = Orders.order_num;
```

这条语句创建了一个名为ProductCustomers 的视图，联结了三个表，返回已订购了任意产品的所有顾客列表

检索订购了产品RANG01 的顾客

```
SELECT cust_name,cust_contact
FROM ProductCustomers
WHERE prod_id = 'RANG01';
```

### 3.2 用视图重新格式化检索出的数据

```
CREATE VIEW VendorLocations AS 
SELECT RTRIM(vend_name)+'('+RTRIM(vend_country)+')' AS vend_id
FROM Vendors;
```

### 3.3 使用视图过滤不想要的数据

```
CREATE VIEW CustomerEMailList AS 
SELECT cust_id,cust_name,cust_email
FROM Customers
WHERE cust_email IS NOT NULL;
```

### 3.4 使用视图与计算字段

```
CREATE VIEW OrderItemsExpanded AS 
SELECT order_num,
		prod_id,
		qquantity*item_price AS expanded_price
FROM OrderItems;
```

