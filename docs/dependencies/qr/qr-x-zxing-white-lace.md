# 使用zxing生成二维码去除白边

## 1. 简介

我们在使用zxing生成二维码的时候，会带上一个白色边框。因业务需要不能有这个白边，一定要把这个白边去除，那么如何去除呢？

![image-20220527142912892](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220527142912892.png)

## 2. 源码白边产生

我们先看看二维码生成的步骤

### 2.1 创建字符串

创建比特矩阵(位矩阵)的QR码编码的字符串的代码：

```java
 QRCodeWriter writer = new QRCodeWriter();
// 解决中文乱码问题
String contentCharset = new String(content.getBytes("UTF-8"), "ISO-8859-1");
        BitMatrix matrix = writer.encode(contentCharset, format, width, height);
```

### 2.2 encode 方法

```java
 public BitMatrix encode(String contents, BarcodeFormat format, int width, int height) throws WriterException {
        return this.encode(contents, format, width, height, (Map)null);
    }

    public BitMatrix encode(String contents, BarcodeFormat format, int width, int height, Map<EncodeHintType, ?> hints) throws WriterException {
        if (contents.isEmpty()) {
            throw new IllegalArgumentException("Found empty contents");
        } else if (format != BarcodeFormat.QR_CODE) {
            throw new IllegalArgumentException("Can only encode QR_CODE, but got ".concat(String.valueOf(format)));
        } else if (width >= 0 && height >= 0) {
            ErrorCorrectionLevel errorCorrectionLevel = ErrorCorrectionLevel.L;
            int quietZone = 4;
            if (hints != null) {
                if (hints.containsKey(EncodeHintType.ERROR_CORRECTION)) {
                    errorCorrectionLevel = ErrorCorrectionLevel.valueOf(hints.get(EncodeHintType.ERROR_CORRECTION).toString());
                }

                if (hints.containsKey(EncodeHintType.MARGIN)) {
                    quietZone = Integer.parseInt(hints.get(EncodeHintType.MARGIN).toString());
                }
            }

            return renderResult(Encoder.encode(contents, errorCorrectionLevel, hints), width, height, quietZone);
        } else {
            throw new IllegalArgumentException("Requested dimensions are too small: " + width + 'x' + height);
        }
    }

```

### 2.3 renderResult 方法

```java
 private static BitMatrix renderResult(QRCode code, int width, int height, int quietZone) {
        ByteMatrix input;
        if ((input = code.getMatrix()) == null) {
            throw new IllegalStateException();
        } else {
            int inputWidth = input.getWidth();
            int inputHeight = input.getHeight();
           	//以下两行源码是原始代码中控制边距的参数
            int qrWidth = inputWidth + (quietZone << 1);
            int qrHeight = inputHeight + (quietZone << 1);
            int outputWidth = Math.max(width, qrWidth);
            int outputHeight = Math.max(height, qrHeight);
            int multiple = Math.min(outputWidth / qrWidth, outputHeight / qrHeight);
            int leftPadding = (outputWidth - inputWidth * multiple) / 2;
            int topPadding = (outputHeight - inputHeight * multiple) / 2;
            BitMatrix output = new BitMatrix(outputWidth, outputHeight);
            int inputY = 0;

            for(int outputY = topPadding; inputY < inputHeight; outputY += multiple) {
                int inputX = 0;

                for(int outputX = leftPadding; inputX < inputWidth; outputX += multiple) {
                    if (input.get(inputX, inputY) == 1) {
                        output.setRegion(outputX, outputY, multiple, multiple);
                    }

                    ++inputX;
                }

                ++inputY;
            }

            return output;
        }
```

## 3. 问题原因

zxing在renderResult方法中帮我们计算了边框。

```
//以下两行源码是原始代码中控制边距的参数
    //int qrWidth = inputWidth + (quietZone << 1);
    //int qrHeight = inputHeight + (quietZone << 1);
   //以下两行源码是修改后的控制边距的参数
    int qrWidth = inputWidth + 2;
    int qrHeight = inputHeight + 2;
```

如果我们需要更改，则自行调整qrWidth 以及qrHeight 来设置间距

## 4. 解决方案

自行复制QRCodeWriter，修改。如我自定义了类MyQRCodeWriter

>QRCodeWriter 是final 类不能继承，所以只能新建类了

