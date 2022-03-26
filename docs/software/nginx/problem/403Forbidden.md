# 四种解决Nginx出现403 forbidden 报错的方法

## 1.背景：访问时报403

nginx 访问静态资源文件提示

![image-20190908163131411](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20190908163131411.png)



于是查看nginx日志，路径为/var/log/nginx/error.log。打开日志发现报错Permission denied，详细报错如下：

```
2021/08/31 16:06:44 [error] 32713#32713: *5 open() "/home/faduit/data/upload//blYctsOfficialSealController20210831152014.png" failed (13: Permission denied), client: 10.8.0.23, server: 192.168.134.3, request: "GET /upload/blYctsOfficialSealController20210831152014.png HTTP/1.1", host: "192.168.134.3"
```

## 2. 解决方式

### 2.1 方式1：**由于启动用户和nginx工作用户不一致所致**

1. 查看nginx启动的用户

   发现是nobody，而为是用root启动的

   ```
    ps axu|grep 'nginx'
   ```

   out

   ```
   nobody      4936  0.0  0.0  45864  1176 ?        Ss   8月17   0:00 nginx: master process /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
   ```

2. 将nginx.config的user改为和启动用户一致

   命令：vi conf/nginx.conf

   ```
    #user nobody;
    user root;
   ```



### 2.2  方式2：权限问题，如果nginx没有web目录的操作权限，也会出现403错误。

解决办法：修改web目录的读写权限，或者是把nginx的启动用户改成目录的所属用户，重启Nginx即可解决

1. chmod -R 777 /data

2. chmod -R 777 /data/www/

#### 2.3 方式3：**缺少index.html或者index.php文件，就是配置文件中index index.html index.htm这行中的指定的文件。**

```
server {

   listen 80;

  server_name localhost;

  index index.php index.html;

  root /data/www/;

}
```

如果把它当做文件目录，要列出文件目录

添加:	autoindex on;

```
# 文件服务器
    server {
        listen       80;
        server_name  file.isture.com;

        location / {
            root   /home/ftpuser/file;
            autoindex on;
        }
    }
```



### 2.4 方式4：**SELinux设置为开启状态（enabled）的原因。**

查看当前selinux的状态。

```
/usr/sbin/sestatus
```

将SELINUX=enforcing 修改为 SELINUX=disabled 状态。

```
vi /etc/selinux/config
```

```
#SELINUX=enforcing

 SELINUX=disabled
```

重启生效。reboot。

---

不想重启的可以使用临时关闭

临时关闭（不用重启机器）：

```
setenforce 0          ##设置SELinux 成为permissive模式

 \##setenforce 1 设置SELinux 成为enforcing模式
```

## 参考文章

[查看 SELinux状态及关闭SELinux](https://blog.51cto.com/bguncle/957315)

[四种解决Nginx出现403 forbidden 报错的方法](https://blog.csdn.net/shadow_zed/article/details/106853355)
