import { o as openBlock, c as createElementBlock, e as createStaticVNode } from "./app.67269af0.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="redis\u9762\u8BD5-\u5E94\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#redis\u9762\u8BD5-\u5E94\u7528\u573A\u666F" aria-hidden="true">#</a> Redis\u9762\u8BD5-\u5E94\u7528\u573A\u666F</h1><h2 id="_1-redis-\u5BA2\u6237\u7AEF\u6709\u54EA\u4E9B" tabindex="-1"><a class="header-anchor" href="#_1-redis-\u5BA2\u6237\u7AEF\u6709\u54EA\u4E9B" aria-hidden="true">#</a> 1 Redis \u5BA2\u6237\u7AEF\u6709\u54EA\u4E9B\uFF1F</h2><p>Redisson\u3001Jedis\u3001lettuce\u7B49\u7B49\uFF0C\u5B98\u65B9\u63A8\u8350\u4F7F\u7528Redisson\u3002</p><p>Redisson\u662F\u4E00\u4E2A\u9AD8\u7EA7\u7684\u5206\u5E03\u5F0F\u534F\u8C03Redis\u5BA2\u670D\u7AEF\uFF0C\u80FD\u5E2E\u52A9\u7528\u6237\u5728\u5206\u5E03\u5F0F\u73AF\u5883\u4E2D\u8F7B\u677E\u5B9E\u73B0\u4E00\u4E9BJava\u7684\u5BF9\u8C61 (Bloom filter, BitSet, Set, SetMultimap, ScoredSortedSet, SortedSet, Map, ConcurrentMap, List, ListMultimap, Queue, BlockingQueue, Deque, BlockingDeque, Semaphore, Lock, ReadWriteLock, AtomicLong, CountDownLatch, Publish / Subscribe, HyperLogLog)\u3002</p><h2 id="_2-redis\u5982\u4F55\u505A\u5927\u91CF\u6570\u636E\u63D2\u5165" tabindex="-1"><a class="header-anchor" href="#_2-redis\u5982\u4F55\u505A\u5927\u91CF\u6570\u636E\u63D2\u5165" aria-hidden="true">#</a> 2 Redis\u5982\u4F55\u505A\u5927\u91CF\u6570\u636E\u63D2\u5165\uFF1F</h2><p>Redis2.6\u5F00\u59CBredis-cli\u652F\u6301\u4E00\u79CD\u65B0\u7684\u88AB\u79F0\u4E4B\u4E3Apipe mode\u7684\u65B0\u6A21\u5F0F\u7528\u4E8E\u6267\u884C\u5927\u91CF\u6570\u636E\u63D2\u5165\u5DE5\u4F5C\u3002</p><h2 id="_3-redis\u5B9E\u73B0\u5206\u5E03\u5F0F\u9501\u5B9E\u73B0-\u4EC0\u4E48\u662F-redlock" tabindex="-1"><a class="header-anchor" href="#_3-redis\u5B9E\u73B0\u5206\u5E03\u5F0F\u9501\u5B9E\u73B0-\u4EC0\u4E48\u662F-redlock" aria-hidden="true">#</a> 3 Redis\u5B9E\u73B0\u5206\u5E03\u5F0F\u9501\u5B9E\u73B0? \u4EC0\u4E48\u662F RedLock?</h2><ul><li><strong>\u5E38\u89C4</strong></li></ul><p>\u52A0\u9501\uFF1A SET NX PX + \u6821\u9A8C\u552F\u4E00\u968F\u673A\u503C</p><p>\u89E3\u9501\uFF1A Lua\u811A\u672C</p><ul><li><strong>RedLock</strong></li></ul><p>\u641E\u591A\u4E2ARedis master\u90E8\u7F72\uFF0C\u4EE5\u4FDD\u8BC1\u5B83\u4EEC\u4E0D\u4F1A\u540C\u65F6\u5B95\u6389\u3002\u5E76\u4E14\u8FD9\u4E9Bmaster\u8282\u70B9\u662F\u5B8C\u5168\u76F8\u4E92\u72EC\u7ACB\u7684\uFF0C\u76F8\u4E92\u4E4B\u95F4\u4E0D\u5B58\u5728\u6570\u636E\u540C\u6B65\u3002\u540C\u65F6\uFF0C\u9700\u8981\u786E\u4FDD\u5728\u8FD9\u591A\u4E2Amaster\u5B9E\u4F8B\u4E0A\uFF0C\u662F\u4E0E\u5728Redis\u5355\u5B9E\u4F8B\uFF0C\u4F7F\u7528\u76F8\u540C\u65B9\u6CD5\u6765\u83B7\u53D6\u548C\u91CA\u653E\u9501\u3002</p><ul><li><strong>Redisson\u6846\u67B6</strong></li></ul><p>Redisson watchdog\u6216\u8005\u5B83\u5B9E\u73B0\u4E86RedLock\u65B9\u5F0F</p><p>\u5177\u4F53\u53EF\u4EE5\u770B\u540E\u6587\u5206\u5E03\u5F0F\u9501\u4E2D\u5B9E\u73B0\u65B9\u5F0F\u3002</p><h2 id="_4-redis\u7F13\u5B58\u6709\u54EA\u4E9B\u95EE\u9898-\u5982\u4F55\u89E3\u51B3" tabindex="-1"><a class="header-anchor" href="#_4-redis\u7F13\u5B58\u6709\u54EA\u4E9B\u95EE\u9898-\u5982\u4F55\u89E3\u51B3" aria-hidden="true">#</a> 4 Redis\u7F13\u5B58\u6709\u54EA\u4E9B\u95EE\u9898\uFF0C\u5982\u4F55\u89E3\u51B3\uFF1F</h2><p>\u5F53\u7F13\u5B58\u5E93\u51FA\u73B0\u65F6\uFF0C\u5FC5\u987B\u8981\u8003\u8651\u5982\u4E0B\u95EE\u9898\uFF1A</p><ul><li><strong>\u7F13\u5B58\u7A7F\u900F</strong><ul><li><strong>\u95EE\u9898\u6765\u6E90</strong>: \u7F13\u5B58\u7A7F\u900F\u662F\u6307<strong>\u7F13\u5B58\u548C\u6570\u636E\u5E93\u4E2D\u90FD\u6CA1\u6709\u7684\u6570\u636E</strong>\uFF0C\u800C\u7528\u6237\u4E0D\u65AD\u53D1\u8D77\u8BF7\u6C42\u3002\u7531\u4E8E\u7F13\u5B58\u662F\u4E0D\u547D\u4E2D\u65F6\u88AB\u52A8\u5199\u7684\uFF0C\u5E76\u4E14\u51FA\u4E8E\u5BB9\u9519\u8003\u8651\uFF0C\u5982\u679C\u4ECE\u5B58\u50A8\u5C42\u67E5\u4E0D\u5230\u6570\u636E\u5219\u4E0D\u5199\u5165\u7F13\u5B58\uFF0C\u8FD9\u5C06\u5BFC\u81F4\u8FD9\u4E2A\u4E0D\u5B58\u5728\u7684\u6570\u636E\u6BCF\u6B21\u8BF7\u6C42\u90FD\u8981\u5230\u5B58\u50A8\u5C42\u53BB\u67E5\u8BE2\uFF0C\u5931\u53BB\u4E86\u7F13\u5B58\u7684\u610F\u4E49\u3002</li><li>\u89E3\u51B3\u65B9\u6848 <ul><li>\u63A5\u53E3\u5C42\u589E\u52A0\u6821\u9A8C\uFF0C\u5982\u7528\u6237\u9274\u6743\u6821\u9A8C\uFF0Cid\u505A\u57FA\u7840\u6821\u9A8C\uFF0Cid&lt;=0\u7684\u76F4\u63A5\u62E6\u622A\uFF1B</li><li>\u4ECE\u7F13\u5B58\u53D6\u4E0D\u5230\u7684\u6570\u636E\uFF0C\u5728\u6570\u636E\u5E93\u4E2D\u4E5F\u6CA1\u6709\u53D6\u5230\uFF0C\u8FD9\u65F6\u4E5F\u53EF\u4EE5\u5C06key-value\u5BF9\u5199\u4E3Akey-null\uFF0C\u7F13\u5B58\u6709\u6548\u65F6\u95F4\u53EF\u4EE5\u8BBE\u7F6E\u77ED\u70B9\uFF0C\u598230\u79D2\uFF08\u8BBE\u7F6E\u592A\u957F\u4F1A\u5BFC\u81F4\u6B63\u5E38\u60C5\u51B5\u4E5F\u6CA1\u6CD5\u4F7F\u7528\uFF09\u3002\u8FD9\u6837\u53EF\u4EE5\u9632\u6B62\u653B\u51FB\u7528\u6237\u53CD\u590D\u7528\u540C\u4E00\u4E2Aid\u66B4\u529B\u653B\u51FB</li><li>\u5E03\u9686\u8FC7\u6EE4\u5668\u3002bloomfilter\u5C31\u7C7B\u4F3C\u4E8E\u4E00\u4E2Ahash set\uFF0C\u7528\u4E8E\u5FEB\u901F\u5224\u67D0\u4E2A\u5143\u7D20\u662F\u5426\u5B58\u5728\u4E8E\u96C6\u5408\u4E2D\uFF0C\u5176\u5178\u578B\u7684\u5E94\u7528\u573A\u666F\u5C31\u662F\u5FEB\u901F\u5224\u65AD\u4E00\u4E2Akey\u662F\u5426\u5B58\u5728\u4E8E\u67D0\u5BB9\u5668\uFF0C\u4E0D\u5B58\u5728\u5C31\u76F4\u63A5\u8FD4\u56DE\u3002\u5E03\u9686\u8FC7\u6EE4\u5668\u7684\u5173\u952E\u5C31\u5728\u4E8Ehash\u7B97\u6CD5\u548C\u5BB9\u5668\u5927\u5C0F</li></ul></li></ul></li><li><strong>\u7F13\u5B58\u7A7F\u51FB</strong><ul><li><strong>\u95EE\u9898\u6765\u6E90</strong>: \u7F13\u5B58\u51FB\u7A7F\u662F\u6307<strong>\u7F13\u5B58\u4E2D\u6CA1\u6709\u4F46\u6570\u636E\u5E93\u4E2D\u6709\u7684\u6570\u636E</strong>\uFF08\u4E00\u822C\u662F\u7F13\u5B58\u65F6\u95F4\u5230\u671F\uFF09\uFF0C\u8FD9\u65F6\u7531\u4E8E\u5E76\u53D1\u7528\u6237\u7279\u522B\u591A\uFF0C\u540C\u65F6\u8BFB\u7F13\u5B58\u6CA1\u8BFB\u5230\u6570\u636E\uFF0C\u53C8\u540C\u65F6\u53BB\u6570\u636E\u5E93\u53BB\u53D6\u6570\u636E\uFF0C\u5F15\u8D77\u6570\u636E\u5E93\u538B\u529B\u77AC\u95F4\u589E\u5927\uFF0C\u9020\u6210\u8FC7\u5927\u538B\u529B\u3002</li><li>\u89E3\u51B3\u65B9\u6848 <ul><li>\u8BBE\u7F6E\u70ED\u70B9\u6570\u636E\u6C38\u8FDC\u4E0D\u8FC7\u671F\u3002</li><li>\u63A5\u53E3\u9650\u6D41\u4E0E\u7194\u65AD\uFF0C\u964D\u7EA7\u3002\u91CD\u8981\u7684\u63A5\u53E3\u4E00\u5B9A\u8981\u505A\u597D\u9650\u6D41\u7B56\u7565\uFF0C\u9632\u6B62\u7528\u6237\u6076\u610F\u5237\u63A5\u53E3\uFF0C\u540C\u65F6\u8981\u964D\u7EA7\u51C6\u5907\uFF0C\u5F53\u63A5\u53E3\u4E2D\u7684\u67D0\u4E9B \u670D\u52A1 \u4E0D\u53EF\u7528\u65F6\u5019\uFF0C\u8FDB\u884C\u7194\u65AD\uFF0C\u5931\u8D25\u5FEB\u901F\u8FD4\u56DE\u673A\u5236\u3002</li><li>\u52A0\u4E92\u65A5\u9501</li></ul></li></ul></li><li><strong>\u7F13\u5B58\u96EA\u5D29</strong><ul><li><strong>\u95EE\u9898\u6765\u6E90</strong>: \u7F13\u5B58\u96EA\u5D29\u662F\u6307\u7F13\u5B58\u4E2D<strong>\u6570\u636E\u5927\u6279\u91CF\u5230\u8FC7\u671F\u65F6\u95F4\uFF0C\u800C\u67E5\u8BE2\u6570\u636E\u91CF\u5DE8\u5927\uFF0C\u5F15\u8D77\u6570\u636E\u5E93\u538B\u529B\u8FC7\u5927\u751A\u81F3down\u673A</strong>\u3002\u548C\u7F13\u5B58\u51FB\u7A7F\u4E0D\u540C\u7684\u662F\uFF0C\u7F13\u5B58\u51FB\u7A7F\u6307\u5E76\u53D1\u67E5\u540C\u4E00\u6761\u6570\u636E\uFF0C\u7F13\u5B58\u96EA\u5D29\u662F\u4E0D\u540C\u6570\u636E\u90FD\u8FC7\u671F\u4E86\uFF0C\u5F88\u591A\u6570\u636E\u90FD\u67E5\u4E0D\u5230\u4ECE\u800C\u67E5\u6570\u636E\u5E93\u3002</li><li>\u89E3\u51B3\u65B9\u6848 <ul><li>\u7F13\u5B58\u6570\u636E\u7684\u8FC7\u671F\u65F6\u95F4\u8BBE\u7F6E\u968F\u673A\uFF0C\u9632\u6B62\u540C\u4E00\u65F6\u95F4\u5927\u91CF\u6570\u636E\u8FC7\u671F\u73B0\u8C61\u53D1\u751F\u3002</li><li>\u5982\u679C\u7F13\u5B58\u6570\u636E\u5E93\u662F\u5206\u5E03\u5F0F\u90E8\u7F72\uFF0C\u5C06\u70ED\u70B9\u6570\u636E\u5747\u5300\u5206\u5E03\u5728\u4E0D\u540C\u7684\u7F13\u5B58\u6570\u636E\u5E93\u4E2D\u3002</li><li>\u8BBE\u7F6E\u70ED\u70B9\u6570\u636E\u6C38\u8FDC\u4E0D\u8FC7\u671F\u3002</li></ul></li></ul></li><li><strong>\u7F13\u5B58\u6C61\u67D3</strong>\uFF08\u6216\u8005\u6EE1\u4E86\uFF09</li></ul><p>\u7F13\u5B58\u6C61\u67D3\u95EE\u9898\u8BF4\u7684\u662F\u7F13\u5B58\u4E2D\u4E00\u4E9B\u53EA\u4F1A\u88AB\u8BBF\u95EE\u4E00\u6B21\u6216\u8005\u51E0\u6B21\u7684\u7684\u6570\u636E\uFF0C\u88AB\u8BBF\u95EE\u5B8C\u540E\uFF0C\u518D\u4E5F\u4E0D\u4F1A\u88AB\u8BBF\u95EE\u5230\uFF0C\u4F46\u8FD9\u90E8\u5206\u6570\u636E\u4F9D\u7136\u7559\u5B58\u5728\u7F13\u5B58\u4E2D\uFF0C\u6D88\u8017\u7F13\u5B58\u7A7A\u95F4\u3002</p><p>\u7F13\u5B58\u6C61\u67D3\u4F1A\u968F\u7740\u6570\u636E\u7684\u6301\u7EED\u589E\u52A0\u800C\u9010\u6E10\u663E\u9732\uFF0C\u968F\u7740\u670D\u52A1\u7684\u4E0D\u65AD\u8FD0\u884C\uFF0C\u7F13\u5B58\u4E2D\u4F1A\u5B58\u5728\u5927\u91CF\u7684\u6C38\u8FDC\u4E0D\u4F1A\u518D\u6B21\u88AB\u8BBF\u95EE\u7684\u6570\u636E\u3002\u7F13\u5B58\u7A7A\u95F4\u662F\u6709\u9650\u7684\uFF0C\u5982\u679C\u7F13\u5B58\u7A7A\u95F4\u6EE1\u4E86\uFF0C\u518D\u5F80\u7F13\u5B58\u91CC\u5199\u6570\u636E\u65F6\u5C31\u4F1A\u6709\u989D\u5916\u5F00\u9500\uFF0C\u5F71\u54CDRedis\u6027\u80FD\u3002\u8FD9\u90E8\u5206\u989D\u5916\u5F00\u9500\u4E3B\u8981\u662F\u6307\u5199\u7684\u65F6\u5019\u5224\u65AD\u6DD8\u6C70\u7B56\u7565\uFF0C\u6839\u636E\u6DD8\u6C70\u7B56\u7565\u53BB\u9009\u62E9\u8981\u6DD8\u6C70\u7684\u6570\u636E\uFF0C\u7136\u540E\u8FDB\u884C\u5220\u9664\u64CD\u4F5C\u3002</p><h2 id="_5-redis\u6027\u80FD\u95EE\u9898\u6709\u54EA\u4E9B-\u5982\u4F55\u5206\u6790\u5B9A\u4F4D\u89E3\u51B3" tabindex="-1"><a class="header-anchor" href="#_5-redis\u6027\u80FD\u95EE\u9898\u6709\u54EA\u4E9B-\u5982\u4F55\u5206\u6790\u5B9A\u4F4D\u89E3\u51B3" aria-hidden="true">#</a> 5 Redis\u6027\u80FD\u95EE\u9898\u6709\u54EA\u4E9B\uFF0C\u5982\u4F55\u5206\u6790\u5B9A\u4F4D\u89E3\u51B3?</h2><p>\u4E3E\u51E0\u4E2A\u4F8B\u5B50</p><ul><li><strong>\u770B\u5EF6\u8FDF</strong> 60 \u79D2\u5185\u7684\u6700\u5927\u54CD\u5E94\u5EF6\u8FDF\uFF1A</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ redis-cli -h <span class="token number">127.0</span>.0.1 -p <span class="token number">6379</span> --intrinsic-latency <span class="token number">60</span>\nMax latency so far: <span class="token number">1</span> microseconds.\nMax latency so far: <span class="token number">15</span> microseconds.\nMax latency so far: <span class="token number">17</span> microseconds.\nMax latency so far: <span class="token number">18</span> microseconds.\nMax latency so far: <span class="token number">31</span> microseconds.\nMax latency so far: <span class="token number">32</span> microseconds.\nMax latency so far: <span class="token number">59</span> microseconds.\nMax latency so far: <span class="token number">72</span> microseconds.\n \n<span class="token number">1428669267</span> total runs <span class="token punctuation">(</span>avg latency: <span class="token number">0.0420</span> microseconds / <span class="token number">42.00</span> nanoseconds per run<span class="token punctuation">)</span>.\nWorst run took 1429x longer than the average latency.\n   \n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>\u6162\u65E5\u5FD7</strong>\uFF08slowlog\uFF09</li></ul><p>\u6162\u67E5\u8BE2\uFF0C\u5C31\u4F1A\u5BFC\u81F4\u540E\u9762\u7684\u8BF7\u6C42\u53D1\u751F\u6392\u961F\uFF0C\u5BF9\u4E8E\u5BA2\u6237\u7AEF\u6765\u8BF4\uFF0C\u54CD\u5E94\u5EF6\u8FDF\u4E5F\u4F1A\u53D8\u957F\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220628231317888.png" alt="image-20220628231317888"></p><ul><li><strong>bigkey</strong></li></ul><p>\u5927\u5BF9\u8C61</p><ul><li><strong>\u96C6\u4E2D\u8FC7\u671F</strong></li></ul><p>\u4E00\u822C\u6709\u4E24\u79CD\u65B9\u6848\u6765\u89C4\u907F\u8FD9\u4E2A\u95EE\u9898\uFF1A</p><ol><li>\u96C6\u4E2D\u8FC7\u671F key \u589E\u52A0\u4E00\u4E2A\u968F\u673A\u8FC7\u671F\u65F6\u95F4\uFF0C\u628A\u96C6\u4E2D\u8FC7\u671F\u7684\u65F6\u95F4\u6253\u6563\uFF0C\u964D\u4F4E Redis \u6E05\u7406\u8FC7\u671F key \u7684\u538B\u529B</li><li>\u5982\u679C\u4F60\u4F7F\u7528\u7684 Redis \u662F 4.0 \u4EE5\u4E0A\u7248\u672C\uFF0C\u53EF\u4EE5\u5F00\u542F lazy-free \u673A\u5236\uFF0C\u5F53\u5220\u9664\u8FC7\u671F key \u65F6\uFF0C\u628A\u91CA\u653E\u5185\u5B58\u7684\u64CD\u4F5C\u653E\u5230\u540E\u53F0\u7EBF\u7A0B\u4E2D\u6267\u884C\uFF0C\u907F\u514D\u963B\u585E\u4E3B\u7EBF\u7A0B</li></ol><ul><li><strong>fork\u8017\u65F6\u4E25\u91CD</strong></li></ul><p>\u4E3B\u8FDB\u7A0B\u521B\u5EFA\u5B50\u8FDB\u7A0B\uFF0C\u4F1A\u8C03\u7528\u64CD\u4F5C\u7CFB\u7EDF\u63D0\u4F9B\u7684 fork \u51FD\u6570</p><ul><li><strong>\u4F7F\u7528Swap</strong></li></ul><p>\u5F53\u5185\u5B58\u4E2D\u7684\u6570\u636E\u88AB\u6362\u5230\u78C1\u76D8\u4E0A\u540E\uFF0CRedis \u518D\u8BBF\u95EE\u8FD9\u4E9B\u6570\u636E\u65F6\uFF0C\u5C31\u9700\u8981\u4ECE\u78C1\u76D8\u4E0A\u8BFB\u53D6\uFF0C\u8BBF\u95EE\u78C1\u76D8\u7684\u901F\u5EA6\u8981\u6BD4\u8BBF\u95EE\u5185\u5B58\u6162\u51E0\u767E\u500D\uFF01</p><ul><li><strong>\u5185\u5B58\u788E\u7247</strong></li></ul><p>Redis 4.0 \u7248\u672C\uFF0C\u5B83\u6B63\u597D\u63D0\u4F9B\u4E86\u81EA\u52A8\u788E\u7247\u6574\u7406\u7684\u529F\u80FD\uFF0C\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E\u5F00\u542F\u788E\u7247\u81EA\u52A8\u6574\u7406</p>', 38);
const _hoisted_39 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, _hoisted_39);
}
var Redis________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Redis\u9762\u8BD5-\u5E94\u7528\u573A\u666F.html.vue"]]);
export { Redis________html as default };
