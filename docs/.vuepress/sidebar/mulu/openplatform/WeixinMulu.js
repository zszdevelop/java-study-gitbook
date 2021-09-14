exports.mulu = {
    title: '微信对接',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: '微信公众号对接',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '微信公众号服务器配置',   // 必要的
                    path: 'openplatform/weixin/mp/微信公众号服务器配置.md'
                },
                {
                    title: '微信公众号-网页授权-微信扫码登录实现',   // 必要的
                    path: 'openplatform/weixin/mp/微信公众号-网页授权-微信扫码登录实现.md'
                }
            ]
        }
    ]
}