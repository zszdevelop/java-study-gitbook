exports.mulu = {
    title: 'Tomcat', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
        {
            title: 'Tomcat安装',
            path: 'software/tomcat/Tomcat安装.md'
        },
        {
            title: 'Tomcat优化',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                {
                    title: 'Tomcat优化一：优化自身的配置',
                    path: 'software/tomcat/Tomcat优化/Tomcat优化自身的配置.md'
                },
                {
                    title: 'Tomcat优化二：调整JVM参数进行优化',
                    path: 'software/tomcat/Tomcat优化/Tomcat调整JVM参数进行优化.md'
                },

            ]
        },

    ]
}