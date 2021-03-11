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
        },{
            title: 'Scrapy（爬取数据，提取结构化）',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Scrapy入门',   // 必要的
                    path: 'python/libs3th/Scrapy/Scrapy入门.md'
                }, {
                    title: 'Scrapy入门（二）-爬取豆瓣电影TOP250',   // 必要的
                    path: 'python/libs3th/Scrapy/Scrapy入门二爬取豆瓣电影TOP250.md'
                }, {
                    title: 'Scrapy入门（三）-调试(Debugging)Spiders',   // 必要的
                    path: 'python/libs3th/Scrapy/Scrapy入门三调试(Debugging)Spiders.md'
                }, {
                    title: 'Scrapy入门（四）-抓取AJAX异步加载网页',   // 必要的
                    path: 'python/libs3th/Scrapy/Scrapy入门四抓取AJAX异步加载网页.md'
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