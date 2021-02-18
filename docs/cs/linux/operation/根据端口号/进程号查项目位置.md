# 根据端口号/进程号查项目位置

## 1. 根据端口号查pid

仅有端口号时，需要根据端口号先查出进程号

- 方式一：losf

  ```
  losf -i:{port}
  ```

  ![image-20191023093133400](/Users/zhangshengzhong/Library/Application Support/typora-user-images/image-20191023093133400.png)

- 方式二：netstat

  ```
  netstat -tunlp|grep {port}
  ```

  ![image-20191023093229618](/Users/zhangshengzhong/Library/Application Support/typora-user-images/image-20191023093229618.png)

## 2. 根据pid查路径

```
ll /proc/9293
```

可以查到所有pid相关的信息，其中cwd就是进程所在位置

![image-20191023093453433](/Users/zhangshengzhong/Library/Application Support/typora-user-images/image-20191023093453433.png)

当然也可以直接加上cwd查询位置

![image-20191023093531560](/Users/zhangshengzhong/Library/Application Support/typora-user-images/image-20191023093531560.png)