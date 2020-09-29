exports.mulu = {
    title: 'MongoDB',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: '安装',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Docker安装MongoDB',   // 必要的
                    path: 'db/mongodb/install/Docker安装MongoDB.md'
                },
                {
                    title: 'MongoDB入门',   // 必要的
                    path: 'db/mongodb/MongoDB入门.md'
                },
                {
                    title: 'MongoDB创建用户',   // 必要的
                    path: 'db/mongodb/install/MongoDB创建用户.md'
                }
            ]
        }
    ]
}