---
order: 93
category:
  - Spring


---

# Spring进阶 - Spring IOC容器的初始化过程

## 0. 精简概述

![image-20230105164039388](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230105164039388.png)

IOC 容器的初始化包括的三个过程

1. 加载配置文件（Resource定位过程）：

   通过 ResourceLoader 来完成资源文件位置的定位，并将其封装成Resource对象

2. 解析配置文件（BeanDefinition的载入）

   通过 BeanDefinitionReader来完成定义信息的解析成IoC容器内部的数据结构BeanDefinition

3. 注册到容器（BeanDefinition的注册）

   通过BeanDefinitionRegistry接口将BeanDefinition向 IOC 容器中注册。注册过程就是在 IOC 容器内部维护的一个HashMap 来保存得到的 BeanDefinition 的过程。这个 HashMap 是 IoC 容器持有 bean 信息的场所，以后对 bean 的操作都是围绕这个HashMap 来实现的

## 1. 前言

>**IOC 容器的初始化是由refresh()方法来启动的**。而在Spring IOC 容器启动的过程中，会将Bean解析成Spring内部的BeanDefinition结构
>
>BeanDefinition在Spring中是用来描述Bean对象的，它本身并不是一个Bean实例，而是包含了Bean实例的所有信息，比如类名、属性值、构造器参数、scope、依赖的bean、是否是单例类、是否是懒加载以及其它信息
>
>当然BeanDefinition的最终目的不只是用来存储Bean实例的所有信息，而是为了可以方便的进行修改属性值和其他元信息，比如通过BeanFactoryPostProcessor进行修改一些信息，然后在创建Bean对象的时候就可以结合原始信息和修改后的信息创建对象了

