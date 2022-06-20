# lxml入门

## 1. 简介

lxml 是一个流行的解析库，使用Xpath语法

## 2. Xpath常用语法

XPath 使用路径表达式在 XML 文档中选取节点。节点是通过沿着路径或者 step 来选取的。

### 2.1 选取节点

下面列出了最有用的路径表达式：

| 表达式   | 描述                                                       |
| -------- | ---------------------------------------------------------- |
| nodename | 选取此节点的所有子节点。                                   |
| /        | 从根节点选取。                                             |
| //       | 从匹配选择的当前节点选择文档中的节点，而不考虑它们的位置。 |
| .        | 选取当前节点。                                             |
| ..       | 选取当前节点的父节点。                                     |
| @        | 选取属性。                                                 |

XPath 通配符可用来选取未知的 XML 元素。

| 通配符 | 描述                 |
| ------ | -------------------- |
| *      | 匹配任何元素节点。   |
| @*     | 匹配任何属性节点。   |
| node() | 匹配任何类型的节点。 |

通过在路径表达式中使用“|”运算符，可以选取若干个路径，“|”两边的表达式是互相独立的，并非是一个表达式下。

#### 2.2 **谓语**

通过以上介绍我们基本可以进行选取节点了，但是有可能选的节点有点多，那么这时候就需要用谓语了。谓语就是用来做过滤的，过滤条件均写在`[]`中。

| 路径表达式                         | 结果                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| /bookstore/book[1]                 | 选取属于 bookstore 子元素的第一个 book 元素。                |
| /bookstore/book[last()]            | 选取属于 bookstore 子元素的最后一个 book 元素。              |
| /bookstore/book[last()-1]          | 选取属于 bookstore 子元素的倒数第二个 book 元素。            |
| /bookstore/book[position()<3]      | 选取最前面的两个属于 bookstore 元素的子元素的 book 元素。    |
| //title[@lang]                     | 选取所有拥有名为 lang 的属性的 title 元素。                  |
| //title[@lang='eng']               | 选取所有 title 元素，且这些元素拥有值为 eng 的 lang 属性。   |
| /bookstore/book[price>35.00]       | 选取 bookstore 元素的所有 book 元素，且其中的 price 元素的值须大于 35.00。 |
| /bookstore/book[price>35.00]/title | 选取 bookstore 元素中的 book 元素的所有 title 元素，且其中的 price 元素的值须大于 35.00。 |




## 3. lxml用法

### 3.1 初步使用

利用他解析Html代码

```python
from lxml import etree
text = '''
<div>
    <ul>
         <li class="item-0"><a href="link1.html">first item</a></li>
         <li class="item-1"><a href="link2.html">second item</a></li>
         <li class="item-inactive"><a href="link3.html">third item</a></li>
         <li class="item-1"><a href="link4.html">fourth item</a></li>
         <li class="item-0"><a href="link5.html">fifth item</a>
     </ul>
 </div>
'''
html = etree.HTML(text)
result = etree.tostring(html)
print(result)
```

- 使用 lxml 的 etree 库
- 利用 etree.HTML 初始化
- 最后将其打印出来

里体现了 lxml 的一个非常实用的功能就是自动修正 html 代码，大家应该注意到了，最后一个 li 标签，其实我把尾标签删掉了，是不闭合的。不过，lxml 因为继承了 libxml2 的特性，具有自动修正 HTML 代码的功能。 所以输出结果是这样的

```python
<html><body>
<div>
    <ul>
         <li class="item-0"><a href="link1.html">first item</a></li>
         <li class="item-1"><a href="link2.html">second item</a></li>
         <li class="item-inactive"><a href="link3.html">third item</a></li>
         <li class="item-1"><a href="link4.html">fourth item</a></li>
         <li class="item-0"><a href="link5.html">fifth item</a></li>
</ul>
 </div>

</body></html>
```

不仅补全了 li 标签，还添加了 body，html 标签。

### 3.2 文件读取 

除了直接读取字符串，还支持从文件读取内容。比如我们新建一个文件叫做 hello.html，内容为

```python
<div>
    <ul>
         <li class="item-0"><a href="link1.html">first item</a></li>
         <li class="item-1"><a href="link2.html">second item</a></li>
         <li class="item-inactive"><a href="link3.html"><span class="bold">third item</span></a></li>
         <li class="item-1"><a href="link4.html">fourth item</a></li>
         <li class="item-0"><a href="link5.html">fifth item</a></li>
     </ul>
 </div>
```

利用 parse 方法来读取文件。

```
from lxml import etree
html = etree.parse('hello.html')
result = etree.tostring(html, pretty_print=True)
print(result)
```

同样可以得到相同的结果。

### 3.3 XPath 实例测试

依然以上一段程序为例 （1）

#### 3.3.1 获取所有的标签

```
from lxml import etree
html = etree.parse('hello.html')
print ("type(html):     "+str(type(html)))
result = html.xpath('//li')
print ("result:     "+str(result))
print ("len(result):    "+str(len(result)))
print ("type(result):   "+str(type(result)))
print ("type(result[0]):    "+str(type(result[0])))
```

运行结果

```python

type(html):     <class 'lxml.etree._ElementTree'>
result:     [<Element li at 0x56b8e80>, <Element li at 0x562d6c0>, <Element li at 0x56dab80>, <Element li at 0x56dabc0>, <Element li at 0x56dac00>]
len(result):    5
type(result):   <class 'list'>
type(result[0]):    <class 'lxml.etree._Element'>
```

可见，etree.parse 的类型是 ElementTree，通过调用 xpath 以后，得到了一个列表，包含了 5 个元素，每个元素都是 Element 类型 

#### 3.3.2 获取标签所有的class

```
result = html.xpath('//li/@class')
print(result )
```

运行结果

```
['item-0', 'item-1', 'item-inactive', 'item-1', 'item-0']
```

#### 3.3.3 获取标签下href 为link1.html 的 标签

```
result = html.xpath('//li/a[@href="link1.html"]')
print(result )
```

运行结果

```
[<Element a at 0x5587b00>]
```

#### 3.3.4 获取标签下的所有 标签

**错误写法**

```
result = html.xpath('//li/span')
```

因为 / 是用来获取子元素的，这样获取得为空数组。所以要用双斜杠

```
result = html.xpath('//li//span')
print(result )
```

运行结果

```
[<Element span at 0x5636d80>]
```

#### 3.3.5 获取最后一个href

```
result = html.xpath('//li[last()]/a/@href')print result
```

运行结果：

```
['link5.html']
```

#### 3.3.6 获取倒数第二个元素的内容

```
result = html.xpath('//li[last()-1]/a')
print result[0].text

```

运行结果

```
fourth item

```

#### 3.3.7 获取 class 为 bold 的标签名

```
result = html.xpath('//*[@class="bold"]')
print result[0].tag
```

运行结果

```
span
```

## 参考文章

[Python 爬虫利器三之 Xpath 语法与 lxml 库的用法](https://cuiqingcai.com/2621.html)

[lxml 学习笔记](https://www.jianshu.com/p/e084c2b2b66d)