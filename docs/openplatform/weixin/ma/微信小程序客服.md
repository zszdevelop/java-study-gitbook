# 微信小程序客服

## 1. 在页面使用客服消息

1. 需要**将 `button` 组件 `open-type` 的值设置为 `contact`**
2. 当用户点击后就会进入客服会话，如果用户在会话中点击了小程序消息，则会返回到小程序
3. 开发者可以通过 `bindcontact` 事件回调获取到**用户所点消息的页面路径 `path` 和对应的参数 `query`，**
4. 开发者可以通过设置 `session-from` 将会话来源透传到客服。

```html
<button open-type="contact" bindcontact="handleContact" session-from="sessionFrom"></button>
```



## 2. 实战

### 2.1 微信小程序设置

设置的参数为：

- 消息标题
- 消息图片
- 消息来源的路径

```js
  <button open-type="contact" bindcontact="handleContact" class="action bg-white"
          send-message-title="{{goodsSpu.name}}--咨询"
          send-message-img="{{goodsSpu.picUrls[0] ? goodsSpu.picUrls[0] : '/public/img/no_pic.png'}}"
          show-message-card="true" 
          send-message-path="/pages/goods/goods-detail/index?id={{goodsSpu.id}}">
    <view class="cuIcon-servicefill"></view> 
    客服
  </button>
```

![image-20220406210837447](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220406210837447.png)

### 2.2 小程序后台绑定客服

![image-20220406205927869](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220406205927869.png)

### 2.3 客户回复消息

绑定客服后，客服的微信绑定小程序后，即可在服务通知中收到消息

![image-20220406210347650](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220406210347650.png)

通知

![image-20220406210754031](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220406210754031.png)

详情

![image-20220406210719777](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220406210719777.png)

## 3. 小程序客服功能

### 3.1 客服上下线

![image-20220406211724267](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220406211724267.png)

### 3.2 客服数据

![image-20220406211757025](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220406211757025.png)

### 3.3 设置功能

![image-20220406212003592](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220406212003592.png)

## 参考文章

[微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/introduction/custom.html#%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%BD%BF%E7%94%A8%E5%AE%A2%E6%9C%8D%E6%B6%88%E6%81%AF)