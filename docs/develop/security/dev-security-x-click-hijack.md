---
order: 60
category:
  - 开发
  - 安全
---

# 开发安全 - 点击劫持详解

>点击劫持其实是一种视觉上的欺骗手段，攻击者将一个透明的、不可见的iframe覆盖在一个网页上，通过调整iframe页面位置，诱使用户在页面上进行操作，在不知情的情况下用户的点击恰好是点击在iframe页面的一些功能按钮上。

## 1. 点击劫持简介

> 点击劫持是一种恶意技术，欺骗网络用户点击与用户认为他们点击的内容不同的内容，从而可能在点击看似无害的网页时泄露机密信息。〜维基百科

点击劫持攻击基本上意味着欺骗用户通过框架页面点击某些东西来执行一些恶意攻击，比如，当攻击者在窗口中使用透明iframe诱骗用户点击CTA（例如按钮或链接）到另一个具有相同外观窗口的服务器时发生攻击。从某种意义上说，攻击者劫持了原始服务器的点击并将其发送到另一台服务器。这是对访问者本身和服务器的攻击。

以下是点击劫持的几种可能漏洞或用图。

- 诱骗用户公开其社交网络个人资料信息
- 在Facebook上分享或喜欢链接
- 点击Google Adsense广告即可生成每次点击付费收入
- 让用户在Twitter或Facebook上关注某人
- 下载并运行恶意软件（恶意软件），允许远程攻击者控制其他计算机
- 在Facebook粉丝页面上获得喜欢或在Google Plus上获得+1
- 播放YouTube视频以获取观看次数

点击劫持很容易实现，如果您的网站只需单击即可完成操作，那么很可能是点击劫持。它可能不像跨站点脚本或代码注入攻击那样常见，但它仍然存在另一个漏洞。有时看到视觉效果会很有帮助。

## 2. 攻击方式

### 2.1 图片覆盖攻击（XSIO）

点击劫持的本质就是一种视觉欺骗，通过这种思想，黑客可以完成很多劫持，例如：钓鱼网站的实现，通过图片覆盖导致链接到一些未知的网站，从而达到黑客正真的目的。原理：通过调整图片的style使得图片能够覆盖在他所指定的任意位置。

XSIO不同于XSS，它利用的是图片的style，或者能够控制CSS。如果应用没有限制style的position为absolute的话，图片就可以覆盖到页面上的任意位置，形成点击劫持。

### 2.2 Flash点击劫持

攻击者通过Flash构造出了点击劫持，在完成一系列复杂的动作之后，最终控制了用户的摄像头，原理：黑客在Flash游戏页面内嵌了一个iframe，通过游戏选项按钮诱导用户去点击按钮，从而最终实现Flash点击劫持！每次点击完成之后按钮的位置都是可变化的、移动的。

### 2.3 拖拽劫持与数据窃取

目前很多浏览器都开始支持Drag&Drop的API。对于用户来说，拖拽他们的操作更加简单。浏览器拖拽的对象可以是一个连接，也可以是一段文字，还可以从一个窗口拖拽到另外一个窗口，因此拖拽不受同源策略的影响。

“拖拽劫持”的思路是诱使用户从隐藏的不可见iframe中拖拽出攻击者希望得到的数据，然后放到攻击者能够控制的另外一个页面，从而窃取数据。

### 2.4 触屏劫持（TapJacking）

触屏，从手机OS的角度来看，触屏实际上就是一个事件，手机OS捕捉这些事件，并执行相应的动作。

一次触屏操作，可能会对应一下几个事件的发生：

- touchstart，手指触摸屏幕时发生；
- Touchend，手指离开屏幕时发生；
- Touchmove，手指滑动时发生；
- Touchcancel，系统可取消touch事件

## 3. 攻击示例

点击劫持（ClickJacking）是一种视觉上的欺骗手段。大概有两种方式，一是攻击者使用一个透明的iframe，覆盖在一个网页上，然后诱使用户在该页面上进行操作，此时用户将在不知情的情况下点击透明的iframe页面；二是攻击者使用一张图片覆盖在网页，遮挡网页原有位置的含义。

![image-20220707220322111](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220707220322111.png)

### 3.1 iframe覆盖（嵌入iframe框）

> 以下是网上的一个例子，忽略其真实性和意义，只是辅助你理解其思路

假如我们在百度有个贴吧，想偷偷让别人关注它。于是我们准备一个页面：

```html
<!DOCTYPE HTML>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
    <head>
    <title>点击劫持</title>
    <style>
        html,body,iframe{
            display: block;
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            border:none;
        }
        iframe{
            opacity:0;
            filter:alpha(opacity=0);
            position:absolute;
            z-index:2;
        }
        button{
            position:absolute;
            top: 315px;
            left: 462px;
            z-index: 1;
            width: 72px;
            height: 26px;
        }
    </style>
    </head>
    <body>
        那些不能说的秘密
        <button>查看详情</button>
        <iframe src="http://tieba.baidu.com/f?kw=%C3%C0%C5%AE"></iframe>
    </body>
</html>

```

网址传播出去后，用户手贱点击了查看详情后，其实就会点到关注按钮。

PS：可以把iframe透明设为0.3看下实际点到的东西。

![image-20220707220616837](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220707220616837.png)

