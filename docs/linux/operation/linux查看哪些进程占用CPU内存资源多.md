# Linux查看哪些进程占用CPU内存资源多

## 1. 占用CPU资源最多的10个进程

```
ps aux|head -1;ps aux|grep -v PID|sort -rn -k +3|head
```

## 2. 占用内存资源最多的10个进程

```
ps aux|head -1;ps aux|grep -v PID|sort -rn -k +4|head
```

## 参考文章

[Linux下如何查看哪些进程占用的CPU内存资源最多](https://blog.csdn.net/h330531987/article/details/74356347)