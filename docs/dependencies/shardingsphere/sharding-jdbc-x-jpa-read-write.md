# SpringBoot集成ShardingJDBC-基于JPA的读写分离

>本文主要介绍分表分库，以及SpringBoot集成基于ShardingJDBC的读写分离实践。

## 1. 知识准备

> 主要理解ShardingJDBC针对读写分离库的场景和设计目标等。

### 1.1 读写分离库的场景和设计目标？

> 透明化读写分离所带来的影响，**让使用方尽量像使用一个数据库一样使用主从数据库集群**，是ShardingSphere读写分离模块的主要设计目标。

面对日益增加的系统访问量，数据库的吞吐量面临着巨大瓶颈。 对于同一时刻有大量并发读操作和较少写操作类型的应用系统来说，将数据库拆分为主库和从库，**主库负责处理事务性的增删改操作，从库负责处理查询操作**，能够有效的避免由数据更新导致的行锁，使得整个系统的查询性能得到极大的改善。

通过一主多从的配置方式，可以将查询请求均匀的分散到多个数据副本，能够进一步的提升系统的处理能力。 使用多主多从的方式，不但能够提升系统的吞吐量，还能够提升系统的可用性，可以达到在任何一个数据库宕机，甚至磁盘物理损坏的情况下仍然不影响系统的正常运行。

与将数据根据分片键打散至各个数据节点的水平分片不同，读写分离则是根据SQL语义的分析，将读操作和写操作分别路由至主库与从库。

![image-20220717202842879](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717202842879.png)

读写分离的数据节点中的数据内容是一致的，而水平分片的每个数据节点的数据内容却并不相同。将水平分片和读写分离联合使用，能够更加有效的提升系统性能。

读写分离虽然可以提升系统的吞吐量和可用性，但同时也带来了数据不一致的问题。 这包括多个主库之间的数据一致性，以及主库与从库之间的数据一致性的问题。 并且，读写分离也带来了与数据分片同样的问题，它同样会使得应用开发和运维人员对数据库的操作和运维变得更加复杂。 下图展现了将分库分表与读写分离一同使用时，应用程序与数据库集群之间的复杂拓扑关系。

![image-20220717203003516](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717203003516.png)

### 1.2 核心功能

- 提供一主多从的读写分离配置，可独立使用，也可配合分库分表使用。
- 独立使用读写分离支持SQL透传。
- 同一线程且同一数据库连接内，如有写入操作，以后的读操作均从主库读取，用于保证数据一致性。
- 基于Hint的强制主库路由。

## 2. 简单示例

> 这里主要介绍SpringBoot集成基于ShardingJDBC的读写分离和数据分片实践，主要承接之前的相关文章在JPA方式的基础上实现的。

### 2.1 准备DB和依赖配置

创建MySQL的schema test_db_sharding_master 和 test_db_sharding_slave, 导入SQL 文件如下

test_db_sharding_master

```sql
-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: test_db_sharding_master
-- ------------------------------------------------------
-- Server version	8.0.22

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
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `role_key` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
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
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (2,'pdai2','aaa','pdai@pdai.tech',123133332,'pdai2','2022-04-06 20:44:34','2022-04-06 20:44:34');
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_role`
--

DROP TABLE IF EXISTS `tb_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user_role` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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

-- Dump completed on 2022-04-06 21:08:09
```

test_db_sharding_slave

```sql
-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: test_db_sharding_slave0
-- ------------------------------------------------------
-- Server version	8.0.22

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
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `role_key` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
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
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (2,'pdai-salve','xxx','xx',12111,'pdai','2022-04-06 20:44:34','2022-04-06 20:44:34');
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_role`
--

DROP TABLE IF EXISTS `tb_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user_role` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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

-- Dump completed on 2022-04-06 21:08:28

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
      names: master,slave0
      master:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/test_db_sharding_master?allowPublicKeyRetrieval=true&useSSL=false&autoReconnect=true&characterEncoding=utf8
        username: root
        password: bfXa4Pt2lUUScy8jakXf
      slave0:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/test_db_sharding_slave0?allowPublicKeyRetrieval=true&useSSL=false&autoReconnect=true&characterEncoding=utf8
        username: root
        password: bfXa4Pt2lUUScy8jakXf
    sharding:
      tables:
        tb_user:
          database-strategy:
            inline:
              sharding-column: id
              algorithm-expression: master
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
        tb_role:
          database-strategy:
            inline:
              sharding-column: id
              algorithm-expression: master
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
        tb_user_role:
          database-strategy:
            inline:
              sharding-column: id
              algorithm-expression: master
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
    master-slave:
        name: ms
        load-balance-algorithm-type: round_robin
        master-data-source-name: master
        slave-data-source-names: slave0
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
package tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity;

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

/**
 * @author pdai
 */
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
package tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

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

}
```

