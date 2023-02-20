---
order: 360
category:
  - linux

---

# uniq去重命令

## 1 简介

uniq命令可以去除排序过的文件中的重复行

> 因此uniq经常和sort合用。也就是说，为了使uniq起作用，所有的重复行必须是相邻的。

## 2 简介

```bash
uniq [-icu]
选项与参数：
-i   ：忽略大小写字符的不同；
-c  ：进行计数
-u  ：只显示唯一的行
```

## 3 uniq 使用

testfile的内容如下：

```bash
# cat testfile
hello
world
friend
hello
world
hello
```

　　直接删除未经排序的文件，将会发现没有任何行被删除:

```bash
#uniq testfile  
hello
world
friend
hello
world
hello
```

　　排序文件，默认是去重:

```bash
#cat words | sort |uniq
friend
hello
world
```

　　排序之后删除了重复行，同时在行首位置输出该行重复的次数:

```bash
#sort testfile | uniq -c
1 friend
3 hello
2 world
```

　　仅显示存在重复的行，并在行首显示该行重复的次数:

```bash
#sort testfile | uniq -dc
3 hello
2 world
```

　　仅显示不重复的行:

```bash
#sort testfile | uniq -u
friend 
```

