---
order: 30
category:
  - 数据库
---

# Oracle预定义函数

## 1. 简介

oralce 的函数分为

- 单行函数
  - 字符函数
  - 日期函数
  - 数字函数
  - 转换函数
- 分组函数（后续介绍）

> 学前知识：哑表 dual
>
> dual 是一个虚拟表，辅助查找和运算，通常用在select语句中，作为查询的目标表结构，oracle保证dual里面永远只有一条记录
>
> 例如：
>
> 显示1+1 的结果，可以看出，dual很多时候是为了构成select的标准语法
>
> select 1+1 from dual;

## 2. 字符函数

1. LOWER:转换成小写

2. UPPER:转换成大写

3. INITCAP:首字母变成大写，其余都小写

4. CONCAT:字符串的连接

5.  SUBSTR(str,start,length)或者SUBSTR(str,start):字符串的截取

6.  LENGTH:求字符串的长度

7.  NVL : 转换null 的值。(前边已经用过)

   nvl2:

8.  DECODE：

### 2.1 LOWER 把字符转为小写

例如：把'HELLO' 转换为小写

```sql
select lower('HELLO')
from dual;
```

例如: 把s_emp 表中的last_name 列的值转换为小写

```sql
select lower(last_name)
from s_emp;
```

### 2.2 UPPER 把字符转换为大写

例如:把'world'转换为大写

```sql
select upper('world')
from dual;
```

例如:把s_emp 表中的last_name 列的值转换为大写

```sql
select upper(last_name)
from s_emp;
```

例如:查询s_emp 表中名字为Ngao 的人信息
这样是查不到:

```sql
select last_name,salary,dept_id
from s_emp
where last_name='NGAO';
```

这样就可以查询到了:

```sql
select last_name,salary,dept_id
from s_emp
where upper(last_name)='NGAO';
```

### 2.3 initcap 把字符串首字母大写

例如:把'hELLO'转换为首字母大写,其余字母小写

```sql
select initcap('hELLO')
from dual;
```

### 2.4 concat 把俩个字符串连接在一起(类似之前的||的作用)

例如:把'hello'和'world'俩个字符串连接到一起,并且起个别名为msg

```sql
select concat('hello','world') msg
from dual;
```

例如:把first_name 和last_name 俩个列的值连接到一起

```sql
select concat(first_name,last_name)
from s_emp;
```

### 2.5 substr 截取字符串

例如:截取'hello'字符串,从第2 个字符开始,截取后面的3 个字符

```sql
select substr('hello',2,3)
from dual;
```

out:  ell

### 2.6 length 获得字符串长度

例如:获得'world'字符串的长度

```sql
select length('world')
from dual;
```

例如:获得s_emp 表中last_name 列的每个值的字符长度

```sql
select length(last_name)
from s_emp;
```

### 2.7 nvl 替换列中为null 的值

nvl(要输出的列名，为空的时候要被替换的值) //要替换的值类型必须要和之前保持一致

```sql
select id,last_name,nvl(commission_pct,0) from s_emp;
```

#### 2.7.1 NVL与NVL2两个函数的用法和区别？

NVL (expr1, expr2)：expr1为NULL，返回expr2；不为NULL，返回expr1。注意两者的类型要一致

NVL2 (expr1, expr2, expr3) ：expr1不为NULL，返回expr2；为NULL，返回expr3。expr2和expr3类型不同的话，expr3会转换为expr2的类型

### 2.8 instr 查找字符串

INSTR方法的格式为

- INSTR(源字符串, 要查找的字符串, 从第几个字符开始, 要找到第几个匹配的序号)
- 返回找到的位置，如果找不到则返回0.

例如：INSTR('CORPORATE FLOOR','OR', 3, 2)中，源字符串为'CORPORATE FLOOR',在字符串中查找'OR'，从第三个字符位置开始查找"OR"，取第三个字后第2个匹配项的位置。

默认查找顺序为从左到右。当起始位置为负数的时候，从右边开始查找。

```sql
SELECT INSTR('CORPORATE FLOOR', 'OR', -1, 1) "aaa" FROM DUAL
```

out: 14



## 3. 数字函数

1.  ROUND:四舍五入

2. TRUNC:截取，不进行四舍五入

3.  MOD:取余


   ### 3.1 round 四舍五入

   **切记-1 代表保存小数点后一位，0 保留到个位，1 保留到10 位**

```sql
   round(arg1,arg2)
```

- 第一个参数表示要进行四舍五入操作的数字

- 第二个参数表示保留到哪一位(负数代表小数点之前，0，正数代表小数点之后)


