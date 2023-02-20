---
order: 510
category:
  - Vue
---

# vue实战 - 预览pdf

## 0. 前言

- 方式1：火狐
- 方式2：vue-pdf

## 1. 火狐集成使用

1. 将pdf文件夹放在public 目录下

   链接:https://pan.baidu.com/s/1RTSb0jGWQdZ3xk4TX9FgaA  密码:g9c5

   ![image-20210515161010336](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210515161010336.png)

2. 将base64 设置到sessionStorage, 打开新窗口展示

   ```js
   this.$post("getBase64PdfStr", params).then((res) => {
           if (res.code == 200) {
             let base64PdfStr = res.data;
             sessionStorage.setItem("_imgUrl", base64PdfStr);
             window.location.href = "/pdf/web/viewer.html";
           }
         });
   ```

   

## 2. 方式二：vue-pdf

- [好文：Vue使用vue-pdf.js进行PDF分页、滚动预览放大缩小缩放及文件提取码下载加密下载的方法](http://www.ycmbcd.com/blog/html/16261748155391.html)

  有两种翻页方式：一：滚动翻页、二：点击翻页

​	
