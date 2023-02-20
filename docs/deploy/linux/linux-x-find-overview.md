---
order: 210
category:
  - linux
---

# Linux下各种查找命令汇总

## 1. 简介

linux 常用的文件查找命令有（find, grep, which, whereis, locate）

|               | find                                           | which                                                  | whereis                                                   | locate                                             |
| ------------- | ---------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------- | -------------------------------------------------- |
| 文件支持      | 所有文件类型                                   | 可执行文件                                             | 二进制文件、源文件、帮助文档                              | 所有文件类型                                       |
| 查找路径      | 可指定，默认遍历当前路径及其子路径             | 环境变量PATH                                           | 数据库索引                                                | 数据库索引                                         |
| 查找原理      | 遍历磁盘                                       | 遍历PATH所指定的目录，寻找完全匹配filename的可执行文件 | 数据库索引，对去除.之后的所有字符后的filename进行完全匹配 | 数据库索引，绝对路径，部分匹配                     |
| 查找效率/速度 | 低                                             | 高                                                     | 高                                                        | 高                                                 |
| 适合场景      | 能使用which，whereis，locate时，尽量不使用find | 可执行文件的查询                                       | 二进制文件，源文件、帮助文档的查找                        | 模糊查找（由于默认是部分匹配，会列出很多无关文件） |



## 2. 命令

### 2.1 find

#### 2.1.1 简介

find是最常见和最强大的查找命令，你可以用它找到任何你想找的文件。 

#### 2.1.2 命令语法

```bash
find < path > < expression > < cmd >
find <指定目录> <指定条件> <指定动作>
```

- path： 所要搜索的目录及其所有子目录。默认为当前目录。
- expression： 所要搜索的文件的特征。
- cmd： 对搜索结果进行特定的处理。

如果什么参数也不加，find默认搜索当前目录及其子目录，并且不过滤任何结果（也就是返回所有文件），将它们全都显示在屏幕上。

#### 2.1.3 实例

##### 2.1.3.1 按扩展名查找文件

```bash
 # 语法
 find root_path -name '*.ext'
 # 示例
 find /home -name "*.txt"
```

##### 2.1.3.2 在不区分大小写的模式下，查找与给定名称匹配的目录

```bash
 # 语法
find root_path -type d -iname '*lib*'
 # 示例
 find /home -type d -name "*service*"
```

##### 2.1.3.3 通过匹配多个模式查找文件

```bash
 # 语法
find root_path -name '*pattern_1*' -or -name '*pattern_2*'
 # 示例
find . -name "*.txt" -o -name "*.pdf" 
```

##### 2.1.3.4 查找与路径模式匹配的文件:

```bash
  # 语法
 find root_path -path '**/lib/**/*.ext'
  # 示例
 find /usr/ -path "*local*"
```

##### 2.1.3.5查找与给定大小范围匹配的文件:

```bash
find root_path -size +500k -size -10M
```

##### 2.1.3.6 找到最近7天修改过的文件，并删除它们:

```bash
find root_path -mtime -7 -delete
```

##### 2.1.3.7 根据文件类型进行搜索

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

##### 2.1.3.8 根据文件时间戳进行搜索

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

### 2.2 grep

#### 2.2.1 简介

Linux系统中grep命令是一种强大的**文本搜索工具**，它能使用**正则表达式搜索文本**，并把匹 **配的行**打印出来。grep全称是Global Regular Expression Print，表示全局正则表达式版本，它的使用权限是所有用户。

grep的工作方式是这样的，它在一个或多个文件中搜索字符串模板。如果模板包括空格，则必须被引用，模板后的所有字符串被看作文件名。搜索的结果被送到标准输出，不影响原文件内容。

grep可用于shell脚本，因为grep通过返回一个状态值来说明搜索的状态，如果**模板搜索成功，则返回0，如果搜索不成功，则返回1**，如果搜索的文件不存在，则返回2。我们利用这些返回值就可进行一些自动化的文本处理工作。

#### 2.2.2 命令语法

用于过滤/搜索的特定字符。可使用正则表达式能多种命令配合使用，使用上十分灵活。

```bash
grep [选项] pattern [文件名]
```

#### 2.2.3 命令参数

