# Alloc服务

[官方文档](http://mpush.mydoc.io/?t=134842) 其实说的已经挺详细的，但是对于入门者，还是有些概念没理清导致走了不少弯路

## 1. alloc 的作用

> - alloc 是针对client提供的一个轻量级的负载均衡服务
> - 每次客户端在链接MPUSH server之前都要调用下该服务
> - 以获取可用的MPUSH server列表,然后按顺序去尝试建立TCP链接,直到链接建立成功

其实就是一个负载均衡服务器，主要用来给app之类的客户端做中转的。

注：app不是连接mpushserver 而是alloc

## 2. 对外提供的接口定义

> 接口类型     ：HTTP
>
> Method       : GET
>
> 参数         ：无
>
> 返回值格式   : ip:port,ip:port
>
> content-type : text/plain;charset=utf-8 

## 3. 服务部署

1. 下载alloc最新包https://github.com/mpusher/alloc/releases
2. 解压下载的tar包`tar -zvxf alloc-release-x.x.x.tar.gz`
3. 修改 conf 目录下的 `vi mpush.conf`文件, 修改方式参照`mpush server` 部署
4. 给bin目录下的脚本增加执行权限`chmod u+x *.sh`
5. 执行`./mp.sh start` 启动服务, 查看帮助直接执行`./mp.sh`
6. `cd logs`目录，`cat mpush.out`查看服务是否启动成功

>修改对应的配置，检查端口是否冲突。我改成了8002



### 4. 客户端建立连接流程

![mpush连接建立流程](https://static.oschina.net/uploads/img/201611/01201926_2SMA.png)

### 5. 实现讲解

1. 服务部署可以集成Tomcat或自己实现一个HttpServer比如基于Netty实现

2. mpush server 集群列表可以从Zookeeper查询，目前提供的有ZK查询客户端

3. 如果要实现负载均衡可以考虑使用以下几种方式实现：

   > 随机，每次从mpush server列表随机选取一个地址返回给客户端
   >
   > 轮播，每次把mpush server列表依次返回给客户端
   >
   > 按链接数量排序，链接数少的排最前面

### 6. Alloc服务存在的意义

刚开始看MPUSH的童鞋可能会有疑问，这玩意有什么用，为什么不直接连mpush server ?

如果直连你可能遇到一些问题，比如你的mpush server 可能不止一台，你怎么去选择连哪一台？

其中某台服务挂了怎么办？要更换机器又怎么办？这时你必然希望有一台前置服务来对整个mpush集群进行统一调度。