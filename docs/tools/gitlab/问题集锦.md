# 问题集锦

## 1. push 提交异常

push 提交时出现fatal: The remote end hung up unexpectedly异常

```
localhost:android zhangshengzhong$ git push --set-upstream http://gitlab.isture.com/zsz/android-gitbook.git master
Counting objects: 245, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (214/214), done.
error: RPC failed; result=22, HTTP code = 41383 MiB/s
fatal: The remote end hung up unexpectedly
Writing objects: 100% (245/245), 15.83 MiB | 6.85 MiB/s, done.
Total 245 (delta 7), reused 0 (delta 0)
fatal: The remote end hung up unexpectedly
Everything up-to-date
```

### 1.1 解决方案

原因：因为上传文件超过了nginx 的文件限制最大值

注意：自己是走哪个nginx，是gitlab自带的还是服务器的nginx

给nginx 添加上

```
http {
  ...
  client_max_body_size 100M;
  
```

## 2. clone路径不对

### 2.1 方式一

直接更改/etc/gitlab/gitlab.rb不能生效，更改/opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml文件

------

```
vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml
```

更改**host和port**即可

```
  ## GitLab settings 
  gitlab:
    ## Web server settings (note: host is the FQDN, do not include http://)
    host: xxx.xxx.xxx.xxx
    port: 8181
    https: fals
```

### 2.2 方式二

```
external_url 'http://gitlab.isture.com'
```



external_url 'http://gitlab.isture.com'