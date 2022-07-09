# P6Spy监控你的SQL输出

>mybatis 的日志只有基础sql语句，并没有完整的sql日志，在开发环境上排查问题实在太麻烦了

## 1. 简介

P6Spy是一个可以用来在应用程序中拦截和修改数据操作语句的开源框架。通过P6Spy我们可以对SQL语句进行拦截，相当于一个SQL语句的记录器，这样我们可以用它来作相关的分析，比如性能分析。

P6SPY提供了如下几个功能：

-  记录SQL语句的执行时间戳。

- 记录SQL语句类型。

- 记录SQL填入参数的和没有填入参数的SQL语句。

- 根据配置的时间控制SQL语句的执行时间，对超出时间的SQL语句输出到日志文件中。

## 2. 集成配置

配置步骤：

### 2.1 依赖

```xml
<dependency>
   <groupId>p6spy</groupId>
   <artifactId>p6spy</artifactId>
   <version>3.9.1</version>
</dependency>
```

### 2.2 替换JDBC驱动

将你的JDBC驱动替换为

```applescript
# 修改 JDBC 驱动为如下 P6SpyDriver 配置
# 之前为：
# spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.driver-class-name=com.p6spy.engine.spy.P6SpyDriver
```

### 2.3 修改数据库地址

修改spring.datasource.url

```ini
# 注意是 jdbc:p6spy:mysql
spring.datasource.url=jdbc:p6spy:mysql://127.0.0.1:3306/test?useUnicode=true&characterEncoding=UTF-8
```

### 2.4 添加配置文件 spy.properties

```ini
module.log=com.p6spy.engine.logging.P6LogFactory,com.p6spy.engine.outage.P6OutageFactory
# 自定义日志打印,改成你自定义配置类的全类名
logMessageFormat=com.zszdevelop.test.aop.P6SpyLogger
# 使用日志系统记录sql
appender=com.p6spy.engine.spy.appender.Slf4JLogger
## 配置记录Log例外
excludecategories=info,debug,result,commit,resultset
# 设置使用p6spy driver来做代理
deregisterdrivers=true
# 日期格式
dateformat=yyyy-MM-dd HH:mm:ss
# 实际驱动
driverlist=com.mysql.jdbc.Driver
# 是否开启慢SQL记录
#outagedetection=true
# 慢SQL记录标准 秒
#outagedetectioninterval=2
```

注意：

```ini
# 自定义日志打印,改成你自定义配置类的全类名
logMessageFormat=com.zszdevelop.test.aop.P6SpyLogger
```

### 2.5 自定义日志打印

可以把 mybatis 占位符填进去，输入完整的sql日志

>自己想怎么打日志就怎么打

```java

/**
 * 自定义日志
 * 默认com.p6spy.engine.spy.appender.SingleLineFormat
 *
 * @author zsz
 * @date 2022-06-16
 */
public class P6SpyLogger implements MessageFormattingStrategy {

    /**
     * 日志格式
     *
     * @param connectionId 连接id
     * @param now          当前时间
     * @param elapsed      耗时多久
     * @param category     类别
     * @param prepared     mybatis带占位符的sql
     * @param sql          占位符换成参数的sql
     * @param url          sql连接的 url
     * @return 自定义格式日志
     */
    @Override
    public String formatMessage(int connectionId, String now, long elapsed, String category, String prepared, String sql, String url) {
        String log = null;

        if (StringUtils.isNotBlank(sql)) {
            log = String.format("\n-----------  SQL执行时间：%s   SQL执行耗时：%s ms  -----------\n 执行的 SQL语句：%s\n", now, elapsed, sql.replaceAll("[\\s]+", " "));
        } else {
            log = "";
        }
        return log;
    }

}

```

## 3. spy.properties详细说明

