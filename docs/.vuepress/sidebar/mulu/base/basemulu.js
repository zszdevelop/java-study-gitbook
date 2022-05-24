exports.mulu = {
    title: 'Java基础', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
            title: 'Java基础', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 0, // 可选的, 默认值是 1
            children: [
                'base/object/Java基础.md',
                'base/object/关键字总结.md',
                'base/error/Java异常处理.md',
                'base/error/Java反射.md',
                'base/annotation/Java反射.md',
                'base/interview/Java基础面试提问.md',
            ]
        },
        {
            title: '容器', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 0, // 可选的, 默认值是 1
            children: [
                'base/collection/Java容器基础.md',
                'base/collection/HashMap相关问题.md',
                'base/collection/ArrayList的扩容机制.md',
                'base/collection/Comparable和Comparator.md',
            ]
        },
        
    ]
}