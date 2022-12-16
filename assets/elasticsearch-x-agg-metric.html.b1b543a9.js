import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as p,c as i,a as n,b as t,e as s,d as o,r as l}from"./app.feaa9477.js";const c={},u=n("h1",{id:"es\u8BE6\u89E3-\u805A\u5408-\u805A\u5408\u67E5\u8BE2\u4E4Bmetric\u805A\u5408\u8BE6\u89E3",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#es\u8BE6\u89E3-\u805A\u5408-\u805A\u5408\u67E5\u8BE2\u4E4Bmetric\u805A\u5408\u8BE6\u89E3","aria-hidden":"true"},"#"),s(" ES\u8BE6\u89E3 - \u805A\u5408\uFF1A\u805A\u5408\u67E5\u8BE2\u4E4BMetric\u805A\u5408\u8BE6\u89E3")],-1),r=n("blockquote",null,[n("p",null,[s("\u524D\u6587\u4E3B\u8981\u8BB2\u4E86 ElasticSearch\u63D0\u4F9B\u7684\u4E09\u79CD\u805A\u5408\u65B9\u5F0F\u4E4B"),n("strong",null,"\u6876\u805A\u5408\uFF08Bucket Aggregation)"),s("\uFF0C\u672C\u6587\u4E3B\u8981\u8BB2\u8BB2"),n("strong",null,"\u6307\u6807\u805A\u5408\uFF08Metric Aggregation)"),s("\u3002")])],-1),d=n("h2",{id:"_1-\u5982\u4F55\u7406\u89E3metric\u805A\u5408",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-\u5982\u4F55\u7406\u89E3metric\u805A\u5408","aria-hidden":"true"},"#"),s(" 1. \u5982\u4F55\u7406\u89E3metric\u805A\u5408")],-1),k=s("\u5728"),v={href:"https://pdai.tech/md/db/nosql-es/elasticsearch-x-agg-bucket.html",target:"_blank",rel:"noopener noreferrer"},m=s("bucket\u805A\u5408"),b=s("\u4E2D\uFF0C\u6211\u753B\u4E86\u4E00\u5F20\u56FE\u8F85\u52A9\u4F60\u6784\u7B51\u4F53\u7CFB\uFF0C\u90A3\u4E48metric\u805A\u5408\u53C8\u5982\u4F55\u7406\u89E3\u5462\uFF1F"),q=o(`<p>\u5982\u679C\u4F60\u76F4\u63A5\u53BB\u770B\u5B98\u65B9\u6587\u6863\uFF0C\u5927\u6982\u4E5F\u6709\u5341\u51E0\u79CD\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220806215514422.png" alt="image-20220806215514422" loading="lazy"></p><blockquote><p>\u90A3\u4E48metric\u805A\u5408\u53C8\u5982\u4F55\u7406\u89E3\u5462\uFF1F\u6211\u8BA4\u4E3A\u4ECE\u4E24\u4E2A\u89D2\u5EA6\uFF1A</p></blockquote><ul><li><strong>\u4ECE\u5206\u7C7B\u770B</strong>\uFF1AMetric\u805A\u5408\u5206\u6790\u5206\u4E3A<strong>\u5355\u503C\u5206\u6790</strong>\u548C<strong>\u591A\u503C\u5206\u6790</strong>\u4E24\u7C7B</li><li><strong>\u4ECE\u529F\u80FD\u770B</strong>\uFF1A\u6839\u636E\u5177\u4F53\u7684\u5E94\u7528\u573A\u666F\u8BBE\u8BA1\u4E86\u4E00\u4E9B\u5206\u6790api, \u6BD4\u5982\u5730\u7406\u4F4D\u7F6E\uFF0C\u767E\u5206\u6570\u7B49\u7B49</li></ul><blockquote><p>\u878D\u5408\u4E0A\u8FF0\u4E24\u4E2A\u65B9\u9762\uFF0C\u6211\u4EEC\u53EF\u4EE5\u68B3\u7406\u51FA\u5927\u81F4\u7684\u4E00\u4E2Amind\u56FE\uFF1A</p></blockquote><ul><li><p>\u5355\u503C\u5206\u6790: \u53EA\u8F93\u51FA\u4E00\u4E2A\u5206\u6790\u7ED3\u679C</p><ul><li>\u6807\u51C6stat\u578B <ul><li><code>avg</code> \u5E73\u5747\u503C</li><li><code>max</code> \u6700\u5927\u503C</li><li><code>min</code> \u6700\u5C0F\u503C</li><li><code>sum</code> \u548C</li><li><code>value_count</code> \u6570\u91CF</li></ul></li><li>\u5176\u5B83\u7C7B\u578B <ul><li><code>cardinality</code> \u57FA\u6570\uFF08distinct\u53BB\u91CD\uFF09</li><li><code>weighted_avg</code> \u5E26\u6743\u91CD\u7684avg</li><li><code>median_absolute_deviation</code> \u4E2D\u4F4D\u503C</li></ul></li></ul></li><li><p>\u591A\u503C\u5206\u6790</p><p>: \u5355\u503C\u4E4B\u5916\u7684</p><ul><li>stats\u578B <ul><li><code>stats</code> \u5305\u542Bavg,max,min,sum\u548Ccount</li><li><code>matrix_stats</code> \u9488\u5BF9\u77E9\u9635\u6A21\u578B</li><li><code>extended_stats</code></li><li><code>string_stats</code> \u9488\u5BF9\u5B57\u7B26\u4E32</li></ul></li><li>\u767E\u5206\u6570\u578B <ul><li><code>percentiles</code> \u767E\u5206\u6570\u8303\u56F4</li><li><code>percentile_ranks</code> \u767E\u5206\u6570\u6392\u884C</li></ul></li><li>\u5730\u7406\u4F4D\u7F6E\u578B <ul><li><code>geo_bounds</code> Geo bounds</li><li><code>geo_centroid</code> Geo-centroid</li><li><code>geo_line</code> Geo-Line</li></ul></li><li>Top\u578B <ul><li><code>top_hits</code> \u5206\u6876\u540E\u7684top hits</li><li><code>top_metrics</code></li></ul></li></ul></li></ul><blockquote><p><strong>\u901A\u8FC7\u4E0A\u8FF0\u5217\u8868\uFF08\u6211\u5C31\u4E0D\u753B\u56FE\u4E86\uFF09\uFF0C\u6211\u4EEC\u6784\u7B51\u7684\u4F53\u7CFB\u662F\u57FA\u4E8E<code>\u5206\u7C7B</code>\u548C<code>\u529F\u80FD</code>\uFF0C\u800C\u4E0D\u662F\u5177\u4F53\u7684\u9879\uFF08\u6BD4\u5982avg,percentiles...)\uFF1B\u8FD9\u662F\u4E0D\u540C\u7684\u8BA4\u77E5\u7EF4\u5EA6: \u5177\u4F53\u7684\u9879\u662F\u788E\u7247\u5316\uFF0C\u5206\u7C7B\u548C\u529F\u80FD\u8FD9\u79CD\u662F\u4F60\u9700\u8981\u6784\u7B51\u7684\u4F53\u7CFB</strong>\u3002</p></blockquote><h2 id="_2-\u5355\u503C\u5206\u6790-\u6807\u51C6stat\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#_2-\u5355\u503C\u5206\u6790-\u6807\u51C6stat\u7C7B\u578B" aria-hidden="true">#</a> 2. \u5355\u503C\u5206\u6790: \u6807\u51C6stat\u7C7B\u578B</h2><h3 id="_2-1-avg-\u5E73\u5747\u503C" tabindex="-1"><a class="header-anchor" href="#_2-1-avg-\u5E73\u5747\u503C" aria-hidden="true">#</a> 2.1 <code>avg</code> \u5E73\u5747\u503C</h3><p>\u8BA1\u7B97\u73ED\u7EA7\u7684\u5E73\u5747\u5206</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>POST /exams/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;avg_grade&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;avg&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;grade&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;avg_grade&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">75.0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-max-\u6700\u5927\u503C" tabindex="-1"><a class="header-anchor" href="#_2-2-max-\u6700\u5927\u503C" aria-hidden="true">#</a> 2.2 <code>max</code> \u6700\u5927\u503C</h3><p>\u8BA1\u7B97\u9500\u552E\u6700\u9AD8\u4EF7</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>POST /sales/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;max_price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;max&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;price&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;max_price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">200.0</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-min-\u6700\u5C0F\u503C" tabindex="-1"><a class="header-anchor" href="#_2-3-min-\u6700\u5C0F\u503C" aria-hidden="true">#</a> 2.3 <code>min</code> \u6700\u5C0F\u503C</h3><p>\u8BA1\u7B97\u9500\u552E\u6700\u4F4E\u4EF7</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>POST /sales/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;min_price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;min&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;price&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.

  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;min_price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10.0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-sum-\u548C" tabindex="-1"><a class="header-anchor" href="#_2-4-sum-\u548C" aria-hidden="true">#</a> 2.4 <code>sum</code> \u548C</h3><p>\u8BA1\u7B97\u9500\u552E\u603B\u4EF7</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>POST /sales/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;constant_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;hat&quot;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;hat_prices&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;sum&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;price&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;hat_prices&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">450.0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-value-count-\u6570\u91CF" tabindex="-1"><a class="header-anchor" href="#_2-5-value-count-\u6570\u91CF" aria-hidden="true">#</a> 2.5 <code>value_count</code> \u6570\u91CF</h3><p>\u9500\u552E\u6570\u91CF\u7EDF\u8BA1</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>POST /sales/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;types_count&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;value_count&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;type&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;types_count&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">7</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-\u5355\u503C\u5206\u6790-\u5176\u5B83\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#_3-\u5355\u503C\u5206\u6790-\u5176\u5B83\u7C7B\u578B" aria-hidden="true">#</a> 3. \u5355\u503C\u5206\u6790: \u5176\u5B83\u7C7B\u578B</h2><h3 id="_3-1-weighted-avg-\u5E26\u6743\u91CD\u7684avg" tabindex="-1"><a class="header-anchor" href="#_3-1-weighted-avg-\u5E26\u6743\u91CD\u7684avg" aria-hidden="true">#</a> 3.1 <code>weighted_avg</code> \u5E26\u6743\u91CD\u7684avg</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>POST /exams/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;weighted_grade&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;weighted_avg&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;grade&quot;</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;weight&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;weight&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;weighted_grade&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">70.0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-cardinality-\u57FA\u6570-distinct\u53BB\u91CD" tabindex="-1"><a class="header-anchor" href="#_3-2-cardinality-\u57FA\u6570-distinct\u53BB\u91CD" aria-hidden="true">#</a> 3.2 <code>cardinality</code> \u57FA\u6570\uFF08distinct\u53BB\u91CD\uFF09</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>POST /sales/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;type_count&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;cardinality&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;type&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;type_count&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-median-absolute-deviation-\u4E2D\u4F4D\u503C" tabindex="-1"><a class="header-anchor" href="#_3-3-median-absolute-deviation-\u4E2D\u4F4D\u503C" aria-hidden="true">#</a> 3.3 <code>median_absolute_deviation</code> \u4E2D\u4F4D\u503C</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET reviews/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;review_average&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;avg&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;rating&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;review_variability&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;median_absolute_deviation&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;rating&quot;</span> 
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;review_average&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3.0</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;review_variability&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2.0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-\u975E\u5355\u503C\u5206\u6790-stats\u578B" tabindex="-1"><a class="header-anchor" href="#_4-\u975E\u5355\u503C\u5206\u6790-stats\u578B" aria-hidden="true">#</a> 4. \u975E\u5355\u503C\u5206\u6790\uFF1Astats\u578B</h2><h3 id="_4-1-stats-\u5305\u542Bavg-max-min-sum\u548Ccount" tabindex="-1"><a class="header-anchor" href="#_4-1-stats-\u5305\u542Bavg-max-min-sum\u548Ccount" aria-hidden="true">#</a> 4.1 <code>stats</code> \u5305\u542Bavg,max,min,sum\u548Ccount</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>POST /exams/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;grades_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;grade&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.

  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;grades_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span>,
      <span class="token string">&quot;min&quot;</span><span class="token builtin class-name">:</span> <span class="token number">50.0</span>,
      <span class="token string">&quot;max&quot;</span><span class="token builtin class-name">:</span> <span class="token number">100.0</span>,
      <span class="token string">&quot;avg&quot;</span><span class="token builtin class-name">:</span> <span class="token number">75.0</span>,
      <span class="token string">&quot;sum&quot;</span><span class="token builtin class-name">:</span> <span class="token number">150.0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-matrix-stats-\u9488\u5BF9\u77E9\u9635\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#_4-2-matrix-stats-\u9488\u5BF9\u77E9\u9635\u6A21\u578B" aria-hidden="true">#</a> 4.2 <code>matrix_stats</code> \u9488\u5BF9\u77E9\u9635\u6A21\u578B</h3><p>\u4EE5\u4E0B\u793A\u4F8B\u8BF4\u660E\u4E86\u4F7F\u7528\u77E9\u9635\u7EDF\u8BA1\u91CF\u6765\u63CF\u8FF0\u6536\u5165\u4E0E\u8D2B\u56F0\u4E4B\u95F4\u7684\u5173\u7CFB\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;statistics&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;matrix_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;poverty&quot;</span>, <span class="token string">&quot;income&quot;</span> <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;statistics&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;doc_count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">50</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;income&quot;</span>,
          <span class="token string">&quot;count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">50</span>,
          <span class="token string">&quot;mean&quot;</span><span class="token builtin class-name">:</span> <span class="token number">51985.1</span>,
          <span class="token string">&quot;variance&quot;</span><span class="token builtin class-name">:</span> <span class="token number">7</span>.383377037755103E7,
          <span class="token string">&quot;skewness&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.5595114003506483</span>,
          <span class="token string">&quot;kurtosis&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2.5692365287787124</span>,
          <span class="token string">&quot;covariance&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;income&quot;</span><span class="token builtin class-name">:</span> <span class="token number">7</span>.383377037755103E7,
            <span class="token string">&quot;poverty&quot;</span><span class="token builtin class-name">:</span> <span class="token parameter variable">-21093.65836734694</span>
          <span class="token punctuation">}</span>,
          <span class="token string">&quot;correlation&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;income&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1.0</span>,
            <span class="token string">&quot;poverty&quot;</span><span class="token builtin class-name">:</span> <span class="token parameter variable">-0.8352655256272504</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>, <span class="token punctuation">{</span>
          <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;poverty&quot;</span>,
          <span class="token string">&quot;count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">50</span>,
          <span class="token string">&quot;mean&quot;</span><span class="token builtin class-name">:</span> <span class="token number">12.732000000000001</span>,
          <span class="token string">&quot;variance&quot;</span><span class="token builtin class-name">:</span> <span class="token number">8.637730612244896</span>,
          <span class="token string">&quot;skewness&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.4516049811903419</span>,
          <span class="token string">&quot;kurtosis&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2.8615929677997767</span>,
          <span class="token string">&quot;covariance&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;income&quot;</span><span class="token builtin class-name">:</span> -21093.65836734694,
            <span class="token string">&quot;poverty&quot;</span><span class="token builtin class-name">:</span> <span class="token number">8.637730612244896</span>
          <span class="token punctuation">}</span>,
          <span class="token string">&quot;correlation&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;income&quot;</span><span class="token builtin class-name">:</span> -0.8352655256272504,
            <span class="token string">&quot;poverty&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1.0</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-extended-stats" tabindex="-1"><a class="header-anchor" href="#_4-3-extended-stats" aria-hidden="true">#</a> 4.3 <code>extended_stats</code></h3><p>\u6839\u636E\u4ECE\u6C47\u603B\u6587\u6863\u4E2D\u63D0\u53D6\u7684\u6570\u503C\u8BA1\u7B97\u7EDF\u8BA1\u4FE1\u606F\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /exams/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;grades_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;extended_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;grade&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u9762\u7684\u6C47\u603B\u8BA1\u7B97\u4E86\u6240\u6709\u6587\u6863\u7684\u6210\u7EE9\u7EDF\u8BA1\u4FE1\u606F\u3002\u805A\u5408\u7C7B\u578B\u4E3Aextended_stats\uFF0C\u5E76\u4E14\u5B57\u6BB5\u8BBE\u7F6E\u5B9A\u4E49\u5C06\u5728\u5176\u4E0A\u8BA1\u7B97\u7EDF\u8BA1\u4FE1\u606F\u7684\u6587\u6863\u7684\u6570\u5B57\u5B57\u6BB5\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.

  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;grades_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span>,
      <span class="token string">&quot;min&quot;</span><span class="token builtin class-name">:</span> <span class="token number">50.0</span>,
      <span class="token string">&quot;max&quot;</span><span class="token builtin class-name">:</span> <span class="token number">100.0</span>,
      <span class="token string">&quot;avg&quot;</span><span class="token builtin class-name">:</span> <span class="token number">75.0</span>,
      <span class="token string">&quot;sum&quot;</span><span class="token builtin class-name">:</span> <span class="token number">150.0</span>,
      <span class="token string">&quot;sum_of_squares&quot;</span><span class="token builtin class-name">:</span> <span class="token number">12500.0</span>,
      <span class="token string">&quot;variance&quot;</span><span class="token builtin class-name">:</span> <span class="token number">625.0</span>,
      <span class="token string">&quot;variance_population&quot;</span><span class="token builtin class-name">:</span> <span class="token number">625.0</span>,
      <span class="token string">&quot;variance_sampling&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1250.0</span>,
      <span class="token string">&quot;std_deviation&quot;</span><span class="token builtin class-name">:</span> <span class="token number">25.0</span>,
      <span class="token string">&quot;std_deviation_population&quot;</span><span class="token builtin class-name">:</span> <span class="token number">25.0</span>,
      <span class="token string">&quot;std_deviation_sampling&quot;</span><span class="token builtin class-name">:</span> <span class="token number">35.35533905932738</span>,
      <span class="token string">&quot;std_deviation_bounds&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;upper&quot;</span><span class="token builtin class-name">:</span> <span class="token number">125.0</span>,
        <span class="token string">&quot;lower&quot;</span><span class="token builtin class-name">:</span> <span class="token number">25.0</span>,
        <span class="token string">&quot;upper_population&quot;</span><span class="token builtin class-name">:</span> <span class="token number">125.0</span>,
        <span class="token string">&quot;lower_population&quot;</span><span class="token builtin class-name">:</span> <span class="token number">25.0</span>,
        <span class="token string">&quot;upper_sampling&quot;</span><span class="token builtin class-name">:</span> <span class="token number">145.71067811865476</span>,
        <span class="token string">&quot;lower_sampling&quot;</span><span class="token builtin class-name">:</span> <span class="token number">4.289321881345245</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-string-stats-\u9488\u5BF9\u5B57\u7B26\u4E32" tabindex="-1"><a class="header-anchor" href="#_4-4-string-stats-\u9488\u5BF9\u5B57\u7B26\u4E32" aria-hidden="true">#</a> 4.4 <code>string_stats</code> \u9488\u5BF9\u5B57\u7B26\u4E32</h3><p>\u7528\u4E8E\u8BA1\u7B97\u4ECE\u805A\u5408\u6587\u6863\u4E2D\u63D0\u53D6\u7684\u5B57\u7B26\u4E32\u503C\u7684\u7EDF\u8BA1\u4FE1\u606F\u3002\u8FD9\u4E9B\u503C\u53EF\u4EE5\u4ECE\u7279\u5B9A\u7684\u5173\u952E\u5B57\u5B57\u6BB5\u4E2D\u68C0\u7D22\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>POST /my-index-000001/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;message_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;string_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;message.keyword&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.

  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;message_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">5</span>,
      <span class="token string">&quot;min_length&quot;</span><span class="token builtin class-name">:</span> <span class="token number">24</span>,
      <span class="token string">&quot;max_length&quot;</span><span class="token builtin class-name">:</span> <span class="token number">30</span>,
      <span class="token string">&quot;avg_length&quot;</span><span class="token builtin class-name">:</span> <span class="token number">28.8</span>,
      <span class="token string">&quot;entropy&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3.94617750050791</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-\u975E\u5355\u503C\u5206\u6790-\u767E\u5206\u6570\u578B" tabindex="-1"><a class="header-anchor" href="#_5-\u975E\u5355\u503C\u5206\u6790-\u767E\u5206\u6570\u578B" aria-hidden="true">#</a> 5. \u975E\u5355\u503C\u5206\u6790\uFF1A\u767E\u5206\u6570\u578B</h2><h3 id="_5-1-percentiles-\u767E\u5206\u6570\u8303\u56F4" tabindex="-1"><a class="header-anchor" href="#_5-1-percentiles-\u767E\u5206\u6570\u8303\u56F4" aria-hidden="true">#</a> 5.1 <code>percentiles</code> \u767E\u5206\u6570\u8303\u56F4</h3><p>\u9488\u5BF9\u4ECE\u805A\u5408\u6587\u6863\u4E2D\u63D0\u53D6\u7684\u6570\u503C\u8BA1\u7B97\u4E00\u4E2A\u6216\u591A\u4E2A\u767E\u5206\u4F4D\u6570\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET latency/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;load_time_outlier&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;percentiles&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;load_time&quot;</span> 
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u767E\u5206\u4F4D\u5EA6\u91CF\u6807\u51C6\u5C06\u751F\u6210\u4E00\u5B9A\u8303\u56F4\u7684\u767E\u5206\u4F4D\uFF1A[1\uFF0C5\uFF0C25\uFF0C50\uFF0C75\uFF0C95\uFF0C99]\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.

 <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;load_time_outlier&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;values&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;1.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">5.0</span>,
        <span class="token string">&quot;5.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">25.0</span>,
        <span class="token string">&quot;25.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">165.0</span>,
        <span class="token string">&quot;50.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">445.0</span>,
        <span class="token string">&quot;75.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">725.0</span>,
        <span class="token string">&quot;95.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">945.0</span>,
        <span class="token string">&quot;99.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">985.0</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-percentile-ranks-\u767E\u5206\u6570\u6392\u884C" tabindex="-1"><a class="header-anchor" href="#_5-2-percentile-ranks-\u767E\u5206\u6570\u6392\u884C" aria-hidden="true">#</a> 5.2 <code>percentile_ranks</code> \u767E\u5206\u6570\u6392\u884C</h3><p>\u6839\u636E\u4ECE\u6C47\u603B\u6587\u6863\u4E2D\u63D0\u53D6\u7684\u6570\u503C\u8BA1\u7B97\u4E00\u4E2A\u6216\u591A\u4E2A\u767E\u5206\u4F4D\u7B49\u7EA7\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET latency/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;load_time_ranks&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;percentile_ranks&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;load_time&quot;</span>,   
        <span class="token string">&quot;values&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token number">500</span>, <span class="token number">600</span> <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.

 <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;load_time_ranks&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;values&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;500.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">90.01</span>,
        <span class="token string">&quot;600.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">100.0</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u8FF0\u7ED3\u679C\u8868\u793A90.01\uFF05\u7684\u9875\u9762\u52A0\u8F7D\u5728500ms\u5185\u5B8C\u6210\uFF0C\u800C100\uFF05\u7684\u9875\u9762\u52A0\u8F7D\u5728600ms\u5185\u5B8C\u6210\u3002</p><h2 id="_6-\u975E\u5355\u503C\u5206\u6790-\u5730\u7406\u4F4D\u7F6E\u578B" tabindex="-1"><a class="header-anchor" href="#_6-\u975E\u5355\u503C\u5206\u6790-\u5730\u7406\u4F4D\u7F6E\u578B" aria-hidden="true">#</a> 6. \u975E\u5355\u503C\u5206\u6790\uFF1A\u5730\u7406\u4F4D\u7F6E\u578B</h2><h3 id="_6-1-geo-bounds-geo-bounds" tabindex="-1"><a class="header-anchor" href="#_6-1-geo-bounds-geo-bounds" aria-hidden="true">#</a> 6.1 <code>geo_bounds</code> Geo bounds</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>PUT /museums
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;geo_point&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /museums/_bulk?refresh
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:1<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;52.374081,4.912350&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;NEMO Science Museum&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:2<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;52.369219,4.901618&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Museum Het Rembrandthuis&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:3<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;52.371667,4.914722&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Nederlands Scheepvaartmuseum&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:4<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;51.222900,4.405200&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Letterenhuis&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:5<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;48.861111,2.336389&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Mus\xE9e du Louvre&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:6<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;48.860000,2.327000&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Mus\xE9e d&#39;Orsay&quot;</span><span class="token punctuation">}</span>

POST /museums/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;mus\xE9e&quot;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;viewport&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;geo_bounds&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;location&quot;</span>,    
        <span class="token string">&quot;wrap_longitude&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">true</span>  
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u9762\u7684\u6C47\u603B\u5C55\u793A\u4E86\u5982\u4F55\u9488\u5BF9\u5177\u6709\u5546\u5E97\u4E1A\u52A1\u7C7B\u578B\u7684\u6240\u6709\u6587\u6863\u8BA1\u7B97\u4F4D\u7F6E\u5B57\u6BB5\u7684\u8FB9\u754C\u6846</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  ...
  <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;viewport&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;bounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;top_left&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;lat&quot;</span><span class="token operator">:</span> <span class="token number">48.86111099738628</span><span class="token punctuation">,</span>
          <span class="token property">&quot;lon&quot;</span><span class="token operator">:</span> <span class="token number">2.3269999679178</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;bottom_right&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;lat&quot;</span><span class="token operator">:</span> <span class="token number">48.85999997612089</span><span class="token punctuation">,</span>
          <span class="token property">&quot;lon&quot;</span><span class="token operator">:</span> <span class="token number">2.3363889567553997</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-geo-centroid-geo-centroid" tabindex="-1"><a class="header-anchor" href="#_6-2-geo-centroid-geo-centroid" aria-hidden="true">#</a> 6.2 <code>geo_centroid</code> Geo-centroid</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>PUT /museums
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;geo_point&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /museums/_bulk?refresh
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:1<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;52.374081,4.912350&quot;</span>, <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Amsterdam&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;NEMO Science Museum&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:2<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;52.369219,4.901618&quot;</span>, <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Amsterdam&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Museum Het Rembrandthuis&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:3<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;52.371667,4.914722&quot;</span>, <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Amsterdam&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Nederlands Scheepvaartmuseum&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:4<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;51.222900,4.405200&quot;</span>, <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Antwerp&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Letterenhuis&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:5<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;48.861111,2.336389&quot;</span>, <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Paris&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Mus\xE9e du Louvre&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:6<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;48.860000,2.327000&quot;</span>, <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Paris&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Mus\xE9e d&#39;Orsay&quot;</span><span class="token punctuation">}</span>

POST /museums/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;centroid&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;geo_centroid&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;location&quot;</span> 
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u9762\u7684\u6C47\u603B\u663E\u793A\u4E86\u5982\u4F55\u9488\u5BF9\u6240\u6709\u5177\u6709\u72AF\u7F6A\u7C7B\u578B\u7684\u76D7\u7A83\u6587\u4EF6\u8BA1\u7B97\u4F4D\u7F6E\u5B57\u6BB5\u7684\u8D28\u5FC3\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  ...
  <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;centroid&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;location&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;lat&quot;</span><span class="token operator">:</span> <span class="token number">51.00982965203002</span><span class="token punctuation">,</span>
        <span class="token property">&quot;lon&quot;</span><span class="token operator">:</span> <span class="token number">3.9662131341174245</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;count&quot;</span><span class="token operator">:</span> <span class="token number">6</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-geo-line-geo-line" tabindex="-1"><a class="header-anchor" href="#_6-3-geo-line-geo-line" aria-hidden="true">#</a> 6.3 <code>geo_line</code> Geo-Line</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>PUT <span class="token builtin class-name">test</span>
<span class="token punctuation">{</span>
    <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;dynamic&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;strict&quot;</span>,
        <span class="token string">&quot;_source&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;enabled&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;my_location&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;geo_point&quot;</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;group&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;@timestamp&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;date&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /test/_bulk?refresh
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;my_location&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;lat&quot;</span>:37.3450570, <span class="token string">&quot;lon&quot;</span><span class="token builtin class-name">:</span> -122.0499820<span class="token punctuation">}</span>, <span class="token string">&quot;@timestamp&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2013-09-06T16:00:36&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;my_location&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;lat&quot;</span><span class="token builtin class-name">:</span> <span class="token number">37.3451320</span>, <span class="token string">&quot;lon&quot;</span><span class="token builtin class-name">:</span> -122.0499820<span class="token punctuation">}</span>, <span class="token string">&quot;@timestamp&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2013-09-06T16:00:37Z&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;my_location&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;lat&quot;</span><span class="token builtin class-name">:</span> <span class="token number">37.349283</span>, <span class="token string">&quot;lon&quot;</span><span class="token builtin class-name">:</span> -122.0505010<span class="token punctuation">}</span>, <span class="token string">&quot;@timestamp&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2013-09-06T16:00:37Z&quot;</span><span class="token punctuation">}</span>

