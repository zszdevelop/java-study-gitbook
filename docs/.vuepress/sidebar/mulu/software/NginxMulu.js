exports.mulu = {
    title: 'nginx',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title:'安装nginx',
            path:'linux/nginx/安装nginx.md'
        },
        {
            title:'nginx设置开机自启动',
            path:'linux/nginx/nginx设置开机自启动.md'
        },
        {
            title: '问题集锦',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'nginx设置请求body大小',   // 必要的
                    path: 'linux/nginx/problem/nginx设置请求body大小.md'
                },
                {
                    title: '403 Forbidden',   // 必要的
                    path: 'linux/nginx/problem/403Forbidden.md'
                },
                {
                    title: '支持websocket',   // 必要的
                    path: 'linux/nginx/problem/支持websocket.md'
                }
            ]
        },
        {
            title: 'nginx的root和alias的区别',   // 必要的
            path: 'linux/nginx/nginx的root和alias的区别.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        }
    ]
}