# OnlyOffice功能及演示

## 1. 什么是 Document Server

**Document Server**是一个在线办公套件，包括用于文本，电子表格和演示文稿的查看器和编辑器，与Office Open XML格式完全兼容：.docx，.xlsx，.pptx，并支持实时协作编辑。

**功能性**

- 文件编辑器
- 电子表格编辑器
- 简报编辑器
- 适用于iOS和Android的文档应用程序
- 协同编辑
- 象形文字支持
- 支持所有流行的格式：DOC，DOCX，TXT，ODT，RTF，ODP，EPUB，ODS，XLS，XLSX，CSV，PPTX，HTML

本指南将向您展示如何在计算机上安装**Document Server** Docker版本。

## 2. 安装介绍

平台集成onlyoffice,调用onlyoffice的api，需要现在本地的一台服务器上安装onlyoffice的文档服务器，安装文档服务器的方式有很多种，Windows和Linux上都可以安装，但是因为文档服务器的正常使用需要其他插件的配合，所以正常按照官网上来一步步安装，还需要安装redis,rabbitMQ,mysql、Erlang、PostgreSQL等等一系列的插件，十分麻烦，而且如果你是使用windows版本安装的话，因为onlyoffice不支持中文，所以有关于中文的文档基本都是乱码，需要你另行安装字体文件，但是onlyoffice内部对于字体的添加，我查阅网上的一些资料，好像是扫描windows系统中的字体，来进行转换的，系统字体很难去删除添加，所以这种方式我不建议使用，我推荐的是在windows上使用虚拟服务器来安装docker，导入一个整体的镜像文件，（包含了中文字体）来运行onlyoffice,这里需要说明一下，至少需要2G的内存空间来让他正常运行，其流程如下：

## 2. 安装Document Server

1. 执行docker安装

   ```
   sudo docker run -i -t -d -p 9701:80 --restart=always onlyoffice/documentserver-de
   ```

2. 将数据存储在容器外部

   所有数据都存储在以下位置的特殊指定目录，**数据卷中**：

   - `/var/log/onlyoffice`用于**文档服务器**日志
   - `/var/www/onlyoffice/Data` 证书
   - `/var/lib/onlyoffice` 用于文件缓存
   - `/var/lib/postgresql` 用于数据库

   要访问位于容器外部的数据，您需要安装卷。可以通过在docker run命令中指定**-v**选项来完成。

   ```
   sudo docker run -i -t -d -p 9701:80 --restart=always \
       -v /app/onlyoffice/DocumentServer/logs:/var/log/onlyoffice  \
       -v /app/onlyoffice/DocumentServer/data:/var/www/onlyoffice/Data  \
       -v /app/onlyoffice/DocumentServer/lib:/var/lib/onlyoffice \
       -v /app/onlyoffice/DocumentServer/db:/var/lib/postgresql  onlyoffice/documentserver-de
   ```

   

![image-20200418161503116](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200418161503116.png)



安装社区版本

```
 bash opensource-install.sh -md www.isture.com
```

![image-20200419011731460](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200419011731460.png)



## 社区办

```
wget https://download.onlyoffice.com/install/opensource-install.sh
```



如果您不想立即安装**Mail Server**，可以跳过其安装。为此，请运行以下命令：

```
bash opensource-install.sh -ims false
```

这将安装没有**邮件服务器的****Community Edition**。

使用以下命令可以获得所有可用脚本参数的列表：

```
bash opensource-install.sh -h
```



## 连接到外部MySQL服务器

如果您的计算机（或另一台计算机）上安装了外部MySQL服务器，则可以执行以下命令将其连接：

```
sudo docker run --net onlyoffice -i -t -d --restart=always --name onlyoffice-community-server -p 9701:80 -p 443:443 -p 5222:5222 \
 -e MYSQL_SERVER_HOST="127.0.0.1"\
 -e MYSQL_SERVER_PORT="3306"\
 -e MYSQL_SERVER_DB_NAME=onlyoffice\
 -e MYSQL_SERVER_USER=onlyoffice_user\
 -e MYSQL_SERVER_PASS=onlyoffice_pass\
 -v /app/onlyoffice/CommunityServer/data:/var/www/onlyoffice/Data \
 -v /app/onlyoffice/CommunityServer/logs:/var/log/onlyoffice \
 onlyoffice/communityserver
```



![image-20200419161357616](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200419161357616.png)

## 参考文章

[用ONLYOFFICE-知乎](https://zhuanlan.zhihu.com/p/35985173)

[onlyoffice官方推荐简化安装方式（使用提供的脚本安装Community Edition）](https://www.songbin.top/view/408)

[onlyoffice开发者版本下载安装](https://helpcenter.onlyoffice.com/server/developer-edition/docker/docker-installation.aspx?_ga=2.45324320.505136.1587186406-245261584.1587186406)

[文件服务整合范例](https://api.onlyoffice.com/editors/demopreview)

[社区版本安装过程](https://helpcenter.onlyoffice.com/server/docker/opensource/opensource-script-installation.aspx)

[社区版脚本对应的参数](https://helpcenter.onlyoffice.com/server/docker/opensource/opensource-script-parameters.aspx)

[开发者版本的集成](https://api.onlyoffice.com/editors/example/java)
