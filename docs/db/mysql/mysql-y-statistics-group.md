---
#order: 10
category:
  - 数据库
---

# Mysql按日、周、月进行分组统计

## 1. 背景

我们在用Mysql抽取数据时候，经常需要按照天、周、月等不同的粒度对数据进行分组统计。而我们的时间可能是“2017/12/5 0:0:0”这种准确的时间。所以在进行分组之前我们需要对时间进行一下处理。

## 2. DATE_FORMAT

**DATE_FORMAT**是MySQL内置的一个函数，作用是以不同的格式显示日期/时间数据。具体的语法如下：

DATE_FORMAT(date,format)，其中

date：合法的日期。format：规定日期/时间的输出格式，其中format可使用的格式见文末链接。

### 2.1  示例

下面我们通过具体例子来看如何通过DATE_FORMAT进行分组统计：

下表两列分别代表产品买出的准确时间（精确到秒），和买出的产品类型。

| start_time         | product_no |
| ------------------ | ---------- |
| 2017/12/1 00:00:11 | 2A         |
| 2017/12/3 07:51:11 | 3C         |
| 2017/12/3 07:59:25 | 3C         |
| 2017/12/5 15:40:45 | 6C         |

现在我们需要对每天，每周，每月各个产品的销量进行统计，

1）按天统计：

```sql
select DATE_FORMAT(start_time,'**%Y%m%d**') days,count(product_no) count from test group by days; 
```



2）按周统计：

```sql
select DATE_FORMAT(start_time,'**%Y%u**') weeks,count(product_no) count from test group by weeks; 
```



3）按月统计:

```sql
select DATE_FORMAT(start_time,'**%Y%m**') months,count(product_no) count from test group bymonths; 
```

### 2.2 面临问题

如果有一天没有数据，则改直接直接为空白

>需求注：按照时间段来查询显示该时间段内每一天的数据量，如果某一天没有数据，显示数据量为0.

![image-20210126170727871](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210126170727871.png)

## 3. 优化方案

查询日期表，外连接数据表来显示
网络上查询到生成日期表的方法有几种

1. 需要另建一张日期表，直接从此表查询（比较麻烦）
2. 使用笛卡尔积生成时间（推荐）

### 3.1 生成连续日期表

```sql
select date_add('2020-04-01',interval @i:=@i+1 day) as date 
from (
select 1 
union all select 1 
union all select 1
union all select 1 
union all select 1 
union all select 1 
union all select 1 
union all select 1) as tmp,
 (select @i:= -1) t
```

结果如下

![image-20210126171101910](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210126171101910.png)

### 3.2 关联查询显示

```
select count(u.id) as count,s.date from 
(select date_add('2020-04-01',interval @i:=@i+1 day) as date 
from (
select 1 
union all select 1 
union all select 1
union all select 1 
union all select 1 
union all select 1 
union all select 1 
union all select 1) as tmp,
 (select @i:= -1) t
) s left join user u on s.date = date_format(u.createtime,'%Y-%m-%d')
GROUP BY s.date
```

### 3.3 如何控制生成多少个日期

现在还有一个问题，如何控制生成多少个日期，也就是**union all select 1** 的个数，

1. 使用存储过程（耦合性过高，不易维护，暂不考虑）
2. mybatis 循环拼接（√）

选择了java代码计算日期差，使用mybatis的 **foreach** 标签实现sql拼接，全部代码如下

- service

  ```java
   @Override
      public Object queryByDate(String[] date) {
          String date1 = date[0];
          String date2 = date[1];
          int num = calcBetweenDate(date1, date2);
          String[] countArr = new String[num];
          return userMapper.queryByDate(date1,countArr);
      }
      
      public int calcBetweenDate(String start, String end) {  
          SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");  
          Date startDate = null;  
          Date endDate = null;  
          try {  
              startDate = df.parse(start);  
              endDate = df.parse(end);  
          } catch (Exception e) {  
              System.out.println("日期转换出错");  
          }  
          int count = (int) ((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));  
          return count;  
      }  
  ```

- mapper

  ```java
  List<Map<String,Object>> queryByDate(@Param("date")String date, @Param("countArr")String[] countArr);
  ```

- xml

  ```xml
  	<select id="queryByDate" resultType="java.util.HashMap">
  	   select count(u.id) as count,s.date from 
  		(select date_add('2020-04-01',interval @i:=@i+1 day) as date 
  		from (
  		select 1 
  	   	<foreach item="index" collection="countArr">
  		  union all select 1 
  		</foreach>
  		) as tmp,
  		 (select @i:= -1) t
  		) s left join user u on s.date = date_format(u.createtime,'%Y-%m-%d')
  		GROUP BY s.date
  	</select>
  
  ```



## 参考文章

[mysql查询一个时间段每天数据数量，没有显示为0](https://blog.csdn.net/new_yao/article/details/105572684)

