# Flyway数据库版本管理

## 1. 简介

Flyway 是一款开源的数据库版本管理工具

## 2. 为什么要用Flyway

>1. 自己写的SQL忘了在所有环境执行；
>
>2. 别人写的SQL我们不能确定是否都在所有环境执行过了；
>
>3. 有人修改了已经执行过的SQL，期望再次执行；
>
>4. 需要新增环境做数据迁移；
>
>5. 每次发版需要手动控制先发DB版本，再发布应用版本；

以上种种场景都在说明数据库版本管理的重要性。特别是我们在开发环境的修改，如果没做好管理。很可能就影响线上环境。导致项目部署异常

## 3. 运行原理

当 Flyway 连接数据库中的 schema 后，会先检查是否已存在 **flyway_schema_history** （默认名，也可自定义）表，如果没有则创建。该表用于跟踪数据库的状态，如数据迁移的版本，迁移成功状态等信息。

当 **flyway_schema_history** 存在后，Flyway 会扫描文件系统或应用中的 classpath 目录的数据迁移文件，然后根据它们的版本号进行按序迁移，如下图：

![image-20201015152758896](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201015152758896.png)

**flyway_schema_history** 表记录的内容如下：

| installed_rank | version | description   | type | script                | checksum   | installed_by | installed_on          | execution_time | success |
| -------------- | ------- | ------------- | ---- | --------------------- | ---------- | ------------ | --------------------- | -------------- | ------- |
| 1              | 1       | Initial Setup | SQL  | V1__Initial_Setup.sql | 1996767037 | axel         | 2016-02-04 22:23:00.0 | 546            | true    |
| 2              | 2       | First Changes | SQL  | V2__First_Changes.sql | 1279644856 | axel         | 2016-02-06 09:18:00.0 | 127            | true    |



**由于 flyway_schema_history 表中记录了迁移的版本号，如果文件的版本号小于或等于标记为当前版本的版本号，则忽略它们不执行。**

## 4. 集成使用

### 4.1 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>


<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>

<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
    <version>5.2.4</version>
</dependency>
```

- flyway-core： flyway 核心库
- spring-boot-starter-jdbc：不能省略，否则运行无效果
- mysql-connector-java： 根据实际数据库决定

### 4.2 添加配置文件

在application.yml 添加如下配置

```yml
spring:
  datasource:
    url: jdbc:mysql://120.79.200.111:3306/mytest?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true&rewriteBatchedStatements=true&useSSL=false&serverTimezone=GMT%2B8
    username: root
    password: zsz123456
# flyway 配置
  flyway:
    # 启用或禁用 flyway
    enabled: true
    # flyway 的 clean 命令会删除指定 schema 下的所有 table, 生产务必禁掉。这个默认值是 false 理论上作为默认配置是不科学的。
    clean-disabled: true
    # SQL 脚本的目录,多个路径使用逗号分隔 默认值 classpath:db/migration
    locations: classpath:db/migration
    #  metadata 版本控制信息表 默认 flyway_schema_history
    table: flyway_schema_history
    # 如果没有 flyway_schema_history 这个 metadata 表， 在执行 flyway migrate 命令之前, 必须先执行 flyway baseline 命令
    # 设置为 true 后 flyway 将在需要 baseline 的时候, 自动执行一次 baseline。
    baseline-on-migrate: true
    # 指定 baseline 的版本号,默认值为 1, 低于该版本号的 SQL 文件, migrate 时会被忽略
    baseline-version: 1
    # 字符编码 默认 UTF-8
    encoding: UTF-8
    # 是否允许不按顺序迁移 开发建议 true  生产建议 false
    out-of-order: false
    # 需要 flyway 管控的 schema list,这里我们配置为flyway  缺省的话, 使用spring.datasource.url 配置的那个 schema,
    # 可以指定多个schema, 但仅会在第一个schema下建立 metadata 表, 也仅在第一个schema应用migration sql 脚本.
    # 但flyway Clean 命令会依次在这些schema下都执行一遍. 所以 确保生产 spring.flyway.clean-disabled 为 true
#    schemas: flyway
    # 执行迁移时是否自动调用验证   当你的 版本不符合逻辑 比如 你先执行了 DML 而没有 对应的DDL 会抛出异常
    validate-on-migrate: true
