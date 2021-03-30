# Mybatis生成实体类

## 1. MySQL项目集成

1. 在原有项目下新建的module

   ![image-20210330153327890](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20210330153327890.png)

2. pom文件添加依赖

   ```xml
     <properties>
           <maven.compiler.source>8</maven.compiler.source>
           <maven.compiler.target>8</maven.compiler.target>
           <mybatis-generator.version>1.3.7</mybatis-generator.version>
           <mybatis.version>3.4.6</mybatis.version>
       </properties>
   
   
       <dependencies>
   
           <dependency>
               <groupId>org.mybatis.generator</groupId>
               <artifactId>mybatis-generator-core</artifactId>
           </dependency>
           <dependency>
               <groupId>mysql</groupId>
               <artifactId>mysql-connector-java</artifactId>
           </dependency>
   
           <!-- MyBatis 生成器 -->
           <dependency>
               <groupId>org.mybatis.generator</groupId>
               <artifactId>mybatis-generator-core</artifactId>
               <version>${mybatis-generator.version}</version>
           </dependency>
           <!-- MyBatis-->
           <dependency>
               <groupId>org.mybatis</groupId>
               <artifactId>mybatis</artifactId>
               <version>${mybatis.version}</version>
           </dependency>
       </dependencies>
   ```

   如果需要添加swagger注释还需添加以下内容

   ```xml
       <!--  如果有swagger2 需求请添加，start    -->
           <!-- swagger2-->
           <dependency>
               <groupId>io.springfox</groupId>
               <artifactId>springfox-swagger2</artifactId>
               <version>2.8.0</version>
           </dependency>
   
           <!--防止进入swagger页面报类型转换错误，排除2.9.2中的引用，手动增加1.5.21版本-->
           <dependency>
               <groupId>io.swagger</groupId>
               <artifactId>swagger-annotations</artifactId>
               <version>1.5.21</version>
           </dependency>
   
           <dependency>
               <groupId>io.swagger</groupId>
               <artifactId>swagger-models</artifactId>
               <version>1.5.21</version>
           </dependency>
   
           <!-- swagger2-UI-->
           <dependency>
               <groupId>io.springfox</groupId>
               <artifactId>springfox-swagger-ui</artifactId>
               <version>2.8.0</version>
           </dependency>
           <!--  如果有swagger2 需求请添加，end    -->
   ```

   

3. resources 文件夹下，添加数据库配置generator.properties

   ```properties
   jdbc.driverClass=com.mysql.cj.jdbc.Driver
   #jdbc.driverClass=com.mysql.jdbc.Driver
   jdbc.connectionURL=jdbc:mysql://47.119.125.3:3306/ry-vue?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
   jdbc.userId=root
   jdbc.password=ywt123456
   ```

