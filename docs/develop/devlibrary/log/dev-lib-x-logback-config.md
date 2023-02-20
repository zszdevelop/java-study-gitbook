---
order: 10
category:
  - Log
---

# logback配置与使用

## 1. 简介

logback是java的日志开源组件，是log4j创始人写的，性能比log4j要好。

主要分为3个模块

1. logback-core:核心代码模块
2. ogback-classic:log4j的一个改良版本，同时实现了`slf4j`的接口，这样你如果之后要切换其他日志组件也是一件很容易的事
3. logback-access:访问模块与Servlet容器集成提供通过Http来访问日志的功能

## 2. 集成使用

1. 引入maven依赖

   ```xml
   <!--这个依赖直接包含了 logback-core 以及 slf4j-api的依赖-->
   <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.2.3</version>
   </dependency>
   ```

2. slf4j的接口获取Logger输出日志

   ```java
   //这是slf4j的接口，由于我们引入了logback-classic依赖，所以底层实现是logback
   private static final Logger LOGGER = LoggerFactory.getLogger(Test.class);
   
   public static void main(String[] args) throws InterruptedException {
       LOGGER.info("hello world");
   }
   ```

## 3.  基础知识

### 3.1 配置获取顺序

logback在启动的时候，会按照下面的顺序加载配置文件

1. 如果java程序启动时指定了`logback.configurationFile`属性，就用该属性指定的配置文件。如`java -Dlogback.configurationFile=/path/to/mylogback.xml Test` ，这样执行Test类的时候就会加载/path/to/mylogback.xml配置
2. 在classpath中查找  **logback.groovy** 文件
3. 在classpath中查找  **logback-test.xml** 文件
4. 在classpath中查找  **logback.xml** 文件
5. 如果是 jdk6+,那么会调用ServiceLoader 查找 com.qos.logback.classic.spi.**Configurator**接口的第一个实现类
6. 自动使用**ch.qos.logback.classic.BasicConfigurator**,在控制台输出日志

上面的顺序表示优先级，使用java -D配置的优先级最高，只要获取到配置后就不会再执行下面的流程。相关代码可以看`ContextInitializer#autoConfig()`方法。

```java
public class ContextInitializer {

    final public static String GROOVY_AUTOCONFIG_FILE = "logback.groovy";
    final public static String AUTOCONFIG_FILE = "logback.xml";
    final public static String TEST_AUTOCONFIG_FILE = "logback-test.xml";
    final public static String CONFIG_FILE_PROPERTY = "logback.configurationFile";

public void autoConfig() throws JoranException {
        StatusListenerConfigHelper.installIfAsked(loggerContext);
        URL url = findURLOfDefaultConfigurationFile(true);
        if (url != null) {
            configureByResource(url);
        } else {
            Configurator c = EnvUtil.loadFromServiceLoader(Configurator.class);
            if (c != null) {
                try {
                    c.setContext(loggerContext);
                    c.configure(loggerContext);
                } catch (Exception e) {
                    throw new LogbackException(String.format("Failed to initialize Configurator: %s using ServiceLoader", c != null ? c.getClass()
                                    .getCanonicalName() : "null"), e);
                }
            } else {
                BasicConfigurator basicConfigurator = new BasicConfigurator();
                basicConfigurator.setContext(loggerContext);
                basicConfigurator.configure(loggerContext);
            }
        }
    }

public URL findURLOfDefaultConfigurationFile(boolean updateStatus) {
        ClassLoader myClassLoader = Loader.getClassLoaderOfObject(this);
        URL url = findConfigFileURLFromSystemProperties(myClassLoader, updateStatus);
        if (url != null) {
            return url;
        }

        url = getResource(TEST_AUTOCONFIG_FILE, myClassLoader, updateStatus);
        if (url != null) {
            return url;
        }

        url = getResource(GROOVY_AUTOCONFIG_FILE, myClassLoader, updateStatus);
        if (url != null) {
            return url;
        }

        return getResource(AUTOCONFIG_FILE, myClassLoader, updateStatus);
    }
}
```

### 3.2 关于SLF4j的日志输出级别

在slf4j中，从小到大的日志级别依旧是`trace、debug、info、warn、error`。

```java
public final class Level implements java.io.Serializable {

    private static final long serialVersionUID = -814092767334282137L;

    public static final int OFF_INT = Integer.MAX_VALUE;
    public static final int ERROR_INT = 40000;
    public static final int WARN_INT = 30000;
    public static final int INFO_INT = 20000;
    public static final int DEBUG_INT = 10000;
    public static final int TRACE_INT = 5000;
    public static final int ALL_INT = Integer.MIN_VALUE;
}
```

## 4. logback.xml 配置

### 4.1 logback.xml 配置样例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration debug="true" scan="true" scanPeriod="1 seconds">
    <!-- 日志存放路径 -->
	<property name="log.path" value="./logs" />
    <!-- 日志输出格式 -->
	<property name="log.pattern" value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{20} - [%method,%line] - %msg%n" />

	<!-- 控制台输出 -->
	<appender name="console" class="ch.qos.logback.core.ConsoleAppender">
		<encoder>
			<pattern>${log.pattern}</pattern>
		</encoder>
	</appender>
	
	<!-- 系统日志输出 -->
	<appender name="file_log" class="ch.qos.logback.core.rolling.RollingFileAppender">
	    <file>${log.path}/sys-log.log</file>
        <!-- 循环政策：基于时间创建日志文件 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 日志文件名格式 -->
            <fileNamePattern>${log.path}/sys-log.%d{yyyy-MM-dd}.log</fileNamePattern>
            <!-- 日志最大的历史 7天 -->
            <maxHistory>7</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>${log.pattern}</pattern>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>info</level>
        </filter>
	</appender>
	
	<appender name="file_error" class="ch.qos.logback.core.rolling.RollingFileAppender">
	    <file>${log.path}/sys-error.log</file>
        <!-- 循环政策：基于时间创建日志文件 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 日志文件名格式 -->
            <fileNamePattern>${log.path}/sys-error.%d{yyyy-MM-dd}.log</fileNamePattern>
			<!-- 日志最大的历史 60天 -->
			<maxHistory>60</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>${log.pattern}</pattern>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <!-- 过滤的级别 -->
            <level>ERROR</level>
			<!-- 匹配时的操作：接收（记录） -->
            <onMatch>ACCEPT</onMatch>
			<!-- 不匹配时的操作：拒绝（不记录） -->
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>
	
