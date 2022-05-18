exports.mulu = {
    title: '运维工具',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: '阿里arthas',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'arthas数据统计和观测monitor/watch/trace',   // 必要的
                    path: 'operations/tools/arthas/arthas数据统计和观测monitor.md'
                }
            ]
        },
    ]
}