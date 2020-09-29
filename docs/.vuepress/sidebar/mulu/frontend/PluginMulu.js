exports.mulu = {
    title: '插件&依赖',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: 'eslint',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: '关闭eslint',   // 必要的
                    path: 'frontend/plugin/eslint/关闭eslint.md'
                }
            ]
        },
        {
            title: 'md5',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'js安装和使用md5',   // 必要的
                    path: 'frontend/plugin/md5/js安装和使用md5.md'
                }
            ]
        }
        , {
            title: 'pdf预览',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'vue项目预览pdf',   // 必要的
                    path: 'frontend/plugin/pdf/vue项目预览pdf.md'
                }
            ]
        }
    ]
}