# Mybatis常见面试题

## 1. 什么是Mybatis?

Mybatis 是一个orm类型的半自动框架，执行了对JDBC的封装，是一个持久层框架，他可以通过XML文件或者注解来配置原生信息，不在需要去做更多繁琐重复的过程，如创建连接，加载驱动！

## 2. 说一下Mybatis的优缺点

**优点：**

基于SQL语句编译，相当**灵活**，与JDBC相比，**减少了50%的代码**，很好的与各种数据库兼容，能够与Spring很好的集成，**提供映射标签**，**支持对象关系组件维护**

**缺点：**

- **SQL语句的编写工作量较大**，尤其字段多，关联表多时，对发开人员编写SQL语句的功底有一定要求！

- SQL 语句依赖数据，导致数据库移植性差，不能随意更换数据库！

## 3. Mybatis 的使用场合

Mysql 专注于SQL本身，是一个足够灵活的DAO层解决方案，对性能要求很高，或者需求变化较多的项目，如互联网项目！

## 4. #{}和${} 的区别是什么？

`#{}` 是预编译处理，${} 是字符串替换

Mybatis 在处理#{} 时，会将sql中的#{} 替换为？号，调用PreparedStatement的set方法来赋值；

Mybatis 在处理`${}`，就是把`${}`替换成变量的值

使用#{}可以有效的防止SQL注入，提高系统安全性

## 5. 当实体类中的属性名和表中的字段名不一样，怎么办

### 5.1 方案1：通过在查询的sql语句中定义字段名的别名，让字段名和别名和实体类的属性名一致

```
<select id=”selectorder” parametertype=”int” resultetype=”me.gacl.domain.order”> 
	select order_id id, order_no orderno ,order_price price form orders where 	order_id=#{id}; 
</select> 
```

### 5.2 方案2：

通过`<resultMap>`来映射字段名和实体类属性名的一一对应关系

```
 <select id="getOrder" parameterType="int" resultMap="orderresultmap">
        select * from orders where order_id=#{id}
    </select>
   <resultMap type=”me.gacl.domain.order” id=”orderresultmap”> 
        <!–用id属性来映射主键字段–> 
        <id property=”id” column=”order_id”> 
        <!–用result属性来映射非主键字段，property为实体类属性名，column为数据表中的属性–> 
        <result property = “orderno” column =”order_no”/> 
        <result property=”price” column=”order_price” /> 
    </reslutMap>
```

## 6. 通常一个Xml映射文件，都会有一个Dao接口与之对应，请问，这个Dao接口的工作原理是什么？Dao接口里的方法，参数不同时，方法能重载吗？

Dao接口即Mapper接口，接口的全限名，就是映射文件的namespace的值，接口的方法名，就是映射文件中Mapper的Statement的id值，接口方法内的参数，就是传递个sql的参数！因为mapper接口是没有实现类的，所以在调用方法时，需要拿全限定路径名称加上方法名作为key值！

不能重载

## 7. 说一下resultMap 和 resultType

resultMap是手动提交、人为提交，resultType是自动提交

>MyBatis中在查询进行select映射的时候，返回类型可以用resultType，也可以用resultMap，resultType是直接表示返回类型的，而resultMap则是对外部ResultMap的引用，但是resultType跟resultMap不能同时存在。

在Mybatis进行查询映射时，其实查询出来的每一个属性都是放在一个对应的Map里面的，其中键是属性名，值则是其对应的值

1. 当提供的返回类型属性是resultType时，Mybatis会将Map里面的键值对取出赋给resultType所指定的对象对应的属性。所以其实Mybatis的每一个查询映射的返回类型都是ResultMap,只是当提供的返回类型属性是resultType的时候，Mybatis对自动的把对应的值赋给resultType所指定对象的属性
2. 当提供的返回类型是resultMap时，因为Map不能很好表示领域模型，就需要自己再进一步把他转化为对应的对象，这常常在复杂查询中很有作用

## 8. 如何在mapper中如何传递多个参数？

多个参数封装成map

>1. 映射文件的命名空间，SQL片段的id，就可以调用对应的映射文件的SQL
>2. 由于我们的参数超过2个，而方法只有一个Object参数搜集，因此我们使用Map集成来装载我们的参数

