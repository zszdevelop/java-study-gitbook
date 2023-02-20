---
order: 320
category:
  - linux
---

# sed替换/查找/删除命令

## 1 简介

　sed是一个很好的文件处理工具，本身是一个管道命令，主要是以行为单位进行处理，可以将数据行进行替换、删除、新增、选取等特定工作

## 2 sed 语法

```
sed [-nefri] ‘command’ 输入文本 
```

## 3 常用选项

-  -n∶使用安静(silent)模式。在一般 sed 的用法中，所有来自 STDIN的资料一般都会被列出到萤幕上。但如果加上 -n 参数后，则只有经过sed 特殊处理的那一行(或者动作)才会被列出来。
-  -e∶直接在指令列模式上进行 sed 的动作编辑；
-  -f∶直接将 sed 的动作写在一个档案内， -f filename 则可以执行 filename 内的sed 动作；
-  -r∶sed 的动作支援的是延伸型正规表示法的语法。(预设是基础正规表示法语法)
-  -i∶直接修改读取的档案内容，而不是由萤幕输出。    

## 4 **常用命令**

- a  ∶新增， a 的后面可以接字串，而这些字串会在新的一行出现(目前的下一行)～
- c  ∶取代， c 的后面可以接字串，这些字串可以取代 n1,n2 之间的行！
- d  ∶删除，因为是删除啊，所以 d 后面通常不接任何咚咚；
- i  ∶插入， i 的后面可以接字串，而这些字串会在新的一行出现(目前的上一行)；
- p ∶列印，亦即将某个选择的资料印出。通常 p 会与参数 sed -n 一起运作～
- s ∶取代，可以直接进行取代的工作哩！通常这个 s 的动作可以搭配正规表示法！例如 1,20s/old/new/g 就是啦！

## 5 示例

假设我们有一文件名为my.txt。内容如下

```
Hello!
welcome to my blog.
end
```

### 5.1 删除某行

```bash
# sed '1d' my.txt              #删除第一行 
# sed '$d' my.txt              #删除最后一行
# sed '1,2d' my.txt           #删除第一行到第二行
# sed '2,$d' my.txt           #删除第二行到最后一行
```

### 5.2 显示某行：

```bash
# sed -n '1p' my.txt           #显示第一行 
# sed -n '$p' my.txt           #显示最后一行
# sed -n '1,2p' my.txt        #显示第一行到第二行
# sed -n '2,$p' my.txt        #显示第二行到最后一行
```

### 5.3 使用模式进行查询：

```bash
# sed -n '/blog/p' my.txt    #查询包括关键字blog所在所有行
# sed -n '/\$/p' my.txt        #查询包括关键字$所在所有行，使用反斜线\屏蔽特殊含义
```

### 5.4 增加一行或多行字符串：

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

### 5.5 删除匹配行：

```bash
sed -i '/匹配字符串/d'  filename  （注：若匹配字符串是变量，则需要“”，而不是‘’。记得好像是）
```

### 5.6 替换匹配行中的某个字符串：

```bash
sed -i '/匹配字符串/s/替换源字符串/替换目标字符串/g' filename
```

## 