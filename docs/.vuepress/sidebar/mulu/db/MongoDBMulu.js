exports.mulu = {
    title: 'MongoDB',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
       {
            title: '从SQL到MongoDB',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '从SQL到MongoDB之概念篇',   // 必要的
                    sidebarDepth: 3, 
                    path: 'db/mongodb/sql2mongo/从SQL到MongoDB之概念篇.md'
                },{
                    title: '从SQL到MongoDB之聚合篇',   // 必要的
                    path: 'db/mongodb/sql2mongo/从SQL到MongoDB之聚合篇.md'
                },
            ]
        },{
            title: '基础',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'MongoDB插入文档',   // 必要的
                    path: 'db/mongodb/crud/MongoDB插入操作.md'
                },
                {
                    title: 'MongoDB查询文档',   // 必要的
                    path: 'db/mongodb/crud/MongoDB查询.md'
                },
                {
                    title: 'MongoDB更新文档',   // 必要的
                    path: 'db/mongodb/crud/MongoDB更新文档.md'
                },
                {
                    title: 'MongoDB删除文档',   // 必要的
                    path: 'db/mongodb/crud/MongoDB删除文档.md'
                },
                // 
                // {
                //     title: 'MongoDB入门',   // 必要的
                //     path: 'db/mongodb/MongoDB入门.md'
                // },
                {
                    title: 'MongoDB创建用户',   // 必要的
                    path: 'db/mongodb/install/MongoDB创建用户.md'
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
               
                },
                {
                    title: 'mongoDB索引详解',   // 必要的
                    path: 'db/mongodb/operation/mongoDB索引详解.md'
               
                },
                {
                    title: 'mongoDB删除字段',   // 必要的
                    path: 'db/mongodb/operation/mongoDB删除字段.md'
               
                }
            ]
        },
        {
            title: 'Java实战',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                 
                {
                    title: 'MongoTemplate和MongoRepository总结',   // 必要的
                    path: 'db/mongodb/action/MongoTemplate和MongoRepository总结.md'
                },
                {
                    title: 'spring-data-mongodb文档基础操作',   // 必要的
                    path: 'db/mongodb/action/Mongodb文档操作.md'
                },
                {
                    title: 'Mongodb多数据源',   // 必要的
                    path: 'db/mongodb/action/Mongodb多数据源.md'
                },
                {
                    title: 'spring-data-mongodb的Query查询',   // 必要的
                    path: 'db/mongodb/action/spring-data-mongodb的Query查询.md'
                },
                {
                    title: 'spring-data-mongodb的自定义Query查询',   // 必要的
                    path: 'db/mongodb/action/spring-data-mongodb的自定义Query查询.md'
                },
                {
                    title: 'MongoTemplate使用Cursor处理大数量的数据',   // 必要的
                    path: 'db/mongodb/action/MongoTemplate使用Cursor处理大数量的数据.md'
                }, 
                {
                    title: 'SpringMongoTemplate批量操作',   // 必要的
                    path: 'db/mongodb/action/SpringMongoTemplate批量操作.md'
                }
            ]
        },
        {
            title: '数据备份',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'MongoDB数据备份与还原',   // 必要的
                    path: 'db/mongodb/backup/MongoDB数据备份与还原.md'
                },
                {
                    title: 'MongoDB数据导入与导出',   // 必要的
                    path: 'db/mongodb/backup/MongoDB数据导入与导出.md'
                },
            ]
        },
        {
            title: '问题',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'mongodb大数据量查询慢问题',   // 必要的
                    path: 'db/mongodb/problem/mongodb大数据量查询慢问题.md'
                },
                {
                    title: 'mongodb异常关闭后，如何修复启动',   // 必要的
                    path: 'db/mongodb/problem/mongodb异常关闭后，如何修复启动.md'
                }
            ]
        },
        {
            title: '安装',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'linux安装mongoDB',   // 必要的
                    path: 'db/mongodb/install/linux安装mongoDB.md'
                },
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
        }
    ]
}