exports.mulu = {
    title: '爬虫',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: '爬虫实例',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'python爬取12306城市编码转换',   // 必要的
                    path: 'python/crawler/action/python爬取12306城市编码转换.md'
                },
                {
                    title: 'ECommerceCrawlers项目',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'python爬取百度贴吧（难度1星）',   // 必要的
                            path: 'python/crawler/action/ECommerceCrawlers/python爬取百度贴吧.md'
                        },{
                            title: 'python爬取包图网（难度3星）',   // 必要的
                            path: 'python/crawler/action/ECommerceCrawlers/python爬取包图网.md'
                        },{
                            title: 'python爬取豆瓣影评分析（难度5星）',   // 必要的
                            path: 'python/crawler/action/ECommerceCrawlers/python爬取豆瓣影评分析.md'
                        }
                    ]
                }
            ]
        }
    ]
}