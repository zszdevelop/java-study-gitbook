# SpringBoot集成ShardingJDBC-基于JPA的DB隔离多租户方案

>本文主要介绍ShardingJDBC的分片算法和分片策略，并在此基础上通过SpringBoot集成ShardingJDBC的几种策略（标准分片策略，行表达式分片策略和hint分片策略）向你展示DB隔离的多租户方案。

## 1. 知识准备

> 主要理解ShardingJDBC表的基本术语，以及分片算法和分片策略等。

### 1.1 逻辑表？绑定表？

> 如下内容来自[官网](https://shardingsphere.apache.org/)

- **逻辑表**

水平拆分的数据库（表）的相同逻辑和数据结构表的总称。例：订单数据根据主键尾数拆分为10张表，分别是t_order_0到t_order_9，他们的逻辑表名为t_order。

- **真实表**

在分片的数据库中真实存在的物理表。即上个示例中的t_order_0到t_order_9。

- **数据节点**

数据分片的最小单元。由数据源名称和数据表组成，例：ds_0.t_order_0。

- **绑定表**

指分片规则一致的主表和子表。例如：t_order表和t_order_item表，均按照order_id分片，则此两张表互为绑定表关系。绑定表之间的多表关联查询不会出现笛卡尔积关联，关联查询效率将大大提升。举例说明，如果SQL为：

```sql
SELECT i.* FROM t_order o JOIN t_order_item i ON o.order_id=i.order_id WHERE o.order_id in (10, 11);
```

在不配置绑定表关系时，假设分片键order_id将数值10路由至第0片，将数值11路由至第1片，那么路由后的SQL应该为4条，它们呈现为笛卡尔积：

```sql
SELECT i.* FROM t_order_0 o JOIN t_order_item_0 i ON o.order_id=i.order_id WHERE o.order_id in (10, 11);

SELECT i.* FROM t_order_0 o JOIN t_order_item_1 i ON o.order_id=i.order_id WHERE o.order_id in (10, 11);

SELECT i.* FROM t_order_1 o JOIN t_order_item_0 i ON o.order_id=i.order_id WHERE o.order_id in (10, 11);

SELECT i.* FROM t_order_1 o JOIN t_order_item_1 i ON o.order_id=i.order_id WHERE o.order_id in (10, 11);
```

在配置绑定表关系后，路由的SQL应该为2条：

```sql
SELECT i.* FROM t_order_0 o JOIN t_order_item_0 i ON o.order_id=i.order_id WHERE o.order_id in (10, 11);

SELECT i.* FROM t_order_1 o JOIN t_order_item_1 i ON o.order_id=i.order_id WHERE o.order_id in (10, 11);
```

其中t_order在FROM的最左侧，ShardingSphere将会以它作为整个绑定表的主表。 所有路由计算将会只使用主表的策略，那么t_order_item表的分片计算将会使用t_order的条件。故绑定表之间的分区键要完全相同。

- **广播表**

指所有的分片数据源中都存在的表，表结构和表中的数据在每个数据库中均完全一致。适用于数据量不大且需要与海量数据的表进行关联查询的场景，例如：字典表。

### 1.2 分片算法？分片策略？

> 如下内容来自[官网](https://shardingsphere.apache.org/)

#### 1.2.1 分片键

用于分片的数据库字段，是将数据库(表)水平拆分的关键字段。例：将订单表中的订单主键的尾数取模分片，则订单主键为分片字段。 SQL中如果无分片字段，将执行全路由，性能较差。 除了对单分片字段的支持，ShardingSphere也支持根据多个字段进行分片。

#### 1.2.2 分片算法

> 通过分片算法将数据分片，支持通过=、>=、<=、>、<、BETWEEN和IN分片。分片算法需要应用方开发者自行实现，可实现的灵活度非常高。

目前提供4种分片算法。由于分片算法和业务实现紧密相关，因此并未提供内置分片算法，而是通过分片策略将各种场景提炼出来，提供更高层级的抽象，并提供接口让应用开发者自行实现分片算法。

- **精确分片算法**

对应PreciseShardingAlgorithm，用于处理使用单一键作为分片键的=与IN进行分片的场景。需要配合StandardShardingStrategy使用。

- **范围分片算法**

对应RangeShardingAlgorithm，用于处理使用单一键作为分片键的`BETWEEN AND、>、<、>=、<=`进行分片的场景。需要配合StandardShardingStrategy使用。

- **复合分片算法**

对应ComplexKeysShardingAlgorithm，用于处理使用多键作为分片键进行分片的场景，包含多个分片键的逻辑较复杂，需要应用开发者自行处理其中的复杂度。需要配合ComplexShardingStrategy使用。

- **Hint分片算法**

对应HintShardingAlgorithm，用于处理使用Hint行分片的场景。需要配合HintShardingStrategy使用。

![image-20220717205845609](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717205845609.png)

#### 1.2.3 分片策略

> 包含分片键和分片算法，由于分片算法的独立性，将其独立抽离。真正可用于分片操作的是分片键 + 分片算法，也就是分片策略。目前提供5种分片策略。

- **标准分片策略**

对应StandardShardingStrategy。提供对SQL语句中的`=, >, <, >=, <=, IN`和BETWEEN AND的分片操作支持。StandardShardingStrategy只支持单分片键，提供PreciseShardingAlgorithm和RangeShardingAlgorithm两个分片算法。PreciseShardingAlgorithm是必选的，用于处理=和IN的分片。RangeShardingAlgorithm是可选的，用于处理`BETWEEN AND, >, <, >=, <=`分片，如果不配置RangeShardingAlgorithm，SQL中的BETWEEN AND将按照全库路由处理。

- **复合分片策略**

对应ComplexShardingStrategy。复合分片策略。提供对SQL语句中的`=, >, <, >=, <=, IN`和BETWEEN AND的分片操作支持。ComplexShardingStrategy支持多分片键，由于多分片键之间的关系复杂，因此并未进行过多的封装，而是直接将分片键值组合以及分片操作符透传至分片算法，完全由应用开发者实现，提供最大的灵活度。

- **行表达式分片策略**

对应InlineShardingStrategy。使用Groovy的表达式，提供对SQL语句中的=和IN的分片操作支持，只支持单分片键。对于简单的分片算法，可以通过简单的配置使用，从而避免繁琐的Java代码开发，如: `t_user_$->{u_id % 8}` 表示t_user表根据u_id模8，而分成8张表，表名称为t_user_0到t_user_7。

- **Hint分片策略**

对应HintShardingStrategy。通过Hint指定分片值而非从SQL中提取分片值的方式进行分片的策略。

- **不分片策略**

对应NoneShardingStrategy。不分片的策略。

![image-20220717210154703](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717210154703.png)

#### 1.2.4  SQL Hint

对于分片字段非SQL决定，而由其他外置条件决定的场景，可使用SQL Hint灵活的注入分片字段。例：内部系统，按照员工登录主键分库，而数据库中并无此字段。SQL Hint支持通过Java API和SQL注释(待实现)两种方式使用。

### 1.3 ShardingJDBC 内部结构

![image-20220717210304411](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717210304411.png)

- **黄色部分**

图中黄色部分表示的是Sharding-JDBC的入口API，采用工厂方法的形式提供。 目前有ShardingDataSourceFactory和MasterSlaveDataSourceFactory两个工厂类。ShardingDataSourceFactory用于创建分库分表或分库分表+读写分离的JDBC驱动，MasterSlaveDataSourceFactory用于创建独立使用读写分离的JDBC驱动。

- **蓝色部分**

图中蓝色部分表示的是Sharding-JDBC的配置对象，提供灵活多变的配置方式。 ShardingRuleConfiguration是分库分表配置的核心和入口，它可以包含多个TableRuleConfiguration和MasterSlaveRuleConfiguration。每一组相同规则分片的表配置一个TableRuleConfiguration。如果需要分库分表和读写分离共同使用，每一个读写分离的逻辑库配置一个MasterSlaveRuleConfiguration。 每个TableRuleConfiguration对应一个ShardingStrategyConfiguration，它有5中实现类可供选择。

仅读写分离使用MasterSlaveRuleConfiguration即可。

- **红色部分**

图中红色部分表示的是内部对象，由Sharding-JDBC内部使用，应用开发者无需关注。Sharding-JDBC通过ShardingRuleConfiguration和MasterSlaveRuleConfiguration生成真正供ShardingDataSource和MasterSlaveDataSource使用的规则对象。ShardingDataSource和MasterSlaveDataSource实现了DataSource接口，是JDBC的完整实现方案。

#### 1.3.1 初始化流程

1. 配置Configuration对象。
2. 通过Factory对象将Configuration对象转化为Rule对象。
3. 通过Factory对象将Rule对象与DataSource对象装配。
4. Sharding-JDBC使用DataSource对象进行分库。

#### 1.3.2 使用约定

在org.apache.shardingsphere.api和org.apache.shardingsphere.shardingjdbc.api 包中的类是面向用户的API，每次修改都会在release notes中明确声明。 其他包中的类属于内部实现，可能随时进行调整，请勿直接使用。

## 2. 简单示例

> 这里主要介绍SpringBoot集成基于ShardingJDBC的按字段分库，两种策略（标准分片策略 和 行表达式分片策略），主要承接之前的相关文章在JPA方式的基础上实现的。

### 2.1 准备DB和依赖配置

创建MySQL的schema test_db_tenant_a 和 test_db_tenant_b, 导入SQL 文件如下

test_db_tenant_a

```sql
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: test_db_tenant_a
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_role`
--

DROP TABLE IF EXISTS `tb_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_role` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `role_key` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `tenant` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_role`
--

LOCK TABLES `tb_role` WRITE;
/*!40000 ALTER TABLE `tb_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user` (
  `id` bigint NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `tenant` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_role`
--

DROP TABLE IF EXISTS `tb_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user_role` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  `tenant` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_role`
--

LOCK TABLES `tb_user_role` WRITE;
/*!40000 ALTER TABLE `tb_user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 20:28:34

```

test_db_tenant_b

```sql
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: test_db_tenant_b
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_role`
--

DROP TABLE IF EXISTS `tb_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_role` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `role_key` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `tenant` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_role`
--

LOCK TABLES `tb_role` WRITE;
/*!40000 ALTER TABLE `tb_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user` (
  `id` bigint NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `tenant` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_role`
--

DROP TABLE IF EXISTS `tb_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user_role` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  `tenant` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_role`
--

LOCK TABLES `tb_user_role` WRITE;
/*!40000 ALTER TABLE `tb_user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 20:28:29
```

引入maven依赖, 包含mysql驱动，JPA包, 以及sharding-jdbc的依赖。

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.28</version>
</dependency>
<dependency>
    <groupId>com.github.wenhao</groupId>
    <artifactId>jpa-spec</artifactId>
    <version>3.1.0</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>sharding-jdbc-spring-boot-starter</artifactId>
    <version>4.1.1</version>
</dependency>
```

增加yml配置

```yml
spring:
  shardingsphere:
    datasource:
      names: tenant-a,tenant-b
      tenant-a:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/test_db_tenant_a?allowPublicKeyRetrieval=true&useSSL=false&autoReconnect=true&characterEncoding=utf8
        username: root
        password: bfXa4Pt2lUUScy8jakXf
      tenant-b:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/test_db_tenant_b?allowPublicKeyRetrieval=true&useSSL=false&autoReconnect=true&characterEncoding=utf8
        username: root
        password: bfXa4Pt2lUUScy8jakXf
    sharding:
      default-database-strategy:
        # way 1: standard strategy
        # standard:
        #  precise-algorithm-class-name: tech.pdai.springboot.shardingjdbc.jpa.tenant.db.config.MyPreciseShardingDBAlgorithm
        #  sharding-column: tenant
        # way 2: inline strategy
        inline:
          sharding-column: tenant
          algorithm-expression: tenant-$->{tenant}
      tables:
        tb_user:
          actual-data-nodes: tenant-${['a','b']}.tb_user
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
        tb_role:
          actual-data-nodes: tenant-${['a','b']}.tb_role
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
        tb_user_role:
          actual-data-nodes: tenant-${['a','b']}.tb_user_role
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
      binding-tables: tb_user,tb_role,tb_user_role
    props:
      sql:
        show: true
  jpa:
    open-in-view: false
    generate-ddl: false
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
        format_sql: true
        use-new-id-generator-mappings: false
```

### 2.2 Entity

user entity

```java
package tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "tb_user")
public class User implements BaseEntity {

    /**
     * user id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    /**
     * username.
     */
    private String userName;

    /**
     * user pwd.
     */
    private String password;

    /**
     * email.
     */
    private String email;

    /**
     * phoneNumber.
     */
    private long phoneNumber;

    /**
     * description.
     */
    private String description;

    /**
     * create date time.
     */
    private LocalDateTime createTime;

    /**
     * update date time.
     */
    private LocalDateTime updateTime;

    /**
     * tenant.
     */
    private String tenant;

    /**
     * join to role table.
     */
    @ManyToMany(cascade = {CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JoinTable(name = "tb_user_role", joinColumns = {
            @JoinColumn(name = "user_id")}, inverseJoinColumns = {@JoinColumn(name = "role_id")})
    private Set<Role> roles;

}
```

role entity

```java
package tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * @author pdai
 */
@Getter
@Setter
@ToString
@Entity
@Table(name = "tb_role")
public class Role implements BaseEntity {

    /**
     * role id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    /**
     * role name.
     */
    private String name;

    /**
     * role key.
     */
    private String roleKey;

    /**
     * description.
     */
    private String description;

    /**
     * create date time.
     */
    private LocalDateTime createTime;

    /**
     * update date time.
     */
    private LocalDateTime updateTime;

    /**
     * tenant.
     */
    private String tenant;

}
```

### 2.3 DAO

user dao

```java
package tech.pdai.springboot.shardingjdbc.jpa.tenant.db.dao;

import org.springframework.stereotype.Repository;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity.User;

@Repository
public interface IUserDao extends IBaseDao<User, Long> {

}
```

role dao

```java
package tech.pdai.springboot.shardingjdbc.jpa.tenant.db.dao;

import org.springframework.stereotype.Repository;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity.Role;

@Repository
public interface IRoleDao extends IBaseDao<Role, Long> {

}
```

### 2.4 Service

user service 接口

```java
package tech.pdai.springboot.shardingjdbc.jpa.tenant.db.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity.User;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity.query.UserQueryBean;

public interface IUserService extends IBaseService<User, Long> {

    /**
     * find by page.
     *
     * @param userQueryBean query
     * @param pageRequest   pageRequest
     * @return page
     */
    Page<User> findPage(UserQueryBean userQueryBean, PageRequest pageRequest);

}
```

user service 实现类

```java
package tech.pdai.springboot.shardingjdbc.jpa.tenant.db.service.impl;


import com.github.wenhao.jpa.Specifications;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.dao.IBaseDao;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.dao.IUserDao;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity.User;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity.query.UserQueryBean;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.service.IUserService;

@Service
public class UserDoServiceImpl extends BaseDoServiceImpl<User, Long> implements IUserService {

    /**
     * userDao.
     */
    private final IUserDao userDao;

    /**
     * init.
     *
     * @param userDao2 user dao
     */
    public UserDoServiceImpl(final IUserDao userDao2) {
        this.userDao = userDao2;
    }

    /**
     * @return base dao
     */
    @Override
    public IBaseDao<User, Long> getBaseDao() {
        return this.userDao;
    }

    /**
     * find by page.
     *
     * @param queryBean   query
     * @param pageRequest pageRequest
     * @return page
     */
    @Override
    public Page<User> findPage(UserQueryBean queryBean, PageRequest pageRequest) {
        Specification<User> specification = Specifications.<User>and()
                .eq(StringUtils.isNotEmpty(queryBean.getTenant()), "tenant", queryBean.getTenant())
                .like(StringUtils.isNotEmpty(queryBean.getName()), "user_name", queryBean.getName())
                .like(StringUtils.isNotEmpty(queryBean.getDescription()), "description",
                        queryBean.getDescription())
                .build();
        return this.getBaseDao().findAll(specification, pageRequest);
    }

}
```

role service 接口

```java
package tech.pdai.springboot.shardingjdbc.jpa.tenant.db.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity.Role;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity.query.RoleQueryBean;

public interface IRoleService extends IBaseService<Role, Long> {

    /**
     * find page by query.
     *
     * @param roleQueryBean query
     * @param pageRequest   pageRequest
     * @return page
     */
    Page<Role> findPage(RoleQueryBean roleQueryBean, PageRequest pageRequest);

}
```

role service 实现类

```java
package tech.pdai.springboot.shardingjdbc.jpa.tenant.db.service.impl;

import com.github.wenhao.jpa.Specifications;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.dao.IBaseDao;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.dao.IRoleDao;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity.Role;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity.query.RoleQueryBean;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.service.IRoleService;

@Service
public class RoleDoServiceImpl extends BaseDoServiceImpl<Role, Long> implements IRoleService {

    /**
     * roleDao.
     */
    private final IRoleDao roleDao;

    /**
     * init.
     *
     * @param roleDao2 role dao
     */
    public RoleDoServiceImpl(final IRoleDao roleDao2) {
        this.roleDao = roleDao2;
    }

    /**
     * @return base dao
     */
    @Override
    public IBaseDao<Role, Long> getBaseDao() {
        return this.roleDao;
    }

    /**
     * find page by query.
     *
     * @param roleQueryBean query
     * @param pageRequest   pageRequest
     * @return page
     */
    @Override
    public Page<Role> findPage(RoleQueryBean roleQueryBean, PageRequest pageRequest) {
        Specification<Role> specification = Specifications.<Role>and()
                .eq(StringUtils.isNotEmpty(roleQueryBean.getTenant()), "tenant", roleQueryBean.getTenant())
                .like(StringUtils.isNotEmpty(roleQueryBean.getName()), "name",
                        roleQueryBean.getName())
                .like(StringUtils.isNotEmpty(roleQueryBean.getDescription()), "description",
                        roleQueryBean.getDescription())
                .build();
        return this.roleDao.findAll(specification, pageRequest);
    }

}
```

### 2.5 Controller

user controller

```java
package tech.pdai.springboot.shardingjdbc.jpa.tenant.db.controller;


import java.time.LocalDateTime;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity.User;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity.query.UserQueryBean;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.entity.response.ResponseResult;
import tech.pdai.springboot.shardingjdbc.jpa.tenant.db.service.IUserService;

/**
 * @author pdai
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

    /**
     * @param user user param
     * @return user
     */
    @ApiOperation("Add/Edit User")
    @PostMapping("add")
    public ResponseResult<User> add(User user) {
        if (user.getId()==null || !userService.exists(user.getId())) {
            user.setCreateTime(LocalDateTime.now());
            user.setUpdateTime(LocalDateTime.now());
            userService.save(user);
        } else {
            user.setUpdateTime(LocalDateTime.now());
            userService.update(user);
        }
        return ResponseResult.success(userService.find(user.getId()));
    }


    /**
     * @return user list
     */
    @ApiOperation("Query User One")
    @GetMapping("edit/{userId}")
    public ResponseResult<User> edit(@PathVariable("userId") Long userId) {
        return ResponseResult.success(userService.find(userId));
    }

    /**
     * @return user list
     */
    @ApiOperation("Query User Page")
    @GetMapping("list")
    public ResponseResult<Page<User>> list(@RequestParam int pageSize, @RequestParam int pageNumber, String tenant) {
        return ResponseResult.success(userService.findPage(UserQueryBean.builder().tenant(tenant).build(), PageRequest.of(pageNumber, pageSize)));
    }
}

```

### 2.6 简单测试

访问页面：

http://localhost:8080/doc.html

插入数据

![image-20220717211255832](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717211255832.png)

DB 中对应schema中的数据

![image-20220717211329998](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717211329998.png)

查询数据

![image-20220717211351781](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717211351781.png)

相关查询console打印出的日志：

```bash
2022-04-08 20:58:35.755  INFO 8256 --- [nio-8080-exec-1] ShardingSphere-SQL                       : Logic SQL: insert into tb_user (create_time, description, email, password, phone_number, tenant, update_time, user_name) values (?, ?, ?, ?, ?, ?, ?, ?)
2022-04-08 20:58:35.755  INFO 8256 --- [nio-8080-exec-1] ShardingSphere-SQL                       : SQLStatement: InsertStatementContext(super=CommonSQLStatementContext(sqlStatement=org.apache.shardingsphere.sql.parser.sql.statement.dml.InsertStatement@67776a98, tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@1d5f5394), tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@1d5f5394, columnNames=[create_time, description, email, password, phone_number, tenant, update_time, user_name], insertValueContexts=[InsertValueContext(parametersCount=8, valueExpressions=[ParameterMarkerExpressionSegment(startIndex=118, stopIndex=118, parameterMarkerIndex=0), ParameterMarkerExpressionSegment(startIndex=121, stopIndex=121, parameterMarkerIndex=1), ParameterMarkerExpressionSegment(startIndex=124, stopIndex=124, parameterMarkerIndex=2), ParameterMarkerExpressionSegment(startIndex=127, stopIndex=127, parameterMarkerIndex=3), ParameterMarkerExpressionSegment(startIndex=130, stopIndex=130, parameterMarkerIndex=4), ParameterMarkerExpressionSegment(startIndex=133, stopIndex=133, parameterMarkerIndex=5), ParameterMarkerExpressionSegment(startIndex=136, stopIndex=136, parameterMarkerIndex=6), ParameterMarkerExpressionSegment(startIndex=139, stopIndex=139, parameterMarkerIndex=7), DerivedParameterMarkerExpressionSegment(super=ParameterMarkerExpressionSegment(startIndex=0, stopIndex=0, parameterMarkerIndex=8))], parameters=[2022-04-08 20:58:35.323, pdai-b, pdai2@pdai.tech, dad23b, 1212121212, b, 2022-04-08 20:58:35.323, pdai23b])], generatedKeyContext=Optional[GeneratedKeyContext(columnName=id, generated=true, generatedValues=[719173465277968384])])
2022-04-08 20:58:35.755  INFO 8256 --- [nio-8080-exec-1] ShardingSphere-SQL                       : Actual SQL: tenant-b ::: insert into tb_user (create_time, description, email, password, phone_number, tenant, update_time, user_name, id) values (?, ?, ?, ?, ?, ?, ?, ?, ?) ::: [2022-04-08 20:58:35.323, pdai-b, pdai2@pdai.tech, dad23b, 1212121212, b, 2022-04-08 20:58:35.323, pdai23b, 719173465277968384]
2022-04-08 20:58:35.849  INFO 8256 --- [nio-8080-exec-1] ShardingSphere-SQL                       : Logic SQL: select user0_.id as id1_1_0_, user0_.create_time as create_t2_1_0_, user0_.description as descript3_1_0_, user0_.email as email4_1_0_, user0_.password as password5_1_0_, user0_.phone_number as phone_nu6_1_0_, user0_.tenant as tenant7_1_0_, user0_.update_time as update_t8_1_0_, user0_.user_name as user_nam9_1_0_, roles1_.user_id as user_id1_2_1_, role2_.id as role_id2_2_1_, role2_.id as id1_0_2_, role2_.create_time as create_t2_0_2_, role2_.description as descript3_0_2_, role2_.name as name4_0_2_, role2_.role_key as role_key5_0_2_, role2_.tenant as tenant6_0_2_, role2_.update_time as update_t7_0_2_ from tb_user user0_ left outer join tb_user_role roles1_ on user0_.id=roles1_.user_id left outer join tb_role role2_ on roles1_.role_id=role2_.id where user0_.id=?
2022-04-08 20:58:35.849  INFO 8256 --- [nio-8080-exec-1] ShardingSphere-SQL                       : SQLStatement: SelectStatementContext(super=CommonSQLStatementContext(sqlStatement=org.apache.shardingsphere.sql.parser.sql.statement.dml.SelectStatement@8ca5ff1, tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@120db4fa), tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@120db4fa, projectionsContext=ProjectionsContext(startIndex=7, stopIndex=603, distinctRow=false, projections=[ColumnProjection(owner=user0_, name=id, alias=Optional[id1_1_0_]), ColumnProjection(owner=user0_, name=create_time, alias=Optional[create_t2_1_0_]), ColumnProjection(owner=user0_, name=description, alias=Optional[descript3_1_0_]), ColumnProjection(owner=user0_, name=email, alias=Optional[email4_1_0_]), ColumnProjection(owner=user0_, name=password, alias=Optional[password5_1_0_]), ColumnProjection(owner=user0_, name=phone_number, alias=Optional[phone_nu6_1_0_]), ColumnProjection(owner=user0_, name=tenant, alias=Optional[tenant7_1_0_]), ColumnProjection(owner=user0_, name=update_time, alias=Optional[update_t8_1_0_]), ColumnProjection(owner=user0_, name=user_name, alias=Optional[user_nam9_1_0_]), ColumnProjection(owner=roles1_, name=user_id, alias=Optional[user_id1_2_1_]), ColumnProjection(owner=role2_, name=id, alias=Optional[role_id2_2_1_]), ColumnProjection(owner=role2_, name=id, alias=Optional[id1_0_2_]), ColumnProjection(owner=role2_, name=create_time, alias=Optional[create_t2_0_2_]), ColumnProjection(owner=role2_, name=description, alias=Optional[descript3_0_2_]), ColumnProjection(owner=role2_, name=name, alias=Optional[name4_0_2_]), ColumnProjection(owner=role2_, name=role_key, alias=Optional[role_key5_0_2_]), ColumnProjection(owner=role2_, name=tenant, alias=Optional[tenant6_0_2_]), ColumnProjection(owner=role2_, name=update_time, alias=Optional[update_t7_0_2_])]), groupByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.groupby.GroupByContext@419cdd89, orderByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.orderby.OrderByContext@5c35abd5, paginationContext=org.apache.shardingsphere.sql.parser.binder.segment.select.pagination.PaginationContext@6da5275, containsSubquery=false)
2022-04-08 20:58:35.849  INFO 8256 --- [nio-8080-exec-1] ShardingSphere-SQL                       : Actual SQL: tenant-b ::: select user0_.id as id1_1_0_, user0_.create_time as create_t2_1_0_, user0_.description as descript3_1_0_, user0_.email as email4_1_0_, user0_.password as password5_1_0_, user0_.phone_number as phone_nu6_1_0_, user0_.tenant as tenant7_1_0_, user0_.update_time as update_t8_1_0_, user0_.user_name as user_nam9_1_0_, roles1_.user_id as user_id1_2_1_, role2_.id as role_id2_2_1_, role2_.id as id1_0_2_, role2_.create_time as create_t2_0_2_, role2_.description as descript3_0_2_, role2_.name as name4_0_2_, role2_.role_key as role_key5_0_2_, role2_.tenant as tenant6_0_2_, role2_.update_time as update_t7_0_2_ from tb_user user0_ left outer join tb_user_role roles1_ on user0_.id=roles1_.user_id left outer join tb_role role2_ on roles1_.role_id=role2_.id where user0_.id=? ::: [719173465277968384]
2022-04-08 20:58:35.849  INFO 8256 --- [nio-8080-exec-1] ShardingSphere-SQL                       : Actual SQL: tenant-a ::: select user0_.id as id1_1_0_, user0_.create_time as create_t2_1_0_, user0_.description as descript3_1_0_, user0_.email as email4_1_0_, user0_.password as password5_1_0_, user0_.phone_number as phone_nu6_1_0_, user0_.tenant as tenant7_1_0_, user0_.update_time as update_t8_1_0_, user0_.user_name as user_nam9_1_0_, roles1_.user_id as user_id1_2_1_, role2_.id as role_id2_2_1_, role2_.id as id1_0_2_, role2_.create_time as create_t2_0_2_, role2_.description as descript3_0_2_, role2_.name as name4_0_2_, role2_.role_key as role_key5_0_2_, role2_.tenant as tenant6_0_2_, role2_.update_time as update_t7_0_2_ from tb_user user0_ left outer join tb_user_role roles1_ on user0_.id=roles1_.user_id left outer join tb_role role2_ on roles1_.role_id=role2_.id where user0_.id=? ::: [719173465277968384]
2022-04-08 21:03:33.876  INFO 8256 --- [nio-8080-exec-2] ShardingSphere-SQL                       : Logic SQL: select user0_.id as id1_1_, user0_.create_time as create_t2_1_, user0_.description as descript3_1_, user0_.email as email4_1_, user0_.password as password5_1_, user0_.phone_number as phone_nu6_1_, user0_.tenant as tenant7_1_, user0_.update_time as update_t8_1_, user0_.user_name as user_nam9_1_ from tb_user user0_ where user0_.tenant=? limit ?
2022-04-08 21:03:33.877  INFO 8256 --- [nio-8080-exec-2] ShardingSphere-SQL                       : SQLStatement: SelectStatementContext(super=CommonSQLStatementContext(sqlStatement=org.apache.shardingsphere.sql.parser.sql.statement.dml.SelectStatement@15243518, tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@23f84ca7), tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@23f84ca7, projectionsContext=ProjectionsContext(startIndex=7, stopIndex=293, distinctRow=false, projections=[ColumnProjection(owner=user0_, name=id, alias=Optional[id1_1_]), ColumnProjection(owner=user0_, name=create_time, alias=Optional[create_t2_1_]), ColumnProjection(owner=user0_, name=description, alias=Optional[descript3_1_]), ColumnProjection(owner=user0_, name=email, alias=Optional[email4_1_]), ColumnProjection(owner=user0_, name=password, alias=Optional[password5_1_]), ColumnProjection(owner=user0_, name=phone_number, alias=Optional[phone_nu6_1_]), ColumnProjection(owner=user0_, name=tenant, alias=Optional[tenant7_1_]), ColumnProjection(owner=user0_, name=update_time, alias=Optional[update_t8_1_]), ColumnProjection(owner=user0_, name=user_name, alias=Optional[user_nam9_1_])]), groupByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.groupby.GroupByContext@18e2796e, orderByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.orderby.OrderByContext@6a16cbdf, paginationContext=org.apache.shardingsphere.sql.parser.binder.segment.select.pagination.PaginationContext@5eaeaf70, containsSubquery=false)
2022-04-08 21:03:33.877  INFO 8256 --- [nio-8080-exec-2] ShardingSphere-SQL                       : Actual SQL: tenant-b ::: select user0_.id as id1_1_, user0_.create_time as create_t2_1_, user0_.description as descript3_1_, user0_.email as email4_1_, user0_.password as password5_1_, user0_.phone_number as phone_nu6_1_, user0_.tenant as tenant7_1_, user0_.update_time as update_t8_1_, user0_.user_name as user_nam9_1_ from tb_user user0_ where user0_.tenant=? limit ? ::: [b, 10]
2022-04-08 21:03:33.890  INFO 8256 --- [nio-8080-exec-2] ShardingSphere-SQL                       : Logic SQL: select roles0_.user_id as user_id1_2_0_, roles0_.role_id as role_id2_2_0_, role1_.id as id1_0_1_, role1_.create_time as create_t2_0_1_, role1_.description as descript3_0_1_, role1_.name as name4_0_1_, role1_.role_key as role_key5_0_1_, role1_.tenant as tenant6_0_1_, role1_.update_time as update_t7_0_1_ from tb_user_role roles0_ inner join tb_role role1_ on roles0_.role_id=role1_.id where roles0_.user_id=?
2022-04-08 21:03:33.890  INFO 8256 --- [nio-8080-exec-2] ShardingSphere-SQL                       : SQLStatement: SelectStatementContext(super=CommonSQLStatementContext(sqlStatement=org.apache.shardingsphere.sql.parser.sql.statement.dml.SelectStatement@5e7c4e50, tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@6f2681ce), tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@6f2681ce, projectionsContext=ProjectionsContext(startIndex=7, stopIndex=302, distinctRow=false, projections=[ColumnProjection(owner=roles0_, name=user_id, alias=Optional[user_id1_2_0_]), ColumnProjection(owner=roles0_, name=role_id, alias=Optional[role_id2_2_0_]), ColumnProjection(owner=role1_, name=id, alias=Optional[id1_0_1_]), ColumnProjection(owner=role1_, name=create_time, alias=Optional[create_t2_0_1_]), ColumnProjection(owner=role1_, name=description, alias=Optional[descript3_0_1_]), ColumnProjection(owner=role1_, name=name, alias=Optional[name4_0_1_]), ColumnProjection(owner=role1_, name=role_key, alias=Optional[role_key5_0_1_]), ColumnProjection(owner=role1_, name=tenant, alias=Optional[tenant6_0_1_]), ColumnProjection(owner=role1_, name=update_time, alias=Optional[update_t7_0_1_])]), groupByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.groupby.GroupByContext@3212b90b, orderByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.orderby.OrderByContext@516424e5, paginationContext=org.apache.shardingsphere.sql.parser.binder.segment.select.pagination.PaginationContext@6d56fe57, containsSubquery=false)
2022-04-08 21:03:33.890  INFO 8256 --- [nio-8080-exec-2] ShardingSphere-SQL                       : Actual SQL: tenant-b ::: select roles0_.user_id as user_id1_2_0_, roles0_.role_id as role_id2_2_0_, role1_.id as id1_0_1_, role1_.create_time as create_t2_0_1_, role1_.description as descript3_0_1_, role1_.name as name4_0_1_, role1_.role_key as role_key5_0_1_, role1_.tenant as tenant6_0_1_, role1_.update_time as update_t7_0_1_ from tb_user_role roles0_ inner join tb_role role1_ on roles0_.role_id=role1_.id where roles0_.user_id=? ::: [719173465277968384]
2022-04-08 21:03:33.890  INFO 8256 --- [nio-8080-exec-2] ShardingSphere-SQL                       : Actual SQL: tenant-a ::: select roles0_.user_id as user_id1_2_0_, roles0_.role_id as role_id2_2_0_, role1_.id as id1_0_1_, role1_.create_time as create_t2_0_1_, role1_.description as descript3_0_1_, role1_.name as name4_0_1_, role1_.role_key as role_key5_0_1_, role1_.tenant as tenant6_0_1_, role1_.update_time as update_t7_0_1_ from tb_user_role roles0_ inner join tb_role role1_ on roles0_.role_id=role1_.id where roles0_.user_id=? ::: [719173465277968384]
```

## 3. 进一步理解

### 3.1 如果使用standard策略如何？

> 上述inline策略也可以改成standard策略，效果一样。

首先自定义PreciseShardingAlgorithm算法：

```java
package tech.pdai.springboot.shardingjdbc.jpa.tenant.db.config;

import java.util.Collection;

import org.apache.shardingsphere.api.sharding.standard.PreciseShardingAlgorithm;
import org.apache.shardingsphere.api.sharding.standard.PreciseShardingValue;

/**
 * This class is for MyPreciseShardingDBAlgorithm.
 *
 * @author pdai
 */
public class MyPreciseShardingDBAlgorithm implements PreciseShardingAlgorithm<String> {

    private static final String DATABASE_TENANT_PREFIX = "tenant-";

    /**
     * @param availableTargetNames tenant-a, tenant-b
     * @param shardingValue        sharding value
     * @return targetDb
     */
    @Override
    public String doSharding(final Collection<String> availableTargetNames, final PreciseShardingValue<String> shardingValue) {
        String targetDb = DATABASE_TENANT_PREFIX + shardingValue.getValue();
        if (availableTargetNames.contains(targetDb)) {
            return targetDb;
        }

        throw new UnsupportedOperationException("UnsupportedOperationException: " + shardingValue.getValue());
    }
}
```

然后配置sharding.default-database-strategy为standard，具体如下

```yml
spring:
  shardingsphere:
    datasource:
      names: tenant-a,tenant-b
      tenant-a:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/test_db_tenant_a?allowPublicKeyRetrieval=true&useSSL=false&autoReconnect=true&characterEncoding=utf8
        username: root
        password: bfXa4Pt2lUUScy8jakXf
      tenant-b:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/test_db_tenant_b?allowPublicKeyRetrieval=true&useSSL=false&autoReconnect=true&characterEncoding=utf8
        username: root
        password: bfXa4Pt2lUUScy8jakXf
    sharding:
      default-database-strategy:
        # way 1: standard strategy
        standard:
          precise-algorithm-class-name: tech.pdai.springboot.shardingjdbc.jpa.tenant.db.config.MyPreciseShardingDBAlgorithm
          sharding-column: tenant
        # way 2: inline strategy
#        inline:
#          sharding-column: tenant
#          algorithm-expression: tenant-$->{tenant}
      tables:
        tb_user:
          actual-data-nodes: tenant-${['a','b']}.tb_user
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
        tb_role:
          actual-data-nodes: tenant-${['a','b']}.tb_role
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
        tb_user_role:
          actual-data-nodes: tenant-${['a','b']}.tb_user_role
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
      binding-tables: tb_user,tb_role,tb_user_role
    props:
      sql:
        show: true
  jpa:
    open-in-view: false
    generate-ddl: false
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
        format_sql: true
        use-new-id-generator-mappings: false
```

### 3.2 上述两种策略存在什么问题？

> 上面两种策略存在什么问题呢？

- **侵入性**： DB层和代码层

上述两种模式需要增加一个新的字段tenant, 并且根据这个字段来对不同租户进行sharding（db级别或者table级别）； 这时候你会发现所有的查询必须要有tenant这个字段，这意味着所有的方法都支持tenant查询。一旦没有全部支持，你会看到Actual SQL会执行多次（每个DB一次）：

```bash
2022-04-08 21:03:33.890  INFO 8256 --- [nio-8080-exec-2] ShardingSphere-SQL                       : Actual SQL: tenant-b ::: select roles0_.user_id as user_id1_2_0_, roles0_.role_id as role_id2_2_0_, role1_.id as id1_0_1_, role1_.create_time as create_t2_0_1_, role1_.description as descript3_0_1_, role1_.name as name4_0_1_, role1_.role_key as role_key5_0_1_, role1_.tenant as tenant6_0_1_, role1_.update_time as update_t7_0_1_ from tb_user_role roles0_ inner join tb_role role1_ on roles0_.role_id=role1_.id where roles0_.user_id=? ::: [719173465277968384]
2022-04-08 21:03:33.890  INFO 8256 --- [nio-8080-exec-2] ShardingSphere-SQL                       : Actual SQL: tenant-a ::: select roles0_.user_id as user_id1_2_0_, roles0_.role_id as role_id2_2_0_, role1_.id as id1_0_1_, role1_.create_time as create_t2_0_1_, role1_.description as descript3_0_1_, role1_.name as name4_0_1_, role1_.role_key as role_key5_0_1_, role1_.tenant as tenant6_0_1_, role1_.update_time as update_t7_0_1_ from tb_user_role roles0_ inner join tb_role role1_ on roles0_.role_id=role1_.id where roles0_.user_id=? ::: [719173465277968384]

```

- **租户之外的数据**

比如系统级别的管理人员数据，元数据等，需要独立一个DB； 虽然可以通过一些配置来解决一些场景，但是上述两种方式的动态性不够（场景变动意味着推翻这两种模式）。

### 3.3 如何使用Hint强制路由方式？

> 针对侵入性的问题，就多租户的场景下而言，可以通过Hint强制路由策略解决。

首先我们需要定义个拦截的APO切面, 对数据操作层进行拦截。通过hintManager设置ShardingValue, 实际环境将client信息放在xxxContext中（由ThreadLocal承接），并通过client-id来获取tenant。

```java
package tech.pdai.springboot.shardingjdbc.jpa.tenant.dbhint.config;

import org.apache.shardingsphere.api.hint.HintManager;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * @author pdai
 */
@Aspect
@Order(1)
@Component
public class TenantDatasourceAspect {

    /**
     * point cut.
     */
    @Pointcut("execution(* tech.pdai.springboot.shardingjdbc.jpa.tenant.dbhint.dao.*.*(..))")
    public void useTenantDSPointCut() {
        // no impl
    }

    @Before("useTenantDSPointCut()")
    public void doDs0Before() {
        HintManager.clear();
        HintManager hintManager = HintManager.getInstance();
        // pdai: 实际环境将client信息放在xxxContext中（由ThreadLocal承接），并通过client-id来获取tenant.
        // 这里为了方便演示，只是使用了tenant-a
        hintManager.setDatabaseShardingValue("tenant-a");
    }

    @After("useTenantDSPointCut()")
    public void doDs0after() {
        HintManager.clear();
    }

}
```

然后自定义HintShardingAlgorithm实现类

```java
package tech.pdai.springboot.shardingjdbc.jpa.tenant.dbhint.config;

import java.util.Collection;
import java.util.stream.Collectors;

import org.apache.shardingsphere.api.sharding.hint.HintShardingAlgorithm;
import org.apache.shardingsphere.api.sharding.hint.HintShardingValue;

/**
 * @author pdai
 */
public class MyHintShardingDBAlgorithm implements HintShardingAlgorithm<String> {

    /**
     * Sharding.
     *
     * <p>sharding value injected by hint, not in SQL.</p>
     *
     * @param availableTargetNames available data sources or tables's names
     * @param shardingValue        sharding value
     * @return sharding result for data sources or tables's names
     */
    @Override
    public Collection<String> doSharding(Collection<String> availableTargetNames, HintShardingValue<String> shardingValue) {
        return shardingValue.getValues().stream().filter(availableTargetNames::contains).collect(Collectors.toList());
    }
}
```

在配置中配置sharding.default-database-strategy为inline

```yml
spring:
  shardingsphere:
    datasource:
      names: tenant-a,tenant-b
      tenant-a:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/test_db_tenant_a?allowPublicKeyRetrieval=true&useSSL=false&autoReconnect=true&characterEncoding=utf8
        username: root
        password: bfXa4Pt2lUUScy8jakXf
      tenant-b:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/test_db_tenant_b?allowPublicKeyRetrieval=true&useSSL=false&autoReconnect=true&characterEncoding=utf8
        username: root
        password: bfXa4Pt2lUUScy8jakXf
    sharding:
      default-database-strategy:
        hint:
          algorithm-class-name: tech.pdai.springboot.shardingjdbc.jpa.tenant.dbhint.config.MyHintShardingDBAlgorithm
      tables:
        tb_user:
          actual-data-nodes: tenant-${['a','b']}.tb_user
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
        tb_role:
          actual-data-nodes: tenant-${['a','b']}.tb_role
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
        tb_user_role:
          actual-data-nodes: tenant-${['a','b']}.tb_user_role
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
      binding-tables: tb_user,tb_role,tb_user_role
    props:
      sql:
        show: true
  jpa:
    open-in-view: false
    generate-ddl: false
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
        format_sql: true
        use-new-id-generator-mappings: false
```

访问页面：

http://localhost:8080/doc.html

插入数据，会进入hint策略对应的算法

![image-20220717212104640](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717212104640.png)

成功插入数据（因为我们上面hintManager中是tenant-a)

![image-20220717212128817](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717212128817.png)

DB 中对应schema中的数据

![image-20220717212149832](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717212149832.png)

查询数据

![image-20220717212211601](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717212211601.png)


执行console log

```bash
2022-04-08 21:38:49.473  INFO 13136 --- [nio-8080-exec-1] ShardingSphere-SQL                       : Logic SQL: insert into tb_user (create_time, description, email, password, phone_number, update_time, user_name) values (?, ?, ?, ?, ?, ?, ?)
2022-04-08 21:38:49.473  INFO 13136 --- [nio-8080-exec-1] ShardingSphere-SQL                       : SQLStatement: InsertStatementContext(super=CommonSQLStatementContext(sqlStatement=org.apache.shardingsphere.sql.parser.sql.statement.dml.InsertStatement@3f8ce2d6, tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@7845fc58), tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@7845fc58, columnNames=[create_time, description, email, password, phone_number, update_time, user_name], insertValueContexts=[InsertValueContext(parametersCount=7, valueExpressions=[ParameterMarkerExpressionSegment(startIndex=110, stopIndex=110, parameterMarkerIndex=0), ParameterMarkerExpressionSegment(startIndex=113, stopIndex=113, parameterMarkerIndex=1), ParameterMarkerExpressionSegment(startIndex=116, stopIndex=116, parameterMarkerIndex=2), ParameterMarkerExpressionSegment(startIndex=119, stopIndex=119, parameterMarkerIndex=3), ParameterMarkerExpressionSegment(startIndex=122, stopIndex=122, parameterMarkerIndex=4), ParameterMarkerExpressionSegment(startIndex=125, stopIndex=125, parameterMarkerIndex=5), ParameterMarkerExpressionSegment(startIndex=128, stopIndex=128, parameterMarkerIndex=6), DerivedParameterMarkerExpressionSegment(super=ParameterMarkerExpressionSegment(startIndex=0, stopIndex=0, parameterMarkerIndex=7))], parameters=[2022-04-08 21:37:45.061, pdai-hint-a, pdai2@pdai.tech, dad23i-hint-a, 0, 2022-04-08 21:37:45.061, pdai23i-hint-a])], generatedKeyContext=Optional[GeneratedKeyContext(columnName=id, generated=true, generatedValues=[719183321087062016])])
2022-04-08 21:38:49.473  INFO 13136 --- [nio-8080-exec-1] ShardingSphere-SQL                       : Actual SQL: tenant-a ::: insert into tb_user (create_time, description, email, password, phone_number, update_time, user_name, id) values (?, ?, ?, ?, ?, ?, ?, ?) ::: [2022-04-08 21:37:45.061, pdai-hint-a, pdai2@pdai.tech, dad23i-hint-a, 0, 2022-04-08 21:37:45.061, pdai23i-hint-a, 719183321087062016]
2022-04-08 21:38:53.287  INFO 13136 --- [nio-8080-exec-1] ShardingSphere-SQL                       : Logic SQL: select user0_.id as id1_1_0_, user0_.create_time as create_t2_1_0_, user0_.description as descript3_1_0_, user0_.email as email4_1_0_, user0_.password as password5_1_0_, user0_.phone_number as phone_nu6_1_0_, user0_.update_time as update_t7_1_0_, user0_.user_name as user_nam8_1_0_, roles1_.user_id as user_id1_2_1_, role2_.id as role_id2_2_1_, role2_.id as id1_0_2_, role2_.create_time as create_t2_0_2_, role2_.description as descript3_0_2_, role2_.name as name4_0_2_, role2_.role_key as role_key5_0_2_, role2_.update_time as update_t6_0_2_ from tb_user user0_ left outer join tb_user_role roles1_ on user0_.id=roles1_.user_id left outer join tb_role role2_ on roles1_.role_id=role2_.id where user0_.id=?
2022-04-08 21:38:53.287  INFO 13136 --- [nio-8080-exec-1] ShardingSphere-SQL                       : SQLStatement: SelectStatementContext(super=CommonSQLStatementContext(sqlStatement=org.apache.shardingsphere.sql.parser.sql.statement.dml.SelectStatement@602d359e, tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@3bf8fb09), tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@3bf8fb09, projectionsContext=ProjectionsContext(startIndex=7, stopIndex=541, distinctRow=false, projections=[ColumnProjection(owner=user0_, name=id, alias=Optional[id1_1_0_]), ColumnProjection(owner=user0_, name=create_time, alias=Optional[create_t2_1_0_]), ColumnProjection(owner=user0_, name=description, alias=Optional[descript3_1_0_]), ColumnProjection(owner=user0_, name=email, alias=Optional[email4_1_0_]), ColumnProjection(owner=user0_, name=password, alias=Optional[password5_1_0_]), ColumnProjection(owner=user0_, name=phone_number, alias=Optional[phone_nu6_1_0_]), ColumnProjection(owner=user0_, name=update_time, alias=Optional[update_t7_1_0_]), ColumnProjection(owner=user0_, name=user_name, alias=Optional[user_nam8_1_0_]), ColumnProjection(owner=roles1_, name=user_id, alias=Optional[user_id1_2_1_]), ColumnProjection(owner=role2_, name=id, alias=Optional[role_id2_2_1_]), ColumnProjection(owner=role2_, name=id, alias=Optional[id1_0_2_]), ColumnProjection(owner=role2_, name=create_time, alias=Optional[create_t2_0_2_]), ColumnProjection(owner=role2_, name=description, alias=Optional[descript3_0_2_]), ColumnProjection(owner=role2_, name=name, alias=Optional[name4_0_2_]), ColumnProjection(owner=role2_, name=role_key, alias=Optional[role_key5_0_2_]), ColumnProjection(owner=role2_, name=update_time, alias=Optional[update_t6_0_2_])]), groupByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.groupby.GroupByContext@17cddd9a, orderByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.orderby.OrderByContext@43769c72, paginationContext=org.apache.shardingsphere.sql.parser.binder.segment.select.pagination.PaginationContext@4afed047, containsSubquery=false)
2022-04-08 21:38:53.287  INFO 13136 --- [nio-8080-exec-1] ShardingSphere-SQL                       : Actual SQL: tenant-a ::: select user0_.id as id1_1_0_, user0_.create_time as create_t2_1_0_, user0_.description as descript3_1_0_, user0_.email as email4_1_0_, user0_.password as password5_1_0_, user0_.phone_number as phone_nu6_1_0_, user0_.update_time as update_t7_1_0_, user0_.user_name as user_nam8_1_0_, roles1_.user_id as user_id1_2_1_, role2_.id as role_id2_2_1_, role2_.id as id1_0_2_, role2_.create_time as create_t2_0_2_, role2_.description as descript3_0_2_, role2_.name as name4_0_2_, role2_.role_key as role_key5_0_2_, role2_.update_time as update_t6_0_2_ from tb_user user0_ left outer join tb_user_role roles1_ on user0_.id=roles1_.user_id left outer join tb_role role2_ on roles1_.role_id=role2_.id where user0_.id=? ::: [719183321087062016]
2022-04-08 21:39:26.996  INFO 13136 --- [nio-8080-exec-2] ShardingSphere-SQL                       : Logic SQL: select user0_.id as id1_1_, user0_.create_time as create_t2_1_, user0_.description as descript3_1_, user0_.email as email4_1_, user0_.password as password5_1_, user0_.phone_number as phone_nu6_1_, user0_.update_time as update_t7_1_, user0_.user_name as user_nam8_1_ from tb_user user0_ where 1=1 limit ?
2022-04-08 21:39:26.997  INFO 13136 --- [nio-8080-exec-2] ShardingSphere-SQL                       : SQLStatement: SelectStatementContext(super=CommonSQLStatementContext(sqlStatement=org.apache.shardingsphere.sql.parser.sql.statement.dml.SelectStatement@2dbe7c04, tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@7ce6951d), tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@7ce6951d, projectionsContext=ProjectionsContext(startIndex=7, stopIndex=264, distinctRow=false, projections=[ColumnProjection(owner=user0_, name=id, alias=Optional[id1_1_]), ColumnProjection(owner=user0_, name=create_time, alias=Optional[create_t2_1_]), ColumnProjection(owner=user0_, name=description, alias=Optional[descript3_1_]), ColumnProjection(owner=user0_, name=email, alias=Optional[email4_1_]), ColumnProjection(owner=user0_, name=password, alias=Optional[password5_1_]), ColumnProjection(owner=user0_, name=phone_number, alias=Optional[phone_nu6_1_]), ColumnProjection(owner=user0_, name=update_time, alias=Optional[update_t7_1_]), ColumnProjection(owner=user0_, name=user_name, alias=Optional[user_nam8_1_])]), groupByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.groupby.GroupByContext@77b55ac4, orderByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.orderby.OrderByContext@765e7ff9, paginationContext=org.apache.shardingsphere.sql.parser.binder.segment.select.pagination.PaginationContext@28de736a, containsSubquery=false)
2022-04-08 21:39:26.997  INFO 13136 --- [nio-8080-exec-2] ShardingSphere-SQL                       : Actual SQL: tenant-a ::: select user0_.id as id1_1_, user0_.create_time as create_t2_1_, user0_.description as descript3_1_, user0_.email as email4_1_, user0_.password as password5_1_, user0_.phone_number as phone_nu6_1_, user0_.update_time as update_t7_1_, user0_.user_name as user_nam8_1_ from tb_user user0_ where 1=1 limit ? ::: [10]
2022-04-08 21:39:27.004  INFO 13136 --- [nio-8080-exec-2] ShardingSphere-SQL                       : Logic SQL: select roles0_.user_id as user_id1_2_0_, roles0_.role_id as role_id2_2_0_, role1_.id as id1_0_1_, role1_.create_time as create_t2_0_1_, role1_.description as descript3_0_1_, role1_.name as name4_0_1_, role1_.role_key as role_key5_0_1_, role1_.update_time as update_t6_0_1_ from tb_user_role roles0_ inner join tb_role role1_ on roles0_.role_id=role1_.id where roles0_.user_id=?
2022-04-08 21:39:27.005  INFO 13136 --- [nio-8080-exec-2] ShardingSphere-SQL                       : SQLStatement: SelectStatementContext(super=CommonSQLStatementContext(sqlStatement=org.apache.shardingsphere.sql.parser.sql.statement.dml.SelectStatement@17b5967d, tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@7ac1dcb9), tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@7ac1dcb9, projectionsContext=ProjectionsContext(startIndex=7, stopIndex=271, distinctRow=false, projections=[ColumnProjection(owner=roles0_, name=user_id, alias=Optional[user_id1_2_0_]), ColumnProjection(owner=roles0_, name=role_id, alias=Optional[role_id2_2_0_]), ColumnProjection(owner=role1_, name=id, alias=Optional[id1_0_1_]), ColumnProjection(owner=role1_, name=create_time, alias=Optional[create_t2_0_1_]), ColumnProjection(owner=role1_, name=description, alias=Optional[descript3_0_1_]), ColumnProjection(owner=role1_, name=name, alias=Optional[name4_0_1_]), ColumnProjection(owner=role1_, name=role_key, alias=Optional[role_key5_0_1_]), ColumnProjection(owner=role1_, name=update_time, alias=Optional[update_t6_0_1_])]), groupByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.groupby.GroupByContext@68d9e73a, orderByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.orderby.OrderByContext@6331421f, paginationContext=org.apache.shardingsphere.sql.parser.binder.segment.select.pagination.PaginationContext@580c367a, containsSubquery=false)
2022-04-08 21:39:27.005  INFO 13136 --- [nio-8080-exec-2] ShardingSphere-SQL                       : Actual SQL: tenant-a ::: select roles0_.user_id as user_id1_2_0_, roles0_.role_id as role_id2_2_0_, role1_.id as id1_0_1_, role1_.create_time as create_t2_0_1_, role1_.description as descript3_0_1_, role1_.name as name4_0_1_, role1_.role_key as role_key5_0_1_, role1_.update_time as update_t6_0_1_ from tb_user_role roles0_ inner join tb_role role1_ on roles0_.role_id=role1_.id where roles0_.user_id=? ::: [719183321087062016]
2022-04-08 21:40:28.220  INFO 13136 --- [nio-8080-exec-4] ShardingSphere-SQL                       : Logic SQL: select user0_.id as id1_1_, user0_.create_time as create_t2_1_, user0_.description as descript3_1_, user0_.email as email4_1_, user0_.password as password5_1_, user0_.phone_number as phone_nu6_1_, user0_.update_time as update_t7_1_, user0_.user_name as user_nam8_1_ from tb_user user0_ where 1=1 limit ?
2022-04-08 21:40:28.220  INFO 13136 --- [nio-8080-exec-4] ShardingSphere-SQL                       : SQLStatement: SelectStatementContext(super=CommonSQLStatementContext(sqlStatement=org.apache.shardingsphere.sql.parser.sql.statement.dml.SelectStatement@2dbe7c04, tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@5c74176f), tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@5c74176f, projectionsContext=ProjectionsContext(startIndex=7, stopIndex=264, distinctRow=false, projections=[ColumnProjection(owner=user0_, name=id, alias=Optional[id1_1_]), ColumnProjection(owner=user0_, name=create_time, alias=Optional[create_t2_1_]), ColumnProjection(owner=user0_, name=description, alias=Optional[descript3_1_]), ColumnProjection(owner=user0_, name=email, alias=Optional[email4_1_]), ColumnProjection(owner=user0_, name=password, alias=Optional[password5_1_]), ColumnProjection(owner=user0_, name=phone_number, alias=Optional[phone_nu6_1_]), ColumnProjection(owner=user0_, name=update_time, alias=Optional[update_t7_1_]), ColumnProjection(owner=user0_, name=user_name, alias=Optional[user_nam8_1_])]), groupByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.groupby.GroupByContext@19769285, orderByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.orderby.OrderByContext@2caf7930, paginationContext=org.apache.shardingsphere.sql.parser.binder.segment.select.pagination.PaginationContext@28258a73, containsSubquery=false)
2022-04-08 21:40:28.220  INFO 13136 --- [nio-8080-exec-4] ShardingSphere-SQL                       : Actual SQL: tenant-a ::: select user0_.id as id1_1_, user0_.create_time as create_t2_1_, user0_.description as descript3_1_, user0_.email as email4_1_, user0_.password as password5_1_, user0_.phone_number as phone_nu6_1_, user0_.update_time as update_t7_1_, user0_.user_name as user_nam8_1_ from tb_user user0_ where 1=1 limit ? ::: [10]
2022-04-08 21:40:28.221  INFO 13136 --- [nio-8080-exec-4] ShardingSphere-SQL                       : Logic SQL: select roles0_.user_id as user_id1_2_0_, roles0_.role_id as role_id2_2_0_, role1_.id as id1_0_1_, role1_.create_time as create_t2_0_1_, role1_.description as descript3_0_1_, role1_.name as name4_0_1_, role1_.role_key as role_key5_0_1_, role1_.update_time as update_t6_0_1_ from tb_user_role roles0_ inner join tb_role role1_ on roles0_.role_id=role1_.id where roles0_.user_id=?
2022-04-08 21:40:28.221  INFO 13136 --- [nio-8080-exec-4] ShardingSphere-SQL                       : SQLStatement: SelectStatementContext(super=CommonSQLStatementContext(sqlStatement=org.apache.shardingsphere.sql.parser.sql.statement.dml.SelectStatement@17b5967d, tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@14ffd315), tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@14ffd315, projectionsContext=ProjectionsContext(startIndex=7, stopIndex=271, distinctRow=false, projections=[ColumnProjection(owner=roles0_, name=user_id, alias=Optional[user_id1_2_0_]), ColumnProjection(owner=roles0_, name=role_id, alias=Optional[role_id2_2_0_]), ColumnProjection(owner=role1_, name=id, alias=Optional[id1_0_1_]), ColumnProjection(owner=role1_, name=create_time, alias=Optional[create_t2_0_1_]), ColumnProjection(owner=role1_, name=description, alias=Optional[descript3_0_1_]), ColumnProjection(owner=role1_, name=name, alias=Optional[name4_0_1_]), ColumnProjection(owner=role1_, name=role_key, alias=Optional[role_key5_0_1_]), ColumnProjection(owner=role1_, name=update_time, alias=Optional[update_t6_0_1_])]), groupByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.groupby.GroupByContext@6aff8332, orderByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.orderby.OrderByContext@32acce81, paginationContext=org.apache.shardingsphere.sql.parser.binder.segment.select.pagination.PaginationContext@70f82e86, containsSubquery=false)
2022-04-08 21:40:28.221  INFO 13136 --- [nio-8080-exec-4] ShardingSphere-SQL                       : Actual SQL: tenant-a ::: select roles0_.user_id as user_id1_2_0_, roles0_.role_id as role_id2_2_0_, role1_.id as id1_0_1_, role1_.create_time as create_t2_0_1_, role1_.description as descript3_0_1_, role1_.name as name4_0_1_, role1_.role_key as role_key5_0_1_, role1_.update_time as update_t6_0_1_ from tb_user_role roles0_ inner join tb_role role1_ on roles0_.role_id=role1_.id where roles0_.user_id=? ::: [719183321087062016]
```

## 参考文章

[**SpringBoot集成ShardingJDBC - 基于JPA的DB隔离多租户方案**](https://pdai.tech/md/spring/springboot/springboot-x-mysql-shardingjdbc-jpa-tenant-db.html)