# Skywalking自定义插件

## 0. 背景

Skywalking 能监听大部分场景了，如各服务请求时间，数据库日志。我们大部分spring注解方法也能支持。

但如果是第三方框架的呢？如http，gson，hutool 等一些第三方类库就需要我们自定义来实现。

## 1. 前置知识

- javaagent：
  - JDK 5引入的一个玩意儿，最好了解下其工作原理
- byte-buddy
  - 一个动态操作二进制码的库

## 2. 基础概念

在实现拦截器之前我们需要了解分布式追踪系统中的一些关键数据结构。 

![image-20211203215729077](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211203215729077.png)

### 2.1 跨度（Span） 

- 一次方法调用

  - 在spring中我们可以通过插件的形式监听到注解后的每个方法调用的时间

- 一个程序块的调用

- 一次RPC/数据库访问

  - 数据库增删改查
  - 一次http请求

只要是一个具有完整时间周期的程序访问，都可以被认为是一个span。SkyWalking `Span` 对象中的重要属性

| 属性          | 名称       | 备注                                                         |
| :------------ | :--------- | :----------------------------------------------------------- |
| component     | 组件       | 插件的组件名称，如：Tomcat                                   |
| tag           | 自定义标签 | k-v结构，关键标签。一般记录操作的一些信息如：http状态码，http方法、ip、port、db.statement等。 |
| peer          | 对端资源   | 用于拓扑图，若DB组件，需记录集群信息。                       |
| operationName | 操作名称   | 若span=0，operationName将会搜索的下拉列表。                  |
| layer         | 显示       | 在链路页显示，详见SpanLayer.Class。                          |

#### 2.1.1 spanType 

其中spanType分三种：

● Entry – 服务端入口，比如Spring的Controller、MQ的Consumer等。

● Exit – 客户端远程调用，如http client、JDBC、redis client，MQ producer等。

● Local – 本地方法调用，用来记录本地方法的执行时间。

#### 2.1.2 Span的Context记录分两种 

ContextCarrier – 用于跨进程传递上下文数据。

● ContextSnapshot – 用于跨线程传递上下文数据。

### 2.2 Trace调用链

通过归属于其的Span来隐性的定义。一条Trace可被认为是一个由多个Span组成的有向无环图（DAG图），在SkyWalking链路模块你可以看到，Trace又由多个归属于其的trace segment组成。

### 2.3 Trace segment

Segment是SkyWalking中的一个概念，它应该包括单个OS进程中每个请求的所有范围，通常是基于语言的单线程。由多个归属于本线程操作的Span组成。

## 3. 实战

我们



我们以官方源码上的Gson 插件为例介绍

这里总结一下插件的开发流程如下：

● apm-sdk-plugin目录下建立自己的plugin module

● 定义拦截点（实现ClassInstanceMethodsEnhancePluginDefine）

● 实现方法拦截器（InstanceMethodsAroundInterceptor）

● 在ComponentsDefine和component-libraries.yml中配置插件信息

● 构建agent模块mvn clean package -Pagent,dist -DskipTests=true







>说来惭愧，找了网上各种方案，最终都没能实现自定义。哪怕从官方源码上的下载插件源码导入的都不生效。
>
>所以此文章就简单看看思想了，等以后更加熟skywalking后完善了

### 3.1 依赖

首先，创建一个Maven项目，pom.xml如下

