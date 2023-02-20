---
order: 80
category:
  - Spring
  - SpringBoot
---

# SpringBoot进阶 - SpringBoot嵌入式Tomcat的自动配置原理

## 1. 准备

我们知道SpringBoot的自动装配的秘密在`org.springframework.boot.autoconfigure`包下的`spring.factories`文件中，而嵌入Tomcat的原理就在这个文件中加载的一个配置类：`org.springframework.boot.autoconfigure.web.servlet.ServletWebServerFactoryAutoConfiguration`

```java
@Configuration
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)
@ConditionalOnClass(ServletRequest.class)
@ConditionalOnWebApplication(type = Type.SERVLET)
@EnableConfigurationProperties(ServerProperties.class)
@Import({ ServletWebServerFactoryAutoConfiguration.BeanPostProcessorsRegistrar.class,
		ServletWebServerFactoryConfiguration.EmbeddedTomcat.class,
		ServletWebServerFactoryConfiguration.EmbeddedJetty.class,
		ServletWebServerFactoryConfiguration.EmbeddedUndertow.class })
public class ServletWebServerFactoryAutoConfiguration {

	@Bean
	public ServletWebServerFactoryCustomizer servletWebServerFactoryCustomizer(
			ServerProperties serverProperties) {
		return new ServletWebServerFactoryCustomizer(serverProperties);
	}

	@Bean
	@ConditionalOnClass(name = "org.apache.catalina.startup.Tomcat")
	public TomcatServletWebServerFactoryCustomizer tomcatServletWebServerFactoryCustomizer(
			ServerProperties serverProperties) {
		return new TomcatServletWebServerFactoryCustomizer(serverProperties);
	}

	/**
	 * Registers a {@link WebServerFactoryCustomizerBeanPostProcessor}. Registered via
	 * {@link ImportBeanDefinitionRegistrar} for early registration.
	 */
	public static class BeanPostProcessorsRegistrar
			implements ImportBeanDefinitionRegistrar, BeanFactoryAware {

		private ConfigurableListableBeanFactory beanFactory;

		@Override
		public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
			if (beanFactory instanceof ConfigurableListableBeanFactory) {
				this.beanFactory = (ConfigurableListableBeanFactory) beanFactory;
			}
		}

		@Override
		public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata,
				BeanDefinitionRegistry registry) {
			if (this.beanFactory == null) {
				return;
			}
			registerSyntheticBeanIfMissing(registry,
					"webServerFactoryCustomizerBeanPostProcessor",
					WebServerFactoryCustomizerBeanPostProcessor.class);
			registerSyntheticBeanIfMissing(registry,
					"errorPageRegistrarBeanPostProcessor",
					ErrorPageRegistrarBeanPostProcessor.class);
		}

		private void registerSyntheticBeanIfMissing(BeanDefinitionRegistry registry,
				String name, Class<?> beanClass) {
			if (ObjectUtils.isEmpty(
					this.beanFactory.getBeanNamesForType(beanClass, true, false))) {
				RootBeanDefinition beanDefinition = new RootBeanDefinition(beanClass);
				beanDefinition.setSynthetic(true);
				registry.registerBeanDefinition(name, beanDefinition);
			}
		}

	}

}
```

### 1.1 相关注解

1. `@AutoConfigureOrder`这个注解是决定配置类的加载顺序的，当注解里的值越小越先加载，而`Ordered.HIGHEST_PRECEDENCE`的值是`Integer.MIN_VALUE`也就是说这个类肯定是最先加载的那一批

2. `@ConditionalOnXXX`在之前的文章中已经无数次提到了，就不再阐述了

