# npm源管理

## 1. 简介

## 2. 设置源

### 2.1 查看源

```bash
//查看源，可以看到设置过的所有的源
npm config get registry
```

### 2.2  永久设置源

源可以是多个，**但只有一个是生效的**。

```bash
//设置淘宝源
npm config set registry https://registry.npm.taobao.org

//设置公司的源
npm config set registry http://127.0.0.1:4873

```

### 2.3 临时改变源

```bash
//本次从淘宝仓库源下载
npm --registry=https://registry.npm.taobao.org install
```

## 3. 使用nrm管理源

`nrm `是一个 NPM 源管理器，可以使用 `nrm` 在不同的源切换。

### 3.1 安装nrm

```bash
npm install -g nrm
```

### 3.2 列出可选的源

```bash
nrm ls
```

结果：

```
nrm ls            

  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
* ali ---------- https://registry.npm.taobao.org/

```

当前的源，前面会有一个*

### 3.3 查看当前源

显示当前使用的镜像源名称。

```
nrm current
```

### 3.4  切换源

切换到taobao：

```bash
nrm use taobao
```

### 3.4 增加源

可以增加定制的源，特别适用于添加企业内部的私有源。

```bash
nrm add  <registry> <url> [home]
# 例如
nrm add company http://npm.company.com/   
```

### 3.5 删除源

```bash
nrm del <registry>
```

### 3.6 测试速度

还可以通过 `nrm test `测试相应源的响应时间。

```bash
nrm test npm 
```

结果：

```bash
npm ---- 1328ms
```

## 参考文章

[npm源管理](https://segmentfault.com/a/1190000038997036)