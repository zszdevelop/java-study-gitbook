# 多数据源的支持

## 1. 简介

在实际开发中，经常可能遇到在一个应用中可能需要访问多个数据库的情况，那么我们如何实现访问不同接口时，指向不同的数据库呢。

## 2. 实现思路

### 2.1 如何侵入性最小实现？

我们需要根据不同的接口访问不同的数据源。对代码侵入最小的肯定是定义注解

### 2.2 支持优先级

希望能同时直接类和方法上使用该注解，先方法，后类，如果方法覆盖了类上的数据源类型，以方法的为准，否则以类上的为准。

实现思路先查方法，再查类就可以了

```java
/**
 * 获取需要切换的数据源
 */
public DataSource getDataSource(ProceedingJoinPoint point)
{
    MethodSignature signature = (MethodSignature) point.getSignature();
    DataSource dataSource = AnnotationUtils.findAnnotation(signature.getMethod(), DataSource.class);
    if (Objects.nonNull(dataSource))
    {
        return dataSource;
    }

    return AnnotationUtils.findAnnotation(signature.getDeclaringType(), DataSource.class);
}
```

### 2.3 切换数据源后，要再切回默认的

如果切换了数据源，那么下一次的数据源应该还要是默认的

- 执行前设置动态数据源
- 执行后清除

```java
if (StringUtils.isNotNull(dataSource))
{
    DynamicDataSourceContextHolder.setDataSourceType(dataSource.value().name());
}

try
{
    return point.proceed();
}
finally
{
    // 销毁数据源 在执行方法之后
    DynamicDataSourceContextHolder.clearDataSourceType();
}
```

### 2.4 如何切换数据源

Spring boot提供了AbstractRoutingDataSource 根据用户定义的规则选择当前的数据源。我们可以借助他实现

### 2.5 切换后如何不影响其他程序

使用ThreadLocal维护变量，ThreadLocal为每个使用该变量的线程提供独立的变量副本，所以每一个线程都可以独立地改变自己的副本，而不会影响其它线程所对应的副本。

## 3. 多数据源使用

1. 在`application-druid.yml`配置从库数据源

   ```java
   # 从库数据源
   slave:
     # 从数据源开关/默认关闭
     enabled: true
     url: jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
     username: root
     password: password
   ```

2. 在`DataSourceType`类添加数据源枚举

   ```java
   /**
    * 从库
    */
   SLAVE
   ```

3. 在`DruidConfig`配置读取数据源

   ```java
   @Bean
   @ConfigurationProperties("spring.datasource.druid.slave")
   @ConditionalOnProperty(prefix = "spring.datasource.druid.slave", name = "enabled", havingValue = "true")
   public DataSource slaveDataSource(DruidProperties druidProperties)
   {
   	DruidDataSource dataSource = DruidDataSourceBuilder.create().build();
   	return druidProperties.dataSource(dataSource);
   }
   ```

4. 在`DruidConfig`类`dataSource`方法添加数据源

   ```java
   setDataSource(targetDataSources, DataSourceType.SLAVE.name(), "slaveDataSource");
   ```

5. 在需要使用多数据源方法或类上添加`@DataSource`注解，其中`value`用来表示数据源

   ```java
   @DataSource(value = DataSourceType.SLAVE)
   public List<SysUser> selectUserList(SysUser user)
   {
   	return userMapper.selectUserList(user);
   }
   ```

   ```java
   @Service
   @DataSource(value = DataSourceType.SLAVE)
   public class SysUserServiceImpl
   ```

## 4. 手动切换数据源

在需要切换数据源的方法中使用`DynamicDataSourceContextHolder`类实现手动切换，使用方法如下：

```java
public List<SysUser> selectUserList(SysUser user)
{
	DynamicDataSourceContextHolder.setDataSourceType(DataSourceType.SLAVE.name());
	List<SysUser> userList = userMapper.selectUserList(user);
	DynamicDataSourceContextHolder.clearDataSourceType();
	return userList;
}
```



