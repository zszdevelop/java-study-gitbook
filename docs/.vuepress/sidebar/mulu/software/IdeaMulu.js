exports.mulu = {
    title: 'IDEA软件', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
            title: 'idea激活码',
            path: 'software/idea/activate/idea激活码.md'
        },
        {
            title: 'jrebel热加载',
            path: 'tools/Jrebel/'
        },
        // {
        //     title:'idea热部署',
        //     path:'software/idea/idea热部署.md'
        // },
        {
            title: 'p3c插件检测代码规范',
            path: 'tools/p3c/'
        },
        {
            title: 'IDEA快捷键', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'IDEA常用快捷键（MAC和WIN对比）',
                    path: 'software/idea/keymap/IDEA常用快捷键MAC和WIN对比.md'
                },
                {
                    title: 'IDEA上阅读源码快捷键',
                    path: 'software/idea/keymap/IDEA上阅读源码快捷键.md'
                }
            ]
        },
        {
            title: 'IDEA maven下载jar包太慢',
            path: 'tools/idea/IDEAmaven下载jar包太慢.md'
        },
        {
            title: 'IDEA中项目误报包不存在',
            path: 'tools/idea/IDEA中项目误报包不存在.md'
        }
    ]
}