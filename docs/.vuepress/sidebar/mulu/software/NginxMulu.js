exports.mulu = {
    title: 'nginx',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: '安装',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [{
                title:'Linux安装nginx',
                path:'software/nginx/install/Linux安装nginx.md'
            },{
                title:'Mac安装nginx',
                path:'software/nginx/install/Mac安装nginx.md'
            } 
        ]},
        {
            title:'nginx设置开机自启动',
            path:'software/nginx/nginx设置开机自启动.md'
        },
        {
            title: '问题集锦',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'nginx设置请求body大小',   // 必要的
                    path: 'software/nginx/problem/nginx设置请求body大小.md'
                },
                {
                    title: '四种解决Nginx出现403 forbidden 报错的方法',   // 必要的
                    path: 'software/nginx/problem/403Forbidden.md'
                },
                {
                    title: '支持websocket',   // 必要的
                    path: 'software/nginx/problem/支持websocket.md'
                }
            ]
        },
        {
            title: 'nginx的root和alias的区别',   // 必要的
            path: 'software/nginx/nginx的root和alias的区别.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        }
    ]
}