# Set集合

redis 的集合和列表

- 共同点
  1. 都可以存储多个字符串
- 不同点
  1. 列表可以存储多个相同的字符串，而集合则通过使用散列表来保证自己存储的每个字符串各不相同

redis集合使用无序（unordered）方式存储元素，所以用户

## 1.操作命令

### 1.1 基本命令

| 命令        | 行为                           | 描述                                                         |
| ----------- | ------------------------------ | ------------------------------------------------------------ |
| SADD        | SADD key-name item [item...]   | 将一个或多个元素添加到集合里面，并返回被添加元素当中原本并不存储于集合里面的元素数量 |
| SREM        | SREM key-name item [item ...]  | 从集合里面移除一个或多个元素，并返回被移除元素的数量         |
| SISMEMBER   | SISMEMBER key-name item        | 检查元素item 是否存在与集合key-name里                        |
| SISMEMBER   | SCARD key-name                 | 返回集合包含元素的数量                                       |
| SMEMBERS    | SMEMBERS key-name              | 返回集合包含的所有元素                                       |
| SRANDMEMBER | SRANDMEMBER  key-name [count]  | 从集合里面随机地返回一个或多个元素。当count为正数时，命令返回的随机元素不会重复，当count为负数时，命令返回的随机元素可能出现重复 |
| SPOP        | SPOP key-name                  | 随机地移除集合中的一个元素，并返回被移除的元素               |
| SMOVE       | SMOVE source-key dest-key item | 如果集合source-key包含元素item，那么从集合source-key里面移除元素item，并将元素item添加到集合dest-keyzhong 。如果成功移除返回1，否则返回0 |
| SINTER      | 交集计算                       |                                                              |
| SINTER      | 交集计算                       |                                                              |
|             |                                |                                                              |

## 1.2 处理多个集合

| 命令        | 用例                                         | 描述                                                         |
| ----------- | -------------------------------------------- | ------------------------------------------------------------ |
| SDIFF       | SDIFF key-name [key-name ...]                | 返回那些存在于第一个集合，但不存在于其他集合中的元素（差集运算） |
| SDIFFSTORE  | SDIFFSTORE dest-key key-name [key-name ...]  | 将那些存在与第一个集合但并不存在与其他集合中的元素（差集）存储到dest-key 键里面 |
| SINTER      | SINTER key-name [key-name ...]               | 返回那些同时存在于所有集合中的元（交集运算）                 |
| SINTERSTORE | SINTERSTORE dest-key key-name [key-name ...] | 将那些同时存在于所欲集合的元素存储到dest-key键里面           |
| SUNION      | SUNION key-name [key-name ...]               | 返回那些至少存在于一个集合中的元素（并集运算）               |
| SUNIONSTORE | SUNIONSTORE dest-key key-name [key-name ...] | 将那么至少存在与一个集合中的元素（并集）存储到dest-key键里面 |

