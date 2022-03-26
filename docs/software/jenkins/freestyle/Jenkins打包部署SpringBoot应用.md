# Jenkins打包部署SpringBoot应用

>跟原文的主要区别是，他用docker部署，我是传统的文件上传形式，命令执行

## 1. 准备项目

> 这里我们使用`mall-learning`项目中的`mall-tiny-jenkins`模块代码来演示下如何使Jenkins一键打包部署SpringBoot应用。

- `mall-tiny-jenkins`项目源码地址：[github.com/macrozheng/…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmacrozheng%2Fmall-learning%2Ftree%2Fmaster%2Fmall-tiny-jenkins)

- 将mall-tiny-jenkins 上传到我们自己的gitlab 或者github 等

- 上传完成后Gitlab中的展示效果如下：

  我这里简单上传到gitee 做测试

![image-20210915191550138](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915191550138.png)

## 2. 补充插件 Publish Over SSH

### 2.1 背景

我们经常需要打包完后，将文件上传到服务器。但是

Jenkins配置任务默认是无 send files execute commands over SSH 的。

### 2.2 解决

安装插件 Publish Over SSH

![image-20210915201704009](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915201704009.png)

### 2.3 配置 SSH Servers

![image-20210915202547951](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915202547951.png)

最下面设置

![image-20210915202923163](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915202923163.png)

### 2.4  测试连接

![image-20210915204217543](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915204217543.png)

## 3. 脚本设置

新建脚本 deploy.sh

```sh
#!/bin/sh
# author ygn
# ./deploy.sh start 启动
# ./deploy.sh stop 停止
# ./deploy.sh restart 重启
# ./deploy.sh status 状态
AppName=mall-tiny-jenkins-1.0-SNAPSHOT.jar

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
	  echo "启动完整命令： nohup java -jar  $JVM_OPTS $AppName  > /dev/null 2>&1 &"
		nohup java -jar  $JVM_OPTS $AppName > /dev/null 2>&1 &
		echo "Start $AppName success..."
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



## 4. 在Jenkins中创建执行任务

### 4.1 创建新任务

- 首先我们需要新建一个任务：

  ![image-20210915192136448](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915192136448.png)

- 设置任务名称后选择构建一个自由风格的软件项目：

![image-20210915192225320](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915192225320.png)

### 4.2 配置仓库地址

- 然后在源码管理中添加我们的git仓库地址：https://gitee.com/zszdevelop/mall-tiny-jenkins.git

  ![image-20210915194454588](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915194454588.png)

- 此时需要添加一个凭据，也就是我们git仓库的账号密码：

![image-20210915192628228](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915192628228.png)

### 4.3 构建打包

- 之后我们需要添加一个构建，选择调用顶层maven目标

  ![image-20210915192834926](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915192834926.png)

- 选择我们的maven版本，然后设置maven命令和指定pom文件位置：

  ![image-20210915193207921](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915193207921.png)

  


### 4.4 构建后续步骤（将文件发送到服务端）

1. 选择

![image-20210915205201650](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915205201650.png)

2. 配置发送到远程的位置

   ![image-20210915205234136](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915205234136.png)

### 4.5 构建环境（构建完后执行）

- 需要设置执行的shell命令如下：/mydata/sh/mall-tiny-jenkins.sh

  ![image-20210915194403946](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915194403946.png)

### 4.6 执行任务

- 之后点击保存操作，我们的任务就创建完成了，在任务列表中我们可以点击运行来执行该任务；

![image-20210915194616357](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915194616357.png)

### 4.7 查看控制台

- 我们可以通过控制台输出来查看整个任务的执行过程：

![image-20210915194756234](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915194756234.png)

### 4.8 查看项目效果

运行成功后，访问该地址即可查看API文档

http://youip:8088/swagger-ui.html

![image-20210915194921830](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915194921830.png)

## 参考文章

[使用Jenkins一键打包部署SpringBoot应用，就是这么6！](https://juejin.cn/post/6844904022097264648)
