---
order: 20
category:
  - 部署
  - Docker
---

# Docker基础 - 一个web应用实例1

## 1. 一个web 应用运行和访问

### 1.1 运行一个 web 应用

> 我们只需要找一个webapp的镜像即可，无需自己再写个程序啥的。接下来让我们尝试使用 docker 构建一个 web 应用程序。

这里找了一个`training/webapp`，它是将在docker容器中运行一个 Python Flask web应用。

```bash
[root@pdai ~]# docker pull training/webapp
Using default tag: latest
latest: Pulling from training/webapp
Image docker.io/training/webapp:latest uses outdated schema1 manifest format. Please upgrade to a schema2 image for better future compatibility. More information at https://docs.docker.com/registry/spec/deprecated-schema-v1/
e190868d63f8: Pull complete
909cd34c6fd7: Pull complete
0b9bfabab7c1: Pull complete
a3ed95caeb02: Pull complete
10bbbc0fc0ff: Pull complete
fca59b508e9f: Pull complete
e7ae2541b15b: Pull complete
9dd97ef58ce9: Pull complete
a4c1b0cb7af7: Pull complete
Digest: sha256:06e9c1983bd6d5db5fba376ccd63bfa529e8d02f23d5079b8f74a616308fb11d
Status: Downloaded newer image for training/webapp:latest
docker.io/training/webapp:latest
[root@pdai ~]# docker images | grep webapp
training/webapp     latest              6fae60ef3446        4 years ago         349MB

  
```

接着，我们启动这个webapp

```bash
[root@pdai ~]# docker run -d -P training/webapp python app.py
ec3eb9ae218494d5aa5902c1ca4435733567b5e81319f02e5d2509d45cbc25da
[root@pdai ~]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                     NAMES
ec3eb9ae2184        training/webapp     "python app.py"     18 seconds ago      Up 17 seconds       0.0.0.0:32768->5000/tcp   gifted_agnesi

```

参数说明:

- `-d`:让容器在后台运行。
- `-P`:将容器内部使用的网络端口映射到我们使用的主机上。

### 1.2 访问webapp

> 我们注意看上述PORTS部分为0.0.0.0:32769->5000/tcp

Docker 开放了 5000 端口（默认 Python Flask 端口）映射到主机端口 32768 上。

- **从主机上看**，它应该暴露了**端口32768**

所以我们来验证下：

```bash
[root@pdai ~]# netstat | grep 32768
[root@pdai ~]# netstat -nltp | grep 32768
tcp6       0      0 :::32768                :::*                    LISTEN      2227/docker-proxy
[root@pdai ~]# curl localhost:32768
Hello world!
```

这意味着，你浏览器你可以输入`localhost:32768`访问这个页面。

- **从容器内部看**，它应该有一个**端口5000**

我们再进容器验证下：

```bash
[root@pdai ~]# docker exec -it ec3eb9ae2184 /bin/bash
root@ec3eb9ae2184:/opt/webapp# netstat -nltp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:5000            0.0.0.0:*               LISTEN      1/python

```

所以我们的理解是对的。


### 1.3 设置自定义映射端口

> 我们发现，通过 `-P`参数映射到主机上的端口是随机，能否自定义端口呢？

我们可以通过 -p 参数来设置不一样的端口；为了对比，我们再起一个容器实例：

```bash
[root@pdai ~]# docker run -d -p 5001:5000 training/webapp python app.py
5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a
[root@pdai ~]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                     NAMES
5da3588d5bc4        training/webapp     "python app.py"     33 seconds ago      Up 31 seconds       0.0.0.0:5001->5000/tcp    hopeful_bardeen
ec3eb9ae2184        training/webapp     "python app.py"     22 minutes ago      Up 22 minutes       0.0.0.0:32768->5000/tcp   gifted_agnesi
[root@pdai ~]# netstat -nltp | grep 5001
tcp6       0      0 :::5001                 :::*                    LISTEN      2591/docker-proxy
[root@pdai ~]# curl localhost:5001
Hello world!
```

所以你看到跑了两个内部端口都是5000的web实例，新的容器内部的 5000 端口映射到我们本地主机的 5001 端口上。

## 2. 其它常用功能

