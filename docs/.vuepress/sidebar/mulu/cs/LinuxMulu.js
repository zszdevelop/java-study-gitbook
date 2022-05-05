exports.mulu = {
    title: 'Linux', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
            title: '操用命令', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'Linux系统监控', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 3, // 可选的, 默认值是 1
                    children: [{
                            title: 'Linux系统监控命令汇总', // 必要的
                            path: 'cs/linux/operation/monitor/Linux系统监控命令汇总.md'
                        }, {
                            title: 'Linux内存监控', // 必要的
                            path: 'cs/linux/operation/monitor/Linux内存监控.md'
                        }, {
                            title: 'Linux中CPU监控', // 必要的
                            path: 'cs/linux/operation/monitor/Linux中CPU监控.md'
                        }, {
                            title: 'Linux网络监控', // 必要的
                            path: 'cs/linux/operation/monitor/Linux网络监控.md'
                        }, {
                            title: 'Linux磁盘监控', // 必要的
                            path: 'cs/linux/operation/monitor/Linux磁盘监控.md'
                        }, {
                            title: 'Linux进程监控', // 必要的
                            path: 'cs/linux/operation/monitor/Linux进程监控.md'
                        }, {
                            title: 'Linux系统监控全能工具', // 必要的
                            path: 'cs/linux/operation/monitor/Linux系统监控全能工具.md'
                        }
                    ]
                },
                {
                    title: 'Linux查找命令', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 3, // 可选的, 默认值是 1
                    children: [{
                            title: 'Linux下各种查找命令汇总', // 必要的
                            path: 'cs/linux/operation/find/Linux下各种查找命令汇总.md'
                        },
                        {
                            title: 'Linux-find查找文件', // 必要的
                            path: 'cs/linux/operation/find/Linux-find命令查找文件.md'
                        },
                        {
                            title: 'Linux-grep文本搜索', // 必要的
                            path: 'cs/linux/operation/find/Linux-grep文本搜索.md'
                        },
                        {
                            title: 'Linux-which查看可执行文件', // 必要的
                            path: 'cs/linux/operation/find/Linux-which查看可执行文件.md'
                        },
                        {
                            title: 'Linux-whereis搜索二进制文件', // 必要的
                            path: 'cs/linux/operation/find/Linux-whereis搜索二进制文件.md'
                        },
                        {
                            title: 'Linux-locate查找文件', // 必要的
                            path: 'cs/linux/operation/find/Linux-locate查找文件.md'
                        }

                    ]
                },
                {
                    title: 'Linux文本操作命令', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 3, // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'Linux文本操作命令汇总', // 必要的
                            path: 'cs/linux/operation/textopt/Linux文本操作命令汇总.md'
                        },
                        {
                            title: 'sed替换/查找/删除命令', // 必要的
                            path: 'cs/linux/operation/textopt/sed替换查找删除命令.md'
                        },
                        {
                            title: 'awk强大的文本分析命令', // 必要的
                            path: 'cs/linux/operation/textopt/awk强大的文本分析命令.md'
                        },
                        {
                            title: 'Linux-grep文本搜索', // 必要的
                            path: 'cs/linux/operation/find/Linux-grep文本搜索.md'
                        },
                        {
                            title: 'cut切分命令', // 必要的
                            path: 'cs/linux/operation/textopt/cut切分命令.md'
                        },{
                            title: 'sort排序命令', // 必要的
                            path: 'cs/linux/operation/textopt/sort排序命令.md'
                        },
                        {
                            title: 'uniq去重命令', // 必要的
                            path: 'cs/linux/operation/textopt/uniq去重命令.md'
                        },
                        {
                            title: 'wc统计命令', // 必要的
                            path: 'cs/linux/operation/textopt/wc统计命令.md'
                        }
                        
                    ]
                },
                
                {
                    title: 'Linux命令行学习-tldr', // 必要的
                    path: 'cs/linux/operation/Linux命令行学习-tldr.md'
                },

                {
                    title: '查看Linux版本', // 必要的
                    path: 'cs/linux/operation/查看Linux版本.md'
                },
                {
                    title: 'linux查看哪些进程占用CPU内存资源多', // 必要的
                    path: 'cs/linux/operation/linux查看哪些进程占用CPU内存资源多.md'
                },
                {
                    title: 'Linux清除缓存buff/cache', // 必要的
                    path: 'cs/linux/operation/Linux清除缓存buffcache.md'
                },
                {
                    title: '用户管理', // 必要的
                    path: 'cs/linux/operation/用户管理.md'
                },
                {
                    title: '查找文件', // 必要的
                    path: 'cs/linux/operation/查找文件.md'
                },
                {
                    title: '根据端口号/进程号查项目位置', // 必要的
                    path: 'cs/linux/operation/根据端口号/进程号查项目位置.md'
                },
                {
                    title: 'Linux文件大小和磁盘使用情况', // 必要的
                    path: 'cs/linux/operation/Linux文件大小.md'
                }, {
                    title: 'linux查看指定程序是否运行及关闭', // 必要的
                    path: 'cs/linux/operation/linux查看指定程序是否运行及关闭.md'
                }, {
                    title: 'linux查找文件夹具体位置', // 必要的
                    path: 'cs/linux/operation/linux查找文件夹具体位置.md'
                }, {
                    title: 'Linux文件压缩和解压', // 必要的
                    path: 'cs/linux/operation/Linux文件压缩和解压.md'
                }, {
                    title: 'Centos防火墙firewalld操作', // 必要的
                    path: 'cs/linux/firewalld/Centos防火墙firewalld操作.md'
                }, {
                    title: 'Linux查看命令的所在路径-which', // 必要的
                    path: 'cs/linux/operation/Linux查看命令的所在路径which.md'
                }

            ]
        },
        {
            title: 'shell', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: 'shell入门', // 必要的
                path: 'cs/linux/shell/shell入门.md'
            }]
        },
        {
            title: 'ssh', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: 'ssh一段时间就断掉', // 必要的
                path: 'cs/linux/sshd/ssh一段时间就断掉.md'
            }]
        },

        {
            title: '挖矿', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: '清除挖矿程序（sysupdate, networkservice进程）', // 必要的
                    path: 'cs/linux/error/清除挖矿程序.md'
                },
                {
                    title: '清除挖矿程序（kdevtmpfsi进程）', // 必要的
                    path: 'cs/linux/error/清除挖矿程序kdevtmpfsi.md'
                },
                {
                    title: '清除挖矿程序（docker中Ubuntu容器）', // 必要的
                    path: 'cs/linux/error/清除挖矿程序docker中Ubuntu容器.md'
                }
            ]
        },
        {
            title: 'Swap交换分区', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: 'Linux Swap交换分区', // 必要的
                path: 'cs/linux/swap/LinuxSwap交换分区.md'
            }]
        },
        {
            title: '软件安装', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'Java安装', // 必要的
                    path: 'cs/linux/insatll/java.md'
                },
                {
                    title: 'FTP', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                        title: '安装FTP服务', // 必要的
                        path: 'cs/linux/ftp/安装FTP服务.md'
                    }]
                },
                {
                    title: 'unzip', // 必要的
                    path: 'cs/linux/unzip/'
                }, {
                    title: 'kafka', // 必要的
                    path: 'cs/linux/kafka/'
                },
            ]
        },
        // {
        //     title: '云服务器ECS',   // 必要的
        //     //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        //     collapsable: true, // 可选的, 默认值是 true,
        //     sidebarDepth: 2,    // 可选的, 默认值是 1
        //     children:[{
        //         title: '安装/重装系统',   // 必要的
        //         path: 'cs/aliyun/ecs/安装系统.md', 
        //     }]}
    ]
}