# MongoDB数据导入与导出

## 1. 简介

MongoDB官方提供了两套数据导入导出工具，一般来说，

- mongodump和mongorestore
  - 进行整库导出导入时使用
  - 操作的数据是BSON格式，进行大量dump和restore时效率较高。
- mongoexport和mongoimport
  - 进行单个集合导出导入时使用
  - 操作的数据是JSON格式，可读性较高

## 2. mongoexport（导出）

### 2.1 参数

| 命令 | 全称                        | 默认值 | 参考释义                                                     |
| :--- | :-------------------------- | :----- | :----------------------------------------------------------- |
|      | --help                      |        | 查看mongoexport的使用帮助                                    |
|      | --version                   |        | 查看mongoexport的版本号                                      |
| -d   | `--db <database>`           |        | 指定要在哪个数据库上运行该命令                               |
| -c   | `--collection <collection>` |        | 指定要导出的集合                                             |
| -f   | --fields <field1[,field2]>  |        | 指定导出时只导出一个或多个字段，导出多个时，需要使用逗号分隔; 当字段中有空格时，需要用英文引号括起来。 |
| -q   | `--query <JSON>`            |        | 导出指定查询条件的数据                                       |
|      | `--type <string>`           | json   | 指定要导出的文件类型，可选值：json，csv                      |
| -o   | `--out <file>`              |        | 指定要导出的文件路径（含文件名），如果不指定，则会导出为标准输出（例如stdout） |
|      | --limit                     |        | 查询几条数据                                                 |
|      | --skip                      |        | 跳过指定数量的数据                                           |
|      | --sort                      |        | 排序规则                                                     |

### 2.2 举例

导出mytest数据库中的user集合到user.json文件中

```groovy
D:\tool\mongodb-server\bin\mongoexport.exe --collection myCollection --db myDB -o D:\data\myCollection.json
```

![image-20210104144117228](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210104144117228.png)

## 3. mongoimport（导入）

### 3.1 参数

| 命令                           | 可选值                                                       | 参考释义                                                     |
| :----------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| --ignoreBlanks                 |                                                              | 忽略要导入文件中的空字段，如果不指定该参数，则默认会读取空字段并创建 |
| --type <json\|csv\|tsv>        | json，csv，tsv                                               | 要导入的文件类型，另外支持tsv                                |
| --headerline                   |                                                              | 使用第一行作为字段名称                                       |
| --mode <insert\|upsert\|merge> | insert（插入）， upsert（替换数据库中的文档）， merge（合并） | 指定导入过程中，如何应对数据库文档与导入文件中的文档匹配 （默认会使用_id字段对比）的情况 |
| --drop                         |                                                              | 导入之前drop集合                                             |
| --stopOnError                  |                                                              | 选项指定在mongorestore**还原导入时一出错就中止**，默认情况下， 当mongorestore遇到主键重复或文档较验失败等错误时，导入进程并不会中止。 |
| --maintainInsertionOrder       |                                                              | 选项从版本4.2开始引入，如果指定该选项，**mongorestore在还原导入文档时以实际导出时的插入顺序一致**，这其中包括批量写文档的顺序以及在批量中文档的插入顺序，在早期版本中只能保证批量写文档的顺序。如果指定该选项同时也指定了选项 |

其他参数与mongoexport基本一致

### 3.2 举例

从user.json文件导入到mytest数据库中的user集合，并在之前进行删除

```sql
mongoimport --drop -d mytest -c user --file F:\bk\user.json
```

![image-20210104144243185](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210104144243185.png)

## 参考文章

[MongoDB 逻辑还原工具mongorestore ](https://www.cnblogs.com/dbabd/p/13259147.html)

[MongoDB学习（六）数据库的备份、还原、导入及导出](https://blog.csdn.net/qq_16313365/article/details/56494522)

[Docker MongoDB 数据库备份 并复制到宿主 恢复](https://segmentfault.com/a/1190000012330284)
