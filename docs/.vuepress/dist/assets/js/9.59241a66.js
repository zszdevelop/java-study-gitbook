(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1270:function(t,a,e){"use strict";e.r(a);var r=e(42),s=Object(r.a)({},(function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"安装rancher-server"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#安装rancher-server"}},[t._v("#")]),t._v(" 安装Rancher Server")]),t._v(" "),r("h2",{attrs:{id:"_1-启动-rancher-server-单容器部署-non-ha"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-启动-rancher-server-单容器部署-non-ha"}},[t._v("#")]),t._v(" 1. 启动 RANCHER SERVER - 单容器部署 (NON-HA)")]),t._v(" "),r("p",[t._v("在安装了Docker的Linux服务器上，使用一个简单的命令就可以启动一个单实例的Rancher。")]),t._v(" "),r("ul",[r("li",[r("em",[r("em",[t._v("安装 2.")]),t._v(" 的版本")]),t._v("*")])]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("sudo docker run -d --restart=unless-stopped -p 8080:80 -p 443:443 rancher/rancher\n")])])]),r("p",[t._v("本机8080端口映射到rancher 的80端口")]),t._v(" "),r("p",[r("img",{attrs:{src:e(670),alt:"image-20200128211959622"}})]),t._v(" "),r("h2",{attrs:{id:"_2-rancher-ui"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-rancher-ui"}},[t._v("#")]),t._v(" 2. Rancher UI")]),t._v(" "),r("p",[t._v("访问443 端口"),r("a",{attrs:{href:"https://120.79.200.111/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://120.79.200.111/"),r("OutboundLink")],1)]),t._v(" "),r("p",[r("img",{attrs:{src:e(671),alt:"image-20200128213135024"}})]),t._v(" "),r("p",[t._v("默认账号是admin，第一次需要设置密码")]),t._v(" "),r("h2",{attrs:{id:"_3-添加集群"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-添加集群"}},[t._v("#")]),t._v(" 3. 添加集群")]),t._v(" "),r("p",[t._v("添加自定义集群")]),t._v(" "),r("p",[r("img",{attrs:{src:e(672),alt:"image-20200128213633495"}})]),t._v(" "),r("p",[t._v("集群设置")]),t._v(" "),r("p",[r("img",{attrs:{src:e(673),alt:"image-20200128213920540"}})]),t._v(" "),r("p",[t._v("集群设置二")]),t._v(" "),r("p",[r("img",{attrs:{src:e(674),alt:"image-20200128230521563"}})]),t._v(" "),r("ul",[r("li",[t._v("由于只有一个节点，所有3个角色都要勾选")]),t._v(" "),r("li",[t._v("输入主机的外网和内网地址")]),t._v(" "),r("li",[t._v("ssh终端输入复制的命令")])]),t._v(" "),r("h2",{attrs:{id:"_4-集群安装成功"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_4-集群安装成功"}},[t._v("#")]),t._v(" 4. 集群安装成功")]),t._v(" "),r("p",[r("img",{attrs:{src:e(675),alt:"image-20200128230738951"}})]),t._v(" "),r("p",[t._v("点击集群也能够看到集群的仪表盘信息了：")]),t._v(" "),r("p",[r("img",{attrs:{src:e(676),alt:"image-20200128231312455"}})]),t._v(" "),r("h2",{attrs:{id:"_5-切换default项目视图"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_5-切换default项目视图"}},[t._v("#")]),t._v(" 5. 切换Default项目视图")]),t._v(" "),r("p",[t._v("集群创建完成后，默认会生成Default项目，点击Default可以切换到项目视图：")]),t._v(" "),r("p",[r("img",{attrs:{src:e(677),alt:"image-20200128231346959"}})]),t._v(" "),r("h2",{attrs:{id:"_6-部署工作负载"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_6-部署工作负载"}},[t._v("#")]),t._v(" 6. 部署工作负载")]),t._v(" "),r("p",[t._v("在rancher里工作负载是一个对象，包括pod以及部署应用程序所需的其他文件和信息。我们这里以nginx作为demo示例，在Default视图下，点击工作负载—部署服务")]),t._v(" "),r("p",[r("img",{attrs:{src:e(678),alt:"image-20200128231456464"}})]),t._v(" "),r("p",[t._v("在部署工作负载页面，设置工作负载名称、副本数量、镜像名称、命名空间、端口映射，其他参数保持默认，不设置端口映射的话，默认是随机映射端口，我这里选择随机，最后点击启动：")]),t._v(" "),r("p",[r("img",{attrs:{src:e(679),alt:"image-20200128231727212"}})]),t._v(" "),r("h2",{attrs:{id:"_7-部署完成"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_7-部署完成"}},[t._v("#")]),t._v(" 7. 部署完成")]),t._v(" "),r("p",[r("img",{attrs:{src:e(680),alt:"image-20200128231813040"}})]),t._v(" "),r("h2",{attrs:{id:"参考文章"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),r("p",[r("a",{attrs:{href:"https://blog.51cto.com/zero01/2168999",target:"_blank",rel:"noopener noreferrer"}},[t._v("安装 Rancher2.x 并部署工作负载"),r("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=s.exports},670:function(t,a,e){t.exports=e.p+"assets/img/image-20200128211959622.02a4cee3.png"},671:function(t,a,e){t.exports=e.p+"assets/img/image-20200128213135024.0bef3558.png"},672:function(t,a,e){t.exports=e.p+"assets/img/image-20200128213633495.c98d897b.png"},673:function(t,a,e){t.exports=e.p+"assets/img/image-20200128213920540.846063ca.png"},674:function(t,a,e){t.exports=e.p+"assets/img/image-20200128230521563.b60d6e5c.png"},675:function(t,a,e){t.exports=e.p+"assets/img/image-20200128230738951.34069181.png"},676:function(t,a,e){t.exports=e.p+"assets/img/image-20200128231312455.8433ef28.png"},677:function(t,a,e){t.exports=e.p+"assets/img/image-20200128231346959.7bee87e2.png"},678:function(t,a,e){t.exports=e.p+"assets/img/image-20200128231456464.1fa04562.png"},679:function(t,a,e){t.exports=e.p+"assets/img/image-20200128231727212.cc284422.png"},680:function(t,a,e){t.exports=e.p+"assets/img/image-20200128231813040.3e113938.png"}}]);