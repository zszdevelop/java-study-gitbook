# Redis如何实现分布式锁

## 1. 简介

分布式锁是控制分布式系统或不同系统之间，访问共享资源的一种锁实现

。如果系统之间的锁，往往需要互斥

## 2. 分布式锁需要解决的问题

- 互斥性

  在任意一个时刻，只有一个客户端持有锁

- 安全性

- 死锁

  即使持有锁的客户端崩溃或者其他意外事件，锁仍然可以被获取

- 容错

  只要大部分 redis节点都活着，客户端就可以获取和释放锁

## 3. SETNX 实现分布式锁（错误的做法）

### 3.1 SETNX 简介

语法：

```
# 如果key不存在，则创建并赋值
SETNX key value 
```

- 时间复杂度：O(1)
- 返回值：设置成功，返回1 ，设置失败，返回0

### 3.2 示例

![image-20210410211900583](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210410211900583.png)

如果该locknx 的key没有被设置过，就能获取到对应的锁，否则获取不到锁。我们用完锁就释放掉。但是如果我们进程挂了，无法正常释放锁，那么key 锁就会长期存在。如何解决这个问题

### 3.3 如何解决SETNX 长期有效问题

使用EXPIRE key seconds

- 设置key的生存时间，当key过期时（生存时间为0），会被自动删除

### 3.4 存在的问题

例如以下伪代码

```java
public boolean tryLock(String key,String requset,int timeout) {
    Long result = jedis.setnx(key, requset);
    // result = 1时，设置成功，否则设置失败
    // 如果这一步挂了，将无法自动释放锁
    if (result == 1L) {
        return jedis.expire(key, timeout) == 1L;
    } else {
        return false;
    }
}
```

实际上上面的步骤是有问题的，setnx和expire是分开的两步操作，不具有原子性，如果执行完第一条指令应用异常或者重启了，锁将无法过期。

一种改善方案就是使用Lua脚本来保证原子性（包含setnx和expire两条指令）

### 3.5 解决方案-使用Lua脚本（包含setnx和expire两条指令）

```java
public boolean tryLock_with_lua(String key, String UniqueId, int seconds) {
    String lua_scripts = "if redis.call('setnx',KEYS[1],ARGV[1]) == 1 then" +
            "redis.call('expire',KEYS[1],ARGV[2]) return 1 else return 0 end";
    List<String> keys = new ArrayList<>();
    List<String> values = new ArrayList<>();
    keys.add(key);
    values.add(UniqueId);
    values.add(String.valueOf(seconds));
    Object result = jedis.eval(lua_scripts, keys, values);
    //判断是否成功
    return result.equals(1L);
}
```



## 4. 使用 `SET key value[EX seconds][PX milliseconds][NX|XX]` 命令 (正确做法) 实现分布式锁

#### 4.1 简介

Redis在 2.6.12 版本开始，为 SET 命令增加一系列选项：

语法

```
SET key value [EX seconds] [PX milliseconds] [NX|XX]
```

- EX second: 设置键的过期时间为second秒
- PX millisecond： 设置键的过期时间为milliseconds
- NX：只有键不存在时，才对键进行设置操作
- XX: 只有键已经存在，才对键进行设置操作
- SET 操作成功完成时，返回OK,否则返回nil

set命令的nx选项，就等同于setnx命令

## 参考文章

[基于Redis的分布式锁实现](https://juejin.cn/post/6844903830442737671)