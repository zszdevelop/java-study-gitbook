# npm 运行项目时 Error: PostCSS received undefined instead of CSS string

## 1.  背景

新拉下来的项目，启动项目 npm run dev 的时候就报错：

```javascript
Error: PostCSS received undefined instead of CSS string
```

## 2. 原因

我的node的版本影响了node-sass的应用。

## 3. 解决办法

卸载当前版本，安装最新版本的node-sass

```
npm uninstall node-sass

npm install node-sass --save-dev
```

删除依赖，重新安装又依赖

```
rimraf node_modules

npm install
```

然后再重新启动项目就成功了

# 参考文章

[Error: PostCSS received undefined instead of CSS string](https://blog.csdn.net/Sunday97/article/details/116492447)

