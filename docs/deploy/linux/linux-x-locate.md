---
order: 270
category:
  - linux
---

# Linux-locate查找文件

## 1 简介

locate命令其实是“find -name”的另一种写法，但是要比后者快得多，原因在于它不搜索具体目录，**而是搜索一个数据库（/var/lib/locatedb），这个数据库中含有本地所有文件信息**。Linux系统自动创建这个数据库，并且**每天自动更新一次**，所以使用locate命令查不到最新变动过的文件。为了避免这种情况，可以在使用locate之前，先使用updatedb命令，手动更新数据库。

## 2 命令语法

```bash
locate [OPTION]… [PATTERN]…
```

## 3 命令参数（用得不多）

在mlocate数据库中搜索条目.

- -A, --all   只显示匹配所有模式的条目
-  -b, --basename     匹配唯一的路径名称的基本文件名
-  -c, --count      只显示找到条目的号码
-  -d, --database DBPATH 用 DBPATH 替代默认的数据库(/var/lib/mlocate/mlocate.db)
-  -e, --existing     只显示当前存在的文件条目
-  -L, --follow      当文件存在时跟随蔓延的符号链接 (默认)
- -h, --help       显示本帮助
-  -i, --ignore-case   匹配模式时忽略大小写区别
-  -l, --limit, -n LIMIT 限制为 LIMIT项目的输出 (或 计数) 
-  -m, --mmap       忽略向后兼容性
-  -P, --nofollow, -H   当检查文件时不跟随蔓延的符号链接
-  -0, --null       输出时以 NUL 分隔项目
-  -S, --statistics    不搜索项目,显示有关每个已用数据库的统计信息
-  -q, --quiet      不报告关于读取数据库的错误消息
-  -r, --regexp REGEXP  搜索基本正则表达式 REGEXP 来代替模式
     --regex      模式是扩展正则表达式
-  -s, --stdio      忽略向后兼容性
-  -V, --version     显示版本信息
- -w, --wholename    匹配完整路径名 (默认)

## 4 实例

### 4.1 查找包含某个字符串的相关文件

```bash
locate redis
```

![image-20220419113313972](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419113313972.png)

### 4.2 按文件名查找文件（不包含填充字符的模式被解释为 *关键字*）:

```bash
# 语法
locate */文件名
# 示例
 locate */redis
```

这样过滤出的结果更加符合我们想要的

![image-20220419134741153](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419134741153.png)

### 4.3 重新建立文件数据索引数据库。

如果要查找最近添加的文件，则需要执行此操作:

```bash
sudo updatedb
```

### 4.4 搜索目录下所有以 sh开头的文件

```bash
locate /bin/sh
```



![image-20220419113440829](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419113440829.png)

### 4.5 指定显示数量

如果显示的内容过多，可以使用 -n 选项来限定显示数量。

```bash
locate -n 3 redis
```

![image-20220419113647925](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419113647925.png)

## 5 locate 命令安装

如果locate 搜索时提示命令不存在

![image-20220419112033248](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419112033248.png)

则需要先安装一下

```bash
yum install mlocate
sudo updatedb
locate  *.doc
```

