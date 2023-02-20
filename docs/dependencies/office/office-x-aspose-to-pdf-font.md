# Aspose.Word转换为PDF的时候字体丢失

## 1. 简介

我们使用Aspose.Word 生成word的时候字体都是正常的，但是转成pdf 之后字体就丢失了。

![image-20220609085737039](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220609085737039.png)

## 2. 问题原因

Aspose.Word 使用的字体文件并没有正确指向系统的字体（网上有的说是因为使用了虚拟路径，并不是真正的路径），导致最终渲染pdf的时候字体丢失

## 3. 解决方案

将用户目录字体添加到字体源中

```java

    /**
     * 设置字体资源
     * 不设置会导致word转pdf的时候字体丢失
     */
    public static void setFontsSources() {
        String fontsDir = "/usr/share/fonts";

        //将用户目录字体添加到字体源中
        FontSourceBase[] originalFontSources = FontSettings.getDefaultInstance().getFontsSources();
        FolderFontSource folderFontSource = new FolderFontSource(fontsDir, true);

        FontSourceBase[] updatedFontSources = {originalFontSources[0], folderFontSource};
        FontSettings.getDefaultInstance().setFontsSources(updatedFontSources);
    }
```

全局调用一次即可，不用每次转换设置

## 4. 转换效果

![image-20220609090124782](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220609090124782.png)