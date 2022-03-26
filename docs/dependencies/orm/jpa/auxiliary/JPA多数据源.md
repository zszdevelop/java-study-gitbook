# JPA多数据源

## 1. 集成步骤

1. 引入相关maven依赖

   ```java
   		<!--spring data jpa -->
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-data-jpa</artifactId>
   		</dependency>
   
   		<!-- lombok -->
   		<dependency>
   			<groupId>org.projectlombok</groupId>
   			<artifactId>lombok</artifactId>
   			<optional>true</optional>
   		</dependency>
   
   		<!-- 阿里的数据源-->
   		<dependency>
   			<groupId>com.alibaba</groupId>
   			<artifactId>druid</artifactId>
   			<version>1.1.10</version>
   		</dependency>
   
   		<!-- mysql -->
   		<dependency>
   			<groupId>mysql</groupId>
   			<artifactId>mysql-connector-java</artifactId>
   			<scope>runtime</scope>
   		</dependency>
   
   ```

   2. 配置数据库和jpa一些简易配置

      ```yml
      spring:
        datasource:
          primary:
            driver-class-name: com.mysql.jdbc.Driver
            url: jdbc:mysql://localhost:3306/primary?useUnicode=true&characterEncoding=UTF-8&useOldAliasMetadataBehavior=true&serverTimezone=Asia/Shanghai
            username: root
            password: root
            # create, create-drop, update, validate
            # 作用主要用于：自动创建、更新、验证数据库表结构
            ddl-auto: create
          second:
            driver-class-name: com.mysql.jdbc.Driver
            url: jdbc:mysql://localhost:3306/second?useUnicode=true&characterEncoding=UTF-8&useOldAliasMetadataBehavior=true&serverTimezone=Asia/Shanghai
            username: root
            password: root
            ddl-auto: create
        jpa:
          show-sql: false
          hibernate:
            format_sql: true
            primary-dialect: org.hibernate.dialect.MySQL55Dialect
            second-dialect: org.hibernate.dialect.MySQL55Dialect
      
      ```

