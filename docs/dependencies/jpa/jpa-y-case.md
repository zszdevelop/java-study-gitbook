# JPA表大小写转换

## 解决方案

1. 使用PhysicalNamingStrategy
   Spring Boot1.5.4 JPA是基于hibernate5.0的，有两种现成的方式实现PhysicalNamingStrategy
   - org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl 无修改的
   - org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy **有修改，Spirng Boot 1.5.4默认使用SpringPhysicalNamingStrategy ，会处理添加“-”，会将表、字段名转化为小写**
     application.yml中配置使用PhysicalNamingStrategy，就没有字段被小写的问题了

```yml
spring:
  jpa:
    hibernate:
      naming:
        physical-strategy:  org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
```