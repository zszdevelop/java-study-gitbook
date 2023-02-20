---
order: 220
category:
  - linux

---

## 1 简介

find是最常见和最强大的查找命令，你可以用它找到任何你想找的文件。 

## 2 命令语法

```bash
find < path > < expression > < cmd >
find <指定目录> <指定条件> <指定动作>
```

- path： 所要搜索的目录及其所有子目录。默认为当前目录。
- expression： 所要搜索的文件的特征。
- cmd： 对搜索结果进行特定的处理。

如果什么参数也不加，find默认搜索当前目录及其子目录，并且不过滤任何结果（也就是返回所有文件），将它们全都显示在屏幕上。

## 3 实例

### 3.1 按扩展名查找文件

```bash
 # 语法
 find root_path -name '*.ext'
 # 示例
 find /home -name "*.txt"
```

### 3.2 在不区分大小写的模式下，查找与给定名称匹配的目录

```bash
 # 语法
find root_path -type d -iname '*lib*'
 # 示例
 find /home -type d -name "*service*"
```

### 3.3 通过匹配多个模式查找文件

```bash
 # 语法
find root_path -name '*pattern_1*' -or -name '*pattern_2*'
 # 示例
find . -name "*.txt" -o -name "*.pdf" 
```

### 3.4 查找与路径模式匹配的文件:

```bash
  # 语法
 find root_path -path '**/lib/**/*.ext'
  # 示例
 find /usr/ -path "*local*"
```

### 3.5查找与给定大小范围匹配的文件:

```bash
find root_path -size +500k -size -10M
```

### 3.6 找到最近7天修改过的文件，并删除它们:

```bash
find root_path -mtime -7 -delete
```

### 3.7 根据文件类型进行搜索

```
find . -type 类型参数
```

类型参数列表：

- **f** 普通文件
- **l** 符号连接
- **d** 目录
- **c** 字符设备
- **b** 块设备
- **s** 套接字
- **p** Fifo

### 3.8 根据文件时间戳进行搜索

```
find . -type f 时间戳
```

UNIX/Linux文件系统每个文件都有三种时间戳：

- **访问时间**（-atime/天，-amin/分钟）：用户最近一次访问时间。
- **修改时间**（-mtime/天，-mmin/分钟）：文件最后一次修改时间。
- **变化时间**（-ctime/天，-cmin/分钟）：文件数据元（例如权限等）最后一次修改时间。

搜索最近七天内被访问过的所有文件

```
find . -type f -atime -7
```

搜索恰好在七天前被访问过的所有文件

```
find . -type f -atime 7
```

搜索超过七天内被访问过的所有文件

```
find . -type f -atime +7
```

搜索访问时间超过10分钟的所有文件

```
find . -type f -amin +10
```

找出比[file](http://man.linuxde.net/file).log修改时间更长的所有文件

```
find . -type f -newer file.log
```

### 