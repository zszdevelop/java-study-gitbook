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

### 1.1 未正确配置导致404的问题

history 虽好，但是未正确配置，会导致页面404。

**解决方案**：

在访问到404的时候，需要定位到首页，也就是index.html页

## 2. 前端配置

### 2.1 放域名根目录下

域名根目录下，如：http://oursite.com

1. 路由配置：

   ```java
   export default new Router({
     mode: 'history', // 去掉url中的#
     scrollBehavior: () => ({ y: 0 }),
     routes: constantRoutes
   })
   
   ```

2. 配置 vue.config.js 文件

   ```js
   module.exports = {
     // 部署生产环境和开发环境下的URL。应用被部署在一个子路径,需指向相对路径或特定路径
     publicPath: "/",
     // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
     assetsDir: 'static',
   ```

   

### 2.2 放域名二级目录下

域名二级目录下。如：http://oursite.com/myapp

1. 路由配置：

   ```js
   export default new Router({
     mode: 'history', // 去掉url中的#
     // 应用的基路径。例如，如果整个单页应用服务在 /myapp/ 下，然后 base 就应该设为 "/myapp/"
     base:'/myapp/', // 新增base
     scrollBehavior: () => ({ y: 0 }),
     routes: constantRoutes
   })
   ```

2. 配置 vue.config.js 文件

   ```js
   module.exports = {
     // 部署生产环境和开发环境下的URL。应用被部署在一个子路径,需指向相对路径或特定路径
     publicPath: "./", //指向相对路径
     //publicPath: "/myapp/", // 固定路径
     // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
     assetsDir: 'static', // 不需要修改也不影响
     ...
   }
   ```

   

## 3. 后端配置

### 3.1 nginx 配置

#### 3.1.1 放域名根目录下

```nginx
	server {
        listen          9802;
        location / {
            root   /home/myapp;
            index  index.html index.htm;
						try_files $uri $uri/ /index.html;
        }
    }
```

#### 3.1.2  放域名二级目录下

```nginx
	server {
        listen          19801;
        
        location /myapp {    
            alias   /home/myapp;
            index  index.html index.htm;
            try_files $uri $uri/ /myapp/index.html;
        }
    }
```

### 3.2 tomcat

#### 3.2.1 放域名根目录下

tomcat基本很少直接放在根目录下的情况，不做介绍

#### 3.2.2  放域名二级目录下

1. 前端在public目录下新增：WEB-INF/web.xml文件

   在前端再打包输出的文件中，还需要新增WEB-INF文件夹，并包含一个web.xml文件

   ```xml
   <?xml version='1.0' encoding='UTF-8'?>
   <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns="http://xmlns.jcp.org/xml/ns/javaee"
            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee/web-app_2_5.xsd"
            id="scplatform" version="2.5">
     <display-name>/</display-name>
     <error-page>
       <error-code>404</error-code>
       <location>/index.html</location>
     </error-page>
   </web-app>
   ```

   ![image-20210529154237920](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210529154237920.png)

   



2. 打包之后dist(打包目录)，下会新增WEB-INF文件夹

   ![image-20210529154331815](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210529154331815.png)

   

3. 将文件放到tomcat的webapps目录下即可

   

## 4. 可能遇到的问题

### 4.1 初次进入可以，刷新页面后404(页面地址变成根目录)

初次进入可以，刷新页面后404，页面路径由原来的二级目录http://oursite.com/myapp，变成根目录http://oursite.com。所以无法刷新

**解决方案**

好好检查配置！特别是

- 路由的base 是否配置正确

### 4.2 初次进入可以，刷新页面后404(页面地址不变，刷新就是不行)

初次进入可以，刷新页面后404(页面地址不变，刷新就是不行)

![image-20210529142826597](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210529142826597.png)

**解决方案**

好好检查配置！特别是

- nginx配置是否有加：try_files $uri $uri/ /myapp/index.html;

### 4.3 页面进入后相关资源找不到

![image-20210529142019445](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210529142019445.png)

我们指定二级目录了，但是资源还是一级目录的地址。

**解决方案**

好好检查配置！特别是

- 配置 vue.config.js 文件，publicPath: "./", //指向相对路径，或者全路径

