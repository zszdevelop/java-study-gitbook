exports.mulu = {
    title: 'MongoDB',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: '安装',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Docker安装MongoDB',   // 必要的
                    path: 'db/mongodb/install/Docker安装MongoDB.md'
                },
                {
                    title: 'DockerCompose安装MongoDB',   // 必要的
                    path: 'db/mongodb/install/DockerCompose安装MongoDB.md'
                },
                {
                    title: 'MongoDB创建用户',   // 必要的
                    path: 'db/mongodb/install/MongoDB创建用户.md'
                }
            ]
        }, {
            title: '入门',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'MongoDB入门',   // 必要的
                    path: 'db/mongodb/MongoDB入门.md'
                },
                 {
                    title: 'SQL到MongoDB的映射图表',   // 必要的
                    path: 'db/mongodb/operation/SQL到MongoDB的映射图表.md'
                },
                {
                    title: 'MongoDB创建用户',   // 必要的
                    path: 'db/mongodb/install/MongoDB创建用户.md'
                },
                {
                    title: 'MongoDB数据库的备份、还原、导入及导出',   // 必要的
                    path: 'db/mongodb/operation/MongoDB数据库的备份还原导入及导出.md'
                },
                {
                    title: 'mongodb下查询某个字段不为空的文档',   // 必要的
                    path: 'db/mongodb/operation/mongodb下查询某个字段不为空的文档.md'
                },
                {
                    title: 'mongoDB模糊查询',   // 必要的
                    path: 'db/mongodb/operation/mongoDB模糊查询.md'
               
                },
                {
                    title: 'mongoDB索引',   // 必要的
                    path: 'db/mongodb/operation/mongoDB索引.md'
               
                }
            ]
        },
        {
            title: '实战',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Mongodb文档操作',   // 必要的
                    path: 'db/mongodb/action/Mongodb文档操作.md'
                },
                {
                    title: 'Mongodb多数据源',   // 必要的
                    path: 'db/mongodb/action/Mongodb多数据源.md'
                }
            ]
        },
        {
            title: '问题',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'mongodb异常关闭后，如何修复启动',   // 必要的
                    path: 'db/mongodb/problem/mongodb异常关闭后，如何修复启动.md'
                }
            ]
        }
    ]
}