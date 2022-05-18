exports.mulu = {
    title: 'Jvm',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Java内存区域',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Java内存区域',
                    path: 'base/jvm/Java内存区域.md',
                },
                {
                    title: 'HotSpot 虚拟机对象创建',
                    path: 'base/jvm/HotSpot虚拟机对象创建.md',
                }
            ]
        },
        {
            title: 'JVM垃圾回收',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'JVM垃圾回收',
                    path: 'base/jvm/JVM垃圾回收.md',
                },
                {
                    title: 'JVM 内存分配与回收',
                    path: 'base/jvm/JVM内存分配与回收.md',
                },
                {
                    title: '对象已经死亡？',
                    path: 'base/jvm/对象已经死亡.md',
                },
                {
                    title: '垃圾收集算法',
                    path: 'base/jvm/垃圾收集算法.md',
                },
                {
                    title: '垃圾收集器',
                    path: 'base/jvm/垃圾收集器.md',
                },
                {
                    title: 'GC中对象自救',
                    path: 'base/jvm/GC中对象自救.md',
                },
                {
                    title: 'gc日志分析',
                    path: 'base/jvm/gc/gc日志分析.md',
                },
                {
                    title: 'Java如何选择合适的垃圾回收器',
                    path: 'base/jvm/gc/Java如何选择合适的垃圾回收器.md',
                }
            ]
        },
        {
            title: 'JVM性能调优',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                {
                    title: '如何合理的规划JVM性能调优',
                    path: 'base/jvm/如何合理的规划JVM性能调优.md',
                },
                {
                    title: '常见的JVM设置',
                    path: 'base/jvm/常见的JVM设置.md',
                },
                {
                    title: '内存溢出时打印内存信息',
                    path: 'base/jvm/内存溢出时打印内存信息.md',
                },
                {
                    title: '线上如何排查FullGC(系统 CPU 突然飙升且 GC 频繁，你该如何排查',
                    path: 'base/jvm/线上如何排查FullGC.md',
                },
                {
                    title: 'jstack等命令的实现原理',
                    path: 'base/jvm/jstack等命令的实现原理.md',
                },
                {
                    title: 'Java堆设置多大合适',
                    path: 'base/jvm/Java堆设置多大合适.md',
                }
            ]
        }, {
            title: '类加载过程',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '类加载过程',
                    path: 'base/jvm/类加载过程.md',
                },
                {
                    title: '类加载过程(精简版)',
                    path: 'base/jvm/类加载过程精简版.md',
                }
            ]
        }, {
            title: '类加载器',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '类加载器',
                    path: 'base/jvm/类加载器.md',
                },
                {
                    title: '类加载器（常见面试）',
                    path: 'base/jvm/类加载器常见面试.md',
                },
                {
                    title: 'tomcat类加载器',
                    path: 'base/jvm/tomcat类加载器.md',
                }
            ]
        }, {
            title: 'JDK问题排查',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'JDK监控和故障处理工具汇总',
                    path: 'base/jvm/JDK监控和故障处理工具汇总.md',
                },{
                    title: 'visualvm',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'mac版idea配置visualvm',
                            path: 'base/jvm/visualvm/mac版idea配置visualvm.md',
                        },
                        {
                            title: 'MAT使用',
                            path: 'base/jvm/mat使用.md',
                        },
                        {
                            title: 'Shallow heap和Retained heap',
                            path: 'base/jvm/mat/Shallow和Retained.md',
                        },
                        {
                            title: '记一次MAT分析线上项目过程',
                            path: 'base/jvm/mat/记一次MAT分析线上项目过程.md',
                        }
                    ]
                }, {
                    title: 'MAT',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'MAT安装',
                            path: 'base/jvm/mat安装.md',
                        },
                        {
                            title: 'MAT使用',
                            path: 'base/jvm/mat使用.md',
                        },
                        {
                            title: 'Shallow heap和Retained heap',
                            path: 'base/jvm/mat/Shallow和Retained.md',
                        },
                        {
                            title: '记一次MAT分析线上项目过程',
                            path: 'base/jvm/mat/记一次MAT分析线上项目过程.md',
                        }
                    ]
                }
            ]
        }, {
            title: '实战问题',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'JDK7文件转base64内存溢出（OutOfMemoryError:PermGen space）',
                    path: 'base/jvm/actionProblem/JDK7文件转base64内存溢出.md',
                }
            ]
        }, {
            title: 'JVM面试提问',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'JVM面试提问',
                    path: 'base/jvm/JVM面试提问.md',
                }
            ]
        }
    ]
}