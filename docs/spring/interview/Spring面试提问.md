# Spring面试提问

作为面试官，关于Spring我常问的问题

### 1. 基础概念篇

1. 看你各个项目都用到了Spring，说说你自己对Spring的理解？

2. 你对spring 的整体架构了解吗？说说都有哪些模块组成？

   >按模块解释，并说出你常用的组件

3. 那么Spring框架都用到了哪些设计模式？

## 2. IoC篇

1. 谈谈自己对Spring IoC的理解？
2. IoC 的初始化过程？
3. IoC容器有几种类型？他们的区别？
4. 有多少种方式完成依赖注入？他们的区别？
5. 简述一下Spring IoC的实现原理？
6. 说一说循环依赖问题？

## 3. Spring Bean篇

1. Spring中bean 的作用域有哪些？
2. 说说Spring中单例Bean的线程安全问题?
3. @Component 和@Bean的区别是什么？
4. Bean的生命周期

## 3. AOP篇

1. 谈谈自己对Spring AOP的理解？
2. Spring AOP的原理？
3. Spring AOP和AspectJ AOP有什么区别？　

## 4. 事务篇

1. 什么是事务
2. 说说事务的特性？
3. 数据库是如何保证这些特性的呢？（数据库问题，非Spring）
4. 并发事务可能带来哪些问题？
5. Spring事务的隔离级别有哪些？
6. @Transactional( rollbackFor = Exception.class) 注解

## 5. SpringMVC篇

1. 说说Spring MVC的工作原理？
2. SpringMVC拦截器和filter过滤器有什么差别

## 6. Spring Boot篇

1. Spring boot 的自动配置是如何实现的？
2. 什么是嵌入式服务器？为什么要使用嵌入式服务器？
3. 微服务同时调用多个服务，怎么支持事务的？