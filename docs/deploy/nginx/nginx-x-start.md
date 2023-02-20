---
order: 20
category:
  - Nginx
---

# Nginx 入门实战

## 简介

> 什么是nginx

Nginx是一个高性能的HTTP和反向代理web服务器

> 安装要求

- `linux`内核2.6及以上

  ```shell
  uname -a
  ```

- 关闭防火墙

  ```shell
  # 临时关闭防火墙
  systemctl stop firewalld
  # 永久关闭防火墙
  systemctl disable firewalld
  # 查看防火墙状态
  systemctl status firewalld
  ```

  

### 安装nginx

#### 源码安装

> 创建文件夹

```shell
mkdir /data
cd /data
```



> 安装依赖

```shell
yum install -y gcc pcre-devel zlib-devel openssl-devel
```



> 下载nginx

- 官网下载`http://nginx.org/en/download.html`

- 直接在服务器下载

  ```shell
  wget https://nginx.org/download/nginx-1.22.0.tar.gz
  ```



> 进行配置

```shell
./configure \
--prefix=/usr/local/nginx \
--sbin-path=/usr/local/nginx/sbin/nginx \
--modules-path=/usr/local/nginx/modules \
--conf-path=/usr/local/nginx/conf/nginx.conf \
--error-log-path=/usr/local/nginx/logs/error.log \
--http-log-path=/usr/local/nginx/logs/access.log \
--pid-path=/usr/local/nginx/logs/nginx.pid
```

- 配置文件详解

  | --prefix=PATH         | nginx安装目录，默认/uar/local/nginx             |
  | --------------------- | ----------------------------------------------- |
  | --sbin-path=PATH      | 可执行文件路径，默认`<prefix>/sbin/nginx`       |
  | --modules-path=PATH   | 动态模块的安装目录，默认`<prefix>/modules`      |
  | --conf-path=PATH      | 配置文件路径，默认`<prefix>/conf/nginx.conf`    |
  | --error-log-path=PATH | 错误日志文件路径，默认`<prefix>/logs/error.log` |
  | --http-log-path=PATH  | 日志文件路径，默认`<prefix>/logs/access.log`    |
  | --pid-path=PATH       | 进程id文件路径，默认`<prefix>/logs/nginx.pid`   |



> 进行安装

```shell
make && make install
```



#### yum安装

> 安装依赖

```shell
yum install -y yum-utils
```



> 编辑配置文件

```shell
vim /etc/yum.repos.d/nginx.repo

[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```



> 进行安装

```shell
yum install -y nginx
```



> 查看安装目录

```shell
whereis nginx
```



### 配置系统服务

> 编辑文件

```shell
vim /usr/lib/systemd/system/nginx.service
```



> 添加以下内容

```shell
[Unit]
Description=nginx web service
Documentation=http://nginx.org/en/docs/
After=network.target

[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
PrivateTmp=true

[Install]
WantedBy=default.target
```



### 配置环境变量

> 编辑环境变量

```shell
vim /etc/profile
```



> 最后一行添加以下内容

```shell
export PATH=$PATH:/usr/local/nginx/sbin
```



> 刷新环境变量

```shell
source /etc/profile
```



## nginx操作

### 目录结构介绍

```shell
nginx
├── conf
│   ├── mime.types
│   ├── mime.types.default
│   ├── nginx.conf
│   ├── nginx.conf.default
├── html
│   ├── 50x.html
│   └── index.html
├── logs
│   ├── access.log
│   ├── error.log
│   └── nginx.pid
├── sbin
│   └── nginx
```



### kill信号操作

> 查看nginx进程

```shell
ps -ef | grep nginx
```



> 立即关闭

```shell
kill -term/int id
```



> 优雅地关闭

```shell
kill -quit id
```



> 重新加载配置文件

```shell
kill -hup id
```



> 重写日志文件

```shell
kill -usr1 id
```



> 平滑升级

```shell
kill -usr2 id
```



### nginx命令

