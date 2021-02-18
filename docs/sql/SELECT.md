# SELECT检索数据

## 1. SELECT 查询数据

使用SELECT 检索数据，必须至少给出两条信息

- 想选择什么
- 从什么地方选择

### 1.1 检索单个列

```
SELECT prod_name 
FROM products;
```

### 1.2 检索多个列

多个列名用逗号隔开

```
SELECT prod_id,prod_name 
FROM products;
```

### 1.3 检索所有列

通配符（*），返回所有的列

**通常不用*，因为会降低检索和应用程序性能**

```
SELECT * 
FROM products;
```

### 1.4 检索不同的值

DISTINCT关键字，指示数据库只返回不同的值

```
SELECT DISTINCT vend_id 
FROM products;
```

### 1.5 限制结果

每个数据库都不一致，例如选取前5条

#### 1.5.1 ORACLE下

```
SELECT prod_name 
FROM products 
WHERE ROWNUM <=5;
```

#### 1.5.2 MYSQL

```
SELECT prod_name 
FROM products 
LIMIT 5;
```

如果要得到**后面5行数据**

```
SELECT prod_name 
FROM products
LIMIT 3  OFFSET 4;
```

LIMIT 3  OFFSET 4; 表示从第4行起的3行数据，

- 第一个数字是检索的行数
- 第二个数字是指从哪儿开始

**简化**

LIMIT 4  OFFSET 3 简化成 LIMIT 3,4;

```
SELECT prod_name 
FROM products 
LIMIT 3,4;
```

