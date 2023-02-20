# JPA查询部分字段列名无效问题

## 1. 背景

spring data jpa原生sql查询问题，我**只要表其中的几个字段的值**，本以为写个原生sql，拿实体类对象去接没问题，结果列名无效

```java
@Query(value = 
      "select d.order_id,d.user_id,d.price  from EDU_ORDER d  where  d.GENERIC_PROD_ID in(?1) " +
      " order by d.create_time desc ", nativeQuery = true)
List<Order>  findOrderList(List groupSubIdList);
```

java.sql.SQLException: 列名无效

## 2. 解决方案

### 2.1 select *

```java
@Query(value =
"select d.* from EDU_ORDER d where d.GENERIC_PROD_ID in(?1) " +
" order by d.create_time desc ", nativeQuery = true)List<Order> findOrderList(List groupSubIdList);
```

虽然实现了功能， 这样还是全表查询了，而且对表关联等复杂逻辑无法比较无力

### 2.2 HQL

```SQL
@Query(value =
"select d.orderId,d.userId,d.price from Order where d.GENERICPRODID in(?1) " +
" order by d.createTime desc ")
```

使用HQL 也可以实现，但还是不够灵活

### 2.3 返回Map<String,Object> 不返回实体

```jpa
@Query(value = 
      "select d.order_id,d.user_id,d.price  from EDU_ORDER d  where  d.GENERIC_PROD_ID in(?1) " +
      " order by d.create_time desc ", nativeQuery = true)
List<Map<String,Object>>  findOrderList(List groupSubIdList);
```



## 参考文章

[JPA 列名无效问题](https://blog.csdn.net/theweather/article/details/104961113)