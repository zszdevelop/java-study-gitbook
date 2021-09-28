# Flyway兼容达梦数据库

## 1. 背景

## 2. 修改

### 2.1 将pom文件，移到根目录

![image-20210921202513182](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210921202513182.png)

1. 将META-INF文件夹下的pom文件移到根目录
2. 并更新

### 2.2 新建src/main/java 文件夹

1. 新建src/main/java 文件夹
2. 新建src/main/resources 文件夹

![image-20210921202029009](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210921202029009.png)

### 2.2 将org包下的源码移入java目录下

![image-20210921202229371](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210921202229371.png)

## 1. 解压出来的内容

![image-20210921161054646](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210921161054646.png)

新建src 和 resource 文件夹，将org 文件夹移动到src文件夹中

![image-20210921161200504](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210921161200504.png)

将META-INF文件夹下的pom文件，移到根目录

![image-20210921161521951](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210921161521951.png)

在modules 中将src 设置成sources ，将resource 设置成resources

- 方式一：

![image-20210921161705098](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210921161705098.png)

- 方式二：
- ![image-20210921165133285](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210921165133285.png)

全局搜索 databaseProductName.startsWith("Oracle")

![image-20210921162215933](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210921162215933.png)

增加||databaseProductName.startsWith("DM")

```
if (databaseProductName.startsWith("Oracle")||databaseProductName.startsWith("DM")) {
            return ORACLE;
        }
```

## 3. MySql集成测试

### 3.1 添加mysql 依赖

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

### 3.2 添加测试类

 第一步先执行baseline,之后才能执行migrate  

```java
package org.flywaydb.core;
public class MainTest {

    public static void main(String[] args) {
        Flyway flyway = Flyway.configure().dataSource("jdbc:mysql://47.119.125.3:3306/ygn?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8",
                "root", "ywt123456").load();
//        第一步先执行baseline,之后才能执行migrate                 
        flyway.baseline();
//        flyway.migrate();
        System.out.println("执行完了");
    }
}
```

### 3.3 数据库新增表 flyway_schema_history

![image-20210921165644716](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210921165644716.png)

表内容如下

![image-20210921165652823](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210921165652823.png)

## 4. 达梦集成测试

### 4.1 添加dm依赖

```pom
<dependency>
    <groupId>com.dm</groupId>
    <artifactId>DmJdbcDriver</artifactId>
    <version>1.8.0</version>
</dependency>
```

### 4.2 修改DatabaseType 

org.flywaydb.core.internal.jdbc.DatabaseType类中

```java
 if (databaseProductName.startsWith("Oracle"))) {
            return ORACLE;
        }
```

增加||databaseProductName.startsWith("DM")

```java
 if (databaseProductName.startsWith("Oracle")||databaseProductName.startsWith("DM")) {
            return ORACLE;
        }
```



### 4.3 DriverType中添加dmDriverType

```java
public class DriverDataSource implements DataSource {
 public enum DriverType {
	... 
  ORACLE("jdbc:oracle", "oracle.jdbc.OracleDriver"),
	DM("jdbc:dm", "dm.jdbc.driver.DmDriver"),
```

### 4.4 添加达梦测试类

```java
public class MainTest {

    public static void main(String[] args) {
        Flyway flyway = Flyway.configure().dataSource("jdbc:dm://192.168.0.1:5236",
                "root", "123456").load();
//        第一步先执行baseline,之后才能执行migrate
        flyway.baseline();
//        flyway.migrate();
        System.out.println("执行完了");

    }
}
```

### 

### 4.5  其他修改

改完运行发现 Oracle upgrade required: Oracle 8.1

```
Exception in thread "main" org.flywaydb.core.internal.exception.FlywayDbUpgradeRequiredException: Oracle upgrade required: Oracle 8.1 is outdated and no longer supported by Flyway. Flyway currently supports Oracle 10 and newer.

```

![image-20210921173026851](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210921173026851.png)

因为我们达梦直接使用oracle 的语法，但是版本还是达梦的。所以我们直接注释掉。有两处

- 第一处为：

```java
   protected final void ensureDatabaseIsRecentEnough(String oldestSupportedVersion) {
//        if (!getVersion().isAtLeast(oldestSupportedVersion)) {
//            throw new FlywayDbUpgradeRequiredException(databaseType, computeVersionDisplayName(getVersion()),
//                    computeVersionDisplayName(MigrationVersion.fromVersion(oldestSupportedVersion)));
//        }
    }
```

- 第二处为：

```java
    /**
     * Ensures this database it at least at recent as this version otherwise suggest upgrade to this higher edition of
     * Flyway.
     *
     * @param oldestSupportedVersionInThisEdition The oldest supported version of the database by this edition of Flyway.
     * @param editionWhereStillSupported          The edition of Flyway that still supports this version of the database,
     *                                            in case it's too old.
     */
    protected final void ensureDatabaseNotOlderThanOtherwiseRecommendUpgradeToFlywayEdition(String oldestSupportedVersionInThisEdition,
                                                                                            Edition editionWhereStillSupported) {
//        if (!getVersion().isAtLeast(oldestSupportedVersionInThisEdition)) {
//            throw new FlywayEditionUpgradeRequiredException(
//                    editionWhereStillSupported,
//                    databaseType,
//                    computeVersionDisplayName(getVersion()));
//        }
    }
```

### 4.5 再次运行时，就能正常运行了

![image-20210921173515577](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210921173515577.png)

也正常生成 `flyway_schema_history`