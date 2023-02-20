# Mybatis概念

### 1. 什么是MyBatis？

> MyBatis是一款优秀的基于java的持久层框架，它内部封装了jdbc，使开发者只需要关注sql语句本身，而不需要花费精力去处理加载驱动、创建连接、创建statement等繁杂的过程。

MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。

- mybatis是一个优秀的基于java的持久层框架，它内部封装了jdbc，使开发者只需要关注sql语句本身，而不需要花费精力去处理加载驱动、创建连接、创建statement等繁杂的过程。
- mybatis通过xml或注解的方式将要执行的各种statement配置起来，并通过java对象和statement中sql的动态参数进行映射生成最终执行的sql语句，最后由mybatis框架执行sql并将结果映射为java对象并返回。

**MyBatis的主要设计目**的就是让我们对执行SQL语句时对输入输出的数据管理更加方便，所以方便地写出SQL和方便地获取SQL的执行结果才是MyBatis的核心竞争力。

**Mybatis的功能架构分为三层**：

- **API接口层**：提供给外部使用的接口API，开发人员通过这些本地API来操纵数据库。接口层一接收到调用请求就会调用数据处理层来完成具体的数据处理。
- **数据处理层**：负责具体的SQL查找、SQL解析、SQL执行和执行结果映射处理等。它主要的目的是根据调用的请求完成一次数据库操作。
- **基础支撑层**：负责最基础的功能支撑，包括连接管理、事务管理、配置加载和缓存处理，这些都是共用的东西，将他们抽取出来作为最基础的组件。为上层的数据处理层提供最基础的支撑。

更多介绍可以参考：[MyBatis3 官方网站](https://mybatis.org/mybatis-3/)

### 2. 为什么说MyBatis是半自动ORM？

> 为什么说MyBatis是半自动ORM？

- **什么是ORM**？

JDBC，ORM知识点可以参考[SpringBoot入门 - 添加内存数据库H2]()

- **什么是全自动ORM**？

ORM框架可以根据对象关系模型直接获取，查询关联对象或者关联集合对象，简单而言使用全自动的ORM框架查询时可以不再写SQL。典型的框架如Hibernate； 因为Spring-data-jpa很多代码也是Hibernate团队贡献的，所以spring-data-jpa也是全自动ORM框架。

- **MyBatis是半自动ORM**？

Mybatis 在查询关联对象或关联集合对象时，需要手动编写 sql 来完成，所以，称之为半自动ORM 映射工具。

（PS: 正是由于MyBatis是半自动框架，基于MyBatis技术栈的框架开始考虑兼容MyBatis开发框架的基础上提供自动化的能力，比如MyBatis-plus等框架）

### 3. MyBatis栈技术演进

> 了解MyBatis技术栈的演进，对你构建基于MyBatis的知识体系极为重要。

#### 3.1 JDBC，自行封装JDBCUtil

Java5的时代，通常的开发中会自行封装JDBC的Util，比如创建 Connection，以及确保关闭 Connection等。

#### 3.2 IBatis

MyBatis的前身，它封装了绝大多数的 JDBC 样板代码，使得开发者只需关注 SQL 本身，而不需要花费精力去处理例如注册驱动，创建 Connection，以及确保关闭 Connection 这样繁杂的代码。

#### 3.3 MyBatis

伴随着JDK5+ 泛型和注解特性开始流行，IBatis在3.0变更为MyBatis，对泛型和注解等特性开始全面支持，同时支持了很多新的特性，比如：

1. mybatis实现了接口绑定，通过Dao接口 和xml映射文件的绑定，自动生成接口的具体实现
2. mybatis支持 ognl表达式，比如 `<if>, <else>`使用ognl进行解析
3. mybatis插件机制等，（PageHelper分页插件应用而生，解决了数据库层的分页封装问题）

所以这个时期，**MyBatis XML 配置方式 + PageHelper** 成为重要的开发方式。

#### 3.4 MyBatis衍生：代码生成工具等

MyBatis提供了开发上的便捷，但是依然需要写大量的xml配置，并且很多都是CRUD级别的（这便有了很多重复性的工作），所以为了减少重复编码，衍生出了MyBatis代码生成工具, 比如CodeGenerator等。

其它开发IDE也开始出现封装一些工具和插件来生成代码生成工具等。

由于后端视图解析引擎多样性（比如freemarker, volicty, thymeleaf等），以及前后端分离前端独立等，为了进一步减少重复代码的编写（包括视图层），自动生成的代码工具也开始演化为自动生成前端视图代码。

#### 3.5 pring+MyBatis基于注解的配置集成

与此同时，Spring 2.5 开始完全支持基于注解的配置并且也支持JSR250 注解。在Spring后续的版本发展倾向于通过注解和Java配置结合使用。基于Spring+MyBatis开发技术栈开始有xml配置方式往注解和java配置方式反向发展。

Spring Boot的出现便是要解决配置过多的问题，它实际上通过约定大于配置的方式大大简化了用户的配置，对于三方组件使用xx-starter统一的对Bean进行默认初始化，用户只需要很少的配置就可以进行开发了。所以出现了mybatis-spring-boot-starter的封装等。

这个阶段，主要的开发技术栈是 **Spring + mybatis-spring-boot-starter 自动化配置 + PageHelper**，并且很多数据库实体mapper还是通过xml方式配置的（伴随着使用一些自动化生成工具）。

#### 3.6 MyBatis-Plus

为了更高的效率，出现了MyBatis-Plus这类工具，对MyBatis进行增强。

1. **考虑到MyBatis是半自动化ORM**，MyBatis-Plus 启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作; 并且内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求；总体上让其支持全自动化的使用方式（本质上借鉴了Hibernate思路）。
2. **考虑到Java8 Lambda（函数式编程）开始流行**，MyBatis-Plus支持 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
3. **考虑到MyBatis还需要独立引入PageHelper分页插件**，MyBatis-Plus支持了内置分页插件，同PageHelper一样基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
4. **考虑到自动化代码生成方式**，MyBatis-Plus也支持了内置代码生成器，采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用
5. **考虑到SQL性能优化等问题**，MyBatis-Plus内置性能分析插件, 可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
6. 其它还有解决一些常见开发问题，比如**支持主键自动生成**，支持4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题；以及**内置全局拦截插件**，提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作

> 顶层思维能力
>
> 用这种思路去理解，你便能很快了解MyBatis技术栈的演化（能够快速维护老一些的技术框架），以及理解新的中小项目中MyBatis-Plus被大量使用的原因（新项目的技术选型参考）；所以java全栈知识体系的目标是帮助你构建知识体系，甚至是辅助你培养顶层思维能力。

## 参考文章

[**SpringBoot集成MySQL - MyBatis XML方式**](https://pdai.tech/md/spring/springboot/springboot-x-mysql-mybatis-xml.html)

