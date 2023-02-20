# asposeword为每页头部添加二维码信息

## 1. 简介

在生成word的时候需要在每页头部新增一个二维码图片，里面带了该文档的信息

## 2. 实现

核心逻辑如下

```java

    /**
     * 添加二维码信息
     */
    private static Document addQrInfo(GenTemplateDocDto.QrInfo qrInfo, Document doc) throws Exception {
        Document myDoc = null;
        if (qrInfo != null){
            String qrContent = qrInfo.getQrContent();
            double width = qrInfo.getWidth();
            double height = qrInfo.getHeight();
            if (width == 0){
                width = 50;
            }
            if (height == 0){
                height = 50;
            }

            int pageCount = doc.getPageCount();
            for (int i =0;i<pageCount;i++){
                // 这里采用提取页面的方式，所以要建立在新文档之上
                Document pageDoc = doc.extractPages(i, 1);
                DocumentBuilder pageDocBuilder = new DocumentBuilder(pageDoc);

                // 生成二维码
                String qrPath = genQrCode(qrContent,pageCount,i+1);

                // 添加二维码
                Shape shape = new Shape(pageDoc, ShapeType.IMAGE);
                shape.getImageData().setImage(qrPath);
                // 设置图片宽高
                shape.setWidth(width);
                shape.setHeight(height);
                // 设置图片偏移量
                shape.setTop(-20);
                //嵌入方式
                shape.setWrapType(WrapType.NONE);
                shape.setHorizontalAlignment(HorizontalAlignment.LEFT);

                pageDocBuilder.moveToHeaderFooter(HeaderFooterType.HEADER_PRIMARY);
                pageDocBuilder.insertNode(shape);

                if (myDoc == null){
                    myDoc = pageDoc;
                }else {
                    myDoc.appendDocument(pageDoc,ImportFormatMode.KEEP_SOURCE_FORMATTING);
                }
            }
        }
        if (myDoc != null){
            doc = myDoc;
        }
        return doc;
    }

    /**
     * 生成二维码
     * @param qrContent
     * @param zys
     * @param dqy
     * @return
     * @throws Exception
     */
    private static String genQrCode(String qrContent,int zys,int dqy) throws Exception {
        String basePath = FdConfig.getProfile();
        if (StringUtils.isEmpty(FdConfig.getProfile())){
            basePath = "/Users/zsz/Project/fadu/21_fd_report/fd_report_server/doc/temp";
        }
        String qrPath = String.format("%s/qr_%s.png",basePath, IdUtils.fastSimpleUUID());



        Map<String, String> valuesMap = new HashMap<>();
        valuesMap.put("qrContent", qrContent);
        valuesMap.put("zys", String.valueOf(zys));
        valuesMap.put("dqy", String.valueOf(dqy));

        String templte = "{qrContent}\n" +
                " 总页数：{zys} 当前页：{dqy}";
        String content = StrFormatter.format(templte, valuesMap, false);
        QrUtil.createQr(content,168,168,"png",qrPath);
        return qrPath;
    }
```



