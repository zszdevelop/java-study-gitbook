---
order: 71
category:
  - 架构
---

# 系统高并发-限流

>**高并发实现的三板斧：缓存，限流和降级**。

## 1. 什么是限流？为什么要限流？

程序处理请求的能力也是有限的，一旦请求多到超出它的处理极限就会崩溃。

**限流(Ratelimiting)指对应用服务的请求进行限制**，例如某一接口的请求限制为 100 个每秒,对超过限制的请求则进行快速失败或丢弃。

> 限流是保证系统高可用的重要手段！
>
> 由于互联网公司的流量巨大，系统上线会做一个流量峰值的评估，尤其是像各种秒杀促销活动，为了保证系统不被巨大的流量压垮，会在系统流量到达一定阈值时，拒绝掉一部分流量。
>
> 限流会导致用户在短时间内（这个时间段是毫秒级的）系统不可用，一般我们衡量系统处理能力的指标是每秒的QPS或者TPS，假设系统每秒的流量阈值是1000，理论上一秒内有第1001个请求进来时，那么这个请求就会被限流。

## 2. 限流的作用

限流可以应对：

- 热点业务带来的突发请求；
- 调用方 bug 导致的突发请求；
- 恶意攻击请求。

因此，**对于公开的接口最好采取限流措施**。

## 3. 限流方案

### 3.1 计数器算法

Java内部也可以通过原子类计数器AtomicInteger、Semaphore信号量来做简单的限流。

####  3.1.1 实现思路：

1. 一般我们会限制一秒钟的能够通过的请求数，比如限流qps为100，
2. 算法的实现思路就是从第一个请求进来开始计时
3. 在接下来的1s内，每来一个请求，就把计数加1
4. 如果累加的数字达到100，那么后续的请求就会被全部拒绝
5. 等到1s结束后，把计数恢复成0，重新开始计数

```java
// 限流的个数
private int maxCount = 100;
// 指定的时间内
private long interval = 60;
// 原子类计数器
private AtomicInteger atomicInteger = new AtomicInteger(0);
// 起始时间
private long startTime = System.currentTimeMillis();

public boolean limit(int maxCount, int interval) {
    atomicInteger.addAndGet(1);
    if (atomicInteger.get() == 1) {
        startTime = System.currentTimeMillis();
        atomicInteger.addAndGet(1);
        return true;
    }
    // 超过了间隔时间，直接重新开始计数
    if (System.currentTimeMillis() - startTime > interval * 1000) {
        startTime = System.currentTimeMillis();
        atomicInteger.set(1);
        return true;
    }
    // 还在间隔时间内,check有没有超过限流的个数
    if (atomicInteger.get() > maxCount) {
        return false;
    }
    return true;
} 
```

### 3.2 漏桶算法

漏桶算法思路很简单，我们把水比作是请求，**漏桶比作是系统处理能力极限**，水先进入到漏桶里，漏桶里的**水按一定速率流出**，当流出的速率小于流入的速率时，由于**漏桶容量有限，后续进入的水直接溢出（拒绝请求）**，以此实现限流。

![image-20220610211108002](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220610211108002.png)

#### 3.2.1 实现思路：

- 可以准备一个队列，用来保存请求，
- 另外通过一个线程池定期从队列中获取请求并执行，可以一次性获取多个并发执行

**弊端**：无法对应短时间的突发流量

### 3.3 令牌桶算法

>从某种意义上，令牌桶是对漏桶算法的一种改进，桶算法能够限制请求调用的速率，而令牌桶算法能够在限制调用的平均速率的同时还允许一定程度的突发调用

令牌桶算法的原理也比较简单，我们可以理解成医院的挂号看病，只有拿到号以后才可以进行诊病。

系统会维护一个令牌（token）桶，**以一个恒定的速度往桶里放入令牌（token）**，这时如果有请求进来想要被处理，则需要先从桶里获取一个令牌（token），当桶里没有令牌（token）可取时，则该请求将被拒绝服务。**令牌桶算法通过控制桶的容量、发放令牌的速率，来达到对请求的限制**。

![image-20220610211432413](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220610211432413.png)

####  3.3.1 实现思路：

可以准备一个队列，用来保存令牌，另外通过一个线程池定期生成令牌放到队列中，每来一个请求，就从队列中获取一个令牌，并继续执行。

### 3.4 Redis + Lua

>之前介绍的3中都是单机限流，单机限流无法满足五花八门的需求。如
>
>- 限制某个资源被每个用户或者商户的访问次数，5秒只能访问2次，或者一天只能调用100次，单机限流无法实现，需要集群限流
>
>如何实现？
>
>为了控制访问次数，肯定需要一个计数器，而且这个计数器只能保存在第三方服务，比如redis

很多同学不知道Lua是啥？个人理解，Lua脚本和 MySQL数据库的存储过程比较相似，他们执行一组命令，所有命令的执行要么全部成功或者失败，以此达到原子性。也可以把Lua脚本理解为，一段具有业务逻辑的代码块。


而Lua本身就是一种编程语言，虽然redis 官方没有直接提供限流相应的API，但却支持了 Lua 脚本的功能，可以使用它实现复杂的令牌桶或漏桶算法，也是分布式系统中实现限流的主要方式之一。

相比Redis事务，Lua脚本的优点：

- 减少网络开销：使用Lua脚本，无需向Redis发送多次请求，执行一次即可，减少网络传输
- 原子操作：Redis将整个Lua脚本作为一个命令执行，原子，无需担心并发
- 复用：Lua脚本一旦执行，会永久保存 Redis 中，其他客户端可复用


Lua脚本大致逻辑如下：

```lua
-- 获取调用脚本时传入的第一个key值（用作限流的 key）
local key = KEYS[1]
-- 获取调用脚本时传入的第一个参数值（限流大小）
local limit = tonumber(ARGV[1])

-- 获取当前流量大小
local curentLimit = tonumber(redis.call('get', key) or "0")

-- 是否超出限流
if curentLimit + 1 > limit then
-- 返回(拒绝)
return 0
else
-- 没有超出 value + 1
redis.call("INCRBY", key, 1)
-- 设置过期时间
redis.call("EXPIRE", key, 2)
-- 返回(放行)
return 1
end
```

- 通过KEYS[1] 获取传入的key参数
- 通过ARGV[1]获取传入的limit参数
- redis.call方法，从缓存中get和key相关的值，如果为null那么就返回0
- 接着判断缓存中记录的数值是否会大于限制大小，如果超出表示该被限流，返回0
- 如果未超过，那么该key的缓存值+1，并设置过期时间为1秒钟以后，并返回缓存值+1

>总的这1秒钟就只有这么多个请求。理论上来说他是令牌桶算法

### 3.5 网关层限流

限流常在网关这一层做，比如Nginx、Openresty、Kong、Zuul、Spring Cloud Gateway等，而像spring cloud - gateway网关限流底层实现原理，就是基于Redis + Lua，通过内置Lua限流脚本的方式。

![image-20220610212734116](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220610212734116.png)

## 参考文章

[我司用了6年的Redis分布式限流器，可以说是非常厉害了！](http://dockone.io/article/10137)