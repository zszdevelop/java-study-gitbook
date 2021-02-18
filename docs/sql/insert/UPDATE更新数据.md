# UPDATE更新数据

更新（修改）表中的数据，使用UPDATE语句

UPDATE 语法分为

- 要更新的表
- 列名和他们的新值
- 确定要更新哪些行的过滤条件

```
UPDATE Customers 
SET cust_email ='zsz@gmail.com',
	cust_contact = 'zsz'
WHERE cust_id = '100001';
```

