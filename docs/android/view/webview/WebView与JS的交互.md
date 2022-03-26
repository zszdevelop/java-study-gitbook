# WebView与JS的交互

交互主要分

- [Android调用js方法](./Android调用js方法.md)
- [js调用Android方法](./Js调用Android方法.md)

他们都是通过WebView来做他们之间的桥梁



**对于Android调用JS代码的方法有2种：**

1. 通过`WebView`的`loadUrl（）` 
2. 通过`WebView`的`evaluateJavascript（）` 

**对于JS调用Android代码的方法有3种：**

1. 通过`WebView`的`addJavascriptInterface（）`进行对象映射
2. 通过 `WebViewClient` 的`shouldOverrideUrlLoading ()`方法回调拦截 url
3. 通过 `WebChromeClient` 的`onJsAlert()`、`onJsConfirm()`、`onJsPrompt（）`方法回调拦截JS对话框`alert()`、`confirm()`、`prompt（）` 消息



## 结论

![](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/944365-613b57c93dff2eb8.png)

本文参考[博客原文](<https://www.jianshu.com/p/345f4d8a5cfa>)整理，并对他进行补充扩展，并对原文深表感谢。