### 2.1 查看web 应用网络端口

> 通过 docker ps 命令可以查看到容器的端口映射，docker 还提供了另一个快捷方式 docker port，使用 docker port 可以查看指定 （ID 或者名字）容器的某个确定端口映射到宿主机的端口号。

上面我们创建的 web 应用容器 ID 为 5da3588d5bc4 名字为 hopeful_bardeen。

我可以这样查看容器端口的映射情况：

```bash
[root@pdai ~]# docker port 5da3588d5bc4
5000/tcp -> 0.0.0.0:5001
[root@pdai ~]# docker port hopeful_bardeen
5000/tcp -> 0.0.0.0:5001

  
```

### 2.2 查看 WEB 应用程序日志

> docker logs [ID或者名字] 可以查看容器内部的标准输出。

```bash
[root@pdai ~]# docker port hopeful_bardeen
5000/tcp -> 0.0.0.0:5001
[root@pdai ~]# docker logs -f hopeful_bardeen
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
172.17.0.1 - - [18/Feb/2020 09:08:31] "GET / HTTP/1.1" 200 -
^C
```

参数说明：

- `-f`: 让 docker logs 像使用 tail -f 一样来输出容器内部的标准输出。

从上面，我们可以看到应用程序使用的是 5000 端口并且能够查看到应用程序的访问日志。

### 2.3 查看WEB应用程序容器的进程

我们还可以使用 docker top 来查看容器内部运行的进程

```bash
[root@pdai ~]# docker top hopeful_bardeen
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                2614                2597                0                   17:07               ?                   00:00:00            python app.py

  
```


### 2.4 检查 WEB 应用程序

使用 docker inspect 来查看 Docker 的底层信息。它会返回一个 JSON 文件记录着 Docker 容器的配置和状态信息。

```bash
[root@pdai ~]# docker inspect hopeful_bardeen
[
    {
        "Id": "5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a",
        "Created": "2020-02-18T09:07:32.827193286Z",
        "Path": "python",
        "Args": [
            "app.py"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 2614,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2020-02-18T09:07:33.374368448Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:6fae60ef344644649a39240b94d73b8ba9c67f898ede85cf8e947a887b3e6557",
        "ResolvConfPath": "/var/lib/docker/containers/5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a/hostname",
        "HostsPath": "/var/lib/docker/containers/5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a/hosts",
        "LogPath": "/var/lib/docker/containers/5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a/5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a-json.log",
        "Name": "/hopeful_bardeen",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {
                "5000/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "5001"
                    }
                ]
            },
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "Capabilities": null,
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "KernelMemory": 0,
            "KernelMemoryTCP": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/c6594e5b70feca02eb4b90ac75aba711f36378d5cb9853ffca1ec92f9d0c3e14-init/diff:/var/lib/docker/overlay2/d4690a06236a3857a2a51ab84c61992e50ea3e1a613f4793334916604ea0dfa0/diff:/var/lib/docker/overlay2/c45d0215cd2076174f38fea5003c3ff11a5ba2df2141d9d069f4bf32dac9a22a/diff:/var/lib/docker/overlay2/1cf63068912234a1f4c861f58f155423c87193c6e438948db493687d4da4f0a0/diff:/var/lib/docker/overlay2/55e4ecb04b1ff8d048bc75bb8698c782c813d45caa6f0d82ac6c49adec24bead/diff:/var/lib/docker/overlay2/27fa0dc314b851b8d2f0386d230a725f57117f9f1ccdb49ca27f5ad424cb4a90/diff:/var/lib/docker/overlay2/65a5a082188d9e0b9aaf09c2e9c3b3f8141f74c781996680dfaca63d81672cdf/diff:/var/lib/docker/overlay2/658a33c92cf114ee4cbc10f117207a0c813e39a908acc014fbce1783a28bc654/diff:/var/lib/docker/overlay2/e5b5c9e0abc43ff2750dcd33decc65d90d733b18f2626b91c500d803d7fe189b/diff:/var/lib/docker/overlay2/0b5181e429a89f6ab291e090b972e11718e4f63158ed60af1fce18095d0352a6/diff:/var/lib/docker/overlay2/f7c0405739bb58fdfa9af402a72507b78bc2a48b0d74356dad59495906b6e0e5/diff:/var/lib/docker/overlay2/073c45ae4a6ff27950a1dd969a675d3dcdc18392bb205ddde5913fcc10a751ef/diff:/var/lib/docker/overlay2/f92534844c8cc5b950ea36369b8e4a7dd7f7749e73483908e5d129bf5c26442f/diff:/var/lib/docker/overlay2/477378381d03c4b347d7b9224c4c9023b5dfbfde32022c7eb8af32e7a01b88b2/diff",
                "MergedDir": "/var/lib/docker/overlay2/c6594e5b70feca02eb4b90ac75aba711f36378d5cb9853ffca1ec92f9d0c3e14/merged",
                "UpperDir": "/var/lib/docker/overlay2/c6594e5b70feca02eb4b90ac75aba711f36378d5cb9853ffca1ec92f9d0c3e14/diff",
                "WorkDir": "/var/lib/docker/overlay2/c6594e5b70feca02eb4b90ac75aba711f36378d5cb9853ffca1ec92f9d0c3e14/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "5da3588d5bc4",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "5000/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "python",
                "app.py"
            ],
            "Image": "training/webapp",
            "Volumes": null,
            "WorkingDir": "/opt/webapp",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {}
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "66e1f111a5d7acca71f0e9e24516a6945bca428f55ac1eab1576c99bde16190c",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "5000/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "5001"
                    }
                ]
            },
            "SandboxKey": "/var/run/docker/netns/66e1f111a5d7",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "794d5e97cd3bbb62c8a7a850f125404d174ecc45df4e704dbee403b1be7a2835",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.3",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:03",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "b8c5abdb0becacfa1bfa1d72e2e663fb0157b62a9b8bee37e2607211722713cc",
                    "EndpointID": "794d5e97cd3bbb62c8a7a850f125404d174ecc45df4e704dbee403b1be7a2835",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.3",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:03",
                    "DriverOpts": null
                }
            }
        }
    }
]
```

