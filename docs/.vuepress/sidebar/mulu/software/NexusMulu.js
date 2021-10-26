exports.mulu = {
    title: 'Nexus私服',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [

        {
            title: 'Maven私服Nexus部署',
            path: 'software/nexus/Maven私服Nexus部署.md'
        },{
            title: 'Maven配置nexus私服',
            path: 'software/nexus/Maven配置nexus私服.md'
        },{
            title: 'nexus私服上传第三方包',
            path: 'software/nexus/nexus私服上传第三方包.md'
        },

    ]
}