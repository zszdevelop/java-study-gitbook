(window.webpackJsonp=window.webpackJsonp||[]).push([[264],{925:function(t,a,r){"use strict";r.r(a);var e=r(42),s=Object(e.a)({},(function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"docker安装rabbitmq"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#docker安装rabbitmq"}},[t._v("#")]),t._v(" Docker安装RabbitMQ")]),t._v(" "),r("h2",{attrs:{id:"_1-获取镜像"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-获取镜像"}},[t._v("#")]),t._v(" 1. 获取镜像")]),t._v(" "),r("ol",[r("li",[r("p",[t._v("使用"),r("code",[t._v("docker search rabbitMq")]),t._v("命令获取镜像列表")]),t._v(" "),r("p",[t._v("![image-20200802234417800](/Users/zsz/Library/Application Support/typora-user-images/image-20200802234417800.png)")])]),t._v(" "),r("li",[r("p",[t._v("使用"),r("code",[t._v("docker pull rabbitmq")]),t._v(" 拉取镜像")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("docker pull rabbitmq\n")])])])])]),t._v(" "),r("h2",{attrs:{id:"_2-创建rabbitmq容器"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-创建rabbitmq容器"}},[t._v("#")]),t._v(" 2. 创建rabbitMq容器")]),t._v(" "),r("ol",[r("li",[r("p",[t._v("使用"),r("code",[t._v("docker images")]),t._v("获取查看rabbitMQ镜像ID，我的是"),r("code",[t._v("b1526c8ed2ad")])]),t._v(" "),r("p",[t._v("![image-20200802234628663](/Users/zsz/Library/Application Support/typora-user-images/image-20200802234628663.png)")])]),t._v(" "),r("li",[r("p",[t._v("运行docker容器")]),t._v(" "),r("p",[t._v("执行"),r("code",[t._v("docker run --name rabbitmq -d -p 15672:15672 -p 5672:5672 b1526c8ed2ad")]),t._v("命令创建rabbitMq容器，关于其中的参数含义如下：")]),t._v(" "),r("ul",[r("li",[t._v("--name指定了容器名称")]),t._v(" "),r("li",[t._v("-d 指定容器以后台守护进程方式运行")]),t._v(" "),r("li",[t._v("-p指定容器内部端口号与宿主机之间的映射，rabbitMq默认要使用15672为其web端界面访问时端口，5672为数据通信端口")])])]),t._v(" "),r("li",[r("p",[t._v("查看容器运行状态")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("docker ps\n")])])]),r("p",[t._v("![image-20200802235205255](/Users/zsz/Library/Application Support/typora-user-images/image-20200802235205255.png)")])]),t._v(" "),r("li",[r("p",[t._v("查看容器日志")]),t._v(" "),r("p",[t._v("查看容器日志 使用"),r("code",[t._v("docker logs -f 容器ID")]),t._v("命令可以查看容器日志，我们执行"),r("code",[t._v("docker logs -f 3ae")]),t._v("命令查看rabbitMq在启动过程中日志，3ae是容器ID的简写——容器ID太长，使用时其写前几位即可")]),t._v(" "),r("p",[t._v("![image-20200802235358837](/Users/zsz/Library/Application Support/typora-user-images/image-20200802235358837.png)")]),t._v(" "),r("p",[t._v("从日志可以看出，rabbitMq默认创建了guest用户，并且赋予administrator角色权限，同时服务监听5672端口TCP连接和15672端口的HTTP连接，至此说明安装成功。")])])]),t._v(" "),r("h2",{attrs:{id:"_3-访问rabbitmq"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-访问rabbitmq"}},[t._v("#")]),t._v(" 3. 访问rabbitMq")]),t._v(" "),r("ol",[r("li",[r("p",[t._v("访问web界面")]),t._v(" "),r("p",[t._v("在浏览器 输入你的"),r("code",[t._v("主机Ip:15672")]),t._v("回车即可访问rabbitMq的Web端管理界面，默认用户名和密码都是"),r("code",[t._v("guest")]),t._v("，如图出现如下界面代表已经成功了。")])]),t._v(" "),r("li",[r("p",[t._v("新添加一个账户")]),t._v(" "),r("p",[t._v("默认的"),r("code",[t._v("guest")]),t._v(" 账户有访问限制，默认只能通过本地网络(如 localhost) 访问，远程网络访问受限，所以在使用时我们一般另外添加用户，例如我们添加一个root用户：")]),t._v(" "),r("p",[t._v("2.1 执行"),r("code",[t._v("docker exec -i -t 3a8161fea5d8 bin/bash")]),t._v("进入到rabbitMq容器内部")]),t._v(" "),r("p",[t._v("![image-20200803000608540](/Users/zsz/Library/Application Support/typora-user-images/image-20200803000608540.png)")]),t._v(" "),r("p",[t._v("2.2执行"),r("code",[t._v("rabbitmqctl add_user root 123456")]),t._v(" 添加用户，用户名为root,密码为123456")]),t._v(" "),r("p",[t._v("![image-20200803000855859](/Users/zsz/Library/Application Support/typora-user-images/image-20200803000855859.png)")]),t._v(" "),r("p",[t._v("2.3 执行"),r("code",[t._v('abbitmqctl set_permissions -p / root ".*" ".*" ".*"')]),t._v(" 赋予root用户所有权限")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v('root@3ae75edc48e2:/# rabbitmqctl set_permissions -p / root ".*" ".*" ".*"\nSetting permissions for user "root" in vhost "/" ...\n')])])]),r("p",[t._v("2.4 执行"),r("code",[t._v("rabbitmqctl set_user_tags root administrator")]),t._v("赋予root用户administrator角色")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v('root@3ae75edc48e2:/# rabbitmqctl set_user_tags root administrator\nSetting tags for user "root" to [adminstrator] ...\n')])])]),r("p",[t._v("2.5执行"),r("code",[t._v("rabbitmqctl list_users")]),t._v("查看所有用户即可看到root用户已经添加成功")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("root@3ae75edc48e2:/# rabbitmqctl list_users\nListing users ...\nuser\ttags\nguest\t[administrator]\nroot\t[administrator]\n复制代码\n")])])]),r("p",[t._v("执行"),r("code",[t._v("exit")]),t._v("命令，从容器内部退出即可。这时我们使用root账户登录web界面也是可以的。到此，rabbitMq的安装就结束了，接下里就实际代码开发。")])])]),t._v(" "),r("h2",{attrs:{id:"参考文章"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),r("p",[r("a",{attrs:{href:"https://juejin.im/post/6844903970545090574",target:"_blank",rel:"noopener noreferrer"}},[t._v("docker安装RabbitMq"),r("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=s.exports}}]);