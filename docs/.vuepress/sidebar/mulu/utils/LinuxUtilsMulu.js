exports.mulu = {
    title: 'Linux脚本等工具类',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Java-Jar包运行脚本',   // 必要的
            path: 'tools/script/运行脚本.md',     
        },
        {
            title: '监控进程并重启',   // 必要的
            path: 'tools/script/监控进程并重启.md',     
        }
    ]
}