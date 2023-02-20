# java导出生成word之XML方式

## 1. 简介

Word从2003开始支持XML格式，操作流程

- 先用office2003或者2007编辑好word的样式，然后另存为xml，
- 将xml翻译为FreeMarker模板
  - 使用任何模板引擎都可以，核心就是渲染替换

- 最后用java来解析FreeMarker模板并输出Doc。

经测试这样方式生成的word文档完全符合office标准，样式、内容控制非常便利，打印也不会变形，生成的文档和office中编辑文档完全一样。

## 2. 集成使用

1. 新建项目

2. 引入相关pom依赖 `FreeMarker`

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-freemarker</artifactId>
   </dependency>
   ```

3. 在application.propertes中添加相应配置

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

4. 简单准备一份word文档

   ![image-20200411212120583](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200411212120583.png)

5. 将word保存为xml格式

   ![image-20200411212343004](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200411212343004.png)

6. 打开xml将你要的文字用`${title}` 来替代。并保存为freemarker模板.ftl文件

   ![image-20200411213509998](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200411213509998.png)

   如果是列表则使用

   ```
   <#list list as item>
   	${item.title}
    </#list>
   ```

7. 将.ftl 文件放在templates目录下

   ![image-20200411213744258](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200411213744258.png)

8. 使用freemarker模板设置对应属性值

   ```java
   public class WordTest {
   
       private Configuration configuration = null;
   
       public WordTest(){
           configuration = new Configuration();
           configuration.setDefaultEncoding("UTF-8");
       }
   
       public static void main(String[] args) {
           WordTest test = new WordTest();
           test.createWord();
       }
   
       public void createWord(){
           Map<String,Object> dataMap=new HashMap<String,Object>();
           getData(dataMap);
           try {
               configuration.setDirectoryForTemplateLoading(new File("/Users/zsz/Project/demo/2020year/4yue/operationword/src/main/resources/templates"));
           } catch (IOException e) {
               e.printStackTrace();
           }
           Template t=null;
           try {
               t = configuration.getTemplate("java-operation-word.ftl"); //获取模板文件
           } catch (IOException e) {
               e.printStackTrace();
           }
           File outFile = new File("/Users/zsz/Project/demo/2020year/4yue/operationword/toword+"+System.currentTimeMillis()+".doc"); //导出文件
           Writer out = null;
           try {
               out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outFile)));
           } catch (FileNotFoundException e1) {
               e1.printStackTrace();
           }
   
           try {
               t.process(dataMap, out); //将填充数据填入模板文件并输出到目标文件
           } catch (TemplateException e) {
               e.printStackTrace();
           } catch (IOException e) {
               e.printStackTrace();
           }
       }
   
       private void getData(Map<String, Object> dataMap) {
           dataMap.put("title", "标题设计");
           dataMap.put("nian", "2016");
           dataMap.put("yue", "3");
           dataMap.put("ri", "6");
           dataMap.put("shenheren", "lc");
           dataMap.put("xwdd", "这是询问地点HHHHHHHHHHHH");
   
           List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
           for (int i = 0; i < 10; i++) {
               Map<String,Object> map = new HashMap<String,Object>();
               map.put("xuehao", i);
               map.put("neirong", "内容"+i);
               list.add(map);
           }
   
   
           dataMap.put("list", list);
       }
   
   }
   ```

9. 查看word

   ![image-20200411214311413](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200411214311413.png)

## 3. 小技巧

### 3.1 如何确定word中的一行

`<w:tr></w:tr>`标签表示word中的表格的一行记录，我们找到`<w:tr></w:tr>`标签，循环就好

![image-20220426164319476](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220426164319476.png)

## 参考文章

[java生成word的几种方案](https://blog.51cto.com/u_15082395/4043560)

[Java使用freemarker生成word文件](https://blog.csdn.net/czx2018/article/details/100894959)
