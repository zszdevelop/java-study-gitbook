# Mybatis基础操作Mapper模板

## 1. 查询

### 1.1 查询列表

```xml
 <sql id="selectNoticeVo">
        select notice_id, notice_title, notice_type, notice_content, status, create_by, create_time, update_by, update_time, remark 
		from sys_notice
    </sql>

<select id="selectNoticeList" parameterType="com.fardu.system.domain.SysNotice" resultMap="SysNoticeResult">
        <include refid="selectNoticeVo"/>
        <where>
			<if test="noticeTitle != null and noticeTitle != ''">
				AND notice_title like concat(concat('%',#{noticeTitle}),'%')
			</if>
			<if test="noticeType != null and noticeType != ''">
				AND notice_type = #{noticeType}
			</if>
			<if test="createBy != null and createBy != ''">
				AND create_by like concat(concat('%',#{createBy}),'%')
			</if>
		</where>
    </select>
```

如果需要查询in

```xml
<if test="cllxList != null">
            <foreach collection="cllxList" index="index" item="item" separator="," open="AND CLLX IN (" close=")">
                #{item}
            </foreach>
        </if>
```



### 1.2 根据id查详情

```xml
 <sql id="selectNoticeVo">
        select notice_id, notice_title, notice_type, notice_content, status, create_by, create_time, update_by, update_time, remark 
		from sys_notice
    </sql>
    
    <select id="selectNoticeById" parameterType="Long" resultMap="SysNoticeResult">
        <include refid="selectNoticeVo"/>
        where notice_id = #{noticeId}
    </select>
```

### 1.3 查询总数

```xml
    <select id="countUserRoleByRoleId" resultType="Integer">
        select count(1) from sys_user_role where role_id=#{roleId}
    </select>
```



## 2. 新增

```xml
<insert id="insertNotice" parameterType="com.fardu.system.domain.SysNotice">
        <selectKey keyProperty="noticeId" order="BEFORE" resultType="long">
              select seq_sys_notice.nextval as noticeId from DUAL
        </selectKey>
        insert into sys_notice (
            <if test="noticeId != null and noticeId != '' ">notice_id, </if>
			<if test="noticeTitle != null and noticeTitle != '' ">notice_title, </if>
			<if test="noticeType != null and noticeType != '' ">notice_type, </if>
			<if test="noticeContent != null and noticeContent != '' ">notice_content, </if>
			<if test="status != null and status != '' ">status, </if>
			<if test="remark != null and remark != ''">remark,</if>
 			<if test="createBy != null and createBy != ''">create_by,</if>
 			create_time
 		)values(
 		    <if test="noticeId != null and noticeId != '' ">#{noticeId}, </if>
			<if test="noticeTitle != null and noticeTitle != ''">#{noticeTitle}, </if>
			<if test="noticeType != null and noticeType != ''">#{noticeType}, </if>
			<if test="noticeContent != null and noticeContent != ''">#{noticeContent}, </if>
			<if test="status != null and status != ''">#{status}, </if>
			<if test="remark != null and remark != ''">#{remark},</if>
 			<if test="createBy != null and createBy != ''">#{createBy},</if>
 			sysdate
		)
    </insert>
```

## 3. 修改

```xml
<update id="updateNotice" parameterType="com.fardu.system.domain.SysNotice">
        update sys_notice 
        <set>
            <if test="noticeTitle != null and noticeTitle != ''">notice_title = #{noticeTitle}, </if>
            <if test="noticeType != null and noticeType != ''">notice_type = #{noticeType}, </if>
            <if test="noticeContent != null">notice_content = #{noticeContent}, </if>
            <if test="status != null and status != ''">status = #{status}, </if>
            <if test="updateBy != null and updateBy != ''">update_by = #{updateBy},</if>
 			update_time = sysdate
        </set>
        where notice_id = #{noticeId}
    </update>
```

## 4. 删除

### 4.1 根据id删除

```xml
<delete id="deleteNoticeById" parameterType="Long">
    delete from sys_notice where notice_id = #{noticeId}
</delete>
```

### 4.2 根据IDs批量删除

```xml
<delete id="deleteNoticeByIds" parameterType="Long">
        delete from sys_notice where notice_id in 
        <foreach item="noticeId" collection="array" open="(" separator="," close=")">
            #{noticeId}
        </foreach>
    </delete>
```

