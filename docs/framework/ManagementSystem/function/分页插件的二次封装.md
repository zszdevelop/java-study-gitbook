# 分页插件的二次封装

### 1. 简介

分页是在项目中非常常见的需求。如果每次都要在业务代码中嵌入分页代码，将会

- 非常繁琐
- 影响业务代码的阅读
- 不同数据库分页写法不一，数据库迁移困难
- 还需要额外写计算总数count sql

## 2. 设计思路

1. 与前端约定分页参数

   约定好的参数，我们就不需要每次写。通过`Servlet` 的request 就可以获取到参数

2. 如果有传递分页参数就进行分页

3. 针对返回值也进行封装，计算分页前的总条数

## 3. 源码阅读

### 3.1 分页请求参数

![image-20211022213635796](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211022213635796.png)

我们在 BaseController中定义startPage 方法，调用此方法则代表要做分页操作。

### 3.2 参数获取

![image-20211022213809675](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211022213809675.png)

Servlet 中的实现 

![image-20211022213930030](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211022213930030.png)

![image-20211022214008185](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211022214008185.png)

### 3.3 返回封装

![image-20211022214059348](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211022214059348.png)

