const t=JSON.parse('{"key":"v-11f73542","path":"/think/optimization/optimization-x-frequent-operation-db.html","title":"计算大数据量，频繁操作数据库优化","lang":"zh-CN","frontmatter":{"description":"1. 背景介绍 我们有个业务场景是需要计算几万个用户的特征，这些用户特征分布在10个表中（不单单是获取某个字段，拿到记录后还需要手动计算）。 最初的版本 1. 循环出这几万个用户信息 2. 根据用户信息到对应的10张表中查询特征值，并计算 3. 将这n个特征值合并 4. 保存到数据库中 在数据量小的时候，该方案并没有什么问题，几分钟就完事了。但我们线上...","head":[["meta",{"property":"og:url","content":"https://zszdevelop.github.io/java-study-gitbook/think/optimization/optimization-x-frequent-operation-db.html"}],["meta",{"property":"og:site_name","content":"Java学习笔记"}],["meta",{"property":"og:title","content":"计算大数据量，频繁操作数据库优化"}],["meta",{"property":"og:description","content":"1. 背景介绍 我们有个业务场景是需要计算几万个用户的特征，这些用户特征分布在10个表中（不单单是获取某个字段，拿到记录后还需要手动计算）。 最初的版本 1. 循环出这几万个用户信息 2. 根据用户信息到对应的10张表中查询特征值，并计算 3. 将这n个特征值合并 4. 保存到数据库中 在数据量小的时候，该方案并没有什么问题，几分钟就完事了。但我们线上..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-02-20T13:42:31.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2023-02-20T13:42:31.000Z"}]]},"headers":[{"level":2,"title":"1. 背景介绍","slug":"_1-背景介绍","link":"#_1-背景介绍","children":[]},{"level":2,"title":"2. 优化方案1","slug":"_2-优化方案1","link":"#_2-优化方案1","children":[]},{"level":2,"title":"3. 优化方案2","slug":"_3-优化方案2","link":"#_3-优化方案2","children":[]}],"git":{"createdTime":1676900551000,"updatedTime":1676900551000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":1}]},"readingTime":{"minutes":1.86,"words":558},"filePathRelative":"think/optimization/optimization-x-frequent-operation-db.md","localizedDate":"2023年2月20日","autoDesc":true}');export{t as data};
