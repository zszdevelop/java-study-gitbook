# redis

redis 是一种特殊类型的数据库，被称为key-value存储，与hashmap有很大相似性

##  1. 4种redis连接工厂

redis连接工厂会生成到redis数据库服务器的连接

- JedisConnectionFactory
- JredisConnectionFactory
- LettuceConnectionFactory
- SrpConnectionFactory

## 2.RedisTemplate

### 2.1 背景

redis 连接工厂会生成到redis key-value 存储的连接（redisConnection）

借助redisConnection 可以存储和读取数据

```
  RedisConnectionFactory cf = null;
  RedisConnection conn =cf.getConnection();
  conn.set("ss".getBytes(),"hello".getBytes());
```

但字节数组并不是我们希望看到的

### 2.2 redis 模板

Spring data redis提供了两个模板

- RedisTemplate

  不在局限于字节数据

- StringRedisTemplate

  key和value 是string 类型