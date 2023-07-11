---
order: 1010
category:
  - 数据库
  - Mysql

---

# MySQL设置 - 密码策略

## 1. 简介

在等保测评中，评测机构会要求设置密码安全测。如密码复杂度和自动过期策略等

## 2. 密码复杂度策略设置

MySQL 系统自带有 validate_password 插件，此插件可以验证密码强度，未达到规定强度的密码则不允许被设置。MySQL 5.7 及 8.0 版本默认情况下貌似都不启用该插件，这也使得我们可以随意设置密码，比如设置为 123、123456等。如果我们想从根源上规范密码强度，可以启用该插件，下面一起来看下如何通过此插件来设置密码复杂度策略。

### **2.1 查看是否已安装此插件**

进入 MySQL 命令行，通过 show plugins 或者查看 validate_password 相关参数可以判断是否已安装此插件。若没有相关参数则代表未安装此插件

```sql
# 安装前检查 为空则说明未安装此插件
mysql> show variables like 'validate%';
Empty set (0.00 sec)
```

### 2.2 **安装 validate_password 插件**

```sql
# 通过 INSTALL PLUGIN 命令可安装此插件
# 每个平台的文件名后缀都不同 对于 Unix 和类 Unix 系统，为.so，对于 Windows 为.dll
mysql> INSTALL PLUGIN validate_password SONAME 'validate_password.so';
Query OK, 0 rows affected, 1 warning (0.28 sec)

# 查看 validate_password 相关参数
mysql> show variables like 'validate%';
+--------------------------------------+--------+
| Variable_name                        | Value  |
+--------------------------------------+--------+
| validate_password_check_user_name    | ON     |
| validate_password_dictionary_file    |        |
| validate_password_length             | 8      |
| validate_password_mixed_case_count   | 1      |
| validate_password_number_count       | 1      |
| validate_password_policy             | MEDIUM |
| validate_password_special_char_count | 1      |
+--------------------------------------+--------+
7 rows in set (0.00 sec)
```

**2.3 密码强度相关参数解释**

安装 validate_password 插件后，多了一些密码强度相关参数，这些参数从字面意思上也很容易看懂，下面简单解释下几个重点参数。

> 1、validate_password_policy
> 代表的密码策略，默认是MEDIUM 可配置的值有以下：
> 0 or LOW 仅需需符合密码长度（由参数validate_password_length指定）
> 1 or MEDIUM 满足LOW策略，同时还需满足至少有1个数字，小写字母，大写字母和特殊字符
> 2 or STRONG 满足MEDIUM策略，同时密码不能存在字典文件（dictionary file）中
>
> 2、validate_password_dictionary_file
> 用于配置密码的字典文件，当validate_password_policy设置为STRONG时可以配置密码字典文件，字典文件中存在的密码不得使用。
>
> 3、validate_password_length
> 用来设置密码的最小长度，默认值是8
>
> 4、validate_password_mixed_case_count
> 当validate_password_policy设置为MEDIUM或者STRONG时，密码中至少同时拥有的小写和大写字母的数量，默认是1最小是0；默认是至少拥有一个小写和一个大写字母。
>
> 5、validate_password_number_count
> 当validate_password_policy设置为MEDIUM或者STRONG时，密码中至少拥有的数字的个数，默认1最小是0
>
> 6、validate_password_special_char_count
> 当validate_password_policy设置为MEDIUM或者STRONG时，密码中至少拥有的特殊字符的个数，默认1最小是0

### 2.4 密码复杂度策略具体设置

学习完以上参数，我们就可以根据自身情况来具体设置密码复杂度策略了，比如我想让密码至少 10 位且包含大小写字母、数字、特殊字符，则可以这样设置。

