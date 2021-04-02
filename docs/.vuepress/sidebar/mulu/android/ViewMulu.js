exports.mulu = {
    title: 'View组件',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'WebView',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Android调用js方法',   // 必要的
                    path: 'android/view/webview/Android调用js方法.md'
                },
                {
                    title: 'Js调用Android方法',   // 必要的
                    path: 'android/view/webview/Js调用Android方法.md'
                }
            ]
        }
    ]
}