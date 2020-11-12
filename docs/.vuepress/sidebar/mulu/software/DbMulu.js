exports.mulu = {
    title: '数据库操作软件',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: 'PL/SQL Developer',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title:'PL/SQL Developer导入、导出表结构和表数据',
                    path:'software/dbsoftware/plsql/plsql导入导出表结构和表数据.md'
                }
            ]
        }
    ]
}