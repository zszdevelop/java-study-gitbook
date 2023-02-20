# SQL多字段聚合统计的思考

## 1. 背景

我项目中有个需求，需要统计分组中的两个字段的汇总值。

需求大体如下：

假设要统计每个年段的主科教师人数，这些教师信息是存在每个班级中

> 可能例子不够恰当，但是在我的业务中是存在这样一个场景的

| 班级id | 年段   | 语文老师 | 数学老师 |
| ------ | ------ | -------- | -------- |
| 1      | 一年级 | 张三     | 李四     |
| 2      | 一年级 | 李四     | 张三     |
| 3      | 二年级 | 张三     | 李四     |

## 2. 面临的问题

我要得到每个年段的，语文老师数和数学老师数，都非常好取

```sql
select 年级, count(distinct 语文老师) , count(distinct 数学老师) ,
from 班级表 
group by 年级;
```

我也没有建表，只讲思路



但现在要求老师总和，我 `count(distinct 语文老师) , count(distinct 数学老师)` 并不能合在一起。

- count(distinct 语文老师)+ count(distinct 数学老师)  不等于总老师数

因为他们会存在重复的情况

## 3. 解决

### 3.1 方案一：

使用union all 查出符合条件的老师。再group by 出来

```
select 年级,count (distinct 老师)
from (
         select f1.年级 年级,f1.语文老师 as 老师
         from 班级表 f1
         where f1.KPFAID = '5f67db08f3a848bdb7d1993206c9efff'
         group by f1.年级,f1.语文老师
         union all
         select f2.年级  年级, f2.数学老师 as 老师
         from 班级表 f2
         where f2.KPFAID = '5f67db08f3a848bdb7d1993206c9efff'
        group by f2.年级,f2.数学老师
         )
group by 年级
```

这样可能存在性能问题，如果表太大的话

### 3.2 redis

将老师放到redis set中
