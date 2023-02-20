# Aspose.Word插入复选框

## 1. 背景

word 中难免有复选框的功能，我们动态插入文字时，他只是一个文本，并没有选中切换的功能。

## 2. 解决思路

我们来看看 word 中我们是如何插入复选框的

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622104329590.png" alt="image-20220622104329590" />

我们查看详情

![image-20220622104534970](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622104534970.png)

我们可以看到

- 字体为：Wingdings 2
- 字符代码为：0052

那么我们插入特定的格式的字体，对应的代码是不是就能解决了

## 3. 解决

```java
 boolean isMoveSuccess = builder.moveToMergeField(fieldName);
 builder.getFont().setSize(16);           
 if (Objects.equals(fieldValue,"☑") ){
        builder.write("\u0052");
 }else if (Objects.equals(fieldValue,"☐") ){
       builder.write("\u00A3");
 }
```

这样我们就正常渲染出了复选框

![image-20220622104905805](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622104905805.png)