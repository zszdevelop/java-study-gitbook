# linux查看指定程序是否运行及关闭

1. 比如进程名叫nginx，可以执行如下命令：ps -ef|grep nginx，如果有内容说明活着

   ![image-20201119112607214](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201119112607214.png)

2. 结束进程 kill  pid

   ```
   kill -9 1792
   ```

3. 如果你知道进程占用的端口号，比如7777，可以执行:netstat -anp | grep 7777，检查有没有程序占用该端口，若有的话，看pid或pname是否是你想要找的

   ![image-20201119112731151](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201119112731151.png)

4. 如果想要找的是某个服务，比如nfs、smb等，可以用service nfs status查看

## 参考文章

[linux查看指定程序是否运行及关闭](https://blog.csdn.net/chuanyu/article/details/45247265)

