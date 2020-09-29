# 创建数据库

### 用户表的创建

```
create table sys_user (
	id bigint not null auto_increment comment '用户id',
	user_name VARCHAR(50) comment '用户名' ,
	user_password varchar(50) comment '密码',
	user_email varchar(50) comment '邮箱',
	user_info text comment '简介',
	head_img blob comment '头像',
	create_time datetime comment '创建时间',
	primary key (id)
);
alter table sys_user comment '用户表';
```