> 查看帮助

```shell
nginx -?
nginx -h
```

打印内容如下：

```shell
Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /usr/local/nginx/)
  -e filename   : set error log file (default: logs/error.log)
  -c filename   : set configuration file (default: conf/nginx.conf)
  -g directives : set global directives out of configuration file
```



> 查看版本号

```shell
nginx -v
```



> 查看版本号和安装时的配置信息

```shell
nginx -V
```



> 测试配置文件语法

```shell
nginx -t
```



> 测试配置文件语法，如果成功则输出文件内容

```shell
nginx -T
```



> 发送信号

- 强制关闭，相当于`kill -term/int`

  ```shell
  nginx -s stop
  ```

- 优雅关闭，相当于`kill -quit`

  ```shell
  nginx -s quit
  ```

- 重新打开日志文件，相当于`kill -usr1`

  ```shell
  nginx -s reopen
  ```

- 重新加载配置文件，相当于`kill -hup`

  ```shell
  nginx -s reload
  ```



## 配置文件详解

### 全局块

| 全局指令         | 可选值 | 默认值         | 说明                                                         |
| ---------------- | ------ | -------------- | ------------------------------------------------------------ |
| user             | 用户名 |                | 指定用户                                                     |
| master_process   | on/off | on             | 是否开启工作进程worker，配置完要重启nginx                    |
| worker_processes | 数字   |                | worker进程数量，建议配置成cpu的数量，master_process开启才有用 |
| daemon           | on/off | on             | 是否以守护进程方式启动                                       |
| pid              |        | logs/nginx.pid | pid路径                                                      |
| error_log        |        |                | 日志级别，debug、info、notice、warn、error、crit             |
| include          |        |                | 引入配置文件                                                 |



### events块

| 指令               | 可选值                   | 默认值         | 说明                             |
| ------------------ | ------------------------ | -------------- | -------------------------------- |
| worker_connections |                          | 512            | 单个worker进程最大连接数         |
| accept_mutex       | on/off                   | on             | 是否开启序列化，一个一个唤醒接收 |
| multi_accept       | on/off                   | off            | 是否允许同时接收多个网络连接     |
| use                | select/poll/epoll/kqueue | 根据操作系统定 | 使用哪种事件驱动来处理网络消息   |



### http块

> default_type

设置响应的MIME类型

语法：`default_type mime-type`

默认：`default_type text/plain`

作用域：`http`, `server`, `location`



> access_log

日志输出路径

语法：`access_log path [format]`

默认：`logs/access.log`

作用域：`http`, `server`, `location`, `if in location`



> log_format

日志格式化

语法：`log_format name value`

作用域：`http`



> sendfile

底层使用`sendfile`发送文件

语法：`sendfile on|off`

默认：`off`

作用域：`http`, `server`, `location`,`if in location`



>keepalive_timeout

tcp长连接超时时间

语法：`keepalive_timeout timeout`

默认：75，不写单位默认是s

作用域：`http`, `server`,`location`



> keepalive_requests

一个连接使用次数

语法：`keepalive_requests number`

默认：100

作用域：`http`, `server`,`location`



### server块

> listen

监听的端口

语法：`listen port`

作用域：`server`



> server_name

监听当前的ip或域名

语法：`server_name name ...`

作用域：`server`



### location块

####  location

> 模糊匹配

```nginx
location /aaa
```



> 精确匹配

```nginx
location =/aaa
```



> 正则匹配（区分大小写）

```nginx
location ~^/aaa$
```



> 正则匹配（不区分大小写）

```nginx
location ~*^/aaa$
```



注意：?后面的值不参与`location`匹配



####  root

资源文件目录，会拼上location的值，默认`root html`

```nginx
server {
    listen 80;
    location / {
        root html;
    }
    
    location /aaa {
        root html;
    }
}
```



####  alias

资源文件目录

```nginx
server {
    listen 80;
    location / {
        alias html/;
    }
    
    location /aaa {
        alias html;
    }
}
```

