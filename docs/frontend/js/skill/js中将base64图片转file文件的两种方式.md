# js中将base64图片转file文件的两种方式

## 1. 背景

项目有个业务需求需要将base64的图片上传到服务器。我们项目之前大部分是采用element的e-upload 上传组件做的，但是此组件并不支持base64,所以我们需要使用http请求实现上传

## 2. 上传需要解决的问题

1. 将base64 转为文件
2. 将文件上传到服务器

## 3. 将base64转为文件实现

### 3.1 方案一：直接 new File()

通过new File()将base64转换成file文件，此方式需考虑浏览器兼容问题。

>Android也没问题，但是在ios11.4以下的系统会上传失败。

```js
//将base64转换为文件
    dataURLtoFile: function(dataurl, filename) { 
	    var arr = dataurl.split(','),
	        mime = arr[0].match(/:(.*?);/)[1],
	        bstr = atob(arr[1]),
	        n = bstr.length,
	        u8arr = new Uint8Array(n);
	    while (n--) {
	        u8arr[n] = bstr.charCodeAt(n);
	    }
	    return new File([u8arr], filename, { type: mime });
	},
 
 
    //调用
    var file = dataURLtoFile(base64Data, imgName);

```

### 3.2 先将base64转换成blob，再将blob转换成file文件

此方法不存在浏览器不兼容问题。

```java
 //将base64转换为blob
    dataURLtoBlob: function(dataurl) { 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    },
    //将blob转换为file
    blobToFile: function(theBlob, fileName){
       theBlob.lastModifiedDate = new Date();
       theBlob.name = fileName;
       return theBlob;
    },
    //调用
    var blob = dataURLtoBlob(base64Data);
    var file = blobToFile(blob, imgName);
```

## 4. 将文件上传到服务器

这里也有个坑。我查看了element 的upload 组件，他是post用form表单的形式提交。我就用项目封装的post请求，但是一直有问题。

- 原因：项目中的封装静将json转成form表单所以还是有差别
- 解决：直接使用原生axios

```js
testClick() {
            let imgName = "ss.png";
            let base64Data = "";
            //调用
            let blob = this.dataURLtoBlob(base64Data);
            let file = this.blobToFile(blob, imgName);
            let fd = new FormData();
            fd.append("ajbh", this.ajbh);
            fd.append("file", file, "image.jpg");
            fd.append("file", file, "image.jpg");
            fd.append("file", file, "image.jpg");
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + getToken()
                }
            };
            axios.post(this.getFileUploadUrl(), fd, config).then(res => {
                console.log(res);
            }).catch(res => {
                console.log(res);
            });
        },
   
```

## 参考文章

[js 图片base64转file文件的两种方式](https://blog.csdn.net/yin13037173186/article/details/83302628)

