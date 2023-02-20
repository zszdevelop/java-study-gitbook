### Maven私服 Nexus部署

## 1. 简介

私服是指私有服务器，是架设在局域网的一种特殊的远程仓库，目的是代理远程仓库及部署第三方构建。有了私服之后，当 Maven 需要下载构件时，直接请求私服，私服上存在则下载到本地仓库；否则，私服请求外部的远程仓库，将构件下载到私服，再提供给本地仓库下载

![image-20211004204944689](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004204944689.png)

## 2. 安装步骤

1. 下载

   [Nexus官方3.X下载地址](https://help.sonatype.com/repomanager3/download)

2. 部署步骤

   ```sh
   mkdir /usr/local/nexus
   tar zxf nexus-3.34.1-01-unix.tar.gz -C /usr/local/nexus/
   #启动nexus必须使用nexus用户，不可以使用权限过高的用户，比如root，否则会启动失败
   useradd nexus
   chown -R nexus:nexus /usr/local/nexus/
   ls /usr/local/nexus/
   nexus-3.34.1-01     # 这是应用目录
   sonatype-work         # 这是工作目录，存放镜像仓库
   #运行内存和工作目录nexus-3.34.1-01/bin/nexus.vmoptions （修改对应字段即可）
   #运行监听地址和端口nexus-3.34.1-01/etc/nexus-default.properties
   ln -s /usr/local/nexus/nexus-3.34.1-01/bin/nexus /usr/local/bin/
   #创建命令软连接
   #切换至nexus用户，并启动nexus服务，如果使用root用户，会因为权限过高而启动失败
   su nexus
   nexus start
   ```

3. 运行检查

   ```javascript
   netstat -anput | grep 8081
   ```

4. 访问测试

   启动nexus后，即可访问服务器IP+8081端口：

   ![image-20211004211202373](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004211202373.png)

## 3. 登录并修改密码

1. 查看密码

   根据下述提示的路径，查看密码：

   ![image-20211004211352564](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004211352564.png)

   ```
   cat /usr/local/nexus/sonatype-work/nexus3/admin.password 
   02fc969a-cc65-44a8-ad56-9d22b243de1e
   ```

2. 进行登录，**默认的用户名为admin，密码就是我们上面查看到的：**

3. 登录后,修改密码

   ![image-20211004211715907](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004211715907.png)

   ![image-20211004211756213](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004211756213.png)

   ![image-20211004211840651](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004211840651.png)

   ![image-20211004211852121](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004211852121.png)

## 4. **创建角色**

![image-20211004212042299](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004212042299.png)

![image-20211004212207094](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004212207094.png)

**点击创建：**

![image-20211004212246300](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004212246300.png)

## 5. **创建用户**

![image-20211004212426719](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004212426719.png)

![image-20211004212558422](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004212558422.png)

## 6. **查看默认仓库类型**

![image-20211004212722827](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004212722827.png)

- group（仓库组类型）：又叫组仓库，用于方便开发人员，自己设定的仓库
- hosted（宿主类型）：内部项目的发布仓库（内部开发人员发布上去存放的仓库）
- proxy（代理类型）：从远程中央仓库中寻找数据的仓库（可以点击对应的仓库的Configuration页签下Remote Storage Location属性的值，即被代理的远程仓库的路径）
- virtual（虚拟类型）：虚拟仓库（这个基本上用不到）
- Public Repositories下的仓库类型
- **3rd party: 无法从公共仓库获得的第三方发布版本的构件仓库，即第三方依赖的仓库，这个数据通常是由内部人员自行下载之后发布上去；**
- Apache Snapshots: 用了代理ApacheMaven仓库快照版本的构件仓库
- Central: 用来代理maven中央仓库中发布版本构件的仓库
- entral M1 shadow: 用于提供中央仓库中M1格式的发布版本的构件镜像仓库
- Codehaus Snapshots: 用来代理CodehausMaven 仓库的快照版本构件的仓库
- **Releases: 内部的模块中release模块的发布仓库，用来部署管理内部的发布版本构件的宿主类型仓库；release是发布版本；**
- **Snapshots:发布内部的SNAPSHOT模块的仓库，用来部署管理内部的快照版本构件的宿主类型仓库；snapshots是快照版本，也就是不稳定版本**

## 7. **开启release的重复发版权限**

开发中需要重复发版，则需要开启release类型仓库的对应权限设置allow redeploy。如下:

![image-20211004213118075](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004213118075.png)

![image-20211004213230425](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004213230425.png)

## 8. **设置代理仓库（阿里云maven仓库）**

![image-20211004213337597](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004213337597.png)

![image-20211004213415866](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004213415866.png)

阿里云仓库的URL：https://maven.aliyun.com/nexus/content/groups/public/

![image-20211004213621568](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004213621568.png)

填写上述两个内容后，点击页面下边的create repository 创建完成之后可以看到新增加了阿里云库。

![image-20211004213707656](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004213707656.png)

将添加的阿里云Proxy加入默认group中：

![image-20211004213813431](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004213813431.png)

将阿里云移动到第一个

![image-20211004213918176](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004213918176.png)

保存后，再次刷新页面，即可看到当前的Nexus地址：

![image-20211004214034153](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211004214034153.png)

### 8.1 关于上述配置的常见使用场景介绍如下：

- release发版仓库（nexus默认已建立：maven-releasees）
- snapshot 测试中心快照仓库（nexus默认已建立：maven-snapshots）
- central 中央仓库 （nexus默认已建立：maven-central）
- 关于组：在nexus中可以建立组，将不同类型仓库集合在一起（nexus默认已建立：maven-public）
- 场景一： 自定义新建proxy类型仓库，在maven配置中分别配置不同调用地址，或是将自定义新建的proxy仓库统一加入一个组，在maven配置中调用一个地址
- 场景二： 使用maven已经建立好的proxy仓库，且使用已建立好的组（maven-public）配置maven调用地址
- 场景一和场景二本质上讲没有什么变化，根据公司开发习惯和需求进行配置即可

## 参考文章

[部署maven及Nexus私服](https://cloud.tencent.com/developer/article/1623922)

