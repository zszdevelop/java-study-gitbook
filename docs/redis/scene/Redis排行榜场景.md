# Redis排行榜场景（zset）

在一些游戏和活动中，当涉及到社交元素的时候，排行榜可以说是一个很常见的需求场景了，就我们通常见到的排行榜而言，会提供以下基本功能

- 全球榜单，对所有用户根据积分进行排名，并在榜单上展示前多少
- 个人排名，用户查询自己所在榜单的位置，并获知周边小伙伴的积分，方便自己比较和超越
- 实时更新，用户的积分实时更改，榜单也需要实时更新

上面可以说是一个排行榜需要实现的几个基本要素了，正好我们刚讲到了redis这一节，本篇则开始实战，详细描述如何借助redis来实现一份全球排行榜

## 1. 方案设计

在进行方案设计之前，先模拟一个真实的应用场景，然后进行辅助设计与实现

### 1.1 业务场景说明

以前一段时间特别🔥的跳一跳这个小游戏进行说明，假设我们这个游戏用户遍布全球，因此我们要设计一个全球的榜单，每个玩家都会根据自己的战绩在排行榜中获取一个排名，我们需要支持全球榜单的查询，自己排位的查询这两种最基本的查询场景；此外当我的分数比上一次的高时，我需要更新我的积分，重新获得我的排名；

此外也会有一些高级的统计，比如哪个分段的人数最多，什么分段是瓶颈点，再根据地理位置计算平均分等等

本篇博文主要内容将放在排行榜的设计与实现上；至于高级的功能实现，后续有机会再说

### 1.2 数据结构

因为排行榜的功能比较简单了，也不需要什么复杂的结构设计，也没有什么复杂的交互，因此我们需要确认的无非就是数据结构 + 存储单元

**存储单元**

表示排行榜中每一位上应该持有的信息，一个最简单的如下

```java
// 用来表明具体的用户
long userId;
// 用户在排行榜上的排名
long rank;
// 用户的历史最高积分，也就是排行榜上的积分
long score;
```

**数据结构**

排行榜，一般而言都是连续的，借此我们可以联想到一个合适的数据结构LinkedList，好处在于排名变动时，不需要数组的拷贝

![image-20191007090440623](./img/image-20191007090440623.png)

上图演示，当一个用户积分改变时，需要向前遍历找到合适的位置，插入并获取新的排名, 在更新和插入时，相比较于ArrayList要好很多，但依然有以下几个缺陷

**问题1：用户如何获取自己的排名？**

使用`LinkedList`在更新插入和删除的带来优势之外，在随机获取元素的支持会差一点，最差的情况就是从头到尾进行扫描

**问题2：并发支持的问题？**

当有多个用户同时更新score时，并发的更新排名问题就比较突出了，当然可以使用jdk中类似写时拷贝数组的方案

上面是我们自己来实现这个数据结构时，会遇到的一些问题，当然我们的主题是借助redis来实现排行榜，下面则来看下，利用redis可以怎么简单的支持我们的需求场景

### 1.3 redis使用方案

这里主要使用的是redis的ZSET数据结构，带权重的集合，下面分析一下可能性

- set: 集合确保里面元素的唯一性
- 权重：这个可以看做我们的score，这样每个元素都有一个score；
- zset：根据score进行排序的集合

从zset的特性来看，我们每个用户的积分，丢到zset中，就是一个带权重的元素，而且是已经排好序的了，只需要获取元素对应的index，就是我们预期的排名

## 2. 功能实现

我们主要是借助zset提供的一些方法来实现排行榜的需求，下面的具体方法设计中，也会有相关说明

### 2.1 前提准备

首先准备好redis环境，spring项目搭建好，然后配置好redisTemplate

```java
@Configuration
public class RedisConfig {

    @Bean(name = "redisTemplate")
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {

        RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        // 使用Jackson2JsonRedisSerialize 替换默认序列化
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        objectMapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);

        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);

        // 设置value的序列化规则和 key的序列化规则
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }
}
```

### 2.2 用户上传积分

上传用户积分，然而zset中有一点需要注意的是其排行是根据score进行升序排列，这个就和我们实际的情况不太一样了；为了和实际情况一致，可以将score取反；另外一个就是排行默认是从0开始的，这个与我们的实际也不太一样，需要+1

