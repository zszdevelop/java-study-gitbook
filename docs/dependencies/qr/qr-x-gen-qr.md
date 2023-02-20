# Zxing生成和识别二维码

## 1. 背景

之前有个业务需要识别前端传回来的二维码，网上有很多方案，但很多方案识别率特别低。优化后的版本整合后在此备份

## 2. 集成

### 2.1 pom依赖

```xml
<dependency>
            <groupId>com.google.zxing</groupId>
            <artifactId>core</artifactId>
            <version>3.3.3</version>
        </dependency>
        <dependency>
            <groupId>com.google.zxing</groupId>
            <artifactId>javase</artifactId>
            <version>3.3.3</version>
        </dependency>
```

### 2.2 二维码的生成与识别工具类

```java
package com.fardu.utils;


import com.faduit.report.utils.qr.MyQRCodeWriter;
import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.CharacterSetECI;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QrUtil {
    /**
     * 生成二维码
     *
     * @param content 二维码内容
     * @param width   二维码宽度
     * @param height  二维码高度
     * @throws Exception
     */
    public static File createQr(String content, int width, int height,String formatName,String outPath) throws Exception {
        //二维码参数基本设置
        Map<EncodeHintType, Object> hints = new HashMap<>();
        //设置编码为UTF-8
        hints.put(EncodeHintType.CHARACTER_SET, CharacterSetECI.UTF8);
        //设置二维码纠错等级
        // L:7%纠错率  M:15%纠错率 Q:25%纠错率 H:30纠错率   纠错率越高越容易识别出来,但是纠错率越高识别速度越慢
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
        //设置二维码白边的范围(此值可能不生效)
        hints.put(EncodeHintType.MARGIN, 0);
        //设置生成的图片类型为QRCode
        BarcodeFormat format = BarcodeFormat.QR_CODE;
        //生成二维码对应的位矩阵对象
//        MultiFormatWriter writer = new MultiFormatWriter();
//        QRCodeWriter writer = new QRCodeWriter();
        MyQRCodeWriter writer = new MyQRCodeWriter();

        // 解决中文乱码问题
        String contentCharset = new String(content.getBytes("UTF-8"), "ISO-8859-1");
        BitMatrix matrix = writer.encode(contentCharset, format, width, height);
        //设置位矩阵对象转图片的参数(前景色,背景色)
        MatrixToImageConfig config = new MatrixToImageConfig(Color.black.getRGB(), Color.white.getRGB());
        //位矩阵对象转BufferedImage对象
        BufferedImage qrcode = MatrixToImageWriter.toBufferedImage(matrix, config);
        //将BufferedImage对象保存到本地
        File outFile = new File(outPath);
        ImageIO.write(qrcode, formatName, outFile);

        return outFile;
    }
    /**
     * 生成二维码
     *
     * @param content 二维码内容
     * @param width   二维码宽度
     * @param height  二维码高度
     * @throws Exception
     */
    public static File createQr(String content, int width, int height) throws Exception {
      return createQr(content,width,height,"png","C:\\src\\idea\\qr-java\\qr.png");
    }

    /**
     * 生成带logo的二维码
     *
     * @param content 二维码内容
     * @param width   二维码宽度
     * @param height  二维码高度
     * @param scale   logo所占二维码比例,如果scale设置太小,即logo占二维码比例太大会识别不出二维码
     * @throws Exception
     */
    public static void createQrWithLogo(String content, int width, int height, int scale) throws Exception {
        //二维码参数基本设置
        Map<EncodeHintType, Object> hints = new HashMap<>();
        //设置编码为UTF-8
        hints.put(EncodeHintType.CHARACTER_SET, CharacterSetECI.UTF8);
        //设置二维码纠错等级
        // L:7%纠错率  M:15%纠错率 Q:25%纠错率 H:30纠错率   纠错率越高越容易识别出来,但是纠错率越高识别速度越慢
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
        //设置二维码白边的范围(此值可能不生效)
        hints.put(EncodeHintType.MARGIN, 1);
        //设置生成的图片类型为QRCode
        BarcodeFormat format = BarcodeFormat.QR_CODE;
        //生成二维码对应的位矩阵对象
        BitMatrix matrix = new MultiFormatWriter().encode(content, format, width, height);
        //设置位矩阵对象转图片的参数(前景色,背景色)
        MatrixToImageConfig config = new MatrixToImageConfig(Color.black.getRGB(), Color.white.getRGB());
        //位矩阵对象转BufferedImage对象
        BufferedImage qrcode = MatrixToImageWriter.toBufferedImage(matrix, config);
        //读取logo图片
        BufferedImage logo = ImageIO.read(new File("C:\\src\\idea\\qr-java\\logo.jpg"));
        //设置logo宽和高
        int logoWidth = qrcode.getWidth() / scale;
        int logoHeight = qrcode.getHeight() / scale;
        //设置返回logo的二维码图片的起始位置
        int x = (qrcode.getWidth() - logoWidth) / 2;
        int y = (qrcode.getHeight() - logoHeight) / 2;
        //新建空画板
        BufferedImage canvas = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        //新建画笔
        Graphics2D g = (Graphics2D) canvas.getGraphics();
        //将二维码绘制到画板
        g.drawImage(qrcode, 0, 0, null);
        //设置不透明度
        g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER));
        //将logo绘制到画板上
        g.drawImage(logo, x, y, logoWidth, logoHeight, null);
        //将画板(BufferedImage)对象保存到本地
        ImageIO.write(canvas, "png", new File("C:\\src\\idea\\qr-java\\qrwithlogo.png"));
    }


    /**
     * 识别二维码
     *
     * @param file
     * @return
     * @throws IOException
     * @throws NotFoundException
     */
    public static String recogQr(File file) throws IOException, NotFoundException {
        MultiFormatReader reader = new MultiFormatReader();
        //将图片文件转为BufferedImage对象
        BufferedImage bufferedImage = ImageIO.read(file);
        //生成BinaryBitmap对象
        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(new BufferedImageLuminanceSource(bufferedImage)));
        //二维码参数基本设置
        Map<DecodeHintType, Object> hints = new HashMap<>();
        hints.put(DecodeHintType.CHARACTER_SET, CharacterSetECI.UTF8);
        hints.put(DecodeHintType.TRY_HARDER, BarcodeFormat.QR_CODE);
        List<BarcodeFormat> allFormats = new ArrayList<>();
        allFormats.add(BarcodeFormat.QR_CODE);
        hints.put(DecodeHintType.POSSIBLE_FORMATS, allFormats);
        //识别二维码
        Result result = reader.decode(binaryBitmap, hints);
        bufferedImage.flush();


//        List allFormats = new ArrayList();
//        allFormats.add(BarcodeFormat.QR_CODE);
//        hints.put(DecodeHintType.POSSIBLE_FORMATS, allFormats);

        return result.getText();
    }

}

```

