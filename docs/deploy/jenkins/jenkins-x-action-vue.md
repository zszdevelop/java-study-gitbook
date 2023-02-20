# Jenkins使用jenkinsfile部署前端Vue项目

## 1. 背景

jenkinsfile的文件通用性更强，可以方便的复制到各个项目

## 2. 创建任务

创建的时候选择：流水线

![image-20210919194741168](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210919194741168.png)

## 3. 部署文件jenkinsfile代码

在项目根目录下建：jenkinsfile文件

```sh
#!groovy

@Library('jenkinslib') _

def color = new org.devops.color()
def build = new org.devops.build()
def deploy = new org.devops.deploy()
def systemtime = new org.devops.systemtime()

def String isDeploy = "${env.isDeploy}"
//目标服务器ip和路径，根据实际情况修改
def String serverIp = '192.168.0.1'
def String targetPath = '/home/myproject'

//部署包的简称，根据实际情况修改
def artifactShortName = 'MY_WEB'
def String releaseVersion = "${env.releaseVersion}"

pipeline {
    agent {
        node {
            label 'master'
        }
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }
    triggers {
        cron 'H 22 * * *'
    }
    parameters {
        string defaultValue: '0.10.0', description: '请输入本次构建的前三段版本号', name: 'releaseVersion', trim: true
        choice choices: ['是', '否'], description: '是否要发布到服务器，默认发布', name: 'isDeploy'
    }
    environment {
            NODE_HOME = "/usr/local/node"
            SASS_BINARY_PATH = "/opt/linux-x64-72_binding.node"
            PATH = "$SASS_BINARY_PATH/bin:$PATH:$NODE_HOME/bin"
    }
    stages {
        stage('Mvn Build') {
             steps {
                            sh  '''npm install node-sass
            					npm install
            					#npm run build
                                npm run build:prod'''
                        }

        }
         stage('archive') {
                    steps {
                        script {
                            color.PrintMes('开始压缩', 'green')
                            currentTime = systemtime.GetSysTime('yyMMdd')
                            //部署包是jar还是war，以及路径要根据实际情况修改d
                            sh """ rm -rf archive"""
                            sh """ rm -rf *.tar.gz"""
                            sh """ mkdir archive """
                            sh """ tar -zcvf my_web.tar.gz bj_web """
                            sh """ cp -r my_web archive """
                            sh """ cp doc/版本更新说明.md archive """
                            sh """ rm -rf my_web """
                            sh """ tar -zcvf ${artifactShortName}-${releaseVersion}-${env.GIT_COMMIT.take(8)}-BETA-${currentTime}.tar.gz archive """
                            //根据实际情况修改制品路径和名称，这个是用来把包提取到jenkins页面，给测试下载的
                            archiveArtifacts '*.tar.gz'
                            currentBuild.description = "Start By ${env.BUILD_USER} And Build Success"

                        }
                    }
                }
        stage('Deploy App') {
            when {
                expression {
                    return (isDeploy == '是')
                }
            }
            steps {
                script {
                    color.PrintMes('自动发布','green')
                    deployCommand = """cd /faduit/zfba/ && rm -rf my_web && tar zxvf my_web.tar.gz """
                    deploy.Publish(serverIp, deployCommand, targetPath, 'my_web.tar.gz', '')
                }
            }
        }
    }
}

```

