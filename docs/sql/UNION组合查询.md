# UNION组合查询

大多数SQL查询只包含一个或多个表中返回数据的单条SELECT 语句。但是，SQL也允许执行**多个查询（多条SQL语句）**，并将结果作为**一个查询结果集**返回。这些组合查询通常称为并（union）或复合查询（compound query）

两种情况需要组合查询

- 在一个查询中从不同的表返回结构数据
- 对一个表执行多个查询，按一个查询返回数据

```
SELECT cust_name,cust_contact,cust_email
FROM Customers
WHERE cust_state IN ('IL','IN')
UNION
SELECT cust_name,cust_contact,cust_email
FROM Customers
WHERE cust_name='Fun4AL;';
```

