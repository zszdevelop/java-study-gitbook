# SpringBoot集成MySQL MyBatis-Plus方式

>MyBatis-Plus（简称 MP）是一个 MyBatis的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。MyBatis-Plus在国内也有很多的用户，本文主要介绍MyBatis-Plus和SpringBoot的集成。

## 1. 知识准备

> MyBatis-Plus（简称 MP）是一个 MyBatis的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

### 1.1 为什么会诞生MyBatis-Plus？

> 正如前文所述（[SpringBoot集成MySQL - MyBatis XML方式](https://pdai.tech/md/spring/springboot/springboot-x-mysql-mybatis-xml.html)），为了更高的效率，出现了MyBatis-Plus这类工具，对MyBatis进行增强。

1. **考虑到MyBatis是半自动化ORM**，MyBatis-Plus 启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作; 并且内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求；总体上让其支持全自动化的使用方式（本质上借鉴了Hibernate思路）。
2. **考虑到Java8 Lambda（函数式编程）开始流行**，MyBatis-Plus支持 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
3. **考虑到MyBatis还需要独立引入PageHelper分页插件**，MyBatis-Plus支持了内置分页插件，同PageHelper一样基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
4. **考虑到自动化代码生成方式**，MyBatis-Plus也支持了内置代码生成器，采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用
5. **考虑到SQL性能优化等问题**，MyBatis-Plus内置性能分析插件, 可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
6. 其它还有解决一些常见开发问题，比如**支持主键自动生成**，支持4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题；以及**内置全局拦截插件**，提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作

### 1.2 支持数据库

任何能使用 MyBatis 进行 CRUD, 并且支持标准 SQL 的数据库，具体支持情况如下：

- MySQL，Oracle，DB2，H2，HSQL，SQLite，PostgreSQL，SQLServer，Phoenix，Gauss ，ClickHouse，Sybase，OceanBase，Firebird，Cubrid，Goldilocks，csiidb
- 达梦数据库，虚谷数据库，人大金仓数据库，南大通用(华库)数据库，南大通用数据库，神通数据库，瀚高数据库

### 1.3 整体架构

![image-20220717161455070](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717161455070.png)

## 2. 简单示例

> 这里沿用上一篇文章的数据库, 向你展示SpringBoot + MyBatis-Plus的使用等。

### 2.1 准备DB和依赖配置

创建MySQL的schema test_db, 导入SQL 文件如下

```sql
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: test_db
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
INSERT INTO `tb_role` VALUES (1,'admin','admin','admin','2021-09-08 17:09:15','2021-09-08 17:09:15');
/*!40000 ALTER TABLE `tb_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (1,'pdai','dfasdf','suzhou.daipeng@gmail.com',1212121213,'afsdfsaf','2021-09-08 17:09:15','2021-09-08 17:09:15');
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_role`
--

DROP TABLE IF EXISTS `tb_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_role`
--

LOCK TABLES `tb_user_role` WRITE;
/*!40000 ALTER TABLE `tb_user_role` DISABLE KEYS */;
INSERT INTO `tb_user_role` VALUES (1,1);
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

-- Dump completed on 2021-09-08 17:12:11

```

引入maven依赖

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.28</version>
</dependency>
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.1</version>
</dependency>
```

增加yml配置

```yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test_db?useSSL=false&autoReconnect=true&characterEncoding=utf8
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: bfXa4Pt2lUUScy8jakXf

mybatis-plus:
  configuration:
    cache-enabled: true
    use-generated-keys: true
    default-executor-type: REUSE
    use-actual-param-name: true

```

### 2.2 定义dao

(也就是你自己的xxxMapper)

RoleDao

```java
package tech.pdai.springboot.mysql8.mybatisplus.anno.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.Role;

/**
 * @author pdai
 */
public interface IRoleDao extends BaseMapper<Role> {
}
```

UserDao

```java
package tech.pdai.springboot.mysql8.mybatisplus.anno.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.User;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.query.UserQueryBean;

import java.util.List;

public interface IUserDao extends BaseMapper<User> {

    List<User> findList(UserQueryBean userQueryBean);
}
```

这里你也同时可以支持BaseMapper方式和自己定义的xml的方法（比较适用于关联查询），比如findList是自定义xml配置

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="tech.pdai.springboot.mysql8.mybatisplus.anno.dao.IUserDao">

	<resultMap type="tech.pdai.springboot.mysql8.mybatisplus.anno.entity.User" id="UserResult">
		<id     property="id"       	column="id"      		/>
		<result property="userName"     column="user_name"    	/>
		<result property="password"     column="password"    	/>
		<result property="email"        column="email"        	/>
		<result property="phoneNumber"  column="phone_number"  	/>
		<result property="description"  column="description"  	/>
		<result property="createTime"   column="create_time"  	/>
		<result property="updateTime"   column="update_time"  	/>
		<collection property="roles" ofType="tech.pdai.springboot.mysql8.mybatisplus.anno.entity.Role">
			<result property="id" column="id"  />
			<result property="name" column="name"  />
			<result property="roleKey" column="role_key"  />
			<result property="description" column="description"  />
			<result property="createTime"   column="create_time"  	/>
			<result property="updateTime"   column="update_time"  	/>
		</collection>
	</resultMap>
	
	<sql id="selectUserSql">
        select u.id, u.password, u.user_name, u.email, u.phone_number, u.description, u.create_time, u.update_time, r.name, r.role_key, r.description, r.create_time, r.update_time
		from tb_user u
		left join tb_user_role ur on u.id=ur.user_id
		inner join tb_role r on ur.role_id=r.id
    </sql>
	
	<select id="findList" parameterType="tech.pdai.springboot.mysql8.mybatisplus.anno.entity.query.UserQueryBean" resultMap="UserResult">
		<include refid="selectUserSql"/>
		where u.id != 0
		<if test="userName != null and userName != ''">
			AND u.user_name like concat('%', #{user_name}, '%')
		</if>
		<if test="description != null and description != ''">
			AND u.description like concat('%', #{description}, '%')
		</if>
		<if test="phoneNumber != null and phoneNumber != ''">
			AND u.phone_number like concat('%', #{phoneNumber}, '%')
		</if>
		<if test="email != null and email != ''">
			AND u.email like concat('%', #{email}, '%')
		</if>
	</select>
	
</mapper> 
```

### 2.3 定义Service接口和实现类

UserService接口

```java
package tech.pdai.springboot.mysql8.mybatisplus.anno.service;

import com.baomidou.mybatisplus.extension.service.IService;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.User;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.query.UserQueryBean;

import java.util.List;

public interface IUserService extends IService<User> {

    List<User> findList(UserQueryBean userQueryBean);

}
```

User Service的实现类

```java
package tech.pdai.springboot.mysql8.mybatisplus.anno.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import tech.pdai.springboot.mysql8.mybatisplus.anno.dao.IUserDao;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.User;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.query.UserQueryBean;
import tech.pdai.springboot.mysql8.mybatisplus.anno.service.IUserService;

import java.util.List;

@Service
public class UserDoServiceImpl extends ServiceImpl<IUserDao, User> implements IUserService {

    @Override
    public List<User> findList(UserQueryBean userQueryBean) {
        return baseMapper.findList(userQueryBean);
    }
}
```

Role Service 接口

```java
package tech.pdai.springboot.mysql8.mybatisplus.anno.service;

import com.baomidou.mybatisplus.extension.service.IService;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.Role;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.query.RoleQueryBean;

import java.util.List;

public interface IRoleService extends IService<Role> {

    List<Role> findList(RoleQueryBean roleQueryBean);

}
```

Role Service 实现类

```java
package tech.pdai.springboot.mysql8.mybatisplus.anno.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import tech.pdai.springboot.mysql8.mybatisplus.anno.dao.IRoleDao;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.Role;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.query.RoleQueryBean;
import tech.pdai.springboot.mysql8.mybatisplus.anno.service.IRoleService;

import java.util.List;

@Service
public class RoleDoServiceImpl extends ServiceImpl<IRoleDao, Role> implements IRoleService {

    @Override
    public List<Role> findList(RoleQueryBean roleQueryBean) {
        return lambdaQuery().like(StringUtils.isNotEmpty(roleQueryBean.getName()), Role::getName, roleQueryBean.getName())
                .like(StringUtils.isNotEmpty(roleQueryBean.getDescription()), Role::getDescription, roleQueryBean.getDescription())
                .like(StringUtils.isNotEmpty(roleQueryBean.getRoleKey()), Role::getRoleKey, roleQueryBean.getRoleKey())
                .list();
    }
}
```

### 2.4 controller

User Controller

```java
package tech.pdai.springboot.mysql8.mybatisplus.anno.controller;


import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.User;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.query.UserQueryBean;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.response.ResponseResult;
import tech.pdai.springboot.mysql8.mybatisplus.anno.service.IUserService;

import java.time.LocalDateTime;
import java.util.List;


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
            user.setCreateTime(LocalDateTime.now());
        }
        user.setUpdateTime(LocalDateTime.now());
        userService.save(user);
        return ResponseResult.success(userService.getById(user.getId()));
    }


    /**
     * @return user list
     */
    @ApiOperation("Query User One")
    @GetMapping("edit/{userId}")
    public ResponseResult<User> edit(@PathVariable("userId") Long userId) {
        return ResponseResult.success(userService.getById(userId));
    }

    /**
     * @return user list
     */
    @ApiOperation("Query User List")
    @GetMapping("list")
    public ResponseResult<List<User>> list(UserQueryBean userQueryBean) {
        return ResponseResult.success(userService.findList(userQueryBean));
    }
}
```

Role Controller

```java
package tech.pdai.springboot.mysql8.mybatisplus.anno.controller;


import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.Role;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.query.RoleQueryBean;
import tech.pdai.springboot.mysql8.mybatisplus.anno.entity.response.ResponseResult;
import tech.pdai.springboot.mysql8.mybatisplus.anno.service.IRoleService;

import java.util.List;

@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private IRoleService roleService;

    /**
     * @return role list
     */
    @ApiOperation("Query Role List")
    @GetMapping("list")
    public ResponseResult<List<Role>> list(RoleQueryBean roleQueryBean) {
        return ResponseResult.success(roleService.findList(roleQueryBean));
    }
}
```

### 2.5 分页配置

通过配置内置的MybatisPlusInterceptor拦截器。

```java
package tech.pdai.springboot.mysql8.mybatisplus.anno.config;

import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * MyBatis-plus configuration, add pagination interceptor.
 *
 */
@Configuration
public class MyBatisConfig {

    /**
     * inject pagination interceptor.
     *
     * @return pagination
     */
    @Bean
    public PaginationInnerInterceptor paginationInnerInterceptor() {
        return new PaginationInnerInterceptor();
    }

    /**
     * add pagination interceptor.
     *
     * @return MybatisPlusInterceptor
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
        mybatisPlusInterceptor.addInnerInterceptor(paginationInnerInterceptor());
        return mybatisPlusInterceptor;
    }

}
```

## 3. 进一步理解

> MyBatis-plus学习梳理

- [官方文档](https://baomidou.com/)
- [官方案例](https://github.com/baomidou/mybatis-plus-samples)
- [官方源码仓库](https://github.com/baomidou/mybatis-plus)
- [Awesome Mybatis-Plus](https://github.com/baomidou/awesome-mybatis-plus)

### 3.1 比较好的实践

> 总结下开发的过程中比较好的实践

1. Mapper层：继承`BaseMapper`

```java
public interface IRoleDao extends BaseMapper<Role> {
}
```

2. Service层：继承`ServiceImpl`并实现对应接口

```java
public class RoleDoServiceImpl extends ServiceImpl<IRoleDao, Role> implements IRoleService {

}
```

3. Lambda函数式查询

```java
@Override
public List<Role> findList(RoleQueryBean roleQueryBean) {
    return lambdaQuery().like(StringUtils.isNotEmpty(roleQueryBean.getName()), Role::getName, roleQueryBean.getName())
            .like(StringUtils.isNotEmpty(roleQueryBean.getDescription()), Role::getDescription, roleQueryBean.getDescription())
            .like(StringUtils.isNotEmpty(roleQueryBean.getRoleKey()), Role::getRoleKey, roleQueryBean.getRoleKey())
            .list();
}
```

4. 分页采用内置MybatisPlusInterceptor

```java
/**
  * inject pagination interceptor.
  *
  * @return pagination
  */
@Bean
public PaginationInnerInterceptor paginationInnerInterceptor() {
    return new PaginationInnerInterceptor();
}

/**
  * add pagination interceptor.
  *
  * @return MybatisPlusInterceptor
  */
@Bean
public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
    mybatisPlusInterceptor.addInnerInterceptor(paginationInnerInterceptor());
    return mybatisPlusInterceptor;
}
```

5. 对于复杂的关联查询

可以配置原生xml方式, 在其中自定义ResultMap

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="tech.pdai.springboot.mysql8.mybatisplus.anno.dao.IUserDao">

	<resultMap type="tech.pdai.springboot.mysql8.mybatisplus.anno.entity.User" id="UserResult">
		<id     property="id"       	column="id"      		/>
		<result property="userName"     column="user_name"    	/>
		<result property="password"     column="password"    	/>
		<result property="email"        column="email"        	/>
		<result property="phoneNumber"  column="phone_number"  	/>
		<result property="description"  column="description"  	/>
		<result property="createTime"   column="create_time"  	/>
		<result property="updateTime"   column="update_time"  	/>
		<collection property="roles" ofType="tech.pdai.springboot.mysql8.mybatisplus.anno.entity.Role">
			<result property="id" column="id"  />
			<result property="name" column="name"  />
			<result property="roleKey" column="role_key"  />
			<result property="description" column="description"  />
			<result property="createTime"   column="create_time"  	/>
			<result property="updateTime"   column="update_time"  	/>
		</collection>
	</resultMap>
	
	<sql id="selectUserSql">
        select u.id, u.password, u.user_name, u.email, u.phone_number, u.description, u.create_time, u.update_time, r.name, r.role_key, r.description, r.create_time, r.update_time
		from tb_user u
		left join tb_user_role ur on u.id=ur.user_id
		inner join tb_role r on ur.role_id=r.id
    </sql>
	
	<select id="findList" parameterType="tech.pdai.springboot.mysql8.mybatisplus.anno.entity.query.UserQueryBean" resultMap="UserResult">
		<include refid="selectUserSql"/>
		where u.id != 0
		<if test="userName != null and userName != ''">
			AND u.user_name like concat('%', #{user_name}, '%')
		</if>
		<if test="description != null and description != ''">
			AND u.description like concat('%', #{description}, '%')
		</if>
		<if test="phoneNumber != null and phoneNumber != ''">
			AND u.phone_number like concat('%', #{phoneNumber}, '%')
		</if>
		<if test="email != null and email != ''">
			AND u.email like concat('%', #{email}, '%')
		</if>
	</select>
	
</mapper> 
```

### 3.2 除了分页插件之外还提供了哪些插件？

插件都是基于拦截器实现的，MyBatis-Plus提供了如下[插件 ](https://baomidou.com/pages/2976a3/#mybatisplusinterceptor)：

- 自动分页: PaginationInnerInterceptor
- 多租户: TenantLineInnerInterceptor
- 动态表名: DynamicTableNameInnerInterceptor
- 乐观锁: OptimisticLockerInnerInterceptor
- sql 性能规范: IllegalSQLInnerInterceptor
- 防止全表更新与删除: BlockAttackInnerInterceptor

## 参考文章

[**SpringBoot集成MySQL - MyBatis-Plus方式**](https://pdai.tech/md/spring/springboot/springboot-x-mysql-mybatis-plus.html)