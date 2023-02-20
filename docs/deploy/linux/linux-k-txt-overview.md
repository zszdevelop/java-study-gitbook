---
order: 310
category:
  - linux

---

# Linux文本操作命令汇总

## 1. 简介

Linux常用文本操作命令，包括wc(统计)、cut(切分)、sort(排序)、uniq(去重)、grep(查找)、sed(替换、插入、删除)、awk(文本分析)。

## 2. sed替换/查找/删除命令

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

####  3.4.4 循环语句

　　awk中的循环语句同样借鉴于C语言，支持while、do/while、for、break、continue，这些关键字的语义和C语言中的语义完全相同。

####  3.4.5 数组

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

## 4 wc统计命令

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

## 5. cut 切分命令

### 5.1 简介

cut 命令从文件的每一行剪切字节、字符和字段并将这些字节、字符和字段写至标准输出。

> 如果不指定 File 参数，cut 命令将读取标准输入。必须指定 -b、-c 或 -f 标志之一。

### 5.2 语法

```bash
cut  [-bn] [file] 或 cut [-c] [file]  或  cut [-df] [file]
```

### 5.3 参数

- **-b ：**以字节为单位进行分割。这些字节位置将忽略多字节字符边界，除非也指定了 -n 标志。
- **-c ：**以字符为单位进行分割。
- **-d ：**自定义分隔符，默认为制表符。
- **-f ：**与-d一起使用，指定显示哪个区域。
- **-n ：**取消分割多字节字符。仅和 -b 标志一起使用。如果字符的最后一个字节落在由 -b 标志的 List 参数指示的<br />范围之内，该字符将被写出；否则，该字符将被排除。

### 5.4 如何定位到剪切内容

cut命令主要是接受三个定位方法：

第一，字节（bytes），用选项-b

第二，字符（characters），用选项-c

第三，域（fields），用选项-f

#### 5.4.1 **以“字节”为单位切分**

举个例子吧，当你执行who命令时，会输出类似如下的内容：

```bash
who
root     pts/2        2022-04-24 16:17 (223.104.6.4)
root     pts/3        2022-04-24 16:17 (223.104.6.4)
```

如果我们想提取每一行的第4个字节，就这样：

```
who|cut -b 4
t
t
```

**如果“字节”定位中，我想提取第1，第2、第3和第10个字节，怎么办?**

　　-b支持形如3-5的写法，而且多个定位之间用逗号隔开就成了。看看例子吧：

```bash
who|cut -b 1-3,10
roop
roop
```

但有一点要注意，cut命令如果使用了-b选项，那么执行此命令时，cut会先把-b后面所有的定位进行从小到大排序，然后再提取。因此这跟我们书写的顺序没有关系。这个例子就可以说明这个问题：

```
who|cut -b 10,1-3
roop
roop
```

##### 5.4.1.1　**还有哪些类似“3-5”这样的小技巧，列举一下吧!**

```bash
[root@iZwz914d1peizv4h7laju4Z ~]# who|cut -b 3-
ot     pts/2        2022-04-24 16:17 (223.104.6.4)
ot     pts/3        2022-04-24 16:17 (223.104.6.4)
[root@iZwz914d1peizv4h7laju4Z ~]# who
root     pts/2        2022-04-24 16:17 (223.104.6.4)
root     pts/3        2022-04-24 16:17 (223.104.6.4)
[root@iZwz914d1peizv4h7laju4Z ~]# who|cut -b -3
roo
roo
[root@iZwz914d1peizv4h7laju4Z ~]# who|cut -b 3-
ot     pts/2        2022-04-24 16:17 (223.104.6.4)
ot     pts/3        2022-04-24 16:17 (223.104.6.4)

```

想必你也看到了，-3表示从第一个字节到第三个字节，而3-表示从第三个字节到行尾。如果你细心，你可以看到这两种情况下，都包括了第三个字节“c”。如果我执行who|cut -b -3,3-，你觉得会如何呢？答案是输出整行，不会出现连续两个重叠的c的。

```bash
 who|cut -b -3,3-
root     pts/2        2022-04-24 16:17 (223.104.6.4)
root     pts/3        2022-04-24 16:17 (223.104.6.4)

```



#### 5.4.2 以"字符"为单位切分

　下面例子你似曾相识，提取第1，第2，第3和第10个字符：

```bash
# who|cut -c 1-3,10
roop
roop
```

　不过，看着怎么和-b没有什么区别啊？莫非-b和-c作用一样? 其实不然，看似相同，只是因为这个例子举的不好，who输出的都是单字节字符，所以用-b和-c没有区别，如果你提取中文，区别就看出来了，来，看看中文提取的情况：

