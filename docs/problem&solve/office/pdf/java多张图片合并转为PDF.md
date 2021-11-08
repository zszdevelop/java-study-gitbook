# java多张图片合并转为PDF

## 1. 背景

项目需要将多张图片合并成PDF。网上的方案都有些问题，例如

- 合成pdf后只剩下最后一张图片。
- pdf尺寸问题

## 2. 集成使用

### 2.1 pom依赖

```xml
<dependency>
   <groupId>com.itextpdf</groupId>
   <artifactId>itextpdf</artifactId>
   <version>5.5.7</version>
</dependency>
```

### 2.2 Image2PdfUtil 实现

```java

/**
 * 将多张图片合并转为PDF；需要用到iTextpdf包，
 *
 */
public class Image2PdfUtil {
    /**
     * @param imageFolderPath 图片文件夹地址
     * @param pdfPath         PDF文件保存地址
     */
    public static void toPdf(String imageFolderPath, String pdfPath) {
        try {
            // 图片文件夹地址
            // String imageFolderPath = "D:/Demo/ceshi/";
            // 图片地址
            String imagePath = null;
            // PDF文件保存地址
            // String pdfPath = "D:/Demo/ceshi/hebing.pdf";
            // 输入流
            FileOutputStream fos = new FileOutputStream(pdfPath);
            // 创建文档
            Document doc = new Document(PageSize.A4, 0, 0, 0, 0);
            doc.open();
            // 写入PDF文档
            PdfWriter.getInstance(doc, fos);
            // 读取图片流
            BufferedImage img = null;
            // 实例化图片
            Image image = null;
            // 获取图片文件夹对象
            List files = Arrays.asList(new File(imageFolderPath).listFiles());
            // 循环获取图片文件夹内的图片
            for (Object item : files) {
                File file1 = (File) item;
                if (file1.getName().endsWith(".png")
                        || file1.getName().endsWith(".jpg")
                        || file1.getName().endsWith(".gif")
                        || file1.getName().endsWith(".jpeg")
                        || file1.getName().endsWith(".tif")) {
                    // System.out.println(file1.getName());
                    imagePath = imageFolderPath + file1.getName();
                    System.out.println(file1.getName());
                    // 读取图片流
                    File imgFile = new File(imagePath);
                    img = ImageIO.read(imgFile);
                    // 根据图片大小设置文档大小
                    int sourceWidth = img.getWidth();
                    // 实例化图片
                    image = Image.getInstance(imagePath);
                    // 图片缩放，以免过大
                    if (sourceWidth > 595) {
                        float scale = 595f / sourceWidth * 100;
                        image.scalePercent(scale);
                    }
//                    // 添加图片到文档
//                    doc.open();
                    doc.add(image);
                }
            }
            // 关闭文档
            doc.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (BadElementException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        long time1 = System.currentTimeMillis();
        toPdf("/Users/zsz/Downloads/test/", "/Users/zsz/Downloads/hebing.pdf");
        long time2 = System.currentTimeMillis();
        int time = (int) ((time2 - time1) / 1000);
        System.out.println("执行了：" + time + "秒！");
    }

}

```

## 3. 遇到的坑

原文章代码

![image-20211028143725795](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211028143725795.png)

### 3.1 pdf并不是A4大小而是实际图片大小

我们创建文档的时候设置了A4大小

```
 // 创建文档
Document doc = new Document(PageSize.A4, 0, 0, 0, 0);
```

但是我们再代码1 的位置重新设置了大小。所以他以最后一个为准

### 3.2 导出只有最后一张图片

当时我们新增了图片缩放功能，后就变成只能导出最后一张了。

```java
// 图片缩放，以免过大
if (sourceWidth > 595) {
    float scale = 595f / sourceWidth * 100;
    image.scalePercent(scale);
}
```

经过排查发现是因为每次添加都open 导致的问题

## 参考文章

[java将多张图片合并转为PDF](https://blog.csdn.net/u012279452/article/details/84324508)

