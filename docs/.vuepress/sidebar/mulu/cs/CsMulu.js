exports.mulu = {
    title: '计算机基础',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: '计算机网络',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '计算机网络常见知识点',   // 必要的
                    path: 'cs/net/计算机网络常见知识点.md'
                }, {
                    title: '计算机网络面试问题',   // 必要的
                    path: 'cs/net/计算机网络面试问题.md'

                }
            ]
        },
        {
            title: 'UML类图',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '计算机网络常见知识点',   // 必要的
                    path: 'cs/uml/'
                }, {
                    title: 'UML类图实例',   // 必要的
                    path: 'cs/uml/UML类图实例.md'

                }
            ]
            
        },
        {
            title: '磁盘存取',   // 必要的
            path: 'cs/disk/'
        },
        {
            title: 'DNS域名解析',   // 必要的
            path: 'cs/dns/'
        },
        {
            title: 'CDN',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'CDN',   // 必要的
                    path: 'cdn/'
                }, {
                    title: '相关概念',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'DNS域名解析',   // 必要的
                            path: 'cs/dns/'
                        }]
                },
                {
                    title: '阿里云CDN使用',   // 必要的
                    path: 'cdn/阿里云CDN使用.md'
                },
                {
                    title: '阿里云带宽价格',   // 必要的
                    path: 'cdn/阿里云带宽价格.md'
                }
            ]
        },{
            title: 'Https',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children:[
                {
                    title: '网站支持https',   // 必要的
                    path: 'problem&solve/https/网站支持https.md'
                }
            ]
        }
    ]
}