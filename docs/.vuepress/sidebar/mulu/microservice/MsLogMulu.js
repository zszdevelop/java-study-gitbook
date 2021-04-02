exports.mulu = {
    title: '服务日志',   // 必要的
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
                    title: 'logback日志打印',
                    path: 'microservice/log/logback/logback日志打印.md',
                }]
        },
        {
            title: 'ELK日志收集',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'ELK日志收集',
                    path: 'microservice/log/elk/ELK日志收集.md',
                },
                {
                    title: '微服务ELK日志配置',
                    path: 'microservice/log/elk/微服务ELK日志配置.md',
                }
            ]
        },
        {
            title: 'P6Spy记录数据库日志',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'P6Spy记录数据库日志',
                    path: 'microservice/log/p6spy/P6Spy记录数据库日志.md',
                }
            ]
        }
    ]
}