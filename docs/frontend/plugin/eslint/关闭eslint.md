# 关闭eslint

## 1. vue-cli脚手架的关闭方法

 `build/webpack.base.conf.js` 配置文件中的eslint rules注释掉

```html
module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      
      ...
     ]
     ...
   }
```

如果想保留eslint的语法检测，那就把不符合自己习惯的规则

## 2. 关闭vue-cli3.0 的eslint

在 vue.config.js中将以下三项设置为false

```css
module.exports = {  
    ...
    // lintOnSave: process.env.NODE_ENV === 'development',
    lintOnSave: false,
	devServer: {
        overlay: {
            warnings: false,
            errors: false
        }
    }
}
```





## 参考文章

[关闭令人抓狂的ESlint 语法检测配置方法](https://blog.csdn.net/qq_34645412/article/details/78974413)

[vue-cli3的eslint配置问题](https://www.jianshu.com/p/bfc7e7329cff)