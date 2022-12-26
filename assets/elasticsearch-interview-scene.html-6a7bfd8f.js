const e=JSON.parse('{"key":"v-9cda8e5c","path":"/db/es/elasticsearch-interview-scene.html","title":"ES面试 - ElasticSearch面试（场景篇）","lang":"zh-CN","frontmatter":{"order":2020,"category":["es"],"description":"1. elasticsearch 了解多少，说说你们公司 es 的集群架构，索引数据大小，分片有多少 面试官：想了解应聘者之前公司接触的 ES 使用场景、规模，有没有做过比较大规模的索引设计、规划、调优。 解答： 如实结合自己的实践场景回答即可。 比如：ES 集群架构 13 个节点，索引根据通道不同共 20+索引，根据日期，每日 递增 20+，索引：1...","head":[["meta",{"property":"og:url","content":"https://java.isture.com/db/es/elasticsearch-interview-scene.html"}],["meta",{"property":"og:site_name","content":"Java学习笔记"}],["meta",{"property":"og:title","content":"ES面试 - ElasticSearch面试（场景篇）"}],["meta",{"property":"og:description","content":"1. elasticsearch 了解多少，说说你们公司 es 的集群架构，索引数据大小，分片有多少 面试官：想了解应聘者之前公司接触的 ES 使用场景、规模，有没有做过比较大规模的索引设计、规划、调优。 解答： 如实结合自己的实践场景回答即可。 比如：ES 集群架构 13 个节点，索引根据通道不同共 20+索引，根据日期，每日 递增 20+，索引：1..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-12-26T15:24:09.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2022-12-26T15:24:09.000Z"}]]},"headers":[{"level":2,"title":"1. elasticsearch 了解多少，说说你们公司 es 的集群架构，索引数据大小，分片有多少","slug":"_1-elasticsearch-了解多少-说说你们公司-es-的集群架构-索引数据大小-分片有多少","link":"#_1-elasticsearch-了解多少-说说你们公司-es-的集群架构-索引数据大小-分片有多少","children":[]},{"level":2,"title":"2. 调优手段","slug":"_2-调优手段","link":"#_2-调优手段","children":[{"level":3,"title":"2.1 设计阶段调优","slug":"_2-1-设计阶段调优","link":"#_2-1-设计阶段调优","children":[]},{"level":3,"title":"2.2 写入调优","slug":"_2-2-写入调优","link":"#_2-2-写入调优","children":[]},{"level":3,"title":"2.3 查询调优","slug":"_2-3-查询调优","link":"#_2-3-查询调优","children":[]},{"level":3,"title":"2.4 其他调优","slug":"_2-4-其他调优","link":"#_2-4-其他调优","children":[]}]},{"level":2,"title":"3. elasticsearch 的倒排索引是什么","slug":"_3-elasticsearch-的倒排索引是什么","link":"#_3-elasticsearch-的倒排索引是什么","children":[]},{"level":2,"title":"4. elasticsearch 索引数据多了怎么办，如何调优，部署","slug":"_4-elasticsearch-索引数据多了怎么办-如何调优-部署","link":"#_4-elasticsearch-索引数据多了怎么办-如何调优-部署","children":[{"level":3,"title":"4.1 动态索引层面","slug":"_4-1-动态索引层面","link":"#_4-1-动态索引层面","children":[]},{"level":3,"title":"4.2 存储层面","slug":"_4-2-存储层面","link":"#_4-2-存储层面","children":[]},{"level":3,"title":"4.3 部署层面","slug":"_4-3-部署层面","link":"#_4-3-部署层面","children":[]}]},{"level":2,"title":"5.elasticsearch 是如何实现 master 选举的","slug":"_5-elasticsearch-是如何实现-master-选举的","link":"#_5-elasticsearch-是如何实现-master-选举的","children":[{"level":3,"title":"5.1 前置前提：","slug":"_5-1-前置前提","link":"#_5-1-前置前提","children":[]},{"level":3,"title":"5.2 选举流程","slug":"_5-2-选举流程","link":"#_5-2-选举流程","children":[]}]},{"level":2,"title":"6. 详细描述一下 Elasticsearch 索引文档的过程","slug":"_6-详细描述一下-elasticsearch-索引文档的过程","link":"#_6-详细描述一下-elasticsearch-索引文档的过程","children":[]},{"level":2,"title":"7. 详细描述一下 Elasticsearch 搜索的过程？","slug":"_7-详细描述一下-elasticsearch-搜索的过程","link":"#_7-详细描述一下-elasticsearch-搜索的过程","children":[{"level":3,"title":"7.1 query 阶段的目的：定位到位置，但不取。","slug":"_7-1-query-阶段的目的-定位到位置-但不取。","link":"#_7-1-query-阶段的目的-定位到位置-但不取。","children":[]},{"level":3,"title":"7.2 fetch 阶段的目的：取数据。","slug":"_7-2-fetch-阶段的目的-取数据。","link":"#_7-2-fetch-阶段的目的-取数据。","children":[]}]},{"level":2,"title":"8. Elasticsearch 在部署时，对 Linux 的设置有哪些优化方法","slug":"_8-elasticsearch-在部署时-对-linux-的设置有哪些优化方法","link":"#_8-elasticsearch-在部署时-对-linux-的设置有哪些优化方法","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1672068249000,"updatedTime":1672068249000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":1}]},"readingTime":{"minutes":7.21,"words":2163},"filePathRelative":"db/es/elasticsearch-interview-scene.md","localizedDate":"2022年12月26日","autoDesc":true}');export{e as data};
