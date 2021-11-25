# 前端js/vue下载后台传过来的流文件

## 1. 简介

项目中经常需要用到下载文件，如导出用户信息，下载一些文件等。我们在vue中如何实现呢？主要有如下两种方案

- 使用Blob对象，构造a标签
- 使用封装好的**js-file-download**

>这两种方法下载的文件都**不会乱码**，但是 **不管使用哪种方法，发送请求时都要设置 responseType**

## 2. 方案一：使用Blob对象，构造a标签

### 2.1 Blob 简介

Blob对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是JavaScript原生格式的数据。File接口基于Blob，继承了blob的功能并将其扩展使其支持用户系统上的文件。

### 2.2 Blob()构造函数

语法

```js
var aBlob = new Blob( array, options );
```

参数

- *array* 是一个由`ArrayBuffer` `ArrayBufferView`, Blob`, `DOMString`等对象构成的 [`Array`，或者其他类似对象的混合体，它将会被放进 `Blob`。DOMStrings会被编码为UTF-8。
- *options* 是可选的，它可能会指定如下两个属性：
  - `type`，默认值为 `""`，它代表了将会被放入到blob中的数组内容的MIME类型。**也就是设置文件类型。**
  - `endings`，默认值为`"transparent"`，用于指定包含行结束符`\n`的字符串如何被写入。 它是以下两个值中的一个： `"native"`，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 `"transparent"`，代表会保持blob中保存的结束符不变。

### 2.3 URL对象

通过创建URL对象指定文件的下载链接。

```js
// 创建新的URL表示指定的File对象或者Blob对象。
let objectURL = window.URL.createObjectURL(blob); 
window.URL.revokeObjectURL(objectURL); // 释放内存
```

>在每次调用createObjectURL()方法时，都会创建一个新的 URL 对象，即使你已经用相同的对象作为参数创建过。当不再需要这些 URL 对象时，每个对象必须通过调用 URL.revokeObjectURL()方法来释放。浏览器会在文档退出的时候自动释放它们，但是为了获得最佳性能和内存使用状况，你应该在安全的时机主动释放掉它们。

### 2.4 利用a标签自定义文件名

```java
const link = document.createElement('a'); // 生成一个a标签。
link.href = window.URL.createObjectURL(blob); // href属性指定下载链接
link.download = fileName; // dowload属性指定文件名
link.click(); // click()事件触发下载
```

download 属性设置文件名时，可以直接设置扩展名。如果没有设置，则浏览器将自动检测正确的文件扩展名并添加到文件 。

### 2.5 主要完整代码

- 普通下载

  ```js
  axios.post(postUrl, params, {responseType: 'arraybuffer'}).then(res => {
      // 创建Blob对象，设置文件类型
      let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
      let objectUrl = URL.createObjectURL(blob) // 创建URL
      location.href = objectUrl;
      URL.revokeObjectURL(objectUrl); // 释放内存
  })
  ```

- 自定义下载后的文件名

  ```js
  // 利用a标签自定义下载文件名
  const link = document.createElement('a')
  
  axios.post(postUrl, params, {responseType: 'arraybuffer'}).then(res => {
      // 创建Blob对象，设置文件类型
      let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
      let objectUrl = URL.createObjectURL(blob) // 创建URL
      link.href = objectUrl
      link.download = 'xxx' // 自定义文件名
      link.click() // 下载文件
      URL.revokeObjectURL(objectUrl); // 释放内存
  })
  
  ```

## 3. 方案二：使用 `js-file-download`

- 安装

  ```bash
  npm install js-file-download --save
  ```

- 使用

  ```javascript
  import fileDownload from 'js-file-download'
  
  axios.post(postUrl, params, {responseType: 'arraybuffer'}).then(res => {
      fileDownload(res.data, 'xxx.xls')
  })
  ```

## 4. 可能遇到的问题

### 4.1 axios获取不到文件名

1. 需要在服务端加上此请求头

   ```java
   //响应时在响应头里添加 Access-Control-Expose-Headers 
    response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
   ```

2. 前端还是用原生的axios post 方法吧

   ```
   download(url, params, filename) {
           // NProgress.start()
           return axios.post(url, params, {
               timeout: 300000,
               baseURL: baseUrl,
               transformRequest: [(params) => {
                   return tansParams(params);
               }],
               headers: {
                   "Content-Type": "application/x-www-form-urlencoded",
                   "Authorization": "Bearer " + getToken()
               },
               responseType: "blob"
           }).then((response) => {
               if (filename == null||filename== undefined||filename==''){
                   // 前提是服务端要在header设置Access-Control-Expose-Headers: Content-Disposition
                   // 前端才能正常获取到Content-Disposition内容
                   const disposition = response.headers["content-disposition"];
                   let filename = disposition.substring(disposition.indexOf("filename=") + 9, disposition.length);
                   // iso8859-1的字符转换成中文
                   filename = decodeURI(escape(filename));
                   // 去掉双引号
                   filename = filename.replace(/\"/g, "");
               }
               
               const content = response.data;
               const blob = new Blob([content]);
               if ("download" in document.createElement("a")) {
                   const elink = document.createElement("a");
                   elink.download = filename;
                   elink.style.display = "none";
                   elink.href = URL.createObjectURL(blob);
                   document.body.appendChild(elink);
                   elink.click();
                   URL.revokeObjectURL(elink.href);
                   document.body.removeChild(elink);
               } else {
                   navigator.msSaveBlob(blob, filename);
               }
               // NProgress.done()
           }).catch((r) => {
           });
       },
   ```

   

## 参考文章

[前端js/vue下载后台传过来的流文件（如excel）并设置下载文件名](https://segmentfault.com/a/1190000020540788)