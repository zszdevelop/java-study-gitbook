# 网站支持https

#### 使用免费的 Let's Encrypt 证书

Let's Encrypt 能够免费签名一个证书，所以假如要求不高，可以使用它签名的证书，使用也非常的简单，只要验证邮箱地址就能使用了，不过有 90 天的有效期（到期前可以续）。

为了生成证书，Let's Encrypt 提供了一个软件 Certbot 来进行管理，这个软件有很多插件，可以生成证书并自动化配置 Nginx/Apache ，不过我还是选择使用它生成密钥对和证书，然后自己在 WEB 服务器上进行配置，使用很简单。



生成指定域名

```bash
certbot certonly -d java.isture.com
```

![image-20200812002454147](/Users/zsz/Library/Application Support/typora-user-images/image-20200812002454147.png)