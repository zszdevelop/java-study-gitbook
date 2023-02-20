# nginx的root和alias的区别

## 1. root 用法

```
location /request_path/image/ {
    root /local_path/image/;
}
```

这样配置的结果就是当客户端请求/request_path/image/cat.png 的时候， 
Nginx把请求映射为**/local_path/image/request_path/image/cat.png**

>注意这时候除了root 的路径，还会带上请求路径（例如这里：/request_path/image/）

## 2.alias用法

```
location /request_path/image/ {
    alias /local_path/image/;
}
```

这时候，当客户端请求 /request_path/image/cat.png 的时候， 
Nginx把请求映射为**/local_path/image/cat.png** 



注意：alias中的路径最后必须跟上/ root的路径最后可跟可不跟，alias支持正则表达式路径root不支持**

## 参考文章

[nginx 静态文件袋里配置,将本地文件/夹反向代理以及root与alias的区别](http://www.leftso.com/blog/171.html)

