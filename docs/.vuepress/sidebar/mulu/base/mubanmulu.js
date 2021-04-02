exports.mulu = {
    title: '模板引擎',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'JSP',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'SpringBoot集成JSP',
                    path: 'base/muban/jsp/SpringBoot集成JSP.md'
                }]
        },
        {
            title: 'FreeMarker',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'FreeMarker入门',   // 必要的
                    path: 'base/muban/FreeMarker/FreeMarker入门.md'
                },{
                    title: '实战',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'FreeMarker实战-根据Excel生成实体类',   // 必要的
                            path: 'base/muban/FreeMarker/action/FreeMarker根据Excel生成实体类.md'
                        }
                    ]
                }
            ]
        }
    ]
}