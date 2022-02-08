# Mongodb多数据源

## 1. 集成步骤

1. 添加maven依赖

   ```xml
     <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-data-mongodb</artifactId>
           </dependency>
   ```

2. 配置文件

   ```yml
   spring:
     data:
       mongodb:
         primary:
           uri: mongodb://localhost:27017/db1
         secondary:
           uri: mongodb://localhost:27017/db2
   ```

3. 主数据库配置文件PrimaryMongoConfig

   ```java
   package com.zszdevelop.mongomultidemo.config;
   
   
   
   import com.mongodb.MongoClientURI;
   import org.springframework.boot.autoconfigure.mongo.MongoProperties;
   import org.springframework.boot.context.properties.ConfigurationProperties;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.context.annotation.Primary;
   import org.springframework.data.mongodb.MongoDbFactory;
   import org.springframework.data.mongodb.core.MongoTemplate;
   import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
   import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
   
   @Configuration
   @EnableMongoRepositories(basePackages = {"com.zszdevelop.mongomultidemo.domain.primary","com.zszdevelop.mongomultidemo.repository.primary"},
           mongoTemplateRef = "primaryMongoTemplate")
   public class PrimaryMongoConfig {
   
       @Bean
       @Primary
       @ConfigurationProperties(prefix="spring.data.mongodb.primary")
       public MongoProperties primaryMongoProperties() {
           return new MongoProperties();
       }
   
       @Primary
       @Bean(name = "primaryMongoTemplate")
       public MongoTemplate primaryMongoTemplate() throws Exception {
           return new MongoTemplate(primaryFactory(primaryMongoProperties()));
       }
   
       @Bean
       @Primary
    		public MongoDatabaseFactory primaryFactory(MongoProperties mongoProperties)  {
           return new SimpleMongoClientDatabaseFactory(primaryMongoProperties().getUri());
       }
   }
   
   ```

4. 副数据库配置文件PrimaryMongoConfig

   ```java
   package com.zszdevelop.mongomultidemo.config;
   
   import com.mongodb.MongoClientURI;
   import org.springframework.boot.autoconfigure.mongo.MongoProperties;
   import org.springframework.boot.context.properties.ConfigurationProperties;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.context.annotation.Primary;
   import org.springframework.data.mongodb.MongoDbFactory;
   import org.springframework.data.mongodb.core.MongoTemplate;
   import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
   import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
   
   @Configuration
   @EnableMongoRepositories(basePackages = {"com.zszdevelop.mongomultidemo.domain.secondary","com.zszdevelop.mongomultidemo.repository.secondary"} ,
           mongoTemplateRef = "secondaryMongoTemplate")
   public class SecondaryMongoConfig {
   
       @Bean
       @ConfigurationProperties(prefix="spring.data.mongodb.secondary")
       public MongoProperties secondaryMongoProperties() {
           return new MongoProperties();
       }
   
       @Bean(name = "secondaryMongoTemplate")
       public MongoTemplate secondaryMongoTemplate() throws Exception {
           return new MongoTemplate(secondaryFactory(secondaryMongoProperties()));
       }
   
       @Bean
        @Bean
       public MongoDatabaseFactory secondaryFactory(MongoProperties mongoProperties) throws Exception {
           SimpleMongoClientDatabaseFactory simpleMongoClientDbFactory = new SimpleMongoClientDatabaseFactory(secondaryMongoProperties().getUri());
           return  simpleMongoClientDbFactory;
       }
   }
   
   ```

   

5. 用户实体类（存储在副数据库）

   ```java
   package com.zszdevelop.mongomultidemo.domain.secondary;
   
   
   import lombok.Data;
   import lombok.experimental.Accessors;
   import org.springframework.data.annotation.Id;
   import org.springframework.data.mongodb.core.mapping.Document;
   
   import java.io.Serializable;
   import java.time.Instant;
   
   @Data
   @Accessors(chain = true)
   @Document(collection = "t_user")
   public class User implements Serializable {
   
       private static final long serialVersionUID = -7229906944062898852L;
   
       /** ID */
       @Id
       private String id;
   
       /** 用户名 */
       private String username;
   
       /** 年龄 */
       private Integer age;
   
       /** 注册时间 */
       private Instant registerTime;
   }
   
   ```
   
6. 用户查询仓库（副数据库）

   ```java
   package com.zszdevelop.mongomultidemo.repository.secondary;
   
   import com.zszdevelop.mongomultidemo.domain.secondary.User;
   import org.springframework.data.mongodb.repository.MongoRepository;
   
   import java.util.List;
   
   public interface UserRepository extends MongoRepository<User, String> {
   
       /**
        * 通过用户名查询
        * @param username 用户名
        * @return
        */
       List<User> findAllByUsername(String username);
   
   }
   
   
   ```

7.  登录日志实体（主数据库）

   ```java
   package com.zszdevelop.mongomultidemo.domain.primary;
   
   
   import lombok.Data;
   import lombok.experimental.Accessors;
   import org.springframework.data.annotation.Id;
   
   import java.io.Serializable;
   import java.time.Instant;
   
   @Data
   @Accessors(chain = true)
   public class LoginLog implements Serializable {
   
       private static final long serialVersionUID = -6694661682102504919L;
   
       /** ID */
       @Id
       private String id;
   
       /** 用户ID */
       private String uid;
   
       /** 用户名 */
       private String username;
   
       /** 登录时间 */
       private Instant loginTime;
   }
   
   ```

