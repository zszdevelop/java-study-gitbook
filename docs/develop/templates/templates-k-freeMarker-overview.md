# FreeMarker入门

## 1. 简介

FreeMarker是一款用java语言编写的模版引擎，主要应用场景，**生成Html web 页面** 和 **代码自动生成工具**

### 1.1 特点：

1. 轻量级模版引擎，不需要Servlet环境就可以很轻松的嵌入到应用程序中
2. 能生成各种文本，如html，xml，java，等
3. 入门简单，它是用java编写的，很多语法和java相似

### 1.2 工作原理

![image-20201208110123472](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201208110123472.png)

## 2. 集成使用

简单

1. 添加maven依赖

   ```xml
   <dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-freemarker</artifactId>
   		</dependency>
   ```

2. 配置application.properties

   ```properties
   
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

3. 在/templates/ 目录添加模板文件

   ${classPath} 其中${} 就是需要动态替换， classPath 就是对应要设置的变量

   ```java
   package ${packagePath};
   
   public class ${className} {
   
   public static void main(String[] args) {
   System.out.println("${helloWorld}");
   }
   
   }
   ```

4. FreeMarkerDemo 生成文件和设置对应的属性

   ```java
   package com.zszdevelop.freemarkerdemo;
   
   import freemarker.template.Configuration;
   import freemarker.template.Template;
   
   import java.io.*;
   import java.util.HashMap;
   import java.util.Map;
   
   /**
    * @author 作者: zhangshengzhong
    * @文件名: FreeMarkerDemo
    * @版本号:1.0
    * @创建日期: 2020/12/8 11:17
    * @描述: 数据填充 freeMarker 占位符
    */
   public class FreeMarkerDemo {
       private static final String TEMPLATE_PATH = "src/main/resources/templates";
       private static final String CLASS_PATH = "src/main/java/com/zszdevelop/freemarkerdemo";
   
       public static void main(String[] args) {
           // step1 创建freeMarker配置实例
           Configuration configuration = new Configuration();
           Writer out = null;
           try {
               // step2 获取模版路径
               configuration.setDirectoryForTemplateLoading(new File(TEMPLATE_PATH));
               // step3 创建数据模型
               Map<String, Object> dataMap = new HashMap<String, Object>();
               dataMap.put("packagePath", "com.zszdevelop.freemarkerdemo");
               dataMap.put("className", "AutoCodeDemo");
               dataMap.put("helloWorld", "通过简单的 <代码自动生产程序> 演示 FreeMarker的HelloWorld！");
               // step4 加载模版文件
               Template template = configuration.getTemplate("hello.ftl");
               // step5 生成数据
               File docFile = new File(CLASS_PATH + "\\" + "AutoCodeDemo.java");
               out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(docFile)));
               // step6 输出文件
               template.process(dataMap, out);
               System.out.println("AutoCodeDemo.java 文件创建成功 !");
           } catch (Exception e) {
               e.printStackTrace();
           } finally {
               try {
                   if (null != out) {
                       out.flush();
                   }
               } catch (Exception e2) {
                   e2.printStackTrace();
               }
           }
       }
   }
   
   ```

5. 运行完毕可以看到生成了一个新类 AutoCodeDemo.java 。

   ![image-20201208112441266](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201208112441266.png)

   运行程序后刷新项目，会发现多了一个AutoCodeDemo.java类。不仅仅是java类，xml也是可以。笔者就是通过FreeMarker做了一个简易的工具类，公司的一个标准管理页面及其增删改查等功能，以及相关的配置文件（十三个文件），一个回车就全部自动生成。

## 3. FreeMarker 语法

```java
字符串输出:
${"Hello ${name} !"} / ${"Hello " + name + " !"}
<#assign cname=r"特殊字符完成输出(http:\www.baidu.com)">
${cname}

字符串截取 ： 
通过下标直接获取下标对应的字母： ${name[2]}
起点下标..结尾下标截取字符串：${name[0..5]}

算数运算：
<#-- 支持"+"、"－"、"*"、"/"、"%"运算符 -->
<#assign number1 = 10>
<#assign number2 = 5>
"+" : ${number1 + number2}
"－" : ${number1 - number2}
"*" : ${number1 * number2}
"/" : ${number1 / number2}
"%" : ${number1 % number2}

比较运算符：
<#if number1 + number2 gte 12 || number1 - number2 lt 6>
"*" : ${number1 * number2}
<#else>
"/" : ${number1 / number2}
</#if>

