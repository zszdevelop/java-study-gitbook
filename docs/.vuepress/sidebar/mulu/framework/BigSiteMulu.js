exports.mulu = {
    title: '大型网站技术架构',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: '大型网站技术架构思维导图',   // 必要的
            path: 'framework/大型网站技术架构思维导图.md'
        },
        {
            title: '高性能架构',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '高并发',   // 必要的
                    path: 'framework/highConcurrent/高并发.md'
                }
            ]
        },
        {
            title: '高可用架构',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '可用性度量（系统可用性几个9）',   // 必要的
                    path: 'framework/highAvailable/系统可用性几个9.md'
                }
            ]
        }
    ]
}