```ini
# 指定应用的日志拦截模块,默认为com.p6spy.engine.spy.P6SpyFactory
modulelist=com.p6spy.engine.spy.P6SpyFactory,com.p6spy.engine.logging.P6LogFactory,com.p6spy.engine.outage.P6OutageFactory
# 真实JDBC driver , 多个以 逗号 分割 默认为空
driverlist=
# 是否自动刷新 默认 flase
autoflush=false
# 配置SimpleDateFormat日期格式 默认为空
dateformat=
# 打印堆栈跟踪信息 默认flase
stacktrace=false
# 如果 stacktrace=true，则可以指定具体的类名来进行过滤。
stacktraceclass=
# 监测属性配置文件是否进行重新加载
reloadproperties=false
# 属性配置文件重新加载的时间间隔，单位:秒 默认60s
reloadpropertiesinterval=60
# 指定 Log 的 appender，取值：
appender=com.p6spy.engine.spy.appender.Slf4JLogger
appender=com.p6spy.engine.spy.appender.StdoutLogger
appender=com.p6spy.engine.spy.appender.FileLogger
# 指定 Log 的文件名 默认 spy.log
logfile=spy.log
# 指定是否每次是增加 Log，设置为 false 则每次都会先进行清空 默认true
append=true
# 指定日志输出样式 默认为com.p6spy.engine.spy.appender.SingleLineFormat , 单行输出 不格式化语句
logMessageFormat=com.p6spy.engine.spy.appender.SingleLineFormat
# 也可以采用 com.p6spy.engine.spy.appender.CustomLineFormat 来自定义输出样式, 默认值是%(currentTime)|%(executionTime)|%(category)|connection%(connectionId)|%(sqlSingleLine)
# 可用的变量为:
# %(connectionId) connection id
# %(currentTime) 当前时间
# %(executionTime) 执行耗时
# %(category) 执行分组
# %(effectiveSql) 提交的SQL 换行
# %(effectiveSqlSingleLine) 提交的SQL 不换行显示
# %(sql) 执行的真实SQL语句，已替换占位
# %(sqlSingleLine) 执行的真实SQL语句，已替换占位 不换行显示
customLogMessageFormat=%(currentTime)|%(executionTime)|%(category)|connection%(connectionId)|%(sqlSingleLine)
# date类型字段记录日志时使用的日期格式 默认dd-MMM-yy
databaseDialectDateFormat=dd-MMM-yy
# boolean类型字段记录日志时使用的日期格式 默认boolean 可选值numeric
databaseDialectBooleanFormat=boolean
# 是否通过jmx暴露属性 默认true
jmx=true
# 如果jmx设置为true 指定通过jmx暴露属性时的前缀 默认为空
# com.p6spy(.<jmxPrefix>)?:name=<optionsClassName>
jmxPrefix=
# 是否显示纳秒 默认false
useNanoTime=false
# 实际数据源 JNDI
realdatasource=/RealMySqlDS
# 实际数据源 datasource class
realdatasourceclass=com.mysql.jdbc.jdbc2.optional.MysqlDataSource
# 实际数据源所携带的配置参数 以 k=v 方式指定 以 分号 分割
realdatasourceproperties=port;3306,serverName;myhost,databaseName;jbossdb,foo;bar
# jndi数据源配置
# 设置 JNDI 数据源的 NamingContextFactory。
jndicontextfactory=org.jnp.interfaces.NamingContextFactory
# 设置 JNDI 数据源的提供者的 URL。
jndicontextproviderurl=localhost:1099
# 设置 JNDI 数据源的一些定制信息，以分号分隔。
jndicontextcustom=java.naming.factory.url.pkgs;org.jboss.naming:org.jnp.interfaces
# 是否开启日志过滤 默认false， 这项配置是否生效前提是配置了 include/exclude/sqlexpression
filter=false
# 过滤 Log 时所包含的表名列表，以逗号分隔 默认为空
include=
# 过滤 Log 时所排除的表名列表，以逗号分隔 默认为空
exclude=
# 过滤 Log 时的 SQL 正则表达式名称 默认为空
sqlexpression=
#显示指定过滤 Log 时排队的分类列表，取值: error, info, batch, debug, statement,
#commit, rollback, result and resultset are valid values
# (默认 info,debug,result,resultset,batch)
excludecategories=info,debug,result,resultset,batch
# 是否过滤二进制字段
# (default is false)
excludebinary=false
# P6Log 模块执行时间设置，整数值 (以毫秒为单位)，只有当超过这个时间才进行记录 Log。默认为0
executionThreshold=
# P6Outage 模块是否记录较长时间运行的语句 默认false
outagedetection=true|false
# P6Outage 模块执行时间设置，整数值 （以秒为单位)），只有当超过这个时间才进行记录 Log。默认30s
outagedetectioninterval=integer time (seconds)
```

## 4. 相关问题

### 4.1 配置了exclude 不生效

切记要先开启过滤：filter=true

```ini
# 是否开启日志过滤 默认false， 这项配置是否生效前提是配置了 include/exclude/sqlexpression
filter=true
# 过滤 Log 时所排除的表名列表，以逗号分隔 默认为空
exclude=QRTZ_*
```

### 4.2 总是打印空日志

我们debug 可以看到打印空日志的时候。他的category 为commit,所以我们要排除commit 即可

```ini
## 配置记录Log例外
excludecategories=info,debug,result,commit,resultset
```

![image-20220622092110715](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622092110715.png)

## 参考文章

[使用P6Spy监控你的SQL输出](https://segmentfault.com/a/1190000038714503)

[p6spy配置详解](https://blog.csdn.net/li521wang/article/details/104002897)