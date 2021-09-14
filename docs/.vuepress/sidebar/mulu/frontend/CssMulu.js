exports.mulu = {
    title: 'CSS',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'CSS设置背景图片',   // 必要的
            path: 'frontend/css/background/CSS设置背景图片.md'
        },
        {
            title: '属性',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'CSS属性box-sizing',   // 必要的
                    path: 'frontend/css/attribute/CSS属性box-sizing.md'
                },
                {
                    title: 'css样式权重和优先级',   // 必要的
                    path: 'frontend/css/attribute/css样式权重和优先级.md'
                },
                {
                    title: 'calc()函数',   // 必要的
                    path: 'frontend/css/attribute/calc函数.md'
                }
            ]
        }
    ]
}