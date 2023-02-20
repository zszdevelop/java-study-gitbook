# Swagger的使用

## 1. 简介

> Swagger 是一个规范和完整的框架，用于生成、描述、调用和可视化 RESTful 风格的 Web 服务的接口文档。

 *1. 接口的文档在线自动生成。*

 *2. 功能测试。*

## 2.集成

### 2.1 引入依赖包

```xml
 <properties>
       ...
        <swagger.version>2.7.0</swagger.version>
 </properties>

<!-- swagger2 -->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>${swagger.version}</version>
</dependency>

<!-- swagger2 ui -->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>${swagger.version}</version>
</dependency>
```

### 2.2. 配置Swagger

```java
/**
 * Swagger2的接口配置
 * 
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig
{
    /** 系统基础配置 */
    @Autowired
    private FarduConfig ruoyiConfig;

    /** 是否开启swagger */
    @Value("${swagger.enabled}")
    private boolean enabled;

    /** 设置请求的统一前缀 */
    @Value("${swagger.pathMapping}")
    private String pathMapping;

    /**
     * 创建API
     */
    @Bean
    public Docket createRestApi()
    {
        return new Docket(DocumentationType.SWAGGER_2)
                // 是否启用Swagger
                .enable(enabled)
                // 用来创建该API的基本信息，展示在文档的页面中（自定义展示的信息）
                .apiInfo(apiInfo())
                // 设置哪些接口暴露给Swagger展示
                .select()
                // 扫描所有有注解的api，用这种方式更灵活
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                // 扫描指定包中的swagger注解
                // .apis(RequestHandlerSelectors.basePackage("com.fardu.project.tool.swagger"))
                // 扫描所有 .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                /* 设置安全模式，swagger可以设置访问token */
                .securitySchemes(securitySchemes())
                .securityContexts(securityContexts())
                .pathMapping(pathMapping);
    }

    /**
     * 安全模式，这里指定token通过Authorization头请求头传递
     */
    private List<ApiKey> securitySchemes()
    {
        List<ApiKey> apiKeyList = new ArrayList<ApiKey>();
        apiKeyList.add(new ApiKey("Authorization", "Authorization", "header"));
        return apiKeyList;
    }

    /**
     * 安全上下文
     */
    private List<SecurityContext> securityContexts()
    {
        List<SecurityContext> securityContexts = new ArrayList<>();
        securityContexts.add(
                SecurityContext.builder()
                        .securityReferences(defaultAuth())
                        .forPaths(PathSelectors.regex("^(?!auth).*$"))
                        .build());
        return securityContexts;
    }

    /**
     * 默认的安全上引用
     */
    private List<SecurityReference> defaultAuth()
    {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        List<SecurityReference> securityReferences = new ArrayList<>();
        securityReferences.add(new SecurityReference("Authorization", authorizationScopes));
        return securityReferences;
    }

    /**
     * 添加摘要信息
     */
    private ApiInfo apiInfo()
    {
        // 用ApiInfoBuilder进行定制
        return new ApiInfoBuilder()
                // 设置标题
                .title("标题：管理系统_接口文档")
                // 描述
                .description("描述：用于管理集团旗下公司的人员信息,具体包括XXX,XXX模块...")
                // 作者信息
                .contact(new Contact(ruoyiConfig.getName(), null, null))
                // 版本
                .version("版本号:" + ruoyiConfig.getVersion())
                .build();
    }
}

```

在application.yml 设置是否启动swagger

```
swagger:
    show: true
```

#### 2.2.1 配置介绍

- apiInfo：api基本信息的配置，信息会在api文档上显示，可有选择的填充，比如配置文档名称、项目版本号等

- apis：使用什么样的方式来扫描接口，RequestHandlerSelectors下共有五种方法可选。

  ```java
  // 1.扫描所有包下的
  .apis(RequestHandlerSelectors.any())
  
  // 2.扫描base包形式
  .apis(RequestHandlerSelectors.basePackage("com.ylzinfo.appfactory"))
  // 2.1 多包扫描base包形式
  .apis(basePackage("com.example.demo.controller;com.example.demo.test"))
  
  // 3.扫描带有对应注解的方式
  // 3.1带有@Api注解
  .apis(RequestHandlerSelectors.withClassAnnotation(Api.class))
  // 3.2 带有@ApiOperation 注解，这种方式最灵活推荐
  .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
  
  
  ```

  

- path：扫描接口的路径，PathSelectors下有四种方法

  ```java
  // any() --- 匹配所有的路径
  // ant() --- 匹配传入参数的
  // regex() --- 通过正则表达式匹配路径
paths(PathSelectors.any())
  ```
  
  

### 2.3 打开swagger地址

http://localhost:9710/swagger-ui.html

## 3. 简单使用

###  3.1 Controller 配置

