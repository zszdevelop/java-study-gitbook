exports.mulu = {
    title: '前端工具类/网站',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: '网络请求',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'axios网络请求封装',   // 必要的
                    path: 'frontend/utilsClass/http/axios网络请求封装.md'
                }
            ]
        },
        {
            title: '工具网站',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'caniuse查看浏览器兼容性',   // 必要的
                    path: 'frontend/utils/caniuse查看浏览器兼容性.md'
                }
            ]
        }
    ]
}