<!-- 用户访问日志输出  -->
    <appender name="sys-user" class="ch.qos.logback.core.rolling.RollingFileAppender">
		<file>${log.path}/sys-user.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 按天回滚 daily -->
            <fileNamePattern>${log.path}/sys-user.%d{yyyy-MM-dd}.log</fileNamePattern>
            <!-- 日志最大的历史 60天 -->
            <maxHistory>60</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>${log.pattern}</pattern>
        </encoder>
    </appender>
	
	<!-- 系统模块日志级别控制  -->
	<logger name="com.ygn" level="info" />
	<!-- Spring日志级别控制  -->
	<logger name="org.springframework" level="warn" />

	<root level="info">
		<appender-ref ref="console" />
	</root>
	
	<!--系统操作日志-->
    <root level="info">
        <appender-ref ref="file_log" />
        <appender-ref ref="file_error" />
    </root>
  
  
	<!--系统用户操作日志-->
    <logger name="sys-user" level="info">
        <appender-ref ref="sys-user"/>
    </logger>
	
</configuration> 
```

### 4.2 配置详解

#### 4.2.1 configuration节点相关属性

| 属性名称   | 默认值    | 介绍                                                         |
| ---------- | --------- | ------------------------------------------------------------ |
| debug      | false     | 要不要打印 logback内部日志信息，true则表示要打印。建议开启   |
| scan       | true      | 配置发送改变时，要不要重新加载                               |
| scanPeriod | 1 seconds | 检测配置发生变化的时间间隔。如果没给出时间单位，默认时间单位是毫秒 |

#### 4.2.2 configuration子节点介绍

##### 4.2.2.1 contextName节点

设置日志上下文名称，后面输出格式中可以通过定义 %contextName 来打印日志上下文名称

##### 4.2.2.2 property节点

用来设置相关变量,通过key-value的方式配置，然后在后面的配置文件中通过 ${key}来访问

##### 4.2.2.3 appender 节点

日志输出组件，主要负责日志的输出以及格式化日志。常用的属性有name和class

| 属性名称 | 默认值   | 介绍                                                         |
| -------- | -------- | ------------------------------------------------------------ |
| name     | 无默认值 | appender组件的名称，后面给logger指定appender使用             |
| class    | 无默认值 | appender的具体实现类。常用的有 ConsoleAppender、FileAppender、RollingFileAppender |

- **ConsoleAppender**：向控制台输出日志内容的组件，只要定义好encoder节点就可以使用。
- **FileAppender**：向文件输出日志内容的组件，用法也很简单，不过由于没有日志滚动策略，一般很少使用

- **RollingFileAppender**：向文件输出日志内容的组件，同时可以配置日志文件滚动策略，在日志达到一定条件后生成一个新的日志文件。

  - appender节点中有一个子节点`filter`，配置具体的过滤器，比如上面的例子配置了一个内置的过滤器ThresholdFilter，然后设置了level的值为INFO。这样用这个appender输出日志的时候都会经过这个过滤器，日志级别低于INFO的都不会输出来。

  - 在RollingFileAppender中，可以配置相关的滚动策略，具体可以看配置样例的注释。

##### 4.2.2.4 logger以及root节点

root节点和logger节点其实都是表示`Logger`组件。可以把他们之间的关系可以理解为父子关系，root是最顶层的logger，正常情况getLogger("name/class")没有找到对应logger的情况下，都是使用root节点配置的logger。

如果配置了logger，并且通过getLogger("name/class")获取到这个logger，输出日志的时候，就会使用这个logger配置的appender输出，同时还会使用rootLogger配置的appender。我们可以使用logger节点的`additivity="false"`属性来屏蔽rootLogger的appender。这样就可以不使用rootLogger的appender输出日志了。

## 5. 实现原理

### 5.1 slf4j是什么

slf4j只是一套标准，通俗来讲，就是定义了一系列接口，它并不提供任何的具体实现。所以，我们使用这套接口进行开发，可以任意的切换底层的实现框架。

比如，一开始项目用的是log4j的实现，后来发现log4j的性能太差了，想换成logback，由于我们代码中都是面向slf4j接口的，这样我们只要吧log4j的依赖换成logback就可以了。

### 5.2 logback-classic启动原理

我们在调用`LoggerFactory.getLogger(Test.class)`时，这些接口或者类都是slf4j的，那么，它是怎么切换到logback的实现的呢？

我们查看`logback-classic`源码，可以看到slf4j的包.

![image-20211102215616105](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211102215616105.png)

**slf4j在初始化时会调用`org.slf4j.StaticLoggerBinder`进行初始化！！！**。因此，每个要实现slf4j的日志组件项目，底下都要有`org.slf4j.StaticLoggerBinder`的具体实现。这样slf4j才会在初始化的关联到具体的实现。

比如logback在自己定义的StaticLoggerBinder做了自己组件的初始化工作。下面是网上找的一个时序图：

![image-20211102215812812](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211102215812812.png)

## 参考文章

[logback介绍和配置详解](https://www.jianshu.com/p/04065d8cb2a9)