>这几个依赖和插件非常重要，否则很可能没有一点效果！！！血泪教训

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.zszdevelop</groupId>
    <artifactId>apm-hutool-plugin</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>


        <skywalking.version>8.8.0</skywalking.version>
        <shade.net.bytebuddy.source>net.bytebuddy</shade.net.bytebuddy.source>
        <shade.package>org.apache.skywalking.apm.dependencies</shade.package>
        <shade.net.bytebuddy.target>${shade.package}.${shade.net.bytebuddy.source}</shade.net.bytebuddy.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

        <ant-contrib.version>1.0b3</ant-contrib.version>
        <ant-nodeps.version>1.8.1</ant-nodeps.version>

        <gson.version>2.8.5</gson.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.apache.skywalking</groupId>
            <artifactId>apm-agent-core</artifactId>
            <version>${skywalking.version}</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.skywalking</groupId>
            <artifactId>java-agent-util</artifactId>
            <version>${skywalking.version}</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.skywalking</groupId>
            <artifactId>apm-test-tools</artifactId>
            <version>${skywalking.version}</version>
            <scope>test</scope>
        </dependency>



        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-lang3</artifactId>
            <version>3.4</version>
            <scope>provided</scope>
        </dependency>


        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.7.13</version>
        </dependency>


        <dependency>
            <groupId>com.google.code.gson</groupId>
            <artifactId>gson</artifactId>
            <version>${gson.version}</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>


    <build>
        <plugins>
            <plugin>
                <artifactId>maven-shade-plugin</artifactId>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <shadedArtifactAttached>false</shadedArtifactAttached>
                            <createDependencyReducedPom>true</createDependencyReducedPom>
                            <createSourcesJar>true</createSourcesJar>
                            <shadeSourcesContent>true</shadeSourcesContent>
                            <relocations>
                                <relocation>
                                    <pattern>${shade.net.bytebuddy.source}</pattern>
                                    <shadedPattern>${shade.net.bytebuddy.target}</shadedPattern>
                                </relocation>
                            </relocations>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>
```

### 3.2 FileCopyInstrumentation

```java
package com.zszdevelop.skywalking.apm.plugin.define;

import net.bytebuddy.description.method.MethodDescription;
import net.bytebuddy.matcher.ElementMatcher;
import net.bytebuddy.matcher.ElementMatchers;
import org.apache.skywalking.apm.agent.core.plugin.interceptor.ConstructorInterceptPoint;
import org.apache.skywalking.apm.agent.core.plugin.interceptor.InstanceMethodsInterceptPoint;
import org.apache.skywalking.apm.agent.core.plugin.interceptor.StaticMethodsInterceptPoint;
import org.apache.skywalking.apm.agent.core.plugin.interceptor.enhance.ClassInstanceMethodsEnhancePluginDefine;
import org.apache.skywalking.apm.agent.core.plugin.match.ClassMatch;
import org.apache.skywalking.apm.agent.core.plugin.match.NameMatch;

/**
 * @author zsz
 * @date 2021-28-28
 */
public class FileCopyInstrumentation extends ClassInstanceMethodsEnhancePluginDefine {
    public static final String INTERCEPTOR_CLASS = "com.zszdevelop.skywalking.apm.plugin.FileCopyInterceptor";
    public static final String ENHANCE_CLASS = "cn.hutool.core.io.FileUtil";
    public static final String ENHANCE_METHOD_DISPATCH = "copy";


    @Override
    protected ClassMatch enhanceClass() {
        // 指定想要监控的类
        return NameMatch.byName(ENHANCE_CLASS);
    }

    @Override
    public ConstructorInterceptPoint[] getConstructorsInterceptPoints() {
        return new ConstructorInterceptPoint[0];
    }

    @Override
    public InstanceMethodsInterceptPoint[] getInstanceMethodsInterceptPoints() {
        // 指定想要监控的实例方法，每个实例方法对应一个InstanceMethodsInterceptPoint
        return new InstanceMethodsInterceptPoint[0];
    }

    @Override
    public StaticMethodsInterceptPoint[] getStaticMethodsInterceptPoints() {
        // 指定想要监控的静态方法，每一个方法对应一个StaticMethodsInterceptPoint
        return new StaticMethodsInterceptPoint[]{
                new StaticMethodsInterceptPoint() {
                    @Override
                    public ElementMatcher<MethodDescription> getMethodsMatcher() {
                        // 静态方法名称
                        return ElementMatchers.named(ENHANCE_METHOD_DISPATCH);
                    }

                    @Override
                    public String getMethodsInterceptor() {
                        // 该静态方法的监控拦截器类名全路径
                        return INTERCEPTOR_CLASS;
                    }

                    @Override
                    public boolean isOverrideArgs() {
                        return false;
                    }
                }
        };
    }
}
```

### 3.3 FileCopyInterceptor

```java
package com.zszdevelop.skywalking.apm.plugin;

