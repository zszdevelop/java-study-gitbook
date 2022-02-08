# Skywalking插件

## 1. 简介

Java Agent是插件化、可插拔的。Skywalking的插件分为三种：

- 引导插件：在agent的 `bootstrap-plugins` 目录下
- 内置插件：在agent的 `plugins` 目录下
- 可选插件：在agent的 `optional-plugins` 目录下

<img src="https://gitee.com/zszdevelop/blogimage/raw/master/image-20211128180952720.png" alt="image-20211128180952720" style="zoom:67%;" />

**Java Agent只会启用 `plugins` 目录下的所有插件，`bootstrap-plugins` 目录以及 `optional-plugins` 目录下的插件不会启用**。Java Agent只会启用 `plugins` 目录下的所有插件，`bootstrap-plugins` 目录以及 `optional-plugins` 目录下的插件不会启用

## 2. 插件生态

### 2.1 内置插件

内置插件主要用来为业界主流的技术与框架提供支持。所支持的技术&框架，

### 2.2 引导插件

目前只有两款引导插件：

- `apm-jdk-http-plugin` 用来是监测HttpURLConnection；
- `apm-jdk-threading-plugin` 用来监测Callable以及Runnable；

### 2.3 可选插件

### 2.4 插件扩展

Skywalking生态还有一些插件扩展，例如Oracle、Resin插件等。这部分插件主要是由于许可证不兼容/限制，Skywalking无法将这部分插件直接打包到Skywalking安装包内，于是托管在这个地址： `https://github.com/SkyAPM/java-plugin-extensions` ，使用方式：

- 前往 `https://github.com/SkyAPM/java-plugin-extensions/releases` ，下载插件JAR包
- 将JAR包挪到 `plugins` 目录即可启用。

## 参考文章

[Skywalking系列博客3-Java Agent插件](https://www.itmuch.com/skywalking/java-agent/)