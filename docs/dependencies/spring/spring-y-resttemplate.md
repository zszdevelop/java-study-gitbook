# springboot使用RestTemplate请求

## 1. 背景

因项目需要请求外部项目接口，apache 的HttpClient有点老了，而且逻辑繁琐，代码复杂，还要自己编写使用类HttpClientUtil，封装对应的post，get，delete等方法。

### 1.1 RestTemple 是什么

RestTemple是Spring提供的用于访问Http请求的客户端，RestTemple提供了多种简洁的远程访问服务的方法，省去了很多无用的代码。

## 2. 集成使用

### 2.1 导入springboot 的 web包

```xml
 <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
```

### 2.2 创建配置类RestTemplateConfig.class

```java

@Configuration
public class RestTemplateConfig {
 
    @Bean
    public RestTemplate restTemplate(ClientHttpRequestFactory factory){
        return new RestTemplate(factory);
    }
 
    @Bean
    public ClientHttpRequestFactory simpleClientHttpRequestFactory(){
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(15000);
        factory.setReadTimeout(5000);
        return factory;
    }
 
}
```

### 2.3 Service类中注入使用

```java
@Service
public class MyService {
 
    @Autowired
    private RestTemplate restTemplate;
 
    public String getInfo(Integer id){
        return restTemplate.getForObject("http://localhost:8080/user?userId="+id,String.class);
    }
}
```

## 3. RestTemplate的命名规范

RestTemplate提供了六种常用的HTTP方法实现远程服务调用，RestTemplate的方法名遵循一定的命名规范，**第一部分表示用哪种HTTP方法调用（get，post），第二部分表示返回类型。**

- getForObject

  ptionsForAllow 分为一组，这类方法是常规的 Rest API（GET、POST、DELETE 等）方法调用；

  - getForObject

    发送GET请求，将HTTP response转换成一个指定的object对象

  - postForEntity

    发送POST请求，将给定的对象封装到HTTP请求体，返回类型是一个HttpEntity对象

- exchange 

  接收一个 `RequestEntity` 参数，可以自己设置 HTTP method，URL，headers 和 body，返回 ResponseEntity；

- execute 

  通过 callback 接口，可以对请求和返回做更加全面的自定义控制。



## 4. RestTemplate 的Http方法

### 4.1 Get 请求

#### 4.1.1 getForEntity

get请求就和正常在浏览器url上发送请求一样

下面是有参数的get请求

```java
@GetMapping("getForEntity/{id}")
public User getById(@PathVariable(name = "id") String id) {
    ResponseEntity<User> response = restTemplate.getForEntity("http://localhost/get/{id}", User.class, id);
    User user = response.getBody();
    return user;
}
```

#### 4.1.2 getForObject

getForObject 和 getForEntity 用法几乎相同,指示返回值返回的是 响应体,省去了我们 再去 getBody() 

```java
@GetMapping("getForObject/{id}")
public User getById(@PathVariable(name = "id") String id) {
    User user = restTemplate.getForObject("http://localhost/get/{id}", User.class, id);
    return user;
}
```

### 4.2 Post请求

#### 4.2.1 postForObject发送JSON格式请求

```java
@SpringBootTest
class PostTests {

   @Resource
   private RestTemplate restTemplate;

   @Test
   void testSimple()  {
      // 请求地址
      String url = "http://jsonplaceholder.typicode.com/posts";

      // 要发送的数据对象
      PostDTO postDTO = new PostDTO();
      postDTO.setUserId(110);
      postDTO.setTitle("zimug 发布文章");
      postDTO.setBody("zimug 发布文章 测试内容");

      // 发送post请求，并输出结果
      PostDTO result = restTemplate.postForObject(url, postDTO, PostDTO.class);
      System.out.println(result);
   }
}
```

#### 4.2.2 postForObject模拟表单数据提交

```java
@Test
public void testForm() {
   // 请求地址
   String url = "http://jsonplaceholder.typicode.com/posts";

   // 请求头设置,x-www-form-urlencoded格式的数据
   HttpHeaders headers = new HttpHeaders();
   headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

   //提交参数设置
   MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
   map.add("title", "zimug 发布文章第二篇");
   map.add("body", "zimug 发布文章第二篇 测试内容");

   // 组装请求体
   HttpEntity<MultiValueMap<String, String>> request =
               new HttpEntity<MultiValueMap<String, String>>(map, headers);

   // 发送post请求，并打印结果，以String类型接收响应结果JSON字符串
   String result = restTemplate.postForObject(url, request, String.class);
   System.out.println(result);
}
```



#### 4.2.3 exchange

```java
@PostMapping("demo")
public void demo(Integer id, String name){
 
        HttpHeaders headers = new HttpHeaders();//header参数
        headers.add("authorization",Auth);
        headers.setContentType(MediaType.APPLICATION_JSON);
 
        JSONObject obj = new JSONObject();//放入body中的json参数
        obj.put("userId", id);
        obj.put("name", name);
 
        HttpEntity<JSONObject> request = new HttpEntity<>(content,headers); //组装
  
        ResponseEntity<String> response = template.exchange("http://localhost:8080/demo",HttpMethod.POST,request,String.class);
    }

```

### 4.3 文件上传

```java
public Object uplaod(@RequestBody JSONObject params) throws Exception{

       final String url = "http://localhost:8888/hello/m3";
        // 设置请求头
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        // 设置请求体，注意是 LinkedMultiValueMap
        // 下面两个流从文件服务下载，这边省略（注意最后关闭流）
        InputStream fis1 = 
        InputStream fis2 = 

        InMemoryResource resource1 = new InMemoryResource("file1.jpg","description1", FileCopyUtils.copyToByteArray(fis1), System.currentTimeMillis());
        InMemoryResource resource2 = new InMemoryResource("file2.jpg","description2", FileCopyUtils.copyToByteArray(fis2), System.currentTimeMillis());
        MultiValueMap<String, Object> form = new LinkedMultiValueMap<>();
        form.add("file", resource1);
        form.add("file", resource2);
        form.add("param1","value1");

        HttpEntity<MultiValueMap<String, Object>> files = new HttpEntity<>(form, headers);
        JSONObject s = restTemplate.postForObject(url, files, JSONObject.class);
        return s;
    }
```



## 5. exchange 和execute 

### 5.1 exchange

exchange(String url, HttpMethod method,@Nullable HttpEntity<?> requestEntity, Class responseType, Map map)

#### 5.1.1 参数说明

- url：请求路径
- method：请求的方法（GET、POST、PUT等）
- requestEntity：HttpEntity对象，封装了请求头和请求
- responseType：返回数据类型
- uriVariables：支持PathVariable类型的数据

### 5.1.2 请求示例

```java
private String getId(String id) {
        String url = RemoteUrl + "/id";
        //设置Http的Header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);

		//设置访问参数
        HashMap<String, Object> params = new HashMap<>();
        params.put("name", name);
        
		//设置访问的Entity
        HttpEntity entity = new HttpEntity<>(params, headers);
        ResponseEntity<String> result = null;
        try {
        	//发起一个POST请求
            result = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            JSONObject data = JSONObject.parseObject(result.getBody()).getJSONObject("data");
            return data.getString("id");
        } catch (Exception e) {
            logger.error("获取id失败： " + e.getMessage());
        }
        return null;
    }
```


## 参考文章

[springboot 2.0 整合 RestTemplate 与使用教程](https://blog.csdn.net/weixin_40461281/article/details/83540604)

[RestTemplate使用实战-exchange方法讲解](https://blog.csdn.net/zxh1991811/article/details/102744155)

