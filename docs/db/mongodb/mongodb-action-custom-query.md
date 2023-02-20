# spring-data-mongodb的自定义Query查询

## 1. 背景

我们spring-data-mongodb 默认的 `MongoRepository`接口只能实现一些简单的固定查询。如果遇到复杂的情况完全应付不过来。

### 1.1 场景需求

例如：我们要查询用户的需求

1. 默认查询所有用户
2. 可以根据用户名模糊查询
3. 根据部门、用户状态查询

这几种情况，可能只执行一种，或要组合其他几种。

常用的MongoRepository 的实现如下

```java
/**
 * 查询用户
 * @author zsz
 * @date 2021-16-16
 */
public interface UserRepository extends MongoRepository<User, String> {

    /**
     * 根据用户名模糊查询用户(方式一)
     * @param username
     * @param pageable
     * @return
     */
    Page<User> findByUsernameLike(String username, Pageable pageable);

    /**
     * 使用正则表达式模糊查询（方式二）
     */
    @Query(value=" { 'username': ?#{ ([0].username == null) or ([0].username.length() == 0)  ? {$exists:true} : {$regex: [0].username } } } ")
    public Page<User> selectUserByUsernameLike2(User user, Pageable pageable);
	}
}
```

- 方式一缺点：
  - 采用自带的实现语句非常固定，缺乏灵活
  - 无法满足多个条件筛选（方法名将会非常长）
  - 如果不需要过滤某个参数，可能还会导致报错
- 方式二缺点：
  - 过滤太复杂，且麻烦。
  - 可读性还差

我们还是推荐使用实现自定义查询

## 2. 数据准备

### 2.1 构建用户domain

```java
@Data
@Accessors(chain = true)
@Document(collection = "user")
public class User implements Serializable {

    private static final long serialVersionUID = -7229906944062898852L;

    /** ID */
    @Id
    private String _id;

    /** 用户名 */
    private String username;

    /** 年龄 */
    private Integer age;

    /** 注册时间 */
    private Date registerTime;
}
```

### 2.2 实现MongoRepository

```java
public interface UserRepository extends MongoRepository<User, String> {

}
```

### 2.3 初始化数据与controller

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

      @PostConstruct
    public void init() {
        List<User> all = userRepository.findAll();
        if (all.size() > 0)
            return;
        userRepository.save(new User().setUsername("张三").setAge(20).setRegisterTime(new Date()));
        List<User> users = new ArrayList<>();
        User u0 = new User().setUsername("张三").setAge(80).setRegisterTime(new Date());
        User u1 = new User().setUsername("李四").setAge(30).setRegisterTime(new Date());
        User u2 = new User().setUsername("王五").setAge(40).setRegisterTime(new Date());
        User u3 = new User().setUsername("赵六").setAge(50).setRegisterTime(new Date());
        users.add(u0);
        users.add(u1);
        users.add(u2);
        users.add(u3);
        userRepository.saveAll(users);
    }


    @ApiOperation(value = "查询用户列表列表")
    @GetMapping("/list")
    public Page<User> list()
    {
        Pageable pageable =  PageRequest.of(0,10);
        Page<User> list = userRepository.findAll(pageable);
        return list;
    }
```

有两个张三，一个20岁的年轻小伙张三，一个80岁的大爷张三

## 3. 实现自定义查询（复杂场景）

### 3.1 创建接口

- 在原有UserRepository 基础上，写自己需要实现的方法。在后续的Impl中去实现。

  >注：具体实现中是没有继承或实现UserRepository 接口的，会比较奇怪。可以使用 @see 写上具体在哪实现，方便后面查看

```java
public interface UserRepository extends MongoRepository<User, String> {
    
