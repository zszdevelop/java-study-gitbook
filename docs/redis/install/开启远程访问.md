# 开启远程访问

### 1.1 注释 bind 127.0.0.1

**注释掉bind 127.0.0.1可以使所有的ip访问redis**

若是想指定多个ip访问，但并不是全部的ip访问，可以bind

vim /usr/local/redis/bin/redis.conf

```
#bind 127.0.0.1
```

### 1.2 protected-mode 改为no

在redis3.2之后，redis增加了protected-mode，在这个模式下，即使注释掉了bind 127.0.0.1，再访问redisd时候还是报错，

将protected-mode 改成no

 ```
protected-mode no
 ```

### 1.3 设置远程连接密码

如果不设置远程连接密码，那么不用密码就能登录，非常危险，很可能会被挖矿等程序入侵

找到requirepass 去掉注释，改成你要的密码

```
# requirepass foobared
```

### 1.4 重启redis

```
./redis-server redis.conf
```

