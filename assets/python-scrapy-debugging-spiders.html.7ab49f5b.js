import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as i,a as n,b as t,d as p,e as o,r as c}from"./app.3a7e6dfd.js";const r={},l=p(`<h1 id="scrapy\u5165\u95E8-\u4E09-\u8C03\u8BD5-debugging-spiders" tabindex="-1"><a class="header-anchor" href="#scrapy\u5165\u95E8-\u4E09-\u8C03\u8BD5-debugging-spiders" aria-hidden="true">#</a> Scrapy\u5165\u95E8\uFF08\u4E09\uFF09-\u8C03\u8BD5(Debugging)Spiders</h1><h2 id="_1-\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#_1-\u80CC\u666F" aria-hidden="true">#</a> 1. \u80CC\u666F</h2><p>\u800CScrapy\u7684\u722C\u866B\u901A\u5E38\u662F\u5728\u547D\u4EE4\u884C\u4E2D\u542F\u52A8\u7684\uFF0C\u6211\u4EEC\u600E\u4E48\u53BB\u8C03\u8BD5\u5462\uFF1F</p><h2 id="_2-\u8C03\u8BD5\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#_2-\u8C03\u8BD5\u90E8\u7F72" aria-hidden="true">#</a> 2. \u8C03\u8BD5\u90E8\u7F72</h2><ol><li><p>\u9996\u5148\u5728setting.py\u540C\u7EA7\u76EE\u5F55\u4E0B\u521B\u5EFArun.py\u6587\u4EF6\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210311105958418.png" alt="image-20210311105958418" loading="lazy"></p></li></ol><p>\u5199\u5165\u4EE5\u4E0B\u4EE3\u7801</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token comment"># -*- coding: utf-8 -*-</span>

<span class="token keyword">from</span> scrapy <span class="token keyword">import</span> cmdline


name <span class="token operator">=</span> <span class="token string">&#39;douban_movie_top250&#39;</span>
cmd <span class="token operator">=</span> <span class="token string">&#39;scrapy crawl {0}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
cmdline<span class="token punctuation">.</span>execute<span class="token punctuation">(</span>cmd<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5176\u4E2Dname\u53C2\u6570\u4E3Aspider\u7684name\u3002 \u63A5\u7740\u5728spider\u6587\u4EF6\u4E2D\u8BBE\u7F6E\u65AD\u70B9\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210311110405697.png" alt="image-20210311110405697" loading="lazy"></p><p>\u8FD4\u56DErun.py\u6587\u4EF6\u4E2D\u53F3\u952E\u9009\u62E9Debug\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210311110423296.png" alt="image-20210311110423296" loading="lazy"></p><p>\u6700\u540E\u7A0B\u5E8F\u5C31\u4F1A\u5728\u65AD\u70B9\u5904\u6682\u505C\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u67E5\u770B\u76F8\u5E94\u7684\u5185\u5BB9\u4ECE\u800C\u8FDB\u884C\u8C03\u8BD5 \u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210311110438767.png" alt="image-20210311110438767" loading="lazy"></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,14),d={href:"https://zhuanlan.zhihu.com/p/25200262",target:"_blank",rel:"noopener noreferrer"},g=o("Scrapy\u722C\u866B\u6846\u67B6\u6559\u7A0B\uFF08\u4E09\uFF09-- \u8C03\u8BD5(Debugging)Spiders");function m(u,h){const a=c("ExternalLinkIcon");return e(),i("div",null,[l,n("p",null,[n("a",d,[g,t(a)])])])}const _=s(r,[["render",m],["__file","python-scrapy-debugging-spiders.html.vue"]]);export{_ as default};
