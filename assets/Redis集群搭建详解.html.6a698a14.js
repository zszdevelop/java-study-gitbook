const data = JSON.parse('{"key":"v-5b67de27","path":"/db/redis/install/Redis%E9%9B%86%E7%BE%A4%E6%90%AD%E5%BB%BA%E8%AF%A6%E8%A7%A3.html","title":"Redis\u96C6\u7FA4\u642D\u5EFA\u8BE6\u89E3","lang":"zh-CN","frontmatter":{"summary":"Redis\u96C6\u7FA4\u642D\u5EFA\u8BE6\u89E3 1. Redis \u96C6\u7FA4\u6574\u4F53\u67B6\u6784 \u8FD9\u91CC\u6211\u4EEC\u91C7\u7528\u7684\u96C6\u7FA4\u6574\u4F53\u67B6\u6784\u5C31\u662F\u4E3B\u4ECE\u7ED3\u6784+\u54E8\u5175\uFF08sentinel\uFF09\uFF0C\u5B9E\u73B0\u5BB9\u707E\u7684\u81EA\u52A8\u5207\u6362\uFF0C\u5982\u4E0B\u56FE\u6240\u793A\uFF1A \u4E00\u4E2A\u4E3B\u8282\u70B9\uFF08master\uFF09\u53EF\u62E5\u6709\u591A\u4E2A\u4ECE\u8282\u70B9\uFF08slave\uFF09\uFF0C\u4ECE\u8282\u70B9\u5B9E\u73B0\u5BF9\u4E3B\u8282\u70B9\u7684\u590D\u5236\uFF0C\u4FDD\u8BC1\u6570\u636E\u540C\u6B65\u3002; \u800C\u54E8\u5175\uFF08sentinel\uFF09\u5219\u5BF9\u5404\u8282\u70B9\u8FDB\u884C\u76D1\u63A7\uFF0C\u4E3B\u8981\u5305\u62EC\u4E3B\u8282\u70B9\u5B58\u6D3B\u68C0\u6D4B\u3001\u4E3B\u4ECE\u8FD0\u884C\u60C5\u51B5\u68C0\u6D4B\u7B49\uFF0C\u4E00\u65E6\u4E3B\u8282\u70B9\u5B95","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-v2-demo.mrhope.site/db/redis/install/Redis%E9%9B%86%E7%BE%A4%E6%90%AD%E5%BB%BA%E8%AF%A6%E8%A7%A3.html"}],["meta",{"property":"og:site_name","content":"Java\u5B66\u4E60\u7B14\u8BB0"}],["meta",{"property":"og:title","content":"Redis\u96C6\u7FA4\u642D\u5EFA\u8BE6\u89E3"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-08-10T14:25:06.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2022-08-10T14:25:06.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"1. Redis \u96C6\u7FA4\u6574\u4F53\u67B6\u6784","slug":"_1-redis-\u96C6\u7FA4\u6574\u4F53\u67B6\u6784","children":[]},{"level":2,"title":"2. Redis \u4E3B\u4ECE\u914D\u7F6E\u53CA\u6570\u636E\u540C\u6B65","slug":"_2-redis-\u4E3B\u4ECE\u914D\u7F6E\u53CA\u6570\u636E\u540C\u6B65","children":[{"level":3,"title":"2.1 \u4E3B\u673A\u914D\u7F6E","slug":"_2-1-\u4E3B\u673A\u914D\u7F6E","children":[]},{"level":3,"title":"2.2 \u4ECE\u673A\u914D\u7F6E","slug":"_2-2-\u4ECE\u673A\u914D\u7F6E","children":[]},{"level":3,"title":"2.3 \u6570\u636E\u540C\u6B65","slug":"_2-3-\u6570\u636E\u540C\u6B65","children":[]},{"level":3,"title":"2.4 \u4E3B\u4ECE\u9A8C\u8BC1","slug":"_2-4-\u4E3B\u4ECE\u9A8C\u8BC1","children":[]}]},{"level":2,"title":"3. Redis \u54E8\u5175\u6A21\u5F0F\u642D\u5EFA","slug":"_3-redis-\u54E8\u5175\u6A21\u5F0F\u642D\u5EFA","children":[{"level":3,"title":"3.1 \u54E8\u5175\u6A21\u5F0F\u8BE6\u89E3","slug":"_3-1-\u54E8\u5175\u6A21\u5F0F\u8BE6\u89E3","children":[]},{"level":3,"title":"3.2 \u54E8\u5175\u642D\u5EFA","slug":"_3-2-\u54E8\u5175\u642D\u5EFA","children":[]},{"level":3,"title":"3.3 \u9632\u706B\u5899\u8BBE\u7F6E","slug":"_3-3-\u9632\u706B\u5899\u8BBE\u7F6E","children":[]},{"level":3,"title":"3.4 \u542F\u52A8\u4E09\u4E2A\u54E8\u5175\uFF1A","slug":"_3-4-\u542F\u52A8\u4E09\u4E2A\u54E8\u5175","children":[]},{"level":3,"title":"3.5 \u5BB9\u707E\u5207\u6362","slug":"_3-5-\u5BB9\u707E\u5207\u6362","children":[]}]},{"level":2,"title":"\u53C2\u8003\u6587\u7AE0","slug":"\u53C2\u8003\u6587\u7AE0","children":[]}],"git":{"createdTime":1660045757000,"updatedTime":1660141506000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":3}]},"readingTime":{"minutes":14.37,"words":4311},"filePathRelative":"db/redis/install/Redis\u96C6\u7FA4\u642D\u5EFA\u8BE6\u89E3.md","localizedDate":"2022\u5E748\u67089\u65E5"}');
export { data };
