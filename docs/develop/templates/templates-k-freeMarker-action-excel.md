# FreeMarker实战-根据Excel生成实体类

## 1. 简介

如下图，有这样一张表格。需要将表格转为java实体类。如果字段少复制过来没有什么问题。但是如果表格字段很多那么一个个复制就很累了（我现实业务有100多个字段）。随着业务的扩展，可能还需要对实体类字段加上一些特殊的注解。如数据库注解@Column(name = "ID") ，导入导出excel 用的@ExcelField(value = "ID")，数据库大小写和下划线（_）还要转化为驼峰 。种种因素手动复制实现工作量实在太大了

![image-20201208140412994](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201208140412994.png)

 

如果能实现读取excel 表头，根据表头第一行数据生成实体类就太棒了。

### 1.1 实现思路

1. poi读取第一行表头
2. 使用freemarker 生成对应实体类

## 2. 集成步骤

1. 添加maven依赖

   ```xml
   
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-freemarker</artifactId>
   		</dependency>
   
   		<!-- https://mvnrepository.com/artifact/org.apache.poi/poi -->
   		<dependency>
   			<groupId>org.apache.poi</groupId>
   			<artifactId>poi</artifactId>
   			<version>3.17</version>
   		</dependency>
   
   		<!-- https://mvnrepository.com/artifact/org.apache.poi/poi-ooxml -->
   		<dependency>
   			<groupId>org.apache.poi</groupId>
   			<artifactId>poi-ooxml</artifactId>
   			<version>3.17</version>
   		</dependency>
   
   ```

   2. 配置 application.properties 

      ```yml
      
      ## Freemarker 配置
      ##模版存放路径（默认为 classpath:/templates/）
      spring.freemarker.template-loader-path=classpath:/templates/
      ##是否生成缓存，生成环境建议开启（默认为true）
      spring.freemarker.cache=false
      ##编码
      spring.freemarker.charset=UTF-8
      spring.freemarker.check-template-location=true
      ##content-type类型(默认为test/html)
      spring.freemarker.content-type=text/html
      ## 设定所有request的属性在merge到模板的时候，是否要都添加到model中（默认为false）
      spring.freemarker.expose-request-attributes=false
      ##设定所有HttpSession的属性在merge到模板的时候，是否要都添加到model中.(默认为false)
      spring.freemarker.expose-session-attributes=false
      ##RequestContext属性的名称（默认为-）
      spring.freemarker.request-context-attribute=request
      ##模板后缀(默认为.ftl)
      spring.freemarker.suffix=.html
      ```

   3. JavaProperties 实体类需要的属性对象

      ```java
      package com.zszdevelop.codebuilderdemo.codebuilder;
      
      import java.util.LinkedHashSet;
      import java.util.Objects;
      import java.util.Set;
      
      public class JavaProperties {
          // 包名
          private final String pkg;
          // 类名
          private final String entityName;
      
          // 属性集合 需要改写 equals hash 保证名字可不重复 类型可重复
          private final Set<Field> fields = new LinkedHashSet<>();
          // 导入类的不重复集合
          private final Set<String> imports = new LinkedHashSet<>();
      
          public JavaProperties(String entityName, String pkg) {
              this.entityName = entityName;
              this.pkg = pkg;
          }
      
          public void addField(Class<?> type, String filedName, String excelName) {
              // 处理 java.lang
              final String pattern = "java.lang";
              String fieldType = type.getName();
              if (!fieldType.startsWith(pattern)) {
                  // 处理导包
                  imports.add(fieldType);
              }
              Field field = new Field();
              // 处理成员属性的格式
              int i = fieldType.lastIndexOf(".");
              field.setFieldType(fieldType.substring(i + 1));
              field.setFieldName(filedName);
              field.setExcelName(excelName);
              fields.add(field);
          }
      
              public String getPkg() {
                  return pkg;
              }
      
      
              public String getEntityName() {
                  return entityName;
              }
      
      
              public Set<Field> getFields() {
                  return fields;
              }
      
              public Set<String> getImports() {
                  return imports;
              }
      
      
              /**
                * 成员属性封装对象.
                */
              public static class Field {
                  // 成员属性类型
                  private String fieldType;
                  // 成员属性名称
                  private String fieldName;
                  //excel列名
                  private String excelName;
                  //数据库字段名
                  private String dbName;
      
                  public String getExcelName() {
                      return excelName;
                  }
      
                  public void setExcelName(String excelName) {
                      this.excelName = excelName;
                  }
      
                  public String getFieldType() {
                      return fieldType;
                  }
      
                  public void setFieldType(String fieldType) {
                  this.fieldType = fieldType;
                  }
                  public String getFieldName() {
                  return fieldName;
                  }
                  public void setFieldName(String fieldName) {
                  this.fieldName = fieldName;
                  }
      
                  public String getDbName() {
                      return dbName;
                  }
      
                  public void setDbName(String dbName) {
                      this.dbName = dbName;
                  }
      
                  /**
                      * 一个类的成员属性 一个名称只能出现一次
                      * 我们可以通过覆写equals hash 方法 然后放入Set
                      *
                      * @param o 另一个成员属性
                      * @return 比较结果
                      */
                  @Override
                  public boolean equals(Object o) {
                  if (this == o) return true;
                      if (o == null || getClass() != o.getClass()) return false;
                      Field field = (Field) o;
                      return Objects.equals(fieldName, field.fieldName);
                  }
                  @Override
                  public int hashCode() {
                       return Objects.hash(fieldType, fieldName);
                  }
              }
      
      }
      
      ```

   4. HumpLineUtil 驼峰线转化工具类

      ```java
      package com.zszdevelop.codebuilderdemo.codebuilder;
      
      import org.springframework.util.StringUtils;
      
      import java.util.regex.Matcher;
      import java.util.regex.Pattern;
      
      public class HumpLineUtil {
      
      
      
          /**
           * 下划线转换为驼峰
           *
           * @param line 下划线字符串
           * @param firstIsUpperCase 首字母是否转换为大写
           * @return
           */
          public static String underline2Camel(String line, boolean ... firstIsUpperCase) {
              String str = "";
      
              if(StringUtils.isEmpty(line)){
                  return str;
              } else {
                  StringBuilder sb = new StringBuilder();
                  String [] strArr;
                  // 不包含下划线，且第二个参数是空的
                  if(!line.contains("_") && firstIsUpperCase.length == 0){
                      sb.append(line.substring(0, 1).toLowerCase()).append(line.substring(1));
                      str = sb.toString();
                  } else if (!line.contains("_") && firstIsUpperCase.length != 0){
                      if (!firstIsUpperCase[0]) {
                          sb.append(line.substring(0, 1).toLowerCase()).append(line.substring(1));
                          str = sb.toString();
                      } else {
                          sb.append(line.substring(0, 1).toUpperCase()).append(line.substring(1));
                          str = sb.toString();
                      }
                  } else if (line.contains("_") && firstIsUpperCase.length == 0) {
                      strArr = line.split("_");
                      for (String s : strArr) {
                          sb.append(s.substring(0, 1).toUpperCase()).append(s.substring(1));
                      }
                      str = sb.toString();
                      str = str.substring(0, 1).toLowerCase() + str.substring(1);
                  } else if (line.contains("_") && firstIsUpperCase.length != 0) {
                      strArr = line.split("_");
                      for (String s : strArr) {
                          sb.append(s.substring(0, 1).toUpperCase()).append(s.substring(1));
                      }
                      if (!firstIsUpperCase[0]) {
                          str = sb.toString();
                          str = str.substring(0, 1).toLowerCase() + str.substring(1);
                      } else {
                          str = sb.toString();
                      }
                  }
              }
              return str;
          }
      
          private static Pattern linePattern = Pattern.compile("_(\\w)");
      
          /** 下划线转驼峰 */
          public static String lineToHump(String str) {
              str = str.toLowerCase();
              Matcher matcher = linePattern.matcher(str);
              StringBuffer sb = new StringBuffer();
              while (matcher.find()) {
                  matcher.appendReplacement(sb, matcher.group(1).toUpperCase());
              }
              matcher.appendTail(sb);
              return sb.toString();
          }
      
          /** 驼峰转下划线(简单写法，效率低于{@link #humpToLine2(String)}) */
          public static String humpToLine(String str) {
              return str.replaceAll("[A-Z]", "_$0").toLowerCase();
          }
      
          private static Pattern humpPattern = Pattern.compile("[A-Z]");
      
          /** 驼峰转下划线,效率比上面高 */
          public static String humpToLine2(String str) {
              Matcher matcher = humpPattern.matcher(str);
              StringBuffer sb = new StringBuffer();
              while (matcher.find()) {
                  matcher.appendReplacement(sb, "_" + matcher.group(0).toLowerCase());
              }
              matcher.appendTail(sb);
              return sb.toString();
          }
      }
      
      ```

   5. 核心生成代码CodeBuilder

      ```java
      package com.zszdevelop.codebuilderdemo.codebuilder;
      
      import freemarker.template.Configuration;
      import freemarker.template.Template;
      import freemarker.template.TemplateException;
      import org.apache.poi.ss.usermodel.Cell;
      import org.apache.poi.ss.usermodel.Row;
      import org.apache.poi.ss.usermodel.Sheet;
      import org.apache.poi.xssf.usermodel.XSSFWorkbook;
      
      import java.io.File;
      import java.io.FileOutputStream;
      import java.io.IOException;
      import java.io.OutputStreamWriter;
      import java.util.ArrayList;
      import java.util.List;
      import java.util.stream.Collectors;
      import java.util.stream.Stream;
      
      public class CodeBuilder {
      
          /**
           * @Description //由excel第一行生成实体类
           * @Return void
           **/
          public static void main(String[] args) throws IOException, TemplateException {
              //1.读取excel第一行组成String数组
              List<String> list = CodeBuilder.readExcelFirstRow("docs/T_USER.xlsx");
              //2.根据数组生成实体类
              buildByList(list);
          }
      
          /**
           * 简单的代码生成器.
           *
           * @param rootPath  maven 的 java 目录
           * @param templatePath 模板存放的文件夹
           * @param templateName 模板的名称
           * @param javaProperties 需要渲染对象的封装
           * @throws IOException  the io exception
           * @throws TemplateException the template exception
           */
          public static void autoCodingJavaEntity(String rootPath,
                                                  String templatePath,
                                                  String templateName,
                                                  JavaProperties javaProperties) throws IOException, TemplateException {
      
              // freemarker 配置
              Configuration configuration = new Configuration(Configuration.DEFAULT_INCOMPATIBLE_IMPROVEMENTS);
      
              configuration.setDefaultEncoding("UTF-8");
              // 指定模板的路径
              configuration.setDirectoryForTemplateLoading(new File(templatePath));
              // 根据模板名称获取路径下的模板
              Template template = configuration.getTemplate(templateName);
              // 处理路径问题
              final String ext = ".java";
              String javaName = javaProperties.getEntityName().concat(ext);
              String packageName = javaProperties.getPkg();
      
              String out = rootPath.concat(Stream.of(packageName.split("\\."))
                      .collect(Collectors.joining("/", "/", "/" + javaName)));
      
              // 定义一个输出流来导出代码文件
              OutputStreamWriter outputStreamWriter = new OutputStreamWriter(new FileOutputStream(out));
              // freemarker 引擎将动态数据绑定的模板并导出为文件
              template.process(javaProperties, outputStreamWriter);
      
          }
      
          public static List<String> readExcelFirstRow(String excelPath){
      
              List<String> list = new ArrayList<>();
              try {
                  //String encoding = "GBK";
                  File excel = new File(excelPath);
                  if (excel.isFile() && excel.exists()) {   //判断文件是否存在
      
                      String[] split = excel.getName().split("\\.");  //.是特殊字符，需要转义！！！！！
      
                      XSSFWorkbook wb = new XSSFWorkbook(excel);
      
                      //开始解析
                      Sheet sheet = wb.getSheetAt(0);     //读取sheet 0
      
                      Row row = sheet.getRow(sheet.getFirstRowNum());
                      if (row != null) {
                          int firstCellIndex = row.getFirstCellNum();
                          int lastCellIndex = row.getLastCellNum();
                          for (int cIndex = firstCellIndex; cIndex < lastCellIndex; cIndex++) {   //遍历列
                              Cell cell = row.getCell(cIndex);
                              if (cell != null) {
                                  list.add(cell.toString());
                                  System.out.println(cell.toString());
                              }
                          }
                      }
                  } else {
                      System.out.println("找不到指定的文件");
                  }
              } catch (Exception e) {
                  e.printStackTrace();
              }
              return list;
          }
      
      
      
      
          public static void buildByList(List<String> list) throws IOException, TemplateException {
              // 路径根据自己项目的特点调整
              //模板位置
              String templatePath = "src/main/resources/templates";
              //模板名称
              String templateName = "entity.ftl";
              //实体类名包名(生成位置)
              String rootPath = "src/main/java";
              String packageName = "com.zszdevelop.codebuilderdemo";
              JavaProperties userEntity = new JavaProperties("User", packageName);
      
              for (int i = 0; i < list.size(); i++) {
                  String field = list.get(i);
                  // 路径根据自己项目的特点调整，这里excel第一行为大写字段名，将其转为驼峰式作为实体类字段
                  userEntity.addField(field.getClass(), HumpLineUtil.lineToHump(field.toLowerCase()), field);
              }
      
              CodeBuilder.autoCodingJavaEntity(rootPath, templatePath, templateName, userEntity);
          }
      
      
      }
      
      ```

   6. 在templates 添加entity.ftl 模板
   
      ```java
      package ${pkg};
      
      import com.wuwenze.poi.annotation.Excel;
      import com.wuwenze.poi.annotation.ExcelField;
      import javax.persistence.*;
      <#list imports as impt>
      import ${impt};
      </#list>
      /**
       * excel生成实体类
       */
      
      public class ${entityName} {
      
      <#list fields as field>
          @Column(name = "${field.excelName}")
          @ExcelField(value = "${field.excelName}")
          private ${field.fieldType} ${field.fieldName};
      
      </#list>
      
      }
      ```
   
      其中@Column(name = "${field.excelName}")， @ExcelField(value = "${field.excelName}") 根据自己实际情况决定需不需要添加
   
   7. 测试生成实体类
   
      ![image-20201208143620089](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201208143620089.png)

