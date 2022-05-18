# 微信小程序-分享

## 1. 实现

使用open-type 的开放能力

- 点击 share 分享按钮时会触发 onShareAppMessage

```html
<button size="mini" open-type="share">分享</button>
```

js代码

```js
//发送给朋友
			onShareAppMessage(res) {
				return {
					title: '领取你的专属福利',
					path: '/pages/distribution/exchange?code=123'
				}
			},
```
