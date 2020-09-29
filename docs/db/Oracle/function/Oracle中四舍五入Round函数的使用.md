# Oracle中四舍五入Round函数的使用

# 1. 简介

Round 函数

​		语法：ROUND(number，num_digits)

其中Number 是需要进行四舍五入的数字，Num_digits为指定的位置，按此位数进行四舍五入。

- 如何num_digits 大于0，则四舍五入到指定的小数位
- 如果num_digits等于0，则四舍五入到最接近的整数
- 如果num_digits小于0，则在小数点左侧进行四舍五入



## 2. 案例

```sql
select sum (a.long_time)/3
,round(sum (a.long_time)/3,0) r0 
,round(sum (a.long_time)/3,1) r1 
,round(sum (a.long_time)/3,2) r2 
,round(sum (a.long_time)/3,3) r3 
,round(sum (a.long_time)/3,4) r4 
,round(sum (a.long_time)/3,5) r5 
,round(sum (a.long_time)/3,-1) r_1 
,round(sum (a.long_time)/3,-2) r_2 
,round(sum (a.long_time)/3,-3) r_3 
,round(sum (a.long_time)/3,-4) r_4 
,round(sum (a.long_time)/3,-5) r_5 
 from  hd_agent_voice_seq a 
```

结果

SUM(A.LONG_TIME)/3	R0	R1	R2	R3	R4	R5	R_1	R_2	R_3	R_4	R_5
4001.33333333333	4001	4001.3	4001.33	4001.333	4001.3333	4001.33333	4000	4000	4000	0	0



