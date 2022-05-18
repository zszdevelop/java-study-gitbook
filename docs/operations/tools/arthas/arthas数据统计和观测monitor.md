# arthas数据统计和观测

>官方文档写得挺好，直接查看[官方文档](https://arthas.gitee.io/advanced-use.html#as-sh-arthas-boot)

# monitor/watch/trace

> 请注意，这些命令，都通过字节码增强技术来实现的，会在指定类的方法中插入一些切面来实现数据统计和观测，因此在线上、预发使用时，请尽量明确需要观测的类、方法以及条件，诊断结束要执行 `stop` 或将增强过的类执行 `reset` 命令。

## 1. 概述

- [monitor](https://arthas.gitee.io/monitor.html)——方法执行监控
- [watch](https://arthas.gitee.io/watch.html)——方法执行数据观测
- [trace](https://arthas.gitee.io/trace.html)——方法内部调用路径，并输出方法路径上的每个节点上耗时
- [stack](https://arthas.gitee.io/stack.html)——输出当前方法被调用的调用路径
- [tt](https://arthas.gitee.io/tt.html)——方法执行数据的时空隧道，记录下指定方法每次调用的入参和返回信息，并能对这些不同的时间下调用进行观测

## 2. monitor

### 2.1 简介

> 方法执行监控

对匹配 `class-pattern`／`method-pattern`／`condition-express`的类、方法的调用进行监控。

`monitor` 命令是一个非实时返回命令.

实时返回命令是输入之后立即返回，而非实时返回的命令，则是不断的等待目标 Java 进程返回信息，直到用户输入 `Ctrl+C` 为止。

服务端是以任务的形式在后台跑任务，植入的代码随着任务的中止而不会被执行，所以任务关闭后，不会对原有性能产生太大影响，而且原则上，任何Arthas命令不会引起原有业务逻辑的改变。

### 2.2 监控的维度说明

| 监控项    | 说明                       |
| --------- | -------------------------- |
| timestamp | 时间戳                     |
| class     | Java类                     |
| method    | 方法（构造方法、普通方法） |
| total     | 调用次数                   |
| success   | 成功次数                   |
| fail      | 失败次数                   |
| rt        | 平均RT                     |
| fail-rate | 失败率                     |

### 2.3 测试

```bash
# 监控具体的方法
monitor -c 5 com.ruoyi.web.controller.system.SysLoginController login
# 监控所有方法
monitor -c 5 com.ruoyi.web.controller.system.SysLoginController *

```

![image-20220511102548695](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220511102548695.png)

## 3. watch

### 3.1 简介

> 函数执行数据观测

让你能方便的观察到指定函数的调用情况。能观察到的范围为：`返回值`、`抛出异常`、`入参`，通过编写 OGNL 表达式进行对应变量的查看。

### 3.2 测试

```bash
watch com.ruoyi.web.controller.system.SysLoginController login "{params,target,returnObj}" -x 2 -b -s -n 2
```



![image-20220511103825661](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220511103825661.png)

## 4. trace

### 4.1 简介

> 方法内部调用路径，并输出方法路径上的每个节点上耗时

`trace` 命令能主动搜索 `class-pattern`／`method-pattern` 对应的方法调用路径，渲染和统计整个调用链路上的所有性能开销和追踪调用链路。

### 4.2 测试

```bash
trace com.ruoyi.web.controller.system.SysLoginController login
```

![image-20220511104117102](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220511104117102.png)

## 5. stack

### 5.1 简介

> 输出当前方法被调用的调用路径

很多时候我们都知道一个方法被执行，但这个方法被执行的路径非常多，或者你根本就不知道这个方法是从那里被执行了，此时你需要的是 stack 命令。

### 5.2 测试

```bash
trace com.ruoyi.framework.web.service.SysLoginService login
```



![image-20220511104425855](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220511104425855.png)



> 方法执行数据的时空隧道，记录下指定方法每次调用的入参和返回信息，并能对这些不同的时间下调用进行观测

`watch` 虽然很方便和灵活，但需要提前想清楚观察表达式的拼写，这对排查问题而言要求太高，因为很多时候我们并不清楚问题出自于何方，只能靠蛛丝马迹进行猜测。

## 6. tt 执行数据的时空隧道

### 6.1 简介

> 方法执行数据的时空隧道，记录下指定方法每次调用的入参和返回信息，并能对这些不同的时间下调用进行观测

`watch` 虽然很方便和灵活，但需要提前想清楚观察表达式的拼写，这对排查问题而言要求太高，因为很多时候我们并不清楚问题出自于何方，只能靠蛛丝马迹进行猜测。

这个时候如果能记录下当时方法调用的所有入参和返回值、抛出的异常会对整个问题的思考与判断非常有帮助。

于是乎，TimeTunnel 命令就诞生了。

### 6.2 测试

```
tt -t com.ruoyi.framework.web.service.SysLoginService login
```



![image-20220511110112554](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220511110112554.png)

## 参考文章

[官方文档](https://arthas.gitee.io/advanced-use.html#as-sh-arthas-boot)