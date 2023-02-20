---
order: 70
category:
  - Spring
  - SpringBoot
---

# SpringBoot进阶 - SpringBoot自动装配原理解析

## 1. 前言

在使用SpringBoot的时候，我们只需要如下方式即可直接启动一个Web程序：

```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

和我们之前使用普通Spring时繁琐的配置相比简直不要太方便，那么SpringBoot实现这些的原理是什么？

## 2. `@SpringBootApplication`注解

首先我们看到类上方包含了一个`@SpringBootApplication`注解

```java
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
), @Filter(
    type = FilterType.CUSTOM,
    classes = {AutoConfigurationExcludeFilter.class}
)}
)
public @interface SpringBootApplication {
    @AliasFor(
        annotation = EnableAutoConfiguration.class
    )
    Class<?>[] exclude() default {};

    @AliasFor(
        annotation = EnableAutoConfiguration.class
    )
    String[] excludeName() default {};

    @AliasFor(
        annotation = ComponentScan.class,
        attribute = "basePackages"
    )
    String[] scanBasePackages() default {};

    @AliasFor(
        annotation = ComponentScan.class,
        attribute = "basePackageClasses"
    )
    Class<?>[] scanBasePackageClasses() default {};
}
```

这个注解上边包含的东西还是比较多的，咱们先看一下两个简单的热热身

### 2.1 `@ComponentScan` 注解

```java
@ComponentScan(excludeFilters = {
		@Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
```

这个注解咱们都是比较熟悉的，无非就是自动扫描并加载符合条件的Bean到容器中，这个注解会默认扫描声明类所在的包开始扫描，例如：
类`com.zszdevelop.Demo`类上标注了`@ComponentScan` 注解，则`com.zszdevelop.controller`、`com.zszdevelop.service`等等包下的类都可以被扫描到

这个注解一共包含以下几个属性：

```java
basePackages：指定多个包名进行扫描
basePackageClasses：对指定的类和接口所属的包进行扫
excludeFilters：指定不扫描的过滤器
includeFilters：指定扫描的过滤器
lazyInit：是否对注册扫描的bean设置为懒加载
nameGenerator：为扫描到的bean自动命名
resourcePattern：控制可用于扫描的类文件
scopedProxy：指定代理是否应该被扫描
scopeResolver：指定扫描bean的范围
useDefaultFilters：是否开启对@Component，@Repository，@Service，@Controller的类进
```

### 2.2 `@SpringBootConfiguration`注解

对`Configuration`注解的一个封装而已

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Configuration
public @interface SpringBootConfiguration {
}
```

### 2.3 `@EnableAutoConfiguration`注解

启用 SpringBoot 的自动配置机制。

**利用`@Import`注解，将所有符合自动装配条件的bean注入到IOC容器中**

> 这个注解可是重头戏了，SpringBoot号称的约定大于配置，也就是本文的重点自动装配的原理就在这里了

```java
@Import({AutoConfigurationImportSelector.class})
public @interface EnableAutoConfiguration {
    String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";

    Class<?>[] exclude() default {};

    String[] excludeName() default {};
}
```

#### 2.3.1 `@EnableAutoConfiguration`注解作用

**利用`@Import`注解，将所有符合自动装配条件的bean注入到IOC容器中**

>关于@Import可查看  [Spring Boot 自动配置之@Enable与@Import注解](springboot-y-annotation-enable-import.md)

#### 2.3.1 @Import 导入的 AutoConfigurationImportSelector.class 源码

```java
	@Override
	public String[] selectImports(AnnotationMetadata annotationMetadata) {
		// 1. 当前系统是否禁用了自动装配的功能
		if (!isEnabled(annotationMetadata)) {
			// 如果当前系统禁用了自动装配的功能则会返回如下这个空的数组，后续也就无法注入bean了
			return NO_IMPORTS;
		}
		// 2. 加载所有Spring预先定义的配置条件信息，
		// 这些配置信息在org.springframework.boot.autoconfigure包下的META-INF/spring-autoconfigure-metadata.properties文件中
		AutoConfigurationMetadata autoConfigurationMetadata = AutoConfigurationMetadataLoader
				.loadMetadata(this.beanClassLoader);
		// 3. 过滤出满足条件的配置信息
		AutoConfigurationEntry autoConfigurationEntry = getAutoConfigurationEntry(
				autoConfigurationMetadata, annotationMetadata);
		return StringUtils.toStringArray(autoConfigurationEntry.getConfigurations());
	}

/**
	 * 第一步：判断当前系统是否禁用了自动装配的功能
	 * @param metadata
	 * @return
	 */
	protected boolean isEnabled(AnnotationMetadata metadata) {
		if (getClass() == AutoConfigurationImportSelector.class) {
			return getEnvironment().getProperty(
					EnableAutoConfiguration.ENABLED_OVERRIDE_PROPERTY, Boolean.class,
					true);
		}
		return true;
	}

/**
	 * 第二步：加载所有Spring预先定义的配置条件信息（properties中）
	 * 这些配置信息在org.springframework.boot.autoconfigure包下的META-INF/spring-autoconfigure-metadata.properties文件中
	 * @param classLoader
	 * @param path
	 * @return
	 */
	static AutoConfigurationMetadata loadMetadata(ClassLoader classLoader, String path) {
		try {
			Enumeration<URL> urls = (classLoader != null) ? classLoader.getResources(path)
					: ClassLoader.getSystemResources(path);
			Properties properties = new Properties();
			while (urls.hasMoreElements()) {
				properties.putAll(PropertiesLoaderUtils
						.loadProperties(new UrlResource(urls.nextElement())));
			}
			return loadMetadata(properties);
		}
		catch (IOException ex) {
			throw new IllegalArgumentException(
					"Unable to load @ConditionalOnClass location [" + path + "]", ex);
		}
	}

/**
	 * 第三步：过滤出满足条件的配置信息
	 */
	protected AutoConfigurationEntry getAutoConfigurationEntry(
			AutoConfigurationMetadata autoConfigurationMetadata,
			AnnotationMetadata annotationMetadata) {
		if (!isEnabled(annotationMetadata)) {
			return EMPTY_ENTRY;
		}
		// 1.获取@EnableAutoConfiguration注解上的exclude、excludeName属性，这两个属性的作用都是排除一些类的
		AnnotationAttributes attributes = getAttributes(annotationMetadata);
		// 2. 加载整个项目所有的spring.factories文件
		// 刚才图片中spring-autoconfigure-metadata.properties文件的上方存在一个文件spring.factories，这个文件可就不止存在于`org.springframework.boot.autoconfigure`包里了
		List<String> configurations = getCandidateConfigurations(annotationMetadata,
				attributes);
		// 3. 移除重复的配置
		configurations = removeDuplicates(configurations);
		// 4. 去除我们指定排除的配置类
		Set<String> exclusions = getExclusions(annotationMetadata, attributes);
		checkExcludedClasses(configurations, exclusions);
		configurations.removeAll(exclusions);
		// 5. 就是根据加载的配置条件信息来判断各个配置类上的`@ConditionalXXX`系列注解是否满足需求
		configurations = filter(configurations, autoConfigurationMetadata);
		// 6. 最后就是发布自动装配完成事件，然后返回所有能够自动装配的类的全限定名
		fireAutoConfigurationImportEvents(configurations, exclusions);
		return new AutoConfigurationEntry(configurations, exclusions);
	}
```

#### 2.3.2 @EnableAutoConfiguration 流程

1. 第一行if时会首先判断当前系统是否禁用了自动装配的功能，判断的代码如下：

   ```java
   protected boolean isEnabled(AnnotationMetadata metadata) {
   		if (getClass() == AutoConfigurationImportSelector.class) {
   			return getEnvironment().getProperty(
   					EnableAutoConfiguration.ENABLED_OVERRIDE_PROPERTY, Boolean.class,
   					true);
   		}
   		return true;
   	}
   ```

   如果当前系统禁用了自动装配的功能则会返回如下这个空的数组，后续也就无法注入bean了

   ```java
   private static final String[] NO_IMPORTS = {};
   ```

2. 加载所有Spring预先定义的配置条件信息

   >这些配置信息在org.springframework.boot.autoconfigure包下的**META-INF/spring-autoconfigure-metadata.properties**文件中

   - 该文件的内容格式

   ```properties
   org.springframework.boot.actuate.autoconfigure.web.servlet.WebMvcEndpointChildContextConfiguration.ConditionalOnClass=org.springframework.web.servlet.DispatcherServlet
   org.springframework.boot.actuate.autoconfigure.metrics.jdbc.DataSourcePoolMetricsAutoConfiguration.ConditionalOnClass=javax.sql.DataSource,io.micrometer.core.instrument.MeterRegistry
   org.springframework.boot.actuate.autoconfigure.flyway.FlywayEndpointAutoConfiguration.AutoConfigureAfter=org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration
   ```

   - 加载之后的结果图

   ![image-20220511220015163](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220511220015163.png)

3. 过滤出满足条件的配置信息

   1. 获取`@EnableAutoConfiguration`注解上的exclude、excludeName属性，这两个属性的作用都是排除一些类的

   2. 加载整个项目所有的spring.factories文件

      >刚才图片中spring-autoconfigure-metadata.properties文件的上方存在一个文件spring.factories，这个文件可就不止存在于`org.springframework.boot.autoconfigure`包里了

   3. 删除重复的自动配置类

   4. 去除我们指定排除的配置类

   5. 就是**根据加载的配置条件信息来判断各个配置类上的`@ConditionalXXX`系列注解是否满足需求**

   6. 最后就是发布自动装配完成事件，然后返回所有能够自动装配的类的全限定名

   

## 参考文章

[SpringBoot自动装配原理解析](https://mp.weixin.qq.com/s/I3-sM55JSb4BFJ-zPosZgQ)