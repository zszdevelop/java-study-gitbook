exports.mulu = {
    title: 'SQL',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: 'SELECT',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'SELECT检索数据',   // 必要的
                    path: 'sql/SELECT.md'
                }, {
                    title: 'ORDER BY排序检索数据',   // 必要的
                    path: 'sql/orderby.md'
                }, {
                    title: 'WHERE过滤数据',   // 必要的
                    path: 'sql/WHERE.md'
                }, {
                    title: '创建计算字段',   
                    path: 'sql/创建计算字段.md'
                }, {
                    title: '使用函数处理数据',   
                    path: 'sql/使用函数处理数据.md'
                }, {
                    title: '汇总数据（聚集函数）',   
                    path: 'sql/汇总数据.md'
                }, {
                    title: 'GROUP BY/HAVING分组数据',   
                    path: 'sql/分组数据.md'
                }, {
                    title: '子查询',   
                    path: 'sql/子查询.md'
                }, {
                    title: 'JOIN联结表',   
                    path: 'sql/联结表.md'
                }, {
                    title: 'UNION组合查询',   
                    path: 'sql/UNION组合查询.md'
                }
            ]
        },{
            title: 'INSERT',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'INSERT插入数据',   // 必要的
                    path: 'sql/insert/INSERT插入数据.md'
                }
            ]
        },{
            title: 'UPDATE',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'UPDATE更新数据',   // 必要的
                    path: 'sql/insert/UPDATE更新数据.md'
                }
            ]
        },{
            title: 'DELETE',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'DELETE删除数据',   // 必要的
                    path: 'sql/insert/DELETE删除数据.md'
                }
            ]
        },{
            title: '创建和操纵表',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'CREATE TABLE 创建表',   // 必要的
                    path: 'sql/table/创建表.md'
                },
                {
                    title: 'ALTER TABLE更新表',   // 必要的
                    path: 'sql/table/更新表.md'
                },
                {
                    title: 'DROP TABLE 删除表',   // 必要的
                    path: 'sql/table/删除表.md'
                },
                {
                    title: 'RENAME TABLE 重命名表',   // 必要的
                    path: 'sql/table/重命名表.md'
                }
            ]
        },
        {
            title: 'VIEW视图',   // 必要的
            path: 'sql/view/'
        }
        ,
        {
            title: '存储过程',   // 必要的
            path: 'sql/存储过程/'
        },
        {
            title: '事务',   // 必要的
            path: 'sql/transaction/'
        },
        {
            title: '索引',   // 必要的
            path: 'sql/索引.md'
        }
    ]
}