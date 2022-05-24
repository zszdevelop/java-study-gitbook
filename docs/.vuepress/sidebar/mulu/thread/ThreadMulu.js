exports.mulu = {
    title: '多线程', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 0, // 可选的, 默认值是 1
    children: [{
            title: '多线程', // 必要的
            path: 'thread/thread/多线程.md'
        },
        {
            title: '线程生命周期', // 必要的
            path: 'thread/thread/线程生命周期.md'
        },
        {
            title: '线程通信', // 必要的
            path: 'thread/thread/线程通信.md'
        },
        {
            title: '死锁', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth:2, // 可选的, 默认值是 1
            children: [
                'thread/thread/死锁.md',
                'thread/thread/如何发现、预防、解决死锁.md',
            ]
        },
    ]
}