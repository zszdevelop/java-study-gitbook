# 数据权限功能&实现思路

## 1. 背景

在实际开发中，需要设置用户只能查看哪些部门的数据，这种情况一般称为数据权限。例如

- 销售，财务的数据，它们是非常敏感的，因此要求对数据权限进行控制
- 基于集团性的应用系统而言，就更多需要控制好各自公司数据了，
  - 如设置只能查看本公司、或者本部门的数据
  - 对于特殊领导，可能需要跨部门的数据

因此程序不能硬编码哪个领导该访问那些数据，需要进行后台的权限和数据权限的控制。

> 提示
>
> 默认系统管理员`admin`拥有所有数据权限`（userId=1）`，默认角色拥有所有数据权限（如不需要数据权限不用设置数据权限操作）

## 2.注解参数说明

| 参数      | 类型   | 默认值 | 描述         |
| --------- | ------ | ------ | ------------ |
| deptAlias | String | 空     | 部门表的别名 |
| userAlias | String | 空     | 用户表的别名 |

## 3. 数据权限使用

1、在（系统管理-角色管理）设置需要数据权限的角色 目前支持以下几种权限

- 全部数据权限
- 自定数据权限
- 部门数据权限
- 部门及以下数据权限
- 仅本人数据权限

2、在需要数据权限控制方法上添加`@DataScope`注解，其中`d`和`u`用来表示表的别名

**部门数据权限注解**

```java
@DataScope(deptAlias = "d")
public List<...> select(...)
{
    return mapper.select(...);
}
```

**部门及用户权限注解**

 ```java
 @DataScope(deptAlias = "d", userAlias = "u")
 public List<...> select(...)
 {
     return mapper.select(...);
 }
 ```

3、在`mybatis`查询底部标签添加数据范围过滤

```xml
<select id="select" parameterType="..." resultMap="...Result">
    <include refid="select...Vo"/>
    <!-- 数据范围过滤 -->
    ${params.dataScope}
</select>
```

例如：用户管理（未过滤数据权限的情况）：

```sql
select u.user_id, u.dept_id, u.login_name, u.user_name, u.email
	, u.phonenumber, u.password, u.sex, u.avatar, u.salt
	, u.status, u.del_flag, u.login_ip, u.login_date, u.create_by
	, u.create_time, u.remark, d.dept_name
from sys_user u
	left join sys_dept d on u.dept_id = d.dept_id
where u.del_flag = '0'
```

例如：用户管理（已过滤数据权限的情况）：

```sql
select u.user_id, u.dept_id, u.login_name, u.user_name, u.email
	, u.phonenumber, u.password, u.sex, u.avatar, u.salt
	, u.status, u.del_flag, u.login_ip, u.login_date, u.create_by
	, u.create_time, u.remark, d.dept_name
from sys_user u
	left join sys_dept d on u.dept_id = d.dept_id
where u.del_flag = '0'
	and u.dept_id in (
		select dept_id
		from sys_role_dept
		where role_id = 2
	)
```

结果很明显，我们多了如下语句。通过角色部门表`（sys_role_dept）`完成了数据权限过滤

```sql
and u.dept_id in (
	select dept_id
	from sys_role_dept
	where role_id = 2
)
```

逻辑实现代码 `com.ruoyi.framework.aspectj.DataScopeAspect`

>提示
>
>仅实体继承`BaseEntity`才会进行处理，`SQL`语句会存放到`BaseEntity`对象中的`params`属性中，然后在`xml`中通过`${params.dataScope}`获取拼接后的语句。

## 4. 实现思路

### 4.1 针对那些数据进行权限控制？

我们在角色管理中分配该角色用户的数据权限，但并不是所有接口都需要控制数据权限，**所以针对需要控制数据权限的接口，我们需要定义一个注解 ** - `@DataScope`

我们通过 `@DataScope` 就可以通过aop拦截到该请求了

### 4.2 不同权限情况要如何处理？

我们拥有多种数据权限类型，每种类型的过滤情况并不相同

1. 全部数据权限

   不添加sql

2. 自定数据权限

   根据角色id，过滤出选定的部门

   ```java
    sqlString.append(StringUtils.format(
                           " OR {}.dept_id IN ( SELECT dept_id FROM sys_role_dept WHERE role_id = {} ) ", deptAlias,
                           role.getRoleId()));
   ```

3. 部门数据权限

   直接过滤出自身的过滤权限

   ```java
   sqlString.append(StringUtils.format(" OR {}.dept_id = {} ", deptAlias, user.getDeptId()));
   ```

4. 部门及以下数据权限

   查找的时候，直接过滤出部门级以下

   ```java
   sqlString.append(StringUtils.format(
                           " OR {}.dept_id IN ( SELECT dept_id FROM sys_dept WHERE dept_id = {} or find_in_set( {} , ancestors ) )",
                           deptAlias, user.getDeptId(), user.getDeptId()));
   ```

5. 仅本人数据权限

   ```java
    if (StringUtils.isNotBlank(userAlias))
                   {
                       sqlString.append(StringUtils.format(" OR {}.user_id = {} ", userAlias, user.getUserId()));
                   }
                   else
                   {
                       // 数据权限为仅本人且没有userAlias别名不查询任何数据
                       sqlString.append(" OR 1=0 ");
                   }
   ```

### 4.3 拼接时关联表的别名

我们看到拼接语句上，都是需要关联表的，这些sql 语句我们是写在mybatis语句中的，我们不能保证所有的人，user表别名是u，部门表都是d。所以我们需要将定义的别名传递进来

```java
/**
 * 数据权限过滤注解
 * 
 * @author ygn
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DataScope
{
    /**
     * 部门表的别名
     */
    public String deptAlias() default "";

    /**
     * 用户表的别名
     */
    public String userAlias() default "";
}
```

### 4.4 如何拼接上SQL

有了过滤的sql语句后，怎么拼装上呢？

我们知道我们mybayis 参数是通过实体类来的，那么我们在BaseEntity 定义了扩展参数就派上了用场

```java
public class BaseEntity implements Serializable
{
		...
		/** 请求参数 */
		private Map<String, Object> params;
		
}
```

我们对这个参数添加我们的权限参数

```java
/**
 * 数据权限过滤关键字
 */
public static final String DATA_SCOPE = "dataScope";


/**
 * 拼接权限sql前先清空params.dataScope参数防止注入
 */
private void clearDataScope(final JoinPoint joinPoint)
{
    Object params = joinPoint.getArgs()[0];
    if (StringUtils.isNotNull(params) && params instanceof BaseEntity)
    {
        BaseEntity baseEntity = (BaseEntity) params;
        baseEntity.getParams().put(DATA_SCOPE, "");
    }
}
```

### 4.5 具体使用

具体使用，还是需要在底部添加上引用`dataScope` 的语句

```xml
<select id="select" parameterType="..." resultMap="...Result">
    <include refid="select...Vo"/>
    <!-- 数据范围过滤 -->
    ${params.dataScope}
</select>
```

## 5. 具体实现

### 5.1 数据权限过滤注解

```java
/**
 * 数据权限过滤注解
 * 
 * @author ygn
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DataScope
{
    /**
     * 部门表的别名
     */
    public String deptAlias() default "";

    /**
     * 用户表的别名
     */
    public String userAlias() default "";
}

```



## 参考文章

[若依官方文档](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90)