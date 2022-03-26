# 达梦数据库迁移工具DTS

# 1. 具体操作

### 1.1 打开 DM 数据迁移工具 DTS

![image-20210629095241281](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629095241281.png)

### 1.2 新建工程

空白位置点击新建工程

![image-20210629095346165](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629095346165.png)

### 1.3 输入工程名

![image-20210629095437062](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629095437062.png)

### 1.4 新建迁移，创建迁移任务

![image-20210629095728500](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629095728500.png)

### 1.5 输入迁移名称

输入迁移名称，迁移名称可自定义，输入后点击确定。

![image-20210629095821871](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629095821871.png)

### 1.6 迁移创建好后，会弹出迁移向导，如下图所示 

![image-20210629095920224](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629095920224.png)

### 1.7 点击下一步，选择迁移类型（源端 ==> 目标端）

选择合适的数据库迁移类型

![image-20210629100058437](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629100058437.png)

### 1.8 输入源端连接信息

- 这里最好选择sysdba 角色的用户，否则加载表的时候会有异常

![image-20210629144625735](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629144625735.png)

输入源端连接信息包括：主机 ip ，数据库监听端口，数据库实例名，源端数据库登录账号，源端数据库登录密码

以上信息确保输入正确后，点击下一步

### 1.9 输入目标端连接信息

- 这里的用户名最好自己新建，否则在查询的时候需要加上模式名（数据库名）

![image-20210629111958489](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629111958489.png)

### 1.10 迁移方式 / 对象的选择

![image-20210629103553498](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629103553498.png)

 可选择方式 1 （ sql 结果集），方式 2 （数据对象用户直接迁移）进行迁移；可通过输入“查找对象名”中输入源端需迁移用户名进行过滤，且可以通过手动修改“目的模式”设置目标端导入用户。

点击下一步继续。

### 1.11 选择迁移的表

![](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629111958489.png)

### 1.12 确认迁移信息，开始迁移

![image-20210629105203767](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629105203767.png)

### 1.13 检查迁移日志，无报错信息，即证明迁移完成。

![image-20210629105824615](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629105824615.png)

## 参考文章

[达梦数据库迁移工具DTS使用手册](https://m.yisu.com/zixun/305021.html)

