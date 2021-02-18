# JPA方言设置

例如数据库的sql的分页每个版本可能不一样。

例如在oracle11g 上的分页为：

```
Hibernate: 
    select
        * 
    from
        ( select
            row_.*,
            rownum rownum_ 
        from
            ( select
               *
            from
                MY_TABLE  ) row_ 
        where
            rownum <= ?
        ) 
    where
        rownum_ > ?
```

而在oracle 12G 上是:

```
 select
        *
    from
       MY_TABLE
  offset 0 rows fetch next 10 rows only
```

## 2. 方言设置

设置oracle11G的方言

```
 spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
```

oracle12G 的方言

```
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
```

