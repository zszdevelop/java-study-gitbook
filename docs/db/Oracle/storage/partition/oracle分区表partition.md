# oracle分区表概念篇(partition)

## 1.表空间及分区表的概念

- **表空间：**

  是一个或多个数据文件的集合，所有的数据对象都存放在指定的表空间中，但主要存放的是表，所以称作表空间。

- **分区表：**

  当表中的数据量不断增大，查询数据的速度就会变慢，应用程序的性能就会下降，这时就应该考虑对表进行分区。表进行分区后，**逻辑上表仍然是一张完整的表**，只是将表中的数据在物理上**存放到多个表空间**（物理文件上），这样查询数据时，**不至于每次都扫描整张表**。

## 2. 表分区的具体作用

 oracle的表分区功能通过改善可管理性、性能和可用性，从而为各式应用程序带来了极大的好处。通常，**分区可以使某些查询以及维护操作的性能大大提高**。此外，分区还可以极大简化常见的管理任务，分区是构建千兆字节数据系统或超高可用性系统的关键工具。

  **分区功能能够将表、索引或索引组织表进一步细分为段，这些数据库对象的段叫做分区**。每个分区有自己的名称，还可以选择自己的存储特性。从数据库 管理员的角度来看，一个分区后的对象具有多个段，这些段既可进行集体管理，也可单独管理，这就使数据库管理员在管理分区后的对象时有相当大的灵活性。但 是，从应用程序的角度来看，分区后的表与非分区表完全相同，使用 SQL DML 命令访问分区后的表时，无需任何修改。

## 3. 什么时候使用分区

官方给的建议是：

a. 表的大小超过2GB。

b. 表中包含历史数据，新的数据被增加到新的分区中。

## 4. 表分区的优缺点

**优点：**

1. 改善查询性能：对分区对象的查询可以仅搜索自己关心的分区，提高检索速度。

2. 增强可用性：如果表的某个分区出现故障，表在其他分区的数据仍然可用。

3. 维护方便：如果表的某个分区出现故障，需要修复数据，只修复该分区即可。

4. 均衡I/O：可以把不同的分区映射到磁盘以平衡I/O，改善整个系统性能。

 **缺点：**

分区表相关，已经存在的表没有方法可以直接转化为分区表。不过oracle提供了在线重定义表的功能。

## 5. 表分区的几种类型及操作方法

### 5.1 范围分区(range) maxvalue

范围分区将数据基于范围映射到每一个分区，**这个范围是你在创建分区时指定的分区键决定的**。这种分区方式是最为常用的，并且**分区键经常采用日期**。举个例子：你可能会将销售数据按照月份进行分区。

#### 5.1.1 范围分区创建规则

当使用范围分区时，请考虑以下几个规则：

1. 每一个分区都必须有一个VALUES LESS THEN子句，它指定了一个不包括在该分区中的上限值。分区键的任何值等于或者大于这个上限值的记录都会被加入到下一个高一些的分区中。

2. 所有分区，除了第一个，都会有一个隐式的下限值，这个值就是此分区的前一个分区的上限值。

3. 如果某些记录暂无法预测范围，可以创建maxvalue分区，所有不在指定范围内的记录都会被存储到maxvalue所在分区中。

####  5.1.2 范例

先创建多个测试表空间

创建表空间test_ts01

```sql
create tablespace test_ts01 datafile '/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_01.dbf' size 32m extent management local autoallocate;
```

创建表空间test_ts02

```sql
   create tablespace test_ts02 datafile '/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_02.dbf' size 32m extent management local autoallocate;
```


创建表空间test_ts03

```sql
 create tablespace test_ts03 datafile '/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_03.dbf' size 32m extent management local autoallocate;
```

##### 5.1.2.1 范例1 （根据id区分）

> 假设有一个test表，表中有数据200000行，我们将此表通过id进行分区，每个分区存储100000行，我们将每个分区保存到单独的表空间中，这样数据文件就可以跨越多个物理磁盘。下面是创建表和分区的代码，如下：

创建test分区表

```sql
create table test

(        id number not null,

         first_name varchar2(30) not null,

         last_name varchar2(30) not null,

         phone varchar2(30) not null,

         email varchar2(80),

         status char(1),

         constraint test_id primary key (id)

)

partition by range (id)

(        partition test_part1 values less than (100000) tablespace test_ts01,

         partition test_part2 values less than (200000) tablespace test_ts02,

         partition test_part3 values less than (maxvalue) tablespace test_ts03

);
```

##### 5.1.2.2 范例2（按时间划分）

```sql
create table order_time

(        order_id number(7) not null,

         order_date date,

         total_amount number,

         custotmer_id number(7),

         paid char(1)

)

partition by range(order_date)

(        partition ora_time_part01 values less than (to_date('2016-06-01','yyyy-mm-dd')) tablespace test_ts01,

         partition ora_time_part02 values less than (to_date('2016-07-01','yyyy-mm-dd')) tablespace test_ts02,

         partition ora_time_part03 values less than (to_date('2016-08-01','yyyy-mm-dd')) tablespace test_ts03

);
```

