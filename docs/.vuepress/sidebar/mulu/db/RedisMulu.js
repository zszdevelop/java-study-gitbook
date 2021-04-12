exports.mulu = {
    title: 'Redis',   // 必要的
    // path: '/redis/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Redis面经',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '为什么redis能这么快？',   // 必要的
                    path: 'redis/interview/为什么redis能这么快.md'
                },{
                    title: 'Redis从海量数据里查询某一固定前缀的key',   // 必要的
                    path: 'redis/interview/Redis从海量数据里查询某一固定前缀的key.md'
                },{
                    title: 'Redis如何实现分布式锁?',   // 必要的
                    path: 'redis/interview/Redis如何实现分布式锁.md'
                },{
                    title: 'Redis如何实现异步队列?',   // 必要的
                    path: 'redis/interview/Redis如何实现异步队列.md'
                },{
                    title: 'Redis如何做持久化',   // 必要的
                    path: 'redis/interview/Redis如何做持久化.md'
                },{
                    title: 'Redis主从同步',   // 必要的
                    path: 'redis/interview/Redis主从同步.md'
                },{
                    title: 'Redis集群',   // 必要的
                    path: 'redis/interview/Redis集群.md'
                },
                {
                    title: 'redis面试考点',   // 必要的
                    path: 'redis/interview/'
                },
                {
                    title: 'redis面试问题',   // 必要的
                    path: 'redis/interview/redis面试问题.md'
                }
            ]
        } ,
        {
            title: 'redis事务',   // 必要的
            path: 'redis/interview/redis事务.md'
        },
        {
            title: 'redis使用场景',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Redis缓存场景',   // 必要的
                    path: 'redis/scene/redis使用场景.md'
                },
                {
                    title: 'hash场景',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'Redis修改局部信息场景，如用户信息（hash,）',   // 必要的
                            path: 'redis/scene/Redis修改局部信息场景.md'
                        },
                    ]
                }, {
                    title: 'list场景',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'Redis用作消息队列(list)',   // 必要的
                            path: 'redis/scene/Redis用作消息队列.md'
                        },
                        {
                            title: 'Redis最新内容 （list）',   // 必要的
                            path: 'redis/scene/Redis最新内容.md'
                        },
                    ]
                }, {
                    title: 'set场景',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: '共同好友列表 (set)',   // 必要的
                            path: 'redis/scene/共同好友列表.md'
                        }
                    ]
                }, {
                    title: 'zset场景',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'Redis排行榜场景（zset）',   // 必要的
                            path: 'redis/scene/Redis排行榜场景.md'
                        },
                        {
                            title: 'Redis热门服务场景(zset)',   // 必要的
                            path: 'redis/scene/Redis热门服务场景.md'
                        },
                        {
                            title: 'Redis在线人数场景（zset）',   // 必要的
                            path: 'redis/scene/Redis在线人数场景.md'
                        }
                    ]
                },
                {
                    title: 'Redis使用场景总结',   // 必要的
                    path: 'redis/scene/Redis使用场景总结.md'
                }
            ]
        },
        {
            title: 'Redis可能出现的问题',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Redis缓存雪崩',   // 必要的
                    path: 'redis/question/Redis缓存雪崩.md'
                },
                {
                    title: 'Redis缓存穿透',   // 必要的
                    path: 'redis/question/Redis缓存穿透.md'
                },
                {
                    title: '如何解决 Redis 的并发竞争 Key 问题',   // 必要的
                    path: 'redis/question/如何解决 Redis 的并发竞争 Key 问题.md'
                },
                {
                    title: 'Redis缓存预热',   // 必要的
                    path: 'redis/question/Redis缓存预热.md'
                },
                {
                    title: 'Redis保证缓存与数据库双写时的数据一致性',   // 必要的
                    path: 'redis/question/Redis保证缓存与数据库双写时的数据一致性.md'
                },
            ]
        },
        // {
        //     title: 'redis分布式锁',   // 必要的
        //     collapsable: true, // 可选的, 默认值是 true,
        //     sidebarDepth: 2,    // 可选的, 默认值是 1
        //     children: [
        //         {
        //             title: 'redis分布式锁',   // 必要的
        //             path: 'redis/lock/'
        //         },
        //         {
        //             title: '一步步实现单机redis的分布式锁（setnx）',   // 必要的
        //             path: 'redis/lock/一步步实现单机redis的分布式锁.md'
        //         },
        //         {
        //             title: 'Redlock分布式锁',   // 必要的
        //             path: 'redis/lock/Redlock分布式锁.md'
        //         },
        //         {
        //             title: 'Redis的操作为什么是原子性的?',   // 必要的
        //             path: 'redis/lock/Redis的操作为什么是原子性的.md'
        //         }
        //     ]
        // },
       
        {
            title: 'Redist禁用危险命令',   // 必要的
            path: 'redis/interview/Redist禁用危险命令.md'
        },
        {
            title: '安装',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Redis安装',   // 必要的
                    path: 'redis/install/'
                }, {
                    title: '开启远程访问',   // 必要的
                    path: 'redis/install/开启远程访问.md'
                }
            ]
        },
        {
            title: 'Redis使用',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Spring Boot集成redis使用',   // 必要的
                    path: 'redis/use/SpringBoot集成redis使用.md'
                },
                 {
                    title: 'redis连接客户端选择：Jedis,Redisson,Lettuce',   // 必要的
                    path: 'redis/use/redis连接客户端选择.md'
                }, {
                    title: 'JedisPool资源池优化',   // 必要的
                    path: 'redis/use/JedisPool资源池优化.md'
                }, {
                    title: 'RedisUtil工具类的使用(仅供参考)',   // 必要的
                    path: 'redis/use/RedisUtil工具类的使用.md'
                }
            ]
        },
        {
            title: 'Redis实战',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                
                {
                    title: '批量生成redis测试数据方法',   // 必要的
                    path: 'redis/action/批量生成redis测试数据方法.md'
                },
                {
                    title: 'SpringBoot集成redis项目范例',   // 必要的
                    path: 'redis/action/SpringBoot集成redis项目范例.md'
                }
            ]
        }
    ]
}