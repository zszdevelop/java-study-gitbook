---
order: 500
category:
  - Vue
---



# Vue实战 - Vue组件打包成库

## 1. 开发组件

开发组件的过程并无特殊之处，跟平时在Vue项目里定义component是一样的。有一点需要注意的是，平时在Vue项目里，组件的name可以不写，但如果要打包成库，组件的name必须写。为了描述方便，我们把将要打包的组件定义为MyCom1、MyCom2。其示例代码如下：

```vue
<template>
  <div>
  </div>
</template>
 
<script>
export default {
  name: "MyCom1",
};
</script>
```

## 2. 定义install方法

> Vue引用组件使用Vue.use方法，此方法会调用组件的install方法，所以需要定义组件的install方法。可以在项目中新建一个文件夹，例如命名为lib，然后在此文件夹中添加各个组件的install方法定义。

例如，新建lib/MyCom1Install.js，内容如下：

```js
import MyCom1 from "../src/MyCom1.vue";
function install(Vue) {
    Vue.component(MyCom1.name, MyCom1);
}
export default install;
```

## 3. 定义打包入口文件

当有多个组件时，需要有一个入口文件引用这些组件。例如，同样在lib文件夹下，添加一个lib.js，内容如下：

```js
export { default as MyCom1 } from "./MyCom1Install";
export { default as MyCom2 } from "./MyCom2Install";
```

## 4. package配置

>这一步直接命令行执行一直不成功，但是package 中的没有问题

package配置需要做两件事件，但首先，我们要确定这个包的名称，例如为mycom。生成lib的脚本如下所示：

```bash
vue-cli-service build --target lib --name mycom lib/lib.js
```

完成之后，在工程的dist文件夹下，将生成以下文件：

![image-20221014132327142](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221014132327142.png)

这些文件有不同的应用场合，我们需要用到的，其实就只有.umd.min.js和.css两个文件。由于有多个文件，需要在package中指明我们要用的是哪个，所以需要在package中加入：

```js
"main": "dist/mycom.umd.min.js",
```

package完整修改内容如下：

```js
{
  "name": "mycom",
  "version": "0.1.0",
  "private": true, //如果要上传npm，就为false
  "main": "dist/mycom.umd.min.js",
  "scripts": {
    "build:lib": "vue-cli-service build --target lib --name mycom lib/lib.js"
  },
  ...其他无关内容
}
```

## 5. 打包

打包的话就没什么好说的了，

yarn build:lib 或者

npm run build:lib

结束之后，可以上传到npm，也可以复制相关内容到需要引用组件项目的node_modules文件夹中。如果要复制，需要复制以下内容：

```js
mycom
  package.json
  dist
    mycom.umd.min.js
    mycom.css
```

## 6. 使用组件库

在main.js中，加入对组件的引用：

```javascript
import { MyCom1,MyCom2 } from "mycom";
import "mycom/dist/mycom.css";

Vue.use(MyCom1);
Vue.use(MyCom2);
```

然后在Vue页面中，像其他组件一样引用即可：

```vue
<template>
  <div id="app">
    <MyCom1 />
    <MyCom2 />
  </div>
</template>
 
<script>
export default {
  name: "App",
};
</script>
```

## 7.发布npm（补充）

1、先到NPM官网注册账号，如果已有账号则跳过此步骤

2、在组件库项目的根目录下执行 

```coffeescript
npm login
```

登陆账号，输入你的账号和密码，并验证邮箱地址，登陆成功后则可以发布到NPM网站了

3、更新版本号

```js
npm version patch
```

这是把版本迭代一级，每次更新时都需要输入这个命令，或者直接在package.json中修改版本号，只要与npm上的版本不同就行

4、发布到npm官网

```
npm publish --access public
```

## 8. 如何同步淘宝镜像中 npm 包（补充）

### 8.1 背景

我们使用npm安装模块的时候一般都使用淘宝镜像。**淘宝镜像同步频率目前为 10分钟 一次**，以保证尽量与官方服务同步。

我们发布模块至npm后，有时候短时间内无法从淘宝镜像安装最新发布的版本，这时候我们可以主动同步模块至淘宝镜像。

### 8.2 主动同步

>找到需要同步包的名字 这边假设 包名字为 vite

#### 8.2.1 方式一：`sync` 命令

直接通过 `sync` 命令马上同步一个模块, 只有 `cnpm` 命令行才有此功能:

```dart
cnpm sync vite
```

#### 8.2.1 方式二：web 方式

还可以直接通过 web 方式来同步:

> https://npmmirror.com/sync/{包的名字} 如上假设包名字为 vite

```kotlin
open https://npm.taobao.org/sync/vite
```

则访问 https://npmmirror.com/sync/vite 就可以同步了

![image-20221108172214025](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221108172214025.png)

## 9. 包上传公司仓库

[相关文章](https://juejin.cn/post/6986917713482350600)

1. 配置公司仓库地址

   ```bash
   npm set registry http://192.168.x.x:8082/repository/npm_all/   
   ```

2. 配置认证地址

   ```bash
   npm login -registry http://192.168.x.x:8082/repository/npm_fd 
   ```

3. 在package 下配置publishConfig

   ```js
    "publishConfig" : {
       "access": "public",
       "registry": "http://192.168.x.x:8082/repository/npm_fd"
     }
   ```

4. 发布

   ```bash
   npm publish
   ```

   

## 参考文章

[Vue组件打包成库和使用库的方法](https://blog.csdn.net/lweiyue/article/details/120064122)

[npm私服配置介绍](https://juejin.cn/post/6986917713482350600)