# MongoDB查询

## 1. 集合查询方法 find(）

### 1.1 语法

```bash
# 查询集合中文档并返回结果为游标的文档集合。
# -------------------------------------
# 方法一
db.getCollection(cname).find(query, projection)

# 方法二
db.cname.find(query, projection)
```

### 1.2 参数说明

| 参数       | 类型     | 描述                                                         |
| ---------- | -------- | ------------------------------------------------------------ |
| cname      | 文档集合 | 必填 类似mysql中的数据库                                     |
| query      | 文档     | 可选 使用查询操作符指定查询条件                              |
| projection | 文档     | 可选 使用投影操作符指定返回的键 查询时返回文档中所有键值， 只需省略该参数即可（默认省略）. |

### 1.3 返回值

匹配查询条件的**文档集合的游标**

## 2. query查询条件

### 2.1 默认值：{}

会查询匹配集合中的全部内容。，如同SQL中"SELECT * FROM Table_name"语句。

```bash
# 将返回集合中所有文档
# ------------------
# 方法一
db.getCollection(cname).find()

# 方法二
db.getCollection(cname).find({})
```

### 2.2 键值对 {key:value}

执行了条件筛选，就如同SQL中"SELECT * FROM Table_name where key = value"语句。
 下面查询操作将返回raw_data_single集合中host键值为g61的文档集合，结果如图

```bash
db.getCollection('raw_data_single').find({"host":"g61"})
```

### 2.3 键值对AND {key1:value1,key2:value2}

则相当于查询AND组合条件，“条件1 AND条件2 AND…AND 条件N"
 下面查询操作将返回raw_data_single集合中host键值为g61并且ip键值为59的文档集合，结果如图

```bash
# mongo db
db.getCollection('raw_data_single').find({"host":"g61","ip":"59"})
```

## 3. projection指定返回的键

### 3.1 默认值

查询操作默认返回查询文档中所有键值。像SQL中我们可以指定*查询返回字段一样。从未指定projection的查询中，我们可以看到所有的字段都被返回了。通过 true 和 false 来制定是否显示键值。

```bash
# 指定显示host，但是_id会默认显示，可以用 1 和 0 代替 ture 和 false
db.getCollection('raw_data_single').find({"host":"g61"},{"host":1})
```

结果如下：

```bash
# 指定去掉_id的键值
db.getCollection('raw_data_single').find({"host":"g61"},{"host":true,"_id":false})
```

## 4 内嵌文档查询

### 4.1 完全匹配查询

```swift
db.raw_data_single.find({"host":"g61","facts":{"mtu_eth0":1500,"mtu_eth1":1500}})
```

结果：没有，由于facts里面的数据过多我删掉了部分才能写完全匹配，结果如下

![image-20211216192334520](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211216192334520.png)

注意：在没有删除其他facts数据前是无法查询到数据的，完全匹配！！！

### 4.2 点的方式查询

```swift
db.raw_data_single.find({"host":"g61","facts.mtu_eth0":1500})
```

结果如下：

![image-20211216192407705](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211216192407705.png)

### 4.3 $elemMatch操作符（搜索对象为数组）

使用点的方式对数组进行搜索，会对数组里面所有的内容逐一对比，只要有一个值符合条件都返回文档的内容。集合blogs有如下文档：

```json
{
    "_id" : ObjectId("596c1eea3df4768f4e992dd6"),
    "comment" : [ 
        {
            "author" : "zhangsan",
            "score" : 3,
            "comment" : "shafa!"
        }, 
        {
            "author" : "lisi",
            "score" : 5,
            "comment" : "lzsb!"
        }
    ]
}
```

不符合预期的搜索，

```bash
db.blogs.find({"comment.author":"zhangsan", "comment.score":{"$gte":4}});
```

![image-20211216192546640](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211216192546640.png)

使用$elemMatch操作符进行搜索：

```bash
# 张三分数大于4，搜索结果为空
db.blogs.find({"comment":{"$elemMatch":{"author":"zhangsan","score":{"$gt":4}}}});
# 张三分数大于2，搜索出id为596c1eea3df4768f4e992dd6的文档
db.blogs.find({"comment":{"$elemMatch":{"author":"zhangsan","score":{"$gt":2}}}});
```

