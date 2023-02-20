## mongodb异常关闭后，如何修复启动

## 1. 背景

当独立的`mongod`实例禁用日记功能时，**不正常的关闭可能会使数据处于不一致状态**。异常关闭后，如果存在非空的`mongod.lock`文件，则mongod实例在重新启动时记录以下消息：

```
Detected unclean shutdown - mongod.lock is not empty.
```

如果dbPath包含非空的`mongod.lock`文件，则必须修复数据库

>不要使用本教程恢复[replica set](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-glossary.html#term-replica-set)的成员。相反，您应该从[backup](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/core-backups.html)恢复，或者从集合的另一个成员重新同步，如[重新同步副本集的成员](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/tutorial-resync-replica-set-member.html)中所述。

> 默认情况下，MongoDB 在启用[journaling](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/core-journaling.html)的情况下运行，以防止在关闭时出现数据不一致的情况。要彻底关闭，请参阅[停止 mongod 进程](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/tutorial-manage-mongodb-processes.html#terminate-mongod-processes)。

## 2. 以--repair 启动 mongod

要修复数据文件，请使用`--repair`选项启动`mongod`实例。默认情况下，在修复操作期间，MongoDB 使用`--dbpath`中的`_tmp`目录。

发出类似于以下内容的命令：

```
mongod --dbpath /data/db --repair
```

完成后，`dbpath`应包含已修复的数据文件和一个空的`mongod.lock`文件。

## 参考文章

[意外关闭后恢复独立服务器](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/tutorial-recover-data-following-unexpected-shutdown.html#%E4%BB%A5--repair-%E5%90%AF%E5%8A%A8-mongod)