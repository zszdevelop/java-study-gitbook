exports.mulu = {
    title: '并发基础', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
        {
            title: '多线程理论基础', // 必要的
            path: 'thread/base/多线程理论基础.md'
        },
        {
            title: 'Java线程基础', // 必要的
            path: 'thread/base/Java线程基础.md'
        },
        {
            title: 'ThreadLocal',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                
                {
                    title: 'ThreadLocal详解',
                    path: 'thread/base/ThreadLocal/ThreadLocal详解.md'
                },
                {
                    title: 'ThreadLocal',
                    path: 'thread/base/ThreadLocal/ThreadLocal.md'
                },
                {
                    title: 'ThreadLocal使用不当导致内存泄漏',
                    path: 'thread/base/ThreadLocal/ThreadLocal使用不当导致内存泄漏.md'
                },
                {
                    title: 'ThreadLocal使用场景',
                    path: 'thread/base/ThreadLocal/ThreadLocal使用场景.md'
                }
            ]
        },
        // {
        //     title: '多线程', // 必要的
        //     path: 'thread/thread/多线程.md'
        // },
        // {
        //     title: '线程生命周期', // 必要的
        //     path: 'thread/thread/线程生命周期.md'
        // },
        // {
        //     title: '线程通信', // 必要的
        //     path: 'thread/thread/线程通信.md'
        // },
        {
            title: '死锁', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth:2, // 可选的, 默认值是 1
            children: [
                'thread/base/死锁.md',
                'thread/base/如何发现、预防、解决死锁.md',
            ]
        },
    ]
}