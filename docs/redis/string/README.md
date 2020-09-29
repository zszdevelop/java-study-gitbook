# String字符串

字符串可以存储以下3种类型的值

- 字节串(byte string)
- 整数
- 浮点数

## 1.操作命令

### 1.1 基础操作命令

| 命令 | 行为                   |
| ---- | ---------------------- |
| GET  | 获取存储在给定键中的值 |
| SET  | 设置存储在给定键中的值 |
| DEL  | 删除存储在给定键中的值 |

### 1.2 自增自减命令

| 命令        | 用例                        | 描述                                         |
| ----------- | --------------------------- | -------------------------------------------- |
| INCR        | INCR key-name               | 将键存储的值加上1                            |
| DECR        | DECR key-name               | 将键存储的值减去1                            |
| INCRBY      | INCRBY key-name amount      | 将键存储的值加上整数amount                   |
| DECRBY      | DECRBY key-name amount      | 将键存储的值减去整数amount                   |
| INCRBYFLOAT | INCRBYFLOAT key-name amount | 将键存储的值加上浮点数amount（redis2.6以上） |

### 1.3 处理子串

| 命令     | 用例                           | 描述                                                         |
| -------- | ------------------------------ | ------------------------------------------------------------ |
| APPEND   | APPEND key-name value          | 将值value追加到给定键key-name当前值的末尾                    |
| GETRANGE | GETRANGE key-name start end    | 获取一个由偏移量start至偏移量end范围内组成的子串，包括start和end在内 |
| SETRANGE | SETRANGE key-name offset value | 将从start偏移量开始的子串设置为给定值                        |
| GetBit   | GETBIT key-name offset         | 将字符串看做hi二进制位串（bit string）                       |
| SetBit   |                                |                                                              |
| BitCount |                                |                                                              |
| Bittop   |                                |                                                              |

