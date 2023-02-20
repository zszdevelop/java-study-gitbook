---
order: 200
category:
  - 部署
  - Docker
---

# Docker基础 - DockerCompose详解

## 1. 背景

我们可以通过`Dockerfile`文件让用户很方便的定义一个单独的应用容器。然而，在日常工作中，经常会碰到**需要多个容器相互配合来完成某项任务**的情况，或者开发一个`Web`应用，除了`Web`服务容器本身，还需要数据库服务容器、缓存容器，甚至还包括负载均衡容器等等。

`Docker Compose`恰好满足了这样的需求，

- 它是用于定义和运行多容器`Docker`应用程序的工具。
- 通过`Compose`，您可以使用`YAML`文件来配置应用程序所需要的服务。
- 然后使用一个命令，就可以通过`YAML`配置文件创建并启动所有服务。

Docker Compose`项目是`Docker`官方的开源项目，来源于之前的`Fig`项目，使用`Python`语言编写。负责实现对`Docker`容器集群的快速编排。项目地址为：`https://github.com/docker/compose/releases

>- Docker Compose 将所管理的容器分为三层，分别是工程（project）、服务（service）、容器（container）
>- Docker Compose 运行目录下的所有文件（docker-compose.yml）组成一个工程,一个工程包含多个服务，每个服务中定义了容器运行的镜像、参数、依赖，一个服务可包括多个容器实例

## 2. Docker Compose使用的三个步骤

`Docker Compose`使用的三个步骤为：

- 使用`Dockerfile`文件定义应用程序的环境；
- 使用`docker-compose.yml`文件定义构成应用程序的服务，这样它们可以在隔离环境中一起运行；
- 执行`docker-compose up`命令来创建并启动所有服务。

## 3. 安装 Docker Compose

- 安装 Docker Compose 可以通过下面命令自动下载适应版本的 Compose，并为安装脚本添加执行权限

```ruby
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

- 查看安装是否成功

```undefined
docker-compose -v
```

- 卸载

```sh
rm /usr/local/bin/docker-compose
```

## 4. docker-compose.yml 文件

[官方文档](https://docs.docker.com/compose/compose-file/)

- `Docker Compose`允许用户通过`docker-compose.yml`文件（YAML 格式）来定义一组相关联的容器为一个工程（project）。

- 一个工程包含多个服务（service）
- 每个服务中定义了创建容器时所需的镜像、参数、依赖等。

## 5.  顶级配置

`Docker Compose`模板文件我们需要关注的顶级配置有`version`、`services`、`networks`、`volumes`几个部分，除`version`外，其他几个顶级配置下还有很多下级配置，后面也会详细给大家介绍，先来看看这几个顶级配置都什么意思：

- `version`：描述`Compose`文件的版本信息，当前最新版本为`3.8`，对应的`Docker`版本为`19.03.0+`
- `services`：定义服务，可以多个，每个服务中定义了创建容器时所需的镜像、参数、依赖等
- `networkds`：定义网络，可以多个，根据`DNS server`让相同网络中的容器可以直接通过容器名称进行通信
- `volumes`：数据卷，用于实现目录挂载

### 5.1 version 版本信息

描述`Compose`文件的版本信息，当前最新版本为`3.8`，对应的`Docker`版本为`19.03.0+`。关于每个版本的详细信息请参考：`https://docs.docker.com/compose/compose-file/compose-versioning/`

以下为`Compose`文件的版本信息所对应的`Docker`版本。

| Compose file format | Docker Engine release |
| ------------------- | --------------------: |
| 3.8                 |              19.03.0+ |
| 3.7                 |              18.06.0+ |
| 3.6                 |              18.02.0+ |
| 3.5                 |              17.12.0+ |
| 3.4                 |              17.09.0+ |
| 3.3                 |              17.06.0+ |
| 3.2                 |              17.04.0+ |
| 3.1                 |               1.13.1+ |
| 3.0                 |               1.13.0+ |
| ...                 |                 1.x.x |

