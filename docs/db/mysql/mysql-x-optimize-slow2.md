# 如何调优慢查询SQL

## 1. 简介

我们在写程序的时候如何定位并优化慢查询呢？具体场景具体分析，大体思路如下

1. 根据慢日志定位慢查询sql
2. 使用explain等工具分析sql
3. 修改sql或者尽量让sql走索引

## 2. 根据慢日志定位慢查询sql

1. 查看慢日志配置情况

   ```sql
   show VARIABLES like '%query%'
   ```

   结果如下

   ![image-20210405231229429](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405231229429.png)

- Long_query_time: 默认是10s就算是慢日志了
- Show_query_log: 慢日志的开启状态
- show_query_log_file: 慢日志所在的地址

2. 慢日志的数量

   ```sql
   show status like '%slow_queries%'
   ```

   结果如下

   ![image-20210405231632132](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405231632132.png)

3. 慢日志打开

   - 方式一：会话中更改（重启后会恢复默认）

   ```sql
   #慢日志打开
   set global slow_query_log = on
   #慢查询的时间设置成1s
   set global  long_query_time =1;
   ```

   结果如下

   ![image-20210405231723049](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405231723049.png)

   ![image-20210405231849634](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405231849634.png)



- 方式二：修改配置文件（重启后配置还在）

  修改配置文件my.cnf，在[mysqld]下的下方加入

  ```
  [mysqld]
  slow_query_log = ON
  long_query_time = 1
  ```

4. 重启MySQL服务

   ```
   service mysqld restart
   ```

5. 查看设置后的参数

   show VARIABLES like '%query%'

   ![image-20210405233551896](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405233551896.png)

6. 查看慢日志

   ```sh
    vim /var/lib/mysql/iZwz914d1peizv4h7laju4Z-slow.log
   ```

   ![image-20210405234141934](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405234141934.png)

## 3. 使用explain等工具分析sql

1.  在查询语句前面加上explain

   ![image-20210405234252604](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405234252604.png)

   其中两个字段非常重要

   - type：

     ![image-20210405234357173](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405234357173.png)

   - extra：

     ![image-20210405234420498](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405234420498.png)

## 4. 修改sql或者尽量让sql走索引

### 4.1 方案一：查询其他有索引的字段

![image-20210405234611399](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405234611399.png)

### 4.2 方案二：添加索引

![image-20210405234645956](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405234645956.png)
