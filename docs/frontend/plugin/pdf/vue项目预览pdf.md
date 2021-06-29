# vue项目预览pdf

## 1. 集成使用

1. 将pdf文件夹放在public 目录下

   链接:https://pan.baidu.com/s/1RTSb0jGWQdZ3xk4TX9FgaA  密码:g9c5

   ![image-20210515161010336](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210515161010336.png)

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

   

   