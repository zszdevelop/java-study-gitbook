import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as i,e as r}from"./app.8f09d17c.js";const d={},l=r(`<h1 id="executors\u521B\u5EFA\u7EBF\u7A0B\u6C60" tabindex="-1"><a class="header-anchor" href="#executors\u521B\u5EFA\u7EBF\u7A0B\u6C60" aria-hidden="true">#</a> Executors\u521B\u5EFA\u7EBF\u7A0B\u6C60</h1><p>Executors\u7C7B\u4E2D\u63D0\u4F9B\u7684\u51E0\u4E2A\u9759\u6001\u65B9\u6CD5\u6765\u521B\u5EFA\u7EBF\u7A0B\u6C60\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Executors.newCachedThreadPool();        //\u521B\u5EFA\u4E00\u4E2A\u7F13\u51B2\u6C60\uFF0C\u7F13\u51B2\u6C60\u5BB9\u91CF\u5927\u5C0F\u4E3AInteger.MAX_VALUE
Executors.newSingleThreadExecutor();   //\u521B\u5EFA\u5BB9\u91CF\u4E3A1\u7684\u7F13\u51B2\u6C60
Executors.newFixedThreadPool(int);    //\u521B\u5EFA\u56FA\u5B9A\u5BB9\u91CF\u5927\u5C0F\u7684\u7F13\u51B2\u6C60
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E09\u4E2A\u9759\u6001\u65B9\u6CD5\u7684\u5177\u4F53\u5B9E\u73B0</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public static ExecutorService newFixedThreadPool(int nThreads) {
    return new ThreadPoolExecutor(nThreads, nThreads,
                                  0L, TimeUnit.MILLISECONDS,
                                  new LinkedBlockingQueue&lt;Runnable&gt;());
}
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue&lt;Runnable&gt;()));
}
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue&lt;Runnable&gt;());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4ECE\u5B83\u4EEC\u7684\u5177\u4F53\u5B9E\u73B0\u6765\u770B\uFF0C\u5B83\u4EEC\u5B9E\u9645\u4E0A\u4E5F\u662F\u8C03\u7528\u4E86ThreadPoolExecutor\uFF0C\u53EA\u4E0D\u8FC7\u53C2\u6570\u90FD\u5DF2\u914D\u7F6E\u597D\u4E86\u3002</p><p>newFixedThreadPool\u521B\u5EFA\u7684\u7EBF\u7A0B\u6C60corePoolSize\u548CmaximumPoolSize\u503C\u662F\u76F8\u7B49\u7684\uFF0C\u5B83\u4F7F\u7528\u7684LinkedBlockingQueue\uFF1B</p><p>newSingleThreadExecutor\u5C06corePoolSize\u548CmaximumPoolSize\u90FD\u8BBE\u7F6E\u4E3A1\uFF0C\u4E5F\u4F7F\u7528\u7684LinkedBlockingQueue\uFF1B</p><p>newCachedThreadPool\u5C06corePoolSize\u8BBE\u7F6E\u4E3A0\uFF0C\u5C06maximumPoolSize\u8BBE\u7F6E\u4E3AInteger.MAX_VALUE\uFF0C\u4F7F\u7528\u7684SynchronousQueue\uFF0C\u4E5F\u5C31\u662F\u8BF4\u6765\u4E86\u4EFB\u52A1\u5C31\u521B\u5EFA\u7EBF\u7A0B\u8FD0\u884C\uFF0C\u5F53\u7EBF\u7A0B\u7A7A\u95F2\u8D85\u8FC760\u79D2\uFF0C\u5C31\u9500\u6BC1\u7EBF\u7A0B\u3002</p>`,9),a=[l];function o(c,s){return n(),i("div",null,a)}const v=e(d,[["render",o],["__file","java-thread-y-threadpool-executors-create.html.vue"]]);export{v as default};