上一章介绍了[Spring IOC容器的设计与实现](https://www.cnblogs.com/tanghaorong/p/13432008.html)，同时也讲到了高级容器ApplicationContext中有个refresh()方法，执行了这个方法标志着 IOC 容器正式启动，简单来说，**IOC 容器的初始化是由refresh()方法来启动的**。而在Spring IOC 容器启动的过程中，会将Bean解析成Spring内部的BeanDefinition结构。不管是通过xml配置文件的`<Bean>`标签，还是通过注解配置的@Bean，它最终都会被解析成一个BeanDefinition信息对象，最后我们的Bean工厂就会根据这份Bean的定义信息，对Bean进行实例化、初始化等等操作。

从上可知BeanDefinition这个对象对Spring IoC容器的重要之处，并且IOC的初始化都是围绕这个BeanDefinition来进行的。所以了解好了它，能让我们更大视野的来看Spring管理Bean的一个过程，也能透过现象看本质。所以这里再次强调一次BeanDefinition对象的作用：简单来说，BeanDefinition在Spring中是用来描述Bean对象的，它本身并不是一个Bean实例，而是包含了Bean实例的所有信息，比如类名、属性值、构造器参数、scope、依赖的bean、是否是单例类、是否是懒加载以及其它信息。其实就是将Bean实例定义的信息存储到这个BeanDefinition相应的属性中，后面Bean对象的创建是根据BeanDefinition中描述的信息来创建的，例如拿到这个BeanDefinition后，可以根据里面的类名、构造函数、构造函数参数，使用反射进行对象创建。也就是说 IOC容器可以有多个BeanDefinition，并且一个BeanDefinition对象对应一个`<bean>`标签中的信息。当然BeanDefinition的最终目的不只是用来存储Bean实例的所有信息，而是为了可以方便的进行修改属性值和其他元信息，比如通过BeanFactoryPostProcessor进行修改一些信息，然后在创建Bean对象的时候就可以结合原始信息和修改后的信息创建对象了。

## 2. IOC容器的初始化步骤

>IOC 容器的初始化包括的三个过程
>
>1. Resource定位过程（加载配置文件）：
>
>   通过 ResourceLoader 来完成资源文件位置的定位，并将其封装成Resource对象
>
>2. BeanDefinition的载入
>
>   通过 BeanDefinitionReader来完成定义信息的解析成IoC容器内部的数据结构BeanDefinition
>
>3. BeanDefinition的注册
>
>   通过BeanDefinitionRegistry接口将BeanDefinition向 IOC 容器中注册。注册过程就是在 IOC 容器内部维护的一个HashMap 来保存得到的 BeanDefinition 的过程。这个 HashMap 是 IoC 容器持有 bean 信息的场所，以后对 bean 的操作都是围绕这个HashMap 来实现的

我们知道，在refresh()之后IOC 容器的启动会经过一段很复杂的过程，我们暂时不要求全部了解清楚，但是现在大体了解一下 Spring IoC 初始化的过程还是必要的。这对于理解 Spring 的一系列行为是很有帮助的。IOC 容器初始化包括BeanDefinition的Resource定位、载入和注册三个基本过程，如果我们了解如何编程式的使用 IOC 容器（编程式就是使用DefaultListableBeanFactory来创建容器），就可以清楚的看到Resource定义和载入过程的接口调用，在下面的内容中，我们将会详细分析这三个过程的实现。

IOC 容器的初始化包括的三个过程介绍如下：

1. **Resource定位过程**：这个Resource定位指的是BeanDefinition的资源定位，就是对开发者的配置文件(Xml)进行资源的定位，并将其封装成Resource对象。它由ResourceLoader通过统一的Resource接口来完成，这个Resource对各种形式的BeanDefinition的使用都提供了统一接口。比如：在文件系统中的Bean定义信息可以使用FileSystemResource来进行抽象。在类路径中的Bean定义信息可以使用ClassPathResource来进行抽象等等。这个定位过程类似于容器寻找数据的过程，就像用水捅装水先要把水找到一样。
2. **BeanDefinition的载入**：这个载入过程是将Resource 定位到的信息，表示成IoC容器内部的数据结构，而这个容器内部的数据结构就是BeanDefinition。
3. **BeanDefinition的注册**：这个注册过程把上面载入过程中解析得到的BeanDeftnition向IoC容器进行注册。注册过程是通过调用BeanDefinitionRegistry接口的实现来完成的。在IoC容器内部将BeanDefinition注人到一个HashMap中去，IoC容器就是通过这个HashMap来持有这些BeanDefinition数据的。

注意：Bean的定义和初始化在 Spring IoC 容器是两大步骤，**它是先定义，然后再是初始化和依赖注入**。所以当Spring做完了以上 3 步后，Bean 就在 Spring IoC 容器中被定义了，而没有被初始化，更没有完成依赖注入，所以此时仍然没有对应的 Bean 的实例，也就是没有注入其配置的资源给 Bean，也就是它还不能完全使用。对于初始化和依赖注入，Spring Bean 还有一个配置选项——**【lazy-init】**，其含义就是：是否默认初始化 Spring Bean。在没有任何配置的情况下，它的默认值为default，实际值为 false(默认非懒加载)，也就是 Spring IoC 容器默认会自动初始化 Bean。如果将其设置为 true（懒加载），那么只有当我们使用 Spring IoC 容器的 getBean 方法获取它时，它才会进行 Bean 的初始化，完成依赖注入。

## 3. BeanDefinition的Resource定位

在Spring框架中，如果想要获取系统中的配置文件，就必须通过Resource接口的实现来完成，Resource是Sping中用于封装I/O操作的接口。例如我们前面在以编程的方式使用DefaultListableBeanFactory时，首先是定义一个Resource来定位容器使用的BeanDefinition，这里使用的是Resource的实现类ClassPathResource，这时Spring会在类路径中去寻找以文件形式存在BeanDefinition。

```java
ClassPathResource resource = new ClassPathResource("beans.xml");
```

但是这里的Resource并不能由 DefaultListableBeanFactory 直接使用，而是需要通过Spring中的 BeanDefinitionReader 来对这些信息进行处理。在这里，我们也可以看到使用 ApplicationContext 相对于直接使用 DefaultListableBeanFactory 的好处，因为在ApplicationContext中，Spring已经为我们提供了一系列加载不同Resource的读取器实现，而在 DefaultListableBeanFactory 只是一个纯粹的IOC容器，需要为它配置配置特定的读取器才能完成这些功能，当然了 利和弊 是共存的，使用 DefaultListableBeanFactory 这样更底层的IOC容器，能提高定制IOC容器的的灵活性。

常用的Resource资源类型如下：

- FileSystemResource：以文件的绝对路径方式进行访问资源，效果类似于Java中的File;
- ClassPathResourcee：以类路径的方式访问资源，效果类似于this.getClass().getResource("/").getPath();
- ServletContextResource：web应用根目录的方式访问资源，效果类似于request.getServletContext().getRealPath("");
- UrlResource：访问网络资源的实现类。例如file: http: ftp:等前缀的资源对象;
- ByteArrayResource: 访问字节数组资源的实现类。

回到我们经常使用的ApplicationContext上来，它给我们提供了一系列加载不同Resource的读取器实现，例如ClassPathXmlApplicationContext、FileSystemXmlApplicationContext以及XmlWebApplicationContext等等，简单的从这些类的名字上分析，可以清楚的看到他们可以提供哪些不同的Resource读入功能，比如：ClassPathXmlApplicationContext可以从 classpath载入Resource，FileSystemXmlApplicationContext可以从文件系统中载入Resource，XmlWebApplicationContext可以在Web容器中载入Resource等。

我们通常喜欢拿ClassPathXmlApplicationContext来举例，所以这里用它来分析ApplicationContext是如何来完成BeanDefinition的Resource定位，首先来看一下ClassPathXmlApplicationContext的整继承体系：

![image-20230105111210393](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230105111210393.png)

通过上面的图片并且查看继承关系可知，ClassPathXmlApplicationContext继承了AbstractApplicationContext，所以该实现类具备了读取Resource定义的BeanDefinition的能力。因为AbstractApplicationContext的基类是DefaultResourceLoader。而且其它的类如FileSystemXmlApplicationContext、XmlWebApplicationContext等等都如出一辙。也是通过DefaultResourceLoader读取Resource。

下面我们再来看一下ClassPathXmlApplicationContext的顺序图。通过这个顺序图可以清晰的看到IOC容器的初始化阶段所调用的各个方法。

![image-20230105111346199](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230105111346199.png)

那么接下来我们从ClassPathXmlApplicationContext这个类来分析Spring的IoC容器是如何一步一步完成定位的：

①、我们知道IOC容器的启动是从refresh()方法开始的，所以我们先从refresh()方法开始：ClassPathXmlApplicationContext类中调用的refresh()方法是其继承的基类 AbstractApplicationContext中的实现，所以先跟踪AbStractApplicationContext中的refresh()方法：

注意：在refresh()中我们先重点看obtainFreshBeanFactory()这个方法，这是IoC容器初始化的入口。

```java
public void refresh() throws BeansException, IllegalStateException {
    synchronized (this.startupShutdownMonitor) {
     
        //刷新上下文环境
        prepareRefresh();
         
        //我们先着重看这个方法 这是初始化容器的地方，是在子类中启动refreshBeanFactory()
        //并且在这里获得新的BeanFactory，解析XML、Java类，并加载BeanDefinition
        ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();
 
        //准备bean工厂，以便在此上下文中使用
        prepareBeanFactory(beanFactory);
 
        try {
            //设置 beanFactory 的后置处理
            postProcessBeanFactory(beanFactory);
            //调用 BeanFactory 的后处理器，这些处理器是在Bean 定义中向容器注册的
            invokeBeanFactoryPostProcessors(beanFactory);
            //注册Bean的后处理器，在Bean创建过程中调用
            registerBeanPostProcessors(beanFactory);
            //对上下文中的消息源进行初始化
            initMessageSource();
            //初始化上下文中的事件机制
            initApplicationEventMulticaster();
            //初始化其他特殊的Bean
            onRefresh();
            //检查监听Bean并且将这些监听Bean向容器注册
            registerListeners();
            //实例化所有的（non-lazy-init）单件
            finishBeanFactoryInitialization(beanFactory);
            //发布容器事件，结束Refresh过程
            finishRefresh();
        }
 
        catch (BeansException ex) {
            if (logger.isWarnEnabled()) {
                logger.warn("Exception encountered during context initialization - " +
                        "cancelling refresh attempt: " + ex);
            }
            destroyBeans();
            cancelRefresh(ex);
            throw ex;
        }
        finally {
            //重置Spring公共的缓存
            resetCommonCaches();
        }
    }
}
```

②、然后点击obtainFreshBeanFactory()这个方法，它还在AbstractApplicationContext中实现，这个obtainFreshBeanFactory()很关键，这里面有 IoC的Resource定位和载入。

```java
protected ConfigurableListableBeanFactory obtainFreshBeanFactory() {
    refreshBeanFactory();
    return getBeanFactory();
}
```

进来后发现其调用refreshBeanFactory和getBeanFactory方法，表示重新获取一个新的BeanFactory实例。

③、继续跟踪refreshBeanFactory()方法，点击进入。

```java
protected abstract void refreshBeanFactory() throws BeansException, IllegalStateException;
```

可以看到这里只是定义了抽象方法，既然是抽象的方法，那么肯定有具体的实现，那这个具体初始化IOC容器的实现在哪呢？在AbstractApplicationContext中没有做具体实现。我们从前面的继承图可知，AbstractApplicationContext还有很多子类，所以肯定是交给其子类完成，实现解耦，让初始化IOC容器变得更加灵活。

所以我们从其子类AbstractRefreshableApplicationContext中找到实现的refreshBeanFactory()方法。

```java
protected final void refreshBeanFactory() throws BeansException {
    //这里判断，如果存在了BeanFactory,则销毁并关闭该BeanFactory
    if (hasBeanFactory()) {
        destroyBeans();
        closeBeanFactory();
    }
    try {
        //这里的创建新的BeanFactory，对于DefaultListableBeanFactory前面一章已经介绍了很多了，应该都知道它的作用
        DefaultListableBeanFactory beanFactory = createBeanFactory();
        beanFactory.setSerializationId(getId());
        customizeBeanFactory(beanFactory);
        //载入Bean ,抽象方法，委托子类AbstractXmlApplicationContext实现
        //后面会看到一系列重载的loadBeanDefinitions方法
        loadBeanDefinitions(beanFactory);
        synchronized (this.beanFactoryMonitor) {
            this.beanFactory = beanFactory;
        }
    }
    catch (IOException ex) {
        throw new ApplicationContextException("I/O error parsing bean definition source for " + getDisplayName(), ex);
    }
}
```

上面的代码主要分为这么几个步骤：

1. 1. 首先判断BeanFactory是否存在，如果存在(不为NULL)，则销毁关闭该BeanFactory。也就是清除跟Bean有关的Map或者List等属性集合，并且将BeanFactory设置为null，序列化Id设置为null。
   2. 然后创建一个新的DefaultListableBeanFactory（这个类是Spring Bean初始化的核心类）,所以我们看下创建DefaultListableBeanFactory的地方：createBeanFactory()，这个方法 是在AbstractRefreshableApplicationContext中实现，所以AbstractApplicationContext 让我们可以充分自由的实例化自己想初始化的原始IOC容器。

```java
protected DefaultListableBeanFactory createBeanFactory() {
        //getInternalParentBeanFactory 获取当前容器已有的父亲容器，来作为新容器的父容器，这个方法是在AbstractApplicationContext中实现的。
        return new DefaultListableBeanFactory(getInternalParentBeanFactory());
    }
```

1. 最后对新建的BeanFactory进行设置，包括bean序列化Id的设置、bean的特殊设置，bean载入操作。然后将beanFactory赋值给本类的beanFactory属性。注意：customizeBeanFactory(beanFactory)里面只做了两件事：一个是设置bean是否允许覆盖，另一个是设置bean是否允许循坏使用。

④、跟踪loadBeanDefinitions(beanFactory)方法。

```java
protected abstract void loadBeanDefinitions(DefaultListableBeanFactory beanFactory)
        throws BeansException, IOException;
```

这个方法的具体实现是由子类AbstractXmlApplicationContext具体实现的。所以我们知道了该怎么去找这个loadBeanDefinitions的具体实现了吧。

```java
protected void loadBeanDefinitions(DefaultListableBeanFactory beanFactory) throws BeansException, IOException {
    //创建一个xml配置读写器用于解析xml文件中定义的bean
    XmlBeanDefinitionReader beanDefinitionReader = new XmlBeanDefinitionReader(beanFactory);
 
    //设置BeanDefinitionReader 的相关属性
    //1.设置 Environment，即环境，与容器的环境一致
    beanDefinitionReader.setEnvironment(this.getEnvironment());
    //2.设置 ResourceLoader，即资源加载器，具体加载资源的功能,这个加载器很重要,后面会用到
    //  这里传一个this进去，因为ApplicationContext是实现了ResourceLoader接口
    beanDefinitionReader.setResourceLoader(this);
    //3.设置 EntityResolver，即实体解析器，这里用于解析资源加载器加载的资源内容
    beanDefinitionReader.setEntityResolver(new ResourceEntityResolver(this));
 
    //这个方法默认实现是空的,允许用户自定义实现读取器的定制化,需要实现接口,可以设置xml解析完成校验,定制化解析器等
    initBeanDefinitionReader(beanDefinitionReader);
    // 这里开始就是 加载、获取BeanDefinition资源定位，并且是载入模块的开始了
    loadBeanDefinitions(beanDefinitionReader);
}
```

⑤、继续跟踪loadBeanDefinitions(beanDefinitionReader)方法，这个方法在AbstractXMLApplicationContext中有实现，我们看下。

```java
protected void loadBeanDefinitions(XmlBeanDefinitionReader reader) throws BeansException, IOException {
    //以Resource的方式获取所有定位到的resource资源位置（用户定义）
    //但是现在不会走这条路，因为配置文件还没有定位到，也就是没有封装成Resource对象。
    Resource[] configResources = getConfigResources();
    if (configResources != null) {
        reader.loadBeanDefinitions(configResources);//载入resources
    }
    //以String的方式获取所有配置文件的位置（容器自身）
    String[] configLocations = getConfigLocations();
    if (configLocations != null) {
        reader.loadBeanDefinitions(configLocations);//载入resources
    }
}
```

这里主要是获取到用户定义的resource资源位置以及获取所以本地配置文件的位置。

 

⑥、进入第二个reader.loadBeanDefinitions(configLocations)方法。从这里开始就是BeanDefinitionReader模块的实现了，也就是ApplicationContext上下文将BeanDefinition的定位加载工作交付到了XmlBeanDefinitionReader。这个方法是由XmlBeanDefinitionReader的基类AbstractBeanDefinitionReader来实现的。

```java
public int loadBeanDefinitions(String... locations) throws BeanDefinitionStoreException {
    Assert.notNull(locations, "Location array must not be null");
    int count = 0;
    //循坏加载配置文件
    for (String location : locations) {
        count += loadBeanDefinitions(location);
    }
    return count;
}
```

这里就是循环加载xml配置文件的路径，然后返回总个数。

⑦、下面我们继续跟踪loadBeanDefinitions(loaction)这个方法，它是还在AbstractBeanDefinitionReader的类中实现。

```java
public int loadBeanDefinitions(String location) throws BeanDefinitionStoreException {
        return loadBeanDefinitions(location, null);
    }
```

⑧、继续跟踪上面代码中的 loadBeanDefinitions(location, null)。

进入到`loadBeanDefinitions(String location, Set<Resource> actualResources)`这个方法，依然在AbstractBeanDefinitionReader类中。

```java
public int loadBeanDefinitions(String location, @Nullable Set<Resource> actualResources) throws BeanDefinitionStoreException {
    //这里取到ResourceLoader对象（其实DefaultResourceLoader对象）
    ResourceLoader resourceLoader = getResourceLoader();
    if (resourceLoader == null) {
        throw new BeanDefinitionStoreException(
                "Cannot load bean definitions from location [" + location + "]: no ResourceLoader available");
    }
    //这里对Resource的路径模式进行解析，比如我们设定的各种Ant格式的路径定义，得到需要的Resource集合，
    //这些Resource集合指定我们已经定义好的BeanDefinition信息，可以是多个文件。
    if (resourceLoader instanceof ResourcePatternResolver) {
        try {
            //把字符串类型的xml文件路径，形如：classpath*:user/**/*-context.xml,转换成Resource对象类型，
            //其实就是用流的方式加载配置文件，然后封装成Resource对象
            Resource[] resources = ((ResourcePatternResolver) resourceLoader).getResources(location);
            //加载Resource资源中的Bean,然后返回加载数量，这个loadBeanDefinitions就是Bean的载入了
            int count = loadBeanDefinitions(resources);
            if (actualResources != null) {
                Collections.addAll(actualResources, resources);
            }
            if (logger.isTraceEnabled()) {
                logger.trace("Loaded " + count + " bean definitions from location pattern [" + location + "]");
            }
            return count;
        }
        catch (IOException ex) {
            throw new BeanDefinitionStoreException(
                    "Could not resolve bean definition resource pattern [" + location + "]", ex);
        }
    }
    else {
        // Can only load single resources by absolute URL.
        // 调用DefaultResourceLoader的getResource(String)方法来获取资源定位，然后封装成Resource对象,这里只能加载一个资源
        Resource resource = resourceLoader.getResource(location);
        //循环加载所有的资源,返回总数，这个loadBeanDefinitions就是Bean的载入了
        int count = loadBeanDefinitions(resource);
        if (actualResources != null) {
            //对于成功找到的Resource定位，都会添加到这个传入的actualResources参数中
            actualResources.add(resource);
        }
        if (logger.isTraceEnabled()) {
            logger.trace("Loaded " + count + " bean definitions from location [" + location + "]");
        }
        return count;
    }
}
```

这个方法中主要将xml配置文件加载到内存中并封装成为Resource对象。但是它是怎么操作的呢？在上述代码中，loadBeanDefinitions()方法中可能调用ResourcePatternResolver或DefaultResourceLoader中的getResource()方法，这两个类一个是继承、一个是实现ResourceLoader。其中ResourcePatternResolver用于解析资源文件的策略接口，其特殊的地方在于，它应该提供带有*号这种通配符的资源路径。DefaultResourceLoader用于用来加载资源，并且具体实现了ResourceLoader中的方法。而在第④步的时候，在实例化XmlBeanDefinitionReader的时候已经设置ResourceLoader，并且ResourceLoad为ApplicationContext，然后也设置了ResourcePatternResolver。所以XmlBeanDefinitionReader有了加载资源和解析资源的功能。

⑨、所以我们直接来看getResource()方法，DefaultResourceLoader中的 getResource(String)实现。

```java
public Resource getResource(String location) {
    Assert.notNull(location, "Location must not be null");
    //看有没有自定义的ProtocolResolver，如果有则先根据自定义的ProtocolResolver解析location得到Resource
    for (ProtocolResolver protocolResolver : getProtocolResolvers()) {
        Resource resource = protocolResolver.resolve(location, this);
        if (resource != null) {
            return resource;
        }
    }
    //根据路径是否匹配"/"或"classpath:"来解析得到ClassPathResource
    if (location.startsWith("/")) {
        return getResourceByPath(location);
    }
    else if (location.startsWith(CLASSPATH_URL_PREFIX)) {
        return new ClassPathResource(location.substring(CLASSPATH_URL_PREFIX.length()), getClassLoader());
    }
    else {
        try {
            //这里处理带有URL标识的Resource定位
            URL url = new URL(location);
            return (ResourceUtils.isFileURL(url) ? new FileUrlResource(url) : new UrlResource(url));
        }
        catch (MalformedURLException ex) {
            //如果既不是classPath 也不是URL标识的Resource定位（那其实就是自己实现的了）.则把getResource的重任交给getResourceByPath来完成，
            //这个方法是一个protected方法，默认的实现是得到一个ClassPathContextResource，这个方法常常会用子类来实现也就是FileSystemXMLApplicationContext
            return getResourceByPath(location);
        }
    }
}
```

通过上述代码可以看到，getResource最后又调用了子类实现的getResourceByPath方法或是子类传递过来的字符串，从而实现Resource定位。使得整个Resource定位过程就说得通了。总结起来就是，Resource资源通过最外层的实现类传进来的字符串或者直接调用getResourceByPath方法，来获取bean资源路径。

对上面的代码进行四步来进行介绍：

- 第一步：首先看有没有自定义的ProtocolResolver，如果有则先根据自定义的ProtocolResolver解析location得到Resource（默认ProtocolResolver是空的，后面我们会说）

```java
for (ProtocolResolver protocolResolver : getProtocolResolvers()) {
    Resource resource = protocolResolver.resolve(location, this);
    if (resource != null) {
        return resource;
    }
}
```

这里的protocolResolvers是DefaultResourceLoader类中的成员变量，而这个成员变量是ProtocolResolver类型的Set集合。

- 第二步：再根据路径是否匹配"/"或"classpath:"来解析得到ClassPathResource。

```java
if (location.startsWith("/")) {
    return getResourceByPath(location);
}
else if (location.startsWith(CLASSPATH_URL_PREFIX)) {
    return new ClassPathResource(location.substring(CLASSPATH_URL_PREFIX.length()), getClassLoader());
}
```

- 第三步：最后处理带有URL标识的Resource定位，加载得到一个UrlResource，如果都不是这些类型，则交给getResourceByPath来完成。

```java
else {
    try {
        // Try to parse the location as a URL...
        URL url = new URL(location);
        return (ResourceUtils.isFileURL(url) ? new FileUrlResource(url) : new UrlResource(url));
    }
    catch (MalformedURLException ex) {
        // No URL -> resolve as resource path.
        return getResourceByPath(location);
    }
}
```

- 第四步：上面的getResourceByPath()方法会根据路径加载Resource对象

```java
protected Resource getResourceByPath(String path) {
    return new ClassPathContextResource(path, getClassLoader());
}
```

上面方法返回的是一个ClassPathContextResource对象，通过这个对象Spring就可以进行相关的I/O操作了。

 

因为对ProtocolResolver这个类不是很熟悉，所以我去了解了一下，ProtocolResolver翻译过来就是"协议解析器"，这个接口类里就只有一个方法，方法如下：

```java
Resource resolve(String location, ResourceLoader resourceLoader);
```

我们在第一步的时候调用了ProtocolResolver的resolve方法，如果你要使用ProtocolResolver。我们可以自定义一个类实现ProtocolResolver接口，然后实现该resolve方法，就可以解析特定的location得到Resoure。是的，ProtocolResolver是解析location的自定义拓展类，有了它我们才能随意传入不同格式的location，然后根据对应的格式去解析并获得我们的Resource即可。

 

关于DefaultResourceLoader和ProtocolResolver的区别：

1. DefaultResourceLoader类的作用是加载Resource
2. ProtocolResolver是解析location获取Resource的拓展

默认情况下，DefaultResourceLoader类中的protocolResolvers成员变量是一个空的Set，即默认情况下是没有ProtocolResolver可以去解析的，只能走ClassPath和URL两种方式获得Resource。

 

至此我们的Resource定位已经全部完成了。饶了这么远就是为了拿到这个Resource对象，拿到这个对象后，就可以通过AbstractBeanDefinitionReader流操作来实现Resource的载入，最后通过AbstractApplicationContext的registerListeners来进行注册。这就是IoC容器的初始化过程。所以下面我们来介绍一下Resource的载入工程。``

## 4. BeanDefinition的载入

在完成对Resource定位分析之后，就可以通过获取的Resource对象进行BeanDefinition的载入了。对IOC容器来说，这个载入过程，相当于把定义的bean在IOC容器中转化成一个Spring内部表示的数据结构的过程，也就是将其转化为BeanDefinition，IOC容器对Bean的管理和依赖注入功能的实现，是通过对其持有的BeanDefinition进行各种相关操作来完成的，这些BeanDefinition在IOC容器中通过一个HashMap来保持和维护。

我们继续跟踪AbstractBeanDefinitionReader中的loadBeanDefinitions方法，之前跟踪到的是如下图的loadBeanDefinitions方法。

![image-20230105112513883](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230105112513883.png)

①、继续跟到loadBeanDefinitions(resource)方法。

```java
public int loadBeanDefinitions(Resource... resources) throws BeanDefinitionStoreException {
     Assert.notNull(resources, "Resource array must not be null");
     int count = 0;
     // 将所有定位到的Resource资源全部加载，交给XmlBeanDefinitionReader实现的方法来处理这些resource
     for (Resource resource : resources) {
         count += loadBeanDefinitions(resource);
     }
     return count;
 }
```

这里循环加载定位到Resource资源，这个方法跟前面循环加载资源路径类似，但加载的内容不一样。

②、然后点击进入loadBeanDefinitions(resource)，进入之后我们可以发现，在BeanDefinitionReader接口定义了两个加载Resource资源的方法：

```java
int loadBeanDefinitions(Resource resource) throws BeanDefinitionStoreException;
 
int loadBeanDefinitions(Resource... resources) throws BeanDefinitionStoreException;
```

这两个方法具体由BeanDefinitionReader接口的子类XmlBeanDefinitionReader 实现，其继承关系如下图所示。

![image-20230105112609332](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230105112609332.png)

XmlBeanDefinitionReader主要用来将Bean的XML配置文件转换为多个BeanDefinition对象的工具类，所以它会将定位到的Resource资源进行处理。我们先来看上面两个实现的方法，大致过程是，先将resource包装为EncodeResource类型，然后继续进行处理，为生成BeanDefinition对象为后面做准备，我们在XmlBeanDefinitionReader类中找到实现的方法，其主要的两个方法的源码如下。

```java
public int loadBeanDefinitions(Resource resource) throws BeanDefinitionStoreException {
    //包装resource为EncodeResource类型
    return loadBeanDefinitions(new EncodedResource(resource));
}
 
public int loadBeanDefinitions(EncodedResource encodedResource) throws BeanDefinitionStoreException {
    Assert.notNull(encodedResource, "EncodedResource must not be null");
    if (logger.isTraceEnabled()) {
        logger.trace("Loading XML bean definitions from " + encodedResource);
    }
    // 这里使用threadLocal来保证并发的同步
    Set<EncodedResource> currentResources = this.resourcesCurrentlyBeingLoaded.get();
    //先添加threadLocal，加载完之后finally中再移除threadLocal
    if (!currentResources.add(encodedResource)) {
        throw new BeanDefinitionStoreException(
                "Detected cyclic loading of " + encodedResource + " - check your import definitions!");
    }
    // 通过resource对象得到XML文件内容输入流，并为I/O的InputSource做准备
    try (InputStream inputStream = encodedResource.getResource().getInputStream()) {
        InputSource inputSource = new InputSource(inputStream);
        if (encodedResource.getEncoding() != null) {
            inputSource.setEncoding(encodedResource.getEncoding());
        }
        //这里就是具体读取Xml文件的方法
        return doLoadBeanDefinitions(inputSource, encodedResource.getResource());
    }
    catch (IOException ex) {
        throw new BeanDefinitionStoreException(
                "IOException parsing XML document from " + encodedResource.getResource(), ex);
    }
    finally {
        currentResources.remove(encodedResource);
        if (currentResources.isEmpty()) {
            this.resourcesCurrentlyBeingLoaded.remove();
        }
    }
}
```

③、接着进入doLoadBeanDefinitions方法，这里就是具体读取Xml文件的方法，也是从指定xml文件中实际载入BeanDefinition的地方。当然了这肯定是在XmlBeanDefinitionReader中的方法了。

```java
protected int doLoadBeanDefinitions(InputSource inputSource, Resource resource)
        throws BeanDefinitionStoreException {
 
    try {
        //这里取得的是XML文件的Document对象，具体的解析过程是由DocumentLoader完成的，
        //这里使用的DocumentLoader是DefaultDocumentLoader，在定义documentLoader对象时候创建的
        Document doc = doLoadDocument(inputSource, resource);
        //这里启动的是对BeanDefinition解析的详细过程，也就是将document文件的bean封装成BeanDefinition，并注册到容器
        //启动对BeanDefinition解析的详细过程，这个解析会用到Spring的Bean配置规则，是我们下面详细讲解的内容
        int count = registerBeanDefinitions(doc, resource);
        if (logger.isDebugEnabled()) {
            logger.debug("Loaded " + count + " bean definitions from " + resource);
        }
        return count;
    }
    catch () {
        省略......
    }
}
```

DefaultDocumentLoader这个类大致了解即可，感兴趣可自行百度。

④、下面我们主要关心的是Spring的BeanDefinition是怎么样按照Spring的Bean语义要求进行解析 并转化为容器内部数据结构的，这个过程是在registerBeanDefinitions(doc, resource)中完成的，具体的过程是BeanDefinitionDocumentReader来完成的，这个registerBeanDefinitions还对载入的Bean数量进行了统计，这个方法也是在 XmlBeanDefinitionReader 中自己实现的，

```java
public int registerBeanDefinitions(Document doc, Resource resource) throws BeanDefinitionStoreException {
     //这里得到的BeanDefinitionDocumentReader对象来对XML的BeanDefinition信息进行解析
     BeanDefinitionDocumentReader documentReader = createBeanDefinitionDocumentReader();
     //获取容器中bean的数量
     int countBefore = getRegistry().getBeanDefinitionCount();
     //具体的解析过程在这个方法中实现    
     documentReader.registerBeanDefinitions(doc, createReaderContext(resource));
     return getRegistry().getBeanDefinitionCount() - countBefore;
 }
```

注意：BeanDefinition的载入分成两部分，首先通过调用XML的解析器（XmlBeanDefinitionReader）得到document对象，但这些document对象并没有 按照Spring的Bean规则去进行解析，在完成通用XML解析之后才是按照Spring得 Bean规则进行解析的地方，这个按照Spring的Bean规则进行解析的过程是在documentReade中实现的，这里使用的documentReader是默认设置好的DefaultBeanDefinitionDocumentReader，创建的过程也是在XmlBeanDefinitionReader 中完成的，根据指定的默认方式如下：

```java
private Class<? extends BeanDefinitionDocumentReader> documentReaderClass =
      DefaultBeanDefinitionDocumentReader.class;
protected BeanDefinitionDocumentReader createBeanDefinitionDocumentReader() {
   return BeanUtils.instantiateClass(this.documentReaderClass);
}
```

上面通过通过 XmlBeanDefinitionReader 类中的私有属性 documentReaderClass 获得一个 DefaultBeanDefinitionDocumentReader 实例对象，并且具体的解析过程在DefaultBeanDefinitionDocumentReader来实现，所以下面我们继续跟踪。

⑤、DefaultBeanDefinitionDocumentReader实现了BeanDefinitionDocumentReader接口，它的registerBeanDefinitions方法定义如下：

```java
public void registerBeanDefinitions(Document doc, XmlReaderContext readerContext) {
   this.readerContext = readerContext;
   doRegisterBeanDefinitions(doc.getDocumentElement());
}
```

这里只是将 XML中的元素取了出来，但是具体的活还是 doRegisterBeanDefinitions(root)来实现的，do开头的方法才是真正干活的方法。

 

⑥、所以继续跟踪doRegisterBeanDefinitions(root)方法

```java
protected void doRegisterBeanDefinitions(Element root) {
     // 创建了BeanDefinitionParserDelegate对象
     BeanDefinitionParserDelegate parent = this.delegate;
     this.delegate = createDelegate(getReaderContext(), root, parent);
 
    // 如果是Spring原生命名空间，首先解析 profile标签，这里不重要
     if (this.delegate.isDefaultNamespace(root)) {
         String profileSpec = root.getAttribute(PROFILE_ATTRIBUTE);
         if (StringUtils.hasText(profileSpec)) {
             String[] specifiedProfiles = StringUtils.tokenizeToStringArray(
                     profileSpec, BeanDefinitionParserDelegate.MULTI_VALUE_ATTRIBUTE_DELIMITERS);
             if (!getReaderContext().getEnvironment().acceptsProfiles(specifiedProfiles)) {
                 if (logger.isDebugEnabled()) {
                     logger.debug("Skipped XML bean definition file due to specified profiles [" + profileSpec +
                             "] not matching: " + getReaderContext().getResource());
                 }
                 return;
             }
         }
     }
     //解析BeanDefinition之前做的一些事情的接口触发
     preProcessXml(root);
     //主要看这个方法，标签具体解析过程
     parseBeanDefinitions(root, this.delegate);
     // 解析BeanDefinition之后可以做的一些事情的触发
     postProcessXml(root);
 
    this.delegate = parent;
 }
```

在这个方法中，我们重点看“一类三法”，也就是BeanDefinitionParserDelegate类和preProcessXml、parseBeanDefinitions、postProcessXml三个方法。其中BeanDefinitionParserDelegate类非常非常重要（需要了解代理技术，如JDK动态代理、cglib动态代理等）。Spirng BeanDefinition的解析就是在这个代理类下完成的，此类包含了各种对符合Spring Bean语义规则的处理，比如`<bean></bean>、<import></import>、<alias><alias/>`等的检测。对于preProcessXml、parseBeanDefinitions、postProcessXml这三个方法，其中preProcessXml和postProcessXml都是空方法，意思是在解析标签前后我们自己可以扩展需要执行的操作，也是一个模板方法模式，体现了Spring的高扩展性。parseBeanDefinitions方法才是标签的具体解析过程。所以下面进入parseBeanDefinitions方法看具体是怎么解析标签的。

 

⑦、前面提到Document对象不能通过XmlBeanDefinitionReader，真正去解析Document文档树的是 BeanDefinitionParserDelegate完成的，这个解析过程是与Spring对BeanDefinition的配置规则紧密相关的，parseBeanDefinitions(root, delegate)方法如下：

```java
protected void parseBeanDefinitions(Element root, BeanDefinitionParserDelegate delegate) {
    if (delegate.isDefaultNamespace(root)) {
        NodeList nl = root.getChildNodes();
        // 遍历所有节点，做对应解析工作
        // 如遍历到<import>标签节点就调用importBeanDefinitionResource(ele)方法对应处理
        // 遍历到<bean>标签就调用processBeanDefinition(ele,delegate)方法对应处理
        for (int i = 0; i < nl.getLength(); i++) {
            Node node = nl.item(i);
            if (node instanceof Element) {
                Element ele = (Element) node;
                if (delegate.isDefaultNamespace(ele)) {
                    //默认标签解析
                    parseDefaultElement(ele, delegate);
                }
                else {
                    //自定义标签解析
                    delegate.parseCustomElement(ele);
                }
            }
        }
    }
    else {
        delegate.parseCustomElement(root);
    }
}
```

这里有两种标签的解析：Spring原生标签和自定义标签，那来怎么区分这两种标签呢？如下：

- 默认标签：`<bean:/>`
- 自定义标签：`<context:component-scan/>`

如果带有bean的就是Spring默认标签，否则就是自定义标签。但无论哪种标签在使用前都需要在Spring的xml配置文件里声明Namespace URI，这样在解析标签时才能通过Namespace URI找到对应的NamespaceHandler。引入：`xmlns:context=http://www.springframework.org/schema/contex http://www.springframework.org/schema/beans`

⑧、上面的代码中先是isDefaultNamespace判断是不是默认标签，然后进入parseDefaultElement方法（自定义方法感兴趣可以自行百度）：

```java
private void parseDefaultElement(Element ele, BeanDefinitionParserDelegate delegate) {
    // 解析<import>标签
    if (delegate.nodeNameEquals(ele, IMPORT_ELEMENT)) {
        importBeanDefinitionResource(ele);
    }
    // 解析<alias>标签
    else if (delegate.nodeNameEquals(ele, ALIAS_ELEMENT)) {
        processAliasRegistration(ele);
    }
    // 解析<bean>标签,最常用，过程最复杂
    else if (delegate.nodeNameEquals(ele, BEAN_ELEMENT)) {
        processBeanDefinition(ele, delegate);
    }
    // 解析<beans>标签
    else if (delegate.nodeNameEquals(ele, NESTED_BEANS_ELEMENT)) {
        // recurse
        doRegisterBeanDefinitions(ele);
     }
 }
```

这里面主要是对import、alias、bean标签的解析以及beans的字标签的递归解析。

⑨、这里针对常用的`<bean>`标签中的方法做简单介绍，其他标签的加载方式类似，进入processBeanDefinition方法。

```java
protected void processBeanDefinition(Element ele, BeanDefinitionParserDelegate delegate) {
    //BeandefinitionHolder是BeanDefinition的封装，封装了BeanDefinition，bean的名字和别名，用它来完成向IOC容器注册，
    //得到BeanDefinitionHodler就意味着BeanDefinition是通过BeanDefinitionParseDelegate对xml元素按照bean的规则解析得到的
    BeanDefinitionHolder bdHolder = delegate.parseBeanDefinitionElement(ele);
    if (bdHolder != null) {
        bdHolder = delegate.decorateBeanDefinitionIfRequired(ele, bdHolder);
        try {
            // 这里是向IOC容器解析注册得到BeanDefinition的地方
            BeanDefinitionReaderUtils.registerBeanDefinition(bdHolder, getReaderContext().getRegistry());
        }
        catch (BeanDefinitionStoreException ex) {
            getReaderContext().error("Failed to register bean definition with name '" +
                    bdHolder.getBeanName() + "'", ele, ex);
        }
        // 在BeanDefinition向Ioc容器注册完成后发送消息
        getReaderContext().fireComponentRegistered(new BeanComponentDefinition(bdHolder));
    }
}
```

⑩、进入parseBeanDefinitionElement(Element ele)方法方法。

注意：parseBeanDefinitionElement(Element ele)方法会调用parseBeanDefinitionElement(ele, null)方法，需要强调一下的是parseBeanDefinitionElement(ele, null)方法中产生了一个抽象类型的BeanDefinition实例，这也是我们首次看到直接定义BeanDefinition的地方，这个方法里面会将`<bean>`标签中的内容解析到BeanDefinition中，如果在解析`<bean>`标签的过程中出现错误则返回null，之后再对BeanDefinition进行包装，将它与beanName,Alias等封装到BeanDefinitionHolder 对象中，然后返回BeanDefinitionHolder类对象，该部分源码如下：

```java
public BeanDefinitionHolder parseBeanDefinitionElement(Element ele) {
    return parseBeanDefinitionElement(ele, null);
}
 
public BeanDefinitionHolder parseBeanDefinitionElement(Element ele, @Nullable BeanDefinition containingBean) {
    // 获取id和name属性
    String id = ele.getAttribute(ID_ATTRIBUTE);
    String nameAttr = ele.getAttribute(NAME_ATTRIBUTE);
    // 获取别名属性，多个别名可用,;隔开
    List<String> aliases = new ArrayList<>();
    if (StringUtils.hasLength(nameAttr)) {
        String[] nameArr = StringUtils.tokenizeToStringArray(nameAttr, MULTI_VALUE_ATTRIBUTE_DELIMITERS);
        aliases.addAll(Arrays.asList(nameArr));
    }
 
    String beanName = id;
    if (!StringUtils.hasText(beanName) && !aliases.isEmpty()) {
        beanName = aliases.remove(0);
        if (logger.isTraceEnabled()) {
            logger.trace("No XML 'id' specified - using '" + beanName +
                    "' as bean name and " + aliases + " as aliases");
        }
    }
    // 检查beanName是否重复
    if (containingBean == null) {
        checkNameUniqueness(beanName, aliases, ele);
    }
    // 具体的解析封装过程还在这个方法里
    AbstractBeanDefinition beanDefinition = parseBeanDefinitionElement(ele, beanName, containingBean);
    if (beanDefinition != null) {
        if (!StringUtils.hasText(beanName)) {
            try {
                if (containingBean != null) {
                    beanName = BeanDefinitionReaderUtils.generateBeanName(
                            beanDefinition, this.readerContext.getRegistry(), true);
                }
                else {
                    beanName = this.readerContext.generateBeanName(beanDefinition);
                    // Register an alias for the plain bean class name, if still possible,
                    // if the generator returned the class name plus a suffix.
                    // This is expected for Spring 1.2/2.0 backwards compatibility.
                    String beanClassName = beanDefinition.getBeanClassName();
                    if (beanClassName != null &&
                            beanName.startsWith(beanClassName) && beanName.length() > beanClassName.length() &&
                            !this.readerContext.getRegistry().isBeanNameInUse(beanClassName)) {
                        aliases.add(beanClassName);
                    }
                }
                if (logger.isTraceEnabled()) {
                    logger.trace("Neither XML 'id' nor 'name' specified - " +
                            "using generated bean name [" + beanName + "]");
                }
            }
            catch (Exception ex) {
                error(ex.getMessage(), ele);
                return null;
            }
        }
        String[] aliasesArray = StringUtils.toStringArray(aliases);
        return new BeanDefinitionHolder(beanDefinition, beanName, aliasesArray);
    }
 
    return null;
}
```

上面的解析过程可以看做根据xml文件对`<bean>`的定义生成BeanDefinition对象的过程，这个BeanDefinition对象中封装的数据大多都是与`<bean>`相关的，例如：init-method,destory-method,factory-method,beanClass,descriptor。有了这个BeanDefinition中分装的信息，容器才能对Bean配置进行处理以及实现容器的特性。至此，我们的BeanDefine就已经载入完成了。

 ⑪、下面再来多加一个点，看一下bean的具体解析。

```java
public AbstractBeanDefinition parseBeanDefinitionElement(
        Element ele, String beanName, @Nullable BeanDefinition containingBean) {
 
    this.parseState.push(new BeanEntry(beanName));
    // 获取class名称和父类名称
    String className = null;
    if (ele.hasAttribute(CLASS_ATTRIBUTE)) {
        className = ele.getAttribute(CLASS_ATTRIBUTE).trim();
    }
    // 解析 parent 属性
    String parent = null;
    if (ele.hasAttribute(PARENT_ATTRIBUTE)) {
        parent = ele.getAttribute(PARENT_ATTRIBUTE);
    }
 
    try {
        // 创建GenericBeanDefinition对象
        AbstractBeanDefinition bd = createBeanDefinition(className, parent);
        // 解析bean标签的属性，并把解析出来的属性设置到BeanDefinition对象中
        parseBeanDefinitionAttributes(ele, beanName, containingBean, bd);
        bd.setDescription(DomUtils.getChildElementValueByTagName(ele, DESCRIPTION_ELEMENT));
        //解析bean中的meta标签
        parseMetaElements(ele, bd);
        //解析bean中的lookup-method标签
        parseLookupOverrideSubElements(ele, bd.getMethodOverrides());
        //解析bean中的replaced-method标签 
        parseReplacedMethodSubElements(ele, bd.getMethodOverrides());
        //解析bean中的constructor-arg标签
        parseConstructorArgElements(ele, bd);
        //解析bean中的property标签 
        parsePropertyElements(ele, bd);
        // 解析子元素 qualifier 子元素
        parseQualifierElements(ele, bd);
 
        bd.setResource(this.readerContext.getResource());
        bd.setSource(extractSource(ele));
 
        return bd;
    }
    catch (ClassNotFoundException ex) {
        error("Bean class [" + className + "] not found", ele, ex);
    }
    catch (NoClassDefFoundError err) {
        error("Class that bean class [" + className + "] depends on not found", ele, err);
    }
    catch (Throwable ex) {
        error("Unexpected failure during bean definition parsing", ele, ex);
    }
    finally {
        this.parseState.pop();
    }
 
    return null;
}
```

上面的代码是具体生成BeanDefinition的地方，bean标签的解析步骤仔细理解并不复杂，就是将一个个标签属性的值装入到了BeanDefinition对象中，这里需要注意parseConstructorArgElements和parsePropertyElements方法，分别是对constructor-arg和property标签的解析，解析完成后分别装入了BeanDefinition对象的constructorArgumentValues和propertyValues中，而这两个属性在c和p标签的解析中还会用到，而且还涉及一个很重要的设计思想——装饰器模式。Bean标签解析完成后将生成的BeanDefinition对象、bean的名称以及别名一起封装到了BeanDefinitionHolder对象并返回，然后调用了decorateBeanDefinitionIfRequired进行装饰，后面具体的调用就不具体介绍了，想了解的可以自行百度。

## 5. BeanDefinition的注册

在完成了BeanDefinition的载入和解析后，就要对它进行注册。我们知道最终Bean配置会被解析成BeanDefinition并与beanName，Alias一同封装到BeanDefinitionHolder类中，然后返回这个对象，所以我们顺着BeanDefinitionHolder类创建的地方，也就是DefaultBeanDefinitionDocumentReader的processBeanDefinition()方法继续往下看。

```java
protected void processBeanDefinition(Element ele, BeanDefinitionParserDelegate delegate) {
    //BeandefinitionHolder是BeanDefinition的封装，封装了BeanDefinition，bean的名字和别名，用它来完成向IOC容器注册，
    //得到BeanDefinitionHodler就意味着BeanDefinition是通过BeanDefinitionParseDelegate对xml元素按照bean的规则解析得到的
    BeanDefinitionHolder bdHolder = delegate.parseBeanDefinitionElement(ele);
    if (bdHolder != null) {
        bdHolder = delegate.decorateBeanDefinitionIfRequired(ele, bdHolder);
        try {
            // 这里是向IOC容器解析注册得到BeanDefinition的地方
            BeanDefinitionReaderUtils.registerBeanDefinition(bdHolder, getReaderContext().getRegistry());
        }
        catch (BeanDefinitionStoreException ex) {
            getReaderContext().error("Failed to register bean definition with name '" +
                    bdHolder.getBeanName() + "'", ele, ex);
        }
        // 在BeanDefinition向Ioc容器注册完成后发送消息
        getReaderContext().fireComponentRegistered(new BeanComponentDefinition(bdHolder));
    }
}
```

然后跟踪到BeanDefinitionReaderUtils的registerBeanDefinition()方法，这里会传入上一步的BeanDefinitionHolder对象，并且将BeanDefinition注册到IoC容器中。进入BeanDefinitionReaderUtils类的registerBeanDefinition方法如下。

```java
public static void registerBeanDefinition(
        BeanDefinitionHolder definitionHolder, BeanDefinitionRegistry registry)
        throws BeanDefinitionStoreException {
 
    // 注册beanDefinition!!
    String beanName = definitionHolder.getBeanName();
    registry.registerBeanDefinition(beanName, definitionHolder.getBeanDefinition());
 
    // 如果有别名的话也注册进去
    String[] aliases = definitionHolder.getAliases();
    if (aliases != null) {
        for (String alias : aliases) {
            registry.registerAlias(beanName, alias);
        }
    }
}
```

 

之后会调用BeanDefinitionRegistry接口的registerBeanDefinition( beanName, bdHolder.getBeanDefinition())方法，而对于IoC容器中最重要的一个类DefaultListableBeanFactory实现了该接口的方法。这个方法的主要目的就是将BeanDefinition存放至DefaultListableBeanFactory对象的beanDefinitionMap中，当初始化容器进行bean初始化时，在bean的生命周期分析里必然会在这个beanDefinitionMap中获取beanDefition实例。我们可以在DefaultListableBeanFactory中看到此Map的定义。

```java
/** Map of bean definition objects, keyed by bean name. */
private final Map<String, BeanDefinition> beanDefinitionMap = new ConcurrentHashMap<>(256);
```

下面我们在来看一下这个方法是如将BeanDefinition存放至beanDefinitionMap中的，DefaultListableBeanFactory中实现的registerBeanDefinition( beanName, bdHolder.getBeanDefinition() )方法具体如下：

```java
public void registerBeanDefinition(String beanName, BeanDefinition beanDefinition)
            throws BeanDefinitionStoreException {
 
        Assert.hasText(beanName, "Bean name must not be empty");
        Assert.notNull(beanDefinition, "BeanDefinition must not be null");
 
        if (beanDefinition instanceof AbstractBeanDefinition) {
            try {
                ((AbstractBeanDefinition) beanDefinition).validate();
            }
            catch (BeanDefinitionValidationException ex) {
                throw new BeanDefinitionStoreException(beanDefinition.getResourceDescription(), beanName,
                        "Validation of bean definition failed", ex);
            }
        }
 
        //此处检查是不是有相同名字的Bean存在
        //如果名字相同又不允许覆盖，就会抛出异常BeanDefinitionOverrideException
        BeanDefinition existingDefinition = this.beanDefinitionMap.get(beanName);
        if (existingDefinition != null) {
            if (!isAllowBeanDefinitionOverriding()) {
                throw new BeanDefinitionOverrideException(beanName, beanDefinition, existingDefinition);
            }
            else if (existingDefinition.getRole() < beanDefinition.getRole()) {
                // e.g. was ROLE_APPLICATION, now overriding with ROLE_SUPPORT or ROLE_INFRASTRUCTURE
                if (logger.isInfoEnabled()) {
                    logger.info("Overriding user-defined bean definition for bean '" + beanName +
                            "' with a framework-generated bean definition: replacing [" +
                            existingDefinition + "] with [" + beanDefinition + "]");
                }
            }
            else if (!beanDefinition.equals(existingDefinition)) {
                if (logger.isDebugEnabled()) {
                    logger.debug("Overriding bean definition for bean '" + beanName +
                            "' with a different definition: replacing [" + existingDefinition +
                            "] with [" + beanDefinition + "]");
                }
            }
            else {
                if (logger.isTraceEnabled()) {
                    logger.trace("Overriding bean definition for bean '" + beanName +
                            "' with an equivalent definition: replacing [" + existingDefinition +
                            "] with [" + beanDefinition + "]");
                }
            }
            //存储Bean（Bean名字作为key，BeanDefinition作为value）
            this.beanDefinitionMap.put(beanName, beanDefinition);
        }
        else {
            if (hasBeanCreationStarted()) {
                //注册的过程需要保证数据的一致性
                synchronized (this.beanDefinitionMap) {
                    //将获取到的BeanDefinition放入Map中，容器操作使用bean时通过这个HashMap找到具体的BeanDefinition
                    //存储Bean（Bean名字作为key，BeanDefinition作为value）
                    this.beanDefinitionMap.put(beanName, beanDefinition);
                    List<String> updatedDefinitions = new ArrayList<>(this.beanDefinitionNames.size() + 1);
                    updatedDefinitions.addAll(this.beanDefinitionNames);
                    updatedDefinitions.add(beanName);
                    this.beanDefinitionNames = updatedDefinitions;
                    removeManualSingletonName(beanName);
                }
            }
            else {
                // Still in startup registration phase
                this.beanDefinitionMap.put(beanName, beanDefinition);
                this.beanDefinitionNames.add(beanName);
                removeManualSingletonName(beanName);
            }
            this.frozenBeanDefinitionNames = null;
        }
 
        if (existingDefinition != null || containsSingleton(beanName)) {
            resetBeanDefinition(beanName);
        }
        else if (isConfigurationFrozen()) {
            clearByTypeCache();
        }
    }
```

当把所有的BeanDefinition(懒加载除外）都存入IOC容器中的HashMap后，注册就结束了。但是注意，以上仅仅是BeanDefinition的载入、载入和注册，Bean之间的依赖关系并不会在初始化的时候完成！后面还需要调用一系列方法才会完成初始化。

## 参考文章

[Spring详解（五）——Spring IOC容器的初始化过程](https://www.cnblogs.com/tanghaorong/p/13497223.html)