    /**
     * 查询用户列表
     * @see UserRepositoryImpl#selectUserList
     * @param user 用户
     * @return 用户集合
     */
    Page<User> selectUserList(User user, Pageable pageable);
    
}
```

### 3.2 创建实现类 （命名与接口名一致，且以Impl结尾）

- 在实现类中实现方法， 可以使用MongoTemplate 或 其他数据源的模板
- 不写@Component 也是可以的

```
public class UserRepositoryImpl {

    @Autowired
    protected MongoTemplate mongoTemplate;

    /**
     * 查询用户列表
     *
     * @param user 查询用户条件
     * @return 用户集合
     */
    public Page<User> selectUserList(User user, Pageable pageable) {
        Query query = new Query();
        Criteria criteria = new Criteria();
        List<Criteria> criteriaList = new ArrayList<>();

        if (StringUtils.isNotBlank(user.getUsername())) {
            Criteria usernameCriteria = Criteria.where("username").regex(user.getUsername());
            criteriaList.add(usernameCriteria);
        }
        if (user.getAge() != null) {
            Criteria ageCriteria = new Criteria();
            ageCriteria.and("age").is(user.getAge());
            criteriaList.add(ageCriteria);
        }
        if (criteriaList.size() > 0) {
            criteria.andOperator(criteriaList);
        }

        query.addCriteria(criteria);
        // 分页 和 排序
        query.with(pageable);
        query.with(Sort.by(Sort.Direction.DESC, "registerTime"));

        long totoal = this.mongoTemplate.count(query, User.class);

        log.debug("查询统计总条数 :" + totoal);


        List<User> res = this.mongoTemplate.find(query, User.class);

        log.debug("查询结束：" + res.size());

        return new PageImpl<User>(res, pageable, totoal);
    }
}
```

## 4. 自定义Query 基本用法

### 4.1. 根据字段进行全匹配查询

```java
/**
 * 全匹配查询
 */
public void fullMatchingQuery() {
    Query query = new Query(Criteria.where("username").is("张三"));
    // 查询一条满足条件的数据
    User result = mongoTemplate.findOne(query, User.class);
    System.out.println("查询语句: " + query + " | 查询一条数据: " + result);

    // 满足所有条件的数据
    List<User> ans = mongoTemplate.find(query, User.class);
    System.out.println("查询语句: " + query + " | 查询所有: " + ans);
}
```

- `Criteria.where(xxx).is(xxx)`来指定具体的查询条件
- 封装Query对象 `new Query(criteria)`
- 借助`mongoTemplate`执行查询 `mongoTemplate.findOne(query, resultType, collectionName)`

输出结果：

有两个张三，一个20岁的年轻小伙张三，一个80岁的大爷张三

```
查询语句: Query: { "username" : "张三"}, Fields: {}, Sort: {} | 查询一条数据: User(_id=61bdbf83b9b3e519516eac0f, username=张三, age=20, registerTime=Sat Dec 18 19:01:23 CST 2021)

查询语句: Query: { "username" : "张三"}, Fields: {}, Sort: {} | 查询所有: [User(_id=61bdbf83b9b3e519516eac0f, username=张三, age=20, registerTime=Sat Dec 18 19:01:23 CST 2021), User(_id=61bdbf83b9b3e519516eac10, username=张三, age=80, registerTime=Sat Dec 18 19:01:23 CST 2021)]

```

### 4.2 and多条件查询

前面是只有一个条件满足，现在如果是要求同时满足多个条件，则利用`org.springframework.data.mongodb.core.query.Criteria#and`来斜街多个查询条件

```java
  /**
     * 多个查询条件同时满足
     */
    public void andQuery() {
        Query query = new Query();

        Criteria criteria = Criteria.where("username").is("张三").and("age").is(20);
        query.addCriteria(criteria);

        User result = mongoTemplate.findOne(query, User.class);
        System.out.println("查询语句: " + query + " \n 多个查询条件同时满足: " + result);
    }
```

输出结果

```
查询语句: Query: { "username" : "张三", "age" : 20}, Fields: {}, Sort: {} 
 多个查询条件同时满足: User(_id=61bdbf83b9b3e519516eac0f, username=张三, age=20, registerTime=Sat Dec 18 19:01:23 CST 2021)

```

