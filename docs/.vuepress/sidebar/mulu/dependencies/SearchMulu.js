exports.mulu = {
    title: '搜索引擎', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
            title: 'Elasticsearch', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'Elasticsearch 入门', // 必要的
                    path: 'dependencies/search/Elasticsearch/Elasticsearch入门.md'
                },
                {
                    title: 'Elasticsearch实现商品搜索', // 必要的
                    path: 'dependencies/search/Elasticsearch/action/Elasticsearch实现商品搜索.md'
                },{
                    title: 'Solr与ES搜索引擎技术选择', // 必要的
                    path: 'dependencies/search/Solr与ES搜索引擎技术选择.md'
                }
            ]
        },
        {
            title: 'Solr', // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'Solr入门', // 必要的
                    path: 'dependencies/search/solr/Solr入门.md'
                },
                {
                    title: 'Solr查询语法与参数', // 必要的
                    path: 'dependencies/search/solr/Solr查询语法与参数.md'
                },
                {
                    title: '基础', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: 'Solr倒排索引原理', // 必要的
                            path: 'dependencies/search/solr/basic/Solr倒排索引原理.md'
                        },{
                            title: 'Solr与ES搜索引擎技术选择', // 必要的
                            path: 'dependencies/search/Solr与ES搜索引擎技术选择.md'
                        },{
                            title: 'Solr-Schema配置', // 必要的
                            path: 'dependencies/search/solr/basic/Solr-Schema配置.md'
                        },
                        {
                            title: 'Solr查询解析器', // 必要的
                            path: 'dependencies/search/solr/basic/Solr查询解析器.md'
                        },
                        {
                            title: 'Solr高亮', // 必要的
                            path: 'dependencies/search/solr/basic/Solr高亮.md'
                        }
                    ]
                },
                {
                    title: '分词器', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: 'Solr配置中文分词器ik-analyzer', // 必要的
                            path: 'dependencies/search/solr/analyzer/Solr配置中文分词器ik-analyzer.md'
                        },
                        {
                            title: 'Solr配置ik分词停用词与扩展词', // 必要的
                            path: 'dependencies/search/solr/analyzer/Solr配置ik分词停用词与扩展词.md'
                        },
                    ]
                },
                {
                    title: '小技巧', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: 'Solr搜索大小写问题', // 必要的
                            path: 'dependencies/search/solr/skill/Solr搜索大小写问题.md'
                        },
                        {
                            title: 'Solr搜索特殊字符转义', // 必要的
                            path: 'dependencies/search/solr/skill/Solr搜索特殊字符转义.md'
                        },
                        {
                            title: 'Solr多字段搜索', // 必要的
                            path: 'dependencies/search/solr/skill/Solr多字段搜索.md'
                        },
                        {
                            title: 'Solr命中关键字高亮不准确', // 必要的
                            path: 'dependencies/search/solr/skill/Solr命中关键字高亮不准确.md'
                        },
                    ]
                },
                {
                    title: '实战', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'Solr实战-商品搜索', // 必要的
                            path: 'dependencies/search/solr/action/Solr实战-商品搜索.md'
                        },
                    ]
                },

                {
                    title: 'Solr使用感受与问题', // 必要的
                    path: 'dependencies/search/solr/Solr使用感受与问题.md'
                }
            ]
        },
    ]
}