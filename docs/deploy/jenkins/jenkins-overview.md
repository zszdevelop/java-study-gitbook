---
order: 10
category:
  - kenkins
---

# Jenkins详解

## 1. 简介

### 1.1 jenkins是什么?

Jenkins是一款开源持续集成(CI&CD ) 工具软件，用于自动化各种任务，包括构建、测试和部署软件。

- CI 持续集成: 是借助工具对软件项目进行持续的自动化的编译打包构建测试发布，来检查软件交付质量的一种行为。

- CD持续部署: 是基于持续交付的优势自动将经过测试的代码推入生产环境的过程。

> 将软件开发生命周期的整个过程都自动化，**从开发人员向代码库中提交代码开始，到将此代码投入生产环境中使用为止**。为了使整个软件开发流程处于 DevOps 模式或自动化模式，我们就需要对 CI/CD 流水线进行自动化。

![image-20220805153241027](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805153241027.png)

### 1.2 发展历史

- Jenkins的前身是Hudson，采用JAVA编写的持续集成开源工具。
- Hudson由Sun公司在2004年启动，第一个版本于2005年在java.net发布。
- 2007年开始Hudson逐渐取代CruiseControl和其他的开源构建工具的江湖地位。
- 在2008年的JavaOne大会上在开发者解决方案中获得杜克选择大奖（Duke’s Choice Award）。
- 在2010年11月期间，因为Oracle对Sun的收购带来了Hudson的所有权问题。主要的项目贡献者和Oracle之间， 尽管达成了很多协议，但有个关键问题就是商标名称“Hudson”。
- 甲骨文在2010年12月声明拥有该名称并申请商标的权利。因此，2011年1月11日，有人要求投票将项目名称从“Hudson”改为“Jenkins”。
- 2011年1月29日，该建议得到社区投票的批准，创建了Jenkins项目。
- 2011年2月1日，甲骨文表示，他们打算继续开发Hudson，并认为Jenkins只是一个分支，而不是重命名。因此，Jenkins和Hudson继续作为两个独立的项目，每个都认为对方是自己的分支。
- 到2013年12月，GitHub上的Jenkins拥有567个项目成员和约1,100个公共仓库，与此相对的Hudson有32个项目成员和17个公共仓库。到现在两者的差异更多，应该说Jenkins已经全面超越了Hudson。此外，大家可能是出于讨厌Oracle的情绪，作为Java开发者天然地应该支持和使用Jenkins。

### 1.3 持续集成(CI&CD ) 

## 2. 安装与配置

### 2.1 docker 中安装Jenkins

```bash
docker run -p 18080:8080 -p 50000:5000 --name jenkins \
-u root \
-v /Users/zsz/Project/docker/jenkins/jenkins_home:/var/jenkins_home \
-d jenkins/jenkins:lts
```

### 2.2 Jenkins 初始化配置

- 运行成功后访问该地址登录Jenkins，第一次登录需要输入管理员密码：

  访问：http://localhost:18080/

  ![image-20220718162800163](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718162800163.png)

- 查看登录默认密码

  1. /var/jenkins_home/secrets/initialAdminPassword 文件查看

  2. Jenkins 的启动日志中查看

     ```bash
     docker logs jenkins
     ```

     ![image-20220718164259903](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718164259903.png)

- 安装插件

  选择安装插件方式，这里我们直接安装推荐的插件：

  ![image-20220718163403228](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718163403228.png)

  进入插件安装界面，联网等待插件安装：

  ![image-20220718163528739](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718163528739.png)

- 安装完成后，创建管理员账号：

  ![image-20220718164407366](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718164407366.png)

- 进行实例配置，配置Jenkins的URL：

  ![image-20220718164430212](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718164430212.png)

- 点击系统管理->插件管理，进行一些自定义的插件安装：

  ![image-20220718164455056](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718164455056.png)

- 确保以下插件被正确安装：

  - 根据角色管理权限的插件：Role-based Authorization Strategy
  - 远程使用ssh的插件：SSH plugin

  ![image-20220718164526521](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718164526521.png)

### 2.3 角色权限管理

> 我们可以使用Jenkins的角色管理插件来管理Jenkins的用户，比如我们可以给管理员赋予所有权限，运维人员赋予执行任务的相关权限，其他人员只赋予查看权限。

- 在系统管理->全局安全配置中启用基于角色的权限管理：

