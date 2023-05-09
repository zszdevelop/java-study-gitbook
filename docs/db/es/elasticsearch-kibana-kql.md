---
order: 1110
category:
  - es
---



# ELK日志 - Kibana中的KQL语法

## 1. 简介

KQL：（Kibana Query Language ）查询语法是Kibana为了简化ES查询设计的一套简单查询语法，Kibana支持索引字段和语法补全，可以非常方便的查询数据。

![image-20230506144617336](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230506144617336.png)

如果关闭 KQL，Kibana 将使用 Lucene。

在Kibana中使用Filters对数据进行过滤使用KQL语法来完成。

## 2. 查询语法

### 2.1 等值匹配（equals）

用于查询字段值

**语法**

> 字段名:匹配值

**示例一**

```basic
response:200

# 匹配到的结果
200
hello world 200
hello 200 world
```

查询出response字段中**包含**200的文档对象，注意是包含，包含的是200这一个词。

需要注意的是**1200**或者**2001**，是不能被查出来的。

**示例二**

```basic
message:"hello world yes"
```

上面这个表达式，是针对message字段进行搜索，在搜索的时候不会区分大小写。

需要注意，上面的"hello world yes"使用了引号，这样的话，这3个单词会被作为一个词进行查询，不会再进行分词。

**示例三**

```basic
message:hello world

#匹配到的结果
hello
world
Hello
World
hello world
Hello world
hello yes World
yes world
world yes
```

上面这个表达式，针对message字段进行搜索，搜索message中**包含**hello，或者**包含**world，或者两者都**包含**的情况；

**不区分大小写，也不会保证顺序**

### 2.2 关系运算符

关系运算符只能用在数值和时间类型的字段

| 符号 | 说明     |
| ---- | -------- |
| <=   | 小于等于 |
| >=   | 大于等于 |
| <    | 小于     |
| 大于 |          |

**示例一**

```basic
account_number >=100
```

上面这个表达式，针对account_number字段进行搜索，搜索account_number的值大于等于100的数据。

**示例二**

```basic
# 搜索日期

# 搜索具体时间
@timestamp < "2021-01-02T21:55:59"

# 搜索年-月份
@timestamp < "2021-01"

#搜索年
@timestamp < "2021"
```

### 2.3 逻辑运算符

**支持逻辑运算符如下:**

- and：与
- or：或
- not：非

**示例一**

```basic
# and 的用法
name:jane and addr:beijing
```

上面这个条件，会查询name字段包含jane，且addr字段包含beijing的记录。

注意：查询结果不区分大小写

**示例二**

```basic
# or 的用法
name:jane or addr:beijing
```

上面这个查询条件，会查询name字段包含jane，或者addr字段包含beijing的记录，或者两者都匹配；

**示例三**

```basic
# not 的用法

#查询出response字段中不包含200的记录
not response:200

# 查询response包含200，并且整条记录不包含yes的数据记录 
response:200 and not yes

# 查询response包含200，且response不包含yes的记录
response:(200 and not yes)
```

**示例四**

```basic
name:jane and addr:beijing or job:teacher
```

上面的查询条件，查询name包含jane，且addr包含beijing的记录，或者job包含teacher的记录。

*注意：KQL中，and的优先级高于or*

对于上方结果可以使用小括号来更好的理解

```basic
(name:jane and addr:beijing) or job:teacher
```

**示例五**

```basic
response:(200 or 404)

# 与上方表达式等价
response:200 or response:400
```

上面这个表达式，会查询response包含200，或者response包含404，或者包含200和404的记录（不保证顺序、不区分大小写）；

同时可以使用and来表示“且”的关系。

### 2.4 通配符查询

匹配包含指定字段的文档。

**语法**

> 字段名:*
>
> 字段名*:属性值
>
> 字段名:属性值*

"*"代表通配符，可以添加到字段名中，也可以添加到属性值当中，代表匹配任意字符。

**示例一**

```basic
response:*
```

　上面这个查询条件，会返回所有包含response字段的文档对象。

**示例二**

```basic
machine*:hello
```

查询字段名以machine开头，字段值为hello的数据。

**示例三**

```basic
# 查询字段名为machine，字段值以hello开头的数据
machine:hello*

# 查询字段名为FlightNum，字段值开头为T，结尾为V的数据
FlightNum:T*V
```

![image-20230506145238415](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230506145238415.png)

### 2.5 字段嵌套查询

首先准备一个多层的数据，比如下面的这几条数据。

```json
{
  "level1": [
    {
      "level2": [
        {
          "prop1": "foo",
          "prop2": "bar"
        },
        {
          "prop1": "baz",
          "prop2": "qux"
        }
      ]
    }
  ]
}
```

比如想筛选 level1.level2.prop1 是 `foo` 或者是 `baz`的，可以这样写：

```json
level1.level2 { prop1: "foo" or prop1: "baz" }
```

## 参考文章

[详解Kibana中的KQL语法](https://juejin.cn/post/7045085869979467789)
