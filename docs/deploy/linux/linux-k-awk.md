---
order: 330
category:
  - linux
---

# awk强大的文本分析命令

## 1 简介

awk是一个强大的文本分析工具，相对于grep的查找，sed的编辑，awk在其对数据分析并生成报告时，显得尤为强大。简单来说awk就是把文件逐行的读入，以空格为默认分隔符将每行切片，切开的部分再进行各种分析处理。

## 2 语法

```bash
awk '{pattern + action}' {filenames}
```

尽管操作可能会很复杂，但语法总是这样，其中 pattern 表示 AWK 在数据中查找的内容，而 action 是在找到匹配内容时所执行的一系列命令。花括号（{}）不需要在程序中始终出现，但它们用于根据特定的模式对一系列指令进行分组。 pattern就是要表示的正则表达式，用斜杠括起来。

　　awk语言的最基本功能是在文件或者字符串中基于指定规则浏览和抽取信息，awk抽取信息后，才能进行其他文本操作。完整的awk脚本通常用来格式化文本文件中的信息。

　　通常，awk是以文件的一行为处理单位的。awk每接收文件的一行，然后执行相应的命令，来处理文本。

## 3 awk入门

假设last -n 5的输出如下：

```bash
[root@iZwz914d1peizv4h7laju4Z ~]#  last -n 5 # 仅取出前五行
root     pts/3        223.104.6.18     Thu Apr 21 17:22   still logged in   
root     pts/2        223.104.6.18     Thu Apr 21 17:22   still logged in   
root     pts/3        223.104.6.18     Thu Apr 21 16:30 - 17:13  (00:43)    
root     pts/2        223.104.6.18     Thu Apr 21 16:30 - 17:13  (00:43)    
root     pts/3        223.104.6.12     Tue Apr 19 17:35 - 17:52  (00:17) 
```

如果只是显示最近登录的5个帐号：

```bash
[root@iZwz914d1peizv4h7laju4Z ~]# last -n 5 | awk  '{print $1}'
root
root
root
root
root
```

awk工作流程是这样的：读入有'\n'换行符分割的一条记录，然后将记录按指定的域分隔符划分域，填充域，0则表示所有域,0则表示所有域,1表示第一个域,𝑛表示第𝑛个域。默认域分隔符是"空白键"或"[𝑡𝑎𝑏]键",所以n表示第n个域。默认域分隔符是"空白键"或"[tab]键",所以1表示登录用户，$3表示登录用户ip,以此类推。

如果只是显示/etc/passwd的账户：

```bash
[root@iZwz914d1peizv4h7laju4Z ~]# cat /etc/passwd |awk  -F ':'  '{print $1}'  
root
bin
daemon
adm
lp
sync
shutdown
halt
mail
```

这种是awk+action的示例，每行都会执行action{print $1}。

　　**-F指定域分隔符为':'。**

如果只是显示/etc/passwd的账户和账户对应的shell,而账户与shell之间以tab键分割：

```bash
[root@iZwz914d1peizv4h7laju4Z ~]# cat /etc/passwd |awk  -F ':'  '{print $1"\t"$7}'
root    /bin/bash
bin     /sbin/nologin
daemon  /sbin/nologin
adm     /sbin/nologin

```

如果只是显示/etc/passwd的账户和账户对应的shell,而账户与shell之间以逗号分割,而且在所有行添加列名name,shell,在最后一行添加"blue,/bin/nosh"：

```bash
[root@iZwz914d1peizv4h7laju4Z ~]# cat /etc/passwd |awk  -F ':'  'BEGIN {print "name,shell"}  {print $1","$7} END {print "blue,/bin/nosh"}'
name,shell
root,/bin/bash
bin,/sbin/nologin
daemon,/sbin/nologin
adm,/sbin/nologin
lp,/sbin/nologin
sync,/bin/sync

```

　awk工作流程是这样的：先执行BEGING，然后读取文件，读入有/n换行符分割的一条记录，然后将记录按指定的域分隔符划分域，填充域，0则表示所有域,0则表示所有域,1表示第一个域,$n表示第n个域,随后开始执行模式所对应的动作action。接着开始读入第二条记录······直到所有的记录都读完，最后执行END操作。

　　搜索/etc/passwd有root关键字的所有行：

