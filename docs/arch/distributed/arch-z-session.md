---
order: 70
category:
  - 架构
---

# 分布式系统-分布式会话及实现方案

>无状态的token或者有状态的Session集中管理是目前最为常用的方案，本节主要讨论的有状态的分布式Session会话, 包括Session Stick, Session Replication, Session 数据集中存储, Cookie Based 以及Token方式等

## 1. 基础概念

> Session + Cookie 会话方案比较简单，这里我在网上找了点资料，再回顾下基础吧。

### 1.1 为什么要产生Session

http协议本身是无状态的，客户端只需要向服务器请求下载内容，客户端和服务器都不记录彼此的历史信息，每一次请求都是独立的。

为什么是无状态的呢？因为浏览器与服务器是使用socket套接字进行通信，服务器将请求结果返回给浏览器之后，会关闭当前的socket链接，而且服务器也会在处理页面完毕之后销毁页面对象。

然而在Web应用的很多场景下需要维护用户状态才能正常工作(是否登录等)，或者说提供便捷(记住密码，浏览历史等)，状态的保持就是一个很重要的功能。因此在web应用开发里就出现了保持http链接状态的技术：一个是cookie技术，另一种是session技术。

### 1.2 Session有什么作用，如何产生并发挥作用

要明白Session就必须要弄明白什么是Cookie，以及Cookie和Session的关系。

- **什么是Cookie**

Cookie技术是http状态保持在客户端的解决方案，Cookie就是由服务器发给客户端的特殊信息，而这些信息以文本文件的方式存放在客户端，然后客户端每次向服务器发送请求的时候都会带上这些特殊的信息。

- **Cookie的产生**

当用户首次使用浏览器访问一个支持Cookie的网站的时候，用户会提供包括用户名在内的个人信息并且提交至服务器；接着，服务器在向客户端回传相应的超文本的同时也会发回这些个人信息，当然这些信息并不是存放在HTTP响应体（Response Body）中的，而是存放于HTTP响应头（Response Header）；当客户端浏览器接收到来自服务器的响应之后，浏览器会将这些信息存放在一个统一的位置。

存储在硬盘上的cookie 不可以在不同的浏览器间共享，可以在同一浏览器的不同进程间共享，比如两个IE窗口。这是因为每中浏览器存储cookie的位置不一样，比如

- ​	
  - ​	Chrome下的cookie放在：C:\Users\sharexie\AppData\Local\Google\Chrome\User Data\Default\Cache
  - Firefox下的cookie放在：C:\Users\sharexie\AppData\Roaming\Mozilla\Firefox\Profiles\tq2hit6m.default\cookies.sqlite （倒数第二个文件名是随机的文件名字）
  - Ie下的cookie放在：C:\Users\Administrator\AppData\Roaming\Microsoft\Windows\Cookies

- **Cookie的内容、作用域以及有效期**

cookie的内容主要包括：名字，值，过期时间，路径和域。路径与域合在一起就构成了cookie的作用范围。

如果不设置过期时间，则表示这个cookie的生命期为浏览器会话期间，只要关闭浏览器窗口，cookie就消失了，这种生命期为浏览器会话期的 cookie被称为会话cookie。会话cookie一般不存储在硬盘上而是保存在内存里。如果设置了过期时间，浏览器就会把cookie保存到硬盘上，关闭后再次打开浏览器，这些cookie仍然有效直到超过设定的过期时间。

- **Cookie如何使用**

cookie 的使用是由浏览器按照一定的原则在后台自动发送给服务器的。

当客户端二次向服务器发送请求的时候，浏览器检查所有存储的cookie，如果某个cookie所声明的作用范围大于等于将要请求的资源所在的位置，则把该cookie附在请求资源的HTTP请求头上发送给服务器。有了Cookie这样的技术实现，服务器在接收到来自客户端浏览器的请求之后，就能够通过分析存放于请求头的Cookie得到客户端特有的信息，从而动态生成与该客户端相对应的内容。通常，我们可以从很多网站的登录界面中看到“请记住我”这样的选项，如果你勾选了它之后再登录，那么在下一次访问该网站的时候就不需要进行重复而繁琐的登录动作了，而这个功能就是通过Cookie实现的。

