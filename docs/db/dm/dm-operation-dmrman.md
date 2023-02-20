# 达梦数据库-DMRMAN（备份，恢复）

## 1. 简介

我们再Windows中,我们可以使用图形化客户端工具进行备份还原，但是在Linux 中就不太好使了。需要使用DMRMAN

## 2. 使用步骤

前置步骤 

1. 停止服务

   ```sh
   systemctl stop DmServiceDAMENG.service
   ```

2. 切换到 dmaba用户

   ```sh
    su - dmdba
   ```

3. 在bin目录下启动DMRMAN

   ```sh
   ./dmrman
   ```

### 2.1 备份

1. 全量备份

   ```SH
   BACKUP DATABASE '/soft/dm8/data/DAMENG/dm.ini' FULL BACKUPSET '/soft/dm8/back/dmmback'
   ```

### 2.2 还原

1. 还原数据库

   ```sh
   RESTORE DATABASE '/soft/dm8/data/DAMENG/dm.ini' from backupset '/soft/dm8/back/dmmback'
   ```

2. 恢复数据库

   ```sh
   RECOVER DATABASE '/soft/dm8/data/DAMENG/dm.ini' from backupset '/soft/dm8/back/dmmback'
   ```

3. 更新dm_nagic

   ```sh
   RECOVER DATABASE '/soft/dm8/data/DAMENG/dm.ini' update db_magic
   ```

4. 启动

   ```
   systemctl start DmServiceDAMENG.service
   ```

   