### 2.5 停止 WEB 应用容器

再复习下docker的停止

```bash
[root@pdai ~]# docker stop hopeful_bardeen
hopeful_bardeen
[root@pdai ~]# docker ps -a | grep 'hopeful_bardeen'
5da3588d5bc4        training/webapp      "python app.py"      13 minutes ago      Exited (137) 12 seconds ago                             hopeful_bardeen

  
```

### 2.6 重启WEB应用容器

已经停止的容器，我们可以使用命令 docker start 或者docker restart 来启动。

```bash
[root@pdai ~]# docker restart hopeful_bardeen
hopeful_bardeen
[root@pdai ~]# docker ps -a | grep hopeful_bardeen
5da3588d5bc4        training/webapp      "python app.py"      14 minutes ago      Up 10 seconds            0.0.0.0:5001->5000/tcp    hopeful_bardeen

  
```

### 2.7 移除WEB应用容器

我们可以使用 docker rm 命令来删除不需要的容器

我们上文也讲过，如果是启动着的docker实例，需要加-f，强制（force）删除。

```bash
[root@pdai ~]# docker ps -a | grep hopeful_bardeen
5da3588d5bc4        training/webapp      "python app.py"      14 minutes ago      Up 10 seconds            0.0.0.0:5001->5000/tcp    hopeful_bardeen
[root@pdai ~]# docker rm -f hopeful_bardeen
hopeful_bardeen
[root@pdai ~]# docker ps -a | grep hopeful_bardeen
[root@pdai ~]#
```


## 3. 与其它容器（DB容器）互联

> 上述是一个web单一容器通过端口映射，可以通过主机端口访问容器；那么如果需要访问数据库，就涉及到容器互联。

### 3.1 与数据库容器互联

- 先停止上述的web容器, 且清理所有不用的容器

