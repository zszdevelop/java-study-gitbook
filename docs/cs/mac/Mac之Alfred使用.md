# Mac之Alfred使用

## 1. 简介

Mac的Alfred软件主要的功能是

> 本地搜索及应用快速启动

## 2. 核心功能

### 2.1 应用快速启动

唤醒后，直接搜索你要的软件即可

![image-20211027194637166](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027194637166.png)

### 2.2 本地搜索文件

![image-20211027194750573](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027194750573.png)

1. 按空格 后紧跟文件名就可以快速搜索文件

   ![image-20211027194903719](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027194903719.png)

2. 打开文件 open：

   open + 空格+文件名称

   ![image-20211027194945335](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027194945335.png)

3. 在finder 中显示

   find 空格 文件名称

   ![image-20211027195159561](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027195159561.png)

4. 内部文件 in

   ```
   in 空格 文件内容
   ```

   ![image-20211027195433389](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027195433389.png)

### 2.3 系统功能

![image-20211027200437225](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027200437225.png)

### 2.4 终端

Alfred 默认用的是 Mac 自带的终端，如如果使用的 iTerm 可以根据下图设置：

![image-20211028164643029](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211028164643029.png)

```
on alfred_script(q)
    tell application "iTerm"
        set _length to count window
    if _length = 0 then
        create window with default profile
    end if
    set aa to (get miniaturized of current window)
    if aa then
        set miniaturized of current window to false
    end if
    set bb to (get visible of current window)
    if bb is false then
        set visible of current window to true
    end if
    set cc to frontmost
    if cc is false then
        activate
    end if
        (*if _length = 0 then*)
            set theResult to current tab of current window
        (*else
            set theResult to (create tab with default profile) of current window
        end if*)
        write session of theResult text q
end tell
end alfred_script
```

这样 Alfred 在执行命令是就会调用 iTerm。

## 3. 工作流

### 3.1 CodeVar

> 生成变量名，支持大小驼峰、常量、下划线，开发者必备的工作流

![image-20211027195753852](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027195753852.png)

下载地址：https://github.com/xudaolong/CodeVar

### 3.2 IP Address

>快速查询本地ip和公网出口ip，再也不用到ipip.net上去查询了

![image-20211027195918998](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211027195918998.png)

下载地址：https://github.com/zenorocha/alfred-workflows/raw/master/ip-address/ip-address.alfredworkflow

## 4. 自定义工作流

### 4.1 终端运行一段代码

我们公司网络比较奇葩。内外网正常情况是不能同时上的，后面解决方案是加上netmask 

```
sudo route -n add -net 192.168.0.0 -netmask 255.255.0.0 10.8.0.1
```

我还不能设置为全局的，那样我在家就不能上网了

所以我每天的流程

1. 打开笔记

2. 复制命令

3. 打开终端
4. 黏贴命令

实在是麻烦

#### 4.1.1 编写脚本

![image-20211028165130836](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211028165130836.png)

填写 Workflow 的名称，也可以将图片拖到右侧框内，即可当作图标：

![image-20211028165214358](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211028165214358.png)

双击左侧的模块设置触发关键词：

![image-20211028165306093](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211028165306093.png)

#### 4.1.2 设置终端命令

![image-20211028165357352](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211028165357352.png)

![image-20211028165420447](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211028165420447.png)

#### 4.1.3 测试

![image-20211028165502964](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211028165502964.png)

## 参考文章

[神兵利器推荐——你一定不能错过的mac alfred工作流](https://suncle.me/2020/12/09/tool-recommendation-useful-alfred-workflow/)

