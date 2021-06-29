# Mybatis进阶操作Mapper模板

## 1. 批量插入

### 1.1 Mysql版本

sql 语句

```sql
insert into my_table(field_1,field_2)
values
(value_1,value_2),
(value_1,value_2),
(value_1,value_2);
```

mybatis的模板

```xml
<insert id="insertBatch">
        INSERT INTO t_user
        (id, name)
        VALUES
        <foreach collection ="list" item="user" separator =",">
            (#{user.id}, #{user.name})
        </foreach >
    </insert>
```

### 1.2 Oracle版本

在oracle中不支持mysql的方法,需使用insert all

>insert all还支持往不同的表里插入数据

sql 语句

```sql
insert all 
into table1(filed1,filed2)values('value1','value2')
into table2(字段1，字段2，字段3) values(值1，值2，值3)
select * from dual;
```

mybatis的模板

```sql
<insert id="insertBatch" useGeneratedKeys="false">
   insert all
   <foreach item="item" index="index" collection="list">
      into t_user(id, name) values (#{item.id},#{item.name})
   </foreach>
   SELECT 1 FROM DUAL
</insert>
```

## 2. 批量更新

```xml
 <update id="updateBatchUserByIds">
        <foreach collection="list" item="item" index="index" separator=";" open="begin" close=";end;">
            UPDATE t_user
            <set>
                <if test="name != null">
                    name = #{item.name,jdbcType=VARCHAR},
                </if>
                <if test="sex != null">
                    sex = #{item.sex,jdbcType=VARCHAR},
                </if>
              
            </set>
            where ID = #{item.id,jdbcType=VARCHAR}
        </foreach>
    </update>
```

## 3. 批量删除

Mysql和Oracle版本一致

```xml
<delete id="deleteBatch" parameterType="List">
DELETE FROM STUDENT WHERE id IN
<foreach collection="list" index="index" item="item" open="(" separator="," close=")">
#{item}
</foreach>
</delete>
```