### 2.3 DAO

user dao

```java
package tech.pdai.springboot.shardingjdbc.jpa.masterslave.dao;

import org.springframework.stereotype.Repository;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity.User;

/**
 * @author pdai
 */
@Repository
public interface IUserDao extends IBaseDao<User, Long> {

}
```

role dao

```java
package tech.pdai.springboot.shardingjdbc.jpa.masterslave.dao;

import org.springframework.stereotype.Repository;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity.Role;

/**
 * @author pdai
 */
@Repository
public interface IRoleDao extends IBaseDao<Role, Long> {

}
```

### 2.4 Service

user service 接口

```java
package tech.pdai.springboot.shardingjdbc.jpa.masterslave.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity.User;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity.query.UserQueryBean;

/**
 * @author pdai
 */
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
package tech.pdai.springboot.shardingjdbc.jpa.masterslave.service.impl;


import com.github.wenhao.jpa.Specifications;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.dao.IBaseDao;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.dao.IUserDao;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity.User;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity.query.UserQueryBean;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.service.IUserService;

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
package tech.pdai.springboot.shardingjdbc.jpa.masterslave.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity.Role;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity.query.RoleQueryBean;

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
package tech.pdai.springboot.shardingjdbc.jpa.masterslave.service.impl;

import com.github.wenhao.jpa.Specifications;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.dao.IBaseDao;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.dao.IRoleDao;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity.Role;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity.query.RoleQueryBean;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.service.IRoleService;

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
package tech.pdai.springboot.shardingjdbc.jpa.masterslave.controller;


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
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity.User;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity.query.UserQueryBean;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.entity.response.ResponseResult;
import tech.pdai.springboot.shardingjdbc.jpa.masterslave.service.IUserService;

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
    public ResponseResult<Page<User>> list(@RequestParam int pageSize, @RequestParam int pageNumber) {
        return ResponseResult.success(userService.findPage(UserQueryBean.builder().build(), PageRequest.of(pageNumber, pageSize)));
    }
}
```

### 2.6 简单测试

访问页面：

http://localhost:8080/doc.html

**插入数据，写入master库**

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717203819735.png" alt="image-20220717203819735" />

(注意：主库和从库的数据同步不是shardingJDBC做的，需要自行同步)

![image-20220717203844042](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717203844042.png)

**查询数据，从slave中查询**

slave db中的数据

![image-20220717203904680](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717203904680.png)

查询结果

![image-20220717203922565](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717203922565.png)

相关查询console打印出的日志：