## 6. services 定义服务

`services`用来定义服务，可以多个，每个服务中定义了创建容器时所需的镜像、参数、依赖等，就像将命令行参数传递给`docker run`一样。同样，网络和数据卷的定义也是一样的。

比如，通过`docker run`命令构建一个`MySQL`应用容器的命令如下：

```sh
docker run -di --name mysql8 -p 3306:3306 -v /mydata/docker_mysql/conf:/etc/mysql/conf.d -v /mydata/docker_mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234 mysql:8
```

使用`docker-compose.yml`以后则可以这样定义：

```yml
version: "3.8"
# 定义服务，可以多个
services:
  mysql: # 服务名称
    image: mysql:8 # 创建容器时所需的镜像
    container_name: mysql8 # 容器名称，默认为"工程名称_服务条目名称_序号"
    ports: # 宿主机与容器的端口映射关系
      - "3306:3306" # 左边宿主机端口:右边容器端口
    environment: # 创建容器时所需的环境变量
      MYSQL_ROOT_PASSWORD: 1234
    volumes:
      - "/mydata/docker_mysql/conf:/etc/mysql/conf.d"
      - "/mydata/docker_mysql/data:/var/lib/mysql"
```

### 6.1 image 镜像名称标签

指定创建容器时所需的镜像名称标签或者镜像`ID`。如果镜像在本地不存在，会去远程拉取。

```yml
services:
  web:
    image: hello-world
```

### 6.2 build 构建容器

除了可以基于指定的镜像构建容器，还可以基于`Dockerfile`文件构建，在使用`up`命令时会执行构建任务。

![image-20220617200827325](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220617200827325.png)

### 6.3 context 文件路径

该选项可以是`Dockerfile`文件的绝对/相对路径，也可以是远程`Git`仓库的`URL`，当提供的值是相对路径时，相对当前`docker-compose.yml`文件所在目录。

```yml
build:
  context: . # 相对当前 docker-compose.yml 文件所在目录，基于名称为 Dockerfile 的文件构建镜像
```

### 6.4 dockerfile 构建镜像

一般情况下，默认都基于文件名叫`Dockerfile`的文件构建镜像，当然也可以是自定义的文件名，使用`dockerfile`声明，不过这个选项只能声明文件名，文件所在路径还是要通过`centext`来声明。

```yml
build:
  context: . # 相对当前 docker-compose.yml 文件所在目录
  dockerfile: Dockerfile-alternate # 基于名称为 Dockerfile-alternate 的文件构建镜像
```

### 6.5 container_name 容器名称

`Compose`创建的容器默认生成的名称格式为：`工程名称_服务条目名称_序号`。如果要使用自定义名称，使用`container_name`声明。

```yml
services:
  mycentos:
    build: .
    container_name: mycentos7 # 容器名称，默认为"工程名称_服务条目名称_序号"
```

因为`Docker`容器名称必须是唯一的，所以如果指定了自定义名称，就不能将服务扩展至多个容器。这样做可能会导致错误。

### 6.6 depends_on 容器依赖

使用`Compose`最大的好处就是敲最少的命令做更多的事情，但一般项目容器启动的顺序是有要求的，如果直接从上到下启动容器，必然会因为容器依赖问题而启动失败。例如在没有启动数据库容器的情况下启动了`Web`应用容器，应用容器会因为找不到数据库而退出。`depends_on`就是用来解决容器依赖、启动先后问题的配置项。

```yml
version: "3.8"

services:
  web:
    build: .
    depends_on:
      - db
      - redis
  redis:
    image: redis
  db:
    image: mysql
```

上述`YAML`文件定义的容器会先启动`db`和`redis`两个服务，最后才启动`web`服务。

### 6.7 ports 暴露端口

容器对外暴露的端口，格式：左边宿主机端口:右边容器端口。

