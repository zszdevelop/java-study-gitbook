---
order: 910
category:
  - RabbitMQ  
  - MQ

---

# RabbitMQ安装 - Docker安装RabbitMQ

## 1. 创建rabbitMq容器

1. 获取镜像并运行

   ```
   docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   ```

   -d 后台运行程序

   包含删除历史rabbitmq

   ```
   docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   ```

2. 查看容器运行状态

   ```
   docker ps
   ```

3. 查看容器日志

   查看容器日志 使用`docker logs -f 容器ID`命令可以查看容器日志，我们执行`docker logs -f 3ae`命令查看rabbitMq在启动过程中日志，3ae是容器ID的简写——容器ID太长，使用时其写前几位即可

   ![image-20200802235358837](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20200802235358837.png)

   从日志可以看出，rabbitMq默认创建了guest用户，并且赋予administrator角色权限，同时服务监听5672端口TCP连接和15672端口的HTTP连接，至此说明安装成功。

## 2. 访问rabbitMq

1. 访问web界面

   在浏览器 输入你的`主机Ip:15672`回车即可访问rabbitMq的Web端管理界面，默认用户名和密码都是`guest`，如图出现如下界面代表已经成功了。

2. 新添加一个账户

   默认的`guest` 账户有访问限制，默认只能通过本地网络(如 localhost) 访问，远程网络访问受限，所以在使用时我们一般另外添加用户，例如我们添加一个root用户：

   2.1 进入到rabbitMq容器内部

   ```sh
   docker exec -i -t 3a8161fea5d8 bin/bash
   ```

   2.2  添加用户，用户名为root,密码为123456

   ```
   rabbitmqctl add_user root 123456
   ```

   2.3 赋予root用户所有权限

   ```sh
    rabbitmqctl set_permissions -p / root ".*" ".*" ".*"
   ```

2.4 赋予root用户administrator角色

```
   root@3ae75edc48e2:/# rabbitmqctl set_user_tags root administrator
```

   2.5查看所有用户,即可看到root用户已经添加成功

   ```
root@3ae75edc48e2:/# rabbitmqctl list_users
   Listing users ...
   user	tags
   guest	[administrator]
   root	[administrator]
   ```

   执行`exit`命令，从容器内部退出即可。这时我们使用root账户登录web界面也是可以的。到此，rabbitMq的安装就结束了，接下里就实际代码开发。



## 参考文章

[docker安装RabbitMq](https://juejin.im/post/6844903970545090574)
