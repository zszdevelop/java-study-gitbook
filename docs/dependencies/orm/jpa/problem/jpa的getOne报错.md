# Spring Data JPA使用getOne方法报错：Method threw 'org.hibernate.LazyInitializationException

## 1. 背景

之前项目一直用 jpa的dao.getOne() 都是正常的，但是加入线程池后，程序直接卡主不动。debug 后发现，提示

```
Method threw 'org.hibernate.LazyInitializationException' exception. Cannot evaluate com.xxx.xxx._$$_jvst6a8_a.toString()
```

为什么会出现这个问题呢？

## 2. 原因

**getOne 是懒加载**。每次初始化一个实体的关联就会创建一个**临时的session来加载**，每个临时的session都会获取一个**临时的数据库连接**，**开启一个新的事物**。这就导致对底层连接池压力很大，而且事物日志也会被每次flush.

设想一下：假如我们查询了一个分页list每次查出1000条，这个实体有三个lazy关联对象,那么，恭喜你，你至少需要创建3000个临时session+connection+transaction.

## 3. 解决方案

- 增加配置

  getOne 是懒加载，需要增加这个配置：

  ```
  spring.jpa.properties.hibernate.enable_lazy_load_no_trans=true
  ```

  这种方法不太友好，**不建议使用**

- 改用findOne 或 findById

  ```
  // findOne
  Example<MyEntity> example = Example.of(entity);
  MyEntity myEntity = riskWarnDao.findOne(example).get();
  
  // findById
  MyEntity myEntity = riskWarnDao.findById(idno).get();
  ```

## 参考文章

[Spring Data JPA使用getOne方法报错：Method threw 'org.hibernate.LazyInitializationException' exception. Cannot evaluat](https://www.itdaan.com/blog/2018/12/19/286dcc4fd95fa33a5e22901e4ecc9832.html)





