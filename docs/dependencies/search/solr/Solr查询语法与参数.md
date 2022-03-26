# Solr查询语法与参数

## 1. Solr 查询界面

![image-20210304140431497](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210304140431497.png)

## 2. 基本查询

| 名称               | 作用                                                         | 示例                                                         |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| q                  | 查询的关键字（最为重要）                                     | `q=id:1`,默认为`q=*:*`                                       |
| fl                 | 指定返回哪些字段，用逗号或空格分隔，注意：字段区分大小写。<br />**如果想知道具体的评分需要手动加上score** | fl=id,title,sort                                             |
| start              | 返回结果的第几条记录开始，一般分页用，默认0开始              |                                                              |
| rows               | 指定返回结果最多有多少条记录，默认值为10，配合start实现分页  |                                                              |
| sort               | 排序方式，例如id desc 表示按照id降序，多个字段： score desc，price asc |                                                              |
| wt                 | （writer type）指定输出格式，有xml，json等                   |                                                              |
| fq（filter query） | 过滤查询，提供一个可选的筛选器查询。返回在q查询符合结果中同时符合的fq条件的查询结果 | q=id:1&fq=sort:[1 TO 5]，找关键字id为1 的，并且sort是1到5之间的。 |
| df                 | 默认的查询字段，一般默认指定（不太知道作用）                 |                                                              |
| qt（query type）   | 指定哪个类型来处理查询请求，一般不用指定，默认是standard。（存疑） |                                                              |
| indent             | 返回的结果是否缩进，默认关闭。 用indent=true\|on 开启，一般调试json,php,phps,ruby输出才有必要用这个参数。 |                                                              |
| version            | 查询语法的版本，建议不使用它，由服务器指定默认值             |                                                              |

## 3. Solr 的检索运算符

| 运算符            | 作用                                                         |
| ----------------- | ------------------------------------------------------------ |
| ：                | 指定字段查指定值，如返回所有值`*：*`                         |
| ?                 | 表示单个任意字符的通配                                       |
| *                 | 表示多个任意字符的通配（不能再搜索项开始使用* 或者？符号）   |
| ~                 | 表示模糊检索，如检索拼写类似于”roam”的项这样写：roam~将找到形如foam和roams的单词；roam~0.8，检索返回相似度在0.8以上的记录。 |
| AND、\|\|、OR、&& | 布尔操作符                                                   |
| NOT、!、-         | 排除操作符不能单独与项使用构成查询                           |
| +                 | 存在操作符，要求符号“+”后的项必须在文档相应的域中存在        |
| （）              | 用于构成子查询                                               |
| []                | 包含范围检索、如检索某时间段记录，包含头尾，date:[201507 TO 201510] |
| {}                | 不包含范围检索，如检索某时间段记录，不包含头尾date:{201507 TO 201510} |

## 4. 高亮

| 字段                    | 含义                                                         |
| ----------------------- | ------------------------------------------------------------ |
| hl                      | 是否高亮，hl=true,表示采用高亮                               |
| hl.fl                   | 设定高亮显示的字段，用空格或逗号隔开的字段列表。要启用某个字段的highlight功能，就得保证该字段在schema中是stored。如果该参数未被给出，那么就会高亮默认字段 standard handler会用df参数，dismax字段用qf参数。你可以使用星号去方便的高亮所有字段。如果你使用了通配符，那么要考虑启用hl.requiredFieldMatch选项。 |
| hl.requireFieldMatch    | 如果置为true，除非用hl.fl 指定了该字段，查询结果才会被高亮。他的默认值是false |
| hl.usePhraseHighlighter | 如果一个查询中含有短语（引号框起来的）那么会保证一定要完全匹配短语的才会被高亮。 |
| hl.highlightMultiTerm   | 如果使用通配符和模糊搜索，那么会确保与通配符匹配的term会高亮。默认为false，同时hl.usePhraseHighlighter要为true。 |
| hl.fragsize             | 返回的最大字符数。默认是100.如果为0，那么该字段不会被fragmented且整个字段的值会被返回。 |

## 5. 分组

[facet的官方wiki](http://wiki.apache.org/solr/SimpleFacetParameters#Facet_Fields_and_Facet_Queries)

Facet是Solr的核心搜索功能，主要是导航(Guided Navigation)、参数化查询(Paramatic Search)。Facet的主要好处是在搜索的同时，可以按照Facet条件进行分组统计，给出导航信息，改善搜索体验。

Facet主要分为：Field Facet 和 Date Facet 两大类

### 5.1 field Facet

| 字段           | 含义                                                      |
| -------------- | --------------------------------------------------------- |
| facet          | facet参数字段必须被索引，facet=on 或 facet=true           |
| facet.field    | 分组的字段                                                |
| facet.prefix   | 表示Facet字段前缀                                         |
| facet.limit    | Facet字段返回条数                                         |
| facet.offict   | 开始条数,偏移量,它与facet.limit配合使用可以达到分页的效果 |
| facet.mincount | Facet字段最小count,默认为0                                |
| facet.missing  | 如果为on或true,那么将统计那些Facet字段值为null的记录      |
| facet.sort     | 表示 Facet 字段值以哪种顺序返回 .格式为 true(count)       |

### 5.2 Date Facet

对日期类型的字段进行 Facet. Solr 为日期字段提供了更为方便的查询统计方式 .注意 , Date Facet的字段类型必须是 DateField( 或其子类型 ). 需要注意的是 , 使用 Date Facet 时 , 字段名 , 起始时间 , 结束时间 , 时间间隔这 4 个参数都必须提供 .

| facet.date         | 该参数表示需要进行 Date Facet 的字段名 , 与 facet.field 一样 , 该参数可以被设置多次 , 表示对多个字段进行 Date Facet. |
| ------------------ | ------------------------------------------------------------ |
| facet.date.start   | 起始时间 , 时间的一般格式为 ” 2015-12-31T23:59:59Z”, 另外可以使用 ”NOW”,”YEAR”,”MONTH” 等等 , |
| facet.date.end     | 结束时间                                                     |
| facet.date.gap     | 时间间隔,如果 start 为 2015-1-1,end 为 2016-1-1，gap 设置为 ”+1MONTH” 表示间隔1 个月 , 那么将会把这段时间划分为 12 个间隔段 . |
| facet.date.hardend | 表示 gap 迭代到 end 时，还剩余的一部分时间段，是否继续去下一个间隔. 取值可以为 true |

注意：Facet的字段必须被索引，无需分词，无需存储。无需分词是因为该字段的值代表了一个整体概念，无需存储是因为一般而言用户所关心的并不是该字段的具体值，而是作为对查询结果进行分组的一种手段，给出相关的分组信息，从而改善搜索体验。

## 参考文章

[Solr 查询语法/参数](https://www.cnblogs.com/shaosks/p/8042867.html)
