exports.mulu = {
    title: 'IO操作', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
            title: 'IO第三方库',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'hutool',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                        title: 'Hutool的IO包之IoUtil源码阅读',
                        path: 'base/io/lib/hutool/Hutool的IO包之IoUtil源码阅读.md'
                    }, {
                        title: 'Hutool的IO包之FileUtil源码阅读',
                        path: 'base/io/lib/hutool/Hutool的IO包之FileUtil源码阅读.md'
                    }, {
                        title: 'Hutool的IO包之资源ResourceUtil源码阅读',
                        path: 'base/io/lib/hutool/Hutool的IO包之资源ResourceUtil源码阅读.md'
                    }]
                },
                {
                    title: 'ApacheCommons-IO',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                        title: 'Apache的Commons-IO学习使用',
                        path: 'base/io/lib/ApacheCommons-IO/Apache的Commons-IO学习使用.md'
                    }]
                }
            ]
        },
        {
            title: '常见问题',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: 'MultipartFile与File',
                path: 'base/io/problem/MultipartFile与File.md'
            }]
        }
    ]
}