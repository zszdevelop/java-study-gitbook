---
order: 40
category:
  - CAS
---

# CAS单点登录 - 登出

CAS 的登出包含两种情况，一种是CAS客户端登出，另一种是CAS单点登出，使用流程图说明这两者的不同。（一图胜千言）

## 1. CAS客户端登出流程

![image-20230215224130109](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215224130109.png)

如图，客户端的登出仅仅是**过期当前用户与客户端之间的会话**，并未过期用户浏览器与CAS服务端建立的会话（没有处理TGC），此时如果用户再访问客户端的接口，无需输入账号密码立即登录成功。

## 2. 全局单点登出流程

![image-20230215224210538](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215224210538.png)

如图，用户访问CAS服务端单点登出接口（由客户端提供），CAS服务端根据请求携带的TGC，不仅过期了服务内TGT与ST，还向该TGC对应的客户端服务发起登出请求，客户端过期对应用户的会话，CAS服务端响应用户浏览器过期TGC以及重定向到指定页面(单点登出的重定向页面必须是 `serviceName` 开始的地址)

## 3. 总结

CAS登出有两种情况：客户端登出（过期自己）及单点登出（过期自己以及所有相关客户端）。

## 参考文章

[CAS学习笔记四：CAS单点登出流程](https://www.cnblogs.com/hellxz/p/15819781.html)