这样贴吧就多了一个粉丝了。

### 3.2 粘贴劫持

假设你现在是一个黑客，并且你已经建了一个论坛，在注册页面设置两处常见的要求“Enter your email”栏以及”Retype your email”栏。然后悄悄地在”Retype your email”栏放个隐藏iframe，此位置会加载另一个正常网站的设置页面表单。

https://security.love/XSSJacking/index2.html

![image-20220707220738260](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220707220738260.png)



当用户在你的网站上注册时，大多数人会先输入一遍邮箱，然后复制第一栏中的邮箱再粘贴到第二栏中（小编默默躺枪）——就在这个过程中，用户剪切板中的内容已经神不知鬼不觉地被插入到那个正常网站设置页面中。如果这家正常网站相应表单字段存在XSS漏洞，则攻击代码就能发挥作用。受害者根本就不知道整个过程是怎么进行、何时进行的。

攻击中所利用的粘贴劫持技术，是将XSS payload粘贴到其他域名的文本栏框架。由于这些框架的位置可以改变，并且不可见，因此可以利用点击劫持让用户觉得他还在访问他“正在”访问的那个网站。事实上，他已经触发了Self-XSS漏洞，黑客可得到他的敏感信息。

通过XSS劫持攻击，黑客可以盗取该用户的cookie、收件箱信息、配置详情，修改配置文件设置（比如手机号、邮箱号）或是执行其他恶意操作。

### 3.3 拖放劫持

实际上就是点击劫持的演进版本。

在现在的Web应用中，有一些需要用户采用鼠标拖放完成的操作，而且用户也经常在浏览器中使用鼠标拖放操作来代替复制粘贴。因此，拖放操作劫持很大程度的扩展了

点击劫持的攻击范围，也将劫持模式从单纯的鼠标点击扩展到了鼠标拖放行为。

例子：通过劫持某个页面的拖放操作实现对其他页面链接的窃取，这些连写中可能会有session key、token、password等信息；或者可以把其他浏览器中的页面内容拖放到富文本编辑器模式中，这样就能够看到页面源代码了，而这些HTML源代码中可能会存在铭感信息。

### 3.4 组合利用方式

在挖掘xss时，你可能会遇到self-xss，那么这时你可以考虑self_xss+点击劫持或csrf+self-xss

## 4. 点击劫持利用框架

- **首先，为了快速生成clickjacking的poc框架**

https://github.com/samyk/quickjack

- **可以通过截图的方式方便的把需要劫持的部分网页截取出来**，这个工具也提供在线的使用

http://samy.pl/quickjack/quickjack.html

通过截取之后按下“I‘am done“按钮就会生成对应的截取代码

- **可以使用burp自带的工具进行生成poc**,参考以下链接：

https://support.portswigger.net/customer/en/portal/articles/2363105-using-burp-to-find-clickjacking-vulnerabilities

- **可以使用CJExploiter**

CJExploiter是一个支持拖放的点击劫持漏洞利用辅助工具。首先在本地用浏览器打开“index.html”，输入目标的URL并点击“View Site”。你可以自定义JS，最后点击“Exploit it”，你就能得到POC了。可参考https://www.freebuf.com/sectool/104892.html

## 5. 点击劫持防御

> X-FRAME-OPTIONS是目前最可靠的方法。

x-frame-options（XFO），是一个HTTP响应头，也称为HTTP安全头，自2008年以来一直存在。在2013年，它正式发布为RFC 7034，但不是互联网标准。此标题告诉您的浏览器在处理您网站的内容时的行为方式。其成立的主要原因是通过不允许在帧中呈现页面来提供点击劫持保护。这可以包括在页面的呈现`<frame>`，`<iframe>`或`<object>`。iframe用于将第三方内容嵌入并隔离到网站中。使用iframe的内容示例可能包括社交媒体共享按钮，Google地图，视频播放器，音频播放器，第三方广告，甚至一些OAuth实施。

并且在IE8、Firefox3.6、Chrome4以上的版本均能很好的支持。

这个头有三个值：

- DENY // 拒绝任何域加载
- SAMEORIGIN // 允许同源域下加载
- ALLOW-FROM // 可以定义允许frame加载的页面地址, 比如 `x-frame-options: ALLOW-FROM https://domain.com/`
- 在Nginx上启用

要x-frame-options在Nginx上启用标头，只需将其添加到服务器块配置中即可。

```java
add_header x-frame-options "SAMEORIGIN" always; 
```

- 在Apache上启用

要在Apache上启用，只需将其添加到您的httpd.conf文件（Apache配置文件）。

```java
header always set x-frame-options "SAMEORIGIN"
```

- 在IIS上启用

要在IIS上启用，只需将其添加到您站点的Web.config文件中即可。

```xml
<system.webServer>
    ...

    <httpProtocol>
        <customHeaders>
            <add name="X-Frame-Options" value="SAMEORIGIN" />
        </customHeaders>
    </httpProtocol>

    ...
</system.webServer>

```

除此之外有的浏览器厂商也增加扩展功能来防御clickjacking，如firefox的"content security policy"和"No-script"

## 参考文章

[**开发安全 - 点击劫持详解**](https://pdai.tech/md/develop/security/dev-security-x-click-hijack.html)