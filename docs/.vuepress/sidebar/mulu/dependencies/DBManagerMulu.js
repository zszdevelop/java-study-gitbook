exports.mulu = {
    title: '数据库管理', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
        title: '数据库版本管理', // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [{
            title: 'Flyway', // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'Flyway数据库版本管理', // 必要的
                    path: 'dependencies/dbmanager/version/flyway/Flyway数据库版本管理'
                },
                {
                    title: 'Flyway-commandline使用', // 必要的
                    path: 'dependencies/dbmanager/version/flyway/Flyway-commandline使用'
                },
                {
                    title: 'Flyway配置属性详解', // 必要的
                    path: 'dependencies/dbmanager/version/flyway/Flyway配置属性详解'
                },
                {
                    title: 'Flyway兼容达梦数据库', // 必要的
                    path: 'dependencies/dbmanager/version/flyway/Flyway兼容达梦数据库'
                },
                {
                    title: '常见问题', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                        title: 'Flyway常见问题', // 必要的
                        path: 'dependencies/dbmanager/version/flyway/Flyway常见问题'
                    },
                    {
                        title: 'Flyway执行ORACL存储过程后报错', // 必要的
                        path: 'dependencies/dbmanager/version/flyway/problem/Flyway执行ORACL存储过程后报错'
                    }
                ]
                }
            ]
        }]
    }, {
        title: '数据库连接池', // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
            {
                title: '概念',
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2, // 可选的, 默认值是 1
                children: [
                    {
                        title: '数据库连接池原理',
                        path: 'dependencies/dbmanager/connectpool/base/数据库连接池原理.md'
                    }
                ]
            },
            {
            title: 'Druid', // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                {
                    title: '为什么选择Druid',
                    path: 'dependencies/dbmanager/connectpool/druid/为什么选择Druid.md'
                },
                {
                    title: 'Druid源码学习',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'Druid源码学习（一）-DruidDataSource数据结构',
                            path: 'dependencies/dbmanager/connectpool/druid/source/Druid源码学习DruidDataSource数据结构.md'
                        },{
                            title: 'Druid源码学习（二）-DruidDataSource的init过程',
                            path: 'dependencies/dbmanager/connectpool/druid/source/Druid源码学习2DruidDataSource的init过程.md'
                        },{
                            title: 'Druid源码学习（三）-DruidDataSource连接池的基本原理（重点）',
                            path: 'dependencies/dbmanager/connectpool/druid/source/Druid源码学习3DruidDataSource连接池的基本原理.md'
                        },{
                            title: 'Druid源码学习（四）-DruidDataSource的getConnection过程',
                            path: 'dependencies/dbmanager/connectpool/druid/source/Druid源码学习4DruidDataSource的getConnection过程.md'
                        },{
                            title: 'Druid源码学习（五）-DruidDataSource的shrink过程',
                            path: 'dependencies/dbmanager/connectpool/druid/source/Druid源码学习5DruidDataSource的shrink过程.md'
                        },{
                            title: 'Druid源码学习（六）-PreparedStatementPool源码及使用场景分析',
                            path: 'dependencies/dbmanager/connectpool/druid/source/Druid源码学习6PreparedStatementPool源码及使用场景分析.md'
                        },{
                            title: 'Druid源码学习（七）-DruidDataSource的recycle过程',
                            path: 'dependencies/dbmanager/connectpool/druid/source/Druid源码学习7DruidDataSource的recycle过程.md'
                        },{
                            title: 'Druid源码学习（八）-DruidDataSource的removeAbandoned机制',
                            path: 'dependencies/dbmanager/connectpool/druid/source/Druid源码学习8DruidDataSource的removeAbandoned机制.md'
                        },{
                            title: 'Druid源码学习（九）-DruidDataSource和DruidConnection中的状态',
                            path: 'dependencies/dbmanager/connectpool/druid/source/Druid源码学习9DruidDataSource和DruidConnection中的状态.md'
                        },{
                            title: 'Druid源码学习（十）-DruidDataSource中的一些计数器',
                            path: 'dependencies/dbmanager/connectpool/druid/source/Druid源码学习10DruidDataSource中的一些计数器.md'
                        }

                        
                    ]
                },
                {
                title: 'Druid多数据源配置', // 必要的
                path: 'dependencies/dbmanager/connectpool/druid/Druid多数据源配置.md'
            }]
        }]
    }]
}