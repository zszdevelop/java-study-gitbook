---
order: 370
category:
  - linux

---

# wc统计命令

## 1 简介

统计文件里面有多少单词，多少行，多少字符。

## 2 wc语法

```
 wc [-lwm]
```

选项与参数：
-l  ：仅列出行；
-w  ：仅列出多少字(英文单字)；
-m  ：多少字符；

## 3 wc使用

```bach
wc /etc/passwd
25   35 1095 /etc/passwd
```

258是行数，462是单词数，6919是字节数

wc的命令比较简单使用，每个参数使用如下：

```
#wc -l /etc/passwd   #统计行数，在对记录数时，很常用
/etc/passwd       #表示系统有40个账户
#wc -w /etc/passwd  #统计单词出现次数
/etc/passwd
#wc -m /etc/passwd  #统计文件的字节数
```

## 