### 4.3 or或查询

and对应的就是or，多个条件中只要一个满足即可，这个与and的使用有些区别, 借助`org.springframework.data.mongodb.core.query.Criteria#orOperator`来实现，传参为多个`Criteria`对象，其中每一个表示一种查询条件

```java
/**
 * 或查询
 */
public void orQuery() {
    // 等同于 db.getCollection('demo').find({"username": "张三", $or: [{ "age": 20}, { "sign": {$exists: true}}]})
    Query query = new Query(Criteria.where("username").is("张三")
            .orOperator(Criteria.where("age").is(20), Criteria.where("sign").exists(true)));
    List<User> result = mongoTemplate.find(query, User.class);
    System.out.println("query: " + query + " \n 包含and的或查询: " + result);

    // 单独的or查询
    // 等同于Query: { "$or" : [{ "age" : 18 }, { "sign" : { "$exists" : true } }] }, Fields: { }, Sort: { }
    query = new Query(new Criteria().orOperator(Criteria.where("age").is(18), Criteria.where("sign").exists(true)));
    result = mongoTemplate.find(query, User.class);
    System.out.println("query: " + query + " \n 单独的or查询: " + result);
}
```

输出结果：

```
query: Query: { "username" : "张三", "$or" : [{ "age" : 20}, { "sign" : { "$exists" : true}}]}, Fields: {}, Sort: {} 
 包含and的或查询: [User(_id=61bdc39756a94a3a56b958f9, username=张三, age=20, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021), User(_id=61bdc39756a94a3a56b958fa, username=张三, age=80, sign=法外狂徒, registerTime=Sat Dec 18 19:18:47 CST 2021)]
query: Query: { "$or" : [{ "age" : 18}, { "sign" : { "$exists" : true}}]}, Fields: {}, Sort: {} 
 单独的or查询: [User(_id=61bdc39756a94a3a56b958fa, username=张三, age=80, sign=法外狂徒, registerTime=Sat Dec 18 19:18:47 CST 2021)]

```

### 4.4 in查询

标准的in查询case

```java

    /**
     * in查询
     */
    public void inQuery() {
        // 相当于:
        Query query = new Query(Criteria.where("age").in(Arrays.asList(18, 20, 30)));
        List<User> result = mongoTemplate.find(query, User.class);
        System.out.println("query: " + query + "\n in查询: " + result);
    }
```

输出结果

```
query: Query: { "age" : { "$in" : [18, 20, 30]}}, Fields: {}, Sort: {}
 in查询: [User(_id=61bdc39756a94a3a56b958f9, username=张三, age=20, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021), User(_id=61bdc39756a94a3a56b958fb, username=李四, age=30, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021)]

```

### 4.5 数值比较

数值的比较大小，主要使用的是 `get`, `gt`, `lt`, `let`

```java
 /**
     * 数字类型，比较查询 >
     */
    public void compareBigQuery() {
        // age > 30
        Query query = new Query(Criteria.where("age").gt(30));
        List<User> result = mongoTemplate.find(query, User.class);
        System.out.println("query: " + query + "\n 数字类型，比较查询 >: " + result);

        // age >= 30
        query = new Query(Criteria.where("age").gte(30));
        result = mongoTemplate.find(query, User.class);
        System.out.println("query: " + query + "\n 数字类型，比较查询 > " + result);
    }

    /**
     * 数字类型，比较查询 <
     */
    public void compareSmallQuery() {
        // age < 30
        Query query = new Query(Criteria.where("age").lt(30));
        List<User> result = mongoTemplate.find(query, User.class);
        System.out.println("query: " + query + "\n 数字类型，比较查询 <: " + result);

        // age <= 30
        query = new Query(Criteria.where("age").lte(30));
        result = mongoTemplate.find(query, User.class);
        System.out.println("query: " + query + " \n 数字类型，比较查询 <=: " + result);
    }

```

