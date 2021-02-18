# IDEA maven下载jar包太慢

我们在IDEA 的maven下载jar包是可能会超级慢，这时候我们可以使用一些maven镜像来解决。

**右键项目选中maven选项，然后选择“open settings.xml”或者 “create settings.xml”，然后把如下代码粘贴进去就可以了。重启IDE**

```
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <mirrors>
    <mirror>
        <id>alimaven</id>
        <name>aliyun maven</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
        <mirrorOf>central</mirrorOf>
    </mirror>
    </mirrors>
</settings>
```

## 参考文章

[IntelliJ IDEA maven库下载依赖包速度慢的问题](https://blog.csdn.net/qq1501340219/article/details/54638158)

