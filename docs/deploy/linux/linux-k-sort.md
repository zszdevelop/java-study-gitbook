---
order: 350
category:
  - linux

---

# sort排序命令

## 1 简介

sort命令是帮我们依据不同的数据类型进行排序

>sort可针对文本文件的内容，以行为单位来排序。

## 2 语法

```
sort [-bcfMnrtk][源文件][-o 输出文件] 
```

## 3 参数

- -b  忽略每行前面开始出的空格字符。
- -c  检查文件是否已经按照顺序排序。
- -f  排序时，忽略大小写字母。
- -M  将前面3个字母依照月份的缩写进行排序。
- -n  依照数值的大小排序。
- -o<输出文件>  将排序后的结果存入指定的文件。
- -r  以相反的顺序来排序。
- -t<分隔字符>  指定排序时所用的栏位分隔字符。
- -k 选择以哪个区间进行排序。

## 4 示例

### 4.1 示例1

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

### 4.2 示例2:sort的-u选项

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

### 4.3 示例3：sort的-r选项

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

### 4.4 示例4：sort的-o选项

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

### 4.5 示例5：sort的-n选项

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

### 4.6 示例6： sort的-t选项和-k选项

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

## 5 其他的sort常用选项

- -f 会将小写字母都转换为大写字母来进行比较，亦即忽略大小写
- -c 会检查文件是否已排好序，如果乱序，则输出第一个乱序的行的相关信息，最后返回1
- -C 会检查文件是否已排好序，如果乱序，不输出内容，仅返回1
- -M 会以月份来排序，比如JAN小于FEB等等
- -b 会忽略每一行前面的所有空白部分，从第一个可见字符开始比较。