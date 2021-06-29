exports.mulu = {
    title: '达梦',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
       {
            title: '常用操作',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '达梦数据库-数据库配置助手（初始化，删除数据库）',   // 必要的
                    path: 'db/dameng/operation/达梦数据库初始化数据库.md'
                },
                {
                    title: '达梦数据库-迁移工具DTS',   // 必要的
                    path: 'db/dameng/operation/达梦数据库迁移工具DTS.md'
                },
                {
                    title: '达梦数据库-控制台工具（备份，恢复）',   // 必要的
                    path: 'db/dameng/operation/达梦数据库-控制台工具.md'
                }
            ]
        },
        {
            title: '常见问题',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '达梦数据库-写SQL如何才能不带上模式名？',   // 必要的
                    path: 'db/dameng/problem/达梦数据库-写SQL如何才能不带上模式名.md'
                },
                {
                    title: '达梦数据库-关键字（domain等）导致的异常',   // 必要的
                    path: 'db/dameng/problem/达梦数据库-关键字导致的异常.md'
                }
            ]
        }
    ]
}