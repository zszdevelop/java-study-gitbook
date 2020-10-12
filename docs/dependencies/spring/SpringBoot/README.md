# Spring Boot常见知识点

## 1. Spring Boot 的自动配置是如何实现

Spring Boot 项目的启动注解是：@SpringBootApplication，其实他由下面三个注解组成的：

- @SpringBootConfiguration
- @ComponentScan
- @EnableAutoConfiguration

### 1.1 加载过程

- 其中@EnableAutoConfiguration 是实现自动配置的入口，

- 该注解又通过 @Import 注解导入了AutoConfigurationImportSelector，在该类中加载 META-INF/spring.factories 的配置信息。
- 然后筛选出以EnableAutoConfiguration 为key的数据，加入到IOC 容器中，实现自动配置功能

## 2. 什么是嵌入式服务器？我们为什么要使用嵌入式服务器呢？

当我们创建一个可以部署的应用程序的时候，我们将会把服务器（例如：tomcat）嵌入到可部署的服务器中。

例如：对于一个 Spring Boot 应用程序来说，你可以生成一个包含 Embedded Tomcat 的应用程序 jar。你就可以像运行正常 Java 应用程序一样来运行 web 应用程序了。

嵌入式服务器就是我们的可执行单元包含服务器的二进制文件（例如，tomcat.jar）。

>思考一下再你虚拟机部署应用程序需要什么
>
>1. 安装java
>2. 安装web 或者是应用程序的服务器（Tomcat、weblogic等等）
>3. 部署应用程序war
>
>如果我们想简化这些步骤，应该怎么做呢？
>
>让我们来思考如何使服务器成为应用程序的一部分？
>
>你只需要一个安装了 Java 的虚拟机，就可以直接在上面部署应用程序了，

## 3. 微服务同时调用多个服务，怎么支持事务的？

- 集成 Aatomikos 支持分布式事务

  一般不建议这样使用，因为使用分布式事务会增加请求的响应时间，影响系统的TPS

- 消息的补偿机制来处理分布式事务

## 4. 个服务之间通信，对Restful 和RPC 这2中方式如何选择

在传统的SOA治理中，使用rpc的居多；Spring Cloud默认使用restful进行服务之间的通讯。rpc通讯效率会比restful要高一些，但是对于大多数公司来讲，这点效率影响甚微。我建议使用restful这种方式，易于在不同语言实现的服务之间通讯。

## 5. 怎么设计无状态服务

### 5.1 什么是无状态

如果一个数据需要被多个服务共享，才能完成一笔交易，那么**这个数据被称为状态**。进而依赖这个“状态”数据的服务被称为有状态服务，反之称为无状态服务

### 5.2 如何设计

无状态服务原则并不是说在微服务架构里就不允许存在状态，表达的真实意思是要把有状态的业务服务改变为无状态的计算类服务，那么状态数据也就相应的迁移到对应的“有状态数据服务”中

### 5.3 场景说明

例如我们以前在本地内存中建立的数据缓存、Session缓存，到现在的微服务架构中就应该把这些数据迁移到分布式缓存中存储，让业务服务变成一个无状态的计算节点。迁移后，就可以做到按需动态伸缩，微服务应用在运行时动态增删节点，就不再需要考虑缓存数据如何同步的问题。

## 6. Spring Cache 三种常用的缓存注解和意义？

- @Cacheable：

  用来声明方法是可缓存的，将结果存储到缓存中以便后续使用相同参数调用时不需执行实际的方法，直接从缓存中取值。

- CachePut：

  使用 @CachePut 标注的方法在执行前，不会去检查缓存中是否存在之前执行过的结果，而是每次都会执行该方法，并将执行结果以键值对的形式存入指定的缓存中。

- @CacheEvict:

  是用来标注在需要清除缓存元素的方法或类上的，当标记在一个类上时表示其中所有的方法的执行都会触发缓存的清除操作。

## 7. Spring Boot 如何设置支持跨域请求

### 7.1 什么是跨域

