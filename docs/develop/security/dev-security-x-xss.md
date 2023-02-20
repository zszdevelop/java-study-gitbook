---
order: 30
category:
  - 开发
  - 安全
---

# 开发安全 - XSS详解

>XSS是跨站脚本攻击(Cross Site Scripting)，为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS。恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。

## 1. XSS 简介

恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。

### 1.1 示例

举一个简单的例子，就是留言板。我们知道留言板通常的任务就是把用户留言的内容展示出来。正常情况下，用户的留言都是正常的语言文字，留言板显示的内容也就没毛病。然而这个时候如果有人不按套路出牌，在留言内容中丢进去一行

```js
<script>alert("aaa")</script>
```

那么留言板界面的网页代码就会变成形如以下：

```js
<html>
    <head>
       <title>Board</title>
    </head>
    <body>
    <div id="board">
        <script>alert("aaa")</script>
    </div>     
    </body>
</html>
```

那么这个时候问题就来了，当浏览器解析到用户输入的代码那一行时会发生什么呢？答案很显然，浏览器并不知道这些代码改变了原本程序的意图，会照做弹出一个信息框。

既然能够执行脚本，那么，这些脚本完全可以是：

- 链接劫持

```js
<script>window.location.href="http://www.baidu.com";</script>
```

- 盗取cookie

```js
<script>alert("document.cookie");</script>
```

对于攻击者来说，能够让受害者浏览器执行恶意代码的唯一方式，就是把代码注入到受害者从网站下载的网页中, 这就是xss攻击。

## 2. XSS 攻击类型

> 通常XSS攻击分为：`反射型xss攻击`, `存储型xss攻击` 和 `DOM型xss攻击`。同时注意以下例子只是简单的向你解释这三种类型的攻击方式而已，实际情况比这个复杂，具体可以再结合最后一节深入理解。

### 2.1 反射型xss攻击

> 反射型的攻击需要用户主动的去访问带攻击的链接，攻击者可以通过邮件或者短信的形式，诱导受害者点开链接。如果攻击者配合短链接URL，攻击成功的概率会更高。

在一个反射型XSS攻击中，恶意文本属于受害者发送给网站的请求中的一部分。随后网站又把恶意文本包含进用于响应用户的返回页面中，发还给用户。

我们来看下面这个场景:

![image-20220706215729025](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220706215729025.png)

- 用户误点开了带攻击的url : `http://xxx?keyword=<script>alert('aaa')</script>`
- 网站给受害者的返回中包含了来自URL的的恶意文本
- 用户的浏览器收到文本后执行页面，会在网页中弹窗aaa

注意，这里如果页面是后端模板渲染生成，keyword参数可能是在model里面设置参数的

### 2.2 存储型xss攻击

> 这种攻击方式恶意代码会被存储在数据库中，其他用户在正常访问的情况下，也有会被攻击，影响的范围比较大。

我们来看这种攻击的一个场景

![image-20220706215925537](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220706215925537.png)



1、攻击者通过评论表单提交将`<script>alert(‘aaa’)</script>`提交到网站

2、网站后端对提交的评论数据不做任何操作，直接存储到数据库中

3、其他用户访问正常访问网站，并且需要请求网站的评论数据

4、网站后端会从数据库中取出数据，直接返回给用户

5、用户得到页面后，直接运行攻击者提交的代码`<script>alert(‘aaa’)</script>`，所有用户都会在网页中弹出aaa的弹窗

### 2.3 DOM型xss攻击

> 基于DOM的XSS攻击是反射型攻击的变种。服务器返回的页面是正常的，只是我们在页面执行js的过程中，会把攻击代码植入到页面中。

我们来看这种攻击的一个场景

![image-20220706220046149](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220706220046149.png)

1、用户误点开了带攻击的url : `http://xxx?name=<script>alert('aaa')</script>`

2、网站给受害者的返回中正常的网页

3、用户的浏览器收到文本后执行页面合法脚本，这时候页面恶意脚本会被执行，会在网页中弹窗aaa

这种攻击方式发生在我们合法的js执行中，服务器无法检测我们的请求是否有攻击的危险

## 3. XSS 攻击的危害

- 通过document.cookie盗取cookie
- 使用js或css破坏页面正常的结构与样式
- 流量劫持（通过访问某段具有window.location.href定位到其他页面）
- Dos攻击：利用合理的客户端请求来占用过多的服务器资源，从而使合法用户无法得到服务器响应。
- 利用iframe、frame、XMLHttpRequest或上述Flash等方式，以（被攻击）用户的身份执行一些管理动作，或执行一些一般的如发微博、加好友、发私信等操作。
- 利用可被攻击的域受到其他域信任的特点，以受信任来源的身份请求一些平时不允许的操作，如进行不当的投票活动。
- DOS（拒绝服务）客户端浏览器。
- 钓鱼攻击，高级的钓鱼技巧。
- 劫持用户Web行为，甚至进一步渗透内网。
- 蠕虫式挂马攻击、刷广告、刷浏量、破坏网上数据

## 4. XSS 攻击的防御

