exports.mulu = {
    title: '布局',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'flex布局',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'flex布局',   // 必要的
                    path: 'frontend/layout/flex/flex布局.md'
                }, {
                    title: 'flex布局实例',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'flex布局实例（骰子的布局）',   // 必要的
                            path: 'frontend/layout/flex/example/flex布局示例（骰子的布局）.md'
                        },
                        {
                            title: 'flex布局-流式布局实例',   // 必要的
                            path: 'frontend/layout/flex/example/flex布局-流式布局实例.md'
                        }, {
                            title: 'flex布局-网格布局',   // 必要的
                            path: 'frontend/layout/flex/example/flex布局-网格布局.md'
                        },
                        {
                            title: 'flex布局-圣杯布局',   // 必要的
                            path: 'frontend/layout/flex/example/flex布局-圣杯布局.md'
                        },
                        {
                            title: 'flex布局-输入框的布局',   // 必要的
                            path: 'frontend/layout/flex/example/flex布局-输入框的布局.md'
                        },
                        {
                            title: 'flex布局-悬挂式布局',   // 必要的
                            path: 'frontend/layout/flex/example/flex布局-悬挂式布局.md'
                        },
                        {
                            title: 'flex布局-固定的底栏',   // 必要的
                            path: 'frontend/layout/flex/example/flex布局-固定的底栏.md'
                        },
                    ]

                }
            ]
        }
    ]
}