```
[root@iZwz914d1peizv4h7laju4Z ~]# cat cut_ch.txt
星期一
星期二
星期三
星期四
[root@iZwz914d1peizv4h7laju4Z ~]# cut -b 3 cut_ch.txt
�
�
�
�
[root@iZwz914d1peizv4h7laju4Z ~]# cut -c 3 cut_ch.txt
一
二
三
四

```

　　看到了吧，用-c则会以字符为单位，输出正常；而-b只会傻傻的以字节（8位二进制位）来计算，输出就是乱码。既然提到了这个知识点，就再补充一句，如果你学有余力，就提高一下。当遇到多字节字符时，可以使用-n选项，-n用于告诉cut不要将多字节字符拆开。

>跟文档不太一样

```bash
cat cut_ch.txt |cut -b 2
�
�
�
�
[root@iZwz914d1peizv4h7laju4Z ~]# cat cut_ch.txt |cut -nb 2
期
期
期
期
[root@iZwz914d1peizv4h7laju4Z ~]# cat cut_ch.txt |cut -nb 1,2,3
星期一
星期二
星期三
星期四

```

#### 5.4.3 以"域"为单位切分

为什么会有“域”的提取呢，因为刚才提到的-b和-c只能在固定格式的文档中提取信息，而对于非固定格式的信息则束手无策。这时候“域”就派上用场了。如果你观察过/etc/passwd文件，你会发现，它并不像who的输出信息那样具有固定格式，而是比较零散的排放。但是，冒号在这个文件的每一行中都起到了非常重要的作用，冒号用来隔开每一个项。

　　我们很幸运，cut命令提供了这样的提取方式，具体的说就是设置“间隔符”，再设置“提取第几个域”，就OK了！

　　以/etc/passwd的前五行内容为例：

```bash
[root@iZwz914d1peizv4h7laju4Z ~]#  cat /etc/passwd|head -n 5
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
[root@iZwz914d1peizv4h7laju4Z ~]# cat /etc/passwd|head -n 5|cut -d : -f 1
root
bin
daemon
adm
lp

```

　看到了吧，用-d来设置间隔符为冒号，然后用-f来设置我要取的是第一个域，再按回车，所有的用户名就都列出来了！呵呵 有成就感吧！

　　当然，在设定-f时，也可以使用例如3-5或者4-类似的格式：

```bash
[root@iZwz914d1peizv4h7laju4Z ~]# cat /etc/passwd|head -n 5|cut -d : -f 1,3-5
root:0:0:root
bin:1:1:bin
daemon:2:2:daemon
adm:3:4:adm
lp:4:7:lp
[root@iZwz914d1peizv4h7laju4Z ~]# cat /etc/passwd|head -n 5|cut -d : -f 1,3-5,7
root:0:0:root:/bin/bash
bin:1:1:bin:/sbin/nologin
daemon:2:2:daemon:/sbin/nologin
adm:3:4:adm:/sbin/nologin
lp:4:7:lp:/sbin/nologin
[root@iZwz914d1peizv4h7laju4Z ~]# cat /etc/passwd|head -n 5|cut -d : -f -2
root:x
bin:x
daemon:x
adm:x
lp:x

```

#### 5.4.4 cut的弊端

**如果遇到空格和制表符时，怎么分辨呢？我觉得有点乱，怎么办？**

　　有时候制表符确实很难辨认，有一个方法可以看出一段空格到底是由若干个空格组成的还是由一个制表符组成的。

```
cat tab_space.txt
this is tab finish.
this is several space      finish.
$ sed -n l tab_space.txt
this is tab\tfinish.$
this is several space      finish.$
```

看到了吧，如果是制表符（TAB），那么会显示为\t符号，如果是空格，就会原样显示。通过此方法即可以判断制表符和空格了。注意，上面sed -n后面的字符是L的小写字母哦，不要看错。

　　**我应该在cut -d中用什么符号来设定制表符或空格呢?**

　　其实cut的-d选项的默认间隔符就是制表符，所以当你就是要使用制表符的时候，完全就可以省略-d选项，而直接用－f来取域就可以了。如果你设定一个空格为间隔符，那么就这样：

```
$cat tab_space.txt |cut -d ' ' -f 1
this
this
```

　　注意，两个单引号之间可确实要有一个空格哦，不能偷懒。而且，你只能在-d后面设置一个空格，可不许设置多个空格，因为cut只允许间隔符是一个字符。

