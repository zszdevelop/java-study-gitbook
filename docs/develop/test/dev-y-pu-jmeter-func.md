# JMeter函数

## 1. 简介

在性能测试中为了真实模拟用户请求，往往我们需要让提交的表单内容每次都发生变化，这个过程叫做参数化。JMeter配置元件与前置处理器都能帮助我们进行参数化，但是都有局限性，为了帮助我们能够更好地进行参数化，JMeter提供了一组函数来帮助我们参数化生成需要的数据，这些函数可以函数助手面板来进行编辑。当然函数助手的功能不仅仅是做参数化，还能帮助我们运算、字符编码格式转换、获取运行时参数等功能。

JMeter提供了很多函数，如果能够熟练使用，可以为脚本带来很多方便。可以很方便的实现一些小功能，几乎可以用于测试计划中的任何元件。

JMeter函数是一种特殊值，可用于除测试计划外的任何组件。

### 1.1 函数调用的格式

函数调用的格式如下所示：

```
${__functionName(var1,var2,var3)}
```

其中，“__”是两个英文半角的下划线，functionName为函数名，括号内是函数的参数，无参数时可以不用括号，如${__UUID}，其中参数视不同函数而定。

> Tips:
>
> 如果参数包含逗号，那么一定要使用“\”来转义，否则JMeter会把它当作一个参数分隔符
>
> 实际使用时，可通过函数助手对话框选择函数，设置参数后，点击生成按钮生成函数字符串。 

## 2. JMeter 中的常用函数主要分为如下几类

| 函数类型          | 函数名称                                         | 函数作用                                 | 启用版本 |
| :---------------- | :----------------------------------------------- | :--------------------------------------- | :------- |
| 脚本函数          | __BeanShell                                      | 执行 beanshell 脚本                      | 1.X      |
| __javaScript      | 执行 js 脚本                                     | 1.9                                      |          |
| 字符串操作函数    | __split                                          | 根据分隔符拆分字符串为多个变量           | 2.0.2    |
| __changeCase      | 转换大小写                                       | 4.0                                      |          |
| __regexFunction   | 使用正则表达式解析之前的响应结果                 | 1.X                                      |          |
| 属性信息函数      | __isPropDefined                                  | 判断属性是否存在                         | 4.0      |
| __property        | 对多个整数求和                                   | 1.8.1                                    |          |
| __P               | 简化的属性函数，用于与命令行上定义的属性一起使用 | 2.0                                      |          |
| __setProperty     | 简化的属性函数，用于与命令行上定义的属性一起使用 | 2.0                                      |          |
| 数据输入函数      | __StringFromFile                                 | 从文本文件中读取字符串，每次调用读取一行 | 1.9      |
| __FileToString    | 把文件读取成一个字符串，每次调用都是读取整个文件 | 2.4                                      |          |
| __CSVRead         | 返回当前正在执行的线程的编号                     | 1.9                                      |          |
| __XPath           | 使用 XPath 语法匹配 XML文件                      | 2.0                                      |          |
| 数据计算函数      | __counter                                        | 计数器函数                               | 1.9      |
| __intSum          | 对多个整数求和                                   | 1.8.1                                    |          |
| __longSum         | 长整型求和                                       | 2.3.2                                    |          |
| __Random          | 返回指定最大值和最小值之间的随机整数             | 1.9                                      |          |
| __RandomDate      | 返回给定开始日期和结束日期值之间的随机日期       | 3.3                                      |          |
| _RandomString     | 根据给定的字符生成指定长度的随机字符串           | 2.6                                      |          |
| __UUID            | 通用唯一标识符函数                               | 2.9                                      |          |
| 获取信息函数      | __TestPlanName                                   | 返回当前测试计划的名称                   |          |
| __threadGroupName | 返回当前线程组的名称                             | 4.1                                      |          |
| __threadNum       | 返回当前正在执行的线程的编号                     | 1.X                                      |          |
| __samplerName     | 返回当前请求的名称                               | 2.5                                      |          |
| __log             | 输出日志信息                                     | 2.2                                      |          |
| __time            | 以多种格式返回当前时间                           | 2.2                                      |          |

## 3. 脚本函数 

### **3.1__BeanShell函数**

JMeter支持BeanShell脚本语言，JMeter函数助手中提供BeanShell函数支持，__BeanShell函数入参可以是BeanShell语法的程序语句或者BeanShell脚本文件。调出函数面板，我们在“值”中输入的是两个字符串相加，然后点击“生成”按钮，就会生成一串以$开头的表达式，表达式在请求（Sampler）中可以直接调用。

#### 3.1.1 初识

