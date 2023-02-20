# ORACLE如果表不存在，则创建该表

## 1. 背景

Oracle使用的是PL/SQL, 不支持IF NOT EXISTS 条件。

## 2. 示例

使用counter在USER_ALL_TABLES中来列举有几个PRODUCT表 ，如果i>0则说明至少有一个PRODUCT表。

根据条件的判断删或增PRODUCT表。

```sql
DECLARE
i integer;
BEGIN
	SELECT count(*) INTO i FROM USER_ALL_TABLES WHERE TABLE_NAME='PRODUCT';
	IF i>0 
	THEN
		EXECUTE immediate 'DROP TABLE PRODUCT';
	END IF;
	EXECUTE immediate 'CREATE TABLE PRODUCT
		(
			ID integer NOT NULL,
			VERSION integer,
			TITLE varchar (255),
			SKU varchar (255),
			PARENTSKU varchar (255),
			COLOR varchar (255),
			DESCRIPTION varchar (255),
			PRICE varchar (255),
			CONSTRAINT PK_PRODUCT_ID PRIMARY KEY(ID)
		)';
END;
```

注： 删除之后还是要新建！！！，网上很多教程删除后就删了，不建表

## 参考文章

[ORACLE 如果表不存在，则创建该表](https://blog.csdn.net/qq_24702233/article/details/89483613)