```bash
[root@pdai ~]# docker ps -a
CONTAINER ID        IMAGE                COMMAND              CREATED             STATUS                    PORTS                     NAMES
ec3eb9ae2184        training/webapp      "python app.py"      18 hours ago        Up 18 hours               0.0.0.0:32768->5000/tcp   gifted_agnesi
11de9755a084        pdai/ubuntu:v2.0.2   "/bin/bash"          24 hours ago        Exited (0) 24 hours ago                             pdai-ubuntu-202
57bd797570b6        pdai/ubuntu:v2.0.2   "--name pdai-test"   24 hours ago        Created                                             sharp_brahmagupta
[root@pdai ~]# docker stop ec3eb9ae2184
ec3eb9ae2184
[root@pdai ~]# docker ps -a
CONTAINER ID        IMAGE                COMMAND              CREATED             STATUS                        PORTS               NAMES
ec3eb9ae2184        training/webapp      "python app.py"      18 hours ago        Exited (137) 29 seconds ago                       gifted_agnesi
11de9755a084        pdai/ubuntu:v2.0.2   "/bin/bash"          24 hours ago        Exited (0) 24 hours ago                           pdai-ubuntu-202
57bd797570b6        pdai/ubuntu:v2.0.2   "--name pdai-test"   24 hours ago        Created                                           sharp_brahmagupta
[root@pdai ~]# docker container prune
WARNING! This will remove all stopped containers.
Are you sure you want to continue? [y/N] y
Deleted Containers:
ec3eb9ae218494d5aa5902c1ca4435733567b5e81319f02e5d2509d45cbc25da
11de9755a08402d963d263a559a7daf48f4a2188398f258641240b5eb50fbc89
57bd797570b68b6587b16809889e6e8f710ec7a934229aa6391add02f758e036

Total reclaimed space: 89B
[root@pdai ~]#
```

- 创建一个新的数据库容器。

```bash
[root@pdai ~]# docker run -d --name db training/postgres
Unable to find image 'training/postgres:latest' locally
latest: Pulling from training/postgres
Image docker.io/training/postgres:latest uses outdated schema1 manifest format. Please upgrade to a schema2 image for better future compatibility. More information at https://docs.docker.com/registry/spec/deprecated-schema-v1/
a3ed95caeb02: Pull complete
6e71c809542e: Pull complete
2978d9af87ba: Pull complete
e1bca35b062f: Pull complete
500b6decf741: Pull complete
74b14ef2151f: Pull complete
7afd5ed3826e: Pull complete
3c69bb244f5e: Pull complete
d86f9ec5aedf: Pull complete
010fabf20157: Pull complete
Digest: sha256:a945dc6dcfbc8d009c3d972931608344b76c2870ce796da00a827bd50791907e
Status: Downloaded newer image for training/postgres:latest
d992e3c761e00649eb436b88c737adc54093b76119af0fb7878596b523f743ca
[root@pdai ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
d992e3c761e0        training/postgres   "su postgres -c '/us…"   9 seconds ago       Up 7 seconds        5432/tcp            db

```

- db 容器和 web 容器建立互联关系

```bash
[root@pdai ~]# docker run -d -p 5001:5000 --name web --link db:db training/webapp python app.py
1cbc9aeba2a8a826d460ecb49de17ddf8ac336e150c752a3c762fd38a3e15254
[root@pdai ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
1cbc9aeba2a8        training/webapp     "python app.py"          5 seconds ago       Up 4 seconds        0.0.0.0:5001->5000/tcp   web
d992e3c761e0        training/postgres   "su postgres -c '/us…"   7 minutes ago       Up 7 minutes        5432/tcp                 db

```

--link 参数的格式为 --link name:alias，其中 name 是要链接的容器的名称，alias 是这个连接的别名。

> Docker 在两个互联的容器之间创建了一个安全隧道，而且不用映射它们的端口到宿主主机上。在启动 db 容器的时候并没有使用 -p 和 -P 标记，从而避免了暴露数据库端口到外部网络上。

### 3.2容器公开的连接信息

Docker 通过 2 种方式为容器公开连接信息：

- 环境变量
- 更新 /etc/hosts 文件

#### 3.2.1环境变量

使用 env 命令来查看 web 容器的环境变量

