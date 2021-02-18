# 安装FTP服务

## 1.安装vsftpd

安装前先查看ftp 是否已经安装，使用yum 安装

```
vsftpd -v
yum -y install vsftpd
```

## 2. 修改配置文件

根据自己的需求，修改ftp配置文件`/etc/vsftpd/vsftpd.conf`

```objectivec
anonymous_enable=NO    # 是否允许匿名访问
local_enable=YES      # 是否允许使用本地帐户进行 FTP 用户登录验证
local_umask=022      # 设置本地用户默认文件掩码022
chroot_local_user=YES   # 是否限定用户在其主目录下（NO 表示允许切换到上级目录）
#chroot_list_enable=YES # 是否启用限制用户的名单（注释掉为禁用）
chroot_list_file=/etc/vsftpd/chroot_list # 用户列表文件（一行一个用户）
allow_writeable_chroot=YES # 如果启用了限定用户在其主目录下需要添加这个配置，解决报错 500 OOPS: vsftpd: refusing to run with writable root inside chroot()
xferlog_enable=YES     # 启用上传和下载的日志功能，默认开启。
use_localtime=YES     # 是否使用本地时(自行添加)
userlist_enable=YES 
```

chroot_local_user 与 chroot_list_enable 的组合效果如下：

|                        | chroot_local_user=YES                                        | chroot_local_user=NO                                         |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| chroot_list_enable=YES | 1. 所有用户都被限制在其主目录下 2. 使用 chroot_list_file 指定的用户列表，这些用户作为“例外”，不受限制 | 1. 所有用户都不被限制其主目录下 2. 使用 chroot_list_file 指定的用户列表，这些用户作为“例外”，受到限制 |
| chroot_list_enable=NO  | 1. 所有用户都被限制在其主目录下 2. 不使用 chroot_list_file 指定的用户列表，没有任何“例外”用户 | 1. 所有用户都不被限制其主目录下 2. 不使用 chroot_list_file 指定的用户列表，没有任何“例外”用户 |

> 注意：如果设置了 local_enable=YES ，自带

## 3. 启动ftp服务

```
systemctl start vsftpd
```

## 4. 用户管理

```
# 使用useradd 命令添加一个用户
useradd ftpuser
# 设置用户密码
passwd ftpuser
```

## 5. 主动模式和被动模式

ftp 的主动模式（Port 模式）与被动模式（PASV 模式）的区别：[https://www.cnblogs.com/xiaohh/p/4789813.html](https://link.jianshu.com/?t=https%3A%2F%2Fwww.cnblogs.com%2Fxiaohh%2Fp%2F4789813.html)
本文推荐使用**被动模式**，vsftp 默认即为被动模式

- 开启被动模式（PASV）

在 `/etc/vsftpd/vsftpd.conf` 配置文件添加如下配置

```objectivec
pasv_enable=YES # 是否允许数据传输时使用PASV模式（默认值为 YES）
pasv_min_port=port port_number # PASV 模式下，数据传输使用的端口下界（0 表示任意。默认值为 0）把端口范围设在比较高的一段范围内，比如 50000-60000，将有助于安全性的提高.
pasv_max_port=port_number # PASV 模式下，数据传输使用的端口上界（0 表示任意。默认值为 0）
pasv_promiscuous=NO # 是否屏蔽对 PASV 进行安全检查，默认值为 NO（当有安全隧道时可禁用）
pasv_address # PASV 模式中服务器传回的 ip 地址。默认值为 none，即地址是从呼入的连接套接字中获取。
```

- 开启主动模式（PORT）的配置

```objectivec
port_enable=YES  # 是否开启 Port 模式
connect_from_port_20=YES # 当 Port 模式开启的时候，是否启用默认的 20 端口监听
ftp_data_port=port_number # Port 模式下 FTP 数据传输所使用的端口，默认值为20
```

### 参考文章

[CentOS 7 安装 FTP 服务](<https://www.jianshu.com/p/05dc6455b513>)

