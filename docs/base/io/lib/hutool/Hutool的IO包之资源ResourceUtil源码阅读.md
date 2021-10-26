# Hutool的IO包之资源ResourceUtil源码阅读

## 1. 简介

资源（Resource）在Hutool中是一个广泛的概念，凡是存储数据的地方都可以归类到资源，那为何要提供一个如此抽象的接口呢？

在实际编码当中，我们需要读取一些数据，比如配置文件、文本内容、图片甚至是任何二进制流，为此我们要加入很多的重载方法，比如：

```java
read(File file){...}

read(InputStream in){...}

read(byte[] bytes){...}

read(URL url){...}
```

等等如此，这样会造成整个代码变得非常冗余，查找API也很费劲。其实无论数据来自哪里，最终目的是，我们想从这些地方读到byte[]或者String。那么，我们就可以抽象一个Resource接口，让代码变得简单：

```java
read(Resource resource){...}Copy to clipboardErrorCopied
```

用户只需传入Resource的实现即可。

## 2. 定义

常见的，我们需要从资源中获取流（getStream），获取Reader来读取文本（getReader），直接读取文本（readStr），于是定义如下：

```java
public interface Resource {
    String getName();
    URL getUrl();
    InputStream getStream();
    BufferedReader getReader(Charset charset);
    String readStr(Charset charset);
}Copy to clipboardErrorCopied
```

定义了Resource，我们就可以预定义一些特别的资源：

- `BytesResource` 从byte[]中读取资源
- `InputStreamResource` 从流中读取资源
- `StringResource` 从String中读取资源
- `UrlResource` 从URL中读取资源
- `FileResource` 从文件中读取资源
- `ClassPathResource` 从classpath（src/resources下）中读取资源
- `WebAppResource` 从web root中读取资源
- `MultiResource` 从多种资源中混合读取资源
- `MultiFileResource` 从多个文件中混合读取资源

当然，我们还可以根据业务需要自己实现Resource接口，完成自定义的资源读取。

## 3. ClassPathResource

我们最常用的莫过于ClassPathResource， 可以从classpath（src/resources下）中读取资源

```
ClassPathResource resource = new ClassPathResource("test.properties");
```

### 3.1 源码

![image-20211016215313217](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211016215313217.png)

![image-20211016215259180](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211016215259180.png)

根据给定资源初始化url

![image-20211016215338466](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211016215338466.png)