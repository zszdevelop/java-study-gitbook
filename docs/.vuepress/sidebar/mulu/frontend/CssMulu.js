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
        },
        {
            title: 'CSS框架',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'TailwindCss',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: '为什么使用TailwindCss',   // 必要的
                            path: 'frontend/css/framework/TailwindCss/为什么使用TailwindCss.md'
                        }
                    ]
                }
            ]
        },
        {
            title: 'CSS预处理器',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'SASS',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'SASS入门',   // 必要的
                            path: 'frontend/css/csspreprocessor/sass/SASS入门.md'
                        }
                    ]
                }
            ]
        },
        {
            title: '基础知识',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                        {
                            title: 'CSS层叠',   // 必要的
                            path: 'frontend/css/basis/CSS层叠.md'
                        }
                    ]
                
        }
    ]
}