exports.mulu = {
    title: '后台管理系统', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
            title: '后台管理系统技术选型', // 必要的
            path: 'framework/ManagementSystem/后台管理系统技术选型.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在

        },
        {
            title: '常用功能实现', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                // {
                //     title: '权限', // 必要的
                //     //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                //     collapsable: true, // 可选的, 默认值是 true,
                //     sidebarDepth: 2, // 可选的, 默认值是 1
                //     children: [
                //         ]},
                // {
                //     title: '访问接口权限控制功能&实现思路', // 必要的
                //     path: 'framework/ManagementSystem/function/permission/访问接口权限控制功能.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在

                // },
                {
                    title: 'SpringSecurity权限控制&实现思路', // 必要的
                    path: 'framework/ManagementSystem/function/permission/SpringSecurity权限控制&实现思路.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                }, 
                {
                    title: '数据权限功能&实现思路', // 必要的
                    path: 'framework/ManagementSystem/function/permission/数据权限功能.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在

                },
                {
                    title: '代码生成功能&实现思路', // 必要的
                    path: 'framework/ManagementSystem/function/代码生成功能.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在

                },
                {
                    title: '定时任务动态管理&实现思路', // 必要的
                    path: 'framework/ManagementSystem/function/定时任务动态管理.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在

                },
                {
                    title: '系统参数配置功能&实现思路', // 必要的
                    path: 'framework/ManagementSystem/function/系统参数配置功能.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                },
                {
                    title: '多数据源的支持', // 必要的
                    path: 'framework/ManagementSystem/function/多数据源的支持.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                },
                {
                    title: '系统日志功能', // 必要的
                    path: 'framework/ManagementSystem/function/系统日志功能.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                },
                {
                    title: '分页插件的二次封装', // 必要的
                    path: 'framework/ManagementSystem/function/分页插件的二次封装.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                },
                {
                    title: '进程优雅退出功能&实现思路', // 必要的
                    path: 'framework/ManagementSystem/function/进程优雅退出功能&实现思路.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                }
            ]
        },
        {
            title: '问题记录', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                {
                    title: '若依优化与问题记录', // 必要的
                    path: 'framework/ManagementSystem/problem/若依优化与问题记录.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                },
                {
                    title: '若依支持分布式场景需要考虑的地方', // 必要的
                    path: 'framework/ManagementSystem/problem/若依支持分布式场景需要考虑的地方.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                }
            ]
        },
        {
            title: '分布式场景改进', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                {
                    title: '采用Redisson强化redis支持分布式场景', // 必要的
                    path: 'framework/ManagementSystem/distributed/采用Redisson强化redis支持分布式场景.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                }
            ]
        },
    ]
}