---
order: 250
category:
  - linux

---

# Linux-which查看可执行文件

## 1 简介

**查看可执行文件的位置**

which命令的作用是，**在PATH变量指定的路径中**，搜索某个系统命令的位置，并且返回第一个搜索结果。

> 也就是说，使用which命令，就可以看到某个系统命令是否存在，以及执行的到底是哪一个位置的命令。 

## 2 命令语法

which 可执行文件名称 

## 3 命令参数

- -a 如果有多个匹配结果则打印所有结果:
- -n 指定文件名长度，指定的长度必须大于或等于所有文件中最长的文件名。

- -p 与-n参数相同，但此处的包括了文件的路径。

- -w 指定输出时栏位的宽度。

- -V 显示版本信息

## 4 实例

### 4.1 java 命令所在的位置

```bash
which -a java
```

![image-20220418174207332](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220418174207332.png)

### **4.2 找出 cd 这个命令**

```bash
which cd
```

![image-20220418174012154](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220418174012154.png)

### 4.3 找出 xx这个命令

```bash
which xxx
```

![image-20220418174248167](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220418174248167.png)

### 4.4 找出 redis 这个命令

redis 只是软件，并不是命令

```
 which redis
```

![image-20220419105639815](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419105639815.png)

### 