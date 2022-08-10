const data = JSON.parse('{"key":"v-03650f65","path":"/java/thread/concurrent/cas/cas.html","title":"CAS\uFF08\u6BD4\u8F83\u5E76\u66FF\u6362\uFF09","lang":"zh-CN","frontmatter":{"summary":"CAS\uFF08\u6BD4\u8F83\u5E76\u66FF\u6362\uFF09 1. \u7B80\u4ECB CAS\uFF08compare and Swap\uFF09\uFF0C\u65E2\u6BD4\u8F83\u5E76\u66FF\u6362\uFF0C\u5B9E\u73B0\u5E76\u53D1\u7B97\u6CD5\u65F6\u5E38\u7528\u5230\u7684\u4E00\u79CD\u6280\u672F \\"\u5728java\u540C\u6B65\u5668\u4E2D\u5927\u91CF\u4F7F\u7528\u4E86CAS\u6280\u672F\uFF0C\u9B3C\u65A7\u795E\u5DE5\u7684\u5B9E\u73B0\u4E86\u591A\u7EBF\u7A0B\u6267\u884C\u7684\u5B89\u5168\u6027\\" CAS\u7684\u601D\u60F3\u5F88\u7B80\u5355: \u4E09\u4E2A\u53C2\u6570\uFF0C\u4E00\u4E2A\u5F53\u524D\u5185\u5B58\u503CV\u3001\u65E7\u7684\u9884\u671F\u503CA\u3001\u5373\u5C06\u66F4\u65B0\u7684\u503CB\u3001\u5F53\u4E14\u4EC5\u5F53\u9884\u671F\u503CA\u548C\u5185\u5B58\u503CV\u76F8\u540C\u65F6\uFF0C\u5C06\u5185\u5B58\u503C\u4FEE\u6539\u4E3AB\u5E76\u8FD4\u56DEtrue\uFF0C\u5426\u5219\u4EC0\u4E48\u90FD","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-v2-demo.mrhope.site/java/thread/concurrent/cas/cas.html"}],["meta",{"property":"og:site_name","content":"Java\u5B66\u4E60\u7B14\u8BB0"}],["meta",{"property":"og:title","content":"CAS\uFF08\u6BD4\u8F83\u5E76\u66FF\u6362\uFF09"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-08-09T11:49:17.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2022-08-09T11:49:17.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"1. \u7B80\u4ECB","slug":"_1-\u7B80\u4ECB","children":[]},{"level":2,"title":"2. n++\u7684\u95EE\u9898(\u4E0D\u80FD\u4FDD\u8BC1\u539F\u5B50\u6027)","slug":"_2-n-\u7684\u95EE\u9898-\u4E0D\u80FD\u4FDD\u8BC1\u539F\u5B50\u6027","children":[]},{"level":2,"title":"3. \u5982\u4F55\u89E3\u51B3","slug":"_3-\u5982\u4F55\u89E3\u51B3","children":[{"level":3,"title":"3.1 \u65B9\u68481\uFF1A\u5728add \u65B9\u6CD5\u52A0\u4E0Asynchrnized\u4FEE\u9970","slug":"_3-1-\u65B9\u68481-\u5728add-\u65B9\u6CD5\u52A0\u4E0Asynchrnized\u4FEE\u9970","children":[]},{"level":3,"title":"3.2 \u65B9\u68482\uFF1ACAS\u65B9\u6848","slug":"_3-2-\u65B9\u68482-cas\u65B9\u6848","children":[]}]},{"level":2,"title":"4. CAS\u7F3A\u70B9(\u4E09\u5927\u95EE\u9898)","slug":"_4-cas\u7F3A\u70B9-\u4E09\u5927\u95EE\u9898","children":[{"level":3,"title":"4.1 ABA\u95EE\u9898","slug":"_4-1-aba\u95EE\u9898","children":[]},{"level":3,"title":"4.2 \u5FAA\u73AF\u65F6\u95F4\u957F\u5F00\u9500\u5F88\u5927","slug":"_4-2-\u5FAA\u73AF\u65F6\u95F4\u957F\u5F00\u9500\u5F88\u5927","children":[]},{"level":3,"title":"4.3 \u53EA\u80FD\u4FDD\u8BC1\u4E00\u4E2A\u5171\u4EAB\u53D8\u91CF\u7684\u539F\u5B50\u64CD\u4F5C","slug":"_4-3-\u53EA\u80FD\u4FDD\u8BC1\u4E00\u4E2A\u5171\u4EAB\u53D8\u91CF\u7684\u539F\u5B50\u64CD\u4F5C","children":[]}]},{"level":2,"title":"\u53C2\u8003\u6587\u7AE0","slug":"\u53C2\u8003\u6587\u7AE0","children":[]}],"git":{"createdTime":1660045757000,"updatedTime":1660045757000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":1}]},"readingTime":{"minutes":5.31,"words":1594},"filePathRelative":"java/thread/concurrent/cas/cas.md","localizedDate":"2022\u5E748\u67089\u65E5"}');
export { data };
