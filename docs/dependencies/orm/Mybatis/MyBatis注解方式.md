# MyBatis注解方式

>我们知道除了XML配置方式，MyBatis还支持注解方式。本文主要介绍SpringBoot+MyBatis注解方式。

## 1. 准备知识

> MyBatis的相关知识体系。

在构建知识体系时：我们最重要的**目标并不是如何使用注解方式**，而是要理解：

1. 对于有原有xml方式改为注解方式（一定要有对比），如何写？
   1. 基本的CRUD怎么用注解写？
   2. 对于复杂的动态SQL如何写？
   3. 对于表关联的如何写？
2. 为什么xml方式依然是比注解方式使用广泛？
   1. xml方式和注解方式混合使用？
3. 注解方式是如何工作的呢？

## 2. 基本查改删操作

> 我们从最基本的增删改操作开始，对比xml方式进行理解。

### 2.1 查询操作

#### 2.1.1 @Results和@Result注解

> 对于xml配置查询时定义的ResultMap, 在注解中如何定义呢？

```xml
<resultMap type="tech.pdai.springboot.mysql57.mybatis.xml.entity.User" id="UserResult1">
  <id     property="id"       	column="id"      		/>
  <result property="userName"     column="user_name"    	/>
  <result property="password"     column="password"    	/>
  <result property="email"        column="email"        	/>
  <result property="phoneNumber"  column="phone_number"  	/>
  <result property="description"  column="description"  	/>
  <result property="createTime"   column="create_time"  	/>
  <result property="updateTime"   column="update_time"  	/>
</resultMap>
```

使用注解方式，用@Results注解对应

```java
@Results(
        id = "UserResult1",
        value = {
                @Result(id = true, property = "id", column = "id"),
                @Result(property = "userName", column = "user_name"),
                @Result(property = "password", column = "password"),
                @Result(property = "email", column = "email"),
                @Result(property = "phoneNumber", column = "phone_number"),
                @Result(property = "description", column = "description"),
                @Result(property = "createTime", column = "create_time"),
                @Result(property = "updateTime", column = "update_time")
        }
)
```

#### 2.1.2 @Select和@Param注解

> 对于查询，用@Select注解；对于参数, 使用@Param注解

所以根据用户ID查询用户，使用注解方式写法如下：

```java
@Results(
        id = "UserResult1",
        value = {
                @Result(id = true, property = "id", column = "id"),
                @Result(property = "userName", column = "user_name"),
                @Result(property = "password", column = "password"),
                @Result(property = "email", column = "email"),
                @Result(property = "phoneNumber", column = "phone_number"),
                @Result(property = "description", column = "description"),
                @Result(property = "createTime", column = "create_time"),
                @Result(property = "updateTime", column = "update_time")
        }
)
@Select("select u.id, u.password, u.user_name, u.email, u.phone_number, u.description, u.create_time, u.update_time from tb_user u where id = #{id}")
User findById1(@Param("id") Long id);
```

#### 2.1.3 @ResultMap注解

> xml配置查询时定义的ResultMap是可以复用的，那么我们上面通过@Results定义在某个方法上的，如何复用呢？

比如查询所有用户返回用户实体@Results是和查询单个用户一致的，那么我们可以通过@ResultMap指定返回值对应关系

```java
@ResultMap("UserResult1")
@Select("select u.id, u.password, u.user_name, u.email, u.phone_number, u.description, u.create_time, u.update_time from tb_user u")
User findAll1();
```

由此你可以猜到，@ResultMap定义在哪个方法上并没有什么关系，因为它会被优先通过注解解析为数据库字段与Java字段的映射关系。

#### 2.1.4 表关联查询

> 用户和角色存在着一对多的关系，上面的查询只是查询了用户的基本信息，如何关联查询（查询用户同时返回角色信息）呢？

我们看下xml配置方式是如何做到的？