现代浏览器出于安全的考虑， HTTP 请求时必须遵守同源策略，否则就是跨域的 HTTP 请求，默认情况下是被禁止的，IP（域名）不同、或者端口不同、协议不同（比如 HTTP、HTTPS）都会造成跨域问题。

### 7.2 支持跨域

配置CoreFilter

```java
@Configuration
public class CorsConfig {


    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList("*")); //http:www.a.com
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("*"));
        config.setMaxAge(300l);

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```

## 8. JPA 和 Hibernate 有哪些区别？JPA 可以支持动态 SQL 吗？

### 8.1 JPA 和 Hibernate 有哪些区别？

JPA本身是一种规范，它的本质是一种ORM规范（不是ORM框架，因为JPA并未提供ORM实现，只是制定了规范）因为JPA是一种规范，所以，只是提供了一些相关的接口，但是接口并不能直接使用，JPA底层需要某种JPA实现，Hibernate 是 JPA 的一个实现集。

### 8.2 JPA 可以支持动态 SQL 吗？

JPA 是根据实体类的注解来创建对应的表和字段，如果需要动态创建表或者字段，需要动态构建对应的实体类，再重新调用Jpa刷新整个Entity。动态SQL，mybatis支持的最好，jpa也可以支持，但是没有Mybatis那么灵活。

## 9.Spring Boot 约定优先于配置（最大的优势）

Spring Boot 的最大的优势是“约定优于配置“。“约定优于配置“是一种软件设计范式，开发人员按照约定的方式来进行编程，可以减少软件开发人员需做决定的数量，获得简单的好处，而又不失灵活性。

### 9.1 Spring Boot 中“约定优于配置”的具体体现在哪里

Spring Boot Starter、Spring Boot Jpa 都是“约定优于配置“的一种体现。都是通过“约定优于配置“的设计思路来设计的，Spring Boot Starter 在启动的过程中会根据约定的信息对资源进行初始化；Spring Boot Jpa 通过约定的方式来自动生成 Sql ，避免大量无效代码编写

### 9.2 Spring Boot 在启动的时候会做的几件事情

- ① Spring Boot 在启动时会去依赖的 Starter 包中寻找 resources/META-INF/spring.factories 文件，然后根据文件中配置的 Jar 包去扫描项目所依赖的 Jar 包。
- ② 根据 spring.factories 配置加载 AutoConfigure 类
- ③ 根据 @Conditional 注解的条件，进行自动配置并将 Bean 注入 Spring Context

总结一下，其实就是 Spring Boot 在启动的时候，按照约定去读取 Spring Boot Starter 的配置信息，再根据配置信息对资源进行初始化，并注入到 Spring 容器中。这样 Spring Boot 启动完毕后，就已经准备好了一切资源，使用过程中直接注入对应 Bean 资源即可。

## 10. Spring 、Spring Boot 和 Spring Cloud 的关系?

Spring 最初最核心的两大核心功能 Spring Ioc 和 Spring Aop 成就了 Spring，Spring 在这两大核心的功能上不断的发展，才有了 Spring 事务、Spring Mvc 等一系列伟大的产品，最终成就了 Spring 帝国，到了后期 Spring 几乎可以解决企业开发中的所有问题。

Spring Boot 是在强大的 Spring 帝国生态基础上面发展而来，发明 Spring Boot 不是为了取代 Spring ,是为了让人们更容易的使用 Spring 。

Spring Cloud 是一系列框架的有序集合。它利用 Spring Boot 的开发便利性巧妙地简化了分布式系统基础设施的开发，如服务发现注册、配置中心、消息总线、负载均衡、断路器、数据监控等，都可以用 Spring Boot 的开发风格做到一键启动和部署。

Spring Cloud 是为了解决微服务架构中服务治理而提供的一系列功能的开发框架，并且 Spring Cloud 是完全基于 Spring Boot 而开发，Spring Cloud 利用 Spring Boot 特性整合了开源行业中优秀的组件，整体对外提供了一套在微服务架构中服务治理的解决方案。

用一组不太合理的包含关系来表达它们之间的关系。

Spring ioc/aop > Spring > Spring Boot > Spring Cloud