# Jenkins Pipeline 介绍

## 1. 简介

Pipeline，就是一套运行于Jenkins上的工作流框架，**将原本独立运行于单个或者多个节点的任务连接起来**，实现单个任务难以完成的复杂流程编排与可视化。

- Pipeline是Jenkins的核心功能，提供一组可扩展的工具。
- 通过Pipeline 的DSL语法可以完成从简单到复杂的交付流水线实现。
- jenkins的Pipeline是通过Jenkinsfile（文本文件）来实现的。
- 这个文件可以定义Jenkins的执行步骤，例如检出代码。

### 1.1 Jenkinsfile 

- Jenkinsfile使用两种语法进行编写，分别是声明式和脚本式。
  - 我们大部分使用声明式
- 声明式和脚本式的流水线从根本上是不同的。
- 声明式是jenkins流水线更友好的特性。
- 脚本式的流水线语法，提供更丰富的语法特性。
- 声明式流水线使编写和读取流水线代码更容易设计。

## 2. 概念介绍

### 2.1 node/agent(节点)

节点是一个机器，可以是Jenkins的master节点也可以是slave节点。通过node指定当前job运行的机器

```groovy
agent {
        node {
            label 'master'
        }
    }
```

### 2.2 Stage阶段

Stage阶段，stage定义了在整个流水线的执行任务的概念性的不同的阶段。**一个Pipeline可以划分成若干个Stage，每个Stage代表一组操作**，例如：“Build”，“Test”，“Deploy”。

>注意，Stage是一个逻辑分组的概念，可以跨多个Node

```groovy
pipeline{
    agent any
    stages{
        stage("GetCode"){
            //steps  
        }
        
        stage("build"){
           //step
        }
    
    }

}
```



### 2.3 **Step：步骤**

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



## 3. Pipeline的基础语法

### 3.1 agent (代理/节点)

必须存在，agent必须在pipeline块内的顶层定义，但stage内是否使用使可选的

- 参数：
  - any 在任何可用的节点上执行pipeline。
  - none 没有指定agent的时候默认。
  - label 在指定标签上的节点上运行Pipeline。
  - node 允许额外的选项。
- 常用选项 label/cuetomWorkspace/reuseNode

示例：

```groovy
agent { label 'my-label' }

agent {
    node {
        label 'my-label'
        customWorkspace '/some/other/path'
    }
}

agent {
    docker {
        image 'nginx:1.12.2'
        label 'my-label'
        args '-v /tmp:/tmp'
    }
}
```

### 3.2 post 之后操作

post 不是必须的，用于pipeline的最外层或者stage{}中

定义一个或多个steps ，这些阶段根据流水线或阶段的完成情况而 运行(取决于流水线中`post`部分的位置). post 支持以下 post-condition 块中的其中之一: always, changed, failure, success, unstable, 和 aborted。这些条件块允许在 post 部分的步骤的执行取决于流水线或阶段的完成状态。

- always 无论流水线或者阶段的完成状态。
- changed 只有当流水线或者阶段完成状态与之前不同时。
- failure 只有当流水线或者阶段状态为"failure"运行。
- success 只有当流水线或者阶段状态为"success"运行。
- unstable 只有当流水线或者阶段状态为"unstable"运行。例如：测试失败。
- aborted 只有当流水线或者阶段状态为"aborted "运行。例如：手动取消。

```groovy
pipeline {
    agent any
    stages {
        stage('Example'){
            steps {
            echo 'Hello world'
            }
        }
    }
    post {
        always {
            echo 'say goodbay'
        }
    }
}
```

### 3.3 stages 阶段组

stages 必须，包括顺序执行的一个或多个stage命令， 建议 stages 至少包含一个 stage 指令用于连续交付过程的每个离散部分,比如构建, 测试, 和部署。

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



### 3.4 steps 步骤组

steps 必须，steps位于stage指令块内部，包括一个或多个step。仅有一个step的情况下可以忽略关键字step及其{}

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



### 3.5 environment 环境

environment 不是必须的，environment定义了一组全局的环境变量键值对，存在于pipeline{}或者stage指令内。执行特殊方法credentials()可以获取jenkins中预定义的凭证明文内容

```groovy
pipeline {
    agent any
    environment { 
        CC = 'clang'
    }
    stages {
        stage('Example') {
            environment { 
                AN_ACCESS_KEY = credentials('my-prefined-secret-text') 
            }
            steps {
                sh 'printenv'
            }
        }
    }
}
```

### 3.6 options 可选性

