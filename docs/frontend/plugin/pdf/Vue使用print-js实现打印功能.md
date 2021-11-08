# Vue使用print-js实现打印功能

## 1. 官网地址

[https://printjs.crabbly.com/](https://printjs.crabbly.com/)

## 2. 下载

```
npm install print-js --save
```

## 3. 导入

在main.js 中全局导入

```js
import printjs from 'print-js'

import 'print-js/dist/print.css';

Vue.prototype.$print = printjs;

```

## 4. 使用

```js
<template>
  <div id="printBox">
    <img src="@/assets/resources/images/zuyoulogo.png" alt="">
    <img src="@/assets/logo.png" alt="">
    <h1>abc</h1>
    <div style="page-break-after:always;">分页1</div>
    <div style="page-break-after:always;">分页2</div>
    <div style="page-break-after:always;">分页3</div>
    <div style="page-break-after:always;">分页4</div>
  </div>
  <a-button @click="printHTML">打印HTML</a-button>

  <a-button @click="printPDF">打印PDF</a-button>

  <a-button @click="printImg">打印图片</a-button>

  <a-button @click="printJSON">打印JSON</a-button>

</template>
<script>
export default {
  data() {
    return {
      printUrl: '',
      printUrl2: '',
      someJSONdata: [
        {
          name: 'John Doe',
          email: 'john@doe.com',
          phone: '111-111-1111'
        },
        {
          name: 'Barry Allen',
          email: 'barry@flash.com',
          phone: '222-222-2222'
        },
        {
          name: 'Cool Dude',
          email: 'cool@dude.com',
          phone: '333-333-3333'
        }
      ]
    }
  },
  methods: {
    printHTML() {
      this.$print({
      	printable: 'printBox',
        type: 'html',
        header: '打印标题',
        targetStyles: ['*'], // 打印内容使用所有HTML样式，没有设置这个属性/值，设置分页打印没有效果
      })
    },
    printJSON() {
      this.$print({printable: this.someJSONdata, properties: ['name', 'email', 'phone'], type: 'json'})
    },
    printPDF() {
      this.$print({printable: 'docs/xx_large_printjs.pdf', type: 'pdf'})
    },
    printImg() {
      this.$print({
      	printable: this.printUrl, // 也可设置清晰度比html绑定更高精度的图片
        type: 'image'
      });
      this.$print({
      	printable: [this.printUrl, this.printUrl2], // 打印多张图片
        type: 'image'
      });
    },
  }
};
</script>

```

## 5. 具体参数

| 参数                           | 默认值                                              | 说明                                                         |
| ------------------------------ | --------------------------------------------------- | ------------------------------------------------------------ |
| printable                      | null                                                | 文档来源：pdf或图像的url，html元素的id或json数据的对象       |
| type                           | PDF                                                 | 可打印类型。可用的打印选项包括：pdf，html，image，json和raw-html。 |
| header                         | null                                                | 用于HTML，Image或JSON打印的可选标头。它将放在页面顶部。此属性将接受文本或原始HTML |
| headerStyle                    | 'font-weight：300;'                                 | 要应用于标题文本的可选标题样式                               |
| maxWidth                       | 800                                                 | 最大文档宽度（像素）。根据需要更改此项。在打印HTML，图像或JSON时使用。 |
| css                            | null                                                | 这允许我们传递一个或多个应该应用于正在打印的html的css文件URL。值可以是包含单个URL的字符串，也可以是包含多个URL的数组。 |
| style                          | null                                                | 这允许我们传递一个字符串，该字符串应该应用于正在打印的html。 |
| scanStyles                     | true                                                | 设置为false时，库不会处理应用于正在打印的html的样式。使用css参数时很有用。 |
| targetStyle                    | null                                                | 默认情况下，在打印HTML元素时，库仅处理某些样式。此选项允许您传递要处理的样式数组。例如：['padding-top'，'border-bottom'] |
| targetStyles                   | null                                                | 与targetStyle相同，这将处理任何一系列样式。例如：['border'，'padding']，将包括'border-bottom'，'border-top'，'border-left'，'border-right'，'padding-top'等。你也可以传递['*']来处理所有样式 |
| ignoreElements                 | []                                                  | 接受打印父html元素时应忽略的html的id数组。                   |
| properties                     | null                                                | 在打印JSON时使用。这些是对象属性名称。                       |
| gridHeaderStyle                | 'font-weight：bold;'                                | 打印JSON数据时网格标题的可选样式。                           |
| gridStyle                      | 'border: 1px solid lightgray; margin-bottom: -1px;' | 打印JSON数据时网格行的可选样式                               |
| repeatTableHeader              | true                                                | 在打印JSON数据时使用。设置为时false，数据表标题仅显示在第一页中。 |
| showModal                      | null                                                | 启用此选项可在检索或处理大型PDF文件时显示用户反馈            |
| modalMessage                   | 'Retrieving Document...'                            | 当向用户显示的消息showModal被设定为true。                    |
| onLoadingStart                 | null                                                | 加载PDF时要执行的功能                                        |
| onLoadingEnd                   | null                                                | 加载PDF后要执行的功能                                        |
| documentTitle                  | 'Document'                                          | 打印html，image或json时，它将显示为文档标题。如果用户尝试将打印作业保存为pdf文件，它也将是文档的名称。 |
| fallbackPrintable              | null                                                | 打印pdf时，如果浏览器不兼容（检查浏览器兼容性表），库将在新选项卡中打开pdf。这允许您传递要打开的不同pdf文档，而不是传递给printable的原始文档。如果您在备用pdf文件中注入javascript，这可能很有用。 |
| onPdfOpen                      | null                                                | 打印pdf时，如果浏览器不兼容（检查浏览器兼容性表），库将在新选项卡中打开pdf。可以在此处传递回调函数，这将在发生这种情况时执行。在您想要处理打印流程，更新用户界面等的某些情况下，它可能很有用。 |
| onPrintDialogClose             | null                                                | 关闭浏览器打印对话框后执行回调功能                           |
| onError                        | error => throw error                                | 发生错误时要执行的回调函数。                                 |
| base64                         | false                                               | 在打印作为base64数据传递的PDF文档时使用                      |
| honorMarginPadding(不建议使用) | true                                                | 这用于保留或删除正在打印的元素的填充和边距。有时这些样式设置在屏幕上很棒，但在打印时看起来很糟糕。您可以通过将其设置为false来删除它。 |
| honorColor(不建议使用)         | false                                               | 要以彩色打印文本，请将此属性设置为true。默认情况下，所有文本都将以黑色打印。 |
| font(不建议使用)               | 'TimesNewRoman'                                     | 打印HTML或JSON时使用的字体                                   |
| font_size(不建议使用)          | '12pt'                                              | 打印HTML或JSON时使用的字体大小                               |
| imageStyle (不建议使用)        | 'width:100%;'                                       | 打印图像时使用。接受包含要应用于每个图像的自定义样式的字符串。 |
| frameId                        | null                                                | print.js会将要打印的内容复制到一个新的Frame中,此参数是frame的id值 |

## 6. 参考文章

[Vue使用print-js实现打印功能](https://juejin.cn/post/6888519415717953549)

