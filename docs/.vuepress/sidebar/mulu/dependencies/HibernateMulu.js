exports.mulu = {
    title: 'Hibernate',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: '集成使用',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Maven集成Hibernate示例',   // 必要的
                    path: 'dependencies/hibernate/Maven集成Hibernate示例.md'
                }]
        },
        {
            title: 'Hibernate概念与原理',   // 必要的
            path: 'dependencies/hibernate/Hibernate概念与原理.md'
        },
        {
            title: 'Hibernate的四种查询方式',   // 必要的
            path: 'dependencies/hibernate/Hibernate的四种查询方式.md'
        },
        {
            title: 'Hibernate实体类创建规则',   // 必要的
            path: 'dependencies/hibernate/Hibernate实体类创建规则.md'
        }


    ]
}