3. `@EnableConfigurationProperties`开启`ServerProperties`类的属性值配置。而这个类里面包含的就是Web服务的配置

   ```java
   @ConfigurationProperties(prefix = "server", ignoreUnknownFields = true)
   public class ServerProperties {
   
   	private Integer port;
   
   	private InetAddress address;
   
   	@NestedConfigurationProperty
   	private final ErrorProperties error = new ErrorProperties();
   
   	private Boolean useForwardHeaders;
   
   	private String serverHeader;
   
   	private int maxHttpHeaderSize = 0; // bytes
   
   	private Duration connectionTimeout;
   
   	@NestedConfigurationProperty
   	private Ssl ssl;
   
   	@NestedConfigurationProperty
   	private final Compression compression = new Compression();
   
   	@NestedConfigurationProperty
   	private final Http2 http2 = new Http2();
   
   	private final Servlet servlet = new Servlet();
   
   	private final Tomcat tomcat = new Tomcat();
   
   	private final Jetty jetty = new Jetty();
   
   	private final Undertow undertow = new Undertow();
   }
   ```

   这个类的代码太多了，这里就不一一贴出来了，我们平常在`application.properties`中配置的server.xxx就是这个类中属性

### 1.2 `@Import`引入4个类

#### 1.2.1 `BeanPostProcessorsRegistrar`

```java
public static class BeanPostProcessorsRegistrar
			implements ImportBeanDefinitionRegistrar, BeanFactoryAware {
		@Override
		public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata,
				BeanDefinitionRegistry registry) {
			if (this.beanFactory == null) {
				return;
			}
			registerSyntheticBeanIfMissing(registry,
					"webServerFactoryCustomizerBeanPostProcessor",
					WebServerFactoryCustomizerBeanPostProcessor.class);
			registerSyntheticBeanIfMissing(registry,
					"errorPageRegistrarBeanPostProcessor",
					ErrorPageRegistrarBeanPostProcessor.class);
		}

		private void registerSyntheticBeanIfMissing(BeanDefinitionRegistry registry,
				String name, Class<?> beanClass) {
			if (ObjectUtils.isEmpty(
					this.beanFactory.getBeanNamesForType(beanClass, true, false))) {
				RootBeanDefinition beanDefinition = new RootBeanDefinition(beanClass);
				beanDefinition.setSynthetic(true);
				registry.registerBeanDefinition(name, beanDefinition);
			}
		}

	}
```

这个类注册了两个bean：

- `WebServerFactoryCustomizerBeanPostProcessor` 后置处理器

  获取bean `tomcatServletWebServerFactory`的时候就会执行后置处理器的`postProcessBeforeInitialization`方法

- ``ErrorPageRegistrarBeanPostProcessor`

```java
registerSyntheticBeanIfMissing(registry,
					"webServerFactoryCustomizerBeanPostProcessor",
					WebServerFactoryCustomizerBeanPostProcessor.class);
			registerSyntheticBeanIfMissing(registry,
					"errorPageRegistrarBeanPostProcessor",
					ErrorPageRegistrarBeanPostProcessor.class);
```

#### 1.2.2 `EmbeddedTomcat`

```java
@Configuration
	@ConditionalOnClass({ Servlet.class, Tomcat.class, UpgradeProtocol.class })
	@ConditionalOnMissingBean(value = ServletWebServerFactory.class, search = SearchStrategy.CURRENT)
	public static class EmbeddedTomcat {

		@Bean
		public TomcatServletWebServerFactory tomcatServletWebServerFactory() {
			return new TomcatServletWebServerFactory();
		}

	}
```

这个类**会在存在Tomcat相关jar包时添加一个`TomcatServletWebServerFactory` bean**

另外两个EmbeddedJetty，EmbeddedUndertow 类也是同样的，注册了对应ServletWebServerFactory。

该 ServletWebServerFactory 将会在createWebServer 是被使用

### 1.2.2.1 starter-web的默认容器

EmbeddedTomcat 中的 @ConditionalOnClass 表示，如果项目中存在tomcat 类，则该类会被加载配置。

而starter-web中默认配置的容器就是tomcat。如果需要使用其他容器，则移除该引用，改成其他引用即可

![image-20220515215757923](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220515215757923.png)

### 1.3 注入了两个类

`ServletWebServerFactoryAutoConfiguration`类还注入了两个类`ServletWebServerFactoryCustomizer`和`TomcatServletWebServerFactoryCustomizer`

现在前期准备工作已经做好了

## 2. 启动流程

### 2.1 启动入口 onRefresh

启动入口在`ServletWebServerApplicationContext`中的`onRefresh`方法

```java
protected void onRefresh() {
		super.onRefresh();
		try {
			createWebServer();
		}
		catch (Throwable ex) {
			throw new ApplicationContextException("Unable to start web server", ex);
		}
	}
