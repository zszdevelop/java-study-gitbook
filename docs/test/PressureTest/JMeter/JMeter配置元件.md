# JMeter配置元件

## **1. 简介**

JMeter配置元件可以用来初始化默认值和变量，读取文件数据，设置公共请求参数，赋予变量值等，以便后续采样器使用。将在其作用域的初始化阶段处理。配置元件（Config Element）提供对静态数据配置的支持，可以为取样器设置默认值和变量。

### 1.1 添加配置元件

首先我们来看一下JMeter的配置元件，路径：添加-配置元件；我们可以清楚地看到JMeter5中共有19个配置元件，如下图所示：

![image-20220623154721019](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623154721019.png)

## 2.常用配置元件详解

　　这一小节，宏哥就**由上而下**地详细地讲解一下常用的配置元件。

### 2.1 CSV Data Set Config

#### 2.1.1 初识

![image-20220623154830681](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623154830681.png)

#### 2.1.2 参数详解及说明，

如下表所示：

| 参 数               | 描 述                                                        | 是否必填 |
| :------------------ | :----------------------------------------------------------- | :------- |
| Name                | 脚本中显示的这个元件的描述性名称                             | 是       |
| Filename            | 待读取文件的名称。可以写入绝对路径，也可以写入相对路径（相对于bin目录），如果直接写文件名，则该文件要放在bin目录中。对于分布式测试，主机和远程机中相应目录下应该有相同的CSV文件 | 是       |
| File Encoding       | 文件读取时的编码格式，不填则使用操作系统的编码格式           | 否       |
| Ignore first line   | 是否忽略首行，如果csv文件中没有表头，则选择false             | 是       |
| Variable Names      | 变量名列表，多个变量名之间必须用分隔符分隔。如果该项为空，则文件首行会被读取并解析为列名列表 | 否       |
| Delimiter           | 参数分隔符，将一行数据分隔成多个变量，默认为逗号，也可以使用“\t”。如果一行数据分隔后的值比Vairable Names中定义的变量少，这些变量将保留以前的值（如果有值的话） | 是       |
| Allow quoted data?  | 是否允许变量使用双引号，允许的话，变量将可以括在双引号内，并且这些变量名可以包含分隔符 | 否       |
| Recycle on EOF?     | 是否循环读取csv文件内容，达到文件结尾后，是否从文件开始循环重新读取；默认为 true | 是       |
| Stop thread on EOF? | 是否循环读取csv文件内容，达到文件结尾后，线程是否该终止；默认为 true | 是       |
| Recycle on EOF?     | 当Recycle on EOF为False时，停止线程，当Recycle on EOF为True时，此项无意义，默认为 false | 是       |
| Sharing mode        | 1. All threads（默认）：一个线程组内，各个线程（用户）唯一顺序取值；2. current thread：一个线程组内，各个线程（用户）各自顺序取值；3、线程组各自独立，但每个线程组内各个线程（用户）唯一顺序取值； | 是       |

#### 2.1.3 Recycle on EOF 和Stop thread on EOF的关系？

- 当Recycle on EOF 选择true时，Stop thread on EOF选择true和false无任何意义，因为既然前面已经设置了文件是不停的循环读取，后面的控制stop就相当于失效； 
- 当Recycle on EOF 选择false时，Stop thread on EOF选择true，则当线程数超过文件里的参数的个数时，实际请求数为参数的个数；
-  当Recycle on EOF 选择false时，Stop thread on EOF选择flase，当线程数超过文件里参数的个数时，实际请求次数为线程数，但当线程数超过参数次数时，由于没有参数，所以结果仍然是失败的。

#### 2.1.4 Sharing mode

如果希望每个线程拥有自己独立的值集合，那么就需要创建一系列数据文件，为每个线程准备一个数据文件，如test1.csv、test2.csv等，使用文件名test${__threadNum}.csv,并将“sharing mode"设置为"Current thread"

- All threads：文件在所有线程间共享。

- Identifier：所有线程共享相同的标识，共享相同的文件。如有４个线程组，测试人员可以使用一个通用ＩＤ，以便在两个或多个线程组之间共享文件。

- Current thread：每个文件会针对每个线程单独打开。

- Current thread group：每个文件会针对每个线程组打开一次。

### 2.2 HTTP Header Manager

支持用户添加或者重写HTTP请求头。JMeter支持多个信息头管理器。多个信息头条目合并成一个信息头列表，跟随http请求一并提交到服务端。

1. 当有多个信息头管理器，且不同的管理器内有名称相同的信息头条目存在时，顺序靠前的管理器的信息头条目会覆盖后面的；

2. 当只有一个信息头管理器，但管理器内有名称相同的信息头条目时，会同时生效；

#### 2.2.1 初识

![image-20220623155758985](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623155758985.png)

#### 2.2.2 参数详解及说明

如下表所示：

| 参数  | 描述                             | 是否必填 |
| :---- | :------------------------------- | :------- |
| Name  | 请求头的名称，比如Content-Type   | 否       |
| Value | 请求头的值，比如application/json | 否       |