XSS攻击其实就是代码的注入。用户的输入被编译成恶意的程序代码。所以，为了防范这一类代码的注入，需要确保用户输入的安全性。对于攻击验证，我们可以采用以下两种措施：

- **编码，就是转义用户的输入，把用户的输入解读为数据而不是代码**
- **校验，对用户的输入及请求都进行过滤检查，如对特殊字符进行过滤，设置输入域的匹配规则等**。

具体比如：

- **对于验证输入**，我们既可以在`服务端验证`，也可以在`客户端验证`
- **对于持久性和反射型攻击**，`服务端验证`是必须的，服务端支持的任何语言都能够做到
- **对于基于DOM的XSS攻击**，验证输入在客户端必须执行，因为从服务端来说，所有发出的页面内容是正常的，只是在客户端js代码执行的过程中才发生可攻击
- 但是对于各种攻击方式，**我们最好做到客户端和服务端都进行处理**。

其它还有一些辅助措施，比如：

- **入参长度限制**： 通过以上的案例我们不难发现xss攻击要能达成往往需要较长的字符串，因此对于一些可以预期的输入可以通过限制长度强制截断来进行防御。
- 设置cookie httponly为true（具体请看下文的解释）

具体措施如下：

### 4.1 escapeHTML

- 前端：

```html
// util封装可以参考 HTMLParser.js, 或者自己封装
util.escapeHtml(html);
```

- 后端， 推荐使用ApacheCommon包下 `StringEscapeUtils` – 用于正确处理转义字符，产生正确的Java、JavaScript、HTML、XML和SQL代码；

```java
// encode html
System.out.println(StringEscapeUtils.escapeHtml("<a>abc</a>"));
System.out.println(StringEscapeUtils.unescapeHtml("&lt;a&gt;abc&lt;/a&gt;"));

// encode js
System.out.println(StringEscapeUtils.escapeJavaScript("<script>alert('123')<script>"));
System.out.println(StringEscapeUtils.unescapeJavaScript("<script>alert(\'123\')<script>"));

  
```

### 4.2 过滤或者校验

校验是一种过滤用户输入以至于让代码中恶意部分被移除的行为。校验都是通过一定的经验和规则，对用户的输入进行匹配，过滤，去除掉存在攻击风险的部分。

我们可以通过黑名单的方式和白名单的方式来设置我们的规则，对用户提交的数据进行有效性验证，仅接受符合我们期望格式的内容提交，阻止或者忽略除此外的其他任何数据。

- **黑名单** 我们可以把某些危险的标签或者属性纳入黑名单，过滤掉它。
- **白名单** 这种方式只允许部分标签和属性，不在这个白名单中的，一律过滤掉它。

这里举个例子，**富文本的防御**: 富文本的情况非常的复杂，js可以藏在标签里，超链接url里，何种属性里。

```js
<script>alert(1)</script>
<a href="javascript:alert(1)"></a>
<img src="abc" onerror="alert(1)"/>

  
```

所以我们不能过用上面的方法做简单的转义, 因为情况实在太多了。思路就是黑白名单校验，这里提供一个包，帮助我们去解析html树状结构，它使用起来和jquery非常的类似。

```bash
npm install cheerio --save

```



```js
var xssFilter = function(html) {
    if(!html) return '';
    var cheerio = require('cheerio');
    var $ = cheerio.load(html);
    //白名单
    var whiteList = {
        'html' : [''],
        'body' : [''],
        'head' : [''],
        'div' : ['class'],
        'img' : ['src'],
        'a' : ['href'],
        'font':['size','color']
    };

    $('*').each(function(index,elem){
        if(!whiteList[elem.name]) {
            $(elem).remove();
            return;
        }
        for(var attr in elem.attribs) {
            if(whiteList[elem.name].indexOf(attr) === -1) {
                $(elem).attr(attr,null);
            }
        }

    });

    return $.html();
}

console.log(xssFilter('<div>你好<a href="http://www.baidu.com">百度</a><script>alert("哈哈你被攻击了")</script></div>'));

  
```


### 4.3 CSP(Content Security Policy)

内容安全策略（Content Security Policy，简称CSP）是一种以可信白名单作机制，来限制网站中是否可以包含某来源内容。

CSP对你用于浏览页面的浏览器做出了限制，以确保它只能从可信赖来源下载的资源。*资源*可以是脚本，样式，图片，或者其他被页面引用的文件。这意味着即使攻击者成功的在你的网站中注入了恶意内容，CSP也能免于它被执行。

默认配置下不允许执行内联代码（`<script>`块内容，内联事件，内联样式），以及禁止执行eval() , newFunction() , setTimeout([string], ...) 和setInterval([string], ...) 。

示例：

- 只允许本站资源

```js
Content-Security-Policy： default-src ‘self’
```

- 允许本站的资源以及任意位置的图片以及 https://pdai.tech 下的脚本。

```js
Content-Security-Policy： default-src ‘self’; img-src *;
script-src https://pdai.tech

  
```

## 5. XSS 攻击再深入理解

### 5.1 对`script`再做阐述

> 有很多初学者以为只要对`<script>`进行替换就可以了？其实不是，具体看下面：

