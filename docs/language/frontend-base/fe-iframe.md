# iframe

## 1.简介

在页面嵌套iframe标签，指定src就可以展示一个外部的url

```html
<iframe src="www.baidu.com"></iframe>
```

iframe 标签功能强大，但也是能耗最高的一个原生，安全性也差。在使用时要权衡使用

## 2. 基础使用

基础使用

```html
<iframe src="www.baidu.com"></iframe>
```

常用属性

```
1.frameborder:是否显示边框，1(yes),0(no)

2.height:框架作为一个普通元素的高度，建议在使用css设置。

3.width:框架作为一个普通元素的宽度，建议使用css设置。

4.name:框架的名称，window.frames[name]时专用的属性。

5.scrolling:框架的是否滚动。yes,no,auto。

6.src：内框架的地址，可以使页面地址，也可以是图片的地址。
```

## 2. 重新加载iframe

```js
let pdfIframe = this.$refs.pdfIframe;
pdfIframe.contentWindow.location.reload(true);
```

## 参考文章

[iframe,我们来谈一谈](https://segmentfault.com/a/1190000004502619)