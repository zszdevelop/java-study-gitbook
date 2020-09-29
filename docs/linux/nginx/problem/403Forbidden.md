# 403 Forbidden

## 1. 情况一

nginx 访问静态资源文件提示

![image-20190908163131411](./img/image-20190908163131411.png)

是因为权限引起，将nginx 改成root启动

```
 #user nobody;
 user root;
```

## 2. 情况二

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

