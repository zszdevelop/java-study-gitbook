# Druid多数据源配置

本篇介绍在 SpringBoot 下如何配置Druid 多数据源

## 集成步骤目录

1. 引入jar包
2. 设置配置参数
3. 编写配置文件与
   1. 编写数据源常量/枚举
   2. 创建动态数据源
   3. 动态数据源配置
   4. 定义动态数据源注解
   5. 设置数据源 AOP 代理
4. 修改启动文件

## 具体集成步骤

### 1.引入jar包

以我们公司项目为例，数据库主要使用`oracle` 和 国产数据库 `gbase`

```
<!-- oracle驱动 -->
<dependency>
   <groupId>com.oracle</groupId>
   <artifactId>ojdbc6</artifactId>
   <version>11.2.0.4.0</version>
</dependency>


<!--ifxjdbc gbase-->
<dependency>
   <groupId>com.informix</groupId>
   <artifactId>ifxjdbc</artifactId>
   <version>1.0.1</version>
</dependency>

<!-- druid数据源驱动 -->
<dependency>
   <groupId>com.alibaba</groupId>
   <artifactId>druid-spring-boot-starter</artifactId>
   <version>1.1.10</version>
</dependency>

```

 ### 2.配置参数

```
spring:
  profiles: dev
  application:
    name: app-platform
  datasource:
    druid:
      orac: #数据源1 oracle  
        # 数据库访问配置, 使用druid数据源
        type: com.alibaba.druid.pool.DruidDataSource
        driver-class-name: oracle.jdbc.driver.OracleDriver
        url: jdbc:oracle:thin:@192.168.0.xx:1521:orcl
        username: username
        password: password
      gbase:#数据源2 gbase  
        driver-class-name: com.informix.jdbc.IfxDriver
        type: com.alibaba.druid.pool.DruidDataSource
        name: test
        url: jdbc:informix-sqli://192.168.0.xx:9088/app_lzf:INFORMIXSERVER=gbaseserver;
        username: myusername
        password: mypassword
```

###3.编写配置文件

####3.1.定义数据源名称常量

```
public interface DataSourceNames {
    String ORAC = "orac";
    String GBASE = "gbase";
}
```

#### 3.2 创建动态数据源

```
/**
 * 动态数据源
 */
public class DynamicDataSource extends AbstractRoutingDataSource {
    private static final ThreadLocal<String> contextHolder = new ThreadLocal<>();

    /**
     * 配置DataSource, defaultTargetDataSource为主数据库
     */
    public DynamicDataSource(DataSource defaultTargetDataSource, Map<Object, Object> targetDataSources) {
        super.setDefaultTargetDataSource(defaultTargetDataSource);
        super.setTargetDataSources(targetDataSources);
        super.afterPropertiesSet();
    }

    @Override
    protected Object determineCurrentLookupKey() {
        return getDataSource();
    }

    public static void setDataSource(String dataSource) {
        contextHolder.set(dataSource);
    }

    public static String getDataSource() {
        return contextHolder.get();
    }

    public static void clearDataSource() {
        contextHolder.remove();
    }

}
```

#### 3.3 动态数据源配置

```

/**
 * 配置多数据源
 */
@Configuration
public class DynamicDataSourceConfig {

    /**
     * 创建 DataSource Bean
     * */

    @Bean
    @ConfigurationProperties("spring.datasource.druid.orac")
    public DataSource oneDataSource(){
        DataSource dataSource = DruidDataSourceBuilder.create().build();
        return dataSource;
    }

    @Bean
    @ConfigurationProperties("spring.datasource.druid.gbase")
    public DataSource twoDataSource(){
        DataSource dataSource = DruidDataSourceBuilder.create().build();
        return dataSource;
    }

    /**
     * 如果还有数据源,在这继续添加 DataSource Bean
     * */

    @Bean
    @Primary
    public DynamicDataSource dataSource(DataSource oneDataSource, DataSource twoDataSource) {
        Map<Object, Object> targetDataSources = new HashMap<>(2);
        targetDataSources.put(DataSourceNames.ORAC, oneDataSource);
        targetDataSources.put(DataSourceNames.GBASE, twoDataSource);
        // 还有数据源,在targetDataSources中继续添加
        System.out.println("DataSources:" + targetDataSources);
        return new DynamicDataSource(oneDataSource, targetDataSources);
    }
}

```

#### 3.4.定义动态数据源注解:

```
/**
 * 多数据源注解
 */
@Documented
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface DataSource {
    String value() default DataSourceNames.ORAC;
}
```

#### 3.4 设置数据源 AOP 代理:

```java
/**
 * 数据源AOP切面处理
 */
@Aspect
@Component
public class DataSourceAspect implements Ordered {
    protected Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * 切点: 所有配置 DataSource 注解的方法
     */
    @Pointcut("@annotation(com.ylzinfo.common.druid.DataSource)")
    public void dataSourcePointCut() {}

    @Around("dataSourcePointCut()")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        MethodSignature signature = (MethodSignature) point.getSignature();
        Method method = signature.getMethod();
        DataSource ds = method.getAnnotation(DataSource.class);
        // 通过判断 DataSource 中的值来判断当前方法应用哪个数据源
        DynamicDataSource.setDataSource(ds.value());
        System.out.println("当前数据源: " + ds.value());
        logger.debug("set datasource is " + ds.value());
        try {
            return point.proceed();
        } finally {
            DynamicDataSource.clearDataSource();
            logger.debug("clean datasource");
        }
    }

    @Override
    public int getOrder() {
        return 1;
    }
}
```

### 4.修改启动文件

如果设置了动态数据源，那么需要将自有的配置依赖去除(DataSourceAutoConfiguration)

```
@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class AppPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppPlatformApplication.class, args);
	}

}

```



## 参考博客

[SpringBoot--Druid多数据源配置](<https://my.oschina.net/u/3681868/blog/1813011>)

[Druid配置](<https://gitee.com/wenshao/druid/tree/master/druid-spring-boot-starter>)