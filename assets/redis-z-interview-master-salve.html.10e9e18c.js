const e=JSON.parse('{"key":"v-3cb03fda","path":"/db/redis/redis-z-interview-master-salve.html","title":"Redis\u9762\u8BD5 - \u96C6\u7FA4-\u4E3B\u4ECE\u590D\u5236","lang":"zh-CN","frontmatter":{"order":1070,"category":["\u6570\u636E\u5E93","Redis"],"summary":"Redis\u9762\u8BD5 - \u96C6\u7FA4-\u4E3B\u4ECE\u590D\u5236 1 Redis\u96C6\u7FA4\u7684\u4E3B\u4ECE\u590D\u5236\u6A21\u578B\u662F\u600E\u6837\u7684\uFF1F \u4E3B\u4ECE\u590D\u5236\uFF0C\u662F\u6307\u5C06\u4E00\u53F0Redis\u670D\u52A1\u5668\u7684\u6570\u636E\uFF0C\u590D\u5236\u5230\u5176\u4ED6\u7684Redis\u670D\u52A1\u5668\u3002\u524D\u8005\u79F0\u4E3A\u4E3B\u8282\u70B9(master)\uFF0C\u540E\u8005\u79F0\u4E3A\u4ECE\u8282\u70B9(slave)\uFF1B\u6570\u636E\u7684\u590D\u5236\u662F\u5355\u5411\u7684\uFF0C\u53EA\u80FD\u7531\u4E3B\u8282\u70B9\u5230\u4ECE\u8282\u70B9\u3002 \u4E3B\u4ECE\u590D\u5236\u7684\u4F5C\u7528\u4E3B\u8981\u5305\u62EC\uFF1A \u6570\u636E\u5197\u4F59\uFF1A\u4E3B\u4ECE\u590D\u5236\u5B9E\u73B0\u4E86\u6570\u636E\u7684\u70ED\u5907\u4EFD\uFF0C\u662F\u6301\u4E45\u5316\u4E4B\u5916\u7684\u4E00\u79CD\u6570\u636E\u5197\u4F59\u65B9\u5F0F\u3002; ","head":[["meta",{"property":"og:url","content":"https://java.isture.com/db/redis/redis-z-interview-master-salve.html"}],["meta",{"property":"og:site_name","content":"Java\u5B66\u4E60\u7B14\u8BB0"}],["meta",{"property":"og:title","content":"Redis\u9762\u8BD5 - \u96C6\u7FA4-\u4E3B\u4ECE\u590D\u5236"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-09-22T14:48:20.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2022-09-22T14:48:20.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"1 Redis\u96C6\u7FA4\u7684\u4E3B\u4ECE\u590D\u5236\u6A21\u578B\u662F\u600E\u6837\u7684\uFF1F","slug":"_1-redis\u96C6\u7FA4\u7684\u4E3B\u4ECE\u590D\u5236\u6A21\u578B\u662F\u600E\u6837\u7684","link":"#_1-redis\u96C6\u7FA4\u7684\u4E3B\u4ECE\u590D\u5236\u6A21\u578B\u662F\u600E\u6837\u7684","children":[]},{"level":2,"title":"2 Redis \u5168\u91CF\u590D\u5236\u7684\u4E09\u4E2A\u9636\u6BB5\uFF1F","slug":"_2-redis-\u5168\u91CF\u590D\u5236\u7684\u4E09\u4E2A\u9636\u6BB5","link":"#_2-redis-\u5168\u91CF\u590D\u5236\u7684\u4E09\u4E2A\u9636\u6BB5","children":[]},{"level":2,"title":"3 Redis \u4E3A\u4EC0\u4E48\u4F1A\u8BBE\u8BA1\u589E\u91CF\u590D\u5236\uFF1F","slug":"_3-redis-\u4E3A\u4EC0\u4E48\u4F1A\u8BBE\u8BA1\u589E\u91CF\u590D\u5236","link":"#_3-redis-\u4E3A\u4EC0\u4E48\u4F1A\u8BBE\u8BA1\u589E\u91CF\u590D\u5236","children":[]},{"level":2,"title":"4 Redis \u589E\u91CF\u590D\u5236\u7684\u6D41\u7A0B\uFF1F","slug":"_4-redis-\u589E\u91CF\u590D\u5236\u7684\u6D41\u7A0B","link":"#_4-redis-\u589E\u91CF\u590D\u5236\u7684\u6D41\u7A0B","children":[]},{"level":2,"title":"5 \u589E\u91CF\u590D\u5236\u5982\u679C\u5728\u7F51\u7EDC\u65AD\u5F00\u671F\u95F4\uFF0Crepl_backlog_size\u73AF\u5F62\u7F13\u51B2\u533A\u5199\u6EE1\u4E4B\u540E\uFF0C\u4ECE\u5E93\u662F\u4F1A\u4E22\u5931\u6389\u90A3\u90E8\u5206\u88AB\u8986\u76D6\u6389\u7684\u6570\u636E\uFF0C\u8FD8\u662F\u76F4\u63A5\u8FDB\u884C\u5168\u91CF\u590D\u5236\u5462\uFF1F","slug":"_5-\u589E\u91CF\u590D\u5236\u5982\u679C\u5728\u7F51\u7EDC\u65AD\u5F00\u671F\u95F4-repl-backlog-size\u73AF\u5F62\u7F13\u51B2\u533A\u5199\u6EE1\u4E4B\u540E-\u4ECE\u5E93\u662F\u4F1A\u4E22\u5931\u6389\u90A3\u90E8\u5206\u88AB\u8986\u76D6\u6389\u7684\u6570\u636E-\u8FD8\u662F\u76F4\u63A5\u8FDB\u884C\u5168\u91CF\u590D\u5236\u5462","link":"#_5-\u589E\u91CF\u590D\u5236\u5982\u679C\u5728\u7F51\u7EDC\u65AD\u5F00\u671F\u95F4-repl-backlog-size\u73AF\u5F62\u7F13\u51B2\u533A\u5199\u6EE1\u4E4B\u540E-\u4ECE\u5E93\u662F\u4F1A\u4E22\u5931\u6389\u90A3\u90E8\u5206\u88AB\u8986\u76D6\u6389\u7684\u6570\u636E-\u8FD8\u662F\u76F4\u63A5\u8FDB\u884C\u5168\u91CF\u590D\u5236\u5462","children":[]},{"level":2,"title":"6 Redis \u4E3A\u4EC0\u4E48\u4E0D\u6301\u4E45\u5316\u7684\u4E3B\u670D\u52A1\u5668\u81EA\u52A8\u91CD\u542F\u975E\u5E38\u5371\u9669\u5462?","slug":"_6-redis-\u4E3A\u4EC0\u4E48\u4E0D\u6301\u4E45\u5316\u7684\u4E3B\u670D\u52A1\u5668\u81EA\u52A8\u91CD\u542F\u975E\u5E38\u5371\u9669\u5462","link":"#_6-redis-\u4E3A\u4EC0\u4E48\u4E0D\u6301\u4E45\u5316\u7684\u4E3B\u670D\u52A1\u5668\u81EA\u52A8\u91CD\u542F\u975E\u5E38\u5371\u9669\u5462","children":[]},{"level":2,"title":"7 Redis \u4E3A\u4EC0\u4E48\u4E3B\u4ECE\u5168\u91CF\u590D\u5236\u4F7F\u7528RDB\u800C\u4E0D\u4F7F\u7528AOF\uFF1F","slug":"_7-redis-\u4E3A\u4EC0\u4E48\u4E3B\u4ECE\u5168\u91CF\u590D\u5236\u4F7F\u7528rdb\u800C\u4E0D\u4F7F\u7528aof","link":"#_7-redis-\u4E3A\u4EC0\u4E48\u4E3B\u4ECE\u5168\u91CF\u590D\u5236\u4F7F\u7528rdb\u800C\u4E0D\u4F7F\u7528aof","children":[]},{"level":2,"title":"8 Redis \u4E3A\u4EC0\u4E48\u8FD8\u6709\u65E0\u78C1\u76D8\u590D\u5236\u6A21\u5F0F\uFF1F","slug":"_8-redis-\u4E3A\u4EC0\u4E48\u8FD8\u6709\u65E0\u78C1\u76D8\u590D\u5236\u6A21\u5F0F","link":"#_8-redis-\u4E3A\u4EC0\u4E48\u8FD8\u6709\u65E0\u78C1\u76D8\u590D\u5236\u6A21\u5F0F","children":[]},{"level":2,"title":"9 Redis \u4E3A\u4EC0\u4E48\u8FD8\u4F1A\u6709\u4ECE\u5E93\u7684\u4ECE\u5E93\u7684\u8BBE\u8BA1\uFF1F","slug":"_9-redis-\u4E3A\u4EC0\u4E48\u8FD8\u4F1A\u6709\u4ECE\u5E93\u7684\u4ECE\u5E93\u7684\u8BBE\u8BA1","link":"#_9-redis-\u4E3A\u4EC0\u4E48\u8FD8\u4F1A\u6709\u4ECE\u5E93\u7684\u4ECE\u5E93\u7684\u8BBE\u8BA1","children":[]}],"git":{"createdTime":1662707287000,"updatedTime":1663858100000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":4}]},"readingTime":{"minutes":11,"words":3299},"filePathRelative":"db/redis/redis-z-interview-master-salve.md","localizedDate":"2022\u5E749\u67089\u65E5"}');export{e as data};
