# Linux文本操作命令汇总

>还是打开文本编辑器或者vim 吧，太难用了

## 1. 简介

Linux常用文本操作命令，包括wc(统计)、cut(切分)、sort(排序)、uniq(去重)、grep(查找)、sed(替换、插入、删除)、awk(文本分析)。

## 2. sed替换/查找/删除命令(也不好用)

### 2.1 简介

　sed是一个很好的文件处理工具，本身是一个管道命令，主要是以行为单位进行处理，可以将数据行进行替换、删除、新增、选取等特定工作

### 2.2 sed 语法

```
sed [-nefri] ‘command’ 输入文本 
```

### 2.3 常用选项

-  -n∶使用安静(silent)模式。在一般 sed 的用法中，所有来自 STDIN的资料一般都会被列出到萤幕上。但如果加上 -n 参数后，则只有经过sed 特殊处理的那一行(或者动作)才会被列出来。
-    -e∶直接在指令列模式上进行 sed 的动作编辑；
-    -f∶直接将 sed 的动作写在一个档案内， -f filename 则可以执行 filename 内的sed 动作；
-    -r∶sed 的动作支援的是延伸型正规表示法的语法。(预设是基础正规表示法语法)
-    -i∶直接修改读取的档案内容，而不是由萤幕输出。    

### 2.4 **常用命令**

- a  ∶新增， a 的后面可以接字串，而这些字串会在新的一行出现(目前的下一行)～
-  c  ∶取代， c 的后面可以接字串，这些字串可以取代 n1,n2 之间的行！
-  d  ∶删除，因为是删除啊，所以 d 后面通常不接任何咚咚；
-  i  ∶插入， i 的后面可以接字串，而这些字串会在新的一行出现(目前的上一行)；
-  p ∶列印，亦即将某个选择的资料印出。通常 p 会与参数 sed -n 一起运作～
-  s ∶取代，可以直接进行取代的工作哩！通常这个 s 的动作可以搭配正规表示法！例如 1,20s/old/new/g 就是啦！

### 2.5 示例

假设我们有一文件名为my.txt。内容如下

```
Hello!
welcome to my blog.
end
```



#### 2.5.1 删除某行

```bash
# sed '1d' my.txt              #删除第一行 
# sed '$d' my.txt              #删除最后一行
# sed '1,2d' my.txt           #删除第一行到第二行
# sed '2,$d' my.txt           #删除第二行到最后一行
```

#### 2.5.2 显示某行：

```bash
# sed -n '1p' my.txt           #显示第一行 
# sed -n '$p' my.txt           #显示最后一行
# sed -n '1,2p' my.txt        #显示第一行到第二行
# sed -n '2,$p' my.txt        #显示第二行到最后一行
```

#### 2.5.3 使用模式进行查询：

```bash
# sed -n '/blog/p' my.txt    #查询包括关键字blog所在所有行
# sed -n '/\$/p' my.txt        #查询包括关键字$所在所有行，使用反斜线\屏蔽特殊含义
```

#### 2.5.4 增加一行或多行字符串：

```bash
# cat my.txt
     Hello!
     ruby is me,welcome to my blog.
     end
# sed '1a drink tea' my.txt  #第一行后增加字符串"drink tea"
     Hello!
     drink tea
     ruby is me,welcome to my blog. 
     end
# sed '1,3a drink tea' my.txt #第一行到第三行后增加字符串"drink tea"
     Hello!
     drink tea
     ruby is me,welcome to my blog.
     drink tea
     end
     drink tea
# sed '1a drink tea\nor coffee' my.txt   #第一行后增加多行，使用换行符\n
     Hello!
     drink tea
     or coffee
     ruby is me,welcome to my blog.
     end
```

#### 2.5.5 删除匹配行：

```bash
sed -i '/匹配字符串/d'  filename  （注：若匹配字符串是变量，则需要“”，而不是‘’。记得好像是）
```

#### 2.5.6 替换匹配行中的某个字符串：

```bash
sed -i '/匹配字符串/s/替换源字符串/替换目标字符串/g' filename
```

## 3 awk强大的文本分析命令

### 3.1 简介

awk是一个强大的文本分析工具，相对于grep的查找，sed的编辑，awk在其对数据分析并生成报告时，显得尤为强大。简单来说awk就是把文件逐行的读入，以空格为默认分隔符将每行切片，切开的部分再进行各种分析处理。

### 3.2 语法

```bash
awk '{pattern + action}' {filenames}
```

尽管操作可能会很复杂，但语法总是这样，其中 pattern 表示 AWK 在数据中查找的内容，而 action 是在找到匹配内容时所执行的一系列命令。花括号（{}）不需要在程序中始终出现，但它们用于根据特定的模式对一系列指令进行分组。 pattern就是要表示的正则表达式，用斜杠括起来。

　　awk语言的最基本功能是在文件或者字符串中基于指定规则浏览和抽取信息，awk抽取信息后，才能进行其他文本操作。完整的awk脚本通常用来格式化文本文件中的信息。

　　通常，awk是以文件的一行为处理单位的。awk每接收文件的一行，然后执行相应的命令，来处理文本。

### 3.3 awk入门

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

### 3.4 awk 进阶

#### 3.4.1 内置变量

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

#### 3.4.2 变量和赋值

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

####  3.4.3 条件语句

　　awk中的条件语句是从C语言中借鉴来的，用法与C语言一致。

　　统计某个文件夹下的文件占用的字节数,过滤4096大小的文件(一般都是文件夹):

```bash
#ls -l |awk 'BEGIN {size=0;print "[start]size is ", size} {if($5!=4096){size=size+$5;}} END{print "[end]size is ", size/1024/1024,"M"}' 
[end]size is  8.22339 M
```

#####  3.4.4 循环语句

　　awk中的循环语句同样借鉴于C语言，支持while、do/while、for、break、continue，这些关键字的语义和C语言中的语义完全相同。

#####  3.4.5 数组

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

## 4wc统计命令

### 4.1 简介

统计文件里面有多少单词，多少行，多少字符。

### 4.2 wc语法

```
 wc [-lwm]
```

选项与参数：
-l  ：仅列出行；
-w  ：仅列出多少字(英文单字)；
-m  ：多少字符；

### 4.3 wc使用

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

## 参考文章

[Linux文本操作命令](https://www.cnblogs.com/maybe2030/p/5325530.html#_label5)