输出结果

数字类型，比较查询 >

```
query: Query: { "age" : { "$gt" : 30}}, Fields: {}, Sort: {}
 数字类型，比较查询 >: [User(_id=61bdc39756a94a3a56b958fa, username=张三, age=80, sign=法外狂徒, registerTime=Sat Dec 18 19:18:47 CST 2021), User(_id=61bdc39756a94a3a56b958fc, username=王五, age=40, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021), User(_id=61bdc39756a94a3a56b958fd, username=赵六, age=50, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021)]
query: Query: { "age" : { "$gte" : 30}}, Fields: {}, Sort: {}
 
 数字类型，比较查询 >= [User(_id=61bdc39756a94a3a56b958fa, username=张三, age=80, sign=法外狂徒, registerTime=Sat Dec 18 19:18:47 CST 2021), User(_id=61bdc39756a94a3a56b958fb, username=李四, age=30, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021), User(_id=61bdc39756a94a3a56b958fc, username=王五, age=40, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021), User(_id=61bdc39756a94a3a56b958fd, username=赵六, age=50, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021)]

```

数字类型，比较查询 <

```
query: Query: { "age" : { "$lt" : 30}}, Fields: {}, Sort: {}
 数字类型，比较查询 <: [User(_id=61bdc39756a94a3a56b958f9, username=张三, age=20, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021)]
query: Query: { "age" : { "$lte" : 30}}, Fields: {}, Sort: {} 
 数字类型，比较查询 <=: [User(_id=61bdc39756a94a3a56b958f9, username=张三, age=20, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021), User(_id=61bdc39756a94a3a56b958fb, username=李四, age=30, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021)]

```

### 4.6 正则查询

```java
/**
 * 正则查询
 */
public void regexQuery() {
    Query query = new Query(Criteria.where("username").regex(".四"));
    List<User> result = mongoTemplate.find(query, User.class);
    System.out.println("query: " + query + " \n 正则查询: " + result);
}
```

输出结果

```
query: Query: { "username" : { "$regularExpression" : { "pattern" : ".四", "options" : ""}}}, Fields: {}, Sort: {} 

 正则查询: [User(_id=61bdc39756a94a3a56b958fb, username=李四, age=30, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021)]

```

### 4.7 查询总数

统计常用，这个主要利用的是`mongoTemplate.count`方法

```java
   /**
     * 查询总数
     */
    public void countQuery() {
        Query query = new Query(Criteria.where("username").is("张三"));
        long cnt = mongoTemplate.count(query,User.class);
        System.out.println("query: " + query + "\n 查询总数 " + cnt);
    }
```

输出结果

```
query: Query: { "username" : "张三"}, Fields: {}, Sort: {}
 查询总数 2
```

### 4.8 分组查询

这个对应的是mysql中的group查询，但是在mongodb中，更多的是通过聚合查询，可以完成很多类似的操作，下面借助聚合，来看一下分组计算总数怎么玩

```java
/**
 * 分组查询
 */
public void groupQuery() {
    // 根据用户名进行分组统计，每个用户名对应的数量
    // aggregate([ { "$group" : { "_id" : "user" , "userCount" : { "$sum" : 1}}}] )
    Aggregation aggregation = Aggregation.newAggregation(Aggregation.group("username").count().as("userCount"));
    AggregationResults<Map> ans = mongoTemplate.aggregate(aggregation,"user",  Map.class);
    System.out.println("query: " + aggregation + "\n 分组查询 " + ans.getMappedResults());
}
```



输出结果

```
query: { "aggregate" : "__collection__", "pipeline" : [{ "$group" : { "_id" : "$username", "userCount" : { "$sum" : 1}}}]}
 
 分组查询 [{_id=李四, userCount=1}, {_id=张三, userCount=2}, {_id=王五, userCount=1}, {_id=赵六, userCount=1}]
```

