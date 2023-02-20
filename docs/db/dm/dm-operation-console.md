# 达梦数据库-控制台工具（备份，恢复）

## 1. 概述

DM控制台工具是管理和维护数据库的基本工具。因为控制台是通过dm.ini 参数来连接实例的，所以该工具必须在DM 实例服务端运行。 无法向DM Manager 工具和 DM Monitor 那样远程连接。

- Windows 平台直接在程序里调用控制台工具来启动。
-  Linux 平台，执行DM_HOME/tool/console 启动。

## 2. 用控制台工具可以提供如下功能

- 服务器参数配置
- 脱机备份与还原
- 查看系统信息
- 查看许可证信息

## 3. 实例参数查看和修改

在控制台工具中配置好实例后，可以直接查看和修改实例的参数。

![image-20210629184434337](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629184434337.png)

## 4. 备份恢复实例

DM实例的备份恢复可以通过命令行，DM Manager 工具来进行，

- 注意DM Manager 中仅支持备份，不支持恢复。
-  这里的控制台空间是可以同时支持备份和恢复操作的。

控制台支持如下操作：

- 1)备份还原
- 2)新建备份
- 3)设置默认备份目录
- 4)指定归档文件还原
- 5)还原备份
- 6)备份属性
- 7)备份列表弹出菜单

### 4.1 备份

>脱机备份，需关闭当前实例的服务

![image-20210629184557627](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629184557627.png)

![](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629184557627.png)

### 4.2 还原

>脱机还原，需关闭当前实例的服务

![image-20210629184854266](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629184854266.png)

#### 4.2.1 DM8 还需要更新DB_magic

DM8使用DMRMAN工具备份还原恢复后，需要启动数据库服务，才能正常运行数据库。但是如果直接启动数据库服务，会报以下错误

```
Instance DMSERVER startup failed, execute 'recover database ... update db_magic' in dmrman.
```

原因是DM8比DM7多出了一步更新db_magic的步骤，若不执行该步骤则会报以上错误，且无法直接启动数据库服务。

更新db_magic语法:

- 方式1：recover database ‘/home/dmdba/dmdbms/data/TEST/dm.ini’ update db_magic;

- 方式2：界面操作

![image-20210629191451696](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629191451696.png)

更新完db_magic后即可启动数据库服务

## 5. 可能遇到的问题

### 5.1 信号量异常

![image-20210629192030430](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210629192030430.png)

脱机备份还原，需关闭当前实例的服务

## 参考文章

[DM 达梦数据库 控制台工具（console） 使用说明](https://www.cndba.cn/dave/article/3842)

[达梦8数据库还原恢复后开启数据库服务报Instance DMSERVICETEST startup failed错误](https://blog.csdn.net/weixin_42316663/article/details/107682674)
