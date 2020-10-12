# Maven核心知识

## 1. Maven 简介

Maven 是一个项目管理工具，他包含了

- 一个项目对象模型（Project Object Model）
- 一组标准集合
- 一个项目生命周期（Project Lifecycle）
- 一个依赖管理系统（Dependency Management System）
- 和用来运行定义在生命周期阶段（phase）中的插件（pulgin）目标（goal）的逻辑

## 2. 核心功能

- 依赖管理：Maven工程对jar包的管理过程
- 项目构建

## 3. 仓库

- 本地仓库
- 远程仓库（私服）
- 中央仓库

## 4. Maven 常用命令

- clean：删除项目中已经编译好的信息，删除target目录
- compile：Maven工程的编译命令，用于编译项目的源代码，将`src/main/java`下的文件编译成class文件输出到target目录下
- test：使用合适的单元测试框架运行测试
- package：将编译好的代码打包成可分发的格式，如jar，war
- install：安装包至本地仓库，已备本地的其它项目作为依赖使用
- deploy: 复制最终的包至远程仓库，共享给其他开发人员和项目（通常和一次正式发布相关）

每一个构建项目的命令都对应了maven底层一个插件

## 5. Maven命令package、install、deploy 的联系和区别

- mvn clean package：

  依次执行了clean、resources、compile、testResources、testCompile、test、jar（打包）等七个阶段

- mvn clean install：

  依次执行了 clean、resources、compile、testResuources、testComplie、jar（打包）、install 等8个阶段

- mvn clean deploy:

  依次执行了clean、resources、compile、testResuources、testComplie、jar（打包）、install、deploy等9个阶段

**主要区别：**
package命令完成了项目编译、单元测试、打包功能，但没有把打好的可执行jar包（war包或其它形式的包）布署到本地maven仓库和远程maven私服仓库。

install命令完成了项目编译、单元测试、打包功能，同时把打好的可执行jar包（war包或其它形式的包）布署到本地maven仓库，但没有布署到远程maven私服仓库。

deploy命令完成了项目编译、单元测试、打包功能，同时把打好的可执行jar包（war包或其它形式的包）布署到本地maven仓库和远程maven私服仓库。

## 6. Maven 生命周期

清理生命周期：运行 mvn clean 将调用清理生命周期

默认生命周期：是一个软件应用程序构建过程的总体模型

compile、test、package、install、deploy

站点生命周期：为一个或者一组项目生成项目文档和报告，使用较少。

## 7. Maven 依赖范围

- complie：默认范围、编译测试运行都有效

- provided：编译和运行有效，最后在运行的时候不会加入

  官方举了一个例子。比如在JavaEE web项目中我们需要使用servlet的API，但是Tomcat中已经提供这个jar，我们在编译和测试的时候需要使用这个api，但是部署到tomcat的时候，如果还加入servlet构建就会产生冲突，这个时候就可以使用provided。

- runtime：测试和运行有效

- test：测试有效

- system：与本机系统关联，编译和测试时有效

-　import：导入的范围，它只在使用dependencyManagement中，表示从其他pom中导入dependecy的配置。

## 8. 依赖冲突

每个显示申明的类包都会依赖于一些其它的隐式类，这些隐式的类包会被maven间接依赖进来，因而可能造成一个我们不想要的类包的载入，严重的甚至会引起类包之间的冲突

要解决这个问题，首先就是要查看pom.xml 显式和隐式的依赖类包，然后通过这个类包树找出我们不想要的依赖类包，手工将其排除在外就可以了

```xml
<exclusions>  
    <exclusion>  
        <artifactId>unitils-database</artifactId>  
        <groupId>org.unitils</groupId>  
    </exclusion>  
</exclusions>  
```



## 参考文章

[[Maven核心知识点梳理](https://www.cnblogs.com/sgh1023/p/10900130.html)](https://www.cnblogs.com/sgh1023/p/10900130.html)