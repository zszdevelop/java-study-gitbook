# mybatis中if关于数字的判断

mybatis 中关于数字的判断，如果直接写`<if test = "xx == '1' "> </if>`,这样即使是`xx==‘1’`，通常情况下也不会进入判断的。必须如下写：

```xml
<select id="getByNameAndPwd" parameterType="String" resultMap="MemberResult">
        select
           *
        from `member`
        <if test="isMerch != '' and isMerch == '1'.toString() " >
            where  `mobile` = #{name} 
            and `password` = #{password}
        </if>
        <if test="isMerch != '' and isMerch == '2'.toString() " >
            where  `name` = #{name}
            and `password` = #{password}
        </if>   
 
</select>
```



## 参考文章

[mybatis 中if关于数字的判断](https://blog.csdn.net/xinyuebaihe/article/details/86437431)