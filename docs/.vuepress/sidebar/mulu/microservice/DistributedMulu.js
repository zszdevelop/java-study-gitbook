
exports.mulu = {
    title: '分布式系统', // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
        {
            title: '分布式理论', // 必要的
            // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                
                {
                    title: '分布式系统-理论基础及一致性算法',   // 必要的
                    path: 'microservice/distributed/theory/分布式系统-理论基础及一致性算法.md'
                },
                {
                    title: '分布式理论-CAP',   // 必要的
                    path: 'microservice/distributed/theory/分布式理论-CAP.md'
                },
                {
                    title: '分布式理论-BASE',   // 必要的
                    path: 'microservice/distributed/theory/分布式理论-BASE.md'
                },
                {
                    title: '微服务基础-康威定律',   // 必要的
                    path: 'microservice/distributed/theory/微服务基础-康威定律.md'
                },
                {
                    title: '分布式、集群、微服务、SOA相关概念',   // 必要的
                    path: 'microservice/distributed/theory/分布式集群微服务SOA相关概念.md'
                },

            ]
        },
        {
            title: '分布式系统-全局唯一ID实现方案',   // 必要的
            path: 'microservice/distributed/分布式系统-全局唯一ID实现方案.md'
        },
        {
            title: '分布式系统-分布式锁',   // 必要的
            path: 'microservice/distributed/分布式系统-分布式锁.md'
        }, {
            title: '分布式系统-分布式事务及实现方案',   // 必要的
            path: 'microservice/distributed/分布式系统-分布式事务及实现方案.md'
        }, {
            title: '分布式系统-分布式缓存及方案实现',   // 必要的
            path: 'microservice/distributed/分布式系统-分布式缓存及方案实现.md'
        },{
            title: '分布式系统-分布式任务及实现方案',   // 必要的
            path: 'microservice/distributed/分布式系统-分布式任务及实现方案.md'
        },{
            title: '分布式系统-分布式会话及实现方案',   // 必要的
            path: 'microservice/distributed/分布式系统-分布式会话及实现方案.md'
        },{
            title: '分布式系统-分布式系统的8个谬误',   // 必要的
            path: 'microservice/distributed/分布式系统-分布式系统的8个谬误.md'
        },
        
       
    ]

}