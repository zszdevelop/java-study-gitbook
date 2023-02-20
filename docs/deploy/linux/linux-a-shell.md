---
order: 510
category:
  - linux
---

# shell入门

## 1. 简介

Shell 是一个命令解释器，它为用户提供了一个向 Linux 内核发送请求以便运行程序界面系统级程序，用户可以用 Shell 来启动、挂起、停止甚至是编写一些程序。

![image-20220330153029197](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220330153029197.png)

## 2. **Shell 编程快速入门**

进入 Linux 终端，编写一个 Shell 脚本 hello.sh ：

```bash
#!/bin/bash 
echo 'hello world!'
```

运行：

```bash
# 方法1 
sh hello.sh  

# 方法2 
chmod +x hello.sh 
./hello.sh
```


终端打印出 `hello world!` 。

**说明：**

- `#!` 告诉系统这个脚本需要什么解释器来执行。
- 文件扩展名 `.sh` 不是强制要求的。
- 方法1 直接运行解释器，`hello.sh` 作为 Shell 解释器的参数。此时 Shell 脚本就不需要指定解释器信息，第一行可以去掉。
- 方法2 hello.sh 作为可执行程序运行，Shell 脚本第一行一定要指定解释器。

## 3. **Shell 变量**

### 3.1 **定义**

Shell 变量分为**系统变量**和**自定义变量**。系统变量有$HOME、$PWD、$USER等，显示当前 Shell 中所有变量：`set` 。
变量名可以由字母、数字、下划线组成，不能以数字开头。

### 3.2 **基本语法**

- **定义变量：** 变量名=变量值，等号两侧不能有空格，变量名一般习惯用大写。
- **删除变量：** unset 变量名 。
- **声明静态变量：** readonly 变量名，静态变量不能unset。
- **使用变量：** $变量名

### 3.3 **将命令返回值赋给变量（重点）**

- A=\` ls\` 反引号,执行里面的命令
- A=$(ls) 等价于反引号

## 4. **Shell 环境变量**

### 4.1 **定义**

![image-20220330153653301](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220330153653301.png)

### 4.2 **基本语法**

1. export 变量名=变量值，将 Shell 变量输出为环境变量。
2. source 配置文件路径，让修改后的配置信息立即生效。
3. echo $变量名，检查环境变量是否生效

### 4.3 **位置参数变量**

**基本语法**

- $n ：$0 代表命令本身、$1-$9 代表第1到9个参数，10以上参数用花括号，如 ${10}。
- $* ：命令行中所有参数，且把所有参数看成一个整体。
- $@ ：命令行中所有参数，且把每个参数区分对待。
- $# ：所有参数个数。

### 4.4 **实例：**

编写 Shell 脚本 positionPara.sh ，输出命令行输入的各个参数信息。

```bash
#!/bin/bash     
# 输出各个参数 
echo $0 $1 $2 
echo $* 
echo $@ 
echo 参数个数=$#
```

运行：

```bash
chmod +x positionPara.sh 
./positionPara.sh 10 20
```

运行结果：

```bash
./positionPara.sh 10 20 
10 20 
10 20 
参数个数=2
```

## 5. **预定义变量**

### 5.1 **定义**

在赋值定义之前，事先在 Shell 脚本中直接引用的变量。

### 5.2 **基本语法**

- $$ ：当前进程的 PID 进程号。
- $! ：后台运行的最后一个进程的 PID 进程号。
- $? ：最后一次执行的命令的返回状态，0为执行正确，非0执行失败。

### 5.3 **实例：**

编写 Shell 脚本 prePara.sh ，输出命令行输入的各个参数信息。

```powershell
#!/bin/bash     
echo 当前的进程号=$$ 
# &：以后台的方式运行程序 
./hello.sh & 
echo 最后一个进程的进程号=$! 
echo 最后执行的命令结果=$?
```

运行结果：

```bash
当前的进程号=41752 
最后一个进程的进程号=41753 
最后执行的命令结果=0 # hello world!
```

## 6.**运算符**

### 6.1 **基本语法**

- $((运算式)) 或 $[运算式]
- expr m + n 注意 expr 运算符间要有空格
- expr m - n
- expr \*，/，% 分别代表乘，除，取余

### 6.2 **实例**

```bash
# 第1种方式 $(()) 
echo $(((2+3)*4))   

# 第2种方式 $[]，推荐 
echo $[(2+3)*4]  

# 使用 expr 
TEMP=`expr 2 + 3` 
echo `expr $TEMP \* 4`
```

## 7. **条件判断**

### 7.1 **基本语法**

[ condition ] 注意condition前后要有空格。非空返回0，0为 true，否则为 false 。

### 7.2 **实例**

```bash
#!/bin/bash 
if [ 'test01' = 'test' ] 
then
     echo '等于' 
fi  

# 20是否大于10 
if [ 20 -gt 10] 
then
     echo '大于' 
fi  

# 是否存在文件/root/shell/a.txt 
if [ -e /root/shell/a.txt ] 
then
     echo '存在' 
fi  

if [ 'test02' = 'test02' ] && echo 'hello' || echo 'world' 
then
     echo '条件满足，执行后面的语句' 
