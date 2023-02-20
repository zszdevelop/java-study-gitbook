---
order: 10
category:
  - 数据库

---

# Oracle函数日期格式转换 to_date

## 1. 比较日期

查找出大于指定日期的数据

```
SELECT EMP_NAME, DEPT
FROM EMPLOYEE
WHERE TIME_CREATED >= TO_DATE('2020/11/11','yyyy/MM/dd')
```



## 1. 字符串和时间转换

```sql
select to_date('2004-05-07 13:23:44','yyyy-mm-dd hh24:mi:ss') from dual
select to_char( to_date(222,'J'),'Jsp') from dual //显示Two Hundred Twenty-Two
```

## 2. 日期和字符转换函数用法（to_date,to_char)

```sql
select to_char(sysdate,'yyyy-mm-dd hh24:mi:ss') as nowTime from dual; //日期转化为字符串
select to_char(sysdate,'yyyy') as nowYear from dual; //获取时间的年
select to_char(sysdate,'mm') as nowMonth from dual; //获取时间的月
select to_char(sysdate,'dd') as nowDay from dual; //获取时间的日
select to_char(sysdate,'hh24') as nowHour from dual; //获取时间的时
select to_char(sysdate,'mi') as nowMinute from dual; //获取时间的分
select to_char(sysdate,'ss') as nowSecond from dual; //获取时间的秒
```

## 3. 求某天是星期几

```sql
select to_char(to_date('2002-08-26','yyyy-mm-dd'),'day') from dual; //星期一
select to_char(to_date('2002-08-26','day',
'NLS_DATE_LANGUAGE = American') from dual; // monday
//设置日期语言
ALTER SESSION SET NLS_DATE_LANGUAGE='AMERICAN';
//也可以这样
TO_DATE ('2002-08-26','YYYY-mm-dd','NLS_DATE_LANGUAGE = American')
```

## 4. 两个日期间的天数

```sql
select floor(sysdate - to_date('20200405','yyyymmdd')) from dual;
```







## 参考文章

[oracle中to_date详细用法示例(oracle日期格式转换)](https://www.jb51.cc/oracle/65401.html)