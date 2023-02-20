# Jenkins使用jenkinsfile部署springboot项目

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
def artifactShortName = 'MYAPP_SERVER'
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
    stages {
        stage('Mvn Build') {
            steps {
                script {
                    color.PrintMes('开始打包', 'green')
                    build.Build('mvn', 'mvn clean package', 'master')
                    //默认为jdk8
                }
            }
//            post {
//                success {
//                    wrap([$class: 'BuildUser']) {
//                        script {
//                            currentTime = systemtime.GetSysTime('yyMMdd')
//                            //部署包是jar还是war，以及路径要根据实际情况修改
//                            sh """cd my-admin/target
//                                cp my-admin.jar ${artifactShortName}-${releaseVersion}-${env.GIT_COMMIT.take(8)}-BETA-${currentTime}.jar
//                            """
//                            //根据实际情况修改制品路径和名称，这个是用来把包提取到jenkins页面，给测试下载的
//                            archiveArtifacts 'my-admin/target/*.jar'
//                            currentBuild.description = "Start By ${env.BUILD_USER} And Build Success"
//                        }
//                    }
//                }
//            }
        }
        stage('archive') {
            steps {
                script {
                    color.PrintMes('开始压缩', 'green')
                    currentTime = systemtime.GetSysTime('yyMMdd')
                    //部署包是jar还是war，以及路径要根据实际情况修改
                    sh """ rm -rf archive"""
                    sh """ mkdir archive """
                    sh """ cp my-admin/target/*.jar archive """
                    sh """ cp doc/版本更新说明.md archive """
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
                    color.PrintMes('自动发布', 'green')
                    deployCommand = """cd /home/myproject/ && sh deploy.sh restart"""
                    deploy.Publish(serverIp, deployCommand, targetPath, 'my-admin/target/my-admin.jar', 'my-admin/target')
                }
            }
        }
    }
}

```

## 4. 项目启动脚本

```sh
#!/bin/sh
# author ygn
# ./deploy.sh start 启动
# ./deploy.sh stop 停止
# ./deploy.sh restart 重启
# ./deploy.sh status 状态
AppName=my-admin.jar

# JVM参数
JVM_OPTS="-Dname=$AppName  -Duser.timezone=Asia/Shanghai -Xms512M -Xmx512M -XX:PermSize=256M -XX:MaxPermSize=512M -XX:+HeapDumpOnOutOfMemoryError -XX:+PrintGCDateStamps  -XX:+PrintGCDetails -XX:NewRatio=1 -XX:SurvivorRatio=30 -XX:+UseParallelGC -XX:+UseParallelOldGC"
APP_HOME=`pwd`
LOG_PATH=$APP_HOME/logs/$AppName.log

if [ "$1" = "" ];
then
    echo -e "\033[0;31m 未输入操作名 \033[0m  \033[0;34m {start|stop|restart|status} \033[0m"
    exit 1
fi

if [ "$AppName" = "" ];
then
    echo -e "\033[0;31m 未输入应用名 \033[0m"
    exit 1
fi

function start()
{
    PID=`ps -ef |grep java|grep $AppName|grep -v grep|awk '{print $2}'`

	if [ x"$PID" != x"" ]; then
	    echo "$AppName is running..."
	else
	  echo "启动完整命令： nohup java -jar  $JVM_OPTS $AppName --spring.profiles.active=prod > /dev/null 2>&1 &"
		nohup java -jar  $JVM_OPTS $AppName --spring.profiles.active=prod > /dev/null 2>&1 &
		sleep 5
		status
	fi
}

function stop()
{
    echo "Stop $AppName"
	
	PID=""
	query(){
		PID=`ps -ef |grep java|grep $AppName|grep -v grep|awk '{print $2}'`
	}

	query
	if [ x"$PID" != x"" ]; then
		kill -TERM $PID
		echo "$AppName (pid:$PID) exiting..."
		while [ x"$PID" != x"" ]
		do
			sleep 1
			query
		done
		echo "$AppName exited."
	else
		echo "$AppName already stopped."
	fi
}

function restart()
{
    stop
    sleep 2
    start
}

function status()
{
    PID=`ps -ef |grep java|grep $AppName|grep -v grep|wc -l`
    if [ $PID != 0 ];then
        echo "$AppName is running..."
    else
        echo "$AppName is not running..."
    fi
}

case $1 in
    start)
    start;;
    stop)
    stop;;
    restart)
    restart;;
    status)
    status;;
    *)

esac

```

