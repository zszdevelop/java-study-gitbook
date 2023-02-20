# nginx设置请求body大小

nginx默认是1M，需要增大的话。

在nginx.conf中http{}增加一句

```
client_max_body_size 100M;  
```

重启nginx即可

