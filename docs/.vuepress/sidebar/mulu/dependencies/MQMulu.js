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
                    title: '基础',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'RabbitMQ基础',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/base/RabbitMQ基础.md'
                        },
                        {
                            title: 'RabbitMQ概念补充',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/base/RabbitMQ概念补充.md'
                        },
                        {
                            title: 'RabbitMQ之生产者确认（事务与Confirm发送方确认）',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/base/RabbitMQ之Confirm发送方确认.md'
                        },{
                            title: 'RabbitMQ的Return消息机制',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/base/RabbitMQ的Return消息机制.md'
                        },{
                            title: 'RabbitMQ的消费端自定义监听',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/base/RabbitMQ的消费端自定义监听.md'
                        },{
                            title: 'RabbitMQ消费端限流',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/base/RabbitMQ消费端限流.md'
                        },{
                            title: 'RabbitMQ消费端的ack和重回队列',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/base/RabbitMQ消费端的ack和重回队列.md'
                        },
                       {
                            title: 'RabbitMQ通过TTL队列/消息',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/base/RabbitMQTTL队列与消息.md'
                        },
                        {
                             title: 'RabbitMQ死信队列',   // 必要的
                             path: 'dependencies/mq/RabbitMQ/base/RabbitMQ死信队列.md'
                         },
                    ]},
                
                    {
                        title: '安装',   // 必要的
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
                            }
                        ]
                    },
                {
                    title: '实战',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [

                        {
                            title: 'Java集成RabbitMQ(amqp-client)',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/action/Java集成RabbitMQ之amqp-client.md'
                        },
                        {
                            title: 'Spring集成RabbitMQ(spring-rabbit)',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/action/Spring集成RabbitMQ之spring-rabbit.md'
                        },
                        
                        {
                            title: 'SpringBoot集成RabbitMQ（spring-boot-starter-amqp）',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/action/SpringBoot集成RabbitMQ.md'
                        },
                    ]
                },
                {
                    title: '场景实例',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'RabbitMQ场景-商城下单，超时取消订单',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/scene/RabbitMQ场景-商城下单，超时取消订单.md'
                        },
                        {
                            title: 'RabbitMQ通过TTL和死信队列实现延时队列',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/base/RabbitMQ通过TTL和死信队列实现延时消息.md'
                        },]
                },
                {
                    title: '小技巧',   // 必要的
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