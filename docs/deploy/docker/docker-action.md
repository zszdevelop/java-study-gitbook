---
order: 500
category:
  - 部署
  - Docker
---

# Docker基础 - Docker入门实战快速上手

# Docker介绍

## 简介

## 镜像

可以理解为安装包

## 容器

正在运行的程序

## 宿主机

服务器本身

# 安装Docker

## CentOS安装

> 安装依赖

```shell
yum install yum-utils
```

> 添加docker安装地址

```shell
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

>  安装docker

```shell
yum install -y docker-ce
```

> 启动docker服务

```shell
systemctl start docker
```

## Ubuntu安装

>  更新包索引

```shell
apt update
```

> 安装docker

```shell
apt install docker.io
```

## 进行初始化

> 配置镜像加速器

vim /etc/docker/daemon.json

```json
{
    "registry-mirros": ["https://mirror.ccs.tencent.com"]
}
```

> 重启docker

```shell
systemctl daemon-reload
systemctl restart docker
```

> 查看镜像

```shell
docker images
```

# 安装常用软件

## 安装tomcat

> 拉取镜像

```shell
docker pull tomcat:9
```

> 运行容器

```shell
docker run -d --name tomcat -p 8080:8080 tomcat:9
```

## 安装mysql

> 创建文件夹

```shell
mkdir -p /data/mysql
cd /data/mysql
```

> 编辑配置文件

vim my.cnf

```shell
[client]
default-character-set=utf8mb4
[mysql]
default-character-set=utf8mb4
[mysqld]
character-set-server=utf8mb4
default-time-zone=+8:00
secure_file_priv=NULL
max_allowed_packet=2G
```

> 拉取mysql镜像

```shell
docker pull mysql
```

> 运行mysql

```shell
docker run -d --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -v /data/mysql:/etc/mysql --restart=always mysql
```

- 创建容器时添加参数 --restart=always 后，当docker重启时，容器自动启动。

## 安装oracle

> 拉取oracle镜像

```shell
hangzhou.aliyuncs.com/helowin/oracle_11g
```

> 运行容器

```shell
docker run --name oracle -d -p 1521:1521 registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g
```

> 进入容器

```shell
docker exec -it oracle bash
```

> 切换root用户

```shell
su
```

> 输入密码

```shell
helowin
```

> 编辑环境变量

```shell
vi /etc/profile

export ORACLE_HOME=/home/oracle/app/oracle/product/11.2.0/dbhome_2
export ORACLE_SID=helowin
export PATH=$PATH:$ORACLE_HOME/bin
```

> 刷新环境变量

```shell
source /etc/profile
```

> 切到oracle用户

```shell
su - oracle
```

> 登录sqlplus

```shell
sqlplus /nolog
```

> 连接数据库dba

```shell
conn /as sysdba;
```

> 修改system用户的密码

```shell
alter user system identified by 123456;
alter user sys identified by 123456;
# 设置密码不过期
alter profile default limit PASSWORD_LIFE_TIME unlimited;
```

> 连接oracle

## 安装nginx

> 拉取镜像

```shell
docker pull nginx
```

> 启动容器

```shell
docker run -d --name nginx --net=host --privileged -v /data/nginx/conf.d:/etc/nginx/conf.d nginx
```

> 编辑配置文件

```nginx
vim 80.conf

server {
        # 监听80端口
        listen 80;

        location / {
        		# 容器内部的静态文件目录
                root /usr/share/nginx/html;
        }
}
```



# 部署项目

## 部署后端项目

> 拉取若依前后端分离版代码

```shell
git clone git@gitee.com:y_project/RuoYi-Vue.git
```

> 创建数据库

```mysql
create database ruoyi;
```

> 修改application-druid.yml配置文件

```yaml
url: jdbc:mysql://10.0.4.9:3306/ruoyi?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
username: root
password: 123456
```

10.0.4.9是服务器的内网ip，通过ipconfig可查看，不可使用localhost

> 修改application.yml配置文件

```yaml
  redis:
    # redis地址
    host: 10.0.4.9
```

> 如果没有安装redis，则需要安装redis

```shell
docker run -d --name redis -p 6379:6379 redis
```

> 编写Dockerfile

```dockerfile
FROM openjdk:8
EXPOSE 8080
ENV TZ=Asia/Shanghai
ADD ruoyi-admin.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

> 进行maven打包，并上传到Dockerfile同级目录

> 构建镜像

```shell
docker build -t ruoyi-server .
```

> 运行容器

```shell
docker run -d --name ruoyi-server -p 8080:8080 ruoyi-server
```

## 部署前端项目

> 安装依赖

```shell
npm install
```

> 打包

```shell
npm run build:prod
```

> 添加到zip压缩文件

然后上传到服务器

服务器解压zip文件

```shell
unzip dist.zip
```

> 编写nginx配置文件

vim nginx.conf

```nginx
server {
    listen 8081;
    location / {
				root /dist;
				index  index.html index.htm;
				try_files $uri $uri/ /index.html;	
     }
  
     location /prod-api{	
        # 转发到后端地址（由于容器和容器是互相隔离的，所以不能用localhost，localhost表示容器本身）
        proxy_pass http://10.0.4.9:8080;
        # 去掉/prod-api
        rewrite ^/prod-api/(.*)$ /$1 break;
    }
}

```

> 编写Dockerfile

```dockerfile
# 使用基础镜像
FROM nginx
# 添加项目文件
COPY dist/ /dist/
# 添加nginx配置文件
ADD nginx.conf /etc/nginx/conf.d
```

> 构建镜像

```shell
docker build -t ruoyi-ui .
```

> 运行容器

```shell
docker run -d --name ruoyi-ui -p 8081:8081 ruoyi-ui
```

访问服务器ip:8081即可进入若依项目

![image-20220615173424184](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220615173424184.png)

## 参考文章

- 部门同事林哲豪的分享会