exports.mulu = {
    title: '优化',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: '首屏优化',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '首屏优化之-vue路由懒加载和使用懒加载prefetch问题',   // 必要的
                    path: 'frontend/optimization/firstscreen/首屏优化之-vue路由懒加载.md'
                }, {
                    title: '首页优化之-gzip压缩',   // 必要的
                    path: 'frontend/optimization/firstscreen/首页优化之-gzip压缩.md'

                }
            ]
        }
    ]
}