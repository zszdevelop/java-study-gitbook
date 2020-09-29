exports.mulu = {
    title: '版本控制',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: 'git',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'gitignore文件屏蔽规则',   // 必要的
                    path: 'tools/vcs/git/gitignore文件屏蔽规则.md'
                }, {
                    title: 'android gitignore 模板',   // 必要的
                    path: 'tools/vcs/git/androidGitignore模板.md'

                }
            ]
        }
    ]
}