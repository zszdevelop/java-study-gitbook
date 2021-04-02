exports.mulu = {
    title: '单元测试',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: '单元测试',   // 必要的
            path: 'test/单元测试.md'
        },
        {
            title: 'Junit',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Junit4常见注解和执行顺序',   // 必要的
                    path: 'test/junit/Junit常见注解和执行顺序.md'
                },
                {
                    title: 'Junit5（JUnit Jupiter）使用',   // 必要的
                    path: 'test/junit/Junit5使用.md'
                }
            ]
        },
        {
            title: 'Mock',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Mock',   // 必要的
                    path: 'test/mock/'
                },
                {
                    title: 'Mockito',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'Mockito基本功能',   // 必要的
                            path: 'test/mock/mockito/Mockito基本功能.md'
                        },
                        {
                            title: 'Mockito使用案例',   // 必要的
                            path: 'test/mock/mockito/Mockito使用案例.md'
                        },
                        {
                            title: 'Mockito原理',   // 必要的
                            path: 'test/mock/mockito/Mockito原理.md'
                        },
                        {
                            title: 'Mockito单测service',   // 必要的
                            path: 'test/mock/Mockito单测service.md'
                        }
                    ]
                }
            ]
        }
    ]
}