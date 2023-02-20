# Tomcat优化一：优化自身的配置

## 1. 简介

Tomcat服务器在JavaEE项目中使用率非常高，所以在生产环境对Tomcat的优化也变得非常重要了。

对于Tomcat的优化，主要是从2个方面入手，一是**Tomcat自身的配置**，另一个是**Tomcat所运行的jvm虚拟机的调优**。

## 2. 前置配置：登录系统，配置tomcat用户

如果不配置tomcat用户，那么查看tomcat状态时，将会出现403错误

![image-20210728220240999](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210728220240999.png)

![image-20210728220259132](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210728220259132.png)

如果需要登录系统，必须配置tomcat用户，在安装完Tomcat后，进行如下操作

在`/conf/tomcat-users.xml`文件中的`<tomcat-users>`标签里面添加如下内容

```sh
<!-- 修改配置文件，配置tomcat的管理用户 -->
<role rolename="manager"/>
<role rolename="manager-gui"/>
<role rolename="admin"/>
<role rolename="admin-gui"/>
<user username="tomcat" password="tomcat" roles="admin-gui,admin,manager-gui,manager"/>
```

如果是tomcat7，配置了tomcat用户就可以登录系统了，但是tomcat8中不行，还需要修改另一个配置文件，否则访问不了，提示403，打开`webapps/manager/META-INF/context.xml`文件

```sh
<!-- 将Valve标签的内容注释掉，保存退出即可 -->
<?xml version="1.0" encoding="UTF-8"?>

<Context antiResourceLocking="false" privileged="true" >
  <!--<Valve className="org.apache.catalina.valves.RemoteAddrValve"
         allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />-->
  <Manager sessionAttributeValueClassNameFilter="java\.lang\.(?:Boolean|Integer|Long|Number|String)|org\.apache\.catalina\.filters\.CsrfPreventionFilter\$LruCache(?:\$1)?|java\.util\.(?:Linked)?HashMap"/>
</Context>
```

再次点击的时候，就需要输入账户密码了：tomcat/tomcat

![image-20210728220849612](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210728220849612.png)

登录之后可以看到服务器状态等信息，主要包括服务器信息，JVM，ajp和http信息

![image-20210728220924142](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210728220924142.png)

## 3. 优化1：AJP连接

> 新版tomcat8，已自动禁止

在服务状态页面中可以看到，默认状态下会启用AJP服务，并且占用8009端口。

![image-20210728221223607](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210728221223607.png)

### 3.1 什么是AJP

AJP（Apache JServer Protocol）
AJPv13协议是面向包的。WEB服务器和Servlet容器通过TCP连接来交互；为了节省SOCKET创建的昂贵代价，WEB服务器会尝试维护一个永久TCP连接到servlet容器，并且在多个请求和响应周期过程会重用连接。
![image-20210728221317207](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210728221317207.png)

我们一般是使用Nginx+Tomcat的架构，所以用不着AJP协议，把AJP连接器禁用。

修改conf下的server.xml文件，将AJP服务禁用掉即可。

```sh
<!-- 禁用AJP连接 -->
<!-- <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" /> -->
```

重启tomcat，查看效果。可以看到AJP服务已经不存在了。

![image-20210728221415136](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210728221415136.png)

## 4. 优化2：执行器（线程池）

在tomcat中每一个用户请求都是一个线程，所以可以使用线程池提高性能。

修改server.xml文件：

```sh
<!--将注释打开-->
<Executor name="tomcatThreadPool" namePrefix="catalina-exec-"
        maxThreads="500" minSpareThreads="50" prestartminSpareThreads="true" maxQueueSize="100"/>

<!--
参数说明：
maxThreads：最大并发数，默认设置 200，一般建议在 500 ~ 1000，根据硬件设施和业务来判断
minSpareThreads：Tomcat 初始化时创建的线程数，默认设置 25
prestartminSpareThreads： 在 Tomcat 初始化的时候就初始化 minSpareThreads 的参数值，如果不等于 true，minSpareThreads 的值就没啥效果了
maxQueueSize，最大的等待队列数，超过则拒绝请求
-->

<!--在Connector中设置executor属性指向上面的执行器-->
<Connector executor="tomcatThreadPool" port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
```

保存退出，重启tomcat，查看效果。

![image-20210728222804439](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210728222804439.png)

在页面中显示最大线程数为-1，这个是正常的，仅仅是显示的问题，实际使用的是指定的值。如果配置了一个Executor，则该属性的任何值将被正确记录，但是它将被显示为-1

## 5. 优化3：3种运行模式

tomcat的运行模式有3种：

- bio
  性能非常低下，没有经过任何优化处理和支持

- nio
  nio(new I/O)，是Java SE 1.4及后续版本提供的一种新的I/O操作方式(即java.nio包及其子包)。Java nio是一个基于缓冲区、并能提供非阻塞I/O操作的Java API，因此nio也被看成是non-blocking I/O的缩写。它拥有比传统I/O操作(bio)更好的并发运行性能。Tomcat8默认使用nio运行模式。

- apr
  安装起来最困难，但是从操作系统级别来解决异步的IO问题，大幅度的提高性能

对于每种协议，Tomcat都提供了对应的I/O方式的实现，而且Tomcat官方还提供了在每种协议下每种I/O实现方案的差异， HTTP协议下的处理方式如下表，详情可查看Tomcat官网说明

|              | BIO              | NIO                 | NIO2                 | APR                 |
| ------------ | ---------------- | ------------------- | -------------------- | ------------------- |
| 类名         | `Http11Protocol` | `Http11NioProtocol` | `Http11Nio2Protocol` | `Http11AprProtocol` |
| 引用版本     | ≥3.0             | ≥6.0                | ≥8.0                 | ≥5.5                |
| 轮询支持     | 否               | 是                  | 是                   | 是                  |
| 轮询队列大小 | N/A              | `maxConnections`    | `maxConnections`     | `maxConnections`    |
| 读请求头     | 阻塞             | 非阻塞              | 非阻塞               | 阻塞                |
| 读请求体     | 阻塞             | 阻塞                | 阻塞                 | 阻塞                |
| 写响应       | 阻塞             | 阻塞                | 阻塞                 |                     |
| 等待新请求   | 阻塞             | 非阻塞              | 非阻塞               | 非阻塞              |
| SSL支持      | Java SSL         | Java SSL            | Java SSL             | Open SSL            |
| SSL握手      | 阻塞             | 非阻塞              | 非阻塞               | 阻塞                |
| 最大链接数   | `maxConnections` | `maxConnections`    | `maxConnections`     | `maxConnections`    |

推荐使用nio，在tomcat8中有最新的nio2，速度更快，建议使用nio2

设置nio2：

```sh
<Connector executor="tomcatThreadPool"  port="8080" protocol="org.apache.coyote.http11.Http11Nio2Protocol"
               connectionTimeout="20000"
               redirectPort="8443" />
```

![image-20210728223416722](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210728223416722.png)

可以看到已经设置为nio2了。

## 参考文章

[史上最强Tomcat8性能优化](https://blog.csdn.net/ThinkWon/article/details/102744033)

