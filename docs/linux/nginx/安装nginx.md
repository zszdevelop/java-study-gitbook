# 安装nginx

## 1. 安装步骤

### 1.1 安装依赖包

```
//一键安装上面四个依赖
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```

### 1.2 下载并解压安装包

```
//下载tar包
wget http://nginx.org/download/nginx-1.16.1.tar.gz
tar -xvf nginx-1.16.1.tar.gz
```

wget 下载的tar包版本可以通过[nginx官网](<https://nginx.org/en/download.html>)查看

### 1.3 安装nginx

```
//进入nginx目录
cd nginx-1.16.1
//执行命令
./configure
//执行make命令
make
//执行make install命令
make install
```

安装完成会在/usr/local目录下出现nginx

- 注：如果需要支持http需要加如上

```
./configure  --with-http_ssl_module
```



### 1.4 配置nginx.conf

```
# 打开配置文件
vi /usr/local/nginx/conf/nginx.conf
```

按需修改配置

如默认端口为80，可以修改成想要的地址

```
server {
        listen       80;
        server_name  localhost;
        ...
        }
```

### 1.5 启动nginx

```
/usr/local/nginx/sbin/nginx -s reload
```

查看nginx进程是否启动

```
ps -ef | grep nginx
```

### 1.6 浏览器打开

![image-20190907221848439](./img/image-20190907221848439.png)

## 2. 启动可能遇到的问题

### 2.1 logs 文件夹目录没有

错误提示如下

```
 [alert] could not open error log file: open() "/usr/local/nginx/logs/error.log" failed (2: No such file or directory)
```

解决方案：在提示的指定目录创建logs文件夹

```
mkdir logs
```

### 2.2 nginx.pid 异常

错误提示如下

```
 [error] 21478#0: open() "/usr/local/nginx/logs/nginx.pid" failed (2: No such file or directory)
```

解决方案：先设置配置文件

```
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
```

## 3. nginx 命令

```
./nginx 启动

./nginx -s stop 关闭

./nginx -s reload 重启
```