```bash
// pdai: 如下是插入
2022-04-06 20:44:11.045  INFO 26013 --- [nio-8080-exec-4] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
2022-04-06 20:44:34.127  INFO 26013 --- [nio-8080-exec-8] ShardingSphere-SQL                       : Logic SQL: insert into tb_user (create_time, description, email, password, phone_number, update_time, user_name) values (?, ?, ?, ?, ?, ?, ?)
2022-04-06 20:44:34.127  INFO 26013 --- [nio-8080-exec-8] ShardingSphere-SQL                       : SQLStatement: CommonSQLStatementContext(sqlStatement=org.apache.shardingsphere.sql.parser.sql.statement.dml.InsertStatement@5a160db9, tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@4070419f)
2022-04-06 20:44:34.128  INFO 26013 --- [nio-8080-exec-8] ShardingSphere-SQL                       : Actual SQL: master ::: insert into tb_user (create_time, description, email, password, phone_number, update_time, user_name) values (?, ?, ?, ?, ?, ?, ?)
2022-04-06 20:44:34.184  INFO 26013 --- [nio-8080-exec-8] ShardingSphere-SQL                       : Logic SQL: select user0_.id as id1_1_0_, user0_.create_time as create_t2_1_0_, user0_.description as descript3_1_0_, user0_.email as email4_1_0_, user0_.password as password5_1_0_, user0_.phone_number as phone_nu6_1_0_, user0_.update_time as update_t7_1_0_, user0_.user_name as user_nam8_1_0_, roles1_.user_id as user_id1_2_1_, role2_.id as role_id2_2_1_, role2_.id as id1_0_2_, role2_.create_time as create_t2_0_2_, role2_.description as descript3_0_2_, role2_.name as name4_0_2_, role2_.role_key as role_key5_0_2_, role2_.update_time as update_t6_0_2_ from tb_user user0_ left outer join tb_user_role roles1_ on user0_.id=roles1_.user_id left outer join tb_role role2_ on roles1_.role_id=role2_.id where user0_.id=?
2022-04-06 20:44:34.184  INFO 26013 --- [nio-8080-exec-8] ShardingSphere-SQL                       : SQLStatement: SelectStatementContext(super=CommonSQLStatementContext(sqlStatement=org.apache.shardingsphere.sql.parser.sql.statement.dml.SelectStatement@1089fea0, tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@60fc819), tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@60fc819, projectionsContext=ProjectionsContext(startIndex=7, stopIndex=541, distinctRow=false, projections=[ColumnProjection(owner=user0_, name=id, alias=Optional[id1_1_0_]), ColumnProjection(owner=user0_, name=create_time, alias=Optional[create_t2_1_0_]), ColumnProjection(owner=user0_, name=description, alias=Optional[descript3_1_0_]), ColumnProjection(owner=user0_, name=email, alias=Optional[email4_1_0_]), ColumnProjection(owner=user0_, name=password, alias=Optional[password5_1_0_]), ColumnProjection(owner=user0_, name=phone_number, alias=Optional[phone_nu6_1_0_]), ColumnProjection(owner=user0_, name=update_time, alias=Optional[update_t7_1_0_]), ColumnProjection(owner=user0_, name=user_name, alias=Optional[user_nam8_1_0_]), ColumnProjection(owner=roles1_, name=user_id, alias=Optional[user_id1_2_1_]), ColumnProjection(owner=role2_, name=id, alias=Optional[role_id2_2_1_]), ColumnProjection(owner=role2_, name=id, alias=Optional[id1_0_2_]), ColumnProjection(owner=role2_, name=create_time, alias=Optional[create_t2_0_2_]), ColumnProjection(owner=role2_, name=description, alias=Optional[descript3_0_2_]), ColumnProjection(owner=role2_, name=name, alias=Optional[name4_0_2_]), ColumnProjection(owner=role2_, name=role_key, alias=Optional[role_key5_0_2_]), ColumnProjection(owner=role2_, name=update_time, alias=Optional[update_t6_0_2_])]), groupByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.groupby.GroupByContext@456da89f, orderByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.orderby.OrderByContext@4f139aa4, paginationContext=org.apache.shardingsphere.sql.parser.binder.segment.select.pagination.PaginationContext@10b01118, containsSubquery=false)
2022-04-06 20:44:34.184  INFO 26013 --- [nio-8080-exec-8] ShardingSphere-SQL                       : Actual SQL: slave0 ::: select user0_.id as id1_1_0_, user0_.create_time as create_t2_1_0_, user0_.description as descript3_1_0_, user0_.email as email4_1_0_, user0_.password as password5_1_0_, user0_.phone_number as phone_nu6_1_0_, user0_.update_time as update_t7_1_0_, user0_.user_name as user_nam8_1_0_, roles1_.user_id as user_id1_2_1_, role2_.id as role_id2_2_1_, role2_.id as id1_0_2_, role2_.create_time as create_t2_0_2_, role2_.description as descript3_0_2_, role2_.name as name4_0_2_, role2_.role_key as role_key5_0_2_, role2_.update_time as update_t6_0_2_ from tb_user user0_ left outer join tb_user_role roles1_ on user0_.id=roles1_.user_id left outer join tb_role role2_ on roles1_.role_id=role2_.id where user0_.id=?

// pdai: 如下是查询
2022-04-06 20:58:50.220  INFO 26013 --- [nio-8080-exec-5] ShardingSphere-SQL                       : Logic SQL: select user0_.id as id1_1_0_, user0_.create_time as create_t2_1_0_, user0_.description as descript3_1_0_, user0_.email as email4_1_0_, user0_.password as password5_1_0_, user0_.phone_number as phone_nu6_1_0_, user0_.update_time as update_t7_1_0_, user0_.user_name as user_nam8_1_0_, roles1_.user_id as user_id1_2_1_, role2_.id as role_id2_2_1_, role2_.id as id1_0_2_, role2_.create_time as create_t2_0_2_, role2_.description as descript3_0_2_, role2_.name as name4_0_2_, role2_.role_key as role_key5_0_2_, role2_.update_time as update_t6_0_2_ from tb_user user0_ left outer join tb_user_role roles1_ on user0_.id=roles1_.user_id left outer join tb_role role2_ on roles1_.role_id=role2_.id where user0_.id=?
2022-04-06 20:58:50.220  INFO 26013 --- [nio-8080-exec-5] ShardingSphere-SQL                       : SQLStatement: SelectStatementContext(super=CommonSQLStatementContext(sqlStatement=org.apache.shardingsphere.sql.parser.sql.statement.dml.SelectStatement@1089fea0, tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@75ff28f7), tablesContext=org.apache.shardingsphere.sql.parser.binder.segment.table.TablesContext@75ff28f7, projectionsContext=ProjectionsContext(startIndex=7, stopIndex=541, distinctRow=false, projections=[ColumnProjection(owner=user0_, name=id, alias=Optional[id1_1_0_]), ColumnProjection(owner=user0_, name=create_time, alias=Optional[create_t2_1_0_]), ColumnProjection(owner=user0_, name=description, alias=Optional[descript3_1_0_]), ColumnProjection(owner=user0_, name=email, alias=Optional[email4_1_0_]), ColumnProjection(owner=user0_, name=password, alias=Optional[password5_1_0_]), ColumnProjection(owner=user0_, name=phone_number, alias=Optional[phone_nu6_1_0_]), ColumnProjection(owner=user0_, name=update_time, alias=Optional[update_t7_1_0_]), ColumnProjection(owner=user0_, name=user_name, alias=Optional[user_nam8_1_0_]), ColumnProjection(owner=roles1_, name=user_id, alias=Optional[user_id1_2_1_]), ColumnProjection(owner=role2_, name=id, alias=Optional[role_id2_2_1_]), ColumnProjection(owner=role2_, name=id, alias=Optional[id1_0_2_]), ColumnProjection(owner=role2_, name=create_time, alias=Optional[create_t2_0_2_]), ColumnProjection(owner=role2_, name=description, alias=Optional[descript3_0_2_]), ColumnProjection(owner=role2_, name=name, alias=Optional[name4_0_2_]), ColumnProjection(owner=role2_, name=role_key, alias=Optional[role_key5_0_2_]), ColumnProjection(owner=role2_, name=update_time, alias=Optional[update_t6_0_2_])]), groupByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.groupby.GroupByContext@1d491acc, orderByContext=org.apache.shardingsphere.sql.parser.binder.segment.select.orderby.OrderByContext@61fdb66b, paginationContext=org.apache.shardingsphere.sql.parser.binder.segment.select.pagination.PaginationContext@2ee96c65, containsSubquery=false)
2022-04-06 20:58:50.220  INFO 26013 --- [nio-8080-exec-5] ShardingSphere-SQL                       : Actual SQL: slave0 ::: select user0_.id as id1_1_0_, user0_.create_time as create_t2_1_0_, user0_.description as descript3_1_0_, user0_.email as email4_1_0_, user0_.password as password5_1_0_, user0_.phone_number as phone_nu6_1_0_, user0_.update_time as update_t7_1_0_, user0_.user_name as user_nam8_1_0_, roles1_.user_id as user_id1_2_1_, role2_.id as role_id2_2_1_, role2_.id as id1_0_2_, role2_.create_time as create_t2_0_2_, role2_.description as descript3_0_2_, role2_.name as name4_0_2_, role2_.role_key as role_key5_0_2_, role2_.update_time as update_t6_0_2_ from tb_user user0_ left outer join tb_user_role roles1_ on user0_.id=roles1_.user_id left outer join tb_role role2_ on roles1_.role_id=role2_.id where user0_.id=?
```

