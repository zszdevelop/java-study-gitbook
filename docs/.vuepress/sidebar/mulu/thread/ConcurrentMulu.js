exports.mulu = {
    title: '并发', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
       
        {
            title: '线程池',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [

                {
                    title: '线程池',
                    path: 'thread/concurrent/线程池.md'
                }, {
                    title: '线程池四种创建线程的方法',
                    path: 'thread/concurrent/threadpool/线程池四种创建线程的方法.md'
                },
                {
                    title: 'ThreadPoolExecutor类',
                    path: 'thread/concurrent/ThreadPoolExecutor类.md'
                },
                {
                    title: '线程池的具体实现原理',
                    path: 'thread/concurrent/线程池的具体实现原理.md'
                },
                {
                    title: '线程池的处理流程',
                    path: 'thread/concurrent/线程池的处理流程.md'
                },
                {
                    title: '线程池使用示例',
                    path: 'thread/concurrent/线程池使用示例.md'
                },
                {
                    title: 'Executors创建线程池',
                    path: 'thread/concurrent/Executors创建线程池.md'
                },
                {
                    title: '如何合理配置线程池的大小',
                    path: 'thread/concurrent/如何合理配置线程池的大小.md'
                },
                {
                    title: 'ThreadPoolTaskExecutor',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                        title: 'ThreadPoolTaskExecutor和ThreadPoolExecutor有何区别?',
                        path: 'thread/concurrent/ThreadPoolTaskExecutor/ThreadPoolTaskExecutor和ThreadPoolExecutor有何区别.md'
                    }]
                },
                {
                    title: '线程池实战',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 0, // 可选的, 默认值是 1
                    children: [{
                            title: '在接口中使用线程池，处理数据',
                            path: 'thread/concurrent/threadpool/在接口中使用线程池，处理数据.md'
                        },
                        {
                            title: '线程池执行完所有任务后再执行主线程方案',
                            path: 'thread/concurrent/threadpool/线程池执行完所有任务后再执行主线程.md'
                        }
                    ]
                },
            ]
        },
        
        {
            title: 'java锁',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                
                {
                    title: 'Java中所有的锁',
                    path: 'thread/concurrent/lock/Java中所有的锁.md'
                },
                {
                    title: '乐观锁和悲观锁',
                    path: 'thread/concurrent/lock/乐观锁和悲观锁.md'
                },
                {
                    title: 'java锁分类',
                    path: 'https://tech.meituan.com/2018/11/15/java-lock.html'
                },
                {
                    title: 'java自旋锁',
                    path: 'thread/concurrent/lock/java自旋锁.md'
                },
            ]
        },
        {
            title: 'Callable和Future',
            path: "thread/concurrent/Callable和Future.md"
        },
        {
            title: 'Atomic原子类',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth:2, // 可选的, 默认值是 1
            children: [{
                    title: 'Atomic原子类',
                    path: 'thread/concurrent/Atomic/Atomic原子类.md'
                },
                {
                    title: '原子类AtomicInteger源码解析',
                    path: 'thread/concurrent/Atomic/AtomicInteger源码解析.md'
                },
                {
                    title: '版本号原子类AtomicStampedReference源码解析',
                    path: 'thread/concurrent/Atomic/AtomicStampedReference源码解析.md'
                }
                

            ]
        },
        {
            title: 'CAS（比较并替换）',
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 0, // 可选的, 默认值是 1
            children: [{
                title: 'CAS（比较并替换）',
                path: 'thread/concurrent/cas/cas.md'
            },{
                title: 'UnSafe类详解',
                path: 'thread/concurrent/cas/UnSafe类详解.md'
            },

            
            ]
        },
        {
            title: 'AQS构建锁和同步器',
            path: "thread/concurrent/AQS构建锁和同步器.md"
        },
    ]
}