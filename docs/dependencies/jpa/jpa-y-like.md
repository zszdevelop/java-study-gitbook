# JPA使用原生SQL查询数据库like的用法

jpa使用like查询，需要拼接字符串，如下

## oracle用法：

```JAVA
//dao层代码
@Query(value = "SELECT * FROM TABLENAME WHERE USER_NAME LIKE '%'||?1||'%'", nativeQuery = true)
List<Map<String, Object>> queryUserInfoByName(String userName);
```

## mysql用法：

```JAVA
//dao层代码
@Query(value = "SELECT * FROM TABLENAME WHERE USER_NAME LIKE CONCAT('%',:userName,'%')", nativeQuery = true)
List<Map<String, Object>> queryUserInfoByName(@Param("userName") String userName);
```

## 参考文章

[jpa使用原生SQL查询数据库like的用法](https://yspxyz.blog.csdn.net/article/details/105383240)

