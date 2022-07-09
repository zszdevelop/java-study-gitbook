exports.mulu = {
    title: '架构', // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
        
        {
            title: '架构-架构基础', // 必要的
            path: 'microservice/arch/架构-架构基础.md'
        },
        {
            title: '架构-理解构架的视角', // 必要的
            path: 'microservice/arch/架构-理解构架的视角.md'
        }, {
            title: '架构-理解架构的演进', // 必要的
            path: 'microservice/arch/架构-理解架构的演进.md'
        },{
            title: '架构-理解架构的模式1', // 必要的
            path: 'microservice/arch/架构-理解架构的模式1.md'
        },{
            title: '架构-理解架构的模式2', // 必要的
            path: 'microservice/arch/架构-理解架构的模式2.md'
        },{
            title: '架构-理解架构的核心要素', // 必要的
            path: 'microservice/arch/架构-理解架构的核心要素.md'
        },

        {
            title: '系统高并发-缓存', // 必要的
            path: 'microservice/arch/系统高并发-缓存.md'
        },
        {
            title: '限流', // 必要的
            // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [

                {
                    title: '系统高并发-限流', // 必要的
                    path: 'microservice/arch/RateLimiter/系统高并发-限流.md'
                },
                {
                    title: 'Redis+Lua限流实现', // 必要的
                    path: 'microservice/arch/RateLimiter/RedisLua限流实现.md'
                }
            ]

        },
        {
            title: '降级和熔断', // 必要的
            // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [

                {
                    title: '架构之高并发：降级和熔断', // 必要的
                    path: 'microservice/arch/DegradationFusing/架构之高并发-降级和熔断.md'
                },
                {
                    title: '架构之高并发：降级和熔断-外卖案例', // 必要的
                    path: 'microservice/arch/DegradationFusing/架构之高并发-降级和熔断-外卖案例.md'
                },
            ]
        },

        {
            title: '架构之高可用：负载均衡', // 必要的
            path: 'microservice/arch/架构之高可用-负载均衡.md'

        },
        {
            title: '架构之高可用：容灾备份,故障转移', // 必要的
            path: 'microservice/arch/架构之高可用-容灾备份故障转移.md'

        },
        {
            title: '架构-保障架构安全', // 必要的
            path: 'microservice/arch/架构-保障架构安全.md'

        }

        

    ]

}