# Hibernate概念与原理

## 1. Hibernate的核心组件

- Configuration类：用来读取Hibernate配置文件，并生成SessionFactory对象。
- SessionFactory接口：产生Session实例工厂。
- Session接口：用来操作PO。它有get(),load(),save(),update()和delete()等方法用来对PO进行加载，保存，更新及删除等操作。它是Hibernate的核心接口。
- Query接口：用来对PO进行查询操。它可以从Session的createQuery()方法生成。
- Transaction接口：用来管理Hibernate事务，它主要方法有commit()和rollback()，可以从Session的beginTrancation()方法生成。

## 2. Persistent Object（持久化对象）

持久化对象可以是普通的Javabeans,惟一特殊的是它们与（仅一个）Session相关联。JavaBeans在Hibernate中存在三种状态：

1. 临时状态(transient)

   当一个JavaBean对象在内存中孤立存在，不与数据库中的数据有任何关联关系时，那么这个JavaBeans对象就称为临时对象(TransientObject)。

2. 持久化状态(persistent):

   当一个JavaBean对象与一个Session相关联时，就变成持久化对象(PersistentObject)

3. 脱管状态(detached):

   在这个Session被关闭的同时，这个对象也会脱离持久化状态，就变成脱管状态(DetachedObject)，可以被应用程序的任何层自由使用，例如可以做与表示层打交道的数据舆对象(Data Transfer Object)。

   

## 3. Hibernate的运行过程

1. 应用程序先调用Configration类，该类读取Hibernate的配置文件及映射文件中的信息，并用这些信息生成一个SessionFactory对象。
2. 然后从SessionFactory对象生成一个Session对象，并用Session对象生成Transaction对象;可通过Session对象的get(),load(),save(),update(),delete()和saveOrUpdate()等方法对PO进行加载，保存，更新，删除等操作;在查询的情况下，可通过Session对象生成一个Query对象，然后利用Query对象执行查询操作;如果没有异常，Transaction对象将 提交这些操作结果到数据库中。

#### 3.1 运行过程图

![image-20201010142111373](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201010142111373.png)

![image-20201010142134280](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201010142134280.png)

## 4. hibernate工作原理总结

1. 通过Configuration().configure();读取并解析hibernate.cfg.xml[配置文件](http://baike.baidu.com/view/2117618.htm)。

2. 由hibernate.cfg.xml中的<mappingresource="com/xx/User.hbm.xml"/>读取解析映射信息。

3. 通过config.buildSessionFactory();//得到sessionFactory。

4. sessionFactory.openSession();//得到session。

5. session.beginTransaction();//开启事务。

6. persistent operate;

7. session.getTransaction().commit();//提交事务

8. 关闭session;

9. 关闭sessionFactory;

## 参考文章

[Hibernate基本原理及概念详解](https://blog.csdn.net/lmb55/article/details/46536925)
