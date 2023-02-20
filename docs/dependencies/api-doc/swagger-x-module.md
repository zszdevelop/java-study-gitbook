# Swagger分模块

## 1. 背景

我们在使用swagger的时候，如果接口非常多的时候，我们的接口列表是非常庞大的。要查找一个接口并不容易。我们希望能按模块划分

### 1.1 初始情况

![image-20211026093522355](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026093522355.png)

默认情况模块只有一个default

## 2. 实现步骤

```java
@Configuration
public class SwaggerConfig
{
   
   ...
   
    /**
     * 创建API
     */
    @Bean
    public Docket createRestApi()
    {
        return new Docket(DocumentationType.OAS_30)
                .groupName("XXAPI接口")
                // 是否启用Swagger
                .enable(enabled)
                // 用来创建该API的基本信息，展示在文档的页面中（自定义展示的信息）
                .apiInfo(apiInfo())
                // 设置哪些接口暴露给Swagger展示
                .select()
                // 扫描所有有注解的api，用这种方式更灵活
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                // 扫描指定包中的swagger注解
                // .apis(RequestHandlerSelectors.basePackage("com.ygn.project.tool.swagger"))
                // 扫描所有 .apis(RequestHandlerSelectors.any())
//                .paths(PathSelectors.any())
                .paths(PathSelectors.ant("/xx/**"))
                .build()
                /* 设置安全模式，swagger可以设置访问token */
                .securitySchemes(securitySchemes())
                .securityContexts(securityContexts())
                .pathMapping(pathMapping);
    }

    /**
     * 创建API
     */
    @Bean("system")
    public Docket createSystemRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("系统API接口")
                // 是否启用Swagger
                .enable(enabled)
                // 用来创建该API的基本信息，展示在文档的页面中（自定义展示的信息）
                .apiInfo(apiInfo())
                // 设置哪些接口暴露给Swagger展示
                .select()
                // 扫描所有有注解的api，用这种方式更灵活
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                // 扫描指定包中的swagger注解
//                .apis(RequestHandlerSelectors.basePackage("com.fardu.jd"))
                // 扫描所有
                // .apis(RequestHandlerSelectors.any())
//                .paths(PathSelectors.any())
                .paths(PathSelectors.ant("/system/**"))
                .build()
                /* 设置安全模式，swagger可以设置访问token */
                .securitySchemes(securitySchemes())
                .securityContexts(securityContexts())
                .pathMapping(pathMapping);
    }

	...
}
```

- @Bean("system") : 实例化多个`docket`
- groupName:  指定该模块名称
- paths：指定该模块要扫码的路径

![image-20211026094024020](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211026094024020.png)

## 3. Docket模块支持多个包

### 3.1 使用PathSelectors.regex

```
.paths(PathSelectors.regex("/api/.*|/test/.*"))
```

