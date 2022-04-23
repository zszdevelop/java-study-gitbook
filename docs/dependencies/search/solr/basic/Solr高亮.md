# Solr高亮

## 1. 简介

大多数的搜索应用都存在类似的情况，那就是搜索结果显示的屏幕空间有限。

- 如果文档很短并可以在结果列表中显示全部内容，对屏幕空间显示就不会构成太大的问题。
- 但大多数情况下都只能显示每个结果文档的一小部分。

这就提出了一个问题：如何决定结果文档中显示哪一部分？理想情况下，**应该是基于各片段与用户查询的匹配程度来决定**。为查询结果选择最佳片段进行显示，这是Solr高亮框架提供的核心功能。

## 2.  高亮所处流程

### 2.1 查询全流程中的高亮

![image-20220418164457501](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220418164457501.png)

### 2.2 高亮组件的内部流程

![image-20220418164555628](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220418164555628.png)

## 3. 四种高亮实现

### 3.1 **Unified Highlighter ：**

这是最灵活和最具选择性的选项,它支持最常见的突出显示参数，并且可以准确地处理任何查询，甚至是SpanQueries（例如从环绕解析器中可以看到）。 这种方式的的强大优势在于，

　　　　您可以选择配置Solr以将更多信息放入底层索引中，以加速突出显示大型文档; 即使在每个字段的基础上，也支持多种配置。 其他方式几乎没有这种灵活性　

### 3.2 **Original Highlighter（最常用）：**

这个Original Highlighter是高亮的一个典型.它拥有三个高亮的最复杂的和最细粒度的查询表示法.比如,高亮能够提供精确的匹配,甚至用于如surround这样的查询解析器。

　　　　它不要求任何的特殊的数据结果如termVectors.对于一个宽泛种类的搜索情况,这是一个很好的选择.

### 3.3 **FastVector Highlighter**：

FastVector Highlighter要求字段的term vector选项(termVectors,termPositions,termOffsets).并考虑到是最优化的,对于多语言环境它往往比standard highlighter会更好的工作。

　　　　因为它支持Unicode breakiterators(分解迭代).另一方面,它的查询表示没有standard highlighter那么高级.例如,它将不会很好的工作于surround解析器.它经常使用于大文档和多种类语言的高亮文本.

### 3.4 Postings Highlighter**:

Postings Highlighter要求存储storeOffsetsWithPositions(位置偏移量),需要在字段中配置.这是一个比vectors更简单有效的结果,但是不适合于大数量的查询terms。

　　　　像FastVector Highlighter,它支持Unicode算法来分割文档.另一方面,它有很粗略的查询表示:它注重于摘要的质量,完全忽略查询的结构,仅仅基于查询term和统计排序.

## 4. Original Highlighter

### 4.1 参数

| 参数                           | 默认                   | 含义                                                         |
| ------------------------------ | ---------------------- | ------------------------------------------------------------ |
| hl :                           | 默认为空白(不高亮).    | 为true时,开启高亮功能,为false或者空白或者缺少时,关闭高亮功能. |
| hl.fl:。                       | 默认空白，             | 指定高亮字段列表.多个字段之间以逗号或空格分开.如果为空白,对于StandardRequestHandler,高亮默认搜索字段(或者指定的df参数).对于DisMaxRequestHandler,qf作为默认的 　　　　　　"*"可以用于匹配全局,如"text_*"或者"*",当使用"*"时,hl.requireFieldMatch=true必填. |
| hl.snippets :                  | 默认为1.               | 指定每个字段生成的高亮字段的最大数量.                        |
| hl.fragsize :                  | 默认是100.             | 每个snippet返回的最大字符数。如果为0，那么该字段不会被fragmented且整个字段的值会被返回。 |
| hl.mergeContiguous :           | 默认为false.           | 知识solr将邻近相连的片段合并为一个单独的片段.true表示合并.默认值为false,为向后兼容设置. |
| **hl.requireFieldMatch:**      | 默认为fasle.           | 如果置为true，除非该字段的查询结果不为空才会被高亮。它的默认值是false，意味 着它可能匹配某个字段却高亮一个不同的字段。如果hl.fl使用了通配符，那么就要启用该参数。 尽管如此，如果你的查询是all字段（可能是使用 copy-field 指令），那么还是把它设为false，这样搜索结果能表明哪个字段的查询文本未被找到 |
| hl.maxAnalyzedChars:           | 默认51200.             | 会搜索高亮的最大字符，默认值为51200，如果你想禁用，设为-1    |
| hl.maxMultiValuedToExamine:    | 默认integer.MAX_VALUE. | 在停止之前,指定检查的多值字段的最大条木数.在任何匹配没有找到之前,如果达到限制,可能会返回0个结果. |
| hl.maxMultiValuedToMatch:      | 默认integer.MAX_VALUE. | 在停止之前,指定在多值字段中找到的最大匹配数.如果hl.maxMultiValuedToExamine也已经定义了,首先达到的限制将决定何时停止查找。 |
| hl.alternateField:             | 默认blank.             | 如果没有生成snippet（没有terms 匹配），那么使用另一个字段值作为返回。 |
| hl.maxAlternateFieldLength :   | 默认 unlimited.        | 如果hl.alternateField启用，则有时需要制定alternateField的最大字符长度，默认0是即没有限制。所以合理的值是应该为 　hl.snippets * hl.fragsize这样返回结果的大小就能保持一致。 |
| hl.formatter :                 | 默认 simple.           | 一个提供可替换的formatting算法的扩展点。默认值是simple，这是目前仅有的选项。显然这不够用，你可 以看看org.apache.solr.highlight.HtmlFormatter.java 和 　solrconfig.xml中highlighting元素是如何配置的。 注意在不论原文中被高亮了什么值的情况下，如预先已存在的em tags，也不会被转义，所以在有时会导致假的高亮。 |
| hl.simple.pre hl.simple.post : | 默认<em> and </em> ．  |                                                              |
| hl.fragmenter :                | 默认gap．              | 这个是solr制定fragment算法的扩展点。gap是默认值。regex是另一种选项，这种选项指明 highlight的边界由一个正则表达式确 定。这是一种非典型 的高级选项。 为了知道默认设置和fragmenters (and formatters)是如何配置的，可以看看solrconfig.xml中的highlight段。 |
| hl.usePhraseHighlighter :      | 默认true．             | 如果一个查询中含有短语（引号框起来的）那么会保证一定要完全匹配短语的才会被高亮 |
| hl.highlightMultiTerm : 。     | 默认true.              | 如果设置为true,solr将会高亮出现在多terms查询中的短语         |
| hl.regex.slop:                 | 默认0.6.               | 在使用hl.fragmenter=regex时,意思是如果hl.fragsize=100那么fragment的大小会从40-160. |
| hl.regex.pattern:              | 默认空白.              | 为fragmenting指定正则表达式.这个可以用作提取句子。           |
| hl.regex.maxAnalyzedChars:     | 默认10000.             | 搜索高亮的最大字符,对一个大字段使用一个复杂的正则表达式是非常昂贵的。 |
| hl.preserveMulti :             | 默认false.             | 如果为true,多值字段将会按照它们在索引中顺序返回所有的值.如果false,只有匹配高亮请求的值返回。 |

## 参考文章

[Solr搜索结果高亮及高级设置 ](https://www.cnblogs.com/yszd/p/12867697.html)