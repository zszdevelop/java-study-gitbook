---
order: 2010
category:
  - Java
---

# Python爬虫 - XPath详解

## 1. 概述

XPath，全称 XML Path Language，即 XML 路径语言，它是一门在XML文档中查找信息的语言。XPath 最初设计是用来搜寻XML文档的，但是它同样适用于 HTML 文档的搜索。

所以在做爬虫时，我们完全可以使用 XPath 来做相应的信息抽取，本节我们来介绍一下 XPath 的基本用法。

>XPath 的选择功能十分强大，它提供了非常简洁明了的路径选择表达式，另外它还提供了超过 100 个内建函数用于字符串、数值、时间的匹配以及节点、序列的处理等等，几乎所有我们想要定位的节点都可以用XPath来选择。
>
>XPath 于 1999 年 11 月 16 日 成为 W3C 标准，它被设计为供 XSLT、XPointer 以及其他 XML 解析软件使用，更多的文档可以访问其官方网站：[https://www.w3.org/TR/xpath/](https://link.zhihu.com/?target=https%3A//www.w3.org/TR/xpath/)。

## 2. XPath常用规则

我们现用表格列举一下几个常用规则：

表达式描述

- nodename选取此节点的所有子节点
- /从当前节点选取直接子节点
- //从当前节点选取子孙节点
- .选取当前节点
- ..选取当前节点的父节点
- @选取属性

>在这里列出了XPath的常用匹配规则，例如 / 代表选取直接子节点，// 代表选择所有子孙节点，. 代表选取当前节点，.. 代表选取当前节点的父节点，@ 则是加了属性的限定，选取匹配属性的特定节点。

例如：

```text
//title[@lang=’eng’]
```

这就是一个 XPath 规则，它就代表选择所有名称为 title，同时属性 lang 的值为 eng 的节点。

在后文我们会介绍 XPath 的详细用法，通过 Python 的 LXML 库利用 XPath 进行 HTML 的解析。

## 3. 准备工作

在使用之前我们首先要确保安装好了 LXML 库

## 4. 实例引入

我们现用一个实例来感受一下使用 XPath 来对网页进行解析的过程，代码如下：

```python
from lxml import etree
text = '''
<div>
    <ul>
         <li class="item-0"><a href="https://ask.hellobi.com/link1.html">first item</a></li>
         <li class="item-1"><a href="https://ask.hellobi.com/link2.html">second item</a></li>
         <li class="item-inactive"><a href="https://ask.hellobi.com/link3.html">third item</a></li>
         <li class="item-1"><a href="https://ask.hellobi.com/link4.html">fourth item</a></li>
         <li class="item-0"><a href="https://ask.hellobi.com/link5.html">fifth item</a>
     </ul>
 </div>
'''
html = etree.HTML(text)
result = etree.tostring(html)
print(result.decode('utf-8'))
```

在这里我们首先导入了 LXML 库的 etree 模块，然后声明了一段 HTML 文本，调用 HTML 类进行初始化，这样我们就成功构造了一个 XPath 解析对象，在这里注意到 HTML 文本中的最后一个 li 节点是没有闭合的，但是 etree 模块可以对 HTML 文本进行自动修正。

在这里我们调用 tostring() 方法即可输出修正后的 HTML 代码，但是结果是 bytes 类型，在这里我们利用 decode() 方法转成 str 类型，结果如下：

```html
<html><body><div>
    <ul>
         <li class="item-0"><a href="link1.html">first item</a></li>
         <li class="item-1"><a href="link2.html">second item</a></li>
         <li class="item-inactive"><a href="link3.html">third item</a></li>
         <li class="item-1"><a href="link4.html">fourth item</a></li>
         <li class="item-0"><a href="link5.html">fifth item</a>
     </li></ul>
 </div>
</body></html>
```

我们可以看到经过处理之后 li 节点标签被补全，并且还自动添加了 body、html 节点。

另外我们也可以直接读取文本文件进行解析，示例如下：

```python
from lxml import etree

html = etree.parse('./test.html', etree.HTMLParser())
result = etree.tostring(html)
print(result.decode('utf-8'))
```

其中 test.html 的内容就是上面例子中的 HTML 代码，内容如下：

```html
<div>
    <ul>
         <li class="item-0"><a href="link1.html">first item</a></li>
         <li class="item-1"><a href="link2.html">second item</a></li>
         <li class="item-inactive"><a href="link3.html">third item</a></li>
         <li class="item-1"><a href="link4.html">fourth item</a></li>
         <li class="item-0"><a href="link5.html">fifth item</a>
     </ul>
 </div>
```

这次的输出结果略有不同，多了一个 DOCTYPE 的声明，不过对解析无任何影响，结果如下：

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><div>
    <ul>
         <li class="item-0"><a href="link1.html">first item</a></li>
         <li class="item-1"><a href="link2.html">second item</a></li>
         <li class="item-inactive"><a href="link3.html">third item</a></li>
         <li class="item-1"><a href="link4.html">fourth item</a></li>
         <li class="item-0"><a href="link5.html">fifth item</a>
     </li></ul>
 </div></body></html>
```