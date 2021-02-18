exports.mulu = {
    title: '压力测试',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [

        {
            title: 'siege',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
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
        },
        {
            title: 'JMeter',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'mac下JMeter的安装',   // 必要的
                    path: 'test/PressureTest/JMeter/JMeter的安装.md'
                },
                {
                    title: 'JMeter的基本使用',   // 必要的
                    path: 'test/PressureTest/JMeter/JMeter的基本使用.md'
                }, {
                    title: '遇到的问题',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'JMeter测试连接超时',   // 必要的
                            path: 'test/PressureTest/JMeter/question/JMeter测试连接超时.md'
                        }]
                }
            ]
        }
    ]
}