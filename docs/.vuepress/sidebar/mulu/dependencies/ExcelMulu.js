exports.mulu = {
    title: 'Excel工具',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'EasyExcel',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'EasyExcel基础使用',   // 必要的
                    path: 'dependencies/excel/EasyExcel/EasyExcel基础使用.md'
                },
                {
                    title: 'EasyExcel自定义导出',   // 必要的
                    path: 'dependencies/excel/EasyExcel/EasyExcel自定义导出.md'
                },
            ]
        }
    ]
}