# aspose.word动态渲染表格

## 1. 需求

我们业务需求需要动态填充表格数据。无数据的表格需要绘制一条大的删除线

## 2. 代码实现

### 2.1 动态填充表格数据

主要思路就是定位到表格，具体行，具体的格。进行绘制

```java
 /**
     * 表格数据处理
     *
     */
    private static void setTabledData(List<FdAsposeTable> asposeTables, Document doc, DocumentBuilder builder) throws Exception {


        NodeCollection allTables = doc.getChildNodes(NodeType.TABLE, true);
        if (allTables.getCount() == 0) {
            throw new Exception("模板有误，找不到表格！");
        }

        for (int tableIndex = 0; tableIndex < asposeTables.size(); tableIndex++) {
            // 表格信息
            Table table = (Table)allTables.get(tableIndex);

            FdAsposeTable fdAsposeTable = asposeTables.get(tableIndex);
            List<FdAsposeTable.FdRow> fdRows = fdAsposeTable.getRows();

            // 添加模板行（数据太多时添加）
            addRow(table, fdAsposeTable, fdRows);

            // 填充表格数据
            for (int rowIndex = 0; rowIndex < fdRows.size(); rowIndex++) {
                // 每行
                FdAsposeTable.FdRow row = fdRows.get(rowIndex);
                List<FdAsposeFieldAttr> tableFieldAttrList = row.getFieldAttrList();
                Collections.sort(tableFieldAttrList);

                int colSize = tableFieldAttrList.size();
                log.error("colSize:" + colSize);
                for (int colIndex = 0; colIndex < colSize; colIndex++) {
                    // 每列
                    FdAsposeFieldAttr asposeFieldAttr = tableFieldAttrList.get(colIndex);
                    builder.moveToCell(tableIndex, rowIndex + fdAsposeTable.getStartRowIndex(), colIndex + fdAsposeTable.getStartColumnIndex(), 0);
                    log.error("tableIndex:" + tableIndex);
                    log.error("rowIndex:" + (rowIndex + fdAsposeTable.getStartRowIndex() + 1));
                    log.error("colIndex:" + (colIndex + fdAsposeTable.getStartColumnIndex()));
                    log.error("getFieldValue:" + asposeFieldAttr.getFieldValue());
                    builder.write(asposeFieldAttr.getFieldValue());
                }

            }
        }


    }

    /**
     * 添加模板行
     * @param table
     * @param fdAsposeTable
     * @param fdRows
     */
    private static void addRow(Table table, FdAsposeTable fdAsposeTable, List<FdAsposeTable.FdRow> fdRows) {
        //模板行
        Node templateRow = table.getRows().get(fdAsposeTable.getStartRowIndex()).deepClone(true);
        //模板数据行数
        int templateDataRowsCount = table.getRows().getCount() - fdAsposeTable.getStartRowIndex() - fdAsposeTable.getTailNotDataRow();
        //补充模板数据行
        if (fdAsposeTable.isAutoTemplateDataRows() && templateDataRowsCount < fdRows.size())
        {
            int addCounts = fdRows.size() - templateDataRowsCount;
            for (int i = 0; i < addCounts; i++)
            {
                Node addRow = templateRow.deepClone(true);
                table.getRows().insert(fdAsposeTable.getStartRowIndex(), addRow);
            }
        }
    }

```

### 2.2 绘制大删除线

定位出表格空白的位置，设置插入一个大shape

```java
 /**
     * 设置表格空格删除线
     *
     * @param asposeTables
     * @param doc
     * @param builder
     */
    private static void setTabledBlankCellDiagonalLine(List<AsposeTable> asposeTables, Document doc, DocumentBuilder builder) throws Exception {
        for (int tableIndex = 0; tableIndex < asposeTables.size(); tableIndex++) {
            NodeCollection allTables = doc.getChildNodes(NodeType.TABLE, true);
            // 每个表格
            Table table = (Table) allTables.get(tableIndex);
            int start = -1;
            int total = 0;
            RowCollection rows = table.getRows();
            for (int i = 0; i < rows.getCount(); i++) {
                Row row = rows.get(i);
                String firstCellText = row.getFirstCell().getText();
                if (StringUtils.isEmpty(firstCellText) && StringUtils.isEmpty(row.getLastCell().getText())) {
                    if (start == -1) {
                        start = i;
                    }
                    total++;
                }

            }

            if (total > 0) {
                double blankHeight = 0;
                double blankWidth = 0;
                blankHeight = total * FdConstants.BLANK_CELL_HEIGHT;


                for (int i = 0; i < table.getRows().get(0).getCells().getCount(); i++) {
                    blankWidth += table.getRows().get(0).getCells().get(i).getCellFormat().getWidth();
                }

                Shape shape = new Shape(doc, ShapeType.LINE);
                //设置宽和高
                shape.setWidth(blankWidth);
                shape.setHeight(blankHeight);
                shape.setLeft(-table.getLeftPadding());
                shape.setTop(0);
                shape.setFlipOrientation(FlipOrientation.HORIZONTAL);
                // shape.Rotation =-270;
                //嵌入方式
                shape.setWrapType(WrapType.NONE);
                builder.moveToCell(0, start, 0, 0);
                builder.insertNode(shape);//写入文档
                doc.updatePageLayout();
            }

        }
    }
```

### 2.3 渲染单元格无数据时的删除线

取得对应的边框

```java
 for (int colIndex = 0; colIndex < colSize; colIndex++) {
                    // 每列
                    FdAsposeFieldAttr asposeFieldAttr = tableFieldAttrList.get(colIndex);
                    String fieldValue = asposeFieldAttr.getFieldValue();
                    builder.moveToCell(tableIndex, rowIndex + fdAsposeTable.getStartRowIndex(), colIndex + fdAsposeTable.getStartColumnIndex(), 0);

                    if (fdAsposeTable.isDiagonalUpLine() && StringUtils.isEmpty(fieldValue)) {
                        // 单元格数据为空的时候，添加斜线
                        BorderCollection borders = table.getRows()
                                .get(rowIndex + fdAsposeTable.getStartRowIndex())
                                .getCells()
                                .get(colIndex + fdAsposeTable.getStartColumnIndex())
                                .getCellFormat()
                                .getBorders();
                        Border border = borders.getByBorderType(BorderType.DIAGONAL_UP);
                        border.setLineStyle(LineStyle.SINGLE);
                        border.setLineWidth(1);
                        borders.setColor(Color.BLACK);
                    } else {
                        builder.write(fieldValue);
                    }

                }
```

