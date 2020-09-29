# Oracle中greatest()/least函数的使用

## 1. 示例

已知表如下

```sql
SQL> select * from tb;
 
        ID      CHINESE       MATH    ENGLISH
    ---------- ----------          ----------     ----------
      1001         89                 98            87
      1002         81                 87           79 
```

现在要得到如下的结果

```sql
  ID      CHINESE  MATH ENGLISH  MAX       MIN
     ---------- ----------   ----------   ----------  ----------  ----------
      1001       89             98             87          98          87
      1002       81             87             79          87          79
```

该怎么解决？

首先自然想到MAX 和 MIN 函数，但这两个是聚集函数，是要作用在同一列上面的，而现在要得到的MAX和 MIN 的值确实作用与每一列上面的，如果要借助于MAX()和MIN()，还需要对原表的数据结构进行行转列处理，复杂度上升

## 2. 使用greatest()/least函数

```sql
SQL> SELECT id, chinese, math, english,
            greatest(chinese, math, english) max,
            least(chinese, math, english) min
     FROM   tb;
 
        ID     CHINESE MATH  ENGLISH   MAX        MIN
    ---------- ----------   ----------   ----------   ---------- ----------
      1001         89         98             87           98          87
      1002         81         87             79           87          79
```

