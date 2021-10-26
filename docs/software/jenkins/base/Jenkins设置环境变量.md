# Jenkins设置环境变量

## 1. 简介

## 2. 配置环境变量

### 2.1 配置 JDK

在“全局工具配置中（Global Tool Configuration）”找到

![image-20211001125528711](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211001125528711.png)

![image-20211001125611235](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211001125611235.png)

选择要安装的JDK版本

![image-20211001125716055](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211001125716055.png)

需要输入oracle 的账户密码

### 2.2 配置Maven

在“全局工具配置中（Global Tool Configuration）”找到maven设置

![image-20211001130133461](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211001130133461.png)

## 3. 建立Jenkinsfile

在Jenkinsfile中作如下设置。

```
pipeline{

    agent any

    tools{

        maven 'mvn-3.6.3'

    }

    stages{

        stage('Build'){

            steps {

                bat "mvn -v"

                echo "Finsh installMaven"

            }

         }

    }

}
```

注意，这里maven 'mvn3.6.3'中的mvn-3.6.3必须与图3中设置得一致。

## 参考文章

[利用Jenkins pipeline配置测试工具](https://cloud.tencent.com/developer/article/1586700)

