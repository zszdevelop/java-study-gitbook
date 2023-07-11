---
order: 910
category:
  - Nginx
---



# Nginx - 日志分割&定期删除日志

## 1. 简介

 nginx会按照nginx.conf的配置生成access.log和error.log，随着访问量的增长，日志文件会越来越大，既会影响访问的速度(写入日志时间延长)，也会增加查找日志的难度，nginx没有这种按天或更细粒度生成日志的机制。

## 2. 日志分割

在http模块下

```nginx
log_format main '$remote_addr - $remote_user [$time_local] "$request" '
'$status $body_bytes_sent "$http_referer" '
'"$http_user_agent" "$http_x_forwarded_for"';
 
map $time_iso8601 $logdate {
'~^(?<ymd>\d{4}-\d{2}-\d{2})' $ymd;
default 'date-not-found';
}
 
access_log logs/access-$logdate.log main;
open_log_file_cache max=10;
```

但是缺点：***\*每次请求都会进行map的正则表达式匹配，对性能有影响。\****

## 3. 定期删除日志

### 3.1 新建sh,删除5天前的

```bash
[root@app2 sh]# pwd
/usr/local/nginx/sh
[root@app2 sh]# vi delete_nginx_logs.sh 
```



添加内容

```bash
#set the path to nginx log files
log_files_path="/usr/local/nginx/logs/"
save_days=5
#delete ? days ago nginx log files
find $log_files_path -mtime +$save_days -exec rm -rf {} \;
```

### 3.2 添加定时任务

```perl
[root@localhost sh]# crontab -e
00 00 * * * /bin/sh  /usr/local/nginx/sh/delete_nginx_logs.sh
```

## 参考文章

[Nginx 从入门到实践，万字详解](https://juejin.cn/post/6844904144235413512)