![image-20211216192621889](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211216192621889.png)

![image-20211216192633326](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211216192633326.png)

## 5 查询操作符

### 5.1 "$gt" 、"$gte"、 "$lt"、 "$lte" - 比较操作符

比较操作符"$gt" 、"$gte"、 "$lt"、 "$lte"(分别对应">"、 ">=" 、"<" 、"<=")

```bash
#查询年龄为16-18岁(包含16但不含18)的用户：
db.user.find( { age: { $gte: 16 ,$lt:18} } 

#我们可以使用"$ne"来进行"不相等"操作。例如查询年龄不为18岁的用户：
db.user.find( { age: {$ne:18} } 

#要査找在1990年1月1日出生的用户：
start = new Date("1990/01/01")
db.users.find({"birthday" ： {"$lt" ： start}})
```

### 5.2 "$in" - 判断键值是否为null

如何检索出sex键值为null的文档，我们使用"in"、"where"操作符
 "$in"判断键值是否为null
 "$exists"判定集合中文档是否包含该键
 测试文档如下：

```json
{
    "_id" : ObjectId("596c5e351109af0230579527"),
    "name" : "xiaoming",
    "age" : 20,
    "sex" : "male"
}
{
    "_id" : ObjectId("596c5e351109af0230579529"),
    "name" : "xiaohong",
    "age" : 22
}
{
    "_id" : ObjectId("596c5e351109af023057952b"),
    "name" : "lilei",
    "age" : 24,
    "sex" : null
}
```



```php
# 返回文档中存在sex键，且值为null的文档
# ----------------------------------
 # 方法一，建议使用
db.users.find({sex:{$in:[null],$exists:true}})
# 结果为：
"_id" : ObjectId("596c5e351109af023057952b")

# 方法二，慎用：因为null不仅仅匹配自身，而且匹配键“不存在的”文档！
db.users.find({sex:null}) 
# 结果为：
"_id" : ObjectId("596c5e351109af0230579529")
"_id" : ObjectId("596c5e351109af023057952b")
```

### 5.3 "$all" - 数组精确匹配

$all: 匹配那些指定键的键值中包含数组，而且该数组包含条件指定数组的所有元素的文档,数组中元素顺序不影响查询结果。

```css
语法: {field: {\$all: [value, value1, ...]}
```

测试文档如下：

```json
{
    "_id" : ObjectId("596c605b1109af02305795b9"),
    "name" : "t1",
    "amount" : 50,
    "tags" : [ "school", "book", "bag", "headphone", "appliances"]
}
{
    "_id" : ObjectId("596c605b1109af02305795bb"),
    "name" : "t2",
    "amount" : 50,
    "tags" : ["appliances", "school", "book"]
}
{
    "_id" : ObjectId("596c605b1109af02305795bd"),
    "name" : "t3",
    "amount" : 58,
    "tags" : ["bag", "school", "book"]
}
```

#### 5.3.1 数组中使用

```bash
#查询出在集合inventory中 tags键值包含数组，且该数组中包含appliances、school、 book元素的所有文档:
db.inventory.find({tags:{$all:["appliances","school","book"]}})
# 结果为： 
"_id" : ObjectId("596c605b1109af02305795b9")
"_id" : ObjectId("596c605b1109af02305795bb")
```

#### 5.3.2 非数组使用

文档中键值类型不是数组，也可以使用$all操作符进行查询操作



```css
# 查询结果是相同的，匹配amount键值等于50的文档
db.inventory.find({amount: {$all:[50]}})
db.inventory.find({amount: 50})
# 结果为： 
"_id" : ObjectId("596c605b1109af02305795bb")
"_id" : ObjectId("596c605b1109af02305795b9")
```

#### 5.3.3 指定数组位置的元素

则需使用key.index语法指定下标，例如下面查询出tags键值数组中第2个元素为"school"的文档：

```objectivec
# 数组下标都是从0开始的，所以查询结果返回数组中第2个元素为"school"的文档：
db.inventory.find({"tags.1":"school"})
# 结果为： 
"_id" : ObjectId("596c605b1109af02305795bb")
"_id" : ObjectId("596c605b1109af02305795bd")
```

### 5.4 "$size" - 指定长度的数组

