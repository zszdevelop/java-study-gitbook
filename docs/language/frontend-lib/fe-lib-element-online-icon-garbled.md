# 线上element的字体图标乱码

## 1. 现象

本地开发测试都没有问题，部署到线上环境图标第一次显示不出来

## 2. 问题原因

dart-sass编译时会将对应的unicode编码转换成对应unicode明文，所以通过伪元素来展示的图标如el-icon-arrow:before{ content: "\e6df"}，编译之后就变成了el-icon-arrow:before{ content: ""}，“”便是一个双字节字符



- 正常情况我们会在meta标签上设置：`<meta charset="utf-8" >`，**但这只对HTML内容解析有效，**
- 对于css内容中(外部样式表下)的双字节字符（如中文）解析并没有作用的，所以如果浏览器请求回来的css资源的HTTP响应头里的Content-Type未指明"charset=utf-8"的话，浏览器根据自身的嗅探机制来决定采用哪一种编码解析，结果就会概率出现双字节字符乱码的情况

## 3. 解决方法

### 3.1 改为node-sass编译(亲测有效)

element-ui采用的时node-sass编译，可以把dart-sass换成node-sass，但是官网主推dart-sass，dart-sass会是未来主流

### 3.2 css 增加"charset=utf-8"响应头

让css资源请求的响应头的Content-Type增加"charset=utf-8"声明，因为涉及到后端，所以具体笔者没试验过，不知道可不可行。

### 3.3 设置sassOptions不压缩

因为 sass-loader 会检查运行环境的模式，给 dart-sass 传入 `{ outputStyle: "compressed" }`。 dart-sass 在这时会使用 BOM 而不是输出 `@charset`。

如果是通过 @vue/cli 搭建的环境，因为有 cssnano 处理压缩，所以可以给 vue.config.js 传入 sassOptions 避免 compressed。

```java
module.exports = { 
  css: {
    loaderOptions: {
      sass: {
        sassOptions: { outputStyle: "expanded" }
      }
    }
  }
}
```

## 参考文章

[dart-sass编译element-ui打包出来的icon乱码的解决方案](https://www.cnblogs.com/shandou/p/14867943.html)

[用最新的框架，打包出来element的字体图标乱码了？](https://github.com/PanJiaChen/vue-element-admin/issues/3526)