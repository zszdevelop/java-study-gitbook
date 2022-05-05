# java将word转成pdf--之docx4j的export pdf组件

## 1. 集成步骤

1. 引入相关依赖

   ```xml
     <dependency>
               <groupId>args4j</groupId>
               <artifactId>args4j</artifactId>
               <version>2.32</version>
           </dependency>
           <dependency>
               <groupId>org.docx4j</groupId>
               <artifactId>docx4j</artifactId>
               <version>3.2.1</version>
           </dependency>
           <dependency>
               <groupId>fr.opensagres.xdocreport</groupId>
               <artifactId>org.apache.poi.xwpf.converter.pdf</artifactId>
               <version>1.0.6</version>
           </dependency>
           <dependency>
               <groupId>fr.opensagres.xdocreport</groupId>
               <artifactId>org.odftoolkit.odfdom.converter.pdf</artifactId>
               <version>1.0.6</version>
           </dependency>
           <dependency>
               <groupId>com.googlecode.jaxb-namespaceprefixmapper-interfaces</groupId>
               <artifactId>JAXBNamespacePrefixMapper</artifactId>
               <version>2.2.4</version>
               <scope>runtime</scope>
           </dependency>
           <dependency>
               <groupId>com.sun.xml.bind</groupId>
               <artifactId>jaxb-impl</artifactId>
               <version>2.2.11</version>
           </dependency>
           <dependency>
               <groupId>com.sun.xml.bind</groupId>
               <artifactId>jaxb-core</artifactId>
               <version>2.2.11</version>
           </dependency>       <!-- https://mvnrepository.com/artifact/org.apache.xmlbeans/xmlbeans -->
           <dependency>
               <groupId>org.apache.xmlbeans</groupId>
               <artifactId>xmlbeans</artifactId>
               <version>2.6.0</version>
           </dependency>
           <dependency>
               <groupId>org.apache.poi</groupId>
               <artifactId>poi</artifactId>
               <version>3.14</version><!--$NO-MVN-MAN-VER$-->
           </dependency>
           <dependency>
               <groupId>org.apache.poi</groupId>
               <artifactId>poi-scratchpad</artifactId>
               <version>3.14</version><!--$NO-MVN-MAN-VER$-->
           </dependency>
           <dependency>
               <groupId>org.apache.poi</groupId>
               <artifactId>poi-ooxml</artifactId>
               <version>3.14</version><!--$NO-MVN-MAN-VER$-->
           </dependency>
   ```

2. 转换工具类

   ```java
   public class Word2PdfUtils {
   
   
       /**
        * docx文档转换为PDF
        *
        * @param pdfPath PDF文档存储路径
        * @throws Exception 可能为Docx4JException, FileNotFoundException, IOException等
        */
       public  void convertDocxToPdf(String docxPath, String pdfPath) throws Exception {
   
           FileOutputStream fileOutputStream = null;
           try {
               File file = new File(docxPath);
               fileOutputStream = new FileOutputStream(new File(pdfPath));
               WordprocessingMLPackage mlPackage = WordprocessingMLPackage.load(file);
               setFontMapper(mlPackage);
               Docx4J.toPDF(mlPackage, new FileOutputStream(new File(pdfPath)));
           }catch (Exception e){
               e.printStackTrace();
   //            log.error("docx文档转换为PDF失败");
           }finally {
               IOUtils.closeQuietly(fileOutputStream);
           }
       }
   
       private static void setFontMapper(WordprocessingMLPackage mlPackage) throws Exception {
           Mapper fontMapper = new IdentityPlusMapper();
           fontMapper.put("隶书", PhysicalFonts.get("LiSu"));
           fontMapper.put("宋体", PhysicalFonts.get("SimSun"));
           fontMapper.put("微软雅黑", PhysicalFonts.get("Microsoft Yahei"));
           fontMapper.put("黑体", PhysicalFonts.get("SimHei"));
           fontMapper.put("楷体", PhysicalFonts.get("KaiTi"));
           fontMapper.put("新宋体", PhysicalFonts.get("NSimSun"));
           fontMapper.put("华文行楷", PhysicalFonts.get("STXingkai"));
           fontMapper.put("华文仿宋", PhysicalFonts.get("STFangsong"));
           fontMapper.put("宋体扩展", PhysicalFonts.get("simsun-extB"));
           fontMapper.put("仿宋", PhysicalFonts.get("FangSong"));
           fontMapper.put("仿宋_GB2312", PhysicalFonts.get("FangSong_GB2312"));
           fontMapper.put("幼圆", PhysicalFonts.get("YouYuan"));
           fontMapper.put("华文宋体", PhysicalFonts.get("STSong"));
           fontMapper.put("华文中宋", PhysicalFonts.get("STZhongsong"));
   
           mlPackage.setFontMapper(fontMapper);
       }
   
   }
   
   ```

3. 测试

   ```java
   
       @Test
       void convertDocxToPdf() throws Exception {
           String docxPath = "/Users/zsz/Project/demo/2020year/4yue/word2pdf/mytest.docx";
           String pdfPath = "/Users/zsz/Project/demo/2020year/4yue/word2pdf/word2pdf.pdf";
           Word2PdfUtils word2PdfUtils = new Word2PdfUtils();
           word2PdfUtils.convertDocxToPdf(docxPath,pdfPath);
       }
   ```


## 2. 相关问题

### 2.1 doc文件不支持，要docx

```
java.lang.IllegalArgumentException: Word 2003 XML is not supported. Use a docx or Flat OPC XML instead, or look at the Word2003XmlConverter proof of concept.
```

![image-20220427104749883](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220427104749883.png)

## 遗留问题

中文还是会存在乱码问题，待解决