-? 同时显示匹配行上下的？行，如：grep -2 pattern filename 同时显示匹配行的上下2行。
-b，—byte-offset 打印匹配行前面打印该行所在的块号码。
-c,—count 只打印匹配的行数，不显示匹配的内容。
-f File，—file=File 从文件中提取模板。空文件中包含0个模板，所以什么都不匹配。
-h，—no-filename 当搜索多个文件时，不显示匹配文件名前缀。
-i，—ignore-case 忽略大小写差别。
-q，—quiet 取消显示，只返回退出状态。0则表示找到了匹配的行。
-l，—files-with-matches 打印匹配模板的文件清单。
-L，—files-without-match 打印不匹配模板的文件清单。
-n，—line-number 在匹配的行前面打印行号。
-s，—silent 不显示关于不存在或者无法读取文件的错误信息。
-v，—revert-match 反检索，只显示不匹配的行。
-w，—word-regexp 如果被\<和>引用，就把表达式做为一个单词搜索。
-V，—version 显示软件版本信息。

#### 2.2.4 pattern 规则表达式

```
. 匹配任意一个字符
* 匹配0 个或多个*前的字符
^ 匹配行开头
$ 匹配行结尾
[] 匹配[ ]中的任意一个字符，[]中可用 - 表示范围，
例如[a-z]表示字母a 至z 中的任意一个
\ 转意字符
```

#### 2.2.5 实例

文件fruits.txt

```
i like apple
i like pineapple
i like Apple
i like banana
i like watermelon
```

##### 2.2.5.1 在文件中搜索模式

```bash
# 语法
grep "search_pattern" path/to/file
# 示例(查看文件中带有apple的行)
grep apple fruits.txt
```

![image-20220412135702730](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412135702730.png)

##### 2.2.5.2  or 条件

```bash
# 语法
# 方式一： -E (E需要大写)
grep -E 'string1|string2' filename
# 方式二： egrep
egrep 'string1|string2' filename

# 示例
grep -E 'apple|banana'  fruits.txt
egrep apple|banana'  fruits.txt
```

![image-20220412135839507](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412135839507.png)

##### 2.2.5.3 忽略大小写

默认情况下，grep区分大小写，这意味着您必须精确搜索大写的字符串。通过使用-i开关告诉grep忽略大小写，可以避免这种情况。

```bash
# 语法
grep -i string filename
# 示例
grep -i apple fruits.txt
```

![image-20220412140005854](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412140005854.png)



##### 2.2.5.4 搜索精确的字符串 (禁用正则表达式):

在上面的示例中，每当我们在文档中搜索字符串“ apple”时，grep也会在输出中返回“ pineapple”。为了避免这种情况，并严格搜索“ apple”，可以使用以下命令：

```bash
# 示例
grep "\<apple\>" fruits.txt
```

![image-20220412140216431](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412140216431.png)

##### 2.2.5.5 ***带行号的Grep***

要显示搜索字符串所在的行数，请使用-n开关。

```bash
# 语法
grep -n string filename
# 示例
grep -n  apple  fruits.txt
```

![image-20220412140342553](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412140342553.png)



##### 2.2.5.6 ***显示之前和之后的行***

如果需要更多grep输出上下文，可以使用-c开关在指定的搜索字符串前后显示一行：

```bash
# 语法 大写的C
grep -C 1 string filename
# 示例
grep -C 1 banana fruits.txt
```

![image-20220412140621158](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412140621158.png)



#### 2.2.6 与其他命令配合使用

Linux命令的输出通过管道传输到grep，grep就可以仅显示您需要查看的输出。

##### 2.2.6.1 查找文件是否存在

```bash
#查找当前目录 .sh结尾的文件
ls |grep .sh
#查找当前目录 xx.sh结尾的文件，返回空则证明文件不存在
bin ls |grep xx.sh
```

![image-20220412151129285](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412151129285.png)



### 2.3 which命令

#### 2.3.1 简介

**查看可执行文件的位置**

which命令的作用是，**在PATH变量指定的路径中**，搜索某个系统命令的位置，并且返回第一个搜索结果。

> 也就是说，使用which命令，就可以看到某个系统命令是否存在，以及执行的到底是哪一个位置的命令。 

