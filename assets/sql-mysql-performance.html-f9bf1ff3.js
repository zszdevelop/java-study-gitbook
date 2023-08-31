const e=JSON.parse('{"key":"v-016cd6b8","path":"/db/mysql/sql-mysql-performance.html","title":"MySQL - 性能优化","lang":"zh-CN","frontmatter":{"order":210,"category":["Mysql","数据库"],"description":"1. 使用 Explain 进行分析 Explain 用来分析 SELECT 查询语句，开发人员可以通过分析 Explain 结果来优化查询语句。 比较重要的字段有: select_type : 查询类型，有简单查询、联合查询、子查询等; key : 使用的索引; rows : 扫描的行数; rows扫描的行数，越小越好 type：使用索引的类型; 通...","head":[["meta",{"property":"og:url","content":"https://zszdevelop.github.io/java-study-gitbook/db/mysql/sql-mysql-performance.html"}],["meta",{"property":"og:site_name","content":"Java学习笔记"}],["meta",{"property":"og:title","content":"MySQL - 性能优化"}],["meta",{"property":"og:description","content":"1. 使用 Explain 进行分析 Explain 用来分析 SELECT 查询语句，开发人员可以通过分析 Explain 结果来优化查询语句。 比较重要的字段有: select_type : 查询类型，有简单查询、联合查询、子查询等; key : 使用的索引; rows : 扫描的行数; rows扫描的行数，越小越好 type：使用索引的类型; 通..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-02-20T13:42:31.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2023-02-20T13:42:31.000Z"}]]},"headers":[{"level":2,"title":"1. 使用 Explain 进行分析","slug":"_1-使用-explain-进行分析","link":"#_1-使用-explain-进行分析","children":[]},{"level":2,"title":"2. 优化数据访问","slug":"_2-优化数据访问","link":"#_2-优化数据访问","children":[{"level":3,"title":"2.1. 减少请求的数据量","slug":"_2-1-减少请求的数据量","link":"#_2-1-减少请求的数据量","children":[]},{"level":3,"title":"2.2. 减少服务器端扫描的行数","slug":"_2-2-减少服务器端扫描的行数","link":"#_2-2-减少服务器端扫描的行数","children":[]}]},{"level":2,"title":"3. 重构查询方式","slug":"_3-重构查询方式","link":"#_3-重构查询方式","children":[{"level":3,"title":"3.1. 切分大查询","slug":"_3-1-切分大查询","link":"#_3-1-切分大查询","children":[]},{"level":3,"title":"3.2 分解大连接查询","slug":"_3-2-分解大连接查询","link":"#_3-2-分解大连接查询","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1676900551000,"updatedTime":1676900551000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":1}]},"readingTime":{"minutes":2.4,"words":720},"filePathRelative":"db/mysql/sql-mysql-performance.md","localizedDate":"2023年2月20日","autoDesc":true}');export{e as data};
