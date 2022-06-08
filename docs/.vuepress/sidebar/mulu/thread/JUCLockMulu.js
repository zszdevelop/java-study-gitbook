exports.mulu = {
    title: 'JUC锁', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
        {
            title: '锁核心类AQS详解', // 必要的
            sidebarDepth: 3, 
            path: 'thread/JUCLock/锁核心类AQS详解.md'
        },
        {
            title: 'LockSupport',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 0, // 可选的, 默认值是 1
            children: [{
                title: 'LockSupport用法',
                path: 'thread/JUCLock/LockSupport/LockSupport用法.md'
            },{
                title: 'LockSupport源码分析',
                path: 'thread/JUCLock/LockSupport/LockSupport源码.md'
            },
            ]
        },
        {
            title: 'ReentrantLock',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [

                {
                    title: 'ReentrantLock重入锁',
                    path: 'thread/JUCLock/ReentrantLock/ReentrantLock重入锁.md'
                },
                {
                    title: '源码分析',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: 'ReentrantLock源码分析(一)-整体流程',
                            path: 'thread/JUCLock/ReentrantLock/source/ReentrantLock源码分析.md'
                        },
                        {
                            title: 'ReentrantLock源码分析(二)-锁细节',
                            path: 'thread/JUCLock/ReentrantLock/source/ReentrantLock源码分析二.md'
                        },
                        {
                            title: 'ReentrantLock源码分析(三)-应用',
                            path: 'thread/JUCLock/ReentrantLock/source/ReentrantLock源码分析三.md'
                        },

                    ]
                },
                {
                    title: '条件锁Condition',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: 'ReentrantLock之条件锁Condition源码分析',
                            path: 'thread/JUCLock/ReentrantLock/Condition/ReentrantLock之条件锁Condition源码分析.md'
                        },
                        {
                            title: 'ReentrantLock和条件锁Condition实现阻塞队列ArrayBlockingQueue',
                            path: 'thread/JUCLock/ReentrantLock/Condition/ReentrantLock和条件锁Condition实现阻塞队列ArrayBlockingQueue.md'
                        },

                    ]
                }

                
            ]

        },
    ]
}