
exports.mulu = {
    title: '架构', // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
        {
            title: '限流', // 必要的
            // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                {
                    title: '系统高并发-限流',   // 必要的
                    path: 'microservice/arch/RateLimiter/系统高并发-限流.md'
                },
                {
                    title: 'Redis+Lua限流实现',   // 必要的
                    path: 'microservice/arch/RateLimiter/RedisLua限流实现.md'
                }
            ]
        
        }
       
    ]

}