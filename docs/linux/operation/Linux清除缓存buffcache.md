# Linux清除缓存buff/cache

## 1. 查看清理前的内存使用情况

```
free -h
```

![image-20200206143108070](./img/image-20200206143108070.png)

## 2. 开始清理

```
echo 1 > /proc/sys/vm/drop_caches
```

![image-20200206143213546](./img/image-20200206143213546.png)

再次查看就已经清除成功了