## 5. 具体实现

### 5.1 定义注解@DataSource

```java
/**
 * 自定义多数据源切换注解
 *
 * 优先级：先方法，后类，如果方法覆盖了类上的数据源类型，以方法的为准，否则以类上的为准
 *
 * @author ygn
 */
@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface DataSource
{
    /**
     * 切换数据源名称
     */
    public DataSourceType value() default DataSourceType.MASTER;
}
```

### 5.2 数据源类型

根据我们实际需求，定义不同数据源。可以根据多种情况划分，如

- 主从划分

- 业务划分

  A业务数据库,B业务数据库。

```java
/**
 * 数据源
 * 
 * @author ygn
 */
public enum DataSourceType
{
    /**
     * 主库
     */
    MASTER,

    /**
     * 从库
     */
    SLAVE
}

```

### 5.3 数据源配置

```java
/**
 * druid 配置多数据源
 * 
 * @author ygn
 */
@Configuration
public class DruidConfig
{
    @Bean
    @ConfigurationProperties("spring.datasource.druid.master")
    public DataSource masterDataSource(DruidProperties druidProperties)
    {
        DruidDataSource dataSource = DruidDataSourceBuilder.create().build();
        return druidProperties.dataSource(dataSource);
    }

    @Bean
    @ConfigurationProperties("spring.datasource.druid.slave")
    @ConditionalOnProperty(prefix = "spring.datasource.druid.slave", name = "enabled", havingValue = "true")
    public DataSource slaveDataSource(DruidProperties druidProperties)
    {
        DruidDataSource dataSource = DruidDataSourceBuilder.create().build();
        return druidProperties.dataSource(dataSource);
    }

    @Bean(name = "dynamicDataSource")
    @Primary
    public DynamicDataSource dataSource(DataSource masterDataSource)
    {
        Map<Object, Object> targetDataSources = new HashMap<>();
        targetDataSources.put(DataSourceType.MASTER.name(), masterDataSource);
        setDataSource(targetDataSources, DataSourceType.SLAVE.name(), "slaveDataSource");
        return new DynamicDataSource(masterDataSource, targetDataSources);
    }
    
    /**
     * 设置数据源
     * 
     * @param targetDataSources 备选数据源集合
     * @param sourceName 数据源名称
     * @param beanName bean名称
     */
    public void setDataSource(Map<Object, Object> targetDataSources, String sourceName, String beanName)
    {
        try
        {
            DataSource dataSource = SpringUtils.getBean(beanName);
            targetDataSources.put(sourceName, dataSource);
        }
        catch (Exception e)
        {
        }
    }

    /**
     * 去除监控页面底部的广告
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @Bean
    @ConditionalOnProperty(name = "spring.datasource.druid.statViewServlet.enabled", havingValue = "true")
    public FilterRegistrationBean removeDruidFilterRegistrationBean(DruidStatProperties properties)
    {
        // 获取web监控页面的参数
        DruidStatProperties.StatViewServlet config = properties.getStatViewServlet();
        // 提取common.js的配置路径
        String pattern = config.getUrlPattern() != null ? config.getUrlPattern() : "/druid/*";
        String commonJsPattern = pattern.replaceAll("\\*", "js/common.js");
        final String filePath = "support/http/resources/js/common.js";
        // 创建filter进行过滤
        Filter filter = new Filter()
        {
            @Override
            public void init(javax.servlet.FilterConfig filterConfig) throws ServletException
            {
            }
            @Override
            public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
                    throws IOException, ServletException
            {
                chain.doFilter(request, response);
                // 重置缓冲区，响应头不会被重置
                response.resetBuffer();
                // 获取common.js
                String text = Utils.readFromResource(filePath);
                // 正则替换banner, 除去底部的广告信息
                text = text.replaceAll("<a.*?banner\"></a><br/>", "");
                text = text.replaceAll("powered.*?shrek.wang</a>", "");
                response.getWriter().write(text);
            }
            @Override
            public void destroy()
            {
            }
        };
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        registrationBean.setFilter(filter);
        registrationBean.addUrlPatterns(commonJsPattern);
        return registrationBean;
    }
}

```

