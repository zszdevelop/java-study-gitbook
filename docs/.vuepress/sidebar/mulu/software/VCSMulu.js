exports.mulu = {
    title: '版本控制',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'git',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: '删除.git中的错误提交的文件',   // 必要的
                    path: 'tools/vcs/git/删除git中的错误提交的文件.md'
                },
                {
                    title: 'gitignore文件屏蔽规则',   // 必要的
                    path: 'tools/vcs/git/gitignore文件屏蔽规则.md'
                },  {
                    title: 'git工作流',   // 必要的
                    path: 'tools/vcs/git/git工作流.md'

                }, {
                    title: 'git merge的三种操作',   // 必要的
                    path: 'tools/vcs/git/gitmerge的三种操作.md'

                }
            ]
        }
    ]
}