---
order: 440
category:
  - RabbitMQ  
  - MQ
---

# RabbitMQ管理 - Web 端管理

## 1. 简介

使用 rabbitmqctl 工具管理 RabbitMQ，当前的用户需要拥有访问 Erlang cookie 的权限，由于服务器可能是以 guest 或则 root 用户身份来运行的，因此需要获得这些文件的访问权限，有可能就引申出来一些权限的管理问题。

还可以通过 RabbitMQ managemnent 插件来管理，它同样是由 Erlang 语言编写的，和 RabbitMQ 服务运行在同一个 erlang 虚拟机中。

该插件就是涵盖了所有 RabbitMQ 管理的功能。

使用 Web 管理界面需要启用 RabbitMQ management 插件，插件都默认放在 `$RABBITMQ_HOME/plugins` 目录下（也就是 RabbitMQ 安装目录下）

```bash
[root@study ~]# ls /opt/rabbitmq/plugins/
amqp_client-3.6.15.ez                        rabbitmq_federation-3.6.15.ez               rabbitmq_sharding-3.6.15.ez           rabbitmq_web_mqtt_examples-3.6.15.ez
cowboy-1.0.4.ez                              rabbitmq_federation_management-3.6.15.ez    rabbitmq_shovel-3.6.15.ez             rabbitmq_web_stomp-3.6.15.ez
cowlib-1.0.2.ez                              rabbitmq_jms_topic_exchange-3.6.15.ez       rabbitmq_shovel_management-3.6.15.ez  rabbitmq_web_stomp_examples-3.6.15.ez
rabbit_common-3.6.15.ez                      rabbitmq_management-3.6.15.ez               rabbitmq_stomp-3.6.15.ez              ranch-1.3.2.ez
rabbitmq_amqp1_0-3.6.15.ez                   rabbitmq_management_agent-3.6.15.ez         rabbitmq_top-3.6.15.ez                README
rabbitmq_auth_backend_ldap-3.6.15.ez         rabbitmq_management_visualiser-3.6.15.ez    rabbitmq_tracing-3.6.15.ez            recon-2.3.2.ez
rabbitmq_auth_mechanism_ssl-3.6.15.ez        rabbitmq_mqtt-3.6.15.ez                     rabbitmq_trust_store-3.6.15.ez        sockjs-0.3.4.ez
rabbitmq_consistent_hash_exchange-3.6.15.ez  rabbitmq_random_exchange-3.6.15.ez          rabbitmq_web_dispatch-3.6.15.ez
rabbitmq_event_exchange-3.6.15.ez            rabbitmq_recent_history_exchange-3.6.15.ez  rabbitmq_web_mqtt-3.6.15.ez
```

`.ez` 结尾的就是插件了，其中 `rabbitmq_management-3.6.15.ez` 则是 web 管理插件。

## 2. rabbitmq-plugins

管理插件的工具就是 rabbitmq-plugins，语法如下

```bash
rabbitmq-plugins [-n node] {command} [command options...]

command 参数：
	enable：启用插件
	disable：关闭插件
	list：查看当前插件使用情况
command options 参数：
	plugin-name：插件名称
```

## 3. 启用插件

```bash
rabbitmq-plugins enable {plugin-name}
```

实践练习

```bash
# 启用 rabbitmq_management 插件
[root@study ~]# rabbitmq-plugins enable rabbitmq_management
The following plugins have been enabled:
  amqp_client
  cowlib
  cowboy
  rabbitmq_web_dispatch
  rabbitmq_management_agent
  rabbitmq_management

Applying plugin configuration to rabbit@study... started 6 plugins.
```

启用 rabbitmq_management 插件后，需要重启 rabbitmq 服务

```bash
# 书上没有讲解怎么重启，笔者只能这样重启了
[root@study ~]# rabbitmqctl stop
Stopping and halting node rabbit@study
[root@study ~]# rabbitmq-server -detached
Warning: PID file not written; -detached was passed.
```

开放防火墙，插件会使用 15672 提供服务

```bash
firewall-cmd --zone=public --add-port=15672/tcp --permanent
firewall-cmd --reload 
```

然后访问，你的机器上的 15672 端口，比如笔者的 `http://192.168.4.250:15672`, 就能看到管理界面了

## 4. 查看插件使用情况

```bash
rabbitmq-plugins list
```

实践练习

```bash
[root@study ~]# rabbitmq-plugins list
 Configured: E = explicitly enabled; e = implicitly enabled
 | Status:   * = running on rabbit@study
 |/
[e*] amqp_client                       3.6.15
[e*] cowboy                            1.0.4
[e*] cowlib                            1.0.2
[  ] rabbitmq_amqp1_0                  3.6.15
[  ] rabbitmq_auth_backend_ldap        3.6.15
[  ] rabbitmq_auth_mechanism_ssl       3.6.15
[  ] rabbitmq_consistent_hash_exchange 3.6.15
[  ] rabbitmq_event_exchange           3.6.15
[  ] rabbitmq_federation               3.6.15
[  ] rabbitmq_federation_management    3.6.15
[  ] rabbitmq_jms_topic_exchange       3.6.15
[E*] rabbitmq_management               3.6.15
[e*] rabbitmq_management_agent         3.6.15
[  ] rabbitmq_management_visualiser    3.6.15
[  ] rabbitmq_mqtt                     3.6.15
[  ] rabbitmq_random_exchange          3.6.15
[  ] rabbitmq_recent_history_exchange  3.6.15
[  ] rabbitmq_sharding                 3.6.15
[  ] rabbitmq_shovel                   3.6.15
[  ] rabbitmq_shovel_management        3.6.15
[  ] rabbitmq_stomp                    3.6.15
[  ] rabbitmq_top                      3.6.15
[  ] rabbitmq_tracing                  3.6.15
[  ] rabbitmq_trust_store              3.6.15
[e*] rabbitmq_web_dispatch             3.6.15
[  ] rabbitmq_web_mqtt                 3.6.15
[  ] rabbitmq_web_mqtt_examples        3.6.15
[  ] rabbitmq_web_stomp                3.6.15
[  ] rabbitmq_web_stomp_examples       3.6.15
[  ] sockjs                            0.3.4

```

上面也说明了：

- e：是隐式启用
- E：显式启用
- `*` 在运行中的插件

可以看到上面 rabbitmq_management 是 `E*` ，就是我们刚才显式启用的。

## 5. 关闭插件

```bash
rabbitmq-plugins disable {plugin-name}
```

## 6. web 界面

`http://192.168.4.250:15672` 后，可以使用我们创建的账户来登录

对于 web 界面的功能，这里就不再记录了，其实他对应了前面讲解的一些管理功能。只是图形化了，可以参考前面的功能去界面上找对应的页面

## 参考文章

[Web 端管理](https://zq99299.github.io/mq-tutorial/rabbitmq-ac/05/03.html)