```

### 2.2 createWebServer启动Tomcat

Tomcat的启动就在`createWebServer`方法里面了

```java

	private void createWebServer() {
		WebServer webServer = this.webServer;
		ServletContext servletContext = getServletContext();
		// 第一次访问的时候两个对象都为空
		if (webServer == null && servletContext == null) {
			//  使用工厂模式创建容器,因为内置的容器有很多种，不只是tomcat
			ServletWebServerFactory factory = getWebServerFactory();
			// getSelfInitializer() 环境配置,这是SpringContext 与ServletContext 进行通信的关键
			// 启动WebServer(tomcat)
			this.webServer = factory.getWebServer(getSelfInitializer());
		}
		else if (servletContext != null) {
			try {
				getSelfInitializer().onStartup(servletContext);
			}
			catch (ServletException ex) {
				throw new ApplicationContextException("Cannot initialize servlet context",
						ex);
			}
		}
		initPropertySources();
	}
```

#### 2.2.1 获取 WebServerFactory

首先看一下`getWebServerFactory`

```java
protected ServletWebServerFactory getWebServerFactory() {
		// 这里获取的beanname就是上方注册的tomcatServletWebServerFactory了
		String[] beanNames = getBeanFactory()
				.getBeanNamesForType(ServletWebServerFactory.class);
		if (beanNames.length == 0) {
			throw new ApplicationContextException(
					"Unable to start ServletWebServerApplicationContext due to missing "
							+ "ServletWebServerFactory bean.");
		}
		if (beanNames.length > 1) {
			throw new ApplicationContextException(
					"Unable to start ServletWebServerApplicationContext due to multiple "
							+ "ServletWebServerFactory beans : "
							+ StringUtils.arrayToCommaDelimitedString(beanNames));
		}
		return getBeanFactory().getBean(beanNames[0], ServletWebServerFactory.class);
	}
