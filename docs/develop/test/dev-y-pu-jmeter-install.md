# JMeter的安装

## 1. 简介

Apache JMeter 是一個 Apache 專案，目的是用來作 load test 工具，可以提供於分析和測量各種服務的性能，主要目標是 Web application。 JMeter 也可以用來進行 JDBC數據庫連接，FTP，LDAP，WebService，JMS，HTTP，一般 TCP 連線和 OSnative processes 的單元測試工具。

## 2. 安装

安装方式有两种

### 2.1 手动安装

1. 下載並解壓 [Apache JMeter](https://jmeter.apache.org/download_jmeter.cgi)
2. 執行 `apache-jmeter-5.1.1/bin/jmeter.sh`

### 2.2 使用 homebrew

```bash
brew install jmeter
```

会自动加入环境变量，不用指定执行路径

## 3. 启动

### 3.1  终端启动

直接在终端（任意目录）输入`jmeter`，即可启动JMeter。

![image-20200102181112165](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200102181112165.png)

### 3.2安装路径启动

安装完成后提示的安装路径

```
/usr/local/Cellar/jmeter/5.2.1
```

点击bin下的

![image-20200102104226244](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200102104226244.png)

可以看到启动后的页面为：

![image-20200102104300100](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200102104300100.png)

## 4. 设置中文

### 4.1 临时设置中文

Options-Choose Language-Chinese(S)

![image-20220621140727177](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621140727177.png)

### 4.2 永久设置中文

在jmeter安装路径`/usr/local/Cellar/jmeter/5.2.1/libexec/bin/`中的jmeter.properties，

1. 打开该文件
2. 搜索#language=en，将#language=en修改为language=zh_CN。