options 不是必须的 

options 指令允许从流水线内部配置特定于流水线的选项。 流水线提供了许多这样的选项, 比如`buildDiscarder`,但也可以由插件提供, 比如 timestamps。

- buildDiscarder: 为最近的流水线运行的特定数量保存组件和控制台输出。
- disableConcurrentBuilds: 不允许同时执行流水线。 可被用来防止同时访问共享资源等。
- overrideIndexTriggers: 允许覆盖分支索引触发器的默认处理。
- skipDefaultCheckout: 在`agent` 指令中，跳过从源代码控制中检出代码的默认情况。
- skipStagesAfterUnstable: 一旦构建状态变得UNSTABLE，跳过该阶段。
- checkoutToSubdirectory: 在工作空间的子目录中自动地执行源代码控制检出。
- timeout: 设置流水线运行的超时时间, 在此之后，Jenkins将中止流水线。
- retry: 在失败时, 重新尝试整个流水线的指定次数。
- timestamps 预测所有由流水线生成的控制台输出，与该流水线发出的时间一致。

```groovy
//指定一个小时的全局执行超时, 在此之后，Jenkins将中止流水线运行。
pipeline {
    agent any
    options {
        timeout(time: 1, unit: 'HOURS') 
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

### 3.7 parameters 参数

parameters 不是必须的

为流水线运行时设置项目相关的参数

booleanParam,choice,file,text,password,run,string

- string 字符串类型的参数, 例如:

  ```groovy
  parameters { string(name: 'DEPLOY_ENV', defaultValue: 'staging', description: '') }
  ```

- booleanParam 布尔参数, 例如:

  ```groovy
  parameters { booleanParam(name: 'DEBUG_BUILD', defaultValue: true, description: '') }
  ```

- choices 选择

  ```groovy
  choice choices: ['是', '否'], description: '是否要发布到服务器，默认发布', name: 'isDeploy'
  ```

- 示例
  - 不定义变量

    ```groovy
    pipeline {
        agent any
        parameters {
            string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
        }
        stages {
            stage('Example') {
                steps {
                    echo "Hello ${params.PERSON}"
                }
            }
        }
    }
    
    ```

  - 定义成变量

    ```groovy
    paramenters {
        		 string defaultValue: '1.1.0', description: '请输入本次构建的前三段版本号', name: 'releaseVersion', trim: true
            choice choices: ['是', '否'], description: '是否要发布到服务器，默认发布', name: 'isDeploy'
    }
    stage('Deploy App') {
                when {
                    expression {
                        return (isDeploy == '是')
                    }
                }
      ...
      }
    ```

### 3.8 triggers 构建触发器

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

### 3.9 tool

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

### 3.10 input

input用户在执行各个阶段的时候，由人工确认是否继续进行。

- message 呈现给用户的提示信息。
- id 可选，默认为stage名称。
- ok 默认表单上的ok文本。
- submitter 可选的,以逗号分隔的用户列表或允许提交的外部组名。默认允许任何用户。
- submitterParameter 环境变量的可选名称。如果存在，用`submitter` 名称设置。
- parameters 提示提交者提供的一个可选的参数列表。

示例：

```groovy
pipeline {
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
}

