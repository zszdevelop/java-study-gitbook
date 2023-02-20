# 网站支持https

## 1. 使用免费的 Let's Encrypt 证书

Let's Encrypt 能够免费签名一个证书，所以假如要求不高，可以使用它签名的证书，使用也非常的简单，只要验证邮箱地址就能使用了，不过有 90 天的有效期（到期前可以续）。

为了生成证书，Let's Encrypt 提供了一个软件 Certbot 来进行管理，这个软件有很多插件，可以生成证书并自动化配置 Nginx/Apache ，不过我还是选择使用它生成密钥对和证书，然后自己在 WEB 服务器上进行配置，使用很简单。

## 2. 安装certbot

### 2.1 官网选择对应系统与环境

[官网地址https://certbot.eff.org/](https://certbot.eff.org/)

![image-20210220092815155](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210220092815155.png)

### 2.2 安装snapd

```
sudo yum install snapd
sudo systemctl enable --now snapd.socket
sudo ln -s /var/lib/snapd/snap /snap
```

### 2.3 检查快照

```
sudo snap install core; sudo snap refresh core
```

### 2.4 安装certbot

```sh
sudo snap install --classic certbot
```

### 2.5 添加certbot 命令的软链接

```
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

## 2. 申请证书

### 2.1 **certbot** 命令初次申请证书

接下来我们要使用 **certbot** 命令初次申请证书，命令格式如下：

>certbot certonly --webroot -w [Web站点目录] -d [站点域名] -m [联系人email地址] --agree-tos

实际示例

```
certbot certonly --webroot -w /usr/local/nginx/html -d www.isture.com -m 312905679@qq.com --agree-tos
```

![image-20210220115219947](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210220115219947.png)

### 2.2 证书保存位置

/etc/letsencrypt/live/

![image-20210220115330635](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210220115330635.png)

### 2.3 证书有效期

```
openssl x509 -noout -dates -in /etc/letsencrypt/live/www.isture.com/cert.pem
```

![image-20210220115440070](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210220115440070.png)

## 3. 更新证书

### 3.1 手动更新证书

**Let's Encrypt** 证书的有效期是 **90** 天，需要长期使用的话，需要在失效前进行延长申请。我们可以执行如下命令去更新：

```
//更新证书
certbot renew --dry-run
 
//如果不需要返回的信息，可以用静默方式
certbot renew --quiet

// 更新指定域名证书
 certbot certonly -d www.isture.com
```

### 3.2 定时更新

1. 我们也可以将更新证书的脚本写到定时任务来自动完成，免得我们手动操作。首先执行如下命令开始编辑定时任务：

```
crontab -e
```

2. 此时会进入 **vi** 的编辑界面让你编辑工作（每项工作都是一行）。我们在末尾添加如下一行内容，表示每月 **1** 号 **5** 时会执行执行一次更新，并重启 **nginx** 服务器：

```sh
00 05 01 * * /usr/bin/certbot renew --quiet && /bin/systemctl restart nginx
```

3. 保存后退出，执行 **crontab -l** 命令可以查看 **crontab** 服务是否创建成功：

   ```
   crontab -l
   ```

   ![image-20210220115814879](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210220115814879.png)



```bash
certbot certonly --email 312905679@qq.com -d test.isture.com 
```

![image-20201110230101897](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201110230101897.png)



这里选择第二项

**输入网址根目录**

```
Requesting a certificate for test.isture.com
Performing the following challenges:
http-01 challenge for test.isture.com
Input the webroot for test.isture.com: (Enter 'c' to cancel): /home/test-portal

```



### 2.2 nginx的配置

```sh
 server {
    listen          80;
    listen  443 ssl;
    server_name     test.isture.com;
    ssl_certificate /etc/letsencrypt/live/test.isture.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/test.isture.com/privkey.pem;
    location / {
            proxy_pass http://localhost:8085;
    }
}
```
## 3. certbot 常用指令

### 3.1 列出证书和到期时间

```sh
certbot certificates
```

![image-20201110225053075](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201110225053075.png)

以上可以看出此https 证书已经过期了

### 3.2 测试是否能更新

```
certbot renew --dry-run
```

### 3.3 手动立即更新SSL证书

```
certbot renew 
```

## 4. 集成问题

### 4.1 Let's Encrypt 配置 SSL 证书的时候，提示DNS problem: NXDOMAIN looking up A for xxx.com

问题标的比较明确： DNS Problem .

ping 不通该域名，可能是域名解析没有配置

### 4.2 最近授权太多次

![image-20201110233310535](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201110233310535.png)

## 参考文章

[使用Certot](https://learnku.com/laravel/t/2525/using-certbot-lets-encrypt-small-step-run-towards-https)

[CentOS下自动申请、部署Let's Encrypt免费SSL证书教程（Nginx服务器）](https://www.hangge.com/blog/cache/detail_3054.html)
