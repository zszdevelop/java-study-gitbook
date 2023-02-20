---
order: 130
---

# Linux CPU监控

## 1. 简介

常用命令有top 和mpstat

## 2.命令

### 2.1 top

#### 2.1.1 简介

top命令 可以实时动态地查看系统的整体运行情况。

#### 2.1.2 语法：

```scss
top (选项)
```

选项：
`-b`：以批处理模式操作；
`-c`：显示完整的治命令；
`-d`：屏幕刷新间隔时间；
`-I`：忽略失效过程；
`-s`：保密模式；
`-S`：累积模式；
`-i<时间>`：设置间隔时间；
`-u<用户名>`：指定用户名；
`-p<进程号>`：指定进程；
`-n<次数>`：循环显示的次数

![image-20220401142646239](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401142646239.png)

#### 2.1.3 字段说明

- `top`：系统当前时间
- `up xxx days`：系统运行时间
- `1 users`：当前登录用户个数
- `load average`：系统负载。即任务队列的平均长度。三个数值分别为最近1分钟、最近5分钟、最近15分钟的平均负载。——超过N（CPU核数）说明系统满负荷运行。
- Tasks
  - `total`：总进程数
  - `running`：正在运行的进程数
  - `sleeping`：睡眠的进程数
  - `stopped`：停止的进程数
  - `zombie`：冻结的进程数
- %Cpu(s)
  - `us`：用户进程消耗的CPU百分比
  - `sy`：内核进程消耗的CPU百分比
  - `ni`：改变过优先级的进程占用CPU的百分比
  - `id`：空闲CPU的百分比
  - `wa`：IO等待消耗的CPU百分比
- Mem
  - `total`：物理内存总量
  - `free`：空闲物理内存总量
  - `used`：已用物理内存总量
  - `buff`：用作内核缓存内存总量
- Swap
  - `total`：虚拟内存总量
  - `free`：空闲虚拟内存总量
  - `used`：已用虚拟内存总量

#### 2.1.4 实例

##### 2.1.4.1 默认top

![image-20220401142646239](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401142646239.png)

### 2.2 mpstat

#### 2.2.1 简介

mpstat命令 指令主要用于多CPU环境下，它显示各个可用CPU的状态系你想。

#### 2.2.2 语法：

```erlang
mpstat (选项) (参数)
```

选项：

```css
-P：指定CPU编号。
```

参数：

- 间隔时间：每次报告的间隔时间（秒）；
- 次数：显示报告的次数。

#### 2.2.3 示例

ALL表示显示所有CPUs，也可以指定某个CPU；2表示刷新间隔。

![image-20220401143304219](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401143304219.png)

