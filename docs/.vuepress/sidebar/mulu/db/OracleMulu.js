exports.mulu = {
    title: 'Oracle',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: '安装',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '通过docker安装Oracle',   // 必要的
                    path: 'db/Oracle/install/通过docker安装Oracle.md'
                 }
            ]
        }, 
        {
            title: '系统学习Oracle',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Oracle预定义函数',   // 必要的
                    path: 'db/Oracle/study/Oracle预定义函数.md'
                 }
            ]
        },
        {
            title: '常用函数',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Oracle函数日期格式转换 to_date',   // 必要的
                    path: 'db/Oracle/function/Oracle函数日期格式转换to_date.md'
                 },
                 {
                    title: 'Oracle中最大最小greatest()/least函数的使用',   // 必要的
                    path: 'db/Oracle/function/Oracle中greatest和least函数的使用.md'
                 },
                 {
                    title: 'Oracle中四舍五入Round函数的使用',   // 必要的
                    path: 'db/Oracle/function/Oracle中四舍五入Round函数的使用.md'
                 },
                 {
                    title: 'Oracle在1对多时把一列的值合并为一个值并用逗号分隔',   // 必要的
                    path: 'db/Oracle/function/Oracle在1对多时把一列的值合并为一个值并用逗号分隔.md'
                 }
            ]
        },
        {
            title: '序列', 
            path:'db/Oracle/序列.md'
        },
        {
            title: 'DDL(数据库模式定义语言)', 
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '索引',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: '索引',   // 必要的
                            sidebarDepth: 3,   
                            path: 'db/Oracle/ddl/index/索引.md'
                         },
                        {
                            title: 'oracle创建、查看索引和数据量',   // 必要的
                            sidebarDepth: 3,   
                            path: 'db/Oracle/ddl/index/oracle创建查看索引和数据量.md'
                         }
                        ]
                 }
            ]
        },
        {
            title: '存储结构', 
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '分区表',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'oracle分区表(partition)概念篇',   // 必要的
                            sidebarDepth: 3,   
                            path: 'db/Oracle/storage/partition/oracle分区表partition.md'
                         },
                         {
                            title: 'oracle分区表-自动创建的分区',   // 必要的
                            path: 'db/Oracle/storage/partition/oracle分区表-自动创建的分区.md'
                         },
                         {
                            title: '5e数据大表-分区表查数据',   // 必要的
                            path: 'db/Oracle/storage/partition/5e数据大表-分区表查数据.md'
                         }
                        ]
                 }
            ]
        }
    ]
}