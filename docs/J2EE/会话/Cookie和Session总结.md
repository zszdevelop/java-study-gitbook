# Cookie和Session总结

## 1. 什么是cookie和什么是session？

- cookie是一种在客户端记录用户信息的技术

  因为http协议是无状态的，为了解决这个问题而产生了cookie。记录用户名等一些应用

- session是一种在服务端记录用户信息的技术

  一般session用来在服务器端共享数据，



## 2. cookie的工作原理？session的工作原理？

- cookie工作原理

  - cookie是由服务器端创建发送回浏览器端的

  - 并且每次请求服务器都会将cookie带过去，以便服务器知道该用户是哪一个。

  - 其cookie中是使用键值对来存储信息的，并且一个cookie只能存储一个键值对。
  - 所以在获取cookie时，是会获取到所有的cookie，然后从其中遍历。

- session的工作原理
  - 就是依靠cookie来做支撑，
  - 第一次使用request.getSession()时session被创建，
  - 并且会为该session创建一个独一无二的sessionid存放到cookie中，
  - 然后发送会浏览器端，浏览器端每次请求时，都会带着这个sessionid，
  - 服务器就会认识该sessionid，知道了sessionid就找得到哪个session。
  - 以此来达到共享数据的目的。 这里需要注意的是，session不会随着浏览器的关闭而死亡，而是等待超时时间。