# WHERE过滤数据

数据库表一般包含大量的数据，很少需要检索所有表中的行。通常只会根据特定操作或者报告的需要提取表中的子集

在SELECT 语句中，数据根据WHERE 子句中指定的搜索条件进行过滤

```
SELECT prod_name,prod_price
FROM products
WHERE prod_price = 3.49;
```

这条语句并不返回所有行，只返回prod_price 的值为3.49的行

## 2. SQL 过滤与 应用过滤

数据也可以在应用层过滤，为此SQL 的SELECT 语句为客户端应用检索出超过实际所需的数据，然后客户端代码对返回的数据进行循环，提取出所需要的行

这种方式极不妥

- 优化数据库后可以更快速有效的对数据进行过滤，极大提升响应性能
- 服务器发送多余数据，导致带宽浪费

## 3. WHERE 子句操作符

| 操作符 | 说明     |      | 操作符  | 说明               |
| ------ | -------- | ---- | ------- | ------------------ |
| =      | 等于     |      | >       | 大于               |
| <>     | 不等于   |      | >=      | 大于等于           |
| !=     | 不等于   |      | !>      | 不大于             |
| <      | 小于     |      | BETWEEN | 在指定的两个值之间 |
| <=     | 小于等于 |      | IS NULL | 为NULL 值          |
| !<     | 不小于   |      |         |                    |

## 4. 例子

### 4.1 检查单个值

加个小于10美元的产品

```
SELECT prod_name,prod_price
FROM products
WHERE prod_price <10;
```

### 4.2 不匹配检查

```
SELECT vend_id,prod_name 
FROM products
WHERE vent_id != 'DLL01';
```

### 4.3 范围值检查

检查某个范围的值可以使用`BETWEEN`操作符

```
SELECT prod_name,prod_price
FROM products
WHERE prod_price BETWEEN 5 AND 10;
```

### 4.4 空值检查

用来检查具有NULL值的列

```
SELECT cust_name 
FROM Customers
WHERE cust_email IS NULL;
```

## 5.高级过滤

### 5.1 AND操作符

SELECT 语句包含两个过滤条件，用AND连接在一起

AND 操作符只给出满足所有条件的行

```
SELECT prod_id,prod_price
FROM products
WHERE vend_id="DELL01" AND prod_price <=4;
```

### 5.2 OR 操作符

OR操作符 表示匹配任一条件的行

在满足第一个条件之后就不再执行第二个条件了

```
SELECT prod_name,prod_price
FROM products
WHERE vend_id ='DLL01' OR vend_id ="BRS01"
```

### 5.3 求值顺序

WHERE 子句可以包含任意的AND和OR 操作符，但会出现一个问题

**在处理OR操作符之前，会先处理AND 操作符**

为了解决此问题，需要使用圆括号对操作符进行明确分组

圆括号具有比AND或OR 更高的求值顺序

```
SELECT prod_name,prod_price
FROM prodcts
WHERE (vend_id='DLL01' OR vend_id='BRS01')
	AND prod_price >=10
```

#### 5.4 IN 操作符

IN 操作符用来指定条件范围，范围中的每个条件都可以进行匹配

IN 取一组由逗号分隔，括在圆括号中的合法值

```
SELECT prod_name ,prod_price
FROM products
WHERE vend_id IN ('DLL01','BRS01')
ORDER BY prod_name;
```

#### 5.4.1 为什么选IN 操作符

- 在有很多合法选项时，IN 操作符更清楚，更直观
- 在与其他AND和OR 操作符组合使用IN 时，求值顺序更容易管理
- IN 操作符比一组OR 操作符**执行得更快**

- IN 最大的优点可以**包含其他SELECT 语句**，能够动态简历WHERE 子句

### 5.5 NOT操作符

NOT 操作可以否定其后所跟的任何条件

```
SELECT prod_name
FROM products
WHERE NOT vend_id='DLL01'
ORDER BY prod_name;
```

