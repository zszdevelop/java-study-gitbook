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
                 }
            ]
        },
        {
            title: '序列', 
            path:'db/Oracle/序列.md'
        }
    ]
}