```bash
[root@pdai ~]# docker exec -it web /bin/bash
root@1cbc9aeba2a8:/opt/webapp# env
HOSTNAME=1cbc9aeba2a8
DB_NAME=/web/db
DB_PORT_5432_TCP_ADDR=172.17.0.2
DB_PORT=tcp://172.17.0.2:5432
DB_PORT_5432_TCP=tcp://172.17.0.2:5432
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
PWD=/opt/webapp
DB_PORT_5432_TCP_PORT=5432
SHLVL=1
HOME=/root
DB_PORT_5432_TCP_PROTO=tcp
DB_ENV_PG_VERSION=9.3
_=/usr/bin/env
```

其中 DB_ 开头的环境变量是供 web 容器连接 db 容器使用，前缀采用大写的连接别名。

#### 3.2.2 hosts 文件

除了环境变量，Docker 还添加 host 信息到父容器的 /etc/hosts 的文件。下面是父容器 web 的 hosts 文件

```bash
root@1cbc9aeba2a8:/opt/webapp# cat /etc/hosts
127.0.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
172.17.0.2      db d992e3c761e0
172.17.0.3      1cbc9aeba2a8
root@1cbc9aeba2a8:/opt/webapp#
```



这里有 2 个 hosts:

- 第一个, `172.17.0.2 db d992e3c761e0` 表示 db 容器的 ip, ID和Name
- 第二个，`172.17.0.3 1cbc9aeba2a8` 表示 web 容器的 ip, ID

可以在 web 容器中安装 ping 命令来测试跟db容器的连通。

```
root@1cbc9aeba2a8:/opt/webapp# apt-get install -yqq inetutils-ping
(Reading database ... 18233 files and directories currently installed.)
Removing ubuntu-minimal (1.325) ...
Removing iputils-ping (3:20121221-4ubuntu1.1) ...
Selecting previously unselected package inetutils-ping.
(Reading database ... 18221 files and directories currently installed.)
Preparing to unpack .../inetutils-ping_2%3a1.9.2-1_amd64.deb ...
Unpacking inetutils-ping (2:1.9.2-1) ...
Setting up inetutils-ping (2:1.9.2-1) ...
root@1cbc9aeba2a8:/opt/webapp# ping db
PING db (172.17.0.2): 56 data bytes
64 bytes from 172.17.0.2: icmp_seq=0 ttl=64 time=0.110 ms
64 bytes from 172.17.0.2: icmp_seq=1 ttl=64 time=0.092 ms
64 bytes from 172.17.0.2: icmp_seq=2 ttl=64 time=0.094 ms
64 bytes from 172.17.0.2: icmp_seq=3 ttl=64 time=0.104 ms
64 bytes from 172.17.0.2: icmp_seq=4 ttl=64 time=0.111 ms
64 bytes from 172.17.0.2: icmp_seq=5 ttl=64 time=0.093 ms
64 bytes from 172.17.0.2: icmp_seq=6 ttl=64 time=0.095 ms
^C--- db ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max/stddev = 0.092/0.100/0.111/0.000 ms

```


用 ping 来测试db容器，它会解析成 172.17.0.2。

当然，你还可以ping db容器的ID或者内部IP, 结果是一样的。

```bash
root@1cbc9aeba2a8:/opt/webapp# ping -t 4 d992e3c761e0
ping: unsupported packet type: 4
root@1cbc9aeba2a8:/opt/webapp# ping d992e3c761e0
PING db (172.17.0.2): 56 data bytes
64 bytes from 172.17.0.2: icmp_seq=0 ttl=64 time=0.089 ms
64 bytes from 172.17.0.2: icmp_seq=1 ttl=64 time=0.093 ms
^C--- db ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max/stddev = 0.089/0.091/0.093/0.000 ms
root@1cbc9aeba2a8:/opt/webapp# ping 172.17.0.2
PING 172.17.0.2 (172.17.0.2): 56 data bytes
64 bytes from 172.17.0.2: icmp_seq=0 ttl=64 time=0.094 ms
64 bytes from 172.17.0.2: icmp_seq=1 ttl=64 time=0.103 ms
^C--- 172.17.0.2 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max/stddev = 0.094/0.099/0.103/0.000 ms
root@1cbc9aeba2a8:/opt/webapp#
    
```

用户可以链接多个父容器到子容器，比如可以链接多个 web 到 db 容器上。

## 参考文章

[**Docker基础 - 一个web应用实例**](https://pdai.tech/md/devops/docker/docker-03-basic-web-app.html)