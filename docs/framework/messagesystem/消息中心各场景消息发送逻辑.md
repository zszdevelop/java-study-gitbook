# 消息中心各场景消息发送逻辑

## 1. 简介

消息中心在各场景下的发送逻辑是不一致的，例如

- 发送给单人的业务消息。我们希望发送完消息后，用户立即收到消息
- 而像类似通知公告这类消息，面向的是所有用户，那么我们不可能一次性发给所有用户。所以我们采用登录或进入首页后，重新拉取新消息的模式

## 2. 接口设计

 NotifyService拥有以下方法:

- createAnnounce(content, sender)
  1. 往Notify表中插入一条公告记录
- createRemind(target, targetType, action, sender, content)
  1. 往Notify表中插入一条提醒记录
- createMessage(content, sender, receiver)
  1. 往Notify表中插入一条信息记录
  2. 往UserNotify表中插入一条记录，并关联新建的Notify
- pullAnnounce(user)
  1. 从UserNotify中获取最近的一条公告信息的创建时间: `lastTime`
  2. 用`lastTime`作为过滤条件，查询Notify的公告信息
  3. 新建UserNotify并关联查询出来的公告信息
- pullRemind(user)
  1. 查询用户的订阅表，得到用户的一系列订阅记录
  2. 通过每一条的订阅记录的`target`、`targetType`、`action`、`createdAt`去查询Notify表，获取订阅的Notify记录。（注意订阅时间必须早于提醒创建时间）
  3. 查询用户的配置文件SubscriptionConfig，如果没有则使用默认的配置DefaultSubscriptionConfig
  4. 使用订阅配置，过滤查询出来的Notify
  5. 使用过滤好的Notify作为关联新建UserNotify
- subscribe(user, target, targetType, reason)
  1. 通过reason，查询NotifyConfig，获取对应的动作组:`actions`
  2. 遍历动作组，每一个动作新建一则Subscription记录
- cancelSubscription(user, target ,targetType)
  1. 删除`user`、`target`、`targetType`对应的一则或多则记录
- getSubscriptionConfig(userID)
  1. 查询SubscriptionConfig表，获取用户的订阅配置
- updateSubscriptionConfig(userID)
  1. 更新用户的SubscriptionConfig记录
- getUserNotify(userID)
  1. 获取用户的消息列表
- read(user, notifyIDs)
  1. 更新指定的notify，把isRead属性设置为true

## 3. 各场景发送逻辑

### 3.1 提醒的订阅、创建、拉取

![image-20211103151303897](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211103151303897.png)

1. 我们可以在产品创建之后，调用`NotifyService.subscribe`方法，
2.  然后在产品被评论之后调用`NotifyService.createRemind`方法，
3. 再就是用户登录系统或者其他的某一个时刻调
4. 用`NotifyService.pullRemind`方法，
    最后在用户查询消息队列的时候调用`NotifyService.getUserNotify`方法。

### 3.2 公告的创建、拉取

![image-20211103151351090](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211103151351090.png)

1. 在管理员发送了一则公告的时候，调用`NotifyService.createAnnounce`方法，
2.  然后在用户登录系统或者其他的某一个时刻调用`NotifyService.pullAnnounce`方法，
3.  最后在用户查询消息队列的时候调用`NotifyService.getUserNotify`方法。

### 3.3 信息的创建

![image-20211103151524274](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211103151524274.png)

信息的创建，只需要直接调用`NotifyService.createMessage`方法就可以了，
在下一次用户查询消息队列的时候，就会查询这条信息。

## 参考文章

[消息系统设计与实现「下篇」](https://www.jianshu.com/p/6bf8166b291c)
