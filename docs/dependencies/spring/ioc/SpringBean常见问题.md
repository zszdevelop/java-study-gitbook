# Spring Bean常见问题

## 1. 什么是Spring Bean？

- Bean 由Spring IoC 容器实例化，配置、装配和管理
- Bean 是基于用户提供给IoC 容器的配置元数据Bean Definition 创建

## 2. Spring 有哪些配置方式

单纯从Spring Framework 提供的方式，一共有三种：

1. XML 配置文件
2. 注解配置
3. Java Config 配置

## 3. 解释什么叫延迟加载？

默认情况下，容器启动之后会将所有作用域为**单例**的 Bean 都创建好，但是有的业务场景我们并不需要它提前都创建好。此时，我们可以在Bean 中设置 `lzay-init = "true"` 。

- 这样，当容器启动之后，作用域为单例的 Bean ，就不在创建。
- 而是在获得该 Bean 时，才真正在创建加载。