![image-20210915173908996](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915173908996.png)

![image-20210915184054625](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915184054625.png)

- 进入系统管理->Manage and Assign Roles界面：

![image-20210915184216609](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915184216609.png)

![image-20210915184242961](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915184242961.png)

- 添加角色与权限的关系：

![image-20210915184813357](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915184813357.png)

- 给用户分配角色：

![image-20210915184857025](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915184857025.png)



### 2.4 凭据管理

凭证（cridential）是Jenkins进行受限操作时的凭据。

- 比如使用SSH登录远程机器时，用户名和密码或SSH key就是凭证。
- 拉取git代码时，git的用户名和密码 就是凭证

而这些凭证不可能以明文写在Jenkinsfile中。**Jenkins凭证管理指的就是对这些凭证进行管理**。

#### 2.4.1 查看凭据

- 凭据-> 系统-> 全局凭据

  ![image-20220719162249565](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719162249565.png)

#### 2.4.2  新建凭据

在点击【添加凭据】，类型选择【Username with password】，将gitlab的用户名 密码分别添加至【用户名】【密码】一栏，ID一栏自行定夺，可以写一个有含义的便于分辨的ID , 点击【确定】即可。

![image-20220719162332282](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719162332282.png)





#### 2.4.3  更新凭据

![image-20220719164250279](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719164250279.png)

#### 2.4.4 删除凭据

![image-20220719164322687](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719164322687.png)

### 2.5 构建工具集成

Jenkins调用这些工具的方式是通过环境变量调用。有两种方式 

- 一种是在Jenkins系统配置中添加构建工具的环境变量
- 一种是直接在Jenkinsfile中定义



#### 2.4.1 集成maven

- 通过系统管理->全局工具配置来进行全局工具的配置，比如maven的配置：

  ![image-20220719171244730](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719171244730.png)

- 新增maven的安装配置：

  ![image-20220718164627533](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718164627533.png)

#### 2.4.2 集成node

1. 安装node插件

![image-20220719171421702](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719171421702.png)

2. 配置node

![image-20220719171832103](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719171832103.png)

## 3. 构建项目

项目构建流程：拉取代码->编译->打包->部署

### 3.1 构建类型

Jenkins中自动构建项目的类型有很多，常用的

- 自由风格软件项目（ FreeStyle Project）
- 构建maven项目
- 流水线项目（ Pipeline Project）
- 多分支流水线

![image-20220804163341844](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804163341844.png)

>每种类型的构建其实都可以完成一样的构建过程与结果，只是在操作方式、灵活度等方面有所区别，在实际开发中可以根据自己的需求和习惯来选择。

## 4. 构建 - 自由风格项目构建

### 4.1 General （基础配置）

项目基本配置
项目名字,描述,参数,禁用项目,并发构建,限制构建默认node等

>- Description： 项目描述信息
>- **Discard old builds** ：丢弃旧的构建
>  - Days to keep builds： 保持构建的天数
>  - Max # of builds to keep： 保持构建的最大个数
>- **This project is parameterized**：参数化构建过来
>  - 是否需要部署到测试环境
>  - 打包的版本号
>- JDK:  指定JDK 的版本

![image-20220804163554777](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804163554777.png)

### 4.2 Source Code Management（源码管理）

代码库信息,支持git 和 svn 等

![image-20220804163653770](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804163653770.png)

### 4.3 Build Triggers （构建触发器）

构建触发方式
周期性构建,poll scm,远程脚本触发构建,其他项目构建结束后触发等

>- Trigger builds remotely (e.g., from scripts) ：触发远程构建 (例如,使用脚本)
>
>- Build after other projects are built：其他工程构建后触发
>
>- **Build periodically**：定时构建
>
> - GitHub hook trigger for GITScm polling：git 提交后立马构建
>
>- Gitlab Merge Requests Builder：git 合并请求后构建
>
>- 轮询 SCM

![image-20220720174622820](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220720174622820.png)

### 4.4 Build Environment (构建环境)

构建环境相关设置
构建前删除workspace,向Console输出添加时间戳,设置构建名称,插入环境变量等

