# Docker Compose常用命令

Docker compose的使用非常类似于docker命令的使用，**但是需要注意的是大部分的compose命令都需要到docker-compose.yml文件所在的目录下才能执行。**

## 1. 常用命令

1. compose以守护进程模式运行加-d选项

```
docker-compose up -d
```

2. 查看有哪些服务，使用docker-compose ps命令，非常类似于 docker 的ps命令

   ```
   docker-compose ps
   ```

   ![image-20200630204740960](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200630204740960.png)

3. 查看compose日志

   ```
   docker-compose logs web
   ```

4. 停止compose服务

   ```
    docker-compose stop
   ```

   看到服务的状态为Exit退出状态

   ![image-20200630210704130](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200630210704130.png)

5. 重启compose服务

   ```
   docker-compose restart
   ```

6. kill compose服务

   ```
   docker-compose kill
   ```

7. 删除compose服务

   ```
   docker-compose rm
   ```

   ![image-20200630210930094](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200630210930094.png)