```sql
# 设置密码长度至少10位
mysql> set global validate_password_length = 10;
Query OK, 0 rows affected (0.00 sec)

mysql> show variables like 'validate%';                                                                                   
+--------------------------------------+--------+
| Variable_name                        | Value  |
+--------------------------------------+--------+
| validate_password_check_user_name    | ON     |
| validate_password_dictionary_file    |        |
| validate_password_length             | 10     |
| validate_password_mixed_case_count   | 1      |
| validate_password_number_count       | 1      |
| validate_password_policy             | MEDIUM |
| validate_password_special_char_count | 1      |
+--------------------------------------+--------+
7 rows in set (0.00 sec)

# 若想永久生效，建议将以下参数写入配置文件
[mysqld]
plugin-load = validate_password.so
validate_password_length = 10
validate_password_policy = 1
validate-password = FORCE_PLUS_PERMANENT
```

### 2.5 测试密码复杂度

密码复杂度策略只对生效后的操作有效，比如说你之前有个账号，密码是 123 ，则该账号还是可以继续使用的，不过若再次更改密码则需满足复杂度策略。下面我们来测试下密码复杂度策略的具体效果。

```sql
# 新建用户设置密码
mysql> create user 'testuser'@'%' identified by '123';
ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
mysql> create user 'testuser'@'%' identified by 'ab123';
ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
mysql> create user 'testuser'@'%' identified by 'Ab@123';
ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
mysql> create user 'testuser'@'%' identified by 'Bsdf@5467672';
Query OK, 0 rows affected (0.01 sec)

# 更改密码
mysql> alter user 'testuser'@'%' identified by 'dfgf3435';
ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
mysql> alter user 'testuser'@'%' identified by 'dBsdf@5467672';
Query OK, 0 rows affected (0.01 sec)
```

## 3. 设置密码自动过期

除了设置密码复杂度策略外，我们还可以设置密码自动过期，比如说隔 90 天密码会过期必须修改密码后才能继续使用，这样我们的数据库账号就更加安全了。下面我们来看下如何设置密码自动过期。

### 3.1 **单独设置某个账号密码过期时间**

使用 ALTER USER 语句可以使单个账号密码过期，也可以更改账号过期时间。