注意：如果location匹配值以/结尾，那么alias也要以/结尾



####  index

默认文件

```nginx
index index.htm index.html aaa.html bbb.html;
```



####  error_page

页面发生错误时跳转的路径

> 写法1

```nginx
error_page 404 https://www.baidu.com
```



> 写法2

```nginx
location / {
    root aaa;
    error_page 404 @error;
}
location @error {
    return 200 'this is 404';
}
```



####  try_files

尝试着找文件

/1.html

/1.html/index.html

/index.html

```nginx
try_files $uri $uri/ /index.html;
```

尝试去找`$uri`这个文件，找不到`$uri`就去`$uri/`下的`index.html`文件，找不到就请求`/index.html`



### 解决跨域

```nginx
server {
   listen 7089;
   location / {
      proxy_pass http://localhost:8089;
      add_header Access-Control-Allow-Origin *;
      add_header Access-Control-Allow-Methods *;
   }
}
```



### rewrite模块详解

#### 常用全局变量

| 变量               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| $args              | 变量中存放了请求URL中的请求参数。比如http://192.168.200.133/server?arg1=value1&args2=value2中的"arg1=value1&arg2=value2"，功能和$query_string一样 |
| $http_user_agent   | 变量存储的是用户访问服务的代理信息(如果通过浏览器访问，记录的是浏览器的相关版本信息) |
| $host              | 变量存储的是访问服务器的server_name值                        |
| $document_uri      | 变量存储的是当前访问地址的URI。比如http://192.168.200.133/server?id=10&name=zhangsan中的"/server"，功能和$uri一样 |
| $document_root     | 变量存储的是当前请求对应location的root值，如果未设置，默认指向Nginx自带html目录所在位置 |
| $content_length    | 变量存储的是请求头中的Content-Length的值                     |
| $content_type      | 变量存储的是请求头中的Content-Type的值                       |
| $http_cookie       | 变量存储的是客户端的cookie信息，可以通过add_header Set-Cookie 'cookieName=cookieValue'来添加cookie数据 |
| $limit_rate        | 变量中存储的是Nginx服务器对网络连接速率的限制，也就是Nginx配置中对limit_rate指令设置的值，默认是0，不限制。 |
| $remote_addr       | 变量中存储的是客户端的IP地址                                 |
| $remote_port       | 变量中存储了客户端与服务端建立连接的端口号                   |
| $remote_user       | 变量中存储了客户端的用户名，需要有认证模块才能获取           |
| $scheme            | 变量中存储了访问协议                                         |
| $server_addr       | 变量中存储了服务端的地址                                     |
| $server_name       | 变量中存储了客户端请求到达的服务器的名称                     |
| $server_port       | 变量中存储了客户端请求到达服务器的端口号                     |
| $server_protocol   | 变量中存储了客户端请求协议的版本，比如"HTTP/1.1"             |
| $request_body_file | 变量中存储了发给后端服务器的本地文件资源的名称               |
| $request_method    | 变量中存储了客户端的请求方式，比如"GET","POST"等             |
| $request_filename  | 变量中存储了当前请求的资源文件的路径名                       |
| $request_uri       | 变量中存储了当前请求的URI，并且携带请求参数，比如http://192.168.200.133/server?id=10&name=zhangsan中的"/server?id=10&name=zhangsan" |



### set

设置变量

语法：`set $variable value`

作用域：`server`, `location`, `if`



### if

条件判断

语法：`if (condition) {}`

作用域：`server`, `location`



### break

语法：`break`

作用域：`server`, `location`, `if`



### return

语法：`return code URL` `return [text]` `return URL`

作用域：`server`, `location`, `if`



### rewrite

对请求的uri进行重写

语法：`rewrite regex replacement [flag]`

作用域：`server`, `location`, `if`



> flag可选值

- last

  停止当前location的执行，拿着uri重新去匹配location

- break

  停止当前location的执行，会在当前location去找对应的资源

