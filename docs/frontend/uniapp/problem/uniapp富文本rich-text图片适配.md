# uniapp富文本rich-text图片适配

## 1. 简介

我们商品详情页等场景，使用uniapp富文本rich-text展示时，图片可能会因图片原始尺寸过大，导致无法正常渲染等问题

## 2. 解决办案

我们将img 标签的样式做个替换，设置最大宽度为100%

```html
parsedHtml() {
				if (this.product.detailMobileHtml) {
					return this.product.detailMobileHtml.replace(/\<img/gi,'<img style="max-width:100%;height:auto;display:block;"');
				} else {
					return this.product.detailHtml.replace(/\<img/gi,'<img style="max-width:100%;height:auto;display:block;"');
				}
}
```

## 参考文章

[uni-app中使用rich-text如何添加样式控制富文本里面的内容](https://blog.csdn.net/qq_43468165/article/details/118787182)