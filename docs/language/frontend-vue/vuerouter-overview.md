# VueRouter概念

## 1. 简介

官方文档介绍如下

> Vue Router 是  Vue.js 官方的路由管理器，适合用于构建单页面应用。包含的功能有：
>
> - 嵌套的路由/视图表
> - 模块化的、基于组件的路由配置
> - 路由参数、查询、通配符
> - 基于 Vue.js 过渡系统的视图过渡效果
> - 细粒度的导航控制
> - 带有自动激活的 CSS class 的链接
> - HTML5 历史模式或 hash 模式，在 IE9 中自动降级
> - 自定义的滚动条行为

简而言之，就是vue的官方路由插件，用于构建单页面应用。

### 1.1 路由的作用

vue的单页面应用是基于路由和组件的，路由用于**设定访问路径，并将路径和组件映射起来**。

> 传统的页面应用，是用一些超链接来实现页面切换和跳转的。**在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换**。

### 1.2 单页应用

相比起多页应用，单页应用有如下这些好处：

- 无需重复加载公共资源
- 页面切换速度快，用户体验好
- 页面切换可以实现转场动画

虽然单页应用有着难以SEO、开发难度更加大的缺点，但是相比于传统的多页应用有着更好的用户体验上，目前单页应用已经是Web应用开发的潮流

## 2. 基础使用

1. 新建vue应用

2. 新建view文件夹，并添加login.vue和home.vue两个文件

   1. login.vue

      ```vue
      <template>
        <div>
          <div><input v-model="name" type="text" placeholder="请输入用户名"></div>
          <div><input v-model="password" type="password" placeholder="请输入密码"></div>
          <button @click="login">登录</button>
        </div>
      </template>
      
      <script>
      export default {
        data() {
          return {
            name: "",
            password: ""
          };
        },
        methods: {
          login() {
            // 设置登录成功状态
            sessionStorage.setItem("login", this.name);
            // 路由跳转
            this.$router.push("home")
          }
        }
      };
      </script>
      ```

   2. Home.vue

      ```vue
      <template>
        <div>首页</div>
      </template>
      ```

3. 新建router/index.js，并添加如下代码

   ```js
   import Vue from "vue";
   import Router from "vue-router";
   import home from "../view/home.vue";
   import login from "../view/login.vue";
   Vue.use(Router);
   const router = new Router({
     mode: "history",
     // 配置对应路径下应该加载的组件
     routes: [
       {
         path: "",
         component: login
       },
       {
         path: "/login",
         name: "login",
         component: login
       },
       {
         path: "/home",
         name: "home",
         component: home
       }
     ]
   });
   
   // 添加路由守卫，在路由跳转之前执行
   router.beforeEach((to, from, next) => {
     // 如果是要去登录页面，则直接允许
     if (to.path === "" || to.path === "/login") {
       sessionStorage.removeItem("login");
       next();
     }
     let isLogin = sessionStorage.getItem("login");
     // 判断用户是否登录
     if (!isLogin) {
       // 没登录则跳转登录页
       next({ path: "/login" });
     } else {
       // 允许跳转
       next();
     }
   });
   
   export default router;
   ```

4. 在main.js中引入router

   ```js
   import router from "./router";
   new Vue({
     router,
     render: h => h(App)
   }).$mount("#app");
   ```

5. 在App.vue中引入Vue-router组件

   ```vue
   <template>
     <div id="app">
       <router-view/>
     </div>
   </template>
   ```

6. 当我们在右侧直接输入/home路径访问时，由于没有登录，直接跳转到了登录页面

   ![image-20210527191603740](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210527191603740.png)

7. 当输入用户名、密码登录后，则跳转到了首页

   ![image-20210527191625999](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210527191625999.png)