- redirect

  临时重定向

- permanent

  永久重定向



> 使用示例

```nginx
server {
    listen 80;
    location / {
        rewrite /1.html /2.html last;
        rewrite /2.html /3.html;
    }
    location /2.html {
        rewrite /2.html /a.html;
    }
    location /3.html {
        rewrite /3.html /b.html;
    }
}
```





### rewrite_log

打印rewrite日志

语法：`rewrite_log on | off`

作用域：`http`, `server`, `location`, `if`

```nginx
rewrite_log on;
error_log logs/error.log notice;
```



## 反向代理

### 正向代理

```nginx
location / {
    proxy_pass http://10.8.0.61;
}
```



### 反向代理

> 被代理服务器

```nginx
location / {
    root   html;
}
```



> 代理服务器

```nginx
location / {
    proxy_pass http://192.168.100.128;
}
```



### proxy_set_header

设置请求头信息

语法：`proxy_set_header field value`

作用域：`http`, `server`, `location`



### proxy_redirect

将被代理服务器的重定向地址替换成代理服务器的地址

语法：`proxy_redirect redirect replacement`

作用域：`http`, `server`, `location`



> 被代理服务器

```nginx
events {}

http {
        server {
                listen 80;
                location / {
                        root html;
                        index index.html;
                        if (!-f $request_filename) {
                                return 302 http://192.168.100.128:81;
                        }
                }
        }

        server {
                listen 81;
                location / {
                        root html;
                        index index.html;
                }
        }
}
```



> 代理服务器

```nginx
events {}

http {
        server {
                listen 80;
                location / {
                        proxy_redirect http://192.168.100.128 http://192.168.100.3;
                        proxy_pass http://192.168.100.128;
                }
        }
        server {
                listen 81;
                location / {
                        proxy_pass http://192.168.100.128:81;
                }
        }
}
```



## 负载均衡

### upstream

定义一组服务器

语法：`upstram name {}`

作用域：`http`

```nginx
upstream myserver {
    server 192.168.100.128;
    server 192.168.100.128:81;
    server 192.168.100.128:82;
}

server {
    listen 80;
    location / {
        proxy_pass http://myserver;
    }
}
```



### 负载均衡状态

| down         | 不参与负载均衡                                          |
| ------------ | ------------------------------------------------------- |
| backup       | 备份服务器，当其他服务器挂掉了，才会启用备份服务器      |
| max_fails    | 允许请求失败的次数，默认是1                             |
| fail_timeout | max_fails失败后，多少秒之内不访问失败的服务器，默认10秒 |



### 负载均衡策略

> weight

分配权重

```nginx
upstream myserver {
    server 192.168.100.128:80 weight=3;
    server 192.168.100.128:81 weight=7;
    server 192.168.100.128:82 weight=10;
}
```



> ip_hash

一个ip固定被分配到某一台服务器

```nginx
upstream myserver {
    ip_hash;
    server 192.168.100.128:80;
    server 192.168.100.128:81;
    server 192.168.100.128:82;
}
```



> url_hash

同一个url固定分配到某一台服务器

```nginx
upstream myserver {
    hash $request_uri;
    server 192.168.100.128;
    server 192.168.100.128:81;
    server 192.168.100.128:82;
}
```



> least_conn

把请求分配到连接最少的服务器上

```nginx
upstream myserver {
    least_conn;
    server 192.168.100.128:80;
    server 192.168.100.128:81;
    server 192.168.100.128:82;
}
```



### 负载均衡之fair策略

根据页面大小、加载时间等智能分配服务器

> 下载fair

下载地址：`https://github.com/gnosek/nginx-upstream-fair`



> 上传到服务器解压缩并重命名

```shell
unzip nginx-upstream-fair-master.zip
mv nginx-upstream-fair-master fair
```



> 编辑nginx源码文件

```shell
vim /data/nginx-1.22.0/src/http/ngx_http_upstream.h
```

找到`struct ngx_http_upstream_srv_conf_s`结构体

