---
order: 430
category:
  - RabbitMQ  
  - MQ
---

# RabbitMQ管理 - 用户管理：user

## 1. 简介

在 RabbitMQ 中，**用户** 是访问控制（Access Control）的基本单元，且用户可以跨越多个 vhost 授权。使用标准的用户名和密码来认证用户。

## 2. 创建用户：add_user

```bash
rabbitmqctl add_user {username} {password} 
```

实践练习

```bash
[root@study ~]# rabbitmqctl add_user test1 123456
Creating user "test1"
```

## 3. 修改密码：change_password

```bash
rabbitmqctl change_password {username} {newpassword}
```

实践练习

```bash
[root@study ~]# rabbitmqctl change_password test1 1234567
Changing password for user "test1"
```

## 4. 清除密码：clear_password

清除密码后，该用户就不能使用密码登录了

```bash
rabbitmqctl change_password {username} 
```

## 5. 验证用户密码：authenticate_user

可以验证用户密码是否匹配

```bash
rabbitmqctl authenticate_user {username} {newpassword}
```

实践练习

```bash
# 验证失败
[root@study ~]# rabbitmqctl authenticate_user test1 123456
Authenticating user "test1"
Error: failed to authenticate user "test1"

# 验证成
[root@study ~]# rabbitmqctl authenticate_user test1 1234567
Authenticating user "test1"
Success
```

## 6. 用户列表：list_users

```bash
rabbitmqctl list_users
```

实践练习

```bash
[root@study ~]# rabbitmqctl list_users
Listing users
test1   []
admin   [administrator]
guest   [administrator]
# 可以看到有 3 个用户
```

方括号中的是角色类型，有 5 种：

- none：无任何角色。新创建的为这种；怎么显示的是没有？

- management：可以访问 web 管理页面（下一节讲解）

- policymaker：

  包含 management 的所有权限，并且可以管理 **策略（Policy）** 和 **参数（Parameter）**（下一章讲解）

- monitoring：

  包含 management 的所有权限，并且可以看到所有连接、信道及节点相关的信息

- administrator：

  最高权限，包含 monitoring 的所有权限，并且可以管理用户、虚拟主机、权限、策略、参数等。

## 7. 设置角色 set_user_tags

可以给用户设置角色，设置角色之后，现有的角色会被删除。也就是以这次设置的角色为准

```bash
rabbitmqctl set_user_tags {username} {tag ...}

tag ：表示要设置的角色，可以多个，空格隔开
```

实践练习

```bash
[root@study ~]# rabbitmqctl set_user_tags test1 management policymaker
Setting tags for user "test1" to [management,policymaker]

# 查看用户，就看到了刚刚设置的角色
[root@study ~]# rabbitmqctl list_users
Listing users
test1   [management, policymaker]
admin   [administrator]
guest   [administrator]

# 不带 tag 就是清空角色
[root@study ~]# rabbitmqctl set_user_tags test1
Setting tags for user "test1" to []
```

## 8. 删除用户：delete_user

```bash
rabbitmqctl delete_user {username}
```

实践练习

```bash
[root@study ~]# rabbitmqctl delete_user test1
Deleting user "test1"
```

## 参考文章

[用户管理：user](https://zq99299.github.io/mq-tutorial/rabbitmq-ac/05/02.html)