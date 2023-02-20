# SpringBoot集成ShardingJDBC-Sharding-JDBC简介和基于MyBatis的单库分表

>本文主要介绍分表分库，以及SpringBoot集成基于ShardingJDBC+MyBatis的单库分表实践。

## 1. 知识准备

> 主要理解分表分库，Sharding-JDBC要解决什么问题，Sharding-JDBC及ShardingSphere的关系等。

### 1.1 为什么要分表分库？

[MySQL - 分表分库](https://pdai.tech/md/db/sql-mysql/sql-mysql-devide.html)

### 1.2 什么是Sharding-JDBC？

> 来自ShardingSphere官网

Sharding-JDBC是ShardingSphere的第一个产品，也是ShardingSphere的前身。 它定位为轻量级Java框架，在Java的JDBC层提供的额外服务。它使用客户端直连数据库，以jar包形式提供服务，无需额外部署和依赖，可理解为增强版的JDBC驱动，完全兼容JDBC和各种ORM框架。

- 适用于任何基于Java的ORM框架，如：JPA, Hibernate, Mybatis, Spring JDBC Template或直接使用JDBC。
- 基于任何第三方的数据库连接池，如：DBCP, C3P0, BoneCP, Druid, HikariCP等。
- 支持任意实现JDBC规范的数据库。目前支持MySQL，Oracle，SQLServer和PostgreSQL。

![image-20220717200857244](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717200857244.png)

### 1.3 和ShardingSphere是什么关系？

> 来自ShardingSphere官网

ShardingSphere是一套开源的分布式数据库中间件解决方案组成的生态圈，它由Sharding-JDBC、Sharding-Proxy和Sharding-Sidecar（计划中）这3款相互独立的产品组成。 他们均提供标准化的数据分片、分布式事务和数据库治理功能，可适用于如Java同构、异构语言、容器、云原生等各种多样化的应用场景。

ShardingSphere定位为关系型数据库中间件，旨在充分合理地在分布式的场景下利用关系型数据库的计算和存储能力，而并非实现一个全新的关系型数据库。 它与NoSQL和NewSQL是并存而非互斥的关系。NoSQL和NewSQL作为新技术探索的前沿，放眼未来，拥抱变化，是非常值得推荐的。反之，也可以用另一种思路看待问题，放眼未来，关注不变的东西，进而抓住事物本质。 关系型数据库当今依然占有巨大市场，是各个公司核心业务的基石，未来也难于撼动，我们目前阶段更加关注在原有基础上的增量，而非颠覆。

![image-20220717201030865](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717201030865.png)

对应的版本功能

![image-20220717201046865](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717201046865.png)

## 2. 简单示例

> 这里主要介绍SpringBoot集成基于ShardingJDBC的**单库分表**实践，主要承接之前的相关文章在MyBatis的注解方式的基础上实现的。

### 2.1 准备DB和依赖配置

创建MySQL的schema test_db_sharding, 导入SQL 文件如下

```sql
-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: test_db_sharding
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-05 19:56:52
```

引入maven依赖, 包含mysql驱动，mybatis和pageHelper, 以及sharding-jdbc的依赖。

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.28</version>
</dependency>
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.0</version>
</dependency>
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.2.10</version>
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
      names: ds
      ds:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/test_db_sharding?allowPublicKeyRetrieval=true&useSSL=false&autoReconnect=true&characterEncoding=utf8
        username: test
        password: bfXa4Pt2lUUScy8jakXf
    sharding:
      tables:
        tb_user:
          actual-data-nodes: ds.tb_user_$->{0..1}
          table-strategy:
            inline:
              sharding-column: id
              algorithm-expression: tb_user_$->{id % 2}
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
      binding-tables: tb_user
      broadcast-tables: t_address
mybatis:
  type-aliases-package: tech.pdai.springboot.shardingjdbc.mybatis.tables.entity
  configuration:
    cache-enabled: true
    use-generated-keys: true
    default-executor-type: REUSE
    use-actual-param-name: true
```

### 2.2 DAO

mapper/dao

```java
package tech.pdai.springboot.shardingjdbc.mybatis.tables.dao;

import org.apache.ibatis.annotations.*;
import tech.pdai.springboot.shardingjdbc.mybatis.tables.dao.provider.UserDaoProvider;
import tech.pdai.springboot.shardingjdbc.mybatis.tables.entity.User;
import tech.pdai.springboot.shardingjdbc.mybatis.tables.entity.query.UserQueryBean;

import java.util.List;

@Mapper
public interface IUserDao {

    String SELECT_USER_SQL = "select u.id, u.password, u.user_name, u.email, u.phone_number, u.description, u.create_time, u.update_time from tb_user u";

    @Results(
            id = "UserResult",
            value = {
                    @Result(property = "id", column = "id"),
                    @Result(property = "userName", column = "user_name"),
                    @Result(property = "password", column = "password"),
                    @Result(property = "email", column = "email"),
                    @Result(property = "phoneNumber", column = "phone_number"),
                    @Result(property = "description", column = "description"),
                    @Result(property = "createTime", column = "create_time"),
                    @Result(property = "updateTime", column = "update_time")
            }
    )
    @Select({SELECT_USER_SQL, " where id = #{id}"})
    User findById(@Param("id") Long id);

    @ResultMap("UserResult")
    @Select(SELECT_USER_SQL)
    User findAll();

    @ResultMap("UserResult")
    @Select({"<script> ", SELECT_USER_SQL, " where u.id != 0\n" +
            "\t\t<if test=\"userName != null and userName != ''\">\n" +
            "AND u.user_name like concat('%', #{user_name}, '%')\n" +
            "\t\t</if>\n" +
            "\t\t<if test=\"description != null and description != ''\">\n" +
            "AND u.description like concat('%', #{description}, '%')\n" +
            "\t\t</if>\n" +
            "\t\t<if test=\"phoneNumber != null and phoneNumber != ''\">\n" +
            "AND u.phone_number like concat('%', #{phoneNumber}, '%')\n" +
            "\t\t</if>\n" +
            "\t\t<if test=\"email != null and email != ''\">\n" +
            "AND u.email like concat('%', #{email}, '%')\n" +
            "\t\t</if>", " </script>"})
    List<User> findList(UserQueryBean userQueryBean);

    @Delete("delete from tb_user where id = #{id}")
    int deleteById(Long id);

    @Delete({"<script> ", "delete from tb_user where id in\n" +
            "<foreach collection=\"array\" item=\"id\" open=\"(\" separator=\",\" close=\")\">\n" +
            "#{id}\n" +
            "</foreach>", " </script>"})
    int deleteByIds(Long[] ids);

    @Update({"<script> ", "update tb_user\n" +
            " <set>\n" +
            " <if test=\"userName != null and userName != ''\">user_name = #{userName},</if>\n" +
            " <if test=\"email != null and email != ''\">email = #{email},</if>\n" +
            " <if test=\"phoneNumber != null and phoneNumber != ''\">phone_number = #{phoneNumber},</if>\n" +
            " <if test=\"description != null and description != ''\">description = #{description},</if>\n" +
            " update_time = sysdate()\n" +
            " </set>\n" +
            " where id = #{id}", " </script>"})
    int update(User user);

    @Insert({"<script> ", "insert into tb_user(\n" +
            " <if test=\"userName != null and userName != ''\">user_name,</if>\n" +
            " <if test=\"password != null and password != ''\">password,</if>\n" +
            " <if test=\"email != null and email != ''\">email,</if>\n" +
            " <if test=\"phoneNumber != null and phoneNumber != ''\">phone_number,</if>\n" +
            " <if test=\"description != null and description != ''\">description,</if>\n" +
            " create_time,\n" +
            " update_time\n" +
            " )values(\n" +
            " <if test=\"userName != null and userName != ''\">#{userName},</if>\n" +
            " <if test=\"password != null and password != ''\">#{password},</if>\n" +
            " <if test=\"email != null and email != ''\">#{email},</if>\n" +
            " <if test=\"phoneNumber != null and phoneNumber != ''\">#{phoneNumber},</if>\n" +
            " <if test=\"description != null and description != ''\">#{description},</if>\n" +
            " sysdate(),\n" +
            " sysdate()\n" +
            " )", " </script>"})
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int save(User user);

    @Update({"update tb_user set password = #{password}, update_time = sysdate()", " where id = #{id}"})
    int updatePassword(User user);

    @ResultMap("UserResult")
    @SelectProvider(type = UserDaoProvider.class, method = "findById")
    User findById2(Long id);


}
```

### 2.3 Service

user service 接口

```java
package tech.pdai.springboot.shardingjdbc.mybatis.tables.service;

import tech.pdai.springboot.shardingjdbc.mybatis.tables.entity.User;
import tech.pdai.springboot.shardingjdbc.mybatis.tables.entity.query.UserQueryBean;

import java.util.List;

public interface IUserService {

    List<User> findList(UserQueryBean userQueryBean);

    User findById(Long id);

    int deleteById(Long id);

    int deleteByIds(Long[] ids);

    int update(User user);

    int save(User user);

    int updatePassword(User user);

    User findById2(Long userId);
}
```

service实现类

```java
package tech.pdai.springboot.shardingjdbc.mybatis.tables.service.impl;

import tech.pdai.springboot.shardingjdbc.mybatis.tables.dao.IUserDao;
import tech.pdai.springboot.shardingjdbc.mybatis.tables.entity.User;
import tech.pdai.springboot.shardingjdbc.mybatis.tables.entity.query.UserQueryBean;
import org.springframework.stereotype.Service;
import tech.pdai.springboot.shardingjdbc.mybatis.tables.service.IUserService;

import java.util.List;

@Service
public class UserDoServiceImpl implements IUserService {

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

    @Override
    public List<User> findList(UserQueryBean userQueryBean) {
        return userDao.findList(userQueryBean);
    }

    @Override
    public User findById(Long id) {
        return userDao.findById(id);
    }

    @Override
    public int deleteById(Long id) {
        return userDao.deleteById(id);
    }

    @Override
    public int deleteByIds(Long[] ids) {
        return userDao.deleteByIds(ids);
    }

    @Override
    public int update(User user) {
        return userDao.update(user);
    }

    @Override
    public int save(User user) {
        return userDao.save(user);
    }

    @Override
    public int updatePassword(User user) {
        return userDao.updatePassword(user);
    }

    @Override
    public User findById2(Long userId) {
        return userDao.findById2(userId);
    }
}
```

### 2.4 Controller

user controller

```java
package tech.pdai.springboot.shardingjdbc.mybatis.tables.controller;


import tech.pdai.springboot.shardingjdbc.mybatis.tables.entity.User;
import tech.pdai.springboot.shardingjdbc.mybatis.tables.entity.query.UserQueryBean;
import tech.pdai.springboot.shardingjdbc.mybatis.tables.entity.response.ResponseResult;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.pdai.springboot.shardingjdbc.mybatis.tables.service.IUserService;

import java.util.List;

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
        if (user.getId() == null) {
            userService.save(user);
        } else {
            userService.update(user);
        }
        return ResponseResult.success(userService.findById(user.getId()));
    }

    /**
     * @return user list
     */
    @ApiOperation("Query User One")
    @GetMapping("edit/{userId}")
    public ResponseResult<User> edit(@PathVariable("userId") Long userId) {
        return ResponseResult.success(userService.findById(userId));
    }

    /**
     * @return user list 2
     */
    @ApiOperation("Query User One 2")
    @GetMapping("edit2/{userId}")
    public ResponseResult<User> edit2(@PathVariable("userId") Long userId) {
        return ResponseResult.success(userService.findById2(userId));
    }

    /**
     * @return user list
     */
    @ApiOperation("Query User List")
    @GetMapping("list")
    public ResponseResult<List<User>> list(UserQueryBean userQueryBean) {
        return ResponseResult.success(userService.findList(userQueryBean));
    }

    @ApiOperation("Delete by id")
    @PostMapping("delete")
    public ResponseResult<Integer> delete(Long userId) {
        return ResponseResult.success(userService.deleteById(userId));
    }
}
```

### 2.5 简单测试

访问页面：

http://localhost:8080/doc.html

插入数据

![image-20220717201509884](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717201509884.png)

## 3. 进一步理解

> 通过几个问题进一步理解。

### 3.1 几个常见的错误

在使用sharding-jdbc以及和其它组件集成（比如mybatis，mybatis-plus，druid等）遇到的问题会比较多，这里举几个典型的报错例子：

- **Sharding value must implements Comparable**.

由于数据分片，原有的数据库自动增长ID设置以及ORM层相关配置策略都不能再使用，所以需要取消数据库自增长以及ORM层@ID或者@TableID等注解。

key-generator 由如下配置替代

```yml
  key-generator:
    column: id
    type: SNOWFLAKE
    props:
      worker:
        id: 123
```

- **Data truncation: Out of range value for column 'id'**

正是由于上述SNOWFLAKE雪花算法（相关文章请参考[分布式算法 - Snowflake算法](https://pdai.tech/md/algorithm/alg-domain-id-snowflake.html)）， 相关ID是64位的long类型，所以需要设置相关字段位BIGINT类型。

- **java.sql.SQLFeatureNotSupportedException: getObject with type**

这是与Mybatis等其它框架集成的一个bug：LocalDateTimeTypeHandler未能进行关联处理； 官方在5.0版本修复了这个问题，只是当前sharding-jdbc-spring-boot-starter的版本依然是4.1.1，所以依然有问题。这也凸显出了国产开源（即便是进入Apache且在不断完善）整体上还有很长的路（文档，闭环，Ecosystem...等等）要走。

https://github.com/apache/shardingsphere/pull/6202

### 3.2 核心作者采访谈Sharding-JDBC

[深度认识 Sharding-JDBC：做最轻量级的数据库中间层](https://juejin.cn/post/6844903476393164813)

## 参考文章

[**SpringBoot集成ShardingJDBC - Sharding-JDBC简介和基于MyBatis的单库分表**](https://pdai.tech/md/spring/springboot/springboot-x-mysql-shardingjdbc.html)