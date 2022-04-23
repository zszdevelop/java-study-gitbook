exports.mulu = {
    title: '总结归纳',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: '统计汇总方案总结',   // 必要的
            path: 'think/summary/统计汇总方案总结.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        },
        {
            title: '阅读源码总结',   // 必要的
            path: 'think/summary/阅读源码总结.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        },
        {
            title: '接口设计',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
        {
            title: '接口设计之依赖项过多时方案选择',   // 必要的
            path: 'think/summary/interface/接口设计之依赖项过多时方案选择.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        }]}
    ]
}