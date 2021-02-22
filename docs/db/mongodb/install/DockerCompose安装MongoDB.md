# DockerCompose安装MongoDB

## 1. 介绍

docker-compose 使用比dockerfile 更加方便



## 2. 实例

1.  配置 docker-compose-mongodb.yml

   ```sh
   version: '3'
   services:
     mongodb:
       image: mongo:4.2.6
       restart: always
       volumes:
         - /home/mongodb/db:/data/db
         - /home/mongodb/log:/var/log/mongodb
   #      - /home/mongo_data_dump:/data
       ports:
         - 27017:27017
   #    environment:
   #      MONGO_INITDB_ROOT_USERNAME: admin
   #      MONGO_INITDB_ROOT_PASSWORD: admin     
   ```


2. 新建目录

   ```sh
   mkdir /home/mongodb/db
   mkdir /home/mongodb/log
   ```

   > 一般我们希望对镜像中的磁盘做外部映射，这样即使容器退出了，下次启动，容器中保留的数据不会丢失。

    

3. 运行

   ```sh
   docker-compose -f docker-compose-mongodb.yml up -d
   ```

   

