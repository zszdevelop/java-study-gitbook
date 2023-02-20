# 达梦数据库-写SQL如何才能不带上模式名？

## 1.  问题背景

在达梦数据库中，SQL 查询时，需要加上模式名（数据库名）才能访问

![image-20210629143738277](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629143738277.png)

### 2. 问题原因

其实这是把Mysql或者SQLSERVER的思维代入DM数据库造成的，Mysql的体系架构是单实例多库的，一个用户可以访问多个数据库，然后指定当前数据库写SQL的时候就不用带上数据库名了。

  **达梦的体系架构是单库多实例的，也就是没有多个数据库的概念了，从Mysql或者SQLSERVER转到达梦，就需要建多个用户+表空间来对应Mysql的多个数据库。**

### 3.1 直接原因

- 自己是通过 sysdba 登录，执行 select * from tab1 时，查询的其实是 select * from sysdba.tab1;

- 如果你要找 new_schema.tab1 的话，那你要执行的sql 其实是 select * from new_schema.tab1;

## 3. 解决方式

例如MYSQL中有TESTDB1,TESTDB2两个库，都用root用户来访问

### 3.1 步骤1：新建表空间

在达梦中第一步就创建两个表空间：

```sql
CREATE TABLESPACE TESTDB1 DATAFILE 'TESTDB1.DBF' SIZE 128;
CREATE TABLESPACE TESTDB2 DATAFILE 'TESTDB2.DBF' SIZE 128;
```

### 3.2 步骤2：创建用户授权

第二步创建两个用户，授予对应的权限：

```sql
--以下SQL用SYSDBA用户登录执行
 
CREATE USER TESTDB1 IDENTIFIED BY "123456789" DEFAULT TABLESPACE TESTDB1;
 
CREATE USER TESTDB2 IDENTIFIED BY "123456789" DEFAULT TABLESPACE TESTDB2;
 
GRANT RESOURCE TO TESTDB1;
 
GRANT RESOURCE TO TESTDB2;
```

![image-20210629145138099](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629145138099.png)

### 3.3 步骤3：迁移工具迁移的时候用TESTDB1用户来迁移

迁移Mysql TESTDB1数据库里面的表，数据库迁移工具就使用TESTDB1用户来迁移；迁移Mysql TESTDB2数据库里面的表，数据库迁移工具就使用TESTDB2用户来迁移

### 3.4 步骤4：访问TESTDB1用户（模式）下的表，就使用TESTDB1用户登录

访问TESTDB1用户（模式）下的表，就使用TESTDB1用户登录来访问，就不需要加模式名TESTDB1

![image-20210629145353834](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629145353834.png)
