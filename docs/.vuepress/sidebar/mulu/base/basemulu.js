exports.mulu =   {
    title: 'Java基础',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Java基础',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                'base/object/Java基础.md',
                'base/object/关键字总结.md',
                'base/error/Java异常处理.md',
                'base/error/Java反射.md',
                'base/annotation/Java反射.md',
                'base/interview/Java基础面试提问.md',
            ]
        },
        {
            title: '容器',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                'base/collection/Java容器基础.md',
                'base/collection/HashMap相关问题.md',
                'base/collection/ArrayList的扩容机制.md',
                'base/collection/Comparable和Comparator.md',
            ]
        },
        {
            title: '多线程',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                {
                    title: '多线程',   // 必要的
                    path: 'base/thread/多线程.md'
                },
                {
                    title: '线程生命周期',   // 必要的
                    path: 'base/thread/线程生命周期.md'
                },
                {
                    title: '线程通信',   // 必要的
                    path: 'base/thread/线程通信.md'
                },
                {
                    title: '死锁',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 0,    // 可选的, 默认值是 1
                    children: [
                        'base/thread/死锁.md',
                        'base/thread/如何发现、预防、解决死锁.md',
                    ]
                },
            ]
        },
        {
            title: '并发',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
               
                {
                    title: 'synchronized关键字', 
                    path: 'base/concurrent/synchronized关键字.md'
                },
                {
                    title: 'ReentrantLock.md', 
                    path: 'base/concurrent/ReentrantLock.md'
                },
                {
                    title: 'volatile关键字', 
                    path: 'base/concurrent/volatile关键字.md'
                },
                {
                    title: '线程池', 
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        
                        {
                            title: '线程池', 
                            path: 'base/concurrent/线程池.md'
                        }, {
                            title: '线程池四种创建线程的方法', 
                            path: 'base/concurrent/threadpool/线程池四种创建线程的方法.md'
                        },
                        {
                            title: 'ThreadPoolExecutor类', 
                            path: 'base/concurrent/ThreadPoolExecutor类.md'
                        },
                        {
                            title: '线程池的具体实现原理', 
                            path: 'base/concurrent/线程池的具体实现原理.md'
                        },
                        {
                            title: '线程池的处理流程', 
                            path: 'base/concurrent/线程池的处理流程.md'
                        },
                        {
                            title: '线程池使用示例', 
                            path: 'base/concurrent/线程池使用示例.md'
                        },
                        {
                            title: 'Executors创建线程池', 
                            path: 'base/concurrent/Executors创建线程池.md'
                        },
                        {
                            title: '如何合理配置线程池的大小', 
                            path: 'base/concurrent/如何合理配置线程池的大小.md'
                        },
                        {
                            title: 'ThreadPoolTaskExecutor', 
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2,    // 可选的, 默认值是 1
                            children: [
                                {
                                    title: 'ThreadPoolTaskExecutor和ThreadPoolExecutor有何区别?', 
                                    path: 'base/concurrent/ThreadPoolTaskExecutor/ThreadPoolTaskExecutor和ThreadPoolExecutor有何区别.md'
                                }
                            ]},
                        {
                            title: '线程池实战', 
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 0,    // 可选的, 默认值是 1
                            children: [
                                {
                                    title: '在接口中使用线程池，处理数据', 
                                    path: 'base/concurrent/threadpool/在接口中使用线程池，处理数据.md'
                                },
                                {
                                    title: '线程池执行完所有任务后再执行主线程方案', 
                                    path: 'base/concurrent/threadpool/线程池执行完所有任务后再执行主线程.md'
                                }
                            ]
                        },
                    ]
                },
                {
                    title: 'ThreadLocal', 
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 0,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'ThreadLocal', 
                            path: 'base/concurrent/ThreadLocal.md'
                        },
                        {
                            title: 'ThreadLocal使用不当导致内存泄漏', 
                            path: 'base/concurrent/ThreadLocal/ThreadLocal使用不当导致内存泄漏.md'
                        }
                    ]
                },
                {
                    title: 'java锁', 
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 0,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: '乐观锁和悲观锁', 
                            path: 'base/concurrent/乐观锁和悲观锁.md'
                        },
                        {
                            title: 'java锁分类', 
                            path: 'https://tech.meituan.com/2018/11/15/java-lock.html'
                        }
                    ]
                },
                {
                    title: 'Callable和Future', 
                    path:"base/concurrent/Callable和Future.md"
                },
                {
                    title: 'Atomic原子类', 
                    path:"base/concurrent/Atomic原子类.md"
                },
                {
                    title: 'CAS（比较并替换）', 
                    path:"base/concurrent/cas.md"
                },
                {
                    title: 'AQS构建锁和同步器', 
                    path:"base/concurrent/AQS构建锁和同步器.md"
                }
            ]
        },
    ]
}