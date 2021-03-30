exports.mulu = {
    title: 'Linux',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: '操用命令',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '查看Linux版本',   // 必要的
                    path: 'cs/linux/operation/查看Linux版本.md'
                },
                {
                    title: 'linux查看哪些进程占用CPU内存资源多',   // 必要的
                    path: 'cs/linux/operation/linux查看哪些进程占用CPU内存资源多.md'
                },
                {
                    title: 'Linux清除缓存buff/cache',   // 必要的
                    path: 'cs/linux/operation/Linux清除缓存buffcache.md'
                },
                {
                    title: '用户管理',   // 必要的
                    path: 'cs/linux/operation/用户管理.md'
                },
                {
                    title: '查找文件',   // 必要的
                    path: 'cs/linux/operation/查找文件.md'
                },
                {
                    title: '根据端口号/进程号查项目位置',   // 必要的
                    path: 'cs/linux/operation/根据端口号/进程号查项目位置.md'
                },
                {
                    title: 'Linux文件大小和磁盘使用情况',   // 必要的
                    path: 'cs/linux/operation/Linux文件大小.md'
                }, {
                    title: 'linux查看指定程序是否运行及关闭',   // 必要的
                    path: 'cs/linux/operation/linux查看指定程序是否运行及关闭.md'
                }, {
                    title: 'linux查找文件夹具体位置',   // 必要的
                    path: 'cs/linux/operation/linux查找文件夹具体位置.md'
                }, {
                    title: 'Linux文件压缩和解压',   // 必要的
                    path: 'cs/linux/operation/Linux文件压缩和解压.md'
                }, {
                    title: 'Centos防火墙firewalld操作',   // 必要的
                    path: 'cs/linux/firewalld/Centos防火墙firewalld操作.md'
                }
               
            ]
        },
        {
            title: 'ssh',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'ssh一段时间就断掉',   // 必要的
                    path: 'cs/linux/sshd/ssh一段时间就断掉.md'
                }
            ]
        },
        {
            title: '挖矿',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '清除挖矿程序（sysupdate, networkservice进程）',   // 必要的
                    path: 'cs/linux/error/清除挖矿程序.md'
                },
                {
                    title: '清除挖矿程序（kdevtmpfsi进程）',   // 必要的
                    path: 'cs/linux/error/清除挖矿程序kdevtmpfsi.md'
                },
                {
                    title: '清除挖矿程序（docker中Ubuntu容器）',   // 必要的
                    path: 'cs/linux/error/清除挖矿程序docker中Ubuntu容器.md'
                }
            ]
        },
        {
            title: 'Swap交换分区',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Linux Swap交换分区',   // 必要的
                    path: 'cs/linux/swap/LinuxSwap交换分区.md'
                }
            ]
        },
        {
            title: '软件安装',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Java安装',   // 必要的
                    path: 'cs/linux/insatll/java.md'
                },
                {
                    title: 'FTP',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: '安装FTP服务',   // 必要的
                            path: 'cs/linux/ftp/安装FTP服务.md'
                        }
                    ]
                },
                {
                    title: 'unzip',   // 必要的
                    path: 'cs/linux/unzip/'
                },{
                    title: 'kafka',   // 必要的
                    path: 'cs/linux/kafka/'
                },
            ]
        },
        {
            title: '云服务器ECS',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children:[{
                title: '安装/重装系统',   // 必要的
                path: 'cs/aliyun/ecs/安装系统.md', 
            }]}
    ]
}