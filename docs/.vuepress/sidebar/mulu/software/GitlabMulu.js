exports.mulu = {
    title: 'gitlab',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'gitlab搭建',   // 必要的
            path: 'tools/gitlab/gitlab搭建.md'
        },
        {
            title: 'Gitlab-CI',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Gitlab-Runner的安装与使用',   // 必要的
                    path: 'tools/gitlab/ci/Gitlab-Runner的安装与使用.md'
                },
                {
                    title: 'Gitlab-Runner实践',   // 必要的
                    path: 'tools/gitlab/ci/Gitlab-Runner实践.md'
                }
            ]
        },
        {
            title: 'gitlab配置custom hook',   // 必要的
            path: 'tools/gitlab/custom-hook.md'
        },
        {
            title: 'gitlab内存占用过大',   // 必要的
            path: 'tools/gitlab/gitlab内存占用过大.md'
        },
        {
            title: '问题集锦',   // 必要的
            path: 'tools/gitlab/问题集锦.md'
        }
    ]
}