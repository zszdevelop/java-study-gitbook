# SpringBoot集成MySQL-MyBatis-Plus基于字段隔离的多租户

>本文主要介绍 MyBatis-Plus的基于字段隔离的多租户实现，以及MyBatis-Plus的基于字段的隔离方式实践和原理。

## 1. 知识准备

> 需要了解多租户及常见的实现方式，以及MyBatis-Plus的基于字段的隔离方式原理。

### 1.1 什么是多租户？

> 如下解释来源于百度百科

多租户技术（英语：multi-tenancy technology）或称多重租赁技术，是一种软件架构技术，它是在探讨与实现如何于多用户的环境下共用相同的系统或程序组件，并且仍可确保各用户间数据的隔离性。

多租户简单来说是指一个单独的实例可以为多个组织服务。多租户技术为共用的数据中心内如何以单一系统架构与服务提供多数客户端相同甚至可定制化的服务，并且仍然可以保障客户的数据隔离。一个支持多租户技术的系统需要在设计上对它的数据和配置进行虚拟分区，从而使系统的每个租户或称组织都能够使用一个单独的系统实例，并且每个租户都可以根据自己的需求对租用的系统实例进行个性化配置。

多租户技术可以实现多个租户之间共享系统实例，同时又可以实现租户的系统实例的个性化定制。通过使用多租户技术可以保证系统共性的部分被共享，个性的部分被单独隔离。通过在多个租户之间的资源复用，运营管理维护资源，有效节省开发应用的成本。而且，在租户之间共享应用程序的单个实例，可以实现当应用程序升级时，所有租户可以同时升级。同时，因为多个租户共享一份系统的核心代码，因此当系统升级时，只需要升级相同的核心代码即可。

### 1.2 多租户在数据存储上有哪些实现方式？

> 如下解释来源于百度百科

多租户在数据存储上存在三种主要的方案，分别是

#### 1.2.1 DB隔离：独立数据库

这是第一种方案，即**一个租户一个数据库**，这种方案的用户数据隔离级别最高，安全性最好，但成本也高。

- **优点**：

1. 为不同的租户提供独立的数据库，有助于简化数据模型的扩展设计，满足不同租户的独特需求；
2. 如果出现故障，恢复数据比较简单。

- **缺点**：

1. 增大了数据库的安装数量，随之带来维护成本和购置成本的增加。
2. 这种方案与传统的一个客户、一套数据、一套部署类似，差别只在于软件统一部署在运营商那里。如果面对的是银行、医院等需要非常高数据隔离级别的租户，可以选择这种模式，提高租用的定价。如果定价较低，产品走低价路线，这种方案一般对运营商来说是无法承受的。

#### 1.2.2 Schema隔离：共享数据库，隔离数据架构

这是第二种方案，即多个或所有租户共享Database，但**一个租户（Tenant）一个Schema**。

- **优点**：

1. 为安全性要求较高的租户提供了一定程度的逻辑数据隔离，并不是完全隔离；每个数据库可以支持更多的租户数量。

- **缺点**：

1. 如果出现故障，数据恢复比较困难，因为恢复数据库将牵扯到其他租户的数据；
2. 如果需要跨租户统计数据，存在一定困难。

#### 1.2.3 字段隔离：共享数据库，共享数据架构

这是第三种方案，即租户共享同一个Database、同一个Schema，但在表中**通过TenantID区分租户的数据**。这是共享程度最高、隔离级别最低的模式。

- **优点**：

1. 三种方案比较，第三种方案的维护和购置成本最低，允许每个数据库支持的租户数量最多。

- **缺点**：

1. 隔离级别最低，安全性最低，需要在设计开发时加大对安全的开发量；
2. 数据备份和恢复最困难，需要逐表逐条备份和还原。
3. 如果希望以最少的服务器为最多的租户提供服务，并且租户接受以牺牲隔离级别换取降低成本，这种方案最适合。

### 1.3 MyBatis-Plus的基于字段的隔离方式原理是什么？

