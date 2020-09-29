# Hash散列

redis的散列可以存储多个键值对之间的映射，散列在很多方面就想是一个微缩版的redis

## 1. 操作命令

### 1.1 基础操作命令

| 命令  | 用例                                     | 描述                                                         |
| ----- | ---------------------------------------- | ------------------------------------------------------------ |
| HGET  | HGET key-name key                        | 在散列里面获取一个键的值（HMGET单参数版本）                  |
| HSET  | HSET key-name key value                  | 为散列里面的一个键设置值（HMSET单参数版本）                  |
| HMGET | HMGET key-name key [key...]              | 在散列里面获取一个或多个键的值                               |
| HMSET | HMSET key-name key value [key value ...] | 为散列里面的一个或多个键设置值                               |
| HDEL  | HDEL key-name key [key ...]              | 删除散列里面的一个或多个键值对，返回成功找到并删除的键值对数量 |
| HLEN  | HLEN key-name                            | 返回散列包含的键值对数量                                     |

### 1.2 高级特性

| 命令         | 用例                                | 描述                                |
| ------------ | ----------------------------------- | ----------------------------------- |
| HEXISTE      | HEXISTE key-name key                | 检查给定键是否存在与散列中          |
| HKEYS        | HKEYS key-name                      | 获取散列包含的所有键                |
| HVALS        | HVALS key-name                      | 获取散列包含的所有值                |
| HGETALL      | HGETALL key-name                    | 获取散列包含的所有键值对            |
| HINCRBY      | HINCRBY key-name key increment      | 将键key存储的值加上整数increment    |
| HINCRBYFLOAT | HINCRBYFLOAT key-name key increment | 将键key存储的值加上浮点数 increment |

