# Jenkins安装

## 1. 简介

Jenkins是开源CI&CD软件领导者，提供超过1000个插件来支持构建、部署、自动化，满足任何项目的需要。我们可以用Jenkins来构建和部署我们的项目，比如说从我们的代码仓库获取代码，然后将我们的代码打包成可执行的文件，之后通过远程的ssh工具执行脚本来运行我们的项目。

## 2. Jenkins的安装

### 2.1 Docker环境下的安装

- 下载Jenkins的Docker镜像：

```
docker pull jenkins/jenkins:lts
```

- 在Docker容器中运行Jenkins：

```dockerfile
docker run -p 18080:8080 -p 50000:5000 --name jenkins \
-u root \
-v /mydata/jenkins_home:/var/jenkins_home \
-d jenkins/jenkins:lts
```

注：可在上面语句后添加编码。如果不设置编码的话，会出现乱码问题（博主没设置出现了问题）

```
-e JAVA_OPTS=-Dfile.encoding=UTF-8 
```

## 3. Jenkins的配置

- 运行成功后访问该地址登录Jenkins，第一次登录需要输入管理员密码：

  [http://ip:18080/](http://localhost:18080/)

  ![image-20210915171144707](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915171144707.png)

- 使用管理员密码进行登录，可以使用以下命令从容器启动日志中获取管理密码：

  ```
  docker logs jenkins
  ```

- 从日志中获取管理员密码：

  ![image-20210915171324018](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915171324018.png)

- 选择安装插件方式，这里我们直接安装推荐的插件：

  ![image-20210915171418370](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915171418370.png)

- 进入插件安装界面，联网等待插件安装：

  ![image-20210915171547103](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915171547103.png)

- 安装完成后，创建管理员账号：

  ![image-20210915171851041](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915171851041.png)

- 进行实例配置，配置Jenkins的URL：

  ![image-20210915171931540](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915171931540.png)

- 点击系统管理->插件管理，进行一些自定义的插件安装：

  ![image-20210915172144017](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915172144017.png)

- 确保以下插件被正确安装：

  - 根据角色管理权限的插件：Role-based Authorization Strategy
  - 远程使用ssh的插件：SSH plugin

  ![image-20210915172346532](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915172346532.png)

- 通过系统管理->全局工具配置来进行全局工具的配置，比如maven的配置：

  ![image-20210915172442277](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915172442277.png)

- 新增maven的安装配置：

  ![image-20210915172624437](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915172624437.png)

- 在系统管理->系统配置中添加全局ssh的配置，这样Jenkins使用ssh就可以执行远程的linux脚本了：

  1. 添加凭据

     ![image-20210915173546451](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915173546451.png)

2. 添加ssh

   ![image-20210915173701296](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915173701296.png)

## 4. 角色权限管理

> 我们可以使用Jenkins的角色管理插件来管理Jenkins的用户，比如我们可以给管理员赋予所有权限，运维人员赋予执行任务的相关权限，其他人员只赋予查看权限。

- 在系统管理->全局安全配置中启用基于角色的权限管理：

![image-20210915173908996](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915173908996.png)

![image-20210915184054625](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915184054625.png)

- 进入系统管理->Manage and Assign Roles界面：

![image-20210915184216609](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915184216609.png)

![image-20210915184242961](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915184242961.png)

- 添加角色与权限的关系：

![image-20210915184813357](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915184813357.png)

- 给用户分配角色：

![image-20210915184857025](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210915184857025.png)

## 参考文章

[使用Jenkins一键打包部署SpringBoot应用，就是这么6！](https://juejin.cn/post/6844904022097264648)

