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
                    title: '达梦数据库迁移工具DTS',   // 必要的
                    path: 'db/dameng/operation/达梦数据库迁移工具DTS.md'
                }
            ]
        }
    ]
}