内建函数：
<#assign data = "abcd1234">
第一个字母大写：${data?cap_first}
所有字母小写：${data?lower_case}
所有字母大写：${data?upper_case}
<#assign floatData = 12.34>
数值取整数：${floatData?int}
获取集合的长度：${users?size}
时间格式化：${dateTime?string("yyyy-MM-dd")}

空判断和对象集合：
<#if users??>
<#list users as user >
${user.id} - ${user.name}
</#list>
<#else>
${user!"变量为空则给一个默认值"}
</#if>

Map集合：
<#assign mapData={"name":"程序员", "salary":15000}>
直接通过Key获取 Value值：${mapData["name"]}
通过Key遍历Map：
<#list mapData?keys as key>
Key: ${key} - Value: ${mapData[key]}
</#list>
通过Value遍历Map：
<#list mapData?values as value>
Value: ${value}
</#list>

List集合：
<#assign listData=["ITDragon", "blog", "is", "cool"]>
<#list listData as value>${value} </#list>

include指令：
引入其他文件：<#include "otherFreeMarker.ftl" />

macro宏指令：
<#macro mo>
定义无参数的宏macro--${name}
</#macro>
使用宏macro: <@mo />
<#macro moArgs a b c>
定义带参数的宏macro-- ${a+b+c}
</#macro>
使用带参数的宏macro: <@moArgs a=1 b=2 c=3 />

命名空间：
<#import "otherFreeMarker.ftl" as otherFtl>
${otherFtl.otherName}
<@otherFtl.addMethod a=10 b=20 />
<#assign otherName="修改otherFreeMarker.ftl中的otherName变量值"/>
${otherFtl.otherName}
<#assign otherName="修改otherFreeMarker.ftl中的otherName变量值" in otherFtl />
${otherFtl.otherName}
```

## 4. 最常用的语法

- 字符串输出:

  ```java
  ${"Hello ${name} !"} / ${"Hello " + name + " !"}
  ```

- List集合

  ```
  List集合：
  <#assign listData=["ITDragon", "blog", "is", "cool"]>
  <#list listData as value>${value} </#list>
  ```

  

## 5. 语法详解

**数据类型**
和java不同，FreeMarker不需要定义变量的类型，直接赋值即可。
字符串： value = "xxxx" 。如果有特殊字符 string = r"xxxx" 。单引号和双引号是一样的。
数值：value = 1.2。数值可以直接等于，但是不能用科学计数法。
布尔值：true or false。
List集合：list = [1,2,3] ; list=[1..100] 表示 1 到 100 的集合，反之亦然。
Map集合：map = {"key" : "value" , "key2" : "value2"}，key 必须是字符串哦！
实体类：和EL表达式差不多，直接点出来。

**字符串操作**
字符串连接：可以直接嵌套{"hello , {name}"} ； 也可以用加号${"hello , " + name}

字符串截取：string[index]。index 可以是一个值，也可以是形如 0..2 表示下标从0开始，到下标为2结束。一共是三个数。

**比较运算符**
== （等于），!= （不等于），gt（大于），gte（大于或者等于），lt（小于），lte（小于或者等于）。不建议用 >，< 可能会报错！
一般和 if 配合使用

**内建函数**
FreeMarker 提供了一些内建函数来转换输出，其结构：变量?内建函数，这样就可以通过内建函数来转换输出变量。
html： 对字符串进行HTML编码；
cap_first： 使字符串第一个字母大写；
lower_case： 将字符串转成小写；
upper_case： 将字符串转成大写；
size： 获得集合中元素的个数；
int： 取得数字的整数部分。

**变量空判断**
! 　　指定缺失变量的默认值；一般配置变量输出使用
?? 　判断变量是否存在。一般配合if使用 <#if value??></#if>

**宏指令**
可以理解为java的封装方法，供其他地方使用。宏指令也称为自定义指令，macro指令
语法很简单：<#macro val > 声明macro </#macro>; 使用macro <@val />

**命名空间**
可以理解为java的import语句，为避免变量重复。一个重要的规则就是:路径不应该包含大写字母，使用下划线_分隔词语，myName --> my_name
语法很简单：<#import "xxx.ftl" as val>

其他没有说明的语法是因为和java一样，没什么特别之处。所以没有列出来。

## 参考文章

[FreeMarker 快速入门](https://segmentfault.com/a/1190000011768799)
