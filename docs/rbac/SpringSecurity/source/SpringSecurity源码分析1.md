# SpringSecurity源码分析（一）

## 1. 概述

我们再开发系统时，都必须做 `认证(authentication)`和`授权(authorization)`，以保证系统的安全性。

那么什么是认证和授权呢？

### 1.1 什么是认证和授权

认证解决“你是谁”的问题，授权解决“你能做什么”的问题。

- authentication [ɔ,θɛntɪ'keʃən] 认证
- authorization [,ɔθərɪ'zeʃən] 授权

举例来说：

1. 坐飞机的时候：
   - 认证：你要登记，安检要让你出示身份证和票，证明你确实就是本人，这就是 authentication
   - 授权：证明你确实买了票可以上飞机，这就是 authorization
2. 论坛
   - 认证：那你要登录论坛，输入用户名张三，密码 1234，密码正确，证明你张三确实是张三，这就是 authentication。
   - 授权：再一 check 用户张三是个版主，所以有权限加精删别人帖，这就是 authorization 。

### 1.2 Spring Security

以下是两段官网的话

>Spring Security is a powerful and highly customizable authentication and access-control framework. It is the de-facto standard for securing Spring-based applications.

Spring Security 是一个功能强大且高度可定制的身份验证和访问控制框架。它是用于保护基于 Spring 的应用程序。

>Spring Security is a framework that focuses on providing both authentication and authorization to Java applications. Like all Spring projects, the real power of Spring Security is found in how easily it can be extended to meet custom requirements

Spring Security 是一个框架，侧重于为 Java 应用程序提供身份验证和授权。与所有 Spring 项目一样，Spring 安全性的真正强大之处，在于它很容易扩展以满足定制需求。

## 2. 

## 参考文章

[认证 (authentication) 和授权 (authorization) 的区别](https://www.cnblogs.com/joooy/archive/2010/08/08/1795257.html)