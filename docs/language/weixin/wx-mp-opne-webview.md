# 微信小程序-打开外部链接webview

## 1. 简介

我们小程序经常有一些打开外部链接的需求，如活动页，或者是之前已经完成的功能不希望在小程序中重做。我们希望小程序中能直接打开这些页面。

## 2. 步骤

### 2.1 新建webview页面

```js
<template>
	<view>
		<web-view :src="url" bindmessage="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			this.url = options.url;
			console.log("webview要打开的页面："+this.url)
		}

	}
</script>

<style>

</style>

```

### 2.2 调整到webview

只有https: 和http: 开头的采用webview打开

```js
toDetail(e) {
				if(e.url.startsWith("https:")||e.url.startsWith("http:")){
					uni.navigateTo({
						url: '/pages/webview/webview?url='+  e.url
					});
				}if(e.url.startsWith("/pages/menu/menu")){
					uni.switchTab({
						url:e.url
					});
				}else{
					uni.navigateTo({
						url: e.url
					});
				}
			},
```

#### 2.2.1 打开受限

提示打开受限，需要配置业务域名

![image-20220326065321127](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220326065321127.png)

### 2.3 配置业务域名

我们在小程序后台管理中配置业务域名

开发- 开发设置-业务域名中修改

![image-20220326065803516](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220326065803516.png)

![image-20220326065855295](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220326065855295.png)

### 2.4 校验文件使用

当我们配置业务域名时，会提示我们需要配置校验文件。我们下载校验文件

文件名： 7Sn5OqKddU.txt  内容如下

```
c5c130153411e08718df45834cee9abc
```

#### 2.4.1 方案一：nginx配置(推荐)

nginx 直接返回文字

```nginx
 server {
        
        location /7Sn5OqKddU.txt {
            return 200 'c5c130153411e08718df45834cee9abc';
        }
 }
```

#### 2.4.2 代码写接口

要在根域名下，所以不能有前缀

```java
	@GetMapping("/7Sn5OqKddU.txt")
    @ResponseBody
    public String wxBizAuth() {
        return "c5c130153411e08718df45834cee9abc";
    }
```

