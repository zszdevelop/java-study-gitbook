---
order: 21
category:
  - 开发
  - 安全
---

# 开发安全 - CORS、CSRF、XSS对比（补充）

## 1. 概念

1. **CSRF** - Cross-Site Request Forgery - 跨站请求伪造
2. **CORS** - Cross Origin Resourse-Sharing - 跨站资源共享
3. **XSS** ： Cross Site Scrit 跨站脚本攻击（为与 CSS 区别，所以在安全领域叫 XSS）

## 2. CSRF

### 2.1 概念

> 跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。跟跨网站脚本（XSS）相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。 —— [维基百科](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)

**核心知识：** 跨站点请求伪造请求。

**简单理解：** 攻击者盗用你的身份，以你的名义发送恶意请求。

常见场景：以你名义发送邮件，发消息，盗取你的账号，甚至于购买商品，虚拟货币转账等等。

造成影响：个人隐私泄露以及财产安全。

## 3. CORS 

### 3.1 概念

CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。

它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而**克服了AJAX只能同源使用的限制**。

>整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会**自动添加一些附加的头信息，有时还会多出一次附加的请求**，但用户不会有感觉。
>
>因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

## 4. XSS

### 4.1. 概念

> 跨站脚本（英语：Cross-site scripting，通常简称为：XSS）是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了HTML以及用户端脚本语言。 —— [维基百科](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)

XSS 攻击，一般是指攻击者通过在网页中注入恶意脚本，当用户浏览网页时，恶意脚本执行，控制用户浏览器行为的一种攻击方式。

常见 XSS 危害有：

- 窃取用户Cookie，获取用户隐私，盗取用户账号。
- 劫持用户（浏览器）会话，从而执行任意操作，例如进行非法转账、强制发表日志、发送电子邮件等。
- 强制弹出广告页面，刷流量，传播跨站脚本蠕虫，网页挂马等。
- 结合其他漏洞，如 CSRF 漏洞，实施进一步的攻击。

## 参考文章

[CSRF & CORS 的区别](https://www.jianshu.com/p/de831ca7a523)

[【全栈修炼】CORS和CSRF修炼宝典](https://zhuanlan.zhihu.com/p/92255672)