3. 多数据源配置

   3.1 DataSourceConfig

   ```java
   package com.zszdevelop.moredb.config;
   
   import com.alibaba.druid.pool.DruidDataSource;
   import org.springframework.beans.factory.annotation.Qualifier;
   import org.springframework.boot.context.properties.ConfigurationProperties;
   import org.springframework.boot.jdbc.DataSourceBuilder;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.context.annotation.Primary;
   
   import javax.sql.DataSource;
   
   /**
    * @author 作者: zhangshengzhong
    * @文件名: DataSourceConfig
    * @版本号:1.0
    * @创建日期: 2020/12/7 15:50
    * @描述:
    */
   @Configuration
   public class DataSourceConfig {
   
       /**
        * 第一个数据连接，默认优先级最高
        *
        * @return
        */
       @Primary
       @Bean(name = "primaryDataSource")
       @Qualifier("primaryDataSource")
       @ConfigurationProperties(prefix = "spring.datasource.primary")
       public DataSource PrimaryDataSource() {
           return DataSourceBuilder.create().type(DruidDataSource.class).build();
       }
   
       /**
        * 第二个数据源
        *
        * @return
        */
       @Bean(name = "secondDataSource")
       @Qualifier("secondDataSource")
       @ConfigurationProperties(prefix = "spring.datasource.second")
       public DataSource secondaryDataSource() {
           return DataSourceBuilder.create().type(DruidDataSource.class).build();
       }
   }
   
   
   
   ```

   3.2 PrimaryConfig

   ```java
   package com.zszdevelop.moredb.config;
   
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.beans.factory.annotation.Qualifier;
   import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.context.annotation.Primary;
   import org.springframework.core.env.Environment;
   import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
   import org.springframework.orm.jpa.JpaTransactionManager;
   import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
   import org.springframework.transaction.PlatformTransactionManager;
   import org.springframework.transaction.annotation.EnableTransactionManagement;
   
   import javax.persistence.EntityManager;
   import javax.sql.DataSource;
   import java.util.HashMap;
   import java.util.Map;
   
   /**
    * @author 作者: zhangshengzhong
    * @文件名: PrimaryConfig
    * @版本号:1.0
    * @创建日期: 2020/12/7 15:55
    * @描述:
    */
   @Configuration
   @EnableTransactionManagement
   @EnableJpaRepositories(
           entityManagerFactoryRef="entityManagerFactoryPrimary",
           transactionManagerRef="transactionManagerPrimary",
           basePackages= { "com.zszdevelop.moredb.repository.primary" })
   public class PrimaryConfig {
   
       @Autowired
       private Environment env;
   
       @Autowired
       @Qualifier("primaryDataSource")
       private DataSource primaryDataSource;
   
       @Primary
       @Bean(name = "entityManagerPrimary")
       public EntityManager entityManager(EntityManagerFactoryBuilder builder) {
           return entityManagerFactoryPrimary(builder).getObject().createEntityManager();
       }
   
       @Primary
       @Bean(name = "entityManagerFactoryPrimary")
       public LocalContainerEntityManagerFactoryBean entityManagerFactoryPrimary (EntityManagerFactoryBuilder builder) {
           return builder
                   .dataSource(primaryDataSource)
                   .properties(getVendorProperties())
                   .packages("com.zszdevelop.moredb.domain.primary")
                   .persistenceUnit("primaryPersistenceUnit")
                   .build();
       }
   
   
   
       private Map<String, String> getVendorProperties() {
           Map<String, String> jpaProperties = new HashMap<>(16);
           jpaProperties.put("hibernate.hbm2ddl.auto", env.getProperty("spring.datasource.primary.ddl-auto"));
           jpaProperties.put("hibernate.show_sql", env.getProperty("spring.jpa.show-sql"));
           jpaProperties.put("hibernate.format_sql", env.getProperty("spring.jpa.hibernate.format_sql"));
           jpaProperties.put("hibernate.dialect", env.getProperty("spring.jpa.hibernate.primary-dialect"));
           jpaProperties.put("hibernate.current_session_context_class", "org.springframework.orm.hibernate5.SpringSessionContext");
           return jpaProperties;
       }
   
       @Primary
       @Bean(name = "transactionManagerPrimary")
       public PlatformTransactionManager transactionManagerPrimary(EntityManagerFactoryBuilder builder) {
           return new JpaTransactionManager(entityManagerFactoryPrimary(builder).getObject());
       }
   }
   ```

   3.3 SecondConfig

   ```java
   package com.zszdevelop.moredb.config;
   
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.beans.factory.annotation.Qualifier;
   import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.core.env.Environment;
   import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
   import org.springframework.orm.jpa.JpaTransactionManager;
   import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
   import org.springframework.transaction.PlatformTransactionManager;
   import org.springframework.transaction.annotation.EnableTransactionManagement;
   
   import javax.persistence.EntityManager;
   import javax.sql.DataSource;
   import java.util.HashMap;
   import java.util.Map;
   
   /**
    * @author 作者: zhangshengzhong
    * @文件名: SecondConfig
    * @版本号:1.0
    * @创建日期: 2020/12/7 16:00
    * @描述:
    */
   @Configuration
   @EnableTransactionManagement
   @EnableJpaRepositories(
           //实体管理
           entityManagerFactoryRef="entityManagerFactorySecond",
           //事务管理
           transactionManagerRef="transactionManagerSecond",
           //实体扫描,设置Repository所在位置
           basePackages= { "com.zszdevelop.moredb.repository.second" })
   public class SecondConfig {
   
       @Autowired
       @Qualifier("secondDataSource")
       private DataSource secondDataSource;
   
       @Autowired
       private Environment env;
   
       @Bean(name = "entityManagerSecond")
       public EntityManager entityManager(EntityManagerFactoryBuilder builder) {
           return entityManagerFactorySecond(builder).getObject().createEntityManager();
       }
   
       @Bean(name = "entityManagerFactorySecond")
       public LocalContainerEntityManagerFactoryBean entityManagerFactorySecond (EntityManagerFactoryBuilder builder) {
           return builder
                   .dataSource(secondDataSource)
                   .properties(getVendorProperties())
                   .packages("com.zszdevelop.moredb.domain.second")
                   .persistenceUnit("secondPersistenceUnit")
                   .build();
       }
   
       private Map<String, String> getVendorProperties() {
           Map<String, String> jpaProperties = new HashMap<>(16);
           jpaProperties.put("hibernate.hbm2ddl.auto",  env.getProperty("spring.datasource.second.ddl-auto"));
           jpaProperties.put("hibernate.show_sql", env.getProperty("spring.jpa.show-sql"));
           jpaProperties.put("hibernate.dialect", env.getProperty("spring.jpa.hibernate.Second-dialect"));
           jpaProperties.put("hibernate.format_sql", env.getProperty("spring.jpa.hibernate.format_sql"));
           jpaProperties.put("hibernate.current_session_context_class", "org.springframework.orm.hibernate5.SpringSessionContext");
           return jpaProperties;
       }
   
       @Bean(name = "transactionManagerSecond")
       PlatformTransactionManager transactionManagerSecond(EntityManagerFactoryBuilder builder) {
           return new JpaTransactionManager(entityManagerFactorySecond(builder).getObject());
       }
   }
   
   ```

   ![image-20201207161731505](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201207161731505.png)

