exports.mulu = {
    title: '文件管理系统',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Minio',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Minio安装',   // 必要的
                    path: 'framework/filesystem/minio/Minio安装.md'
                },{
                    title: 'SpringBoot整合minio',   // 必要的
                    path: 'framework/filesystem/minio/SpringBoot整合minio.md'
                },
               
            ]
        },
        {
            title: 'FastDFS',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'FastDFS安装',   // 必要的
                    path: 'framework/filesystem/FastDFS安装.md'
                },
               
            ]
        },
       
    ]
}