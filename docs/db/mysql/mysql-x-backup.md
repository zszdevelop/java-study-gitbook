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

### 2.2 恢复数据：方案1 xtrabackup 恢复

```
还有点问题
```

#### 2.2.1 步骤1：准备恢复的数据

```bash
shell> xtrabackup --prepare --target-dir=/data/backups/full
```

#### 2.2.2 步骤2：trabackup 恢复

```
shell> systemctl stop mysqld.service

shell> rm -rf /var/lib/mysql/*

shell> xtrabackup --copy-back --datadir=/var/lib/mysql --target-dir=/backups/full

# 下面为完成后的输出结果
180818 10:59:25 [01]        ...done
180818 10:59:25 completed OK!
```

### 2.2 恢复数据：方案2 `rsync`命令

>验证成功

```bash
rsync -avrP /backup/ /var/lib/mysql/
```



## 参考文章

[官方文档-xtrabackup-8.0文档](https://docs.percona.com/percona-xtrabackup/8.0/installation/docker.html)

[数据库备份之Xtrabackup](https://cn.openjianghu.org/doc/page/article/10080)

[MySQL 物理备份： Innobackupex 和 xtrabackup（热备）](https://www.jianshu.com/p/e8bd79e84f55)