0 代表保留到个位！！-1 代表保存到十位

```sql
   select round(45.67) from dual; 46
   select round(45.67,1) from dual; 45.7
   select round(45.67,2) from dual; 45.67
   select round(45.67,-1) from dual; 50
   select round(45.67,-2) from dual; 0
   select round(55.67,-2) from dual; 100
```

### 3.2 trunc 截取到某一位

```sql
trunc(arg1,arg2)
```

和round 的用法一样,但是trunc 只舍去不进位

```sql
select trunc(45.67) from dual; 45
select trunc(45.67,1) from dual; 45.6
select trunc(45.67,2) from dual; 45.67
select trunc(45.67,-1) from dual; 40
select trunc(45.67,-2) from dual; 0
select trunc(55.67,-2) from dual; 0
```

### 3.3 mod 取余

```sql
mod(arg1,arg2)
```

- 第一个参数表示要进行取余操作的数字
- 第二个参数表示参数1 和谁取余
  例如:
  把10 和3 进行取余(10 除以3 然后获取余数)
  select mod(10,3)
  from dual;

## 4. 日期函数

1. sysdate 关键字

2. MONTHS_BETWEEN:两个日期之间的月数，如果是正数前面的值大于后面的值

3.  ADD_MONTHS:在指定日期上增加月数

4.  NEXT_DAY:指定日期的下一个星期几是哪天

5. LAST_DAY:指定日期的最后一天

6.  ROUND:对指定日期进行四舍五入

7. TRUNC:对指定日期进行截取


### 4.1 sysdate 关键字

   表示系统的当前时间

- 显示时间:当前时间

    ```SQL
    SELECT sysdate from dual
    ```
    
    ​	OUT: 2021-02-18 15:39:07
    
- 注意：sysdate 进行加减操作的时候，单位是天

  例如明天这个时候

    ```sql
    SELECT sysdate+1 from dual
    ```

  out:  2021-02-19 15:41:12

- 例如显示1小时之后的时候

    ```
    SELECT sysdate+1/24 from dual
    ```

    out: 2021-02-18 16:42:14

### 4.2 months_between 

俩个时间点之间相差多少个月(单位是月)


30 天之后和现在相差多少个月

```sql
SELECT MONTHS_BETWEEN (sysdate+30, sysdate) from dual;
```

out:  1.06451612

### 4.3 add_months 

返回一个日期数据:表示一个时间点,往后推x 月的日期

例如:

当前时间往后推2 个月

```
SELECT  ADD_MONTHS (sysdate, 2) from dual;
```

out:  2021-04-18 15:56:02

### 4.4 next_day 

返回一个日期数据:表示一个时间点后的下一个星期几在哪一天

例如:
当前时间的下一个星期5 是哪一个天

```
SELECT  NEXT_DAY(SYSDATE, 'FRIDAY') FROM DUAL
```

OUT:  2021-02-19 15:57:26

### 4.5 last_day 

返回一个日期数据:表示一个日期所在月份的最后一天

例如:
当前日期所在月份的最后一天

```
SELECT  LAST_DAY(SYSDATE ) FROM DUAL
```

OUT: 2021-02-28 16:00:44

### 4.6 round 

对日期进四舍五入,返回操作后的日期数据。逢16 日往月份进一,逢7 月往年份进一

round(sysdate,'year/y/yy/yyy/yyyy') 年7 月节点
round(sysdate,'mm/month') 月16 号节点
round(sysdate,'d/day') 星期星期四节点
round(sysdate,'dd') : 天-》12 点节点
例如:
把当前日期四舍五入到月（年月日.时分秒把这个看错数字就可以了）
今天2021 年2 月18 日四舍五入到月，就要看日是否大于16？大于进一，不大于不进一，同时舍弃为1

```sql
SELECT  ROUND(sysdate, 'mm') FROM DUAL
```

out:  2021-03-01 00:00:00

把当前日期四舍五入到年
大致算一下，今天已经2 月了，所以不满足大于节点7 进一位，同时舍弃年前面的值

```sql
SELECT  ROUND(sysdate, 'yyyy') FROM DUAL
```

out: 2021-01-01 00:00:00

### 4.7 trunc

对日期进行截取和round 类似,但是只舍弃不进位
trunc（sysdate,'yyyy/year'） --返回当年第一天。
trunc（sysdate,'mm/month'） --返回当月第一天。
trunc（sysdate,'d/day'） --返回当前星期的第一天。
trunc（sysdate,'dd'）--返回当前年月日
截取和round 基本是一样的只是，不进位而已。

## 5. 类型转换函数

