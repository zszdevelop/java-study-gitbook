exports.mulu = {
    title: '部门管理',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: '关于亲力亲为的思考',   // 必要的
            path: 'manager/关于亲力亲为的思考.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        },
        {
            title: '如何进行工作分配',   // 必要的
            path: 'manager/如何进行工作分配.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        },
        {
            title: '如何做职场规划',   // 必要的
            path: 'manager/如何做职场规划.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        }
    ]
}