```xml
<resultMap type="tech.pdai.springboot.mysql57.mybatis.xml.entity.User" id="UserResult">
  <id     property="id"       	column="id"      		/>
  <result property="userName"     column="user_name"    	/>
  <result property="password"     column="password"    	/>
  <result property="email"        column="email"        	/>
  <result property="phoneNumber"  column="phone_number"  	/>
  <result property="description"  column="description"  	/>
  <result property="createTime"   column="create_time"  	/>
  <result property="updateTime"   column="update_time"  	/>
  <collection property="roles" ofType="tech.pdai.springboot.mysql57.mybatis.xml.entity.Role">
    <result property="id" column="id"  />
    <result property="name" column="name"  />
    <result property="roleKey" column="role_key"  />
    <result property="description" column="description"  />
    <result property="createTime"   column="create_time"  	/>
    <result property="updateTime"   column="update_time"  	/>
  </collection>
</resultMap>
```

使用注解方式, 可以通过@Results+@Many注解

```java
@Results(
        id = "UserResult",
        value = {
                @Result(id = true, property = "id", column = "id"),
                @Result(property = "userName", column = "user_name"),
                @Result(property = "password", column = "password"),
                @Result(property = "email", column = "email"),
                @Result(property = "phoneNumber", column = "phone_number"),
                @Result(property = "description", column = "description"),
                @Result(property = "createTime", column = "create_time"),
                @Result(property = "updateTime", column = "update_time"),
                @Result(property = "roles", column = "id", many = @Many(select = "tech.pdai.springboot.mysql57.mybatis.anno.dao.IRoleDao.findRoleByUserId", fetchType = FetchType.EAGER))
        }
)
```

其中findRoleByUserId是通过user表中的id查找Role, 具体方法如下

```java
@Results(
            id = "RoleResult",
            value = {
                    @Result(id = true, property = "id", column = "id"),
                    @Result(property = "name", column = "name"),
                    @Result(property = "roleKey", column = "role_key"),
                    @Result(property = "description", column = "description"),
                    @Result(property = "createTime", column = "create_time"),
                    @Result(property = "updateTime", column = "update_time")
            }
    )
    @Select("select r.id, r.name, r.role_key, r.description, r.create_time, r.update_time from tb_role r, tb_user_role ur where r.id = ur.user_id and ur.user_id = #{userId}")
    List<Role> findRoleByUserId(Long userId);
```

对于一对一的可以使用@One注解。

### 2.2 插入操作

> 涉及插入操作的主要注解有：@Insert, @SelectKey等。

#### 2.2.1 @Insert注解

对于插入操作，在xml配置可以定义为：

```xml
<insert id="save" parameterType="tech.pdai.springboot.mysql57.mybatis.xml.entity.User" useGeneratedKeys="true" keyProperty="id">
 		insert into tb_user(
 			<if test="userName != null and userName != ''">user_name,</if>
			<if test="password != null and password != ''">password,</if>
 			<if test="email != null and email != ''">email,</if>
			<if test="phoneNumber != null and phoneNumber != ''">phone_number,</if>
 			<if test="description != null and description != ''">description,</if>
 			create_time,
			update_time
 		)values(
 			<if test="userName != null and userName != ''">#{userName},</if>
			<if test="password != null and password != ''">#{password},</if>
 			<if test="email != null and email != ''">#{email},</if>
 			<if test="phoneNumber != null and phoneNumber != ''">#{phoneNumber},</if>
 			<if test="description != null and description != ''">#{description},</if>
 			sysdate(),
			sysdate()
 		)
	</insert>
```

特别是，这里通过`<if>`判断条件更新的情况应该如何在注解中写呢？

可以通过@Insert + `<script>`

```java
@Insert({"<script> ", "insert into tb_user(\n" +
        " <if test=\"userName != null and userName != ''\">user_name,</if>\n" +
        " <if test=\"password != null and password != ''\">password,</if>\n" +
        " <if test=\"email != null and email != ''\">email,</if>\n" +
        " <if test=\"phoneNumber != null and phoneNumber != ''\">phone_number,</if>\n" +
        " <if test=\"description != null and description != ''\">description,</if>\n" +
        " create_time,\n" +
        " update_time\n" +
        " )values(\n" +
        " <if test=\"userName != null and userName != ''\">#{userName},</if>\n" +
        " <if test=\"password != null and password != ''\">#{password},</if>\n" +
        " <if test=\"email != null and email != ''\">#{email},</if>\n" +
        " <if test=\"phoneNumber != null and phoneNumber != ''\">#{phoneNumber},</if>\n" +
        " <if test=\"description != null and description != ''\">#{description},</if>\n" +
        " sysdate(),\n" +
        " sysdate()\n" +
        " )", " </script>"})
@Options(useGeneratedKeys = true, keyProperty = "id")
int save(User user);

```

