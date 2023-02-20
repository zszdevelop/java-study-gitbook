# Flyway-commandline使用

## 1. flyway下载

https://repo1.maven.org/maven2/org/flywaydb/

![image-20211011213319190](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211011213319190.png)

- conf ：存放flyway.conf配置文件，通过jdbc方式配置数据库连接
- drivers：存放数据库jdbc驱动
- sql：存放数据库元数据sql脚本

## 2. 配置conf

```bash
# 数据库url地址
flyway.url=jdbc:mysql://192.168.0.1:3306/flywaytest?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
# 数据库驱动
flyway.driver=com.mysql.jdbc.Driver
#数据库用户名
flyway.user=root
#数据库密码
flyway.password=youpassword
```

## 3. 新建初始化sql

V1001__Create_person_table.sql

```sql
create table PERSON (
    ID int not null,
    NAME varchar(100) not null
);
```

## 4. 初始化版本控制表

```bash
./flyway migrate -baselineOnMigrate=true
```

![image-20211011214740961](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211011214740961.png)

## 5. Flyway 常用命令

### 5.1 Migrate命令

执行sql文件夹中未执行的sql，将sql版本更到最新。如果Flyway不存在，它将自动创建架构历史记录表。

![image-20211026152909198](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026152909198.png)

#### 5.1.1 使用

```sh
flyway  migrate
```

![image-20211026154955580](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026154955580.png)

![image-20211026154919444](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026154919444.png)

### 5.2 clean 命令

删除已配置模式中的所有对象（表，视图，过程，触发器等）。
架构将按照`schemas`属性指定的顺序进行清理。

![image-20211026153049436](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026153049436.png)

#### 5.2.1 使用

```
flyway  clean
```

![image-20211026155035705](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026155035705.png)

表已经被清空了

![image-20211026155129127](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026155129127.png)

### 5.3 info命令

打印有关所有迁移的详细信息和状态信息。

![image-20211026153221574](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026153221574.png)

#### 5.3.1 使用

```
flyway  info
```

![image-20211026155748244](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026155748244.png)

相比数据库这张表

- 数据列会更少一些。比如执行者、执行时间
- 但是这里会出现待执行的

![image-20211026155329057](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026155329057.png)

### 5.4 validate 命令

针对已解决的迁移（在文件系统或类路径上）验证已应用的迁移，以检测可能会导致无法准确创建模式的意外更改。

如果验证失败

- 发现迁移名称，类型或校验和方面的差异
- 已应用不再在本地解析的版本
- 已解决尚未应用的版本

![image-20211026153524052](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026153524052.png)

#### 5.4.1 使用

```
flyway  validate
```

![image-20211026160024340](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026160024340.png)

原有的脚本如果变化了，用这个就可以校验是哪个脚本

改回原来的就没有问题了

![image-20211026160110913](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026160110913.png)

### 5.5 baseline 命令

为现有数据库提供基准，不包括直到包括的所有迁移`baselineVersion`。

![image-20211026153926959](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026153926959.png)

#### 5.5.1 使用

```
flyway  baseline
```

![image-20211026160250111](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026160250111.png)

如果数据库中有数据会报错，需要clean清空数据后，在执行

### 5.6 repair 命令

修复Flyway模式历史记录表。这将执行以下操作：

- 在没有DDL事务的数据库上删除所有失败的迁移
  （仍然必须手动清理留下的用户对象）
- 将可用迁移的校验和，描述和类型与可用迁移重新对齐

![image-20211026154058239](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026154058239.png)

#### 5.6.1 使用

```bash
flyway repair
```

![image-20211026160918822](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026160918822.png)

对有报错的语句执行后会回滚。

## 参考文章

[Flyway自学之路-03（几个可用命令行操作Flyway）](https://blog.csdn.net/u012045045/article/details/106312789)

