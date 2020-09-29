# 无法连接远端Mysql

## 1. 错误提示

提示：Host 'xxx.xxx.x.xx' is not allowed to connect to this MySQL server

![image-20190913211110163](./img/image-20190913211110163.png)

2. 问题原因

客户端想直接用root账户从远端直接连接，Mysql从安全性考虑，限定了root账户只能有本机端localhost连接

可以执行

```
select Host,User from mysql.user;
```

结果如下

![image-20190909214141218](./img/image-20190909214141218.png)

## 3. 解决方案

1. root 的權限開放，讓他也能從遠端連
2. 新建一個帳號，讓他只有所要連接的資料庫的權限，只要是非 root 帳號都可以從遠端連。

## 4. 具体解决

创建一个远程用户

```
create user test identified by '123456'; 
```

分配权限

```
grant all privileges on *.* to 'test'@'%'identified by '123456' with grant option; 
```

刷新mysql用户权限

```
flush privileges ; 
```



### 参考

[無法遠端連接MySQL](<https://www.ewdna.com/2011/09/mysqlmessage-from-server-host-xxx-is.html>)