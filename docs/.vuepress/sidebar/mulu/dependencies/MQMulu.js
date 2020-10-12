exports.mulu = {
    title: '消息中间件',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: 'RabbitMQ',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'RabbitMQ基础',   // 必要的
                    path: 'dependencies/mq/RabbitMQ/RabbitMQ基础.md'
                },
                {
                    title: '实战',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'RabbitMQ安装',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/action/RabbitMQ安装.md'
                        },
                        {
                            title: 'SpringBoot整合RabbitMQ',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/action/SpringBoot整合RabbitMQ.md'
                        }]
                },
                {
                    title: '场景实例',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'RabbitMQ场景-商城下单，超时取消订单',   // 必要的
                            path: 'dependencies/mq/RabbitMQ/scene/RabbitMQ场景-商城下单，超时取消订单.md'
                        }]
                }
            ]
        }
    ]
}