# spring-data-mongodb的Query查询

## 1. 简介

spring-data-mongodb 的查询方法定义的两种方式

1. 根据方法名来自动推测
2. 自定义查询（复杂场景）

## 2. @Query注解

### 2.1 基础查询

Mongodb使用的是基于json的查询语句。

通过将org.springframework.data.mongodb.repository.Query批注添加到存储库查询方法，可以指定要使用的MongoDB JSON查询字符串，而不是从方法名称派生查询，如以下示例所示：

```kotlin
public interface PersonRepository extends MongoRepository<Person, String>

  @Query("{ 'firstname' : ?0 }")
  List<Person> findByThePersonsFirstname(String firstname);
}
```

**占位符 ?0 是函数的参数。**

>注意： String类型的参数在绑定过程中会进行转义， 这意味着不能为之添加特殊的参数。

### 2.2 设置返回的字段

使用fields来设置返回的字段：

```java
  @Query(value="{ 'firstname' : ?0 }", fields="{ 'firstname' : 1, 'lastname' : 1}")
  List<Person> findByThePersonsFirstname(String firstname);
```

上例中结果Person对象中只会有firstname、lastname 和id 属性 ， 其他属性没有 。

### 2.3 SpEL表达式

在基于json的查询中使用SpEL表达式

查询串和field返回定义可以使用SpEL表达式 在运行时进行动态创建 。
表达式通过包含所有参数的数组公开方法参数。 以下查询使用[0]声明lastname的谓词值（相当于?0参数绑定）：

```java
public interface PersonRepository extends MongoRepository<Person, String>

  @Query("{'lastname': ?#{[0]} }")
  List<Person> findByQueryWithExpression(String param0);
}
```

### 2.4 参数为对象

当传入参数为对象时， 实例：

```csharp
    @Query(value="{'name': ?#{ [0].name }}")
    public Page<RcControllJournalDo> querylikepages(RcControllJournalDo mdo, Pageable pageable);
```

上例等价于 where name = mdo.name .

### 2.5 三目表达式

```java
    /**
     * 当mdo.name为空时， 查询条件为  { "name" : { "$exists" : true } } ，即查询所有name列存在的记录（包括值为null的记录，但是对于没有name列的查询不到） ；
     * 当mdo.name不空时，查询条件为   { "name" : [0].name }
     */
    @Query(value=" { 'name': ?#{ ([0].name == null) or ([0].name.length() == 0)  ? '{$exists:true}' : [0].name } } ")
    public Page<RcControllJournalDo> querylikepages2(RcControllJournalDo mdo, Pageable pageable);
```

`#{ ([0].name == null) or ([0].name.length() == 0) ? '{$exists:true}' : [0].name }` 为SpEL表达式 （三目表达式）。

### 2.6 模糊查询例子：

```kotlin
    /**
     * 使用正则表达式模糊查询 
     */
    @Query(value=" { 'idno': ?#{ ([0].name == null) or ([0].name.length() == 0)  ? {$exists:true} : {$regex: [0].name } } } ")
    public Page<RcControllJournalDo> querylikepages21(RcControllJournalDo mdo, Pageable pageable);
```

mongodb的正则表达式查询语法为：

```css
>db.posts.find({post_text:{$regex:"runoob"}})
>db.posts.find({post_text:{$regex:"runoob",$options:"$i"}}) 
```

例子：
 根据前端上送的查询条件模糊匹配name 和idno  ， 当有值时查询之，无则查询所有：

```java
/**
     * 模糊查询name 和 idno  <br>
     * 1. mongodb or语法  ：{ $or :[{}, {},...] }  例子： {$or:[{"by":"aaa"} , {"title": "bbb"}]}  ， 即 where by=aaa or title=bbb <BR>
     * 2. { $or :[{'name' : ?#{}}, {'idno' : ?#{}}] }  <br>
     * 
     */
    @Query(value=" { $or :[{'name' : ?#{ ([0].name == null) or ([0].name.length() == 0)  ? '{$exists:true}' :  {$regex:[0].name} }},"
            + " {'idno' : ?#{ ([0].idno == null) or ([0].idno.length() == 0)  ? '{$exists:true}' : {$regex: [0].idno} }}] } ")
    public Page<RcControllJournalDo> querylikepages3(RcControllJournalDo mdo, Pageable pageable);

```

输入参数：
mdo.setName("宋");
mdo.setIdno("112");
打印的日志为：

```
find using query: { "$or" : [{ "name" : { "$regex" : "宋" } }, { "idno" : { "$regex" : "112" } }] }
```

## 3. 自定义查询（复杂场景）

1. 创建接口
2. 创建实现类 （命名与接口名一致，且以Impl结尾）
3. 在实现类中实现方法， 可以使用MongoTemplate 或 其他数据源的模板
5. 直接使用repo调用即可。



下面着重介绍使用Query 、Criteria 来创建查询条件 并使用分页：

```java
    public Page<RcControllJournalDo> selectSearchNameIdno(RcControllJournalDo mdo, Pageable pageable) {
        
        Query query = new Query();
        
        logger.debug("开始搜风控流水，使用姓名和身份证号模糊匹配：" + mdo.getName() );
        
        if (StringUtils.isNotBlank(mdo.getName()) && StringUtils.isNotBlank(mdo.getIdno())) {
            query.addCriteria(new Criteria().orOperator(Criteria.where("name").regex(mdo.getName()), 
                    Criteria.where("idno").regex(mdo.getIdno())));
        }
        
        // 分页 和 排序 
        query.with(pageable);
        query.with(new Sort(Direction.DESC, "dateTm"));
        
        long totoal = this.mongoTemplate.count(query, RcControllJournalDo.class);
        
        logger.debug("查询统计总条数 :" + totoal);
        logger.debug("分页参数：" + pageable.getPageNumber() + ";" + pageable.getPageSize());
        
        List<RcControllJournalDo> res = this.mongoTemplate.find(query , RcControllJournalDo.class);
        
        logger.debug("查询结束：" + res.size());
        
        return new PageImpl<RcControllJournalDo>(res, pageable, totoal);
    }
```

缺点是， 总条数需要主动查询 。
query内部会根据上送的分页条件，综合使用skip 、limit 来实现分页效果。



## 参考文章

[spring data mongodb Query 及分页](https://www.jianshu.com/p/24a44c4c7651)