## 3. 进一步理解

> 通过几个问题进一步理解。

### 3.1 shardingJDBC的主从分离解决不了什么问题？

- 主库和从库的数据同步。
- 主库和从库的数据同步延迟导致的数据不一致。
- 主库双写或多写。

### 3.2 读写分离加数据分片？

可以参考官方给的如下配置：

```yml
dataSources:
  ds0: !!org.apache.commons.dbcp.BasicDataSource
    driverClassName: com.mysql.jdbc.Driver
    url: jdbc:mysql://localhost:3306/ds0
    username: root
    password: 
  ds0_slave0: !!org.apache.commons.dbcp.BasicDataSource
      driverClassName: com.mysql.jdbc.Driver
      url: jdbc:mysql://localhost:3306/ds0_slave0
      username: root
      password: 
  ds0_slave1: !!org.apache.commons.dbcp.BasicDataSource
      driverClassName: com.mysql.jdbc.Driver
      url: jdbc:mysql://localhost:3306/ds0_slave1
      username: root
      password: 
  ds1: !!org.apache.commons.dbcp.BasicDataSource
    driverClassName: com.mysql.jdbc.Driver
    url: jdbc:mysql://localhost:3306/ds1
    username: root
    password: 
  ds1_slave0: !!org.apache.commons.dbcp.BasicDataSource
        driverClassName: com.mysql.jdbc.Driver
        url: jdbc:mysql://localhost:3306/ds1_slave0
        username: root
        password: 
  ds1_slave1: !!org.apache.commons.dbcp.BasicDataSource
        driverClassName: com.mysql.jdbc.Driver
        url: jdbc:mysql://localhost:3306/ds1_slave1
        username: root
        password: 

shardingRule:  
  tables:
    t_order: 
      actualDataNodes: ms_ds${0..1}.t_order${0..1}
      databaseStrategy:
        inline:
          shardingColumn: user_id
          algorithmExpression: ms_ds${user_id % 2}
      tableStrategy: 
        inline:
          shardingColumn: order_id
          algorithmExpression: t_order${order_id % 2}
      keyGenerator:
        type: SNOWFLAKE
        column: order_id
    t_order_item:
      actualDataNodes: ms_ds${0..1}.t_order_item${0..1}
      databaseStrategy:
        inline:
          shardingColumn: user_id
          algorithmExpression: ms_ds${user_id % 2}
      tableStrategy:
        inline:
          shardingColumn: order_id
          algorithmExpression: t_order_item${order_id % 2}  
  bindingTables:
    - t_order,t_order_item
  broadcastTables:
    - t_config
  
  defaultDataSourceName: ds0
  defaultTableStrategy:
    none:
  defaultKeyGenerator:
    type: SNOWFLAKE
    column: order_id
  
  masterSlaveRules:
      ms_ds0:
        masterDataSourceName: ds0
        slaveDataSourceNames:
          - ds0_slave0
          - ds0_slave1
        loadBalanceAlgorithmType: ROUND_ROBIN
      ms_ds1:
        masterDataSourceName: ds1
        slaveDataSourceNames: 
          - ds1_slave0
          - ds1_slave1
        loadBalanceAlgorithmType: ROUND_ROBIN
props:
  sql.show: true
```

!! 表示实例化该类

- 表示可以包含一个或多个

[] 表示数组，可以与减号相互替换使用

## 参考文章

[**SpringBoot集成ShardingJDBC - 基于JPA的读写分离**](https://pdai.tech/md/spring/springboot/springboot-x-mysql-shardingjdbc-jpa-masterslave.html#service)