```bash
[root@iZwz914d1peizv4h7laju4Z ~]# awk -F: '/root/{print $7}' /etc/passwd   
/bin/bash
/sbin/nologin

```

这里指定了action{print $7}。

## 4 awk 进阶

### 4.1 内置变量

awk有许多内置变量用来设置环境信息，这些变量可以被改变，下面给出了最常用的一些变量。

```bash
ARGC               命令行参数个数
ARGV               命令行参数排列
ENVIRON            支持队列中系统环境变量的使用
FILENAME           awk浏览的文件名
FNR                浏览文件的记录数
FS                 设置输入域分隔符，等价于命令行 -F选项
NF                 浏览记录的域的个数
NR                 已读的记录数
OFS                输出域分隔符
ORS                输出记录分隔符
RS                 控制记录分隔符
```

此外,0变量是指整条记录。0变量是指整条记录。1表示当前行的第一个域,$2表示当前行的第二个域,......以此类推。

　　统计/etc/passwd:文件名，每行的行号，每行的列数，对应的完整行内容:

```bash
[root@iZwz914d1peizv4h7laju4Z ~]# awk  -F ':'  '{print "filename:" FILENAME ",linenumber:" NR ",columns:" NF ",linecontent:"$0}' /etc/passwd
filename:/etc/passwd,linenumber:1,columns:7,linecontent:root:x:0:0:root:/root:/bin/bash
filename:/etc/passwd,linenumber:2,columns:7,linecontent:bin:x:1:1:bin:/bin:/sbin/nologin
filename:/etc/passwd,linenumber:3,columns:7,linecontent:daemon:x:2:2:daemon:/sbin:/sbin/nologin
filename:/etc/passwd,linenumber:4,columns:7,linecontent:adm:x:3:4:adm:/var/adm:/sbin/nologin
filename:/etc/passwd,linenumber:5,columns:7,linecontent:lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
filename:/etc/passwd,linenumber:6,columns:7,linecontent:sync:x:5:0:sync:/sbin:/bin/sync

```

### 4.2 变量和赋值

除了awk的内置变量，awk还可以自定义变量。

下面统计/etc/passwd的账户人数：

```bash
awk '{count++;print $0;} END{print "user count is ", count}' /etc/passwd
root:x:0:0:root:/root:/bin/bash
...
user count is  25
```

　　count是自定义变量。之前的action{}里都是只有一个print,其实print只是一个语句，而action{}可以有多个语句，以;号隔开。

　　这里没有初始化count，虽然默认是0，但是妥当的做法还是初始化为0:

```bash
awk 'BEGIN {count=0;print "[start]user count is ", count} {count=count+1;print $0;} END{print "[end]user count is ", count}' /etc/passwd
[start]user count is  0
root:x:0:0:root:/root:/bin/bash
...
nexus:x:1001:1001::/home/nexus:/bin/bash
[end]user count is  25
```

###  4.3 条件语句

　　awk中的条件语句是从C语言中借鉴来的，用法与C语言一致。

　　统计某个文件夹下的文件占用的字节数,过滤4096大小的文件(一般都是文件夹):

```bash
#ls -l |awk 'BEGIN {size=0;print "[start]size is ", size} {if($5!=4096){size=size+$5;}} END{print "[end]size is ", size/1024/1024,"M"}' 
[end]size is  8.22339 M
```

###  4.4 循环语句

　　awk中的循环语句同样借鉴于C语言，支持while、do/while、for、break、continue，这些关键字的语义和C语言中的语义完全相同。

###  4.5 数组

　　因为awk中数组的下标可以是数字和字母，数组的下标通常被称为关键字(key)。值和关键字都存储在内部的一张针对key/value应用hash的表格里。由于hash不是顺序存储，因此在显示数组内容时会发现，它们并不是按照你预料的顺序显示出来的。数组和变量一样，都是在使用时自动创建的，awk也同样会自动判断其存储的是数字还是字符串。一般而言，awk中的数组用来从记录中收集信息，可以用于计算总和、统计单词以及跟踪模板被匹配的次数等等。

　　显示/etc/passwd的账户：

```bash
#awk -F ':' 'BEGIN {count=0;} {name[count] = $1;count++;}; END{for (i = 0; i < NR; i++) print i, name[i]}' /etc/passwd
0 root
1 daemon
2 bin
3 sys
4 sync
5 games
......
```

　　这里使用for循环遍历数组。