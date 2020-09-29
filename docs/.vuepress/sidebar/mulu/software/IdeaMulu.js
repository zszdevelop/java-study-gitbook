exports.mulu = {
    title: 'IDEA软件',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title:'jrebel热加载',
            path:'tools/Jrebel/'
        },
        {
            title:'p3c插件检测代码规范',
            path:'tools/p3c/'
        },
        {
            title: 'IDEA快捷键',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title:'IDEA上阅读源码快捷键',
                    path:'software/idea/keymap/IDEA上阅读源码快捷键.md'
                }]},
                {
                    title:'IDEA maven下载jar包太慢',
                    path:'tools/ide/idea/IDEAmaven下载jar包太慢.md'
                }
    ]
}