```yml
ports:
  - "80:80"
  - "8080:8080"
```

### 6.8 expose 接受端口范围

容器暴露的端口不映射到宿主机，只允许能被连接的服务访问。

```yml
expose:
  - "80"
  - "8080"
```

### 6.9 restart 重启策略

容器重启策略，简单的理解就是`Docker`重启以后容器要不要一起启动

- no：默认的重启策略，在任何情况下都不会重启容器；
- on-failure：容器非正常退出时，比如退出状态为非0(异常退出)，才会重启容器；
- always：容器总是重新启动，即使容器被手动停止了，当`Docker`重启时容器也还是会一起启动；
- unless-stopped：容器总是重新启动，除非容器被停止（手动或其他方式），那么`Docker`重启时容器则不会启动。

```yml
services:
  nginx:
    image: nginx
    container_name: mynginx
    ports:
      - "80:80"
    restart: always
```

### 6.10 environment 环境变量

添加环境变量。可以使用数组也可以使用字典。布尔相关的值（true、false、yes、no）都需要用引号括起来，以确保 YML 解析器不会将它们转换为真或假。

```yml
environment:
  RUOYI_ENV: development
  SHOW: 'true'
  SESSION_SECRET:
```

或者以下格式：

```yml
environment:
  - RUOYI_ENV=development
  - SHOW=true
  - SESSION_SECRET
```

#### 6.10.1 env_file 文件获取环境变量

从文件中获取环境变量，可以指定一个或多个文件，其优先级低于`environment`指定的环境变量。

```yml
env_file:
  - /opt/runtime_opts.env # 绝对路径
  - ./common.env # 相对路径，相对当前 docker-compose.yml 文件所在目录
  - ./apps/web.env # 相对路径，相对当前 docker-compose.yml 文件所在目录
```

注意：env 文件中的每一行需采用`键=值`格式。以`#`开头的行会被视为注释并被忽略。空行也会被忽略。 

### 6.11 command 执行命令

覆盖容器启动后默认执行的命令。

```yml
command: echo "helloworld"
```

该命令也可以是一个列表。

```yml
command: ["echo", "helloworld"]
```

### 6.12 volumes 目录挂载

数据卷，用于实现目录挂载，支持指定目录挂载、匿名挂载、具名挂载。

- 指定目录挂载的格式为：左边宿主机目录:右边容器目录，或者左边宿主机目录:右边容器目录:读写权限；
- 匿名挂载格式为：容器目录即可，或者容器目录即可:读写权限；
- 具名挂载格式为：数据卷条目名称:容器目录，或者数据卷条目名称:容器目录:读写权限。

```yml
# 描述 Compose 文件的版本信息
version: "3.8"

# 定义服务，可以多个
services:
  mysql: # 服务名称
    image: mysql:8 # 创建容器时所需的镜像
    container_name: mysql8 # 容器名称，默认为"工程名称_服务条目名称_序号"
    ports: # 宿主机与容器的端口映射关系
      - "3306:3306" # 左边宿主机端口:右边容器端口
    environment: # 创建容器时所需的环境变量
      MYSQL_ROOT_PASSWORD: 1234
    volumes:
      # 绝对路径
      - "/mydata/docker_mysql/data:/var/lib/mysql"
      # 相对路径，相对当前 docker-compose.yml 文件所在目录
      - “./conf:/etc/mysql/conf.d“
      # 匿名挂载，匿名挂载只需要写容器目录即可，容器外对应的目录会在 /var/lib/docker/volume 中生成
      - "/var/lib/mysql"
      # 具名挂载，就是给数据卷起了个名字，容器外对应的目录会在 /var/lib/docker/volume 中生成
      - "mysql-data-volume:/var/lib/mysql"

# 定义数据卷，可以多个
volumes:
  mysql-data-volume: # 一个具体数据卷的条目名称
    name: mysql-data-volume # 数据卷名称，默认为"工程名称_数据卷条目名称"
```

