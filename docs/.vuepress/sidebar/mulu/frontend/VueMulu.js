exports.mulu = {
    title: 'Vue',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: '操作数据',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Vue指令v-for之遍历输出JavaScript数组，json对象的几种方式',   // 必要的
                    path: 'frontend/vue/Vue指令v-for之遍历输出JavaScript数组json对象的几种方式.md'
                }
            ]
        }
    ]
}