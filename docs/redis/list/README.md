# List列表

redis的列表允许用户从序列两端推入或者弹出元素

## 1.操作命令

### 1.1 常用命令

| 命令   | 用例                             | 描述                                                         |
| ------ | -------------------------------- | ------------------------------------------------------------ |
| LPUSH  | LPUSH key-name value [value ...] | 将一个或多个值推入列表的左端                                 |
| RPUSH  | RPUSH key-name value [value ...] | 将一个或多个值推入列表的右端                                 |
| LPOP   | LPOP key-name                    | 移除并返回列表最左端的元素                                   |
| RPOP   | RPOP key-name                    | 移除并返回列表最右端的元素                                   |
| LINDEX | LINDEX key-name offset           | 返回列表中偏移量为offset的元素                               |
| LRANGE | LRANGE key-name start end        | 返回列表从start偏移量到end偏移量范围内的所有元素(包含start,end) |
| LTRIM  | LTRIM key-name start end         | 对列表进行修剪，只保留start和end偏移量之间的元素（包含start,end） |

## 1.2 阻塞式的列表弹出命令

| 命令  | 用例                                | 描述                                                         |
| ----- | ----------------------------------- | ------------------------------------------------------------ |
| BLPOP | BLPOP key-name [key-name …] timeout | 从第一个非空列表中弹出位于最左端的元素，或者在timeout秒之内阻塞并等待可弹出的元素出现 |
| BRPOP | BRPOP key-name [key-name …] timeout | 从第一个非空列表中弹出位于最右端的元素，或者在timeout秒之内阻塞并等待可弹出的元素出现 |

### 1.3 列表之间移动元素

| 命令       | 用例                           | 描述                                                         |
| ---------- | ------------------------------ | ------------------------------------------------------------ |
| RPOPLPUSH  | RPOPLPUSH source-key dest-key  | 从souce-key列表中弹出位于最右端的元素，然后将这个元素推入desr-key最左端。并向用户返回这个元素 |
| BRPOPLPUSH | BRPOPLPUSH source-key dest-key | 从source-key列表中弹出位于最右端的元素，然后将这个元素推入dest-key列表最左端。并向用户返回这个元素。如果soutce-key为空，那么在timeout秒之内之内阻塞并等待可弹出的元素出现 |