---
order: 910
category:
  - 数据库
  - Mysql

---

# MySQL - 备份

## 1. 简介

备份方案主要分为

- xtrabackup

## 2. xtrabackup 备份

### 2.1 备份脚本

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

## 参考文章

[官方文档-xtrabackup-8.0文档](https://docs.percona.com/percona-xtrabackup/8.0/installation/docker.html)

[数据库备份之Xtrabackup](https://cn.openjianghu.org/doc/page/article/10080)