我们先来看看这个**__BeanShell** 长得是啥样子，路径：函数助手 > 选择**__BeanShell** ，如下图所示：

![image-20220630142504839](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630142504839.png)

#### 3.1.2 关键参数说明：

**它有两个参数，**第一个参数是要执行的语句，可以是beanshell语句或者是文件地址，是必选参数；第二个参数是保存结果的变量名称，非必选参数。

#### 3.1.3 实例

1. ${__BeanShell(123456*789)}：返回97406784，如下图所示：

   ![image-20220630142814343](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630142814343.png)

2. ${__BeanShell(source("function.bsh"))}：会执行外部脚本function.bsh，并返回结果，如下图所示：

​	**文件里代码：System.out.print("bjhg");**

![image-20220630142914650](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630142914650.png)

返回结果：

![image-20220630142933025](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630142933025.png)

#### 3.1.4 与beanshell元件比较：

该函数与beanshell元件(beanshell sampler、beanshell preprocess等)作用是一样的，只是beanshell函数更常用于一些简单的判断或计算等，可以把少量的脚本放在函数中直接赋值给一个变量，而不用总是添加beanshell元件。

### 3.2 `__javaScript`

用来执行 `JavaScript` 脚本片段，并返回结果值。

该函数会调用标准的 JavaScript 解释器，还可以直接调用 jmeter 的内置函数。

注意：文本字符串要添加必要的引号。如果表达式中有逗号，要确保对其转义。

例如：{sp}'.slice(7\,99999))}，对 7 之后的逗号进行了转义。

#### 3.2.1 初识

我们先来看看这个**`__javaScript`**长得是啥样子，路径：函数助手 > 选择**`__javaScript`**，如下图所示：

![image-20220630143544586](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630143544586.png)

#### 3.2.2 关键参数说明：

第一个参数：JavaScript代码片段,待执行的JavaScript代码片段。例如：

1. new Date()：返回当前日期和时间

2. Math.floor(Math.random()*(${maxRandom}，+1))：在0 和变量maxRandom之间的随机数

3. minRandom+Math.floor(Math.random()∗({maxRandom}-minRandom+1))：在变量minRandom和maxRandom之间的随机数"

第二个参数：变量名，重用函数计算值的引用名

请记得为文本字符串添加必要的引号。另外，如果表达式中有逗号，请确保对其转义。例如，Missing open brace for subscript{sp}'.slice(7\,99999))}，对7之后的逗号进行了转义。

#### 3.2.3 实例

![image-20220630143729036](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630143729036.png)

## 4. 字符串操作函数

### 4.1`__split`

根据分隔符拆分字符串为多个变量。

当两个分隔符中间没有字符时，返回 `?`。

被拆分出来的字符串，保存在变量中，类似这样：VAR1,{VAR_2} ...，总个数是 

如果最后一个字符是分隔符，也会返回 `?`。

函数__split会通过分隔符来拆分传递给它的字符串，并返回原始的字符串。如果分隔符紧挨在一起，那么函数就会以变量值的形式返回"?"。

拆分出来的字符串，以变量${VAR_1}、{VAR_2}…以此类推的形式加以返回。JMeter 2.1.2及其以后版本，拖尾的分隔符会被认为缺少一个变量，会返回"?"。

另外，为了更好地配合ForEach控制器，现在__split会删除第一个不用的变量（由前一次分隔符所设置）。

#### 4.1.1 初识

路径：函数助手 > 选择**`__split`**，如下图所示：

![image-20220630143917339](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630143917339.png)

#### 4.1.2 关键参数说明：

| 待拆分字符串 | 一个待拆分字符串，例如“a\|b\|c”                              | 是   |
| :----------- | :----------------------------------------------------------- | :--- |
| 变量名       | 重用函数计算值的引用名                                       | 否   |
| 分隔符       | 分隔符，例如“\|”。如果省略了此参数，函数会使用逗号做分隔符。需要注意的是，假如 要多此一举，明确指定使用逗号，需要对逗号转义，如“\,” | 否   |

#### 4.1.3 示例：

```javascript
定义字符串：
VAR="a||c|"

调用 split 函数：
${__split(${VAR},VAR,|)}
返回 "a||c|"，并生成如下变量：
VAR_n=4 
VAR_1=a 
VAR_2=? 
VAR_3=c 
VAR_4=? 
VAR_5=null
```

![image-20220630144052623](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630144052623.png)

![image-20220630144123299](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630144123299.png)

## 参考文章

[Jmeter(二十三) - 从入门到精通 - JMeter函数](https://cloud.tencent.com/developer/inventory/1923/article/1704543)