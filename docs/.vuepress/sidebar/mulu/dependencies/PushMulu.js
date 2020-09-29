exports.mulu = {
    title: '消息推送',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: 'mpush',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Alloc服务',   // 必要的
                    path: 'library/push/mpush/Alloc服务.md'
                }, {
                    title: 'MongoDB创建用户',   // 必要的
                    path: 'db/mongodb/install/MongoDB创建用户.md'

                }
            ]
        }
    ]
}