## 9. MyBatis动态sql有什么用？执行原理？有哪些动态sql？

有九种动态sql标签：trim,where,set,foreach,if,choose,when,bind,otherwise

**作用**：动态sql可以在xml映射文件内，以便签的形式编写动态sql

**执行原理：**根据表达式的值，完成逻辑判断并动态拼接sql的功能

## 10. Mybatis的xml映射文件中，不同的Xml映射文件，id是否可以重复

看不同情况对待，不同的xml配置文件

- 如果配置了namespace，那么id可以重复
- 如果没有配置namespace，那么id不能重复

## 11. 一对一关联查询使用什么标签？一对多关联查询使用什么标签？

- 一对多标签：collection

  MyBatis 中使用collection标签来解决一对多的关联查询

- 一对一标签：association

  使用association标签来解决一对一的关联查询

## 12. 什么是Mybatis的一级、二级缓存，如何开启？

- 一级缓存

  一级缓存是基于PerpetualCache的hashmap本地缓存，其存储作用域为session，当Session flush后，默认开启一级缓存

- 二级缓存：

  二级缓存和一级缓存的机制是相同的，默认也是采用PerpetualCache和hashmap本地缓存，不过他的存储作用在Mapper，而且可自定义存储源。要开启二级缓存，需要使用二级缓存属性类实现Serializable序列化的接口，可在他的映射文件中配置<cache/>

**缓存数据的更新机制**，当某一个作用域（一级缓存session/二级缓存namespace）的进行了c/u/d操作后，默认该作用域下的所有select中的缓存将被clear

## 13. 什么是Mybatis的接口绑定？有哪些实现方式？

接口绑定就是在mybatis中任意定义接口，然后把接口里面的方法和sql语句绑定，我们直接调用接口方法就可以，这样比原来sqlsession提供的方法我们可以更加灵活的选择和设置

**两种实现方式**

1. 在接口的方法上面加上@select、@update等注解，里面包含sql语句来绑定
2. 通过xml里面写sql语句来绑定，在这种情况下，要指定xml映射文件里面的namespace必须为接口的全路径名，

当sql语句比较简单的时候，用注解绑定，当sql语句比较复杂的时候，用下xml绑定，一般使用xml绑定的多

## 14. Mybaits 是如何进行分页的？分页插件的原理是什么？

- Mybatis使用RowBounds对象进行分页，它是针对ResultSet结果集执行的内存分页，而非物理分页，可以在sql内直接书写带有物理分页的参数来完成物理分页功能，也可以使用分页插件来完成物理分页。

- 分页插件的基本原理是使用Mybatis提供的插件接口，实现自定义插件，在插件的拦截方法内拦截待执行的sql，然后重写sql，根据dialect方言，添加对应的物理分页语句和物理分页参数。

## 15. Mybatis 是如何将sql执行结果封装为目标对象并返回的？都有哪些映射形式

### 15.1 方案1：`<resultMap>标签`

使用<resultMap>标签，逐一定义列名和对象属性名之间的映射关系

### 15.2 方案2：使用sql列的别名

使用sql列的别名功能，将列别名书写为对象的属性名，比如T_NAME AS NAME，对象属性名一般是name，小写，但是列名不区分大小写，Mybatis会忽略列名大小写，智能找到与之对应对象属性名，你甚至可以写成T_NAME AS NaMe，Mybatis一样可以正常工作。

## 16. 模糊查询like 语句该怎么写？

### 16.1 方案1：在java代码中添加sql通配符

```
    string wildcardname = “%smi%”; 
    list<name> names = mapper.selectlike(wildcardname);

    <select id=”selectlike”> 
     select * from foo where bar like #{value} 
    </select>
```

### 16.2 方案2：在sql语句中拼接通配符、会引起sql 注入

```
string wildcardname = “smi”; 
    list<name> names = mapper.selectlike(wildcardname);

    <select id=”selectlike”> 
     select * from foo where bar like "%"#{value}"%"
    </select>
```

## 

## 参考文章

[Mybatis 的常见面试题](<https://blog.csdn.net/eaphyy/article/details/71190441>)

[复习Mybatis框架，面试题](<https://zhuanlan.zhihu.com/p/60257737>)