- **什么是Session**

Session一般叫做会话，Session技术是http状态保持在服务端的解决方案，它是通过服务器来保持状态的。我们可以把客户端浏览器与服务器之间一系列交互的动作称为一个 Session。是服务器端为客户端所开辟的存储空间，在其中保存的信息就是用于保持状态。因此，session是解决http协议无状态问题的服务端解决方案，它能让客户端和服务端一系列交互动作变成一个完整的事务。

- **Session的创建**

那么Session在何时创建呢？当然还是在服务器端程序运行的过程中创建的，不同语言实现的应用程序有不同创建Session的方法。

当客户端第一次请求服务端，当server端程序调用 HttpServletRequest.getSession(true)这样的语句时的时候，服务器会为客户端创建一个session，并将通过特殊算法算出一个session的ID，用来标识该session对象。

Session存储在服务器的内存中(tomcat服务器通过StandardManager类将session存储在内存中)，也可以持久化到file，数据库，memcache，redis等。客户端只保存sessionid到cookie中，而不会保存session。

浏览器的关闭并不会导致Session的删除，只有当超时、程序调用HttpSession.invalidate()以及服务端程序关闭才会删除。

- **Tomcat中的Session创建**

`ManagerBase`是所有session管理工具类的基类，它是一个抽象类，所有具体实现session管理功能的类都要继承这个类，该类有一个受保护的方法，该方法就是创建sessionId值的方法：

(tomcat的session的id值生成的机制是一个随机数加时间加上jvm的id值，jvm的id值会根据服务器的硬件信息计算得来，因此不同jvm的id值都是唯一的)。

`StandardManager`类是tomcat容器里默认的session管理实现类，它会将session的信息存储到web容器所在服务器的内存里。 `PersistentManagerBase`也是继承ManagerBase类，它是所有持久化存储session信息的基类，PersistentManager继承了PersistentManagerBase，但是这个类只是多了一个静态变量和一个getName方法，目前看来意义不大，对于持久化存储session，tomcat还提供了StoreBase的抽象类，它是所有持久化存储session的基类，另外tomcat还给出了文件存储FileStore和数据存储JDBCStore两个实现。

- **Cookie与Session的关系**

cookie和session的方案虽然分别属于客户端和服务端，但是服务端的session的实现对客户端的cookie有依赖关系的，服务端执行session机制时候会生成session的id值，这个id值会发送给客户端，客户端每次请求都会把这个id值放到http请求的头部发送给服务端，而这个id值在客户端会保存下来，保存的容器就是cookie，因此当我们完全禁掉浏览器的cookie的时候，服务端的session也会不能正常使用。

## 2. 会话技术的发展

> 会话技术的发展?

- 单机 - Session + Cookie
- 多机器
  - 在负载均衡侧 - Session 粘滞
  - Session数据同步
- 多机器，集群 - session集中管理，比如redis；目前方案上用的最多的是SpringSession，早前也有用tomcat集成方式的。
- 无状态token，比如JWT

## 3. 分布式会话的方案

> 无状态的token或者有状态的Session集中管理是目前最为常用的方案， 本节主要讨论的有状态的分布式Session会话。

### 3.1 Session Stick

> 为什么这种方案到目前还有很多项目使用呢？因为不需要在项目代码侧改动，而是只需要在负载均衡侧改动。

方案即将客户端的每次请求都转发至同一台服务器，这就需要负载均衡器能够根据每次请求的会话标识（SessionId）来进行请求转发，如下图所示。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623225012021.png" alt="image-20220623225012021" />

这种方案实现比较简单，对于Web服务器来说和单机的情况一样。但是可能会带来如下问题：

- 如果有一台服务器宕机或者重启，那么这台机器上的会话数据会全部丢失。
- 会话标识是应用层信息，那么负载均衡要将同一个会话的请求都保存到同一个Web服务器上的话，就需要进行应用层（第7层）的解析，这个开销比第4层大。
- 负载均衡器将变成一个有状态的节点，要将会话保存到具体Web服务器的映射。和无状态节点相比，内存消耗更大，容灾方面也会更麻烦。

### 3.2 Session Replication

