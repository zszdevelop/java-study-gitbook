exports.mulu = {
    title: 'Java工具类',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: '跨域支持',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'CorsConfig',   // 必要的
                    path: 'utils/java/跨域支持/CorsConfig.md',
                }]
        },
        {
            title: 'SpringBoot文件上传',   // 必要的
            path: 'utils/java/SpringBoot文件上传.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
           
        }, {
            title: 'SpringBoot文件下载',   // 必要的
            path: 'utils/java/SpringBoot文件下载.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
           
        },
        {
            title: '全局异常处理',   // 必要的
            path: 'utils/java/全局异常处理.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
           
        },
        {
            title: 'SpringContext工具类',   // 必要的
            path: 'utils/java/SpringContext工具类.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
           
        }, {
            title: 'Java根据ParentId生成tree',   // 必要的
            path: 'utils/java/Java根据ParentId生成tree.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
           
        },
        {
            title: '二维码相关',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Zxing生成和识别二维码',   // 必要的
                    path: 'utils/java/QR/Zxing生成和识别二维码.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                   
                },
                {
                    title: '使用zxing生成二维码去除白边',   // 必要的
                    path: 'utils/java/QR/使用zxing生成二维码去除白边.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                   
                },
                {
                    title: '使用zxing生成二维码乱码问题',   // 必要的
                    path: 'utils/java/QR/使用zxing生成二维码乱码问题.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                   
                }
            ]
        }, {
            title: 'Java精确的浮点数运算工具类',   // 必要的
            path: 'utils/java/Java精确的浮点数运算工具类.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
           
        }
    ]
}