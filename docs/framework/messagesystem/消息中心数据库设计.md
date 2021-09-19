# 消息中心数据库设计

## 1. 背景

消息中心是大部分系统都有的功能，如何设计一个合理的消息系统呢？

需求：

- 每个用户收到消息都应该知道，该消息的已读未读状态

## 2. 数据库设计

### 2.1 消息表

```sql
CREATE TABLE T_SYS_NOTIFY(
    ID BIGINT(19) NOT NULL AUTO_INCREMENT  COMMENT '主键' ,
    TYPE INT(10)    COMMENT '操作类型，1 系统通知，2，用户消息' ,
    TITLE VARCHAR(64)    COMMENT '标题' ,
    CONTENT VARCHAR(512)    COMMENT '通知内容' ,
    CREATE_BY BIGINT(19)    COMMENT '创建人' ,
    CREATE_TIME DATETIME    COMMENT '创建时间' ,
    REMARK VARCHAR(64)    COMMENT '备注' ,
    PRIMARY KEY (ID)
) COMMENT = '系统消息表 ';
```

基础的消息表如上

#### 2.1.1  消息表补充

如果需要记录

- 该条提醒**所关联的对象**

- 该条提醒**所关联的动作**


例如

- 小明喜欢了文章，
  - 喜欢是：action
  - 那篇文章：target，targetType

则需要新增`target`、`targetType`、`action`字段。

```sql
ALTER TABLE T_SYS_NOTIFY ADD COLUMN target VARCHAR(32)     COMMENT '目标的ID' AFTER CONTENT;
ALTER TABLE T_SYS_NOTIFY ADD COLUMN targetType VARCHAR(32)     COMMENT '目标的类型' AFTER target;
ALTER TABLE T_SYS_NOTIFY ADD COLUMN action VARCHAR(32)     COMMENT '提醒信息的动作类型' AFTER targetType;
```



### 2.2 用户消息表

```sql
CREATE TABLE T_SYS_USER_NOTIFY(
    ID BIGINT(19) NOT NULL AUTO_INCREMENT  COMMENT '主键' ,
    NOTIFY_ID BIGINT(19)    COMMENT '通知id' ,
    USER_ID BIGINT(19)    COMMENT '用户id' ,
    IS_READ INT(10)    COMMENT '是否已读' ,
    CREATE_TIME DATETIME    COMMENT '创建时间' ,
    PRIMARY KEY (ID)
) COMMENT = '用户消息表 ';
```

## 参考文章

[消息系统设计与实现「下篇」](https://www.jianshu.com/p/6bf8166b291c)