#### 5.4.1固定长度

```css
语法：{field: {$size: value}}
```

测试使用5.3的文档，具体测试如下：

```bash
查询集合中tags键值包含有3个元素的数组的所有文档：
db.inventory.find({tags:{$size:3}})
# 结果为： 
"_id" : ObjectId("596c605b1109af02305795bb")
"_id" : ObjectId("596c605b1109af02305795bd")
```

#### 5.4.2 非固定长度（通过计数器的方法解决），具体例子略

size必须制定一个定值，不能接受一个范围值，不能与其他查询子句组合(比如"gt")。
 但有时查询需求就是需要一个长度范围，这种情况创建一个计数器字段，当你增加元素的同时增加计数器字段值。

```bash
# 每一次向指定数组添加元素的时候,"count"键值增加1(充当计数功能)
db.collection.update({$push :{field:value}, $inc：{count： 1}})
# 比较count键值实现范围查询
db.collection.find({count : {$gt:2}})
```

### 5.5 "$in"、"$nin" - [匹配键值等于、匹配键不等于或者不存在]指定数组中任意值的文档

```css
语法:{field:{$in:[<value1>,<value2>,...<valueN>]}}
```

测试使用5.3的文档，具体测试如下：

```css
# 查询出amount键值为16或者50的文档：
db.inventory.find({amount: {$in: [16, 50]}})
# 结果为： 
"_id" : ObjectId("596c605b1109af02305795b9")
"_id" : ObjectId("596c605b1109af02305795bb")

# 查询出amount键值不为16或者50的文档
db.inventory.find({amount: {$nin: [16, 50]}})
# 结果为：
"_id" : ObjectId("596c605b1109af02305795bd")

# 查询出qty键值不为16或50的文档，由于文档中都不存在键qty,所以返回所有文档
db.inventory.find({qty:{$nin:[16,50]}})
# 结果为：
"_id" : ObjectId("596c605b1109af02305795b9")
"_id" : ObjectId("596c605b1109af02305795bb")
"_id" : ObjectId("596c605b1109af02305795bd")

# 查询结果是相同的，匹配amount键值等于50的文档，只有一个值与all的操作是一样的
db.inventory.find({amount: {$in: [50]}})
db.inventory.find({amount: 50})
# 结果为： 
"_id" : ObjectId("596c605b1109af02305795bb")
"_id" : ObjectId("596c605b1109af02305795b9")
```

### 5.6 "$and" - 选择出满足该数组中所有表达式的文档

指定一个至少包含两个表达式的数组，选择出满足该数组中所有表达式的文档。

```bash
语法:{$and:[{<expression1>},{<expression2>},...,{<expressionN>}]}
注意：$and操作符使用短路操作，若第一个表达式的值为“false”,余下的表达式将不会执行。
```

测试使用5.3的文档，具体测试如下：

```bash
#查询name键值为“t1”,amount键值小于51的文档：
db.inventory.find({$and: [{name: "t1"},{amount: {$lt: 51}}]})
# 结果为：
"_id" : ObjectId("596c605b1109af02305795b9")

#对于下面使用逗号分隔符的表达式列表，MongoDB会提供一个隐式的$and操作：
db.inventory.find({name:"t1",amount:{$lt: 50}})
# 结果为：
"_id" : ObjectId("596c605b1109af02305795b9")
```

### 5.7 "$nor" - 选择出都不满足该数组中所有表达式的文档

指定一个至少包含两个表达式的数组，选择出都不满足该数组中所有表达式的文档。

```xml
语法:{$nor:[{<expression1>},{<expression2>},...,{<expressionN>}]}
```

测试使用5.3的文档，具体测试如下：

```bash
# 查询name键值不为“t1”,amount键值不小于50的文档：
db.inventory.find({$nor: [{name: "t1"},{qty: {$lt: 50}}]})
# 结果为：
"_id" : ObjectId("596c605b1109af02305795bb")
"_id" : ObjectId("596c605b1109af02305795bd")

# 若是文档中不存在表达式中指定的键，表达式值为false; false nor false 等于 true,所以查询结果返回集合中所有文档：
db.inventory.find({$nor: [{sale: true},{qty: {$lt: 50}}]})
# 结果为：
"_id" : ObjectId("596c605b1109af02305795b9")
"_id" : ObjectId("596c605b1109af02305795bb")
"_id" : ObjectId("596c605b1109af02305795bd")
```

