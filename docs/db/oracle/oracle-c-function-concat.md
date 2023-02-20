# Oracle在1对多时把一列的值合并为一个值并用逗号分隔

Oracle把一列的值合并为一个值，并用逗号分隔。

实例中将把部门表（DEPT表）与员工表（EMP表）关联，查询每个部门下的所有员工姓名，员工姓名之间以逗号分隔（如图一）。

![image-20201221152131891](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201221152131891.png)

## 1. WMSYS.WM_CONCAT(列名)函数

 介绍：其函数在Oracle 10g推出，在10g版本中，返回字符串类型，在11g版本中返回clob类型。括号里面的参数是列，而且可以是多个列的集合，也就是说在括号里面可以自由地用‘||’合并字符串。

```sql
SELECT D.DEPTNO AS 部门编号,D.DNAME AS 部门名称,WMSYS.WM_CONCAT(E.ENAME) AS 员工列表 
FROM DEPT D
LEFT JOIN EMP E ON D.DEPTNO = E.DEPTNO
GROUP BY D.DEPTNO,D.DNAME
```

拼接多列（拼接员工姓名和员工编号）

```sql
SELECT D.DEPTNO AS 部门编号,D.DNAME AS 部门名称,WMSYS.WM_CONCAT(E.ENAME||'('||E.EMPNO||')') AS 员工列表 
FROM DEPT D
LEFT JOIN EMP E ON D.DEPTNO = E.DEPTNO
GROUP BY D.DEPTNO,D.DNAME
```

## 2. LISTAGG(列名,<分隔符>) WITHIN GROUP(ORDER BY 列名)函数

介绍：其函数在Oracle 11g 版本中推出，对分组后的数据按照一定的排序进行字符串连接。

```sql
SELECT D.DEPTNO AS 部门编号,D.DNAME AS 部门名称,LISTAGG(E.ENAME,',') WITHIN GROUP(ORDER BY E.ENAME) AS 员工列表 
FROM DEPT D
LEFT JOIN EMP E ON D.DEPTNO = E.DEPTNO
GROUP BY D.DEPTNO,D.DNAME
```

LISTAGG 中的字段可以不写在GROUP BY

## 参考文章

[Oracle把一列的值合并为一个值并用逗号分隔](https://blog.csdn.net/pan_junbiao/article/details/79948222)
