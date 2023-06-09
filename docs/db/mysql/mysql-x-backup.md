---
order: 910
category:
  - 数据库
  - Mysql

---

# MySQL - 备份

## 1. 简介

备份方案主要分为

- mysqldump
- xtrabackup
- [docker-backup-database](https://github.com/appleboy/docker-backup-database)(推荐)

## 2. mysqldump 命令备份

mysqldump 可以导出MYSQL表中的数据

mysqldump该工具会将数据查出来，转换成insert语句，写入到某个文件中，相当于数据备份。

我们获取到该文件，然后执行相应的insert语句，就能创建相关的表，并且写入数据了，这就相当于数据还原。

> mysqldump命令的语法为：mysqldump -h主机名 -P端口 -u用户名 -p密码 参数1,参数2.... > 文件名称.sql

备份远程数据库中的数据库：

```
mysqldump -h 192.168.0.1 -u root -p123456 dbname > backup.sql
```



## 3. xtrabackup 备份（推荐）

### 3.1 备份脚本

backup_script.sh

```bash
#!/bin/bash
BACKUP_DIR=/home/dataexa/db-backup
DOCKER_BACKUP_DIR=/var/lib/db-backup
MYSQL_USER=root
MYSQL_PASS=mypassword
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
DATE=$(date +%Y-%m-%d_%H-%M-%S)
mkdir -p $BACKUP_DIR/$DATE
chmod -R 777 $BACKUP_DIR/$DATE
sudo docker stop percona-xtrabackup
sudo docker rm percona-xtrabackup
sudo docker run   --user 0:0 --name percona-xtrabackup --volumes-from mysql percona/percona-xtrabackup xtrabackup --backup  --user=$MYSQL_USER --target-dir=$DOCKER_BACKUP_DIR/$DATE --user=$MYSQL_USER --password=$MYSQL_PASS --port=$MYSQL_PORT --host=$MYSQL_HOST

```

注意点：

- --user : 以root 角色运行容器，以免因为权限问题无法备份
- --volumes-from：挂在到docker 的mysql 容器的相同数据卷、实现数据共享

### 3.2 恢复数据：方案1 xtrabackup 恢复

```
还有点问题
```

#### 3.2.1 步骤1：准备恢复的数据

```bash
shell> xtrabackup --prepare --target-dir=/data/backups/full
```

#### 3.2.2 步骤2：trabackup 恢复

```
shell> systemctl stop mysqld.service

shell> rm -rf /var/lib/mysql/*

shell> xtrabackup --copy-back --datadir=/var/lib/mysql --target-dir=/backups/full

# 下面为完成后的输出结果
180818 10:59:25 [01]        ...done
180818 10:59:25 completed OK!
```

### 3.3 恢复数据：方案2 `rsync`命令

>验证成功

```bash
rsync -avrP /backup/ /var/lib/mysql/
```

## 4. docker-backup-database(推荐)

按文档配置后，每日会将备份sql打包到minio

```yml
backup_mysql:
  image: appleboy/docker-backup-database:mysql-8
  logging:
    options:
      max-size: "100k"
      max-file: "3"
  environment:
    STORAGE_DRIVER: s3
    STORAGE_ENDPOINT: 192.168.0.1:9000
    STORAGE_BUCKET: db-backup
    #STORAGE_REGION: ap-northeast-1
    STORAGE_PATH: backup_mysql
    STORAGE_SSL: "false"
    STORAGE_INSECURE_SKIP_VERIFY: "false"
    ACCESS_KEY_ID: admin
    SECRET_ACCESS_KEY: 123456

    DATABASE_DRIVER: mysql
    DATABASE_HOST: 192.168.0.1:3306
    DATABASE_USERNAME: root
    DATABASE_PASSWORD: 123456
    DATABASE_NAME: sss
    DATABASE_OPTS:
    # 每天凌晨备份
    TIME_SCHEDULE: "@daily"
    TIME_LOCATION: Asia/Shanghai
```

### 4.1 如果mysql 无法正常连接

需添加

```
#接受来自任何IP地址的请求，远程备份用
bind-address=0.0.0.0
```



## 参考文章

[官方文档-xtrabackup-8.0文档](https://docs.percona.com/percona-xtrabackup/8.0/installation/docker.html)

[数据库备份之Xtrabackup](https://cn.openjianghu.org/doc/page/article/10080)

[MySQL 物理备份： Innobackupex 和 xtrabackup（热备）](https://www.jianshu.com/p/e8bd79e84f55)

[docker-backup-database](https://github.com/appleboy/docker-backup-database)

