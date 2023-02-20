---
order: 10
category:
  - Java
---

# Python环境 -  Anaconda使用指南

## 1. 概述

很多学习python的初学者甚至学了有一段时间的人接触到anaconda或者其他虚拟环境工具时觉得无从下手, 其主要原因就是不明白这些工具究竟有什么用, 是用来做什么的, 为什么要这么做, 比如笔者一开始也是不明白为啥除了python之外我还需要这么一个东西, 他和python到底有啥联系和区别, 为啥能用来管理python.

在使用过之后我才逐渐发现其实anaconda等环境管理工具究竟在做啥, 以及为什么我们需要他们来管理我们的python环境

首先我们需要先去了解Anaconda诞生的目的.再去了解Anaconda的使用方法.

### 1.1 Python本身

首先我们需要从python本身说起, 从根源寻找问题, 我们在使用python语言编写程序之前需要下载一个python解释器, 这才是python的本体, 没了python解释器, 我们即使写了无比正确优雅的python脚本也没办法运行, 那这个解释器在哪呢.就在你安装python的地方,比如我的在`C:\Users\Acring\AppData\Local\Programs\Python\Python36-32`

![image-20230216220342762](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216220342762.png)

项目结构如上图,这里有我们很熟悉的python.exe, 也就是Python解释器

除此之外还有个很重要的东西, Lib, 也就是python包文件, 包括自带的包和第三方包

![image-20230216220446994](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216220446994.png)

Lib目录如上图, 这里有python自带的包, 如笔者常用的日志包logging, 异步包 concurrent, 而所有的第三方包都放在site-packages文件夹里面

了解了这些我们就对整个python环境有了大概的了解, 其实最关键的, 一个python环境中需要有一个**解释器**, 和一个**包集合**.

### 1.2 解释器

解释器根据python的版本大概分为2和3. python2和3之间无法互相兼容, 也就是说用python2语法写出来的脚本不一定能在python3的解释器中运行.

### 1.3 包集合

包集合中包含了自带的包和第三方包, 第三方包我们一般通过pip或者easy_install来下载, 当一个python环境中不包含这个包, 那么引用了这个包的程序不能在该python环境中运行.

比如说一个爬虫脚本用到了第三方的requests包,而另一台计算机是刚刚装好原始python的, 也就是说根本没有任何第三方包, 那么这个爬虫脚本是无法在另一台机器上运行的.

## 2. 问题所在

python环境解释完了, 那么接下来就要说明这样的环境究竟产生哪些问题, 因为anaconda正式为了解决这些问题而诞生的

1. 到底该装 Python2 呢还是 Python3

python2和python3在语法上是不兼容的, 那我的机器上应该装python2还是python3呢, 可能一开始选一个学习就好了, 但是如果你要开发的程序必须使用python2而不能使用python3,那这时候你就不得不再下载一个python2, 那这时候环境变量该设谁的目录呢, 如果还是切换环境变量岂不是很麻烦.

1. 包管理

如果我在本地只有一个python环境那我所有程序用到的各种包都只能放到同一个环境中, 导致环境混乱, 另外当我将写好的程序放到另一电脑上运行时又会遇到缺少相关包, 需要自己手动一个个下载的情况, 实在是烦人, 要是能每个程序开发都选用不同的环境, 而开发好之后又能将该程序需要的环境(第三方包)都独立打包出来就好了.

## 3. Anaconda

那么接下来就到我们的anaconda上场了, 先让我们安装好Anaconda然后我再来告诉你如何用Anaconda一个个解决我们上面的问题吧.

### 3.1 下载

