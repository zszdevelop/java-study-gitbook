# Zset有序集合

和散列存储这键和值之间的映射类似，有序集合也存储着成员与分值之间的映射，并且提供了分值处理命令，以及根据分值大小有序的获取（fetch）或扫描（scan）成员和分值的命令

- 键：被称为member

  每个成员都是各不相同的

- 值：称为分值（score）

  分值必须为浮点数

##1 操作命令

###1.1 基础命令 

| 命令    | 用例                                          | 描述                                                         |
| ------- | --------------------------------------------- | ------------------------------------------------------------ |
| ZADD    | ZADD key-name score member [score member ...] | 将带有给定分值的成员添加到有序集合里面                       |
| ZREM    | ZREM key-name member [member ...]             | 从有序集合里面移除给定的成员，并返回被移除成员数量           |
| ZINCRBY | ZINCRBY key-name increment member             | 将member成员的分值加上increment                              |
| ZCOUNT  | ZCOUNT key-name min max                       | 返回分值介于min和max之间的成员数量                           |
| ZRANK   | ZRANK key-name member                         | 返回成员member在有序集合中的排名                             |
| ZSCORE  | ZSCORE key-name member                        | 返回成员member的分值                                         |
| ZRANGE  | ZRANGE key-name start stop [WITHSCORES]       | 返回有序集合中排名介于start和stop之间的成员，如果给定了可选的WITHSCORES，那么命令会将成员的分值也一并返回 |

### 1.2 其他命令

| 命令              | 用例 | 描述 |
| ----------------- | ---- | ---- |
| ZREVRANK          |      |      |
| ZREVRANGE         |      |      |
| ZRANGEBYSCORE     |      |      |
| ZREVERANGEBYSCORE |      |      |
| ZREMANGEBYRANK    |      |      |
| ZREMRANGEBYSCORE  |      |      |
| ZINTERSTORE       |      |      |
| ZUNIONSTORE       |      |      |
|                   |      |      |