```



## 4. 创建第一个pipeline

### 4.1 新建 选择pipeline 填写Job 的名字

![image-20210918223955810](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210918223955810.png)

### 4.2 填写相应的pipeline script

```groovy
pipeline{
    agent any
    stages {
        stage('Build') {
            steps{
                echo 'This is a build step' 
            }
        }
        stage('Test') {
            steps{
                echo 'This is a test step'  
            }
        }
        stage('Deploy') {
            steps{
                echo 'This is a deploy step'    
            }
        }
    }
}
```

![image-20210918224136661](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210918224136661.png)

注意这：如果使用SCM 就会从代码中获取

![image-20210918224201903](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210918224201903.png)

### 4.3 保存之后，立即构建

![image-20210918224255875](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210918224255875.png)

## 5. 变量的传递

### 5.1 自定义变量（局部）

```
def username = 'Jenkins'
echo "Hello Mr.${username}"
#注意一定要用双引号，单引号识别为字符串
```

### 5.2 环境变量（局部）

```
withEnv(['MYTOOL_HOME=/usr/local/mytool']){
    sh '$MYTOOL_HOME/bin/start'
}
```

### 5.3 环境变量（全局）

```
environment {CC='clang'}
echo "Compiler is ${env.CC}"
```

### 5.4 参数化构建（全局）

```
parameters {string(name:'Jenkins',defaultValue:'Hello',description:'How should I greet the world')}
ehco "${params.Greeting} World!"
```

## 6. 判断语句

### 6.1 判断

when仅用于stage内部

when 指令允许流水线根据给定的条件决定是否应该执行阶段。 when 指令必须包含至少一个条件。 如果`when` 指令包含多个条件, 所有的子条件必须返回True，阶段才能执行。 这与子条件在 allOf 条件下嵌套的情况相同。

when的内置条件为：

 - branch: 当正在构建的分支与模式给定的分支匹配时，执行这个阶段,这只适用于多分支流水线例如:

   ```groovy
   when {branch 'master'}
   ```

 - environment: 当指定的环境变量是给定的值时，执行这个步骤,例如:

  ```groovy
  when { environment name: 'DEPLOY_TO', value: 'production' }
  ```

 - expression 当指定的Groovy表达式评估为true时，执行这个阶段, 例如:

  ```
  when { expression { return params.DEBUG_BUILD } }
  ```

- not 当嵌套条件是错误时，执行这个阶段,必须包含一个条件，例如:

```groovy
when { not { branch 'master' } }
```

- allOf 当所有的嵌套条件都正确时，执行这个阶段,必须包含至少一个条件，例如:

```groovy
when { allOf { branch 'master'; environment name: 'DEPLOY_TO', value: 'production' } }
```

- anyOf 当至少有一个嵌套条件为真时，执行这个阶段,必须包含至少一个条件，例如:

```groovy
when { anyOf { branch 'master'; branch 'staging' } }
```

示例：

```groovy
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                branch 'production'
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

```groovy
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                branch 'production'
                environment name: 'DEPLOY_TO', value: 'production'
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

```groovy
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                allOf {
                    branch 'production'
                    environment name: 'DEPLOY_TO', value: 'production'
                }
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

```groovy
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                branch 'production'
                anyOf {
                    environment name: 'DEPLOY_TO', value: 'production'
                    environment name: 'DEPLOY_TO', value: 'staging'
                }
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}

```

```groovy
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                expression { BRANCH_NAME ==~ /(production|staging)/ }
                anyOf {
                    environment name: 'DEPLOY_TO', value: 'production'
                    environment name: 'DEPLOY_TO', value: 'staging'
                }
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

```groovy
pipeline {
    agent none
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            agent {
                label "some-label"
            }
            when {
                beforeAgent true
                branch 'production'
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}

```



### 6.2 判断和异常处理

流程控制if/else条件

```sh
node {
    stage('Example'){
        if(env.BRANCH_NAME == 'master'){
            echo 'I only execute on the master branch'
        }else {
            echo 'Iexecute elsewhere'
        }
    }
}

```

### 6.3 异常处理try/catch/finally

```groovy
node{
    stage('Example'){
        try{
            sh 'exit 1'
        }
        catch (exc) {
            echo 'something failed,I should sound the klaxons!'
            throw
        }
    }
}
```

### 6.4 循环

for循环仅存在域脚本式pipeline中，但是可以通过在声明式pipeline中调用script step来执行

```groovy
pipeline {
    agent any
    stages {
        stage('Example'){
            steps{
                echo 'Hello world!'
                script {
                    def browsers = ['chrome','firefox']
                    for (int i = 0;i < browers.size();++i){
                        echo "Testing the ${browsers[i]} browser"
                    }
                }
            }
        }
    }
}
```

## 7. step步骤

### 7.1 script

script 步骤需要 [scripted-pipeline]块并在声明式流水线中执行。对于大多数用例来说,应该声明式流水线中的“脚本”步骤是不必要的，但是它可以提供一个有用的"逃生出口"。非平凡的规模和/或复杂性的`script`块应该被转移到 共享库 。

示例：

```groovy
pipeline {
    agent any
    stages {
        stage('Example') {
            steps {
                echo 'Hello World'

                script {
                    def browsers = ['chrome', 'firefox']
                    for (int i = 0; i < browsers.size(); ++i) {
                        echo "Testing the ${browsers[i]} browser"
                    }
                }
            }
        }
    }
}
```



## 参考文章

[玩转Jenkins Pipeline](https://blog.csdn.net/diantun00/article/details/81075007)

[第五章 流水线实践-Pipeline语法](https://github.com/zeyangli/Jenkinsdocs/blob/master/chapter/%E7%AC%AC%E5%8D%81%E7%AB%A0-%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%AE%9E%E8%B7%B5(%E4%BA%8C).md)

