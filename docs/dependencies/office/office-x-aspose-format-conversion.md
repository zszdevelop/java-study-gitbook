# aspose.word文档格式转换

## 1. 简介

aspose.word文档格式转换非常方便，如果只有一份文件（如docx，pdf等）直接调用save方法即可。如果是多页的，我们可以借助SaveOptions 实现。如图片

```java
ImageSaveOptions iso = new ImageSaveOptions(SaveFormat.JPEG);
        iso.setResolution(300);
        iso.setPrettyFormat(true);
        iso.setUseAntiAliasing(true);
        Document doc = new Document(docPath);
        int pageCount = doc.getPageCount();
        String imagesPath =String.format("%s/images", outFilePath);
        File imagesDir = new File(imagesPath);
        if(imagesDir.exists()){
            imagesDir.mkdirs();
        }
        for (int i = 0;i<pageCount;i++){
            PageSet pageSet = new PageSet(i);
            iso.setPageSet(pageSet);
            String mainName = FileUtil.mainName(docPath);

            String outPath = String.format("%s/%s_%s.jpg",imagesDir,mainName,i+1);

            doc.save(outPath,iso);
        }
        return imagesPath;
```

## 2. 工具类

```JAVA

import cn.hutool.core.io.FileUtil;
import com.aspose.words.Document;
import com.aspose.words.ImageSaveOptions;
import com.aspose.words.PageSet;
import com.aspose.words.SaveFormat;
import com.faduit.common.constant.FdConstants;
import org.jetbrains.annotations.NotNull;

import java.io.File;
import java.util.Objects;

/**
 * 文档转换
 * @author zsz
 * @date 2022-05-25
 */
public class DocConversionUtils
{


    /**
     * 文档格式转换
     * @param docPath
     * @param outFileType
     * @return
     */
    public static String docConversion(String docPath, String outFilePath, String outFileType) throws Exception {
        if (Objects.equals(outFileType, FdConstants.OUT_FILE_TYPE.JPG)){
            return docConversionJpg(docPath, outFilePath);
        }
        Document doc = new Document(docPath);
        String mainName = FileUtil.mainName(docPath);
        String outPath = String.format("%s/%s.%s",outFilePath,mainName,outFileType);
        doc.save(outPath);
        return outPath;
    }

    /**
     * doc转pdf
     * @param docPath
     * @param outFilePath
     * @return
     */
    public static String docConversionPdf(String docPath, String outFilePath) throws Exception {
        String outPath = docConversion(docPath, outFilePath, FdConstants.OUT_FILE_TYPE.PDF);
        return outPath;
    }
    /**
     * doc转docx
     * @param docPath
     * @param outFilePath
     * @return
     */
    public static String docConversionDocx(String docPath, String outFilePath) throws Exception {
        String outPath = docConversion(docPath, outFilePath, FdConstants.OUT_FILE_TYPE.DOCX);
        return outPath;
    }


    /**
     * 文档转Jpg图片格式
     * @param docPath
     * @param outFilePath
     * @return
     * @throws Exception
     */
    private static String docConversionJpg(String docPath, String outFilePath) throws Exception {
        ImageSaveOptions iso = new ImageSaveOptions(SaveFormat.JPEG);
        iso.setResolution(300);
        iso.setPrettyFormat(true);
        iso.setUseAntiAliasing(true);
        Document doc = new Document(docPath);
        int pageCount = doc.getPageCount();
        String imagesPath =String.format("%s/images", outFilePath);
        File imagesDir = new File(imagesPath);
        if(imagesDir.exists()){
            imagesDir.mkdirs();
        }
        for (int i = 0;i<pageCount;i++){
            PageSet pageSet = new PageSet(i);
            iso.setPageSet(pageSet);
            String mainName = FileUtil.mainName(docPath);

            String outPath = String.format("%s/%s_%s.jpg",imagesDir,mainName,i+1);

            doc.save(outPath,iso);
        }
        return imagesPath;
    }
}

```