import org.apache.skywalking.apm.agent.core.context.ContextManager;
import org.apache.skywalking.apm.agent.core.context.tag.StringTag;
import org.apache.skywalking.apm.agent.core.context.tag.Tags;
import org.apache.skywalking.apm.agent.core.context.trace.AbstractSpan;
import org.apache.skywalking.apm.agent.core.context.trace.SpanLayer;
import org.apache.skywalking.apm.agent.core.plugin.interceptor.enhance.MethodInterceptResult;
import org.apache.skywalking.apm.agent.core.plugin.interceptor.enhance.StaticMethodsAroundInterceptor;
import org.apache.skywalking.apm.network.trace.component.ComponentsDefine;

import java.lang.reflect.Method;

/**
 * @author zsz
 * @date 2021-02-02
 */
public class FileCopyInterceptor implements StaticMethodsAroundInterceptor {
    @Override
    public void beforeMethod(Class aClass, Method method, Object[] argumentsTypes, Class<?>[] classes, MethodInterceptResult methodInterceptResult) {
        // 创建span(监控的开始)，本质上是往ThreadLocal对象里面设值
        AbstractSpan span = ContextManager.createLocalSpan("filecopy");

        /*
         * 可用ComponentsDefine工具类指定Skywalking官方支持的组件
         * 也可自己new OfficialComponent或者Component
         * 不过在Skywalking的控制台上不会被识别，只会显示N/A
         */
        span.setComponent(ComponentsDefine.TOMCAT);

        span.tag(new StringTag(1000, "params"), "lailailai");
        // 指定该调用的layer，layer是个枚举
        span.setLayer(SpanLayer.CACHE);
    }

    @Override
    public Object afterMethod(Class aClass, Method method, Object[] objects, Class<?>[] classes, Object o) {
//        String retString = (String) o;
        // 激活span，本质上是读取ThreadLocal对象
        AbstractSpan span = ContextManager.activeSpan();
        // 状态码，任意写，Tags也是个Skywalking的工具类，用来比较方便地操作tag
//        Tags.STATUS_CODE.set(span, "20000");
        Tags.HTTP_RESPONSE_STATUS_CODE.set(span, 20000);

        // 停止span(监控的结束)，本质上是清理ThreadLocal对象
        ContextManager.stopSpan();
        return o;
    }

    @Override
    public void handleMethodException(Class aClass, Method method, Object[] objects, Class<?>[] classes, Throwable throwable) {
        AbstractSpan activeSpan = ContextManager.activeSpan();

        // 记录日志
        activeSpan.log(throwable);
        activeSpan.errorOccurred();
    }

}


```

### 3.4 skywalking-plugin.def

创建skywalking-plugin.def文件，key 可以随便定义

```java
hutool-5.x=com.zszdevelop.skywalking.apm.plugin.define.FileCopyInstrumentation
```

## 4. 集成测试

### 4.1 打包

打包使用正常的mvn命令即可

```
mvn clean package
```

生成jar包：apm-hutool-plugin-1.0-SNAPSHOT.jar

### 4.2 集成插件

将jar包 apm-hutool-plugin-1.0-SNAPSHOT.jar 放入skywalking-agent/plugins 目录下

![image-20211202230640506](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211202230640506.png)

### 4.3 测试接口

```java
    @GetMapping("/fileCopy")
    public AjaxResult fileCopy() {

        File srcFile = FileUtil.file("/Users/zsz/Downloads/github.com.png");
        File destFile = FileUtil.file("/Users/zsz/Downloads/github-test.com.png");
        FileUtil.copy(srcFile, destFile, true);

        return AjaxResult.success();
    }
```



### 4.4 测试结果

请求结果后可以看到多了一行filecopy

![image-20211202230759483](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211202230759483.png)



## 参考文章

[性能分析工具SkyWalking插件开发指南](https://www.bilibili.com/read/cv6638733?spm_id_from=333.999.0.0)

[Skywalking系列博客6-手把手教你编写Skywalking插件](https://www.itmuch.com/skywalking/write-plugin/)
