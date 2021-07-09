# Mybatis一对多关联查询（级联查询）Mapper模板

## 1. 简介

在实际生活中一对多级联关系有许多，例如一个用户可以有多个订单，一个用户可以有多个角色

## 2. 实现

### 2.1 多对多实现

以一个用户拥有多个角色，一个角色拥有多个用户

SysUserMapper 

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.zszdevelop.system.mapper.SysUserMapper">


	<resultMap type="SysUser" id="SysUserResult">
		<id     property="userId"       column="user_id"      />
		<result property="userName"     column="user_name"    />
		<result property="nickName"     column="nick_name"    />
		<collection  property="roles"   javaType="java.util.List"        resultMap="RoleResult" />
	</resultMap>


	<resultMap id="RoleResult" type="SysRole">
		<id     property="roleId"       column="role_id"        />
		<result property="roleName"     column="role_name"      />
		<result property="status"       column="role_status"    />
	</resultMap>

	<sql id="selectUserVo">
        select u.user_id,  u.user_name, u.nick_name,
        r.role_id, r.role_name,  r.status as role_status
        from sys_user u
		    left join sys_user_role ur on u.user_id = ur.user_id
		    left join sys_role r on r.role_id = ur.role_id
    </sql>


	<select id="selectUserById" parameterType="Long" resultMap="SysUserResult">
		<include refid="selectUserVo"/>
		where u.user_id = #{userId}
	</select>
</mapper> 
```

### 2.2 多对一实现

以一个用户只属于一个单位，一个单位有多个用户

SysUserMapper 

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.zszdevelop.system.mapper.SysUserMapper">


	<resultMap type="SysUser" id="SysUserResult">
		<id     property="userId"       column="user_id"      />
		<result property="userName"     column="user_name"    />
		<result property="nickName"     column="nick_name"    />
		<association property="dept"    column="dept_id" javaType="SysDept" resultMap="deptResult" />
	</resultMap>
  
  	<resultMap id="deptResult" type="SysDept">
		<id     property="deptId"   column="dept_id"     />
		<result property="parentId" column="parent_id"   />
		<result property="deptName" column="dept_name"   />
		<result property="orderNum" column="order_num"   />
		<result property="leader"   column="leader"      />
		<result property="status"   column="dept_status" />
		<result property="ancestors"   column="ancestors" />
	</resultMap>


	<resultMap id="RoleResult" type="SysRole">
		<id     property="roleId"       column="role_id"        />
		<result property="roleName"     column="role_name"      />
		<result property="status"       column="role_status"    />
	</resultMap>

	<sql id="selectUserVo">
        select u.user_id,  u.user_name, u.nick_name,
        d.dept_id, d.parent_id, d.dept_name, d.order_num, d.leader, d.status as dept_status,d.ancestors
        from sys_user u
		    left join sys_dept d on u.dept_id = d.dept_id
    </sql>


	<select id="selectUserById" parameterType="Long" resultMap="SysUserResult">
		<include refid="selectUserVo"/>
		where u.user_id = #{userId}
	</select>
</mapper> 
```

