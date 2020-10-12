# REST API

## 1.REST API 是什么

以信息为中心的表述行状态转移（Representational Satte Transfer,REST)

- 表达性（Representational）：REST 资源实际上可以用各种形式来进行表达，包括XML，JSON,甚至HTML
- 状态（State）：当使用REST 的时候，我们更关注资源的状态而不是对资源采取的行为
- 转移（Transfer）：REST 涉及到转移资源数据，他以某种表达性形式从一个应用转移到另一个应用

传统的SOAP关注行为和处理，而REST 关注的是要处理的数据

## 2.REST API 的特点

- **在REST 中资源通过URL 来进行识别和定位**，而结构并没有严格的规则，
-  **但是URL应该能够识别资源**，而不是简单的发一条命令到服务器上

- 关注的是事物（数据），而不是行为

## 33.REST API中的行为

他们通过Http 方法来定义的，也就是通过GET,POST,PUT,DELETE,PATCH构成REST API 的动作。

对应的CURD 操作

- Create：post
- Read:GET
- Update:PUT或PATCH
- Delete：DELETE

## 4.为什么要使用REST API

###  数据为王

对于开发人员：

​	关注与构建软件解决业务问题，数据只是软件完成工作时要处理的原材料

对于业务人员

​	数据是业务的生命之血，软件可替代，但积累的数据是永远无法替代的

