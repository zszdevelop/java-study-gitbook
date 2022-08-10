const data = JSON.parse('{"key":"v-5dd87ef2","path":"/java/thread/base/%E7%BA%BF%E7%A8%8B%E9%80%9A%E4%BF%A1.html","title":"\u7EBF\u7A0B\u901A\u4FE1(\u7B49\u5F85\u901A\u77E5wait/notify\u673A\u5236)","lang":"zh-CN","frontmatter":{"summary":"\u7EBF\u7A0B\u901A\u4FE1(\u7B49\u5F85\u901A\u77E5wait/notify\u673A\u5236) 1. \u7B49\u5F85/\u901A\u77E5\u673A\u5236\u4ECB\u7ECD 1.1 \u4E0D\u4F7F\u7528\u7B49\u5F85/\u901A\u77E5\u673A\u5236\uFF08\u8F6E\u8BE2\uFF09 \u5F53\u4E24\u4E2A\u7EBF\u7A0B\u4E4B\u95F4\u5B58\u5728\u751F\u4EA7\u8005\u548C\u6D88\u8D39\u8005\u5173\u7CFB\uFF0C\u4E5F\u5C31\u662F\u8BF4\u7B2C\u4E00\u4E2A\u7EBF\u7A0B\uFF08\u751F\u4EA7\u8005\uFF09\u505A\u76F8\u5E94\u7684\u64CD\u4F5C\u7136\u540E\u7B2C\u4E8C\u4E2A\u7EBF\u7A0B\uFF08\u6D88\u8D39\u8005\uFF09\u611F\u77E5\u5230\u4E86\u53D8\u5316\u53C8\u8FDB\u884C\u76F8\u5E94\u7684\u64CD\u4F5C 1.1.1 \u8F6E\u8BE2\u65B9\u5F0F\u6848\u4F8B \u5047\u8BBE\u8FD9\u4E2Avalue\u503C\u5C31\u662F\u7B2C\u4E00\u4E2A\u7EBF\u7A0B\u64CD\u4F5C\u7684\u7ED3\u679C\uFF0CdoSomething()\u662F\u7B2C\u4E8C\u4E2A\u7EBF\u7A0B\u8981\u505A\u7684","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-v2-demo.mrhope.site/java/thread/base/%E7%BA%BF%E7%A8%8B%E9%80%9A%E4%BF%A1.html"}],["meta",{"property":"og:site_name","content":"Java\u5B66\u4E60\u7B14\u8BB0"}],["meta",{"property":"og:title","content":"\u7EBF\u7A0B\u901A\u4FE1(\u7B49\u5F85\u901A\u77E5wait/notify\u673A\u5236)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-08-09T11:49:17.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2022-08-09T11:49:17.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"1. \u7B49\u5F85/\u901A\u77E5\u673A\u5236\u4ECB\u7ECD","slug":"_1-\u7B49\u5F85-\u901A\u77E5\u673A\u5236\u4ECB\u7ECD","children":[{"level":3,"title":"1.1 \u4E0D\u4F7F\u7528\u7B49\u5F85/\u901A\u77E5\u673A\u5236\uFF08\u8F6E\u8BE2\uFF09","slug":"_1-1-\u4E0D\u4F7F\u7528\u7B49\u5F85-\u901A\u77E5\u673A\u5236-\u8F6E\u8BE2","children":[]},{"level":3,"title":"1.2 \u4EC0\u4E48\u662F\u7B49\u5F85/\u901A\u77E5\u673A\u5236","slug":"_1-2-\u4EC0\u4E48\u662F\u7B49\u5F85-\u901A\u77E5\u673A\u5236","children":[]},{"level":3,"title":"1.2.1 \u7B49\u5F85/\u901A\u77E5\u751F\u6D3B\u4E2D\u7684\u6848\u4F8B\u539F\u578B","slug":"_1-2-1-\u7B49\u5F85-\u901A\u77E5\u751F\u6D3B\u4E2D\u7684\u6848\u4F8B\u539F\u578B","children":[]},{"level":3,"title":"1.2.2 \u7B80\u4ECB","slug":"_1-2-2-\u7B80\u4ECB","children":[]},{"level":3,"title":"1.3  \u7B49\u5F85/\u901A\u77E5\u673A\u5236\u7684\u76F8\u5173\u65B9\u6CD5","slug":"_1-3-\u7B49\u5F85-\u901A\u77E5\u673A\u5236\u7684\u76F8\u5173\u65B9\u6CD5","children":[]}]},{"level":2,"title":"2. \u7B49\u5F85/\u901A\u77E5\u673A\u5236\u7684\u5B9E\u73B0","slug":"_2-\u7B49\u5F85-\u901A\u77E5\u673A\u5236\u7684\u5B9E\u73B0","children":[{"level":3,"title":"2.1 \u5B9E\u73B0\u6848\u4F8B","slug":"_2-1-\u5B9E\u73B0\u6848\u4F8B","children":[]},{"level":3,"title":"2.2 synchronized\u5173\u952E\u5B57\u5728\u7EBF\u7A0B\u901A\u4FE1\u4E2D\u7684\u4F5C\u7528","slug":"_2-2-synchronized\u5173\u952E\u5B57\u5728\u7EBF\u7A0B\u901A\u4FE1\u4E2D\u7684\u4F5C\u7528","children":[]}]},{"level":2,"title":"3.\u76F8\u5173\u77E5\u8BC6\u70B9","slug":"_3-\u76F8\u5173\u77E5\u8BC6\u70B9","children":[{"level":3,"title":"3.1 notify()\u9501\u4E0D\u91CA\u653E","slug":"_3-1-notify-\u9501\u4E0D\u91CA\u653E","children":[]},{"level":3,"title":"3.2 Thread.join()","slug":"_3-2-thread-join","children":[]}]}],"git":{"createdTime":1660045757000,"updatedTime":1660045757000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":1}]},"readingTime":{"minutes":5.58,"words":1673},"filePathRelative":"java/thread/base/\u7EBF\u7A0B\u901A\u4FE1.md","localizedDate":"2022\u5E748\u67089\u65E5"}');
export { data };
