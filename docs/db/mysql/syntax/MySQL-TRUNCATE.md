# MySQL-TRUNCATE

```sql
/* TRUNCATE */ ------------------
TRUNCATE [TABLE] tbl_name
清空数据
删除重建表
区别：
1，truncate 是删除表再创建，delete 是逐条删除
2，truncate 重置auto_increment的值。而delete不会
3，truncate 不知道删除了几条，而delete知道。
4，当被用于带分区的表时，truncate 会保留分区
```

## 参考文章

[一千行 MySQL 学习笔记](https://javaguide.cn/database/mysql/a-thousand-lines-of-mysql-study-notes/#)