>- Delete workspace before build starts：在构建开始之前删除工作区
>- Use secret text(s) or file(s)： 使用秘密文本或文件
>- Send files or execute commands over SSH before the build starts：在构建开始之前，通过SSH发送文件或执行命令
>- Send files or execute commands over SSH after the build runs：生成运行后，通过SSH发送文件或执行命令
>- Provide Configuration files：提供配置文件
>- Add timestamps to the Console Output：将时间戳添加到控制台输出
>- Inspect build log for published Gradle build scans：检查已发布的Gradle构建扫描的构建日志
>- Provide Node & npm bin/ folder to PATH：向路径提供节点和npm bin/文件夹
>- Terminate a build if it's stuck：如果构建卡住了，请终止它
>- With Ant

![image-20220802164409193](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802164409193.png)

### 4.5 Build (构建)

项目构建任务

添加1个或者多个构建步骤

>- **Execute shell** : 执行shell脚本
>
>  >使用shell 最方便，相当于在终端，想执行什么命令执行什么
>
>- Execute NodeJS script：执行NodeJS脚本
>
>- Invoke Gradle script：调用Gradle脚本
>
>- Get linked maven deployments：获取链接maven部署

![image-20220804164222858](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804164222858.png)

### 4.6 Post-build Actions (构建后操作)

构建后行为
Artifact归档,邮件通知,发布单元测试报告,触发下游项目等

>- Post-build Actions：归档成品
>- Build other projects： 构建其他工程
>- E-mail Notification : 邮件通知
>- Send build artifacts over SSH ： 通过SSH发送构建工件
>- Aggregate downstream test results:  汇总测试结果
>- Publish JUnit test result report：发布JUnit测试结果报告

![image-20220804164405332](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804164405332.png)

## 5. 构建 - maven项目

拉取代码和远程部署的过程和自由风格项目一样，只是"构建"部分不同。

默认配置好了maven 环境

![image-20220804170018918](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804170018918.png)

## 6. 构建 - 流水线项目（ Pipeline Project）

Pipeline，就是一套运行于Jenkins上的**工作流框架**，**将原本独立运行于单个或者多个节点的任务连接起来**，实现单个任务难以完成的复杂流程编排与可视化。

### 6.1 使用Pipeline有什么好处：

- 更好的版本化：将pipeline提交到版本库中进行版本控制
- 更好地协作：pipeline的每次修改对所有人都是可见的。除此之外，还可以对pipeline进行代码审查
- 更好的重用性：手动操作没法重用，但是代码可以重用

### 6.2 如何创建 Jenkins Pipeline呢

- Pipeline 脚本是由 Groovy 语言实现的，但是我们没必要单独去学习 Groovy

- Pipeline 支持两种语法：Declarative(声明式)和 Scripted Pipeline(脚本式)语法

- Pipeline 也有两种创建方法：
  - 可以直接在 Jenkins 的 Web UI 界面中输入脚本；
  - 也可以通过创建一个 **Jenkinsfile 脚本文件放入项目源码库中**（一般我们都推荐在 Jenkins 中直接从源代码控制(SCM)中直接载入 Jenkinsfile Pipeline 这种方法）
  

### 6.3 三个核心概念

Pipeline 语法基础主要分为3个部分

#### 6.3.1 node/agent(节点)

节点。指定节点执行该 Pipeline，即我们可以指定加入 Jenkins 管理的节点去执行

```groovy
agent {
        node {
            label 'master'
        }
    }
```

#### 6.3.2 Stage (阶段)

阶段。在整个Pipeline 中，一个 stage 块定义了任务执行的不同的阶段，如构建、测试和部署阶段。

```groovy
pipeline{
    agent any
    stages{
        stage("build"){
            //steps  
        }
        
        stage("test"){
           //step
        }
      
        stage("deploy"){
           //step
        }
    
    }

}
```

#### 6.3.3 **Step(步骤)**

Step：步骤，step是每个阶段中要执行的每个步骤。**Step是最基本的操作单元**，小到创建一个目录，大到构建一个Docker镜像，由各类Jenklins Plugin提供，例如：sh ‘make’

```groovy
pipeline{
    agent any
    stages{
        stage("GetCode"){
            steps{ 
                sh "ls "    //step
            }
        
        }    
    }
}
```

### 6.4 Pipeline的基础语法

#### 6.4.1 agent 代理

节点。指定节点执行该 Pipeline，即我们可以指定加入 Jenkins 管理的节点去执行

```groovy
agent { node { label 'labelname' }}
aget { label ' labelname '}
```

参数：

- any 在任何可用的节点上执行pipeline。none 没有指定agent的时候默认。
- label 在指定标签上的节点上运行Pipeline。 node 允许额外的选项(自定义workspace)。

