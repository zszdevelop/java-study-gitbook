# aspose.word动态修改字体等

## 1. 简介

我们需求中可能需要对doc文档中某个字符，根据字符长度动态设置字体大小等操作。如何定位到该字体和设置呢？

## 2. 代码示例

```java
Document doc = new Document(templateFilePath);
// 构建出builder
DocumentBuilder builder = new DocumentBuilder(doc);

// 移动到需要设置的字段
builder.moveToMergeField(fieldName);

// 修改字体大小
builder.getFont().setSize(fontSize);

// 添加删除线
builder.getFont().setStrikeThrough(true);
// 写入字段值（非常重要，否则展示为空）
builder.write(fieldValue);
```

## 3. 相关业务细节点

### 3.1 字符长度计算

我们公司的word 会比较严谨一点。例如某个文本框只能输入5个中文字。但是如果输入的是英文就不止5个，所以需要动态计算。所以需要我们动态计算缩放的大小

用到技巧就是无论中文英文都用gb2312 编码来计算

>## 终端下中文字符（宽字符）的对齐输出问题
>
>比如我在终端下输出表格，里面包含了中英文，因为中英文的长度不一致，`len()`获取的宽度是编码字节的长度，不是实际长度：
>
>```python
>>>> len(u'我'.encode('utf-8'))
>3
>>>> len(u'我'.encode('gbk'))
>2
>```
>
>这里**「我」如果是 utf-8 编码，则占 3 个字节长度，而在 gbk 下则是 2 个字节长度**。所以通过`len()`来固定长度显然不合适，造成无法对齐的情况。

```java
 /**
     * 处理字符串的大小与长度
     * @param item 值对象
     * @param setLenth 规定长度，大于0
     * @param appendSpace 长度不够是否加空格
     * @param charSpace 空格(全角或半角)
     * @return
     */
   public static double GetFontSizeZoom(FdAsposeFieldAttr item, int setLenth, boolean appendSpace, String charSpace){
       if (item.getFieldName().equals("报案人姓名")){
           String s = item.getFieldName();
       }
       double standar = 1;
       if (setLenth > 0)
       {
           String fieldValue = item.getFieldValue();
           long mylenth = 0;
           try {
               byte[] gb2312s = fieldValue.getBytes("gb2312");
               mylenth = gb2312s.length/2;
           } catch (UnsupportedEncodingException e) {
               e.printStackTrace();
           }

           if (mylenth > setLenth)
           {
               double level = 1.0 * mylenth / setLenth;
               standar = level;
           }
           if (appendSpace && mylenth < setLenth)
           {
               if (fieldValue == null)
               {
                   String value = StringUtils.rightPad("", setLenth, charSpace);
                   item.setFieldValue(value);
               }
               else
               {
                   String value = StringUtils.rightPad(fieldValue, setLenth, charSpace);
                   item.setFieldValue(value);
               }
           }
       }
       return standar;
   }
```



## 参考文章

[**Python 终端下中文字符对齐处理和编码续**](https://blog.tankywoo.com/2017/01/21/python-cli-chinese-align-and-encoding-continue.html)
