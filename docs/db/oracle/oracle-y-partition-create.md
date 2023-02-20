# oracle分区表-自动创建的分区

## 1. 创建按月分区的分区表

### 1.1  创建分区表

```sql
CREATE TABLE intervalpart (c1 NUMBER, c3 DATE)

PARTITION BY RANGE (c3)

   INTERVAL ( NUMTOYMINTERVAL (1, 'MONTH') )

   (PARTITION part1

       VALUES LESS THAN (TO_DATE ('01/12/2010', 'MM/DD/YYYY')),

    PARTITION part2

       VALUES LESS THAN (TO_DATE ('02/12/2010', 'MM/DD/YYYY'))

  )
```

**注意：**如果在建Interval分区表是没有把所有的分区写完成，在插入相关数据后**会自动生成分区**

### 1.2 查看现在表的分区:

```sql
select table_name,partition_name from user_tab_partitions where table_name='INTERVALPART';
```

![image-20201103234450655](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201103234450655.png)

### 1.3  插入测试数据：

向intervalpart 表插入2020.1.1号后的19个月数据

```sql
begin
for i in 0 .. 11 loop
insert into intervalpart values(i,add_months(to_date('2020-1-1','yyyy-mm-dd'),i));
end loop ;
commit;
 end;
```

**补充：**add_months()函数获取前一个月或者下一个月的月份， 参数中 负数 代表 往前， 正数 代表 往后。

- 上一个月

  ```sql
  select to_char(add_months(trunc(sysdate),-1),'yyyymm') from dual;
  ```

- 下一个月 

  ```sql
  select to_char(add_months(trunc(sysdate),1),'yyyymm') from dual;
  ```

  ![image-20201103234904783](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201103234904783.png)

### 1.4 观察自动创建的分区：

 ```sql
select table_name,partition_name from user_tab_partitions where table_name='INTERVALPART';
 ```

![image-20201103235039044](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201103235039044.png)

### 1.5 查看分区内容：

- 查询所有

  ```
  select * from INTERVALPART;
  ```
  
  ![image-20201103235352870](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201103235352870.png)

- 查询指定分区

  ```
  select * from INTERVALPART partition(part2);
  ```

  

  ![image-20201103235835676](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201103235835676.png)

## 2. 创建一个以天为间隔的分区表：

### 2.1 创建分区表：

```sql
create table dave
(
		id    number,
		dt    date
)
partition by range (dt)
	INTERVAL (NUMTODSINTERVAL(1,'day'))
	(
 		partition p100101 values less than (to_date('2020-01-01','yyyy-mm-dd'))
);
```

### 2.2 查看表分区

```sql
select table_name,partition_name from user_tab_partitions where table_name='DAVE';
```

![image-20201104000207367](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201104000207367.png)

### 2.3 插入测试数据

```sql
begin
for i in 1 .. 12 loop
insert into dave values(i,trunc(to_date('2020-1-1','yyyy-mm-dd')+i));
end loop;
commit;
end;

```

### 2.4 观察自动创建的分区：

```sql
 select table_name,partition_name from user_tab_partitions where table_name='DAVE';
```

![image-20201104000413036](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201104000413036.png)

### 2.5 查看分区内容：

- 查看所有

  ```sql
  select * from dave ;
  ```

  

  ![image-20201104000802542](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201104000802542.png)

- 查看指定分区

  ```sql
  select * from dave partition(SYS_P54);
  ```

  

  ![image-20201104000653069](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201104000653069.png)

## 参考文章

[分区表 之 Interval分区 和 虚拟列 按星期分区表](https://blog.csdn.net/tianlesoftware/article/details/5662337)

