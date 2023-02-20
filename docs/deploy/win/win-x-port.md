# Win7查看端口占用并杀死进程

1. 查看线程信息

   ```sh
   netstat -ano|findstr "端口号"
   ```

2. 查看进程信息

   ```sh
   tasklist|findstr "PID"
   ```

3. 强制关闭进程

   ```sh
   taskkill /f /t /im "PID"
   ```

   



## 参考文章

[Win7查看端口占用并杀死进程](https://blog.csdn.net/MAOZEXIJR/article/details/85053695)

