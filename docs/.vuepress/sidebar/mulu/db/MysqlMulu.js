exports.mulu = {
    title: 'MySql',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'MySQL安装',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'CentosMySQL安装',   // 必要的
                    path: 'db/mysql/install/CentosMySQL安装.md'
                },  {
                    title: 'Mysql安装后登录异常tmysqlsock',   // 必要的
                    path: 'db/mysql/install/Mysql安装后登录异常tmysqlsock.md'
                }
            ]
        },
        {
            title: 'MySQL基础',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '存储引擎',   // 必要的
                    path: 'db/mysql/存储引擎.md'
                },
                {
                    title: '字符集与排序规则',   // 必要的
                    path: 'db/mysql/字符集与排序规则.md'
                },
            ]
        },
        // {
        //     title: 'MySQL语法',   // 必要的
        //     collapsable: true, // 可选的, 默认值是 true,
        //     sidebarDepth: 2,    // 可选的, 默认值是 1
        //     children: [
        //         {
        //             title: 'MySQL-连接操作',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-连接操作.md'
        //         },
        //         {
        //             title: 'MySQL-数据库操作',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-数据库操作.md'
        //         },
        //         {
        //             title: 'MySQL-表的操作',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-表的操作.md'
        //         },
        //         {
        //             title: 'MySQL-数据增删改查操作',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-数据增删改查操作.md'
        //         },
        //         {
        //             title: 'MySQL-字符集编码',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-字符集编码.md'
        //         },
        //         {
        //             title: 'MySQL-数据类型(列类型)',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-数据类型.md'
        //         },
        //         {
        //             title: 'MySQL-列属性(列约束)',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-列属性.md'
        //         },
        //         {
        //             title: 'MySQL-UNION',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-UNION.md'
        //         },
        //         {
        //             title: 'MySQL-子查询',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-子查询.md'
        //         },
        //         {
        //             title: 'MySQL-连接查询(join)',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-连接查询.md'
        //         },
        //         {
        //             title: 'MySQL-TRUNCATE',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-TRUNCATE.md'
        //         },
        //         {
        //             title: 'MySQL-备份与还原',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-备份与还原.md'
        //         },
        //         {
        //             title: 'MySQL-视图',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-视图.md'
        //         },
        //         {
        //             title: 'MySQL-事务(transaction) ',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-事务.md'
        //         },
        //         {
        //             title: 'MySQL-锁表',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-锁表.md'
        //         },
        //         {
        //             title: 'MySQL-触发器',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-触发器.md'
        //         },
        //         {
        //             title: 'MySQL-SQL编程',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-SQL编程.md'
        //         },
        //         {
        //             title: 'MySQL-存储过程',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-存储过程.md'
        //         },
        //         {
        //             title: 'MySQL-用户和权限管理',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-用户和权限管理.md'
        //         },
        //         {
        //             title: 'MySQL-表维护',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-表维护.md'
        //         },
        //         {
        //             title: 'MySQL-杂项',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-杂项.md'
        //         },
        //         {
        //             title: 'MySQL-数据库操作',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-数据库操作.md'
        //         },
        //         {
        //             title: 'MySQL-数据库操作',   // 必要的
        //             path: 'db/mysql/syntax/MySQL-数据库操作.md'
        //         },
                
        //     ]
        // },
      
        {
            title: '索引',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Mysql索引',
                    path: "db/mysql/index/Mysql索引.md"
                },
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
        },{
            title: '小技巧',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'GROUP BY分组取字段最大值',
                    path: "db/mysql/skill/GROUPBY分组取字段最大值.md"
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
                    title: 'MySQL性能优化思路',
                    path: "db/mysql/optimize/MySQL性能优化思路.md"
                }, {
                    title: 'MySQL 高性能优化规范建议',
                    path: "db/mysql/optimize/MySQL高性能优化规范建议.md"
                },
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
                    sidebarDepth: 3, 
                    path: "db/mysql/optimize/Explain使用分析.md"
                }, 
                {
                    title: '一条SQL语句在MySQL中如何执行的',
                    path: "db/mysql/optimize/一条SQL语句在MySQL中如何执行的.md"
                },
                {
                    title: '分解大连接查询',
                    path: "db/mysql/optimize/分解大连接查询.md"
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