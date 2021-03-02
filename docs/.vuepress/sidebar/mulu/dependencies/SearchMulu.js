exports.mulu = {
    title: '搜索引擎',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Elasticsearch',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Elasticsearch 入门',   // 必要的
                    path: 'dependencies/search/Elasticsearch/Elasticsearch入门.md'
                },
                {
                    title: 'Elasticsearch实现商品搜索',   // 必要的
                    path: 'dependencies/search/Elasticsearch/action/Elasticsearch实现商品搜索.md'
                }
            ]
        },
        {
            title: 'Solr',   // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Solr入门',   // 必要的
                    path: 'dependencies/search/solr/Solr入门.md'
                }
            ]
        },
    ]
}