### 6.13 network_mode 网络模式

设置网络模式，类似 docker run 时添加的参数 --net host 或者 --network host 的用法

```yml
network_mode: "bridge"
network_mode: "host"
network_mode: "none"
network_mode: "service:[service name]"
network_mode: "container:[container name/id]"
```

### 6.14 networks

配置容器连接的网络，引用顶级 networks 下的条目。

```yml
# 定义服务，可以多个
services:
  nginx: # 服务名称
    networks: # 配置容器连接的网络，引用顶级 networks 下的条目
      - nginx-net # 一个具体网络的条目名称

# 定义网络，可以多个。如果不声明，默认会创建一个网络名称为"工程名称_default"的 bridge 网络
networks:
  nginx-net: # 一个具体网络的条目名称
    name: nginx-net # 网络名称，默认为"工程名称_网络条目名称"
    driver: bridge # 网络模式，默认为 bridge
```

###  6.15  aliases

网络上此服务的别名。同一网络上的其他容器可以使用服务名或此别名连接到服务容器。同一服务在不同的网络上可以具有不同的别名。

```yml
# 定义服务，可以多个
services:
  nginx: # 服务名称
    networks: # 配置容器连接的网络，引用顶级 networks 下的条目
      nginx-net: # 一个具体网络的条目名称
        aliases: # 服务别名，可以多个
          - nginx1 # 同一网络上的其他容器可以使用服务名或此别名连接到服务容器

# 定义网络，可以多个。如果不声明，默认会创建一个网络名称为"工程名称_default"的 bridge 网络
networks:
  nginx-net: # 一个具体网络的条目名称
    name: nginx-net # 网络名称，默认为"工程名称_网络条目名称"
    driver: bridge # 网络模式，默认为 bridge
```

### 6.16  links

服务之间可以使用服务名称相互访问，links 允许定义一个别名，从而使用该别名访问其它服务

```bash
version: '2'
services:
    web:
        build: .
        links:
            - "db:database"
    db:
        image: postgres
```

- 这样 Web 服务就可以使用 db 或 database 作为 hostname 访问 db 服务了

## 7. Compose 常用命令

官方文档：`https://docs.docker.com/compose/reference/overview/`

```sh
docker-compose [-f <arg>...] [options] [COMMAND] [ARGS...]
```

部分命令选项如下：

- -f，--file：指定使用的 Compose 模板文件，默认为 docker-compose.yml，可以多次指定，指定多个 yml；
- -p, --project-name：指定工程名称，默认使用 docker-compose.yml 文件所在目录的名称；
- -v：打印版本并退出；
- --log-level：定义日志等级（DEBUG, INFO, WARNING, ERROR, CRITICAL）。

### 7.1 up

`docker-compose up`创建并启动所有服务的容器。指定多个`yml`加`-f`选项。以守护进程模式运行加`-d`选项。

```sh
# 前台启动
docker-compose up
# 后台启动
docker-compose up -d
# -f 指定使用的 Compose 模板文件，默认为 docker-compose.yml，可以多次指定，指定多个 yml
docker-compose -f docker-compose.yml up -d 
```

### 7.2 logs

`docker-compose logs`查看服务容器的输出日志。默认情况下，`docker-compose`将对不同的服务输出使用不同的颜色来区分。可以通过`--no-color`来关闭颜色。

```sh
# 输出日志，不同的服务输出使用不同的颜色来区分
docker-compose logs
# 跟踪日志输出
docker-compose logs -f
# 关闭颜色
docker-compose logs --no-color
```

### 7.3 ps

`docker-compose ps`列出工程中所有服务的容器。

```sh
# 列出工程中所有服务的容器
docker-compose ps
# 列出工程中指定服务的容器
docker-compose ps nginx
```

### 7.4 run

`docker-compose run`在指定服务容器上执行一个命令。

