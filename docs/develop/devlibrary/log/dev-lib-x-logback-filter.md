---
order: 30
category:
  - Log

---

# logback日志过滤Filter

## 1. 简介

当我们需要对日志的打印要做一些范围的控制的时候，通常都是通过为各个Appender设置不同的Filter配置来实现。在Logback中自带了两个过滤器实现：

- `ch.qos.logback.classic.filter.LevelFilter`

  通过比较日志级别来控制日志输出

- `ch.qos.logback.classic.filter.ThresholdFilter`

  实现了只记录特定级别以上级别的控制

## 2. 原生过滤器

### 2.1 LevelFilter

`ch.qos.logback.classic.filter.LevelFilter`过滤器的作用是通过比较日志级别来控制日志输出。下面是一个只记录日志级别为ERROR的例子

```xml
<appender name="ERROR_APPENDER" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>logs/error.log</file>ds
    <filter class="ch.qos.logback.classic.filter.LevelFilter">
        <level>ERROR</level>
        <onMatch>ACCEPT</onMatch>
        <onMismatch>DENY</onMismatch>
    </filter>
    <encoder>
        <pattern>%-4relative [%thread] %-5level %logger{30} - %msg%n</pattern>
    </encoder>
</appender>    
```

`LevelFilter`通过定义日志级别，并设置匹配与不匹配的处理策略来控制针对某个级别日志的输出策略。当我们要设置多个不同级别的日志策略的时候，如果仅依靠这个过滤器，我们就要级联的定义多个filter来控制才能实现，不是很方便，所以此时我们就可以使用`ch.qos.logback.classic.filter.ThresholdFilter`过滤器来控制了

### 2.2 ThresholdFilter

实现了只记录WARN及以上级别的控制，比WARN级别低（如：INFO、DEBUG、TRACE）都不会记录。

```xml
<appender name="WARN_APPENDER" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>logs/warn_error.log</file>
    <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
        <level>WARN</level>
    </filter>
    <encoder>
        <pattern>%-4relative [%thread] %-5level %logger{30} - %msg%n</pattern>
    </encoder>
</appender>    
```

## 3. 自定义过滤器

我们有些需求更加复杂。需要自定义复杂的过滤规则，比如想过滤掉一些框架中的日志，通过自带的几个过滤器已经无法完全控制，并且也不希望修改框架源码来实现。这个时候，我们就可以自己来实现过滤器，并配置使用。实现的方式也很简单，只需要实现Logback提供的`ch.qos.logback.core.filter.Filter`接口即可。

### 3.1 自定义过滤器实现

```java
public class MyFilter extends Filter<ILoggingEvent> {

    @Override
    public FilterReply decide(ILoggingEvent event) {
        if (event.getLevel() == Level.ERROR) {
            switch (event.getLoggerName()) {
                case "org.springframework.cloud.sleuth.instrument.web.ExceptionLoggingFilter":
                    return FilterReply.DENY;
            }
            return FilterReply.ACCEPT;
        }
        return FilterReply.DENY;
    }

}
```

上面过滤器的功能主要是通过重写`decide`，限制了`org.springframework.cloud.sleuth.instrument.web.ExceptionLoggingFilter`类输出ERROR级别的日志记录。在编写好自己的过滤器实现之后，只需要在Appender中配置使用就能实现自己需要的灵活过滤规则了

### 3.2 过滤器中使用

```xml
<appender name="WARN_APPENDER" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>logs/warn_error.log</file>
    <filter class="com.didispace.log.filter.ExceptionClassFilter"></filter>
    <encoder>
        <pattern>%-4relative [%thread] %-5level %logger{30} - %msg%n</pattern>
    </encoder>
</appender>   
```

## 参考文章

[Logback中如何自定义灵活的日志过滤规则](https://segmentfault.com/a/1190000017055021)