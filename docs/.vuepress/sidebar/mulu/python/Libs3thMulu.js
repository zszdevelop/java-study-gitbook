exports.mulu = {
    title: '第三方依赖库',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: 'BeautifulSoup（数据采集）',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'BeautifulSoup入门',   // 必要的
                    path: 'python/libs3th/BeautifulSoup/BeautifulSoup入门.md'
                }
            ]
        },
        {
            title: 'lxml（解析库）',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'lxml入门',   // 必要的
                    path: 'python/libs3th/lxml/lxml入门.md'
                }
            ]
        },
        {
            title: 'Selenium(自助化测试)',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Selenium入门',   // 必要的
                    path: 'python/libs3th/Selenium/Selenium入门.md'
                }
            ]
        },
        {
            title: 'wordcloud(词云生成)',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'wordcloud入门',   // 必要的
                    path: 'python/libs3th/wordcloud/wordcloud入门.md'
                }
            ]
        }
    ]
}