# JPA查询方式总结

## 查询方式种类

1. 按照jpa规范，通过方法名来创建查询 

   （简单的用这个，条件很多的话，用这个方法名会很长。）

2. Query by Example 

   每次需要重新new 对象传入(不支持or,仅支持and)

3. @Query  JPQL 或原生sql查询

4. EntityManager.createNativeQuery 原生SQL

## 1. 按照jpa规范，通过方法名来创建查询 

### 1.1 核心方法

- 查询所有数据 findAll()

- 修改 添加数据 S save(S entity)

- 分页查询 Page`<S>` findAll(Example`<S> `example, Pageable pageable)

- 根据id查询 findOne()

- 根据实体类属性查询： findByProperty (type Property); 例如：findByAge(int age)

- 删除 void delete(T entity)

- 计数 查询 long count() 或者 根据某个属性的值查询总数 countByAge(int age)

- 是否存在  boolean existsById(ID primaryKey)

### 1.2 查询关键字

- and

  And 例如：findByUsernameAndPassword(String user, Striang pwd)；

- or

  Or 例如：findByUsernameOrAddress(String user, String addr)；

- between

  Between 例如：SalaryBetween(int max, int min)；

- "<"

  LessThan 例如： findBySalaryLessThan(int max)；

- ">"

  GreaterThan 例如： findBySalaryGreaterThan(int min)；

- is null

  IsNull 例如： findByUsernameIsNull()；

- is not null

  IsNotNull NotNull 与 IsNotNull 等价 例如： findByUsernameIsNotNull()；

- like

  Like 例如： findByUsernameLike(String user)；

- not like

  NotLike 例如： findByUsernameNotLike(String user)；

- order by

  OrderBy 例如： findByUsernameOrderByNameAsc(String user)；直接通过name正序排序

- "!="

  Not 例如： findByUsernameNot(String user)；

- in

  In 例如： findByUsernameIn(Collection`<String>` userList) ，方法的参数可以是 Collection 类型，也可以是数组或者不定长参数；

- not in

  NotIn 例如： findByUsernameNotIn(Collection`<String>` userList) ，方法的参数可以是 Collection 类型，也可以是数组或者不定长参数；

- Top/Limit

  查询方法结果的数量可以通过关键字来限制，first 或者 top都可以使用。top/first加数字可以指定要返回最大结果的大小 默认为1



例如:

```java
User findFirstByOrderByLastnameAsc();
User findTopByOrderByAgeDesc();
Page<User> queryFirst10ByLastname(String lastname, Pageable pageable);
Slice<User> findTop3ByLastname(String lastname, Pageable pageable);
List<User> findFirst10ByLastname(String lastname, Sort sort);
List<User> findTop10ByLastname(String lastname, Pageable pageable);
```

### 1.3 详细查询语法

| **关键词**          | 示例                                                         | 对应的sql片段                                                |
| :------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `And`               | `findByLastnameAndFirstname`                                 | `… where x.lastname = ?1 and x.firstname = ?2`               |
| `Or`                | `findByLastnameOrFirstname`                                  | `… where x.lastname = ?1 or x.firstname = ?2`                |
| `Is,Equals`         | `findByFirstname`,`findByFirstnameIs`,`findByFirstnameEquals` | `… where x.firstname = ?1`                                   |
| `Between`           | `findByStartDateBetween`                                     | `… where x.startDate between ?1 and ?2`                      |
| `LessThan`          | `findByAgeLessThan`                                          | `… where x.age < ?1`                                         |
| `LessThanEqual`     | `findByAgeLessThanEqual`                                     | `… where x.age <= ?1`                                        |
| `GreaterThan`       | `findByAgeGreaterThan`                                       | `… where x.age > ?1`                                         |
| `GreaterThanEqual`  | `findByAgeGreaterThanEqual`                                  | `… where x.age >= ?1`                                        |
| `After`             | `findByStartDateAfter`                                       | `… where x.startDate > ?1`                                   |
| `Before`            | `findByStartDateBefore`                                      | `… where x.startDate < ?1`                                   |
| `IsNull`            | `findByAgeIsNull`                                            | `… where x.age is null`                                      |
| `IsNotNull,NotNull` | `findByAge(Is)NotNull`                                       | `… where x.age not null`                                     |
| `Like`              | `findByFirstnameLike`                                        | `… where x.firstname like ?1`                                |
| `NotLike`           | `findByFirstnameNotLike`                                     | `… where x.firstname not like ?1`                            |
| `StartingWith`      | `findByFirstnameStartingWith`                                | `… where x.firstname like ?1` (parameter bound with appended `%`) |
| `EndingWith`        | `findByFirstnameEndingWith`                                  | `… where x.firstname like ?1` (parameter bound with prepended `%`) |
| `Containing`        | `findByFirstnameContaining`                                  | `… where x.firstname like ?1` (parameter bound wrapped in `%`) |
| `OrderBy`           | `findByAgeOrderByLastnameDesc`                               | `… where x.age = ?1 order by x.lastname desc`                |
| `Not`               | `findByLastnameNot`                                          | `… where x.lastname <> ?1`                                   |
| `In`                | `findByAgeIn(Collection ages)`                               | `… where x.age in ?1`                                        |
| `NotIn`             | `findByAgeNotIn(Collection ages)`                            | `… where x.age not in ?1`                                    |
| `True`              | `findByActiveTrue()`                                         | `… where x.active = true`                                    |
| `False`             | `findByActiveFalse()`                                        | `… where x.active = false`                                   |
| `IgnoreCase`        | `findByFirstnameIgnoreCase`                                  | `… where UPPER(x.firstame) = UPPER(?1)`                      |