```java
/**
 * 更新用户积分，并获取最新的个人所在排行榜信息
 *
 * @param userId
 * @param score
 * @return
 */
public RankDO updateRank(Long userId, Float score) {
    // 因为zset默认积分小的在前面，所以我们对score进行取反，这样用户的积分越大，对应的score越小，排名越高
    redisUtil.zAdd(RANK_PREFIX,String.valueOf(userId), -score);
    Long rank = redisUtil.zRank(RANK_PREFIX, String.valueOf(userId));
    return new RankDO(userId,rank + 1, score);
}
```

### 2.3 获取个人排名

获取个人排行信息，主要就是两个一个是排名一个是积分；需要注意的是当用户没有积分时（即没有上榜时），需要额外处理

```java
/**
 * 获取用户的排行榜位置
 *
 * @param userId
 * @return
 */
@Override
public RankDO getRank(Long userId) {
    // 获取排行， 因为默认是0为开头，因此实际的排名需要+1
    Long rank = redisUtil.zRank(RANK_PREFIX, String.valueOf(userId));
    if (rank == null) {
        // 没有排行时，直接返回一个默认的
        return new RankDO(-1L, userId,0F);
    }

    // 获取积分
    Double score = redisUtil.zScore(RANK_PREFIX, String.valueOf(userId));
    return new RankDO(userId,rank + 1, Math.abs(score.floatValue()));
}
```

### 2.4 获取个人周边用户积分及排行信息

首先获取用户的个人排名，然后查询固定排名段的数据即可

```java
/**
 * 获取用户所在排行榜的位置，以及排行榜中其前后n个用户的排行信息
 *
 * @param userId
 * @param n
 * @return
 */
@Override
public List<RankDO> getRankAroundUser(Long userId, int n) {
    // 首先是获取用户对应的排名
    RankDO rank = getRank(userId);
    if (rank.getRank() <= 0) {
        // fixme 用户没有上榜时，不返回
        return Collections.emptyList();
    }

    // 因为实际的排名是从0开始的，所以查询周边排名时，需要将n-1
    Set<ZSetOperations.TypedTuple<Object>> result =
            redisUtil.zRangeWithScores(RANK_PREFIX, Math.max(0, rank.getRank() - n - 1), rank.getRank() + n - 1);
    return buildRedisRankToBizDO(result, rank.getRank() - n);
}


    private List<RankDO> buildRedisRankToBizDO(Set<ZSetOperations.TypedTuple<Object>> result, long offset) {
        List<RankDO> rankList = new ArrayList<>(result.size());
        long rank = offset;
        for (ZSetOperations.TypedTuple<Object> sub : result) {
            String userId = (String) sub.getValue();
            rankList.add(new RankDO( Long.parseLong(userId),rank++, Math.abs(sub.getScore().floatValue())));
        }
        return rankList;
    }
```

看下上面的实现，获取用户排名之后，就可以计算要查询的排名范围`[Math.max(0, rank.getRank() - n - 1), rank.getRank() + n - 1]`

其次需要注意的如何将返回的结果进行封装，上面写了个转换类，主要起始排行榜信息

### 2.5 获取topn排行

```java
/**
 * 获取前n名的排行榜数据
 *
 * @param n
 * @return
 */
@Override
public List<RankDO> getTopNRanks(int n) {
    Set<ZSetOperations.TypedTuple<Object>> result = redisUtil.zRangeWithScores(RANK_PREFIX, 0, n - 1);
    return buildRedisRankToBizDO(result, 1);
}
```

## 3. 测试

首先准备一个测试脚本，批量的插入一下积分，用于后续的查询更新使用

```java
public class RankInitTest {

    private Random random;
    private RestTemplate restTemplate;

    @Before
    public void init() {
        random = new Random();
        restTemplate = new RestTemplate();
    }

    private int genUserId() {
        return random.nextInt(1024);
    }

    private double genScore() {
        return random.nextDouble() * 100;
    }

    @Test
    public void testInitRank() {
        for (int i = 0; i < 30; i++) {
            restTemplate.getForObject("http://localhost:8080/update?userId=" + genUserId() + "&score=" + genScore(),
                    String.class);
        }
    }
}
```

### 4. 小结

上面利用redis的zset实现了排行榜的基本功能，主要借助下面三个方法

- range 获取范围排行信息
- score 获取对应的score
- range 获取对应的排名

虽然实现了基本功能，但是问题还是有不少的

- 上面的实现，redis的复合操作，原子性问题
- 由原子性问题导致并发安全问题
- 性能怎么样需要测试

### 参考文章

[SpringBoot应用篇之借助Redis实现排行榜功能](<https://my.oschina.net/u/566591/blog/2993208>)