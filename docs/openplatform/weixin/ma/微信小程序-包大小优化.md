# 微信小程序(uniapp)-包大小优化

## 1. 背景

在开发微信小程序的过程中，随着业务逻辑日渐庞大之后，突显了一些问题。

首先我们发现在 dev mode 时，本地包大小已经达到了 4m+，这种情况下，已经无法在 dev mode 使用真机调试了。

其次此时，小程序 build 后也有 1.8M 左右。而且后续还有相当多的业务需求需要开发，包大小肯定会更大。

这时候就想要优化小程序包大小。下面分享一下我的定位过程和解决思路。尽管我们使用 uni-app 开发，但思路是通用的，希望能给大家一些帮助吧。

## 2. 如何减小包大小

### 2.1 代码分析（包大在哪儿）

首先分析包大在哪儿了。

打开本地代码目录查看文件大小。可以发现 common/vendor.js 和 page,components 中 js 占了大部分。

在 build 编译模式下，代码压缩已经启用了，需要思考别的优化方式。这时候可以使用[`webpack-bundle-analyzer`插件](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fwebpack-bundle-analyzer)。它可以帮助分析 vendor.js 中都有哪些 js 模块，哪些模块比较大，以便我们进一步优化代码

### 2.2 分包

[小程序分包](https://uniapp.dcloud.io/collocation/pages.html#subpackages)也是一种常规的优化方案。

通过分析后，可以将一些较大的页面划分为子包。如果有单页依赖第三方自定义组件，而且第三方组件还挺大，也可以考虑将该页面划分为子包。也因此**尽量避免将第三方自定义组件放在 globalStyle**，不然没法将它放到子包去。

### 2.3 大图不要打包

小程序中的大图，尽量避免打包进来，应该放到 CDN 通过 url 加载。我们的做法是在开发时加载本地图片，在 CI/CD 环节自动化发布图片，并改写地址。

## 3. 如何解决真机调试问题

首先还是查看编译后的文件，发现`common/vendor.js`巨大，足有 1.5M。其次`pages`和`components`也有 1.4M，而这其中占了 js 的大小又占了绝大部分。

为什么 js 文件这么大呢？主要是因为在 dev mode 默认并没有压缩，当然也没有 tree shaking。

我的选择是**修改编译配置，在 dev mode 压缩 js 代码**。本地代码减少到了 2M。预览大小则是减少到了 1.4M。参考配置如下：

```
// vue.config.js
    configureWebpack: () => {
        if (isDev && isMp) {
            return {
                optimization: {
                    minimize: true,
                },
            }
        }
    }
```

这看上去并不是个好方案，但确实简单有效。也考虑过分包，但分包并不能解决 common/vendor.js 巨大的问题，预览时包还是很大。

## 参考文章

[小程序包大小优化(uni-app)](https://juejin.cn/post/6844903970805153800#heading-8)