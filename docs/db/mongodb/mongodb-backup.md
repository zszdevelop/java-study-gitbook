

# MongoDB数据备份与还原

## 1. 简介

MongoDB官方提供了两套数据导入导出工具，一般来说，

- mongodump和mongorestore
  - 进行整库导出导入时使用
  - 操作的数据是BSON格式，进行大量dump和restore时效率较高。
- mongoexport和mongoimport
  - 进行单个集合导出导入时使用
  - 操作的数据是JSON格式，可读性较高

## 2. mongodump（备份）

### 2.1 说明

mongodump是一个用于导出二进制数据库内容的实用工具，它导出的bson文档中只会包含着集合文档等信息，不包括索引信息（索引信息会单独导出），所以还原后，索引必须重建（这个不用担心，使用mongorestore会自动重建mongodump生成的索引信息）。3.4版本中添加了对只读视图的支持。

### 2.2 参数

| 命令 | 全称                        | 默认值            | 参考释义                                                     |
| ---- | --------------------------- | ----------------- | ------------------------------------------------------------ |
|      | --help                      |                   | 查看mongodump命令的使用帮助                                  |
|      | --version                   |                   | 返回mongodump的版本号                                        |
| -h   | `--host <hostname><:port>`  | `localhost:27017` | 指定mongod要连接的主机名及端口号                             |
|      | `--port <port>`             | `27017`           | 指定MongoDB实例监听客户连接的TCP端口号                       |
| -u   | `--username <username>`     |                   | 指定用于向使用认证的MongoDB数据库认证的用户名，与--password和 --authenticationDatabase结合使用 |
| -p   | `--password <password>`     |                   | 指定用于向使用认证的MongoDB数据库认证的密码。与--username和 -- authenticationDatabase选项结合使用。 |
| -d   | `--db <database>`           |                   | 指定要备份的数据库。如果不指定，mongodump会将此实例中的所有数据库备份。 |
| -c   | `--collection <collection>` |                   | 指定要备份的集合。如果不指定，则会将指定数据库或实例中的所有集合备份。 |
|      | `--gzip`                    |                   | 3.2版本+，压缩输出，如果mongodump指定导出到目录，则该选项会将每个文件都压缩， 并添加.gz后缀； 如果mongodump指定导出到文档或标准输出流，则该选项会压缩到文档或输出流中 |
| -o   | `--out <path>`              |                   | 指定导出数据的目录路径，如不指定，则mongodump默认将文件输出到dump所在的工作目录中。 该选项不能和--archive一起使用 |

### 2.3 举例

将mytest数据库中的user集合导出到F:\bk目录下(win在要bin目录下执行)

```groovy
mongodump -d mytest -c user -o F:\bk
```

![image-20210104143705063](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210104143705063.png)

其中的metadata.json即为索引信息

## 3. mongorestore

### 3.1 说明

mongorestore用来导入数据到MongoDB实例中，3.0.0版本以上支持通过标准输入流来导入数据。

### 3.2 参数

| 命令 | 全称                        | 参考释义                                                     |
| :--- | :-------------------------- | :----------------------------------------------------------- |
| -d   | `--db <database>`           | 指定要还原的数据库。如果不指定，restore将会还原dump记录的所有数据库，并会覆盖现有数据库数据 |
| -c   | `--collection <collection>` | `指定要还原的集合。如果不指定，mongorestore会从文件名中读取识别集合名称（如果有扩展名则会省略扩展名）` |
|      | --drop                      | 还原集合之前会先从目标数据库中删除集合，不会删除不在备份中的集合。 |
|      | --gzip                      | 3.2版本+，从压缩文件中还原                                   |
|      | `<path>`                    | 要还原的数据文件路径，该参数必须是mongorestore命令的最后一个参数 |
|      | --dir                       | 指定备份文件目录                                             |

其他参数与mongodump基本一致。

### 3.3 举例：

通过user.bson文件还原mytest数据库中的user集合，并在还原之前进行删除

```bash
mongorestore --drop -d mytest -c user --dir F:\bk\mytest
```



```sql
mongorestore --drop -d mytest -c user F:\bk\mytest\user.bson
```

```bash
linux下可以使用：mongorestore -d <db_name> <bson_folder>
windows下可以使用：mongorestore.exe -d <db_name> <bson_folder>
```

![image-20210104143924453](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210104143924453.png)

```bash
./mongorestore -h"127.0.0.1:27017"  -d caseDB --dir /home/data/caseDB_200619 --bypassDocumentValidation
```



## 4. mongoexport/mongoimport与mongodump/mongorestore的对比


> 1. mongoexport/mongoimport导入/导出的是JSON格式，而mongodump/mongorestore导入/导出的是BSON格式。
> 2. JSON可读性强但体积较大，BSON则是二进制文件，体积小但对人类几乎没有可读性。
> 3. 在一些mongodb版本之间，BSON格式可能会随版本不同而有所不同，所以不同版本之间用mongodump/mongorestore可能不会成功，具体要看版本之间的兼容性。当无法使用BSON进行跨版本的数据迁移的时候，使用JSON格式即mongoexport/mongoimport是一个可选项。跨版本的mongodump/mongorestore并不推荐，实在要做请先检查文档看两个版本是否兼容（大部分时候是的）。
> 4. JSON虽然具有较好的跨版本通用性，但其只保留了数据部分，不保留索引，账户等其他基础信息。使用时应该注意。





## 参考文章

[MongoDB 逻辑还原工具mongorestore ](https://www.cnblogs.com/dbabd/p/13259147.html)

[MongoDB学习（六）数据库的备份、还原、导入及导出](https://blog.csdn.net/qq_16313365/article/details/56494522)

[Docker MongoDB 数据库备份 并复制到宿主 恢复](https://segmentfault.com/a/1190000012330284)