至此就已经配置完毕了

## 2. 测试

1. UserPrimaryEntity

   ```java
   package com.zszdevelop.moredb.domain.primary;
   
   import lombok.AccessLevel;
   import lombok.Data;
   import lombok.NoArgsConstructor;
   import lombok.experimental.FieldDefaults;
   
   import javax.persistence.*;
   import java.io.Serializable;
   
   /**
    * @author 作者: zhangshengzhong
    * @文件名: UserPrimaryEntity
    * @版本号:1.0
    * @创建日期: 2020/12/7 16:05
    * @描述:
    */
   @Data
   @Entity
   @NoArgsConstructor
   @Table(name = "t_user")
   @FieldDefaults(level = AccessLevel.PRIVATE)
   public class UserPrimaryEntity implements Serializable {
   
       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       Long id;
   
       /**
        * 名称
        */
       String name;
   
       /**
        * 性别
        */
       String sex;
   }
   ```

   2. UserSecondEntity

   ```java
   package com.zszdevelop.moredb.domain.second;
   
   import lombok.AccessLevel;
   import lombok.Data;
   import lombok.NoArgsConstructor;
   import lombok.experimental.FieldDefaults;
   
   import javax.persistence.*;
   import java.io.Serializable;
   
   /**
    * @author 作者: zhangshengzhong
    * @文件名: UserSecondEntity
    * @版本号:1.0
    * @创建日期: 2020/12/7 16:05
    * @描述:
    */
   @Data
   @Entity
   @NoArgsConstructor
   @Table(name = "t_user")
   @FieldDefaults(level = AccessLevel.PRIVATE)
   public class UserSecondEntity implements Serializable {
   
       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       Long id;
   
       /**
        * 名称
        */
       String name;
   
       /**
        * 性别
        */
       String sex;
   }
   
   ```

   3. UserPrimaryRepository

   ```java
   
   @Repository
   public interface UserPrimaryRepository extends JpaRepository<UserPrimaryEntity, Long> {
   
   }
   
   ```

   4. UserSecondRepository

   ```java
   @Repository
   public interface UserSecondRepository extends JpaRepository<UserSecondEntity, Long> {
   
   }
   ```

   5. 测试类

   ```java
   @SpringBootTest
   class MoredbApplicationTests {
   
   
   	@Autowired
   	private UserPrimaryRepository userPrimaryRepository;
   	@Autowired
   	private UserSecondRepository userSecondRepository;
   
   	@Test
   	void contextLoads() {
   		System.out.println(userPrimaryRepository.findAll());
   		System.out.println(userSecondRepository.findAll());
   	}
   
   }
   ```

   ![image-20201207162216525](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201207162216525.png)

