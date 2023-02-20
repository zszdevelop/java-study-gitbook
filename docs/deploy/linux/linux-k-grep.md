---
order: 330
category:
  - linux

---

# Linux-grep文本搜索

## 1 简介

Linux系统中grep命令是一种强大的**文本搜索工具**，它能使用**正则表达式搜索文本**，并把匹 **配的行**打印出来。grep全称是Global Regular Expression Print，表示全局正则表达式版本，它的使用权限是所有用户。

grep的工作方式是这样的，它在一个或多个文件中搜索字符串模板。如果模板包括空格，则必须被引用，模板后的所有字符串被看作文件名。搜索的结果被送到标准输出，不影响原文件内容。

grep可用于shell脚本，因为grep通过返回一个状态值来说明搜索的状态，如果**模板搜索成功，则返回0，如果搜索不成功，则返回1**，如果搜索的文件不存在，则返回2。我们利用这些返回值就可进行一些自动化的文本处理工作。

## 2 命令语法

用于过滤/搜索的特定字符。可使用正则表达式能多种命令配合使用，使用上十分灵活。

```bash
grep [选项] pattern [文件名]
```

## 3 命令参数

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

## 4 pattern 规则表达式

```
. 匹配任意一个字符
* 匹配0 个或多个*前的字符
^ 匹配行开头
$ 匹配行结尾
[] 匹配[ ]中的任意一个字符，[]中可用 - 表示范围，
例如[a-z]表示字母a 至z 中的任意一个
\ 转意字符
```

## 5 实例

文件fruits.txt

```
i like apple
i like pineapple
i like Apple
i like banana
i like watermelon
```

### 5.1 在文件中搜索模式

```bash
# 语法
grep "search_pattern" path/to/file
# 示例(查看文件中带有apple的行)
grep apple fruits.txt
```

![image-20220412135702730](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412135702730.png)

### 5.2  or 条件

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

### 5.3 忽略大小写

默认情况下，grep区分大小写，这意味着您必须精确搜索大写的字符串。通过使用-i开关告诉grep忽略大小写，可以避免这种情况。

```bash
# 语法
grep -i string filename
# 示例
grep -i apple fruits.txt
```

![image-20220412140005854](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412140005854.png)



### 5.4 搜索精确的字符串 (禁用正则表达式):

在上面的示例中，每当我们在文档中搜索字符串“ apple”时，grep也会在输出中返回“ pineapple”。为了避免这种情况，并严格搜索“ apple”，可以使用以下命令：

```bash
# 示例
grep "\<apple\>" fruits.txt
```

![image-20220412140216431](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412140216431.png)

### 5.5 ***带行号的Grep***

要显示搜索字符串所在的行数，请使用-n开关。

```bash
# 语法
grep -n string filename
# 示例
grep -n  apple  fruits.txt
```

![image-20220412140342553](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412140342553.png)



### 5.6 ***显示之前和之后的行***

如果需要更多grep输出上下文，可以使用-c开关在指定的搜索字符串前后显示一行：

```bash
# 语法 大写的C
grep -C 1 string filename
# 示例
grep -C 1 banana fruits.txt
```

![image-20220412140621158](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412140621158.png)



## 6 与其他命令配合使用

Linux命令的输出通过管道传输到grep，grep就可以仅显示您需要查看的输出。

### 6.1 查找文件是否存在

```bash
#查找当前目录 .sh结尾的文件
ls |grep .sh
#查找当前目录 xx.sh结尾的文件，返回空则证明文件不存在
bin ls |grep xx.sh
```

![image-20220412151129285](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220412151129285.png)

