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
                    title: 'Minio客户端mc使用',   // 必要的
                    path: 'framework/filesystem/minio/Minio客户端mc使用.md'
                },{
                    title: 'Minio临时访问权限',   // 必要的
                    path: 'framework/filesystem/minio/Minio临时访问权限.md'
                },{
                    title: 'SpringBoot整合minio',   // 必要的
                    path: 'framework/filesystem/minio/SpringBoot整合minio.md'
                },
                {
                    title: '如何自定义MinIO桶的权限',   // 必要的
                    path: 'framework/filesystem/minio/如何自定义MinIO桶的权限.md'
                },{
                    title: 'Minio分布式集群搭建部署',   // 必要的
                    path: 'framework/filesystem/minio/Minio分布式集群搭建部署.md'
                },{
                    title: 'Minio纠删码',   // 必要的
                    path: 'framework/filesystem/minio/Minio纠删码.md'
                },
                {
                    title: 'MinioServer启动模式',   // 必要的
                    path: 'framework/filesystem/minio/MinioServer启动模式.md'
                }
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
        },{
            title: 'Amazon-S3(简便的存储服务)',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Amazon-S3详解',   // 必要的
                    path: 'framework/filesystem/S3/Amazon-S3详解.md'
                },
               
            ]
        },
       
    ]
}