```java
package com.faduit.report.utils.qr;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.Writer;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.google.zxing.qrcode.encoder.ByteMatrix;
import com.google.zxing.qrcode.encoder.Encoder;
import com.google.zxing.qrcode.encoder.QRCode;

import java.util.Map;

/**
 * @author zsz
 * @date 2022-05-27
 */
public class MyQRCodeWriter implements Writer {
    private static final int QUIET_ZONE_SIZE = 4;

    public MyQRCodeWriter() {
    }

    public BitMatrix encode(String contents, BarcodeFormat format, int width, int height) throws WriterException {
        return this.encode(contents, format, width, height, (Map)null);
    }

    public BitMatrix encode(String contents, BarcodeFormat format, int width, int height, Map<EncodeHintType, ?> hints) throws WriterException {
        if (contents.isEmpty()) {
            throw new IllegalArgumentException("Found empty contents");
        } else if (format != BarcodeFormat.QR_CODE) {
            throw new IllegalArgumentException("Can only encode QR_CODE, but got ".concat(String.valueOf(format)));
        } else if (width >= 0 && height >= 0) {
            ErrorCorrectionLevel errorCorrectionLevel = ErrorCorrectionLevel.L;
            int quietZone = 4;
            if (hints != null) {
                if (hints.containsKey(EncodeHintType.ERROR_CORRECTION)) {
                    errorCorrectionLevel = ErrorCorrectionLevel.valueOf(hints.get(EncodeHintType.ERROR_CORRECTION).toString());
                }

                if (hints.containsKey(EncodeHintType.MARGIN)) {
                    quietZone = Integer.parseInt(hints.get(EncodeHintType.MARGIN).toString());
                }
            }

            return renderResult(Encoder.encode(contents, errorCorrectionLevel, hints), width, height, quietZone);
        } else {
            throw new IllegalArgumentException("Requested dimensions are too small: " + width + 'x' + height);
        }
    }

    private static BitMatrix renderResult(QRCode code, int width, int height, int quietZone) {
        ByteMatrix input = code.getMatrix();
        if (input == null) {
            throw new IllegalStateException();
        }
        int inputWidth = input.getWidth();
        int inputHeight = input.getHeight();
        //以下两行源码是原始代码中控制边距的参数
        //int qrWidth = inputWidth + (quietZone << 1);
        //int qrHeight = inputHeight + (quietZone << 1);
        //以下两行源码是修改后的控制边距的参数
        int qrWidth = inputWidth + 2;
        int qrHeight = inputHeight + 2;
        int outputWidth = Math.max(width, qrWidth);
        int outputHeight = Math.max(height, qrHeight);

        int multiple = Math.min(outputWidth / qrWidth, outputHeight / qrHeight);
        // Padding includes both the quiet zone and the extra white pixels to accommodate the requested
        // dimensions. For example, if input is 25x25 the QR will be 33x33 including the quiet zone.
        // If the requested size is 200x160, the multiple will be 4, for a QR of 132x132. These will
        // handle all the padding from 100x100 (the actual QR) up to 200x160.
        int leftPadding = (outputWidth - (inputWidth * multiple)) / 2;
        int topPadding = (outputHeight - (inputHeight * multiple)) / 2;

        BitMatrix output = new BitMatrix(outputWidth, outputHeight);

        for (int inputY = 0, outputY = topPadding; inputY < inputHeight; inputY++, outputY += multiple) {
            // Write the contents of this row of the barcode
            for (int inputX = 0, outputX = leftPadding; inputX < inputWidth; inputX++, outputX += multiple) {
                if (input.get(inputX, inputY) == 1) {
                    output.setRegion(outputX, outputY, multiple, multiple);
                }
            }
        }

        return output;
    }
}

```

只改动了边框设置

```java
 //以下两行源码是修改后的控制边距的参数
int qrWidth = inputWidth + 2;
int qrHeight = inputHeight + 2;
```

使用的时候调用自己的类

```java
      MyQRCodeWriter writer = new MyQRCodeWriter();

        // 解决中文乱码问题
        String contentCharset = new String(content.getBytes("UTF-8"), "ISO-8859-1");
        BitMatrix matrix = writer.encode(contentCharset, format, width, height);
```

![image-20220527144637643](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220527144637643.png)

## 参考文章

[使用zxing生成二维码去除白边](https://www.jianshu.com/p/5e44cff150c6)