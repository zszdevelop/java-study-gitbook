# Servlet

## 1.简介

在Java Web程序中，Servlet 主要负责接收用户请求HttpServletRequest,在doGet()，doPost() 中做相应的处理，并将回应HttpServletResponse反馈给用户

- 一个Servlet类只会有一个实例，在他初始化时调用init方法，销毁时调用destory()方法
- Servlet需要在web.xml中配置。一个servlet可以设置多个url访问
- servlet 不是线程安全，因此谨慎使用类变量



## 2.Servlet 接口 

Servlet 接口定义了5个方法，其中init,service,destory 与Servlet 的周明周期有关

```
public interface Servlet {
    void init(ServletConfig config) throws ServletException;

    void service(ServletRequest req, ServletResponse resp) throws ServletException, IOException;

    void destroy();
  
    String getServletInfo();
    
    ServletConfig getServletConfig();
}
```

## 3. Servlet 生命周期

Web容器加载Servlet 并将其实例化后，Servlet 生命周期开始

1. init()：容器运行期init()方法进行Servlet的初始化

   初始化资源

2. service()： 请求到达时调用Servlet 的service() 方法,service() 方法会根据需要调用与请求对象的doGet 或doPost等方法

3. destory()： 当服务器关闭或项目被卸载时服务器将Servlet 实例销毁，此时会调用Servlet 的destory()

   销毁资源

### 特点

1. 其中init() 和destory（）方法只会执行一次，

2. service 方法客户端每次请求Servlet 都会执行

## 4. Servlet 与线程安全

**Servlet 不是线程安全的，多线程并发的读写会导致数据不同步的问题**

### 4.1 解决办法

1. 尽量不要定义name属性（成员变量），而是要把name变量分别定义在doGet()和doPost（）方法内。

2. synchronized(name){} 语句块可以解决问题，但会造成线程等待，不是很科学

注：写数据才会导致线程安全，数据不同步的问题。因此Servlet 里的只读属性最好定义成final类型