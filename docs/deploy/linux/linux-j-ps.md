---
order: 170
---

# Linux进程监控

## 1. 简介

进程监控命令ps

## 2. 命令

### 2.1 ps

#### 2.1.1 简介

ps（Process Status，进程状态）命令 用于报告当前系统的进程状态。

#### 2.1.2 语法

```
ps [参数]
```

常用参数：

```bash
-A    显示所有进程（同-e）
-a    显示当前终端的所有进程
-u    显示进程的用户信息
-o    以用户自定义形式显示进程信息
-f    显示程序间的关系
```

#### 2.1.3 **字段含义**

在介绍实例之前，需要先了解一下ps命令输出各字段的含义，这样我们才能更好地理解所展示的信息。常见字段的基本含义如下:

```bash
USER          进程所有者的用户名
PID           进程ID（Process ID）
START         进程激活时间
%CPU          进程的cpu占用率
%MEM          进程使用内存的百分比
VSZ           进程使用的虚拟内存大小，以K为单位
RSS           驻留空间的大小。显示当前常驻内存的程序的K字节数。
TTY           与进程关联的终端（tty）
STAT          进程状态，包括下面的状态： 
                     D    不可中断     Uninterruptible sleep (usually IO)
                     R    正在运行，或在队列中的进程
                     S    处于休眠状态
                     T    停止或被追踪
                     Z    僵尸进程
                     W    进入内存交换（从内核2.6开始无效）
                     X    死掉的进程
                     <    高优先级
                     N    低优先级
                     L    有些页被锁进内存
                     s    包含子进程
                     \+   位于后台的进程组；
                     l    多线程，克隆线程

TIME          进程使用的总CPU时间
COMMAND       被执行的命令行
NI            进程的优先级值，较小的数字意味着占用较少的CPU时间
PRI           进程优先级。
PPID          父进程ID
WCHAN         进程等待的内核事件名
```

#### 2.1.4 tldr 文档

```bash
(base) ➜  ~ tldr ps
Cache is out of date. You should run "tldr --update"

  ps

  Information about running processes.

  - List all running processes:
    显示所有运行的进程
    ps aux

  - List all running processes including the full command string:
  	列出所有正在运行的进程，包括完整的命令字符串
    ps auxww

  - Search for a process that matches a string:
  	搜索与字符串匹配的进程:
    ps aux | grep string

  - List all processes of the current user in extra full format:
  	以额外完整格式列出当前用户的所有进程:
    ps --user $(id -u) -F

  - List all processes of the current user as a tree:
  	以树的形式列出当前用户的所有进程:
    ps --user $(id -u) f

  - Get the parent pid of a process:
  	获取进程的父进程pid:
    ps -o ppid= -p pid

  - Sort processes by memory consumption:
  	按内存消耗对进程进行排序:
    ps --sort size
```

#### 2.1.5 常见用法

##### 2.1.5.1 显示所有运行的进程

把所有进程显示出来，可用使用 ps -aux 或者 ps -A 。

```bash
 ps -aux 
```

![image-20220408112800947](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220408112800947.png)

##### 2.1.5.2 **显示所有进程基本信息**

```bash
ps -ef
```

![image-20220408112951231](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220408112951231.png)

##### 2.1.5.3 搜索与字符串匹配的进程

```bash
 ps -aux | grep nginx
```

![image-20220408113035249](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220408113035249.png)

##### 2.1.5.4 **查看CPU 资源的使用量对进程进行排序**

默认的结果集是未排好序的。可以通过 sort命令来排序。

```bash
ps -aux | sort -nk 3
```

##### 2.1.5.4 **其他用法**

ps 的用法非常多，这里仅列举一些常用的：

```powershell
ps -aux | grep <name>      # 查看name 进程详细信息
ps -p <pid> -L             # 显示进程<pid> 的所有线程
ps -o lstart <pid>         # 显示进程的启动时间
ps -f --forest -C <name>   # 用树的风格显示进程的层次关系
ps -e -o pid,uname,pcpu,pmem,comm,etime  # 定制显示的列
ps -o lstart <pid>         # 显示进程的启动时间
```

