# 支持websocket

需要加上

proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";

例如：

```
 server {
        listen       80;
        server_name  gd.isture.com;

        location / {
            proxy_pass http://120.79.200.111:9705/;
            proxy_read_timeout 300;
            proxy_connect_timeout 300;

             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection "upgrade";
        }
    }
```