#### 2.2.2 返回Insert后实体的主键值

> 上述`@Options(useGeneratedKeys = true, keyProperty = "id")` 表示什么意思呢？

表示，如果数据库提供了自增列生成Key的方式（比如这里的id), 并且需要返回自增主键时，可以通过这种方式返回实体。

那么，如果id的自增不使用数据库自增主键时, 在xml中可以使用SelectKey：

```xml
<selectKey keyColumn="id" resultType="long" keyProperty="id" order="AFTER">
    SELECT LAST_INSERT_ID()
</selectKey>
```

对应着注解：

```java
@SelectKey(statement = "SELECT LAST_INSERT_ID()", keyColumn = "id", keyProperty = "id", resultType = Long.class, before = false)
```

- `before = false`, 相当于XML中的order="AFTRE"，这是MySql数据库的配置。
- `before = true`, 相当于XML中的order="BEFORE"，这是Oracle数据库的配置。

注意事项：不同的数据库statement的值会不同，上面中的值适用于MySql数据库，使用其他类型的数据库时要注意修改。

### 2.3 更新操作

> 涉及更新操作的主要注解有：@Update等。

#### 2.3.1 @Update 注解

对于xml的更新操作如下：

```xml
<update id="update" parameterType="tech.pdai.springboot.mysql57.mybatis.xml.entity.User">
  update tb_user
  <set>
    <if test="userName != null and userName != ''">user_name = #{userName},</if>
    <if test="email != null and email != ''">email = #{email},</if>
    <if test="phoneNumber != null and phoneNumber != ''">phone_number = #{phoneNumber},</if>
    <if test="description != null and description != ''">description = #{description},</if>
    update_time = sysdate()
  </set>
  where id = #{id}
</update>

<update id="updatePassword" parameterType="tech.pdai.springboot.mysql57.mybatis.xml.entity.User">
  update tb_user
  <set>
    password = #{password}, update_time = sysdate()
  </set>
  where id = #{id}
</update>
```

对应的注解写法如下：

```java
@Update({"update tb_user set password = #{password}, update_time = sysdate()", " where id = #{id}"})
int updatePassword(User user);

@Update({"<script> ", "update tb_user\n" +
        " <set>\n" +
        " <if test=\"userName != null and userName != ''\">user_name = #{userName},</if>\n" +
        " <if test=\"email != null and email != ''\">email = #{email},</if>\n" +
        " <if test=\"phoneNumber != null and phoneNumber != ''\">phone_number = #{phoneNumber},</if>\n" +
        " <if test=\"description != null and description != ''\">description = #{description},</if>\n" +
        " update_time = sysdate()\n" +
        " </set>\n" +
        " where id = #{id}", " </script>"})
int update(User user);
```

### 2.4 删除操作

> 涉及删除操作的主要注解有：@Delete等。

#### 2.4.1 @Delete 注解

对于xml的删除操作如下：

```xml
<delete id="deleteById" parameterType="Long">
  delete from tb_user where id = #{id}
</delete>

<delete id="deleteByIds" parameterType="Long">
  delete from tb_user where id in
  <foreach collection="array" item="id" open="(" separator="," close=")">
    #{id}
      </foreach> 
</delete>
```

对应的注解写法如下：

```java
@Delete("delete from tb_user where id = #{id}")
int deleteById(Long id);

@Delete({"<script> ", "delete from tb_user where id in\n" +
        "<foreach collection=\"array\" item=\"id\" open=\"(\" separator=\",\" close=\")\">\n" +
        "#{id}\n" +
        "</foreach>", " </script>"})
int deleteByIds(Long[] ids);
```

## 3. Provider注解

> 其实你可以发现通过注解方式，对于有一些需要通过动态构建查询条件的操作是非常不方便的。MyBatis的作者们自然就想到了动态构建SQL，动态构建SQL的方式是配合@Provider注解来完成的。

MyBatis提供了4种Provider注解，分别是@SelectProvider、@InsertProvider、@UpdateProvider和@DeleteProvider。

这里以@SelectProvider为例来根据Id查询User：

