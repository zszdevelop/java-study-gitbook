# VueRouter History模式

## 1. 背景

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，**于是当 URL 改变时，页面不会重新加载**。

如果不想要很丑的 hash，我们可以用路由的 **history 模式**，这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

当你使用 history 模式时，URL 就像正常的 url，例如 `http://yoursite.com/user/id`

## 2. 为正确配置导致404的问题

因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 `http://oursite.com/user/id` 就会返回 404

所以此时，还**需要后台配置支持**

## 3. 后端配置

解决思路：

1. 要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 `index.html` 页面，这个页面就是你 app 依赖的页面。
2. 如果想部署到一个子目录，你需要使用 Vue CLI 的 `publicPath` 选项  和相关的 router `base` property。你还需要把下列示例中的根目录调整成为子目录 (例如用 `RewriteBase /name-of-your-subfolder/` 替换掉 `RewriteBase /`)。

### 3.1 nginx 配置

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 3.2 tomcat

// TODO 