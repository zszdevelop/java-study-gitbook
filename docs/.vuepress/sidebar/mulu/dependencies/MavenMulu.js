exports.mulu = {
    title: 'maven',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Maven核心知识',   // 必要的
            path: 'dependencies/maven/Maven核心知识.md'
        },
        {
            title: 'Maven依赖中的scope详解',   // 必要的
            path: 'dependencies/maven/Maven依赖中的scope详解.md'
        }
    ]
}