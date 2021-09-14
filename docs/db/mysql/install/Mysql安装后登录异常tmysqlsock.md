## Mysql安装后登录异常 Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock

## 1. 背景

登录时

```text
mysql -u root
```

报错提示

ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock' (2)

## 2. 解决思路

1. 出现该问题后，首先根据错误提示我想到的是查看本地‘/var/lib/mysql/mysql.sock’文件：

   ```sh
   ls /var/lib/mysql/mysql.sock
   ls: 无法访问/var/lib/mysql/mysql.sock: 没有那个文件或目录
   ```

2. 查找本地是否有 mysql.sock

   ```
   find / -name mysql.sock
   ```

   发现本地都没有mysql.sock文件。

3. 如果没有 mysql.sock，可能是因为/var/lib/mysql 路径没有权限导致

   1. 解决方式：授权

      ```sh
      chown root /var/lib/mysql/
      ```

   2. 重启服务

      ```sh
      service mysqld restart
      ```

   3. 若还异常

      ```sh
      chmod 777 /var/lib/mysql
      ```


4. 还有一种原因是，安装MySQL的时候自定义过socket文件保存路径，于是查看MySQL的配置文件：

   ```sh
   vim /etc/my.cnf  
   
   [mysqld]
   datadir=/data/mysql
   socket=/tmp/mysql.sock
   ```

   查看权限/var/lib/mysql/mysql.sock ,

   ```
   srwxrwxrwx 1 mysql mysql 0 8月   6 20:57 /tmp/mysql.sock
   ```

   该文件为"777"权限，所以排除了因为文件权限导致该问题的可能。 综合上面的排查，大致可以确定导致该错误的原因是MySQL寻址没寻到/tmp/mysql.sock该文件，那么该如何解决该问题呢？

   1. **解决办法**1：

      既然是寻址问题，肯定是因为寻址路径原因， 再看错误提示“/var/lib/mysql/mysql.sock”，该路径就是在更改socket路径前的默认路径，文件不存在，说明该地址无效，那么只么MySQL能找道mysql.sock文件就可以啊，于是想到创建软链接：

      ```javascript
      [root@adailinux adaiblog.com]# ln -s /var/lib/mysql/mysql.sock /tmp/mysql.sock
      ```

      创建完成后重启MySQL服务，再次执行mysql命令，问题解决。

   2. **解决办法**2：

      通过上述分析可以确定MySQL配置文件中所指定的socket路径没有生效，自我感觉这才是问题的本质原因，于是查找资料，进行如下操作：

      ```javascript
      [root@adailinux adaiblog.com]# vim /etc/my.cnf
      
      [mysqld]
      datadir=/data/mysql
      socket=/tmp/mysql.sock
      
      [client]
      socket=/tmp/mysql.sock
      ```

      编辑MySQL配置文件后添加如上内容，重启MySQL服务，问题解决！

   ## 参考文章

   [关于mysql.sock路径的问题](https://cloud.tencent.com/developer/article/1409771)