1. 定义包含自定义生成的动态SQL的类，比如UserDaoProvider

```java
/**
 * @author pdai
 */
public class UserDaoProvider {

    public String findById(final Long id) {
        SQL sql = new SQL();
        sql.SELECT("u.id, u.password, u.user_name, u.email, u.phone_number, u.description, u.create_time, u.update_time");
        sql.FROM("tb_user u");
        sql.WHERE("id = " + id);
        return sql.toString();
    }
}
```

1. 通过@SelectProvider注解关联到定义的类和方法

```java
@ResultMap("UserResult")
@SelectProvider(type = UserDaoProvider.class, method = "findById")
User findById2(Long id);
```

## 4. 进一步理解

> 让我们通过几个问题，进一步理解MyBatis注解方式。

### 4.1 其它注解

- `@CacheNamespace` ：为给定的命名空间 (比如类) 配置缓存。对应xml中的`<cache>`。
- `@CacheNamespaceRef` ：参照另外一个命名空间的缓存来使用。属性:value,应该是一个名空间的字 符串值(也就是类的完全限定名) 。对应xml中的`<cacheRef>`标签。
- `@ConstructorArgs` ：收集一组结果传递给一个劫夺对象的 构造方法。属性:value,是形式参数 的数组。
- `@Arg` ：单 独 的 构 造 方 法 参 数 , 是 ConstructorArgs 集合的一部分。属性: id,column,javaType,typeHandler。id 属性是布尔值, 来标识用于比较的属 性,和XML 元素相似。对应xml中的`<arg>`标签。
- `@Case` ：单独实例的值和它对应的映射。属性: value,type,results。Results 属性是结 果数组,因此这个注解和实际的 ResultMap 很相似,由下面的 Results 注解指定。对应xml中标签`<case>`。
- `@TypeDiscriminator` : 一组实例值被用来决定结果映射的表 现。 属性: column, javaType, jdbcType, typeHandler,cases。cases 属性就是实 例的数组。对应xml中标签`<discriminator>`。
- `@Flush`： 在MyBatis 3.3以上版本，可以通过此注解在Mapper接口中调用SqlSession#flushStatements()。

### 4.2 xml方式和注解方式融合

xml方式和注解方式是可以融合写的， 我们可以将复杂的SQL写在xml中

比如将resultMap定义在xml中

```xml
<resultMap type="tech.pdai.springboot.mysql57.mybatis.xml.entity.User" id="UserResult3">
  <id     property="id"       	column="id"      		/>
  <result property="userName"     column="user_name"    	/>
  <result property="password"     column="password"    	/>
  <result property="email"        column="email"        	/>
  <result property="phoneNumber"  column="phone_number"  	/>
  <result property="description"  column="description"  	/>
  <result property="createTime"   column="create_time"  	/>
  <result property="updateTime"   column="update_time"  	/>
  <collection property="roles" ofType="tech.pdai.springboot.mysql57.mybatis.xml.entity.Role">
    <result property="id" column="id"  />
    <result property="name" column="name"  />
    <result property="roleKey" column="role_key"  />
    <result property="description" column="description"  />
    <result property="createTime"   column="create_time"  	/>
    <result property="updateTime"   column="update_time"  	/>
  </collection>
</resultMap>
```



在方法中用@ResultMap

```java
@ResultMap("UserResult3")
@Select("select u.id, u.password, u.user_name, u.email, u.phone_number, u.description, u.create_time, u.update_time from tb_user u")
User findAll1();
```

### 4.3 为什么纯注解方式不是最佳选择?

> 纯注解方式为何很少大规模呢？ 说说我的一些看法

- 对于复杂的SQL，特别是按照条件动态生成方式极为不便，即便有`<script>`， 代码的阅读体验和维护极为不佳；
- 对于复杂的SQL，即便有@Provider方式，这种充其量是一个半成品
  - 不是所见即所得的写法，需要再定义额外的类和方法
  - 动态构建时不便利
  - 函数式编程成为主流，lambda方式才是未来
  - ...

这也是mybatis-plus等工具改进的地方。

## 参考文章

[**SpringBoot集成MySQL - MyBatis 注解方式**](https://pdai.tech/md/spring/springboot/springboot-x-mysql-mybatis-anno.html)