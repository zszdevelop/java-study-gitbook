# EasyExcel自定义导出

## 1. 简介

我们在使用EasyExcel 时，大部分是需要提前定义好对象的，我们根据对象中的字段决定要渲染的excel。但我们某些业务场景，需要根据数据库中查到的字段动态渲染excel, 这时候改怎么处理呢？

## 2. 解决方案

现实场景可以非常灵活，这里只是举例

### 2.1 步骤1：动态渲染请求头

```java
private List<List<String>> head() {
    List<List<String>> list = new ArrayList<List<String>>();
    List<String> head0 = new ArrayList<String>();
    head0.add("字符串" + System.currentTimeMillis());
    List<String> head1 = new ArrayList<String>();
    head1.add("数字" + System.currentTimeMillis());
    List<String> head2 = new ArrayList<String>();
    head2.add("日期" + System.currentTimeMillis());
    list.add(head0);
    list.add(head1);
    list.add(head2);
    return list;
}
```

### 2.2 步骤2：动态渲染数据

```java
private List<DemoData> data() {
    List<DemoData> list = new ArrayList<DemoData>();
    for (int i = 0; i < 10; i++) {
        DemoData data = new DemoData();
        data.setString("字符串" + i);
        data.setDate(new Date());
        data.setDoubleData(0.56);
        list.add(data);
    }
    return list;
}
```

### 2.3 渲染

```java
@Test
public void dynamicHeadWrite() {
    String fileName = TestFileUtil.getPath() + "dynamicHeadWrite" + System.currentTimeMillis() + ".xlsx";
    EasyExcel.write(fileName)
        // 这里放入动态头
        .head(head()).sheet("模板")
        // 当然这里数据也可以用 List<List<String>> 去传入
        .doWrite(data());
}
```