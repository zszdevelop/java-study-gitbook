# Spring容器

在Spring中，应用的生存依赖于Spring 容器（container），容器是Spirng框架的核心，Spring容器使用DI管理构成应用的组件，他会创建相互协作的组件之间的关联。

优势：这样创建的对象

- 更简单干净
- 更易于理解
- 更易于重用
- 更易于单元测试

## 1.Spring容器的职责

- 创建对象
- 装配
- 配置并管理他们的整个生命周期，从生存到思维（new到finalize（））

## 2.Spring容器的实现

大体可以分成两种类型

- bean工厂（由beanFactory接口定义）

  最简单的容器，提供基本的DI支持

- **应用上下文（ApplicationContext接口定义）**

  更受欢迎

  基于BeanFactory构建，并提供应用架构级别的服务

## 3.应用上下文

Spring自带了多种类型的应用上下文

- AnnotationConfigApplicationContext:从一个或多个基于Java的配置类中加载Spring应用上下文
- AnnotationConfigWebApplicationContext:从一个或多个基于Java的配置类中加载Spring Web 应用上下文
- ClassPathXmlApplicationContext:从类路径下的一个或多个xml配置文件中加载上下文定义，把应用上下文的定义文件作为类资源
- FileSystemXmlApplicationContext:从文件系统下的一个或多个Xml配置文件中加载上下文定义
- XmlWebApplicationContext:从web 应用下的一个或多个xml配置文件中加载上下文定义‘

应用上下文准备就绪之后，我们就可以调用上下文的getBean()方法从Spring容器中获取bean

  

  