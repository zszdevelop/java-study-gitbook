# select用法

## 1. 案例

UserMapper接口

```
public interface UserMapper {
    /**
     * 通过id 查询用户
     * @param id
     * @return
     */
    User selectById(Long id);
}
```

UserMapper.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="me.zszdevelop.dao.UserMapper">
  <resultMap id="BaseResultMap" type="com.zszdevelop.domain.User">
    <id column="id" jdbcType="BIGINT" property="id" />
    <result column="user_name" jdbcType="VARCHAR" property="userName" />
    <result column="user_password" jdbcType="VARCHAR" property="userPassword" />
    <result column="user_email" jdbcType="VARCHAR" property="userEmail" />
    <result column="create_time" jdbcType="TIMESTAMP" property="createTime" />
  </resultMap>
  
   <select id="selectById" resultMap="BaseResultMap">
    SELECT * FROM sys_user WHERE id = #{id}
  </select>
</mapper>
```

## 2.接口中的方法和XML怎么关联的

XML中的select标签的id属性值和定义的接口方法名是一样的。

**规则**

- 当只使用XML 而不使用接口的时候，namespace 可以设置为任意不重复名称
- 标签的id属性值在任何时候都不能出现英文“.”,并且同一命名空间下不能出现重复的id
- 因为接口的方法是可以重载的，所以接口中可以出现多个同名参数名不同的方法，但是xml中id不能重复。因而接口中的所有同名方法会对应这xml中的同一个id的方法。

## 3. 标签与属性作用

- `<select>`: 

  映射查询语句使用的标签

- id:

  命名空间中的唯一标识符，可以用来代表这条语句

- resultMap：

  用于设置返回值的类型和映射关系

- select标签中的select * from 是查询语句

- `#{id}`

  Mybatis sql中预编译参数类型的一种方式，大括号中的id是传入的参数名



## 4. resultMap 标签

resultMap 标签用于配置java 对象的属性和查询结果列的对应关系，通过resultMap中配置的column 和property可以将查询列的值映射到type对象的属性上，因此当我们使用select * 查询所有列的时候，Mybatis 也可以将结果正确的映射到User 对象上

### 4.1 属性

- id：必填。并且唯一。在select 标签中，resultMap指定的值即为此处的id所设置的值

- type：必填，用于配置查询列所映射到的java对象类型

- extends：选填，可以配置当前的resultMap 继承自其它的resultMap，属性值为继承resultMap的id

- autoMapping:选填，可选值为true或false，用于配置是否启用非映射字段（没有在resultMap 中配置的字段）的自动映射功能，该配置可以覆盖全局的autoMappingBehavior 配置

### 4.2 标签

- constructor：配置使用构造方法注入结果，包含以下两个子标签
  - idArg:id参数，标记结果作为id（唯一值），可以帮助提高整体性能
  - arg: 注入到构造方法的一个普通结果
- id：一个id结果，标记结果作为id（唯一值），可以帮助提高整体性能
- result: 注入到java对象属性的普通结果
- association： 一个复杂的类型关联，许多结果将包成这种类型
- collection: 复杂类型集合
- discriminator:根据结果值来决定使用哪个结果映射
- case: 基于某些值的结果映射

## 5.id 和result 标签包含的属性

- column:从数据库中得到的列名，或者是列的别名

- property:映射到列结果的属性，

  - 可以映射简单的如“username”，这样的属性，
  - 也可以映射一些复杂对象的属性，例如“address.street.number”,这会通过“.”方式的属性嵌套赋值

- javaType：一个Java类的完全限定名，或一个类型的别名（通过typeAlias配置或者默认的类型）。

  - 如果映射到一个JavaBean，mybatis 通常可以自动判断类型，
  - 如映射到HashMap则需要明确指定javaType类型

- jdbcType：列对应的数据库类型

  - jdbc类型仅仅需要对插入、更新、删除操作可能为空的列进行处理（这是jdbc jdbcType要求，而不是mybatis）

- typeHandler：使用这个属性可以覆盖默认的类型处理器，

​    