```html
// 外部攻击代码
<script src='ls.js'></script>  

// 注释方法防止过滤  
<script>alert/*注释*/('XSS')</script>    
```

### 5.2 是不是只要对`script`进行防御呢？

> 用户的输入通过`<script>这里是脚本</script>`插入脚本只是最基本的一种方式， 其它方式还有：

```html
// img链接地址xss
<img src="javascript:alert('XSS')">    

// 加载图像失败执行
<img src='null' οnerrοr="alert('XSS')">    

// 利用onload，onXXX事件
<iframe onload="alert('XSS')">

// a链接的xss
<a href ="javascript:alert('XSS')"></a>   

// 在css样式中加入
body{bockground-image:url(javascript:alert('XSS'))}   
```

### 5.3 通过xss盗用cookie危害是什么？

> csrf攻击其实是不能盗用cookie的，它只是以当前的名义进行恶意操作；而xss攻击是可以直接盗用cookie。

那盗用cookie的危害是什么？比如拿到用户的cookie信息，然后传送到攻击者自己的服务器，从cookie中提取敏感信息，拿到用户的登录信息，或者攻击者可以通过修改DOM在页面上插入一个假的登陆框，也可以把表单的`action`属性指向他自己的服务器地址，然后欺骗用户提交自己的敏感信息。

这就是为什么cookie也是要防御的，比如

- 设置http-only
- 设置cookie的有效周期

```java
@RequestMapping("/login")
@ResponseBody
public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Cookie cookie = new Cookie("access_token", UUID.randomUUID().toString());
    cookie.setHttpOnly(true); // 这里
    cookie.setPath("/");
    cookie.setDomain("localhost");
    response.addCookie(cookie);
    response.sendRedirect("http://localhost:8088/index.html");
}

  
```

### 5.4 xss攻击和csrf攻击配合

> 一般攻击可能不是单一的行为，而是可能会组合攻击；比如xss攻击一般还可以配合csrf攻击进行配合攻击，这里给个例子，方便你理解；注意，只是仅仅方便你理解，实际不是这么简单。

假设你可以通过如下GET请求方式进行修改密码，这是典型的csrf攻击方式：[开发安全 - CSRF 详解]()

```js
http://127.0.0.1/test/vulnerabilities/csrf/?
password_new=123456&password_conf=123456&Change=Change
```

那么你可以通过如下方式xss攻击添加脚本

```js
<script type="text/javascript" src="http://127.0.0.1/test/vulnerabilities/csrf/?
password_new=123456&password_conf=123456&Change=Change#"></script>
```

### 5.5 对于后端渲染HTML框架

在实际的开发中，后端框架（比如SpringMVC相关框架）modelAndView是可以通过viewResolver渲染生成html的；而一般的视图渲染解析框架都已经可以处理一部分xss攻击的情况，比如thymeleaf，freemarker等等。

这里要提醒你的是`避免误用`, 举个thymeleaf的例子，这个漏洞是我在实际的渗透测试中遇到的一个xss攻击:

- html页面，这是一个封装的一个消息module

```html
<div id="msgContainer">
    <div th:utext="${msg}"></div>
</div>
```

- 后端添加

```java
// param
String param = "your input name";

// 后端根据不同的处理情况，返回不同的信息
String msg = "<b>Warning</b>: this is pdai's warning, invalid for your input name: " + param; 
model.addMsg("msg", msg);

```

这里后端的本意是期望封装一个msg组件，并且可以通过html方式高亮一些关键字，做到最大程度的通用。

但问题是 `th:utext`不做内容编码的，而且存在输入参数（可能这两块是不同的人写的，写后端msg组件的人觉得`<b>Warning</b>`很方便；但是不会意识到，其他人可能可能会添加用户的输入参数进来），一旦用户的输入中包含脚本，将导致xss注入的可能。

### 5.6 对于前端渲染HTML

在使用 .innerHTML、.outerHTML、document.write() 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 .textContent、.setAttribute() 等。

如果用 Vue/React 技术栈，并且不使用 v-html/dangerouslySetInnerHTML 功能，就在前端 render 阶段避免 innerHTML、outerHTML 的 XSS 隐患。

DOM 中的内联事件监听器，如 location、onclick、onerror、onload、onmouseover 等，`<a>` 标签的 href 属性，JavaScript 的 eval()、setTimeout()、setInterval() 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。

**在操作时可以参考如下**：

- 前端有个JS库叫 `HTMLParser.js`, 可以用来encodeHtml
- 有一个类库是针对防XSS攻击的：[js-xss](https://github.com/leizongmin/js-xss)

### 5.7 浏览器之间对xss处理有差异

> 对于有些xss漏洞可能在某些浏览器无法复现的问题？在某些浏览器某些版本下：

- chrome浏览器自带防御,可拦截反射性XSS（HTML内容和属性）
- firefox不会自动拦截

这个在做渗透测试，或者开发修复测试时要注意下这个问题。

## 参考文章

[**开发安全 - XSS 详解**](https://pdai.tech/md/develop/security/dev-security-x-xss.html)