### 5.8 "$not" - 选择出不能匹配表达式的文档

执行逻辑NOT运算，选择出不能匹配表达式的文档 ，包括没有指定键的文档。
 $not操作符不能独立使用，必须跟其他操作一起使用（除$regex）。

```css
语法:{field:{$not:{<operator-expression>}}}
```

测试使用5.3的文档，具体测试如下：

```bash
# 查询amount键值不大于50（即小于等于50）的文档数据
db.inventory.find({amount: {$not: {$gt: 50}}}) # 等同于db.inventory.find({amount:{$lte:50}})
# 结果为：
"_id" : ObjectId("596c605b1109af02305795b9")
"_id" : ObjectId("596c605b1109af02305795bb")

# 查询条件中的键gty，文档中都不存在无法匹配表示，所以返回集合所有文档数据。
db.inventory.find({gty: {$not: {$gt: 50}}})
# 结果为： 
"_id" : ObjectId("596c605b1109af02305795b9")
"_id" : ObjectId("596c605b1109af02305795bb")
"_id" : ObjectId("596c605b1109af02305795bd")
```

### 5.9 "$or" - 选择出至少满足数组中一条表达式的文档

执行逻辑OR运算,指定一个至少包含两个表达式的数组，选择出至少满足数组中一条表达式的文档。

```xml
语法:{$or:[{<expression1>},{<expression2>},...,{<expressionN>}]}
```

测试使用5.3的文档，具体测试如下：

```bash
# 查询集合中amount的键值大于50或者name的键值为“t1”的文档：
db.inventory.find({$or: [{amount: {$gt: 50}}, {name: "t1"}]})
# 结果为： 
"_id" : ObjectId("596c605b1109af02305795b9")
"_id" : ObjectId("596c605b1109af02305795bb")
"_id" : ObjectId("596c605b1109af02305795bd")
```

### 5.10 "$exists" - 选择存在该字段的文档

如果$exists的值为true,选择存在该字段的文档；若值为false则选择不包含该字段的文档(我们上面在查询键值为null的文档时使用"$exists"判定集合中文档是否包含该键)。

```css
语法:{field:{$exists:<boolean>}}
```

测试使用5.3的文档，并向集合中插入一条amount键值为null的文档

```json
{
    "_id" : ObjectId("596c6d761109af02305797a2"),
    "name" : "t4",
    "amount" : null,
    "tags" : ["bag", "school", "book"]
}
```

具体测试如下：

```php
# 查询不存在qty字段的文档（所有文档）
db.inventory.find({qty: {$exists: false}})
# 结果为： 
"_id" : ObjectId("596c605b1109af02305795b9")
"_id" : ObjectId("596c605b1109af02305795bb")
"_id" : ObjectId("596c605b1109af02305795bd")
"_id" : ObjectId("596c6d761109af02305797a2")

# 查询amount字段存在，且值不等于16和58的文档
db.inventory.find({amount: {$exists: true, $nin: [16, 58]}})
如果该字段的值为null，$exists的值为true会返回该条文档，false则不返回。
# 结果为： 
"_id" : ObjectId("596c605b1109af02305795b9")
"_id" : ObjectId("596c605b1109af02305795bb")
"_id" : ObjectId("596c6d761109af02305797a2")

# 0条数据
db.inventory.find({amount:{$exists:false}})
# 结果为： Fetched 0 record(s) in 1ms

# 所有的数据
db.inventory.find({amount:{$exists:true}})
# 结果为： 
"_id" : ObjectId("596c605b1109af02305795b9")
"_id" : ObjectId("596c605b1109af02305795bb")
"_id" : ObjectId("596c605b1109af02305795bd")
"_id" : ObjectId("596c6d761109af02305797a2")
```

### 5.11 "$mod" - 匹配字段值对取模,值相等的文档

匹配字段值对（divisor）取模，值等于（remainder）的文档。

```css
语法:{field:{$mod:[divisor,remainder]}}
```

测试使用5.10更新的文档，具体测试如下：

