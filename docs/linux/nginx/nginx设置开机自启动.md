# nginx设置开机自启动

## 1. 在/etc/init.d 下创建文件nginx

Vim 创建nginx文件

```
vim /etc/init.d/nginx
```

编辑de内容

[官网配置](https://www.nginx.com/resources/wiki/start/topics/examples/redhatnginxinit/)

需要修改以下两处

```
nginx=”/usr/local/nginx/sbin/nginx” //修改成nginx执行程序的路径。

NGINX_CONF_FILE=”/usr/local/nginx/conf/nginx.conf” //修改成nginx.conf文件的路径。
```

保存后设置文件的执行权限

```
chmod a+x /etc/init.d/nginx
```

至此就可以通过下面指令控制启动停止

```
/etc/init.d/nginx start
/etc/init.d/nginx stop
```

上面的方法完成了用脚本管理nginx服务的功能，但是还是不太方便。

## 2. 将nginx服务加入chkconfig

先将nginx服务加入chkconfig管理列表：

```
chkconfig --add /etc/init.d/nginx
```

加完这个之后，就可以使用service对nginx进行启动，重启等操作了。

```
service nginx start
service nginx stop
service nginx restart
```

最后设置开机自动启动

```
 chkconfig nginx on
```

### 2.1 如出现“服务 nginx 不支持 chkconfig”

在/etc/init.d/nginx加上

```
#!/bin/sh
#chkconfig: 2345 80 90
#description:auto_run
```