```sh
# 在工程中指定服务的容器上执行 echo "helloworld"
docker-compose run nginx echo "helloworld"
```

### 7.5 exec

`docker-compose exec`进入服务容器。

```sh
# 进入工程中指定服务的容器
docker-compose exec nginx bash
# 当一个服务拥有多个容器时，可通过 --index 参数进入到该服务下的任何容器
docker-compose exec --index=1 nginx bash
```

### 7.6 pause

`docker-compose pause`暂停服务容器

```sh
# 暂停工程中所有服务的容器
docker-compose pause
# 暂停工程中指定服务的容器
docker-compose pause nginx
```

### 7.7 unpause

`docker-compose unpause`恢复服务容器。

```sh
# 恢复工程中所有服务的容器
docker-compose unpause
# 恢复工程中指定服务的容器
docker-compose unpause nginx
```

### 7.8 restart

`docker-compose restart`重启服务容器。

```sh
# 重启工程中所有服务的容器
docker-compose restart
# 重启工程中指定服务的容器
docker-compose restart nginx
```

### 7.9 start

`docker-compose start`启动服务容器。

```sh
# 启动工程中所有服务的容器
docker-compose start
# 启动工程中指定服务的容器
docker-compose start nginx
```

### 7.10 stop

`docker-compose stop`停止服务容器。

```sh
# 停止工程中所有服务的容器
docker-compose stop
# 停止工程中指定服务的容器
docker-compose stop nginx
```

### 7.11 kill

`docker-compose kill`通过发送`SIGKILL`信号停止指定服务的容器。

```sh
# 通过发送 SIGKILL 信号停止工程中指定服务的容器
docker-compose kill nginx
```

### 7.12 rm

docker-compose rm 删除服务（停止状态）容器。

```sh
# 删除所有（停止状态）服务的容器
docker-compose rm
# 先停止所有服务的容器，再删除所有服务的容器
docker-compose rm -s
# 不询问是否删除，直接删除
docker-compose rm -f
# 删除服务容器挂载的数据卷
docker-compose rm -v
# 删除工程中指定服务的容器
docker-compose rm -sv nginx
```

### 7.13 down

停止并删除所有服务的容器、网络、镜像、数据卷。

```sh
# 停止并删除工程中所有服务的容器、网络
docker-compose stop
# 停止并删除工程中所有服务的容器、网络、镜像
docker-compose down --rmi all
# 停止并删除工程中所有服务的容器、网络、数据卷
docker-compose down -v
```

### 7.14 images

`docker-compose images`打印服务容器所对应的镜像。

```sh
# 打印所有服务的容器所对应的镜像
docker-compose images
# 打印指定服务的容器所对应的镜像
docker-compose images nginx
```

### 7.15 port

`docker-compose port`打印指定服务容器的某个端口所映射的宿主机端口。

```sh
docker-compose port nginx 80
```

### 7.16 top

`docker-compose top`显示正在运行的进程。

```sh
# 显示工程中所有服务的容器正在运行的进程
docker-compose top
# 显示工程中指定服务的容器正在运行的进程
docker-compose top nginx
```

### 7.17 pull

`docker-compose pull`拉取服务依赖的镜像。

```sh
# 拉取工程中所有服务依赖的镜像
docker-compose pull
# 拉取工程中 nginx 服务依赖的镜像
docker-compose pull nginx
# 拉取镜像过程中不打印拉取进度信息
docker-compose pull -q
```

### 7.18 config

`docker-compose config -q`验证`docker-compose.yml`文件。当配置正确时，不输出任何内容，当配置错误时，输出错误信息。

### 7.19 help

`docker-compose -help`查看帮助。

## 参考文章

[Docker：Docker Compose 详解](https://www.jianshu.com/p/658911a8cff3)

[若依官方文档](http://doc.ruoyi.vip/ruoyi-cloud/cloud/dokcer.html#docker-compose)