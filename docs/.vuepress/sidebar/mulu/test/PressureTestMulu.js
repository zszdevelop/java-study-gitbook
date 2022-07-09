exports.mulu = {
    title: '压力测试',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        
        {
            title: '性能测试指标',   // 必要的
            path: 'test/PressureTest/性能测试指标.md'
        },
        {
            title: 'JMeter',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'mac下JMeter的安装',   // 必要的
                    path: 'test/PressureTest/JMeter/JMeter的安装.md'
                },
                {
                    title: 'JMeter的基本使用',   // 必要的
                    path: 'test/PressureTest/JMeter/JMeter的基本使用.md'
                },
                {
                    title: 'JMeter配置元件',   // 必要的
                    path: 'test/PressureTest/JMeter/JMeter配置元件.md'
                },
                
                {
                    title: 'JMeter逻辑控制器',   // 必要的
                    path: 'test/PressureTest/JMeter/JMeter逻辑控制器.md'
                },
                {
                    title: 'JMeter后置处理器',   // 必要的
                    path: 'test/PressureTest/JMeter/JMeter后置处理器.md'
                },
                {
                    title: 'JMeter监听器',   // 必要的
                    path: 'test/PressureTest/JMeter/JMeter监听器.md'
                },
                {
                    title: 'JMeter断言',   // 必要的
                    path: 'test/PressureTest/JMeter/JMeter断言.md'
                },
                {
                    title: 'JMeter函数',   // 必要的
                    path: 'test/PressureTest/JMeter/JMeter函数.md'
                },
                
                
                
                {
                    title: '插件',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'JMeter插件使用',   // 必要的
                            path: 'test/PressureTest/JMeter/plugins/JMeter插件使用.md'
                        }]
                }, {
                    title: '遇到的问题',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'JMeter测试连接超时',   // 必要的
                            path: 'test/PressureTest/JMeter/question/JMeter测试连接超时.md'
                        }]
                }
            ]
        },
        {
            title: 'siege',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Mac压测Siege',   // 必要的
                    path: 'test/PressureTest/siege/Mac压测Siege.md'
                },
                {
                    title: 'Siege压测POST实例',   // 必要的
                    path: 'test/PressureTest/siege/Siege压测POST实例.md'
                }
            ]
        }
    ]
}