1. TO_CHAR 将日期或者数值转换成字符串
2. TO_NUMBER 将字符串转换成数字
3. TO_DATE 将日期字符串转换成日期

### 5.1 to_char 把日期转换为字符

例如:
把当前日期按照指定格式转换为字符串

```sql
SELECT  TO_CHAR(SYSDATE,'yyyy-MM-dd') from dual
```

out: 2021-02-18

日期格式：
yyyy/YYYY：四位数的年份
rrrr：四位数的年份
yy：两位数的年份
rr：两位数的年份
mm：两位数的月份（数字）
D：一周的第几天
DD：一月的第几天
DDD ：一年的第几天
YEAR：英文的年份
MONTH：英文全称的月份
mon：英文简写的月份
ddsp：英文的第几天
ddspth：英文序列数的第几天
DAY：全英文的星期
DY：简写的英文星期
hh：小时
mi：分钟
ss：秒
AM:上午
PM:下午

### 5.2 to_char 把数字转换为字符

>L : 本地货币符号
>$ : $
>. : 小数点
>, : 千分符
>9 : 0-9
>0 : 0-9, 如果位数不足，强制补0

例如:

```sql
select to_char(salary,'$999,999.00')
from s_emp;
```

fm 表示去除结果显示中的开始的空格
L 表示系统本地的货币符号
select to_char(salary,'fmL999,999.00')
from s_emp;
to_number 把字符转换为数字



### 5.3 to_number 把字符转换为数字

例如:

```sql
select to_number('1000')
from dual;
```

out:1000 

### 5.4 to_date 把字符转换为日期

.TO_DATE(char, ['fmt']):

例如

```sql
select TO_DATE ('10-September-1992','dd-Month-YYYY') from dual
```

out: 1992-09-10 00:00:00

.使用format 的元素格式
例如:

```sql
select to_date('10-12-2016','dd-mm-yyyy')
from dual;
```

```sql
select to_date('25-5 月-95','dd-month-yy')
from dual;
```

## 6. exists 和not exists 用法

SQL 代码

```sql
select Resc_id from dbo.Res_Coach
where EXISTS (select * from Res_Coach where Resc_id is null)
```

查询原理：
遍历dbo.Res_Coach 每一条，同时处理where 条件（EXISTS (select * from Res_Coach where Resc_id=0)
判断结果为true 或者false），为true 时拿出该条，false 时，放弃该条记录。

```sql
-- 1、where 条件中的子查询和主查询没关系
select Resc_id
from dbo.Res_Coach
where EXISTS (select Rese_id from dbo.Res_Excellent where Rese_id Is null )
-- 2、where 条件中得子查询和主查询有关系
select Resc_id
from dbo.Res_Coach
where EXISTS (select Resc_id from dbo.Res_Coach where Resc_id Is null )
```

实例备注：不管where 条件中得子查询和主查询有没有关系，遍历主查询中得每一条时，判断where 条件，exists
结果为真，where 条件返回true，拿出该条记录，where 条件返回false， 不返回该记录。

### 6.1 EXISTS 和IN 的选择

如果查询的两个表大小相当，那么用in 和exists 差别不大。如果两个表中一个较小，一个是大表，则子查询表大的
用exists，子查询表小的用in

## 7. DECODE函数

Oracle DECODE函数是**Oracle公司独家提供的功能**，它是一个功能很强的函数。它虽然**不是SQL的标准**,但对于性能非常有用。

1. DECODE 中的if-then-else逻辑

   在逻辑编程中，经常用到If – Then –Else 进行逻辑判断。在DECODE的语法中，实际上就是这样的逻辑处理过程。它的语法如下：
   DECODE(value, if1, then1, if2,then2, if3,then3, . . . else )
   Value 代表某个表的任何类型的任意列或一个通过计算所得的任何结果。当每个value值被测试，如果value的值为if1，Decode 函数的结果是then1；如果value等于if2，Decode函数结果是then2；等等。事实上，可以给出多个if/then 配对。如果value结果不等于给出的任何配对时，Decode 结果就返回else 。
   需要注意的是，这里的if、then及else 都可以是函数或计算表达式。
   含义解释： 

   ```sql
   DECODE(条件,值1,翻译值1,值2,翻译值2,...值n,翻译值n,缺省值)
   
   该函数的含义如下：
   IF 条件=值1 THEN
   RETURN(翻译值1)
   ELSIF 条件=值2 THEN
   RETURN(翻译值2)
   ......
   ELSIF 条件=值n THEN
   RETURN(翻译值n)
   
   ELSE
   RETURN(缺省值)
   END IF
   ```

   