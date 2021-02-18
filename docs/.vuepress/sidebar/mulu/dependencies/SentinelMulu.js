exports.mulu = {
    title: 'Sentinel',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Sentinel限流',   // 必要的
            path: 'library/Sentinel/Sentinel限流.md'
        },
        {
            title: 'Sentinel与Spring Cloud Gateway限流实例',   // 必要的
            path: 'library/Sentinel/Sentinel限流实例.md'
        }
    ]
}