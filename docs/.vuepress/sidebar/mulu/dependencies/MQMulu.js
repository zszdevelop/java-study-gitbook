exports.mulu = {
    title: '消息中间件',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'RabbitMQ',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '安装与实战',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'RabbitMQ基础',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/base/RabbitMQ基础.md'
                        },
                        {
                            title: 'RabbitMQ通过TTL和死信队列实现延时队列',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/base/RabbitMQ通过TTL和死信队列实现延时消息.md'
                        },
                        {
                            title: 'RabbitMQ概念补充',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/base/RabbitMQ概念补充.md'
                        },
                        {
                            title: 'RabbitMQ之生产者确认（事务与Confirm发送方确认）',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/base/RabbitMQ之Confirm发送方确认.md'
                        },
                    ]},
                
                
                {
                    title: '安装与实战',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'RabbitMQ安装',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/install/RabbitMQ安装.md'
                        },
                        {
                            title: 'Docker安装RabbitMQ',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/install/Docker安装RabbitMQ.md'
                        },
                        {
                            title: 'RabbitMQ入门实战',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/action/RabbitMQ入门实战.md'
                        },
                        
                        {
                            title: 'SpringBoot整合RabbitMQ',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/action/SpringBoot整合RabbitMQ.md'
                        }]
                },
                {
                    title: '场景实例',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'RabbitMQ场景-商城下单，超时取消订单',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/scene/RabbitMQ场景-商城下单，超时取消订单.md'
                        }]
                },
                {
                    title: '相关问题（面试）',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'RabbitMQ消息如何保障100%投递成功?',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/interview/RabbitMQ消息如何保障100投递成功.md'
                        }]
                }
            ]
        }
    ]
}