#### 2.3.2 命令语法

which 可执行文件名称 

#### 2.3.3 命令参数

- -a 如果有多个匹配结果则打印所有结果:
- -n 指定文件名长度，指定的长度必须大于或等于所有文件中最长的文件名。

- -p 与-n参数相同，但此处的包括了文件的路径。

- -w 指定输出时栏位的宽度。

- -V 显示版本信息

#### 2.3.4 实例

##### 2.3.4.1 java 命令所在的位置

```bash
which -a java
```

![image-20220418174207332](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220418174207332.png)

##### **2.3.4.2 找出 cd 这个命令**

```bash
which cd
```

![image-20220418174012154](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220418174012154.png)

##### 2.3.4.3 找出 xx这个命令

```bash
which xxx
```

![image-20220418174248167](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220418174248167.png)

##### 2.3.4.4 找出 redis 这个命令

redis 只是软件，并不是命令

```
 which redis
```

![image-20220419105639815](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419105639815.png)

### 2.4 whereis命令

#### 2.4.1 简介

**whereis命令只能用于程序名的搜索**，而且只搜索二进制文件（参数-b）、man说明文件（参数-m）和源代码文件（参数-s）。如果省略参数，则返回所有信息。

搜索来源是数据库索引

> 在搜索一些进程位置时，
>
> - 如果是可执行文件，which的准确性会好一点
>
> - 但如果只是普通程序，可能并不会加入PATH，可以使用whereis 搜索

#### 2.4.2 文件支持

- 二进制文件
- 源文件
- 帮助文档

#### 2.4.3 实例

##### 2.4.3.1  java的二进制文件

```bash
 whereis  java
```

![image-20220419105359735](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419105359735.png)

返回的结果就比which 多了很多

##### 2.4.3.2 查找redis的二进制文件

```
whereis redis
```

![image-20220419105732272](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419105732272.png)

### 2.5 **locate命令**

#### 2.5.1 简介

locate命令其实是“find -name”的另一种写法，但是要比后者快得多，原因在于它不搜索具体目录，**而是搜索一个数据库（/var/lib/locatedb），这个数据库中含有本地所有文件信息**。Linux系统自动创建这个数据库，并且**每天自动更新一次**，所以使用locate命令查不到最新变动过的文件。为了避免这种情况，可以在使用locate之前，先使用updatedb命令，手动更新数据库。

#### 2.5.2 命令语法

```bash
locate [OPTION]… [PATTERN]…
```

#### 2.5.3 命令参数（用得不多）

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

#### 2.5.4 实例

##### 2.5.2.1 查找包含某个字符串的相关文件

```bash
locate redis
```

![image-20220419113313972](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419113313972.png)

##### 2.5.2.2 按文件名查找文件（不包含填充字符的模式被解释为 *关键字*）:

```bash
# 语法
locate */文件名
# 示例
 locate */redis
```

这样过滤出的结果更加符合我们想要的

![image-20220419134741153](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419134741153.png)

##### 2.5.2.3 重新建立文件数据索引数据库。

如果要查找最近添加的文件，则需要执行此操作:

```bash
sudo updatedb
```

##### 2.5.2.4 搜索目录下所有以 sh开头的文件

```bash
locate /bin/sh
```



![image-20220419113440829](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419113440829.png)

##### 2.4.2.5 指定显示数量

如果显示的内容过多，可以使用 -n 选项来限定显示数量。

```bash
locate -n 3 redis
```

![image-20220419113647925](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419113647925.png)

#### 2.5.5 locate 命令安装

如果locate 搜索时提示命令不存在

![image-20220419112033248](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419112033248.png)

则需要先安装一下

```bash
yum install mlocate
sudo updatedb
locate  *.doc
```



## 参考文章

[Linux下各种查找命令（find, grep, which, whereis, locate）](https://blog.csdn.net/wzzfeitian/article/details/40985549)

[是真的很详细了！Linux中的Grep命令使用实例](https://cloud.tencent.com/developer/article/1554542)

[linux查找的四个命令which，whereis，locate，find](https://www.jianshu.com/p/151a960b8de0)

[Linux locate命令的使用方法](https://cloud.tencent.com/developer/article/1725970)