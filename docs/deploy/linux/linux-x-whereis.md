---
order: 260
category:
  - linux

---

# Linux-whereis搜索二进制文件

## 1 简介

**whereis命令只能用于程序名的搜索**，而且只搜索二进制文件（参数-b）、man说明文件（参数-m）和源代码文件（参数-s）。如果省略参数，则返回所有信息。

搜索来源是数据库索引

> 在搜索一些进程位置时，
>
> - 如果是可执行文件，which的准确性会好一点
>
> - 但如果只是普通程序，可能并不会加入PATH，可以使用whereis 搜索

## 2 文件支持

- 二进制文件
- 源文件
- 帮助文档

## 3 实例

### 3.1  java的二进制文件

```bash
 whereis  java
```

![image-20220419105359735](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419105359735.png)

返回的结果就比which 多了很多

### 3.2 查找redis的二进制文件

```
whereis redis
```

![image-20220419105732272](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419105732272.png)

### 