```

### 4.3 配置数据库迁移文件

在src/main/resources目录下面新建db.migration文件夹，默认情况下，该目录下的.sql文件就算是需要被flyway做版本控制的数据库SQL语句。

#### 4.3.1 SQL语句命名规范

SQL语句命名需要遵从一定的规范，否则运行的时候flyway会报错。命名规则主要有两种：

1. 仅需要被执行一次的SQL命名以大写的"V"开头，后面跟上"0~9"数字的组合,数字之间可以用“.”或者下划线"_"分割开，然后再以两个下划线分割，其后跟文件名称，最后以.sql结尾。比如，`V2.1.5__create_user_ddl.sql`、`V4.1_2__add_user_dml.sql`。
2. 可重复运行的SQL，则以大写的“R”开头，后面再以两个下划线分割，其后跟文件名称，最后以.sql结尾。。比如，`R__truncate_user_dml.sql`。

其中，V开头的SQL执行优先级要比R开头的SQL优先级高。

#### 4.2.2 新建脚本

demo准备了3个脚本：如下

1. `V1__create_user.sql`，其中代码如下，目的是建立一张user表，且只执行一次。

   

   ```sql
   CREATE TABLE IF NOT EXISTS `USER`(
       `USER_ID`          INT(11)           NOT NULL AUTO_INCREMENT,
   `USER_NAME`        VARCHAR(100)      NOT NULL COMMENT '用户姓名',
   `AGE`              INT(3)            NOT NULL COMMENT '年龄',
   `CREATED_TIME`     datetime          NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `CREATED_BY`       varchar(100)      NOT NULL DEFAULT 'UNKNOWN',
   `UPDATED_TIME`     datetime          NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `UPDATED_BY`       varchar(100)      NOT NULL DEFAULT 'UNKNOWN',
   PRIMARY KEY (`USER_ID`)
   )ENGINE=InnoDB DEFAULT CHARSET=utf8;
   ```

2. `V2__add_user.sql`，其中代码如下，目的是往user表中插入一条数据，且只执行一次。

   

   ```sql
   insert into `user`(user_name,age) values('lisi',33);
   ```

   

3. `R__add_unknown_user.sql`，其中代码如下，目的是每次启动倘若有变化，则往user表中插入一条数据。
   
      
   
      ```sql
      insert into `user`(user_name,age) values('unknown',33);
      ```
   
   与之相对应的目录截图如下：
   
   ![image-20201015154425588](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201015154425588.png)
   

其中1.0.0、1.0.1和every的文件夹不会影响flyway对SQL的识别和运行，可以自行取名和分类。

### 4.4 运行项目

我们项目运行后可以看到如下的日志

![image-20201015154844759](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201015154844759.png)

### 4.5 查看运行效果

数据库中多了两张表

![image-20201015155011691](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201015155011691.png)

其中flyway_scheme_history记录了相关记录

![image-20201015155042685](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201015155042685.png)

user表也已经创建好了并插入了两条数据：

![image-20201015155339540](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201015155339540.png)

## 5. maven插件的使用

以上步骤中，每次想要migration都需要运行整个springboot项目，并且只能执行migrate一种命令，其实flyway还是有很多其它命令的。maven插件给了我们不需要启动项目就能执行flyway各种命令的机会。

在pom中引入flyway的插件，同时配置好对应的数据库连接。

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-maven-plugin</artifactId>
            <version>5.2.4</version>
            <configuration>
                <url>jdbc:mysql://127.0.0.1:3306/mytest?useUnicode=true&amp;characterEncoding=utf8&amp;serverTimezone=GMT</url>
                <user>root</user>
                <password>root</password>
                <driver>com.mysql.cj.jdbc.Driver</driver>
            </configuration>
        </plugin>
    </plugins>
</build>
```

然后更新maven插件列表，就可以看到flyway的全部命令了。

![image-20201015155608449](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201015155608449.png)

此时，我们双击执行上图中的flyway:migrate的效果和启动整个工程执行migrate的效果是一样的。

其它命令的作用如下列出，各位可自行实验体会：

1. baseline

   对已经存在数据库Schema结构的数据库一种解决方案。实现在非空数据库新建MetaData表，并把Migrations应用到该数据库；也可以在已有表结构的数据库中实现添加Metadata表。

3. clean

   清除掉对应数据库Schema中所有的对象，包括表结构，视图，存储过程等，clean操作在dev 和 test阶段很好用，但在生产环境务必禁用。

3. info

   用于打印所有的Migrations的详细和状态信息，也是通过MetaData和Migrations完成的，可以快速定位当前的数据库版本。

4. repair

   repair操作能够修复metaData表，该操作在metadata出现错误时很有用。

5. undo

   撤销操作，社区版不支持。

6. validate

   验证已经apply的Migrations是否有变更，默认开启的，原理是对比MetaData表与本地Migrations的checkNum值，如果值相同则验证通过，否则失败。

## 5. flyway注意事项

1. flyway执行migrate必须在空白的数据库上进行，否则报错；
2. 对于已经有数据的数据库，必须先baseline，然后才能migrate；
3. clean操作是删除数据库的所有内容，包括baseline之前的内容；
4. 尽量不要修改已经执行过的SQL，即便是R开头的可反复执行的SQL，它们会不利于数据迁移；



## 参考文章

[Flyway快速上手教程](https://www.jianshu.com/p/567a8a161641)

[Flyway 简单入门教程](https://juejin.im/entry/6844903802215071758)