```bash
# 查询集合中amount键值为4的0次模数的所有文档，例如amount值等于16的文档
db.inventory.find({amount: {$mod: [4, 0]}})
# 结果为：
Fetched 0 record(s) in 2ms

# 有些情况下(特殊情况键值为null时)，我们可以使用mod操作符替代使用求模表达式的mod操作符替代使用求模表达式的where操作符，因为后者代价昂贵。
db.inventory.find({$where: "this.amount%4==0"})
# 结果为：
"_id" : ObjectId("596c6d761109af02305797a2")
```

注意：返回结果怎么不一样。因为有一条文档的amount键值为null,javascript中null进行数值转换，会返回"0"。所以该条文档匹配where操作符求模式了表达式。当文档中字段值不存在null，就可以使用where操作符求模式了表达式。当文档中字段值不存在null，就可以使用mod替代$where的表达式.

### 5.12 "$regex" - 对字符串的执行正则匹配

操作符查询中可以对字符串的执行正则匹配。 MongoDB使用Perl兼容的正则表达式（PCRE)库来匹配正则表达式。

```bash
语法：# options（使用options（使用regex ）
i   如果设置了这个修饰符，模式中的字母会进行大小写不敏感匹配。
m   默认情况下，PCRE 认为目标字符串是由单行字符组成的(然而实际上它可能会包含多行).如果目标字符串 中没有 "\n"字符，或者模式中没有出现“行首”/“行末”字符，设置这个修饰符不产生任何影响。
s   如果设置了这个修饰符，模式中的点号元字符匹配所有字符，包含换行符。如果没有这个修饰符，点号不匹配换行符。
x   如果设置了这个修饰符，模式中的没有经过转义的或不在字符类中的空白数据字符总会被忽略，并且位于一个未转义的字符类外部的#字符和下一个换行符之间的字符也被忽略。 这个修饰符使被编译模式中可以包含注释。 注意：这仅用于数据字符。 空白字符 还是不能在模式的特殊字符序列中出现，比如序列 。
注：JavaScript只提供了i和m选项，x和s选项必须使用$regex操作符。
```

测试使用5.10更新的文档，具体测试如下：

```css
# 查询name键值以“4”结尾的文档
db.inventory.find({name: /.4/i});
db.inventory.find({name: {$regex: '.4', $options: 'i'}});
# 结果为：
"_id" : ObjectId("596c6d761109af02305797a2")
```

### 5.13 "$where" - 使用任意的JavaScript作为查询的一部分

操作符功能强大而且灵活，他可以使用任意的JavaScript作为查询的一部分,包含JavaScript表达式的字符串或者JavaScript函数。
 新建fruit集合并插入如下文档：

```bash
db.fruit.insert({"apple":1, "banana": 4, "peach" : 4})
db.fruit.insert({"apple":3, "banana": 3, "peach" : 4})
```

具体测试如下：

```kotlin
# 比较文档中的两个键的值是否相等.例如查找出banana等于peach键值的文档（4种方法）：
# JavaScrip字符串形式
db.fruit.find( { $where: "this.banana == this.peach" } )
db.fruit.find( { $where: "obj.banana == obj.peach" } )

# JavaScript函数形式
db.fruit.find( { $where: function() { return (this.banana == this.peach) } } )
db.fruit.find( { $where: function() { return obj.banana == obj.peach; } } )

# 查出文档中存在的两个键的值相同的文档，JavaScript函数会遍历集合中的文档：

>db.fruit.find({$where:function () {
        for (var current in this) {
            for (var other in this) {
                if (current != other && this[current] == this[other]) {
                return true;
                }
            }
        }
        return false;
    }});
```

注意：我们尽量避免使用"Where"査询，因为它们在速度上要比常规査询慢很多。每个文档都要从BSON转换成JavaScript对象，然后通过"Where"査询，因为它们在速度上要比常规査询慢很多。每个文档都要从BSON转换成JavaScript对象，然后通过"where"的表达式来运行;同样还不能利用索引。

## 5.14 "$slice (projection)" - 符控制查询返回的数组中元素的个数。

```css
语法：db.collection.find( { field: value }, { array: {$slice: count } } );
此操作符根据参数"{ field: value }" 指定键名和键值选择出文档集合，并且该文档集合中指定"array"键将返回从指定数量的元素。如果count的值大于数组中元素的数量，该查询返回数组中的所有元素的。
```