###  1.4 内置方法 （分页，排序）

- **Sort_排序**

```java
Sort sort =new Sort(Sort.Direction.ASC,"id");
//其中第一个参数表示是降序还是升序（此处表示升序）
//第二个参数表示你要按你的 entity（记住是entity中声明的变量，不是数据库中表对应的字段）中的那个变量进行排序
```

- **PageRequest_分页**

```java
PageRequest pageRequest = new PageRequest(index, num, sort);
//index偏移量 num查询数量 sort排序
```

  **分页+排序实现:**

```java
DemoBean demoBean = new DemoBean();
demoBean.setAppId(appId); //查询条件
//创建查询参数
Example<DemoBean> example = Example.of(demoBean);
//获取排序对象
Sort sort = new Sort(Sort.Direction.DESC, "id");
//创建分页对象
PageRequest pageRequest = new PageRequest(index, num, sort);
//分页查询
return demoRepository.findAll(example, pageRequest).getContent();
```

## 2. Example_实例查询

  创建一个ExampleMatcher对象，最后再用Example的of方法构造相应的Example对象并传递给相关查询方法。我们看看Spring的例子。

```java
Person person = new Person();                          
person.setFirstname("Dave");  //Firstname = 'Dave'                          
ExampleMatcher matcher = ExampleMatcher.matching()                     
			.withMatcher("name", GenericPropertyMatchers.startsWith()) //姓名采用“开始匹配”的方式查询
			.withIgnorePaths("int");  //忽略属性：是否关注。因为是基本类型，需要忽略掉
Example<Person> example = Example.of(person, matcher);  //Example根据域对象和配置创建一个新的ExampleMatcher  
```

  ExampleMatcher用于创建一个查询对象，上面的代码就创建了一个查询对象。withIgnorePaths方法用来排除某个属性的查询。withIncludeNullValues方法让空值也参与查询，就是我们设置了对象的姓，而名为空值.

### 2.1 概念定义:

 上面例子中，是这样创建“实例”的：Example`<Customer>` ex = Example.of(customer, matcher);我们看到，Example对象，由customer和matcher共同创建。

- 实体对象：

  在持久化框架中与Table对应的域对象，一个对象代表数据库表中的一条记录，如上例中Customer对象。在构建查询条件时，一个实体对象代表的是查询条件中的“数值”部分。如：要查询名字是“Dave”的客户，实体对象只能存储条件值“Dave”。

- 匹配器：ExampleMatcher对象，

  它是匹配“实体对象”的，表示了如何使用“实体对象”中的“值”进行查询，它代表的是“查询方式”，解释了如何去查的问题。如：要查询FirstName是“Dave”的客户,即名以“Dave"开头的客户，该对象就表示了“以什么开头的”这个查询方式，如上例中:withMatcher("name", GenericPropertyMatchers.startsWith())

- 实例：即Example对象

  代表的是完整的查询条件。由实体对象（查询条件值）和匹配器（查询方式）共同创建。

  再来理解“实例查询”，顾名思义，就是通过一个例子来查询。要查询的是Customer对象，查询条件也是一个Customer对象，通过一个现有的客户对象作为例子，查询和这个例子相匹配的对象。

### 2.2 特点及约束（局限性）:

- 支持动态查询。

  即支持查询条件个数不固定的情况，如：客户列表中有多个过滤条件，用户使用时在“地址”查询框中输入了值，就需要按地址进行过滤，如果没有输入值，就忽略这个过滤条件。对应的实现是，在构建查询条件Customer对象时，将address属性值置具体的条件值或置为null。

- 不支持过滤条件分组。**即不支持过滤条件用 or(或) 来连接，所有的过滤查件，都是简单一层的用 and(并且) 连接**。

- **仅支持**字符串的开始/包含/结束/正则表达式匹配 和 其他属性类型的**精确匹配**。

  查询时，对一个要进行匹配的属性（如：姓名 name），只能传入一个过滤条件值，如以Customer为例，要查询姓“刘”的客户，“刘”这个条件值就存储在表示条件对象的Customer对象的name属性中，针对于“姓名”的过滤也只有这么一个存储过滤值的位置，没办法同时传入两个过滤值。正是由于这个限制，有些查询是没办法支持的，例如要查询某个时间段内添加的客户，对应的属性是 addTime，需要传入“开始时间”和“结束时间”两个条件值，而这种查询方式没有存两个值的位置，所以就没办法完成这样的查询。

