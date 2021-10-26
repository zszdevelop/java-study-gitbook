exports.mulu = {
    title: '博客',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Vuepress',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title:'Vuepress打包部署node内存溢出',
                    path:'software/blog/vuepress/Vuepress打包部署node内存溢出.md'
                }
            ]
        },
        {
            title: '小技巧',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title:'PicGo + Gitee(码云)实现markdown图床',
                    path:'software/blog/skill/PicGoGitee实现markdown图床.md'
                },
                {
                    title:'cloudflare免费加速github page',
                    path:'software/blog/skill/cloudflare免费加速github.md'
                }
            ]
        }
    ]
}