# Vue移动端和pc端适配方案

## 1. 简介

vue项目移动端、pc端适配方案

- lib-flexible 根据屏幕宽度，自动设置html的font-size
- postcss-px2rem 自动将px单位转换成rem

## 2. 基础集成使用

### 2.1 安装依赖

```sh
npm install px2rem-loader --save-dev
npm install lib-flexible --save
```

### 2.2 main.js中引入 "lib-flexible"

```sh
import 'lib-flexible' // 移动端适配 (目录:project/src/main.js)
```

### 2.3 vue.config.js 引入px2rem-loader

```js
 module.exports = {
     chainWebpack: (config) => {
     
         <!--新增的内容-->
         config.module
         .rule('css')
         .test(/\.css$/)
         .oneOf('vue')
         .resourceQuery(/\?vue/)
         .use('px2rem')
         .loader('px2rem-loader')
         .options({
             remUnit: 75
         })
         <!--新增结束-->
     }
 }
 
```

### 2.4 login.vue中根据750px设计图写页面

```js
    <style scoped>
        .login-wrap {
            background: #666666;
            height: 100px;
        }
    </style>
    
    iphone6： height: 1.3333rem
```

此时是已经成功了，但是px2rem-loader这里只能仅限于css，并不能满足大多数开发需求，比如使用less,stylus,scss...这个时候就需要postcss

## 3. 集成 postcss-plugin-px2rem

### 3.1 安装 "postcss-plugin-px2rem" (devDependencies)

```sh
npm install postcss-plugin-px2rem --save-dev
```

### 3.2 vue.config.js 配置 postcss-plugin-px2rem

```js
        module.exports = {
            lintOnSave: true,
            
            <!--新增的内容-->
            css: {
                loaderOptions: {
                    postcss: {
                        plugins: [
                            require('postcss-plugin-px2rem')({
                                rootValue: 75, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                                // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                                //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                                // propBlackList: [], //黑名单
                                exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                                // selectorBlackList: [], //要忽略并保留为px的选择器
                                // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                                // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                                mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                                minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                            }),
                        ]
                    }
                }
            }
            <!--新增结束-->
        }
```

### 3.3 package.json 中加入postcss 相关插件

```js
        {
            "dependencies": { .. }
            "postcss": {
                "plugins": {
                    "autoprefixer": {},
                    "precss": {}
                }
            }
        }
```

### 3.4 在login.vue中

```vue
        <style lang="scss" scoped>
            .login-wrap {
                background: #666666;
                height: 100px;
                .text-span {
                    font-size: 16px;
                    color: red;
                }
            }
        </style>
```

```
phone6： 
        height: 100px;  => height: 1.3333rem
        font-size: 16px; => font-size: 0.21333rem
```

此时就可以在项目中成功使用less,scss,styuls和px2rem了

## 参考文章

[vue-cli3.0 使用px2rem 或 postcss-plugin-px2rem](https://juejin.cn/post/6844903780673142792)