### 4.9 排序

sort，比较常见的了，在mongodb中有个有意思的地方在于某个字段，document中并不一定存在，这是会怎样呢？

```java
/**
 * 排序查询
 */
public void sortQuery() {
    // sort查询条件，需要用with来衔接
    Query query = Query.query(Criteria.where("username").is("张三")).with(Sort.by(Sort.Direction.DESC,"age"));
    List<User> result = mongoTemplate.find(query, User.class);
    System.out.println("query: " + query + "\n 排序查询 " + result);
}
```

输出结果

```
query: Query: { "username" : "张三"}, Fields: {}, Sort: { "age" : -1}
 排序查询 [User(_id=61bdc39756a94a3a56b958fa, username=张三, age=80, sign=法外狂徒, registerTime=Sat Dec 18 19:18:47 CST 2021), User(_id=61bdc39756a94a3a56b958f9, username=张三, age=20, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021)]

```

### 4.10 分页

数据量多的时候，分页查询比较常见，用得多就是limit和skip了

```java

    /**
     * 分页查询
     */
    public void pageQuery() {
        // limit限定查询2条
        Query query = Query.query(Criteria.where("username").is("张三")).with(Sort.by("age")).limit(2);
        List<User> result = mongoTemplate.find(query, User.class);
        System.out.println("query: " + query + " \n分页查询 " + result);


        // skip()方法来跳过指定数量的数据
        query = Query.query(Criteria.where("username").is("张三")).with(Sort.by("age")).skip(1);
        result = mongoTemplate.find(query, User.class);
        System.out.println("query: " + query + "\n skip()方法来跳过指定数量的数据 " + result);
    }
```

输出结果

```
query: Query: { "username" : "张三"}, Fields: {}, Sort: { "age" : 1} 
分页查询 [User(_id=61bdc39756a94a3a56b958f9, username=张三, age=20, sign=null, registerTime=Sat Dec 18 19:18:47 CST 2021), User(_id=61bdc39756a94a3a56b958fa, username=张三, age=80, sign=法外狂徒, registerTime=Sat Dec 18 19:18:47 CST 2021)]
query: Query: { "username" : "张三"}, Fields: {}, Sort: { "age" : 1}

```

## 5. 综合分页查询

```java
 /**
     * 查询用户列表
     *
     * @param user 查询用户条件
     * @return 用户集合
     */
    public Page<User> selectUserList(User user, Pageable pageable) {
        Query query = new Query();
        Criteria criteria = new Criteria();
        List<Criteria> criteriaList = new ArrayList<>();

        if (StringUtils.isNotBlank(user.getUsername())) {
            Criteria usernameCriteria = Criteria.where("username").regex(user.getUsername());
            criteriaList.add(usernameCriteria);
        }
        if (user.getAge() != null) {
            Criteria ageCriteria = new Criteria();
            ageCriteria.and("age").is(user.getAge());
            criteriaList.add(ageCriteria);
        }
        if (criteriaList.size() > 0) {
            criteria.andOperator(criteriaList);
        }

        query.addCriteria(criteria);
        // 分页 和 排序
        query.with(pageable);
        query.with(Sort.by(Sort.Direction.DESC, "registerTime"));

        long totoal = this.mongoTemplate.count(query, User.class);

        log.debug("查询统计总条数 :" + totoal);


        List<User> res = this.mongoTemplate.find(query, User.class);

        log.debug("查询结束：" + res.size());

        return new PageImpl<User>(res, pageable, totoal);
    }
```



## 参考文章

[MongoDB之查询基本使用姿势](https://spring.hhui.top/spring-blog/2019/01/13/190113-SpringBoot%E9%AB%98%E7%BA%A7%E7%AF%87MongoDB%E4%B9%8B%E6%9F%A5%E8%AF%A2%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8%E5%A7%BF%E5%8A%BF/#10-%E5%88%86%E9%A1%B5)