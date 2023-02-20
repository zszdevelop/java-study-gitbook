---
#order: 70
category:
  - 数据库

---

# 联合索引-最左匹配原则成因

## 1. 什么是联合索引

联合索引就是由多列组合成的索引

## 2. 什么是最左匹配原则

### 2.1 简单概述

假设我们有两列a，b。我们对ab设置一个联合索引，我们再where 语句中

- 调用a=？ and b=?,他就会走ab索引。
- 调用where a=？ 他也会走ab索引
- 调用where b=？，不走ab 索引

### 2.2 定义

1. mysql 会一直向右匹配知道遇到范围查询（>、<、between、like）就会停止匹配，比如a=3 and b=4 and c>5 and d=6 如果建立（a,b,c,d）顺序的所有，d是用不到索引的，如果建立（a,b,d,c）的索引则都可以用到，a、b、d的顺序可以任意调整
2. =和in 可以乱序，比如a=1 and b=2 and c=3 建立（a,b,c）索引可以任意顺序，mysql的查询优化器会帮你优化成索引可以识别的形式

## 3. 示例

1. 包含联合索引的表信息

   ![image-20210405235609971](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405235609971.png)

2. 走联合索引情况

   查询

   ![image-20210405235710376](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405235710376.png)

   使用explain 查询

   ![image-20210405235731210](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210405235731210.png)

3. 我们删了area，不走索引

   ![image-20210406000020398](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210406000020398.png)

   此时的type：ALL

## 4. 成因分析

建立复合索引会对第一个字段排序，再对第二个字段排序，类似于order by 字段1 ，再order by 字段2、所以的第一个字段是绝对有序的，所以直接使用第二个字段是用不到索引的