### 2.3 范例

- 综合使用:

  ```java
  //创建查询条件数据对象
      Customer customer = new Customer();
      customer.setName("zhang");
      customer.setAddress("河南省");
      customer.setRemark("BB");
   
      //创建匹配器，即如何使用查询条件
      ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
              .withStringMatcher(StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
              .withIgnoreCase(true) //改变默认大小写忽略方式：忽略大小写
              .withMatcher("address", GenericPropertyMatchers.startsWith()) //地址采用“开始匹配”的方式查询
              .withIgnorePaths("focus");  //忽略属性：是否关注。因为是基本类型，需要忽略掉
      
      //创建实例
      Example<Customer> ex = Example.of(customer, matcher); 
      
      //查询
      List<Customer> ls = dao.findAll(ex);
  ```

- 查询null值:

  ```
  //创建查询条件数据对象
          Customer customer = new Customer();
   
          //创建匹配器，即如何使用查询条件
          ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
                  .withIncludeNullValues() //改变“Null值处理方式”：包括
                  .withIgnorePaths("id","name","sex","age","focus","addTime","remark","customerType");  //忽略其他属性
          
          //创建实例
          Example<Customer> ex = Example.of(customer, matcher); 
          
          //查询
          List<Customer> ls = dao.findAll(ex);
  ```

## 3. @Query注解

查询接口不符合命名规范呢，如果想使用自定义查询，比如子查询呢？

上面所讲述的方法将失效，此时就要用到@Query注解，**注解里面使用JPQL语言或者普通SQL查询**。

### 3.1 JPQL

```JAVA
public interface UserRepository extends JpaRepository<User, Long> {
  @Query("select u from User u where u.emailAddress = ?1")
  User findByEmailAddress(String emailAddress);

 
  @Query("select u from User u where u.firstname like %?1")
  List<User> findByFirstnameEndsWith(String firstname);
}
```

### 3.2 原生sql查询

需要 添加：**nativeQuery = true**

```java
public interface UserRepository extends JpaRepository<User, Long> {
  @Query(value = "SELECT * FROM USERS WHERE EMAIL_ADDRESS = ?1", nativeQuery = true)
  User findByEmailAddress(String emailAddress);
}
```

### 3.3 怎么往@Query注解中的JPQL中传递参数呢？

两种方式：索引参数和命名参数。

- 索引参数

  索引参数如下所示，索引值从1开始，查询中 `”?X”`个数需要与方法定义的参数个数相一致，并且顺序也要一致。

  ```
  @Query("select u from User u where u.lastName=?1 and u.email=?2")
  User testQueryAnnotationParams1(String lastName,String email);
  ```

- 命名参数

  可以定义好参数名，赋值时采用@Param(“参数名”)，而不用管顺序。**推荐使用这种方式**。

  实例如下：

  ```
  @Query("select u from User u where u.lastName=:lastName and u.email=:email")
  User testQueryAnnotationParams2(@Param("lastName") String lastName, @Param("email") String email);
  ```

### 3.4 Query中有like关键字

如果是 @Query 中有 LIKE 关键字，后面的参数需要前面或者后面加 %，这样在传递参数值的时候就可以不加 %：

```java
//参数后面添加%
@Query("select u from User u where u.lastName like ?1%")
public List<User> findBylastName (String lastName );

//参数前面添加%
@Query("select u from User u where u.lastName like %?1")
public List<User> findBylastName (String lastName );

//参数前后添加%
@Query("select u from User u where u.lastName like %?1%")
public List<User> findBylastName (String lastName );
```



## 4. EntityManager.createNativeQuery 原生SQL

```JAVA
@Repository
public class SysRoleDaoImpl implements SysRoleDao {
 
    @Autowired
    private EntityManagerFactory factory;
 
    @Override
    public List< SysRole > findByUserId(String id) {
        String sql = "SELECT r.* FROM sys_role_user ru LEFT JOIN sys_role r ON ru.sys_role_id = r.id WHERE ru.sys_user_id =:userId";
        EntityManager manager = factory.createEntityManager();
        Query query = manager.createNativeQuery(sql , SysRole.class);
        query.setParameter("userId" , id);
        List list = query.getResultList();
        manager.close();
        return list;
    }
}
```

## 参考文章

[Spring data jpa 复杂动态查询方式总结](https://blog.csdn.net/qq_30054997/article/details/79420141)

[Spring Data JPA 查询方法那些事](https://blog.csdn.net/J080624/article/details/82559318)

[spring data jpa 几种查询方式](https://blog.csdn.net/laokaizzz/article/details/81741994)