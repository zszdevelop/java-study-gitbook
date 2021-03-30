# Hibernate的四种查询方式

## 1.简介

1. 主键查询
2. HQL查询
3. QBC查询
4. 本地SQL查询

## 2. 主键查询

通过主键来查询数据库的记录，从而返回一个JavaBean对象

- **session.get(javaBean.class, int id); 【传入对应的class和id就可以查询】**
- **session.load(javaBean.class, int id); 【支持懒加载】**

示例：

```
       User user1 = (User) session.get(User.class, 1);
        System.out.println(user1);
```

## 3. HQL查询

HQL:hibernate query language 即hibernate提供的面向对象的查询语言

- 优点：可读性好，功能强大效率高。

- 缺点：由于是字符串形式，只有在运行时才被解析，故扩展性差。

### 3.1 HQL简单示例

```java
        Query query = session.createQuery("FROM User WHERE id=?");

        //这里的？号是从0开始的，并不像JDBC从1开始的！
        query.setParameter(0, user.getId());

        List list = query.list();
        System.out.println(list);
```

### 3.2 HQL详细操作

```java
//1.书写HQL语句：
    基本查询：String hql = "对象的完整类名"; //查询所有的对象
    条件查询：String hql = "from 对象名 where 属性名=***";
		     String hql = "select ** from 对象名 where 属性名=***";
		     String hql = "from 对象名 where 属性名=*** order by ** desc/asc"; //排序
		     String hql = "select count(*) from 对象名 where 属性名=***"; //聚合函数
              //其他聚合函数：sum(列名) avg(列名) max(列名) min(列名)
    投影查询：String hql = "select new 对象名(参数) from 对象名 ";
    多表查询：普通内连接：String hql ="from 对象名1 别名 inner join 别名.对象名2";
            迫切内连接：String hql ="from 对象名1 别名 inner join fetch 别名.对象名2";
            左外连接：String hql ="from 对象名1 别名 left  join 别名.对象名2";
            右外连接：String hql ="from 对象名1 别名 right join 别名.对象名2";
    ?号占位符：String hql = "from 对象名 where 属性名=?";
    :号占位符：String hql = "from 对象名 where 属性名=:***";  //***为该":"的名称

//2.创建查询对象
    Quert query = session.createQuery(hql);  
//3.设置查询参数
    query.setLong(0,1l); //?参数类型为Long
    query.setParameter(索引号,参数数据);  //?参数类型为任意
    query.setParameter(":的名称",参数数据); 
    query.setFirstResult(int); //分页：开始查询的页数
    query.setMaxResults(int);  //分页：每页显示多少条数据
//4.查询并获取结果
    query.list(); //返回List<Object[]>   List<对象名>
    query.uniqueResult(); //唯一查询结果
```

## 4. QBC查询

**QBC查询: query by criteria 完全面向对象的查询**

- QBC优点：提供面向对象的接口，编译时即可被解析，便于调试，扩展性好，允许用户扩展Criteria接口。

- QBC缺点：可读性差；不支持报表查询和子查询。

### 4.1 QBC简单示例

```java
        //创建关于user对象的criteria对象
        Criteria criteria = session.createCriteria(User.class);

        //添加条件
        criteria.add(Restrictions.eq("id", 1));

        //查询全部数据
        List list = criteria.list();
        System.out.println(list);
```

### 4.2 QBC 详细操作

```java
//1.创建查询对象    
    //创建Criteria查询对象
    Criteria c=session.createCriteria(**.class); //查询所有的**对象。
    //创建离线Criteria对象
    DetachedCriteria dc = DetachedCriteria.forClass(**.class);
    Criteria c = dc.getExecutableCriteria(session);
//2.添加查询参数
    c.add(Restrictions.eq("属性名",属性值)); //除了eq(==)，还有下面这些：
    //（>,gt） （>=,ge） （<,lt） （<=,le）（!=,ne） （between and,between）（is null,isNull）
    //（Nullis not null,isNotNull）还有几个一样的：in、like、or、and
    c.setFirstResult(int);  //分页信息
    c.setMaxResults(int);  //分页信息
    c.setProjection(Projections.rowCount()); //聚合函数，此处为查询总行数
    c.addOrder(Order.desc("属性名"));  //排序。desc(降序)、asc(升序)
//3.查询并获取结果
    c.list();  //方式一
    对象 * = (强转*)c.uniqueResult(); //方式二
    List<泛型> list = (List<泛型>) getHibernateTemplate().findByCriteria(dc); //方式三
```



## 5. 本地SQL查询 **(**复杂的业务查询)

- 适合场景：复杂的业务查询
- 缺点：无法跨平台

### 5.1 原生SQL简单实用

```java
        //将所有的记录封装成User对象存进List集合中
        SQLQuery sqlQuery = session.createSQLQuery("SELECT * FROM user").addEntity(User.class);

        List list = sqlQuery.list();

        System.out.println(list);
```

### 5.2 原生SQL详细操作

```
//1.书写sql语句
    String sql = "……limit ?,?";
//2.创建sql查询对象
    SQLQuery query = session.createSQLQuery(sql);
//3.设置查询参数
    query.addEntity(**.class); //指定结果集封装到某对象中
    query.setParameter(0,索引0的数据); //?参数
//4.查询并获取结果
    List<类名> list = query.list(); //设置步骤3
    List<Object[]> list = query.list(); //未设置步骤3
```

## 参考文章

[**Hibernate**](https://www.yuque.com/yiwang/java/sbvuni)

[Hibernate的四种查询方式（主键查询，HQL查询，Criteria](https://cloud.tencent.com/developer/article/1010155)