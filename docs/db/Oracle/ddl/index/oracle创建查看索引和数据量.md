# oracle创建、查看索引和数据量

## 1. 创建索引

```sql
create index index_name on table_name(column_name)
```

## 2. 删除索引

```sql
drop index index_name
```

## 3. 创建组合索引

```sql
create index index_name on table_name(column_name_1,column_name_2);
```

## 4. 查看索引

- 查看某个表的索引

  ```SQL
  SELECT * from  all_indexes WHERE  table_name=upper('table_name');
  ```

- 查看索引在哪个字段

  ```SQL
  select * from user_ind_columns where table_name=upper('table_name');
  ```

- 查看某个用户下面所有的索引

  ```SQL
  SELECT * from  all_indexes WHERE owner='SR';
  ```

  

## 5. 查询某个用户下面所有表的数据量

-  查询某个表的数据量 也就是有多少条数据

  ```sql
  SELECT t.table_name,t.num_rows from user_tables t ORDER BY t.NUM_ROWS DESC;
  ```

- 查询某个用户下面的表

  ```sql
  SELECT * from all_all_tables WHERE owner='SR';
  ```

## 参考文章

[oracle 创建、查看索引和数据量](https://www.jianshu.com/p/58af6be1cd48)