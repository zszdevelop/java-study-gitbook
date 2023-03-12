---
order: 1010
category:
  - linux
---

# centos7 - 查看内网ip和外网ip 

## 1. 查看内网IP

```
ifconfig
# 简化输出
ifconfig | grep inet
或
ip addr 
```

## 2. 查看外网的ip

```
curl ifconfig.me
```



## 参考文章

[Linux 开启 Swap分区 教程](https://www.jianshu.com/p/04c7a9ab438c)