4. resources 文件夹下，添加generatorConfig.xml

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE generatorConfiguration
           PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
           "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
   
   <generatorConfiguration>
       <properties resource="generator.properties"/>
       <context id="MySqlContext" targetRuntime="MyBatis3" defaultModelType="flat">
           <property name="beginningDelimiter" value="`"/>
           <property name="endingDelimiter" value="`"/>
           <property name="javaFileEncoding" value="UTF-8"/>
           <!-- 为模型生成序列化方法-->
           <plugin type="org.mybatis.generator.plugins.SerializablePlugin"/>
           <!-- 为生成的Java模型创建一个toString方法 -->
           <plugin type="org.mybatis.generator.plugins.ToStringPlugin"/>
           <!--生成mapper.xml时覆盖原文件-->
           <plugin type="org.mybatis.generator.plugins.UnmergeableXmlMappersPlugin" />
           <commentGenerator type="com.zszdevelop.CommentGenerator">
               <!-- 是否去除自动生成的注释 true：是 ： false:否 -->
               <property name="suppressAllComments" value="true"/>
               <property name="suppressDate" value="true"/>
               <property name="addRemarkComments" value="true"/>
           </commentGenerator>
   
           <jdbcConnection driverClass="${jdbc.driverClass}"
                           connectionURL="${jdbc.connectionURL}"
                           userId="${jdbc.userId}"
                           password="${jdbc.password}">
               <!--解决mysql驱动升级到8.0后不生成指定数据库代码的问题-->
               <property name="nullCatalogMeansCurrent" value="true" />
           </jdbcConnection>
   
           <javaModelGenerator targetPackage="com.zszdevelop.model" targetProject="my-mbg/src/main/java"/>
   
           <sqlMapGenerator targetPackage="com.zszdevelop.mapper" targetProject="my-mbg/src/main/resources"/>
   
           <javaClientGenerator type="XMLMAPPER" targetPackage="com.zszdevelop.mapper"
                                targetProject="my-mbg/src/main/java"/>
   
           <!--生成全部表tableName设为%-->
   <!--        <table tableName="%">-->
   <!--            <generatedKey column="id" sqlStatement="MySql" identity="true"/>-->
   <!--        </table>-->
   <!--        domainObjectName="WxUser"-->
           <table tableName="t_wx_user"  >
   <!--            <generatedKey column="open_id" sqlStatement="MySql" identity="true"/>-->
   <!--            <generatedKey column="open_id" sqlStatement="MySql" identity="false"/>-->
           </table>
       </context>
   </generatorConfiguration>
   ```

5. 自定义注释生成器

   如果需要集成swagger自动生成注释

   ```java
   package com.zszdevelop;
   
   import org.mybatis.generator.api.IntrospectedColumn;
   import org.mybatis.generator.api.IntrospectedTable;
   import org.mybatis.generator.api.dom.java.CompilationUnit;
   import org.mybatis.generator.api.dom.java.Field;
   import org.mybatis.generator.api.dom.java.FullyQualifiedJavaType;
   import org.mybatis.generator.internal.DefaultCommentGenerator;
   import org.mybatis.generator.internal.util.StringUtility;
   
   import java.util.Properties;
   
   /**
    * 自定义注释生成器
    */
   public class CommentGenerator extends DefaultCommentGenerator {
       private boolean addRemarkComments = false;
       private static final String EXAMPLE_SUFFIX="Example";
       private static final String API_MODEL_PROPERTY_FULL_CLASS_NAME="io.swagger.annotations.ApiModelProperty";
   
       /**
        * 设置用户配置的参数
        */
       @Override
       public void addConfigurationProperties(Properties properties) {
           super.addConfigurationProperties(properties);
           this.addRemarkComments = StringUtility.isTrue(properties.getProperty("addRemarkComments"));
       }
   
       /**
        * 给字段添加注释
        */
       @Override
       public void addFieldComment(Field field, IntrospectedTable introspectedTable,
                                   IntrospectedColumn introspectedColumn) {
           String remarks = introspectedColumn.getRemarks();
           //根据参数和备注信息判断是否添加备注信息
           if(addRemarkComments&&StringUtility.stringHasValue(remarks)){
   //            addFieldJavaDoc(field, remarks);
               //数据库中特殊字符需要转义
               if(remarks.contains("\"")){
                   remarks = remarks.replace("\"","'");
               }
               //给model的字段添加swagger注解
               field.addJavaDocLine("@ApiModelProperty(value = \""+remarks+"\")");
           }
       }
   
       /**
        * 给model的字段添加注释
        */
       private void addFieldJavaDoc(Field field, String remarks) {
           //文档注释开始
           field.addJavaDocLine("/**");
           //获取数据库字段的备注信息
           String[] remarkLines = remarks.split(System.getProperty("line.separator"));
           for(String remarkLine:remarkLines){
               field.addJavaDocLine(" * "+remarkLine);
           }
           addJavadocTag(field, false);
           field.addJavaDocLine(" */");
       }
   
       @Override
       public void addJavaFileComment(CompilationUnit compilationUnit) {
           super.addJavaFileComment(compilationUnit);
           //只在model中添加swagger注解类的导入
           if(!compilationUnit.isJavaInterface()&&!compilationUnit.getType().getFullyQualifiedName().contains(EXAMPLE_SUFFIX)){
               compilationUnit.addImportedType(new FullyQualifiedJavaType(API_MODEL_PROPERTY_FULL_CLASS_NAME));
           }
       }
   }
   
   ```

6. 用于生产MBG的代码

   ```java
   package com.zszdevelop;
   
   import org.mybatis.generator.api.MyBatisGenerator;
   import org.mybatis.generator.config.Configuration;
   import org.mybatis.generator.config.xml.ConfigurationParser;
   import org.mybatis.generator.internal.DefaultShellCallback;
   
   import java.io.InputStream;
   import java.util.ArrayList;
   import java.util.List;
   
   /**
    * 用于生产MBG的代码
    */
   public class Generator {
       public static void main(String[] args) throws Exception {
           //MBG 执行过程中的警告信息
           List<String> warnings = new ArrayList<String>();
           //当生成的代码重复时，覆盖原代码
           boolean overwrite = true;
           //读取我们的 MBG 配置文件
           InputStream is = Generator.class.getResourceAsStream("/generatorConfig.xml");
           ConfigurationParser cp = new ConfigurationParser(warnings);
           Configuration config = cp.parseConfiguration(is);
           is.close();
   
           DefaultShellCallback callback = new DefaultShellCallback(overwrite);
           //创建 MBG
           MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
           //执行生成代码
           myBatisGenerator.generate(null);
           //输出警告信息
           for (String warning : warnings) {
               System.out.println(warning);
           }
       }
   }
   
   ```

   

## 2. Oracle项目集成

   1. 在原有项目下新建的module

      ![image-20210330153327890](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20210330153327890.png)

   2. pom文件添加依赖

      ```xml
      
          <dependencies>
      
               <dependency>
                  <groupId>org.mybatis.generator</groupId>
                  <artifactId>mybatis-generator-core</artifactId>
                  <version>1.3.7</version>
              </dependency>
      
              <!-- MyBatis-->
              <dependency>
                  <groupId>org.mybatis</groupId>
                  <artifactId>mybatis</artifactId>
                  <version>3.4.6</version>
              </dependency>
      
              <dependency>
                  <groupId>com.oracle</groupId>
                  <artifactId>ojdbc14</artifactId>
                  <version>10.2.0.4.0</version>
              </dependency>
          </dependencies>
      ```
      
      如果需要添加swagger注释还需添加以下内容
      
      ```xml
          <!--  如果有swagger2 需求请添加，start    -->
              <!-- swagger2-->
              <dependency>
                  <groupId>io.springfox</groupId>
                  <artifactId>springfox-swagger2</artifactId>
                  <version>2.8.0</version>
        </dependency>
      
        <!--防止进入swagger页面报类型转换错误，排除2.9.2中的引用，手动增加1.5.21版本-->
              <dependency>
                  <groupId>io.swagger</groupId>
                  <artifactId>swagger-annotations</artifactId>
                  <version>1.5.21</version>
              </dependency>
      
              <dependency>
                  <groupId>io.swagger</groupId>
                  <artifactId>swagger-models</artifactId>
                  <version>1.5.21</version>
              </dependency>
      
              <!-- swagger2-UI-->
              <dependency>
                  <groupId>io.springfox</groupId>
                  <artifactId>springfox-swagger-ui</artifactId>
                  <version>2.8.0</version>
              </dependency>
              <!--  如果有swagger2 需求请添加，end    -->
      ```
      
      
      
   3. resources 文件夹下，添加数据库配置generator.properties

      ```properties
      jdbc.driverClass=oracle.jdbc.driver.OracleDriver
      jdbc.connectionURL=jdbc:oracle:thin:@192.168.0.1:1521/orcl
      jdbc.username=root
      jdbc.password=mypassword
      ```
      
   4. resources 文件夹下，添加generatorConfig.xml

      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE generatorConfiguration
              PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
              "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
      
      <generatorConfiguration>
          <!--导入属性配置-->
          <properties resource="generator.properties"></properties>
          <context id="default" targetRuntime="MyBatis3">
      
              <!--覆盖生成XML文件-->
              <plugin type="org.mybatis.generator.plugins.UnmergeableXmlMappersPlugin" />
              <!-- optional，旨在创建class时，对注释进行控制 -->
      <!--        <commentGenerator>-->
      <!--            <property name="suppressDate" value="true"/>-->
      <!--            &lt;!&ndash; 是否去除自动生成的注释 true：是 ： false:否 &ndash;&gt;-->
      <!--            <property name="suppressAllComments" value="true"/>-->
      <!--        </commentGenerator>-->
              <commentGenerator type="com.zszdevelop.CommentGenerator">
                  <!-- 是否去除自动生成的注释 true：是 ： false:否 -->
                  <property name="suppressAllComments" value="true"/>
                  <property name="suppressDate" value="true"/>
                  <property name="addRemarkComments" value="true"/>
              </commentGenerator>
      
      
              <!--jdbc的数据库连接 -->
              <jdbcConnection
                      driverClass="${jdbc.driverClass}"
                      connectionURL="${jdbc.connectionURL}"
                      userId="${jdbc.username}"
                      password="${jdbc.password}">
                  <property name="nullCatalogMeansCurrent" value="true" />
                  <property name="remarksReporting" value="true"/>
              </jdbcConnection>
      
      
              <!-- 非必需，类型处理器，在数据库类型和java类型之间的转换控制-->
              <javaTypeResolver>
                  <property name="forceBigDecimals" value="false"/>
              </javaTypeResolver>
      
      
              <!-- Model模型生成器,用来生成含有主键key的类，记录类 以及查询Example类
                  targetPackage     指定生成的model生成所在的包名
                  targetProject     指定在该项目下所在的路径
              -->
              <javaModelGenerator targetPackage="com.zszdevelop.domain"
                                  targetProject="oracle-mbg/src/main/java">
      
                  <!-- 是否允许子包，即targetPackage.schemaName.tableName -->
                  <property name="enableSubPackages" value="false"/>
                  <!-- 是否对model添加 构造函数 -->
                  <property name="constructorBased" value="true"/>
                  <!-- 是否对类CHAR类型的列的数据进行trim操作 -->
                  <property name="trimStrings" value="true"/>
                  <!-- 建立的Model对象是否 不可改变  即生成的Model对象不会有 setter方法，只有构造方法 -->
                  <property name="immutable" value="false"/>
              </javaModelGenerator>
      
              <!--Mapper映射文件生成所在的目录 为每一个数据库的表生成对应的SqlMap文件 -->
              <sqlMapGenerator targetPackage="mapper"
                               targetProject="oracle-mbg/src/main/resources">
                  <property name="enableSubPackages" value="false"/>
              </sqlMapGenerator>
      
              <!-- 客户端代码，生成易于使用的针对Model对象和XML配置文件 的代码
                      type="ANNOTATEDMAPPER",生成Java Model 和基于注解的Mapper对象
                      type="MIXEDMAPPER",生成基于注解的Java Model 和相应的Mapper对象
                      type="XMLMAPPER",生成SQLMap XML文件和独立的Mapper接口
              -->
              <javaClientGenerator targetPackage="com.zszdevelop.mapper"
                                   targetProject="oracle-mbg/src/main/java" type="XMLMAPPER">
                  <!-- enableSubPackages:是否让schema作为包的后缀 -->
                  <property name="enableSubPackages" value="true"/>
              </javaClientGenerator>
      
              <!-- 要生成的表 tableName是数据库中的表名或视图名 domainObjectName是实体类名 mapperName是Dao名-->
      <!--        <table tableName="数据库表名" domainObjectName="生成entity名"  mapperName="生成dao名"-->
      <!--               enableCountByExample="false" enableUpdateByExample="false" enableDeleteByExample="false"-->
      <!--               enableSelectByExample="false" selectByExampleQueryId="false">-->
      <!--        </table>-->
              <table tableName="T_WX_USER"  >
                  <!--            <generatedKey column="open_id" sqlStatement="MySql" identity="true"/>-->
                  <!--            <generatedKey column="open_id" sqlStatement="MySql" identity="false"/>-->
              </table>
          </context>
      </generatorConfiguration>
      ```

   5. 自定义注释生成器

      如果需要集成swagger自动生成注释

      ```java
      package com.zszdevelop;
      
      import org.mybatis.generator.api.IntrospectedColumn;
      import org.mybatis.generator.api.IntrospectedTable;
      import org.mybatis.generator.api.dom.java.CompilationUnit;
      import org.mybatis.generator.api.dom.java.Field;
      import org.mybatis.generator.api.dom.java.FullyQualifiedJavaType;
      import org.mybatis.generator.internal.DefaultCommentGenerator;
      import org.mybatis.generator.internal.util.StringUtility;
      
      import java.util.Properties;
      
      /**
       * 自定义注释生成器
       * Created by macro on 2018/4/26.
       */
      public class CommentGenerator extends DefaultCommentGenerator {
          private boolean addRemarkComments = false;
          private static final String EXAMPLE_SUFFIX="Example";
          private static final String MAPPER_SUFFIX="Mapper";
          private static final String API_MODEL_PROPERTY_FULL_CLASS_NAME="io.swagger.annotations.ApiModelProperty";
      
          /**
           * 设置用户配置的参数
           */
          @Override
          public void addConfigurationProperties(Properties properties) {
              super.addConfigurationProperties(properties);
              this.addRemarkComments = StringUtility.isTrue(properties.getProperty("addRemarkComments"));
          }
      
          /**
           * 给字段添加注释
           */
          @Override
          public void addFieldComment(Field field, IntrospectedTable introspectedTable,
                                      IntrospectedColumn introspectedColumn) {
              String remarks = introspectedColumn.getRemarks();
              //根据参数和备注信息判断是否添加备注信息
              if(addRemarkComments&&StringUtility.stringHasValue(remarks)){
      //            addFieldJavaDoc(field, remarks);
                  //数据库中特殊字符需要转义
                  if(remarks.contains("\"")){
                      remarks = remarks.replace("\"","'");
                  }
                  //给model的字段添加swagger注解
                  field.addJavaDocLine("@ApiModelProperty(value = \""+remarks+"\")");
              }
          }
      
          /**
           * 给model的字段添加注释
           */
          private void addFieldJavaDoc(Field field, String remarks) {
              //文档注释开始
              field.addJavaDocLine("/**");
              //获取数据库字段的备注信息
              String[] remarkLines = remarks.split(System.getProperty("line.separator"));
              for(String remarkLine:remarkLines){
                  field.addJavaDocLine(" * "+remarkLine);
              }
              addJavadocTag(field, false);
              field.addJavaDocLine(" */");
          }
      
          @Override
          public void addJavaFileComment(CompilationUnit compilationUnit) {
              super.addJavaFileComment(compilationUnit);
              //只在model中添加swagger注解类的导入
              if(!compilationUnit.getType().getFullyQualifiedName().contains(MAPPER_SUFFIX)&&!compilationUnit.getType().getFullyQualifiedName().contains(EXAMPLE_SUFFIX)){
                  compilationUnit.addImportedType(new FullyQualifiedJavaType(API_MODEL_PROPERTY_FULL_CLASS_NAME));
              }
          }
      }
      
      
      ```

   6. 用于生产MBG的代码

      ```java
      package com.zszdevelop;
      
      import org.mybatis.generator.api.MyBatisGenerator;
      import org.mybatis.generator.config.Configuration;
      import org.mybatis.generator.config.xml.ConfigurationParser;
      import org.mybatis.generator.internal.DefaultShellCallback;
      
      import java.io.InputStream;
      import java.util.ArrayList;
      import java.util.List;
      
      /**
       * 用于生产MBG的代码
       */
      public class Generator {
          public static void main(String[] args) throws Exception {
              //MBG 执行过程中的警告信息
              List<String> warnings = new ArrayList<String>();
              //当生成的代码重复时，覆盖原代码
              boolean overwrite = true;
              //读取我们的 MBG 配置文件
              InputStream is = Generator.class.getResourceAsStream("/generatorConfig.xml");
              ConfigurationParser cp = new ConfigurationParser(warnings);
              Configuration config = cp.parseConfiguration(is);
              is.close();
      
              DefaultShellCallback callback = new DefaultShellCallback(overwrite);
              //创建 MBG
              MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
              //执行生成代码
              myBatisGenerator.generate(null);
              //输出警告信息
              for (String warning : warnings) {
                  System.out.println(warning);
              }
          }
      }
      
      ```

      

## 3. 运行

点击Generator 边上的绿色箭头运行，会自动生成红色框里的内容

![image-20210330162338158](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20210330162338158.png)