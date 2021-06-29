# Maven的中心资源库中没有com.oracle.ojdbc驱动包

## 1. 问题

maven 提示没有com.oracle.ojdbc驱动包 无法正常下载

## 2. 原因

maven的中心资源库中没有ojdbc驱动包，所以需要安装到本地仓库

## 3. 解决

1. 下载

   链接:https://pan.baidu.com/s/1Gciezpe3SnEATTTs2i1QXw  密码:e8ej

2. 安装到本地仓库

   ```tex
   mvn install:install-file -DgroupId=com.oracle -DartifactId=ojdbc14 -Dversion=10.2.0.4.0 -Dpackaging=jar -Dfile=/Users/zsz/Project/software/jar/oracle/ojdbc14-10.2.0.4.0.jar
   ```

   

## 参考文章

[【oracle】Failure to find com.oracle:ojdbc14:jar问题](https://blog.csdn.net/weixin_45784642/article/details/103012989)

