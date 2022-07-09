exports.mulu = {
    title: '微信对接',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: '微信小程序',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '微信小程序-登录实现',   // 必要的
                    path: 'openplatform/weixin/ma/微信小程序Java登录实现.md'
                },
                {
                    title: '微信小程序-客服',   // 必要的
                    path: 'openplatform/weixin/ma/微信小程序客服.md'
                },
                {
                    title: '微信小程序-获取手机号',   // 必要的
                    path: 'openplatform/weixin/ma/微信小程序-获取手机号.md'
                },
                {
                    title: '微信小程序-打开外部链接webview',   // 必要的
                    path: 'openplatform/weixin/ma/微信小程序-打开外部链接webview.md'
                },
                {
                    title: '微信小程序-分享',   // 必要的
                    path: 'openplatform/weixin/ma/微信小程序-分享.md'
                },
                {
                    title: '微信小程序(uniapp)-分包',   // 必要的
                    path: 'openplatform/weixin/ma/微信小程序-分包.md'
                },
                {
                    title: '微信小程序(uniapp)-包大小优化',   // 必要的
                    path: 'openplatform/weixin/ma/微信小程序-包大小优化.md'
                }

                

                
            ]
        },
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
        },
        {
            title: '微信商户对接',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '微信小程序支付实现',   // 必要的
                    path: 'openplatform/weixin/pay/微信小程序支付实现.md'
                },
                {
                    title: '微信小程序退款实现',   // 必要的
                    path: 'openplatform/weixin/pay/微信小程序退款实现.md'
                },
                {
                    title: '微信商户付款实现(企业打款/提现)',   // 必要的
                    path: 'openplatform/weixin/pay/微信商户付款实现.md'
                }
            ]
        },
    ]
}