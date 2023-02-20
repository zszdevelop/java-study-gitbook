---
order: 10
category:
  - Mysql
  - 数据库
---

# MySQL知识体系详解

## 知识体系

*相关文章*

> ** 掌握MySQL数据库**：在理解了SQL语言后，开始进阶MySQL相关的知识点吧（在开始前，建议你完整看一本MySQl相关的书，作为你的知识体系基础）；这里不会讲如何安装MySQL或者如何使用，因为这是容易的，而是会关注一些有助于我们构建MySQL相关知识体系的知识点等。

- [MySQL - 数据类型](https://pdai.tech/md/db/sql-mysql/sql-mysql-theory.html)

  - 本文主要整理MySQL中数据字段类型。

- [MySQL - 存储引擎](https://pdai.tech/md/db/sql-mysql/sql-mysql-engine.html)

  - 本文主要介绍MySQL中的存储引擎。

- [MySQL - 索引(B+树)](https://pdai.tech/md/db/sql-mysql/sql-mysql-b-tree.html)

- [MySQL - 性能优化](https://pdai.tech/md/db/sql-mysql/sql-mysql-performance.html)

- [MySQL - 分表分库](https://pdai.tech/md/db/sql-mysql/sql-mysql-devide.html)

- [MySQL - 主从复制与读写分离](https://pdai.tech/md/db/sql-mysql/sql-mysql-slave.html)

- [MySQL - 一条 SQL 的执行过程详解](https://pdai.tech/md/db/sql-mysql/sql-mysql-execute.html)

  - 天天和数据库打交道，一天能写上几十条 SQL 语句，但你知道我们的系统是如何和数据库交互的吗？MySQL 如何帮我们存储数据、又是如何帮我们管理事务？....是不是感觉真的除了写几个 「select * from dual」外基本脑子一片空白？这篇文章就将带你走进 MySQL 的世界，让你彻底了解系统到底是如何和 MySQL 交互的，MySQL 在接受到我们发送的 SQL 语句时又分别做了哪些事情。

- [MySQL - MySQL中SQL是如何解析的](https://pdai.tech/md/db/sql-mysql/sql-mysql-sql-parser.html)

  - 前文我们分享了一篇文章学习一条SQL是如何在数据库中执行的，其中有一个阶段是SQL的解析。这个阶段对于更全面的SQL优化功能；多维度的慢查询分析；辅助故障分析等都有很大帮助。本文主要介绍一篇美团技术团队关于SQL解析和应用的文章，希望能给一些启示。

- [大厂实践 - 美团: MySQL索引原理及慢查询优化](https://pdai.tech/md/db/sql-mysql/sql-mysql-index-improve-mt.html)

  - 目前常用的 SQL 优化方式包括但不限于：业务层优化、SQL逻辑优化、索引优化等。其中索引优化通常通过调整索引或新增索引从而达到 SQL 优化的目的，索引优化往往可以在短时间内产生非常巨大的效果。本文旨在以开发工程师的角度来解释数据库索引的原理和如何优化慢查询。

- [大厂实践 - 美团: 基于代价的慢查询优化建议](https://pdai.tech/md/db/sql-mysql/sql-mysql-sql-costmodel-mt.html)

  - 前文我们介绍了优化慢查询最直接有效的方法就是选用一个查询效率高的索引, 也介绍了索引优化工具SQLAdvisor。关于高效率的索引推荐，主要在日常工作中，基于经验规则的推荐随处可见，对于简单的SQL，如`select * from sync_test1 where name like 'Bobby%'`，直接添加索引IX(name) 就可以取得不错的效果；但对于稍微复杂点的SQL，如`select * from sync_test1 where name like 'Bobby%' and dt > '2021-07-06'`，到底选择IX(name)、IX(dt)、IX(dt,name) 还是IX(name,dt)，该方法也无法给出准确的回答。更别说像多表Join、子查询这样复杂的场景了。所以采用基于代价的推荐来解决该问题会更加普适，因为基于代价的方法使用了和数据库优化器相同的方式，去量化评估所有的可能性，选出的是执行SQL耗费代价最小的索引。

  ## 参考文章

  [**大厂实践 - 美团: 基于代价的慢查询优化建议**](https://pdai.tech/md/db/sql-mysql/sql-mysql-sql-costmodel-mt.html)