---
order: 20
category:
  - CAS
---

# CAS单点登录 - 登录流程

## 1. 相关术语

> 此处将不介绍验签相关的术语，约等于CAS1

- CAS (Central Authentication Service) - 中央认证服务器
- SSO (Single Sign On) - 单点登录
- CAS Client - 集成CAS登录流程的应用服务
- TGT (Ticket Granting Ticket) - 存在 CAS 服务端的用户票据，可使用此票据颁发ST
- TGC (Ticket Granting Cookie)- 存在浏览器的 Cookie，对应 CAS 服务端的 TGT
- ST (Service Ticket) - 服务票据，CAS为每个登录成功的应用服务生成唯一票据，对应应用服务的服务名（serverName）

## 2. CAS单点登录流程

![image-20230215215146399](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230215215146399.png)

**单点登录流程：**

> 1~5步 为首次访问服务A的单点登录流程，6~9步为访问A服务单点登录成功后再访问服务B的单点流程

1. 用户通过浏览器请求服务A资源
2. 服务A校验发现此请求未认证，**重定向浏览器到CAS服务端登录地址**
3. 用户通过浏览器输入用户名密码，发起登录请求
4. CAS服务端校验用户名密码通过，响应头会**将TGC写入浏览器CAS域名的Cookie中**，重定向浏览器到 `服务A地址 + 服务A的ST`
5. **服务A向CAS服务端发起校验ST请求**，验证通过后服务A重定向请求到服务A未携带ST的地址，业务响应返回结果
6. 用户通过浏览器请求服务B的资源
7. 服务B发现此请求未认证，重定向浏览器到CAS服务端登录地址，**由于CAS地址的Cookie有TGC**，重定向时会被携带传递给CAS服务端
8. CAS服务端校验TGC发现有对应的TGT，颁发ST给服务B，重定向浏览器到 `服务B + 服务B的ST`
9. 服务B向CAS服务端发起校验ST请求，验证通过后服务B重定向请求到服务B未携带ST的地址，业务响应返回结果

## 3. 总结

>- TGT (Ticket Granting Ticket) - 存在 CAS 服务端的用户票据，可使用此票据颁发ST
>- TGC (Ticket Granting Cookie)- 存在浏览器的 Cookie，对应 CAS 服务端的 TGT
>- ST (Service Ticket) - 服务票据，CAS为每个登录成功的应用服务生成唯一票据，对应应用服务的服务名（serverName）

1. 用户登录成功会创建TGT，由TGT颁发ST。
2. 用户浏览器端会保存TGC，它对应一个TGT
3. 浏览器端存在未过期的TGC，访问CAS服务端时携带TGC，CAS使用TGT颁发ST，实现单点登录

## 参考文章

[CAS学习笔记二：CAS单点登录流程](https://www.cnblogs.com/hellxz/p/15766277.html)