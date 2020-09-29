# 黏性session和非黏性session

他们都是解决分布式 session 不共享的问题

- 黏性session：

  同一个会话中的请求都被派送到同一个tomcat实例上，

  好处：这样就无需在多台服务器之间实现session共享

  缺点：一但用户访问的机器挂掉，那么其session就会丢失

- 非黏性session

  又名复制session：同一会话中的请求可以被分配到不同的tomcat实例上进行处理。此时就需要在不同服务器之间同步、复制session。

  优点：即使一台服务器挂掉，请求其他服务器上照样可以访问到session

  缺点：session复制需要系统资源和网络开销

## 参考文章

[黏性Session和非黏性Session](https://blog.csdn.net/joeyon1985/article/details/38736345)