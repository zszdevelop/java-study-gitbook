const t=JSON.parse('{"key":"v-71b97b78","path":"/dependencies/spring/spring-y-transactional-fail.html","title":"@Transactional注解的失效场景","lang":"zh-CN","frontmatter":{"description":"1. 背景 @Transactional 注解相信大家并不陌生，平时开发中很常用的一个注解，它能保证方法内多个数据库操作要么同时成功、要么同时失败。使用@Transactional注解时需要注意许多的细节，不然你会发现@Transactional总是莫名其妙的就失效了。 2. 事务 事务管理在系统开发中是不可缺少的一部分，Spring提供了很好事务管理...","head":[["meta",{"property":"og:url","content":"https://zszdevelop.github.io/java-study-gitbook/dependencies/spring/spring-y-transactional-fail.html"}],["meta",{"property":"og:site_name","content":"Java学习笔记"}],["meta",{"property":"og:title","content":"@Transactional注解的失效场景"}],["meta",{"property":"og:description","content":"1. 背景 @Transactional 注解相信大家并不陌生，平时开发中很常用的一个注解，它能保证方法内多个数据库操作要么同时成功、要么同时失败。使用@Transactional注解时需要注意许多的细节，不然你会发现@Transactional总是莫名其妙的就失效了。 2. 事务 事务管理在系统开发中是不可缺少的一部分，Spring提供了很好事务管理..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-02-20T13:42:31.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2023-02-20T13:42:31.000Z"}]]},"headers":[{"level":2,"title":"1. 背景","slug":"_1-背景","link":"#_1-背景","children":[]},{"level":2,"title":"2. 事务","slug":"_2-事务","link":"#_2-事务","children":[]},{"level":2,"title":"3. @Transactional介绍","slug":"_3-transactional介绍","link":"#_3-transactional介绍","children":[{"level":3,"title":"3.1 @Transactional注解可以作用于哪些地方？","slug":"_3-1-transactional注解可以作用于哪些地方","link":"#_3-1-transactional注解可以作用于哪些地方","children":[]},{"level":3,"title":"3.2 @Transactional注有哪些属性？","slug":"_3-2-transactional注有哪些属性","link":"#_3-2-transactional注有哪些属性","children":[]}]},{"level":2,"title":"4. @Transactional失效场景","slug":"_4-transactional失效场景","link":"#_4-transactional失效场景","children":[{"level":3,"title":"4.3 @Transactional  注解属性 rollbackFor 设置错误","slug":"_4-3-transactional-注解属性-rollbackfor-设置错误","link":"#_4-3-transactional-注解属性-rollbackfor-设置错误","children":[]}]},{"level":2,"title":"4.5 异常被你的 catch“吃了”导致@Transactional失效","slug":"_4-5-异常被你的-catch-吃了-导致-transactional失效","link":"#_4-5-异常被你的-catch-吃了-导致-transactional失效","children":[{"level":3,"title":"4.6 数据库引擎不支持事务","slug":"_4-6-数据库引擎不支持事务","link":"#_4-6-数据库引擎不支持事务","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1676900551000,"updatedTime":1676900551000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":1}]},"readingTime":{"minutes":7.78,"words":2334},"filePathRelative":"dependencies/spring/spring-y-transactional-fail.md","localizedDate":"2023年2月20日","autoDesc":true}');export{t as data};