```

#### 2.2.2 后置处理器 WebServerFactoryCustomizerBeanPostProcessor 执行定制器

准备环境里注册的bean现在出来一个了。注意，上方还注册了一个后置处理器`WebServerFactoryCustomizerBeanPostProcessor`，获取bean`tomcatServletWebServerFactory`的时候就会执行后置处理器的`postProcessBeforeInitialization`方法



**这个处理器的作用是获得所有定制器，然后执行定制器的方法**

```java
public Object postProcessBeforeInitialization(Object bean, String beanName)
			throws BeansException {
	if (bean instanceof WebServerFactory) {
		postProcessBeforeInitialization((WebServerFactory) bean);
	}
	return bean;
}
private void postProcessBeforeInitialization(WebServerFactory webServerFactory) {
		LambdaSafe
				.callbacks(WebServerFactoryCustomizer.class, getCustomizers(),
						webServerFactory)
				.withLogger(WebServerFactoryCustomizerBeanPostProcessor.class)
				.invoke((customizer) -> customizer.customize(webServerFactory));
	}

	private Collection<WebServerFactoryCustomizer<?>> getCustomizers() {
		if (this.customizers == null) {
			// Look up does not include the parent context
			this.customizers = new ArrayList<>(getWebServerFactoryCustomizerBeans());
			this.customizers.sort(AnnotationAwareOrderComparator.INSTANCE);
			this.customizers = Collections.unmodifiableList(this.customizers);
		}
		return this.customizers;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private Collection<WebServerFactoryCustomizer<?>> getWebServerFactoryCustomizerBeans() {
		return (Collection) this.beanFactory
				.getBeansOfType(WebServerFactoryCustomizer.class, false, false).values();
	}
```

#### 2.2.3 getSelfInitializer() 绑定信息

返回一个lamda 函数,这是SpringContext 与ServletContext 进行通信的关键。简单描述逻辑为：

- SpringContext.setServletContext(ServletContext)
-  ServletContext.setSpringContext(SpringContext)

 这样双方都能够获取对方的完成信息。 

```java
private org.springframework.boot.web.servlet.ServletContextInitializer getSelfInitializer() {
        return this::selfInitialize;
    }
```



```java
	private void selfInitialize(ServletContext servletContext) throws ServletException {
		prepareWebApplicationContext(servletContext);
		ConfigurableListableBeanFactory beanFactory = getBeanFactory();
		ExistingWebApplicationScopes existingScopes = new ExistingWebApplicationScopes(
				beanFactory);
		WebApplicationContextUtils.registerWebApplicationScopes(beanFactory,
				getServletContext());
		existingScopes.restore();
		WebApplicationContextUtils.registerEnvironmentBeans(beanFactory,
				getServletContext());
		for (ServletContextInitializer beans : getServletContextInitializerBeans()) {
			beans.onStartup(servletContext);
		}
	}
```

#### 2.2.4 启动Tomcat

>getWebServer->getTomcatWebServer->initialize->this.tomcat.start();

```java
	@Override
	public WebServer getWebServer(ServletContextInitializer... initializers) {
		Tomcat tomcat = new Tomcat();
		File baseDir = (this.baseDirectory != null) ? this.baseDirectory
				: createTempDir("tomcat");
		tomcat.setBaseDir(baseDir.getAbsolutePath());
		Connector connector = new Connector(this.protocol);
		tomcat.getService().addConnector(connector);
		customizeConnector(connector);
		tomcat.setConnector(connector);
		tomcat.getHost().setAutoDeploy(false);
		configureEngine(tomcat.getEngine());
		for (Connector additionalConnector : this.additionalTomcatConnectors) {
			tomcat.getService().addConnector(additionalConnector);
		}
		prepareContext(tomcat.getHost(), initializers);
		return getTomcatWebServer(tomcat);
	}
protected TomcatWebServer getTomcatWebServer(Tomcat tomcat) {
		return new TomcatWebServer(tomcat, getPort() >= 0);
	}
public TomcatWebServer(Tomcat tomcat, boolean autoStart) {
		Assert.notNull(tomcat, "Tomcat Server must not be null");
		this.tomcat = tomcat;
		this.autoStart = autoStart;
		initialize();
	}
private void initialize() throws WebServerException {
		TomcatWebServer.logger
				.info("Tomcat initialized with port(s): " + getPortsDescription(false));
		synchronized (this.monitor) {
			try {
				addInstanceIdToEngineName();

				Context context = findContext();
				context.addLifecycleListener((event) -> {
					if (context.equals(event.getSource())
							&& Lifecycle.START_EVENT.equals(event.getType())) {
						// Remove service connectors so that protocol binding doesn't
						// happen when the service is started.
						removeServiceConnectors();
					}
				});

				// Start the server to trigger initialization listeners
				this.tomcat.start();

				// We can re-throw failure exception directly in the main thread
				rethrowDeferredStartupExceptions();

				try {
					ContextBindings.bindClassLoader(context, context.getNamingToken(),
							getClass().getClassLoader());
				}
				catch (NamingException ex) {
					// Naming is not enabled. Continue
				}

				// Unlike Jetty, all Tomcat threads are daemon threads. We create a
				// blocking non-daemon to stop immediate shutdown
				startDaemonAwaitThread();
			}
			catch (Exception ex) {
				throw new WebServerException("Unable to start embedded Tomcat", ex);
			}
		}
	}
```

![image-20220515221342273](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220515221342273.png)

## 3. 总结

核心主要还是依赖于springboot的自动配置。项目启动的过程中，扫描classpath下的meta-inf/spring.factories，实例化工厂对象tomcatServletWebServerFactory，在调用run()方法的时候完成tomcat对象的创建，环境设置和启动，从而实现tomcat容器的自动化处理。

>SpringApplication --> run-->createContext-->context.refersh-->onRefresh-->createWebServer

## 参考文章

[SpringBoot嵌入式Tomcat的自动配置原理](https://mp.weixin.qq.com/s/XdxQgAYqarGpiSS3n7tp4g)

[Spring boot | 内嵌容器](https://www.jianshu.com/p/15ce74dacbf9)