#### 6.4.2 post 之后操作

当流水线完成后根据完成的状态做一些任务。例如：构建失败后邮件通知

```groovy
post { 
    always { 
        echo 'I will always say Hello again!'
    }

    failure{
        email : xxxx@dxx.com
    }
}
```

常用的状态：

- always 无论流水线或者阶段的完成状态。
- changed 只有当流水线或者阶段完成状态与之前不同时。
- failure 只有当流水线或者阶段状态为"failure"运行。
- success 只有当流水线或者阶段状态为"success"运行。
- unstable 只有当流水线或者阶段状态为"unstable"运行。例如：测试失败。
- aborted 只有当流水线或者阶段状态为"aborted "运行。例如：手动取消。

#### 6.4.3 stages 阶段组

`stages`是流水线的整个运行阶段，包含一个或多个 `stage` , 建议 `stages` 至少包含一个 `stage`。,比如构建, 测试, 和部署。

```groovy
pipeline{
    agent any
    stages{
        stage("build"){
            //steps  
        }
        
        stage("test"){
           //step
        }
      
        stage("deploy"){
           //step
        }
    
    }

}
```

#### 6.4.4 steps 步骤组

steps位于stage指令块内部，包括一个或多个step。仅有一个step的情况下可以忽略关键字step及其{}

```groovy
pipeline {
    agent any
    stages {
        stage('Example') {
            steps { 
                echo 'Hello World'
            }
        }
    }
}
```

#### 6.4.5 environment 环境变量

定义流水线环境变量，可以定义在全局变量或者步骤中的局部变量。这取决于 environment 指令在流水线内的位置。

```groovy
agent any

//全局变量
environment { 
    activeEnv = 'dev'
}
stages {
    stage('Example') {

        //局部变量
        environment { 
            AN_ACCESS_KEY = credentials('my-prefined-secret-text') 
        }
        steps {
            sh 'printenv'
        }
    }
}
```

#### 6.4.6 options运行选项

定义流水线运行时的配置选项，流水线提供了许多选项, 比如buildDiscarder（构建丢弃）,但也可以由插件提供, 比如 timestamps。

```groovy
pipeline {
    agent any
    options {
      	// 保留最多10次的构建
        buildDiscarder(logRotator(numToKeepStr: '10'))
      	// 不允许同时执行流水线。 可被用来防止同时访问共享资源等。
        disableConcurrentBuilds()
    }
    stages {
        stage('Example') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
```

其他部分参数：

- buildDiscarder: 为最近的流水线运行的特定数量保存组件和控制台输出。
- disableConcurrentBuilds: 不允许同时执行流水线。 可被用来防止同时访问共享资源等。
- overrideIndexTriggers: 允许覆盖分支索引触发器的默认处理。
- skipDefaultCheckout: 在agent 指令中，跳过从源代码控制中检出代码的默认情况。
- skipStagesAfterUnstable: 一旦构建状态变得UNSTABLE，跳过该阶段。
- checkoutToSubdirectory: 在工作空间的子目录中自动地执行源代码控制检出。
- timeout: 设置流水线运行的超时时间, 在此之后，Jenkins将中止流水线。
- retry: 在失败时, 重新尝试整个流水线的指定次数。
- timestamps 预测所有由流水线生成的控制台输出，与该流水线发出的时间一致。

#### 6.4.7 parameters 参数

为流水线运行时设置项目相关的参数，就不用在UI界面上定义了，比较方便。

- string 字符串类型的参数, 例如:

  ```groovy
  parameters { string defaultValue: '1.0.0', description: '请输入本次构建的前三段版本号', name: 'releaseVersion', trim: true }
  ```

- choices 选择

  ```groovy
  choice choices: ['是', '否'], description: '是否要发布到服务器，默认发布', name: 'isDeploy'
  ```

- booleanParam 布尔参数, 例如:

  ```groovy
  parameters { booleanParam(name: 'DEBUG_BUILD', defaultValue: true, description: '') }
  ```

#### 6.4.8 triggers 构建触发器

triggers 不是必须的 定义pipeline被自动触发的方式选项 cron、pollSCM、upstream

- cron 计划任务定期执行构建。

  ```groovy
  triggers { cron('H */4 * * 1-5') }
  ```

