# npm install时遇到的问题 npm ERR! code ERESOLVE

## 1. 问题描述

在使用npm install时遇到的问题

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: ruoyi@3.4.0
npm ERR! Found: webpack@5.35.0
npm ERR! node_modules/webpack
npm ERR!   peer webpack@"^4.0.0 || ^5.0.0" from html-webpack-plugin@4.5.2
```

## 2. 原因

**因为npm7.x对某些事情比npm6.x更严格**

## 3. 解决

通常，最简单的解决方法是将--legacy-peer-deps标志传递给npm(e.g.，npm i --legacy-peer-deps），或者使用npm@6。

> 提示：使用npm@6不需要卸载npm@7。使用npx指定npm的版本。例如：npx -p npm@6 npm i --legacy-peer-deps。

如果这不能立即起作用，也许可以先删除node_modules和package-lock.json。它们将被重新创建。

## 参考文章

[在使用npm install时遇到的问题 npm ERR! code ERESOLVE](https://blog.csdn.net/qq_22832075/article/details/115999117)