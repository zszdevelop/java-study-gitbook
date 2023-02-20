---
order: 10
category:
  - 数据库
---

# 通过docker安装Oracle

## 1. 安装Oracle

1. 拉取镜像

   ```sh
   docker pull registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g
   ```

   镜像大概有6.8G

   查看镜像信息：

   ```sh
   docker iamges
   ```

2. 创建容器

   ```sh
   docker run -d -p 1521:1521 --name oracle_11g registry.aliyuncs.com/helowin/oracle_11g
   ```

   启动容器

   ```sh
   docker start oracle_11g
   ```

3. 进入控制台设置用户信息：

   ```sh
   docker exec -it oracle_11g bash
   ```

4. 切换成root进行操作：

   >su - root

   输入密码helowin

5. 设置oracle环境变量如下：

   vi /etc/profile文件末尾添加：

   ```sh
   export ORACLE_HOME=/home/oracle/app/oracle/product/11.2.0/dbhome_2
   export ORACLE_SID=helowin
   export PATH=PATH
   ```

   

6. 切换回oracle用户：

   ```sh
   su - oracle
   ```

7. 修改sys、system用户密码

   ```
   sqlplus /nolog
   conn /as sysdba
   alter user system identified by oracle;
   alter user sys identified by oracle;
   ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;
   ```

   此处的oracle 就是你设置的密码

   Ps:默认密码是：helowin

## 2. 遇到的问题

### 2.1 远程连接提示

ORA-12514: TNS:listener does not currently know of service requested in connect descriptor

![image-20200507212411220](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200507212411220.png)

主要原因是service name 设置的并不是ORCL 导致

- 解决方案：

  service name 改为 helowin

- 解决步骤

  1. 进入docker 容器

     ```sh
     docker exec -it oracle_11g bash
     ```

  2. 进入 tnsnames.ora所在的目录

     ```sh
     cd /home/oracle/app/oracle/product/11.2.0/dbhome_2/network/admin
     ```

  3. 查看 tnsnames.ora

     ```
     vi  tnsnames.ora
     ```

     可以看到SERVICE_NAME = helowin

     ![image-20200507213419605](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200507213419605.png)

     serviceName 改为helowin 或者这里改为orcl

     

## 参考文章

[centos7使用docker安装oracle](https://segmentfault.com/a/1190000020633619)

[Linux下如何查找sqlnet.ora 和listener.ora 和tnsnames.ora 配置文件的目录](https://blog.csdn.net/weixin_30657541/article/details/98204681)