Session Replication 的方案则不对负载均衡器做更改，而是在Web服务器之间增加了会话数据同步的功能，各个服务器之间通过同步保证不同Web服务器之间的Session数据的一致性，如下图所示。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623225319136.png" alt="image-20220623225319136"  />

Session Replication 方案对负载均衡器不再有要求，但是同样会带来以下问题：

- 同步Session数据会造成额外的网络带宽的开销，只要Session数据有变化，就需要将新产生的Session数据同步到其他服务器上，服务器数量越多，同步带来的网络带宽开销也就越大。
- 每台Web服务器都需要保存全部的Session数据，如果整个集群的Session数量太多的话，则对于每台机器用于保存Session数据的占用会很严重。

### 3.3 Session 数据集中存储

Session 数据集中存储方案则是将集群中的所有Session集中存储起来，Web服务器本身则并不存储Session数据，不同的Web服务器从同样的地方来获取Session，如下图所示。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623225533405.png" alt="image-20220623225533405" />

相对于Session Replication方案，此方案的Session数据将不保存在本机，并且Web服务器之间也没有了Session数据的复制，但是该方案存在的问题在于：

- 读写Session数据引入了网络操作，这相对于本机的数据读取来说，问题就在于存在时延和不稳定性，但是通信发生在内网，则问题不大。
- 如果集中存储Session的机器或集群出现问题，则会影响应用。

### 3.4 Cookie Based

Cookie Based 方案是将**Session数据放在Cookie里**，访问Web服务器的时候，再由Web服务器生成对应的Session数据，如下图所示。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623225744196.png" alt="image-20220623225744196" />

但是Cookie Based 方案依然存在不足：

- Cookie长度的限制。这会导致Session长度的限制。
- 安全性。Seesion数据本来是服务端数据，却被保存在了客户端，即使可以加密，但是依然存在不安全性。
- 带宽消耗。这里不是指内部Web服务器之间的宽带消耗，而是数据中心的整体外部带宽的消耗。
- 性能影响。每次HTTP请求和响应都带有Seesion数据，对Web服务器来说，在同样的处理情况下，响应的结果输出越少，支持的并发就会越高。

## 4. Token

JSON Web Token，一般用它来替换掉Session实现数据共享。

使用基于 Token 的身份验证方法，在服务端不需要存储用户的登录记录。大概的流程是这样的：

- 1、客户端通过用户名和密码登录服务器；
- 2、服务端对客户端身份进行验证；
- 3、服务端对该用户生成Token，返回给客户端；
- 4、客户端将Token保存到本地浏览器，一般保存到cookie中；
- 5、客户端发起请求，需要携带该Token；
- 6、服务端收到请求后，首先验证Token，之后返回数据

![image-20220623230215140](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623230215140.png)

**优点**：

- 无状态、可扩展 ：在客户端存储的Token是无状态的，并且能够被扩展。基于这种无状态和不存储Session信息，负载均衡器能够将用户信息从一个服务传到其他服务器上。
- 安全：请求中发送token而不再是发送cookie能够防止CSRF(跨站请求伪造)。
- 可提供接口给第三方服务：使用token时，可以提供可选的权限给第三方应用程序。
- 多平台跨域

对应用程序和服务进行扩展的时候，需要介入各种各种的设备和应用程序。 假如我们的后端api服务器a.com只提供数据，而静态资源则存放在cdn 服务器b.com上。当我们从a.com请求b.com下面的资源时，由于触发浏览器的同源策略限制而被阻止。

**我们通过CORS（跨域资源共享）标准和token来解决资源共享和安全问题**。

举个例子，我们可以设置b.com的响应首部字段为：

```bash
// 第一行指定了允许访问该资源的外域 URI。
Access-Control-Allow-Origin: http://a.com

// 第二行指明了实际请求中允许携带的首部字段，这里加入了Authorization，用来存放token。
Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept

// 第三行用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。
Access-Control-Allow-Methods: GET, POST, PUT,DELETE

// 然后用户从a.com携带有一个通过了验证的token访问B域名，数据和资源就能够在任何域上被请求到。

  
```

## 参考文章

[**分布式系统 - 分布式会话及实现方案**](https://pdai.tech/md/arch/arch-z-session.html)