- 正数和负数

```css
# 选择comments的数组键值中前五个元素。
db.posts.find( {}, { comments: { $slice: 5 } } );
#选择comments的数组键值中后五个元素。
db.posts.find( {}, { comments: { $slice: -5 } } );
```

- 数组
   数组参数使用[skip , limit] 格式，其中第一个值表示在数组中跳过的项目数，第二个值表示返回的项目数。

```css
# 选择comments的数组键值中跳过前20项之后前10项元素
db.posts.find( {}, { comments: { $slice: [ 20, 10 ] } } );
#选择comments的数组键值中倒数第20项起前10项元素
db.posts.find( {}, { comments: { $slice: [ -20, 10 ] } } );
```

### 5.15 "$elemMatch(projection)"

elemMatch投影操作符将限制查询返回的数组字段的内容只包含匹配elemMatch投影操作符将限制查询返回的数组字段的内容只包含匹配elemMatch条件的数组元素。

注意：

数组中元素是内嵌文档。
 如果多个元素匹配$elemMatch条件，操作符返回数组中第一个匹配条件的元素。
 假设集合school有如下数据：

```json
{
    "_id" : ObjectId("596c711a1109af0230579899"),
    "zipcode" : 63109,
    "students" : [
                    {"name" : "john","school" : 102,"age" : 10}, 
                    {"name" : "jess","school" : 102,"age" : 11}, 
                    {"name" : "jeff","school" : 108,"age" : 15}
    ]
}
{
    "_id" : ObjectId("596c711a1109af023057989b"),
    "zipcode" : 63110,
    "students" : [ 
                    {"name" : "ajax","school" : 100,"age" : 7}, 
                    {"name" : "achilles","school" : 100,"age" : 8}
    ]
}
{
    "_id" : ObjectId("596c711a1109af023057989d"),
    "zipcode" : 63109,
    "students" : [ 
                {"name" : "ajax","school" : 100,"age" : 7}, 
                {"name" : "achilles","school" : 100,"age" : 8}
    ]
}
{
    "_id" : ObjectId("596c711a1109af023057989f"),
    "zipcode" : 63109,
    "students" : [ 
                {"name" : "barney","school" : 102,"age" : 7}
    ]
}
```

具体测试如下：

```ruby
#下面的操作将查询邮政编码键值是63109的所有文档。
# $elemMatch操作符将返回students数组中的第一个匹配条件（内嵌文档的school键且值为102）的元素。
db.school.find({zipcode: 63109}, {students: {$elemMatch: {school: 102}}});
# 结果为：
"_id" : ObjectId("596c711a1109af0230579899")
"_id" : ObjectId("596c711a1109af023057989d")
"_id" : ObjectId("596c711a1109af023057989f")

# 结果分析：
students数组包含多个元素中存在school键且值为102的元素，\$elemMatch只返回一个匹配条件的元素。students数组包含多个元素中存在school键且值为102的元素，\$elemMatch只返回一个匹配条件的元素，所以返回"_id":ObjectId("596c711a1109af0230579899")和"_id":ObjectId("596c711a1109af023057989f")
因为students数组中元素无法匹配\$elemMatch条件，所以查询结果不包含"students"字段。因为students数组中元素无法匹配$elemMatch条件，所以查询结果不包含"students"字段，所以返回"_id" : ObjectId("596c711a1109af023057989d")


#$elemMatch可以指定多个字段的限定条件，下面的操作将查询邮政编码键值是63109的所有文档。$elemMatch操作符将返回students数组中的第一个匹配条件（内嵌文档的school键且值为102且age键值大于10）的元素。
db.school.find({zipcode: 63109}, {students: {$elemMatch: {school: 102,age: {$gt: 10}}}});
# 结果为：
"_id" : ObjectId("596c711a1109af0230579899")
"_id" : ObjectId("596c711a1109af023057989d")
"_id" : ObjectId("596c711a1109af023057989f")

# 结果分析：
因为students数组中没有元素匹配的$elemMatch条件，查询结果不包含“students”字段。
```

## 参考文章

[MongoDB - 查询](https://www.jianshu.com/p/ae86996d3217)