#### 2.2.1 识别率不高的原因

>zxing用于列举支持的解析格式，一共有17种，在com.google.zxing.BarcodeFormat里定义。官方默认支持所有的格式。如果是公司自己的产品，可以选择一种编码格式（建议QR_CODE），去除16种无用的编码格式，对QR_CODE使用 hard模式编码 ，速度精度都有明显上升；

- 针对二维码识别

  支持17种格式，但我们需要只用到1种，专门针对二维码QR_CODE 识别就可以了

- 使用hard模式编码

>```java
>//二维码参数基本设置
>Map<DecodeHintType, Object> hints = new HashMap<>();
>hints.put(DecodeHintType.CHARACTER_SET, CharacterSetECI.UTF8);
>hints.put(DecodeHintType.TRY_HARDER, BarcodeFormat.QR_CODE);
>List<BarcodeFormat> allFormats = new ArrayList<>();
>allFormats.add(BarcodeFormat.QR_CODE);
>hints.put(DecodeHintType.POSSIBLE_FORMATS, allFormats);
>```

## 参考文章

[利用Zxing生成和识别二维码(java版本)](https://www.cxyzjd.com/article/qq_45453266/103285051)

[开发二维码扫描功能如何能达到或者接近微信的识别率？](https://www.zhihu.com/question/56384589)