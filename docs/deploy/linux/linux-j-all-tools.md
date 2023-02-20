---
order: 180
---

# Linux系统监控全能工具

## 1. 简介

常用的命令有glances 和 dstat

## 2. 命令

### 2.1 glances

glances 是一个用来监视 GNU/Linux 和 FreeBSD 操作系统的 GPL 授权的全能工具。

Glances 会用一下几种颜色来代表状态：

- 绿色：OK（一切正常）
- 蓝色：CAREFUL（需要注意）
- 紫色：WARNING（警告）
- 红色：CRITICAL（严重）。

阀值可以在配置文件中设置，一般阀值被默认设置为（careful=50、warning=70、critical=90）

### 2.2 dstat

dstat命令 是一个用来替换vmstat、iostat、netstat、nfsstat和ifstat这些命令的工具。

直接使用dstat，默认使用的是-cdngy参数，分别显示cpu、disk、net、page、system信息，默认是1s显示一条信息。