# Oracle导入导出dmp 文件

## 1. 具体操作

1. 导出语句

   ```tex
   exp myuser/mypassword@192.168.0.1:1521/orcl file=D:\mydb.dmp log=D:\export.log full=y
   ```

2. 导入语句

   ```txt
   Imp myuser/mypassword@192.168.0.1/orcl file=D:\mydb.dmp  full=y  ignore=y
   ```

   

## 参考文章

[Oracle 导入导出 dmp 文件](https://www.cnblogs.com/mingforyou/p/7110163.html)