```sql
# 通过 mysql.user 系统表查看数据库账号状态
mysql> select user,host,password_expired,password_lifetime,password_last_changed,account_locked from mysql.user;
+------------------+-----------+------------------+-------------------+-----------------------+----------------+
| user             | host      | password_expired | password_lifetime | password_last_changed | account_locked |
+------------------+-----------+------------------+-------------------+-----------------------+----------------+
| expuser          | %         | N                |              NULL | 2021-01-05 14:30:30   | N              |
| root             | %         | N                |              NULL | 2020-10-30 14:45:43   | N              |
| testuser         | %         | N                |              NULL | 2021-01-04 17:22:37   | N              |
| mysql.infoschema | localhost | N                |              NULL | 2020-10-30 14:37:09   | Y              |
| mysql.session    | localhost | N                |              NULL | 2020-10-30 14:37:09   | Y              |
| mysql.sys        | localhost | N                |              NULL | 2020-10-30 14:37:09   | Y              |
| root             | localhost | N                |              NULL | 2020-10-30 14:38:55   | N              |
+------------------+-----------+------------------+-------------------+-----------------------+----------------+
7 rows in set (0.01 sec)

# 使 expuser 账号密码立即过期
mysql> ALTER USER 'expuser'@'%' PASSWORD EXPIRE;
Query OK, 0 rows affected (0.00 sec)

mysql> select user,host,password_expired,password_lifetime,password_last_changed,account_locked from mysql.user;
+------------------+-----------+------------------+-------------------+-----------------------+----------------+
| user             | host      | password_expired | password_lifetime | password_last_changed | account_locked |
+------------------+-----------+------------------+-------------------+-----------------------+----------------+
| expuser          | %         | Y                |              NULL | 2021-01-05 14:30:30   | N              |
| root             | %         | N                |              NULL | 2020-10-30 14:45:43   | N              |
| testuser         | %         | N                |              NULL | 2021-01-04 17:22:37   | N              |
| mysql.infoschema | localhost | N                |              NULL | 2020-10-30 14:37:09   | Y              |
| mysql.session    | localhost | N                |              NULL | 2020-10-30 14:37:09   | Y              |
| mysql.sys        | localhost | N                |              NULL | 2020-10-30 14:37:09   | Y              |
| root             | localhost | N                |              NULL | 2020-10-30 14:38:55   | N              |
+------------------+-----------+------------------+-------------------+-----------------------+----------------+
7 rows in set (0.00 sec)

# 修改账号密码永不过期
mysql> ALTER USER 'expuser'@'%' PASSWORD EXPIRE NEVER;
Query OK, 0 rows affected (0.01 sec)

# 单独设置该账号密码90天过期
mysql> ALTER USER 'expuser'@'%' PASSWORD EXPIRE INTERVAL 90 DAY;
Query OK, 0 rows affected (0.00 sec)

mysql> select user,host,password_expired,password_lifetime,password_last_changed,account_locked from mysql.user;
+------------------+-----------+------------------+-------------------+-----------------------+----------------+
| user             | host      | password_expired | password_lifetime | password_last_changed | account_locked |
+------------------+-----------+------------------+-------------------+-----------------------+----------------+
| expuser          | %         | N                |                90 | 2021-01-05 14:41:28   | N              |
| root             | %         | N                |              NULL | 2020-10-30 14:45:43   | N              |
| testuser         | %         | N                |              NULL | 2021-01-04 17:22:37   | N              |
| mysql.infoschema | localhost | N                |              NULL | 2020-10-30 14:37:09   | Y              |
| mysql.session    | localhost | N                |              NULL | 2020-10-30 14:37:09   | Y              |
| mysql.sys        | localhost | N                |              NULL | 2020-10-30 14:37:09   | Y              |
| root             | localhost | N                |              NULL | 2020-10-30 14:38:55   | N              |
+------------------+-----------+------------------+-------------------+-----------------------+----------------+
7 rows in set (0.00 sec)

# 让此账号使用默认的密码过期全局策略
mysql> ALTER USER 'expuser'@'%' PASSWORD EXPIRE DEFAULT;
Query OK, 0 rows affected (0.01 sec)
```

mysql.user 系统表记录着每个账号的相关信息，当 password_expired 字段值为 Y 时，代表此密码已过期，使用过期密码仍可以登录，但不能进行任何操作，进行操作会提示：ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement. 必须更改密码后才能进行正常操作。

对于给定过期时间的账号，比如说设置 90 天过期，数据库系统会比较当前时间与上次修改密码的时间差值，如果距离上次修改密码时间超过 90 天，则将此账号密码标记为过期，必须更改密码后才能进行操作。

### 3.2 **设置全局过期策略**

要构建全局密码自动过期策略，请使用 default_password_lifetime 系统变量。在 5.7.11 版本之前，默认的 default_password_lifetime 值为 360(密码大约每年必须更改一次)，之后的版本默认值为 0，表示密码不会过期。此参数的单位是天，比如我们可以将此参数设置为 90 ，则表示全局密码自动过期策略是 90 天。

```sql
# 设置全局过期策略 先手动更改再加入配置文件
mysql> SET GLOBAL default_password_lifetime = 90;
Query OK, 0 rows affected (0.01 sec)

mysql> show variables like 'default_password_lifetime';
+---------------------------+-------+
| Variable_name             | Value |
+---------------------------+-------+
| default_password_lifetime | 90    |
+---------------------------+-------+
1 row in set (0.00 sec)

# 写入配置文件使得重启生效
[mysqld]
default_password_lifetime = 90
```

尽管可以通过将过期的密码设置为当前值来“重置”它，但出于良好的 Policy 考虑，最好选择其他密码。

## 参考文章

[MySQL密码复杂度与密码过期策略介绍 ](https://www.cnblogs.com/mysqljs/p/14246130.html)