加上`in_port_t default_port;`



> 进入nginx安装目录

```shell
cd /data/nginx-1.22.0
```



> 进行配置

```shell
./configure --add-module=/data/nginx-1.22.0/modules/fair
```



> 进行编译

```shell
make
```



> 删除之前的nginx二进制文件

```shell
rm -rf /usr/local/nginx/sbin/nginx
```



> 复制新的二进制文件

```shell
cp objs/nginx /usr/local/nginx/sbin
```



> 进行平滑升级

```shell
make upgrade
```



> 使用fair策略

```nginx
upstream myserver {
	fair;
	server 192.168.100.128:80;
	server 192.168.100.128:81;
	server 192.168.100.128:82;
}
```



## 配置https

### 申请阿里云证书

> 到域名控制台解析域名

```
https://dc.console.aliyun.com/next/index#/domain-list/all
```



> 购买SSL证书

```
https://common-buy.aliyun.com/?commodityCode=cas_dv_public_cn
```



> 申请证书

```
https://yundunnext.console.aliyun.com/?p=casnext#/certExtend
```



> 下载证书，并上传到服务器



### 安装ssl模块

> 进入到nginx安装包目录

```shell
cd /data/nginx-1.22.0
```



> 清除之前编译的文件

```shell
make clean
```



> 重新配置

```shell
./configure --with-http_ssl_module
```



> 重新编译

```shell
make
```



> 删除之前的二进制文件

```shell
rm -rf /usr/local/nginx/sbin/nginx
```



> 复制二进制文件

```shell
cp objs/nginx /usr/local/nginx/sbin
```



> 进行平滑升级

```shell
make upgrade
```



### 进行配置

```nginx
# https默认端口是443
server {
    listen 443 ssl;
    server_name localhost;
 
    # 证书路径
    ssl_certificate cert/server.crt;
    ssl_certificate_key cert/server.key;
 
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
        # 代理地址，就是实际要访问的地址
    	proxy_pass https://www.baidu.com;
    }
}

# 将http://localhost重定向到https://localhost
server {
    listen 80;
    server_name localhost;
    return 301 https://192.168.100.3$request_uri;
}
```



## 部署前端项目

### 普通部署

> 若依官网拉取代码

```
https://gitee.com/y_project/RuoYi-Vue
```



> 安装依赖

```powershell
npm install
```



> 打包后上传到服务器上

```powershell
npm run build:prod
```

打包完成后会生成dist文文件夹，将dist文件夹上传到服务器上



> 编辑配置文件

```nginx
events {}

http {
        include mime.types;
        server {
                listen 80;
                location / {
                        root /usr/local/nginx/html/dist;
                        try_files $uri $uri/ /index.html;
                }
        
                # 配置后端地址
                location /prod-api {
                        # 转发到后端地址
                        proxy_pass http://localhost:8081;
                        # 去掉/prod-api
                        rewrite ^/prod-api/(.*)$ /$1 break;
                }
        }
}
```



> 重新加载配置文件

```shell
nginx -s reload
```



### 整合Jenkins、Docker自动化部署

> 编写nginx配置文件

```nginx
server {
    listen 81;
    location / {
        root /dist;
        try_files $uri $uri/ /index.html;
    }

    location /prod-api {
        proxy_pass https://www.linzhehao.cn;
        rewrite ^/prod-api/(.*)$ /ruoyi/$1 break;
    }
}
```



> 编写dockerignore

```
node_modules
src
public
```



> 编写Dockerfile

```dockerfile
FROM nginx:1.22.0
EXPOSE 81
ENV LC_ALL=C.UTF-8
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY dist/ /dist/
```



> 编写Jenkins脚本

```shell
npm install
npm run build:prod
docker rm ruoyi-ui -f
docker build -t ruoyi-ui .
docker run -d --name ruoyi-ui -p 81:81 ruoyi-ui
```

## 参考文章

- 部门同事林哲豪的分享会