POST /test/_search?filter_path<span class="token operator">=</span>aggregations
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;line&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;geo_line&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;point&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;my_location&quot;</span><span class="token punctuation">}</span>,
        <span class="token string">&quot;sort&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;@timestamp&quot;</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C06\u5B58\u50A8\u6876\u4E2D\u7684\u6240\u6709geo_point\u503C\u805A\u5408\u5230\u7531\u6240\u9009\u6392\u5E8F\u5B57\u6BB5\u6392\u5E8F\u7684LineString\u4E2D\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;line&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Feature&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;geometry&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;LineString&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;coordinates&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">[</span>
            <span class="token number">-122.049982</span><span class="token punctuation">,</span>
            <span class="token number">37.345057</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token punctuation">[</span>
            <span class="token number">-122.050501</span><span class="token punctuation">,</span>
            <span class="token number">37.349283</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token punctuation">[</span>
            <span class="token number">-122.049982</span><span class="token punctuation">,</span>
            <span class="token number">37.345132</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;complete&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-\u975E\u5355\u503C\u5206\u6790-top\u578B" tabindex="-1"><a class="header-anchor" href="#_7-\u975E\u5355\u503C\u5206\u6790-top\u578B" aria-hidden="true">#</a> 7. \u975E\u5355\u503C\u5206\u6790\uFF1ATop\u578B</h2><h3 id="_7-1-top-hits-\u5206\u6876\u540E\u7684top-hits" tabindex="-1"><a class="header-anchor" href="#_7-1-top-hits-\u5206\u6876\u540E\u7684top-hits" aria-hidden="true">#</a> 7.1 <code>top_hits</code> \u5206\u6876\u540E\u7684top hits</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>POST /sales/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;top_tags&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;terms&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;type&quot;</span>,
        <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;top_sales_hits&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;top_hits&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;sort&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token string">&quot;date&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                  <span class="token string">&quot;order&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;desc&quot;</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>,
            <span class="token string">&quot;_source&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
              <span class="token string">&quot;includes&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;date&quot;</span>, <span class="token string">&quot;price&quot;</span> <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  ...
  <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;top_tags&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       <span class="token property">&quot;doc_count_error_upper_bound&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
       <span class="token property">&quot;sum_other_doc_count&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
       <span class="token property">&quot;buckets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
             <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;hat&quot;</span><span class="token punctuation">,</span>
             <span class="token property">&quot;doc_count&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
             <span class="token property">&quot;top_sales_hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                   <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                       <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
                       <span class="token property">&quot;relation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
                   <span class="token punctuation">}</span><span class="token punctuation">,</span>
                   <span class="token property">&quot;max_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
                   <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                      <span class="token punctuation">{</span>
                         <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sales&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;AVnNBmauCQpcRyxw6ChK&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token property">&quot;date&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2015/03/01 00:00:00&quot;</span><span class="token punctuation">,</span>
                            <span class="token property">&quot;price&quot;</span><span class="token operator">:</span> <span class="token number">200</span>
                         <span class="token punctuation">}</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token number">1425168000000</span>
                         <span class="token punctuation">]</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span>
                      <span class="token punctuation">}</span>
                   <span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
             <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
             <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;t-shirt&quot;</span><span class="token punctuation">,</span>
             <span class="token property">&quot;doc_count&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
             <span class="token property">&quot;top_sales_hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                   <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                       <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
                       <span class="token property">&quot;relation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
                   <span class="token punctuation">}</span><span class="token punctuation">,</span>
                   <span class="token property">&quot;max_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
                   <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                      <span class="token punctuation">{</span>
                         <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sales&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;AVnNBmauCQpcRyxw6ChL&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token property">&quot;date&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2015/03/01 00:00:00&quot;</span><span class="token punctuation">,</span>
                            <span class="token property">&quot;price&quot;</span><span class="token operator">:</span> <span class="token number">175</span>
                         <span class="token punctuation">}</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token number">1425168000000</span>
                         <span class="token punctuation">]</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span>
                      <span class="token punctuation">}</span>
                   <span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
             <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
             <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bag&quot;</span><span class="token punctuation">,</span>
             <span class="token property">&quot;doc_count&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
             <span class="token property">&quot;top_sales_hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                   <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                       <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                       <span class="token property">&quot;relation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
                   <span class="token punctuation">}</span><span class="token punctuation">,</span>
                   <span class="token property">&quot;max_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
                   <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                      <span class="token punctuation">{</span>
                         <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sales&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;AVnNBmatCQpcRyxw6ChH&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token property">&quot;date&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2015/01/01 00:00:00&quot;</span><span class="token punctuation">,</span>
                            <span class="token property">&quot;price&quot;</span><span class="token operator">:</span> <span class="token number">150</span>
                         <span class="token punctuation">}</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token number">1420070400000</span>
                         <span class="token punctuation">]</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span>
                      <span class="token punctuation">}</span>
                   <span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
             <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
       <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-top-metrics" tabindex="-1"><a class="header-anchor" href="#_7-2-top-metrics" aria-hidden="true">#</a> 7.2 <code>top_metrics</code></h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>POST /test/_bulk?refresh
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;s&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>, <span class="token string">&quot;m&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3.1415</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;s&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span>, <span class="token string">&quot;m&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1.0</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;s&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>, <span class="token string">&quot;m&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2.71828</span><span class="token punctuation">}</span>
POST /test/_search?filter_path<span class="token operator">=</span>aggregations
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;tm&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;top_metrics&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;metrics&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;m&quot;</span><span class="token punctuation">}</span>,
        <span class="token string">&quot;sort&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;s&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;desc&quot;</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;tm&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;top&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span><span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token property">&quot;metrics&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">&quot;m&quot;</span><span class="token operator">:</span> <span class="token number">2.718280076980591</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,101),g={href:"https://pdai.tech/md/db/nosql-es/elasticsearch-x-agg-metric.html",target:"_blank",rel:"noopener noreferrer"},h=n("strong",null,"ES\u8BE6\u89E3 - \u805A\u5408\uFF1A\u805A\u5408\u67E5\u8BE2\u4E4BMetric\u805A\u5408\u8BE6\u89E3",-1);function _(y,x){const a=l("ExternalLinkIcon");return p(),i("div",null,[u,r,d,n("blockquote",null,[n("p",null,[k,n("a",v,[m,t(a)]),b])]),q,n("p",null,[n("a",g,[h,t(a)])])])}const T=e(c,[["render",_],["__file","elasticsearch-x-agg-metric.html.vue"]]);export{T as default};
