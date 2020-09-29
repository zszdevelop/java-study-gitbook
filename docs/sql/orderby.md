# ORDER BY排序检索数据

## 1. 为什么使用排序

如果数据不排序，那么他检索出来的结果，一般以他在数据库底层中的出现顺讯显示，可能是添加的顺序。

但如果数据更新或删除，就有可讷讷个收到DBMS重用回收存储空间的方式影响

## 2. 概述

ORDER BY 子句取一个或多个列的名字，据此对输出结果进行排序

### 2.1 单个列排序

对prod_name 列以字母顺序排序

ORDER BY 要在SELECT 语句的最后一行

```
SELECT prod_name
FROM Products
ORDER BY prod_name;
```

### 2.2 多个列排序

多个列之间用“,”分隔

```
SELECT prod_id,prod_price,prod_name 
FROM products
ORDER BY prod_price,prod_name;
```

- 仅在多个行具有相同的prod_price值时，才对产品按prod_name 进行排序

- 如果prod_price 列中的所有值都是唯一的，则不会按prod_name 排序

### 2.3 按列位置排序

除了按列名还可以按列位置

```
SELECT prod_id,prod_price,prod_name 
FROM products
ORDER BY 2,3;
```

- 好处

  不用重新输入列名

- 缺点

  - 不明确给出列名有可能造成错用列名排序
  - 对SELECT 清单进行更改时容易错误地对数据进行排序

### 2.4 指定排序的方案

- ASC (ASCENDING):升序

  数据排序不限定升序排序（从A-Z）这只是默认的排序顺序，

- DESC (DESCENDING):降序
- 还可以使用ORDER BY 子句进行降序（Z-A）排序。

例：价格降序来排序产品（最贵的排在最前面）

```
SELECT prod_id,prod_price,prod_name
FROM products
ORDER BY prod_price DESC,prod_name;
```

DESC 只应用到签名的列名