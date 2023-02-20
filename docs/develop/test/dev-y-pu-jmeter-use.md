# JMeter的基本使用

## 1. 基本使用

Test Plan就是你的测试计划，可以理解为根目录，然后在里面创建测试的具体内容。

### 1.1 新建线程组

添加线程组，创建模拟多少个并发用户

在 Test Plan 上點右鍵， Add → Threads (Users) → Thread Group

![image-20220621143515425](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621143515425.png)

设定有100个使用者来测试我们的服务

![image-20220621144638422](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621144638422.png)

- 线程数：虚拟用户数。

  模拟多少个用户请求

- 准备时长（Ramp-Up Period(in seconds)）：

  线程数多长时间内启动完成 

  > 比如100个线程，5秒，则表示20秒内100个线程都要启动完成，每秒启动20个线程

- 循环次数：

  每个线程发送的次数

  > 假如值为5，100个线程，则会发送500次请求，可以勾选永远循环



### 1.2 添加采样器（HTTP请求等）

创建完线程组后，再添加http请求，表示要对哪个接口进行测试

![image-20220621144714690](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621144714690.png)

![image-20220621145436107](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621145436107.png)

#### 1.2.1 添加请求头信息

如果接口中需要设置特殊的请求头

如：用户信息的token，一般我们放在请求头

![image-20220621150443152](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621150443152.png)

![image-20220621150620862](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621150620862.png)

### 1.3 添加监听器

为需要压测的http请求添加监听器，用户生成测试结果

![image-20220621145545694](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621145545694.png)

![image-20220621145723861](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621145723861.png)

### 1.4 自动压测

![image-20220621150711906](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621150711906.png)

### 1.5 查看结果

可以自行查看压测的结果

#### 1.5.1 察看结果树

记录每个请求接口详情

![image-20220621150815332](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621150815332.png)

#### 1.5.2 汇总报告

![image-20220621150928889](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621150928889.png)

#### 1.5.3 聚合报告

![image-20220621150939140](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621150939140.png)

#### 1.5.4 汇总图

![image-20220621150952833](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621150952833.png)

## 2. jmeter 参数化

入参经常变化的话，则可以设置成一个变量，方便统一修改管理；如果入参要求随机或可多种选择，则通过函数生成器或者读取文件形成一个变量。所以参数化有三种方式：

- 用户定义的变量、
- 函数生成器、
- 读取文件。

### 2.1 用户定义的变量

 需要添加配置元件 - 用户定义的变量。

![image-20220621153104573](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621153104573.png)

定义ip

![image-20220621153231624](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621153231624.png)

使用的时候

![image-20220621153326131](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621153326131.png)

### 2.2 函数生成器 

需要用到函数助手功能，可以调用函数生成一些有规则的数据。常用的几个函数有_uuid、_random、_time。_

- ${__UUID}：

  会生成一个随机唯一 的 id，比如在避免 java 请求重发造成未处理数据太多的情况，接口请求可加一个唯一的请求 id 唯一的响应 id 进行一一对应；

- ${__Random(1,100,)}：_

  随机数_random，可以 在你指定的一个范围里取随机值；_

- ${__time(,)}

  _取当前时间_time，一些时间类的入参可以使用，如 {time (,)} 是生成精确到毫秒的时间戳、{time (/1000,)} 是生成精确到秒的时间戳、${__time (yyyy-MM-dd HH:mm:ss,)} 是生成精确到秒的当前时间。

#### 2.2.1 通过函数助手查看

函数助手中的Random函数，

创建方式：Tools–>函数助手对话框–>选择一个功能–>_Random：

![image-20220621155023710](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621155023710.png)

### 2.3 从文件读取

需要在线程组里面添加配置元件 - CSV Data Set Config
其中 Recycle on EOF: 设置 True 后，允许循环取值

![image-20220621155455357](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621155455357.png)

配置

![image-20220621155819206](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621155819206.png)

csv 文件

```
user_id,user_name
1,admin
2,test
3,sys
```

我们压测登录接口

![image-20220621160200409](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621160200409.png)

测试结果

![image-20220621160223118](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621160223118.png)

## 参考文章

[使用JMeter进行压力测试](https://blog.csdn.net/zxd1435513775/article/details/106372446)

[Apache JMeter 測試工具簡單基本教學](https://stackoverflow.max-everyday.com/2017/09/jmeter/)

[Jmeter 压测工具使用手册（完整版）](https://learnku.com/articles/43858)