```java
@RequestMapping("appfactory/index")
@Api(value = "首页工厂", tags = {"首页工厂标签"}, description = "app首页工厂描述")
public class IndexFactoryController {
 
    @ApiOperation(value="查看列表")
    @GetMapping("/list")
    public Result<MyDomain> list(MyDomain domain) {
       
}
```

### 3.2 实体类配置

参数的注解设置

```java
@ApiModel("我实体类")
public class MyDomain {
     @ApiModelProperty(value = "id")
    private String id;

    @ApiModelProperty(value = "名称")
    private String name;
}
```

### 3.3 返回结果配置

返回配置需要使用泛型，并将泛型返回才行

例如：`Result<MyDomain>`

```java
@Data
public class Result<T> {

    @ApiModelProperty("代码")
    private Integer code;

    @ApiModelProperty("信息")
    private String msg;

    @ApiModelProperty("数据")
    private T data;
}
```



## 4.相关注解

### 4.1 @API注解

1. tags：可以使用tags()允许您为操作设置多个标签的属性，而不是使用该属性。

2. description：可描述描述该类作用。

例如：

```java
@RequestMapping("appfactory/index")
@Api(value = "首页工厂", tags = {"首页工厂标签"}, description = "app首页工厂描述")
public class IndexFactoryController {
  
}
```

### 4.2 @ApiImplicitParam：

作用在方法上，表示单独的请求参数
参数：
1. name ：参数名。
2. value ： 参数的具体意义，作用。
3. required ： 参数是否必填。
4. dataType ：参数的数据类型。
5. paramType ：查询参数类型，这里有几种形式：

| 类型   | 作用                            |
| ------ | ------------------------------- |
| path   | 以地址的形式提交数据            |
| query  | 直接跟参数完成自动映射赋值      |
| body   | 以流的形式提交 仅支持POST       |
| header | 参数在request headers 里边提交  |
| form   | 以form表单的形式提交 仅支持POST |

### 4.3 @ApiImplicitParams：

用于方法，包含多个 @ApiImplicitParam：
例：

```
@ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "book's name", required = true, dataType = "Long", paramType = "query"),
            @ApiImplicitParam(name = "date", value = "book's date", required = false, dataType = "string", paramType = "query")})
```

### 4.4 @ApiModel：

用于类，表示对类进行说明，用于参数用实体类接收；

### 4.5 @ApiModelProperty：

用于方法，字段 ，表示对model属性的说明或者数据操作更改
例：

```java
@ApiModel(value = "User", description = "用户")
public class User implements Serializable{

private static final long serialVersionUID = 1546481732633762837L;

/**
 * 用户ID
 */
@ApiModelProperty(value = "用户ID", required = true)
@NotEmpty(message = "{id.empty}", groups = {Default.class,New.class,Update.class})
protected String id;

/**
 * code/登录帐号
 */
@ApiModelProperty(value = "code/登录帐号")
@NotEmpty(message = "{itcode.empty}", groups = {Default.class,New.class,Update.class})
protected String itcode;

/**
 * 用户姓名
 */
@ApiModelProperty(value = "用户姓名")
@NotEmpty(message = "{name.empty}", groups = {Default.class,New.class,Update.class})
protected String name;
}
```
### 4.6 @ApiOperation：

用于方法，表示一个http请求的操作 。

```java
@ApiOperation(value = "获取图书信息", notes = "获取图书信息", response = Book.class, responseContainer = "Item", produces = "application/json")
@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "book's name", required = true, dataType = "Long", paramType = "query"),
        @ApiImplicitParam(name = "date", value = "book's date", required = false, dataType = "string", paramType = "query")})
@RequestMapping(value = "/{id}", method = RequestMethod.GET)
@ResponseBody
public Book getBook(@PathVariable Long id, String date) {
    return books.get(id);
}
```
### 4.7 @ApiResponse：

用于方法，描述操作的可能响应。

### 4.8 @ApiResponses：

用于方法，一个允许多个ApiResponse对象列表的包装器。
例：

```java
@ApiResponses(value = { 
            @ApiResponse(code = 500, message = "2001:因输入数据问题导致的报错"),
            @ApiResponse(code = 500, message = "403:没有权限"),
            @ApiResponse(code = 500, message = "2500:通用报错（包括数据、逻辑、外键关联等，不区分错误类型）")})
```

### 4.9 @ApiParam：

用于方法，参数，字段说明，表示对参数的添加元数据（说明或是否必填等）

### 4.10 @Authorization：

声明要在资源或操作上使用的授权方案。

### 4.11 @AuthorizationScope：

介绍一个OAuth2授权范围。

### 4.12 @ResponseHeader：

响应头设置，使用方法。



## 参考文章

[SwaggerAPI注解详解,以及注解常用参数配置](https://blog.csdn.net/java_yes/article/details/79183804)

[spring boot 之使用Swagger配置详解](https://blog.csdn.net/qq1515312832/article/details/103212461)