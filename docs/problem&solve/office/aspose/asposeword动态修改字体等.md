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

