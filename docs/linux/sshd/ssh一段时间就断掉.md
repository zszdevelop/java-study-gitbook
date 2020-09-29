# ssh一段时间就断掉

## 1. 编辑sshd_config

```
vim /etc/ssh/sshd_config
```

找到下面两行

\#ClientAliveInterval 0
\#ClientAliveCountMax 3

去掉注释，改成

ClientAliveInterval 30
ClientAliveCountMax 86400

----

- ClientAliveInterval

  客户端每隔多少秒向服务发送一个心跳数据

- ClientAliveCountMax

  客户端多少秒没有相应，服务器自动断掉连接

## 2.重启sshd服务

```
service sshd restart
```

