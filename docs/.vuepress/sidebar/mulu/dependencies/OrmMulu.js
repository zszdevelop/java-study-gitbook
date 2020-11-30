exports.mulu = {
    title: 'ORM实体关系映射',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: 'JPA',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '相关概念',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'JPA查询方式总结',   // 必要的
                            path: 'dependencies/orm/jpa/base/JPA查询方式总结.md'
                        },
                        {
                            title: 'JPA',   // 必要的
                            path: 'dependencies/orm/jpa/base/jpa.md'
                        },
                        {
                            title: 'JPA中的getOne，findOne以及findById区别',   // 必要的
                            path: 'dependencies/orm/jpa/base/JPA中的getOne和findOne以及findById区别.md'
                        }]
                },
                {
                    title: '问题集锦',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'JPA表重复创建(只是大小写区别)',   // 必要的
                            path: 'dependencies/orm/jpa/problem/JPA表重复创建只是大小写区别.md'
                        },
                        {
                            title: 'JPA的getOne报错',   // 必要的
                            path: 'dependencies/orm/jpa/problem/jpa的getOne报错.md'
                        }]
                },
                {
                    title: '辅助功能',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: '根据数据库表生成实体类',   // 必要的
                            path: 'dependencies/orm/jpa/auxiliary/根据数据库表生成实体类.md'
                        }]
                }
            ]
        }
    ]
}