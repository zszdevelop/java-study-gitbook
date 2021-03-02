exports.mulu = {
    title: '爬虫实用技巧',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: '免费短信注册各平台',   // 必要的
            path: 'python/skill/免费短信注册各平台.md'
        }, {
            title: 'ip代理',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '小象代理',   // 必要的
                    path: 'python/skill/ipproxy/小象代理.md'
                }
            ]
        }
    ]
}