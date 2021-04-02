exports.mulu = {
    title: 'zookeeper',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'linux安装zookeeper',   // 必要的
            path: 'library/zookeeper/linux安装zookeeper.md'
        },
        {
            title: '通过docker安装zookeeper',   // 必要的
            path: 'library/zookeeper/通过docker安装zookeeper.md'
        }
    ]
}