# Maven配置nexus私服

## 1. 简介

**Maven配置nexus私服，将远程仓库设置成本地搭建的Nexus私服**

maven 默认的settings.xml地址。可以通过idea查看

![image-20211004220055672](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004220055672.png)

## 2. 修改maven的settings.xml

编辑内容如下

```xml
 <mirrors>
 	<mirror>
      <id>nexus-zsz</id>
      <mirrorOf>*</mirrorOf>
      <name>nexus testconf</name>      <url>http://192.168.0.1:8081/repository/maven-public/</url>
    </mirror>
#上面的URL就是在nexus上查看到的URL
  </mirrors>

<profiles>
<profile>
       <id>nexus-zsz</id>

      <repositories>
         <repository>
           <id>nexus</id>
           <url>http://192.168.0.1:8081/repository/maven-public</url>
           <releases>
             <enable>true</enable>
           </releases>
           <snapshots>
             <enable>true</enable>
           </snapshots>
        </repository>
       </repositories>

      <pluginRepositories>
        <pluginRepository>
          <id>nexus</id>
          <url>http://192.168.0.1:8081/repository/maven-public</url>
           <releases>
            <enable>true</enable>
          </releases>
          <snapshots>
             <enable>true</enable>
          </snapshots>
        </pluginRepository>
      </pluginRepositories>
     </profile>
  </profiles>

	<activeProfiles>
    <activeProfile>nexus-zsz</activeProfile>    
  </activeProfiles>
```

## 3. maven项目测试

1. 创建项目

   ```sh
   mvn archetype:generate -DgroupId=com.zszdevelop -DartifactId=nexusdemo -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false
   ```

   构建项目，可以看到在构建的过程中使用的是nexus私服地址。

   ![image-20211004221548862](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004221548862.png)

2. 查看项目

   ```sh
   ls nexusdemo
   pom.xml src
   mvn package                  #将项目打包
   ls						 #打包后，会生成target目录
   pom.xml src     target
   ```

3. **查看nexus中缓存的文件**

   ![image-20211004221850526](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004221850526.png)

   **若没有缓存文件，下面有解决办法**

   **如果在以上页面中，并没有看到缓存的文件，是因为当前没有写入nexus的权限，可以进行以下操作：**

   ![image-20211004222018328](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004222018328.png)

   进行以上设置后，再次删除本地宿主目录下的缓存文件，重新构建项目并打包，即可看到nexus上的缓存文件了。

## 4. 配置认证，将打包好的项目上传到nexus中

### 4.1 在setting.xml中添加server

```xml
 <servers>
	<server>
		<id>nexus-zsz</id>
		<username>test</username>
		<password>123456</password>
	</server>
 </servers>
```

### 4.2 修改项目的pom.xml文件：

```xml
<distributionManagement>
        <snapshotRepository>
            <id>nexus-zsz</id>           #这里的ID必须和上面settings文件中配置认证的ID一致
            <name>Nexus Snapshot</name>
            <url>http://192.168.0.1:8081/repository/maven-snapshots/</url>
                        #上面是修订版本的URL，可在nexus的web界面查看
        </snapshotRepository>
        <repository>
            <id>nexus-zsz</id>
            <name>Nexus releases</name>
            <url>http://192.168.0.1:8081/repository/maven-releases/</url>
                       #上面是发行版本的URL，同样在web界面的Repositories中可以查看到
        </repository>
</distributionManagement>
```

### 4.3 上传到私服 

```sh
mvn deploy   
```

### 4.4 **在web界面确认上传成功：**

![image-20211004224041615](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004224041615.png)

将所有的内容展开，即可看到以下内容：

![image-20211004223948837](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004223948837.png)

如果在部署过程中，出现了错误，首先先检查一下配置文件setting.xml的账号密码有没有与nexus创建的用户密码相同，其次再检查setting.xml里的id标签和pom.xml文件中的id标签是否相同，不同会报401（没有权限）的错误。

## 5. **上传到maven-release仓库**

### 5.1 修改 pom.xml 

```
  <version>1.0-SNAPSHOT</version>   
    #将上面这行的“SNAPSHOT”去掉，更改后如下：
  <version>1.0</version>
```

### 5.2 继续 mvn deploy

```
mvn deploy
```

### 5.3 在web界面中查看，如下：

![image-20211004224615718](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004224615718.png)

**展开所有节点，即可看到以下内容：**

![image-20211004224646522](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004224646522.png)

## 参考文章

[部署maven及Nexus私服](https://cloud.tencent.com/developer/article/1623922)

