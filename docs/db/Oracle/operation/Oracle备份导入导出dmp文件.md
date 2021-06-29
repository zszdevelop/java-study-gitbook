# Oracle备份-导入导出dmp 文件

## 1. 具体操作

1. 导出语句

   ```tex
   exp myuser/mypassword@192.168.0.1:1521/orcl file=D:\mydb.dmp log=D:\export.log full=y
   ```

   导出的用户名密码，最好用dba权限的

2. 导入语句

   ```txt
   Imp myuser/mypassword@192.168.0.1/orcl file=D:\mydb.dmp  full=y  ignore=y
   ```


## 2. 可能遇到的问题

### 2.1 ORA-28009：connection as SYS should be as SYSDBA OR SYSOPER解决方法

![image-20210624145704882](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210624145704882.png)

错误提示里的大致意思：作为sys的连接应该是SySDBA或Sysopor
所以,我们在登录的时候，可以试一下：sys as sysdba 

## 参考文章

[Oracle 导入导出 dmp 文件](https://www.cnblogs.com/mingforyou/p/7110163.html)