fi
运行结果：
```

```bash
大于 
hello 
条件满足，执行后面的语句
```

## 9. **流程控制**

### 9.1 **if 判断**

#### 9.1.1 **基本语法**

```bash
if [ 条件判断式 ];then   
    程序   
fi

# 或者（推荐）
if [ 条件判断式 ]
then
    程序
elif [ 条件判断式 ]
then
    程序
fi
```

#### 9.1.2 **实例**

编写 Shell 程序：如果输入的参数大于60，输出“及格”，否则输出“不及格”。

```bash
#!/bin/bash
if [ $1 -ge 60 ]
then
    echo 及格
elif [ $1 -lt 60 ]
then
    echo "不及格" 
fi
```

### 9.2 **case 分支**

#### 9.2.1 **基本语法**

```bash
case $变量名 in
"值1")
如果变量值等于值1，则执行此处程序1
;;
"值2")
如果变量值等于值2，则执行此处程序2
;;
...省略其它分支...
*)
如果变量值不等于以上列出的值，则执行此处程序
;;
esac
```

#### 9.2.2 **实例**

当命令行参数为1时输出“周一”，2时输出“周二”，其他情况输出“其它”。

```bash
case $1 in
"1")
echo 周一
;;
"2")
echo 周二
;;
*)
echo 其它
;;
esac
```

### 9.3 **for 循环**

#### 9..3.1 **基本语法**

```bash
# 语法1
for 变量名 in 值1 值2 值3...
do
    程序
done

# 语法2
for ((初始值;循环控制条件;变量变化))
do
    程序
done
```

#### 9.3.2 **实例**

1. 打印命令行输入的参数。

```bash
#!/bin/bash  

# 使用$* 
for i in "$*" 
do     
    echo "the arg is $i" 
done 
echo "=================="  

# 使用$@ 
for j in "$@" 
do     
    echo "the arg is $j" 
done
```

运行结果（回顾一下 $* 和 $@ 的区别）：

```bash
the arg is 1 2 3 
================== 
the arg is 1 
the arg is 2 
the arg is 3
```

2. 输出从1加到100的值。

```bash
#!/bin/bash 
SUM=0  
for ((i=1;i<=100;i++)) 
do     
    SUM=$[$SUM+$i] 
done 

echo $SUM
```

### 9.4 **while 循环**

#### 9.4.1**基本语法**

```bash
while [ 条件判断式 ]
do
    程序
done 
```

#### 9.4.2**实例**

输出从1加到100的值。

```bash
#!/bin/bash
SUM=0
i=0

while [ $i -le $1 ]
do
    SUM=$[$SUM+$i]
    i=$[$i+1]
done       
echo $SUM
```

## 10. **读取控制台输入**

### 10.1 **基本语法**

read(选项)(参数)
**选项**

- -p：指定读取值时的提示符
- -t：指定读取值时等待的时间（秒），如果没有在指定时间内输入，就不再等待了。

**参数**

- 变量名：读取值的变量名

### 10.2 **实例**

读取控制台输入一个num值。

```bash
#!/bin/bash

read -p "请输入一个数num1=" NUM1
echo "你输入num1的值是：$NUM1"

read -t 10 -p "请在10秒内输入一个数num2=" NUM2
echo "你输入num2的值是：$NUM2"
```

运行结果：

```bash
请输入一个数num1=10
你输入num1的值是：10
请在10秒内输入一个数num2=20
你输入num2的值是：20
```

## 11. **函数**

和其它编程语言一样，Shell 编程有系统函数和自定义函数，本文只举两个常用系统函数。

### 11.1**系统函数**

#### 11.1.1 basename

- basename，删掉路径最后一个 / 前的所有部分（包括/），常用于获取文件名。
  **基本语法**

- - basename [pathname] [suffix]
  - basename [string] [suffix]
  - 如果指定 suffix，也会删掉pathname或string的后缀部分。

**实例**

```bash
# basename /usr/bin/sort  
sort  

# basename include/stdio.h  
stdio.h  

# basename include/stdio.h .h 
stdio
```

#### 11.1.2 dirname

- dirname，删掉路径最后一个 / 后的所有部分（包括/），常用于获取文件路径。
  **基本语法**

- - dirname pathname
  - 如果路径中不含 / ，则返回 '.' （当前路径）。

**实例**

```bash
# dirname /usr/bin/  
/usr  

# dirname dir1/str dir2/str 
dir1 
dir2  

# dirname stdio.h 
.
```

### 11.2 **自定义函数**

#### 11.2.1 **基本语法**

```bash
[ function ] funname[()]
{
    Action;
    [return int;]
}

# 调用
funname 参数1 参数2...
```

#### 11.2.2 **实例**

计算输入两个参数的和。

```bash
#!/bin/bash

function getSum(){
    SUM=$[$n1+$n2]
    echo "sum=$SUM"
}   

read -p "请输入第一个参数n1：" n1
read -p "请输入第二个参数n2：" n2

# 调用 getSum 函数
getSum $n1 $n2
```

## 参考文章

[掌握Shell编程，一篇就够了](https://zhuanlan.zhihu.com/p/102176365)