##### 5.1.2.3 范例3 maxvalue

```sql
create table rangetable

(        rt_id number(8) not null,

         name varchar(10),

         grade int,

         constraint ranget_id primary key (rt_id)

)

partition by range (grade)

(        partition part1 values less than (1000) tablespace test_ts01,

         partition part2 values less than (2000) tablespace test_ts02,

         partition part3 values less than (maxvalue) tablespace test_ts03

);
```

### 5.2 列表分区(list) default

 List分区也需要指定列的值，**其分区值必须明确指定，该分区列只能有一个**，不能像range或者hash分区那样同时指定多个列做为分区依赖列，但它的单个分区对应值可以是多个。

  在分区时必须确定分区列可能存在的值，一旦插入的列值不在分区范围内，则插入/更新就会失败，因此通常建议使用list分区时，**要创建一个default分区存储那些不在指定范围内的记录**，类似range分区中的maxvalue分区。

  在根据某字段，如城市代码分区时，可以指定default，把非分区规则的数据，全部放到这个default分区。该分区的特点是某列的值只有几个，基于这样的特点我们可以采用列表分区。

```sql
create tablespace test_ts04 datafile '/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_04.dbf' size 32m extent management local autoallocate;

create tablespace test_ts05 datafile '/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_05.dbf' size 32m extent management local autoallocate;

create tablespace test_ts06 datafile '/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_06.dbf' size 32m extent management local autoallocate;
```

#### 5.2.1 列表分区范例

##### 5.2.1.1 范例1

```sql
create table problem_tickets

(        problem_id number(7) not null,

         description varchar2(2000),

         customer_id number(7) not null,

         date_entered date not null,

         status varchar2(20),

         constraint problem_tic_id primary key (problem_id)

)

partition by list (status)

(        partition prob_active values ('active') tablespace test_ts04,

         partition prob_inactive values ('inactive') tablespace test_ts05,

         partition prob_other values(default) tablespace test_ts06

);
```

##### 5.2.1.2 范例2

```sql
create table ListTable

(        id int,

         name varchar2(20),

         area varchar2(10),

         constraint ListTable_id primary key (id)

)

partition by list (area)

(        partition part1 values ('SH','BJ') tablespace test_ts04,

         partition part2 values ('SC','CQ') tablespace test_ts05,

         partition part3 values ('SD') tablespace test_ts06

);
```

### 5.3 散列分区(hash)

**对于那些无法有效划分范围的表，可以使用hash分区**，这样对于提高性能还是会有一定的帮助。hash分区会将表中的数据平均分配到你指定的几个分区中，列所在分区是依据分区列的hash值自动分配，因此你并不能控制也不知道哪条记录会被放到哪个分区中，hash分区也可以支持多个依赖列。

#### 5.3.1 范例：

##### 5.3.1.1 范例1 

```
create table hash_table

(        col number(8),

         inf varchar2(100)

)

partition by hash(col)

(        partition part01 tablespace test_ts04,

         partition part02 tablespace test_ts05,

         partition part03 tablespace test_ts06

);


```

简写：

```sql
create tablespace test_ts07 datafile '/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_07.dbf' size 32m extent management local autoallocate;

create tablespace test_ts08 datafile '/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_08.dbf' size 32m extent management local autoallocate;

create tablespace test_ts09 datafile '/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_09.dbf' size 32m extent management local autoallocate;

```

```
create table emp

(        empno number(4),

         ename varchar2(30),

         sal number

)

partition by hash (empno) partitions 4

store in (test_ts06,test_ts07,test_ts08,test_ts09);
```

### 5.4 组合分区

如果某表按照某列分区之后，仍然较大，或者是一些其它的需求，还可以通过分区内再建子分区的方式将分区再分区，即组合分区的方式。

  在10g中组合分区主要有两种：range-hash，range-list。11g中又增加了range-range，list-range，list-list，list-hash，并且 11g里面还支持Interval分区和虚拟列分区。 注意顺序，根分区只能是range分区，子分区可以是hash分区或list分区。

## 6. 分区表的维护操作

[参考文章](http://blog.itpub.net/31401608/viewspace-2147665/)

- 添加分区（add）

- 删除分区（drop）

- 截断分区（truncate）
- 合并分区（merge）
- 拆分分区（split）
- 重命名分区（rename）
- 移动分区（move）



## 7. 分区相关查询

### 7.1 查询表上有多少个分区

```
select * from user_tab_partitions where table_name='TEST';
// select * from dba_tab_partitions where table_name='TEST';
```

![image-20201103231714916](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201103231714916.png)

### 7.2 查询索引信息

// TODO

### 7.3 查询所有分区表信息

```SQL
select * from dba_part_tables;

select * from all_part_tables;                   ---当前用户可访问的所有分区表信息

select * from user_part_tables;               ---当前用户的所有分区表信息
```

### 7.4 查询所有分区

```sql
select * from all_tab_partitions;
```

### 7.5 查询某一分区上的表

```sql
select * from MyTable partition(SYS_P101);
```



## 参考文章

[对oracle分区表的理解整理](http://blog.itpub.net/31401608/viewspace-2147665/)
