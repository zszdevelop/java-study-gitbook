# Mac安装nginx

## 1. 简介

Mac安装nginx，采用Mac的包管理工具 **homebrew** 安装

## 2. 安装

### 2.1 **步骤一：先更新homebrew**

```
brew update
```

如果上面操作长时间没任何动静，请更换镜像，参考清华的镜像 [https://mirrors.tuna.tsinghua...](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)

### 2.2 **步骤二**： 查看nginx信息

```
brew search nginx
```

![image-20210607150955882](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210607150955882.png)

### 2.3 **安装nginx**

```
brew install nginx
```

安装完毕

- 主页的文件在/usr/local/var/www 文件夹下
- 对应的配置文件地址在/usr/local/etc/nginx/nginx.conf

### **2.4 步骤四：运行nginx**

```
nginx
```

nginx默认使用8080端口 如果发现端口被占用了，可以杀掉使用使用改端口的进程，也可以修改/usr/local/etc/nginx/nginx.conf 下的

```nginx
http {
    server {
        listen       8181;
        server_name  localhost;  

        #charset koi8-r;
        .....
        }
    }
```

### 2.5 **重新启动nginx**

```
nginx -s reload
```

成功看到欢迎页面～！（对应的html是/usr/local/var/www/index.html）

![image-20210607151153045](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210607151153045.png)

## 参考文章

[MAC下安装nginx](https://segmentfault.com/a/1190000016020328)
