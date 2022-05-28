# 使用zxing生成二维码乱码问题

直接上代码

```java
 QRCodeWriter writer = new QRCodeWriter();
 
        // 解决中文乱码问题
        String contentCharset = new String(content.getBytes("UTF-8"), "ISO-8859-1");
        BitMatrix matrix = writer.encode(contentCharset, format, width, height);
```

## 参考文章

[生成可防止中文乱码的二维码（zxing-android-embeded）](https://www.jianshu.com/p/532832542d91)