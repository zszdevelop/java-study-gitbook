# Mac软件包管理工具Homebrew

## 1.  简介

Homebrew是一款Mac OS平台下的软件包管理工具，拥有安装、卸载、更新、查看、搜索等很多实用的功能。简单的一条指令，就可以实现包管理，而不用你关心各种依赖和文件路径的情况，十分方便快捷。

## 2. 用法

**Homebrew基本用法：**

假设需要安装的软件是 wget

| 操作                   | 命令              |
| ---------------------- | ----------------- |
| 更新 Homebrew          | brew update       |
| 更新所有安装过的软件包 | brew upgrade      |
| 更新指定的软件包       | brew upgrade wget |
| 查找软件包             | brew search wet   |
| 安装软件包             | brew install wget |
| 卸载软件包             | brew remove wget  |
| 列出已安装的软件包     | brew list         |
| 查看软件包信息         | brew info wget    |
| 列出软件包的依赖关系   | brew deps wget    |
| 列出可以更新的软件包   | brew outdated     |

## 3. 镜像源

更新**homebrew**

```
brew update
```

如果上面操作长时间没任何动静，请更换镜像，参考清华的镜像 [https://mirrors.tuna.tsinghua...](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)

## 参考文章

[Mac必备神器Homebrew](https://zhuanlan.zhihu.com/p/59805070)

