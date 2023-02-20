## @DynamicInsert和@DynamicUpdate生成动态SQL语句

## 1. 简介

@DynamicUpdate@DynamicInsert 是hibernate里面的注解

- **@DynamicInsert属性:**

  设置为true,设置为true,表示insert对象的时候,生成动态的insert语句,如果这个字段的值是null就不会加入到insert语句当中.默认false。

  >比如希望数据库插入日期或时间戳字段时，在对象字段为空的情况下，表字段能自动填写当前的sysdate。

- **@DynamicUpdate属性**:

  设置为true,设置为true,表示update对象的时候,生成动态的update语句,如果这个字段的值是null就不会被加入到update语句中,默认false。

  > 比如只想更新某个属性，但是却把整个对象的属性都更新了，这并不是我们希望的结果，我们希望的结果是：我更改了哪些字段，只要更新我修改的字段就够了。

## 2. 举例

### 2.1 动态插入

**@DynamicInsert注解下Hibernate日志打印SQL：**

```sql
insert into Cat (cat_name, id) values (?, ?)  
```

反之

```sql
insert into Cat (create_time, update_time, cat_name, id) values (?, ?, ?, ?)  
```

### 2.2 动态更新

@DynamicUpdate注解下Hibernate日志打印SQL：

说明：如果字段有更新，Hibernate才会对该字段进行更新

```sql
update Cat set update_time=? where id=?
```

反之Cat实体类去掉@DynamicUpdate

说明：不管字段有没有更新，Hibernate都会对该字段进行更新

```sql
update Cat set update_time=?, cat_name=? where id=?  
```

## 总结:

如果不需要全表更新就加上@DynamicInsert和@DynamicUpdate



## 参考文章

[Spring Data JPA注解@DynamicInsert和@DynamicUpdate](https://blog.csdn.net/itguangit/article/details/78696767)