## 5. 统计

```sql
	<select id="countNoticeByType" resultType="Integer">
	    select count(1) from sys_notice where type=#{type}  
	</select>
```



## 6. 完整代码

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.fardu.system.mapper.SysNoticeMapper">
    
    <resultMap type="com.fardu.system.domain.SysNotice" id="SysNoticeResult">
        <result property="noticeId"       column="notice_id"       />
        <result property="noticeTitle"    column="notice_title"    />
        <result property="noticeType"     column="notice_type"     />
        <result property="noticeContent"  column="notice_content"  />
        <result property="status"         column="status"          />
        <result property="createBy"       column="create_by"       />
        <result property="createTime"     column="create_time"     />
        <result property="updateBy"       column="update_by"       />
        <result property="updateTime"     column="update_time"     />
        <result property="remark"         column="remark"          />
    </resultMap>
    
    <sql id="selectNoticeVo">
        select notice_id, notice_title, notice_type, notice_content, status, create_by, create_time, update_by, update_time, remark 
		from sys_notice
    </sql>
    
    <select id="selectNoticeById" parameterType="Long" resultMap="SysNoticeResult">
        <include refid="selectNoticeVo"/>
        where notice_id = #{noticeId}
    </select>
    
    <select id="selectNoticeList" parameterType="com.fardu.system.domain.SysNotice" resultMap="SysNoticeResult">
        <include refid="selectNoticeVo"/>
        <where>
			<if test="noticeTitle != null and noticeTitle != ''">
				AND notice_title like concat(concat('%',#{noticeTitle}),'%')
			</if>
			<if test="noticeType != null and noticeType != ''">
				AND notice_type = #{noticeType}
			</if>
			<if test="createBy != null and createBy != ''">
				AND create_by like concat(concat('%',#{createBy}),'%')
			</if>
		</where>
    </select>
    
    <insert id="insertNotice" parameterType="com.fardu.system.domain.SysNotice">
        <selectKey keyProperty="noticeId" order="BEFORE" resultType="long">
              select seq_sys_notice.nextval as noticeId from DUAL
        </selectKey>
        insert into sys_notice (
            <if test="noticeId != null and noticeId != '' ">notice_id, </if>
			<if test="noticeTitle != null and noticeTitle != '' ">notice_title, </if>
			<if test="noticeType != null and noticeType != '' ">notice_type, </if>
			<if test="noticeContent != null and noticeContent != '' ">notice_content, </if>
			<if test="status != null and status != '' ">status, </if>
			<if test="remark != null and remark != ''">remark,</if>
 			<if test="createBy != null and createBy != ''">create_by,</if>
 			create_time
 		)values(
 		    <if test="noticeId != null and noticeId != '' ">#{noticeId}, </if>
			<if test="noticeTitle != null and noticeTitle != ''">#{noticeTitle}, </if>
			<if test="noticeType != null and noticeType != ''">#{noticeType}, </if>
			<if test="noticeContent != null and noticeContent != ''">#{noticeContent}, </if>
			<if test="status != null and status != ''">#{status}, </if>
			<if test="remark != null and remark != ''">#{remark},</if>
 			<if test="createBy != null and createBy != ''">#{createBy},</if>
 			sysdate
		)
    </insert>
	 
    <update id="updateNotice" parameterType="com.fardu.system.domain.SysNotice">
        update sys_notice 
        <set>
            <if test="noticeTitle != null and noticeTitle != ''">notice_title = #{noticeTitle}, </if>
            <if test="noticeType != null and noticeType != ''">notice_type = #{noticeType}, </if>
            <if test="noticeContent != null">notice_content = #{noticeContent}, </if>
            <if test="status != null and status != ''">status = #{status}, </if>
            <if test="updateBy != null and updateBy != ''">update_by = #{updateBy},</if>
 			update_time = sysdate
        </set>
        where notice_id = #{noticeId}
    </update>
	
    <delete id="deleteNoticeById" parameterType="Long">
        delete from sys_notice where notice_id = #{noticeId}
    </delete>
    
    <delete id="deleteNoticeByIds" parameterType="Long">
        delete from sys_notice where notice_id in 
        <foreach item="noticeId" collection="array" open="(" separator="," close=")">
            #{noticeId}
        </foreach>
    </delete>
    
</mapper>
```

