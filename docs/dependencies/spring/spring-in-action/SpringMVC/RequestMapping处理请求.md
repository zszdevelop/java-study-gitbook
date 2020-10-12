# RequestMapping处理请求

在Spring MVC 中，控制器只是方法上添加了@RequestMapping注解的类，这个注解申明了他们所要处理的请求

```
@Controller  //声明为一个控制器
public class HomeController {
    
    @RequestMapping(value = "/",method = RequestMethod.GET)// 处理对"/"的get请求
    public String home(){
        return "home";//视图名为hone
    }
    
}
```

- @Controller 注解

  - 看起来是用来声明控制器的，但实际上这个注解对Spring MVC本身的影响并不大

  - 是一个构造性（stereotype）的注解，他基于@Component注解，目的是辅助实现组件扫描

- @RequestMapping

  - value 属性：指定了这个方法所要处理的请求路径
  - method属性：细化了他要处理的HTTP方法

## 2.传递模型数据到视图中

Model是我们需要返回给用户的结果信息

Model实际上就是一个Map(也可以用map)，他会传递给视图，这样数据就能渲染到客户端



