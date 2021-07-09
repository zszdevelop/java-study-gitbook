exports.mulu = {
    title: '布局', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
        title: 'flex布局', // 必要的
        //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [{
            title: 'flex布局', // 必要的
            path: 'frontend/layout/flex/flex布局.md'
        }, {
            title: 'flex布局实例', // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'flex布局实例（骰子的布局）', // 必要的
                    path: 'frontend/layout/flex/example/flex布局示例（骰子的布局）.md'
                },
                {
                    title: 'flex布局-流式布局实例', // 必要的
                    path: 'frontend/layout/flex/example/flex布局-流式布局实例.md'
                }, {
                    title: 'flex布局-网格布局', // 必要的
                    path: 'frontend/layout/flex/example/flex布局-网格布局.md'
                },
                {
                    title: 'flex布局-圣杯布局', // 必要的
                    path: 'frontend/layout/flex/example/flex布局-圣杯布局.md'
                },
                {
                    title: 'flex布局-输入框的布局', // 必要的
                    path: 'frontend/layout/flex/example/flex布局-输入框的布局.md'
                },
                {
                    title: 'flex布局-悬挂式布局', // 必要的
                    path: 'frontend/layout/flex/example/flex布局-悬挂式布局.md'
                },
                {
                    title: 'flex布局-固定的底栏', // 必要的
                    path: 'frontend/layout/flex/example/flex布局-固定的底栏.md'
                },
            ]

        }]
    }, {
        title: '居中', // 必要的
        //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [{
            title: 'CSS布局垂直居中', // 必要的
            path: 'frontend/layout/center/CSS布局垂直居中.md'
        }, {
            title: 'CSS水平居中的7种实现方式', // 必要的
            path: 'frontend/layout/center/CSS水平居中的7种实现方式.md'

        }]
    }, {
        title: '适配方案', // 必要的
        //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [{
            title: 'Vue移动端和pc端适配方案', // 必要的
            path: 'frontend/layout/adapter/Vue移动端和pc端适配方案.md'
        }]
    }]
}