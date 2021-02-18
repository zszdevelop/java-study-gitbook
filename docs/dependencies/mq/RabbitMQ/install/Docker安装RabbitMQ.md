# Docker安装RabbitMQ

## 1. 获取镜像

1. 使用`docker search rabbitMq`命令获取镜像列表

   ![image-20200802234417800](/Users/zsz/Library/Application Support/typora-user-images/image-20200802234417800.png)

2. 使用`docker pull rabbitmq` 拉取镜像

   ```
   docker pull rabbitmq
   ```

## 2. 创建rabbitMq容器

1. 使用`docker images`获取查看rabbitMQ镜像ID，我的是`b1526c8ed2ad`

   ![image-20200802234628663](/Users/zsz/Library/Application Support/typora-user-images/image-20200802234628663.png)

2. 运行docker容器

   执行`docker run --name rabbitmq -d -p 15672:15672 -p 5672:5672 b1526c8ed2ad`命令创建rabbitMq容器，关于其中的参数含义如下：

   - --name指定了容器名称
   - -d 指定容器以后台守护进程方式运行
   - -p指定容器内部端口号与宿主机之间的映射，rabbitMq默认要使用15672为其web端界面访问时端口，5672为数据通信端口

3. 查看容器运行状态

   ```
   docker ps
   ```

   ![image-20200802235205255](/Users/zsz/Library/Application Support/typora-user-images/image-20200802235205255.png)

4. 查看容器日志

   查看容器日志 使用`docker logs -f 容器ID`命令可以查看容器日志，我们执行`docker logs -f 3ae`命令查看rabbitMq在启动过程中日志，3ae是容器ID的简写——容器ID太长，使用时其写前几位即可

   ![image-20200802235358837](/Users/zsz/Library/Application Support/typora-user-images/image-20200802235358837.png)

   从日志可以看出，rabbitMq默认创建了guest用户，并且赋予administrator角色权限，同时服务监听5672端口TCP连接和15672端口的HTTP连接，至此说明安装成功。

## 3. 访问rabbitMq

1. 访问web界面

   在浏览器 输入你的`主机Ip:15672`回车即可访问rabbitMq的Web端管理界面，默认用户名和密码都是`guest`，如图出现如下界面代表已经成功了。

2. 新添加一个账户

   默认的`guest` 账户有访问限制，默认只能通过本地网络(如 localhost) 访问，远程网络访问受限，所以在使用时我们一般另外添加用户，例如我们添加一个root用户：

   2.1 执行`docker exec -i -t 3a8161fea5d8 bin/bash`进入到rabbitMq容器内部

   ![image-20200803000608540](/Users/zsz/Library/Application Support/typora-user-images/image-20200803000608540.png)

   

   2.2执行`rabbitmqctl add_user root 123456` 添加用户，用户名为root,密码为123456

   ![image-20200803000855859](/Users/zsz/Library/Application Support/typora-user-images/image-20200803000855859.png)

   

   2.3 执行`abbitmqctl set_permissions -p / root ".*" ".*" ".*"` 赋予root用户所有权限

   ```
   root@3ae75edc48e2:/# rabbitmqctl set_permissions -p / root ".*" ".*" ".*"
   Setting permissions for user "root" in vhost "/" ...
   ```

   2.4 执行`rabbitmqctl set_user_tags root administrator`赋予root用户administrator角色

   ```
   root@3ae75edc48e2:/# rabbitmqctl set_user_tags root administrator
   Setting tags for user "root" to [adminstrator] ...
   ```

   2.5执行`rabbitmqctl list_users`查看所有用户即可看到root用户已经添加成功

   ```
   root@3ae75edc48e2:/# rabbitmqctl list_users
   Listing users ...
   user	tags
   guest	[administrator]
   root	[administrator]
   复制代码
   ```

   执行`exit`命令，从容器内部退出即可。这时我们使用root账户登录web界面也是可以的。到此，rabbitMq的安装就结束了，接下里就实际代码开发。

   

## 参考文章

[docker安装RabbitMq](https://juejin.im/post/6844903970545090574)