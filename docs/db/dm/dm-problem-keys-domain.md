# 达梦数据库-关键字（domain等）导致的异常

## 1. 问题背景

在项目运行时发现ORACLE 没问题的语句，在达梦出现了问题

```sh
  @SQL:  SELECT WorkID,Domain, FROM Test WHERE WorkID =:WorkID
  @Param: Num=1, WorkID=1386(String)
  @异常信息: 第 1 行, 第 1483 列[Domain]附近出现错误:  语法分析出错]
java.lang.RuntimeException: @运行查询在(RunSQLReturnTable_200705_Ora)出错。

```

在使用达梦数据库时，查询SQL中涉及XML,EXCHANGE,DOMAIN,link字段，在达梦中是关键字，SQL报关键词不能使用的错误。

## 2. 解决办法

### 2.1 方法一：双引号法

这个一般可以用来处理建表语句中的保留字冲突，如表名或者字段名是 DM 的保留字。这种方法一般可以快速地绕过问题，但是对于大小写敏感的库，这种用双引号的方法会固定死字段大小写，对于小写的字段，可能会带来无效的表名或者列名的问题。

```sql
SELECT WorkID,"Domain", FROM Test WHERE WorkID =:WorkID
```

### 2.2 方法2：dm.ini 中的参数设置（实测没用）

在 dm.ini 中有个参数 `EXCLUDE_RESERVED_WORDS`，这个参数可以用来屏蔽保留字，将需要屏蔽的保留字写在 = 号后面，然后以逗号分隔。

设置在 dm.ini 中的好处就是一旦设置，永久生效而且对所有客户端都有效，这样就不需要在所有客户端系统中进行专门配置。但是设置在 dm.ini 中之后，这个保留字就永久性失效了，哪怕你想通过 Manager 客户端工具在本地连接也没用了。而且该方式还存在一个隐患就是由于屏蔽掉了一些系统的保留字，所以可能会导致系统的一些功能无法正常使用。



配置达梦安装文件D:\dmdbms\data\DAMENG\dm.ini 忽略这些关键词，

```ini
EXCLUDE_RESERVED_WORDS      =  XML,EXCHANGE,DOMAIN,link           #Reserved words to be exclude
```

使得SQL可以使用。

#### 2.2.1 配置图文详解：

1.找到dm.ini文件

![image-20210629152019604](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629152019604.png)

2.打开dm.ini文件,Ctrl+F找到“EXCLUDE_RESERVED_WORDS”

![image-20210629152046748](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629152046748.png)

3.在“EXCLUDE_RESERVED_WORDS”编码 的 等号后边加上 需要忽略的关键字“XML,EXCHANGE,DOMAIN,link”， 保存即可。

![image-20210629152145059](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629152145059.png)

## 3. 总结

**不建议用这个参数，会有严重的副作用**，并且比较隐蔽；在不改表的字段的情况下，最好的方案是改名字，次之给对象名加双引号。

## 参考文章s

[查询DM达梦数据库关键字列表 保留字](https://www.modb.pro/db/34639)

[达梦关键字(如:XML,EXCHANsGE,DOMAIN,link等)配置忽略](https://www.cnblogs.com/zcx-94/p/11936551.html)