这里请看MyBatis的插件机制：[MyBatis详解 - 插件机制](https://pdai.tech/md/framework/orm-mybatis/mybatis-y-plugin.html)

## 2. 简单示例

> 这里沿用之前的test_db，**在表中添加tenant_id**，并命名为新的schema test_db_tenant。

### 2.1 准备DB和依赖配置

创建MySQL的schema test_db_tenant, 导入SQL 文件如下

```sql
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: test_db_tenant
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
  `id` int NOT NULL AUTO_INCREMENT,
  `tenant_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `role_key` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_role`
--

LOCK TABLES `tb_role` WRITE;
/*!40000 ALTER TABLE `tb_role` DISABLE KEYS */;
INSERT INTO `tb_role` VALUES (1,1,'admin','admin','admin','2021-09-08 17:09:15','2021-09-08 17:09:15');
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
  `tenant_id` int DEFAULT NULL,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (1,1,'pdai','dfasdf','suzhou.daipeng@gmail.com',1212121213,'afsdfsaf','2021-09-08 17:09:15','2021-09-08 17:09:15');
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
  `role_id` int NOT NULL,
  `tenant_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_role`
--

LOCK TABLES `tb_user_role` WRITE;
/*!40000 ALTER TABLE `tb_user_role` DISABLE KEYS */;
INSERT INTO `tb_user_role` VALUES (1,1,1);
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

-- Dump completed on 2022-04-02 12:50:14
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
    url: jdbc:mysql://localhost:3306/test_db_tenant?useSSL=false&autoReconnect=true&characterEncoding=utf8
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: bfXa4Pt2lUUScy8jakXf

mybatis-plus:
  configuration:
    cache-enabled: true
    use-generated-keys: true
    default-executor-type: REUSE
    use-actual-param-name: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl # 输出SQL log 方便 debug
```

### 2.2 MyBatis-Plus配置

通过添加TenantLineInnerInterceptor来完成。

```java
package tech.pdai.springboot.mysql8.mybatisplus.tenant.config;

import java.util.List;

import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.handler.TenantLineHandler;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.TenantLineInnerInterceptor;
import net.sf.jsqlparser.expression.Expression;
import net.sf.jsqlparser.expression.LongValue;
import net.sf.jsqlparser.schema.Column;
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
     * add interceptor.
     *
     * @return MybatisPlusInterceptor
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // TenantLineInnerInterceptor
        interceptor.addInnerInterceptor(new TenantLineInnerInterceptor(new TenantLineHandler() {
            @Override
            public Expression getTenantId() {
                // 实际可以将TenantId放在threadLocale中(比如xxxxContext中)，并获取。
                return new LongValue(1);
            }

            @Override
            public String getTenantIdColumn() {
                return "tenant_id";
            }

            @Override
            public boolean ignoreTable(String tableName) {
                return false;
            }

            @Override
            public boolean ignoreInsert(List<Column> columns, String tenantIdColumn) {
                return TenantLineHandler.super.ignoreInsert(columns, tenantIdColumn);
            }
        }));
        // 如果用了分页插件注意先 add TenantLineInnerInterceptor 再 add PaginationInnerInterceptor
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor());
        return interceptor;
    }

}
```

### 2.3 定义dao

(也就是你自己的xxxMapper)

RoleDao

```java
package tech.pdai.springboot.mysql8.mybatisplus.tenant.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.Role;

public interface IRoleDao extends BaseMapper<Role> {
}
```

UserDao

```java
package tech.pdai.springboot.mysql8.mybatisplus.tenant.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.User;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.query.UserQueryBean;

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
<mapper namespace="tech.pdai.springboot.mysql8.mybatisplus.tenant.dao.IUserDao">

	<resultMap type="tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.User" id="UserResult">
		<id     property="id"       	column="id"      		/>
		<result property="userName"     column="user_name"    	/>
		<result property="password"     column="password"    	/>
		<result property="email"        column="email"        	/>
		<result property="phoneNumber"  column="phone_number"  	/>
		<result property="description"  column="description"  	/>
		<result property="createTime"   column="create_time"  	/>
		<result property="updateTime"   column="update_time"  	/>
		<collection property="roles" ofType="tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.Role">
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
	
	<select id="findList" parameterType="tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.query.UserQueryBean" resultMap="UserResult">
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

### 2.4 定义Service接口和实现类

UserService接口

```java
package tech.pdai.springboot.mysql8.mybatisplus.tenant.service;

import com.baomidou.mybatisplus.extension.service.IService;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.User;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.query.UserQueryBean;

import java.util.List;

public interface IUserService extends IService<User> {

    List<User> findList(UserQueryBean userQueryBean);

}
```

User Service的实现类

```java
package tech.pdai.springboot.mysql8.mybatisplus.tenant.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.dao.IUserDao;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.User;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.query.UserQueryBean;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.service.IUserService;

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
package tech.pdai.springboot.mysql8.mybatisplus.tenant.service;

import com.baomidou.mybatisplus.extension.service.IService;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.Role;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.query.RoleQueryBean;

import java.util.List;

public interface IRoleService extends IService<Role> {

    List<Role> findList(RoleQueryBean roleQueryBean);

}
```

Role Service 实现类

```java
package tech.pdai.springboot.mysql8.mybatisplus.tenant.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.dao.IRoleDao;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.Role;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.query.RoleQueryBean;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.service.IRoleService;

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

### 2.5 controller

User Controller

```java
package tech.pdai.springboot.mysql8.mybatisplus.tenant.controller;


import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.User;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.query.UserQueryBean;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.response.ResponseResult;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.service.IUserService;

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
package tech.pdai.springboot.mysql8.mybatisplus.tenant.controller;


import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.Role;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.query.RoleQueryBean;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.entity.response.ResponseResult;
import tech.pdai.springboot.mysql8.mybatisplus.tenant.service.IRoleService;

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

### 2.6 简单测试

访问页面：

http://localhost:8080/doc.html

![image-20220717182214049](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220717182214049.png)

拦截之前的SQL

```java
original SQL: select u.id, u.password, u.user_name, u.email, u.phone_number, u.description, u.create_time, u.update_time, r.name, r.role_key, r.description, r.create_time, r.update_time
		from tb_user u
		left join tb_user_role ur on u.id=ur.user_id
		inner join tb_role r on ur.role_id=r.id  
		where u.id != 0
```

最后执行的SQL中，对联表查询的每个表都加了：tenant_id

```bash
2021-09-22 20:26:22.368  INFO 28404 --- [nio-8080-exec-1] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
JDBC Connection [HikariProxyConnection@529070127 wrapping com.mysql.cj.jdbc.ConnectionImpl@785a9c8] will not be managed by Spring
==>  Preparing: SELECT u.id, u.password, u.user_name, u.email, u.phone_number, u.description, u.create_time, u.update_time, r.name, r.role_key, r.description, r.create_time, r.update_time FROM tb_user u LEFT JOIN tb_user_role ur ON u.id = ur.user_id AND ur.tenant_id = 1 INNER JOIN tb_role r ON ur.role_id = r.id AND u.tenant_id = 1 AND r.tenant_id = 1 WHERE u.id != 0
==> Parameters: 
<==    Columns: id, password, user_name, email, phone_number, description, create_time, update_time, name, role_key, description, create_time, update_time
<==        Row: 1, dfasdf, pdai, suzhou.daipeng@gmail.com, 1212121213, afsdfsaf, 2021-09-08 17:09:15, 2021-09-08 17:09:15, admin, admin, admin, 2021-09-08 17:09:15, 2021-09-08 17:09:15
<==      Total: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@5cf94cf9]

  
```

## 3. 进一步理解

> 在实际使用字段进行多租户隔离时有哪些注意点呢？

### 3.1 来自官方的注意点

> [相关建议](https://baomidou.com/pages/aef2f2/#tenantlineinnerinterceptor)

1. 多租户 != 权限过滤,不要乱用,租户之间是完全隔离的!!!
2. 启用多租户后所有执行的method的sql都会进行处理.
3. 自写的sql请按规范书写(sql涉及到多个表的每个表都要给别名,特别是 inner join 的要写标准的 inner join)

### 3.2 插件的顺序

> MyBatis-Plus使用多个功能插件需要注意顺序关系

MyBatis-Plus基于字段的多租户是通过插件机制拦截实现的，因为还有很多其它的拦截器，比如:

- 自动分页: PaginationInnerInterceptor
- 多租户: TenantLineInnerInterceptor
- - 动态表名: DynamicTableNameInnerInterceptor
- 乐观锁: OptimisticLockerInnerInterceptor
- sql 性能规范: IllegalSQLInnerInterceptor
- 防止全表更新与删除: BlockAttackInnerInterceptor

所以需要注意顺序: 使用多个功能需要注意顺序关系,建议使用如下顺序

- 多租户,动态表名
- 分页,乐观锁
- sql 性能规范,防止全表更新与删除

总结: 对 sql 进行单次改造的优先放入,不对 sql 进行改造的最后放入

### 3.3 封装性实践

> 实际项目中还需要对配置进行封装。

回看如下的处理， 我们看下可以封装的点：

```java
// TenantLineInnerInterceptor
interceptor.addInnerInterceptor(new TenantLineInnerInterceptor(new TenantLineHandler() {
    @Override
    public Expression getTenantId() {
        // 实际可以将TenantId放在threadLocale中(比如xxxxContext中)，并获取。
        return new LongValue(1);
    }

    @Override
    public String getTenantIdColumn() {
        return "tenant_id";
    }

    @Override
    public boolean ignoreTable(String tableName) {
        return false;
    }

    @Override
    public boolean ignoreInsert(List<Column> columns, String tenantIdColumn) {
        return TenantLineHandler.super.ignoreInsert(columns, tenantIdColumn);
    }
}));

```

1. 对于配置

相关配置可以封装到yml, 然后注入进来。

1. 对于TenantId

实际可以将TenantId放在threadLocale中(比如xxxxContext中)，并获取。

1. 对于ignoreTable

比如有些表不要自动进行拦截的，可以在yml中配置并重写ignoreTable方法。

1. 对于ignoreInsert

对于插入数据是否需要携带TenantId，可以通过重写ignoreInsert方法。

## 参考文章

[**SpringBoot集成MySQL - MyBatis-Plus基于字段隔离的多租户**](https://pdai.tech/md/spring/springboot/springboot-x-mysql-mybatis-plus-multi-tenant.html)