# nexus私服上传第三方包

## 1. 操作步骤

### 1.1 创建repositories

![image-20211004225113417](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004225113417.png)

![image-20211004225141529](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004225141529.png)

### 1.2 配置repositories

配置如下（定义名称并激活），然后自行拖到页面的最下方，点击添加即可

![image-20211004225316142](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004225316142.png)

### 1.3 maven-public配置3rd

![image-20211004225459127](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004225459127.png)

![image-20211004225514115](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004225514115.png)

### 1.4 Maven添加第三方仓库地址（全局配置）

![image-20211004225624932](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004225624932.png)

![image-20211004225652991](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004225652991.png)

### 1.5 配置settings.xml

在profiles 中添加如下内容

```xml
<repository>
          <id>3rdnexus</id>          <url>http://192.168.0.1:8081/repository/3rd/</url>
          <release>
            <enable>true</enable>
          </release>
          <snapshots>
            <enable>true</enable>
          </snapshots>
        </repository>
  </profiles>   
```

添加server

```
<server>
      <id>3rdnexus</id>      #此ID要与profile中的ID对应
      <username>test</username>
      <password>123456</password>
 </server>
```

### 1.6 上传本地包

```
ls
ojdbc14-10.2.0.4.0.jar
```

```sh
mvn deploy:deploy-file -DgroupId=com.oracle -DartifactId=ojdbc14 -Dversion=10.2.0.4.0 -Dpackaging=jar -Dfile=/Users/zsz/Project/software/jar/oracle/ojdbc14-10.2.0.4.0.jar -Durl=http://192.168.0.1:8081/repository/3rd/ -DrepositoryId=3rdnexus
```

### 1.7 **查看本地上传的jar包：**

![image-20211004230728014](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004230728014.png)

![image-20211004230745224](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004230745224.png)

## 参考文章

[部署maven及Nexus私服](https://cloud.tencent.com/developer/article/1623922)