```
$ cat tab_space.txt |cut -d ' ' -f 1
cut: the delimiter must be a single character
Try `cut --help' for more information.
```

　　此外，cut在处理多空格的时候会更麻烦，因为**cut只擅长处理“以一个字符间隔”的文本内容。**

## 6. sort 排序命令

### 6.1 简介

sort命令是帮我们依据不同的数据类型进行排序

>sort可针对文本文件的内容，以行为单位来排序。

### 6.2 语法

```
sort [-bcfMnrtk][源文件][-o 输出文件] 
```

### 6.3 参数

- -b  忽略每行前面开始出的空格字符。
- -c  检查文件是否已经按照顺序排序。
- -f  排序时，忽略大小写字母。
- -M  将前面3个字母依照月份的缩写进行排序。
- -n  依照数值的大小排序。
- -o<输出文件>  将排序后的结果存入指定的文件。
- -r  以相反的顺序来排序。
- -t<分隔字符>  指定排序时所用的栏位分隔字符。
- -k 选择以哪个区间进行排序。

### 6.4 示例

#### 6.4.1 示例1

sort将文件的每一行作为一个单位，相互比较，比较原则是从首字符向后，依次按ASCII码值进行比较，最后将他们按升序输出。

```bash
cat seq.txt
banana
apple
pear
orange
$ sort seq.txt
apple
banana
orange
pear
```

用户可以保存排序后的文件内容，或把排序后的文件内容输出至打印机。下例中用户把排序后的文件内容保存到名为result的文件中。

```bash
sort seq.txt > result
```

#### 6.4.2 示例2:sort的-u选项

它的作用很简单，就是在输出行中去除重复行。

```bash
$ cat seq.txt
banana
apple
pear
orange
pear
$ sort seq.txt
apple
banana
orange
pear
pear
$ sort -u seq.txt
apple
banana
orange
pear
```

pear由于重复被-u选项无情的删除了。

#### 6.4.3 示例3：sort的-r选项

　　sort默认的排序方式是升序，如果想改成降序，就加个-r就搞定了。

```bash
$ cat number.txt
1
3
5
2
4
$ sort number.txt
1
2
3
4
5
$ sort -r number.txt
5
4
3
2
1
```

#### 6.4.4 示例4：sort的-o选项

　　由于sort默认是把结果输出到标准输出，所以需要用重定向才能将结果写入文件，形如sort filename > newfile。

　　但是，如果你想把排序结果输出到原文件中，用重定向可就不行了。

```bash
$ sort -r number.txt > number.txt
$ cat number.txt
$
```

　　看，竟然将number清空了。就在这个时候，-o选项出现了，它成功的解决了这个问题，让你放心的将结果写入原文件。这或许也是-o比重定向的唯一优势所在。

```bash
$ cat number.txt
1
3
5
2
4
$ sort -r number.txt -o number.txt
$ cat number.txt
5
4
3
2
1
```

#### 6.4.5 示例5：sort的-n选项

　　你有没有遇到过10比2小的情况。我反正遇到过。出现这种情况是由于排序程序将这些数字按字符来排序了，排序程序会先比较1和2，显然1小，所以就将10放在2前面喽。这也是sort的一贯作风。我们如果想改变这种现状，就要使用-n选项，来告诉sort，“要以数值来排序”！

```bash
cat number.txt
1
10
19
11
2
5
$ sort number.txt
1
10
11
19
2
5
$ sort -n number.txt
1
2
5
10
11
19
```

#### 6.4.6 示例6： sort的-t选项和-k选项

　　如果有一个文件的内容是这样：

```
$ cat facebook.txt
banana:30:5.5
apple:10:2.5
pear:90:2.3
orange:20:3.4
```

　　这个文件有三列，列与列之间用冒号隔开了，第一列表示水果类型，第二列表示水果数量，第三列表示水果价格。那么我想以水果数量来排序，也就是以第二列来排序，如何利用sort实现？幸好，sort提供了-t选项，后面可以设定间隔符。指定了间隔符之后，就可以用-k来指定列数了。

```
$ sort -n -k 2 -t ‘:’ facebook.txt
apple:10:2.5
orange:20:3.4
banana:30:5.5
pear:90:2.3
```

### 6.5 其他的sort常用选项

- -f 会将小写字母都转换为大写字母来进行比较，亦即忽略大小写
- -c 会检查文件是否已排好序，如果乱序，则输出第一个乱序的行的相关信息，最后返回1
- -C 会检查文件是否已排好序，如果乱序，不输出内容，仅返回1
- -M 会以月份来排序，比如JAN小于FEB等等
- -b 会忽略每一行前面的所有空白部分，从第一个可见字符开始比较。

## 7. uniq 去重命令

### 7.1 简介

uniq命令可以去除排序过的文件中的重复行

> 因此uniq经常和sort合用。也就是说，为了使uniq起作用，所有的重复行必须是相邻的。

### 7.2 简介

```bash
uniq [-icu]
选项与参数：
-i   ：忽略大小写字符的不同；
-c  ：进行计数
-u  ：只显示唯一的行
```

### 7.3 uniq 使用

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



## 参考文章

[Linux文本操作命令](https://www.cnblogs.com/maybe2030/p/5325530.html#_label5)