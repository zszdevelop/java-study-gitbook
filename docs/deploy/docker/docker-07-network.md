---
order: 80
category:
  - 部署
  - Docker
---

# Docker基础 - Docker四种网络模式

## 1. Docker网络原理

当 Docker 启动时，**会自动在主机上创建一个 `docker0` 虚拟网桥**，实际上是 Linux 的一个 bridge，可以理解为一个软件交换机。它会在挂载到它的网口之间进行转发。

同时，**Docker 随机分配一个本地未占用的私有网段**（在 [RFC1918](https://datatracker.ietf.org/doc/html/rfc1918) 中定义）中的一个地址给 `docker0` 接口。比如典型的 `172.17.42.1`，掩码为 `255.255.0.0`。此后启动的容器内的网口也会自动分配一个同一网段（`172.17.0.0/16`）的地址。

当**创建一个 Docker 容器的时候，同时会创建了一对 `veth pair` 接口**（当数据包发送到一个接口时，另外一个接口也可以收到相同的数据包）。**这对接口一端在容器内，即 `eth0`；另一端在本地并被挂载到 `docker0` 网桥，名称以 `veth` 开头（例如 `vethAQI2QT`）**。通过这种方式，主机可以跟容器通信，容器之间也可以相互通信。Docker 就创建了在主机和所有容器之间一个虚拟共享网络。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220703231751040.png" alt="image-20220703231751040"  />

### 1.1 Docker 默认网桥原理

在你安装Docker 服务**默认会创建一个 docker0 网桥（其上有一个 docker0 内部接口），它在内核层连通了其他的物理或虚拟网卡，这就将所有容器和本地主机都放到同一个物理网络**。

我们可用 docker network ls 命令查看：

```bash
docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
b8c5abdb0bec        bridge              bridge              local
84e86bc93121        host                host                local
8e521527a897        none                null                local

  
```

Docker 安装时会自动在 host 上创建三个网络：none，host，和bridge。

#### 1.1.1 查看docker0 网桥

我们看下docker0 网桥：(brctl可以通过yum install bridge-utils安装)

主要命令如下

```
brctl show
ip a
ip route
```

执行详情如下

```bash
[root@pdai ~]# brctl show
bridge name     bridge id               STP enabled     interfaces
docker0         8000.0242703f9d02       no              veth0004826
                                                        veth4ad3278
[root@pdai ~]# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 00:16:3e:08:c1:ea brd ff:ff:ff:ff:ff:ff
    inet 172.31.165.194/20 brd 172.31.175.255 scope global dynamic eth0
       valid_lft 310072401sec preferred_lft 310072401sec
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:70:3f:9d:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
45: veth4ad3278@if44: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default
    link/ether c2:77:e4:ea:f1:33 brd ff:ff:ff:ff:ff:ff link-netnsid 0
49: veth0004826@if48: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default
    link/ether 6e:c9:1a:7c:18:b1 brd ff:ff:ff:ff:ff:ff link-netnsid 1

[root@pdai ~]# ip route
default via 172.31.175.253 dev eth0
169.254.0.0/16 dev eth0 scope link metric 1002
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1
172.31.160.0/20 dev eth0 proto kernel scope link src 172.31.165.194

```

#### 1.1.2 查看bridge网络

再用docker network inspect指令查看bridge网络：其Gateway就是网卡/接口docker0的IP地址：172.17.0.1。

```bash
[root@pdai ~]# docker network inspect bridge
[
    {
        "Name": "bridge",
        "Id": "b8c5abdb0becacfa1bfa1d72e2e663fb0157b62a9b8bee37e2607211722713cc",
        "Created": "2020-02-17T14:10:10.424119543+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "1cbc9aeba2a8a826d460ecb49de17ddf8ac336e150c752a3c762fd38a3e15254": {
                "Name": "web",
                "EndpointID": "adb47ed0c60c6b80a442c71a5f35d63378cecca9598e0cef8409a6719552f4c2",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            },
            "d992e3c761e00649eb436b88c737adc54093b76119af0fb7878596b523f743ca": {
                "Name": "db",
                "EndpointID": "6a3dab5c545dd26e0ca6e36d928a32fd0a6197c8dbf4eeb718a4560e219575ed",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]

```

从上面你可以看到bridge的配置信息和容器信息。

### 1.2 理解容器创建时的IP分配

> 为了理解容器创建时的IP分配，这里需要清理所有已经启动的环境，然后再启动容器，看前后对比

#### 1.2.1 空容器情况

- 我们**清理所有容器**实例，下面展示的就是docker安装之后的, 注意和上面的对比下：

```bash
[root@pdai ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
[root@pdai ~]# docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
b8c5abdb0bec        bridge              bridge              local
84e86bc93121        host                host                local
8e521527a897        none                null                local
[root@pdai ~]# docker network inspect bridge
[
    {
        "Name": "bridge",
        "Id": "b8c5abdb0becacfa1bfa1d72e2e663fb0157b62a9b8bee37e2607211722713cc",
        "Created": "2020-02-17T14:10:10.424119543+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]
[root@pdai ~]# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 00:16:3e:08:c1:ea brd ff:ff:ff:ff:ff:ff
    inet 172.31.165.194/20 brd 172.31.175.255 scope global dynamic eth0
       valid_lft 310069965sec preferred_lft 310069965sec
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default
    link/ether 02:42:70:3f:9d:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
[root@pdai ~]# brctl show
bridge name     bridge id               STP enabled     interfaces
docker0         8000.0242703f9d02       no

```

#### 1.2.2 **创建容器**

Docker 在创建一个容器的时候，会执行如下操作：

- 创建一对虚拟接口/网卡，也就是veth pair，分别放到本地主机和新容器中；
- 本地主机一端桥接到默认的 docker0 或指定网桥上，并具有一个唯一的名字，如 vethxxxxx；
- 容器一端放到新容器中，并修改名字作为 eth0，这个网卡/接口只在容器的名字空间可见；
- 从网桥可用地址段中（也就是与该bridge对应的network）获取一个空闲地址分配给容器的 eth0，并配置默认路由到桥接网卡 vethxxxx。

让我们启动一个容器，看下变化：

```bash
[root@pdai ~]# docker run -d --name db training/postgres
0ffd1092cd962bdbe335ce042b93d0f2082559600cacc82bbef40b8b66395e57
[root@pdai ~]# brctl show
bridge name     bridge id               STP enabled     interfaces
docker0         8000.0242703f9d02       no              vethd93e2ad
[root@pdai ~]# ip a | grep vethd93e2ad
51: vethd93e2ad@if50: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default
[root@pdai ~]# docker network inspect bridge
[
    {
        "Name": "bridge",
        "Id": "b8c5abdb0becacfa1bfa1d72e2e663fb0157b62a9b8bee37e2607211722713cc",
        "Created": "2020-02-17T14:10:10.424119543+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "0ffd1092cd962bdbe335ce042b93d0f2082559600cacc82bbef40b8b66395e57": {
                "Name": "db",
                "EndpointID": "a90cb50031effc99b9254fe4f1231bfbac8c4bb23d94c5a1425c1e116ac452dc",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]

```

如果不指定--network，创建的容器默认都会挂到 docker0 上，使用本地主机上 docker0 接口的 IP 作为所有容器的默认网关

当有多个容器创建后，容器网络拓扑结构如下：

![image-20220703225858216](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220703225858216.png)



### 1.3 理解容器和docker0的虚拟网卡的配对

> 在上图中容器中eth0是怎么和host中虚拟网卡配对上的呢？

```bash
[root@pdai ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
0ffd1092cd96        training/postgres   "su postgres -c '/us…"   11 minutes ago      Up 11 minutes       5432/tcp            db
[root@pdai ~]# docker exec -it 0ffd1092cd96 /bin/bash
root@0ffd1092cd96:/# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
50: eth0@if51: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever

  
```

我们可以看到host上`51: vethd93e2ad@if50`对应着容器中`50: eth0@if51`; 即host中index=51的接口/网卡vethd93e2ad的peer inferface index是50, container中index=50的网卡eth0的peer interface index是51。

可以利用ethtool来确认这种对应关系：分别在host和container中运行指令`ethtool -S <interface>`:

```bash
[root@pdai ~]# ethtool -S vethd93e2ad
NIC statistics:
     peer_ifindex: 50
[root@pdai ~]# docker exec -it 0ffd1092cd96 /bin/bash
root@0ffd1092cd96:/# ip a | grep 50
50: eth0@if51: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
root@0ffd1092cd96:/#
```

## 2. 四类网络模式

安装Docker时，它会自动创建三个网络，bridge（创建容器默认连接到此网络）、 none 、host

| 网络模式   | 简介                                                         |
| ---------- | ------------------------------------------------------------ |
| Host       | 容器将不会虚拟出自己的网卡，配置自己的IP等，而是使用宿主机的IP和端口。 |
| Bridge     | 此模式会为每一个容器分配、设置IP等，并将容器连接到一个docker0虚拟网桥，通过docker0网桥以及Iptables nat表配置与宿主机通信。 |
| None       | 该模式关闭了容器的网络功能。                                 |
| Container  | 创建的容器不会创建自己的网卡，配置自己的IP，而是和一个指定的容器共享IP、端口范围。 |
| 自定义网络 | 略                                                           |

我们在使用docker run创建Docker容器时，可以用 `--net` 选项指定容器的网络模式，Docker可以有以下4种网络模式：

- host模式：使用 --net=host 指定。
- none模式：使用 --net=none 指定。
- bridge模式：使用 --net=bridge 指定，默认设置。
- container模式：使用 --net=container:NAME_or_ID 指定。

### 2.1 host模式

相当于Vmware中的桥接模式，与宿主机在同一个网络中，但没有独立IP地址。

> 众所周知，Docker使用了Linux的Namespaces技术来进行资源隔离，如PID Namespace隔离进程，Mount Namespace隔离文件系统，Network Namespace隔离网络等。

一个Network Namespace提供了一份独立的网络环境，包括网卡、路由、Iptable规则等都与其他的Network Namespace隔离。一个Docker容器一般会分配一个独立的Network Namespace。但如果启动容器的时候使用host模式，那么这个容器将不会获得一个独立的Network Namespace，而是和宿主机共用一个Network Namespace。容器将不会虚拟出自己的网卡，配置自己的IP等，而是使用宿主机的IP和端口。

> 使用host模式的容器可以直接使用宿主机的IP地址与外界通信，容器内部的服务端口也可以使用宿主机的端口，不需要进行NAT，host最大的优势就是网络性能比较好，但是docker host上已经使用的端口就不能再用了，网络的隔离性不好。

例如，我们在172.25.6.1/24的机器上用host模式启动一个ubuntu容器

```bash
[root@server1 ~]# docker run -it --network=host ubuntu
```



Host模式如下图所示：

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220703222748093.png" alt="image-20220703222748093"  />

### 2.2 container模式

在理解了host模式后，这个模式也就好理解了。**这个模式指定新创建的容器和已经存在的一个容器共享一个Network Namespace，而不是和宿主机共享**。新创建的容器不会创建自己的网卡，配置自己的IP，而是和一个指定的容器共享IP、端口范围等。同样，两个容器除了网络方面，其他的如文件系统、进程列表等还是隔离的。两个容器的进程可以通过lo网卡设备通信。

Container模式示意图：

![image-20220703222856547](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220703222856547.png)

### 2.3 none模式

该模式将容器放置在它自己的网络栈中，但是并不进行任何配置。实际上，**该模式关闭了容器的网络功能**在以下两种情况下是有用的：

- 容器并不需要网络（例如只需要写磁盘卷的批处理任务）。

- overlay

  在docker1.7代码进行了重构，单独把网络部分独立出来编写，所以在docker1.8新加入的一个overlay网络模式。Docker对于网络访问的控制也是在逐渐完善的。



None模式示意图:

![image-20220703223001804](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220703223001804.png)

### 2.4 bridge模式

>相当于Vmware中的Nat模式，容器使用独立network Namespace，并连接到docker0虚拟网卡（默认模式）。通过docker0网桥以及Iptables nat表配置与宿主机通信；bridge模式是Docker默认的网络设置，此模式会为每一个容器分配Network Namespace、设置IP等，并将一个主机上的Docker容器连接到一个虚拟网桥上

当Docker进程启动时，会在主机上创建一个名为docker0的虚拟网桥，此主机上启动的Docker容器会连接到这个虚拟网桥上。虚拟网桥的工作方式和物理交换机类似，这样主机上的所有容器就通过交换机连在了一个二层网络中。

从docker0子网中分配一个IP给容器使用，并设置docker0的IP地址为容器的默认网关。在主机上创建一对虚拟网卡veth pair设备，Docker将veth pair设备的一端放在新创建的容器中，并命名为eth0（容器的网卡），另一端放在主机中，以vethxxx这样类似的名字命名，并将这个网络设备加入到docker0网桥中。可以通过brctl show命令查看。

bridge模式是docker的默认网络模式，不写--net参数，就是bridge模式。使用docker run -p时，docker实际是在iptables做了DNAT规则，实现端口转发功能。可以使用iptables -t nat -vnL查看。

bridge模式如下图所示：

![image-20220703223130496](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220703223130496.png)

## 参考文章

[Docker基础 - Docker网络使用和配置](https://pdai.tech/md/devops/docker/docker-07-network.html)

[Docker网络详解——原理篇](https://www.cnblogs.com/sanduzxcvbnm/p/13370773.html)

[docker 四种网络模式解析](https://lionli.blog.csdn.net/article/details/109603785)

[**高级网络配置**](https://yeasy.gitbook.io/docker_practice/advanced_network)