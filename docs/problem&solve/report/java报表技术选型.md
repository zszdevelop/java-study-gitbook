# java报表技术选型

## 1. 技术选型方案

技术选型的两个大方向

- 采购一套成熟、稳定的商业产品
- 自己研发和组装

### 1.1 商业报表

可选的商业报表名录

- [FineReport帆软报表](https://www.finereport.com/)

- [RDP报表](http://product.mftcc.cn/rdp/)

- [润乾报表](http://www.raqsoft.com.cn/r)

- 水晶报表

  非国产不考虑

- [smartbi思迈特](http://www.smartbi.com.cn/)

- [eclipse的 birt](http://www.eclipse.org/birt/)

  非国产不考虑

#### 1.1.1 [FineReport帆软报表](https://www.finereport.com/)

**特点：** 

- 功能全面且专业
  - 支持关系型数据库
  - [BI](https://baike.baidu.com/item/BI)多维数据库的连接取数
  - 支持中国式复杂报表的处理
- 设计报表简单高效，学习成本低
  - 通过拖拽操作便可以设计复杂的中国式报表

**支持的功能**

- 多数据源的支持
  - 数据库数据源：包括[Oracle](https://baike.baidu.com/item/Oracle)、sql sever、**DB2（国产数据库,gbase连接，达梦不确定）**、My SQL等主流的关系型数据库
  - 文本数据源：包括Excel文件，Txt文件等存储在文件中的数据；
  - 程序数据源：支持程序数据源。
  - 标准数据源：支持[WebService](https://baike.baidu.com/item/WebService)，[SOA](https://baike.baidu.com/item/SOA/2140685)标准数据等标准数据源。

- 图表
  - 十五种图表大类和五十余种图表样式
  - 大屏幕图表支持度高
- 交互分析
  - 图表联动：点击父图表系列，所有子图表联动变化。
  - 数据联动：点击父表格数据，所有子图表、子表格数据联动变化。

- 数据填报
  - 离线填报：离线填报报表依然可用控件、数据校验、自动计算等功能。
  - 填报暂存：智能缓存技术，避免数据因意外丢失。
  - 分页填报：填报表分成多个页面浏览，提高报表可读性和报表性能。
  - 批量**excel导入（导入外部文件可能需要用到）**：直接导入或填报录入，批量将excel中数据导入数据库中。
- 报表打印
  - 支持PDF打印、Flash打印、Applet打印和服务器打印等
  - 导出PDF,图片、word



#### 1.1.2 [RDP报表](http://product.mftcc.cn/rdp/)

**支持的功能**

https://blog.csdn.net/cxn_hm/article/details/81386204

- 多数据源的支持
  - Mysql，oracel，DB2，SQLServer等主流关系型数据库
  - 也可以自定义配置JDBC数据库；支持redis非结构化内存数据库
  - 支持Excel, txt等数据文件形式
  - 支持JavaBean和JSON格式数据；支持自定义数据结构，给报表管理提供了便利性。
- 图表
  - 支持常见图表
- 报表打印
  - **只支持Excel**？

#### 1.1.3 [润乾报表](http://www.raqsoft.com.cn/r)

**报价**

1万1套

**支持的功能**

- 图表打印
  - 图形美观性不强、（非自研、主要是继承echarts,D3）,例子少
  - 仪表盘、甘特图、雷达图、双轴柱线图、饼图、柱形图、线图等多种二维三维统计图
- 报表打印
  - 支持打出EXCEL、PDF

### 1.2 自研报表

自研复杂报表工具

- 使用现成的开源报表工具

  如：JasperReport（设计器为iReport ） 、OpenReport

  但会遇到一些难题，如：打印报表；复杂的数据计算；复杂格式的报表展示；页面、打印、导出word、pdf、excel格式一致性；图表...

- java组件，进行组合开发

  比如前端图表库、pdf 操作组件库......

  - 报表引擎

    - JasperReports，配合设计器ireport使用。不是类Excel的格子设计，而是画报表，表头、页头、列头，用了几天，还是不能接受这种操作思维，见仁见智吧。使用方面和帆软比是不如它强大，不能导Excel，通常情况下只用来导PDF，但在大多数情况下还是能满足需求的，毕竟免费的不能要求太高哈。

      （开源报表，功能较单一，使用略微繁琐，展现美观度较差。唯一优势可以自己改造。）

    - EasyReport、ureport，同样也是开源的web端设计报表工具

  - 图表前端库

    - ECharts
    - Highcharts

  - Java office、pdf 操作组件库

    - Apache POI
    - JXL
    - iText
    - OpenOffice
    - PDFBox
    - jquery.table2excel.js

  - 打印方式

    浏览器自带打印及其js控件，较难干预样式，连续打印、页眉页脚，分页等存在问题

    - pdf流打印，需要下载adobe插件
    - ActiveX，java类报表工具基本不用
    - Applet打印，依赖jre

    

## 2. 总结

国内报表如：FineReport，RDP报表，smartbi 可以研究看是否适合自己业务

国外报表工具不推荐，因为上手困难，遇到问题处理基本找不到资料。不适合中国式报表

自研报表工具需要投入不少人力和时间去研究，就看你时间多还是人力多还是愿意花钱解决了，单纯从工具层面角度，还是商用报表好用的，有问题也能找到人帮助。



## 参考文章

[总结5个比较好用的JAVA报表工具](https://blog.csdn.net/n15642656987/article/details/80833233)

[报表工具花钱or开源？我对比了这6个工具](https://baijiahao.baidu.com/s?id=1647420315443585950&wfr=spider&for=pc)

[流行的开源报表工具都有什么？](https://www.zhihu.com/question/20302655/answer/134763153)

[FineReport 集成到web项目](