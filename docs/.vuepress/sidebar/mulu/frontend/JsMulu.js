exports.mulu = {
    title: 'JavaScript',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: '概念',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'window对象',   // 必要的
                    path: 'frontend/js/window对象.md'
                }
            ]
        },{
            title: '异步解决方案',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Js异步解决方案简介(一)',   // 必要的
                    path: 'frontend/js/async/Js异步解决方案简介一.md'
                },{
                    title: 'Js异步解决方案-回调函数callback（二）',   // 必要的
                    path: 'frontend/js/async/Js异步解决方案-回调函数callback.md'
                },{
                    title: 'Js异步解决方案-事件监听（发布订阅模式）（三）',   // 必要的
                    path: 'frontend/js/async/Js异步解决方案-事件监听.md'
                },{
                    title: 'Js异步解决方案-Promise（四）',   // 必要的
                    path: 'frontend/js/async/Js异步解决方案-Promise.md'
                },{
                    title: 'Js异步解决方案-Generator（五）',   // 必要的
                    path: 'frontend/js/async/Js异步解决方案-Generator.md'
                },{
                    title: 'Js异步解决方案-Async与Await（六）',   // 必要的
                    path: 'frontend/js/async/Js异步解决方案-Async与Await.md'
                }
            ]
            
        },{
            title: '小技巧',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                
                {
                    title: '前端js/vue下载后台传过来的流文件',   // 必要的
                    path: 'frontend/js/skill/前端jsvue下载后台传过来的流文件.md'
                },
                {
                    title: 'js中将base64图片转file文件的两种方式',   // 必要的
                    path: 'frontend/js/skill/js中将base64图片转file文件的两种方式.md'
                }
            ]
        },
    ]
}