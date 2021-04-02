exports.mulu = {
    title: 'Swagger',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Swagger的使用',   // 必要的
            path: 'tools/swagger/Swagger的使用.md'
        },
        {
            title: 'Swagger实体类注释自动生成-Mybatis生成实体类',   // 必要的
            path: 'dependencies/orm/Mybatis/Mybatis生成实体类.md'
            
        },
    ]
}