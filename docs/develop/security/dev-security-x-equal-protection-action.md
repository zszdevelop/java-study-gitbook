---
order: 800
category:
  - 开发
  - 安全
---

# 开发安全 - 等保测评实战

## 1. 服务器安全配置

### 1.1 无密码复杂度和有效期设置

#### 1.1.1 描述

应对登录的用户进行身份标识和鉴别，身份标识具有唯一性，身份鉴别信息具有复杂度要求并定期更换；

#### 1.1.2 风险值

高

#### 1.1.3 解决步骤1

建议系统提供专用的登录控制模块对登录用户进行身份标识和鉴别。
参考配置：密码复杂度策略及有效期策略为：

修改 /etc/login.defs

```bash
PASS_MAX_DAYS   90
PASS_MIN_DAYS   2
PASS_MIN_LEN    20
PASS_WARN_AGE   7
```

>- `PASS_MAX_DAYS 90`: 密码有效期为 90 天。超过此期限后，用户必须更改密码才能继续使用系统。
>- `PASS_MIN_DAYS 2`: 用户更改密码后，必须等待 2 天才能再次更改密码。
>- `PASS_MIN_LEN 20`: 新密码长度必须至少为 20 个字符。
>- `PASS_WARN_AGE 7`: 在密码过期之前的 7 天内，系统将开始发送警告消息，提醒用户需要更改密码。

#### 1.1.4 解决步骤2

修改：/etc/pam.d/system-auth

```bash
password    requisite     pam_pwquality.so minlen=8 ucredit=-1 lcredit=-1 dcredit=-1 ocredit=-1
```

>PAM（Pluggable Authentication Modules）配置中的条目，用于指定密码策略。具体来说，该条目调用了 `pam_pwquality.so` 模块，并指定了以下参数：
>
>- `minlen=8`: 密码最小长度为 8 个字符。
>- `ucredit=-1`: 密码必须包含至少一个大写字母，否则拒绝密码。
>- `lcredit=-1`: 密码必须包含至少一个小写字母，否则拒绝密码。
>- `dcredit=-1`: 密码必须包含至少一个数字，否则拒绝密码。
>- `ocredit=-1`: 密码必须包含至少一个特殊字符，否则拒绝密码。
>
>这些参数共同定义了一个相对安全的密码策略，要求密码长度足够长，并包含大小写字母、数字和特殊字符等各种类型的字符。在使用此密码策略进行身份验证时，用户必须遵守这些规则以创建强密码。

### 1.2 未设置登录失败处理功能

#### 1.2.1 描述

应具有登录失败处理功能，应配置并启用结束会话、限制非法登录次数和当登录连接超时自动退出等相关措施；

> 建议开启失败登录处理功能，如限制非法登录次数、自动退出功能、锁定时间等。

#### 1.2.2 风险值

高

#### 1.2.3 解决步骤1

编辑/etc/pam.d/system-auth

```bash
account required /lib/securtiy/pam_tally2.so deny=3  unlock_time=300
```

>X为锁定次数，建议小于5；Y为锁定秒数，建议不小于300

#### 1.2.4 解决步骤2

远程登录失败处理功能相关参数

编辑/etc/pam.d/sshd文件中存在

```bash
auth required pam_tally2.so onerr=fail deny=5 unlock_time=300 even_deny_root root_unlock_time=10
```

#### 1.2.5 解决步骤3

编辑 /etc/profile文件中设置了超时锁定参数，在该文件中设置了

```bash
 TMOUT=600
```

### 1.3 本机的日志留存时间不足6个月

#### 1.3.1 描述

应对审计记录进行保护，定期备份，避免受到未预期的删除、修改或覆盖等

#### 1.3.2 风险值

中

#### 1.3.3 解决步骤1

编辑 /etc/logrotate.conf

![image-20230612153541057](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230612153541057.png)

```
sudo systemctl restart rsyslog
```

## 1.4 服务器未限制终端登录地址

#### 1.4.1 描述

应通过设定终端接入方式或网络地址范围对通过网络进行管理的管理终端进行限制

>建议限制可登录服务器的管理终端地址，仅允许特定的地址登录。

#### 1.4.2 风险值

高

#### 1.4.3 解决步骤1：**限制用户SSH登录**

只允许指定用户进行登录（白名单）：

在/etc/ssh/sshd_config配置文件中设置AllowUsers选项，（配置完成需要重启 SSHD 服务）格式如下：

```
AllowUsers    aliyun test@192.168.1.1            
# 允许 aliyun 和从 192.168.1.1 登录的 test 帐户通过 SSH 登录系统。
```

只拒绝指定用户进行登录（黑名单）：

在/etc/ssh/sshd_config配置文件中设置DenyUsers选项，（配置完成需要重启SSHD服务）格式如下：  

```
DenyUsers    zhangsan aliyun    #Linux系统账户        
# 拒绝 zhangsan、aliyun 帐户通过 SSH 登录系统
```

重启SSH

```
service sshd restart
```

#### 1.4.4 解决步骤2：**限制IP SSH登录**

**说明：这里的IP是指客户端IP，不是服务器IP，下面的例子使用了hosts.allow文件的配置方式，目的是快，但也有不灵活的，建议改成iptables的方案。
**

除了可以禁止某个用户登录，我们还可以针对**固定的IP进行禁止登录**，linux 服务器通过设置**/etc/hosts.allow**和**/etc/hosts.deny**这个两个文件，hosts.allow许可大于hosts.deny可以限制或者允许某个或者某段IP地址远程 SSH 登录服务器，方法比较简单，且设置后立即生效，不需要重启SSHD服务，具体如下：

/etc/hosts.allow添加

```
sshd:192.168.0.1:allow  #允许 192.168.0.1 这个IP地址SSH登录
sshd:192.168.0.:allow #允许192.168.0.1/24这段IP地址的用户登录，多个网段可以以逗号隔开，比如192.168.0.,192.168.1.:allow
```

/etc/hosts.allow添加

```
sshd:ALL #允许全部的ssh登录 
```

hosts.allow和hosts.deny两个文件同时设置规则的时候，**hosts.allow文件中的规则优先级高**，按照此方法设置后服务器只允许192.168.0.1这个IP地址的SSH登录，其它的IP都会拒绝。

/etc/hosts.deny添加

```
sshd:ALL #拒绝全部IP
```





## 参考文章

[Linux限制某些用户或IP登录SSH、允许特定IP登录SSH](https://www.cnblogs.com/EasonJim/p/8334122.html)