exports.mulu = {
    title: 'J2EE',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Servlet',
            path: 'J2EE/Servlet/Servlet.md',
        },
        {
            title: '转发和重定向',
            path: 'J2EE/转发和重定向.md',
        },
        {
            title: '会话跟踪',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '会话跟踪',
                    path: 'J2EE/会话/会话跟踪.md',
                },
                {
                    title: '会话机制',
                    path: 'J2EE/会话/会话机制.md',
                },
                {
                    title: 'Cookie',
                    path: 'J2EE/会话/Cookie.md',
                },
                {
                    title: 'Session',
                    path: 'J2EE/会话/Session.md',
                },
                {
                    title: 'Cookie和Session总结',
                    path: 'J2EE/会话/Cookie和Session总结.md',
                },
                {
                    title: '黏性session和非黏性session',
                    path: 'J2EE/会话/黏性session和非黏性session.md',
                },
            ]
        },
        {
            title: 'Tomcat',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [{
                title: 'Tomcat系统架构',
                path: 'J2EE/tomcat/Tomcat系统架构.md',
            }]
        }
    ]
}