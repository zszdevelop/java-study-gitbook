# Flyway-commandline使用

## 1. flyway下载

https://repo1.maven.org/maven2/org/flywaydb/

![image-20211011213319190](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211011213319190.png)

- conf ：存放flyway.conf配置文件，通过jdbc方式配置数据库连接
- drivers：存放数据库jdbc驱动
- sql：存放数据库元数据sql脚本

## 2. 配置conf

```bash
# 数据库url地址
flyway.url=jdbc:mysql://192.168.0.1:3306/ygn?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
# 数据库驱动
flyway.driver=com.mysql.jdbc.Driver
#数据库用户名
flyway.user=root
#数据库密码
flyway.password=youpassword
```

## 3. 新建初始化sql

V1_1__Create_person_table.sql

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

![image-20211011214740961](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211011214740961.png)