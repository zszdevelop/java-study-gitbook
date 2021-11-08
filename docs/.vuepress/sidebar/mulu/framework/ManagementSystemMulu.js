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
                    title: '系统日志功能', // 必要的
                    path: 'framework/ManagementSystem/function/系统日志功能.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                },
                {
                    title: '分页插件的二次封装', // 必要的
                    path: 'framework/ManagementSystem/function/分页插件的二次封装.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                }
            ]
        },
    ]
}