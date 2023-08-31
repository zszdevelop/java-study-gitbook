const e=JSON.parse('{"key":"v-4008f16e","path":"/deploy/gitlab/gitlab-x-memory-size.html","title":"gitlab内存占用过大","lang":"zh-CN","frontmatter":{"description":"我的服务器配置是2核4G内存，启动gitlab 就占用了很大内存空间(停止gitlab 会释放1.5G内存) 1. 解决方案 1.1 减少 unicorn worker进程数 我们可以使用 top -ac 先看一下开启了多少unicorn worker进程，gitlab默认开启进程数与CPU内核数相同 默认是被注释掉的，官方建议该值是CPU核心数加一，...","head":[["meta",{"property":"og:url","content":"https://zszdevelop.github.io/java-study-gitbook/deploy/gitlab/gitlab-x-memory-size.html"}],["meta",{"property":"og:site_name","content":"Java学习笔记"}],["meta",{"property":"og:title","content":"gitlab内存占用过大"}],["meta",{"property":"og:description","content":"我的服务器配置是2核4G内存，启动gitlab 就占用了很大内存空间(停止gitlab 会释放1.5G内存) 1. 解决方案 1.1 减少 unicorn worker进程数 我们可以使用 top -ac 先看一下开启了多少unicorn worker进程，gitlab默认开启进程数与CPU内核数相同 默认是被注释掉的，官方建议该值是CPU核心数加一，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-02-20T13:42:31.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2023-02-20T13:42:31.000Z"}]]},"headers":[{"level":2,"title":"1. 解决方案","slug":"_1-解决方案","link":"#_1-解决方案","children":[{"level":3,"title":"1.1 减少 unicorn worker进程数","slug":"_1-1-减少-unicorn-worker进程数","link":"#_1-1-减少-unicorn-worker进程数","children":[]},{"level":3,"title":"1.2 减少数据库缓存","slug":"_1-2-减少数据库缓存","link":"#_1-2-减少数据库缓存","children":[]},{"level":3,"title":"1.3 减少数据库并发数","slug":"_1-3-减少数据库并发数","link":"#_1-3-减少数据库并发数","children":[]},{"level":3,"title":"1.4 减少sidekiq并发数","slug":"_1-4-减少sidekiq并发数","link":"#_1-4-减少sidekiq并发数","children":[]}]}],"git":{"createdTime":1676900551000,"updatedTime":1676900551000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":1}]},"readingTime":{"minutes":0.81,"words":242},"filePathRelative":"deploy/gitlab/gitlab-x-memory-size.md","localizedDate":"2023年2月20日","autoDesc":true}');export{e as data};
