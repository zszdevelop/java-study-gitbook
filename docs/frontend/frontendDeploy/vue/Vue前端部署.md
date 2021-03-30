# Vue前端部署

## 1.简介

## 2.Vue部署配置

### 2.1 修改vue.config.js 文件

主要修改module.exports

```
module.exports = {
  publicPath: "./",
  outputDir: 'dist',
  assetsDir: 'assets'
  ...
  }
```

- **publicPath**:  部署应用包时的基本 URL

  **如果为配置，会导致资源无法正常加载**

  - 部署在域名的根路径 `https://www.my-app.com/`，则设置 `publicPath` 为 `/`即可
  - 部署在 `https://www.my-app.com/my-app/`，则设置 `publicPath` 为 `/my-app/`
  - 直接使用相对路径 (`'./'`)，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径

  ```js
  module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? './'
      : '/'
  }
  ```

- **outputDir**: 打包输出目录名称

  默认为dist。可改为项目打包名称，以免每次打包更改

## 3. 部署

### 3.1 部署在nginx

```nginx
# 边检执法办案管理系统
server {
    listen          9802;
    location / {
        root   /home/my_app;
        index  index.html index.htm;
		try_files $uri $uri/ /index.html;
    }
}
```
如果vue 以history模式需要增加try_files $uri $uri/ /index.html; ,has 模式则不需要