[官网下载](https://link.jianshu.com?t=https%3A%2F%2Fwww.anaconda.com%2Fdownload%2F)

推荐下载python3版本, 毕竟未来python2是要停止维护的.

### 3.2 安装

按照安装程序提示一步步安装就好了, 安装完成之后会多几个应用

> - **Anaconda Navigtor** ：用于管理工具包和环境的图形用户界面，后续涉及的众多管理命令也可以在 Navigator 中手工实现。
> - **Jupyter notebook** ：基于web的交互式计算环境，可以编辑易于人们阅读的文档，用于展示数据分析的过程。
> - **qtconsole** ：一个可执行 IPython 的仿终端图形界面程序，相比 Python Shell 界面，qtconsole 可以直接显示代码生成的图形，实现多行代码输入执行，以及内置许多有用的功能和函数。
> - **spyder** ：一个使用Python语言、跨平台的、科学运算集成开发环境。

暂时先不用管, 了解一下就行了

### 3.3 配置环境变量

如果是windows的话需要去 `控制面板\系统和安全\系统\高级系统设置\环境变量\用户变量\PATH` 中添加 anaconda的安装目录的Scripts文件夹, 比如我的路径是`D:\Software\Anaconda\Scripts`, 看个人安装路径不同需要自己调整.

之后就可以打开命令行(最好用管理员模式打开) 输入 `conda --version`

如果输出`conda 4.4.11`之类的就说明环境变量设置成功了.

为了避免可能发生的错误, 我们在命令行输入`conda upgrade --all` 先把所有工具包进行升级

## 4. 管理虚拟环境

接下来我们就可以用anaconda来创建我们一个个独立的python环境了.接下来的例子都是在命令行操作的,请打开你的命令行吧.

### 4.1 activate

activate 能将我们引入anaconda设定的虚拟环境中, 如果你后面什么参数都不加那么会进入anaconda自带的base环境,

你可以输入python试试, 这样会进入base环境的python解释器, *如果你把原来环境中的python环境去除掉会更能体会到*, 这个时候在命令行中使用的已经不是你原来的python而是base环境下的python.而命令行前面也会多一个`(base)` 说明当前我们处于的是base环境下.

![image-20230216223451017](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216223451017.png)

### 4.2 创建自己的虚拟环境

我们当然不满足一个base环境, 我们应该为自己的程序安装单独的虚拟环境.

创建一个名称为learn的虚拟环境并指定python版本为3(这里conda会自动找3中最新的版本下载)

```bash
conda create -n learn python=3
```

![image-20230216223643336](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216223643336.png)

于是我们就有了一个learn的虚拟环境, 接下来我们切换到这个环境, 一样还是用activae命令 后面加上要切换的环境名称

### 4.3 切换环境

```bash
activate learn
```

如果忘记了名称我们可以先用

```bash
conda env list
```

去查看所有的环境

现在的learn环境除了python自带的一些官方包之外是没有其他包的, 一个比较干净的环境我们可以试试

先输入`python`打开python解释器然后输入

```python
>>> import requests
```

会报错找不到requests包, 很正常.接下来我们就要演示如何去安装requests包

```python
exit()
```

退出python解释器

### 4.4 安装第三方包

输入

```bash
conda install requests
```

或者

```bash
pip install requests
```

来安装requests包.

安装完成之后我们再输入`python`进入解释器并import requests包, 这次一定就是成功的了.

### 4.5 卸载第三方包

那么怎么卸载一个包呢

```bash
conda remove requests
```

或者

```bash
pip uninstall requests
```

就行啦.

### 4.6 查看环境包信息

要查看当前环境中所有安装了的包可以用

```bash
conda list 
```

### 4.7 导入导出环境

如果想要导出当前环境的包信息可以用

```bash
conda env export > environment.yaml
```

将包信息存入yaml文件中.

当需要重新创建一个相同的虚拟环境时可以用

```bash
conda env create -f environment.yaml
```

## 5. 常用命令汇总

其实命令很简单对不对, 我把一些常用的在下面给出来, 相信自己多打两次就能记住

> activate  // 切换到base环境
>
> activate learn // 切换到learn环境
>
> conda create -n learn python=3  // 创建一个名为learn的环境并指定python版本为3(的最新版本)
>
> conda env list // 列出conda管理的所有环境
>
> conda list // 列出当前环境的所有包
>
> conda install requests 安装requests包
>
> conda remove requests 卸载requets包
>
> conda remove -n learn --all // 删除learn环境及下属所有包
>
> conda update requests 更新requests包
>
> conda env export > environment.yaml  // 导出当前环境的包信息
>
> conda env create -f environment.yaml  // 用配置文件创建新的虚拟环境

## 6. 深入一下

或许你会觉得奇怪为啥anaconda能做这些事, 他的原理到底是什么, 我们来看看anaconda的安装目录

![image-20230216224210339](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216224210339.png)

这里只截取了一部分, 但是我们和本文章最开头的python环境目录比较一下, 可以发现其实十分的相似, 其实这里就是base环境. 里面有着一个基本的python解释器, lLib里面也有base环境下的各种包文件.

那我们自己创建的环境去哪了呢, 我们可以看见一个envs, 这里就是我们自己创建的各种虚拟环境的入口, 点进去看看

![image-20230216224422272](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216224422272.png)

可以发现我们之前创建的learn目录就在下面, 再点进去

![image-20230216224447576](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216224447576.png)

这不就是一个标准的python环境目录吗?

------

这么一看, anaconda所谓的创建虚拟环境其实就是安装了一个真实的python环境, 只不过我们可以通过activate,conda等命令去随意的切换我们当前的python环境, 用不同版本的解释器和不同的包环境去运行python脚本.

## 7. 与pycharm连接

在工作环境中我们会集成开发环境去编码, 这里推荐JB公司的pycharm, 而pycharm也能很方便的和anaconda的虚拟环境结合

在`Setting => Project => Project Interpreter` 里面修改 Project Interpreter , 点击齿轮标志再点击Add Local为你某个环境的python.exe解释器就行了

![image-20230216224549304](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216224549304.png)

比如你要在learn环境中编写程序, 那么就修改为`D:\Software\Anaconda\envs\learn`, 可以看到这时候下面的依赖包也变成了learn环境中的包了.接下来我们就可以在pycharm中愉快的编码了.

![image-20230216224622162](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230216224622162.png)

## 8. 结语

现在你是不是发现用上anaconda就可以十分优雅简单的解决上面所提及的单个python环境所带来的弊端了呢, 而且也明白了其实这一切的实现并没有那么神奇.

当然anaconda除了包管理之外还在于其丰富数据分析包, 不过那就是另一个内容了, 我们先学会用anaconda去换一种方法管里自己的开发环境, 这已经是一个很大的进步了.

## 参考文字

[Anaconda完全入门指南](https://www.jianshu.com/p/eaee1fadc1e9)