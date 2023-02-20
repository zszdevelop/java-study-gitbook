---
order: 410
category:
  - RabbitMQ  
  - MQ


---

# RabbitMQ管理 - 多租户与权限：vhost

## 1. 简介

每一个 RabbitMQ 服务器都能创建 **虚拟的消息服务器**，称之为 **虚拟主机（virtual host）**，简称 **vhost**。

vhost 本质上是一个独立的小型 RabbitMQ 服务器，拥有自己独立的队列、交换器、绑定关系等，并且 **拥有自己独立的权限**。

vhost 可避免队列和交换器等命名冲突，**vhost 之间是绝对隔离的**，无法将 vhost1 中的交换器与 vhost2 中的队列进行绑定，这样的机制既保证了安全性，又确保可移植性。

如果使用的 RabbitMQ 达到一定规模的时候，**建议用户对业务功能、场景进行归类区分，并分配独立的 vhost**

vhost 是 AMQP 概念的基础，客户端在联机的时候 **必须指定一个 vhost**。RabbitMQ 默认创建的 vhost 为 `/`，使用默认的用户名 guest 和密码 guest 就可以访问它。但是为了安装和方便，建议重新建立一个新的用户来访问它。

## 2. 创建 vhost：add_host

```bash
rabbitmqctl add_host {vhost}

vhost: 就是 vhost 名称
```

实践练习

```bash
[root@study ~]# rabbitmqctl add_vhost vhost1
Creating vhost "vhost1"
```

## 3. vhost 查看：list_vhosts

查看 vhost 的相关信息

```bash
rabbitmqctl list_vhosts [vhostinfoitem...]

vhostinfoitem 参数：
	name： vhost 名称
	tracing：表示是否使用了 RabbitMQ 的 trace 功能。trace 功能 RabbitMQ 扩展中讲解
```

实践练习

```bash
[root@study ~]# rabbitmqctl list_vhosts name tracing
Listing vhosts
vhost1	false
/	    false

# 打开 trace 功能
[root@study ~]# rabbitmqctl trace_on
Starting tracing for vhost "/"

[root@study ~]# rabbitmqctl list_vhosts name tracing
Listing vhosts
vhost1	false
/	    true			# 可以看到这里变成了 true
	
```

## 4. 删除 vhost：delete_host

```bash
rabbitmqctl delete_host {vhost}
```

删除一个 vhost ，同时也会删除下面的队列、交换器、绑定关系、用户权限、参数和策略等信息。

实践练习

```bash
[root@study ~]# rabbitmqctl delete_vhost vhost1
Deleting vhost "vhost1"

[root@study ~]# rabbitmqctl list_vhosts
Listing vhosts
/
```

## 5. 权限授予：set_permissions

AMQP 协议中并没有指定权限在 vhost 级别还是在服务器级别实现，由具体的应用自定义。

在 RabbitMQ 中，权限以 vhost 为单位。在 **创建一个用户时**，用户通常会被 **指派给至少一个 vhost**，意味着该用户只能访问被指派的 vhost 内的资源。

授予权限命令为

```bash
rabbitmqctl set_permissions [-p vhost] {user} {conf} {write} {read}

参数含义：
 `-p vhost`：给哪一个 vhost 授权用户访问权限
 user：给哪一个用户指定权限
 conf： 用于匹配用户在哪些资源上拥有可配置权限的正则表达式；指：队列和交换器的创建及删除之类的操作
 write：用于匹配用户在哪些资源上拥有可写权限的正则表达式；指：发布消息
 read： 用于匹配用户在哪些资源上拥有可读权限的正则表达式；指：与消息有关的操作，包括读取消息及清空整个队列等
```

下表展示了不同 AMQP 命令的列表和对应的权限

