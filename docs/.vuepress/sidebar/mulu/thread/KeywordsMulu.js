exports.mulu = {
    title: '关键字', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
        {
            title: 'synchronized关键字',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                
                {
                    title: 'synchronized详解',
                    path: 'thread/Keywords/synchronized/synchronized详解.md'
                },
                {
                    title: 'Synchronized的实现原理',
                    path: 'thread/Keywords/synchronized/Synchronized的实现原理.md'
                },
                {
                    title: 'synchronized关键字',
                    path: 'thread/Keywords/synchronized/synchronized关键字.md'
                },
            ]

        },
        {
            title: 'volatile关键字',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'volatile关键字',
                    path: 'thread/Keywords/volatile/volatile关键字.md'
                },
                // {
                //     title: 'volatile关键字(老版)', 
                //     path: 'thread/Keywords/volatile关键字old.md'
                // }
                {
                    title: '相关基础',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                        title: 'java内存模型',
                        path: 'thread/Keywords/volatile/java内存模型.md'
                    }]
                }
            ]

        },
        // {
        //     title: 'final关键字',
        //     path: 'thread/Keywords/final/final关键字.md'
        // },
    ]
}