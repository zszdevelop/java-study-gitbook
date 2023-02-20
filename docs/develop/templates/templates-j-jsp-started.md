# SpringBoot集成JSP

## 1. 项目集成

1. 添加依赖

   ```xml
      <!-- jsp -->
           <dependency>
               <groupId>javax.servlet</groupId>
               <artifactId>jstl</artifactId>
           </dependency>
           <dependency>
               <groupId>org.apache.tomcat.embed</groupId>
               <artifactId>tomcat-embed-jasper</artifactId>
   <!--            <scope>provided</scope>-->
           </dependency>
   ```

   切记要注释掉`<scope>provided</scope>`，网上很多教程都添加了该字段，最终导致用springboot main方法启动，访问一直404。

2. 修改配置文件

   在`application.properties`配置文件中添加jsp相关配置:

   ```
   spring.mvc.view.prefix=/WEB-INF/jsp/
   spring.mvc.view.suffix=.jsp
   ```

3. 创建jsp文件

   1. 在`src/main`下创建`webapp/WEB-INF/jsp`文件夹。

      创建的webapp会有个小蓝点的特殊标识。如没有请配置

      ![image-20201012095417642](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20201012095417642.png)

2. 在`jsp`文件夹下创建`index.jsp`

   ```jsp
   
   <!DOCTYPE html>
   
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Hello</title>
   </head>
   <body>
   Hello,${name}
   </body>
   </html>
   ```

![image-20201012100215862](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20201012100215862.png)

4. 创建controller

   ```
   @Controller
   @RequestMapping("/")
   public class IndexController {
       
       @GetMapping("/")
       public String index(Model model){
           model.addAttribute("name", "jsp测试");
           return "index";
       }
   
   }
   ```

5. 启动服务

   - 以SpringBoot 的方式启动（大部分项目都以这种方式启动，所以移除 `<scope>provided</scope>`）

     ```java
     @SpringBootApplication
     public class JspDemoApplication  extends SpringBootServletInitializer {
     
         @Override
         protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
             // 注意这里要指向原先用main方法执行的Application启动类
             return builder.sources(JspDemoApplication.class);
         }
     
         public static void main(String[] args) {
             SpringApplication.run(JspDemoApplication.class, args);
         }
     }
     
     ```

     

   - 通过spring-boot:run启动服务,idea里直接双击即可:

     ![image-20201012100720902](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20201012100720902.png)

## 2. 常见问题

### 2.1 webapp 没有标识

参考如下图配置

![image-20201012095417642](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20201012095417642.png)

### 2.2 JSP访问404

引入依赖时 `<scope>provided</scope>` 没有注释掉，IntelliJ IDEA不会将的依赖注入到类路径中,

```
 <dependency>
 <groupId>org.apache.tomcat.embed</groupId>
            <artifactId>tomcat-embed-jasper</artifactId>
<!--            <scope>provided</scope>-->
        </dependency>
```



## 参考文章

[Spring Boot教程(十)：Spring Boot集成jsp](https://blog.csdn.net/gnail_oug/article/details/80237871)

[SpringBoot集成Jsp出错（404）](https://my.oschina.net/u/2382040/blog/1799102)