| AMQP 命令                   | 可配置   | 可写                  | 可读             |
| --------------------------- | -------- | --------------------- | ---------------- |
| `Exchange.Declare`          | exchange |                       |                  |
| `Exchange.Declare(with AE)` | exchange | exchange(AE)          | exchange         |
| `Exchange.Delete`           | exchange |                       |                  |
| `Queue.Declare`             | queue    |                       |                  |
| `Queue.Declare(with DLX)`   | queue    | exchange(DLX)         | queue            |
| `Queue.Delete`              | queue    |                       |                  |
| `Exchange.Bind`             |          | exchange(destination) | exchange(source) |
| `Exchange.Unbind`           |          | exchange(destination) | exchange(source) |
| `Queue.Bind`                |          | queue                 | exchange         |
| `Queue.Unbind`              |          | queue                 | exchange         |
| `Basic.Publish`             |          | exchange              |                  |
| `Basic.Get`                 |          |                       | queue            |
| `Basic.Consume`             |          |                       | queue            |
| `Queue.Purge`               |          |                       | queue            |

实践练习：

```bash
# 示例 1. 授予 admin 用户可访问虚拟主机 vhost1，并且在所有资源上都具备可配置、可写、可读的权限
# 	 前提是 vhost 要存在
[root@study ~]# rabbitmqctl set_permissions -p vhost1 admin ".*" ".*" ".*"
Setting permissions for user "admin" in vhost "vhost1"

# 示例 2. 授予 admin 可访问虚拟主机 vhost2，在 queue 开头的资源上具备可配置权限，并在所有资源上拥有可写、可读权限
[root@study ~]# rabbitmqctl set_permissions -p vhost2 admin "^queue.*" ".*" ".*"
 
```

## 6. vhost 权限查看：list_permissions

```bash
rabbitmqctl list_permissions [-p vhost]
```

查看虚拟主机上的权限

实践练习：

```bash
[root@study ~]# rabbitmqctl list_permissions -p vhost1
Listing permissions in vhost "vhost1"
admin	.*	.*	.*
```

## 7. 用户权限查看：list_user_permissions

```bash
rabbitmqctl list_user_permissions {username}
```

显示用户权限

实践练习：

```bash
[root@study ~]# rabbitmqctl list_user_permissions admin
Listing permissions for user "admin"
vhost1	.*	.*	.*
/		.*	.*	.*
```

## 8. 清除权限：clear_permissions

```bash
rabbitmqctl clear_permissions [-p vhost] {username}
    
```

实践练习

```bash
[root@study ~]# rabbitmqctl clear_permissions -p vhost1 admin
Clearing permissions for user "admin" in vhost "vhost1"
```

## 9. rabbitmqctl 标准语法

上述讲到的管理功能都是通过 rabbitmqctl 来操作的。它通过 **连接各个 RabbitMQ 节点来执行所有操作**。

如果有节点没有运行，将显示诊断信息：不能到达或因不匹配的 Erlang cookie（后续章节：RabbitMQ 运维中讲解）而拒绝连接。

标准语法如下：

```bash
rabbitmqctl [-n node] [-t timeout] [-q] {command} [command options...]

参数说明：
	-n node：默认节点是「rabbit@hostname」, hostname 是主机名称。
		     在一个名为「node.hidden.com」的主机上，RabbitMQ 节点的名称通常是 rabbit@node (除非是 RABBITMQ_NODENAME 参数在启动时被设置了自定义的值)
		     在 linux 指令的 `hostname -s` 下，通常输出的就是 @ 后面的信息
	-t timeout：操作超时时间，单位是秒。只适用于 list_xxx 类型的命令，默认无超时
	-q：启用 quiet 模式，可以屏蔽一些消息的输出。默认不开启
	
```

实践练习：

```bash
# 演示 -q 和 -t timeout 的效果
[root@study ~]# rabbitmqctl list_vhosts
Listing vhosts
vhost1
/
[root@study ~]# rabbitmqctl list_vhosts -q
vhost1				# 使用 -q 看到这里少了一列 vhosts 的输出
/
[root@study ~]# rabbitmqctl list_vhosts -q -t 1
vhost1
/
[root@study ~]# rabbitmqctl list_vhosts -q -t 0
Error: {timeout,0.0}
# 这里可以看到超时信息了
```

## 参考文章

[多租户与权限：vhost](https://zq99299.github.io/mq-tutorial/rabbitmq-ac/05/01.html)