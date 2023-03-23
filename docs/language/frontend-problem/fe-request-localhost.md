---
dir:
  order: 110
category:
  - 前端
---

# 前端问题 - 无法访问本地接口

## 1. 背景

我们项目有个功能需要调用内网服务（或客户机的本地服务)接口，比如前端在 12.12.11.0 服务器上，但是要访问内网的服务（或本地服务127.0.0.1），浏览器会报跨域

```
The request client is not a secure context and the resource is in more-private address space private.
```

## 2. 问题原因

新版的chrome浏览器会校验发起端的域名和访问资源的域名直接的关系，如果客户端发起域名比访问资源所在的域名更public（开放），会导致The request client is not a secure context and the resource is in more-private address …错误产生。

- 报错内容
  ![image-20230322194106860](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230322194106860.png)
- 错误原因
  ![image-20230322194117956](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230322194117956.png)

## 3. 解决办法

在浏览器地址栏输入

```bash
chrome://flags/#block-insecure-private-network-requests
```

按照下图将Block insecure private network requests.项的Default改为Disabled即可。

![image-20230322194210401](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230322194210401.png)

## 参考文章

[The request client is not a secure context and the resource is in more-private address …](https://www.bmabk.com/index.php/post/100111.html)