8. 登录日志查询仓库（主数据库）

   ```java
   package com.zszdevelop.mongomultidemo.repository.primary;
   
   import com.zszdevelop.mongomultidemo.domain.primary.LoginLog;
   import org.springframework.data.mongodb.repository.MongoRepository;
   
   public interface LoginLogRepository extends MongoRepository<LoginLog, String> {
   }
   
   
   ```

## 2. 测试

1. 初始化数据 InitController 

   ```java
   package com.zszdevelop.mongomultidemo.controller;
   
   
   
   import com.zszdevelop.mongomultidemo.domain.secondary.User;
   import com.zszdevelop.mongomultidemo.repository.secondary.UserRepository;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.web.bind.annotation.RestController;
   
   import javax.annotation.PostConstruct;
   import java.time.Instant;
   import java.util.ArrayList;
   import java.util.List;
   
   @RestController
   public class InitController {
   
       /** [mongo] 用户 */
       @Autowired
       private UserRepository userRepository;
   
       @PostConstruct
       public void init() {
           List<User> all = userRepository.findAll();
           if (all.size() > 0)
               return;
           userRepository.save(new User().setUsername("Zhangsan").setAge(20).setRegisterTime(Instant.now()));
           List<User> users = new ArrayList<>();
           User u1 = new User().setUsername("u1").setAge(19).setRegisterTime(Instant.now());
           User u2 = new User().setUsername("u2").setAge(20).setRegisterTime(Instant.now());
           User u3 = new User().setUsername("u3").setAge(10).setRegisterTime(Instant.now());
           users.add(u1);
           users.add(u2);
           users.add(u3);
           userRepository.saveAll(users);
       }
   
   }
   
   ```
   
2. 测试代码

   ```java
   package com.zszdevelop.mongomultidemo.controller;
   
   /**
    * @author: zsz
    * @create: 2021-02-03 10:42
    * @描述:
    **/
   // TestController.java
   
   import com.zszdevelop.mongomultidemo.domain.ApiResult;
   import com.zszdevelop.mongomultidemo.domain.primary.LoginLog;
   import com.zszdevelop.mongomultidemo.domain.secondary.User;
   import com.zszdevelop.mongomultidemo.repository.primary.LoginLogRepository;
   import com.zszdevelop.mongomultidemo.repository.secondary.UserRepository;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.data.mongodb.core.MongoTemplate;
   import org.springframework.data.mongodb.core.query.Query;
   import org.springframework.util.StringUtils;
   import org.springframework.web.bind.annotation.GetMapping;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RestController;
   
   import java.time.Instant;
   import java.util.List;
   
   @RestController
   @RequestMapping("/test")
   public class TestController {
   
       /** [mongo] 用户 */
       @Autowired
       private UserRepository userRepository;
   
       /** [mongo] 登录日志 */
       @Autowired
       private LoginLogRepository loginLogRepository;
   
       /** [mongo] */
       @Autowired
       private MongoTemplate mongoTemplate;
   
       /**
        * 登录
        * @param username
        * @return
        */
       @GetMapping("/login")
       public ApiResult login(String username) {
           if (StringUtils.isEmpty(username))
               return ApiResult.error().setMsg("用户名不能为空");
           List<User> users = userRepository.findAllByUsername(username);
           if (users.size() == 1) {
               // 记录日志
               loginLogRepository.save(new LoginLog().setUid(users.get(0).getId()).setUsername(username).setLoginTime(Instant.now()));
               return ApiResult.success();
           }
           if (users.size() == 0)
               return ApiResult.error().setMsg("用户名查询失败");
   
           return ApiResult.error().setMsg("用户异常");
       }
   
       /**
        * 登录日志
        * @return
        */
       @GetMapping("/login-log")
       public ApiResult loginLog() {
           Query query = new Query();
           List<LoginLog> loginLogs = mongoTemplate.find(query, LoginLog.class);
           return ApiResult.success(loginLogs);
       }
   
   }
   
   ```

3.  测试用户登录

   GET http://localhost:8080/test/login?username=Zhangsan

   响应：

   ```
   {
       "code": 0,
       "msg": "Success"
   }
   ```

4. 测试登录日志

   GET http://localhost:8080/test/login-log

   响应：

   ```
   {
       "code": 0,
       "msg": "Success",
       "data": [
           {
               "id": "5d19d7f5cede54c46b6b20c5",
               "uid": "5d19d560cede54c45701e12a",
               "username": "Zhangsan",
               "loginTime": "2019-07-01T09:52:53.447Z"
           },
           {
               "id": "5d19da82cede54c46f77579a",
               "uid": "5d19d560cede54c45701e12a",
               "username": "Zhangsan",
               "loginTime": "2019-07-01T10:03:46.496Z"
           },
           {
               "id": "5d19df5fcede54c46f77579b",
               "uid": "5d19d560cede54c45701e12a",
               "username": "Zhangsan",
               "loginTime": "2019-07-01T10:24:31.272Z"
           },
           {
               "id": "5d19df6acede54c46f77579c",
               "uid": "5d19d560cede54c45701e12b",
               "username": "u1",
               "loginTime": "2019-07-01T10:24:42.199Z"
           },
           {
               "id": "5d19df6dcede54c46f77579d",
               "uid": "5d19d560cede54c45701e12d",
               "username": "u3",
               "loginTime": "2019-07-01T10:24:45.421Z"
           }
       ]
   }
   ```

   

## 参考文章

[SpringBoot整合MongoDB多数据源](https://juejin.cn/post/6844903878312329224)

[Spring Data MongoDB多数据源实现](https://blog.csdn.net/xl_1803/article/details/118462077)