#### 2.2.3 常用请求头

这些一般可以抓包和在浏览器中查到，如下表所示：

![image-20220623155859879](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623155859879.png)

### 2.3 HTTP Cookie Manager

主要有两个功能：

- 一个功能是：像web浏览器一样存储和发送Cookie。如果有一个HTTP请求和相应里包含Cookie，Cookie管理器会自动存储Cookie，那么接下来针对特定web站点的所有请求中使用该Cookie。可在结果树中查看。

接收到的Cookie可以被保存为变量，须定义属性"CookieManager.save.cookie=true"。另外，在被存储前Cookie名称会加上前缀“COOKIE_"，要恢复早前处理方式，则定义属性”CookieManager.name.prefix="(一个或多个空格）。

如果启动了该功能，那么名称为TEST的Cookie,可以通过${COOKIE_TEST}加以引用。手动为Cookie管理器添加一个Cookie（为所有JMeter线程所共享）。

#### 2.3.1 初识

![image-20220623160045957](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623160045957.png)

#### 2.3.2 参数详细说明

如下表所示：

| 参数                        | 描述                                                         | 是否必填 |
| :-------------------------- | :----------------------------------------------------------- | :------- |
| Name                        | 树中显示此元件描述的名称                                     | 是       |
| Comments                    | 注释                                                         | 否       |
| Clear cookie each Iteration | 每次线程组运行前，都会清楚cookie，但是如果是手动添加的cookie，不会被清除 | 否       |
| Cookie Policy               | 选择Cookie的管理策略，建议选择兼容性，兼容性强               | 是       |
| User Define cookie          | 用户自定义cookie                                             | 否       |

### 2.4 HTTP Cache Manager

　　被用来为其作用域内的HTTP请求提供缓存功能，如果“Use Cache-Control/Expires header When ..."选中，那么会根据当前时间来选择，如果请求是”GET"，而时间指向未来，那么采样器就会立即返回，而无须从远程服务器 请求URL,这样是为了模拟浏览器的操作，请注意Cache-Control头必须是“pulic”的，并且只有"max-age"终结选项会被处理，如果请求文档自从其被缓存以来没有发生任何改变，那么响应包体就会为空。

#### 2.4.1 初识

![image-20220623160216803](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623160216803.png)

#### 2.4.2 参数详细说明

如下表所示：

| 参数                       | 描述                                     | 是否必填 |
| :------------------------- | :--------------------------------------- | :------- |
| Name                       | 树中显示此元件的描述性名称               | 是       |
| Comments                   | 注释                                     | 否       |
| Clear Cache each iteration | 如果选择此选项，则在线程开始时清除缓存。 | 否       |
| Use Cache                  | 如果选择此选项，则在线程开始时使用缓存。 | 否       |
| Max Number                 | 如果选择此选项，则在线程开始时最大缓存。 | 否       |

### 2.5 HTTP Request Defaults

在实际测试计划中，我们经常会碰到Http Sampler请求有较多的参数与配置会重复，每一个Http Sampler都单独设置的话比较浪费时间和精力，为了节省工作量，JMeter提供了HTTP Request Defaults元件，用来把这些重复的部分封装起来，一次设置多次使用。可以设定一些缺省值，假设有10个请求，访问域名 和端口都是一样的，那HTTP请求中就不再需要单独配置了，比较方便（增加脚本的移植性）。

这个元件可以设置HTTP请求控制器使用的默认值。例如，图中【服务器名称或IP】项目内填入了【example.com】，后面的HTTP请求如果IP也是example.com的话，那么只要将【服务器名称或IP】留空，那么这个字段将自动继承HTTP请求默认值中的值。其他诸如【协议】、【端口号】、【路径】等同此。

#### 2.5.1 初识

![image-20220623160414799](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623160414799.png)

#### 2.5.2 参数详细说明

| 参数             | 描述                                                         | 是否必填 |
| :--------------- | :----------------------------------------------------------- | :------- |
| Name             | 用作标识一个取样器，建议使用一个见名知义的名称               | 是       |
| Comments         | 注释                                                         | 否       |
| Protocol         | 协议，向目标服务器发送HTTP请求时的协议，可以是http或者是Https |          |
| IP               | HTTP请求发送的目标服务器名称或者IP地址                       |          |
| Port Number      | 目标服务器端口                                               |          |
| Path             | 目标URL路径（不包括服务器地址和端口）                        |          |
| Content encdoing | 内容的编码方式                                               |          |
| Parameter        | 参数                                                         |          |
| body data        | 参数                                                         |          |

### 2.6Counter

计数器，顾名思义就是在测试执行过程中会记录迭代次数。可以在线程组任何位置创建，允许用户配置起点、最大值和增量。配置后，计数器将从起点循环到最大值，然后重新开始，直到线程结束。允许用户创建一个计数器，可在线程组中任何地方被引用。

#### 2.6.1 初识

![image-20220623160550620](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623160550620.png)

#### 2.6.2 参数详细说明

| 参数                                         | 描述                                                         | 是否必填 |
| :------------------------------------------- | :----------------------------------------------------------- | :------- |
| Name                                         | 控制器名称，可以随意设置                                     | 否       |
| Comments                                     | 注释，可以随意设置                                           | 否       |
| Starting value                               | 启动，记录数量起始值                                         |          |
| Increment                                    | 递增，记录迭代次数步长，1后是2，步长就是1                    |          |
| Maximum value                                | 记录的最大值                                                 |          |
| Number format                                | 计算器格式，可以是数字，例如000000（6位长度，000,000（6位长度，3位间隔开）；字符加数字，例如CUST_000000（字符加6位数字 ） |          |
| Exported Variable Name                       | 引用变量名称，记数器记录的值可以存入的此引用名（变量），可供其他元件调用 |          |
| Track counter independently for each user    | 与每位用户独立的跟踪计数器，每个线程都有自己的计数器，相互不干扰 |          |
| Reset counter on each Thread Group Iteration | 每次迭代复原计数器                                           |          |

### 2.7 DNS Cache Manager

### 2.7.1 初识

![image-20220623160659187](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623160659187.png)

#### 2.7.2 参数详细说明

| 参数                    | 描述                                                         | 是否必填 |
| :---------------------- | :----------------------------------------------------------- | :------- |
| Name                    | 树中显示此元件的描述性名称                                   |          |
| Comments                | 注释                                                         |          |
| Clear cache each iter   | 清除每个迭代的缓存，如果选择此选项，则每次启动新迭代时，都会清除每个线程的DNS缓存。 |          |
| Use System DNS resolver | 使用系统DNS解析器；将使用系统DNS解析器。为了正确工作，请编辑 $ JAVA_HOME / jre / lib / security / java.security并添加networkaddress.cache.ttl = 0 |          |
| Use custom DNS resolver | 使用自定义DNS解析器；将使用自定义DNS解析器（来自dnsjava库）。 |          |

### 2.8 FTP Request Defaults

被用于设置FTP请求的默认值

#### 2.8.1 初识

![image-20220623160810169](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623160810169.png)

### 2.9 HTTP Authorization Manager

HTTP认证是一种安全机制，在客户端、浏览器或者程序向服务器发起请求时，需要提供用户名和密码且验证通过（拿到凭证）才能继续发起交互。

#### 2.9.1 初识

![image-20220623160901657](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623160901657.png)

### 2.10 JDBC Connection Configuration

#### 2.10.1 初识

![image-20220623160939734](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623160939734.png)

### 2.11 Random Variable

#### 2.11.1 初始

![image-20220623161104053](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623161104053.png)

#### 2.11.2 参数详细说明

| 参数                     | 描述                                                         | 是否必填 |
| :----------------------- | :----------------------------------------------------------- | :------- |
| Name                     | 树中显示的此元件的描述性名称。                               |          |
| Comments                 | 注释                                                         |          |
| Variable Name            | 变量名，存储随机字符串的变量的名称。                         |          |
| Output Format            | 格式化字符串，要使用的java.text.DecimalFormat格式字符串。例如，“ 000”将生成至少3位数字，或者“ USER_000”将生成USER_nnn形式的输出。如果未指定，则默认为使用Long.toString（）生成数字。 |          |
| Minimum Value            | 最小值；生成的随机数的最小值（长整数）。                     |          |
| Maximum Value            | 最大值；生成的随机数的最大值（长整数）。                     |          |
| Seed for Random function | 随机种子，随机数生成器的种子。默认值为当前时间，以毫秒为单位。如果在“将每个线程”设置为true的情况下使用相同的种子值，则与“ 随机” 类一样，您将为earch线程获得相同的值 |          |
| Per Thread(User)?        | 每个线程，如果为False，则在线程组中的所有线程之间共享生成器。如果为True，则每个线程都有自己的随机生成器。 |          |

### 2.12 User Defined Variables（重要）

如果您有多个线程组，请确保对不同的值使用不同的名称，因为UDV在线程组之间共享。同样，这些变量在处理完元素之后才可用，因此您不能引用在同一元素中定义的变量。您可以引用在早期UDV或测试计划中定义的变量。

>UDV在线程组之间共享，根据这个特性，我们全局的东西就可以设在这

#### 2.12.1 初识

![image-20220623161309686](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220623161309686.png)

#### 2.12.2 参数详细说明

| 参数                  | 描述                                                         | 是否必填 |
| :-------------------- | :----------------------------------------------------------- | :------- |
| Name                  | 树中显示此元件描述的名称                                     |          |
| Comments              | 注释                                                         |          |
| User Define Variables | 用户定义的变量。变量名称/值对。您需要在$ {...}结构的方括号内放置“名称”（Name）列下的字符串，以便以后使用变量。然后，整个$ {...}将由“值”列中的字符串替换 |          |

## 参考文章

[Jmeter(八) - 从入门到精通 - JMeter配置元件](https://cloud.tencent.com/developer/inventory/1923/article/1643120)

