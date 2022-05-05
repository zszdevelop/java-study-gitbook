# Word的XML格式解析

## 1. 简介

Office2003以上，Word可以以 XML 文本格式存储，这样就可以使用外部程序创建Word文件，而不需要使用Word的对象。

常见的应用场景就是：

- 程序需要生成word，我们通过动态替换xml中的内容实现动态生成word

## 2. 最简单的word

### 2.1 方式一：word导出xml格式

![image-20220428103850569](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428103850569.png)

![image-20220428104427628](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428104427628.png)

我们可以看到一个最简单的word导出xml格式的时候，也是包含了200多行的代码，其中包含了各种字体样式等标识。如果不熟悉word xml 其实很难去解析内容，要实现负责点的动态渲染是很困难的。

### 2.2 方式一：xml格式用word打开

用记事本创建一个文件，将上面的XML内容粘贴，并保存为mytest.xml，在Office Word中打开它

```xml
<?xml version="1.0"?>
<w:wordDocument xmlns:w="http://schemas.microsoft.com/office/word/2003/wordml">
<w:body>
<w:p>
<w:r>
<w:t>测试</w:t>
</w:r>
</w:p>
</w:body>
< /w:wordDocument>
```

![image-20220428105113178](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428105113178.png)

两种方案都能正常显示测试两个字。

但我们拆分后xml 格式就清爽多了。

## 3. xml 常用结构

- 整体结构：body、styles、setting等
- 段落Paragraph结点：<w:p>
- 基本格式单位Run结点：<w:r>
- 格式Properties结点：<w:pPr>与<w:rPr>
  - 字体<w:rFonts>
  - 字号<w:sz>、<w:szCs>
- 看的见的文字Text：<w:t>
- 修订版本号rsid
- 注音系统Ruby：<w:ruby>
  

## 4 xml 语法解析

### 4.1 XML的声明和名称空间的指明：

```xml
<?xml version="1.0"?>
<w:wordDocument xmlns:w="http://schemas.microsoft.com/office/word/2003/wordml">
```

### 3.2 文档内容

```
<w:body>…</w:body>
```

### 3.3 基本节点类型

从body内可以看出，构成实际文本内容的有3种类型节点：

- <w:p> 表示一个段落

- <w:r> 表示一个样式串，指明它包括的文本的显示样式

- <w:t> 表示真正的文本内容

如果我们需要指明一个文本为粗体，需要怎么办呢？

```xml
<w:r>
<w:rPr> 
<w:b w:val="on"/>
</w:rPr> 
<w:t> 2.0C</w:t>
< /w:r>
```

<w:b w:val=”on”> 表示该格式串种的文本为粗体。

这样，我们就知道<w:r>表示一个特定的文本格式，稍微复杂点的格式：

```xml
<w:r>
< w:rPr> 
< w:b w:val="on"/>
< w:sz w:val="40"/><w:szCs w:val="40"/>
< w:rFonts w:ascii="Arial" w:eastAsia="Arial" w:hAnsi="Arial" />
< /w:rPr> 
< w:t xml:space="preserve">2.0C</w:t>
< /w:r>
```

字体为粗体，尺寸为是40除2等于20相当于几号字体？，字体名称“Arial”

<w:t xml:space="preserve"> 2.0C</w:t>

中的xml:space="preserve"从字面上理解是保持空格。

如果没有这内容的话文本的前后空格将会被Word忽略。

这就要设置<w:p>的属性了。类似于这样：

```xml
<w:p>
< w:pPr>
< w:jc w:val="right"/>
< w:spacing w:line="600" w:lineRule="auto"/>
< /w:pPr>

…

</w:p>
```

对齐方向：<w:jc w:val=”right”/> 这儿是右对齐。

行距:<w:spacing w:line=”600” w:lineRule="auto"/> 600是用行距的倍数乘240得出，如果是两倍行距，则是480。这儿应该是2.5倍行距。

由此可见，组装一个WordXML格式的文件是一件比较简单的事情。

将段属性包含在<w:pPr></w:pPr>中

将文本格式包含在<w:rPr></w:rPr>中

这儿的Pr是property的意思，表示这个块中是r(run)或p(paragraph)的格式设置。

