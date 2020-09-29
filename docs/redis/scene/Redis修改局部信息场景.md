# Redis修改局部信息场景，如用户信息（hash,）

## 1. 应用场景

我们要存储一个用户对象数据，包含如下信息：姓名，年龄、身份证信息

- 第一种方式：将id作为key，其他信息封装成一个对象以序列化存储

  缺点：1. 增加了序列化/反序列化的开销

     	    2. 修改一项，需要把整个对象取回
     	    3. 并且修改操作需要对并发进行保护，引入CAS等复杂问题

- 第二种方式：用户id+对应属性的名称作为唯一标识来取得对应属性

  虽然省去了序列化开销和并发问题，但是id为重复存储，如果存在大量这样的数据，内存房费

- 第三种方式：Redis 的hash

  hash 实际是内部存储的value为一个 HashMap,并提供直接存取这个Map成员的接口

  ![image-20191010222139044](./img/image-20191010222139044.png)

  也就是说，key 任然是用户id，vulue 是一个map，这个map 的key 是成员的属性名，value是属性值。这样对数据的修改和存取都可以直接通过其内部map 的key。(Redis里称内部Map的key为field), 也就是通过 key(用户ID) + field(属性标签) 就可以操作对应属性数据了，既不需要重复存储数据，也不会带来序列化和并发修改控制的问题。

## 2. 示例

```java
User user = new User(10001,"zsz",18);

HashMap<Object, Object> map = new HashMap<>();
map.put("username",user.getUsername());
map.put("age",user.getAge());

String UserHashKey = "userInfo" + user.getUserId();
redisUtil.hPutAll(UserHashKey,map);

Map<Object, Object> userInfo = redisUtil.hGetAll(UserHashKey);
System.out.println(userInfo);
```

