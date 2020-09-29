# Swagger的使用

## 1.集成

### 1.1 引入依赖包

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

### 1.2. 配置Swagger

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Value("${swagger.show}")
    private boolean swaggerShow;


    @Bean
    public Docket createRestApi() {

        return new Docket(DocumentationType.SWAGGER_2)
                .enable(swaggerShow)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ylzinfo.appfactory"))
                .paths(PathSelectors.any())
                .build()
                .securitySchemes(securitySchemes())
                .securityContexts(securityContexts());
    }

    /**
     * 配置认证模式
     */
    private List<ApiKey> securitySchemes() {
        return newArrayList(new ApiKey("Authorization", "Authorization", "header"));
    }

    /**
     * 配置认证上下文
     */
    private List<SecurityContext> securityContexts() {
        return newArrayList(SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(PathSelectors.any())
                .build());
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return newArrayList(new SecurityReference("Authorization", authorizationScopes));
    }

    /**
     * 项目信息
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("App管理平台 RESTful APIs")
                .version("1.0")
                .build();
    }
}
```

在application.yml 设置是否启动swagger

```
swagger:
    show: true
```

### 1.3 打开swagger地址

http://localhost:9710/swagger-ui.html

## 2. 使用

### 2.1 @API注解

1. tags：可以使用tags()允许您为操作设置多个标签的属性，而不是使用该属性。

2. description：可描述描述该类作用。

例如：

```java
@RequestMapping("appfactory/index")
@Api(value = "首页工厂", tags = {"首页工厂标签"}, description = "app首页工厂描述")
public class IndexFactoryController {
  
}
```

### 2.2 @ApiImplicitParam：

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

### 2.3 @ApiImplicitParams：

用于方法，包含多个 @ApiImplicitParam：
例：

```
@ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "book's name", required = true, dataType = "Long", paramType = "query"),
            @ApiImplicitParam(name = "date", value = "book's date", required = false, dataType = "string", paramType = "query")})
```

### 2.4 @ApiModel：

用于类，表示对类进行说明，用于参数用实体类接收；

### 2.5 @ApiModelProperty：

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
### 2.6 @ApiOperation：

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
### 2.7 @ApiResponse：

用于方法，描述操作的可能响应。

### 2.8 @ApiResponses：

用于方法，一个允许多个ApiResponse对象列表的包装器。
例：

```java
@ApiResponses(value = { 
            @ApiResponse(code = 500, message = "2001:因输入数据问题导致的报错"),
            @ApiResponse(code = 500, message = "403:没有权限"),
            @ApiResponse(code = 500, message = "2500:通用报错（包括数据、逻辑、外键关联等，不区分错误类型）")})
```

### 2.9 @ApiParam：

用于方法，参数，字段说明，表示对参数的添加元数据（说明或是否必填等）

### 2.10 @Authorization：

声明要在资源或操作上使用的授权方案。

### 2.11 @AuthorizationScope：

介绍一个OAuth2授权范围。

### 2.12 @ResponseHeader：

响应头设置，使用方法。

## 参考文章

[SwaggerAPI注解详解,以及注解常用参数配置](https://blog.csdn.net/java_yes/article/details/79183804)