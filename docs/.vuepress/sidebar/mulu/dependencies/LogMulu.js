exports.mulu = {
    title: '日志',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'logback',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'logback配置与使用',   // 必要的
                    path: 'dependencies/log/logback/logback配置与使用.md'
                },
                {
                    title: 'logback日志过滤Filter',   // 必要的
                    path: 'dependencies/log/logback/logback日志过滤Filter.md'
                },
                {
                    title: 'logback打印彩色日志',   // 必要的
                    path: 'dependencies/log/logback/logback打印彩色日志.md'
                }
            ]
        }
    ]
}