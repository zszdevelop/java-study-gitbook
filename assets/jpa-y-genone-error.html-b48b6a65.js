const e=JSON.parse(`{"key":"v-01378781","path":"/dependencies/jpa/jpa-y-genone-error.html","title":"Spring Data JPA使用getOne方法报错：Method threw 'org.hibernate.LazyInitializationException","lang":"zh-CN","frontmatter":{"description":"1. 背景 之前项目一直用 jpa的dao.getOne() 都是正常的，但是加入线程池后，程序直接卡主不动。debug 后发现，提示 为什么会出现这个问题呢？ 2. 原因 getOne 是懒加载。每次初始化一个实体的关联就会创建一个临时的session来加载，每个临时的session都会获取一个临时的数据库连接，开启一个新的事物。这就导致对底层连接池...","head":[["meta",{"property":"og:url","content":"https://zszdevelop.github.io/java-study-gitbook/dependencies/jpa/jpa-y-genone-error.html"}],["meta",{"property":"og:site_name","content":"Java学习笔记"}],["meta",{"property":"og:title","content":"Spring Data JPA使用getOne方法报错：Method threw 'org.hibernate.LazyInitializationException"}],["meta",{"property":"og:description","content":"1. 背景 之前项目一直用 jpa的dao.getOne() 都是正常的，但是加入线程池后，程序直接卡主不动。debug 后发现，提示 为什么会出现这个问题呢？ 2. 原因 getOne 是懒加载。每次初始化一个实体的关联就会创建一个临时的session来加载，每个临时的session都会获取一个临时的数据库连接，开启一个新的事物。这就导致对底层连接池..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-02-20T13:42:31.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2023-02-20T13:42:31.000Z"}]]},"headers":[{"level":2,"title":"1. 背景","slug":"_1-背景","link":"#_1-背景","children":[]},{"level":2,"title":"2. 原因","slug":"_2-原因","link":"#_2-原因","children":[]},{"level":2,"title":"3. 解决方案","slug":"_3-解决方案","link":"#_3-解决方案","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1676900551000,"updatedTime":1676900551000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":1}]},"readingTime":{"minutes":1,"words":299},"filePathRelative":"dependencies/jpa/jpa-y-genone-error.md","localizedDate":"2023年2月20日","autoDesc":true}`);export{e as data};
