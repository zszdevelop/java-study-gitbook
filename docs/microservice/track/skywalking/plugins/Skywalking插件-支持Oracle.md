# Skywalking插件-支持Oracle

## 1. 背景

​    由于Oracle和Resin许可的原因，没有在Apache发行包中提供这些插件。

​    由于许可的限制或不兼容，这些插件发布在第三方仓库中。可以到[SkyAPM java插件扩展仓库](https://github.com/SkyAPM/java-plugin-extensions)获得这些插件。

## 2. 集成插件

### 2.1 下载插件

[下载地址](https://github.com/SkyAPM/java-plugin-extensions/releases)

![image-20211128200249253](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211128200249253.png)

### 2.2 移动插件

将`apm-oracle-10.x-plugin-2.1.0.jar` 移动到 `skywalking-agent/plugins`

![image-20211128200535071](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211128200535071.png)

### 2.3 测试

可以看到就能正常显示oracle的sql了

![image-20211128201608003](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211128201608003.png)
