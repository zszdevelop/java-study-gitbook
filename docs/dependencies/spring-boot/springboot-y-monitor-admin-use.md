---
order: 421
category:
  - Spring
  - SpringBoot
---
# SpringBoot监控 - 集成springboot admin监控工具使用感受

## 1. 日志报表

日志报表可以监控到项目的启动情况。在什么时候启动的项目、什么时候服务听着

- UP 为正常
- OFFLINE 为异常

![image-20230427151804833](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230427151804833.png)

### 1.1 STATUS_CHANGED (UP) 事件

包含的信息

- nacos 状态
- diskSpace 磁盘空间
- dubbo 状态
- db 数据库
- redis 

![image-20230427155956721](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230427155956721.png)

### 1.2 STATUS_CHANGED (OFFLINE) 事件

应用停止等异常事件

![image-20230427160331926](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230427160331926.png)

### 1.3 ENDPOINTS_DETECTED 端点检测

![image-20230427160716440](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230427160716440.png)

### 1.4 REGISTERED/DEREGISTERED 注册到AdminServer事项

注册到AdminServer事项

![image-20230427161102703](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230427161102703.png)

## 参考文章

[**SpringBoot监控 - 集成springboot admin监控工具**](https://pdai.tech/md/spring/springboot/springboot-x-monitor-boot-admin.html)