### 5.4 DataSourceAspect 拦截器

```java
/**
 * 多数据源处理
 * 
 * @author ygn
 */
@Aspect
@Order(1)
@Component
public class DataSourceAspect
{
    protected Logger logger = LoggerFactory.getLogger(getClass());

    @Pointcut("@annotation(com.ygn.common.annotation.DataSource)"
            + "|| @within(com.ygn.common.annotation.DataSource)")
    public void dsPointCut()
    {

    }

    @Around("dsPointCut()")
    public Object around(ProceedingJoinPoint point) throws Throwable
    {
        DataSource dataSource = getDataSource(point);

        if (StringUtils.isNotNull(dataSource))
        {
            DynamicDataSourceContextHolder.setDataSourceType(dataSource.value().name());
        }

        try
        {
            return point.proceed();
        }
        finally
        {
            // 销毁数据源 在执行方法之后
            DynamicDataSourceContextHolder.clearDataSourceType();
        }
    }

    /**
     * 获取需要切换的数据源
     */
    public DataSource getDataSource(ProceedingJoinPoint point)
    {
        MethodSignature signature = (MethodSignature) point.getSignature();
        DataSource dataSource = AnnotationUtils.findAnnotation(signature.getMethod(), DataSource.class);
        if (Objects.nonNull(dataSource))
        {
            return dataSource;
        }

        return AnnotationUtils.findAnnotation(signature.getDeclaringType(), DataSource.class);
    }
}
```

### 5.5 数据源切换处理

```java
/**
 * 数据源切换处理
 * 
 * @author ygn
 */
public class DynamicDataSourceContextHolder
{
    public static final Logger log = LoggerFactory.getLogger(DynamicDataSourceContextHolder.class);

    /**
     * 使用ThreadLocal维护变量，ThreadLocal为每个使用该变量的线程提供独立的变量副本，
     *  所以每一个线程都可以独立地改变自己的副本，而不会影响其它线程所对应的副本。
     */
    private static final ThreadLocal<String> CONTEXT_HOLDER = new ThreadLocal<>();

    /**
     * 设置数据源的变量
     */
    public static void setDataSourceType(String dsType)
    {
        log.info("切换到{}数据源", dsType);
        CONTEXT_HOLDER.set(dsType);
    }

    /**
     * 获得数据源的变量
     */
    public static String getDataSourceType()
    {
        return CONTEXT_HOLDER.get();
    }

    /**
     * 清空数据源变量
     */
    public static void clearDataSourceType()
    {
        CONTEXT_HOLDER.remove();
    }
}

```

### 5.6 动态数据源

```java
/**
 * 动态数据源
 * 
 * @author ygn
 */
public class DynamicDataSource extends AbstractRoutingDataSource
{
    public DynamicDataSource(DataSource defaultTargetDataSource, Map<Object, Object> targetDataSources)
    {
        super.setDefaultTargetDataSource(defaultTargetDataSource);
        super.setTargetDataSources(targetDataSources);
        super.afterPropertiesSet();
    }

    @Override
    protected Object determineCurrentLookupKey()
    {
        return DynamicDataSourceContextHolder.getDataSourceType();
    }
}
```

#### 5.6.1 AbstractRoutingDataSource实现动态数据源切换

Spring boot提供了AbstractRoutingDataSource 根据用户定义的规则选择当前的数据源，这样我们可以在执行查询之前，设置使用的数据源。实现可动态路由的数据源，在每次数据库查询操作前执行。**它的抽象方法 determineCurrentLookupKey() 决定使用哪个数据源**。

## 参考文章

[若依官方文档](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%A4%9A%E6%95%B0%E6%8D%AE%E6%BA%90)

[spring boot使用AbstractRoutingDataSource实现动态数据源切换](https://blog.csdn.net/qq_37502106/article/details/91044952)

