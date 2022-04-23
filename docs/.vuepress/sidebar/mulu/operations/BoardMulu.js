exports.mulu = {
    title: '运维面板',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: '宝塔',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '宝塔面板使用感受',   // 必要的
                    path: 'operations/board/baota/宝塔面板使用感受.md'
                }
            ]
        },
    ]
}