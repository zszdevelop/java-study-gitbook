# Flyway兼容达梦数据库

## 1. 背景

公司项目需要兼容国产数据库达梦，达梦和oracle 相似度还是非常高的。绝大部分的sql语句都能共用。但是flyway 本身是不支持达梦的，但是不着急，flyway 本身是开源的，那么我们是否能将达梦适配到 oracle的flyway呢

## 2. 源码下载导入

## 2.1 flyway 源码

[flyway源码地址](https://github.com/flyway/flyway)

因公司项目之前是用6.3.3 版本，现在版本已经变化挺大了，所以还是使用tag 为6.3.3 的

![image-20210925101634465](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210925101634465.png)

## 2.2 flyway 打包测试

我们直接打包是不能直接打包成功的

```
Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.8.1:compile (default-compile) on project flyway-core: Fatal error compiling
```

![image-20210925102032444](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210925102032444.png)

网上的解释是，版本不一致，但按照他们的方法一个个设置，怎么都没用。

后面怀疑是idea 的问题，用mvn clean package 打包做测试

![image-20210925102307886](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210925102307886.png)

结果发现mvn 的提示清晰多了 

```
无效的标记: --release 
```

### 2.2.1 解决办法

- 第一种： jdk 升级到 JDK9

  不推荐，很多公司还是用jdk8

- pom.xml 注释掉 `<release>8</release>`

  ![image-20210925102554160](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210925102554160.png)

这样打包就可以正常使用了

## 4. 适配达梦

### 4.1 修改DatabaseType 

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



### 4.2 DriverType中添加dmDriverType

```java
public class DriverDataSource implements DataSource {
 public enum DriverType {
	... 
  ORACLE("jdbc:oracle", "oracle.jdbc.OracleDriver"),
	DM("jdbc:dm", "dm.jdbc.driver.DmDriver"),
```

### 4.3  不校验版本

我们要兼容达梦，达梦的版本是8.X 而 Oracle 是需要10.x 以上的，所以我们不校验版本

```
Exception in thread "main" org.flywaydb.core.internal.exception.FlywayDbUpgradeRequiredException: Oracle upgrade required: Oracle 8.1 is outdated and no longer supported by Flyway. Flyway currently supports Oracle 10 and newer.

```

![image-20210921173026851](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210921173026851.png)

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

## 5. 达梦测试

### 5.1 添加dm依赖

```pom
<dependency>
    <groupId>com.dm</groupId>
    <artifactId>DmJdbcDriver</artifactId>
    <version>1.8.0</version>
</dependency>
```

### 5.2 添加达梦测试类

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

### 5.3 运行测试

![image-20210921173515577](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210921173515577.png)

也正常生成 `flyway_schema_history`

## 6. 集成到自己项目中

### 6.1 下载flyway-dm-6.3.3

[flyway-dm-6.3.3下载](https://github.com/zszdevelop/flyway-dm/releases/tag/flyway-6.3.3)

### 6.2  将文件放入lib中

![image-20210925103927972](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210925103927972.png)

### 6.2  pom依赖

```xml
        <!-- flyway-->
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-core</artifactId>
            <version>0-SNAPSHOT</version>
            <scope>system</scope>
            <systemPath>${project.basedir}/lib/flyway-core-0-SNAPSHOT.jar</systemPath>
        </dependency>
```

## 7. 在flyway-commandline使用

我们使用方式可以是在项目中使用，还可以使用flyway-commandline 的方式。此方式更加方便

### 7.1 下载对应版本的flyway-commandline

我们改的源码是6.3.3 的，所以我们下载6.3.3 的flyway-commandline

[flywaydb下载](https://repo1.maven.org/maven2/org/flywaydb/)

### 7.2 添加达梦驱动

将达梦驱动放到 flyway-6.3.3->drivers->DmJdbcDriver18.jar

![image-20211011222426034](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211011222426034.png)

### 7.3  更改配置

修改flyway-6.3.3-》conf->flyway.conf

```bash
# 达梦数据库url
flyway.url=jdbc:dm://192.168.0.1:5236
# 数据库驱动
flyway.driver=dm.jdbc.driver.DmDriver
# 数据库用户名
flyway.user=youuser
# 数据库密码
flyway.password=youpassword
```

#### 7.4 替换flyway-core包

修改flyway-6.3.3-》lib->community->flyway-core-6.3.3.jar

![image-20211011222641335](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211011222641335.png)

### 7.5 命令行运行

```
./flyway migrate -baselineOnMigrate=true
```



## 参考文章

[flyway 源码解析](https://blog.csdn.net/qq_32811865/article/details/105594256)

[flyway-4.2适配DM8数据库](https://blog.csdn.net/babyzhongheng/article/details/115176744)

[问题解决：flyway源码编译，报：flyway-core: Fatal error compiling: 无效的标记: --release](https://blog.csdn.net/u013084266/article/details/106542814)

