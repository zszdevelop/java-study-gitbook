# Flyway执行ORACL存储过程后报错

## 1. 背景

在flyway 的脚本中，我们之前有个需求是新建两张表。如果表存在则先删除。

我们知道在oracle 中表存在则删除需要用到存储过程。但是我们在执行的时候却报错了

```
ERROR:
Migration V1055__JFLOW_RPT_DML.sql failed
-----------------------------------------
SQL State  : 42000
Error Code : -2007
Message    : 第 46 行, 第 8 列[DECLARE]附近出现错误:
语法分析出错
```

## 2. 解决

经过排查竟然是flyway 的存储过程后，不能再有sql。他应该是直接commit了。

所以这种情况就需要分2个脚本来写就没问题了

