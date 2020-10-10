(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{816:function(a,e,t){a.exports=t.p+"assets/img/image-20200130122153935.52c7f9eb.png"},817:function(a,e,t){a.exports=t.p+"assets/img/image-20200130125541152.1eb48885.png"},818:function(a,e,t){a.exports=t.p+"assets/img/image-20200130125731811.adc53b92.png"},819:function(a,e,t){a.exports=t.p+"assets/img/image-20200130125852979.b219406c.png"},820:function(a,e,t){a.exports=t.p+"assets/img/image-20200130125932143.51b9cde9.png"},821:function(a,e,t){a.exports=t.p+"assets/img/image-20200130130435317.4a34e4b9.png"},822:function(a,e,t){a.exports=t.p+"assets/img/image-20200130130604948.ffac3ed0.png"},823:function(a,e,t){a.exports=t.p+"assets/img/image-20200130130818089.74a8160a.png"},824:function(a,e,t){a.exports=t.p+"assets/img/image-20200130130843225.2a7a034e.png"},825:function(a,e,t){a.exports=t.p+"assets/img/image-20200130132917685.ab623185.png"},826:function(a,e,t){a.exports=t.p+"assets/img/image-20200130133118860.0d9a5985.png"},827:function(a,e,t){a.exports=t.p+"assets/img/image-20200130142726317.f7a37ba7.png"},828:function(a,e,t){a.exports=t.p+"assets/img/image-20200130143518901.68dd5f2e.png"},829:function(a,e,t){a.exports=t.p+"assets/img/image-20200130143930528.a9208581.png"},830:function(a,e,t){a.exports=t.p+"assets/img/image-20200130144035302.456a17ba.png"},831:function(a,e,t){a.exports=t.p+"assets/img/image-20200130144129091.ca59bba9.png"},832:function(a,e,t){a.exports=t.p+"assets/img/image-20200130144730417.99ea1b01.png"},833:function(a,e,t){a.exports=t.p+"assets/img/image-20200130145053528.a3855228.png"},920:function(a,e,t){"use strict";t.r(e);var r=t(42),s=Object(r.a)({},(function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[r("h1",{attrs:{id:"docker镜像仓库harbor"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#docker镜像仓库harbor"}},[a._v("#")]),a._v(" Docker镜像仓库Harbor")]),a._v(" "),r("h2",{attrs:{id:"_1-背景"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-背景"}},[a._v("#")]),a._v(" 1. 背景")]),a._v(" "),r("p",[a._v("我本地环境下（或者公司局域网），将Docker镜像推送到Docker Hub速度比较慢，推荐的做法就是安装一个第三方的Docker镜像仓库。这里推荐使用Harbor")]),a._v(" "),r("h2",{attrs:{id:"_2-简介"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-简介"}},[a._v("#")]),a._v(" 2. 简介")]),a._v(" "),r("p",[a._v("Harbor是一框开源的Docker镜像存储仓库，其扩展了Docker Distribution，在此基础上添加了我们常用的功能，比如安全认证，RBAC用户权限管理，可视化页面操作等功能")]),a._v(" "),r("h2",{attrs:{id:"_3-安装harbor"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-安装harbor"}},[a._v("#")]),a._v(" 3. 安装Harbor")]),a._v(" "),r("h3",{attrs:{id:"_3-1-下载harbor离线安装包"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-下载harbor离线安装包"}},[a._v("#")]),a._v(" 3.1 下载Harbor离线安装包")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("wget https://storage.googleapis.com/harbor-releases/release-1.8.0/harbor-offline-installer-v1.8.4.tgz\n")])])]),r("h3",{attrs:{id:"_3-2-解压harbor"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-解压harbor"}},[a._v("#")]),a._v(" 3.2 解压Harbor")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v(" tar -xzvf harbor-offline-installer-v1.8.4.tgz \n")])])]),r("h3",{attrs:{id:"_3-3-修改harbor-配置文件"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-修改harbor-配置文件"}},[a._v("#")]),a._v(" 3.3 修改Harbor 配置文件")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("vim /software/harbor/harbor.yml\n")])])]),r("p",[a._v("将hostname修改为宿主机IP和端口")]),a._v(" "),r("p",[r("img",{attrs:{src:t(816),alt:"image-20200130122153935"}})]),a._v(" "),r("ul",[r("li",[a._v("端口8601")]),a._v(" "),r("li",[a._v("ip：120.79.200.111")])]),a._v(" "),r("h3",{attrs:{id:"_3-4-执行install-sh-脚本进行安装"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-执行install-sh-脚本进行安装"}},[a._v("#")]),a._v(" 3.4 执行install.sh 脚本进行安装")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("sh harbor/install.sh\n")])])]),r("h4",{attrs:{id:"如出现该异常"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#如出现该异常"}},[a._v("#")]),a._v(" 如出现该异常")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v('ERROR: for redis  Cannot create container for service redis: Conflict. The container name "/redis" is already in use by container "63ac1b31b56907c8e027ed847160edf6655380f34c3b944c31e745693e436764". You have to remove (or rename) that container to be able to reuse that name.\nERROR: Encountered errors while bringing up the project.\n')])])]),r("p",[r("img",{attrs:{src:t(817),alt:"image-20200130125541152"}})]),a._v(" "),r("p",[a._v("这里提示容器名冲突")]),a._v(" "),r("p",[a._v("解决步骤")]),a._v(" "),r("ol",[r("li",[r("p",[a._v("查找redis容器")]),a._v(" "),r("div",{staticClass:"language-javascript extra-class"},[r("pre",{pre:!0,attrs:{class:"language-javascript"}},[r("code",[a._v("docker ps "),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("a "),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("filter name"),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("redis\n")])])])]),a._v(" "),r("li",[r("p",[a._v("将他改名")]),a._v(" "),r("div",{staticClass:"language-javascript extra-class"},[r("pre",{pre:!0,attrs:{class:"language-javascript"}},[r("code",[a._v("docker rename redis micro"),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("service"),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("redis \n")])])])])]),a._v(" "),r("h3",{attrs:{id:"_3-5-安装成功的提示信息"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-5-安装成功的提示信息"}},[a._v("#")]),a._v(" 3.5 安装成功的提示信息")]),a._v(" "),r("p",[r("img",{attrs:{src:t(818),alt:"image-20200130125731811"}})]),a._v(" "),r("h3",{attrs:{id:"_3-6-浏览器访问查看"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-6-浏览器访问查看"}},[a._v("#")]),a._v(" 3.6 浏览器访问查看")]),a._v(" "),r("p",[a._v("http://120.79.200.111:8601/")]),a._v(" "),r("p",[a._v("为了方便日后管理，配置了域名解析")]),a._v(" "),r("p",[a._v("http://harbor.isture.com")]),a._v(" "),r("p",[r("img",{attrs:{src:t(819),alt:"image-20200130125852979"}})]),a._v(" "),r("p",[a._v("默认的用户名：admin \t密码：Harbor12345")]),a._v(" "),r("p",[a._v("登录后")]),a._v(" "),r("p",[r("img",{attrs:{src:t(820),alt:"image-20200130125932143"}})]),a._v(" "),r("h2",{attrs:{id:"_4-创建用户和项目"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_4-创建用户和项目"}},[a._v("#")]),a._v(" 4. 创建用户和项目")]),a._v(" "),r("h3",{attrs:{id:"_4-1-在管理界面新增一个用户"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-在管理界面新增一个用户"}},[a._v("#")]),a._v(" 4.1 在管理界面新增一个用户")]),a._v(" "),r("p",[r("img",{attrs:{src:t(821),alt:"image-20200130130435317"}})]),a._v(" "),r("p",[a._v("密码需要大小写混用Zs16")]),a._v(" "),r("h3",{attrs:{id:"_4-2-新增项目"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-新增项目"}},[a._v("#")]),a._v(" 4.2 新增项目")]),a._v(" "),r("p",[r("img",{attrs:{src:t(822),alt:"image-20200130130604948"}})]),a._v(" "),r("h3",{attrs:{id:"_4-3-在该项目下添加用户"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-在该项目下添加用户"}},[a._v("#")]),a._v(" 4.3 在该项目下添加用户")]),a._v(" "),r("p",[r("img",{attrs:{src:t(823),alt:"image-20200130130818089"}})]),a._v(" "),r("p",[r("img",{attrs:{src:t(824),alt:"image-20200130130843225"}})]),a._v(" "),r("h2",{attrs:{id:"_5-服务器上登录harbor"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_5-服务器上登录harbor"}},[a._v("#")]),a._v(" 5. 服务器上登录harbor")]),a._v(" "),r("h3",{attrs:{id:"_5-1-添加私有仓库"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-添加私有仓库"}},[a._v("#")]),a._v(" 5.1 添加私有仓库")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("vi /etc/docker/daemon.json\n")])])]),r("p",[a._v("添加如下内容")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v('"insecure-registries": ["harbor.isture.com"]\n')])])]),r("p",[r("img",{attrs:{src:t(825),alt:"image-20200130132917685"}})]),a._v(" "),r("h3",{attrs:{id:"_5-2-重启docker"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_5-2-重启docker"}},[a._v("#")]),a._v(" 5.2 重启docker")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("service docker restart\n")])])]),r("p",[a._v("因为Harbor的install.sh脚本实际上是基于Docker Compose的，所以重启Docker，Harbor也需要重启")]),a._v(" "),r("h3",{attrs:{id:"_5-3-重启harbor"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_5-3-重启harbor"}},[a._v("#")]),a._v(" 5.3 重启Harbor")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v(" sh /software/harbor/install.sh \n")])])]),r("h3",{attrs:{id:"_5-4-登录"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_5-4-登录"}},[a._v("#")]),a._v(" 5.4 登录")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("docker login harbor.isture.com\n")])])]),r("p",[r("img",{attrs:{src:t(826),alt:"image-20200130133118860"}})]),a._v(" "),r("h2",{attrs:{id:"_6-测试镜像推拉"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_6-测试镜像推拉"}},[a._v("#")]),a._v(" 6. 测试镜像推拉")]),a._v(" "),r("p",[a._v("接着测试下，是否能够顺利的将Docker镜像推送到Harbor仓库中")]),a._v(" "),r("h3",{attrs:{id:"_6-1-从官方docker-hub中拉取busybox镜像"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-从官方docker-hub中拉取busybox镜像"}},[a._v("#")]),a._v(" 6.1 从官方Docker Hub中拉取busybox镜像")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("docker pull busybox\n")])])]),r("h3",{attrs:{id:"_6-2-然后给该镜像打上标签"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-然后给该镜像打上标签"}},[a._v("#")]),a._v(" 6.2 然后给该镜像打上标签：")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("docker tag busybox:latest harbor.isture.com/chinahrss/busybox:latest\n")])])]),r("p",[a._v("标签格式为[docker仓库域名]/[项目名称]/[镜像:版本]。")]),a._v(" "),r("h3",{attrs:{id:"_6-3-镜像推送到harbor仓库"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_6-3-镜像推送到harbor仓库"}},[a._v("#")]),a._v(" 6.3 镜像推送到Harbor仓库：")]),a._v(" "),r("p",[a._v("打好标签后，将 harbor.isture.com/chinahrss/busybox:latest 镜像推送到Harbor仓库：")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("docker push harbor.isture.com/chinahrss/busybox:latest\n")])])]),r("h2",{attrs:{id:"_7-开启远程仓库"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_7-开启远程仓库"}},[a._v("#")]),a._v(" 7 . 开启远程仓库")]),a._v(" "),r("p",[a._v("我们约定的做法是，通过IDEA Docker插件在master远程构建Docker镜像，再将这些镜像推送到Harbor仓库")]),a._v(" "),r("h3",{attrs:{id:"_7-1-修改docker配置"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_7-1-修改docker配置"}},[a._v("#")]),a._v(" 7.1 修改Docker配置")]),a._v(" "),r("p",[a._v("要开始Docker服务的远程访问，需要修改Docker配置")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("vi /lib/systemd/system/docker.service\n")])])]),r("p",[a._v("修改的地方如下图所示")]),a._v(" "),r("p",[r("img",{attrs:{src:t(827),alt:"image-20200130142726317"}})]),a._v(" "),r("h3",{attrs:{id:"_7-2-重启docker服务"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_7-2-重启docker服务"}},[a._v("#")]),a._v(" 7.2 重启Docker服务")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("systemctl daemon-reload \nsystemctl restart docker.service\n")])])]),r("h3",{attrs:{id:"_7-3-验证2375端口是否通"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_7-3-验证2375端口是否通"}},[a._v("#")]),a._v(" 7.3 验证2375端口是否通")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("curl 120.79.200.111:2375/info\n")])])]),r("p",[a._v("如果返回如下JSON说明开启Docker远程服务成功，端口为2735：")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v('{"ID":"W73X:KQSA:FEKB:5OT5:X4A5:AQCD:MKNX:VES4:EWPK:V3GJ:UIYC:35D3","Containers":69,"ContainersRunning":30,"ContainersPaused":0,"ContainersStopped":39,"Images":43,"Driver":"overlay2","DriverStatus":[["Backing Filesystem","extfs"],["Supports d_type","true"],["Native Overlay Diff","true"]],"SystemStatus":null,"Plugins":{"Volume":["local"],"Network":["bridge","host","ipvlan","macvlan","null","overlay"],"Authorization":null,"Log":["awslogs","fluentd","gcplogs","gelf","journald","json-file","local","logentries","splunk","syslog"]},"MemoryLimit":true,"SwapLimit":true,"KernelMemory":true,"KernelMemoryTCP":true,"CpuCfsPeriod":true,"CpuCfsQuota":true,"CPUShares":true,"CPUSet":true,"PidsLimit":true,"IPv4Forwarding":true,"BridgeNfIptables":true,"BridgeNfIp6tables":true,"Debug":false,"NFd":207,"OomKillDisable":true,"NGoroutines":186,"SystemTime":"2020-01-30T14:31:37.954825827+08:00","LoggingDriver":"json-file","CgroupDriver":"cgroupfs","NEventsListener":0,"KernelVersion":"3.10.0-957.21.3.el7.x86_64","OperatingSystem":"CentOS Linux 7 (Core)","OSType":"linux","Architecture":"x86_64","IndexServerAddress":"https://index.docker.io/v1/","RegistryConfig":{"AllowNondistributableArtifactsCIDRs":[],"AllowNondistributableArtifactsHostnames":[],"InsecureRegistryCIDRs":["127.0.0.0/8"],"IndexConfigs":{"docker.io":{"Name":"docker.io","Mirrors":["https://dockerhub.azk8s.cn/","https://hub-mirror.c.163.com/"],"Secure":true,"Official":true},"harbor.isture.com":{"Name":"harbor.isture.com","Mirrors":[],"Secure":false,"Official":false}},"Mirrors":["https://dockerhub.azk8s.cn/","https://hub-mirror.c.163.com/"]},"NCPU":2,"MemTotal":8201396224,"GenericResources":null,"DockerRootDir":"/var/lib/docker","HttpProxy":"","HttpsProxy":"","NoProxy":"","Name":"iZwz97t3ru69kye3l7uj70Z","Labels":[],"ExperimentalBuild":false,"ServerVersion":"19.03.5","ClusterStore":"","ClusterAdvertise":"","Runtimes":{"runc":{"path":"runc"}},"DefaultRuntime":"runc","Swarm":{"NodeID":"","NodeAddr":"","LocalNodeState":"inactive","ControlAvailable":false,"Error":"","RemoteManagers":null},"LiveRestoreEnabled":false,"Isolation":"","InitBinary":"docker-init","ContainerdCommit":{"ID":"b34a5c8af56e510852c35414db4c1f4fa6172339","Expected":"b34a5c8af56e510852c35414db4c1f4fa6172339"},"RuncCommit":{"ID":"3e425f80a8c931f88e6d94a8c831b9d5aa481657","Expected":"3e425f80a8c931f88e6d94a8c831b9d5aa481657"},"InitCommit":{"ID":"fec3683","Expected":"fec3683"},"SecurityOptions":["name=seccomp,profile=default"],"Warnings":["WARNING: API is accessible on http://0.0.0.0:2375 without encryption.\\n         Access to the remote API is equivalent to root access on the host. Refer\\n         to the \'Docker daemon attack surface\' section in the documentation for\\n         more information: https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface"]}\n')])])]),r("h2",{attrs:{id:"_8-构建chinahrss服务dokcer镜像"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_8-构建chinahrss服务dokcer镜像"}},[a._v("#")]),a._v(" 8. 构建Chinahrss服务Dokcer镜像")]),a._v(" "),r("h3",{attrs:{id:"_8-1-新建远程docker服务"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_8-1-新建远程docker服务"}},[a._v("#")]),a._v(" 8.1 新建远程Docker服务")]),a._v(" "),r("p",[a._v("点击IDEA -> File -> Settings… -> Build,Execution,Deployment -> Docker：")]),a._v(" "),r("p",[r("img",{attrs:{src:t(828),alt:"image-20200130143518901"}})]),a._v(" "),r("p",[a._v("填写远程Docker地址，如果显示Connection successful说明连接远程Docker服务成功。")]),a._v(" "),r("h3",{attrs:{id:"_8-2-构建chinahrss-auth镜像"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_8-2-构建chinahrss-auth镜像"}},[a._v("#")]),a._v(" 8.2 构建chinahrss-auth镜像")]),a._v(" "),r("p",[a._v("准备好后，点击IDEA -> Run -> Edit Configrations…，添加Docker配置：")]),a._v(" "),r("p",[r("img",{attrs:{src:t(829),alt:"image-20200130143930528"}})]),a._v(" "),r("p",[a._v("选择Dockerfile文件地址，并且添加镜像标签为 harbor.isture.com/chinahrss/chinahrss-auth:latest ，然后保存即可：")]),a._v(" "),r("p",[r("img",{attrs:{src:t(830),alt:"image-20200130144035302"}})]),a._v(" "),r("h3",{attrs:{id:"_8-3-点击构建"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_8-3-点击构建"}},[a._v("#")]),a._v(" 8.3 点击构建")]),a._v(" "),r("p",[r("img",{attrs:{src:t(831),alt:"image-20200130144129091"}})]),a._v(" "),r("p",[a._v("在Services->Master Docker Service->Images上，我们可以看到远程仓库上已经部署好了")]),a._v(" "),r("p",[r("img",{attrs:{src:t(832),alt:"image-20200130144730417"}})]),a._v(" "),r("p",[a._v("我们可以到远程服务器上核心一下：")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("docker images | grep chinahrss\n")])])]),r("p",[r("img",{attrs:{src:t(833),alt:"image-20200130145053528"}})]),a._v(" "),r("p",[a._v("这证明我们通过远程Docker服务构建镜像是OK的。")]),a._v(" "),r("h2",{attrs:{id:"_9-镜像推送"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_9-镜像推送"}},[a._v("#")]),a._v(" 9. 镜像推送")]),a._v(" "),r("p",[a._v("这些镜像都构建好后，我们在服务器上将它们都推送到Harbor仓库，执行下面这条命令批量推送：")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("for i in $(docker images | grep harbor.isture.com | awk 'BEGIN{OFS=\":\"}{print $1,$2}'); do docker push $i; done\n")])])])])}),[],!1,null,null,null);e.default=s.exports}}]);