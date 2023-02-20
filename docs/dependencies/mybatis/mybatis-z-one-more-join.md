# Mybatis使用collection解决一对多关联查询

## 1. 简介

一对多使用场景有很多，例如

- 一个部门下有多个用户，一个用户只属于一个部门

## 2. 实现方式

### 2.1 collection关联查询

```xml
 <resultMap type="SysDeptUserDetail" id="SysDeptResultByLeftJoin">
        <id property="deptId" column="dept_id"/>
        <result property="deptName" column="dept_name"/>
        <collection property="userList"  resultMap="SysUserResult" ></collection>
    </resultMap>
    <resultMap type="SysUser" id="SysUserResult">
        <id     property="userId"       column="user_id"      />
        <result property="userName"     column="user_name"    />
        <result property="nickName"     column="nick_name"    />
    </resultMap>


    <select id="selectDeptUserListByLeftJoin" parameterType="SysDept" resultMap="SysDeptResultByLeftJoin">
        select d.dept_id,d.dept_name,
               u.user_id,u.user_name,u.nick_name
        from sys_dept d
        left join sys_user u on u.dept_id = d.dept_id
        <if test="deptName != null and deptName != ''">
            AND dept_name like concat('%', #{deptName}, '%')
        </if>
    </select>
```

#### 2.1.1 查询的sql日志

```sql
 ==>  Preparing: select d.dept_id,d.dept_name, u.user_id,u.user_name,u.nick_name from sys_dept d left join sys_user u on u.dept_id = d.dept_id
 ==>  Parameters: 
 <==      Total: 10
```

![image-20211005154305109](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211005154305109.png)

#### 2.1.2 优缺点

- 优点：
  - 只用一条sql语句就实现了查询
- 缺点
  - 但是一对多的分页会出现数量不对的问题

### 2.2 collection嵌套查询

```xml
   <resultMap type="SysDeptUserDetail" id="SysDeptResult">
        <id property="deptId" column="dept_id"/>
        <result property="deptName" column="dept_name"/>
        <collection property="userList" column="dept_id"
                    select="com.ygn.system.mapper.SysUserDao.selectByDeptId"></collection>
    </resultMap>


    <select id="selectDeptUserList" parameterType="SysDept" resultMap="SysDeptResult">
        select d.dept_id,d.dept_name
        from sys_dept d
        <if test="deptName != null and deptName != ''">
            AND dept_name like concat('%', #{deptName}, '%')
        </if>
    </select>
```
SysUserDao

```xml
<mapper namespace="com.ygn.system.mapper.SysUserDao">

	<select id="selectByDeptId" resultType="com.ygn.common.core.domain.entity.SysUser">
		select * from sys_user where dept_id=#{dept_id}
	</select>
</mapper> 
```



特别注意：

```xml
<collection property="userList" column="dept_id" select="com.ygn.system.mapper.SysUserDao.selectByDeptId"></collection>
```

- select : 嵌套查询的sql语句
- column： 传递到嵌套查询的参数

#### 2.2.1 查询的sql日志

![image-20211005154247410](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211005154247410.png)

#### 2.2.2 优缺点

- 优点：

  - 能解决一对多情况，分页导致的分页不准问题

- 缺点

  - 产生N+1问题: sql 实际上嵌套了n条 关联sql

    

## 参考文章

[collection解决一对多关联查询](https://blog.csdn.net/zjy15203167987/article/details/79463887)
