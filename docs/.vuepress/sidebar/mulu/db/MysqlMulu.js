exports.mulu = {
    title: 'MySql',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'CentosMySQL安装',   // 必要的
            path: 'db/mysql/CentosMySQL安装.md'
        },
        {
            title: '存储引擎',   // 必要的
            path: 'db/mysql/存储引擎.md'
        },
        {
            title: '字符集与排序规则',   // 必要的
            path: 'db/mysql/字符集与排序规则.md'
        },
        {
            title: '索引',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '索引',
                    path: "db/mysql/index/索引.md"
                },
                {
                    title: '索引常见的数据结构',
                    path: "db/mysql/index/索引常见的数据结构.md"
                },
                {
                    title: 'B+TREE索引的优势',
                    path: "db/mysql/index/B+TREE索引的优势.md"
                },
                {
                    title: '索引实现',
                    path: "db/mysql/index/索引实现.md"
                },
                {
                    title: '联合索引',
                    path: "db/mysql/index/联合索引.md"
                },
                {
                    title: '联合索引-最左匹配原则成因',
                    path: "db/mysql/index/联合索引-最左匹配原则成因.md"
                },
            ]
        },
        {
            title: '事务',   // 必要的
            path: "db/mysql/transaction/",
        },
        {
            title: '统计',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Mysql按日、周、月进行分组统计',
                    path: "db/mysql/statistics/Mysql按日周月进行分组统计.md"
                },
            ]
        },
        {
            title: '锁',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '锁',
                    path: "db/mysql/lock/"
                },
                {
                    title: '锁机制',
                    path: "db/mysql/lock/锁机制.md"
                }
            ]
        },
        {
            title: '常用操作',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '常用操作',
                    path: "db/mysql/常用操作.md"
                },
                {
                    title: 'MySQL配置文件',
                    path: "db/mysql/MySQL配置文件.md"
                },
                {
                    title: 'MySql分页查询',
                    path: "db/mysql/operation/MySql分页查询.md"
                }
            ]
        },
        {
            title: '性能优化',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '大表优化',
                    path: "db/mysql/bigtable/"
                },
                {
                    title: '大表优化过程',
                    path: "db/mysql/optimize/大表优化过程.md"
                },
                {
                    title: 'like模糊查询优化',
                    path: "db/mysql/optimize/like模糊查询优化.md"
                },
                {
                    title: '如何调优慢查询SQL',
                    path: "db/mysql/optimize/如何调优慢查询SQL.md"
                }, 
                {
                    title: 'Explain使用分析',
                    path: "db/mysql/optimize/Explain使用分析.md"
                }, 
                {
                    title: '一条SQL语句在MySQL中如何执行的',
                    path: "db/mysql/optimize/一条SQL语句在MySQL中如何执行的.md"
                },
            ]
        },
        {
            title: '备份',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '热备份和冷备份概念',
                    path: "db/mysql/backup/热备份和冷备份概念.md"
                }
            ]
        },
        {
            title: '问题集锦',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '无法连接远端Mysql',
                    path: "db/mysql/problem/无法连接远端Mysql.md"
                }
            ]
        }, {
            title: '面试真题',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '手写SQL面试题',   // 必要的
                    path: "db/mysql/interview/手写SQL面试题.md"
                },
                {
                    title: 'MySql面试提问',   // 必要的
                    path: "db/mysql/interview/MySql面试提问.md"
                }
            ]
        }
    ]
}