- pollSCM 与cron定义类似，但是由jenkins定期检测源码变化。

  ```groovy
  triggers { pollSCM('H */4 * * 1-5') }
  ```

- upstream 接受逗号分隔的工作字符串和阈值。 当字符串中的任何作业以最小阈值结束时，流水线被重新触发。

  ```groovy
  triggers { upstream(upstreamProjects: 'job1,job2', threshold: hudson.model.Result.SUCCESS) }
  ```

- 示例

  ```groovy
  pipeline {
      agent any
      triggers {
          cron('H */4 * * 1-5')
      }
      stages {
          stage('Example') {
              steps {
                  echo 'Hello World'
              }
          }
      }
  }
  ```

#### 6.4.9 tool 构建工具

获取通过自动安装或手动放置工具的环境变量。支持maven/jdk/gradle。工具的名称必须在系统设置->全局工具配置中定义。

示例:

```groovy
pipeline {
    agent any
    tools {
        maven 'apache-maven-3.0.1' 
    }
    stages {
        stage('Example') {
            steps {
                sh 'mvn --version'
            }
        }
    }
}
```

#### 6.4.10 input 交互输入

input用户在执行各个阶段的时候，由人工确认是否继续进行。

```groovy
agent any
stages {
    stage('Example') {
        input {
            message "Should we continue?"
            ok "Yes, we should."
            submitter "alice,bob"
            parameters {
                string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
            }
        }
        steps {
            echo "Hello, ${PERSON}, nice to meet you."
        }
    }
}
```

参数解释：

- message 呈现给用户的提示信息。
- id 可选，默认为stage名称。
- ok 默认表单上的ok文本。
- submitter 可选的,以逗号分隔的用户列表或允许提交的外部组名。默认允许任何用户。
- submitterParameter 环境变量的可选名称。如果存在，用submitter 名称设置。
- parameters 提示提交者提供的一个可选的参数列表。

#### 6.4.11 when条件判断

when 指令允许流水线根据给定的条件决定是否应该执行阶段。 when 指令必须包含至少一个条件。

```groovy
//branch: 当正在构建的分支与模式给定的分支匹配时，执行这个阶段,这只适用于多分支流水线例如:
when { branch 'master' }


//environment: 当指定的环境变量是给定的值时，执行这个步骤,例如:
when { environment name: 'DEPLOY_TO', value: 'production' }

//expression 当指定的Groovy表达式评估为true时，执行这个阶段, 例如:
when { expression { return params.DEBUG_BUILD } }

//not 当嵌套条件是错误时，执行这个阶段,必须包含一个条件，例如:
when { not { branch 'master' } }

//allOf 当所有的嵌套条件都正确时，执行这个阶段,必须包含至少一个条件，例如:
when { allOf { branch 'master'; environment name: 'DEPLOY_TO', value: 'production' } }

//anyOf 当至少有一个嵌套条件为真时，执行这个阶段,必须包含至少一个条件，例如:
when { anyOf { branch 'master'; branch 'staging' } }


stage('Example Deploy') {
    when {
        branch 'production'
        environment name: 'DEPLOY_TO', value: 'production'
    }
    steps {
        echo 'Deploying'
    }
}
```

## 7. 构建 - 多分支流水线

多分支流水线和流水线语法一致，只不过会把所有源码分支列出来

![image-20220805151532567](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805151532567.png)

### 7.1 常见问题

#### 7.1.1 看不到新分支

![image-20220805152030804](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805152030804.png)

#### 7.1.2 分支太多如何过滤

![image-20220805152242844](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805152242844.png)







## 参考文章

[jenkins官方文档](https://www.jenkins.io/zh/doc/)

[Jenkins简介与应用](https://www.k8stech.net/jenkins-docs/basics/introduction/)

[Jenkins实践文档](https://github.com/zeyangli/Jenkinsdocs)

[mafeifan 的jenkins](https://www.mafeifan.com/DevOps/Jenkins/Jenkins2-%E5%AD%A6%E4%B9%A0%E7%B3%BB%E5%88%971----%E4%BD%BF%E7%94%A8Docker%E6%96%B9%E5%BC%8F%E5%AE%89%E8%A3%85%E6%9C%80%E6%96%B0%E7%89%88Jenkins.html)

[JenkinsPipeline介绍](https://java.isture.com/software/jenkins/base/JenkinsPipeline%E4%BB%8B%E7%BB%8D.html)