### 3.4 页面设置

下面内容设置了页的宽，高，和页的各边距。各项的值均是英寸乘1440得出：

```
<w:body>…
<w:sectPr>
<w:pgSz w:w="12240" w:h="15840"/>
<w:pgMar w:top="1440" w:right="1800" w:bottom="1440" w:left="1800" w:header="720" w:footer="720" w:gutter="0"/>
< /w:sectPr>

</w:body>
```

下面内容设置了页的页眉页脚：

```
w:sectPr wsp:rsidR="002C452C">
<w:hdr w:type="odd" >
<w:p>
<w:pPr>
<w:pStyle w:val="Header"/>
</w:pPr>
<w:r>
<w:t>My Header</w:t>
</w:r>
</w:p>
</w:hdr>
<w:ftr w:type="odd">
<w:p>
<w:pPr>
<w:pStyle w:val="Footer"/>
</w:pPr>
<w:r>
<w:t>My Footer</w:t>
</w:r>
</w:p>
</w:ftr>

</w:sectPr>
< /w:body>
```

### 3.5 文档设置

```xml
</w:body>
<w:docPr>
<w:view w:val="print"/><w:zoom w:percent="100"/>
< /w:docPr>
</w:wordDocument>

```

docPr，就是document property的意思了。

表示文档的视图是“print”，视图比例100%

## 4. 完整的XML文件实例

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
< ?mso-application progid="Word.Document"?>
< w:wordDocument xmlns:aml="http://schemas.microsoft.com/aml/2001/core"
xmlns:dt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882"
xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:w10="urn:schemas-microsoft-com:office:word"
xmlns:w="http://schemas.microsoft.com/office/word/2003/wordml"
xmlns:wx="http://schemas.microsoft.com/office/word/2003/auxHint"
xmlns:wsp="http://schemas.microsoft.com/office/word/2003/wordml/sp2"
xmlns:sl="http://schemas.microsoft.com/schemaLibrary/2003/core"
w:macrosPresent="no" w:embeddedObjPresent="no" w:ocxPresent="no"
xml:space="preserve">

<w:body>
< w:p>
< w:pPr>
< w:jc w:val="left"/>
< w:spacing w:line="240" w:lineRule="auto"/>
< /w:pPr>
< w:r>
< w:rPr> 
< w:sz w:val="24"/><w:szCs w:val="24"/>
< w:rFonts w:ascii="Arial" w:eastAsia="Arial" w:hAnsi="Arial" />
< /w:rPr> 
< w:t>Niu don't like Red or Blue! It seems that </w:t>
< /w:r>
< w:r>
< w:rPr> 
< w:sz w:val="48"/><w:szCs w:val="48"/>
< w:rFonts w:ascii="Arial" w:eastAsia="Arial" w:hAnsi="Arial" />
< /w:rPr> 
< w:t>Hello world!</w:t>
< /w:r>
< /w:p>
< w:p>

<w:sectPr wsp:rsidR="002C452C">
< w:pgSz w:w="12240" w:h="15840"/>
< w:pgMar w:top="1526.4" w:right="3254.4" w:bottom="2966.4" w:left="1670.4" w:header="720" w:footer="720" w:gutter="0"/>
< w:hdr w:type="odd" >
< w:p>
< w:pPr>
< w:pStyle w:val="Header"/>
< /w:pPr>
< w:r>
< w:t>Header</w:t>
< /w:r>
< /w:p>
< /w:hdr>
< w:ftr w:type="odd">
< w:p>
< w:pPr>
< w:pStyle w:val="Footer"/>
< /w:pPr>
< w:r>
< w:t>Footer</w:t>
< /w:r>
< /w:p>
< /w:ftr>
< /w:sectPr>
< /w:body>

<w:docPr>
< w:view w:val="print"/><w:zoom w:percent="100"/>
< /w:docPr>
< /w:wordDocument>
```

## 参考文章

[WordXML格式解析](https://blog.csdn.net/lmhuanying1012/article/details/78764041)

[Word文件的OpenXML解析（以Python3为例）](https://blog.csdn.net/liuqixuan1994/article/details/104486600)