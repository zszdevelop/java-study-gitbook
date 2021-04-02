exports.mulu = {
    title: '面试',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: '面经',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '盒马鲜生20200316',   // 必要的
                    path: 'myinterview/2020/盒马鲜生20200316.md'
                }
            ]
        },
        {
            title: '面试提问',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Java基础面试提问',   // 必要的
                    path: 'base/interview/Java基础面试提问.md'
                },
                {
                    title: 'JVM面试提问',   // 必要的
                    path: 'base/jvm/JVM面试提问.md'
                },
                {
                    title: 'Spring面试提问',   // 必要的
                    path: 'dependencies/spring/interview/Spring面试提问.md'
                },
                {
                    title: 'MySql面试提问',   // 必要的
                    path: 'db/mysql/interview/MySql面试提问.md'
                },
                {
                    title: 'redis面试提问',   // 必要的
                    path: 'redis/interview/redis面试问题.md'
                },
                {
                    title: '微服务面试提问',   // 必要的
                    path: 'microservice/interview/微服务面试提问.md'
                },
                {
                    title: '计算机网络面试问题',   // 必要的
                    path: 'net/计算机网络面试问题.md'
                }
            ]
        }
    ]
}